---
name: frontend-performance-optimization
description: >-
  Optimize frontend applications for 60/120fps frame rates, sub-second LCP, zero CLS, bundle splitting, GPU acceleration, dynamic 3D loading, and Lighthouse 95+ scores. Use when optimizing page speed, rendering efficiency, or animation performance.
---

# Frontend Performance Optimization Skill

This skill outlines mandatory performance standards and implementation techniques for ultra-fast, smooth web applications.

---

## 1. Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 1.2s
- **CLS (Cumulative Layout Shift)**: 0.00
- **INP (Interaction to Next Paint)**: < 100ms
- **FPS Target**: Consistent 60fps (120fps on ProMotion displays)

---

## 2. Dynamic Loading for Heavy 3D & Canvas Components

Never bundle Three.js, R3F, or heavy 3D canvases into the initial critical render path. Always lazy load them:

```jsx
import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled and fallback skeleton
export const Hero3DCanvas = dynamic(
  () => import('@/components/canvas/HeroCanvas').then((mod) => mod.HeroCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-slate-950/40 animate-pulse">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin" />
      </div>
    ),
  }
);
```

---

## 3. GPU Acceleration & Compositor Layers

Ensure animations bypass CPU layout recalculation:

```css
/* Enable hardware acceleration */
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  will-change: transform, opacity;
}
```

In Tailwind:
- Use `transform-gpu` alongside transitions:
  ```jsx
  <div className="transform-gpu transition-transform duration-300 hover:scale-105 hover:-translate-y-1" />
  ```

---

## 4. Zero Layout Shift (CLS Prevention)

Always declare explicit dimensions or aspect ratios on media elements and dynamic sections:

```jsx
{/* Always use aspect ratio containers for images/videos */}
<div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-900">
  <Image
    src="/project-preview.webp"
    alt="Project Preview"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    priority={isAboveTheFold}
    className="object-cover"
  />
</div>
```

---

## 5. React Re-render & Memoization Guards

- Use `useCallback` on handlers passed to animated items.
- Avoid passing inline objects/arrays to Framer Motion variants within map loops. Move variant objects outside component definitions.
- Debounce window resize, scroll, and mousemove event listeners with `requestAnimationFrame`.

```js
// Efficient RAF-based mouse tracker
let rafId = null;
const handleMove = (e) => {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    updateCoordinates(e.clientX, e.clientY);
  });
};
```
