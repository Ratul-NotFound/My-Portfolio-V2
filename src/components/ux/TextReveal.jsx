'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Word({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(progress, range, ['var(--color-text-muted)', 'var(--color-text)']);

  return (
    <motion.span
      style={{ opacity, color }}
      className="text-xs sm:text-sm font-medium leading-relaxed inline-block"
    >
      {word}
    </motion.span>
  );
}

export default function TextReveal({ text, className = '' }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.45']
  });

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={`flex flex-wrap gap-x-1.5 gap-y-1 ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
        );
      })}
    </div>
  );
}
