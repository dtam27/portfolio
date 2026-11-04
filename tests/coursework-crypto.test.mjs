import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile, stat, rm, symlink } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { encryptBundle, decryptBundle, ITERATIONS, MAX_CIPHERTEXT_BYTES } from "../scripts/coursework-crypto.mjs";
import { validateCourseworkPayload } from "../scripts/coursework-schema.mjs";

const execute = promisify(execFile);
const script = fileURLToPath(new URL("../scripts/build-coursework.mjs", import.meta.url));
const password = "test-only-long-password-which-is-not-a-real-key";
const payload = {
  version: 1,
  intro: "Selected coursework fixtures for testing.",
  courses: [{
    code: "TEST 101",
    title: "Private fixture",
    summary: "An example course.",
    projects: [{
      title: "A source example",
      summary: "Text is preserved without interpretation.",
      technologies: ["Text"],
      points: ["Read the source as literal text."],
      files: [{ name: "literal.txt", content: "<script>alert('literal')</script>\nλ", language: "text" }],
    }],
  }],
};

test("shared payload validation accepts bounded text and rejects malformed nested content", () => {
  assert.equal(validateCourseworkPayload(payload), payload);
  for (const alter of [
    (value) => { value.version = 2; },
    (value) => { value.intro = ""; },
    (value) => { value.courses = []; },
    (value) => { value.courses[0] = null; },
    (value) => { value.courses[0].projects = []; },
    (value) => { value.courses[0].projects[0].technologies = "Text"; },
    (value) => { value.courses[0].projects[0].points = Array(9).fill("Too many points"); },
    (value) => { value.courses[0].projects[0].files[0].name = "../source.txt"; },
    (value) => { value.courses[0].projects[0].files[0].content = "x".repeat(1_000_001); },
  ]) {
    const value = structuredClone(payload);
    alter(value);
    assert.throws(() => validateCourseworkPayload(value), { code: "INVALID_CONTENT" });
  }
});

test("encrypted round trip preserves Unicode and literal source text without exposing it", async () => {
  const envelope = await encryptBundle(payload, password);
  assert.equal(envelope.kdf.iterations, ITERATIONS);
  assert.deepEqual(await decryptBundle(envelope, password), payload);
  assert.ok(!JSON.stringify(envelope).includes("Private fixture"));
  assert.ok(!JSON.stringify(envelope).includes(password));
  assert.ok(!JSON.stringify(envelope).includes("<script>"));
});

test("wrong password and altered authenticated data cannot decrypt", async () => {
  const envelope = await encryptBundle(payload, password);
  await assert.rejects(decryptBundle(envelope, "a-different-long-test-password"), { code: "UNLOCK_FAILED" });
  const bytes = Buffer.from(envelope.ciphertext, "base64");
  bytes[0] ^= 1;
  await assert.rejects(decryptBundle({ ...envelope, ciphertext: bytes.toString("base64") }, password), { code: "UNLOCK_FAILED" });
  const iv = Buffer.from(envelope.cipher.iv, "base64");
  iv[0] ^= 1;
  await assert.rejects(decryptBundle({ ...envelope, cipher: { ...envelope.cipher, iv: iv.toString("base64") } }, password), { code: "UNLOCK_FAILED" });
});

test("repeated encryption generates independent salts and IVs", async () => {
  const first = await encryptBundle(payload, password);
  const second = await encryptBundle(payload, password);
  assert.notEqual(first.kdf.salt, second.kdf.salt);
  assert.notEqual(first.cipher.iv, second.cipher.iv);
  assert.notEqual(first.ciphertext, second.ciphertext);
});

test("malformed or excessive envelopes fail validation before key derivation", async () => {
  const envelope = await encryptBundle(payload, password);
  const invalid = [
    null,
    { ...envelope, version: 2 },
    { ...envelope, kdf: { ...envelope.kdf, iterations: ITERATIONS - 1 } },
    { ...envelope, kdf: { ...envelope.kdf, iterations: 1_000_001 } },
    { ...envelope, kdf: { ...envelope.kdf, hash: "SHA-1" } },
    { ...envelope, kdf: { ...envelope.kdf, salt: "AAAA" } },
    { ...envelope, cipher: { ...envelope.cipher, name: "AES-CBC" } },
    { ...envelope, cipher: { ...envelope.cipher, tagLength: 32 } },
    { ...envelope, cipher: { ...envelope.cipher, iv: "AAAA" } },
    { ...envelope, ciphertext: "not base64!" },
    { ...envelope, ciphertext: "A".repeat(4 * Math.ceil(MAX_CIPHERTEXT_BYTES / 3) + 4) },
  ];
  for (const value of invalid) {
    await assert.rejects(decryptBundle(value, password), { code: "INVALID_BUNDLE" });
  }
  await assert.rejects(encryptBundle(payload, "short"), { code: "INVALID_PASSWORD" });
  await assert.rejects(encryptBundle(undefined, password), { code: "INVALID_PAYLOAD" });
});

test("builder keeps the generated password private and only writes encrypted content", async () => {
  const directory = await mkdtemp(join(tmpdir(), "coursework-build-test-"));
  try {
    const input = join(directory, "source.json");
    const secret = join(directory, "private", "password.txt");
    const output = join(directory, "bundle.json");
    await writeFile(input, JSON.stringify(payload));
    const result = await execute(process.execPath, [script, "--input", input, "--password-file", secret, "--output", output]);
    const generated = (await readFile(secret, "utf8")).trim();
    const envelopeText = await readFile(output, "utf8");
    assert.match(generated, /^[A-Za-z0-9_-]{43}$/);
    assert.equal((await stat(secret)).mode & 0o777, 0o600);
    assert.ok(!envelopeText.includes("Private fixture"));
    assert.ok(!envelopeText.includes(generated));
    assert.ok(!result.stdout.includes(generated));
    assert.ok(!result.stderr.includes(generated));
    assert.deepEqual(await decryptBundle(JSON.parse(envelopeText), generated), payload);
    await execute(process.execPath, [script, "--input", input, "--password-file", secret, "--output", output]);
    assert.equal((await readFile(secret, "utf8")).trim(), generated);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("builder rejects repository secrets including paths reached through a symlink", async () => {
  const directory = await mkdtemp(join(tmpdir(), "coursework-path-test-"));
  try {
    const input = join(directory, "source.json");
    const secret = join(directory, "password.txt");
    const output = join(directory, "bundle.json");
    await writeFile(input, JSON.stringify(payload));
    for (const args of [
      ["--input", script, "--password-file", secret],
      ["--input", input, "--password-file", script],
    ]) {
      await assert.rejects(execute(process.execPath, [script, ...args, "--output", output]), (error) => {
        assert.match(error.stderr, /outside the public portfolio repository/);
        return true;
      });
    }
    const link = join(directory, "linked-source.json");
    await symlink(script, link);
    await assert.rejects(execute(process.execPath, [script, "--input", link, "--password-file", secret, "--output", output]), (error) => {
      assert.match(error.stderr, /outside the public portfolio repository/);
      return true;
    });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("builder rejects malformed nested coursework before creating a password or output", async () => {
  const directory = await mkdtemp(join(tmpdir(), "coursework-schema-test-"));
  try {
    const input = join(directory, "source.json");
    const secret = join(directory, "password.txt");
    const output = join(directory, "bundle.json");
    const malformed = structuredClone(payload);
    delete malformed.courses[0].projects[0].files;
    await writeFile(input, JSON.stringify(malformed));
    await assert.rejects(execute(process.execPath, [script, "--input", input, "--password-file", secret, "--output", output]), (error) => {
      assert.match(error.stderr, /Invalid coursework content/);
      assert.ok(!error.stderr.includes("Private fixture"));
      return true;
    });
    await assert.rejects(stat(secret), { code: "ENOENT" });
    await assert.rejects(stat(output), { code: "ENOENT" });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
