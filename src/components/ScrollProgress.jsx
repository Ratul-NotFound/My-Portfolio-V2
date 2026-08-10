'use client';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  const heightPercent = useTransform(scrollYProgress, [0, 1], ["5%", "100%"]);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <motion.div
        suppressHydrationWarning
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 origin-left"
        style={{ 
          scaleX,
          backgroundColor: 'var(--color-accent)',
          boxShadow: '0 0 10px var(--color-accent)'
        }}
      />

      {/* Floating Side Track Scroll Indicator */}
      <div 
        suppressHydrationWarning
        className="fixed right-3.5 top-1/2 -translate-y-1/2 w-1.5 h-24 rounded-full backdrop-blur-md z-40 hidden sm:block pointer-events-none p-0.5 overflow-hidden shadow-lg"
        style={{
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
        }}
      >
        <motion.div 
          className="w-full rounded-full"
          style={{ 
            height: heightPercent,
            backgroundColor: 'var(--color-accent)',
            boxShadow: '0 0 8px var(--color-accent)'
          }}
        />
      </div>
    </>
  );
}
