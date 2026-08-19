'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function SectionWrapper({ children, className = '', id = '', variant = 'deck-rise' }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Precision Scroll Progress relative to section entering and exiting viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth scroll progress spring (optimized damping on mobile/desktop for 60fps)
  const springProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.005 });
  const activeProgress = isMobile ? scrollYProgress : springProgress;

  // HIGH-IMPACT 3D APPEARING SCROLL TRANSITION LIFECYCLES:
  // --- Variant 1: 'recede' (Hero Section 3D Cyber Dissolve) ---
  const heroOpacity = useTransform(activeProgress, [0.0, 0.4, 0.75, 1.0], [1, 1, 0.9, 0.2]);
  const heroY = useTransform(activeProgress, [0.0, 0.4, 0.75, 1.0], [0, 0, -40, -80]);
  const heroZ = useTransform(activeProgress, [0.0, 0.4, 0.75, 1.0], [0, 0, -80, -150]);
  const heroScale = useTransform(activeProgress, [0.0, 0.4, 0.75, 1.0], [1, 1, 0.96, 0.92]);
  const heroRotateX = useTransform(activeProgress, [0.0, 0.4, 0.75, 1.0], [0, 0, -4, -8]);

  // --- Variant 2: 'flip-left' (3D Origami Unfold - About Me) ---
  const flipOpacity = useTransform(activeProgress, [0.0, 0.18, 0.82, 1.0], [0.3, 1, 1, 0.3]);
  const flipY = useTransform(activeProgress, [0.0, 0.18, 0.82, 1.0], [40, 0, 0, -40]);
  const flipZ = useTransform(activeProgress, [0.0, 0.18, 0.82, 1.0], [-60, 0, 0, -60]);
  const flipScale = useTransform(activeProgress, [0.0, 0.18, 0.82, 1.0], [0.96, 1, 1, 0.96]);
  const flipRotateY = useTransform(activeProgress, [0.0, 0.18, 0.82, 1.0], [-8, 0, 0, 8]);
  const flipRotateX = useTransform(activeProgress, [0.0, 0.18, 0.82, 1.0], [4, 0, 0, -4]);

  // --- Variant 3: 'deck-rise' / 'cyber-shutter' (3D Deck Elevator Lift - Tech Stack) ---
  const deckOpacity = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);
  const deckY = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [80, 0, 0, -80]);
  const deckZ = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [-120, 0, 0, -120]);
  const deckScale = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [0.92, 1, 1, 0.92]);
  const deckRotateX = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [12, 0, 0, -12]);

  // --- Variant 4: 'zoom-portal' (3D Hyper Portal Unfold - Projects) ---
  const portalOpacity = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);
  const portalY = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [80, 0, 0, -80]);
  const portalZ = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [-120, 0, 0, -120]);
  const portalScale = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [0.92, 1, 1, 0.92]);
  const portalRotateX = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [10, 0, 0, -10]);

  // --- Variant 5: 'slide-right' (3D Curved Stage Slide - Research) ---
  const slideOpacity = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);
  const slideX = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [-40, 0, 0, 40]);
  const slideY = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [60, 0, 0, -60]);
  const slideZ = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [-120, 0, 0, -120]);
  const slideRotateY = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [10, 0, 0, -10]);

  // --- Variant 6: 'spiral-drop' (3D Helix Cascade - Experience) ---
  const spiralOpacity = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);
  const spiralY = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [80, 0, 0, -80]);
  const spiralZ = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [-120, 0, 0, -120]);
  const spiralScale = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [0.92, 1, 1, 0.92]);

  // --- Variant 7: 'elastic-pop' (3D Cubic Matrix Pop - Activities) ---
  const popOpacity = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);
  const popY = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [80, 0, 0, -80]);
  const popZ = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [-120, 0, 0, -120]);
  const popScale = useTransform(activeProgress, [0.05, 0.25, 0.75, 0.95], [0.92, 1, 1, 0.92]);

  // --- Variant 8: 'glass-rise' (3D Vault Elevator - Contact) ---
  const glassOpacity = useTransform(activeProgress, [0.05, 0.25, 0.88, 1.0], [0, 1, 1, 1]);
  const glassY = useTransform(activeProgress, [0.05, 0.25, 0.88, 1.0], [80, 0, 0, 0]);
  const glassZ = useTransform(activeProgress, [0.05, 0.25, 0.88, 1.0], [-120, 0, 0, 0]);
  const glassScale = useTransform(activeProgress, [0.05, 0.25, 0.88, 1.0], [0.92, 1, 1, 1]);

  // Select current scroll-based transform configuration
  let scrollTransforms = { opacity: deckOpacity, y: deckY, z: deckZ, scale: deckScale, rotateX: deckRotateX };

  if (variant === 'recede') {
    scrollTransforms = { opacity: heroOpacity, y: heroY, z: heroZ, scale: heroScale, rotateX: heroRotateX };
  } else if (variant === 'flip-left') {
    scrollTransforms = { opacity: flipOpacity, y: flipY, z: flipZ, scale: flipScale, rotateY: isMobile ? 0 : flipRotateY, rotateX: isMobile ? 0 : flipRotateX };
  } else if (variant === 'deck-rise' || variant === 'cyber-shutter') {
    scrollTransforms = { opacity: deckOpacity, y: deckY, z: deckZ, scale: deckScale, rotateX: isMobile ? 0 : deckRotateX };
  } else if (variant === 'zoom-portal') {
    scrollTransforms = { opacity: portalOpacity, y: portalY, z: portalZ, scale: portalScale, rotateX: isMobile ? 0 : portalRotateX };
  } else if (variant === 'slide-right') {
    scrollTransforms = { opacity: slideOpacity, x: isMobile ? 0 : slideX, y: slideY, z: slideZ, rotateY: isMobile ? 0 : slideRotateY };
  } else if (variant === 'spiral-drop') {
    scrollTransforms = { opacity: spiralOpacity, y: spiralY, z: spiralZ, scale: spiralScale };
  } else if (variant === 'elastic-pop') {
    scrollTransforms = { opacity: popOpacity, y: popY, z: popZ, scale: popScale };
  } else if (variant === 'glass-rise') {
    scrollTransforms = { opacity: glassOpacity, y: glassY, z: glassZ, scale: glassScale };
  }

  // On mobile, force flat 2D transforms to eliminate horizontal overflow
  if (isMobile) {
    scrollTransforms = { opacity: deckOpacity, y: deckY, scale: deckScale };
  }

  return (
    <section 
      ref={containerRef}
      id={id}
      className={`relative w-full flex flex-col justify-center items-center ${id === 'hero' ? 'pt-16 pb-2 sm:pt-24 sm:pb-8' : id === 'about' ? 'pt-4 pb-6 sm:py-14' : 'py-6 sm:py-12 lg:py-16'} overflow-x-hidden ${className}`}
      style={{ perspective: isMobile ? 'none' : 1200, transformStyle: isMobile ? 'flat' : 'preserve-3d', willChange: 'transform' }}
    >
      {/* Creative 3D Scroll Appearing Transition Container */}
      <motion.div
        style={scrollTransforms}
        className="w-full min-h-[inherit] h-full flex flex-col justify-center items-center max-w-7xl mx-auto transform-gpu relative z-10 px-4 sm:px-6 lg:px-8 overflow-x-hidden"
      >
        {children}
      </motion.div>
    </section>
  );
}
