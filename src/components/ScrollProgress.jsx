'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const topBarRef = useRef(null);
  const sideBarRef = useRef(null);

  useEffect(() => {
    let rafId = null;
    let lastY = -1;

    const update = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      if (Math.abs(scrollY - lastY) < 1) return;
      lastY = scrollY;

      const docH = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      const progress = docH > 0 ? Math.min(1, Math.max(0, scrollY / docH)) : 0;

      if (topBarRef.current) {
        topBarRef.current.style.transform = `scaleX(${progress})`;
      }
      if (sideBarRef.current) {
        sideBarRef.current.style.transform = `scaleY(${Math.max(0.05, progress)})`;
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        update();
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        suppressHydrationWarning
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none origin-left"
        style={{ background: 'transparent' }}
      >
        <div
          ref={topBarRef}
          className="w-full h-full origin-left transform-gpu"
          style={{
            transform: 'scaleX(0)',
            backgroundColor: 'var(--color-accent)',
            boxShadow: '0 0 10px var(--color-accent)',
            willChange: 'transform',
            transition: 'transform 0.05s linear',
          }}
        />
      </div>

      {/* Floating Side Track Scroll Indicator */}
      <div 
        suppressHydrationWarning
        className="fixed right-3.5 top-1/2 -translate-y-1/2 w-1.5 h-24 rounded-full backdrop-blur-md z-40 hidden sm:block pointer-events-none p-0.5 overflow-hidden shadow-lg"
        style={{
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div 
          ref={sideBarRef}
          className="w-full h-full rounded-full origin-top transform-gpu"
          style={{ 
            transform: 'scaleY(0.05)',
            backgroundColor: 'var(--color-accent)',
            boxShadow: '0 0 8px var(--color-accent)',
            willChange: 'transform',
            transition: 'transform 0.05s linear',
          }}
        />
      </div>
    </>
  );
}
