# Developer Portfolio Website — Rules for AI

Read this whole file before writing portfolio code or copy. It is intended primarily for computer science students, fresh graduates, software developers, and AI/ML engineers.
Keep this file as the source of truth and reference it from existing project instructions when appropriate. Do not overwrite an existing `AGENTS.md` or `CLAUDE.md` to install these rules.

**MUST / NEVER** = non-negotiable. **SHOULD** = default; the owner's explicit preference can override it.
Unless explicitly marked MUST / NEVER, numerical design budgets, section counts, and style choices are SHOULD defaults. Apply only the role-specific requirements relevant to the project.

**Priority when rules conflict:**

1. Honesty, accessibility, security
2. The owner's explicit request
3. Clarity of message
4. Performance
5. Visual flair

**Research reviewed:** 13 October 2026. Linked sources and their scope are in §14. Hiring advice is practitioner guidance, not a guarantee of interviews or a universal hiring standard. The implementation rules below are an editorial synthesis; formal accessibility criteria and performance measurements are identified separately.

---

## 1. Goal

A portfolio should help a relevant visitor understand what the owner can build, inspect credible evidence, and decide whether to start a conversation. It supports the résumé, applications, and interviews; it does not replace them.

An excellent portfolio is:

1. **Clear** — identity, target role, strongest work, and contact route are easy to find on a quick scan.
2. **Credible** — real work, real outcomes, no filler.
3. **Distinctive** — it feels like this person, not a template.
4. **Fast and accessible** — works on any device, for everyone.
5. **Easy to maintain** — the owner can update projects through a documented, repeatable editing process.

### 1.1 Design for two levels of review

| Visitor | Make immediately available | Offer on deeper inspection |
|---|---|---|
| Recruiter / initial reviewer | Role fit, graduate status when relevant, strongest projects, résumé, contact | Concise experience, education, attributable achievements |
| Engineer / hiring manager | Problem solved, personal contribution, result, demo / source | Trade-offs, implementation evidence, tests, evaluation, limitations |

Keep the homepage easy to scan and put depth in linked case studies and repositories. This adapts [Josh Comeau's portfolio guidance](https://www.joshwcomeau.com/effective-portfolio/) and [GitHub's job-search guidance](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume); it does not assume every employer reviews portfolios.

Use a five-second identity check and a thirty-second project/contact check as **usability exercises**, not as proven recruiter attention spans. Prefer feedback from someone unfamiliar with the work over guessing what is obvious.

---

## 2. Before you build

### 2.1 Gather inputs

Inspect existing content, repositories, résumé, and owner-provided evidence first. Ask only for material missing information — at most 5 targeted questions together — and continue independent work with clearly marked draft placeholders.

- Name, role/title, location (or "remote")
- Audience and goal (get hired, win clients, apply to school, sell work…)
- Best available projects: title, personal role, problem, status, outcome, links, and evidence; do not demand a quota
- Skills and tools they actually use
- Short experience / education
- Contact methods and profile links they want public
- Taste: 2–3 sites they like, colors/fonts to use or avoid, tone (formal, friendly, playful)
- Existing assets: photo, logo, résumé, brand colors, domain
- Constraints: stack, hosting, languages, deadline
- Target roles and job descriptions, if available; intended hiring market and site language
- For AI/ML work: data provenance, evaluation setup, model ownership, and what can be reproduced or shared

### 2.2 Choose a credible positioning

- Choose one primary role or a coherent combination supported by the work, such as backend engineering with applied ML. Avoid a headline listing every possible job title.
- For a graduate, state the degree/status accurately and what they build. Do not invent commercial clients to fill an "I help businesses" formula.
- Use the vocabulary of relevant job descriptions naturally, with evidence for each important skill. No keyword stuffing or unsupported "expert" labels.
- Graduation date, availability, location, and work preferences may be useful when supplied by the owner. Do not infer work authorization or publish personal details from a résumé automatically.
- A learning project can demonstrate ability without paying users, professional experience, or a novel research contribution.

### 2.3 Never fabricate

- NEVER invent projects, clients, employers, job titles, metrics, awards, testimonials, logos, certifications, or quotes.
- NEVER leave lorem ipsum, "John Doe", or fake statistics in the output.
- Missing content in drafts MUST be a visible, greppable placeholder: `{{TODO: what is needed}}`. Before publication, resolve it or omit the incomplete optional section and report the omission.
- Quantitative claims MUST be traceable to owner-provided evidence or an explicitly documented measurement. Record the method, scope, date/version, and source. Do not turn a prototype benchmark into a claim about real customers.
- NEVER present stock or AI-generated images as the owner's real work, or as real people (testimonials, team).
- Distinguish personal work, team results, course scaffolding, third-party libraries, pretrained models, and API services. Credit material dependencies and respect sharing permissions.
- The owner should be able to explain the decisions and code being showcased. Describe substantial AI assistance when it matters to authorship or evaluation; never claim independent model training for an API integration.

### 2.4 Choose a design direction first

For a new design or substantial redesign, write a short direction (5–8 lines): personality/tone, color palette, typography, layout, motion, and an optional signature detail grounded in the work. Match it to the owner's field (see §10). For a small edit, follow the established direction.

---

## 3. Structure & content

### 3.1 Pages and sections

A single page can work well for a small portfolio. Give long featured case studies shareable pages or stable links with directly accessible content. Default sections:

1. **Header / nav** — name or logo, ≤ 5–6 links, a clear "Contact" action
2. **Hero** — name, credible role/focus, one specific sentence about the work, primary CTA ("View projects"), secondary CTA ("Résumé" or "Contact")
3. **Selected work** — usually 2–4 strong featured projects; fewer is fine, and up to 6 is reasonable when each adds distinct evidence
4. **About** — short and human, with a photo if the owner provides one
5. **Skills / tools** — grouped by category, honest
6. **Experience / education** — brief, reverse-chronological; useful context for students and graduates
7. **Supporting evidence** — relevant competitions, contributions, certificates, publications, or real testimonials (optional)
8. **Contact** — working email/form + profile links
9. **Footer** — links and copyright (year generated dynamically or omitted)

The initial viewport SHOULD establish identity, focus, and a next action. Do not force every detail above the fold on small screens. Keep selected work close to the introduction; avoid a full-screen empty hero that delays the evidence.
Keep résumé, GitHub, and contact easy to reach. LinkedIn and research/model profiles are useful when maintained and relevant. Do not make users complete an animation, open a chatbot, or learn terminal commands to access basic information.
NEVER use a splash screen/preloader, scroll-jacking, or autoplay video with sound.

### 3.2 Copywriting

- Voice: first person for individuals ("I design…"), consistent tense and tone, plain language, active verbs.
- Be specific, not generic. Example only — never reuse as the owner's facts:
  - ❌ "Passionate developer who loves building things."
  - ✅ "I build fast, accessible web apps for early-stage startups."
- Graduate-friendly hero formula: *{Current status / role}. I build {specific systems} using {relevant strengths}.* For client work, *I help {audience} {achieve outcome} through {craft}* can fit. Every filled-in claim must be true.
- Avoid unsupported clichés: "passionate", "results-driven", "team player", "ninja / rockstar / guru", "synergy", "think outside the box". A greeting or "Hello, World!" may be a small personality detail, but must not replace useful positioning.
- Buttons and links use verbs: "View case study", "Email me". Avoid "Learn more" and "Click here".
- Short paragraphs, usually 1–3 sentences. Headings should carry meaning on their own; line count varies by screen size.
- Skills: no percentage bars or star ratings. Group tools by useful capability and connect important skills to project evidence. Separate current working skills from things being learned.
- About: 2–3 short paragraphs — what you do, how you work or what you care about, one human detail.

### 3.3 Select projects for evidence

- Rank projects by relevance to the target role, contribution depth, inspectable evidence, and distinct skills demonstrated. The first project should be the strongest relevant one, not automatically the newest.
- Prefer a few complementary projects over multiple near-identical CRUD apps or notebooks. Do not start extra projects just to reach a number.
- Coursework, capstones, hackathons, open-source contributions, internships, and personal tools are valid material. Explain the original problem, constraints, and work beyond any provided starter. [Brandeis' career guidance](https://globalcareers.brandeis.edu/resources/the-cse-technical-portfolio-visual-guide/) explicitly treats academic and individual projects as portfolio material.
- A familiar problem or dataset is acceptable when the owner demonstrates independent decisions and analysis. Label tutorials and reproductions honestly; link the source and explain additions.
- A useful, well-tested small tool can be stronger evidence than an ambitious unfinished system. Clearly label prototypes, completed work, research experiments, and archived projects.
- Keep additional work in a secondary section when useful. Preserve an existing six-project selection if it is purposeful; curation does not require deleting the owner's history.

### 3.4 Project cards and case studies

- Each card: descriptive title, problem or capability, personal role, one concrete result/status, 2–4 relevant tags, and a clear details link.
- Use an actual screenshot, output sample, evaluation chart, or architecture preview when it adds evidence. Backend and ML projects do not need invented product mockups.
- Each project MUST distinguish the owner's contribution from the team's output. "We built" alone does not establish what the owner did.
- Link to a live demo, relevant repository, pull request, paper, or reproducible notebook where available. Verify the intended destination, not just that a URL responds.
- A deployed demo is useful but not mandatory. Provide sample input/output, a captioned short recording, or a walkthrough when hosting is expensive, private, or unavailable. Label prerecorded results and demo limitations.
- Let visitors understand the project without registration, API keys, a download, or running its code. Offer a safe sample mode where practical; use synthetic demo data when needed.

Case study structure (use for featured projects):

```md
# {Project} — {specific problem or verified outcome}
Short summary: what it does, my contribution, and the result/status.
Context (personal / course / team / work) · Role · Dates · Status · Tools
Links: demo / source / relevant contribution / report

## The problem
Who needed what, and what constraints mattered?
## What I did — my specific contribution
What did I design, implement, evaluate, or fix? What belonged to others?
## Process & key decisions — including trade-offs
Explain one or two difficult choices, alternatives, and what changed after testing.
## Evidence & result
What works? Link an artifact. Give measurements with their scope, if available.
## Limitations & next steps
What failed, remains untested, or would need to change for broader use?
```

Keep the summary understandable to a non-specialist. Put technical depth under clear headings; do not require reading a long chronological diary. Include visuals next to the claim they explain, with captions and text equivalents.

### 3.5 Evidence, metrics, and repository readiness

- A result can be a working feature, merged contribution, evaluated hypothesis, usability finding, or documented limitation. Commercial impact and numerical improvement are not prerequisites.
- For a performance claim, state the workload, environment, baseline, measurement method, and relevant statistic. A local load test does not establish production scalability.
- For competitions, distinguish participation, finalist placement, prize, and leaderboard score; give the event/date and supporting record when public. Certificates support demonstrated work and should not dominate the introduction.
- Keep site, résumé, and repository claims consistent. Direct links to relevant code, reports, and contributions save reviewers time.

Featured repositories SHOULD have a concise purpose, setup/run instructions, sample output or demo, dependencies, and a meaningful verification command when applicable. Use readable structure, document known limitations, and make attribution clear. A collaborator should be able to try a small example without reconstructing the project. This adapts [GitHub's recommendations for showcased projects](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume).

Private work may use an approved summary or sanitized artifact; do not publish confidential code or data to satisfy a portfolio checklist. Stars, contribution streaks, and commit counts are not substitutes for inspecting work.

---

## 4. Visual design

### 4.1 Principles

- Commit to **one** clear aesthetic. Consistency beats variety.
- Hierarchy first: the eye must know where to look first, second, third.
- Let the work be the hero — UI chrome stays quiet so project visuals shine.
- Whitespace is a feature. Be generous.
- A template, system font, or familiar layout is acceptable when adapted to the owner's content. Distinction should come from real work and thoughtful presentation; novelty is not a hiring requirement.
- Avoid decorative effects that compete with the evidence. Gradients, glass effects, and 3D are choices to justify, not automatic signs of quality or reasons to reject a design.

### 4.2 Typography

- ≤ 2 font families (one variable family plus an optional display or mono accent). Pair for contrast, not near-similarity.
- Choose readable fonts that fit the tone and rendering budget. System fonts, Inter, Roboto, and Arial are all valid choices.
- Fluid type scale with `clamp()` (ratio ≈ 1.2–1.333). Body 16–20 px, line-height 1.5–1.7; headings 1.1–1.3.
- Line length 60–75 characters. Left-align body text. Use `text-wrap: balance` on headings.
- No long text in all caps; no light-gray-on-white body text.

### 4.3 Color

- Define tokens once: `--bg`, `--surface`, `--text`, `--text-muted`, `--border`, `--accent`, `--accent-hover`, `--focus`, `--success`, `--error`.
- One neutral family + one accent (optional secondary). Use the accent sparingly: CTAs, links, key highlights.
- Meet contrast in every theme: normal text ≥ 4.5:1; large text ≥ 3:1; visual information needed to identify controls and graphical objects ≥ 3:1 against adjacent colors, subject to WCAG exceptions.
- One well-tested theme is sufficient. If multiple themes are offered, respect `prefers-color-scheme` initially and allow a persistent manual override.

### 4.4 Layout & spacing

- 4/8 px spacing scale; consistent section padding; one container max-width (≈ 1100–1280 px) with comfortable gutters.
- Use CSS Grid/Flexbox. Align related elements consistently and make any intentional asymmetry legible.
- Vary rhythm: don't repeat "centered heading + three cards" in every section. Mix full-bleed, asymmetric, and text-led layouts.
- A sticky header is fine if compact and it never hides focused elements or anchor targets. Allow it to adapt when text is enlarged.

### 4.5 Imagery & icons

- Show real work with detail, not just one hero shot. Keep aspect ratios and corner radii consistent across cards.
- Device mockups only when they add clarity.
- Prefer one consistent SVG icon set. Icons and emoji must not replace clear labels for essential navigation or actions.
- Text over images needs an overlay or another guarantee of contrast.

### 4.6 Motion

- Purposeful only: guide attention, confirm actions, show state change. 150–400 ms, ease-out for entrances.
- Animate `transform` and `opacity`; avoid animating layout properties.
- MUST honor `prefers-reduced-motion` (swap for simple fades or nothing).
- Core identity, project summaries, and contact information MUST be available without waiting for animation or JS. Interactive demos may need JS; provide a useful static explanation.
- NEVER: scroll-jacking, blocking intro animations, animation on every element, custom cursors that harm usability.
- Controls have designed hover, `:focus-visible`, active, and disabled states where applicable.

---

## 5. Engineering

### 5.1 Stack

Use the owner's stack and preserve a working repository unless a change solves a concrete problem. This repository currently uses plain HTML/CSS/JS on GitHub Pages; these rules alone do not justify a framework migration. For a new site, default to **static-first**:

- 1–3 pages: plain HTML + modern CSS + minimal JS.
- Many projects or a blog: a static generator or framework with a supported static output mode, if it reduces maintenance. Verify hosting compatibility before choosing it.
- Tailwind CSS is fine; otherwise modern CSS with custom properties.
- Use TypeScript when using a framework.
- Prefer boring, well-supported tools. Don't add a dependency for what HTML/CSS can do. No jQuery. Use heavy animation libraries only when justified, and budget their cost.
- Hosting: a suitable static host with HTTPS. A custom domain is optional; a stable hosted address is sufficient.

### 5.2 Code quality

- Semantic HTML first (`header`, `nav`, `main`, `section`, `article`, `footer`; `button` for actions, `a` for navigation).
- Use shared CSS custom properties for repeated design decisions (colors, spacing, type, radii, shadows, durations). Explain unusual one-off values when their purpose is not clear.
- Small, single-purpose components; consistent naming; comments explain *why*, not *what*.
- Prefer structured data/Markdown for repeated content when the stack supports it. A small static site can keep clearly organized HTML with documented editing steps; do not add a build system just to satisfy a folder pattern.
- Linter and formatter configured and passing; no console errors; no unused code or dependencies.
- Suggested structure (adapt to the framework):

```text
├─ README.md          # how to run, edit content, deploy
├─ content/           # projects, about, experience (md / json / yaml)
├─ src/
│  ├─ components/
│  ├─ layouts/
│  ├─ pages/
│  └─ styles/         # tokens.css, base.css, utilities
└─ public/            # favicon, og-image, resume.pdf, fonts, images
```

---

## 6. Performance

Separate real-user outcomes from local test results:

- **Field targets:** LCP ≤ 2.5 s, CLS ≤ 0.1, and INP ≤ 200 ms at the 75th percentile, assessed separately for mobile and desktop. These are [Google's Core Web Vitals thresholds](https://web.dev/articles/vitals).
- **Lab target:** aim for Lighthouse mobile performance ≥ 90, with ≥ 95 as a stretch goal for a simple static portfolio. Record other category scores and fix actionable findings. Google's [Lighthouse scoring guide](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) calls 90–100 good; a perfect score is not a requirement.
- Record the tested URL/version, date, tool version, and device/throttling settings. If scores vary materially, report a small repeated sample and median rather than cherry-picking the best run.
- Lighthouse navigation tests report TBT; it can help diagnose responsiveness but does not establish real-user INP. Small or new sites may lack field data: report **unavailable**, not "passed". [Lab and field data measure different conditions](https://web.dev/articles/lab-and-field-data-differences).
- **Project budgets:** initial JS ≈ ≤ 100 KB gzipped; initial transfer ≈ ≤ 1 MB excluding lazy-loaded media. These are local defaults, not web standards. Investigate meaningful regressions and document justified exceptions.

- **Images:** appropriate modern formats with fallback; responsive `srcset` / `sizes`; explicit dimensions or `aspect-ratio`; lazy-load offscreen images. Never lazy-load the likely LCP image; consider `fetchpriority="high"` for that image rather than every prominent asset.
- **Video:** muted, `playsinline`, poster image, `preload="none"` unless it's the hero; MP4/WebM, not GIF.
- **Fonts:** ≤ 4 font files; self-host WOFF2; subset; `font-display: swap`; preload only the critical one. A system font stack is a valid choice.
- **No layout shift:** reserve space for images, embeds, and late-loading content.
- **Third-party scripts:** avoid; if essential, load with `async` / `defer` and justify it.
- **Core content works without JS** where feasible (static HTML first).

---

## 7. Accessibility (target WCAG 2.2 AA)

Use [WCAG 2.2](https://www.w3.org/TR/WCAG22/) as the reference. This checklist supports implementation; it is not a complete conformance audit. Automated scores alone cannot establish accessibility.

- Landmarks: `header`, `nav`, `main`, `footer`; clear heading hierarchy; `lang` set on `<html>`. Prefer one descriptive `<h1>` per page as a project convention, not a literal WCAG requirement.
- A "Skip to content" link is the first focusable element.
- Everything works by keyboard in a logical order, with no traps. Focus remains visible and is not hidden by sticky content. Use a clearly contrasting focus indicator; do not mislabel the separate AAA Focus Appearance criterion as AA. Dismissible popups handle `Esc`; modal dialogs contain focus and restore it when closed.
- Images: meaningful `alt` text that conveys purpose; decorative images use `alt=""`. Icon-only buttons have accessible names.
- Links have descriptive text; underline links inside body copy (don't rely on color alone).
- Prefer touch targets ≥ 44×44 CSS px. AA [Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) uses 24×24 CSS px **or its defined exceptions**, including sufficient spacing and inline links. Do not apply the simplified size rule as a universal pass/fail test.
- Forms: visible `<label>`, errors linked via `aria-describedby`, never placeholder-as-label.
- Use ARIA only when native HTML can't do the job.
- Text resizes to 200% without breaking; never disable zoom.
- No flashing content (> 3 flashes per second). Auto-moving content longer than 5 s needs a pause control.
- Caption meaningful video speech; provide text for essential audio/visual information. Charts and architecture diagrams need a readable explanation, not only an image.
- Review keyboard behavior, zoom/reflow, contrast, names/labels, and basic screen-reader output as well as automated findings. Report exactly what was tested.

---

## 8. Responsive

- Mobile-first CSS. Check representative widths such as 320, 375, 768, 1024, and 1440 px, plus widths where the layout changes. No unintended page-level horizontal scroll.
- Fluid spacing and type with `clamp()`. Use `dvh` instead of `vh` for full-height mobile sections.
- Navigation collapses cleanly on small screens; no hamburger on desktop if the links fit.
- Every hover interaction has a touch and keyboard equivalent.
- Test reflow at a 320 CSS px equivalent viewport (for example, 400% zoom at a 1280 CSS px starting width). [WCAG reflow guidance](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) permits exceptions for content requiring two-dimensional layout; keep necessary table/code scrolling inside a usable container.
- Avoid nested scroll areas for long project stories. Direct links should survive refresh, and browser Back should behave predictably for project dialogs or detail views.

---

## 9. SEO, sharing, privacy & security

**SEO & sharing**

- Unique `<title>` (≈ ≤ 60 chars, e.g. "Name — Role") and meta description (≈ ≤ 160 chars) on every page.
- Open Graph and Twitter Card tags; OG image 1200×630 (per page or a strong default).
- Canonical URL, `sitemap.xml`, `robots.txt`, favicon set, `theme-color`, custom 404 page.
- JSON-LD `Person` schema (name, jobTitle, url, `sameAs` profile links).
- Clean URLs (`/work/project-name`). No keyword stuffing.

**Contact, privacy & security**

- At least one working contact route (email shown as copyable text and/or a form). Test it.
- Don't publish a phone number or home address unless the owner asks.
- Forms: validation, spam protection, and clear success/error states. A copyable email address is enough if a form adds unnecessary complexity.
- NEVER put private credentials in client code, generated static files, or public repositories. Environment variables compiled into browser bundles are public too. Put any secret-dependent form or model calls behind a suitable server endpoint.
- Public AI demos should bound usage and cost, avoid exposing private data, and handle unavailable services clearly. Offer a static sample when a backend is unnecessary or unaffordable.
- External links that open in a new tab use `rel="noopener noreferrer"`. HTTPS only, no mixed content; add security headers (e.g., CSP) where the host allows.
- Analytics: none, or privacy-friendly (e.g., Plausible, Umami). Add a cookie/consent banner only if cookies or tracking require it — not by default.
- Résumé PDF: current, small, real text (not a scanned image).
- Keep essential identity, education, and project summaries as selectable HTML as well. Use a clearly named résumé file and a stable URL; keep dates, titles, and results consistent across public profiles.

---

## 10. Adjust by field

The following role choices are an editorial framework for choosing evidence, not universal job definitions. Use the actual target job description to decide which depth matters.

| Target | Lead with | Useful deeper evidence |
|---|---|---|
| CS student / fresh graduate | Best relevant work, personal contribution, education/status | Capstone, internships, teamwork, improvements made after feedback |
| Software developer / backend engineer | Working behavior, maintainable code, problem-solving | Data model, APIs, tests, failure handling, justified architecture |
| Frontend / full-stack developer | Usable interface and working user flow | Accessibility, responsive states, integration, performance, tests |
| ML engineer | Data-to-prediction workflow and defensible evaluation | Baselines, reproducibility, serving constraints, error analysis |
| AI application engineer | A useful model-powered workflow and evidence it succeeds | Task evaluation, retrieval/tool behavior, latency/cost, failure handling |
| Data scientist / research-oriented applicant | Question, methodology, finding, limitations | Reproducible analysis, statistical reasoning, papers/posters if available |

### 10.1 Students and fresh graduates

- State the degree, institution, and graduation or expected graduation date accurately. Include only relevant coursework when it explains the work or target role.
- Give academic and competition projects professional-quality explanations without relabeling them as employment or production products.
- Show how the owner learned: a bug investigated, design improved, review addressed, or hypothesis rejected. Support "teamwork" with a specific collaboration example.
- Internships, open-source fixes, campus tools, teaching, and research assistance can demonstrate useful skills; paid work is not the only valid evidence.
- Present relevant awards and certificates briefly with issuer/date and evidence where available. Do not make a visitor scroll past a certificate gallery to see the projects.
- A strong initial release can contain one or two well-explained projects. Keep improving the evidence while applying; endless portfolio redesign is not a prerequisite to a job search.

### 10.2 Software engineering evidence

For the strongest engineering case study, select the details that genuinely affected the solution:

- **Behavior:** a representative user flow or API request/response, plus an important error or empty state.
- **Design:** a small architecture/data-flow diagram when useful, and why the chosen database, API boundary, or architecture fits the constraints. Simplicity can be a good decision.
- **Correctness:** meaningful tests for core behavior, validation, and failure handling. Explain what the tests establish; coverage percentage alone is insufficient evidence.
- **Operation:** setup, deployment status, and relevant security or reliability decisions. For performance/scalability claims, include the measurement conditions from §3.5.
- **Collaboration:** a reviewed pull request, issue discussion, or clearly scoped contribution when available. Do not fabricate a team process for a solo project.

Do not require every project to demonstrate microservices, Kubernetes, cloud spending, or a full production operations stack. Match complexity to the problem and the level of the applicant.

### 10.3 ML engineering evidence

For a featured ML project, provide the following information or explicitly identify what is missing. It can live in a linked technical report or repository rather than all on the homepage.

1. **Problem and baseline:** identify the prediction task and why ML is useful. Compare against an appropriate simple heuristic or model under the same evaluation conditions. [Google's Rules of ML](https://developers.google.com/machine-learning/guides/rules-of-ml) favors simple starting models and a reliable surrounding pipeline.
2. **Data and split:** identify the data source/version, relevant usage restrictions, approximate size, and train/validation/test strategy. Explain leakage controls; fit learned preprocessing only on training folds. Use temporal or grouped splits when the problem requires them. See [scikit-learn's leakage guidance](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage).
3. **Evaluation:** name the metric, why it suits the task, the evaluation set, and baseline comparison. Distinguish validation results from held-out test results. Show task-appropriate errors or slices; do not headline an unexplained accuracy score.
4. **Reproduction:** document dependencies, data access, random seeds where relevant, and training/evaluation or inference commands. If retraining is expensive, offer a small reproducible example and describe compute requirements. Do not promise exact reproducibility where it has not been demonstrated.
5. **System behavior:** for an engineering target, show how a prediction is used through an API, batch process, or application. Explain relevant latency, resource, or training/serving consistency constraints; label any proposed monitoring as future work.
6. **Model documentation:** identify model/version, what was pretrained versus trained/fine-tuned by the owner, intended use, training/evaluation context, and known limitations. A short [Hugging Face-style model card](https://huggingface.co/docs/hub/model-cards) is a useful format when publishing a model.

A notebook can be appropriate evidence for analysis or research. For an engineering target, strengthen it with reusable code and a runnable path when appropriate. Do not imply production readiness merely because a model has a web demo.

### 10.4 LLM, retrieval, and agent projects

- Separate the underlying model/provider's capabilities from the owner's contribution: application logic, retrieval, tools, data preparation, evaluation, or fine-tuning.
- Include a small versioned evaluation set, explicit success criteria, and realistic failure cases. A handful of favorable screenshots does not establish reliability.
- For retrieval systems, assess retrieved evidence and final answer quality separately. For agents, assess completed outcomes and tool failures; record relevant latency/cost and test conditions when making those claims.
- Explain the grader: deterministic checks, human review, or a model judge. Review failures and calibrate model judging against human assessments rather than treating its score as unquestionable. This adapts [Anthropic's agent evaluation guidance](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).
- Show behavior when evidence is missing, an input is unsupported, or a dependency fails. Label simulated, cached, and prerecorded responses. Keep public demo inputs separate from confidential data.
- A useful integration can be a valid project. Its credibility comes from the problem solved and the implementation/evaluation evidence, not merely the presence of an AI label.

### 10.5 Other portfolio audiences

If adapting this document beyond development: designers should emphasize process and outcomes; visual artists should foreground optimized work; writers and researchers should emphasize readable publications; freelancers should make services and verified client outcomes easy to find. Retain the same honesty, accessibility, and evidence rules.

---

## 11. Quality gate — Definition of done

**Content**

- [ ] Identity, credible focus, and next action are clear; résumé and contact are easy to find
- [ ] Featured projects are chosen for relevance and depth; each has personal contribution, result/status, and inspectable evidence
- [ ] Metrics identify their scope and source; team outcomes, prototypes, and completed capabilities are distinguished
- [ ] Applicable software / ML / AI evidence in §10 is present, or gaps are stated honestly
- [ ] No invented facts; publication content contains no unresolved `{{TODO: ...}}` placeholders
- [ ] Spell-checked; consistent voice and tense
- [ ] Résumé, site, and profile claims agree; contact route, project destinations, and résumé link tested
- [ ] A quick independent review was sought where practical; report findings or note that it was not performed

**Design**

- [ ] Intentional at 320 / 768 / 1440 px — no unintended page-level horizontal scroll or overlaps
- [ ] Spacing, type, and color come from tokens
- [ ] Hover, focus, active, and disabled states exist where applicable
- [ ] Every supported theme passes contrast

**Engineering**

- [ ] Available build/lint/format checks pass; unexpected warnings reviewed; no relevant console errors
- [ ] Core behavior, internal links, project deep links, and browser Back/refresh work
- [ ] Content-editing steps are clear; no unnecessary stack migration or maintenance burden
- [ ] README covers run / edit / deploy
- [ ] Public files, client bundles, and demo data contain no private credentials or confidential information

**Performance & accessibility**

- [ ] Lighthouse results and test conditions recorded; performance aims for ≥ 90, with justified gaps reported
- [ ] Field LCP / CLS / INP reported against §6 targets where available; missing field data explicitly marked unavailable
- [ ] Full keyboard walkthrough passes; focus always visible
- [ ] Automated accessibility findings triaged; known barriers fixed or reported; manual headings, labels, alt text, contrast, and basic screen-reader checks documented
- [ ] Text resize, reflow, navigation, project details, and contact remain usable
- [ ] Reduced-motion tested

**SEO & sharing**

- [ ] Title, description, and OG image set on every page; sitemap, robots, canonical present
- [ ] Link preview checked; favicon and 404 page present

---

## 12. Workflow & final report

For a new site, follow the sequence below. For changes to an existing site or its documentation, apply only the relevant steps and preserve working structure.

1. Read this file and everything the owner provided.
2. Ask only essential questions (≤ 5); otherwise state assumptions and proceed.
3. Choose the target role and strongest evidence; share the design direction (§2.4) for UI work.
4. Scaffold: structure, tokens, layout, navigation.
5. Build a vertical slice first — hero + one full project page — and get it right, then replicate.
6. Fill the remaining sections; wire up the content files.
7. Polish: spacing, type, all states, motion.
8. Run the applicable quality gate (§11); fix issues before reporting. Do not claim website audits for a documentation-only edit.
9. Deliver: README + final report.

**Working rules**

- Make the smallest change that solves the problem. Preserve unrelated changes and follow existing repository conventions. Edit supporting files when necessary for the authorized task; never discard the owner's work to enforce a stylistic preference.
- Don't add big unrequested features (CMS, blog, i18n, e-commerce) — suggest them instead.
- If the owner asks for something that breaks a SHOULD rule (e.g., a larger image budget), do it and state the trade-off briefly. NEVER rules still apply.
- NEVER claim a check passed that you didn't run. If a tool or browser isn't available, say so.
- Fix broken access, unclear project evidence, and unsupported claims before optional visual polish. Do not spend the whole budget chasing a perfect score.
- Before a new application cycle or after changing projects, recheck demos, résumé, contact links, and availability statements. Archive unavailable work with honest context and a useful fallback.

**Final report (keep it short)**

- What was built (pages / sections)
- Decisions and assumptions
- Remaining `{{TODO}}` placeholders
- How to run, edit content, and deploy
- Audit results (Lighthouse scores, accessibility checks) and known gaps
- Up to 3 suggested next steps

---

## 13. Anti-patterns (quick list)

- Lorem ipsum, fake testimonials, fake client logos
- Skill percentage bars; a wall of every technology ever touched
- Splash screens, preloaders, autoplay audio
- Carousels that hide key content; 10+ projects in an unfiltered grid
- Dead links, empty social icons, "coming soon" sections
- Removed focus outlines; tiny, low-contrast gray text
- Giant unoptimized images or background video
- Unnecessary consent banners or undisclosed tracking
- Template placeholders, uncredited copied work, or another developer's personal branding presented as the owner's
- A wall of certificates or tool logos before the selected work
- Treating API usage as original model training, or reporting ML results without evaluation context
- Requiring sign-up, private API keys, or a costly model download to understand a project
- "Production-ready", "scalable", or "secure" claims unsupported by the demonstrated scope
- Presenting Lighthouse lab results as proof of real-user INP or full WCAG conformance

---

## 14. Research basis and sources

Reviewed 13 October 2026. These are primary practitioner accounts, institutional guidance, and official technical references. The advice is paraphrased and adapted for this portfolio; project counts, layout choices, and role-specific evidence lists are flexible editorial defaults.

| Source | What it supports | Scope / limitation |
|---|---|---|
| [Josh Comeau — Building an Effective Dev Portfolio](https://www.joshwcomeau.com/effective-portfolio/) | Curated projects and helping employers understand the work | Practitioner with hiring/coaching experience; explicitly aimed mainly at early-career frontend candidates in the US/Canada |
| [GitHub Docs — Using your GitHub profile to enhance your resume](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume) | Relevant pinned work, understandable repositories, useful READMEs | Official practical guidance; not evidence that all recruiters inspect code |
| [Brandeis CSE — Technical Portfolio Visual Guide](https://globalcareers.brandeis.edu/resources/the-cse-technical-portfolio-visual-guide/) | Academic and individual projects as evidence for graduate applications | Landing-page guidance from a graduate data-analytics career context, adapted here to CS |
| [Google / Martin Zinkevich — Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml) | Simple baselines and reliable ML pipelines | Engineering guidance, adapted here into questions a project write-up should answer |
| [scikit-learn — Common pitfalls and recommended practices](https://scikit-learn.org/stable/common_pitfalls.html) | Data leakage, preprocessing, and valid evaluation | Technical reference; applicable principles extend beyond this library |
| [Hugging Face — Model Cards](https://huggingface.co/docs/hub/model-cards) | Model provenance, evaluation, intended use, and limitations | Documentation framework, not a hiring checklist |
| [Anthropic — Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Outcome evaluation, appropriate graders, failure review | Agent-focused engineering experience, adapted to small portfolio projects |
| [Google web.dev — Web Vitals](https://web.dev/articles/vitals) | LCP, CLS, INP thresholds and field percentiles | Real-user performance reference |
| [Chrome for Developers — Lighthouse performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) | Score interpretation and avoiding a mandatory perfect score | Lab measurement guidance; not a hiring signal |
| [Google web.dev — Lab and field data differences](https://web.dev/articles/lab-and-field-data-differences) | Why TBT and local tests do not establish field INP | Measurement limitations |
| [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Accessibility conformance criteria | Normative reference; the checklist above is not exhaustive |
| [W3C — Understanding Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | Minimum target size and exceptions | Explanatory guidance for criterion 2.5.8 |
| [W3C — Understanding Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | Zoom/reflow testing and two-dimensional content exceptions | Explanatory guidance for criterion 1.4.10 |

Do not turn anecdotal hiring advice into universal rules. Recheck technical references when implementing changes, and prioritize concrete feedback from the owner's intended hiring market over assumptions drawn from another region or specialty.
