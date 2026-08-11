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
    themeToggle.addEventListener("click", () => {
        setTheme(currentTheme() === "dark" ? "light" : "dark");
    });

    const handlePreferenceChange = (event) => {
        let storedTheme = null;
        try { storedTheme = localStorage.getItem("portfolio-theme"); } catch { storedTheme = null; }
        if (storedTheme) return;
        setTheme(event.matches ? "dark" : "light", false);
    };

    if (typeof themePreference.addEventListener === "function") {
        themePreference.addEventListener("change", handlePreferenceChange);
    } else if (typeof themePreference.addListener === "function") {
        themePreference.addListener(handlePreferenceChange);
    }
}

function setMenuState(open) {
    if (!menuToggle || !primaryNav) return;

    menuToggle.setAttribute("aria-expanded", String(open));
    primaryNav.classList.toggle("open", open);
    const label = menuToggle.querySelector(".sr-only");
    if (label) label.textContent = open ? "Close navigation" : "Open navigation";
}

function setupNavigation() {
    if (!menuToggle || !primaryNav) return;

    menuToggle.addEventListener("click", () => {
        setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    primaryNav.addEventListener("click", (event) => {
        if (event.target.closest("a")) setMenuState(false);
    });

    document.addEventListener("click", (event) => {
        if (menuToggle.getAttribute("aria-expanded") !== "true") return;
        if (siteHeader && !siteHeader.contains(event.target)) setMenuState(false);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" || menuToggle.getAttribute("aria-expanded") !== "true") return;
        setMenuState(false);
        menuToggle.focus();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 980) setMenuState(false);
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

function openProjectFromHash({ scroll = false } = {}) {
    if (!window.location.hash.startsWith("#project-")) return;

    const target = document.getElementById(window.location.hash.slice(1));
    if (!(target instanceof HTMLDetailsElement)) return;

    projectDossiers.forEach((dossier) => {
        dossier.open = dossier === target;
    });

    if (scroll) {
        window.requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
        });
    }
}

function setupProjectDossiers() {
    projectDossiers.forEach((dossier) => {
        dossier.addEventListener("toggle", () => {
            if (!dossier.open) return;
            projectDossiers.forEach((other) => {
                if (other !== dossier) other.open = false;
            });
        });
    });

    document.addEventListener("click", (event) => {
        const link = event.target.closest('a[href^="#project-"]');
        if (!link) return;
        const target = document.querySelector(link.getAttribute("href"));
        if (!(target instanceof HTMLDetailsElement)) return;
        projectDossiers.forEach((dossier) => {
            dossier.open = dossier === target;
        });
    });

    openProjectFromHash();
    window.addEventListener("hashchange", () => openProjectFromHash({ scroll: true }));
}

function activateEvidenceTab(tab, viewer) {
    const tabs = Array.from(viewer.querySelectorAll('[role="tab"]'));
    const panels = Array.from(viewer.querySelectorAll("[data-project-panel]"));
    const targetId = tab.getAttribute("aria-controls");

    tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
    });

    panels.forEach((panel) => {
        panel.hidden = panel.id !== targetId;
    });
}

function setupEvidenceViewers() {
    document.querySelectorAll("[data-evidence-viewer]").forEach((viewer) => {
        const tabs = Array.from(viewer.querySelectorAll('[role="tab"]'));
        if (!tabs.length) return;

        tabs.forEach((tab, tabIndex) => {
            tab.addEventListener("click", () => activateEvidenceTab(tab, viewer));
            tab.addEventListener("keydown", (event) => {
                let nextIndex = null;
                if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (tabIndex + 1) % tabs.length;
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (tabIndex - 1 + tabs.length) % tabs.length;
                if (event.key === "Home") nextIndex = 0;
                if (event.key === "End") nextIndex = tabs.length - 1;
                if (nextIndex === null) return;

                event.preventDefault();
                activateEvidenceTab(tabs[nextIndex], viewer);
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
