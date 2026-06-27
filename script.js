const nav = document.querySelector(".top-nav");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".nav-links");

function updateScrollProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    nav.style.setProperty("--scroll-progress", `${Math.min(100, progress)}%`);
}

function setupMobileNav() {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

function setupActiveNav() {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    });

    sections.forEach((section) => observer.observe(section));
}

function setupRevealAndLazyImages() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".section-reveal").forEach((section) => revealObserver.observe(section));

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            loadPicture(entry.target);
            imageObserver.unobserve(entry.target);
        });
    }, {
        rootMargin: "420px 0px",
        threshold: 0.01
    });

    document.querySelectorAll("picture").forEach((picture) => imageObserver.observe(picture));
}

function loadPicture(container) {
    container.querySelectorAll("source[data-srcset]").forEach((source) => {
        source.srcset = source.dataset.srcset;
        source.removeAttribute("data-srcset");
    });
    container.querySelectorAll("img[data-src]").forEach((image) => {
        image.src = image.dataset.src;
        image.loading = "lazy";
        image.decoding = "async";
        image.removeAttribute("data-src");
    });
}

function setupModelTabs() {
    const tabButtons = Array.from(document.querySelectorAll("[data-model-tab]"));
    const panels = Array.from(document.querySelectorAll("[data-model-panel]"));

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const target = button.dataset.modelTab;
            tabButtons.forEach((item) => {
                const active = item === button;
                item.classList.toggle("active", active);
                item.setAttribute("aria-selected", String(active));
            });
            panels.forEach((panel) => {
                panel.classList.toggle("active", panel.dataset.modelPanel === target);
                if (panel.dataset.modelPanel === target) loadPicture(panel);
            });
        });
    });

    const aksaraToggle = document.querySelector("[data-toggle-aksara]");
    if (!aksaraToggle) return;

    aksaraToggle.addEventListener("click", () => {
        const matrix = document.querySelector('[data-aksara-picture="matrix"]');
        const interpret = document.querySelector('[data-aksara-picture="interpret"]');
        const showingInterpretation = !interpret.hidden;

        interpret.hidden = showingInterpretation;
        matrix.hidden = !showingInterpretation;
        aksaraToggle.textContent = showingInterpretation ? "Interpretation" : "Matrix";
        loadPicture(showingInterpretation ? matrix : interpret);
    });
}

function setupTimeline() {
    document.querySelectorAll(".timeline-trigger").forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const item = trigger.closest(".timeline-item");
            const nextState = !item.classList.contains("open");
            item.classList.toggle("open", nextState);
            trigger.setAttribute("aria-expanded", String(nextState));
        });
    });
}

function setupNetworkCanvas() {
    const canvas = document.getElementById("networkCanvas");
    if (!canvas) return;

    const context = canvas.getContext("2d");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        width = rect.width;
        height = rect.height;
        canvas.width = Math.max(1, Math.floor(width * ratio));
        canvas.height = Math.max(1, Math.floor(height * ratio));
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function seedNodes() {
        nodes.length = 0;
        const count = width < 520 ? 26 : 42;
        for (let index = 0; index < count; index += 1) {
            const web3 = index % 3 === 0;
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.34,
                vy: (Math.random() - 0.5) * 0.34,
                radius: web3 ? 2.8 : 2.2,
                color: web3 ? "#A855F7" : "#06B6D4"
            });
        }
    }

    function draw() {
        context.clearRect(0, 0, width, height);
        context.fillStyle = "rgba(11, 15, 25, 0.2)";
        context.fillRect(0, 0, width, height);

        nodes.forEach((node, nodeIndex) => {
            if (!prefersReducedMotion) {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;
            }

            for (let otherIndex = nodeIndex + 1; otherIndex < nodes.length; otherIndex += 1) {
                const other = nodes[otherIndex];
                const dx = node.x - other.x;
                const dy = node.y - other.y;
                const distance = Math.hypot(dx, dy);
                if (distance < 130) {
                    const alpha = (1 - distance / 130) * 0.38;
                    context.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
                    context.lineWidth = 1;
                    context.beginPath();
                    context.moveTo(node.x, node.y);
                    context.lineTo(other.x, other.y);
                    context.stroke();
                }
            }

            context.beginPath();
            context.fillStyle = node.color;
            context.shadowColor = node.color;
            context.shadowBlur = 12;
            context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            context.fill();
            context.shadowBlur = 0;
        });

        if (!prefersReducedMotion) {
            animationFrame = requestAnimationFrame(draw);
        }
    }

    function init() {
        cancelAnimationFrame(animationFrame);
        resize();
        seedNodes();
        draw();
    }

    window.addEventListener("resize", init);
    init();
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });

window.addEventListener("DOMContentLoaded", () => {
    updateScrollProgress();
    setupMobileNav();
    setupActiveNav();
    setupRevealAndLazyImages();
    setupModelTabs();
    setupTimeline();
    setupNetworkCanvas();
});
