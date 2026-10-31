# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and engineering teams evaluating Daniel Tam for software engineering internships. The user confirmed “SWE internships” as the portfolio's target.

## Product Purpose

Present Daniel's software projects, technical background, and experience so a visitor can assess his fit, open his résumé, and contact him.

## Positioning

Daniel studies Computer Science on the cybersecurity track and Economics at the University of Maryland, College Park. His portfolio focuses on mobile development with SwiftUI and backend development with Python and FastAPI, supported by authentication, authorization, and data tooling.

## Operating Context

The portfolio is an existing static HTML, CSS, and JavaScript website hosted through GitHub Pages at https://dtam27.github.io/portfolio/. Retain that hosting model. Visitors can read the page, open GitHub or LinkedIn, download the current PDF résumé, and use email or phone contact links.

Use direct headings and plain language. The hero identifies Daniel by name; About me, Technical skills, and Contact label their sections. The user removed the earlier slogans.

## Capabilities and Constraints

- Preserve Daniel's identity and factual project, education, and experience content while improving presentation for SWE internship recruiting.
- Education is presented as Bachelor of Science in Computer Science, cybersecurity track, and Bachelor of Science in Economics at the University of Maryland. The latest user-supplied résumé confirms expected graduation in December 2027, a grade point average of 3.50, and Semester Academic Honors for Fall 2025 and Spring 2026. The earlier public portfolio also lists completion of the First-Year Innovation & Research Experience program; expand its name in the visible copy.
- GroupThink is a collaborative iOS application for managing and monitoring group screen time limits, developed from June 2026 onward with SwiftUI and Xcode. The résumé describes Firebase NoSQL data, authentication, and realtime cross-device state synchronization. The existing portfolio reports one collaborator. The public repository at https://github.com/Eliu1117/GroupThink has been verified. The user confirmed responsibility for the UI and frontend, Firebase integration, and some backend work. Current release status remains unspecified.
- GroupThink's engineering explanation describes a session summary that could open before Firestore finished crediting a session. It describes work on a live profile listener so the summary reacts to updated data, with listener cleanup. Source evidence supports discussing the implementation pattern and the work undertaken; it does not establish a verified runtime fix, production incident, or measured performance result.
- Discord bot development runs from January 2026 to the present in the latest résumé. The user confirmed building the bot end to end. The résumé describes engineering three Python bots serving more than 20,000 total users, using FastAPI REST endpoints, SQLite, SQLAlchemy, Alembic, OAuth2/JWT, role based access control, asynchronous protections against destructive server actions, and jishaku for live debugging and hot reloading. The portfolio's approximately 22,000 figure describes combined membership across 13 communities served; neither figure establishes measured active usage. Do not promote the résumé's 99.9% uptime figure without the underlying measurement, monitoring window, and definition.
- The Discord engineering explanation is supported by source evidence: centralized named permissions, role mappings stored per server, shared checks reused across command modules, and invalidation of cached mappings when configuration changes. Do not attach an incident-resolution claim or a measured performance benefit without further evidence.
- From January 2022 through March 2023, Daniel co-developed an interactive JavaScript and HTML web and mobile application for Touch by Touch Fencing, deployed to more than 135 participating schools according to the supplied résumé. He also executed test cases during live competition to validate backend data accuracy. This is reported deployment reach, not a measurement of active users. The project now shows two actual screenshots: bout scoring and event history, and team and individual statistics.
- About presents five dated experience rows with full organization names: Recruitment ambassador, College of Computer, Mathematical, and Natural Sciences at the University of Maryland, September 2026 to present; President, Asian American InterVarsity at the University of Maryland, March 2026 to present; Chapter founder and president, CS Base at the University of Maryland, November 2025 to present; Student Police Auxiliary, University of Maryland Police Department, December 2024 to September 2025; Developer and tester, Touch by Touch Fencing, January 2022 to March 2023.
- The résumé reports that CS Base's 15 volunteers deliver programming and app development curricula to 100 K–12 students, and that Daniel authored and taught an adaptive app development course. Asian American InterVarsity has a 120-member chapter and a 20-person leadership team. Keep these organizational counts distinct from software usage.
- The supplied résumé lists Cloud Security Essentials (GCLD), June 2024, and Foundational Cybersecurity Technologies (GFACT), September 2023, issued by GIAC Certifications (Global Information Assurance Certification); AWS Certified Cloud Practitioner as in progress; and Eagle Scout earned in 2021. An in-progress certification must not be represented as earned.
- Project screenshots, ownership details, the GroupThink source link, and the two featured engineering explanations have been supplied. Verified outcomes, engineering tradeoffs, demo or release URLs, and measurement methods remain useful additions. Do not invent them.

## Evidence on Hand

- Existing public copy in `index.html` and its source history.
- Latest PDF résumé supplied by the user and read for the updated project, education, experience, and certification facts above. Publish that PDF as the current résumé; the older `assets/resume.docx` must not be presented as equally current unless synchronized.
- Public GitHub profile at https://github.com/dtam27 and LinkedIn profile at https://linkedin.com/in/dtam27.
- Verified public GroupThink repository at https://github.com/Eliu1117/GroupThink.
- User-supplied project screenshots copied to `assets/projects/group-think-study-hall.png` and `assets/projects/discord-marketplace.png`.
- The user chose the full phone screenshot after discussing a crop. Use `assets/projects/group-think-app-limit.png` in full beside the study hall capture, captioned as the iOS app limit screen.
- Two user-supplied Touch by Touch screenshots are published as `assets/projects/touch-by-touch-scoring.png` and `assets/projects/touch-by-touch-school-stats.png`. These are the selected scoring and school statistics views; the gallery uses these two images.
- Source evidence supports the per-server permission configuration and Firestore profile-listener descriptions. Public documentation should summarize those technical details without publishing private conversation identifiers, local project paths, or raw history.
- Daniel's supplied transparent replacement portrait appears beside the About introduction as `assets/headshot.png`. Use the supplied PNG as-is, without additional pixel edits. The original wall background and discarded generated variants are not published.
- No product recordings, testimonials, or independently verified active usage measurements are currently included in the repository.
- `docs/content-guide.md` records received material, remaining useful evidence, and a reusable project intake template.

## Product Principles

1. Make Daniel's demonstrated software work easy to assess for SWE internships.
2. Use plain headings and explain personal contributions and engineering decisions when evidence is available.
3. Keep claims proportional to the evidence and distinguish community or organizational reach from active software usage.
4. Keep the résumé and contact paths clear and functional.
5. Preserve the simple static website so Daniel can maintain and publish it through GitHub Pages.
