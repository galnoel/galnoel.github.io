import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import { projects, language, origin } from '../site/content.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.resolve(process.argv[2] || 'reports/portfolio-refinement');
mkdirSync(output, { recursive: true });
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png',
    '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.xml': 'application/xml' };
const server = http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + pathname);
    if (pathname === '/') file = path.join(root, 'index.html');
    else if (file.startsWith(root) && existsSync(file) && statSync(file).isDirectory()) file = path.join(file, 'index.html');
    const found = file.startsWith(root) && existsSync(file) && statSync(file).isFile();
    if (!found) file = path.join(root, '404.html');
    response.writeHead(found ? 200 : 404, { 'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    createReadStream(file).pipe(response);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const url = 'http://127.0.0.1:' + server.address().port;
const baselineFile = path.join(root, 'docs', 'portfolio-compatibility-baseline.json');
const baseline = existsSync(baselineFile) && JSON.parse(readFileSync(baselineFile, 'utf8'));
const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/google-chrome', '/usr/bin/chromium']
    .find(file => file && existsSync(file));
const report = { checks: [], layouts: [], contrast: {}, accessibility: [], metrics: [], errors: [] };
const axeSource = readFileSync(new URL('axe.min.js', import.meta.resolve('axe-core')), 'utf8');
const pass = name => { report.checks.push(name); console.log('PASS ' + name); };
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let browser;
try {
    const pages = ['/', '/id/', ...projects.flatMap(project => ['/projects/' + project.slug + '/', '/id/projects/' + project.slug + '/'])];
    const referencedFiles = new Set();
    const socialImages = new Set();
    const sitemap = await fetch(url + '/sitemap.xml').then(response => response.text());
    const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
    assert.deepEqual(listed.sort(), pages.map(route => origin + route).sort());
    for (const route of pages) {
        const response = await fetch(url + route);
        assert.equal(response.status, 200, route);
        const html = await response.text();
        const id = route.startsWith('/id/');
        const equivalent = id ? route.slice(3) : '/id' + route;
        assert.ok(html.includes('<html lang="' + (id ? 'id' : 'en') + '"'));
        assert.ok(html.includes('<link rel="canonical" href="' + origin + route + '">'), route);
        assert.ok(html.includes('hreflang="' + (id ? 'en' : 'id') + '" href="' + origin + equivalent + '">'), route);
        assert.ok(html.includes('hreflang="x-default" href="' + origin + (id ? equivalent : route) + '">'), route);
        assert.equal((html.match(/<h1\b/g) || []).length, 1);
        assert.ok(html.match(/<meta name="description" content="[^"]+"/));
        assert.ok(html.match(/<meta property="og:image:alt" content="[^"]+"/));
        const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1])['@graph'];
        assert.ok(graph.some(node => node['@type'] === (route.includes('/projects/') ? 'WebPage' : 'ProfilePage')));
        const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
        assert.equal(ids.length, new Set(ids).size, route + ' duplicate IDs');
        for (const match of html.matchAll(/(?:href|src)="(\/(?:public|images)\/[^"]+)"/g)) referencedFiles.add(match[1]);
        socialImages.add(new URL(html.match(/property="og:image" content="([^"]+)"/)[1]).pathname);
        if (route.includes('/projects/')) assert.match(html, /class="case-lead">[^<]{35,}/);
        else {
            assert.equal((html.match(/class="featured-project"/g) || []).length, 5);
            assert.equal((html.match(/class="archive-project"/g) || []).length, 12);
            assert.equal((html.match(/class="experience-item"/g) || []).length, 3);
            assert.equal((html.match(/class="certificate-card"/g) || []).length, 8);
            assert.equal((html.match(/class="award-item"/g) || []).length, 9);
            if (baseline) assert.deepEqual(baseline.all_dom_ids.filter(id => !ids.includes(id)), []);
        }
    }
    assert.equal((await fetch(url + '/projects/unknown-project/')).status, 404);
    assert.equal(socialImages.size, 12);
    for (const href of [...referencedFiles, ...socialImages]) {
        const response = await fetch(url + href, { method: 'HEAD' });
        assert.equal(response.status, 200, href);
        if (socialImages.has(href)) assert.equal(response.headers.get('content-type'), 'image/jpeg');
    }
    pass('36 static routes, bilingual metadata, structured data, sitemap, all section counts, 404, and local links');

    if (baseline) {
        for (const record of baseline.public_assets) {
            const response = await fetch(url + record.url);
            assert.equal(response.status, 200, record.url);
            assert.equal(createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex'), record.sha256, record.url);
        }
        pass(baseline.public_assets.length + ' legacy assets served byte-for-byte at their original URLs');
    }

    browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-first-run', '--disable-gpu'] });
    const page = await browser.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    const shot = name => page.screenshot({ path: path.join(output, name + '.png') });
    const open = async route => {
        await page.goto(url + route, { waitUntil: 'networkidle0' });
        await page.evaluate(() => document.fonts.ready);
    };
    const noOverflow = async () => assert.ok(await page.evaluate(() =>
        document.documentElement.scrollWidth <= innerWidth &&
        (!document.querySelector('dialog[open]') || document.querySelector('.dialog-scroll').scrollWidth <= document.querySelector('.dialog-scroll').clientWidth + 1)));
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    for (const [width, height] of [[1440, 900], [1024, 768], [768, 1024], [390, 844], [320, 568]]) {
        await page.setViewport({ width, height });
        for (const locale of ['en', 'id']) {
            await open(locale === 'id' ? '/id/' : '/');
            await noOverflow();
            const text = await page.$$eval('.disciplines li', elements => elements.map(el => el.textContent));
            assert.deepEqual(text, language[locale].disciplines);
            report.layouts.push({ width, height, locale });
            if ([1440, 390].includes(width)) {
                await shot(locale + '-light-' + width);
                await page.click('[data-theme-toggle]');
                await shot(locale + '-dark-' + width);
                await page.click('[data-theme-toggle]');
                if ((locale === 'en' && width === 1440) || (locale === 'id' && width === 390)) {
                    for (const id of ['work', 'experience', 'recognition', 'certificates', 'contact']) {
                        await page.$eval('#' + id, element => element.scrollIntoView());
                        await sleep(80);
                        await shot(locale + '-' + id + '-' + width);
                    }
                }
            }
        }
    }
    pass('Both languages fit at 1440, 1024, 768, 390, and 320 px');
    await open('/');
    const visuals = await page.evaluate(() => ({
        mark: document.querySelector('.wordmark-icon').getAttribute('src'),
        favicon: document.querySelector('link[rel="icon"]').getAttribute('href'),
        projects: document.querySelectorAll('#work article .project-media img').length,
        selected: [...document.querySelectorAll('.featured-project')].map(card => card.id),
        sparkCover: document.querySelector('#project-spark .project-media img').getAttribute('src'),
        employers: document.querySelectorAll('.experience-item .identity-logo img').length,
        awards: [...document.querySelectorAll('.award-item')].map(row => [
            row.querySelector('.award-image img')?.getAttribute('src'), Boolean(row.querySelector('.identity-logo img'))
        ]),
        providers: document.querySelectorAll('.certificate-card:has(.provider-logo img)').length,
        pimnas: document.querySelector('#recognition-2 .award-result').textContent,
        titleFirst: [...document.querySelectorAll('#work .project-copy, #experience .experience-copy, #recognition .award-copy, .certificate-card')]
            .every(row => row.firstElementChild.matches('h3') || row.firstElementChild.firstElementChild?.matches('h3, h4'))
    }));
    assert.equal(visuals.mark, visuals.favicon);
    assert.equal(visuals.projects, 17);
    assert.deepEqual(visuals.selected, ['project-yudha', 'project-legal-ai', 'project-cora', 'project-neurokit', 'project-gemastik']);
    assert.match(visuals.sparkCover, /\/spark-landing-page\.jpg$/);
    assert.equal(visuals.employers, 3);
    assert.equal(visuals.providers, 8);
    assert.equal(new Set(visuals.awards.map(([image]) => image)).size, 9);
    assert.ok(visuals.awards.every(([image, issuer]) => image && issuer));
    assert.match(visuals.pimnas, /3rd place.*Bronze-equivalent/);
    assert.ok(visuals.titleFirst);
    pass('Matching brand icons, title-first hierarchy, project images, experience and provider logos, and individual award images');
    const unfilled = await page.$$eval('.featured-project .project-media, .award-image', frames =>
        frames.filter(frame => {
            const image = frame.querySelector('img');
            const outer = frame.getBoundingClientRect();
            const inner = image.getBoundingClientRect();
            return outer.width > 0 && (getComputedStyle(image).objectFit !== 'cover' ||
                Math.abs(inner.width - outer.width) > 1 || Math.abs(inner.height - outer.height) > 1);
        }).map(frame => frame.closest('article').id)
    );
    assert.deepEqual(unfilled, []);
    pass('Newest-first selected projects and edge-to-edge project and award images');

    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
    await page.setViewport({ width: 1440, height: 900 });
    await open('/');
    await page.waitForSelector('.featured-list[data-stacking]');
    await page.evaluate(() => {
        const stack = document.querySelector('.featured-list');
        window.scrollBy(0, stack.getBoundingClientRect().top + 320);
    });
    await page.waitForFunction(() => {
        const card = document.querySelector('.featured-project');
        return Math.abs(card.getBoundingClientRect().top - parseFloat(getComputedStyle(card).top)) < 2 &&
            parseFloat(getComputedStyle(card.querySelector('.featured-panel')).scale) < .99;
    });
    const firstRole = '.experience-item:first-child';
    const firstLogo = firstRole + ' .experience-logo img';
    const positionRole = viewportFraction => page.$eval(firstRole, (row, fraction) => {
        const { top, height } = row.getBoundingClientRect();
        window.scrollBy(0, top + height / 2 - innerHeight * fraction);
    }, viewportFraction);
    await positionRole(.76);
    await page.waitForFunction(selector => getComputedStyle(document.querySelector(selector)).filter === 'grayscale(1)', {}, firstLogo);
    await positionRole(.55);
    await page.waitForFunction(selector => getComputedStyle(document.querySelector(selector)).filter === 'none', {}, firstLogo);
    assert.equal(await page.$eval('.experience-item:nth-child(2) .experience-logo img', logo => getComputedStyle(logo).filter), 'grayscale(1)');
    await page.waitForSelector('.experience-timeline[data-in-progress] .timeline-marker', { visible: true });
    await positionRole(.76);
    await page.waitForFunction(selector => getComputedStyle(document.querySelector(selector)).filter === 'grayscale(1)', {}, firstLogo);
    await page.$eval('#recognition', el => el.scrollIntoView());
    await page.waitForSelector('.award-item[data-entered]');
    await page.hover('#recognition-1 .award-image');
    await page.waitForFunction(() => parseFloat(getComputedStyle(document.querySelector('#recognition-1 .award-image img')).scale) > 1.02);
    await page.$eval('#work', el => el.scrollIntoView());
    await page.waitForSelector('#work .section-heading[data-entered]');
    assert.equal(await page.$eval('.award-item', card => card.hasAttribute('data-entered')), true);
    assert.equal(await page.$('main :is(h1, h2, h3, h4, p)[data-scroll-reveal]'), null);
    await page.click('#all-projects > summary');
    await page.$eval('.archive-project', el => el.scrollIntoView({ block: 'center' }));
    await page.waitForSelector('.archive-project[data-entered]');
    await page.$eval('#certificates', el => el.scrollIntoView());
    await page.waitForSelector('.certificate-card[data-entered]');
    await page.hover('.certificate-card');
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.certificate-card')).translate !== 'none');
    await page.$eval('#contact', el => el.scrollIntoView());
    await page.waitForSelector('.contact-grid[data-entered]');
    await page.goto(url + '/projects/yudha/', { waitUntil: 'networkidle0' });
    await page.$eval('.case-body > section', el => el.scrollIntoView({ block: 'center' }));
    await page.waitForSelector('.case-body > section[data-entered]');
    await open('/');
    await page.setViewport({ width: 390, height: 844 });
    await page.waitForSelector('.featured-list[data-stacking]');
    await page.setViewport({ width: 390, height: 600 });
    await page.waitForSelector('.featured-list[data-stacking]', { hidden: true });
    await page.setViewport({ width: 1440, height: 900 });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.waitForSelector('.featured-list[data-stacking]', { hidden: true });
    await page.waitForFunction(selector => getComputedStyle(document.querySelector(selector)).filter === 'none', {}, firstLogo);
    pass('Grouped one-time reveals, card hover, responsive stacking, and reduced motion');

    await page.setViewport({ width: 720, height: 450, deviceScaleFactor: 2 });
    await open('/id/');
    await noOverflow();
    await page.click('#project-neurokit-action');
    await page.waitForSelector('dialog[open] [data-slug="neurokit"]');
    await noOverflow();
    await page.click('dialog [data-close]');
    await page.waitForSelector('dialog[open]', { hidden: true });
    await page.setViewport({ width: 320, height: 568 });
    pass('Indonesian homepage and overlay reflow in a 720 × 450 CSS viewport at 2× scale');
    await page.click('.menu-control');
    assert.equal(await page.$eval('.menu-control', el => el.getAttribute('aria-expanded')), 'true');
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), '#work');
    await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(() => document.activeElement.className.includes('menu-control')), true);
    await page.click('[data-theme-toggle]');
    await page.reload({ waitUntil: 'networkidle0' });
    assert.equal(await page.$eval('html', el => el.dataset.theme), 'dark');
    await page.click('[data-theme-toggle]');
    pass('Mobile menu and Escape focus return, light default, theme persistence');

    for (const href of socialImages) {
        const dimensions = await page.evaluate(async source => {
            const image = new Image();
            image.src = source;
            await image.decode();
            return [image.naturalWidth, image.naturalHeight];
        }, href);
        assert.deepEqual(dimensions, [1200, 630], href);
    }
    pass('All 12 localized share images decode at 1200 × 630');

    const action = '#project-yudha-action';
    async function assertDialog(slug) {
        await page.waitForSelector('dialog[open] [data-slug="' + slug + '"]');
        await noOverflow();
        assert.deepEqual(await page.$$eval('[id]', nodes => {
            const ids = nodes.map(node => node.id);
            return ids.filter((id, index) => ids.indexOf(id) !== index);
        }), []);
    }
    await open('/');
    assert.equal(await page.$$('.about-tools img').then(icons => icons.length), 14);
    assert.equal(await page.$('.about-player iframe'), null);
    await page.$eval('#background', section => section.scrollIntoView({ block: 'center' }));
    await page.click('.about-photo');
    await page.waitForSelector('.about-music:not([hidden])');
    assert.equal(await page.$eval('.about-music h3', title => title.textContent), 'Katakan Saja');
    const musicSource = new URL(await page.$eval('.about-player iframe', frame => frame.src));
    assert.equal(musicSource.pathname, '/embed/ewT2dAvWZiU');
    assert.equal(musicSource.searchParams.get('controls'), '0');
    assert.equal(await page.$('.about-music a'), null);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    assert.ok(await page.$eval('.about-music', dock => {
        const bounds = dock.getBoundingClientRect();
        return scrollY === 0 && getComputedStyle(dock).position === 'fixed' && !dock.hidden &&
            Math.abs(bounds.left - 16) < 1 && Math.abs(innerHeight - bounds.bottom - 16) < 1 && bounds.width === 232;
    }));
    await page.click('[data-music-stop]');
    await page.waitForFunction(() => document.querySelector('.about-music').hidden && !document.querySelector('.about-player iframe'));
    pass('About record opens the Katakan Saja player, keeps it at the bottom left on scroll, and stops on demand');
    await page.setViewport({ width: 1440, height: 900 });
    await page.$eval(action, el => el.scrollIntoView({ block: 'center' }));
    const scroll = await page.evaluate(() => scrollY);
    await page.click(action);
    await assertDialog('yudha');
    assert.equal(new URL(page.url()).pathname, '/projects/yudha/');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'project-dialog-title');
    await shot('dialog-en-desktop');
    for (let i = 0; i < 16; i++) {
        await page.keyboard.press('Tab');
        assert.ok(await page.evaluate(() => document.querySelector('#project-dialog').contains(document.activeElement) || document.activeElement === document.body));
    }
    await page.keyboard.press('Escape');
    await page.waitForSelector('dialog[open]', { hidden: true });
    assert.equal(await page.evaluate(() => document.activeElement.id), 'project-yudha-action');
    assert.ok(Math.abs(await page.evaluate(() => scrollY) - scroll) < 2);
    await page.goForward({ waitUntil: 'domcontentloaded' });
    await assertDialog('yudha');
    await page.goBack({ waitUntil: 'domcontentloaded' });
    await page.waitForSelector('dialog[open]', { hidden: true });
    pass('Overlay route, keyboard focus, Escape, restored scroll, Back, and Forward');

    await open('/#yudha-panel-state');
    await assertDialog('yudha');
    await page.waitForSelector('dialog #yudha-panel-state:not([hidden])');
    await page.focus('dialog #yudha-step-state');
    await page.keyboard.press('End');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'yudha-step-resolve');
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.evaluate(() => document.activeElement.id), 'yudha-step-connect');
    await page.click('dialog [data-close]');
    await page.waitForSelector('dialog[open]', { hidden: true });
    assert.equal(new URL(page.url()).pathname, '/');
    await open('/?lang=id&project=legal-ai');
    await assertDialog('lexara');
    assert.equal(new URL(page.url()).pathname, '/id/projects/lexara/');
    await page.setViewport({ width: 320, height: 568 });
    await noOverflow();
    await page.setViewport({ width: 390, height: 720 });
    await shot('dialog-id-mobile');
    await page.click('dialog [hreflang="en"]');
    await page.waitForSelector('main [data-slug="lexara"]');
    assert.equal(new URL(page.url()).pathname, '/projects/lexara/');
    await page.click('.case-back');
    await page.waitForSelector('body[data-page="home"]');
    assert.equal(await page.$('dialog[open]'), null);
    await open('/projects/cora/#cora-flow');
    assert.equal(await page.$eval('#cora-flow-tab', tab => tab.getAttribute('aria-selected')), 'true');
    await page.reload({ waitUntil: 'networkidle0' });
    assert.equal(await page.$eval('#cora-flow-tab', tab => tab.getAttribute('aria-selected')), 'true');
    await page.click('header [hreflang="id"]');
    await page.waitForFunction(() => document.documentElement.lang === 'id');
    assert.equal(new URL(page.url()).hash, '#cora-flow');
    assert.equal(await page.$eval('#cora-flow-tab', tab => tab.getAttribute('aria-selected')), 'true');
    await open('/?project=unknown');
    assert.equal(await page.$('dialog[open]'), null);
    for (const target of ['all-projects', 'university-achievements', 'cert-azure-preparation']) {
        await open('/#' + target);
        assert.equal(await page.$eval('#' + target, el => el.closest('details').open), true);
    }
    pass('Legacy queries, fragments, nested evidence, direct routes and refresh, language switching, and disclosures');

    const noJs = await browser.newPage();
    await noJs.setJavaScriptEnabled(false);
    await noJs.goto(url + '/id/#project-socratix');
    assert.equal(await noJs.$eval('#all-projects', el => el.open), true);
    await noJs.click('#project-socratix-action');
    await noJs.waitForSelector('main [data-slug="socratix"]');
    assert.equal(await noJs.$$eval('[data-evidence-panel]', panels => panels.filter(el => !el.hidden).length), 4);
    assert.ok(await noJs.$('a[href*="socratix-v2-roadmap.pdf"]'));
    await noJs.close();
    pass('Archive navigation and full evidence remain available without JavaScript');

    async function audit(name) {
        await page.evaluate(axeSource);
        const results = await page.evaluate(() => window.axe.run({ runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }));
        report.accessibility.push({ name, violations: results.violations.map(({ id, nodes }) => ({ id, targets: nodes.map(node => node.target) })) });
        assert.deepEqual(report.accessibility.at(-1).violations, [], name);
    }
    await page.setViewport({ width: 1440, height: 900 });
    await open('/');
    await audit('English light homepage');
    await page.click('[data-theme-toggle]');
    await open('/id/');
    await audit('Indonesian dark homepage');
    await page.click('#project-cora-action');
    await assertDialog('cora');
    await audit('Indonesian dark CORA overlay');
    pass('Automated WCAG A/AA checks for both home themes and an open dialog');

    await page.click('dialog [data-close]');
    await page.waitForSelector('dialog[open]', { hidden: true });
    await page.bringToFront();
    await browser.defaultBrowserContext().overridePermissions(url, ['clipboard-read', 'clipboard-sanitized-write']);
    await page.click('[data-copy-email]');
    await page.waitForFunction(() => document.querySelector('[role="status"]').textContent.length > 0);
    assert.equal(await page.$eval('[role="status"]', el => el.textContent), language.id.copied);
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'rindengangalnoel@gmail.com');
    pass('Localized copy-email feedback and clipboard content');
    await browser.defaultBrowserContext().overridePermissions(url, []);
    await page.click('[data-copy-email]');
    await page.waitForFunction(text => document.querySelector('[role="status"]').textContent === text, {}, language.id.copyFailed);
    assert.equal(await page.evaluate(() => getSelection().toString()), 'rindengangalnoel@gmail.com');
    pass('Copy-email fallback keeps the address selected when clipboard permission is denied');

    const luminance = color => color.slice(1).match(/../g).map(hex => parseInt(hex, 16) / 255)
        .map((c, i) => (c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4) * [.2126, .7152, .0722][i])
        .reduce((sum, component) => sum + component, 0);
    const palettes = await page.evaluate(() => {
        const root = document.documentElement;
        const original = root.dataset.theme;
        const roles = ['ink', 'muted', 'purple', 'orange-text', 'blue', 'green-text'];
        const palettes = ['light', 'dark'].map(name => {
            root.dataset.theme = name;
            const style = getComputedStyle(root);
            const read = token => style.getPropertyValue('--' + token).trim().replace(/^#([a-f0-9])([a-f0-9])([a-f0-9])$/i, '#$1$1$2$2$3$3');
            return [name, Object.fromEntries(roles.map(role => [role, read(role)])), ['page', 'surface', 'soft'].map(read)];
        });
        root.dataset.theme = original;
        return palettes;
    });
    for (const [name, tokens, grounds] of palettes) {
        for (const [role, fg] of Object.entries(tokens)) {
            for (const bg of grounds) {
                const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
                const ratio = (a + .05) / (b + .05);
                report.contrast[[name, role, bg].join(' ')] = Number(ratio.toFixed(2));
                assert.ok(ratio >= 4.5, name + ' ' + role + ' on ' + bg + ': ' + ratio);
            }
        }
    }
    pass('Computed palette text contrast across all reading surfaces');

    const cdp = await page.createCDPSession();
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await page.evaluateOnNewDocument(() => {
        window.vitals = { lcp: 0, cls: 0 };
        new PerformanceObserver(list => {
            for (const entry of list.getEntries()) window.vitals.lcp = entry.startTime;
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver(list => {
            for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.vitals.cls += entry.value;
        }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
    await page.setViewport({ width: 390, height: 844 });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await open('/id/');
    await sleep(500);
    const lab = await page.evaluate(() => ({ ...window.vitals,
        lcp: Math.round(window.vitals.lcp), transfer: performance.getEntriesByType('resource').reduce((sum, entry) => sum + entry.transferSize, 0)
    }));
    report.metrics.push({ ...lab, conditions: 'Local Chromium, cold cache, 390 × 844, 150 ms RTT, 1.6 Mbps, 4× CPU slowdown' });
    assert.ok(lab.lcp > 0 && lab.lcp <= 2500 && lab.cls <= .1, JSON.stringify(lab));
    assert.deepEqual(report.errors, []);
    pass('Cold-load mobile performance sample: ' + JSON.stringify(lab));
} finally {
    writeFileSync(path.join(output, 'results.json'), JSON.stringify(report, null, 2));
    await browser?.close();
    server.closeAllConnections();
    server.close();
}
