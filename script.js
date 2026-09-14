const root = document.documentElement;
const siteHeader = document.querySelector("[data-site-header]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const primaryNav = document.querySelector("[data-primary-nav]");
const navLinks = Array.from(document.querySelectorAll(".primary-nav a"));
const railLinks = Array.from(document.querySelectorAll("[data-rail-link]"));
const sections = Array.from(document.querySelectorAll(".observed-section[id]"));
const projectDossiers = Array.from(document.querySelectorAll("details[data-project-id]"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const themePreference = window.matchMedia("(prefers-color-scheme: dark)");
const mobileNavigation = window.matchMedia("(max-width: 980px)");
const motionStyles = getComputedStyle(root);
const motion = {
    standard: parseFloat(motionStyles.getPropertyValue("--motion-standard")) || 220,
    enter: parseFloat(motionStyles.getPropertyValue("--motion-enter")) || 280,
    exit: parseFloat(motionStyles.getPropertyValue("--motion-exit")) || 200,
    easing: motionStyles.getPropertyValue("--motion-ease").trim() || "cubic-bezier(0.22, 1, 0.36, 1)"
};
const runningMotions = new Set();

// Each owner cancels its previous animation before starting a new one. Finishing
// reduced motion uses the same cleanup as a normal completion, without delays.
function playMotion(element, keyframes, duration, onFinish = () => {}) {
    if (reduceMotion.matches || typeof element.animate !== "function") {
        onFinish();
        return () => {};
    }

    const animation = element.animate(keyframes, { duration, easing: motion.easing, fill: "both" });
    let settled = false;
    const finish = () => {
        if (settled) return;
        settled = true;
        runningMotions.delete(finish);
        animation.cancel();
        onFinish();
    };
    animation.onfinish = finish;
    runningMotions.add(finish);
    return () => {
        if (settled) return;
        settled = true;
        runningMotions.delete(finish);
        animation.onfinish = null;
        animation.cancel();
    };
}

function onMediaChange(query, handler) {
    if (typeof query.addEventListener === "function") query.addEventListener("change", handler);
    else if (typeof query.addListener === "function") query.addListener(handler);
}

onMediaChange(reduceMotion, () => {
    if (!reduceMotion.matches) return;
    Array.from(runningMotions).forEach((finish) => finish());
    document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
});

function currentTheme() {
    return root.dataset.theme === "dark" ? "dark" : "light";
}

function updateThemeControl() {
    if (!themeToggle || !themeLabel) return;

    const isDark = currentTheme() === "dark";
    const nextTheme = isDark ? "light" : "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeLabel.textContent = isDark ? "Light" : "Dark";
}

function setTheme(theme, persist = true) {
    root.dataset.theme = theme;
    const themeColor = document.querySelector("[data-theme-color]");
    if (themeColor) themeColor.content = theme === "dark" ? "#121311" : "#FDFBF7";
    if (persist) {
        try {
            localStorage.setItem("portfolio-theme", theme);
        } catch {
            // The theme still applies when storage is unavailable.
        }
    }
    updateThemeControl();
}

function setupTheme() {
    if (!themeToggle) return;

    updateThemeControl();
    window.requestAnimationFrame(() => root.classList.add("motion-ready"));
    themeToggle.addEventListener("click", () => {
        setTheme(currentTheme() === "dark" ? "light" : "dark");
    });

    const handlePreferenceChange = (event) => {
        let storedTheme = null;
        try { storedTheme = localStorage.getItem("portfolio-theme"); } catch { storedTheme = null; }
        if (storedTheme) return;
        setTheme(event.matches ? "dark" : "light", false);
    };

    onMediaChange(themePreference, handlePreferenceChange);
}

function setMenuState(open) {
    if (!menuToggle || !primaryNav) return;

    menuToggle.setAttribute("aria-expanded", String(open));
    primaryNav.classList.toggle("open", open);
    const hidden = mobileNavigation.matches && !open;
    primaryNav.inert = hidden;
    if (hidden) primaryNav.setAttribute("aria-hidden", "true");
    else primaryNav.removeAttribute("aria-hidden");
    // Also keep closed links out of the tab order on browsers without inert.
    navLinks.forEach((link) => {
        if (hidden) link.setAttribute("tabindex", "-1");
        else link.removeAttribute("tabindex");
    });
    const label = menuToggle.querySelector(".sr-only");
    if (label) label.textContent = open ? "Close navigation" : "Open navigation";
}

function setupNavigation() {
    if (!menuToggle || !primaryNav) return;
    setMenuState(false);

    menuToggle.addEventListener("click", () => {
        setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    primaryNav.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            if (mobileNavigation.matches) menuToggle.focus({ preventScroll: true });
            setMenuState(false);
        }
    });

    document.addEventListener("click", (event) => {
        if (menuToggle.getAttribute("aria-expanded") !== "true") return;
        if (siteHeader && !siteHeader.contains(event.target)) {
            if (primaryNav.contains(document.activeElement)) menuToggle.focus({ preventScroll: true });
            setMenuState(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" || menuToggle.getAttribute("aria-expanded") !== "true") return;
        setMenuState(false);
        menuToggle.focus();
    });

    onMediaChange(mobileNavigation, () => {
        if (mobileNavigation.matches && primaryNav.contains(document.activeElement)) {
            menuToggle.focus({ preventScroll: true });
        } else if (!mobileNavigation.matches && document.activeElement === menuToggle) {
            navLinks[0]?.focus({ preventScroll: true });
        }
        setMenuState(false);
    });
}

let scrollTicking = false;

function updatePageProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0;
    root.style.setProperty("--page-progress", `${progress}%`);
    root.style.setProperty("--rail-progress", `${progress}%`);
    scrollTicking = false;
}

function requestProgressUpdate() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(updatePageProgress);
}

function setActiveSection(sectionId) {
    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
    });
    railLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${sectionId}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
    });
}

function setupSectionObserver() {
    if (!("IntersectionObserver" in window)) {
        if (sections[0]) setActiveSection(sections[0].id);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
    }, {
        rootMargin: "-25% 0px -58% 0px",
        threshold: [0, 0.15, 0.35]
    });

    sections.forEach((section) => observer.observe(section));
}

function setupReveals() {
    const reveals = Array.from(document.querySelectorAll(".reveal"));
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
        reveals.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { rootMargin: "0px 0px -8%", threshold: 0.06 });

    reveals.forEach((item) => observer.observe(item));
}

function setupProjectDossiers() {
    const dialog = document.getElementById("project-dialog");
    const supportsDialog = dialog && typeof dialog.showModal === "function";
    const title = dialog?.querySelector("#project-dialog-title");
    const category = dialog?.querySelector("[data-dialog-category]");
    const content = dialog?.querySelector("[data-dialog-content]");
    const historyOwner = String(performance.timeOrigin);
    let activeProject = null;
    let activeBody = null;
    let returnFocus = null;
    let pendingFocus = null;
    let backdropPointerDown = false;
    let dialogPhase = "closed";
    let cancelDialogMotion = () => {};
    let dismissalPending = false;

    function projectAtHash() {
        if (!window.location.hash.startsWith("#project-")) return null;
        const target = document.getElementById(window.location.hash.slice(1));
        return projectDossiers.includes(target) ? target : null;
    }

    function restoreBody() {
        if (activeProject && activeBody) {
            activeProject.append(activeBody);
            activeProject.querySelector("summary").setAttribute("aria-expanded", "false");
        }
        activeProject = null;
        activeBody = null;
    }

    function hideProject() {
        if (!activeProject || dialogPhase === "closing") return;
        const style = getComputedStyle(dialog);
        const from = { opacity: style.opacity, transform: style.transform };
        cancelDialogMotion();
        dialogPhase = "closing";
        dialog.dataset.motion = "closing";
        cancelDialogMotion = playMotion(dialog, [from, { opacity: 0, transform: "translateY(10px) scale(0.985)" }], motion.exit, () => {
            pendingFocus = returnFocus;
            dialog.close();
            restoreBody();
            returnFocus = null;
            root.classList.remove("project-dialog-open");
            dialogPhase = "closed";
            dialog.dataset.motion = "closed";
            restoreProjectFocus();
            requestProgressUpdate();
        });
    }

    function restoreProjectFocus() {
        const focusTarget = pendingFocus;
        if (!focusTarget || dismissalPending) return;
        // Fragment traversal can move focus after popstate. Restore it afterward.
        window.requestAnimationFrame(() => {
            if (!dialog.open && focusTarget.isConnected) {
                focusTarget.focus({ preventScroll: true });
            }
            if (pendingFocus === focusTarget) pendingFocus = null;
        });
    }

    function showProject(target, opener) {
        if (target === activeProject && dialogPhase !== "closing") return;
        const wasOpen = dialog.open;
        const style = wasOpen ? getComputedStyle(dialog) : null;
        const from = style
            ? { opacity: style.opacity, transform: style.transform }
            : { opacity: 0, transform: "translateY(12px) scale(0.985)" };
        cancelDialogMotion();
        pendingFocus = null;
        if (target !== activeProject) {
            restoreBody();
            activeProject = target;
            activeBody = target.querySelector(".dossier-body");
            returnFocus = opener || target.querySelector("summary");

            // Move the original body so evidence listeners and IDs remain intact.
            title.textContent = target.querySelector(".project-card-title").textContent;
            category.textContent = target.querySelector(".project-category").textContent;
            content.append(activeBody);
            target.open = false;
            target.querySelector("summary").setAttribute("aria-expanded", "true");
            dialog.scrollTop = 0;
        }
        root.classList.add("project-dialog-open");
        if (!wasOpen) {
            dialog.dataset.motion = "closed";
            dialog.showModal();
            // Establish the backdrop's transparent starting style in the top layer.
            getComputedStyle(dialog, "::backdrop").opacity;
        }
        dialogPhase = "opening";
        dialog.dataset.motion = "opening";
        cancelDialogMotion = playMotion(dialog, [from, { opacity: 1, transform: "none" }], motion.enter, () => {
            dialogPhase = "open";
            dialog.dataset.motion = "open";
        });
        title.focus({ preventScroll: true });
    }

    function syncProjectFromLocation() {
        dismissalPending = false;
        const target = projectAtHash();
        if (supportsDialog) {
            if (target) showProject(target);
            else {
                hideProject();
                if (!dialog.open) restoreProjectFocus();
            }
        } else {
            projectDossiers.forEach((project) => { project.open = project === target; });
            if (target) target.scrollIntoView({ block: "start", behavior: "instant" });
        }
    }

    function visitProject(target, opener) {
        if (window.location.hash !== `#${target.id}`) {
            history.pushState({
                ...history.state,
                portfolioProject: { owner: historyOwner, id: target.id }
            }, "", `#${target.id}`);
        }
        showProject(target, opener);
    }

    function dismissProject() {
        if (!activeProject || dialogPhase === "closing" || dismissalPending) return;
        const entry = history.state?.portfolioProject;
        const ownsEntry = entry?.owner === historyOwner && entry.id === activeProject.id;
        dismissalPending = true;
        hideProject();
        if (ownsEntry) {
            // Return to the original section; Forward can reopen this project.
            history.back();
        } else {
            // A direct project URL may have an external previous history entry.
            const state = { ...history.state };
            delete state.portfolioProject;
            history.replaceState(state, "", "#work");
            dismissalPending = false;
            if (!dialog.open) restoreProjectFocus();
        }
    }

    projectDossiers.forEach((project) => {
        const summary = project.querySelector("summary");
        if (supportsDialog) {
            summary.setAttribute("aria-haspopup", "dialog");
            summary.setAttribute("aria-controls", "project-dialog");
            summary.setAttribute("aria-expanded", "false");
            summary.addEventListener("click", (event) => {
                event.preventDefault();
                visitProject(project, summary);
            });
        } else {
            project.addEventListener("toggle", () => {
                if (!project.open) return;
                projectDossiers.forEach((other) => {
                    if (other !== project) other.open = false;
                });
            });
        }
    });

    document.addEventListener("click", (event) => {
        const link = event.target.closest('a[href^="#project-"]');
        if (!link || event.defaultPrevented || event.button !== 0 ||
            event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = document.getElementById(link.getAttribute("href").slice(1));
        if (!projectDossiers.includes(target)) return;
        if (supportsDialog) {
            event.preventDefault();
            visitProject(target, link);
        } else {
            projectDossiers.forEach((project) => { project.open = project === target; });
        }
    });

    if (supportsDialog) {
        dialog.querySelector("[data-dialog-close]").addEventListener("click", dismissProject);
        dialog.addEventListener("keydown", (event) => {
            if (event.key !== "Tab") return;
            const focusable = Array.from(dialog.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]'
            )).filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0 &&
                !element.closest('[inert], [aria-hidden="true"]'));
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const current = document.activeElement;
            if (!first) {
                event.preventDefault();
                title.focus();
            } else if (event.shiftKey && (current === first || !focusable.includes(current))) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (current === last || !focusable.includes(current))) {
                event.preventDefault();
                first.focus();
            }
        });
        dialog.addEventListener("cancel", (event) => {
            event.preventDefault();
            dismissProject();
        });
        function isBackdrop(event) {
            const bounds = dialog.getBoundingClientRect();
            return event.target === dialog && (
                event.clientX < bounds.left || event.clientX > bounds.right ||
                event.clientY < bounds.top || event.clientY > bounds.bottom
            );
        }
        dialog.addEventListener("pointerdown", (event) => {
            backdropPointerDown = isBackdrop(event);
        });
        dialog.addEventListener("click", (event) => {
            if (backdropPointerDown && isBackdrop(event)) dismissProject();
            backdropPointerDown = false;
        });
    }

    syncProjectFromLocation();
    window.addEventListener("hashchange", syncProjectFromLocation);
    window.addEventListener("popstate", syncProjectFromLocation);
}

function setupEvidenceViewers() {
    document.querySelectorAll("[data-evidence-viewer]").forEach((viewer) => {
        const tabs = Array.from(viewer.querySelectorAll('[role="tab"]'));
        const panels = Array.from(viewer.querySelectorAll("[data-project-panel]"));
        if (!tabs.length || !panels.length) return;

        const stage = document.createElement("div");
        stage.className = "evidence-panels";
        panels[0].before(stage);
        panels.forEach((panel) => stage.append(panel));
        let active = panels.find((panel) => !panel.hidden) || panels[0];
        let cancelPanels = () => {};
        let cancelHeight = () => {};
        let targetHeight = 0;
        let lastWidth = 0;

        function settlePanels() {
            panels.forEach((panel) => {
                const selected = panel === active;
                panel.hidden = !selected;
                panel.inert = !selected;
                if (selected) panel.removeAttribute("aria-hidden");
                else panel.setAttribute("aria-hidden", "true");
                panel.classList.remove("is-leaving");
            });
            stage.classList.remove("is-switching");
        }

        function resizeStage(fromHeight, toHeight) {
            cancelHeight();
            targetHeight = toHeight;
            stage.style.removeProperty("height");
            if (!fromHeight || !toHeight || Math.abs(fromHeight - toHeight) < 1) return;
            stage.style.height = `${toHeight}px`;
            cancelHeight = playMotion(stage, [{ height: `${fromHeight}px` }, { height: `${toHeight}px` }], motion.standard, () => {
                stage.style.removeProperty("height");
                requestProgressUpdate();
            });
        }

        function activateEvidenceTab(tab) {
            const next = panels.find((panel) => panel.id === tab.getAttribute("aria-controls"));
            if (!next || next === active) return;
            const previous = active;
            const fromHeight = stage.getBoundingClientRect().height;
            const fromOpacity = getComputedStyle(previous).opacity;
            cancelPanels();
            cancelHeight();
            stage.style.removeProperty("height");
            active = next;
            tabs.forEach((item) => {
                const selected = item === tab;
                item.setAttribute("aria-selected", String(selected));
                item.tabIndex = selected ? 0 : -1;
            });
            if (previous.contains(document.activeElement)) tab.focus({ preventScroll: true });
            settlePanels();
            const toHeight = active.getBoundingClientRect().height;
            targetHeight = toHeight;
            lastWidth = stage.getBoundingClientRect().width;
            if (reduceMotion.matches || typeof stage.animate !== "function" || !fromHeight) {
                requestProgressUpdate();
                return;
            }

            // The outgoing panel stays visible only for the crossfade; inert and
            // aria-hidden keep it out of keyboard and assistive navigation.
            previous.hidden = false;
            previous.classList.add("is-leaving");
            stage.classList.add("is-switching");
            const cancelOut = playMotion(previous, [{ opacity: fromOpacity }, { opacity: 0 }], motion.standard, () => {
                previous.hidden = true;
            });
            const cancelIn = playMotion(active, [{ opacity: 0 }, { opacity: 1 }], motion.standard, settlePanels);
            cancelPanels = () => { cancelOut(); cancelIn(); };
            resizeStage(fromHeight, toHeight);
        }

        function measureActivePanel() {
            const bounds = active.getBoundingClientRect();
            const width = stage.getBoundingClientRect().width;
            if (!bounds.height || !width) {
                cancelHeight();
                stage.style.removeProperty("height");
                targetHeight = 0;
                lastWidth = 0;
                return;
            }
            // Responsive reflow should immediately follow the viewport. A late
            // image load at the same width can ease into its new natural height.
            if (!targetHeight || Math.abs(width - lastWidth) > 1) {
                cancelHeight();
                stage.style.removeProperty("height");
                targetHeight = bounds.height;
                lastWidth = width;
            } else if (Math.abs(bounds.height - targetHeight) > 1) {
                const fromHeight = stage.style.height ? stage.getBoundingClientRect().height : targetHeight;
                resizeStage(fromHeight, bounds.height);
            }
        }

        settlePanels();
        if ("ResizeObserver" in window) {
            const observer = new ResizeObserver(measureActivePanel);
            panels.forEach((panel) => observer.observe(panel));
        } else {
            viewer.addEventListener("load", measureActivePanel, true);
            window.addEventListener("resize", measureActivePanel);
        }

        tabs.forEach((tab, tabIndex) => {
            tab.addEventListener("click", () => activateEvidenceTab(tab));
            tab.addEventListener("keydown", (event) => {
                let nextIndex = null;
                if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (tabIndex + 1) % tabs.length;
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (tabIndex - 1 + tabs.length) % tabs.length;
                if (event.key === "Home") nextIndex = 0;
                if (event.key === "End") nextIndex = tabs.length - 1;
                if (nextIndex === null) return;

                event.preventDefault();
                activateEvidenceTab(tabs[nextIndex]);
                tabs[nextIndex].focus();
            });
        });
    });
}

function formatCount(value, decimals) {
    return Number(value).toFixed(decimals);
}

function animateCount(element) {
    if (element.dataset.counted === "true") return;
    element.dataset.counted = "true";

    const target = Number(element.dataset.countTo);
    const decimals = Number(element.dataset.decimals || 0);
    if (!Number.isFinite(target) || reduceMotion.matches) {
        element.textContent = formatCount(target, decimals);
        return;
    }

    const duration = 850;
    const start = performance.now();

    function step(now) {
        if (reduceMotion.matches) {
            element.textContent = formatCount(target, decimals);
            return;
        }
        const elapsed = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        element.textContent = formatCount(target * eased, decimals);
        if (elapsed < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
}

function setupCounters() {
    const counters = Array.from(document.querySelectorAll("[data-count-to]"));
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
        counters.forEach(animateCount);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateCount(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.55 });

    counters.forEach((counter) => observer.observe(counter));
}

window.addEventListener("scroll", requestProgressUpdate, { passive: true });
window.addEventListener("resize", requestProgressUpdate);

document.addEventListener("DOMContentLoaded", () => {
    setupTheme();
    setupNavigation();
    setupSectionObserver();
    setupReveals();
    setupProjectDossiers();
    setupEvidenceViewers();
    setupCounters();
    updatePageProgress();
});
