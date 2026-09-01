'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight IntersectionObserver hook.
 * Returns [ref, inView].
 * Once the element enters the viewport, inView stays true (once=true default).
 */
export function useReveal(options = {}, once = true) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  const threshold = options?.threshold ?? 0.12;
  const rootMargin = options?.rootMargin ?? '-40px';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
