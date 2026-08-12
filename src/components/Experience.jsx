'use client';

import { useState } from 'react';
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

// 100% Solid Opaque Compact Stackable Experience Card Component
function StackableExperienceCard({ exp, index, total }) {
  const logoPath = exp.logo || '/cpc1.jpg';

  return (
    <div 
      className="w-full rounded-2xl overflow-hidden transition-all relative z-10 select-none p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center group shadow-card"
      style={{
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-accent)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
    >
      {/* Top Laser Sweep Highlight */}
      <div 
        className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" 
        style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }}
      />

      {/* LEFT SIDE: Brand Logo / Company Avatar Box */}
      <div 
        className="relative w-16 h-16 sm:w-22 sm:h-22 rounded-xl overflow-hidden flex-shrink-0 shadow-md flex items-center justify-center p-2"
        style={{
          background: 'var(--color-surface-3)',
          border: '1px solid var(--color-border)',
        }}
      >
        <img
          src={logoPath}
          alt={exp.organization}
          className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* RIGHT SIDE: Experience Content Spec */}
      <div className="space-y-2.5 flex-1 w-full">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>
                {exp.category || exp.type}
              </span>
              <span 
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold"
                style={{
                  background: 'var(--color-surface-2)',
                  color: 'var(--color-accent)',
                  border: '1px solid var(--color-border-accent)',
                }}
              >
                Role 0{index + 1} / 0{total}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold transition-colors leading-snug font-sans group-hover:text-accent" style={{ color: 'var(--color-text)' }}>
              {exp.role}
            </h3>
            <p className="text-xs sm:text-sm font-semibold font-sans pt-0.5" style={{ color: 'var(--color-text-muted)' }}>{exp.organization}</p>
          </div>

          <span 
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold shadow-sm"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border-accent)',
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
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }} />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience({ experiences = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");

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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pb-1.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div 
            className="flex items-center justify-center sm:justify-start gap-2 p-1 rounded-2xl"
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
                  className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none"
                  style={{
                    background: isActive ? 'var(--color-accent)' : 'transparent',
                    color: isActive ? '#000' : 'var(--color-text-muted)',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat}</span>
                  <span 
                    className="text-[10px] px-1.5 rounded-full font-bold"
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
        <div className="w-full h-[330px] sm:h-[360px] relative">
          <ScrollStack
            itemDistance={24}
            itemScale={0.02}
            itemStackDistance={22}
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
