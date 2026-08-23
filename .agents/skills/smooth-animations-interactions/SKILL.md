---
name: smooth-animations-interactions
description: >-
  Implement buttery-smooth 60/120fps animations, physics-based springs, staggered entrance transitions, scroll-driven effects, magnetic buttons, and micro-interactions using Framer Motion, GSAP, and Lenis. Use whenever adding or refining animations and interactive behaviors.
---

# Smooth Animations & Interactions Skill

This skill provides production-grade animation patterns for high-end web applications, ensuring physical realism, fluid frame pacing, and non-blocking interactions.

---

## 1. Physics-Based Spring Presets (Framer Motion)

Avoid linear or rigid duration-based easings for interactive elements. Use natural spring physics:

```js
export const springPresets = {
  // Snappy for buttons, badges, micro-interactions
  snappy: { type: "spring", stiffness: 400, damping: 25 },
  
  // Smooth & organic for cards, modals, page transitions
  smooth: { type: "spring", stiffness: 200, damping: 20 },
  
  // Gentle & floating for ambient elements, background orbs
  gentle: { type: "spring", stiffness: 80, damping: 15 },
  
  // Bouncy for playful badges, notification pills
  bouncy: { type: "spring", stiffness: 500, damping: 12 }
};
```

---

## 2. Staggered Container & Item Variants

```jsx
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const itemFadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

// Usage Example
export function AnimatedCardGrid({ items }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={itemFadeUpVariants}>
          {/* Card Content */}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

---

## 3. Magnetic Button Interaction

```jsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function MagneticButton({ children, className = "", onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 350, damping: 15 });
  const springY = useSpring(y, { stiffness: 350, damping: 15 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Pull factor (0.3 = subtle magnetic pull)
    x.set((clientX - centerX) * 0.35);
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {children}
    </motion.button>
  );
}
```

---

## 4. Lenis Smooth Scroll Setup in Next.js

```jsx
'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

---

## 5. Animation Rules of Thumb
1. **Never animate layout properties**: Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`. Only animate GPU-composited properties: `transform` (scale, translate, rotate) and `opacity`.
2. **Respect Reduced Motion**: Always wrap intense animations in `@media (prefers-reduced-motion: reduce)` or `useReducedMotion()` from Framer Motion.
3. **Viewport Optimization**: Always use `viewport={{ once: true }}` for entrance animations so components don't re-trigger abruptly while reading.
