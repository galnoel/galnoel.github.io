import { launch } from './.agents/skills/replica/scripts/lib/capture.mjs';
import { mkdir } from 'node:fs/promises';
await mkdir('.replica/inspiration-refresh', { recursive: true });
const browser = await launch();
try {
    for (const [name, url] of [['louis-home', 'https://louisvigo.com/']]) {
        const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
        try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
            await page.waitForTimeout(7000);
            await page.screenshot({ path: `.replica/inspiration-refresh/${name}.png` });
            for (const selector of ['#about', '#works', '#project-school-of-parenting']) {
                await page.locator(selector).evaluate(el => el.scrollIntoView({behavior:'instant', block:'start'}));
                await page.waitForTimeout(1600);
                await page.screenshot({path: `.replica/inspiration-refresh/louis-${selector.slice(1)}.png`});
                console.log(JSON.stringify({selector, styles: await page.locator(selector).evaluate(el => {
                    const c = getComputedStyle(el); const h = el.querySelector('h2,h3'); const hc = getComputedStyle(h);
                    return { background:c.backgroundColor, color:c.color, font:hc.font, padding:c.padding, hBox:h.getBoundingClientRect().toJSON() };
                })}));
            }
            console.log(JSON.stringify({ name, data: await page.evaluate(() => ({
                title: document.title,
                headings: [...document.querySelectorAll('h1,h2,h3')].slice(0, 25).map(el => ({ tag: el.tagName, text: el.textContent.trim().slice(0, 100), cls: el.className, id: el.id })),
                sections: [...document.querySelectorAll('section,dialog,[role="dialog"]')].map(el => ({ tag:el.tagName, id:el.id, cls:el.className })),
                target: document.getElementById('project-school-of-parenting')?.outerHTML.slice(0, 3500),
                animations: document.getAnimations().slice(0, 15).map(a => ({ target: a.effect?.target?.className, timing: a.effect?.getTiming() })),
            })) }));
            if (name === 'albert') {
                const projects = page.locator('.stack').first();
                if (await projects.count()) { await projects.scrollIntoViewIfNeeded(); await page.waitForTimeout(1200); await page.screenshot({path: '.replica/inspiration-refresh/albert-projects.png'}); }
            }
        } catch (error) { console.log(JSON.stringify({name, error: error.message})); }
        await page.close();
    }
} finally { await browser.close(); }
