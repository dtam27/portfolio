# Daniel Tam — Portfolio

Static HTML, CSS, and JavaScript portfolio for software engineering internships, hosted through GitHub Pages.

Live site: https://dtam27.github.io/portfolio/

## Local preview

No package installation or build step is required. From the repository root, run Python's standard-library server:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080/. Stop the server with Ctrl+C.

## Page structure

1. Hero: introduction, mobile and backend focus, and a GroupThink screenshot.
2. Selected work: Discord bots, GroupThink, and Touch by Touch Fencing.
3. About: education, leadership, and certifications.
4. Skills: grouped technical capabilities.
5. Contact: email, phone, professional links, and the current PDF résumé.

The page uses a self-hosted Manrope font and user-supplied screenshots. Résumé links open `assets/resume.pdf` directly. The older DOCX remains a legacy asset and is not linked.

## Project layout

- `index.html`: page content, screenshot captions, navigation, and metadata.
- `styles.css`: design tokens, self-hosted font, responsive layout, and interaction styles.
- `app.js`: mobile navigation, keyboard dismissal, section navigation state, and footer year.
- `assets/projects/`: Discord and GroupThink screenshots.
- `assets/README.md`: asset provenance and font license information.
- `docs/content-guide.md`: received content and optional details for stronger project case studies.
- `docs/social-preview.html`: editable source for `assets/social-preview.jpg`.
- `docs/mobile-checklist.md`: checklist for phone verification.
- `PRODUCT.md`: audience, confirmed facts, and content constraints.

## GitHub Pages

Keep branch deployment set to `main` and `/ (root)` in the repository's Pages settings. Publish the static files together, including `assets/`. `.nojekyll` prevents Jekyll processing.

The page and its relative asset links work under the `/portfolio/` path. Social metadata points to the public GitHub Pages URL.

## Verification status

Verified browser layouts at 320, 390, 768, 1280, and 1440 CSS pixels: no horizontal overflow, all screenshots and the self-hosted font loaded, and no console warnings or errors. Verified keyboard menu activation, Escape dismissal and focus return, anchor focus, and all native disclosures with Enter or Space. Local resource and JavaScript syntax checks pass. Text contrast was measured against all page surfaces. An independent source and screenshot review returned ship with no material blockers.

Physical-phone touch behavior, a real screen reader walkthrough, and browser text zoom remain unverified. The bundled mobile checklist supports device review. Lighthouse can provide a separate performance, accessibility, and SEO check; no score is claimed here.
