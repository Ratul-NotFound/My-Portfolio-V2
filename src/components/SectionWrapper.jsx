'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ── Device capability detection (cached globally across all section instances) ─
let _deviceTier = null;
function getDeviceTier() {
  if (_deviceTier !== null) return _deviceTier;
  if (typeof window === 'undefined') return (_deviceTier = 'high');
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem   = navigator.deviceMemory    ?? 4;
  const conn  = navigator.connection?.effectiveType ?? '4g';
  const isLow = cores <= 4 || mem <= 2 || conn === '2g' || conn === 'slow-2g';
  const isMid = !isLow && (cores <= 6 || mem <= 4 || conn === '3g');
  _deviceTier = isLow ? 'low' : isMid ? 'mid' : 'high';
  return _deviceTier;
}

export default function SectionWrapper({ children, className = '', id = '', variant = 'deck-rise' }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [tier, setTier] = useState('high');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    setTier(getDeviceTier());
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Spring only on high-end devices — saves per-frame JS on mid/low
  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 22, restDelta: 0.005 });
  const activeProgress = (isMobile || tier === 'low') ? scrollYProgress : springProgress;

  // ── Scale ranges per device tier ──────────────────────────────────────────
  const yRange  = tier === 'high' ? 80  : tier === 'mid' ? 45 : 25;
  const zRange  = tier === 'high' ? 120 : tier === 'mid' ? 50 : 0;
  const rxRange = tier === 'high' ? 12  : tier === 'mid' ? 5  : 0;
  const scMin   = tier === 'high' ? 0.92 : tier === 'mid' ? 0.96 : 0.98;
  const noRot   = isMobile || tier !== 'high';

  // ── Gentle, elegant motion values that preserve full readability ─────────
  const isContact = id === 'contact' || variant === 'glass-rise';

  // Opacity stays at 1 throughout reading range (0.15 → 0.88), never drops below 0.35 on edges
  const opacity = useTransform(activeProgress, [0.0, 0.15, 0.85, 1.0], [0.35, 1, 1, 0.35]);
  const y       = useTransform(activeProgress, [0.0, 0.18, 0.82, 1.0], [yRange * 0.4, 0, 0, -yRange * 0.4]);
  const scale   = useTransform(activeProgress, [0.0, 0.18, 0.82, 1.0], [scMin, 1, 1, scMin]);
  const z       = useTransform(activeProgress, [0.0, 0.18, 0.82, 1.0], [-zRange * 0.4, 0, 0, -zRange * 0.4]);
  const rotateX = useTransform(activeProgress, [0.0, 0.18, 0.82, 1.0], [noRot ? 0 : rxRange * 0.4, 0, 0, noRot ? 0 : -rxRange * 0.4]);
  const slideX  = useTransform(activeProgress, [0.0, 0.18, 0.82, 1.0], [noRot ? 0 : -20, 0, 0, noRot ? 0 : 20]);
  const rotateY = useTransform(activeProgress, [0.0, 0.18, 0.82, 1.0], [noRot ? 0 : 4, 0, 0, noRot ? 0 : -4]);

  // Hero-specific (recede gently on scroll-out)
  const heroOpacity = useTransform(activeProgress, [0.0, 0.4, 0.75, 1.0], [1, 1, 0.95, 0.4]);
  const heroY       = useTransform(activeProgress, [0.0, 0.4, 0.75, 1.0], [0, 0, -20, -45]);
  const heroScale   = useTransform(activeProgress, [0.0, 0.4, 0.75, 1.0], [1, 1, 0.98, 0.95]);

  // Contact-specific (stays 100% visible at the bottom of the page)
  const glassOpacity = useTransform(activeProgress, [0.0, 0.15, 1.0], [0.35, 1, 1]);
  const glassY       = useTransform(activeProgress, [0.0, 0.18, 1.0], [yRange * 0.4, 0, 0]);

  // ── Select transforms for this section variant ────────────────────────────
  let scrollTransforms;
  if (variant === 'recede' || id === 'hero') {
    scrollTransforms = { opacity: heroOpacity, y: heroY, scale: heroScale };
  } else if (isContact) {
    scrollTransforms = { opacity: glassOpacity, y: glassY };
  } else if (variant === 'slide-right') {
    scrollTransforms = { opacity, y, x: slideX, rotateY: noRot ? 0 : rotateY };
  } else if (variant === 'flip-left') {
    scrollTransforms = { opacity, y, rotateY: noRot ? 0 : -rotateY, rotateX: noRot ? 0 : rotateX };
  } else {
    // deck-rise, slide-left, zoom-portal, etc.
    scrollTransforms = { opacity, y, scale, z: tier === 'low' ? 0 : z, rotateX: noRot ? 0 : rotateX };
  }

  const isHero = id === 'hero';
  const usePerspective = tier === 'high' && !isMobile;

  return (
    <section
      ref={containerRef}
      id={id}
      className={`relative w-full min-h-screen flex flex-col justify-center items-center overflow-x-hidden ${className}`}
      style={{
        perspective:    usePerspective ? 1200 : 'none',
        transformStyle: usePerspective ? 'preserve-3d' : 'flat',
        willChange: 'transform',
        paddingTop:    isHero ? 'clamp(3.75rem, 4vh + 2.5rem, 5.5rem)' : 'var(--section-py)',
        paddingBottom: isHero ? 'clamp(1.5rem, 3vh, 3.5rem)'           : 'var(--section-py)',
        // CSS containment: browser skips layout/style recalcs for off-screen sections
        contain: isHero ? 'none' : 'layout style',
      }}
    >
      <motion.div
        style={isHero ? scrollTransforms : {
          ...scrollTransforms,
          maxWidth: 'var(--container-max)',
          width: '100%',
          paddingLeft:  'var(--section-px)',
          paddingRight: 'var(--section-px)',
        }}
        className={`h-full flex flex-col justify-center items-center transform-gpu relative z-10${isHero ? ' w-full overflow-visible' : ' mx-auto overflow-x-hidden'}`}
      >
        {children}
      </motion.div>
    </section>
  );
}

