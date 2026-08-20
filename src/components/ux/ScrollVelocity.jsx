'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValue,
  useAnimationFrame
} from 'framer-motion';

export default function ScrollVelocity({
  text = "FULL-STACK DEVELOPER // AI & AUTOMATION // CLOUD & WEB PLATFORMS // DIU LEADER // NEXT.JS //",
  baseVelocity = 3,
  className = ""
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${(v % 50) - 50}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div 
      className={`overflow-hidden whitespace-nowrap flex flex-nowrap py-3 backdrop-blur-md ${className}`}
      style={{
        background: 'rgba(56, 189, 248, 0.03)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <motion.div
        className="flex flex-nowrap whitespace-nowrap text-xs font-mono font-bold tracking-widest uppercase"
        style={{ x, color: 'var(--color-accent)' }}
      >
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
      </motion.div>
    </div>
  );
}
