'use client';

import { useEffect, useRef, useState } from 'react';

export default function SmoothCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);
  const isMoving = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion || window.innerWidth <= 768) return;

    setIsVisible(true);

    const loop = () => {
      const ring = ringRef.current;
      const dot = dotRef.current;

      if (ring && dot) {
        // Direct instantaneous dot tracking (0 lag)
        dot.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;

        // Smooth physics-lerped trailing ring
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;
        ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      const dx = Math.abs(mousePos.current.x - ringPos.current.x);
      const dy = Math.abs(mousePos.current.y - ringPos.current.y);

      // Keep animation frame running while moving, otherwise sleep to save CPU/GPU cycles
      if (isMoving.current || dx > 0.1 || dy > 0.1) {
        rafId.current = requestAnimationFrame(loop);
      } else {
        rafId.current = null;
      }
    };

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      isMoving.current = true;

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(loop);
      }
    };

    const handleMouseStop = () => {
      isMoving.current = false;
    };

    let stopTimer = null;
    const onMoveThrottled = (e) => {
      handleMouseMove(e);
      clearTimeout(stopTimer);
      stopTimer = setTimeout(handleMouseStop, 100);
    };

    window.addEventListener('mousemove', onMoveThrottled, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMoveThrottled);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      clearTimeout(stopTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Follower Aura Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none transform-gpu"
        style={{
          willChange: 'transform',
          border: '1px solid var(--color-border-accent)',
          background: 'rgba(56, 189, 248, 0.08)',
          boxShadow: '0 0 15px rgba(56, 189, 248, 0.2)',
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      />

      {/* Inner Glowing Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none transform-gpu"
        style={{
          willChange: 'transform',
          backgroundColor: 'var(--color-accent)',
          boxShadow: '0 0 10px var(--color-accent)',
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      />
    </div>
  );
}
