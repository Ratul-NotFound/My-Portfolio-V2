'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function IntroLoader({ onDone }) {
  const [isVisible, setIsVisible] = useState(true);
  const tilesRef = useRef([]);
  const textRef = useRef(null);

  useEffect(() => {
    const tiles = tilesRef.current.filter(Boolean);
    if (!tiles.length) return;

    // Prevent body scroll during intro animation
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        document.body.style.overflow = '';
        if (onDone) onDone();
      }
    });

    // 1. Center badge scale & fade out
    tl.to(textRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.25,
      ease: 'power2.in',
      delay: 0.15
    });

    // 2. Fast, crisp curtain wipe (completes at ~0.8s)
    tl.to(tiles, {
      xPercent: -105,
      duration: 0.55,
      ease: 'power3.inOut',
      stagger: 0.04
    });

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onDone]);

  if (!isVisible) return null;

  return (
    <div 
      suppressHydrationWarning 
      className="fixed inset-0 z-[9999] pointer-events-none flex flex-col justify-between overflow-hidden"
    >
      {/* Curtain Tiles with Specular Accent Edges */}
      <div className="absolute inset-0 flex flex-col h-full w-full">
        {[0, 1, 2, 3, 4].map(idx => (
          <div
            key={idx}
            ref={el => (tilesRef.current[idx] = el)}
            className="w-full flex-1 transform-gpu relative overflow-hidden"
            style={{
              backgroundColor: 'var(--color-bg)',
              borderBottom: '1px solid var(--color-border-accent)',
            }}
          >
            {/* Specular Accent Laser Line */}
            <div className="absolute inset-x-0 bottom-0 h-[1.5px] opacity-80"
              style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} />
            
            {/* Ambient Grid Texture */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(56,189,248,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.02) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>
        ))}
      </div>

      {/* Center Title Capsule */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div
          ref={textRef}
          className="font-mono text-xs uppercase tracking-[0.3em] font-bold px-6 py-3 rounded-2xl flex items-center gap-2.5 shadow-card"
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--color-border-accent)',
            color: 'var(--color-accent)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--color-accent)' }} />
          <span>MAHMUD HASAN RATUL</span>
        </div>
      </div>
    </div>
  );
}
