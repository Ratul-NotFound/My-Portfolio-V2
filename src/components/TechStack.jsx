'use client';

import { useState, useRef, forwardRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Layers, Code2, Server, Brain, Terminal, Cpu, Search, LayoutGrid, TerminalSquare } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import { GetTechLogo } from './TechLogos';

const categoryIconMap = {
  all: Layers,
  frontend: Code2,
  backend: Server,
  ai: Brain,
  devops: Terminal,
  tools: Terminal
};

const getShortLabel = (label = '') => {
  const clean = label.split(' (')[0].trim();
  if (clean.toLowerCase().includes('all')) return 'All';
  if (clean.toLowerCase().includes('front')) return 'Frontend';
  if (clean.toLowerCase().includes('back')) return 'Backend';
  if (clean.toLowerCase().includes('ai')) return 'AI & ML';
  if (clean.toLowerCase().includes('devops') || clean.toLowerCase().includes('tool')) return 'DevOps';
  return clean;
};

// Compact & Responsive Card Component (Optimized for Mobile & Desktop)
const EyePleasingCard = forwardRef(function EyePleasingCard({ skill, index, onSelect }, ref) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 450, damping: 28 });
  const mouseY = useSpring(y, { stiffness: 450, damping: 28 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);

  const setRefs = (node) => {
    cardRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={setRefs}
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect && onSelect(skill)}
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '20px' }}
      exit={{ opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.15 } }}
      transition={{ duration: 0.35, delay: (index % 12) * 0.025, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX, rotateY,
        transformStyle: 'preserve-3d', perspective: 1000,
        background: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="p-2 sm:p-3 rounded-xl sm:rounded-2xl border flex items-center gap-2 sm:gap-2.5 relative cursor-pointer overflow-hidden select-none transition-all duration-300 shadow-sm hover:border-[var(--color-border-accent)] hover:shadow-md group w-full"
    >
      {/* Tech Icon Box */}
      <motion.div
        whileHover={{ rotateZ: 360, scale: 1.12 }}
        transition={{ duration: 0.45, type: 'spring', stiffness: 300 }}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex-shrink-0 flex items-center justify-center border shadow-inner"
        style={{
          background: 'var(--color-surface-2)',
          borderColor: 'var(--color-border)',
        }}
      >
        <GetTechLogo name={skill.name} className="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain" />
      </motion.div>

      {/* Info */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <h3 
          className="text-[11px] sm:text-xs font-mono font-bold truncate leading-tight tracking-tight"
          style={{ color: 'var(--color-text)' }}
        >
          {skill.name}
        </h3>
        <div className="flex items-center gap-1 sm:gap-1.5 pt-0.5">
          <span 
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: 'var(--color-accent)' }} 
          />
          <span 
            className="text-[9px] sm:text-[10px] font-mono font-semibold uppercase tracking-wider truncate"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {skill.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

export default function TechStack({ categories = [], skills = [] }) {
  const defaultCategories = [
    { id: 'All', label: 'All' },
    { id: 'Frontend', label: 'Frontend' },
    { id: 'Backend', label: 'Backend' },
    { id: 'AI & ML', label: 'AI & ML' },
    { id: 'DevOps & Tools', label: 'DevOps' }
  ];

  const normalizedCategories = (categories && categories.length > 0)
    ? categories.map(cat => {
        if (typeof cat === 'string') {
          return { id: cat, label: cat };
        }
        return { id: cat.id || cat.name || cat.label || 'All', label: cat.label || cat.name || cat.id || 'Category' };
      })
    : defaultCategories;

  const [activeTab, setActiveTab] = useState('All');
  const [activeViewMode, setActiveViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = skills.filter((skill) => {
    const matchesTab = activeTab.toLowerCase() === 'all' || 
      skill.category.toLowerCase().includes(activeTab.toLowerCase()) ||
      activeTab.toLowerCase().includes(skill.category.toLowerCase());

    const matchesSearch = searchQuery === '' ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <SectionWrapper id="tech-stack" variant="deck-rise" className="py-10 sm:py-14">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 sm:space-y-6">
        
        {/* Section Header */}
        <SectionHeader
          number="03"
          category="Technical Skills"
          title="Core Tech &"
          highlight="Stack"
        />

        {/* CONTROLS HEADER BAR */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              {[[ 'grid', LayoutGrid, 'Glass Deck' ], [ 'terminal', TerminalSquare, 'CLI Terminal' ]].map(([mode, IconComp, label]) => (
                <button 
                  key={mode} 
                  onClick={() => setActiveViewMode(mode)}
                  className="flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none"
                  style={{
                    background: activeViewMode === mode ? 'var(--color-accent)' : 'transparent',
                    color:      activeViewMode === mode ? '#000'                 : 'var(--color-text-muted)',
                  }}
                >
                  <IconComp className="w-3.5 h-3.5" /><span>{label}</span>
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-accent)' }} />
              <input 
                type="text" 
                placeholder="Search technologies..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono outline-none transition-colors"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                }}
              />
            </div>
          </div>

          {/* Compact Category Tabs (Smooth scrolling on mobile, no clipping) */}
          <div 
            className="w-full flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 sm:pb-0 custom-scrollbar select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {normalizedCategories.map((cat) => {
              const catId = cat.id;
              const catLabel = cat.label || cat.id || 'Category';
              const shortLabel = getShortLabel(catLabel);
              const isActive = activeTab.toLowerCase() === catId.toLowerCase();
              const iconKey = catId.toLowerCase().includes('front') ? 'frontend'
                : catId.toLowerCase().includes('back') ? 'backend'
                : catId.toLowerCase().includes('ai') ? 'ai'
                : (catId.toLowerCase().includes('devops') || catId.toLowerCase().includes('tool')) ? 'devops' : 'all';
              const IconComp = categoryIconMap[iconKey] || Cpu;
              const skillCount = (catId.toLowerCase() === 'all')
                ? skills.length
                : skills.filter(s => s.category.toLowerCase().includes(catId.toLowerCase()) || catId.toLowerCase().includes(s.category.toLowerCase())).length;

              return (
                <button
                  key={catId}
                  onClick={() => setActiveTab(catId)}
                  className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer whitespace-nowrap flex-shrink-0 shadow-sm hover:scale-105 active:scale-95"
                  style={{
                    background: isActive ? 'var(--color-accent)' : 'var(--color-surface-2)',
                    color: isActive ? '#000' : 'var(--color-text-muted)',
                    border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    boxShadow: isActive ? '0 0 16px rgba(56, 189, 248, 0.35)' : 'none',
                  }}
                >
                  <IconComp className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{shortLabel}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.2 rounded-full font-bold flex-shrink-0"
                    style={{
                      background: isActive ? 'rgba(0,0,0,0.2)' : 'var(--color-surface)',
                      color: isActive ? '#000' : 'var(--color-accent)',
                      border: isActive ? 'none' : '1px solid var(--color-border)',
                    }}
                  >
                    {skillCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SKILLS CONTAINER */}
        {activeViewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 min-h-[220px] items-start w-full">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <EyePleasingCard
                  key={skill.name}
                  skill={skill}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* CLI TERMINAL VIEW */
          <div 
            className="rounded-2xl p-4 font-mono text-xs space-y-2 overflow-x-auto"
            style={{ background: '#0d0d12', border: '1px solid var(--color-border)', color: 'var(--color-accent)' }}
          >
            <div className="flex items-center gap-2 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-[10px] ml-2 text-zinc-400">ratul@arch-linux: ~/tech-stack --list</span>
            </div>
            {filteredSkills.map((skill, idx) => (
              <div key={skill.name} className="flex items-center justify-between p-1 rounded hover:bg-white/5">
                <span className="text-zinc-200 font-bold">[{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}] {skill.name}</span>
                <span className="text-zinc-400">{skill.category}</span>
                <span className="text-accent font-bold" style={{ color: 'var(--color-accent)' }}>{skill.level || 'Expert'}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </SectionWrapper>
  );
}
