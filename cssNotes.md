```markdown
# Responsive CSS Cheat Sheet – 2026 Edition  
**Mobile-First + Fluid Scaling → Minimal Media Queries + clamp()**

## Starter CSS Template (Modern Reset + :root Variables)
Place this at the very top of your stylesheet. It resets/normalizes browsers, sets intuitive defaults, and defines global variables for easy theming and fluid values.

```css
/* Modern CSS Reset + Base Styles (2026) */
*, *::before, *::after {
  box-sizing: border-box;          /* Intuitive sizing model */
  margin: 0;                       /* Remove default margins */
  padding: 0;
}

html {
  scroll-behavior: smooth;         /* Smooth anchor scrolling */
  scroll-padding-top: 5rem;        /* Account for fixed headers */
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  min-height: 100dvh;              /* Full viewport height (dynamic) */
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Root variables – easy theme switching and fluid values */
:root {
  --font-size-base: clamp(15px, 2.5vw + 0.5rem, 18px);
  --font-size-h1:   clamp(2rem, 6vw + 1rem, 4rem);
  --font-size-h2:   clamp(1.6rem, 5vw + 0.8rem, 3rem);
  --spacing-sm:     clamp(0.5rem, 2vw, 1rem);
  --spacing-md:     clamp(1rem, 4vw, 2rem);
  --spacing-lg:     clamp(2rem, 6vw, 4rem);
  --color-bg:       #ffffff;
  --color-text:     #1a1a1a;
  --color-primary:  #0066cc;
  --max-width:      clamp(320px, 90vw, 1400px);
}

/* Apply base font size */
html { font-size: var(--font-size-base); }
body { color: var(--color-text); background: var(--color-bg); }

/* Accessibility helpers */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; scroll-behavior: auto; }
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:   #121212;
    --color-text: #e0e0e0;
  }
}
```

## Core Philosophy
- **Mobile-first** is king — Start with base styles for the smallest screens (mobile).
- Build **up** using `min-width` media queries → progressive enhancement.
- Use `clamp()`, `min()`, `max()` for **smooth, continuous scaling** — reduces media queries dramatically.
- Reserve media queries **only** for **structural/discrete changes** (e.g., grid columns, show/hide elements, flex-direction).
- Breakpoints = **content-driven** — Resize browser until layout breaks → add query at that exact point.
- Always respect accessibility: reduced-motion, color-scheme, user font scaling.

## Flexbox vs Grid: Mobile → Tablet Strategy
**Yes — common & effective pattern in 2026:**
- **Mobile / vertical / one-dimensional** → Use **Flexbox** (`flex-direction: column` by default; switch to `row` for horizontal stacks when space allows).
- **Tablet+ (multi-column / 2D layouts)** → Switch to **CSS Grid** for better control over rows + columns, auto-placement, and responsive tracks.
- Hybrid: Use Grid for page layout, Flexbox inside cards/components for alignment.

```css
/* Example: Mobile-first Flex → Grid on tablet+ */
.cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-lg);
  }
}
```

## Fluid Scaling Tools – Use clamp() Liberally!
```css
/* Typography */
h1 { font-size: var(--font-size-h1); }
h2 { font-size: var(--font-size-h2); }
p  { font-size: clamp(1rem, 2.5vw + 0.4rem, 1.125rem); }

/* Spacing & containers */
.container {
  padding-inline: var(--spacing-md);
  max-width: var(--max-width);
  margin: 0 auto;
}

.section { gap: var(--spacing-lg); }

/* Safe bounds */
img.hero {
  width: min(100%, 800px);
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

**`clamp(min, preferred, max)`** — preferred often uses `vw` + rem for smooth, viewport-aware scaling.

## Oddball / Square Screens (Foldables, Tablets in Portrait, etc.)
Fluid techniques handle most cases automatically.

```css
/* Optional: target roughly square-ish viewports (use sparingly) */
@media (min-width: 600px) and (max-width: 900px) 
       and (min-aspect-ratio: 3/4) and (max-aspect-ratio: 4/3) {
  /* Force single-column if layout breaks on near-square screens */
  .cards { grid-template-columns: 1fr; }
}
```

**Better alternatives (preferred):**
- `aspect-ratio` on containers/images
- Container queries: `@container (min-width: 500px) { … }`
- `min()` / `max()` for width/height bounds

## Recommended Mobile-First Media Queries
```css
/* Base = Mobile (already in template) */

/* Small tablet / landscape mobile – rarely needed */
@media (min-width: 480px) { }

/* Tablet / narrow desktop – switch to Grid here */
@media (min-width: 768px) {
  .cards { /* Grid as above */ }
}

/* Standard desktop */
@media (min-width: 1024px) {
  .container { padding-inline: var(--spacing-lg); }
}

/* Ultra-wide (optional) */
@media (min-width: 1440px) { }
```

## Quick Decision Tree
1. Smooth/continuous scaling? → `clamp()` / `min()` / `max()` / `vw`  
2. Discrete/structural change? → `min-width` media query (mobile-first)  
3. Parent-container dependent? → Container queries `@container`  
4. Rare edge (tiny phones, square)? → One `max-width` or aspect-ratio query

## Final 2026 Tips
- Test: Browser resize + DevTools device toolbar  
- Use `container-type: inline-size;` on parents for component responsiveness  
- Combine with `srcset` + `sizes` for responsive images  
- Fewer queries + more fluid values = better performance & maintainability  

**Mobile-first + clamp() + Flex-to-Grid progression = clean, modern, accessible CSS.**  
