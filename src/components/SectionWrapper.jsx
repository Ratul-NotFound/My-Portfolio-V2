'use client';

import { useRef, useEffect, useState } from 'react';

export default function SectionWrapper({ children, className = '', id = '', variant = 'deck-rise' }) {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const [inView, setInView] = useState(variant === 'hero' || id === 'hero');

  useEffect(() => {
    const el = innerRef.current;
    if (!el || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    // Hero is always visible — no reveal delay needed
    if (id === 'hero' || variant === 'recede') {
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
      { threshold: 0.05, rootMargin: '120px' }
    );

    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [id, variant]);

  const isHero = id === 'hero' || variant === 'recede';

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full min-h-screen flex flex-col justify-center items-center overflow-x-hidden ${className}`}
      style={{
        willChange: 'auto',
        paddingTop: isHero
          ? 'clamp(3.75rem, 4vh + 2.5rem, 5.5rem)'
          : 'var(--section-py)',
        paddingBottom: isHero
          ? 'clamp(1.5rem, 3vh, 3.5rem)'
          : 'var(--section-py)',
        contain: isHero ? 'none' : 'layout style',
      }}
    >
      <div
        ref={innerRef}
        className={[
          'h-full flex flex-col justify-center items-center relative z-10 transform-gpu w-full overflow-visible',
          isHero ? 'variant-hero' : `section-reveal-wrap ${inView ? 'in-view' : ''}`,
        ].join(' ')}
        style={
          isHero
            ? undefined
            : {
                maxWidth: 'var(--container-max)',
                width: '100%',
                paddingLeft: 'var(--section-px)',
                paddingRight: 'var(--section-px)',
              }
        }
      >
        {children}
      </div>
    </section>
  );
}
