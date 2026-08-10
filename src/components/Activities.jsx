'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Globe, Building, Flag, Sparkles, X, ArrowRight, Radio } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import DepthCarousel from './DepthCarousel';

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

// Activity Depth Card Inner Content
function ActivityDepthCard({ act, index, total, onInspect }) {
  const catName = act.category || "University Events";
  const CatIcon = categoryIcons[catName] || Sparkles;

  return (
    <div 
      className="w-full h-full p-5 sm:p-6 flex flex-col justify-between select-none relative z-10 rounded-[24px] group shadow-card"
      style={{
        border: '1px solid var(--color-border)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      {/* Top Laser Shimmer Beam */}
      <div className="absolute inset-x-0 top-0 h-[2.5px] z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} />

      {/* Top Image Banner */}
      <div className="relative w-full h-44 overflow-hidden rounded-2xl flex-shrink-0" style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-border)' }}>
        <img
          src={act.img || '/tech2.JPG'}
          alt={act.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,20,25,0.7)] via-transparent to-transparent pointer-events-none" />

        {/* Category Badge Pill */}
        <span 
          className="absolute top-2.5 left-2.5 text-[11px] font-mono font-bold px-3 py-0.5 rounded-full border backdrop-blur-md flex items-center gap-1.5 shadow-md"
          style={{
            background: 'var(--color-surface-2)',
            borderColor: 'var(--color-border-accent)',
            color: 'var(--color-accent)',
          }}
        >
          <CatIcon className="w-3.5 h-3.5" />
          <span>{catName}</span>
        </span>

        {/* Year Badge */}
        <span 
          className="absolute bottom-2.5 right-2.5 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md backdrop-blur-md shadow-md"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
          }}
        >
          {act.year || '2023'}
        </span>
      </div>

      {/* Card Content Body */}
      <div className="space-y-2.5 flex-1 flex flex-col justify-between my-2">
        <div className="space-y-1">
          <h3 className="text-base font-bold group-hover:text-accent transition-colors leading-snug tracking-tight" style={{ color: 'var(--color-text)' }}>
            {act.title}
          </h3>
          <p className="text-xs font-mono font-semibold flex items-center gap-1.5" style={{ color: 'var(--color-accent)' }}>
            <Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
            <span className="truncate">{act.role}</span>
          </p>
        </div>

        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
          {act.desc}
        </p>

        {/* Action Footer */}
        <div className="pt-2 flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
          <span className="text-[10px] font-mono font-bold" style={{ color: 'var(--color-accent)' }}>
            {act.impact ? act.impact.split(' • ')[0] : 'Verified Event Node'}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInspect(act);
            }}
            className="px-3 py-1 rounded-xl text-xs font-mono font-bold hover:opacity-90 transition-all flex items-center gap-1 shadow-md cursor-pointer"
            style={{
              background: 'var(--color-accent)',
              color: '#000',
            }}
          >
            <span>Inspect</span>
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

  const filteredActivities = activeCategory === "All"
    ? safeActivities
    : safeActivities.filter(act => (act.category || "University Events") === activeCategory);

  return (
    <SectionWrapper id="activities" variant="elastic-pop" className="">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5 lg:space-y-6 perspective-1400">
        
        {/* Section Header */}
        <SectionHeader
          number="07"
          category="Activities & Honors"
          title="Campus &"
          highlight="Leadership"
        />

        {/* SUBSECTION TAB FILTER BAR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
          
          {/* Subsections Filter Bar */}
          <div 
            className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl border"
            style={{
              background: 'var(--color-surface-2)',
              borderColor: 'var(--color-border)',
            }}
          >
            {categories.map((cat) => {
              const count = cat === "All"
                ? safeActivities.length
                : safeActivities.filter(a => (a.category || "University Events") === cat).length;

              const Icon = categoryIcons[cat] || Sparkles;
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
                    className="text-[10px] px-1.5 py-0.2 rounded-full font-bold"
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
            <span>3D DEPTH RAIL ({filteredActivities.length} EVENTS)</span>
          </div>
        </div>

        {/* DepthCarousel */}
        <div className="w-full h-[440px] relative">
          <DepthCarousel
            items={filteredActivities}
            cardWidth={440}
            cardHeight={370}
            radius={24}
            depth={200}
            spread={100}
            tilt={20}
            tiltDirection="right"
            perspective={1400}
            visibleCards={4}
            falloff={0.18}
            autoplay={false}
            loop={true}
            showControls={true}
            showIndicators={true}
            renderCard={(act, idx, isActive) => (
              <ActivityDepthCard
                act={act}
                index={idx}
                total={filteredActivities.length}
                onInspect={setInspectedAct}
              />
            )}
          />
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
