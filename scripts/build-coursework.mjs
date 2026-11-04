import { mkdir, readFile, writeFile, realpath, chmod, rename } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { encryptBundle } from "./coursework-crypto.mjs";
import { validateCourseworkPayload } from "./coursework-schema.mjs";

const repository = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function isInsideRepository(path) {
  const distance = relative(repository, path);
  return distance === "" || (distance !== ".." && !distance.startsWith(`..${sep}`) && !isAbsolute(distance));
}

async function resolvePhysicalPath(path) {
  const absolute = resolve(path);
  try {
    return await realpath(absolute);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    const parent = dirname(absolute);
    if (parent === absolute) throw error;
    return join(await resolvePhysicalPath(parent), relative(parent, absolute));
  }
}

async function requirePrivatePath(path, label) {
  const physical = await resolvePhysicalPath(path);
  if (isInsideRepository(physical)) {
    throw new Error(`${label} must be outside the public portfolio repository.`);
  }
  return physical;
}

function parseArguments() {
  const options = {};
  const supported = new Set(["--input", "--password-file", "--output"]);
  const args = process.argv.slice(2);
  for (let index = 0; index < args.length; index += 2) {
    if (!supported.has(args[index]) || !args[index + 1] || args[index + 1].startsWith("--") || options[args[index]]) {
      throw new Error("Usage: node scripts/build-coursework.mjs --input PRIVATE_JSON --password-file PRIVATE_PASSWORD [--output coursework/bundle.json]");
    }
    options[args[index]] = args[index + 1];
  }
  if (!options["--input"] || !options["--password-file"]) {
    throw new Error("Supply --input and --password-file paths outside the public portfolio repository.");
  }
  return options;
}

async function build() {
  const options = parseArguments();
  const inputPath = await requirePrivatePath(options["--input"], "Coursework source");
  const passwordPath = await requirePrivatePath(options["--password-file"], "Password file");
  const outputPath = await resolvePhysicalPath(options["--output"] || join(repository, "coursework/bundle.json"));
  if (outputPath === inputPath || outputPath === passwordPath || inputPath === passwordPath) {
    throw new Error("Source, password, and encrypted output must use different files.");
  }

  let payload;
  try {
    payload = JSON.parse(await readFile(inputPath, "utf8"));
  } catch (error) {
    if (error instanceof SyntaxError) throw new Error("The coursework input must contain valid JSON.");
    throw error;
  }
  validateCourseworkPayload(payload);

  await mkdir(dirname(passwordPath), { recursive: true, mode: 0o700 });
  let password;
  try {
    password = (await readFile(passwordPath, "utf8")).replace(/\r?\n$/, "");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    password = randomBytes(32).toString("base64url");
    await writeFile(passwordPath, `${password}\n`, { flag: "wx", mode: 0o600 });
  }
  await chmod(passwordPath, 0o600);
  const envelope = await encryptBundle(payload, password);
  password = null;
  payload = null;
  await mkdir(dirname(outputPath), { recursive: true });
  const temporary = `${outputPath}.tmp-${randomBytes(8).toString("hex")}`;
  await writeFile(temporary, `${JSON.stringify(envelope)}\n`, { mode: 0o644 });
  await rename(temporary, outputPath);
  console.log("Encrypted coursework bundle written. The password is in the specified private password file.");
}

build().catch((error) => {
  console.error(`Could not build coursework bundle: ${error.message}`);
  process.exitCode = 1;
});
