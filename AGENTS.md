# World-Class Frontend Engineering & Design Standards

This workspace enforces award-winning, state-of-the-art frontend design and performance standards for all UI/UX development.

## 🌟 Core Directives

1. **Award-Winning Aesthetics (Awwwards / FWA Standard)**:
   - Every page and component must have high visual polish, depth, and spatial balance.
   - Use curated luxury dark palettes (obsidian `#08090D`, deep slate, hairline glowing borders `border-white/10`, subtle backdrop blur `backdrop-blur-xl`).
   - Never use flat or default primary colors (raw blue, red, green). Always use tailored HSL gradients and ambient radial glows.

2. **Micro-Interactions & Spring Physics**:
   - Interactive buttons, cards, and elements must have responsive feedback: hover scaling, magnetic pull, subtle border illumination, or spring physics.
   - Use Framer Motion and GSAP for fluid transitions. Never animate layout properties (`width`, `height`, `margin`, `padding`); only animate GPU-composited `transform` and `opacity`.

3. **Responsive Perfection (Mobile-First)**:
   - Every layout must be thoroughly tested across mobile (360px+), tablet, desktop, and ultra-wide screens.
   - Use fluid typography with CSS `clamp()`.
   - Never cause horizontal scrollbar overflows (`html, body { overflow-x: clip; }`).
   - Touch targets must be at least 44x44px on mobile devices.

4. **Performance & Frame Rate**:
   - Target 60fps (120fps on ProMotion displays).
   - Lazy load heavy 3D canvases, Three.js modules, and secondary modals with `next/dynamic` and SSR disabled.
   - Enforce zero Cumulative Layout Shift (CLS) by specifying aspect ratios and explicit skeleton placeholders.

5. **Design System & Component Modularity**:
   - Utilize Bento grids, 3D tilt cards, frosted glass panels, and metric chips.
   - Clean separation of UI components, hooks, and data layers.
