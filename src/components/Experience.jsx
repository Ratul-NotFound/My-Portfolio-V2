'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Award, HeartHandshake, Layers } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const categories = ["All", "Internship", "Volunteering"];

const categoryIcons = {
  "Internship": Award,
  "Volunteering": HeartHandshake
};

// Distinct Executive Career Timeline Card Component
function StackableExperienceCard({ exp, index, total }) {
  const logoPath = exp.logo || '/cpc1.jpg';

  return (
    <div className="w-full relative z-10 select-none group font-mono mt-2">
      {/* Main Career Badge Container (No Top Folder Tab - Unique Career Timeline Design) */}
      <div 
        className="w-full rounded-2xl sm:rounded-3xl transition-all duration-300 relative z-10 p-4 sm:p-6 shadow-xl hover:shadow-2xl overflow-hidden flex flex-col sm:flex-row gap-4 items-start sm:items-center"
        style={{
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
      >
        {/* Top Laser Accent Line on Hover */}
        <div 
          className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" 
          style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }}
        />

        {/* LEFT COLUMN: Executive Company Avatar & Role Counter */}
        <div className="flex items-center sm:flex-col justify-between sm:justify-center gap-3 w-full sm:w-auto flex-shrink-0">
          <div 
            className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center p-2 relative group-hover:scale-105 transition-transform duration-300"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
            }}
          >
            <img
              src={logoPath}
              alt={exp.organization}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 rounded-2xl border border-accent/20 pointer-events-none" />
          </div>

          <span 
            className="text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider"
            style={{
              background: 'var(--color-surface-2)',
              color: 'var(--color-accent)',
              border: '1px solid var(--color-border)',
            }}
          >
            ROLE 0{index + 1} / 0{total}
          </span>
        </div>

        {/* RIGHT COLUMN: Role Details & Achievements */}
        <div className="space-y-2.5 flex-1 w-full">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <div>
              <h3 className="text-sm sm:text-lg font-bold transition-colors leading-snug font-sans group-hover:text-accent" style={{ color: 'var(--color-text)' }}>
                {exp.role}
              </h3>
              <p className="text-xs sm:text-sm font-semibold font-sans pt-0.5" style={{ color: 'var(--color-text-muted)' }}>{exp.organization}</p>
            </div>

            <span 
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold shadow-sm"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-accent)',
              }}
            >
              <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
              <span>{exp.period}</span>
            </span>
          </div>

          {/* Achievements Bullet List */}
          <div className="space-y-1.5 pt-1">
            {exp.bullets.map((bullet, i) => (
              <div 
                key={i} 
                className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed font-sans"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }} />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience({ experiences = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredExperiences = activeCategory === "All"
    ? experiences
    : experiences.filter(exp => {
        const cat = exp.category || exp.type || "";
        return cat.includes(activeCategory);
      });

  return (
    <SectionWrapper id="experience" variant="spiral-drop" className="">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3 lg:space-y-4 perspective-1000">
        
        {/* Section Header */}
        <SectionHeader
          number="06"
          category="Career & Leadership"
          title="Experience &"
          highlight="Impact"
        />

        {/* 2 SUBSECTION TABS FILTER BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pb-1.5 w-full" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div 
            className="flex items-center gap-1.5 p-1 rounded-2xl w-full sm:w-auto overflow-x-auto no-scrollbar max-w-full"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
            }}
          >
            {categories.map((cat) => {
              const count = cat === "All"
                ? experiences.length
                : experiences.filter(e => {
                    const c = e.category || e.type || "";
                    return c.includes(cat);
                  }).length;

              const Icon = categoryIcons[cat] || Layers;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none flex-shrink-0"
                  style={{
                    background: isActive ? 'var(--color-accent)' : 'transparent',
                    color: isActive ? '#000' : 'var(--color-text-muted)',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat}</span>
                  <span 
                    className="text-[9px] sm:text-[10px] px-1.5 rounded-full font-bold"
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

          <div className="text-xs font-mono flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
            <span>Scroll Deck:</span>
            <strong style={{ color: 'var(--color-accent)' }}>{activeCategory} ({filteredExperiences.length} Roles)</strong>
          </div>
        </div>

        {/* ELEGANT 1.5 CARDS VISIBLE SCROLLSTACK CONTAINER */}
        <div className="w-full h-[460px] sm:h-[400px] relative">
          <ScrollStack
            itemDistance={isMobile ? 18 : 24}
            itemScale={0.02}
            itemStackDistance={isMobile ? 12 : 22}
            stackPosition="3%"
            scaleEndPosition="2%"
            baseScale={0.95}
            blurAmount={0}
            useWindowScroll={false}
            className="w-full h-full pr-2 custom-scrollbar"
          >
            {filteredExperiences.map((exp, index) => (
              <ScrollStackItem key={exp.id}>
                <StackableExperienceCard
                  exp={exp}
                  index={index}
                  total={filteredExperiences.length}
                />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

      </div>
    </SectionWrapper>
  );
}
