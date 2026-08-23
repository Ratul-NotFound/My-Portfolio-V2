---
name: modern-page-design
description: >-
  Architect and design world-class modern landing pages, marketing pages, and hero sections with luxury aesthetics, dark mode perfection, glassmorphism, dynamic gradients, modern typography, and visual hierarchy. Use whenever designing, building, or refactoring full pages or major page layouts.
---

# Modern Page Design Skill

This skill guides the design and implementation of world-class, award-winning modern web pages (Awwwards/FWA tier) focusing on visual hierarchy, emotional resonance, typography, color harmony, and spatial balance.

---

## Core Visual Design Principles

### 1. Visual Hierarchy & Spatial Rhythm
- **Hero Section Impact**: Every page must have an immediate "hero statement" that grabs attention in under 2 seconds. Use large, expressive typography paired with subtle ambient lighting/glows.
- **Section Spacing**: Generous vertical rhythm (`py-24` to `py-36` or `gap-20` to `gap-32` on desktop; `py-16` on mobile). Never cram content together.
- **Content Chunking**: Organize information into scannable Bento grids, floating cards, or asymmetric multi-column layouts rather than wall-to-wall text.
- **Z-Index Layering**: Use at least 3 distinct visual depth layers:
  1. *Background*: Deep obsidian/slate base with subtle mesh gradients, radial glows, or noise texture.
  2. *Midground*: Glassmorphic cards with hairline borders (`border-white/[0.08]`) and backdrop blur (`backdrop-blur-xl`).
  3. *Foreground*: High-contrast typography, interactive chips, badges, and high-fidelity call-to-actions.

---

## 2. Curated Color Palette & Ambient Lighting

Avoid flat generic colors (pure red, green, blue). Use curated HSL/OKLCH palettes with high dynamic range:

```css
/* Modern Obsidian Luxury Theme */
:root {
  --bg-primary: #08090d;
  --bg-surface: #0f1117;
  --bg-surface-elevated: #161922;
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;
  --accent-cyan: #06b6d4;
  --accent-violet: #8b5cf6;
  --accent-emerald: #10b981;
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-glow: rgba(99, 102, 241, 0.25);
  --glow-radial: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%);
}
```

### Ambient Glow Technique
```jsx
{/* Radial Ambient Glow Background */}
<div className="relative isolate overflow-hidden bg-slate-950">
  <div className="absolute -top-40 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-80">
    <div 
      className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] via-[#9089fc] to-[#4f46e5] opacity-20"
      style={{
        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
      }}
    />
  </div>
  {/* Page Content */}
</div>
```

---

## 3. Typography Architecture

- **Primary Font**: Modern Sans (Inter, Plus Jakarta Sans, Outfit, Geist, or Space Grotesk).
- **Display / Monospace**: JetBrains Mono or Fira Code for metrics, tags, badges, and technical accents.
- **Fluid Typography Formula**:
  - H1 Hero: `text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08]`
  - H2 Section: `text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight`
  - Subtitle: `text-lg sm:text-xl text-neutral-400 font-normal leading-relaxed max-w-2xl`
  - Eyebrow / Tag: `text-xs font-semibold tracking-widest uppercase text-indigo-400 font-mono`

---

## 4. Modern Hero Section Blueprint

```jsx
export function ModernHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 py-24">
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="container mx-auto max-w-5xl text-center relative z-10">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-mono font-medium mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for Select Opportunities
        </div>

        {/* Dynamic Gradient Heading */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          Crafting Digital <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Masterpieces
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Full-stack software architect & creative technologist engineering high-performance web applications with surgical precision.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
          >
            Explore Portfolio
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 font-medium hover:bg-white/10 hover:text-white transition-all backdrop-blur-md hover:border-white/20"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

## 5. Page Layout Checklist
- [ ] Unique meta title & description for search engine ranking
- [ ] No pure white `#FFFFFF` or pure black `#000000` text/backgrounds — use softened luxury tones
- [ ] Hairline 1px borders (`border-white/10`) on elevated surfaces
- [ ] Consistent rounded corners (`rounded-2xl` for cards, `rounded-xl` for buttons)
- [ ] Smooth section transitions with ambient background glows
