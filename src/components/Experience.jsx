'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  CheckCircle2, 
  Award, 
  HeartHandshake, 
  Briefcase, 
  Zap,
  TrendingUp,
  ShieldCheck,
  Cpu,
  MousePointerClick
} from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';

const categories = ["All", "Internship", "Volunteering"];

const categoryIcons = {
  "All": Briefcase,
  "Internship": Award,
  "Volunteering": HeartHandshake
};

// Skill tags for each milestone
const experienceSkills = {
  "exp-1": ["Next.js", "Node.js", "PostgreSQL", "Cloud Architecture", "Lighthouse 95+"],
  "exp-2": ["C++", "ESP32-S3", "TinyML", "Signal Processing", "Model Quantization"],
  "exp-3": ["Algorithms", "Leadership", "500+ Mentored", "Event Ops", "DIU CPC"],
  "exp-4": ["ICPC Asia", "BDOI", "Arena Infrastructure", "Team Leadership"]
};

// Impact Highlights
const experienceMetrics = {
  "exp-1": "15+ Production Apps Delivered",
  "exp-2": "32KB RAM Neural Quantization",
  "exp-3": "500+ Student Developers Mentored",
  "exp-4": "300+ University Teams Coordinated"
};

export default function Experience({ experiences = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeExpId, setActiveExpId] = useState(experiences[0]?.id || 'exp-1');

  const filteredExperiences = activeCategory === "All"
    ? experiences
    : experiences.filter(exp => {
        const cat = exp.category || exp.type || "";
        return cat.toLowerCase().includes(activeCategory.toLowerCase());
      });

  // Ensure active node exists in filtered list
  useEffect(() => {
    if (filteredExperiences.length > 0) {
      const exists = filteredExperiences.some(e => e.id === activeExpId);
      if (!exists) {
        setActiveExpId(filteredExperiences[0].id);
      }
    }
  }, [filteredExperiences, activeExpId]);

  const activeIndex = filteredExperiences.findIndex(e => e.id === activeExpId);
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;
  const activeExp = filteredExperiences[safeActiveIndex] || experiences[0];
  const activeSkills = experienceSkills[activeExp?.id] || ["Full-Stack", "Leadership", "Engineering"];
  const activeMetric = experienceMetrics[activeExp?.id];

  // Calculate pointer arrow alignment based on 4-column layout
  const totalItems = filteredExperiences.length || 1;
  const arrowPositionPercent = ((safeActiveIndex + 0.5) / totalItems) * 100;

  return (
    <SectionWrapper id="experience" variant="slide-left">
      <div className="w-full relative z-10" style={{ maxWidth: 'var(--container-inner)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
        
        {/* Section Header */}
        <SectionHeader
          number="06"
          category="Career & Leadership"
          title="Experience &"
          highlight="Timeline"
        />

        {/* 🎛️ CATEGORY TRACK FILTER PILLS */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 w-full" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const count = cat === "All"
                ? experiences.length
                : experiences.filter(e => (e.category || e.type || "").toLowerCase().includes(cat.toLowerCase())).length;

              const Icon = categoryIcons[cat] || Briefcase;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs md:text-sm font-mono font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none shadow-sm hover:scale-105 active:scale-95"
                  style={{
                    background: isActive ? 'var(--color-accent)' : 'var(--color-surface-2)',
                    color: isActive ? '#000' : 'var(--color-text-muted)',
                    border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    boxShadow: isActive ? '0 0 15px rgba(56, 189, 248, 0.35)' : 'none',
                  }}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{cat === "All" ? "All Roles" : cat}</span>
                  <span 
                    className="text-[10px] sm:text-xs px-1.5 py-0.2 rounded-full font-bold"
                    style={{
                      background: isActive ? 'rgba(0,0,0,0.2)' : 'var(--color-surface)',
                      color: isActive ? '#000' : 'var(--color-accent)',
                      border: isActive ? 'none' : '1px solid var(--color-border)',
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-xs md:text-sm font-mono opacity-75" style={{ color: 'var(--color-text-muted)' }}>
            <MousePointerClick className="w-3.5 h-3.5 text-accent animate-bounce" />
            <span>Click nodes to inspect</span>
          </div>
        </div>

        {/* ⭕ HIGHLY POPPED CIRCULAR TIMELINE RAIL */}
        <div className="relative py-1 sm:py-3 px-2 select-none font-mono">
          
          {/* Subtle Connecting Background Line */}
          <div 
            className="absolute top-1/2 left-4 right-4 h-[2px] -translate-y-1/2 z-0 hidden sm:block opacity-40"
            style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), var(--color-accent), transparent)' }}
          />

          {/* 4 POINTER NODES IN A CLEAN RESPONSIVE ROW */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 relative z-10">
            {filteredExperiences.map((exp, idx) => {
              const isSelected = idx === safeActiveIndex;

              return (
                <div 
                  key={exp.id || idx}
                  onClick={() => setActiveExpId(exp.id)}
                  className="flex flex-col items-center cursor-pointer group select-none text-center"
                >
                  {/* Popping Circular Node Icon */}
                  <motion.div
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: isSelected ? 1.15 : 1,
                      y: isSelected ? -4 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 20 }}
                    className="w-12 h-12 sm:w-15 sm:h-15 md:w-16 md:h-16 rounded-full flex items-center justify-center relative shadow-lg transition-all duration-300"
                    style={{
                      background: isSelected ? 'var(--color-accent)' : 'var(--color-surface-2)',
                      border: isSelected ? '2px solid #fff' : '2px solid var(--color-border)',
                      boxShadow: isSelected ? '0 0 25px rgba(56, 189, 248, 0.65)' : 'none',
                    }}
                  >
                    <Briefcase 
                      className="w-5 h-5 sm:w-6 sm:h-6 transition-colors" 
                      style={{ color: isSelected ? '#000' : 'var(--color-text-muted)' }} 
                    />

                    {/* Step Number Badge */}
                    <div 
                      className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[9px] sm:text-[10px] font-bold flex items-center justify-center shadow-md font-mono"
                      style={{
                        background: isSelected ? '#000' : 'var(--color-surface-3)',
                        color: isSelected ? 'var(--color-accent)' : 'var(--color-text)',
                        border: '1px solid var(--color-border)'
                      }}
                    >
                      {idx + 1}
                    </div>
                  </motion.div>

                  {/* Compact Milestone Titles Below Circle */}
                  <div className="mt-1.5 sm:mt-2 space-y-0.5 max-w-[120px] sm:max-w-none">
                    <p 
                      className="text-[11px] sm:text-xs font-bold leading-tight line-clamp-1 transition-colors"
                      style={{ color: isSelected ? 'var(--color-accent)' : 'var(--color-text)' }}
                    >
                      {exp.role.split('/')[0].trim()}
                    </p>
                    <span 
                      className="text-[9px] sm:text-[10px] font-semibold block uppercase tracking-wider opacity-75 truncate"
                      style={{ color: isSelected ? 'var(--color-text)' : 'var(--color-text-muted)' }}
                    >
                      {exp.period || '2024'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🌟 SPACE-OPTIMIZED & ATTRACTIVE POPPED-OUT DETAIL CARD */}
        <div className="w-full font-mono relative">
          
          {/* Animated Connecting Pointer Beak */}
          <motion.div 
            className="hidden sm:block absolute -top-2.5 w-5 h-2.5 pointer-events-none z-30"
            animate={{ left: `calc(${arrowPositionPercent}% - 10px)` }}
            transition={{ type: "spring", stiffness: 420, damping: 25 }}
          >
            <div 
              className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px]"
              style={{ borderBottomColor: 'var(--color-accent)' }}
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {activeExp && (
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, scale: 0.35, y: -20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.35, y: -20, filter: 'blur(8px)' }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 22,
                  mass: 0.75
                }}
                className="w-full p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden shadow-xl space-y-3 sm:space-y-4 select-none"
                style={{
                  background: 'var(--color-surface)',
                  border: '1.5px solid var(--color-border)',
                  boxShadow: '0 15px 40px -10px rgba(0,0,0,0.5)',
                  transformOrigin: `${arrowPositionPercent}% top`
                }}
              >
                {/* Top Subtle Accent Line on Hover */}
                <div 
                  className="absolute inset-x-0 top-0 h-[2px]" 
                  style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} 
                />

                {/* 1. Header Row: Logo, Role, Badges & Period */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden shadow-md p-0.5 sm:p-1 flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'var(--color-surface-2)',
                        border: '1.5px solid var(--color-accent)',
                      }}
                    >
                      <img
                        src={activeExp.logo || '/cpc1.jpg'}
                        alt={activeExp.organization}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span 
                          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm"
                          style={{
                            background: 'var(--color-surface-2)',
                            color: 'var(--color-accent)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          {activeExp.category || "Role"}
                        </span>

                        <span 
                          className="text-[10px] px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1"
                          style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.25)' }}
                        >
                          <ShieldCheck className="w-3 h-3 text-green-400" />
                          <span>Verified Milestone</span>
                        </span>
                      </div>

                      <h3 className="text-base sm:text-xl font-bold font-sans leading-snug tracking-tight pt-0.5" style={{ color: 'var(--color-text)' }}>
                        {activeExp.role}
                      </h3>
                      <p className="text-xs font-semibold font-sans" style={{ color: 'var(--color-accent)' }}>
                        {activeExp.organization}
                      </p>
                    </div>
                  </div>

                  {/* Period Badge & Metric Pill */}
                  <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
                    <span 
                      className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold shadow-sm"
                      style={{
                        background: 'var(--color-surface-2)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{activeExp.period}</span>
                    </span>
                  </div>
                </div>

                {/* 2. Structured 2-Column Grid (Left: Overview + Metric | Right: Deliverables) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start">
                  
                  {/* Left Col (5 Cols): Role Overview Quote + Metric */}
                  <div className="md:col-span-5 space-y-2.5">
                    {activeExp.description && (
                      <div 
                        className="p-3 rounded-xl space-y-1"
                        style={{
                          background: 'var(--color-surface-2)',
                          borderLeft: '3px solid var(--color-accent)',
                          border: '1px solid var(--color-border)'
                        }}
                      >
                        <span className="text-[9px] font-bold uppercase tracking-widest block" style={{ color: 'var(--color-accent)' }}>
                          [ROLE OVERVIEW]
                        </span>
                        <p className="text-xs leading-relaxed font-sans" style={{ color: 'var(--color-text-muted)' }}>
                          {activeExp.description}
                        </p>
                      </div>
                    )}

                    {/* Verified Result Metric Callout */}
                    {activeMetric && (
                      <div 
                        className="p-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 shadow-inner"
                        style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--color-accent)', border: '1px solid rgba(56, 189, 248, 0.25)' }}
                      >
                        <TrendingUp className="w-4 h-4 flex-shrink-0 text-accent" />
                        <span className="truncate">{activeMetric}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Col (7 Cols): Deliverables Checklist */}
                  <div className="md:col-span-7 space-y-1.5">
                    <span className="text-[9px] font-bold uppercase tracking-widest block" style={{ color: 'var(--color-accent)' }}>
                      [KEY ACCOMPLISHMENTS & DELIVERABLES]
                    </span>

                    <div className="space-y-1.5">
                      {(Array.isArray(activeExp?.bullets) 
                        ? activeExp.bullets 
                        : typeof activeExp?.bullets === 'string' 
                        ? activeExp.bullets.split('\n').filter(Boolean) 
                        : []
                      ).map((bullet, i) => (
                        <div 
                          key={i} 
                          className="flex items-start gap-2 p-2.5 rounded-xl transition-colors"
                          style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs font-sans leading-relaxed" style={{ color: 'var(--color-text)' }}>
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* 3. Footer Bar: Tech Competency Pills */}
                <div className="pt-2.5 flex flex-wrap items-center justify-between gap-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <div className="flex items-center gap-1.5 text-xs text-text-muted">
                    <Zap className="w-3.5 h-3.5 text-accent" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Tech Stack:</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {activeSkills.map((skill, i) => (
                      <span 
                        key={i}
                        className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold font-mono shadow-sm"
                        style={{
                          background: 'var(--color-surface-2)',
                          color: 'var(--color-accent)',
                          border: '1px solid var(--color-border)'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </SectionWrapper>
  );
}
