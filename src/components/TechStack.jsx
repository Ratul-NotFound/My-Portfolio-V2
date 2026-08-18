'use client';

import { useState, useRef, forwardRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Layers, Code2, Server, Brain, Terminal, Cpu, Search, Orbit, LayoutGrid, TerminalSquare } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import { GetTechLogo } from './TechLogos';

const categoryIconMap = {
  all: Layers,
  frontend: Code2,
  backend: Server,
  ai: Brain,
  devops: Terminal
};

// Silky-Smooth Card Component (Supports Dark & Light Themes)
const EyePleasingCard = forwardRef(function EyePleasingCard({ skill, index, onSelect }, ref) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 450, damping: 28 });
  const mouseY = useSpring(y, { stiffness: 450, damping: 28 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

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
      onClick={() => onSelect(skill)}
      initial={{ opacity: 0, y: 24, scale: 0.92, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '30px' }}
      exit={{ opacity: 0, scale: 0.88, y: -15, filter: 'blur(4px)', transition: { duration: 0.2 } }}
      transition={{ duration: 0.45, delay: (index % 10) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX, rotateY,
        transformStyle: 'preserve-3d', perspective: 1000,
        borderRadius: '1rem',
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0.875rem', position: 'relative', cursor: 'pointer',
        overflow: 'hidden', userSelect: 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={e => { e.target.style && (e.target.style.borderColor = 'var(--color-border-accent)'); }}
      onHoverEnd={e => { e.target.style && (e.target.style.borderColor = 'var(--color-border)'); }}
    >
      {/* Tech Icon */}
      <motion.div
        whileHover={{ rotateZ: 360, scale: 1.15 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
        style={{
          padding: '0.5rem', borderRadius: '0.75rem', flexShrink: 0,
          border: '1px solid var(--color-border)', background: 'var(--color-surface-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 36, height: 36,
        }}
      >
        <GetTechLogo name={skill.name} className="w-5 h-5 object-contain" />
      </motion.div>

      {/* Info */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <h3 style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700,
          color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          letterSpacing: '0.05em', marginBottom: 2 }}>
          {skill.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-accent)', flexShrink: 0 }} />
          <span style={{ fontSize: '0.6rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--color-text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            {skill.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
});

export default function TechStack({ categories = [], skills = [] }) {
  const defaultCategories = [
    { id: 'All', label: 'All Technologies' },
    { id: 'Frontend', label: 'Frontend' },
    { id: 'Backend', label: 'Backend' },
    { id: 'AI & ML', label: 'AI & ML' },
    { id: 'DevOps & Cloud', label: 'DevOps & Cloud' }
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
  const [selectedSkill, setSelectedSkill] = useState(null);

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
    <SectionWrapper id="tech-stack" variant="deck-rise" className="">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 lg:space-y-7">
        
        {/* Section Header */}
        <SectionHeader
          number="03"
          category="Technical Skills"
          title="Core Tech &"
          highlight="Stack"
        />

        {/* CONTROLS HEADER BAR */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-1.5 p-1 rounded-xl" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              {[[ 'grid', LayoutGrid, 'Glass Deck' ], [ 'terminal', TerminalSquare, 'CLI Terminal' ]].map(([mode, IconComp, label]) => (
                <button key={mode} onClick={() => setActiveViewMode(mode)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  style={{
                    background:  activeViewMode === mode ? 'var(--color-accent)' : 'transparent',
                    color:       activeViewMode === mode ? '#000'                 : 'var(--color-text-muted)',
                    fontWeight:  activeViewMode === mode ? 700                   : 500,
                  }}
                >
                  <IconComp className="w-3.5 h-3.5" /><span>{label}</span>
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-accent)' }} />
              <input type="text" placeholder="Search technologies..." value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                  borderRadius: '0.75rem', padding: '0.375rem 0.75rem 0.375rem 2.25rem',
                  fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace',
                  color: 'var(--color-text)', outline: 'none',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
              />
            </div>
          </div>

          {/* Category Tabs */}
          <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="w-full p-1.5 sm:p-2 rounded-2xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 sm:gap-2 relative z-20"
            style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
          >
            {normalizedCategories.map((cat) => {
              const catId = cat.id;
              const catLabel = cat.label || cat.id || 'Category';
              const displayLabel = catLabel.split(' (')[0];
              const isActive = activeTab.toLowerCase() === catId.toLowerCase();
              const iconKey = catId.toLowerCase().includes('front') ? 'frontend'
                : catId.toLowerCase().includes('back') ? 'backend'
                : catId.toLowerCase().includes('ai') ? 'ai'
                : catId.toLowerCase().includes('devops') ? 'devops' : 'all';
              const IconComp = categoryIconMap[iconKey] || Cpu;
              const skillCount = (catId.toLowerCase() === 'all')
                ? skills.length
                : skills.filter(s => s.category.toLowerCase() === catId.toLowerCase()).length;
              return (
                <button key={catId} onClick={() => setActiveTab(catId)}
                  className="relative px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer select-none w-full"
                  style={{ color: isActive ? '#000' : 'var(--color-text-muted)' }}
                >
                  {isActive && (
                    <motion.div layoutId="activeTechTab"
                      className="absolute inset-0 rounded-xl shadow-md"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <IconComp className="w-3.5 h-3.5 relative z-10 flex-shrink-0" style={{ color: isActive ? '#000' : 'var(--color-accent)' }} />
                  <span className="relative z-10 truncate">{displayLabel}</span>
                  <span className="relative z-10 text-[10px] px-1.5 rounded-md font-mono flex-shrink-0"
                    style={{ background: isActive ? 'rgba(0,0,0,0.2)' : 'var(--color-surface)', color: isActive ? '#000' : 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                    {skillCount}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* SKILLS CONTAINER */}
        {activeViewMode === 'grid' ? (
          <div className="flex flex-wrap sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 min-h-[300px] items-start">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <EyePleasingCard
                  key={skill.name}
                  skill={skill}
                  index={index}
                  onSelect={setSelectedSkill}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* CLI TERMINAL VIEW */
          <div className="rounded-2xl p-4 font-mono text-xs space-y-2 overflow-x-auto"
            style={{ background: '#0d0d12', border: '1px solid var(--color-border)', color: 'var(--color-accent)' }}>
            <div className="flex items-center gap-2 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-[10px] ml-2" style={{ color: '#a39e93' }}>ratul@arch-linux: ~/tech-stack --list</span>
            </div>
            {filteredSkills.map((skill, idx) => (
              <div key={skill.name} className="flex items-center justify-between p-1 rounded"
                style={{ ':hover': { background: 'rgba(255,255,255,0.05)' } }}>
                <span style={{ color: '#e2e8f0', fontWeight: 700 }}>[{idx + 1}] {skill.name}</span>
                <span style={{ color: '#a39e93' }}>{skill.category}</span>
                <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>Proficiency: {skill.level || '90%'}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </SectionWrapper>
  );
}
