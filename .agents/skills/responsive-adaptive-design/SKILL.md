---
name: responsive-adaptive-design
description: >-
  Architect flawless mobile-first responsive layouts, fluid typography with clamp(), adaptive navigation drawers, touch targets, and resilient multi-device grid systems. Use whenever designing or auditing layouts across mobile, tablet, laptop, and ultra-wide screens.
---

# Responsive & Adaptive Design Skill

This skill ensures web applications look breathtaking and function seamlessly across all screen sizes (from 320px mobile up to 4K ultra-wide monitors).

---

## 1. Breakpoint Philosophy & Mobile-First Strategy

Always construct layout classes starting from mobile (`default`), scaling up through breakpoints:
- `base`: Mobile Portrait (<640px)
- `sm`: Mobile Landscape / Small Tablet (≥640px)
- `md`: Tablet (≥768px)
- `lg`: Laptop / Desktop (≥1024px)
- `xl`: Large Desktop (≥1280px)
- `2xl`: Ultra-Wide (≥1536px)

---

## 2. Fluid Typography & Spacing with `clamp()`

Eliminate jerky text jumps across breakpoints by using fluid calculation:

```css
/* Fluid Typography Definitions */
:root {
  /* Scales smoothly from 2rem at 360px width to 4.5rem at 1440px width */
  --font-fluid-hero: clamp(2.25rem, 5vw + 1rem, 4.75rem);
  --font-fluid-h2: clamp(1.75rem, 3.5vw + 0.75rem, 3rem);
  --font-fluid-body: clamp(0.95rem, 0.5vw + 0.85rem, 1.125rem);
  
  /* Fluid Section Spacing */
  --space-section: clamp(4rem, 8vw, 9rem);
}
```

In Tailwind:
```jsx
<h1 className="text-[clamp(2.25rem,5vw+1rem,4.75rem)] font-extrabold tracking-tight">
  Modern Digital Architect
</h1>
```

---

## 3. Responsive Mobile Navigation Drawer Pattern

```jsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function MobileNavigation({ links }) {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Trigger Button - Min 44x44px touch target */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className="relative z-50 p-2.5 rounded-xl border border-white/10 bg-slate-900/80 text-white backdrop-blur-md active:scale-95 transition-transform"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Slide-out Backdrop and Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xl"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-40 w-[80vw] max-w-sm bg-slate-950/95 border-l border-white/10 p-8 pt-24 flex flex-col justify-between shadow-2xl backdrop-blur-2xl"
            >
              <nav className="flex flex-col space-y-6">
                {links.map((link, idx) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    className="text-2xl font-bold text-slate-200 hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="pt-8 border-t border-white/10 text-xs text-slate-500 font-mono">
                Available for worldwide remote contracts & full-time roles.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## 4. Anti-Horizontal Scrollbar Rule
Never use `overflow-x: hidden` on `<body>` as it can break sticky positioning and viewport calculations. Instead, use:
```css
html, body {
  overflow-x: clip;
}
```
And ensure all fixed/absolute background blur orbs are wrapped with `overflow-hidden` or `isolate` on their parent containers.
