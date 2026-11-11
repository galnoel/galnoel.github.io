import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.resolve(process.argv[2] || 'reports/portfolio-refinement');
fs.mkdirSync(out, { recursive: true });
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.ico': 'image/x-icon' };
const server = http.createServer((request, response) => {
    const relative = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (relative === '/' ? '/index.html' : relative));
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
        response.writeHead(404).end();
        return;
    }
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(response);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const url = `http://127.0.0.1:${server.address().port}/`;
const executablePath = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p => p && fs.existsSync(p));
let browser;
const results = { checks: [], layouts: [], accessibility: [], errors: [] };
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
function pass(name) { results.checks.push(name); console.log('PASS ' + name); }
try {
    browser = await puppeteer.launch({ executablePath, headless: true, args: ['--no-first-run', '--disable-gpu'] });
    const page = await browser.newPage();
    page.on('pageerror', error => results.errors.push(error.message));
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    await wait(800);
    const integrity = await page.evaluate(() => {
        const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
        return {
            duplicates: ids.filter((id, i) => ids.indexOf(id) !== i),
            brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href').slice(1)).filter(id => id && !document.getElementById(id)),
            order: [...document.querySelectorAll('main > section')].map(el => el.id),
            photos: document.querySelectorAll('.experience-feature img').length,
            certificates: document.querySelectorAll('.certificate-card').length,
            hero: document.querySelector('.about-banner img').getAttribute('src')
        };
    });
    assert.deepEqual(integrity.duplicates, []);
    assert.deepEqual(integrity.brokenAnchors, []);
    assert.deepEqual(integrity.order, ['profile', 'work', 'experience', 'recognition', 'background', 'certificates', 'contact']);
    assert.equal(integrity.photos, 3);
    assert.equal(integrity.certificates, 8);
    assert.equal(integrity.hero, 'public/assets/portfolio/me.png');
    pass('Page order, preserved hero, all certificates, unique IDs, and internal anchors');

    for (const [width, height] of [[1440, 900], [1024, 768], [768, 1024], [390, 844], [320, 740]]) {
        await page.setViewport({ width, height });
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await wait(220);
        const layout = await page.evaluate(() => ({ width: innerWidth, contentWidth: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight }));
        results.layouts.push(layout);
        assert.ok(layout.contentWidth <= width, `Page overflows at ${width}: ${layout.contentWidth}`);
        await page.screenshot({ path: path.join(out, `hero-${width}.png`) });
        if ([1440, 390].includes(width)) {
            for (const section of ['work', 'experience', 'recognition', 'background']) {
                await page.$eval('#' + section, el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
                await wait(1200);
                await page.screenshot({ path: path.join(out, `${section}-${width}.png`) });
            }
        }
    }
    pass('No page overflow at 1440, 1024, 768, 390, and 320px');

    await page.setViewport({ width: 1440, height: 900 });
    await page.$eval('#project-yudha', el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await wait(1200);
    const panel = await page.$('.featured-project-panel');
    const bounds = await panel.boundingBox();
    await page.mouse.move(bounds.x + bounds.width * 0.75, bounds.y + bounds.height * 0.3);
    assert.notEqual(await panel.evaluate(el => el.style.getPropertyValue('--tilt-x')), '0deg');
    assert.equal(await page.$eval('#project-yudha .project-thumbnail img', el => el.classList.contains('motion-parallax')), true);
    assert.equal(await page.$eval('#work .section-heading', el => el.classList.contains('is-visible')), true);
    assert.ok(await page.$('#work .kinetic-word'));
    pass('Original pointer tilt, image parallax, heading reveal, and scroll effects remain active');
    const scrollBefore = await page.evaluate(() => scrollY);
    await page.click('#project-yudha .project-card-action');
    await page.waitForFunction(() => document.querySelector('#project-dialog').dataset.motion === 'open');
    await wait(450);
    assert.ok(await page.$eval('#project-dialog', el => el.open));
    assert.equal(await page.evaluate(() => location.hash), '#project-yudha');
    assert.equal(await page.$eval('[data-system-step="0"]', el => el.getAttribute('aria-selected')), 'true');
    await page.$eval('[data-system-walkthrough]', el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.focus('[data-system-step="0"]');
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.$eval('[data-system-step="1"]', el => el.getAttribute('aria-selected')), 'true');
    await page.keyboard.press('End');
    assert.equal(await page.$eval('[data-system-step="3"]', el => el.getAttribute('aria-selected')), 'true');
    assert.equal(await page.$$eval('[data-system-panel]:not([hidden])', els => els.length), 1);
    await page.screenshot({ path: path.join(out, 'yudha-walkthrough.png') });
    pass('Project opens with its shared anchor; walkthrough supports arrows and End');

    await page.addScriptTag({ path: path.join(root, 'node_modules/axe-core/axe.min.js') });
    let accessibility = await page.evaluate(() => axe.run(document.querySelector('#project-dialog'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
    results.accessibility.push({ view: 'project dialog', violations: accessibility.violations });
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('#project-dialog').open);
    await wait(450);
    assert.ok(Math.abs(await page.evaluate(() => scrollY) - scrollBefore) < 3, 'Closing should preserve scroll position');
    assert.equal(await page.evaluate(() => document.activeElement === document.querySelector('#project-yudha > summary')), true);
    pass('Escape closes project and restores the card focus and scroll position');

    await page.goForward({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.querySelector('#project-dialog').open);
    await wait(400);
    await page.click('[data-project-next]');
    await page.waitForFunction(() => document.querySelector('#project-dialog-title').textContent.includes('Lexara'));
    await wait(400);
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('#project-dialog').open);
    pass('Forward reopens the case study; next-project navigation and close work');

    await wait(500);
    async function openDisclosure(selector) {
        await page.$eval(selector, el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
        await wait(1200);
        await page.click(selector);
        await wait(100);
    }
    await openDisclosure('.certificate-extras > summary');
    assert.equal(await page.$eval('.certificate-extras', el => el.open), true);
    await openDisclosure('.recognition-more > summary');
    assert.equal(await page.$eval('.recognition-more', el => el.open), true);
    await openDisclosure('.experience-more > summary');
    assert.equal(await page.$eval('.experience-more', el => el.open), true);
    pass('Certificate, recognition, and photo disclosures open');

    for (const theme of ['light', 'dark']) {
        await page.evaluate(theme => setTheme(theme), theme);
        await wait(250);
        accessibility = await page.evaluate(() => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
        results.accessibility.push({ view: theme, violations: accessibility.violations });
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        await page.screenshot({ path: path.join(out, `theme-${theme}.png`) });
    }

    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(url + '#project-yudha', { waitUntil: 'networkidle2' });
    await page.waitForFunction(() => document.querySelector('#project-dialog').open);
    await page.$eval('[data-system-walkthrough]', el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.click('[data-system-step="2"]');
    await wait(100);
    assert.equal(await page.$eval('[data-system-step="2"]', el => el.getAttribute('aria-selected')), 'true');
    assert.equal(await page.$eval('.featured-project', el => getComputedStyle(el).position), 'relative');
    // Existing reduced-motion CSS uses 0.001ms to settle transitions. Check that
    // no perceptible motion remains, rather than counting those instant finishes.
    results.reducedMotion = await page.evaluate(() => document.getAnimations()
        .filter(a => a.playState === 'running')
        .map(a => ({ duration: a.effect.getComputedTiming().activeDuration, target: a.effect.target?.className })));
    assert.equal(results.reducedMotion.filter(a => a.duration > 1).length, 0);
    await page.screenshot({ path: path.join(out, 'walkthrough-mobile-reduced.png') });
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => !document.querySelector('#project-dialog').open);
    assert.equal(await page.evaluate(() => location.hash), '#work');
    await page.click('[data-menu-toggle]');
    assert.equal(await page.$eval('[data-menu-toggle]', el => el.getAttribute('aria-expanded')), 'true');
    await page.click('#primary-nav a[href="#background"]');
    assert.equal(await page.$eval('[data-menu-toggle]', el => el.getAttribute('aria-expanded')), 'false');
    pass('Mobile menu, reduced motion, direct project link, and direct-link close');

    await page.goto(url + '#cert-llm', { waitUntil: 'networkidle2' });
    assert.equal(await page.$eval('.certificate-extras', el => el.open), true);
    pass('Deep links reveal supporting credentials');

    const staticPage = await browser.newPage();
    await staticPage.setJavaScriptEnabled(false);
    await staticPage.setViewport({ width: 390, height: 844 });
    await staticPage.goto(url, { waitUntil: 'networkidle2' });
    await staticPage.click('#project-yudha > summary');
    assert.equal(await staticPage.$eval('#project-yudha', el => el.open), true);
    assert.equal(await staticPage.$$eval('[data-system-panel]', els => els.every(el => !el.hidden)), true);
    assert.equal(await staticPage.$eval('.system-steps', el => el.hidden), true);
    pass('Without JavaScript, project details and all walkthrough explanations are readable');
    assert.deepEqual(results.errors, []);
    pass('No browser JavaScript errors');
    const violationCount = results.accessibility.reduce((n, scan) => n + scan.violations.length, 0);
    console.log(`Accessibility: ${violationCount} rule violations across ${results.accessibility.length} scans`);
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2));
    assert.equal(violationCount, 0, 'Review accessibility findings in results.json');
} catch (error) {
    results.failure = error.stack;
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(results, null, 2));
    throw error;
} finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
}
