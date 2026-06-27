# Portfolio Code Modification: Editorial Canvas Space Balancing

This specification fixes the "empty background look" of the bright theme by implementing a micro-dot matrix pattern across the canvas backdrop and locking technical editorial alignment margins into place.

---

## 🎨 1. Base Stylesheet Enhancements

### [MODIFY] `styles.css`

Locate the `body` selector rules and update the background layer configuration exactly as follows:

```css
body {
    background-color: #FDFBF7;
    /* Option 1: Dot-Matrix Structural Ledger Background pattern */
    background-image: radial-gradient(#E2E0D9 1.2px, transparent 1.2px);
    background-size: 32px 32px;
    background-attachment: fixed;
    
    color: #111111;
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow-x: hidden;
}

/* Add a clean, continuous technical rule down the margins */
@media (min-width: 1024px) {
    .editorial-left-guide {
        position: fixed;
        left: 48px;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: rgba(226, 224, 217, 0.4);
        z-index: 40;
        pointer-events: none;
    }
    .editorial-right-guide {
        position: fixed;
        right: 48px;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: rgba(226, 224, 217, 0.4);
        z-index: 40;
        pointer-events: none;
    }
}
📐 2. Structural Document Layering
[MODIFY] index.html (or Root Layout Component)
Inject the architectural margin annotations and layout line indicators directly beneath the opening <body> tag so they sit at the background layer correctly.

HTML
<body>
    <div class="editorial-left-guide"></div>
    <div class="editorial-right-guide"></div>

    <aside class="fixed left-[14px] top-1/2 -translate-y-1/2 [writing-mode:vertical-lr] rotate-180 hidden xl:flex items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-textMuted/50 select-none z-40 pointer-events-none">
        <span>UNIVERSITAS SAM RATULANGI // INFORMATICS ENGINEERING</span>
        <div class="w-16 h-px bg-border"></div>
        <span>CASE_STUDY_LOG_2026</span>
    </aside>

    <aside class="fixed right-[18px] top-1/2 -translate-y-1/2 [writing-mode:vertical-lr] hidden xl:flex items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-textMuted/50 select-none z-40 pointer-events-none">
        <span>DATA_SCIENCE_PORTFOLIO_CORE</span>
        <div class="w-16 h-px bg-border"></div>
        <span>STABLE_BUILD_v1.0.0</span>
    </aside>
    
    ```

---

## 🚀 3. Validation and Contrast Checks
* [ ] Verify the background pattern dots match the exact tone of `#E2E0D9` with no blur radius to ensure grid sharpness.
* [ ] Check visibility on mobile ports; the sticky `aside` bars must remain correctly isolated under `hidden xl:flex` to protect smaller mobile screen layouts.