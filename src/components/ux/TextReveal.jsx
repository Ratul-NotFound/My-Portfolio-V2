'use client';

import { useEffect, useRef, useState } from 'react';

export default function TextReveal({ text, className = '' }) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '-20px' }
    );
    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`flex flex-wrap gap-x-1.5 gap-y-1 ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`text-reveal-word text-xs sm:text-sm font-medium leading-relaxed inline-block ${inView ? 'in-view' : ''}`}
          style={{ transitionDelay: inView ? `${i * 0.035}s` : '0s' }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
