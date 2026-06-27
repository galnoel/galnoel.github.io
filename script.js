const nav = document.querySelector(".top-nav");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".nav-links");

const awardDetails = [
    {
        id: "pimnas38",
        title: "Bronze Medalist (Presentation Category) PIMNAS 38",
        issuer: "Kementerian Pendidikan Tinggi, Sains dan Teknologi",
        institution: "Universitas Sam Ratulangi",
        date: "Dec 2025",
        badge: "PKM-KC1 Scheme",
        image: "public/assets/portfolio/pimnas-award.jpg",
        imageWebp: "public/assets/portfolio/pimnas-award.webp",
        hoverImage: "public/assets/portfolio/pimnas-team.jpg",
        hoverImageWebp: "public/assets/portfolio/pimnas-team.webp",
        alt: "PIMNAS 38 awarding night",
        elimination: "Formulated Neurokit, a prototype-scale hardware-software system merging multimodal neurotherapeutic hardware that synchronizes light and music therapy variants with a dedicated mobile subsystem for focus span support and memory retention intervals.",
        finalPhase: "Directly spearheaded the product lifecycle after national research funding, coordinated institutional ethical clearances, engineered 3D-printed modular enclosures, mapped IoT electrical wiring matrices, programmed the Flutter mobile application, and defended the system before a 3-university adjudication panel.",
        extra: [
            {
                label: "Generative Engine Integration",
                text: "Maintained edge connectivity by embedding Gemini AI workflows through OpenRouter pipelines for real-time positive validation affirmations and instant text-to-speech rendering."
            },
            {
                label: "Validation & Defense",
                text: "Verified system robustness with automated black-box testing before the live national showcase, active technical demonstration, and defense session."
            }
        ],
        tags: ["Flutter", "Gemini AI", "OpenRouter", "IoT Hardware", "3D Printing", "Black-Box Testing"]
    },
    {
        id: "gemastik18",
        title: "Most Inspiring Team GEMASTIK XVIII",
        issuer: "Direktorat Pembelajaran dan Kemahasiswaan (Belmawa)",
        institution: "Standalone recipient out of 220 finalist teams across 11 divisions",
        date: "Oct 2025",
        badge: "1 of 220 Elite Finalist Teams",
        image: "public/assets/portfolio/gemastik-2025.jpg",
        imageWebp: "public/assets/portfolio/gemastik-2025.webp",
        alt: "GEMASTIK XVIII awarding night",
        elimination: "Architected an automated computer-vision ecosystem for fish freshness classification, partitioning visual inputs into Fresh, Marginal, and Rotten degradation thresholds through Contrastive Learning and a Multimodal Parallel Fusion Transformer framework.",
        finalPhase: "Completed a high-stress 5-hour closed-sandbox national hackathon for Javanese Aksara script classification, iterating rapidly across image enhancement and state-of-the-art model evaluation under live constraints.",
        extra: [
            {
                label: "Image Pre-processing & Evaluation Stack",
                text: "Built defensive preprocessing matrices with adaptive defogging and histogram equalization while bench-testing EfficientNet, Swin Transformer, and CoaT to counteract data sparsity."
            }
        ],
        tags: ["PyTorch", "Swin Transformer", "CoaT", "EfficientNet", "Contrastive Learning", "Parallel Fusion Transformer"]
    },
    {
        id: "gemastik17",
        title: "Finalist in Data Mining GEMASTIK XVII",
        issuer: "Kemendikbudristek RI",
        institution: "National Finalist",
        date: "Sep 2024",
        badge: "National Top Finalist",
        image: "public/assets/portfolio/gemastik-2024.jpg",
        imageWebp: "public/assets/portfolio/gemastik-2024.webp",
        alt: "GEMASTIK XVII finalist archive",
        elimination: "Formulated data-mining pipelines using Association Rule Mining models, including Apriori and Eclat, over Indonesian senior-citizen anthropometric datasets to isolate 7 ergonomic association rules for objective public infrastructure design standards.",
        finalPhase: "Secured placement in the national final round and attacked a skewed tabular classification challenge within a rigid 5-hour countdown, building tree-based pipelines with Random Forest and XGBoost under imbalanced-data pressure.",
        extra: [
            {
                label: "Tree-Based Pipeline Architecture",
                text: "Resolved missing attribute distributions using K-Nearest Neighbors imputation modules and scaled minority instances through manual cost-sensitive class weighting."
            }
        ],
        tags: ["XGBoost", "Random Forest", "Apriori", "Eclat", "KNN Imputation", "Data Mining"]
    }
];

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

function createPictureMarkup(award, includeHover = false) {
    const image = includeHover ? award.hoverImage : award.image;
    const imageWebp = includeHover ? award.hoverImageWebp : award.imageWebp;
    const alt = includeHover ? `${award.title} team detail` : award.alt;

    if (!image) return "";

    return `
        <picture${includeHover ? ' class="swap-photo"' : ""}>
            ${imageWebp ? `<source data-srcset="${imageWebp}" type="image/webp">` : ""}
            <img data-src="${image}" alt="${alt}" width="1200" height="900">
        </picture>
    `;
}

function setupAwards() {
    const grid = document.querySelector("[data-awards-grid]");
    const modal = document.querySelector("[data-award-modal]");
    if (!grid || !modal) return;

    grid.innerHTML = awardDetails.map((award) => `
        <article class="award-spec-card" role="button" tabindex="0" data-award-id="${award.id}" aria-label="View technical details for ${award.title}">
            <div class="award-card-media" aria-hidden="true">
                ${createPictureMarkup(award)}
                ${createPictureMarkup(award, true)}
            </div>
            <div class="award-card-overlay"></div>
            <div class="award-card-content">
                <div class="award-meta-row">
                    <span class="award-badge">${award.badge}</span>
                    <span class="award-date">${award.date}</span>
                </div>
                <div class="award-card-copy">
                    <h3>${award.title}</h3>
                    <p>${award.issuer}</p>
                </div>
                <button class="view-details-btn" type="button">
                    View Spec Details <span>→</span>
                </button>
            </div>
        </article>
    `).join("");

    grid.querySelectorAll("[data-award-id]").forEach((card) => {
        card.addEventListener("click", () => openAwardModal(card.dataset.awardId));
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openAwardModal(card.dataset.awardId);
            }
        });
    });

    modal.querySelectorAll("[data-award-close]").forEach((closer) => {
        closer.addEventListener("click", closeAwardModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) closeAwardModal();
    });
}

function openAwardModal(awardId) {
    const award = awardDetails.find((item) => item.id === awardId);
    const modal = document.querySelector("[data-award-modal]");
    if (!award || !modal) return;

    modal.querySelector("[data-award-modal-hero]").style.backgroundImage =
        `linear-gradient(180deg, rgba(11, 15, 25, 0.05), rgba(11, 15, 25, 0.8)), url("${award.imageWebp || award.image}")`;
    modal.querySelector("[data-award-modal-kicker]").textContent = `${award.badge} // ${award.date}`;
    modal.querySelector("[data-award-modal-title]").textContent = award.title;
    modal.querySelector("[data-award-modal-issuer]").textContent = `Issued by ${award.issuer} // ${award.institution}`;
    modal.querySelector("[data-award-modal-elimination]").textContent = award.elimination;
    modal.querySelector("[data-award-modal-final]").textContent = award.finalPhase;
    modal.querySelector("[data-award-modal-extra]").innerHTML = award.extra.map((item) => `
        <section>
            <h4>// ${item.label}</h4>
            <p>${item.text}</p>
        </section>
    `).join("");
    modal.querySelector("[data-award-modal-tags]").innerHTML = award.tags.map((tag) => `<span>${tag}</span>`).join("");

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.querySelector(".award-modal-close").focus();
}

function closeAwardModal() {
    const modal = document.querySelector("[data-award-modal]");
    if (!modal) return;

    modal.hidden = true;
    document.body.style.overflow = "";
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



window.addEventListener("scroll", updateScrollProgress, { passive: true });

window.addEventListener("DOMContentLoaded", () => {
    updateScrollProgress();
    setupMobileNav();
    setupAwards();
    setupActiveNav();
    setupRevealAndLazyImages();
    setupModelTabs();
    setupTimeline();
});
