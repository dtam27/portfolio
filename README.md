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
3. About me: full education and certification wording, followed by five dated experience and leadership rows spanning the content width.
4. Technical skills: grouped mobile, backend, data, and security capabilities.
5. Contact: email, phone, professional links, and the current PDF résumé.

The page uses a self-hosted Manrope font and user-supplied screenshots. Group Think displays a shared focus session and the full iOS app limit capture. Touch by Touch displays bout scoring and school statistics using the same gallery pattern. Résumé links open `assets/resume.pdf` directly. The older DOCX remains a legacy asset and is not linked.

Technical explanations cover server-specific permission mappings and cache invalidation in the bot, plus work on a live profile listener for session totals in Group Think. These descriptions are supported by source review. No measured runtime improvement or confirmed production incident resolution is claimed.

## Project layout

- `index.html`: page content, screenshot captions, navigation, and metadata.
- `styles.css`: design tokens, self-hosted font, responsive layout, and interaction styles.
- `app.js`: mobile navigation, keyboard dismissal, section navigation state, and footer year.
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

## Verification status

The latest CUA browser inspection covered 320, 375, 640, 768, 1024, 1280, 1440, and 1920 CSS pixels with no horizontal overflow. Checks during the refinement also covered screenshot and font loading, keyboard menu activation, Escape dismissal and focus return, anchor focus, native disclosures, local resource paths, JavaScript syntax, and text contrast.

The Hallmark static check using the kept-rule policy reported 0 FAIL and 0 REFLEX findings. Two waivers retain the documented dark brand surface and mark disabled-form treatment as inapplicable because the page has no forms or unavailable actions. Hallmark's Puppeteer browser-renderer check was unavailable. Independent Hallmark review returned ship with no material finish findings within the reviewed polish scope.

Physical-phone touch behavior, a real screen reader walkthrough, and browser text zoom remain unverified. The bundled mobile checklist supports device review. No Lighthouse score is claimed.
