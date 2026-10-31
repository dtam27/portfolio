---
name: Daniel Tam Portfolio
description: A restrained dark portfolio for mobile and backend software work.
colors:
  accent: "#b7c5a3"
  accent-hover: "#cfdbc1"
  accent-ink: "#1b2616"
  bg: "#000000"
  surface: "#181818"
  surface-hover: "#1f1f1f"
  image-stage: "#272727"
  text: "#f3f3ee"
  muted: "#b0b0a8"
  line: "#313131"
  tag-border: "#42443e"
  tag-text: "#d4d8cc"
typography:
  display:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "60px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "48px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: "36px"
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  body-large:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "28px"
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
  action:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "24px"
rounded:
  control: "4px"
  media: "8px"
  panel: "12px"
  phone: "16px"
spacing:
  micro: "4px"
  tight: "8px"
  compact: "12px"
  small: "16px"
  medium: "24px"
  large: "32px"
  panel: "40px"
  section-small: "48px"
  section-medium: "64px"
  section-large: "96px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.accent-ink}"
  button-outline:
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "0 16px"
  text-link:
    textColor: "{colors.accent}"
    typography: "{typography.action}"
  tag:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.tag-text}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "4px 8px"
  project-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
  current-project:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
    padding: "24px"
  navigation:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.muted}"
    height: "80px"
  project-details:
    textColor: "{colors.text}"
---

# Design System: Daniel Tam Portfolio

## Overview

**Creative North Star: "The Software Workbench"**

This phrase describes the implemented portfolio: a quiet, practical setting for real software work. The retained black and dark neutral surfaces, warm light text, and muted sage accent give the site a measured, technical character. Manrope carries every text role, and the contrast between large headings and compact project metadata creates hierarchy without visual noise.

The interface is spacious around major sections and denser within project evidence. Screenshots supply the visual specificity; borders, restrained corners, and tonal layers organize them. The workbench metaphor records the existing refinement rather than introducing a replacement visual identity. Keep the static HTML, CSS, and JavaScript system straightforward to maintain on GitHub Pages.

**Key Characteristics:**

- Dark neutral surfaces with a single muted sage accent.
- Real project screenshots as the primary visual evidence.
- Large, tightly tracked headings paired with readable, compact detail.
- Flat, bordered panels and modest corner radii.
- Native disclosures, visible keyboard focus, and optional motion.

## Colors

The palette is almost monochrome, with warm light text and sage reserved for emphasis, action, and state. The frontmatter records exact implemented values.

### Primary

- **Quiet Sage** (`accent`): primary action fill, the monogram, section punctuation, selected metrics, text links, disclosure symbols, and keyboard focus.
- **Light Sage** (`accent-hover`): the primary action's pointer hover fill.
- **Deep Sage Ink** (`accent-ink`): readable dark text on sage fills and selected text.

### Neutral

- **Black Ground** (`bg`): page canvas and opaque sticky navigation.
- **Charcoal Panel** (`surface`): current project and featured project surfaces.
- **Raised Charcoal** (`surface-hover`): small technology tag fills.
- **Screenshot Charcoal** (`image-stage`): factual screenshot stages within featured projects.
- **Warm White** (`text`): headings, important labels, and primary reading contrast.
- **Warm Gray** (`muted`): descriptions, dates, captions, and secondary information.
- **Graphite Rule** (`line`): panel outlines, section dividers, navigation boundaries, and outlined controls.
- **Olive Graphite** (`tag-border`): technology tag borders.
- **Pale Olive Gray** (`tag-text`): technology tag text.

**The Single Accent Rule.** Use sage for intentional emphasis and interaction; let the neutral surfaces carry the composition.

## Typography

**Display Font:** Manrope, with system-ui and sans-serif fallbacks.

**Body Font:** Manrope, with the same fallbacks. The variable font is served locally from `assets/manrope-latin.woff2`, covering weights 400–700 with `font-display: swap`.

**Character:** Rounded humanist forms soften the technical content. Semibold headings and tight display tracking provide a clear voice; body text keeps a regular weight and comfortable line spacing.

### Hierarchy

- **Display:** the frontmatter display role sets the desktop hero and contact scale. The hero uses a muted second line. It becomes (48px) at the intermediate desktop breakpoint, returns to the display size for the single-column tablet layout, and steps to (36px/40px) on phones and (30px/36px) at the narrowest breakpoint.
- **Headline:** the frontmatter headline role anchors major sections. Phone section headings use (36px/40px); the compact skills heading uses (36px/40px) on desktop and (30px/36px) on phones.
- **Title:** the frontmatter title role identifies projects. At tablet widths and below, project titles use (24px/32px).
- **Body:** the body role carries ordinary copy; descriptions generally stop at (65ch). The body-large role is used for the hero, selected evidence, About introduction, and contact copy. Introductory copy returns to the body scale on phones.
- **Label:** the label role serves dates, project categories, captions, tags, and the footer. Keep sentence case and preserve the light regular weight.
- **Action:** the action role supports inline links. Main actions use the body size with semibold weight. Navigation uses a medium weight (500), distinct from the semibold inline actions.

**The One Typeface Rule.** Use the local Manrope family throughout; establish hierarchy through size, weight, spacing, and contrast.

## Layout

The centered content container has a maximum width (1184px). Desktop gutters are (48px) per side, falling to (24px) at the tablet breakpoint and (16px) below the narrow breakpoint. The header is sticky, opaque, and one rule above the content. Its height changes from (80px) to (72px) at the tablet breakpoint; anchor offsets account for that height plus breathing room.

Large sections use the spacing scale's section-large interval on desktop and section-medium on smaller screens. Panels use panel or large padding on desktop, medium padding on phones, and small padding in compact text panels below the narrow breakpoint. Repeated small gaps, label offsets, and chips follow the same scale rather than arbitrary per-element spacing.

Wide layouts combine text and project evidence in asymmetric grids. The hero uses a (1.65:1) split and the featured backend project a (1.25:1) split. Project panels stack as the available space narrows. The iOS panel keeps its two portrait screenshots side by side within the media stage, preserving each full image's aspect ratio. The full app limit screen is a user-confirmed presentation choice.

Implemented responsive boundaries are (1100px), (800px), (600px), and (360px), using max-width queries. At the tablet breakpoint, the hero and backend project become single column. At the phone breakpoint, navigation becomes a disclosure menu when JavaScript is available, the iOS panel and About become single column, and skill groups stack. With JavaScript unavailable, all navigation links remain visible and wrap within the header.

Browser checks supplied for this refinement covered widths (320px), (390px), (768px), (1280px), and (1440px), with no horizontal overflow or console errors and successful font/image loading. These are desktop browser viewport checks; hardware touch behavior has not been tested. Independent review is recorded separately.

## Elevation & Depth

The system uses no box shadows. Depth comes from Black Ground, Charcoal Panel, and Screenshot Charcoal, separated by thin Graphite Rules. The sticky header has an opaque background. There is no blur layer, floating panel treatment, or ornamental glow in the implemented system.

**The Tonal Depth Rule.** Separate regions with the established neutral surfaces and borders; keep their resting appearance flat.

## Shapes

Controls and tags use the compact control radius. Screenshot crops use the media radius, bordered project panels use the panel radius, and full portrait screenshot edges use the phone radius. Thin borders define structure. The only recurring circle is the small current-project status dot. Project panels clip their contents at the outer corner; full phone captures retain their original aspect ratios and visible content.

Inline arrows are small stroke SVGs, normally (20px) with a stroke width (1.5). Caption arrows use (16px). Keep them aligned with text and inherit the surrounding color.

## Components

### Buttons

Compact and clear, with a minimum height (48px) for the primary action. The primary button uses Quiet Sage and Deep Sage Ink, a compact radius, and an arrow separated from the label. Pointer hover changes to Light Sage; press shifts the control down (1px), with the primary button responding over (120ms). The outlined résumé control uses a Graphite Rule, Warm White text, and a minimum height (40px).

Interactive controls receive a sage focus outline (2px) offset by (4px). Hover styling is limited to devices reporting hover and a fine pointer. Color and background transitions use (240ms) with the shared ease curve. Do not depend on hover to reveal necessary information.

### Chips

Technology tags are compact, noninteractive labels. They use Raised Charcoal, Olive Graphite borders, Pale Olive Gray text, and the control radius. They wrap naturally with a tight gap. They have no selected, pressed, or filter state.

### Cards / Containers

Project panels are calm frames for evidence, using Charcoal Panel, a Graphite Rule, and the panel radius. Text padding reduces with screen width. Screenshot stages use Screenshot Charcoal. The current-project panel uses the same frame with more compact padding, a sage status dot, a project title, a factual screenshot preview, and a text link.

### Navigation

Desktop links sit in a single horizontal row with muted text. Hover and the current location use Warm White; the current location also receives a sage underline. The résumé link is outlined. The monogram is sage and paired with Daniel's name.

The mobile menu toggle is a bordered square (48px) with two thin bars that rotate into a close symbol over (200ms). Menu links become large stacked targets. Escape closes the menu and restores focus to the toggle; selecting a section closes the menu and moves focus to that section. The open state updates `aria-expanded` and the toggle's accessible name. There is no essential content behind JavaScript alone.

### Project disclosures

Use native `details` and `summary` for technical explanations and coursework. Summaries have a minimum height (48px), semibold labels, and a sage plus/minus indicator. The vertical line rotates away over (180ms) when open. Summaries also turn sage while pressed. Copy remains in ordinary document flow; preserve keyboard activation and native expanded-state semantics.

### Project screenshots

Use the supplied captures as evidence. The hero preview and backend preview may crop for composition, with explicit links to the project or full screenshot. The iOS gallery displays both complete phone captures and descriptive captions. Avoid fabricated interfaces or replacing the full app limit screenshot with the previously discussed crop.

**The Optional Motion Rule.** Content is visible at rest. Reduced motion disables transitions and smooth scrolling; interaction states remain legible without animation. The shared easing is `cubic-bezier(.32,.72,0,1)`.

## Do's and Don'ts

### Do:

- **Do** preserve the dark neutral and sage identity when extending the site.
- **Do** use the local Manrope family and the established text hierarchy.
- **Do** use real project screenshots with meaningful alternative text and captions.
- **Do** keep full phone captures intact in the iOS gallery.
- **Do** retain visible keyboard focus, native disclosures, and visible navigation without JavaScript.
- **Do** keep content readable when motion is reduced and at widths of 320px and above.

### Don't:

- **Don't** replace factual screenshots with invented product interfaces.
- **Don't** communicate important information only through hover or animation.
- **Don't** give noninteractive technology tags button or filter behavior.
- **Don't** add competing accent colors, ornamental shadows, or blurred surfaces to this established visual system.
- **Don't** crop the full iOS app limit capture in the project gallery.
