# Portfolio Update Specification: Hero Profile & Awards Layout Hotfix

This targeted implementation plan outlines the structural modifications required to resolve the text-blocking layout bug in the awards gallery and integrate the personal profile photo into the hero section.

---

## 📂 1. Asset Mapping

Ensure the following localized assets are correctly pathed in the public directory:
* **Profile Image:** `/public/assets/portfolio/foto.jpg` 
* [cite_start]**PIMNAS 38 Cover:** `/public/assets/portfolio/pimnas-award.jpg` [cite: 13]
* [cite_start]**GEMASTIK XVIII Cover:** `/public/assets/portfolio/gemastik-2025.jpg` [cite: 14]
* [cite_start]**GEMASTIK XVII Cover:** `/public/assets/portfolio/gemastik-2024.jpg` [cite: 15]

---

## 🖼️ 2. Hero Section: Profile Photo Integration

This update replaces the abstract interactive network canvas with a hardware-themed, framed profile container hosting `foto.jpg`.

### HTML / JSX Component Structure
```html
<div class="hero-visual" aria-label="Galnoel Peter Rindengan Profile Photo">
    <div class="profile-container">
        <div class="frame-corner top-left"></div>
        <div class="frame-corner top-right"></div>
        <div class="frame-corner bottom-left"></div>
        <div class="frame-corner bottom-right"></div>
        
        <div class="profile-glow"></div>
        
        <img 
            src="assets/portfolio/foto.jpg" 
            alt="Galnoel Peter Rindengan" 
            class="profile-img"
            loading="eager"
        />
    </div>
    <div class="graph-readout">
        <span>STATUS</span>
        <strong class="text-cyan">READY</strong>
        <span>LOC</span>
        <strong>ID // MN</strong>
    </div>
</div>

```

### Required Layout CSS

```css
.hero-visual {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.profile-container {
    position: relative;
    width: 320px;
    height: 380px;
    background: #1E293B;
    border: 1px solid #334155;
    overflow: hidden;
    border-radius: 12px;
}

.profile-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    z-index: 2;
    position: relative;
    filter: grayscale(20%) contrast(105%);
    transition: filter 0.3s ease;
}

.profile-container:hover .profile-img {
    filter: grayscale(0%) contrast(100%);
}

.profile-glow {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(168,85,247,0) 70%);
    z-index: 1;
    pointer-events: none;
}

/* UI Crosshair Borders */
.frame-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: #06B6D4;
    border-style: solid;
    z-index: 3;
    pointer-events: none;
}
.top-left { top: 12px; left: 12px; border-width: 2px 0 0 2px; }
.top-right { top: 12px; right: 12px; border-width: 2px 2px 0 0; }
.bottom-left { bottom: 12px; left: 12px; border-width: 0 0 2px 2px; }
.bottom-right { bottom: 12px; right: 12px; border-width: 0 2px 2px 0; }

```

---

## ⚡ 3. Awards Gallery: Image Unblocking Fix

To prevent technical text descriptions from covering your competition photos, all long paragraph summary elements are stripped from the face of the card UI. They are mapped exclusively to an interactive, modal overlay activated via `openAwardModal()`.

### HTML / JSX Component Structure

```html
<section id="awards" class="section-block">
    <div class="section-heading">
        <p class="eyebrow">// HONORS & NATIONAL RECOGNITION</p>
        <h2>Validating research frameworks on the national stage.</h2>
    </div>

    <div class="awards-bento-grid">
        <article class="award-card group">
            <div class="award-image-wrapper">
                <img src="assets/portfolio/pimnas-award.jpg" alt="PIMNAS 38 Awarding" class="award-bg-img" />
                <div class="card-overlay-gradient"></div>
            </div>
            
            <div class="award-card-content">
                <div class="award-meta">
                    <span class="badge text-cyan">PKM-KC1 Scheme</span>
                    <span class="date font-mono">Dec 2025</span>
                </div>
                <h3 class="award-title font-display">Bronze Medalist (Presentation Category) PIMNAS 38</h3>
                <p class="award-issuer font-mono">Kementerian Pendidikan Tinggi, Sains dan Teknologi</p>
                
                <button class="view-details-btn font-mono" onclick="openAwardModal('pimnas38')">
                    View Spec Details <span>→</span>
                </button>
            </div>
        </article>

        <article class="award-card group">
            <div class="award-image-wrapper">
                <img src="assets/portfolio/gemastik-2025.jpg" alt="GEMASTIK XVIII" class="award-bg-img" />
                <div class="card-overlay-gradient"></div>
            </div>
            
            <div class="award-card-content">
                <div class="award-meta">
                    <span class="badge text-purple">1 of 220 Teams</span>
                    <span class="date font-mono">Oct 2025</span>
                </div>
                <h3 class="award-title font-display">Most Inspiring Team GEMASTIK XVIII</h3>
                <p class="award-issuer font-mono">Belmawa</p>
                
                <button class="view-details-btn font-mono" onclick="openAwardModal('gemastik18')">
                    View Spec Details <span>→</span>
                </button>
            </div>
        </article>

        <article class="award-card group">
            <div class="award-image-wrapper">
                <img src="assets/portfolio/gemastik-2024.jpg" alt="GEMASTIK XVII" class="award-bg-img" />
                <div class="card-overlay-gradient"></div>
            </div>
            
            <div class="award-card-content">
                <div class="award-meta">
                    <span class="badge">National Finalist</span>
                    <span class="date font-mono">Sep 2024</span>
                </div>
                <h3 class="award-title font-display">Finalist in Data Mining GEMASTIK XVII</h3>
                <p class="award-issuer font-mono">Kemendikbudristek RI</p>
                
                <button class="view-details-btn font-mono" onclick="openAwardModal('gemastik17')">
                    View Spec Details <span>→</span>
                </button>
            </div>
        </article>
    </div>
</section>

```

### Gallery Layout & Vignette CSS

```css
.awards-bento-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    padding-top: 32px;
}

.award-card {
    position: relative;
    height: 440px;
    background: #1E293B;
    border: 1px solid #334155;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transition: border-color 0.3s ease;
}

.award-card:hover {
    border-color: #06B6D4;
}

.award-image-wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.award-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.award-card:hover .award-bg-img {
    transform: scale(1.03);
}

/* Linear backplate gradient guarantees baseline text legibility over raw photography */
.card-overlay-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to bottom,
        rgba(11, 15, 25, 0.1) 0%,
        rgba(11, 15, 25, 0.5) 45%,
        rgba(11, 15, 25, 0.95) 100%
    );
}

.award-card-content {
    position: relative;
    z-index: 2;
    padding: 24px;
    width: 100%;
}

.view-details-btn {
    margin-top: 16px;
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid #334155;
    color: #F8FAFC;
    padding: 8px 16px;
    border-radius: 6px;
    width: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.award-card:hover .view-details-btn {
    background: #06B6D4;
    color: #0B0F19;
    border-color: #06B6D4;
}

```

---

## 🛠️ 4. Execution Directives for Developer Agent

* [x] **File Cleanup:** Purge references to `networkCanvas` initialization code inside main entry-point JavaScript scripts to free up performance overhead.
* [x] **Vignette Check:** Ensure the `card-overlay-gradient` utility uses a dark color tone (`#0B0F19`) matching the overall website background token to produce seamless masking transitions at the footers of the images.
* [x] **Modal State Binding:** Connect `openAwardModal(id)` to mount a standard high-contrast dialog wrapper containing the expanded phase descriptions, keeping the primary page layout clean and scannable.

```

```