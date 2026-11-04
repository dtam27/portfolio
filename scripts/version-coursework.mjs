import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const hash = async (path) => createHash("sha256").update(await readFile(join(root, path))).digest("hex").slice(0, 12);
let script = await readFile(join(root, "coursework/coursework.js"), "utf8");
script = script.replace(/bundle\.json\?v=[\w_-]+/g, `bundle.json?v=${await hash("coursework/bundle.json")}`);
for (const module of ["coursework-crypto.mjs", "coursework-schema.mjs"]) {
  const pattern = new RegExp(`(\\.\\./scripts/${module.replace(".", "\\.")})(?:\\?v=[a-f0-9]+)?(?=")`, "g");
  script = script.replace(pattern, `$1?v=${await hash(`scripts/${module}`)}`);
}
await writeFile(join(root, "coursework/coursework.js"), script);
let html = await readFile(join(root, "coursework/index.html"), "utf8");
for (const [reference, path] of [["../styles.css", "styles.css"], ["styles.css", "coursework/styles.css"], ["coursework.js", "coursework/coursework.js"]]) {
  const pattern = new RegExp(`(["'])${reference.replaceAll(".", "\\.")}(?:\\?v=[a-f0-9]+)?(["'])`, "g");
  html = html.replace(pattern, `$1${reference}?v=${await hash(path)}$2`);
}
await writeFile(join(root, "coursework/index.html"), html);
console.log("Coursework asset versions updated.");
