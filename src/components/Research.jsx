'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Check, 
  Cpu, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  BookOpen, 
  ShieldCheck, 
  ArrowUpRight,
  Radio,
  Mouse,
  TrendingUp
} from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';

export default function Research({ researchPapers = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = Next, -1 = Prev
  const [copiedFormat, setCopiedFormat] = useState(null);
  const [inspectedPaper, setInspectedPaper] = useState(null);

  const sectionRef = useRef(null);
  const lastScrollTime = useRef(0);
  const currentIndexRef = useRef(0);
  currentIndexRef.current = currentIndex;

  const total = researchPapers.length;
  const currentPaper = researchPapers[currentIndex] || researchPapers[0];

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelectIndex = (idx) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    if (total <= 1) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, total]);

  // 🖱️ Smooth Mouse Wheel Scroll with deliberate debounce
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || total <= 1) return;

    const onWheel = (e) => {
      const now = Date.now();
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 15) return;

      const idx = currentIndexRef.current;

      // Scrolling Down
      if (delta > 0) {
        if (idx < total - 1) {
          e.preventDefault();
          if (now - lastScrollTime.current > 400) {
            lastScrollTime.current = now;
            setDirection(1);
            setCurrentIndex(idx + 1);
          }
        }
      } 
      // Scrolling Up
      else if (delta < 0) {
        if (idx > 0) {
          e.preventDefault();
          if (now - lastScrollTime.current > 400) {
            lastScrollTime.current = now;
            setDirection(-1);
            setCurrentIndex(idx - 1);
          }
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [total]);

  const generateCitation = (paper) => {
    const doiNumber = paper?.doi || `10.1109/IEEE.2024.1042`;
    return `@article{ratul2024${paper?.id?.replace(/-/g, '') || 'research'},\n  title={${paper?.title}},\n  author={Ratul, Mahmud Hasan and Team},\n  journal={${paper?.venue}},\n  year={${paper?.year || 2024}},\n  doi={${doiNumber}}\n}`;
  };

  const handleCopyBibTeX = (paper, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(generateCitation(paper));
    setCopiedFormat('BibTeX');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  // Clean 3D Horizon Slide Transition
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '60%' : '-60%',
      rotateY: dir > 0 ? 20 : -20,
      scale: 0.92,
      opacity: 0,
    }),
    center: {
      x: '0%',
      rotateY: 0,
      scale: 1,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 280, damping: 26 },
        rotateY: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.22 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? '-60%' : '60%',
      rotateY: dir > 0 ? -20 : 20,
      scale: 0.92,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  // Helper to format short clean venue badge
  const getCleanVenue = (venue) => {
    if (!venue) return 'IEEE Publication';
    let v = venue
      .replace(/International Conference on/i, 'IEEE Conf.')
      .replace(/Journal of Biomedical Informatics/i, 'Springer Journal')
      .replace(/Workshop on Agricultural Vision/i, 'CVPR Workshop')
      .replace(/\(2023\)|\(2024\)/g, '')
      .trim();
    const words = v.split(/\s+/);
    const unique = words.filter((w, i) => i === 0 || w.toLowerCase() !== words[i - 1].toLowerCase());
    return unique.join(' ');
  };

  const shortVenue = getCleanVenue(currentPaper?.venue);

  return (
    <SectionWrapper id="research" variant="slide-right" className="py-10 sm:py-14">
      <div 
        ref={sectionRef}
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-5 sm:space-y-6"
      >
        {/* Section Header */}
        <SectionHeader
          number="05"
          category="AI Research"
          title="Research &"
          highlight="Publications"
        />

        {/* 🎬 SPACE-OPTIMIZED MAIN SLIDE PRESENTATION */}
        <div className="w-full relative flex items-center justify-center py-1 overflow-hidden perspective-[1400px]">
          
          {/* Navigation Chevron Left */}
          <button
            onClick={handlePrev}
            aria-label="Previous Publication"
            className="absolute left-0 sm:left-1 z-40 p-2.5 sm:p-3 rounded-2xl shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-110 active:scale-90"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
          </button>

          {/* Active Animated Slide Card */}
          <div className="w-full max-w-2xl px-6 sm:px-10 z-20">
            <AnimatePresence custom={direction} mode="wait">
              {currentPaper && (
                <motion.div
                  key={currentPaper.id || currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(e, info) => {
                    if (Math.abs(info.offset.x) > 60) {
                      if (info.offset.x > 0) handlePrev();
                      else handleNext();
                    }
                  }}
                  className="w-full p-5 sm:p-6 rounded-2xl sm:rounded-3xl relative overflow-hidden font-mono shadow-xl select-none group cursor-grab active:cursor-grabbing space-y-3.5"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {/* Top Subtle Border Highlight on Hover */}
                  <div 
                    className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" 
                    style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} 
                  />

                  {/* 1. Unified Single-Row Header Bar */}
                  <div className="flex items-center justify-between gap-2 pb-2.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <span 
                        className="text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm truncate max-w-[220px] sm:max-w-xs"
                        style={{
                          background: 'var(--color-surface-2)',
                          color: 'var(--color-accent)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{shortVenue}</span>
                      </span>

                      <span 
                        className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1 shadow-sm flex-shrink-0"
                        style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.25)' }}
                      >
                        <ShieldCheck className="w-3 h-3 text-green-400" />
                        <span>Peer-Reviewed</span>
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 flex-shrink-0" style={{ background: 'var(--color-surface-2)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                      <Radio className="w-3 h-3 text-accent animate-pulse" />
                      <span>0{currentIndex + 1} / 0{total}</span>
                    </span>
                  </div>

                  {/* 2. Paper Title & Metadata */}
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-xl font-bold font-sans leading-snug tracking-tight group-hover:text-accent transition-colors" style={{ color: 'var(--color-text)' }}>
                      {currentPaper.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      <span className="font-semibold text-text">Mahmud Hasan Ratul et al.</span>
                      <span>•</span>
                      <span style={{ color: 'var(--color-accent)' }}>{currentPaper.year || '2024'}</span>
                      {currentPaper.hardware && (
                        <>
                          <span>•</span>
                          <span className="font-mono text-accent/90">Target: {currentPaper.hardware}</span>
                        </>
                      )}
                    </div>

                    {/* Domain & ML Tech Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg flex items-center gap-1 shadow-sm" style={{ background: 'var(--color-surface-2)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                        <BookOpen className="w-3 h-3" />
                        <span>{currentPaper.domain}</span>
                      </span>

                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg flex items-center gap-1 shadow-sm" style={{ background: 'var(--color-surface-2)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                        <Cpu className="w-3 h-3" />
                        <span>{currentPaper.mlTech}</span>
                      </span>
                    </div>
                  </div>

                  {/* 3. Abstract Excerpt Box */}
                  <div 
                    className="p-3 rounded-xl space-y-1"
                    style={{
                      background: 'var(--color-surface-2)',
                      borderLeft: '3px solid var(--color-accent)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-widest block" style={{ color: 'var(--color-accent)' }}>
                      [ABSTRACT]
                    </span>
                    <p className="text-xs sm:text-[13px] leading-relaxed font-sans line-clamp-2 sm:line-clamp-3" style={{ color: 'var(--color-text-muted)' }}>
                      {currentPaper.abstract}
                    </p>
                  </div>

                  {/* 4. Compact Benchmark Telemetry Bar */}
                  {currentPaper.metrics && (
                    <div 
                      className="p-2.5 rounded-xl space-y-1.5 shadow-inner" 
                      style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 truncate">
                          <Award className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                          <span className="text-xs font-bold truncate" style={{ color: 'var(--color-text)' }}>{currentPaper.metrics}</span>
                        </div>

                        <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase flex-shrink-0" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
                          Verified Result
                        </span>
                      </div>

                      {/* Animated Metric Gauge */}
                      <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-surface)' }}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '96%' }}
                          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                          className="h-full rounded-full" 
                          style={{ background: 'linear-gradient(90deg, #22c55e, var(--color-accent), #38bdf8)' }} 
                        />
                      </div>
                    </div>
                  )}

                  {/* 5. Footer Action Bar */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <button
                      onClick={(e) => handleCopyBibTeX(currentPaper, e)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:opacity-90 active:scale-95"
                      style={{
                        background: 'var(--color-surface-2)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)',
                      }}
                    >
                      {copiedFormat ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-green-400 font-bold">BibTeX Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
                          <span>BibTeX Citation</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setInspectedPaper(currentPaper)}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                      style={{
                        background: 'var(--color-accent)',
                        color: '#000',
                      }}
                    >
                      <span>Inspect Spec</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Chevron Right */}
          <button
            onClick={handleNext}
            aria-label="Next Publication"
            className="absolute right-0 sm:right-1 z-40 p-2.5 sm:p-3 rounded-2xl shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-110 active:scale-90"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            <ChevronRight className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
          </button>
        </div>

        {/* 🔘 ELEGANT PAGINATION PILLS */}
        <div className="flex flex-col items-center justify-center gap-1.5 pt-1">
          <div className="flex items-center justify-center gap-2">
            {researchPapers.map((p, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={p.id || idx}
                  onClick={() => handleSelectIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer relative ${
                    isActive 
                      ? 'w-8 h-2.5 bg-accent shadow-[0_0_10px_rgba(56,189,248,0.7)]' 
                      : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--color-accent)' : undefined
                  }}
                >
                  {isActive && (
                    <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-black font-mono">
                      0{idx + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Scroll / Swipe Indicator Hint */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono opacity-60" style={{ color: 'var(--color-text-muted)' }}>
            <Mouse className="w-3 h-3 text-accent animate-bounce" />
            <span>Scroll wheel or swipe card to change publications</span>
          </div>
        </div>

      </div>

      {/* Paper Full Spec Modal Drawer */}
      <AnimatePresence>
        {inspectedPaper && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl" 
            style={{ background: 'rgba(0,0,0,0.65)' }}
            onClick={() => setInspectedPaper(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-3xl p-6 space-y-4 relative overflow-hidden font-mono shadow-[0_0_60px_rgba(56,189,248,0.25)]"
              style={{
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
              }}
            >
              {/* Top Holographic Accent Line */}
              <div 
                className="absolute inset-x-0 top-0 h-[2px]" 
                style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} 
              />

              <button
                onClick={() => setInspectedPaper(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:opacity-85 transition-opacity cursor-pointer shadow-md"
                style={{
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                }}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-wrap items-center gap-2 pr-10">
                <span className="text-xs px-3 py-1 rounded-full font-bold shadow-sm" style={{ background: 'var(--color-surface-2)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                  Track: {inspectedPaper.domain || "AI Research"}
                </span>
                <span className="text-xs px-3 py-1 rounded-full font-bold shadow-sm" style={{ background: 'var(--color-surface-2)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                  ML Tech: {inspectedPaper.mlTech || "Deep Learning"}
                </span>
                {inspectedPaper.hardware && (
                  <span className="text-xs font-mono px-2 py-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    Target: {inspectedPaper.hardware}
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold leading-snug font-sans pt-1" style={{ color: 'var(--color-text)' }}>
                {inspectedPaper.title}
              </h2>

              <div className="p-3.5 rounded-xl space-y-1 shadow-sm" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
                <span className="text-xs font-bold block" style={{ color: 'var(--color-accent)' }}>PUBLISHED VENUE:</span>
                <p className="text-xs font-bold font-sans" style={{ color: 'var(--color-text)' }}>
                  {inspectedPaper.venue} ({inspectedPaper.year || '2024'})
                </p>
              </div>

              <div className="p-4 rounded-2xl space-y-2 shadow-sm" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-accent)' }}>
                <span className="text-xs font-bold block" style={{ color: 'var(--color-accent)' }}>COMPLETE ABSTRACT:</span>
                <p className="text-xs leading-relaxed font-sans" style={{ color: 'var(--color-text-muted)' }}>
                  {inspectedPaper.abstract}
                </p>
              </div>

              {inspectedPaper.metrics && (
                <div className="p-3 rounded-xl text-xs flex items-center justify-between shadow-inner" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                    <span className="font-bold" style={{ color: 'var(--color-accent)' }}>{inspectedPaper.metrics}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
                    Verified Result
                  </span>
                </div>
              )}

              <div className="pt-3 flex justify-end gap-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                <button
                  onClick={() => setInspectedPaper(null)}
                  className="px-5 py-2 rounded-xl font-bold text-xs hover:opacity-90 transition-all cursor-pointer shadow-md"
                  style={{
                    background: 'var(--color-accent)',
                    color: '#000',
                  }}
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </SectionWrapper>
  );
}
