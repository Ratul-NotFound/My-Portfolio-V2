'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function SectionWrapper({ children, className = '', id = '', variant = 'deck-rise' }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Precision Scroll Progress relative to section entering and exiting viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth scroll progress spring for silky, fluid 3D motion during scroll
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 22, restDelta: 0.001 });

  // HIGH-IMPACT 3D APPEARING SCROLL TRANSITION LIFECYCLES:
  // [0.00 -> 0.32]: Creative 3D Unfold & Revealing Entrance
  // [0.32 -> 0.68]: Active Content Reading Zone (100% flat, clear, stable)
  // [0.68 -> 1.00]: Creative 3D Receding Exit

  // --- Variant 1: 'recede' (Hero Section 3D Cyber Dissolve) ---
  const heroOpacity = useTransform(smoothProgress, [0.0, 0.28, 0.65, 0.95], [1, 1, 1, 0]);
  const heroY = useTransform(smoothProgress, [0.0, 0.28, 0.65, 0.95], [0, 0, 0, -200]);
  const heroZ = useTransform(smoothProgress, [0.0, 0.28, 0.65, 0.95], [0, 0, 0, -500]);
  const heroScale = useTransform(smoothProgress, [0.0, 0.28, 0.65, 0.95], [1, 1, 1, 0.78]);
  const heroRotateX = useTransform(smoothProgress, [0.0, 0.28, 0.65, 0.95], [0, 0, 0, -28]);

  // --- Variant 2: 'flip-left' (3D Origami Unfold - About Me) ---
  const flipOpacity = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [0, 1, 1, 0]);
  const flipY = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [180, 0, 0, -150]);
  const flipZ = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [-400, 0, 0, -400]);
  const flipScale = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [0.75, 1, 1, 0.75]);
  const flipRotateY = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [-45, 0, 0, 45]);
  const flipRotateX = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [20, 0, 0, -20]);

  // --- Variant 3: 'deck-rise' / 'cyber-shutter' (3D Deck Elevator Lift - Tech Stack) ---
  const deckOpacity = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [0, 1, 1, 0]);
  const deckY = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [200, 0, 0, -180]);
  const deckZ = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [-450, 0, 0, -450]);
  const deckScale = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [0.75, 1, 1, 0.75]);
  const deckRotateX = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [40, 0, 0, -40]);

  // --- Variant 4: 'zoom-portal' (3D Hyper Portal Unfold - Projects) ---
  const portalOpacity = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [0, 1, 1, 0]);
  const portalY = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [180, 0, 0, -160]);
  const portalZ = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [-550, 0, 0, -550]);
  const portalScale = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [0.7, 1, 1, 0.7]);
  const portalRotateX = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [32, 0, 0, -32]);
  const portalRotateZ = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [-8, 0, 0, 8]);

  // --- Variant 5: 'slide-right' (3D Curved Stage Slide - Research) ---
  const slideOpacity = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [0, 1, 1, 0]);
  const slideX = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [-240, 0, 0, 240]);
  const slideY = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [120, 0, 0, -120]);
  const slideZ = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [-380, 0, 0, -380]);
  const slideRotateY = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [38, 0, 0, -38]);
  const slideSkewY = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [5, 0, 0, -5]);

  // --- Variant 6: 'spiral-drop' (3D Helix Cascade - Experience) ---
  const spiralOpacity = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [0, 1, 1, 0]);
  const spiralY = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [190, 0, 0, -170]);
  const spiralZ = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [-420, 0, 0, -420]);
  const spiralScale = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [0.75, 1, 1, 0.75]);
  const spiralRotateZ = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [-16, 0, 0, 16]);
  const spiralRotateX = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [28, 0, 0, -28]);

  // --- Variant 7: 'elastic-pop' (3D Cubic Matrix Pop - Activities) ---
  const popOpacity = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [0, 1, 1, 0]);
  const popY = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [180, 0, 0, -150]);
  const popZ = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [-400, 0, 0, -400]);
  const popScale = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [0.72, 1, 1, 0.72]);
  const popRotateX = useTransform(smoothProgress, [0.05, 0.3, 0.7, 0.95], [35, 0, 0, -35]);

  // --- Variant 8: 'glass-rise' (3D Vault Elevator - Contact) ---
  const glassOpacity = useTransform(smoothProgress, [0.05, 0.3, 0.88, 1.0], [0, 1, 1, 1]);
  const glassY = useTransform(smoothProgress, [0.05, 0.3, 0.88, 1.0], [180, 0, 0, 0]);
  const glassZ = useTransform(smoothProgress, [0.05, 0.3, 0.88, 1.0], [-400, 0, 0, 0]);
  const glassScale = useTransform(smoothProgress, [0.05, 0.3, 0.88, 1.0], [0.78, 1, 1, 1]);
  const glassRotateX = useTransform(smoothProgress, [0.05, 0.3, 0.88, 1.0], [28, 0, 0, 0]);

  // Select current scroll-based transform configuration
  let scrollTransforms = { opacity: deckOpacity, y: deckY, z: deckZ, scale: deckScale, rotateX: deckRotateX };

  if (variant === 'recede') {
    scrollTransforms = { opacity: heroOpacity, y: heroY, z: heroZ, scale: heroScale, rotateX: heroRotateX };
  } else if (variant === 'flip-left') {
    scrollTransforms = { opacity: flipOpacity, y: flipY, z: flipZ, scale: flipScale, rotateY: flipRotateY, rotateX: flipRotateX };
  } else if (variant === 'deck-rise' || variant === 'cyber-shutter') {
    scrollTransforms = { opacity: deckOpacity, y: deckY, z: deckZ, scale: deckScale, rotateX: deckRotateX };
  } else if (variant === 'zoom-portal') {
    scrollTransforms = { opacity: portalOpacity, y: portalY, z: portalZ, scale: portalScale, rotateX: portalRotateX, rotateZ: portalRotateZ };
  } else if (variant === 'slide-right') {
    scrollTransforms = { opacity: slideOpacity, x: slideX, y: slideY, z: slideZ, rotateY: slideRotateY, skewY: slideSkewY };
  } else if (variant === 'spiral-drop') {
    scrollTransforms = { opacity: spiralOpacity, y: spiralY, z: spiralZ, scale: spiralScale, rotateZ: spiralRotateZ, rotateX: spiralRotateX };
  } else if (variant === 'elastic-pop') {
    scrollTransforms = { opacity: popOpacity, y: popY, z: popZ, scale: popScale, rotateX: popRotateX };
  } else if (variant === 'glass-rise') {
    scrollTransforms = { opacity: glassOpacity, y: glassY, z: glassZ, scale: glassScale, rotateX: glassRotateX };
  }

  return (
    <section 
      ref={containerRef}
      id={id}
      className={`relative min-h-screen w-full flex flex-col justify-center items-center py-12 lg:py-16 ${className}`}
      style={{ perspective: isMobile ? 900 : 1400, transformStyle: 'preserve-3d' }}
    >
      {/* Creative 3D Scroll Appearing Transition Container */}
      <motion.div
        style={scrollTransforms}
        className="w-full h-auto flex flex-col justify-center items-center max-w-7xl mx-auto transform-gpu relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}

