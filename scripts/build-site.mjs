import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { asset, origin, portfolio, person, language, date, selectedProjects, projects, experience, awards, credentials } from '../site/content.mjs';
import { evidence, legacyEvidence, supplementalImages } from '../site/evidence.mjs';

const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const langs = ['en', 'id'];
const copy = (record, lang) => lang === 'id' ? record.idCopy : record.en;
const home = lang => lang === 'id' ? '/id/' : '/';
const route = (project, lang) => home(lang) + 'projects/' + project.slug + '/';
const caseTitle = p => [p.name, p.subject].filter(Boolean).join(' — ');
const projectByAnchor = new Map(projects.map(project => ['#' + project.id, project]));
const siteAssets = '/public/assets/site/';
const brandMark = siteAssets + 'brand-mark.svg';
const glyphs = {
    arrow: '<path d="M7 17 17 7M7 7h10v10"/>', next: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
    back: '<path d="M20 12H5m6-6-6 6 6 6"/>', down: '<path d="M12 4v15m-6-6 6 6 6-6"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>', close: '<path d="m6 6 12 12M18 6 6 18"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    moon: '<path d="M20.9 13.35A9 9 0 0 1 10.65 3.1 9 9 0 1 0 20.9 13.35Z"/>',
    menu: '<path d="M4 8h16M4 16h16"/>', mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    pin: '<path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2"/>'
};
const icon = name => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${glyphs[name]}</svg>`;
const photo = (src, alt, eager = false) => `<img src="${escape(src)}" alt="${escape(alt)}" decoding="async" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>`;
const logo = (file, style = '') => `<span class="identity-logo ${style}">${photo(asset(file), '')}</span>`;
const label = (text, lang) => language[lang].labels[text] || text;
const langLinks = (lang, project) => `<div class="languages">
        ${langs.map(code => `<a lang="${code}" hreflang="${code}" aria-label="${code === 'id' ? 'ID · Bahasa Indonesia' : 'EN · English'}" href="${project ? route(project, code) : home(code)}" ${code === lang ? 'aria-current="page"' : 'data-language-link'}>${code.toUpperCase()}</a>`).join('')}
    </div>`;

function listLinks(links, lang) {
    return links.map(({ label: text, href }) => {
        const project = projectByAnchor.get(href);
        const target = project ? route(project, lang) : href;
        return `<a class="text-link" href="${escape(target)}"${project ? ' data-case-link' : ''}>${escape(label(text, lang))} ${icon(project ? 'next' : 'arrow')}</a>`;
    }).join('');
}

function metadata(lang, { title, description, path, alternate, image, imageAlt, type, graph, noindex = false }) {
    const canonical = origin + path;
    const ogLocale = lang === 'id' ? 'id_ID' : 'en_US';
    return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
<meta name="theme-color" content="#FAFAFA">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">
${langs.map(code => `<link rel="alternate" hreflang="${code}" href="${origin + alternate(code)}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${origin + alternate('en')}">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:type" content="${type}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="${ogLocale}">
<meta property="og:locale:alternate" content="${lang === 'id' ? 'en_US' : 'id_ID'}">
<meta property="og:image" content="${origin + image}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${escape(imageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escape(title)}">
<meta name="twitter:description" content="${escape(description)}">
<meta name="twitter:image" content="${origin + image}">
<meta name="twitter:image:alt" content="${escape(imageAlt)}">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`}
<link rel="icon" href="${brandMark}" type="image/svg+xml">
<link rel="preload" href="${siteAssets}plus-jakarta-sans.woff2" as="font" type="font/woff2" crossorigin>
<script>document.documentElement.classList.add('js');try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='dark'?'dark':'light'}catch{}</script>
<link rel="stylesheet" href="${siteAssets}portfolio.css">
<script defer src="${siteAssets}portfolio.js"></script>`;
}

const navAnchors = { work: 'work', experience: 'experience', recognition: 'recognition', about: 'background', contact: 'contact' };
function header(lang, project, offHome = Boolean(project)) {
    const t = language[lang];
    return `<a class="skip" href="#main-content">${t.skip}</a>
<header class="site-header"><div class="wrap header-inner">
    <a class="wordmark" href="${home(lang)}"><img class="wordmark-icon" src="${brandMark}" alt="" width="34" height="34"><span>Galnoel</span></a>
    <nav class="primary-nav" id="primary-nav" aria-label="${t.nav}">
        ${Object.entries(navAnchors).map(([key, anchor]) => `<a href="${offHome ? home(lang) : ''}#${anchor}">${t[key]}</a>`).join('')}
    </nav>
    <div class="header-tools">
        ${langLinks(lang, project)}
        <button type="button" class="icon-button theme-control" hidden data-theme-toggle data-light="${t.light}" data-dark="${t.theme}" aria-label="${t.theme}">
            <span data-icon-light>${icon('sun')}</span><span data-icon-dark>${icon('moon')}</span>
        </button>
        <button type="button" class="icon-button menu-control" hidden aria-controls="primary-nav" aria-expanded="false" aria-label="${t.menu}">${icon('menu')}</button>
    </div>
</div></header>`;
}

function footer(lang) {
    const t = language[lang];
    return `<footer class="site-footer"><div class="wrap footer-inner">
    <a href="${home(lang)}#profile">${escape(person.name)}</a>
    <div><a href="${home(lang)}#all-projects">${t.archive}</a><a href="${home(lang)}#certificates">${t.certificates}</a><a href="${home(lang)}#contact">${t.contact}</a></div>
</div></footer>`;
}

const og = (lang, slug = 'portfolio') => portfolio + `og/${slug}-${lang}-v2.jpg`;
const personId = origin + '/#person';
const websiteId = origin + '/#website';
const baseGraph = [
    { '@type': 'Person', '@id': personId, name: person.name, url: origin + '/', image: origin + person.portrait,
        sameAs: [person.github, person.linkedin], alumniOf: { '@type': 'CollegeOrUniversity', name: person.school },
        knowsAbout: language.en.disciplines, award: awards.map(a => [a.result, a.event, a.track].join(' · ')) },
    { '@type': 'WebSite', '@id': websiteId, url: origin + '/', name: person.name, inLanguage: langs }
];
const document = (lang, head, body, kind) => `<!doctype html>
<!-- Generated by scripts/build-site.mjs -->
<html lang="${lang}" data-theme="light">
<head>
${metadata(lang, head)}
</head>
<body data-page="${kind}">
${body}
</body>
</html>
`;

function hero(lang) {
    const t = language[lang];
    const id = lang === 'id';
    return `<section class="hero wrap" id="profile" aria-labelledby="about-title">
    <div class="hero-copy">
        <h1 id="about-title"><span>Galnoel Peter</span> <span>Rindengan<span class="hero-period" aria-hidden="true">.</span></span></h1>
        <p class="hero-intro">${t.intro}</p>
        <ul class="disciplines">${t.disciplines.map(text => `<li><span aria-hidden="true"></span>${text}</li>`).join('')}</ul>
        <div class="hero-actions">
            <a class="button button-primary" href="#contact">${t.contactAction} ${icon('arrow')}</a>
            <a class="button button-outline" href="${person.resume}">${t.resume} ${icon('down')}</a>
        </div>
    </div>
    <div class="hero-visual">
        <figure class="hero-portrait">
            ${photo(supplementalImages.portrait, id ? 'Potret Galnoel Peter Rindengan' : 'Portrait of Galnoel Peter Rindengan', true)}
            <figcaption>${icon('pin')} Indonesia</figcaption>
        </figure>
        <a class="hero-proof" data-case-link href="${route(projects[0], lang)}">
            <span class="proof-thumb">${photo(asset('site-yudha-thumb.webp'), '', true)}</span>
            <span><strong>YUDHA <span>· ${id ? 'Tim juara kedua' : 'Team second place'}</span></strong><small>PIDI DIGDAYA x HACKATHON 2026</small></span>
            ${icon('arrow')}
        </a>
    </div>
</section>`;
}

function projectCard(project, lang, isFeatured) {
    const t = language[lang];
    const p = copy(project, lang);
    const href = route(project, lang);
    const image = photo(project.cover, project.slug === 'cora' ? p.images.at(-1).label : p.images[0]?.label);
    const media = `<a class="project-media" href="${href}" data-case-link aria-label="${escape(t.openProject + ' ' + p.name)}">${image}</a>`;
    const aliases = (legacyEvidence[project.slug] || []).map(id => `<span class="legacy-anchor" id="${id}" data-case-target="${href}"></span>`).join('');
    const body = `
        <div class="project-copy">
            <div class="title-line"><h3 id="${project.id}-title">${escape(p.name)}</h3>
                ${project.date ? `<p class="item-date">${escape(date(project.date, lang))}</p>` : ''}
            </div>
            ${p.subject ? `<p class="project-subject">${escape(p.subject)}</p>` : ''}
            <p class="project-summary" id="${project.id}-description">${escape(p.summary)}</p>
            ${p.outcome ? `<p class="project-outcome"><span aria-hidden="true"></span>${escape(p.outcome)}</p>` : ''}
            <div class="project-topics"><span>${escape(p.focus)}</span>${isFeatured ? project.tech.slice(0, 2).map(tech => `<span>${escape(tech)}</span>`).join('') : ''}</div>
            <a class="case-action ${isFeatured ? 'button' : ''}" id="${project.id}-action" href="${href}" data-case-link aria-label="${escape(t.case + ' · ' + p.name)}"><span>${t.case}</span>${icon('arrow')}</a>
        </div>`;
    return `<article class="${isFeatured ? 'featured-project' : 'archive-project'}" id="${project.id}" data-case-target="${href}">
        ${aliases}
        ${isFeatured ? `<div class="featured-panel">${body}${media}<span class="project-shade" aria-hidden="true"></span></div>` : media + body}
    </article>`;
}

function work(lang) {
    const t = language[lang];
    const archive = projects.filter(project => !project.featured);
    return `<section class="replica-wrap work" id="work" aria-labelledby="work-title">
    <header class="section-heading"><h2 id="work-title">${t.selected}</h2><p>${t.workIntro}</p></header>
    <div class="featured-list">${selectedProjects.map(project => projectCard(project, lang, true)).join('')}</div>
    <details id="all-projects" class="disclosure archive">
        <summary><span id="archive-title">${t.archive}</span><span class="summary-note">${archive.length} ${t.archiveCount}</span>${icon('chevron')}</summary>
        <div class="archive-list">${archive.map(project => projectCard(project, lang, false)).join('')}</div>
    </details>
</section>`;
}

function experiences(lang) {
    const t = language[lang];
    return `<section class="replica-wrap experience" id="experience" aria-labelledby="experience-title">
    <header class="section-heading"><h2 id="experience-title">${t.experience}</h2><p>${t.experienceIntro}</p></header>
    <div class="experience-timeline">
    <ol class="experience-list">${experience.map(record => {
        const id = lang === 'id';
        const alts = record.idCopy.alts;
        const body = id ? record.idCopy.body : record.body;
        return `<li class="experience-item" id="${record.id}">
            ${logo(record.logo, 'experience-logo')}
            <div class="experience-copy">
                <h3>${escape(id ? record.idCopy.role : record.role)} <span>· ${escape(record.employer)}</span></h3>
                <p>${escape(record.summary[id ? 1 : 0])}</p>
            </div>
            <div class="experience-when"><time>${escape(date(record.date, lang))}</time></div>
            <details class="inline-details experience-details">
                <summary>${t.experienceDetails}</summary>
                ${body.map(line => `<p>${escape(line)}</p>`).join('')}
                ${record.links.length ? `<div class="links">${listLinks(record.links, lang)}</div>` : ''}
                <div class="support-photos">${record.photos.map((image, i) => photo(image.href, id ? alts[i] : image.label)).join('')}</div>
            </details>
        </li>`;
    }).join('')}</ol>
    <div class="timeline-marker" aria-hidden="true"></div>
    </div>
</section>`;
}

function recognition(lang) {
    const t = language[lang];
    const id = lang === 'id';
    const issuer = record => id && record.issuer.startsWith('Ministry') ? 'Kementerian Pendidikan Tinggi, Sains, dan Teknologi (Kemendiktisaintek)' : record.issuer;
    const cards = records => records.map(record => `<article class="award-item" id="${record.id}">
        <div class="award-copy">
            <div class="title-line"><h4>${escape(record.event)}</h4><p class="item-date">${escape(date(record.date, lang))}</p></div>
            <p class="award-result">${escape(id ? record.resultId : record.result)}</p>
            <p class="award-context">${escape(id ? record.trackId : record.track)}</p>
            <p class="identity-line">${logo(record.logo, record.logo === 'achievement-colosseum.png' ? 'identity-logo-inverse' : '')}<span>${escape(issuer(record))}</span></p>
            <p>${escape(id ? record.summaryId : record.summary)}</p>
            ${record.links.length ? `<div class="links">${listLinks(record.links, lang)}</div>` : ''}
            ${record.photos.length > 1 ? `<details class="inline-details"><summary>${t.morePhotos}</summary><div class="support-photos">${record.photos.slice(1).map((image, index) => photo(image.href, id ? record.altsId[index + 1] : image.label)).join('')}</div></details>` : ''}
        </div>
        <figure class="award-image">${photo(record.id === 'recognition-1' ? supplementalImages.award : record.photos[0].href, id ? record.altsId[0] : record.photos[0].label)}</figure>
    </article>`).join('');
    const group = level => `<section class="award-group" id="${level}-achievements" aria-labelledby="${level}-heading">
        <h3 id="${level}-heading">${t[level]}</h3>${cards(awards.filter(record => record.level === level))}</section>`;
    return `<section class="wrap major recognition" id="recognition" aria-labelledby="recognition-title">
    <h2 id="recognition-title">${t.recognition}</h2>
    ${group('national')}
    <details class="disclosure"><summary><span>${t.otherResults}</span>${icon('chevron')}</summary>
        <div class="other-awards">${group('international')}${group('university')}</div>
    </details>
</section>`;
}

function background(lang) {
    const t = language[lang];
    const paths = ['lexara', 'fish-freshness', 'yudha', 'neurokit'];
    return `<section class="surface-band" id="background" aria-labelledby="background-title"><div class="wrap major about-grid">
    <div><h2 id="background-title">${t.about}</h2><p class="about-intro">${t.bio}</p>
        <article class="education" id="education">
            <h3>${t.education}</h3><p class="school">${person.school}</p><p>${t.degree}</p>
            <p>${person.years} · ${lang === 'id' ? 'IPK' : 'GPA'} ${lang === 'id' ? person.gpa.replaceAll('.', ',') : person.gpa}</p>
        </article>
    </div>
    <div class="capabilities" id="expertise-title">${t.disciplines.map((discipline, i) => {
        const project = projects.find(p => p.slug === paths[i]);
        return `<a class="capability" href="${route(project, lang)}" data-case-link>
            <span><strong>${discipline}</strong><span>${t.capabilities[i]}</span></span>${icon('arrow')}</a>`;
    }).join('')}</div>
</div></section>`;
}

function certificates(lang) {
    const t = language[lang];
    const cards = records => records.map(record => `<article class="certificate-card">
        <div class="title-line"><h3 id="${record.id}">${escape(record.title)}</h3><p class="item-date">${escape(date(record.date, lang))}</p></div>
        <p class="identity-line">${record.logos.map(file => logo(file, 'provider-logo')).join('')}<span>${escape(record.provider)}</span></p>
        <p>${record.id === 'cert-azure-preparation' ? t.prep : t.certificate}${record.duration ? ' · ' + escape(lang === 'id' ? record.duration.replace('hours', 'jam').replace('sessions', 'sesi') : record.duration) : ''}</p>
        <p>${escape(record.scope[lang === 'id' ? 1 : 0])}</p>
        <div class="links">${listLinks(record.links, lang)}${record.project ? listLinks([{ label: 'Related project', href: '#' + record.project }], lang) : ''}</div>
    </article>`).join('');
    return `<section class="wrap major" id="certificates" aria-labelledby="certificates-title">
        <h2 id="certificates-title">${t.certificates}</h2>
        <div class="certificate-grid">${cards(credentials.slice(0, 3))}</div>
        <details class="disclosure"><summary><span>${t.moreCredentials}</span>${icon('chevron')}</summary>
            <div class="certificate-grid">${cards(credentials.slice(3))}</div>
        </details>
    </section>`;
}

function contact(lang) {
    const t = language[lang];
    return `<section class="contact-band" id="contact" aria-labelledby="contact-title"><div class="wrap major contact-grid">
        <div><h2 id="contact-title">${t.hire}</h2><p>${t.contactText}</p></div>
        <div class="contact-actions">
            <a class="contact-address" href="mailto:${person.email}">${person.email}</a>
            <div class="contact-primary"><a class="button button-primary" href="mailto:${person.email}">${t.email} ${icon('mail')}</a>
            <button type="button" class="button button-outline" data-copy-email="${person.email}" data-success="${t.copied}" data-failed="${t.copyFailed}" hidden>${t.copy} ${icon('copy')}</button></div>
            <p class="copy-feedback" role="status"></p>
            <div class="links"><a class="text-link" href="${person.linkedin}">LinkedIn ${icon('arrow')}</a><a class="text-link" href="${person.github}">GitHub ${icon('arrow')}</a><a class="text-link" href="${person.resume}">${t.resume} ${icon('down')}</a></div>
        </div>
    </div></section>`;
}

function homePage(lang) {
    const t = language[lang];
    const title = `${person.name} | ${t.portfolio}`;
    const path = home(lang);
    const head = { title, path, description: t.description, alternate: home, type: 'website', image: og(lang), imageAlt: `${person.name} · ${t.disciplines.join(', ')}`,
        graph: [...baseGraph, { '@type': 'ProfilePage', '@id': origin + path, url: origin + path, name: title, inLanguage: lang, mainEntity: { '@id': personId }, isPartOf: { '@id': websiteId } }] };
    return document(lang, head, `${header(lang)}
<main id="main-content">
    ${hero(lang)}
    ${work(lang)}
    ${experiences(lang)}
    ${recognition(lang)}
    ${background(lang)}
    ${certificates(lang)}
    ${contact(lang)}
</main>
${footer(lang)}
<dialog id="project-dialog" class="project-dialog" aria-labelledby="project-dialog-title">
    <div class="dialog-scroll">
        <div class="case-toolbar"><span data-case-name></span>${langLinks(lang)}<button type="button" class="icon-button dialog-close" data-close aria-label="${t.close}">${icon('close')}</button></div>
        <div class="case-slot"></div>
    </div>
</dialog>
<span class="legacy-anchor" id="achievement-dialog"></span><span class="legacy-anchor" id="achievement-dialog-title"></span>
<span class="legacy-anchor" id="project-dialog-title"></span>`, 'home');
}

function evidencePanels(definition, lang, p, level = 2, titleId = '') {
    const id = lang === 'id';
    const parts = definition.steps || definition.views;
    const title = id ? definition.idTitle : definition.title;
    return `<section class="evidence" data-evidence${level === 2 ? ' id="case-evidence"' : ''}>
        <h${level}${titleId ? ` id="${titleId}"` : ''}>${escape(title)}</h${level}>
        <div class="evidence-tabs" hidden data-evidence-tabs aria-label="${escape(title)}">
            ${parts.map(part => `<button type="button" id="${part.button || part.id + '-tab'}" aria-controls="${part.id}">${escape((id ? part.idCopy : part.en)[0])}</button>`).join('')}
        </div>
        ${parts.map(part => {
            const [name, body] = id ? part.idCopy : part.en;
            return `<div class="evidence-panel" id="${part.id}" data-evidence-panel>
                <h${level + 1}>${escape(name)}</h${level + 1}><p>${escape(body)}</p>
                ${part.photos ? `<div class="evidence-images">${part.photos.map(i => photo(p.images[i].href, p.images[i].label)).join('')}</div>` : ''}
                ${part.flow ? evidencePanels(part.flow, lang, p, level + 2) : ''}
            </div>`;
        }).join('')}
    </section>`;
}

function caseStudy(project, lang) {
    const t = language[lang];
    const p = copy(project, lang);
    const additional = p.images.filter((image, index) => index > 0 && (project.slug === 'fish-freshness' || !evidence[project.slug]?.views) && !p.images.slice(0, index).some(prior => prior.label === image.label));
    const projectLinks = listLinks(project.links, lang) + (project.course ? `<a class="text-link" href="${home(lang)}#${project.course}">${t.certificates} ${icon('next')}</a>` : '');
    return `<article class="case-study" data-case data-slug="${project.slug}" data-legacy-id="${project.id}">
        <header class="case-intro">
            <div class="title-line"><h1 tabindex="-1" id="case-title">${escape(p.name)}</h1>
                ${project.date ? `<p class="item-date">${escape(date(project.date, lang))}</p>` : ''}</div>
            ${p.subject ? `<p class="case-subject">${escape(p.subject)}</p>` : ''}
            <p class="case-lead">${escape(p.intro)}</p>
            ${p.outcome ? `<p class="project-outcome"><span aria-hidden="true"></span>${escape(p.outcome)}</p>` : ''}
            <div class="project-topics"><span>${escape(p.focus)}</span></div>
            ${projectLinks ? `<div class="links" aria-label="${t.links}">${projectLinks}</div>` : ''}
        </header>
        <figure class="case-cover">${photo(project.cover, project.slug === 'cora' ? p.images.at(-1).label : p.images[0]?.label, true)}</figure>
        <div class="case-body">
            ${p.sections.map(([name, body]) => `<section id="case-${name.toLowerCase().replaceAll(' ', '-')}"><h2>${label(name, lang)}</h2><p>${escape(body)}</p></section>`).join('')}
            ${evidence[project.slug] ? evidencePanels(evidence[project.slug], lang, p, 2, project.slug === 'yudha' ? 'yudha-system-title' : '') : ''}
            ${additional.length ? `<section id="case-evidence"><h2>${t.evidence}</h2><div class="evidence-images">${additional.map(image => `<figure>${photo(image.href, image.label)}${image.note ? `<figcaption>${escape(image.note)}</figcaption>` : ''}</figure>`).join('')}</div></section>` : ''}
            ${project.tech.length ? `<section id="case-tools"><h2>${t.stack}</h2><ul class="tech-list">${project.tech.map(tech => `<li>${escape(tech)}</li>`).join('')}</ul></section>` : ''}
        </div>
    </article>`;
}

function projectPage(project, lang) {
    const t = language[lang];
    const p = copy(project, lang);
    const title = `${caseTitle(p)} | ${person.name}`;
    const path = route(project, lang);
    const head = { title, description: p.summary, path, alternate: code => route(project, code), type: 'article',
        image: og(lang, project.featured ? project.slug : undefined), imageAlt: project.featured ? caseTitle(p) : person.name,
        graph: [...baseGraph.slice(1), { '@type': 'WebPage', '@id': origin + path, url: origin + path, name: title, inLanguage: lang, description: p.summary,
            isPartOf: { '@id': websiteId } }] };
    return document(lang, head, `${header(lang, project)}
<main class="wrap standalone" id="main-content">
    <a class="button button-outline case-back" href="${home(lang)}#${project.featured ? 'work' : 'all-projects'}">${icon('back')} ${t.back}</a>
    ${caseStudy(project, lang)}
</main>
${footer(lang)}`, 'project');
}

function write(relative, content) {
    const file = new URL('../' + relative, import.meta.url);
    mkdirSync(fileURLToPath(new URL('.', file)), { recursive: true });
    writeFileSync(file, content.replace(/[ \t]+$/gm, ''));
}

for (const lang of langs) {
    write(home(lang).slice(1) + 'index.html', homePage(lang));
    for (const project of projects) write(route(project, lang).slice(1) + 'index.html', projectPage(project, lang));
}
const urls = langs.flatMap(lang => [home(lang), ...projects.map(project => route(project, lang))]);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${origin + url}</loc></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
write('404.html', document('en', { title: 'Page not found | ' + person.name, description: language.en.missingText, noindex: true },
    `${header('en', undefined, true)}<main class="wrap missing" id="main-content"><h1>${language.en.missing}</h1><p>${language.en.missingText}</p><a class="button button-primary" href="/">${language.en.profile} ${icon('next')}</a></main>${footer('en')}`, 'missing'));
console.log(`Generated ${urls.length} portfolio pages and the 404 page.`);
