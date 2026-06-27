Here’s an implementation plan you can give directly to your AI coding agent.

````md
# Portfolio Redesign Implementation Plan
## Goal
Transform the current portfolio from a clean modern AI/ML portfolio into a more unique **Navy Sci-Fi Command Center** style while keeping the existing structure, responsiveness, and core content.

The new visual direction should feel like:

> AI systems engineer portfolio inside a futuristic navy command interface.

Do not rebuild the whole website from zero. Use the existing `index.html`, `styles.css`, and `script.js` as the base.

---

# 1. Preserve Existing Features

Keep the current working features:

- Dark/light theme toggle
- Mobile responsive navbar
- Hide-on-scroll navbar behavior
- Resume tabs
- Fade-in scroll animations
- Glow card border animation
- Project, awards, resume, and contact structure

Avoid breaking existing JavaScript behavior in `script.js`.

---

# 2. Update the Dark Theme Color System

In `styles.css`, replace the current dark theme colors with a deeper navy sci-fi palette.

Current dark mode is too close to black. Change it to navy-based colors.

Use this:

```css
[data-theme="dark"] {
    --color-primary: #38bdf8;
    --color-primary-light: #7dd3fc;
    --color-primary-dark: #0284c7;
    --color-primary-subtle: rgba(56, 189, 248, 0.08);
    --color-accent: #22d3ee;

    --color-bg: #050B1E;
    --color-bg-alt: #07122B;
    --color-surface: #0B1736;
    --color-surface-elevated: #101F46;

    --color-text: #E6F1FF;
    --color-text-secondary: #8FA7C7;
    --color-text-muted: #5F789B;
    --color-border: rgba(34, 211, 238, 0.12);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5);
    --shadow-md: 0 4px 10px rgba(0, 0, 0, 0.45);
    --shadow-lg: 0 14px 35px rgba(0, 0, 0, 0.5);
    --shadow-xl: 0 24px 70px -20px rgba(34, 211, 238, 0.28);

    --glow-color: #22d3ee;
    --glow-color-secondary: #38bdf8;
    --glow-dim: rgba(34, 211, 238, 0.06);
    --glow-shadow-hover: 0 0 45px -10px rgba(34, 211, 238, 0.22),
                         0 20px 45px -18px rgba(0, 0, 0, 0.65);
}
````

---

# 3. Add Sci-Fi Background Grid

Add a subtle fixed grid background to the page.

Place this after the `body` styles:

```css
body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -1;
    background-image:
        linear-gradient(rgba(34, 211, 238, 0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34, 211, 238, 0.035) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: linear-gradient(to bottom, black, transparent 85%);
}
```

Make sure it does not block content or affect click behavior.

---

# 4. Add Optional Scanline Overlay

Add a very subtle scanline texture for the dystopian/sci-fi effect.

```css
body::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    background: repeating-linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.015) 0px,
        rgba(255, 255, 255, 0.015) 1px,
        transparent 1px,
        transparent 4px
    );
    opacity: 0.25;
}
```

Important:

* Keep this subtle.
* If it makes the website feel too noisy, reduce opacity to `0.12`.

---

# 5. Update Hero Section Copy

In `index.html`, update the hero to feel more like an AI systems profile.

Current:

```html
<p class="hero-greeting">Hello, I'm</p>
<h1 class="hero-name">Galnoel<br>Rindengan</h1>
<p class="hero-role">AI &amp; Machine Learning Engineer</p>
```

Keep the name, but update the role and description to:

```html
<p class="hero-greeting">SYSTEM ONLINE — PORTFOLIO NODE</p>
<h1 class="hero-name">Galnoel<br>Rindengan</h1>
<p class="hero-role">AI Systems Builder / Machine Learning Engineer</p>
<p class="hero-desc">
    Informatics Engineering student focused on building intelligent systems, RAG pipelines,
    computer vision models, and production-grade AI solutions. I turn complex ideas into
    usable digital systems.
</p>
```

---

# 6. Add Terminal Block to Hero

Below `.hero-desc` and above `.hero-cta`, add this HTML:

```html
<div class="system-terminal">
    <p><span>&gt;</span> initializing_profile...</p>
    <p><span>&gt;</span> role: AI_SYSTEMS_BUILDER</p>
    <p><span>&gt;</span> focus: RAG / COMPUTER_VISION / MULTIMODAL_AI</p>
    <p><span>&gt;</span> status: AVAILABLE_FOR_COLLABORATION</p>
</div>
```

Then add this CSS:

```css
.system-terminal {
    margin-bottom: 32px;
    padding: 18px 20px;
    max-width: 540px;
    background: rgba(5, 11, 30, 0.82);
    border: 1px solid rgba(34, 211, 238, 0.18);
    border-radius: 14px;
    font-family: "JetBrains Mono", "Courier New", monospace;
    font-size: 0.82rem;
    line-height: 1.7;
    color: #7dd3fc;
    box-shadow: 0 0 30px rgba(34, 211, 238, 0.07);
    position: relative;
    overflow: hidden;
}

.system-terminal::before {
    content: "LIVE STATUS";
    position: absolute;
    top: 10px;
    right: 14px;
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    color: rgba(125, 211, 252, 0.45);
}

.system-terminal p {
    margin: 2px 0;
}

.system-terminal span {
    color: #22d3ee;
}
```

Responsive adjustment:

```css
@media (max-width: 900px) {
    .system-terminal {
        margin-left: auto;
        margin-right: auto;
        text-align: left;
    }
}
```

---

# 7. Rename Section Titles for Unique Branding

Change visible section titles in `index.html`.

## Resume section

From:

```html
<p class="section-label">Background</p>
<h2 class="section-title">Resume</h2>
```

To:

```html
<p class="section-label">Background</p>
<h2 class="section-title">Identity Log</h2>
```

## Projects section

From:

```html
<p class="section-label">Portfolio</p>
<h2 class="section-title">Projects</h2>
```

To:

```html
<p class="section-label">System Archives</p>
<h2 class="section-title">Project Files</h2>
```

## Awards section

From:

```html
<p class="section-label">Recognition</p>
<h2 class="section-title">Awards</h2>
```

To:

```html
<p class="section-label">Recognition</p>
<h2 class="section-title">Achievement Records</h2>
```

## Contact section

From:

```html
<p class="section-label">Let's Connect</p>
<h2 class="section-title">Contact</h2>
```

To:

```html
<p class="section-label">Open Transmission</p>
<h2 class="section-title">Contact Channel</h2>
```

---

# 8. Rename Resume Tabs

Change tab labels only. Do not change the tab IDs unless JavaScript is also updated.

Current:

```html
<button class="tab-btn active" onclick="openTab(event, 'Experience')">Experience</button>
<button class="tab-btn" onclick="openTab(event, 'Education')">Education</button>
<button class="tab-btn" onclick="openTab(event, 'Skills')">Skills</button>
```

Change to:

```html
<button class="tab-btn active" onclick="openTab(event, 'Experience')">Mission History</button>
<button class="tab-btn" onclick="openTab(event, 'Education')">Education Log</button>
<button class="tab-btn" onclick="openTab(event, 'Skills')">Tech Arsenal</button>
```

Important:

* Keep `Experience`, `Education`, and `Skills` as tab IDs.
* Only change the text users see.

---

# 9. Update Project Badges into File Labels

Change project badges to feel like classified archive files.

Example updates:

```html
<div class="project-badge">PROJECT FILE #01 / GEMASTIK XVIII FINALIST</div>
```

```html
<div class="project-badge">PROJECT FILE #02 / MULTIMODAL AI</div>
```

```html
<div class="project-badge">PROJECT FILE #03 / DATA MINING</div>
```

Also update project card titles if needed, but do not remove the technical credibility.

---

# 10. Improve Project Cards with Metadata Rows

Inside each project card, after the description and before project stats, add metadata like:

```html
<div class="project-meta">
    <span>TYPE: COMPUTER VISION</span>
    <span>STATUS: COMPLETED</span>
</div>
```

For each project:

## Project 1

```html
<div class="project-meta">
    <span>TYPE: COMPUTER VISION</span>
    <span>STATUS: FINALIST</span>
</div>
```

## Project 2

```html
<div class="project-meta">
    <span>TYPE: MULTIMODAL AI</span>
    <span>STATUS: EXPERIMENTAL</span>
</div>
```

## Project 3

```html
<div class="project-meta">
    <span>TYPE: DATA MINING</span>
    <span>STATUS: FINALIST</span>
</div>
```

Add CSS:

```css
.project-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 18px;
}

.project-meta span {
    font-family: "JetBrains Mono", "Courier New", monospace;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    color: var(--color-accent);
    border: 1px solid rgba(34, 211, 238, 0.16);
    background: rgba(34, 211, 238, 0.045);
    padding: 5px 9px;
    border-radius: var(--radius-full);
}
```

---

# 11. Add Sci-Fi Styling to Cards

Enhance `.project-card`, `.award-card`, and `.contact-card` with a more technical visual feel.

Add this:

```css
.project-card,
.award-card,
.contact-card {
    position: relative;
}

.project-card .glow-card-inner,
.award-card .glow-card-inner,
.contact-card .glow-card-inner {
    border: 1px solid rgba(34, 211, 238, 0.08);
}

.project-card .glow-card-inner::before,
.award-card .glow-card-inner::before,
.contact-card .glow-card-inner::before {
    content: "";
    position: absolute;
    top: 14px;
    right: 14px;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--color-accent);
    box-shadow: 0 0 14px var(--color-accent);
    opacity: 0.65;
}
```

Make sure `.glow-card-inner` has:

```css
.glow-card-inner {
    position: relative;
}
```

---

# 12. Add JetBrains Mono Font

In `index.html`, update the Google Fonts link to include JetBrains Mono.

Current font link uses Inter and Space Grotesk.

Replace with:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

Then add to `:root`:

```css
--font-mono: 'JetBrains Mono', monospace;
```

Use `var(--font-mono)` instead of writing `"JetBrains Mono", "Courier New", monospace` repeatedly.

---

# 13. Add Subtle Hero Image Sci-Fi Ring

Enhance `.hero-image-wrapper` with a futuristic ring.

Add:

```css
.hero-image-wrapper::before {
    content: "";
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    border: 1px dashed rgba(34, 211, 238, 0.35);
    animation: rotate-ring 18s linear infinite;
}

@keyframes rotate-ring {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
```

Important:

* Make sure the image remains visible.
* If the pseudo-element is hidden because of `overflow: hidden`, move it to `.hero-image` instead.

Preferred safer implementation:

```css
.hero-image {
    position: relative;
}

.hero-image::before {
    content: "";
    position: absolute;
    inset: -16px;
    border-radius: 50%;
    border: 1px dashed rgba(34, 211, 238, 0.35);
    animation: rotate-ring 18s linear infinite;
    pointer-events: none;
}
```

---

# 14. Improve Buttons

Make buttons feel more sci-fi but still readable.

```css
.btn {
    border-radius: 10px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-size: 0.78rem;
}

.btn-primary {
    box-shadow: 0 0 24px rgba(34, 211, 238, 0.18);
}

.btn-primary:hover {
    box-shadow: 0 0 34px rgba(34, 211, 238, 0.28);
}
```

---

# 15. Add Reduced Motion Support

Because the site uses glow animations, fade animations, and rotating rings, add accessibility support:

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: 0.001ms !important;
    }
}
```

---

# 16. Check Responsiveness

After implementation, test these widths:

* 1440px desktop
* 1024px laptop/tablet
* 768px tablet
* 390px mobile

Make sure:

* Navbar works on mobile
* Terminal block does not overflow
* Project cards remain readable
* Glow effect does not create horizontal scroll
* Hero image ring does not overflow badly
* Text remains readable on small screens

---

# 17. Final Visual Target

The final site should feel like:

* Deep navy background
* Cyan/blue glowing accents
* Clean futuristic dashboard
* AI command center
* Dystopian but professional
* Unique, but still recruiter-friendly

Avoid making it too cyberpunk, too neon, or too game-like.

The goal is not “flashy”.
The goal is:

> serious, intelligent, cinematic, technical, and memorable.

```

I’d give the agent that whole plan and tell it: **“Implement this carefully without changing my content too much.”**
```
