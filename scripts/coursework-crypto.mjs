const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8", { fatal: true });
const context = encoder.encode("dtam27/portfolio/coursework/v1");

export const ITERATIONS = 600_000;
export const MAX_CIPHERTEXT_BYTES = 8 * 1024 * 1024;

export class CourseworkCryptoError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "CourseworkCryptoError";
    this.code = code;
  }
}

function invalidBundle() {
  return new CourseworkCryptoError("INVALID_BUNDLE", "The coursework bundle is not valid.");
}

function cryptoAPI() {
  if (!globalThis.crypto?.subtle) {
    throw new CourseworkCryptoError("CRYPTO_UNAVAILABLE", "This browser cannot unlock coursework securely.");
  }
  return globalThis.crypto;
}

function validatePassword(password) {
  if (typeof password !== "string" || password.length < 1 || password.length > 1024) {
    throw new CourseworkCryptoError("INVALID_PASSWORD", "Use a nonempty password of at most 1024 characters.");
  }
}

function toBase64(bytes) {
  const parts = [];
  for (let offset = 0; offset < bytes.length; offset += 8192) {
    parts.push(String.fromCharCode(...bytes.subarray(offset, offset + 8192)));
  }
  return btoa(parts.join(""));
}

function fromBase64(value, minBytes, maxBytes) {
  if (typeof value !== "string" || value.length === 0 || value.length % 4 !== 0 ||
      value.length > 4 * Math.ceil(maxBytes / 3) || !/^[A-Za-z0-9+/]*={0,2}$/.test(value)) {
    throw invalidBundle();
  }
  const padding = value.endsWith("==") ? 2 : value.endsWith("=") ? 1 : 0;
  const byteLength = (value.length / 4) * 3 - padding;
  if (byteLength < minBytes || byteLength > maxBytes) throw invalidBundle();
  let binary;
  try {
    binary = atob(value);
  } catch {
    throw invalidBundle();
  }
  if (binary.length !== byteLength) throw invalidBundle();
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function validateEnvelope(envelope) {
  if (!envelope || typeof envelope !== "object" || Array.isArray(envelope) ||
      envelope.version !== 1 || envelope.kdf?.name !== "PBKDF2" ||
      envelope.kdf.hash !== "SHA-256" || !Number.isInteger(envelope.kdf.iterations) ||
      envelope.kdf.iterations < ITERATIONS || envelope.kdf.iterations > 1_000_000 ||
      envelope.cipher?.name !== "AES-GCM" || envelope.cipher.tagLength !== 128) {
    throw invalidBundle();
  }
  return {
    salt: fromBase64(envelope.kdf.salt, 16, 16),
    iv: fromBase64(envelope.cipher.iv, 12, 12),
    ciphertext: fromBase64(envelope.ciphertext, 17, MAX_CIPHERTEXT_BYTES),
    iterations: envelope.kdf.iterations,
  };
}

async function deriveKey(password, salt, iterations, usage) {
  const { subtle } = cryptoAPI();
  const passwordBytes = encoder.encode(password);
  let material;
  try {
    material = await subtle.importKey("raw", passwordBytes, "PBKDF2", false, ["deriveKey"]);
  } finally {
    passwordBytes.fill(0);
  }
  return subtle.deriveKey(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    [usage],
  );
}

/** Encrypt an entire JSON value, including any embedded text or attachments. */
export async function encryptBundle(payload, password) {
  validatePassword(password);
  let serialized;
  try {
    serialized = JSON.stringify(payload);
  } catch {
    throw new CourseworkCryptoError("INVALID_PAYLOAD", "Coursework must be a serializable JSON value.");
  }
  if (typeof serialized !== "string") {
    throw new CourseworkCryptoError("INVALID_PAYLOAD", "Coursework must be a serializable JSON value.");
  }
  const plaintext = encoder.encode(serialized);
  if (plaintext.byteLength > MAX_CIPHERTEXT_BYTES - 16) {
    plaintext.fill(0);
    throw new CourseworkCryptoError("PAYLOAD_TOO_LARGE", "The coursework bundle is too large.");
  }
  const api = cryptoAPI();
  const salt = api.getRandomValues(new Uint8Array(16));
  const iv = api.getRandomValues(new Uint8Array(12));
  let ciphertext;
  try {
    const key = await deriveKey(password, salt, ITERATIONS, "encrypt");
    ciphertext = await api.subtle.encrypt({ name: "AES-GCM", iv, additionalData: context, tagLength: 128 }, key, plaintext);
  } finally {
    plaintext.fill(0);
  }
  return {
    version: 1,
    kdf: { name: "PBKDF2", hash: "SHA-256", iterations: ITERATIONS, salt: toBase64(salt) },
    cipher: { name: "AES-GCM", iv: toBase64(iv), tagLength: 128 },
    ciphertext: toBase64(new Uint8Array(ciphertext)),
  };
}

/** Decrypt only after validating public envelope bounds and algorithms. */
export async function decryptBundle(envelope, password) {
  validatePassword(password);
  const { salt, iv, ciphertext, iterations } = validateEnvelope(envelope);
  const key = await deriveKey(password, salt, iterations, "decrypt");
  let plaintext;
  try {
    plaintext = new Uint8Array(await cryptoAPI().subtle.decrypt(
      { name: "AES-GCM", iv, additionalData: context, tagLength: 128 }, key, ciphertext,
    ));
    return JSON.parse(decoder.decode(plaintext));
  } catch {
    throw new CourseworkCryptoError("UNLOCK_FAILED", "The password could not unlock the coursework.");
  } finally {
    plaintext?.fill(0);
  }
}
