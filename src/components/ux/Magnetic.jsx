'use client';

import { useRef, useCallback } from 'react';

export default function Magnetic({ children, distance = 0.35, className = '' }) {
  const wrapRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = wrapRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * distance;
    const y = (e.clientY - (top + height / 2)) * distance;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, [distance]);

  const handleMouseLeave = useCallback(() => {
    const el = wrapRef.current;
    if (el) el.style.transform = 'translate(0px, 0px)';
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}
