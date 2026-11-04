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

The user requested a password protected university coursework section and authorized selecting material from their private coursework repository. Keep selected writeups and source files inside the encrypted bundle; never duplicate protected material in public HTML, documentation, or plain assets. A short homepage Coursework section appears between Selected work and About, with an action to open the protected page. Primary navigation scrolls to that section; About also links directly to the protected page. The original repository stays private.

## Capabilities and Constraints

- Preserve Daniel's identity and factual project, education, and experience content while improving presentation for SWE internship recruiting.
- Education is presented as Bachelor of Science in Computer Science, cybersecurity track, and Bachelor of Science in Economics at the University of Maryland. The latest user-supplied résumé confirms expected graduation in December 2027, a grade point average of 3.50, and Semester Academic Honors for Fall 2025 and Spring 2026. The earlier public portfolio also lists completion of the First-Year Innovation & Research Experience program; expand its name in the visible copy.
- GroupThink is a collaborative iOS application for managing and monitoring group screen time limits, developed from June 2026 onward with SwiftUI and Xcode. The résumé describes Firebase NoSQL data, authentication, and realtime cross-device state synchronization. The existing portfolio reports one collaborator. The public repository at https://github.com/Eliu1117/GroupThink has been verified. The user confirmed responsibility for the UI and frontend, Firebase integration, and some backend work. Current release status remains unspecified.
- GroupThink's engineering explanation describes a session summary that could open before Firestore finished crediting a session. It describes work on a live profile listener so the summary reacts to updated data, with listener cleanup. Source evidence supports discussing the implementation pattern and the work undertaken; it does not establish a verified runtime fix, production incident, or measured performance result.
- Discord bot development runs from January 2026 to the present in the latest résumé. The user confirmed building the bot end to end. The résumé describes engineering three Python bots serving more than 20,000 total users, using FastAPI REST endpoints, SQLite, SQLAlchemy, Alembic, OAuth2/JWT, role based access control, asynchronous protections against destructive server actions, and jishaku for live debugging and hot reloading. The portfolio's approximately 22,000 figure describes combined membership across 13 communities served; neither figure establishes measured active usage. Do not promote the résumé's 99.9% uptime figure without the underlying measurement, monitoring window, and definition.
- The Discord engineering explanation is supported by source evidence: centralized named permissions, role mappings stored per server, shared checks reused across command modules, and invalidation of cached mappings when configuration changes. Do not attach an incident-resolution claim or a measured performance benefit without further evidence.
- From January 2022 through March 2023, Daniel co-developed an interactive JavaScript and HTML web and mobile application for Touch by Touch Fencing, deployed to more than 135 participating schools according to the supplied résumé. He also executed test cases during live competition to validate backend data accuracy. This is reported deployment reach, not a measurement of active users. The project shows mobile bout scoring and school statistics, plus a desktop meet overview.
- About uses a short personal introduction instead of repeating the résumé's role history. Include the relevant teaching work in prose: Daniel founded CS Base's University of Maryland chapter and designs and teaches app development lessons for school students. Keep the complete list of roles, organizations, and dates in the linked résumé.
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
- Three user-supplied Touch by Touch screenshots are published: mobile scoring and school statistics views, and `assets/projects/touch-by-touch-desktop-meet.png`, a desktop meet overview. The desktop preview crops browser chrome and empty margins using CSS while its link preserves the complete original. The second desktop statistics capture was omitted because it repeats the mobile statistics view.
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
6. Protect coursework with authenticated encryption and a separately shared password. Daniel requested support for his own shorter password; generated passwords remain strong by default. Keep plaintext input and the password outside the public repository. The browser keeps no persistent unlocked session, and Lock coursework clears decrypted views and source links.
