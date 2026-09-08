# Daniel Tam — Portfolio

Personal portfolio site (static HTML/CSS/JS) for GitHub Pages.

**Live URL (after Pages is enabled):** https://dtam27.github.io/portfolio/

## Local preview

```bash
cd portfolio
python3 -m http.server 8080
```

Open http://localhost:8080

Or just open `index.html` in a browser.

## Enable GitHub Pages (GET-10)

1. Open https://github.com/dtam27/portfolio/settings/pages
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**
3. Branch: `main` · Folder: `/ (root)`
4. Save — site should appear at https://dtam27.github.io/portfolio/ in a minute or two

`.nojekyll` is already in the repo so GitHub won’t process the site with Jekyll.

## Assets to add (GET-13)

See `assets/README.md`. Drop in:

- `assets/headshot.jpg`
- `assets/resume.pdf`
- Group Think UI screenshots under `assets/projects/`

## Project layout

- `index.html` — Hero, About, Skills, Projects, Contact
- `styles.css` — palette/fonts as CSS variables + mobile media queries
- `app.js` — mobile nav + smooth scroll
- `docs/wireframe.md` — low-fi layout sketch
- `docs/mobile-checklist.md` — iPhone QA checklist

## Lighthouse (GET-23)

In Chrome DevTools → Lighthouse → analyze the Pages URL (or local server). Aim for strong Performance, Accessibility, and SEO.
