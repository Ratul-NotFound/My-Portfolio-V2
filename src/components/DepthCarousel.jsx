'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import './DepthCarousel.css';

const DEFAULT_ITEMS = [];

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const normalizeItem = it => (typeof it === 'string' ? { image: it, alt: '' } : it);

const DepthCarousel = ({
  items = DEFAULT_ITEMS,
  renderCard,
  activeItemIndex = 0,
  cardWidth = 300,
  cardHeight = 400,
  depth = 80,
  spread = 45,
  tilt = 12,
  tiltDirection = 'left',
  visibleCards = 3,
  falloff = 0.25,
  perspective = 1400,
  duration = 600,
  ease = 'power3.out',
  loop = true,
  showControls = true,
  showIndicators = true,
  radius = '24px',
  tint = 'rgba(0,0,0,0.6)',
  className = '',
  onChange
}) => {
  const [active, setActive] = useState(activeItemIndex);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentWidth = isMobile ? (typeof window !== 'undefined' ? Math.min(340, window.innerWidth - 32) : 320) : cardWidth;
  const currentHeight = isMobile ? Math.min(410, currentWidth * 1.18) : cardHeight;
  const currentSpread = isMobile ? 18 : spread;
  const currentTilt = isMobile ? 6 : tilt;
  const currentVisibleCards = isMobile ? 2 : visibleCards;

  const data = useMemo(() => (Array.isArray(items) ? items : []).map(normalizeItem), [items]);
  const count = data.length;

  const rootRef = useRef(null);
  const cardRefs = useRef([]);
  const overlayRefs = useRef([]);

  const posRef = useRef(activeItemIndex);
  const focusRef = useRef(activeItemIndex);
  const tweenRef = useRef(null);
  const scaleRef = useRef(1);
  const cfgRef = useRef({});
  const onChangeRef = useRef(onChange);

  onChangeRef.current = onChange;
  cfgRef.current = {
    count,
    depth,
    spread: currentSpread,
    tilt: currentTilt,
    tiltDirection,
    visibleCards: currentVisibleCards,
    falloff,
    duration,
    ease,
    loop,
    cardWidth: currentWidth
  };

  const layout = useCallback(pos => {
    const cfg = cfgRef.current;
    const n = cfg.count;
    if (!n) return;
    const dir = cfg.tiltDirection === 'left' ? -1 : 1;
    const sc = scaleRef.current;

    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      let d = i - pos;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }

      const back = Math.max(0, d);
      const az = Math.abs(d);
      const shown = az <= cfg.visibleCards + 0.5;

      const tz = -cfg.depth * d;
      const tx = dir * cfg.spread * d;
      const ry = dir * cfg.tilt * clamp(d, 0, 1);

      let opacity = d < 0 ? Math.max(0, 1 + d) : 1;
      if (!shown) opacity = 0;

      const brightness = Math.max(0.2, 1 - back * cfg.falloff);
      const zi = Math.round(2000 - d * 20);

      el.style.transform = `translate3d(-50%, -50%, 0) scale(${sc}) translateX(${tx.toFixed(1)}px) translateZ(${tz.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg)`;
      el.style.opacity = opacity.toFixed(3);
      el.style.zIndex = `${zi}`;
      el.style.pointerEvents = Math.abs(d) < 0.5 ? 'auto' : 'none';

      const ov = overlayRefs.current[i];
      if (ov) {
        ov.style.opacity = `${(1 - brightness).toFixed(2)}`;
      }
    }
  }, []);

  const notify = useCallback(idx => {
    setActive(idx);
    onChangeRef.current?.(idx);
  }, []);

  const tweenTo = useCallback(
    (target, animate = true) => {
      tweenRef.current?.kill();
      const cfg = cfgRef.current;
      const proxy = { p: posRef.current };
      const dur = animate ? cfg.duration / 1000 : 0;
      tweenRef.current = gsap.to(proxy, {
        p: target,
        duration: dur,
        ease: cfg.ease,
        onUpdate: () => {
          posRef.current = proxy.p;
          layout(proxy.p);
        },
        onComplete: () => {
          const n = cfg.count;
          if (n > 0) posRef.current = ((posRef.current % n) + n) % n;
          layout(posRef.current);
        }
      });
    },
    [layout]
  );

  const setFocus = useCallback(
    (rawIndex, animate = true) => {
      const cfg = cfgRef.current;
      const n = cfg.count;
      if (!n) return;
      const idx = cfg.loop ? ((rawIndex % n) + n) % n : clamp(rawIndex, 0, n - 1);
      let delta = idx - posRef.current;
      if (cfg.loop && n > 1) {
        delta = ((delta % n) + n) % n;
        if (delta > n / 2) delta -= n;
      }
      tweenTo(posRef.current + delta, animate);
      if (idx !== focusRef.current) {
        focusRef.current = idx;
        notify(idx);
      }
    },
    [tweenTo, notify]
  );

  const navigateBy = useCallback(
    step => {
      setFocus(focusRef.current + step, true);
    },
    [setFocus]
  );

  // ─── Touch / Pointer handling (registered safely for mobile scrolling) ────
  const touchStartRef2 = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onTouchStart = e => {
      const t = e.touches[0];
      touchStartRef2.current = { x: t.clientX, y: t.clientY, time: Date.now() };
    };

    const onTouchMove = e => {
      if (!touchStartRef2.current) return;
      const t = e.touches[0];
      const dx = Math.abs(t.clientX - touchStartRef2.current.x);
      const dy = Math.abs(t.clientY - touchStartRef2.current.y);
      // Only claim gesture if horizontal movement is overwhelmingly dominant
      if (dx > dy * 2 && dx > 25 && e.cancelable) {
        e.preventDefault();
      }
    };

    const onTouchEnd = e => {
      if (!touchStartRef2.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartRef2.current.x;
      const dy = t.clientY - touchStartRef2.current.y;
      const dt = Date.now() - touchStartRef2.current.time;
      touchStartRef2.current = null;

      if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 600) {
        if (dx < 0) navigateBy(1);
        else navigateBy(-1);
      }
    };

    root.addEventListener('touchstart', onTouchStart, { passive: true });
    root.addEventListener('touchmove', onTouchMove, { passive: false });
    root.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      root.removeEventListener('touchstart', onTouchStart);
      root.removeEventListener('touchmove', onTouchMove);
      root.removeEventListener('touchend', onTouchEnd);
    };
  }, [navigateBy]);

  const onKeyDown = useCallback(
    e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateBy(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateBy(1);
      }
    },
    [navigateBy]
  );

  useEffect(() => {
    layout(posRef.current);
  }, [layout, depth, spread, tilt, tiltDirection, visibleCards, falloff, currentWidth, currentHeight, radius, count]);

  useEffect(
    () => () => {
      tweenRef.current?.kill();
    },
    []
  );

  return (
    <div
      ref={rootRef}
      className={`depth-carousel ${className}`.trim()}
      style={{ '--dc-perspective': `${perspective}px` }}
      role="group"
      aria-label="Depth carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="depth-carousel__stage">
        {data.map((item, i) => (
          <div
            key={i}
            className="depth-carousel__card"
            ref={el => (cardRefs.current[i] = el)}
            style={{ width: currentWidth, height: currentHeight, borderRadius: radius }}
            onClick={() => {
              setFocus(i, true);
            }}
          >
            {renderCard ? (
              renderCard(item, i, active === i)
            ) : (
              <>
                <img className="depth-carousel__img" src={item.image} alt={item.alt || ''} draggable={false} loading="lazy" decoding="async" />
                <span
                  className="depth-carousel__tint"
                  ref={el => (overlayRefs.current[i] = el)}
                  style={{ background: tint }}
                />
              </>
            )}
          </div>
        ))}
      </div>

      {showControls && count > 1 && (
        <>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--prev"
            onClick={() => navigateBy(-1)}
            aria-label="Previous card"
          >
            &#8249;
          </button>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--next"
            onClick={() => navigateBy(1)}
            aria-label="Next card"
          >
            &#8250;
          </button>
        </>
      )}

      {showIndicators && count > 1 && (
        <div className="depth-carousel__dots">
          {data.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`depth-carousel__dot ${i === active ? 'is-active' : ''}`}
              onClick={() => setFocus(i, true)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DepthCarousel;
