(() => {
    const root = document.documentElement;
    const lang = root.lang;
    const home = lang === 'id' ? '/id/' : '/';
    const theme = document.querySelector('[data-theme-toggle]');
    const themeColor = document.querySelector('meta[name="theme-color"]');

    function updateTheme(dark) {
        root.dataset.theme = dark ? 'dark' : 'light';
        theme.setAttribute('aria-label', dark ? theme.dataset.light : theme.dataset.dark);
        themeColor.content = dark ? '#111111' : '#fafafa';
    }
    theme.hidden = false;
    updateTheme(root.dataset.theme === 'dark');
    theme.addEventListener('click', () => {
        updateTheme(root.dataset.theme !== 'dark');
        try { localStorage.setItem('portfolio-theme', root.dataset.theme); } catch {}
    });

    const menu = document.querySelector('.menu-control');
    const nav = document.getElementById('primary-nav');
    const mobile = matchMedia('(max-width: 850px)');
    function menuOpen(open, restoreFocus = false) {
        nav.toggleAttribute('data-open', open);
        menu.setAttribute('aria-expanded', String(open));
        if (open) nav.querySelector('a').focus();
        else if (restoreFocus && mobile.matches) menu.focus({ preventScroll: true });
    }
    menu.hidden = false;
    menu.addEventListener('click', () => menuOpen(!nav.hasAttribute('data-open')));
    nav.addEventListener('click', event => {
        if (event.target.closest('a') && mobile.matches) menuOpen(false, true);
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && nav.hasAttribute('data-open')) menuOpen(false, true);
    });
    document.addEventListener('click', event => {
        if (nav.hasAttribute('data-open') && !event.target.closest('.site-header')) menuOpen(false);
    });
    mobile.addEventListener('change', () => menuOpen(false));

    const copyEmail = document.querySelector('[data-copy-email]');
    if (copyEmail) {
        const feedback = document.querySelector('.copy-feedback');
        copyEmail.hidden = false;
        copyEmail.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(copyEmail.dataset.copyEmail);
                feedback.textContent = copyEmail.dataset.success;
            } catch {
                const address = document.querySelector('.contact-address');
                const range = document.createRange();
                range.selectNodeContents(address);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                feedback.textContent = copyEmail.dataset.failed;
            }
        });
    }

    function setupEvidence(container) {
        for (const group of container.querySelectorAll('[data-evidence]')) {
            const controls = group.querySelector(':scope > [data-evidence-tabs]');
            const tabs = Array.from(controls.querySelectorAll('button'));
            const panels = Array.from(group.querySelectorAll(':scope > [data-evidence-panel]'));
            function select(index, focus = false) {
                tabs.forEach((tab, i) => {
                    tab.setAttribute('aria-selected', String(i === index));
                    tab.tabIndex = i === index ? 0 : -1;
                    panels[i].hidden = i !== index;
                });
                if (focus) tabs[index].focus();
            }
            controls.setAttribute('role', 'tablist');
            tabs.forEach((tab, i) => {
                tab.setAttribute('role', 'tab');
                panels[i].setAttribute('role', 'tabpanel');
                panels[i].setAttribute('aria-labelledby', tab.id);
                panels[i].tabIndex = 0;
                tab.addEventListener('click', () => select(i));
                tab.addEventListener('keydown', event => {
                    const keys = { ArrowLeft: (i - 1 + tabs.length) % tabs.length, ArrowRight: (i + 1) % tabs.length, Home: 0, End: tabs.length - 1 };
                    if (!Object.hasOwn(keys, event.key)) return;
                    event.preventDefault();
                    select(keys[event.key], true);
                });
            });
            controls.hidden = false;
            select(0);
        }
    }

    function fragment(value = location.hash) {
        try { return decodeURIComponent(value.slice(1)); } catch { return ''; }
    }

    function expandDisclosures(target) {
        for (let element = target; element; element = element.parentElement) {
            if (element.tagName === 'DETAILS') element.open = true;
        }
    }

    function showTarget(container, id, scroll = true) {
        if (!id) return;
        const caseStudy = container.querySelector('[data-case]');
        if (caseStudy && (id === caseStudy.dataset.legacyId || id.startsWith(caseStudy.dataset.legacyId + '-'))) id = caseStudy.querySelector('h1').id;
        const target = container.querySelector('#' + CSS.escape(id));
        if (!target) return;
        expandDisclosures(target);
        if (target.matches('[role="tab"]')) target.click();
        for (let element = target; element; element = element.parentElement) {
            if (!element.matches('[data-evidence-panel]')) continue;
            const control = element.parentElement.querySelector(':scope > [data-evidence-tabs] [aria-controls="' + CSS.escape(element.id) + '"]');
            control?.click();
        }
        if (scroll) target.scrollIntoView({ block: 'start', behavior: 'instant' });
    }

    function sectionAt(container, top) {
        let section;
        for (const candidate of container.querySelectorAll('section[id]:not([hidden])')) {
            if (candidate.getBoundingClientRect().top <= top) section = candidate;
        }
        return section?.id || '';
    }

    document.addEventListener('click', event => {
        const link = event.target.closest('[data-language-link]');
        if (!link) return;
        const url = new URL(link.href);
        const caseStudy = link.closest('dialog')?.querySelector('[data-case]') || document.querySelector('main [data-case]');
        if (caseStudy) {
            const toolbar = link.closest('dialog')?.querySelector('.case-toolbar') || document.querySelector('.site-header');
            const top = toolbar.getBoundingClientRect().bottom;
            const id = sectionAt(caseStudy, top + 40);
            const section = id ? caseStudy.querySelector('#' + CSS.escape(id)) : null;
            url.hash = section?.closest('[data-evidence]')?.querySelector(':scope > [data-evidence-panel]:not([hidden])')?.id || id;
        } else if (document.body.dataset.page === 'home') {
            const main = document.querySelector('main');
            const top = document.querySelector('.site-header').getBoundingClientRect().bottom;
            let current;
            for (const section of main.children) {
                if (section.getBoundingClientRect().top <= top + 80) current = section;
            }
            const existing = document.getElementById(fragment());
            url.hash = existing && current?.contains(existing) ? existing.id : current?.id === 'profile' ? '' : current?.id || '';
        }
        link.href = url;
    });

    const motionAllowed = matchMedia('(prefers-reduced-motion: no-preference)');
    const revealObserver = new IntersectionObserver(entries => {
        for (const { target, isIntersecting } of entries) {
            if (!isIntersecting) continue;
            if (motionAllowed.matches) target.dataset.entered = '';
            revealObserver.unobserve(target);
        }
    }, { rootMargin: '0px 0px -8% 0px', threshold: .06 });

    function observeMotion(container, selector) {
        const targets = container.querySelectorAll(selector);
        targets.forEach(target => {
            target.dataset.scrollReveal = '';
            revealObserver.observe(target);
        });
        return () => targets.forEach(target => revealObserver.unobserve(target));
    }

    const caseMotion = '.case-intro, .case-body > section';
    if (document.body.dataset.page === 'project') {
        const main = document.querySelector('main');
        setupEvidence(main);
        observeMotion(main, caseMotion + ', .case-cover');
        showTarget(main, fragment());
        window.addEventListener('hashchange', () => showTarget(main, fragment()));
        return;
    }

    const compactStack = matchMedia('(max-width: 660px)');
    const featuredCards = [...document.querySelectorAll('.featured-project')];
    const timeline = document.querySelector('.experience-list');
    if (featuredCards.length && timeline) {
        const timelineRows = [...timeline.children];
        const track = timeline.parentElement;
        const stack = featuredCards[0].parentElement;
        observeMotion(document,
            '.section-heading, .featured-panel, .disclosure > summary, .archive-project, .award-item, ' +
            '.about-grid > div:first-child, .capability, .certificate-card, .contact-grid, .footer-inner'
        );
        let frame = 0;
        let enabled = false;
        const clamp = value => Math.max(0, Math.min(1, value));
        function paintTimeline() {
            const timelineBox = timeline.getBoundingClientRect();
            const readingLine = innerHeight * .6;
            const progress = enabled ? clamp((readingLine - timelineBox.top) / timelineBox.height) : 1;
            const activeRows = timelineRows.map(row => {
                const { top, height } = row.getBoundingClientRect();
                return enabled && top + height / 2 <= readingLine;
            });
            track.style.setProperty('--progress', progress * 100 + '%');
            track.toggleAttribute('data-in-progress', progress > 0 && progress < 1);
            timelineRows.forEach((row, i) => row.toggleAttribute('data-revealed', activeRows[i]));
        }
        function paintScroll() {
            frame = 0;
            paintTimeline();
            if (!stack.hasAttribute('data-stacking') || document.body.classList.contains('has-dialog')) return;
            const bounds = stack.getBoundingClientRect();
            if (bounds.top > innerHeight || bounds.bottom < 0) return;
            const top = parseFloat(getComputedStyle(featuredCards[0]).top);
            const gap = parseFloat(getComputedStyle(stack).rowGap);
            const cardHeights = featuredCards.map(card => card.offsetHeight);
            let offset = 0;
            featuredCards.forEach((card, i) => {
                const height = cardHeights[i];
                const covered = featuredCards.length - 1 - i;
                const traveled = top - bounds.top - offset;
                const shrink = Math.min(Math.max(0, (traveled + height * .4) / (height + gap) * .034), covered * .04);
                const focused = Boolean(card.querySelector(':focus-visible'));
                card.style.setProperty('--stack-scale', focused ? 1 : 1 - shrink);
                card.style.setProperty('--stack-shade', focused ? 0 : Math.min(shrink * 3, .34));
                offset += height + gap;
            });
        }
        function requestPaint() {
            if (!frame) frame = requestAnimationFrame(paintScroll);
        }
        function configureMotion() {
            enabled = motionAllowed.matches;
            const step = compactStack.matches ? 12 : 18;
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            const inset = compactStack.matches ? 16 : 24;
            const maxCardHeight = Math.max(...featuredCards.map(card => card.offsetHeight));
            const canStack = enabled && maxCardHeight + headerHeight + inset + (featuredCards.length - 1) * step < innerHeight - 16;
            // Apply the initial row state before enabling transitions.
            if (!track.hasAttribute('data-tracking') && enabled) paintTimeline();
            track.toggleAttribute('data-tracking', enabled);
            stack.toggleAttribute('data-stacking', canStack);
            featuredCards.forEach((card, i) => {
                card.style.setProperty('--stack-offset', i * step + 'px');
                if (!canStack) {
                    card.style.removeProperty('--stack-scale');
                    card.style.removeProperty('--stack-shade');
                }
            });
            requestPaint();
        }
        window.addEventListener('scroll', requestPaint, { passive: true });
        window.addEventListener('resize', configureMotion, { passive: true });
        motionAllowed.addEventListener('change', configureMotion);
        stack.addEventListener('focusin', requestPaint);
        stack.addEventListener('focusout', requestPaint);
        document.fonts?.ready.then(configureMotion);
        timeline.addEventListener('toggle', requestPaint, true);
        configureMotion();
    }

    const dialog = document.getElementById('project-dialog');
    if (!dialog) return;
    const slot = dialog.querySelector('.case-slot');
    const scroller = dialog.querySelector('.dialog-scroll');
    const close = dialog.querySelector('[data-close]');
    const titleAlias = document.getElementById('project-dialog-title');
    const evidenceAliases = [...document.querySelectorAll('.legacy-anchor[data-case-target]')].map(node => [node, node.id]);
    const caseCards = [...document.querySelectorAll('article[data-case-target]')];
    const paths = new Set(caseCards.map(card => card.dataset.caseTarget));
    const cache = new Map();
    let version = 0;
    let activeRequest;
    let opener;
    let previousScroll = 0;
    let stopCaseMotion;
    let activeURL;

    function caseURLFromLegacy(url) {
        const project = url.searchParams.get('project');
        if (project) {
            const aliases = { 'legal-ai': 'lexara', gemastik: 'fish-freshness', 'tweet-sentiment': 'tweet-sentiment-tuning' };
            const base = url.searchParams.get('lang') === 'id' ? '/id/' : url.searchParams.get('lang') === 'en' ? '/' : home;
            const slug = Object.hasOwn(aliases, project) ? aliases[project] : project;
            if (!caseCards.some(card => card.dataset.caseTarget.endsWith('/' + slug + '/'))) return;
            return new URL(base + 'projects/' + slug + '/' + url.hash, location.origin);
        }
        const target = document.getElementById(fragment(url.hash));
        const card = target?.closest('article[data-case-target]');
        if (!card) return;
        const inner = target.matches('span[data-case-target]') ? url.hash : '';
        return new URL(card.dataset.caseTarget + inner, location.origin);
    }

    async function fetchCase(path) {
        if (!cache.has(path)) {
            const request = fetch(path).then(async response => {
                if (!response.ok) throw new Error('Project unavailable');
                const page = new DOMParser().parseFromString(await response.text(), 'text/html');
                const article = page.querySelector('main [data-case]');
                if (!article || page.documentElement.lang !== lang || new URL(page.querySelector('link[rel="canonical"]').href).pathname !== path) {
                    throw new Error('Project page missing');
                }
                return article;
            }).catch(error => {
                cache.delete(path);
                throw error;
            });
            cache.set(path, request);
        }
        return document.importNode(await cache.get(path), true);
    }

    function openDialog(article, url) {
        if (!dialog.open) {
            previousScroll = window.scrollY;
            document.body.classList.add('has-dialog');
            for (const [node] of evidenceAliases) node.removeAttribute('id');
        }
        stopCaseMotion?.();
        slot.replaceChildren(article);
        titleAlias.removeAttribute('id');
        const title = article.querySelector('h1');
        title.id = 'project-dialog-title';
        dialog.querySelector('[data-case-name]').textContent = title.textContent;
        for (const link of dialog.querySelectorAll('[hreflang]')) {
            const prefix = link.hreflang === 'id' ? '/id/' : '/';
            link.href = prefix + 'projects/' + article.dataset.slug + '/' + url.hash;
        }
        setupEvidence(slot);
        stopCaseMotion = observeMotion(slot, caseMotion);
        if (!dialog.open) dialog.showModal();
        scroller.scrollTop = 0;
        title.focus({ preventScroll: true });
        showTarget(slot, fragment(url.hash));
        activeURL = url.pathname + url.hash;
    }

    function removeDialog() {
        if (!dialog.open) return;
        dialog.close();
        document.body.classList.remove('has-dialog');
        stopCaseMotion?.();
        stopCaseMotion = undefined;
        slot.replaceChildren();
        for (const [node, id] of evidenceAliases) node.id = id;
        titleAlias.id = 'project-dialog-title';
        window.scrollTo({ top: previousScroll, behavior: 'instant' });
        if (opener?.isConnected) opener.focus({ preventScroll: true });
        activeURL = '';
    }

    async function navigateToCase(url, mode, trigger) {
        if (url.pathname + url.hash === activeURL || url.href === activeRequest) return;
        const request = ++version;
        activeRequest = url.href;
        try {
            const article = await fetchCase(url.pathname);
            if (request !== version) return;
            const state = history.state;
            if (mode === 'push') {
                const nextDepth = state?.portfolioCase ? state.depth + 1 : 1;
                history.pushState({ portfolioCase: true, depth: nextDepth }, '', url);
            }
            if (mode === 'replace') {
                history.replaceState({ portfolioCase: true, depth: state?.portfolioCase ? state.depth : 0 }, '', url);
            }
            if (!dialog.open) opener = trigger || caseCards.find(card => card.dataset.caseTarget === url.pathname)?.querySelector('.case-action');
            openDialog(article, url);
        } catch {
            if (request === version) location.assign(url);
        } finally {
            if (request === version) activeRequest = '';
        }
    }

    function syncLocation() {
        const url = new URL(location.href);
        if (paths.has(url.pathname)) {
            navigateToCase(url, 'restore');
            return;
        }
        const legacy = caseURLFromLegacy(url);
        if (legacy) {
            if (paths.has(legacy.pathname)) {
                const target = document.getElementById(fragment(url.hash));
                if (target) expandDisclosures(target);
                navigateToCase(legacy, 'replace');
            } else {
                const alternate = legacy.pathname.startsWith('/id/') ? '/id/' : '/';
                location.replace(alternate + '?project=' + legacy.pathname.split('/').at(-2) + legacy.hash);
            }
            return;
        }
        version++;
        activeRequest = '';
        removeDialog();
        showTarget(document, fragment(), Boolean(url.hash));
    }

    function closeDialog() {
        const depth = history.state?.depth || 0;
        if (depth) {
            history.go(-depth);
        } else {
            history.replaceState(null, '', home);
            removeDialog();
        }
    }

    close.addEventListener('click', closeDialog);
    dialog.addEventListener('cancel', event => {
        event.preventDefault();
        closeDialog();
    });
    dialog.addEventListener('click', event => {
        if (event.target === dialog) {
            const { left, right, top, bottom } = dialog.getBoundingClientRect();
            if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) closeDialog();
        }
    });
    document.addEventListener('click', event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target.closest('a[data-case-link]');
        if (!link || link.target || !paths.has(link.pathname)) return;
        event.preventDefault();
        navigateToCase(new URL(link.href), 'push', link);
    });
    window.addEventListener('popstate', syncLocation);
    window.addEventListener('hashchange', syncLocation);
    syncLocation();
})();
