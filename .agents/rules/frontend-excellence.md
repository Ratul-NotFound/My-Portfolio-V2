# Frontend Excellence Rule

When building, refactoring, or reviewing frontend components in this project, adhere strictly to the following:

- **Typography**: Fluid scale using `clamp()`. High contrast headings (`text-white`) with readable secondary text (`text-slate-400`).
- **Color & Lighting**: Ambient radial gradients and hairline border highlights (`border-white/10` with `hover:border-indigo-500/40`).
- **Motion**: Physics-based springs using Framer Motion (`stiffness: 260`, `damping: 20`). Staggered list reveals with `staggerChildren: 0.08`.
- **Card Design**: Bento grids, 3D tilt effects with spring dampening, and frosted glass panels.
- **Responsiveness**: Mobile-first media queries, full-bleed backgrounds without layout breakage, and touch-accessible mobile drawers.
- **Performance**: Always use `transform-gpu`, dynamic imports for 3D canvases, and zero CLS images with aspect-ratio containers.
