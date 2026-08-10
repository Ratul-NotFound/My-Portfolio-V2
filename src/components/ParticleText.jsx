'use client';
import { useRef, useEffect } from 'react';

export default function ParticleText({
  text = "Mahmud Hasan Ratul",
  particleSize = 2,
  density = 4,
  color = "#f4efe6",
  highlightColor = "#38bdf8",
  scatter = 150,
  gatherDuration = 1400,
  stagger = 300,
  pointerRepel = 40,
  repelRadius = 100,
  idleDrift = 0.5,
  trigger = "hover",
  fontSize = "clamp(2.5rem, 7vw, 6rem)",
  fontWeight = 800,
  fontFamily = "Inter, sans-serif",
  glow = true,
  className = ""
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animationFrameId;
    let particles = [];
    let mouse = { x: -9999, y: -9999, isOver: false };
    let startTime = Date.now();

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      canvas.width = width;
      canvas.height = height;

      initParticles(width, height);
    };

    const initParticles = (width, height) => {
      ctx.clearRect(0, 0, width, height);

      // Measure font size string (e.g. clamp or px)
      let calculatedFontSize = 72;
      if (typeof fontSize === 'number') {
        calculatedFontSize = fontSize;
      } else if (width < 640) {
        calculatedFontSize = Math.min(width / 6.5, 48);
      } else if (width < 1024) {
        calculatedFontSize = Math.min(width / 8, 72);
      } else {
        calculatedFontSize = Math.min(width / 9, 96);
      }

      ctx.font = `${fontWeight} ${calculatedFontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';

      // Draw text to offscreen buffer
      ctx.fillText(text, width / 2, height / 2);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      ctx.clearRect(0, 0, width, height);

      particles = [];
      const step = Math.max(2, Math.floor(density));

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * scatter + 20;

            const startX = x + Math.cos(angle) * dist;
            const startY = y + Math.sin(angle) * dist;
            const isHighlight = Math.random() < 0.25;

            particles.push({
              targetX: x,
              targetY: y,
              x: startX,
              y: startY,
              startX: startX,
              startY: startY,
              vx: 0,
              vy: 0,
              delay: Math.random() * stagger,
              isHighlight: isHighlight,
              driftOffset: Math.random() * 100
            });
          }
        }
      }
      startTime = Date.now();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isOver = true;
    };

    const handleMouseLeave = () => {
      mouse.isOver = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const elapsed = Date.now() - startTime;

      ctx.clearRect(0, 0, width, height);

      if (glow) {
        ctx.shadowBlur = 10;
      }

      const timeSec = Date.now() * 0.002;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gather animation phase
        if (elapsed > p.delay) {
          const progress = Math.min(1, (elapsed - p.delay) / gatherDuration);
          const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out

          // Base destination position
          let destX = p.startX + (p.targetX - p.startX) * easeProgress;
          let destY = p.startY + (p.targetY - p.startY) * easeProgress;

          // Idle drift
          if (progress >= 1 && idleDrift > 0) {
            destX += Math.sin(timeSec + p.driftOffset) * idleDrift;
            destY += Math.cos(timeSec * 0.8 + p.driftOffset) * idleDrift;
          }

          // Pointer repel physics
          if (mouse.isOver) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < repelRadius && dist > 0) {
              const force = (1 - dist / repelRadius) * pointerRepel;
              destX += (dx / dist) * force;
              destY += (dy / dist) * force;
            }
          }

          // Spring smoothing toward dest
          p.vx += (destX - p.x) * 0.15;
          p.vy += (destY - p.y) * 0.15;
          p.vx *= 0.75;
          p.vy *= 0.75;

          p.x += p.vx;
          p.y += p.vy;
        }

        // Draw particle
        ctx.fillStyle = p.isHighlight ? highlightColor : color;
        if (glow) {
          ctx.shadowColor = p.isHighlight ? highlightColor : color;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, [text, particleSize, density, color, highlightColor, scatter, gatherDuration, stagger, pointerRepel, repelRadius, idleDrift, fontSize, fontWeight, fontFamily, glow]);

  return (
    <div ref={containerRef} className={`relative w-full h-[180px] sm:h-[220px] lg:h-[260px] flex items-center justify-center overflow-hidden cursor-crosshair ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}
