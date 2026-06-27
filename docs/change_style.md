
# Portfolio Website Design System Pivot: Bright Editorial Specification

This specification details the structural and visual migration from a dark IDE theme to a clean, bright, high-end editorial and research studio aesthetic. It implements a sophisticated typography layout blending elegant serifs and script signatures while maintaining technical visibility for Machine Learning and Deep Learning data metrics.

---

## 🎨 1. Editorial Color Palette & Typography Configuration

### Tailwind CSS Token Overrides
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Bright, organic academic canvas layers
        background: '#FDFBF7',   // Cream / Premium Editorial Ivory (From Image References)
        surface: '#FFFFFF',      // Crisp white container elements
        border: '#E2E0D9',       // Soft warm grey line stroke separators
        
        // Deep typography contrast
        textPrimary: '#111111',  // Deep Obsidian Charcoal (softer than absolute black)
        textMuted: '#6B6A65',    // Sophisticated muted stone for long body descriptions
        
        // Refined Research Accents
        accentAi: '#1E3A8A',     // Deep Ink Blue (Represents Data Rigor / AI Integrity)
        accentWeb3: '#A27B5C',   // Muted Terracotta / Clay Earth Tone (From Image Reference 2)
      },
      fontFamily: {
        // High-contrast editorial display headers
        display: ['"Noto Serif Display"', 'Georgia', 'serif'],
        
        // Intricate typographic annotation / accent elements
        script: ['"Blosta Script"', '"The Youngest"', 'cursive'],
        
        // Technical body descriptions and data parameters
        sans: ['Inter', 'sans-serif'],
        
        // Model accuracy matrix readouts, weights, and parameters
        mono: ['"Geist Mono"', 'monospace']
      }
    }
  }
}

```

### Google Fonts & Custom Typography Import (`styles.css`)

```css
@import url('[https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Serif+Display:ital,wght@0,400;0,600;1,400&family=Geist+Mono:wght@400;500&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Serif+Display:ital,wght@0,400;0,600;1,400&family=Geist+Mono:wght@400;500&display=swap)');

/* Fallback stubs for specialized display script signatures if local files are missing */
@font-face {
    font-family: 'Blosta Script';
    src: local('Georgia'); /* Map fallback parameters smoothly */
    font-style: italic;
}

```

---

## 📐 2. Section Transformations (Bright Aesthetic Adaptations)

### Section 1: Hero Component (Minimalist Portrait Layout)

* **Visual Migration:** Remove all cyber grid masks, particle waves, and targeting lines.
* **Layout Structure:** A split layout grid where content aligns neatly against white canvas space.
* **Left Column:**
* Uses an elegant cursive element as a baseline stylistic choice:
`<span class="font-script text-accentWeb3 text-3xl block mb-2">About me</span>`
* Title displays in prominent, heavy editorial serif text:
`<h1 class="font-display text-6xl text-textPrimary font-semibold tracking-tight">Galnoel Peter Rindengan</h1>`


* **Right Column:** Houses your profile photo (`foto.jpg`) inside a clean, square-corner border frame, discarding any glow effects or neon styles. The diagnostic readout uses an elegant ink-stamped format:
```html
<div class="mt-4 font-mono text-xs tracking-wider text-textMuted border-t border-border pt-2 flex gap-8">
    <span>STATUS // <span class="text-accentAi">SYSTEM_READY</span></span>
    <span>LOC // MN, ID</span>
</div>

```



---

### Section 2: Core Engineering Expertise (Scientific Bento Cards)

Cards shift to a gallery presentation format: sharp white backgrounds, thin muted stone grid lines (`border-border`), and deep ink text.

```
+------------------------------------+------------------------------------+
|                                    |                                    |
|   [DEEP LEARNING RESEARCH]         |   [SYSTEMS ARCHITECTURE]           |
|   Title: Multimodal Vision         |   Title: Resilient Engines         |
|                                    |                                    |
|   (Stylized Minimalist Black/Ink   |   (Clean, high-legibility sans     |
|    Vector attention map graphic)   |    tag arrays of tool integration) |
|                                    |                                    |
+------------------------------------+------------------------------------+

```

---

### Section 3: Featured Projects (Strict Reverse-Chronological Flow)

[01] Solana-Based Web3 Game (CORA) — Apr 2026 – May 2026 

* **Visual Layout:** White card base. Left side holds the image container showcasing gameplay elements safely within clean, unblurred edges.
* 
**Copy Setup:** Text headings display in a serif typeface (`font-display`), while the underlying transaction processing text maintains high legibility in a sans-serif font (`font-sans`).



[02] AI Math Tutor Web App (Socratix) — Apr 2026 – May 2026 

* **Visual Fix (No Image Solution):** A dark CLI box will look disjointed on an ivory canvas. Transform this component into a **"LaTeX Research Notebook Plate"**. Use a soft off-white background (`#F9F9F6`), a delicate border, and crisp monospaced tracking parameters to make it resemble an elegant code printout or scientific layout.

```
+-------------------------------------------------------------------------+
| [Log Instance: socratix_pipeline_validation]                            |
| ----------------------------------------------------------------------- |
| > Core Orchestration: NestJS Multi-Agent Framework State Initialization |
| > Math.js AST Validation Parser: Resolved Equation [3x + 5 = 14]        |
| > Cache Query: Status [REDIS_CACHE_MISS] -> Backfilling PostgreSQL schema|
+-------------------------------------------------------------------------+

```

[03] Javanese Aksara Image Classification — October 2025 

* **Visual Layout:** Alternating row positioning the feature validation images (`aksara-matrix.png` and `aksara-interpret.png`) prominently on the left column.
* **Aksara Toggle Safe Implementation:** Keep your structural toggle switch intact, but style the buttons as clean minimalist tabs:

```html
<div class="flex gap-4 border-b border-border pb-2 mb-4">
    <button class="font-mono text-xs text-accentAi border-b-2 border-accentAi pb-1">Confusion Matrix</button>
    <button class="font-mono text-xs text-textMuted pb-1">Feature Interpretability</button>
</div>

```

* 
**Copy Highlight:** Uses explicit, monospaced research benchmarks (`96% F1-score` ) highlighted with clean typography tags to capture a recruiter's attention immediately.



[04] Multimodal Fish Freshness Classification — Jul 2025 – Aug 2025 

* **Visual Layout:** Displays your model attention mapping layer image (`fish-attention.png`) cleanly without any dark gradient overlays or blocking text structures.
* 
**Copy Highlight:** Lists the model parameters explicitly (`Multimodal Parallel Fusion Transformer` , `Contrastive Learning` , `85.4% Accuracy` ) in a clean, tabular configuration.



#### [05] NEUROKIT (Multimodal Neurotherapeutic Toolkit) — Jul 2025 – Nov 2025

* **Visual Layout (Multi-Image Editorial Layout):** Arrange your newly provided assets like an archival publication layout:
* Left Column: `neurokit-hardware.jpg` forms a large, clear anchor.
* Right Column: Spans a dual-nested vertical frame stacking `neurokit-mob1.jpg` and `neurokit-mob3.jpg` cleanly side-by-side.
* Baseline row: Inserts `neurokit-test.jpg` as a full-width panoramic verification image block.



---

### Section 4: Honors & Awards Gallery (Museum Exhibition Framing)

This updates the awards block to resolve the image overlap bug completely. The text descriptions are removed from the face of the cards and move entirely into a blurred modal. The cards now look like clean, premium **Exhibition Frames**.

```html
<div class="awards-editorial-grid">
    <article class="relative bg-surface border border-border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
        
        <div class="w-full h-48 relative overflow-hidden rounded mb-4 bg-background">
            <img src="assets/portfolio/pimnas-award.jpg" alt="PIMNAS 38" class="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-500" />
        </div>
        
        <div>
            <div class="flex justify-between items-center mb-2">
                <span class="font-mono text-xs text-accentWeb3 font-medium uppercase tracking-wider">PKM-KC1 Scheme</span>
                <span class="font-mono text-xs text-textMuted">Dec 2025</span>
            </div>
            <h3 class="font-display text-2xl text-textPrimary font-medium group-hover:text-accentAi transition-colors">Bronze Medalist PIMNAS 38</h3>
            <p class="font-sans text-xs text-textMuted mt-1">Kementerian Pendidikan Tinggi, Sains dan Teknologi</p>
        </div>

        <button class="mt-6 border-t border-border pt-4 w-full text-left font-mono text-xs text-textPrimary flex justify-between items-center group-hover:text-accentAi transition-colors" onclick="openAwardModal('pimnas38')">
            <span>READ SYSTEM SPECIFICATION LOG</span>
            <span class="transform group-hover:translate-x-1 transition-transform">→</span>
        </button>
    </article>
</div>

```

---

## 🛠️ 3. Execution Directives for Code Generation Agent

* [ ] **Strict Image Protection:** Do not allow any absolute text containers to float over images or block them inside the `awards` or `projects` grids. Text copy must sit securely inside its own container layout.
* [ ] **Maintain Code-Level State Drivers:** Ensure the `script.js` changes continue to pass string parameters to the modal injection engine correctly, keeping full descriptions hidden until requested by a click event.
* [ ] **Enforce CSS Selection States:** Confirm that the selector style rule `picture[hidden] { display: none !important; }` stays safely integrated inside your production style files to keep image toggles running perfectly.

```

```