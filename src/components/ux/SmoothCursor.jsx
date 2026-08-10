'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function SmoothCursor() {
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { damping: 25, stiffness: 350, mass: 0.2 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 350, mass: 0.2 });

  const ringX = useSpring(0, { damping: 30, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(0, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    // Only show custom smooth cursor on desktop pointer devices
    if (typeof window === 'undefined' || window.innerWidth <= 768) return;

    const handleMouseMove = (e) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Follower Aura Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid var(--color-border-accent)',
          background: 'rgba(56, 189, 248, 0.08)',
          boxShadow: '0 0 15px rgba(56, 189, 248, 0.2)'
        }}
        className="w-8 h-8 rounded-full backdrop-blur-[1px] transition-opacity duration-300"
      />

      {/* Inner Glowing Cursor Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: 'var(--color-accent)',
          boxShadow: '0 0 10px var(--color-accent)'
        }}
        className="w-2 h-2 rounded-full"
      />
    </div>
  );
}
