'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Globe, Building, Flag, Sparkles, X, ArrowRight, Radio } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const fallbackActivities = [
  {
    id: "act-1",
    title: "DIU Blood Donors Club (DIU BDC)",
    category: "University Events",
    role: "Executive Member & Lead Organizer",
    year: "2022 - Present",
    desc: "Organized emergency blood donation drives and digital donor management systems across DIU campus.",
    img: "/cpc1.jpg",
    impact: "500+ Donors Registered • 12 On-Campus Drives"
  },
  {
    id: "act-2",
    title: "DIU CPC Take-Off Programming Contest",
    category: "University Events",
    role: "Judge & Problem Setter",
    year: "2023 - 2024",
    desc: "Authored algorithm challenges and managed real-time Vjudge scoring systems for 500+ freshmen programmers.",
    img: "/cpc2.jpg",
    impact: "500+ Freshmen Competitors • 8 Algorithm Problems"
  },
  {
    id: "act-3",
    title: "Bangladesh Olympiad in Informatics (BDOI)",
    category: "National Events",
    role: "Volunteer Co-Lead",
    year: "2023",
    desc: "Coordinated contest platforms and venue systems for high school competitive programmers nationwide.",
    img: "/icpc1.jpg",
    impact: "National Finals Coordinator • 300+ Students"
  },
  {
    id: "act-4",
    title: "BrandAid 2.0 National Business Contest",
    category: "National Events",
    role: "National Finalist & Presenter",
    year: "2024",
    desc: "Pitched automated software solutions for enterprise brand management at the national finals.",
    img: "/tech2.JPG",
    impact: "National Top 5 Finalist • Enterprise Brand Pitch"
  },
  {
    id: "act-5",
    title: "Hult Prize Global On-Campus Program",
    category: "International Events",
    role: "Organizer & Tech Lead",
    year: "2023",
    desc: "Managed digital evaluation platforms and pitch mentoring for 40+ social entrepreneurship teams.",
    img: "/cpc2.jpg",
    impact: "40+ Startup Teams • Global Social Entrepreneurship"
  },
  {
    id: "act-6",
    title: "ICPC Asia Dhaka Regional Contest 2024",
    category: "National Events",
    role: "Technical Operations Co-Lead",
    year: "2024",
    desc: "Managed network scoring infrastructure and contest arena setup for 300+ university teams across Bangladesh.",
    img: "/icpc1.jpg",
    impact: "300+ University Teams • Regional Arena Infrastructure"
  },
  {
    id: "act-7",
    title: "DIU Intra-University Tech Fest",
    category: "University Events",
    role: "Head of Technical Operations",
    year: "2023",
    desc: "Managed venue scheduling, tech infrastructure, and online registration for 1,200+ event participants.",
    img: "/tech2.JPG",
    impact: "1,200+ Event Attendees"
  },
  {
    id: "act-8",
    title: "National Smart Bangladesh Hackathon",
    category: "National Events",
    role: "Team Lead & Innovator",
    year: "2023",
    desc: "Built an AI-driven IoT agricultural monitoring prototype, securing top 10 national ranking.",
    img: "/cpc2.jpg",
    impact: "Top 10 National Rank"
  },
  {
    id: "act-9",
    title: "IEEE International Edge AI Student Summit",
    category: "International Events",
    role: "Delegate & Paper Presenter",
    year: "2024",
    desc: "Presented research findings on low-power TinyML acoustic classification algorithms to global delegates.",
    img: "/tech2.JPG",
    impact: "Global Delegate & Speaker"
  },
  {
    id: "act-10",
    title: "NASA Space Apps Challenge Bangladesh",
    category: "International Events",
    role: "Global Finalist Team Member",
    year: "2023",
    desc: "Built interactive 3D satellite visualization tools for Earth observation datasets.",
    img: "/cpc1.jpg",
    impact: "NASA Global Finalist"
  }
];

const categories = ["All", "University Events", "National Events", "International Events"];

const categoryIcons = {
  "University Events": Building,
  "National Events": Flag,
  "International Events": Globe
};

// Distinct Widescreen Event Pass Card Component
function StackableActivityCard({ act, index, total, onInspect }) {
  const catName = act.category || "University Events";
  const CatIcon = categoryIcons[catName] || Sparkles;

  return (
    <div className="w-full relative z-10 select-none group font-mono mt-2">
      {/* Main Widescreen Event Container (No Top Folder Tab - Unique Event Pass Identity) */}
      <div 
        className="w-full rounded-2xl sm:rounded-3xl transition-all duration-300 relative z-10 p-3.5 sm:p-5 shadow-xl hover:shadow-2xl overflow-hidden space-y-3"
        style={{
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
      >
        {/* Top Laser Accent Line on Hover */}
        <div className="absolute inset-x-0 top-0 h-[2px] z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} />

        {/* Top Full-Width Hero Event Image Banner */}
        <div className="relative w-full h-24 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden group/banner shadow-inner" style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-border)' }}>
          <img
            src={act.img || '/tech2.JPG'}
            alt={act.title}
            className="w-full h-full object-cover group-hover/banner:scale-108 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,17,23,0.9)] via-[rgba(15,17,23,0.3)] to-transparent pointer-events-none" />

          {/* Floating Category Pill */}
          <span 
            className="absolute top-2 left-2 text-[9px] sm:text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md flex items-center gap-1 shadow-md"
            style={{
              background: 'var(--color-surface-2)',
              borderColor: 'var(--color-border-accent)',
              color: 'var(--color-accent)',
            }}
          >
            <CatIcon className="w-3 h-3" />
            <span>{catName}</span>
          </span>

          {/* Floating Year Pill & Event Index */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-bold text-white z-10">
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10">
              {act.year || '2023'}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-accent">
              EVENT 0{index + 1} / 0{total}
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="space-y-1.5 sm:space-y-2">
          <h3 className="text-xs sm:text-base font-bold group-hover:text-accent transition-colors leading-snug tracking-tight font-sans line-clamp-2" style={{ color: 'var(--color-text)' }}>
            {act.title}
          </h3>

          <p className="text-[10px] sm:text-xs font-mono font-semibold flex items-center gap-1.5" style={{ color: 'var(--color-accent)' }}>
            <Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
            <span className="truncate">{act.role}</span>
          </p>

          <p className="text-[10px] sm:text-xs leading-snug sm:leading-relaxed line-clamp-2 font-sans" style={{ color: 'var(--color-text-muted)' }}>
            {act.desc}
          </p>
        </div>

        {/* Footer Action Bar */}
        <div className="pt-2 flex items-center justify-between gap-2 flex-shrink-0 z-20" style={{ borderTop: '1px solid var(--color-border)' }}>
          <span className="text-[9px] sm:text-[10px] font-mono font-bold truncate" style={{ color: 'var(--color-accent)' }}>
            {act.impact ? act.impact.split(' • ')[0] : 'Verified Event Node'}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInspect(act);
            }}
            className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-bold hover:opacity-90 transition-all flex items-center gap-1 shadow-md cursor-pointer flex-shrink-0"
            style={{
              background: 'var(--color-accent)',
              color: '#000',
            }}
          >
            <span>Inspect Spec</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Activities({ activities }) {
  const safeActivities = (Array.isArray(activities) && activities.length > 0)
    ? activities
    : fallbackActivities;

  const [activeCategory, setActiveCategory] = useState("All");
  const [inspectedAct, setInspectedAct] = useState(null);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;

  const filteredActivities = activeCategory === "All"
    ? safeActivities
    : safeActivities.filter(a => {
        const c = a.category || "";
        return c.includes(activeCategory);
      });

  return (
    <SectionWrapper id="activities" variant="fade" className="">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 lg:space-y-6">
        
        {/* Section Header */}
        <SectionHeader
          number="07"
          category="Leadership & Events"
          title="Extracurricular &"
          highlight="Leadership"
        />

        {/* SUBSECTION TAB FILTER BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 w-full" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div 
            className="flex items-center gap-1.5 p-1 rounded-2xl w-full sm:w-auto overflow-x-auto no-scrollbar max-w-full"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
            }}
          >
            {categories.map((cat) => {
              const count = cat === "All"
                ? safeActivities.length
                : safeActivities.filter(a => {
                    const c = a.category || "";
                    return c.includes(cat);
                  }).length;

              const Icon = categoryIcons[cat] || Sparkles;
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
                    className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full font-bold"
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

          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono font-bold animate-pulse" style={{ color: 'var(--color-accent)' }}>
            <Radio className="w-3.5 h-3.5" />
            <span>SCROLL DECK ({filteredActivities.length} EVENTS)</span>
          </div>
        </div>

        {/* SCROLLSTACK CONTAINER */}
        <div className="w-full h-[400px] sm:h-[500px] relative pt-6 sm:pt-4">
          <ScrollStack
            itemDistance={isMobile ? 24 : 32}
            itemScale={0.02}
            itemStackDistance={isMobile ? 14 : 24}
            stackPosition="3%"
            scaleEndPosition="2%"
            baseScale={0.95}
            blurAmount={0}
            useWindowScroll={false}
            duration={0.4}
            wheelMultiplier={2.8}
            touchMultiplier={4.5}
            className="w-full h-full pr-2 custom-scrollbar"
          >
            {filteredActivities.map((act, index) => (
              <ScrollStackItem key={act.id || index}>
                <StackableActivityCard
                  act={act}
                  index={index}
                  total={filteredActivities.length}
                  onInspect={setInspectedAct}
                />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
        
        {/* Event Inspection Modal Drawer */}
        <AnimatePresence>
          {inspectedAct && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl" 
              style={{ background: 'rgba(0,0,0,0.6)' }}
              onClick={() => setInspectedAct(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl rounded-3xl p-6 space-y-4 shadow-[0_0_60px_rgba(56,189,248,0.25)] relative overflow-hidden font-mono"
                style={{
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                }}
              >
                <button
                  onClick={() => setInspectedAct(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:opacity-85 transition-opacity cursor-pointer"
                  style={{
                    background: 'var(--color-surface-2)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="relative w-full h-56 rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
                  <img src={inspectedAct.img || '/tech2.JPG'} alt={inspectedAct.title} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-xs px-3 py-1 rounded-full font-bold"
                      style={{
                        background: 'var(--color-surface-2)',
                        color: 'var(--color-accent)',
                        border: '1px solid var(--color-border-accent)',
                      }}
                    >
                      {inspectedAct.category} ({inspectedAct.year})
                    </span>
                  </div>

                  <h2 className="text-xl font-bold leading-snug" style={{ color: 'var(--color-text)' }}>{inspectedAct.title}</h2>
                  <p className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--color-accent)' }}>
                    <Award className="w-4 h-4" />
                    <span>Role: {inspectedAct.role}</span>
                  </p>
                  
                  <p className="text-xs leading-relaxed font-sans" style={{ color: 'var(--color-text-muted)' }}>{inspectedAct.desc}</p>

                  {inspectedAct.impact && (
                    <div className="p-3 rounded-xl text-xs flex items-center gap-2" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border-accent)', color: 'var(--color-accent)' }}>
                      <Sparkles className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                      <span className="font-bold">Key Impact: {inspectedAct.impact}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 flex justify-end" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <button
                    onClick={() => setInspectedAct(null)}
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
