'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function WordRotate({
  words = ['Full-Stack Architect', 'Edge AI Engineer', 'RAG Search Specialist', 'DIUCPC VP Leader'],
  duration = 2500,
  className = ''
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className={`overflow-hidden inline-flex items-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block font-bold"
          style={{ color: 'var(--color-accent)' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
