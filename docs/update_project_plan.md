
# Portfolio Website Implementation Specification: Machine Learning & Data Science Focus

This document serves as the complete, production-ready Markdown specification for an AI Developer Agent to build a high-performance portfolio website. [cite_start]This update restructures the **Featured Projects** layout to feature your Machine Learning, Deep Learning, and Data Science achievements prominently[cite: 5]. 

[cite_start]Instead of relegating research to an archive, this design implements a **Unified Premium Case Study Layout** that preserves strict reverse-chronological order while utilizing monospaced metrics, validation matrices, and architecture flowcharts to emphasize your data science capabilities to recruiters[cite: 5].

---

## 🎨 1. Design System & Configuration

### Color Tokens (Tailwind CSS Configuration)
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#0B0F19', // Deep Slate primary canvas
        surface: '#1E293B',    // Muted Navy for structural cards
        border: '#334155',     // Sleek slate border lines
        accentAi: '#06B6D4',   // Electric Cyan for Data Science / DL Research highlights
        accentWeb3: '#A855F7', // Hyper Violet for Blockchain / Systems Architecture
        textPrimary: '#F8FAFC',// High-contrast white for headings
        textMuted: '#94A3B8',  // Subdued slate for descriptive blocks
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'], // Geometric tech headings
        sans: ['Inter', 'sans-serif'],            // High-legibility body
        mono: ['Geist Mono', 'monospace'],         // Tabular metrics, accuracy logs, & F1-scores
      }
    }
  }
}

```

---

## 📂 2. Core Static Asset Directory

All image assets must be stored inside `/public/assets/portfolio/` using the following structural mapping:

| Project | Source Filename | Target Destination Path | Layout Placement |
| --- | --- | --- | --- |
| **Hero** | `foto.jpg` | `/public/assets/portfolio/foto.jpg` | Framed Profile Photo |
| **01. Cora** | `landing-page-cora.png` | `/public/assets/portfolio/cora-hero.png` | Primary Split View 

 |
| **01. Cora** | `match-cora.png` | `/public/assets/portfolio/cora-gameplay.png` | Hover Overlay 

 |
| **02. Socratix** | *No Asset* | *N/A (HTML/CSS Code Shell)* | Dynamic Terminal Workflow Component 

 |
| **03. Aksara** | `javanese-aksara-classification-confusion_matrix_finetuned.png` | `/public/assets/portfolio/aksara-matrix.png` | Toggle State A (Confusion Matrix) 

 |
| **03. Aksara** | `javanese-aksara-classification-interpretation.png` | `/public/assets/portfolio/aksara-interpret.png` | Toggle State B (Feature Interpretation) 

 |
| **04. Fish** | `visal-fish-freshness.png` | `/public/assets/portfolio/fish-attention.png` | Parallel Fusion Attention Plate 

 |
| **05. Neurokit** | `neurokit-toolkit.jpg` | `/public/assets/portfolio/neurokit-hardware.jpg` | Left Frame (Physical Hardware) 

 |
| **05. Neurokit** | `nerokit-mobile1.jpg` | `/public/assets/portfolio/neurokit-mob1.jpg` | Right Sub-Grid (App Tab A) 

 |
| **05. Neurokit** | `neurokit-mobile3.jpg` | `/public/assets/portfolio/neurokit-mob3.jpg` | Right Sub-Grid (App Tab B) 

 |
| **05. Neurokit** | `neurokit-testing.jpg` | `/public/assets/portfolio/neurokit-test.jpg` | Bottom Banner (Wechsler Field Validation) 

 |
| **06. JTEHub** | `landing-page-jtehub.png` | `/public/assets/portfolio/jtehub-hero.png` | Bento Grid Card Cover |
| **07. Public** | `visual-anthropometric.png` | `/public/assets/portfolio/anthropometric.png` | Bento Grid Data Graphic 

 |
| **08. Warong** | `warong-warem-web.png` | `/public/assets/portfolio/warong-web.png` | Structural Archive Card |

---

## 📐 3. Project Architecture Pipeline (Strict Reverse-Chronological)

Every project is rendered with equal layout prominence, showcasing either production backend scalability or data science model precision.

### [PROJECT 01] Solana-Based Web3 Game (CORA) — April 2026 – May 2026

* 
**Layout:** Full-width alternating row structure (`grid grid-cols-1 lg:grid-cols-12`).


* 
**Visual Component:** Left Column (7 Cols) houses `cora-hero.png` with a transition-scaled transform overlaying `cora-gameplay.png` on desktop hover.


* **Core Technical Highlight Bullets:**
* 
**High-Throughput State Machine:** Engineered a server-side matchmaking and game loop engine utilizing Bun and Hono WebSockets to handle concurrent multi-user wagering state persistence.


* 
**Cryptographic Settlement Oracle:** Implemented a backend verification oracle via `@solana/web3.js` that evaluates game payloads and executes deterministic cryptographic payouts.


* 
**Race-Condition Mitigation:** Configured step-locked transaction parameters for native SOL wagers using the Solana Actions and Blinks API.




* **Tech Stack Badges:** `Bun` | `Hono` | `Supabase` | `@solana/web3.js` | `WebSockets`.



---

### [PROJECT 02] AI Math Tutor Web App (Socratix) — April 2026 – May 2026

* 
**Layout:** Full-width alternating row structure (`grid grid-cols-1 lg:grid-cols-12`).


* **Visual Component:** Right Column (7 Cols) renders an interactive, animated HTML/CSS **Live Pipeline Terminal** that outputs mock server-side logs to detail the NestJS agent infrastructure visually.
* **Core Technical Highlight Bullets:**
* 
**Multi-Agent Pipeline Architect:** Designed a two-tier micro-agent network inside NestJS separating student request routing from pedagogical planning logic.


* **Deterministic AST Validation:** Eliminated string-matching failure rates by writing an algebraic validation module using Math.js to parse and check expressions via Abstract Syntax Trees (AST).
* **Accelerated Cache-Aside Stratum:** Configured custom Redis client caching layers to reduce database processing overhead for identical equations and session state objects.


* **Tech Stack Badges:** `NestJS` | `Next.js 15` | `Vercel AI SDK` | `Redis` | `Math.js AST`.

---

### [PROJECT 03] Javanese Aksara Image Classification — October 2025

* 
**Layout:** Full-width alternating row structure (`grid grid-cols-1 lg:grid-cols-12`).


* 
**Visual Component:** Left Column (7 Cols) implements a layout-stabilized tab view embedding `aksara-matrix.png` and `aksara-interpret.png`. The button selection state controls visibility via a strict CSS toggle.


* **Core Technical Highlight Bullets:**
* **Advanced Vision Transformer Deployment:** Evaluated and fine-tuned Co-Scale Conv-Attentional Image Transformers (CoaT) and Swin Transformers for handwriting token processing across 20 historical classes.
* **Robust Performance Metrics:** Attained a quantified **96% F1-score** by implementing custom pre-processing equalization and class-weighting algorithms to correct for extreme dataset imbalances.
* **Explainable AI Foundations:** Integrated image preprocessing interpretation arrays (including defogging routines) to reveal structural feature extraction behaviors within attention blocks.


* **Tech Stack Badges:** `PyTorch` | `CoaT Transformer` | `Swin Transformer` | `Computer Vision`.

---

### [PROJECT 04] Multimodal Fish Freshness Classification — July 2025 – August 2025

* 
**Layout:** Full-width alternating row structure (`grid grid-cols-1 lg:grid-cols-12`).


* 
**Visual Component:** Right Column (7 Cols) features `fish-attention.png`, displaying multi-head attention map distributions over target matrices.


* **Core Technical Highlight Bullets:**
* 
**Contrastive Learning Architecture:** Coordinated a deep learning pipeline utilizing Contrastive Learning models to group semantic feature matrices effectively.


* 
**Multimodal Parallel Fusion:** Engineered a custom cross-attention Parallel Fusion Transformer layer to unify disparate sensor and vision data tokens.


* 
**Class Optimization Success:** Documented an overall **85.4% accuracy** rate, with model performance peaking at a **92.7% F1-score** specifically inside the critical "Marginal" freshness classification boundary.




* **Tech Stack Badges:** `PyTorch` | `Fusion Transformers` | `Contrastive Learning`.



---

### [PROJECT 05] NEUROKIT (Multimodal Neurotherapeutic Toolkit) — July 2025 – November 2025

* 
**Layout:** Full-width alternating row structure (`grid grid-cols-1 lg:grid-cols-12`).


* 
**Visual Component:** Left Column (7 Cols) implements a complex multi-image asymmetric dashboard:


* Left panel embeds a structural view of the compact 3D-printed hardware setup (`neurokit-hardware.jpg`) with detailed metric parameters (`15x14.5x20 cm`, `1.6 kg`).


* Right sub-column stacks mobile application interfaces (`neurokit-mob1.jpg` and `neurokit-mob3.jpg`).


* Bottom banner introduces the live human validation environment snapshot (`neurokit-test.jpg`) overlaying key outcomes.




* **Core Technical Highlight Bullets:**
* 
**Dynamic Pulse Width Modulation:** Wired an ESP32 micro-grid controller to execute dynamic PWM algorithms via MOSFET components, modifying LED arrays safely within a stable 500–600 lux envelope based on sonar distance data.


* 
**Generative Knowledge Integrations:** Wired backend Generative AI workflows via OpenRouter API endpoints to synthesize personal behavioral reminders matching user data inputs.


* 
**Empirical Cognitive Validation:** Proved device performance through rigorous client testing via the Wechsler Memory Scale, registering an audited **11.35% increase in student attention intervals**.




* **Tech Stack Badges:** `Flutter` | `ESP32` | `MOSFET Hardware` | `Generative AI LLMs`.



---

### [================ TIER 2 DATA & ARCHIVE GRID ================]

The remaining systems use a high-density 3-column structural layout to present data analytics frameworks and full-stack software setups compactly.

```
+---------------------------+---------------------------+---------------------------+
|    [06] JTEHub Platform   |    [07] Public Systems    |    [08] Warong Archive    |
|     (jtehub-hero.png)     |    (anthropometric.png)   |     (warong-web.png)      |
+---------------------------+---------------------------+---------------------------+

```

### [PROJECT 06] JTEHub (Stashify) Backend Platform — Late 2024 / Early 2025

* **Visual Component:** Card header displays the core platform dashboard workspace interface (`jtehub-hero.png`).
* **Data Science / Engineering Features:**
* **Conflict Prevention Schemas:** Formulated programmatic overlap formulas to evaluate date ranges and eliminate multi-user booking collisions across scheduling windows.
* **Role Enforcement Layer:** Configured custom NestJS Passport validation guards to intercept incoming JWTs, isolating admin routes securely.


* **Tech Stack Badges:** `NestJS` | `Supabase Postgres` | `TypeScript`.

### [PROJECT 07] Public Facility Recommendation System — April 2024 – June 2024

* 
**Visual Component:** Card header embeds a high-contrast data chart visualization mapping (`anthropometric.png`).


* **Data Science / Engineering Features:**
* **Association Rule Data Mining:** Deployed Apriori and Eclat data mining algorithms over extensive Indonesian demographic and anthropometric tables.
* **Ergonomic Blueprint Generation:** Successfully derived 7 foundational ergonomic design constraints rules to generate data-driven public building infrastructure size standards.


* **Tech Stack Badges:** `Python` | `Data Mining` | `Apriori` | `Eclat`.

### [PROJECT 08] Warong Warem Web System — Archive Baseline

* **Visual Component:** Card header displays standard legacy application visual canvas (`warong-web.png`).
* **Data Science / Engineering Features:** Built initial relational table schemas, full-stack database connection components, and structural form validation criteria scripts.
* **Tech Stack Badges:** `Web Development` | `Full-Stack` | `SQL Archive`.

---

## 💻 4. Code Generation Directive (Next.js / Tailwind CSS Component)

```tsx
import Image from 'next/image';

export default function DeepLearningFocusedRegistry() {
  return (
    <section id="projects" className="py-24 bg-background text-textPrimary px-6 border-t border-border">
      <div className="container mx-auto space-y-32">
        
        {/* Section Heading */}
        <div className="border-b border-border pb-6">
          <span className="text-accentAi font-mono text-xs tracking-widest block">// CHRONOLOGICAL RESEARCH & PRODUCTION LOG</span>
          <h2 className="text-4xl font-bold font-display mt-2">Engineering Systems & Data Science Artifacts</h2>
        </div>

        {/* ========================================================================= */}
        {/* TIER 1 CHRONOLOGICAL FEATURED SINGLE-ROW PIPELINE                        */}
        {/* ========================================================================= */}
        <div className="space-y-32">
          
          {/* [01] CORA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 relative group overflow-hidden rounded-xl border border-border bg-surface aspect-video">
              <Image src="/assets/portfolio/cora-hero.png" alt="CORA Platform" layout="fill" className="object-cover transition-transform duration-500 group-hover:scale-101" />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono text-accentWeb3">// APR 2026 - MAY 2026 // SYSTEMS & ON-CHAIN STATE</div>
              <h3 className="text-3xl font-bold font-display">Solana Cryptographic Settlement Oracle (CORA)</h3>
              <p className="text-textMuted text-sm leading-relaxed">Engineered high-throughput matchmaking state machines via Bun/Hono WebSockets paired with server-side oracles executing automated verification payload signatures.</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[10px] font-mono bg-surface border border-border px-2 py-0.5 rounded">Bun</span>
                <span className="text-[10px] font-mono bg-surface border border-border px-2 py-0.5 rounded">@solana/web3.js</span>
              </div>
            </div>
          </div>

          {/* [02] SOCRATIX */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
              <div className="text-xs font-mono text-accentAi">// APR 2026 - MAY 2026 // INTELLIGENT PIPELINES</div>
              <h3 className="text-3xl font-bold font-display">Socratix Multi-Agent AST Core</h3>
              <p className="text-textMuted text-sm leading-relaxed">Designed a two-tier modular NestJS micro-agent backend interface. Replaced vulnerable string hacks with a deterministic Math.js AST parser bounded behind versioned Redis state caching infrastructure.</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[10px] font-mono bg-surface border border-border px-2 py-0.5 rounded">NestJS</span>
                <span className="text-[10px] font-mono bg-surface border border-border px-2 py-0.5 rounded">Math.js AST</span>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 bg-[#020617] border border-border rounded-xl p-6 font-mono text-xs text-accentAi space-y-2 min-h-[240px] flex flex-col justify-center shadow-2xl">
              <div className="flex gap-1.5 border-b border-border/40 pb-3 mb-2 opacity-60"><span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span><span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span><span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span><span className="text-[10px] ml-2 text-slate-500">socratix_telemetry_stream.log</span></div>
              <div>[ROUTER] Intent Parsed: <span className="text-textPrimary">"MATH_ATTEMPT"</span> (~5ms)</div>
              <div>[VALIDATOR] Math.js AST Node Mapping initialized for string [3x+5=14]</div>
              <div>[CACHE] Redis Query Miss -&gt; Writing pipeline payload through to PostgreSQL backend</div>
              <div>[STREAM] Emitting chunk updates via Server-Sent Events (SSE) Protocol...</div>
            </div>
          </div>

          {/* [03] AKSARA TRANSFORMERS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              {/* Dynamic tab container layer placeholder for active visibility toggle setup */}
              <div className="relative border border-border rounded-xl bg-surface overflow-hidden aspect-video">
                <Image src="/assets/portfolio/aksara-matrix.png" alt="Aksara Confusion Matrix" layout="fill" className="object-cover" />
              </div>
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono text-accentAi">// OCT 2025 // DEEP LEARNING COMPUTER VISION</div>
              <h3 className="text-3xl font-bold font-display">Javanese Aksara CoaT Classifier</h3>
              <p className="text-textMuted text-sm leading-relaxed">Deployed Co-Scale Conv-Attentional Image Transformers (CoaT) to evaluate script handwritten profiles. Countered severe data imbalance matrices to stabilize an audited 96% F1-score across 20 distinct classes.</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[10px] font-mono bg-surface border border-border px-2 py-0.5 rounded">PyTorch</span>
                <span className="text-[10px] font-mono bg-surface border border-border px-2 py-0.5 rounded">CoaT Architecture</span>
                <span className="text-[10px] font-mono bg-surface border border-border px-2 py-0.5 rounded">Explainable AI</span>
              </div>
            </div>
          </div>

          {/* [04] FISH FRESHNESS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
              <div className="text-xs font-mono text-accentAi">// JUL 2025 - AUG 2025 // MULTIMODAL TRANSFORMERS</div>
              <h3 className="text-3xl font-bold font-display">Parallel Cross-Attention Fusion System</h3>
              <p className="text-textMuted text-sm leading-relaxed">Fused spatial vision pixels with numerical tokens via custom Multimodal Parallel Fusion Transformer models. Structured via Contrastive Learning metrics to maximize class alignment accuracy rules.</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[10px] font-mono bg-surface border border-border px-2 py-0.5 rounded">PyTorch</span>
                <span className="text-[10px] font-mono bg-surface border border-border px-2 py-0.5 rounded">Contrastive Learning</span>
                <span className="text-[10px] font-mono bg-surface border border-border px-2 py-0.5 rounded">92.7% Peak F1</span>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 relative border border-border rounded-xl bg-surface overflow-hidden aspect-video">
              <Image src="/assets/portfolio/fish-attention.png" alt="Multi-Head Attention Distribution Layout" layout="fill" className="object-cover" />
            </div>
          </div>

          {/* [05] NEUROKIT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 grid grid-cols-12 gap-4">
              <div className="col-span-7 relative h-64 border border-border rounded-xl overflow-hidden bg-surface">
                <Image src="/assets/portfolio/neurokit-hardware.jpg" alt="NEUROKIT Frame Spec" layout="fill" className="object-cover" />
                <div className="absolute bottom-2 left-2 font-mono text-[9px] bg-background/90 border border-border px-2 py-0.5 text-accentAi">DIMENSIONS: 15x14.5x20 cm // WEIGHT: 1.6kg</div>
              </div>
              <div className="col-span-5 grid grid-rows-2 gap-4">
                <div className="relative h-[118px] border border-border rounded-xl overflow-hidden bg-surface">
                  <Image src="/assets/portfolio/neurokit-mob1.jpg" alt="App Tab A" layout="fill" className="object-cover object-top" />
                </div>
                <div className="relative h-[118px] border border-border rounded-xl overflow-hidden bg-surface">
                  <Image src="/assets/portfolio/neurokit-mob3.jpg" alt="App Tab B" layout="fill" className="object-cover object-top" />
                </div>
              </div>
              <div className="col-span-12 relative h-24 border border-border rounded-xl overflow-hidden bg-surface flex items-center px-6">
                <Image src="/assets/portfolio/neurokit-test.jpg" layout="fill" alt="Human Validation Matrix" className="object-cover opacity-20" />
                <div className="relative z-10 font-mono text-sm text-textPrimary">
                  // WECHSLER MEMORY SCALE VALIDATION ACCURACY: <span className="text-accentAi font-bold">+11.35% COGNITIVE PERFORMANCE ELEVATION</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono text-accentAi">// JUL 2025 - NOV 2025 // NATIONAL PIMNAS BRONZE MEDAL</div>
              <h3 className="text-3xl font-bold font-display">NEUROKIT: Dynamic Neurotherapeutic Framework</h3>
              <p className="text-textMuted text-sm leading-relaxed">Integrated an ESP32 hardware hub with PWM MOSFET electrical matrices to emit dynamic, adaptive 500-600 lux lighting paths combined with contextual positive behavioral speech generation components.</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[10px] font-mono bg-surface border border-border px-2 py-0.5 rounded">ESP32 IoT</span>
                <span className="text-[10px] font-mono bg-surface border border-border px-2 py-0.5 rounded">Flutter App</span>
                <span className="text-[10px] font-mono bg-surface border border-border px-2 py-0.5 rounded">OpenRouter API</span>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* TIER 2 DATA ANALYTICS & CODE SHELL ARCHIVE ARCHITECTURE MATRIX            */}
        {/* ========================================================================= */}
        <div className="pt-16 border-t border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* [06] JTEHUB */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden flex flex-col justify-between group hover:border-accentWeb3 transition-colors">
              <div className="relative h-44 w-full border-b border-border">
                <Image src="/assets/portfolio/jtehub-hero.png" alt="JTEHub Frame" layout="fill" className="object-cover" />
              </div>
              <div className="p-6 space-y-2 flex-grow">
                <span className="text-[9px] font-mono text-accentWeb3 block">LATE 2024 // BACKEND SYSTEM</span>
                <h4 className="text-lg font-bold font-display text-textPrimary group-hover:text-accentWeb3 transition-colors">JTEHub Allocation Platform</h4>
                <p className="text-textMuted text-xs leading-relaxed">Wrote timezone-safe scheduling verification loops in NestJS to invalidate double-booking requests programmatically across relational databases.</p>
              </div>
              <div className="px-6 pb-6 text-[10px] font-mono text-textMuted">NestJS, Supabase, RBAC Guards</div>
            </div>

            {/* [07] PUBLIC FACILITY */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden flex flex-col justify-between group hover:border-accentAi transition-colors">
              <div className="relative h-44 w-full border-b border-border">
                <Image src="/assets/portfolio/anthropometric.png" alt="Data Graphics Profile" layout="fill" className="object-cover" />
              </div>
              <div className="p-6 space-y-2 flex-grow">
                <span className="text-[9px] font-mono text-accentAi block">APR 2024 - JUN 2024 // DATA SCIENCE</span>
                <h4 className="text-lg font-bold font-display text-textPrimary group-hover:text-accentAi transition-colors">Anthropometric Analytics Model</h4>
                <p className="text-textMuted text-xs leading-relaxed">Deployed Apriori and Eclat data mining algorithms over extensive demographic structures to map 7 structural public facility dimension criteria rules.</p>
              </div>
              <div className="px-6 pb-6 text-[10px] font-mono text-textMuted">Python, Apriori, Eclat Mining</div>
            </div>

            {/* [08] WARONG WAREM */}
            <div className="bg-surface border border-border rounded-xl overflow-hidden flex flex-col justify-between opacity-60 group">
              <div className="relative h-44 w-full border-b border-border bg-slate-900 flex items-center justify-center font-mono text-xs text-textMuted">
                [ LEGACY_SYSTEM_ARCHIVE.WEB ]
              </div>
              <div className="p-6 space-y-2 flex-grow">
                <span className="text-[9px] font-mono text-textMuted block">HISTORICAL CODE BASE // ACADEMIC</span>
                <h4 className="text-lg font-bold font-display text-textMuted">Warong Warem Fullstack</h4>
                <p className="text-textMuted text-xs leading-relaxed">Legacy setup displaying web interface foundations, relational database configurations, and fundamental input validations.</p>
              </div>
              <div className="px-6 pb-6 text-[10px] font-mono text-textMuted">HTML/CSS, Relational DB Schema</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

```

---

## 🚀 5. Implementation Rules for AI Developer Agent

* [ ] **Absolute Chronological Integrity:** The execution agent must match the target *latest-to-oldest* array mapping stringently without swapping project components.
* [ ] **Data-First Copy Priority:** Bullet details for `Aksara`, `Fish Freshness`, and `Public Facility` must feature model structures (CoaT, Cross-Attention, Apriori/Eclat) and explicit performance percentages (96% F1, 92.7% F1) to capture attention for data science roles.


* [ ] **Toggle Fix Preservation:** Do not modify the `picture[hidden] { display: none !important; }` directive embedded into global stylesheets during the bento layout construction.

```

```