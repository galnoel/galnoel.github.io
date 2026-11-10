# Galnoel Peter Rindengan — Portfolio

Personal portfolio for AI and backend engineering, published at [galnoel.github.io](https://galnoel.github.io/).

## Structure

- `index.html`: profile, competitions, projects, experience, certificates, and contact details.
- `styles.css`: responsive layouts, light and dark themes, and reduced-motion styles.
- `script.js`: navigation, project dialogs, evidence tabs, and animations.
- `public/assets/`: project images, certificates, and the résumé PDF.

This is a static site with no build step. Open `index.html` in a browser or serve the repository with a local static HTTP server.

## Content conventions

- Use first person for personal contributions and “the team” for shared achievements.
- Use sentence case for descriptive headings and project titles. Preserve official organization, competition, and certificate names.
- Lead with four featured projects (YUDHA, Lexara, CORA, and Neurokit), then Socratix, fish-freshness research, and SPARK. Additional projects and applied studies follow in the archive.
- Keep Selected Work curated. Order projects within each archive group by their latest project date, newest first; place undated entries after dated projects and preserve the existing order for ties.
- More Projects uses equal-size cards in three desktop columns, two tablet columns, and one mobile column, with matching thumbnail proportions.
- Lead project cards with the title and adjacent date. Group project topics with technologies below the description; omit section-number captions and case-study labels.
- In Experience, use the role as the main heading. Keep achievement divisions with the competition name in the left column.
- Certificate cards lead with the course name as the largest text and show the provider and locally stored logos below. Experience and Education use the supplied organization logos beside institution names.
- Give each detailed project a concise summary followed by **Problem**, **My role**, **Approach**, and **Result**. Add technical decisions or recognition where useful.
- State evaluation scope alongside metrics. Keep completed work, prototypes, and planned capabilities distinct.
- Use **View project**, **Source code**, **Live demo**, and **Certificate PDF** consistently. Use **Landing page** when the link leads to a product introduction.
- Show project dates as `MON–MON YYYY` and order certificates by completion date, newest first.
- Preserve project IDs so shared links continue to open the right project.
- The introduction uses `public/assets/portfolio/me.png` as the full-width identity banner. Edit its about copy, expertise, and education cards in `#profile`; keep education details consistent with `#education`.
- Featured projects use `.featured-stack` and `.featured-project`. Their desktop panels layer during scrolling; tablet, mobile, and reduced-motion layouts use ordinary document flow. Project dialogs support previous/next browsing and retain their existing shareable anchors.

## Before publishing

Check local assets and anchors, desktop and mobile layouts, both themes, navigation, project dialogs, and evidence tabs. Verify that the résumé and certificates open correctly.

Originally created for the TIK2032 course project.
