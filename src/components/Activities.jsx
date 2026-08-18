'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Award, 
  Globe, 
  Building, 
  Flag, 
  LayoutGrid, 
  Layers,
  X, 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  ArrowUpRight,
  MousePointerClick,
  Play,
  Pause,
  Zap,
  Activity,
  Images
} from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';

const fallbackActivities = [
  {
    id: "act-1",
    title: "DIU Blood Donors Club (DIU BDC)",
    category: "University Events",
    role: "Executive Member & Lead Organizer",
    year: "2022 - Present",
    desc: "Organized emergency blood donation drives and digital donor management systems across DIU campus.",
    img: "/cpc1.jpg",
    impact: "500+ Donors Registered • 12 On-Campus Drives",
    stat: "500+ Donors",
    tag: "Campus Leadership"
  },
  {
    id: "act-2",
    title: "DIU CPC Take-Off Programming Contest",
    category: "University Events",
    role: "Judge & Problem Setter",
    year: "2023 - 2024",
    desc: "Authored algorithm challenges and managed real-time Vjudge scoring systems for 500+ freshmen programmers.",
    img: "/cpc2.jpg",
    impact: "500+ Freshmen Competitors • 8 Algorithm Problems",
    stat: "500+ Competitors",
    tag: "Competitive Programming"
  },
  {
    id: "act-3",
    title: "Bangladesh Olympiad in Informatics (BDOI)",
    category: "National Events",
    role: "Volunteer Co-Lead",
    year: "2023",
    desc: "Coordinated contest platforms and venue systems for high school competitive programmers nationwide.",
    img: "/icpc1.jpg",
    impact: "National Finals Coordinator • 300+ Students",
    stat: "300+ Students",
    tag: "National Olympiad"
  },
  {
    id: "act-4",
    title: "BrandAid 2.0 National Business Contest",
    category: "National Events",
    role: "National Finalist & Presenter",
    year: "2024",
    desc: "Pitched automated software solutions for enterprise brand management at the national finals.",
    img: "/tech2.JPG",
    impact: "National Top 5 Finalist • Enterprise Brand Pitch",
    stat: "Top 5 Finalist",
    tag: "Business & Tech"
  },
  {
    id: "act-5",
    title: "Hult Prize Global On-Campus Program",
    category: "International Events",
    role: "Organizer & Tech Lead",
    year: "2023",
    desc: "Managed digital evaluation platforms and pitch mentoring for 40+ social entrepreneurship teams.",
    img: "/cpc2.jpg",
    impact: "40+ Startup Teams • Global Social Entrepreneurship",
    stat: "40+ Teams",
    tag: "Global Social Impact"
  },
  {
    id: "act-6",
    title: "ICPC Asia Dhaka Regional Contest 2024",
    category: "National Events",
    role: "Technical Operations Co-Lead",
    year: "2024",
    desc: "Managed network scoring infrastructure and contest arena setup for 300+ university teams across Bangladesh.",
    img: "/icpc1.jpg",
    impact: "300+ University Teams • Regional Arena Infrastructure",
    stat: "300+ Teams",
    tag: "Arena Infrastructure"
  },
  {
    id: "act-7",
    title: "DIU Intra-University Tech Fest",
    category: "University Events",
    role: "Head of Technical Operations",
    year: "2023",
    desc: "Managed venue scheduling, tech infrastructure, and online registration for 1,200+ event participants.",
    img: "/tech2.JPG",
    impact: "1,200+ Event Attendees",
    stat: "1,200+ Attendees",
    tag: "Tech Operations"
  },
  {
    id: "act-8",
    title: "National Smart Bangladesh Hackathon",
    category: "National Events",
    role: "Team Lead & Innovator",
    year: "2023",
    desc: "Built an AI-driven IoT agricultural monitoring prototype, securing top 10 national ranking.",
    img: "/cpc2.jpg",
    impact: "Top 10 National Rank",
    stat: "Top 10 National",
    tag: "IoT & AI Innovation"
  },
  {
    id: "act-9",
    title: "IEEE International Edge AI Student Summit",
    category: "International Events",
    role: "Delegate & Paper Presenter",
    year: "2024",
    desc: "Presented research findings on low-power TinyML acoustic classification algorithms to global delegates.",
    img: "/tech2.JPG",
    impact: "Global Delegate & Speaker",
    stat: "Global Speaker",
    tag: "Edge AI Summit"
  },
  {
    id: "act-10",
    title: "NASA Space Apps Challenge Bangladesh",
    category: "International Events",
    role: "Global Finalist Team Member",
    year: "2023",
    desc: "Built interactive 3D satellite visualization tools for Earth observation datasets.",
    img: "/cpc1.jpg",
    impact: "NASA Global Finalist",
    stat: "Global Finalist",
    tag: "NASA Space Apps"
  }
];

const categories = [
  { id: "All", label: "All", icon: LayoutGrid },
  { id: "University Events", label: "University", icon: Building },
  { id: "National Events", label: "National", icon: Flag },
  { id: "International Events", label: "International", icon: Globe }
];

const categoryIcons = {
  "All": LayoutGrid,
  "University Events": Building,
  "National Events": Flag,
  "International Events": Globe
};

export default function Activities({ activities = fallbackActivities }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const [inspectedAct, setInspectedAct] = useState(null);
  const [modalPhotoIdx, setModalPhotoIdx] = useState(0);

  // Helper to extract all images for an activity
  const getActImages = (act) => {
    if (!act) return [];
    const list = [];
    if (act.img) list.push(act.img);
    if (act.image && !list.includes(act.image)) list.push(act.image);
    if (Array.isArray(act.gallery)) {
      act.gallery.forEach(u => { if (u && !list.includes(u)) list.push(u); });
    } else if (typeof act.gallery === 'string') {
      act.gallery.split('\n').map(s => s.trim()).forEach(u => { if (u && !list.includes(u)) list.push(u); });
    }
    if (Array.isArray(act.images)) {
      act.images.forEach(u => { if (u && !list.includes(u)) list.push(u); });
    }
    return list.length > 0 ? list : ['/cpc1.jpg'];
  };

  // 3D Parallax Tilt for Spotlight Card
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 350, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 350, damping: 25 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

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

  const filteredActivities = activeCategory === "All"
    ? activities
    : activities.filter(act => {
        const cat = act.category || "";
        return cat.toLowerCase().includes(activeCategory.toLowerCase().replace(" events", ""));
      });

  const total = filteredActivities.length;
  const activeAct = filteredActivities[currentIndex] || filteredActivities[0] || activities[0];
  const ActiveIcon = categoryIcons[activeAct?.category] || Award;

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

  // Expedition Stream Rail Ref & Drag-to-Scroll State
  const railRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [dragMoved, setDragMoved] = useState(false);

  const handleSelectIndex = (idx) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Auto-center active card on expedition rail horizontally only (Never jump the window viewport)
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (railRef.current && railRef.current.children && railRef.current.children[currentIndex]) {
      const rail = railRef.current;
      const selectedElem = rail.children[currentIndex];
      const targetScroll = selectedElem.offsetLeft - (rail.clientWidth / 2) + (selectedElem.clientWidth / 2);
      rail.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  // Reset index when category filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Native non-passive Wheel listener to guarantee horizontal scroll with any mouse
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const handleWheelNative = (e) => {
      if (rail.scrollWidth > rail.clientWidth) {
        e.preventDefault();
        const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        rail.scrollLeft += delta * 1.5;
      }
    };

    rail.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => {
      rail.removeEventListener('wheel', handleWheelNative);
    };
  }, [filteredActivities.length]);

  // HTML5 Pointer Drag-to-Scroll Handlers (Works on Mouse & Touch without losing focus)
  const handlePointerDown = (e) => {
    if (!railRef.current) return;
    setIsDragging(true);
    setDragMoved(false);
    setStartX(e.clientX);
    setScrollLeftState(railRef.current.scrollLeft);
    railRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || !railRef.current) return;
    const delta = e.clientX - startX;
    if (Math.abs(delta) > 5) {
      setDragMoved(true);
    }
    railRef.current.scrollLeft = scrollLeftState - delta * 1.5;
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    if (railRef.current && railRef.current.hasPointerCapture(e.pointerId)) {
      railRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const scrollRail = (dir) => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: dir * 260, behavior: 'smooth' });
    }
  };

  // Autoplay Tour
  useEffect(() => {
    if (!isPlayingTour || total <= 1) return;
    const interval = setInterval(handleNext, 4200);
    return () => clearInterval(interval);
  }, [isPlayingTour, handleNext, total]);

  // Clean 3D Stage Transition Variants
  const stageVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '50%' : '-50%',
      rotateY: dir > 0 ? 15 : -15,
      scale: 0.94,
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
        scale: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.22 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? '-50%' : '50%',
      rotateY: dir > 0 ? -15 : 15,
      scale: 0.94,
      opacity: 0,
      transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <SectionWrapper id="activities" variant="flip-left" className="py-10 sm:py-14">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5 sm:space-y-6">
        
        {/* Section Header */}
        <SectionHeader
          number="07"
          category="Leadership & Events"
          title="Extracurricular &"
          highlight="Leadership"
        />

        {/* 🎛️ SPACE-OPTIMIZED CATEGORY FILTER PILLS & INLINE CONTROLS */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 w-full" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const count = cat.id === "All"
                ? activities.length
                : activities.filter(a => (a.category || "").toLowerCase().includes(cat.id.toLowerCase().replace(" events", ""))).length;

              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none shadow-sm hover:scale-105 active:scale-95 whitespace-nowrap"
                  style={{
                    background: isActive ? 'var(--color-accent)' : 'var(--color-surface-2)',
                    color: isActive ? '#000' : 'var(--color-text-muted)',
                    border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    boxShadow: isActive ? '0 0 15px rgba(56, 189, 248, 0.35)' : 'none',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
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

          {/* Compact Inline Autoplay Tour & Arrows */}
          <div className="flex items-center gap-1.5 font-mono flex-shrink-0">
            <button
              onClick={() => setIsPlayingTour(!isPlayingTour)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{
                background: isPlayingTour ? 'var(--color-accent)' : 'var(--color-surface-2)',
                color: isPlayingTour ? '#000' : 'var(--color-text-muted)',
                border: '1px solid var(--color-border)',
              }}
            >
              {isPlayingTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingTour ? 'Touring' : 'Auto Tour'}</span>
            </button>

            <button
              onClick={handlePrev}
              aria-label="Previous Event"
              className="p-1.5 rounded-xl transition-all shadow-sm hover:scale-110 active:scale-90 cursor-pointer"
              style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <span className="px-2 py-1 rounded-xl text-xs font-bold whitespace-nowrap" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-accent)' }}>
              0{currentIndex + 1} / 0{total}
            </span>

            <button
              onClick={handleNext}
              aria-label="Next Event"
              className="p-1.5 rounded-xl transition-all shadow-sm hover:scale-110 active:scale-90 cursor-pointer"
              style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 🌟 3D HOLOGRAPHIC SPOTLIGHT STAGE */}
        <div className="w-full perspective-[1200px] font-mono overflow-hidden py-1">
          <AnimatePresence custom={direction} mode="wait">
            {activeAct && (
              <motion.div
                key={activeAct.id || currentIndex}
                custom={direction}
                variants={stageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                  background: 'var(--color-surface)',
                  border: '1.5px solid var(--color-border)',
                }}
                className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative select-none"
              >
                {/* Top Glowing Laser Accent Line */}
                <div 
                  className="absolute inset-x-0 top-0 h-[2px] z-30" 
                  style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} 
                />

                {/* 1. Widescreen Banner with Ambient Overlay */}
                <div className="relative w-full h-40 sm:h-56 overflow-hidden bg-black/50 shadow-inner group/banner">
                  <img
                    src={activeAct.img || '/tech2.JPG'}
                    alt={activeAct.title}
                    className="w-full h-full object-cover group-hover/banner:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-black/35 to-transparent pointer-events-none" />

                  {/* Top Badges inside Banner */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                    <span 
                      className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-lg backdrop-blur-md"
                      style={{
                        background: 'rgba(0,0,0,0.65)',
                        color: 'var(--color-accent)',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      <ActiveIcon className="w-3.5 h-3.5" />
                      <span>{activeAct.category || "Event"}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      {getActImages(activeAct).length > 1 && (
                        <span 
                          className="text-xs font-mono font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5"
                          style={{
                            background: 'rgba(0,0,0,0.65)',
                            color: 'var(--color-accent)',
                            border: '1px solid rgba(255,255,255,0.15)',
                          }}
                        >
                          <Images className="w-3.5 h-3.5" />
                          <span>{getActImages(activeAct).length} Photos</span>
                        </span>
                      )}

                      <span 
                        className="text-xs font-mono font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5"
                        style={{
                          background: 'rgba(0,0,0,0.65)',
                          color: '#fff',
                          border: '1px solid rgba(255,255,255,0.15)',
                        }}
                      >
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        <span>{activeAct.year || "2023 - Present"}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Spotlight Body Content */}
                <div className="p-4 sm:p-6 space-y-3.5 relative z-20 -mt-5 sm:-mt-6">
                  
                  {/* Title & Leadership Role */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <div>
                      <h3 className="text-base sm:text-xl font-bold font-sans leading-snug tracking-tight" style={{ color: 'var(--color-text)' }}>
                        {activeAct.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold font-sans pt-0.5" style={{ color: 'var(--color-accent)' }}>
                        {activeAct.role}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
                      {activeAct.tag && (
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{ background: 'var(--color-surface-2)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                          {activeAct.tag}
                        </span>
                      )}

                      <span 
                        className="text-[10px] px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1 shadow-sm"
                        style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.25)' }}
                      >
                        <ShieldCheck className="w-3 h-3 text-green-400" />
                        <span>Verified</span>
                      </span>
                    </div>
                  </div>

                  {/* Description Excerpt */}
                  <p className="text-xs sm:text-[13px] leading-relaxed font-sans" style={{ color: 'var(--color-text-muted)' }}>
                    {activeAct.desc}
                  </p>

                  {/* Impact Metric & Inspect Action */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5" style={{ borderTop: '1px solid var(--color-border)' }}>
                    {activeAct.impact ? (
                      <div 
                        className="px-3 py-1 rounded-xl text-xs font-mono font-bold flex items-center gap-2 shadow-inner"
                        style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--color-accent)', border: '1px solid rgba(56, 189, 248, 0.25)' }}
                      >
                        <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{activeAct.impact}</span>
                      </div>
                    ) : <div />}

                    <button
                      onClick={() => setInspectedAct(activeAct)}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                      style={{
                        background: 'var(--color-accent)',
                        color: '#000',
                      }}
                    >
                      <span>Inspect Event</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 🎞️ INTERACTIVE HOLOGRAPHIC EVENT PASS STREAM (DRAG / WHEEL / CLICK SCROLLABLE) */}
        <div className="space-y-3 font-mono select-none">
          <div className="flex items-center justify-between text-xs pb-0.5" style={{ color: 'var(--color-text-muted)' }}>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="font-bold">Interactive Expedition Stream:</span>
              <span className="opacity-75 hidden sm:inline text-[11px]">(Drag, scroll, or click to explore)</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Rail Left/Right Scroll Chevrons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollRail(-1)}
                  className="p-1 rounded-lg border text-zinc-400 hover:text-white hover:border-accent transition-colors cursor-pointer"
                  style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}
                  aria-label="Scroll left"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRail(1)}
                  className="p-1 rounded-lg border text-zinc-400 hover:text-white hover:border-accent transition-colors cursor-pointer"
                  style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}
                  aria-label="Scroll right"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-[11px] px-2 py-0.5 rounded-md font-bold" style={{ background: 'var(--color-surface-2)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                {currentIndex + 1} / {filteredActivities.length} Selected
              </span>
            </div>
          </div>

          {/* Horizontal Event Cards Rail */}
          <div 
            ref={railRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="flex items-stretch gap-3.5 overflow-x-auto pb-2.5 pt-1 px-1 custom-scrollbar"
            style={{ 
              cursor: isDragging ? 'grabbing' : 'grab',
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              touchAction: 'pan-y',
              userSelect: 'none'
            }}
          >
            {filteredActivities.map((act, idx) => {
              const isSelected = idx === currentIndex;
              const Icon = categoryIcons[act.category] || Award;

              return (
                <div
                  key={act.id || idx}
                  onClick={() => {
                    if (!dragMoved) handleSelectIndex(idx);
                  }}
                  className="w-52 sm:w-60 p-3 rounded-2xl text-left transition-all duration-300 flex-shrink-0 cursor-pointer shadow-sm relative flex flex-col justify-between group hover:-translate-y-1 select-none"
                  style={{
                    background: isSelected ? 'var(--color-surface-2)' : 'var(--color-surface)',
                    border: isSelected ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                    boxShadow: isSelected 
                      ? '0 0 25px rgba(56, 189, 248, 0.4), 0 10px 25px rgba(0,0,0,0.3)' 
                      : '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Top Laser Beam on Active Card */}
                  {isSelected && (
                    <div 
                      className="absolute inset-x-0 top-0 h-[2.5px] z-30"
                      style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} 
                    />
                  )}

                  {/* Thumbnail Image Banner */}
                  <div className="w-full h-24 rounded-xl overflow-hidden bg-black/40 relative shadow-inner mb-2.5 flex-shrink-0 pointer-events-none">
                    <img
                      src={act.img || '/tech2.JPG'}
                      alt={act.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                    {/* Top-Left Category Badge */}
                    <div className="absolute top-1.5 left-1.5 text-[9px] font-bold px-2 py-0.5 rounded-md bg-black/75 text-accent border border-accent/30 flex items-center gap-1 backdrop-blur-sm">
                      <Icon className="w-2.5 h-2.5" />
                      <span className="truncate max-w-[80px]">{act.category?.replace(" Events", "") || "Event"}</span>
                    </div>

                    {/* Top-Right Year Pill */}
                    <div className="absolute top-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/75 text-white/90 border border-white/10 backdrop-blur-sm">
                      {act.year?.slice(0, 4) || "2023"}
                    </div>

                    {/* Bottom-Left Index & Waveform Indicator */}
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between z-10">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/80 text-white font-mono border border-white/15">
                        PASS #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>

                      {/* Equalizer Waveform when Active */}
                      {isSelected ? (
                        <div className="flex items-end gap-0.5 h-3 px-1.5 py-0.5 rounded bg-accent/20 border border-accent/40">
                          <span className="w-0.5 h-2 bg-accent animate-pulse" />
                          <span className="w-0.5 h-3 bg-accent animate-bounce" />
                          <span className="w-0.5 h-1.5 bg-accent animate-pulse" />
                          <span className="w-0.5 h-2.5 bg-accent animate-bounce" />
                        </div>
                      ) : (
                        <span className="text-[9px] font-mono text-zinc-400 opacity-80 group-hover:text-accent transition-colors">
                          View &rarr;
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content (Clean 2-line title wrapping, no clipping) */}
                  <div className="space-y-1 flex-1 flex flex-col justify-between pointer-events-none">
                    <div>
                      <h4 className="text-xs font-bold font-sans line-clamp-2 leading-tight tracking-tight min-h-[32px]" style={{ color: isSelected ? '#fff' : 'var(--color-text)' }}>
                        {act.title}
                      </h4>
                      <p className="text-[11px] font-semibold truncate pt-0.5" style={{ color: 'var(--color-accent)' }}>
                        {act.role}
                      </p>
                    </div>

                    {/* Key Metric Badge */}
                    {act.stat && (
                      <div className="pt-1.5 mt-1 border-t flex items-center justify-between text-[10px]" style={{ borderColor: 'var(--color-border)' }}>
                        <span className="text-zinc-400 text-[9px] uppercase tracking-wider">Impact:</span>
                        <span className="font-bold text-accent truncate max-w-[120px]">{act.stat}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🎚️ Interactive Laser Progress Scrub Bar (Click to Scrub) */}
          <div 
            className="w-full pt-1 cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              const targetIdx = Math.min(filteredActivities.length - 1, Math.floor(ratio * filteredActivities.length));
              handleSelectIndex(targetIdx);
            }}
          >
            <div className="w-full h-2 rounded-full overflow-hidden relative shadow-inner" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ 
                  width: `${((currentIndex + 1) / filteredActivities.length) * 100}%`,
                  background: 'linear-gradient(to right, #0284c7, var(--color-accent))',
                  boxShadow: '0 0 10px var(--color-accent)'
                }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Event Inspection Spec Modal Drawer */}
      <AnimatePresence>
        {inspectedAct && (() => {
          const modalImages = getActImages(inspectedAct);
          const activePhoto = modalImages[modalPhotoIdx] || modalImages[0] || inspectedAct.img || '/tech2.JPG';

          return (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl" 
              style={{ background: 'rgba(0,0,0,0.75)' }}
              onClick={() => setInspectedAct(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl rounded-3xl p-5 sm:p-6 space-y-4 relative overflow-hidden font-mono shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
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
                  onClick={() => setInspectedAct(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:opacity-85 transition-opacity cursor-pointer shadow-md z-30"
                  style={{
                    background: 'var(--color-surface-2)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Event Multi-Image Banner & Gallery Viewer */}
                <div className="space-y-2">
                  <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-black/50 shadow-inner group" style={{ border: '1px solid var(--color-border)' }}>
                    <img 
                      src={activePhoto} 
                      alt={`${inspectedAct.title} photo ${modalPhotoIdx + 1}`} 
                      className="w-full h-full object-cover transition-all duration-300" 
                    />

                    {/* Multi-Photo Counter Badge */}
                    {modalImages.length > 1 && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono shadow-md backdrop-blur-md flex items-center gap-1.5" style={{ background: 'rgba(0,0,0,0.7)', color: 'var(--color-accent)', border: '1px solid rgba(255,255,255,0.15)' }}>
                        <Images className="w-3.5 h-3.5" />
                        <span>{modalPhotoIdx + 1} / {modalImages.length} Photos</span>
                      </div>
                    )}

                    {/* Prev / Next Photo Overlay Buttons */}
                    {modalImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalPhotoIdx((prev) => (prev - 1 + modalImages.length) % modalImages.length);
                          }}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 shadow-lg cursor-pointer transition-transform active:scale-90"
                          aria-label="Previous photo"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalPhotoIdx((prev) => (prev + 1) % modalImages.length);
                          }}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 shadow-lg cursor-pointer transition-transform active:scale-90"
                          aria-label="Next photo"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Horizontal Thumbnail Strip Preview */}
                  {modalImages.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                      {modalImages.map((imgUrl, i) => {
                        const isCurrentPhoto = i === modalPhotoIdx;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setModalPhotoIdx(i)}
                            className="relative w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-200 cursor-pointer shadow-sm"
                            style={{
                              border: isCurrentPhoto ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                              opacity: isCurrentPhoto ? 1 : 0.6,
                              transform: isCurrentPhoto ? 'scale(1.05)' : 'scale(1)',
                              boxShadow: isCurrentPhoto ? '0 0 10px var(--color-accent)' : 'none'
                            }}
                          >
                            <img src={imgUrl} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-3 py-1 rounded-full font-bold shadow-sm" style={{ background: 'var(--color-surface-2)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                      {inspectedAct.category}
                    </span>
                    <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                      Tenure: {inspectedAct.year || "2023 - Present"}
                    </span>
                    {inspectedAct.tag && (
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase" style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                        {inspectedAct.tag}
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="text-lg sm:text-xl font-bold leading-snug font-sans" style={{ color: 'var(--color-text)' }}>
                      {inspectedAct.title}
                    </h2>
                    <p className="text-xs font-semibold font-sans pt-0.5" style={{ color: 'var(--color-accent)' }}>
                      Role: {inspectedAct.role}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl space-y-1 shadow-sm" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderLeft: '4px solid var(--color-accent)' }}>
                    <span className="text-xs font-bold block" style={{ color: 'var(--color-accent)' }}>FULL EVENT DETAILS & IMPACT:</span>
                    <p className="text-xs leading-relaxed font-sans" style={{ color: 'var(--color-text-muted)' }}>
                      {inspectedAct.desc || inspectedAct.description}
                    </p>
                  </div>

                  {inspectedAct.impact && (
                    <div className="p-3 rounded-xl text-xs flex items-center gap-2 shadow-inner" style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--color-accent)', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                      <TrendingUp className="w-4 h-4 flex-shrink-0" />
                      <span className="font-bold">{inspectedAct.impact}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 flex justify-end gap-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <button
                    onClick={() => setInspectedAct(null)}
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
          );
        })()}
      </AnimatePresence>

    </SectionWrapper>
  );
}
