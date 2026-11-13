# Galnoel Peter Rindengan

Bilingual engineering portfolio for GitHub Pages at [galnoel.github.io](https://galnoel.github.io/).

## Build and preview

Run `node scripts/build-site.mjs` from the repository root. The generator reads the master profile and Indonesian copy, then writes both homepages, all localized case studies, the sitemap, and the 404 page. Commit the generated HTML alongside source edits. GitHub Pages serves the repository root, so publishing requires no build service or runtime.

Serve the repository root with a local static server to preview. The site uses root-relative links, and opening the HTML directly from disk will break those links.

- `GALNOEL_MASTER_PROFILE.md` records the source facts, contributions, outcomes, and evidence.
- `site/content.mjs` reads the profile and supplies portfolio summaries and interface labels. `site/indonesian.mjs` holds the Indonesian copy. `site/evidence.mjs` defines the interactive project walkthroughs.
- `public/assets/site/` holds the current CSS, browser behavior, and licensed typeface.
- `public/assets/portfolio/og/` contains the localized 1200 × 630 share images. Update the relevant image when a featured project's name, description, or visual changes.

The archive contains 12 projects in addition to the five selected cases. Ordinary case links open the corresponding static page. The homepage progressively enhances those links into dialogs with browser history. Legacy section and project fragments resolve to their corresponding entries. The old CSS, JavaScript, media, and certificate URLs remain available for existing links.

## Verify

With Node.js and Chrome or Edge installed, install the development-only verification tools:

```sh
npm install --no-save --package-lock=false --ignore-scripts puppeteer-core axe-core
node scripts/build-site.mjs
node scripts/verify-portfolio.mjs
```

Set `CHROME_PATH` if the browser is installed outside the default locations. The verification saves screenshots and `results.json` to `reports/portfolio-refinement/`. If the planning baseline is available at `docs/portfolio-compatibility-baseline.json`, it also checks the original asset bytes and legacy IDs.

Originally created for the TIK2032 course project.
