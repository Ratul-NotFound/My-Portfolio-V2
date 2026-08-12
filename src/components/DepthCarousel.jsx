'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import './DepthCarousel.css';

const DEFAULT_ITEMS = [];

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const normalizeItem = it => (typeof it === 'string' ? { image: it, alt: '' } : it);

const DepthCarousel = ({
  items = DEFAULT_ITEMS,
  cardWidth = 360,
  cardHeight = 400,
  radius = 24,
  tint = '#05060a',
  depth = 180,
  spread = 80,
  tilt = 16,
  tiltDirection = 'right',
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.15,
  duration = 450,
  ease = 'power2.out',
  autoplay = false,
  autoplayDelay = 3500,
  loop = true,
  showControls = true,
  showIndicators = true,
  onChange,
  renderCard,
  className = ''
}) => {
  const data = useMemo(() => (Array.isArray(items) ? items : []).map(normalizeItem), [items]);
  const count = data.length;

  const rootRef = useRef(null);
  const cardRefs = useRef([]);
  const overlayRefs = useRef([]);

  const posRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef(null);
  const scaleRef = useRef(1);
  const cfgRef = useRef({});
  const onChangeRef = useRef(onChange);

  const touchStartRef = useRef(null);
  const [active, setActive] = useState(0);

  // DYNAMIC RESPONSIVE CARD DIMENSIONS
  const [currentWidth, setCurrentWidth] = useState(cardWidth);
  const [currentHeight, setCurrentHeight] = useState(cardHeight);

  useEffect(() => {
    const handleResponsiveResize = () => {
      if (typeof window === 'undefined') return;
      const screenW = window.innerWidth;

      if (screenW < 480) {
        // Extra Small Phones (320px - 480px)
        const targetW = Math.min(screenW - 32, cardWidth);
        const targetH = Math.min(420, cardHeight);
        setCurrentWidth(targetW);
        setCurrentHeight(targetH);
      } else if (screenW < 768) {
        // Mobile / Small Tablets (480px - 768px)
        const targetW = Math.min(screenW - 48, cardWidth);
        setCurrentWidth(targetW);
        setCurrentHeight(cardHeight);
      } else if (screenW < 1024) {
        // Tablets (768px - 1024px)
        const targetW = Math.min(screenW - 64, cardWidth);
        setCurrentWidth(targetW);
        setCurrentHeight(cardHeight);
      } else {
        // Desktop (> 1024px)
        setCurrentWidth(cardWidth);
        setCurrentHeight(cardHeight);
      }
    };

    handleResponsiveResize();
    window.addEventListener('resize', handleResponsiveResize);
    return () => window.removeEventListener('resize', handleResponsiveResize);
  }, [cardWidth, cardHeight]);

  onChangeRef.current = onChange;
  cfgRef.current = {
    count,
    depth,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
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

  const handleTouchStart = e => {
    const t = e.touches ? e.touches[0] : e;
    touchStartRef.current = { x: t.clientX, y: t.clientY, time: Date.now() };
  };

  const handleTouchEnd = e => {
    if (!touchStartRef.current) return;
    const t = e.changedTouches ? e.changedTouches[0] : e;
    const dx = t.clientX - touchStartRef.current.x;
    const dt = Date.now() - touchStartRef.current.time;
    touchStartRef.current = null;

    if (Math.abs(dx) > 30 && dt < 400) {
      if (dx < 0) navigateBy(1);
      else navigateBy(-1);
    }
  };

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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
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
                <img className="depth-carousel__img" src={item.image} alt={item.alt || ''} draggable={false} />
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
