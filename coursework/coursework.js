import { decryptBundle } from "../scripts/coursework-crypto.mjs?v=aeea10aaf68b";

import { validateCourseworkPayload } from "../scripts/coursework-schema.mjs?v=63c42961ca7f";

const form = document.getElementById("coursework-unlock");
const password = document.getElementById("coursework-password");
const showPassword = document.getElementById("coursework-show-password");
const submit = document.getElementById("coursework-submit");
const error = document.getElementById("coursework-error");
const status = document.getElementById("coursework-status");
const gate = document.getElementById("coursework-gate");
const work = document.getElementById("coursework-work");
const index = document.getElementById("coursework-index");
const content = document.getElementById("coursework-content");
const intro = document.getElementById("coursework-intro");
const lockedIntro = intro.textContent;
const blobURLs = new Set();
let operation = 0;
let request;

function node(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}

function setBusy(busy) {
  form.setAttribute("aria-busy", String(busy));
  password.readOnly = busy;
  submit.disabled = busy;
  showPassword.disabled = busy;
  submit.textContent = busy ? "Unlocking…" : "Unlock coursework";
}

function hidePassword() {
  password.type = "password";
  showPassword.textContent = "Show";
  showPassword.setAttribute("aria-label", "Show password");
  showPassword.setAttribute("aria-pressed", "false");
}

function clearContent() {
  content.replaceChildren();
  index.replaceChildren();
  for (const url of blobURLs) URL.revokeObjectURL(url);
  blobURLs.clear();
}

function lock(restoreFocus = true) {
  operation += 1;
  request?.abort();
  request = undefined;
  clearContent();
  form.reset();
  hidePassword();
  password.removeAttribute("aria-invalid");
  error.textContent = "";
  intro.textContent = lockedIntro;
  setBusy(false);
  gate.hidden = false;
  work.hidden = true;
  status.textContent = restoreFocus ? "Coursework locked." : "";
  if (restoreFocus) password.focus();
}

function render(payload) {
  validateCourseworkPayload(payload);
  clearContent();
  const fragment = document.createDocumentFragment();
  payload.courses.forEach((course, courseIndex) => {
    const section = node("section", undefined, "coursework-course");
    section.id = `course-${courseIndex + 1}`;
    const heading = node("h2", course.code);
    heading.append(node("span", course.title));
    section.append(heading, node("p", course.summary));
    const jump = node("a", course.code);
    jump.href = `#${section.id}`;
    index.append(jump);
    for (const project of course.projects) {
      const article = node("article", undefined, "coursework-project");
      article.append(node("h3", project.title), node("p", project.summary));
      const technologies = node("ul", undefined, "tags");
      technologies.setAttribute("aria-label", "Technologies");
      project.technologies.forEach((technology) => technologies.append(node("li", technology)));
      article.append(technologies);
      const points = node("ul");
      project.points.forEach((point) => points.append(node("li", point)));
      article.append(points);
      if (project.note) article.append(node("p", project.note));
      const files = node("div", undefined, "coursework-files");
      for (const file of project.files) {
        const details = node("details", undefined, "coursework-file");
        const summary = node("summary", `Read ${file.name}`);
        const symbol = node("span", undefined, "details-symbol");
        symbol.setAttribute("aria-hidden", "true");
        summary.append(symbol);
        details.append(summary);
        // Source is text, never executable HTML. Populate long files only on demand.
        details.addEventListener("toggle", () => {
          if (!details.open || !details.isConnected || work.hidden || details.querySelector("pre")) return;
          const pre = node("pre");
          pre.tabIndex = 0;
          pre.setAttribute("aria-label", `${file.name} source code`);
          pre.append(node("code", file.content));
          const download = node("a", `Download ${file.name}`, "coursework-download");
          const url = URL.createObjectURL(new Blob([file.content], { type: "text/plain;charset=utf-8" }));
          blobURLs.add(url);
          download.href = url;
          download.download = file.name;
          details.append(pre, download);
        });
        files.append(details);
      }
      article.append(files);
      section.append(article);
    }
    fragment.append(section);
  });
  content.append(fragment);
  intro.textContent = payload.intro;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (submit.disabled) return;
  error.textContent = "";
  password.removeAttribute("aria-invalid");
  if (!password.value) {
    error.textContent = "Enter the password shared with you.";
    password.setAttribute("aria-invalid", "true");
    password.focus();
    return;
  }
  const current = ++operation;
  request = new AbortController();
  setBusy(true);
  status.textContent = "Unlocking coursework…";
  let phase = "fetch";
  try {
    const response = await fetch(new URL("bundle.json?v=cfae4d1e373c", import.meta.url), { cache: "no-store", signal: request.signal });
    if (!response.ok) throw new Error("Unavailable");
    const raw = await response.text();
    if (raw.length > 12000000) throw new Error("Invalid bundle");
    const envelope = JSON.parse(raw);
    phase = "decrypt";
    const payload = await decryptBundle(envelope, password.value);
    if (current !== operation) return;
    phase = "render";
    render(payload);
    password.value = "";
    hidePassword();
    gate.hidden = true;
    work.hidden = false;
    status.textContent = "Coursework unlocked.";
    const heading = document.querySelector(".coursework-intro h1");
    heading.tabIndex = -1;
    heading.focus();
  } catch {
    if (current !== operation) return;
    clearContent();
    status.textContent = "";
    error.textContent = phase === "fetch"
      ? "The coursework could not load. Check your connection and try again."
      : phase === "render"
        ? "The coursework could not open. Please contact Daniel."
        : "That password did not unlock the coursework. Try again.";
    if (phase === "decrypt") password.setAttribute("aria-invalid", "true");
    password.value = "";
    password.focus();
  } finally {
    if (current === operation) {
      request = undefined;
      setBusy(false);
    }
  }
});

showPassword.addEventListener("click", () => {
  const show = password.type === "password";
  password.type = show ? "text" : "password";
  showPassword.textContent = show ? "Hide" : "Show";
  showPassword.setAttribute("aria-label", show ? "Hide password" : "Show password");
  showPassword.setAttribute("aria-pressed", String(show));
});
password.addEventListener("input", () => {
  password.removeAttribute("aria-invalid");
  error.textContent = "";
});
document.getElementById("coursework-lock").addEventListener("click", () => lock());
window.addEventListener("pagehide", () => lock(false));

if (window.isSecureContext && globalThis.crypto?.subtle) {
  document.getElementById("coursework-requirements").hidden = true;
  form.hidden = false;
  hidePassword();
}
