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
- Lead with four featured projects (YUDHA, Lexara, CORA, and Neurokit). Show the personal contribution and the outcome on each card. Keep the remaining projects under Browse all projects.
- Lead the archive with Socratix, fish-freshness research, and SPARK. Order other projects within each archive group by their latest project date, newest first. Place undated entries after dated projects and preserve the existing order for ties.
- The archive uses equal-size cards in three desktop columns, two tablet columns, and one mobile column, with matching thumbnail proportions.
- Lead project cards with the title and adjacent date. Group project topics with technologies below the description; omit section-number captions and case-study labels.
- In Experience, use the role as the main heading. Keep achievement divisions with the competition name in the left column.
- Achievement cards show the title, small date, issuer logo and name, then the explanation. University-selection entries remain logo-free; ministry logos fill their square frames without padding.
- Certificate cards lead with the course name as the largest text and show the provider and locally stored logos below. Experience and Education use the supplied organization logos beside institution names.
- Give each detailed project a concise summary followed by **Problem**, **My role**, **Approach**, and **Result**. Add technical decisions or recognition where useful.
- State evaluation scope alongside metrics. Keep completed work, prototypes, and planned capabilities distinct.
- Use **Read case study**, **Source code**, **Live demo**, and **Certificate PDF** consistently. Use **Web prototype** for a web prototype and **Landing page** for a product introduction.
- Show project dates as `MON–MON YYYY` and order certificates by completion date, newest first.
- Preserve project IDs so shared links continue to open the right project.
- The introduction leads with a text name and role beside the owner-supplied collage at `public/assets/portfolio/me.png`. Keep that image unchanged unless the owner supplies a replacement. Edit the introduction in `#profile` and expertise/education in `#background` and `#education`.
- Featured projects use `.featured-stack` and `.featured-project`. Their desktop panels layer during scrolling; tablet, mobile, and reduced-motion layouts use ordinary document flow. Project dialogs support previous/next browsing and retain their existing shareable anchors.
- Featured project frames use a shared neutral palette. Real project imagery retains its own colors. Keep headings in Playfair Display, reading text in Inter, and dates/technical metadata in Geist Mono.
- Experience leads with one photo per role; native disclosures retain additional photos. Recognition leads with national results, with international and university results under “More competition results”. Certificates show the four most recent entries before the expandable remainder.
- YUDHA’s architecture walkthrough lives inside its case study. Its explanation remains visible without JavaScript; enhanced tabs support arrow keys, Home, and End. Keep its claims aligned with the documented implementation.
- Preserve the existing hover and scroll motion: pointer tilt, image parallax, heading/card reveals, hover feedback, and desktop card stacking retain their original timing and behavior. The introduction and shared image/title transition into project details are separate enhancements. Honor reduced-motion preferences.

## Before publishing

Check local assets and anchors, desktop and mobile layouts, both themes, navigation, project dialogs, and evidence tabs. Verify that the résumé and certificates open correctly.

For the browser regression check, install development-only tools with `npm install --no-save --package-lock=false --ignore-scripts puppeteer-core axe-core`, then run `node scripts/verify-portfolio.mjs`. Chrome or Edge must be installed; set `CHROME_PATH` if needed. The check saves screenshots and its results under `reports/portfolio-refinement/` (or the directory passed as the first argument), and checks responsive overflow, project history/focus, keyboard walkthrough controls, disclosures, both themes, reduced motion, and the no-JavaScript fallback. It does not publish the site.

Originally created for the TIK2032 course project.
