---
name: ui-component-card-design
description: >-
  Design and build ultra-premium UI cards, Bento boxes, interactive element components, 3D tilt cards, frosted glass panels, glowing borders, metric badges, and micro-interaction controls. Use whenever creating, styling, or enhancing individual UI elements or cards.
---

# UI Component & Card Design Skill

This skill delivers patterns for crafting high-fidelity interactive cards, widgets, and micro-components with glassmorphic depth, hover physics, and hairline lighting.

---

## 1. 3D Tilt Card Component (Spring-Driven)

```jsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function TiltCard({ children, className = "" }) {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl border border-white/10 bg-slate-900/80 p-6 backdrop-blur-xl shadow-xl transition-shadow duration-300 hover:shadow-indigo-500/10 ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
```

---

## 2. Animated Holographic Border Card

A dynamic card with a circulating gradient border for highlighted features or pricing tiers:

```jsx
export function HolographicGlowCard({ children, className = "" }) {
  return (
    <div className={`relative p-[1px] rounded-2xl overflow-hidden group ${className}`}>
      {/* Rotating conic gradient border */}
      <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card Inner Content */}
      <div className="relative rounded-[calc(1rem-1px)] bg-slate-950 p-6 h-full backdrop-blur-2xl">
        {children}
      </div>
    </div>
  );
}
```

---

## 3. Metric & Stat Badge Design

```jsx
export function MetricCard({ label, value, change, icon: Icon }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-md hover:border-white/10 transition-all">
      {Icon && (
        <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div>
        <p className="text-xs font-mono uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-2xl font-bold font-mono text-white tracking-tight">{value}</p>
      </div>
      {change && (
        <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {change}
        </span>
      )}
    </div>
  );
}
```

---

## 4. Modern Glassmorphism Utilities (Tailwind & CSS)

```css
/* Glass Card Recipe */
.glass-panel {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Glass Card Interactive Hover */
.glass-panel-interactive {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.glass-panel-interactive:hover {
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.15);
}
```
