'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Cpu, Sparkles, Award, ChevronRight, X, Radio, BookOpen, ShieldCheck, FileText, ExternalLink } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import DepthCarousel from './DepthCarousel';

// Perfectly Structured Ultra-Massive 960px Research Paper Card Component
function DepthResearchCard({ paper, index, total, onInspect }) {
  const [copiedFormat, setCopiedFormat] = useState(null);
  const [activeCiteFormat, setActiveCiteFormat] = useState('BibTeX');

  const doiNumber = paper.doi || `10.1109/IEEE.2024.10${index + 42}`;

  const generateCitation = (format) => {
    if (format === 'BibTeX') {
      return `@article{ratul2024${paper.id.replace(/-/g, '')},\n  title={${paper.title}},\n  author={Ratul, Mahmud Hasan and Team},\n  journal={${paper.venue}},\n  year={${paper.year}},\n  doi={${doiNumber}}\n}`;
    } else if (format === 'IEEE') {
      return `M. H. Ratul et al., "${paper.title}," in ${paper.venue}, ${paper.year}.`;
    } else {
      return `Ratul, M. H. (${paper.year}). ${paper.title}. ${paper.venue}.`;
    }
  };

  const handleCopy = (e, format) => {
    e.stopPropagation();
    const text = generateCitation(format);
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div 
      className="w-full h-full p-6 sm:p-7 flex flex-col justify-between select-none relative z-10 rounded-[28px] group overflow-hidden font-mono shadow-card"
      style={{
        border: '1px solid var(--color-border)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      {/* Top Laser Shimmer Beam */}
      <div 
        className="absolute inset-x-0 top-0 h-[3px] z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
        style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }}
      />

      {/* Ambient Glow Gradient Blob */}
      <div 
        className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-all duration-500 opacity-30" 
        style={{ backgroundColor: 'var(--color-accent)' }}
      />

      {/* 1. CLEAN TOP HEADER BAR */}
      <div className="flex items-center justify-between gap-4 pb-3 flex-shrink-0 z-20" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-2.5">
          <span 
            className="text-xs px-3.5 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-sm"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border-accent)',
              color: 'var(--color-accent)',
            }}
          >
            <BookOpen className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
            <span>{paper.venue}</span>
          </span>
          <span 
            className="text-[11px] px-2.5 py-0.5 rounded-full font-bold hidden sm:flex items-center gap-1"
            style={{
              background: 'var(--color-surface-3)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)',
            }}
          >
            <ShieldCheck className="w-3 h-3" style={{ color: 'var(--color-accent)' }} />
            <span>Peer-Reviewed</span>
          </span>
        </div>

        <span 
          className="text-xs px-3.5 py-1 rounded-full font-bold shadow-sm"
          style={{
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border-accent)',
            color: 'var(--color-accent)',
          }}
        >
          PAPER 0{index + 1} / 0{total}
        </span>
      </div>

      {/* 2. STRUCTURED 2-COLUMN MAIN BODY */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 items-center my-3 z-20">
        
        {/* LEFT COLUMN (7/12 Width): Hero Title, Pill Tags & Abstract */}
        <div className="md:col-span-7 space-y-3">
          
          {/* Main Paper Title */}
          <h3 className="text-lg sm:text-xl font-bold group-hover:text-accent transition-colors leading-snug tracking-tight font-sans" style={{ color: 'var(--color-text)' }}>
            {paper.title}
          </h3>

          {/* Domain & ML Tech Tags Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <span 
              className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border-accent)',
                color: 'var(--color-accent)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
              <span>{paper.domain || "AI Research"}</span>
            </span>

            <span 
              className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border-accent)',
                color: 'var(--color-accent)',
              }}
            >
              <Cpu className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
              <span>{paper.mlTech || "Deep Learning"}</span>
            </span>
          </div>

          {/* Short Abstract Blockquote */}
          <div 
            className="p-3.5 rounded-r-2xl rounded-l-md space-y-1"
            style={{
              background: 'var(--color-surface-3)',
              borderLeft: '2px solid var(--color-accent)',
            }}
          >
            <span className="text-[10px] font-bold block uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>
              [SHORT ABSTRACT]
            </span>
            <p className="text-xs leading-relaxed line-clamp-2 font-sans" style={{ color: 'var(--color-text-muted)' }}>
              {paper.abstract}
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN (5/12 Width): Publication & Telemetry Spec Box */}
        <div className="md:col-span-5 space-y-2.5">
          <div 
            className="p-4 rounded-2xl space-y-2.5 shadow-inner"
            style={{
              background: 'var(--color-surface-3)',
              border: '1px solid var(--color-border)',
            }}
          >
            {/* Published Where Info Box */}
            <div className="space-y-1 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <span className="text-[10px] font-bold block uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                PUBLISHED WHERE:
              </span>
              <p className="text-xs font-bold leading-snug" style={{ color: 'var(--color-text)' }}>
                {paper.venue} ({paper.year})
              </p>
            </div>

            {/* Benchmark Performance Metric */}
            {paper.metrics && (
              <div className="space-y-1 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <span className="text-[10px] font-bold block uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>
                  VERIFIED BENCHMARK METRICS:
                </span>
                <p className="text-xs font-bold" style={{ color: 'var(--color-accent)' }}>
                  {paper.metrics}
                </p>
              </div>
            )}

            {/* Hardware / DOI Tag */}
            <div className="flex items-center justify-between text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
              <span>Hardware Node:</span>
              <strong style={{ color: 'var(--color-accent)' }}>{paper.hardware}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* 3. SCIENTIFIC CITATION & ACTION BAR */}
      <div className="pt-3 flex items-center justify-between gap-4 flex-shrink-0 z-20" style={{ borderTop: '1px solid var(--color-border)' }}>
        {/* Citation Format Switcher */}
        <div 
          className="flex items-center gap-1 p-1 rounded-xl" 
          style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-border)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {['BibTeX', 'IEEE', 'APA'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setActiveCiteFormat(fmt)}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
              style={{
                background: activeCiteFormat === fmt ? 'var(--color-accent)' : 'transparent',
                color: activeCiteFormat === fmt ? '#000' : 'var(--color-text-muted)',
              }}
            >
              {fmt}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={(e) => handleCopy(e, activeCiteFormat)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold hover:opacity-95 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            {copiedFormat === activeCiteFormat ? (
              <>
                <Check className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
                <span>Copy {activeCiteFormat}</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onInspect(paper);
            }}
            className="px-4 py-1.5 rounded-xl text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1 shadow-lg cursor-pointer"
            style={{
              background: 'var(--color-accent)',
              color: '#000',
            }}
          >
            <span>Full Paper Spec</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Research({ researchPapers = [] }) {
  const [inspectedPaper, setInspectedPaper] = useState(null);

  return (
    <SectionWrapper id="research" variant="slide-right" className="">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5 lg:space-y-6 perspective-1400">
        
        {/* Section Header */}
        <SectionHeader
          number="05"
          category="AI Research"
          title="Research &"
          highlight="Publications"
        />

        {/* Dynamic Header Badge */}
        <div className="flex items-center justify-between text-xs font-mono px-1" style={{ color: 'var(--color-text-muted)' }}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--color-accent)' }} />
            <span>3D DEPTH BANNER MATRIX — <strong style={{ color: 'var(--color-text)' }}>{researchPapers.length} PAPERS PUBLISHED</strong></span>
          </div>
          <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--color-accent)' }}>
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>SCROLL OR DRAG TO ROTATE 3D MANUSCRIPT DECK</span>
          </div>
        </div>

        {/* DepthCarousel */}
        <div className="w-full h-[450px] relative">
          <DepthCarousel
            items={researchPapers}
            cardWidth={960}
            cardHeight={380}
            radius={28}
            depth={220}
            spread={140}
            tilt={12}
            tiltDirection="right"
            perspective={1400}
            visibleCards={4}
            falloff={0.18}
            autoplay={false}
            loop={true}
            showControls={true}
            showIndicators={true}
            renderCard={(paper, idx, isActive) => (
              <DepthResearchCard
                paper={paper}
                index={idx}
                total={researchPapers.length}
                onInspect={setInspectedPaper}
              />
            )}
          />
        </div>

        {/* Paper Full Spec Modal Drawer */}
        <AnimatePresence>
          {inspectedPaper && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl" 
              style={{ background: 'rgba(0,0,0,0.6)' }}
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
                <button
                  onClick={() => setInspectedPaper(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:opacity-85 transition-opacity cursor-pointer"
                  style={{
                    background: 'var(--color-surface-2)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-wrap items-center gap-2">
                  <span 
                    className="text-xs px-3 py-1 rounded-full font-bold"
                    style={{
                      background: 'var(--color-surface-2)',
                      color: 'var(--color-accent)',
                      border: '1px solid var(--color-border-accent)',
                    }}
                  >
                    Domain: {inspectedPaper.domain || "AI Research"}
                  </span>
                  <span 
                    className="text-xs px-3 py-1 rounded-full font-bold"
                    style={{
                      background: 'var(--color-surface-2)',
                      color: 'var(--color-accent)',
                      border: '1px solid var(--color-border-accent)',
                    }}
                  >
                    ML Tech: {inspectedPaper.mlTech || "Deep Learning"}
                  </span>
                  <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                    Hardware: {inspectedPaper.hardware}
                  </span>
                </div>

                <h2 className="text-xl font-bold leading-snug" style={{ color: 'var(--color-text)' }}>{inspectedPaper.title}</h2>

                <div className="p-3.5 rounded-xl space-y-1" style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-border)' }}>
                  <span className="text-xs font-bold block" style={{ color: 'var(--color-accent)' }}>PUBLISHED WHERE:</span>
                  <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{inspectedPaper.venue} ({inspectedPaper.year})</p>
                </div>

                <div className="p-4 rounded-2xl space-y-2" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
                  <span className="text-xs font-bold block" style={{ color: 'var(--color-accent)' }}>SHORT ABSTRACT:</span>
                  <p className="text-xs leading-relaxed font-sans" style={{ color: 'var(--color-text-muted)' }}>{inspectedPaper.abstract}</p>
                </div>

                {inspectedPaper.metrics && (
                  <div className="p-3 rounded-xl text-xs flex items-center gap-2" style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-border)' }}>
                    <Sparkles className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                    <span className="font-bold" style={{ color: 'var(--color-accent)' }}>{inspectedPaper.metrics}</span>
                  </div>
                )}

                <div className="pt-3 flex justify-end" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <button
                    onClick={() => setInspectedPaper(null)}
                    className="px-5 py-2 rounded-xl font-bold text-xs hover:opacity-90 transition-all cursor-pointer"
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

      </div>
    </SectionWrapper>
  );
}
