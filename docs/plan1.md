
# Portfolio Website Implementation Specification

This document serves as a comprehensive, execution-ready specification for an AI Developer Agent to build a high-performance portfolio website. The design system and asset allocation are strictly tailored to map complex deep learning metrics, blockchain engineering architectures, and national awards directly to the provided project image assets.

---

## 🎨 1. Design Tokens & Configuration

### Color Palette (Tailwind Configuration)
```javascript
theme: {
  extend: {
    colors: {
      background: '#0B0F19', // Deep Slate primary canvas
      surface: '#1E293B',    // Muted Navy for cards/containers
      border: '#334155',     // Subtle slate border for separation
      accentAi: '#06B6D4',   // Electric Cyan for AI/Research highlights
      accentWeb3: '#A855F7', // Hyper Violet for Solana/Web3 interactive nodes
      textPrimary: '#F8FAFC',// Crisp White for headings
      textMuted: '#94A3B8',  // Muted Slate for body copy
    }
  }
}

```

### Typography (Google Fonts Integration)

* **Headings:** `Space Grotesk` (Geometric sans-serif for clean technical impact)
* **Body Copy:** `Inter` (Highly legible sans-serif for long text blocks)
* **Code & Data Metrics:** `Geist Mono` or `JetBrains Mono` (For tabular data, model parameters, and execution metrics)

---

## 📂 2. Static Asset Directory Mapping

Place all provided images inside the `/public/assets/portfolio/` directory using these exact file names:

| Original Filename | Destination Path | Target UI Component |
| --- | --- | --- |
| `landing-page-cora.png` | `/public/assets/portfolio/cora-hero.png` | CORA Project Card (Primary Split View) |
| `match-cora.png` | `/public/assets/portfolio/cora-gameplay.png` | CORA Project Modal / Expandable View |
| `javanese-aksara-classification-confusion_matrix_finetuned.png` | `/public/assets/portfolio/aksara-matrix.png` | Javanese Aksara Project Technical Details Tab |
| `javanese-aksara-classification-interpretation.png` | `/public/assets/portfolio/aksara-interpret.png` | Javanese Aksara Project Data Block |
| `visal-fish-freshness.png` | `/public/assets/portfolio/fish-attention.png` | Fish Freshness Parallel Fusion Transformer Block |
| `visual-anthropometric.png` | `/public/assets/portfolio/anthropometric.png` | Recommendation System Structural Layout |
| `awarding-night-pimnas38.HEIC` / `.jpg` | `/public/assets/portfolio/pimnas-award.jpg` | Awards Grid - Primary Cover (Convert to WebP/JPG) |
| `bronze-medalists-pimnas38.JPG` | `/public/assets/portfolio/pimnas-team.jpg` | Awards Grid - Detail Carousel |
| `awarding-night-gemastik2025.JPG` | `/public/assets/portfolio/gemastik-2025.jpg` | Awards Grid - GEMASTIK XVIII Cover |
| `gemastik2024.HEIC` / `.jpg` | `/public/assets/portfolio/gemastik-2024.jpg` | Awards Grid - GEMASTIK XVII Cover |
| `myself-techofest2024.jpg` | `/public/assets/portfolio/techofest-lead.jpg` | Experience Timeline - Techofest Main Image |
| `techofest2024.jpg` | `/public/assets/portfolio/techofest-team.jpg` | Experience Timeline - Techofest Team Modal |
| `ml-division-meeting.jpg` | `/public/assets/portfolio/ml-cohort.jpg` | Experience Timeline - ML Committee Grid |
| `warong-warem-web.png` | `/public/assets/portfolio/warong-web.png` | Supplemental Full-Stack Projects Archive Section |

---

## 📐 3. Section-by-Section Layout Architecture

### Section 1: Hero Component

* **Layout:** Full viewport height (`min-h-screen`), flex column on mobile, split grid (60/40) on desktop.
* **Left Column Copy:**
* Title: **Galnoel Peter Rindengan**.


* Subtitle: "Informatics Engineering Graduate | Deep Learning Research & Web3 Systems Architect".


* Bio: "Bridging the gap between complex deep learning models and highly resilient, production-ready distributed backends.".




* **Right Column Element:** Interactive Canvas running a lightweight WebGL network graph or particle system linking `accentAi` and `accentWeb3` color nodes.
* **Credential Ribbon (Sticky Base):** Minimalist horizontal strip featuring text blocks:
* 
`[CGPA: 3.93/4.00]`  | `[PIMNAS 38 Bronze Medalist]`  | `[Multi-Year GEMASTIK Finalist]`.





### Section 2: Core Engineering Expertise (Bento Grid)

Implement a CSS Grid featuring 3 structural cards:

1. 
**Card A (Deep Learning Research - `border-accentAi` focus):** * Highlights: Multimodal Parallel Fusion Transformers, CoAtNet, Contrastive Learning.


* Visual element: Inline rendering of a miniature vector graphic depicting multi-head self-attention.


2. 
**Card B (Web3 & System Architecture - `border-accentWeb3` focus):** * Highlights: High-throughput engines using Bun, Hono, Supabase, and automated server-side cryptographic settlement oracles via `@solana/web3.js`.


3. 
**Card C (Production Frameworks & Infrastructure):** * Grid of tech-stack pills: PyTorch, Next.js, n8n, Supabase (pgvector), Ollama, gRPC, Flask.



### Section 3: Deep Technical Projects (Alternating Layout)

Render each project using an explicit split-screen design (`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`).

Project 1: CORA – Solana-Based Web3 Game 

* **Grid Allocation:** Image (7 cols) | Copy (5 cols).
* **Image Component:** Stacked card rendering using `/public/assets/portfolio/cora-hero.png` as the base, with a minor offset overlay showing `/public/assets/portfolio/cora-gameplay.png` on mouse hover.
* **Copy Block:**
* Title: `Solana-Based Web3 Game (CORA)` 


* Core Highlights: High-throughput backend via Bun/Hono, automated cryptographic settlement oracle execution, Solana Actions API for wSOL wrapping, and execution state mirroring via MagicBlock Ephemeral.


* Tag Pills: `Bun` | `Hono` | `Supabase` | `@solana/web3.js` | `WebSockets`.





Project 2: Deep Learning Image Classification Showcase (GEMASTIK Portfolio) 

* **Grid Allocation:** Copy (5 cols) | Images/Data (7 cols).
* **Data & Image Tabs Component:**
* 
**Tab 1: Javanese Aksara Classification:** Displays image `/public/assets/portfolio/aksara-matrix.png` alongside performance metrics: **96% F1-score** using CoaT (Co-Scale Conv-Attentional Image Transformers). Alternate view button switches to `/public/assets/portfolio/aksara-interpret.png` showing model interpretations.


* **Tab 2: Fish Freshness Multimodal Fusion:** Displays image `/public/assets/portfolio/fish-attention.png` showing attention weight mappings. Key metrics text block: **85.4% Accuracy** and **84.3% F1-score** leveraging Contrastive Learning.


* Tag Pills: `PyTorch` | `Vision Transformers` | `CoAtNet` | `Contrastive Learning`.





Project 3: Public Facility Recommendation System 

* **Grid Allocation:** Image (6 cols) | Copy (6 cols).
* **Image Component:** High-contrast display of `/public/assets/portfolio/anthropometric.png` demonstrating structural dimension transformations.
* 
**Copy Block:** * Description: Application of Association Rule Mining over extensive Indonesian elderly anthropometric datasets to produce deterministic spatial configuration criteria.


* Tag Pills: `Data Mining` | `Association Rule Mining` | `Python`.





---

### Section 4: Professional Experience (Vertical Interactive Timeline)

Each chronological entry expands vertically on click to show system architecture details.

1. PT. Bank SulutGo — AI Engineer & RAG System Intern 


* 
*Metrics:* Deployed local, zero-leakage RAG infrastructure utilizing Ollama, n8n, and Supabase (pgvector) inside the bank's local servers.


* 
*Supervisor Validation Card:* A styled internal container highlighting performance evaluations: **95/100 for Discipline & Attitude** and **90/100 for Presentation Skills**.




2. 
**UNSRAT IT Community — Chatbot Project Lead & Machine Learning Committee** 


* *Visual Grid:* Flex-row containing `/public/assets/portfolio/techofest-lead.jpg` and `/public/assets/portfolio/techofest-team.jpg`.
* 
*Details:* Managed a 12-person multidisciplinary engineering cohort building a cross-platform client architecture using Gemini AI and serialized gRPC transmission channels via Flask.


* 
*Education Track:* Showcase `/public/assets/portfolio/ml-cohort.jpg` depicting the cohort of 20+ members guided through the machine learning foundation syllabus.





---

### Section 5: Honors & Awards Gallery (Bento Photo Wall)

Implement a multi-column masonry style grid for certificates and awarding nights.

* **Card 1 (PIMNAS 38 Showcase):** Base image `/public/assets/portfolio/pimnas-award.jpg`, hovering scales up the container to expose the team podium image `/public/assets/portfolio/pimnas-team.jpg`.
* Text Overlay: **3rd Place Presentation Category in PKM KC at PIMNAS 38 (November 2025)**.




* **Card 2 (GEMASTIK XVIII Showcase):** Image `/public/assets/portfolio/gemastik-2025.jpg`.
* Text Overlay: **Most Inspiring Team in GEMASTIK XVIII (October 2025)**.




* **Card 3 (GEMASTIK XVII Archive):** Image `/public/assets/portfolio/gemastik-2024.jpg`.
* Text Overlay: **Finalist of Data Mining Division in GEMASTIK XVII (October 2024)**.





---

## 🛠️ 4. Code Generation Directive (Next.js / Tailwind Component)

Execute the layout using this boilerplate framework as the architectural baseline for the portfolio structure:

```tsx
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PortfolioHome() {
  return (
    <div className="bg-background text-textPrimary min-h-screen font-sans antialiased selection:bg-accentAi selection:text-background">
      {/* Sticky Top Progress Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex justify-between items-center">
        <span className="font-mono text-accentAi font-bold tracking-wider">GP_RINDENGAN.IO</span>
        <div className="flex gap-6 text-sm font-medium text-textMuted">
          <a href="#projects" className="hover:text-accentAi transition-colors">/Projects</a>
          <a href="#experience" className="hover:text-accentWeb3 transition-colors">/Experience</a>
          <a href="#awards" className="hover:text-textPrimary transition-colors">/Awards</a>
        </div>
      </nav>

      {/* Hero Container */}
      <section className="container mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block bg-surface border border-border px-3 py-1 rounded-full text-xs font-mono text-accentAi">
              SYSTEM INITIALIZED // GRADUATE PORTFOLIO
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight font-display">
              Galnoel Peter Rindengan
            </h1>
            <p className="text-xl text-textMuted max-w-xl leading-relaxed">
              Informatics Engineering Graduate specializing in advanced Deep Learning architectures and production-grade Web3 infrastructure.
            </p>
          </div>
        </div>
        
        {/* Metric Ribbon Footer */}
        <div className="border-t border-border pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs text-textMuted">
          <div>[CGPA] <span className="text-textPrimary block text-base font-bold">3.93 / 4.00</span></div>
          <div>[PIMNAS 38] <span className="text-accentAi block text-base font-bold">Bronze Medalist</span></div>
          <div>[GEMASTIK] <span className="text-accentWeb3 block text-base font-bold">Multi-Year Finalist</span></div>
          <div>[CORE LANGUAGES] <span className="text-textPrimary block text-base font-bold">Python, TypeScript</span></div>
        </div>
      </section>

      {/* Project Section Framework */}
      <section id="projects" className="bg-surface/30 border-t border-b border-border py-24 px-6">
        <div className="container mx-auto space-y-32">
          {/* Web3 Project Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 relative group overflow-hidden rounded-xl border border-border bg-surface">
              <Image 
                src="/assets/portfolio/cora-hero.png" 
                alt="Solana CORA Interface" 
                width={800} 
                height={450}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <span className="text-accentWeb3 font-mono text-xs tracking-widest block">// CORE WEB3 PROJECT</span>
              <h3 className="text-3xl font-bold tracking-tight">Solana Web3 Engine (CORA)</h3>
              <p className="text-textMuted text-sm leading-relaxed">
                Engineered a high-throughput backend using Bun and Hono, orchestrating real-time WebSocket state management and designing an automated server-side cryptographic settlement oracle.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

```

---

## 🚀 5. Automation Strategy & System Optimization Checklist

Ensure the codebase execution pipeline performs the following tasks programmatically:

* [ ] **Automated Conversion Matrix:** Convert all uploaded input source formats (`.HEIC`, `.JPG`, `.png`) to low-latency `.webp` format using `next/image` compression layers to keep structural loading speeds optimized.
* [ ] **Stateful Interactive Componentry:** Implement simple state transitions inside the Deep Learning block using standard React `useState` frameworks to switch active graphics between the classification matrix and visual network outputs seamlessly.
* [ ] **Lazy Loading Protocols:** Bind all asset rendering functions to scroll coordinates via Intersection Observer endpoints so images render progressively as recruiters move down the timeline.

```

```