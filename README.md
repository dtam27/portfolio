# Daniel Tam Portfolio

Static HTML, CSS, and JavaScript portfolio for software engineering internships, hosted through GitHub Pages.

Live site: [dtam27.github.io/portfolio](https://dtam27.github.io/portfolio/)

## Local preview

No package installation or build step is required. From the repository root, run Python's standard-library server:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080/. Stop the server with Ctrl+C.

## Page structure

1. Daniel Tam: a direct introduction, mobile and backend focus, and a Group Think screenshot.
2. Selected work: Discord bot platform, Group Think, and Touch by Touch Fencing, each with real screenshots and expandable technical details.
3. About me: a brief introduction, relevant teaching work, education, and certifications. The full role history stays in the résumé.
4. Technical skills: grouped mobile, backend, data, and security capabilities.
5. Contact: email, phone, professional links, and the current PDF résumé.

The navigation and About section also link to `coursework/`, a password protected selection of university projects with source viewers and downloads.

The page uses a self-hosted Manrope font and user-supplied screenshots. Group Think displays a shared focus session and the full iOS app limit capture. Touch by Touch displays bout scoring and school statistics using the same gallery pattern. Résumé links open `assets/resume.pdf` directly. The older DOCX remains a legacy asset and is not linked.

Technical explanations cover server-specific permission mappings and cache invalidation in the bot, plus work on a live profile listener for session totals in Group Think. These descriptions are supported by source review. No measured runtime improvement or confirmed production incident resolution is claimed.

## Project layout

- `index.html`: page content, screenshot captions, navigation, and metadata.
- `styles.css`: design tokens, self-hosted font, responsive layout, and interaction styles.
- `app.js`: mobile navigation, keyboard dismissal, section navigation state, and footer year.
- `coursework/`: password screen, safe source viewer, and encrypted coursework bundle.
- `scripts/`: local encryption and asset versioning tools, plus browser-compatible crypto and content validation modules.
- `tests/coursework-crypto.test.mjs`: encryption, integrity, and private build checks.
- `assets/projects/`: Discord, Group Think, and Touch by Touch screenshots.
- `assets/README.md`: asset provenance and font license information.
- `docs/content-guide.md`: received content and remaining details for stronger project case studies.
- `docs/social-preview.html`: editable source for `assets/social-preview.jpg`.
- `docs/mobile-checklist.md`: checklist for phone verification.
- `PRODUCT.md`: audience, confirmed facts, and content constraints.
- `DESIGN.md` and `.impeccable/design.json`: the current design tokens, component patterns, and preview snippets.

## GitHub Pages

Keep branch deployment set to `main` and `/ (root)` in the repository's Pages settings. Publish the static files together, including `assets/`. `.nojekyll` prevents Jekyll processing.

The page and its relative asset links work under the `/portfolio/` path. Social metadata points to the public GitHub Pages URL.

## Protected coursework

The coursework writeups and source files are encrypted locally together using AES-256-GCM, with a key derived from the shared password using PBKDF2-SHA-256 at 600,000 iterations. Only ciphertext, a random salt, and an initialization vector are published. The password and plaintext input must stay outside this public repository; the builder rejects paths inside it, including symlinks.

The browser decrypts after a visitor enters the password. It uses no cookies or browser storage for the password, key, or coursework. Locking or leaving the page clears the rendered content and revokes source download URLs. Source is displayed as text and is never executed.

To update the content, keep the private JSON input and password in a separate local folder. The input has `version: 1`, an `intro`, and `courses`. Each course has `code`, `title`, `summary`, and `projects`. A project has `title`, `summary`, `technologies`, `points`, and `files`; optional `note` text describes limitations. Each file has a `name` and UTF-8 `content`.

```sh
node scripts/build-coursework.mjs --input /path/outside/repository/coursework.json --password-file /path/outside/repository/access-password.txt
node scripts/version-coursework.mjs
node --test tests/coursework-crypto.test.mjs
```

The builder generates a strong password if the specified password file does not exist. Share it separately with intended reviewers. This is password-based encryption on static hosting, with no individual accounts or server-side rate limiting. Anyone with the password can retain decrypted copies; re-encrypting with a new password does not revoke copies already downloaded.

## Verification status

The latest CUA browser inspection covered 320, 375, 640, 768, 1024, 1280, 1440, and 1920 CSS pixels with no horizontal overflow. Checks during the refinement also covered screenshot and font loading, keyboard menu activation, Escape dismissal and focus return, anchor focus, native disclosures, local resource paths, JavaScript syntax, and text contrast.

The earlier public-page Hallmark static check using the kept-rule policy reported 0 FAIL and 0 REFLEX findings. Its scoped waivers retained the documented dark brand surface and navigation treatment. Hallmark's Puppeteer browser-renderer check was unavailable. Independent Hallmark review returned ship with no material finish findings within the reviewed polish scope.

The coursework feature adds eight passing crypto and build tests, plus browser checks for rejected passwords, source fidelity, clearing content and download links on lock, returning to the password screen on reload, mobile navigation, and reflow at 320, 375, 768, and 1280 CSS pixels.

Physical-phone touch behavior, a real screen reader walkthrough, and browser text zoom remain unverified. The bundled mobile checklist supports device review. No Lighthouse score is claimed.
