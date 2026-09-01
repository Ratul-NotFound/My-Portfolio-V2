'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Globe, Cpu, Brain, Award, X, ChevronRight, Activity, Zap, Eye } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { GithubIcon } from './SocialIcons';
import Magnetic from './ux/Magnetic';

// Glassmorphic Project Card Component (Supports Dark & Light Themes)
function StackableDeckCard({ project, index, total, onInspect }) {
  const mainImage = project.image || '/tech1.jpg';
  const githubLink = project.githubUrl || 'https://github.com/Ratul-NotFound';
  const liveLink = project.liveUrl || 'https://vercel.com';

  const projectTechTags = Array.isArray(project.tech)
    ? project.tech
    : (typeof project.tech === 'string' ? project.tech.split(',') : ['Next.js', 'React']);

  return (
    <div className="w-full relative z-10 select-none group font-mono mt-3">
      {/* Sleek Compact Top-Right File Folder Tab */}
      <div className="flex items-center justify-end pr-4 sm:pr-6 relative z-20">
        <div 
          className="px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-t-xl sm:rounded-t-2xl text-[9px] sm:text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-md border-t border-x relative -mb-[1px]"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-accent)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>PROJECT 0{index + 1} / 0{total}</span>
        </div>
      </div>

      {/* Main Folder Card Container */}
      <div 
        className="w-full rounded-2xl sm:rounded-3xl rounded-tr-none transition-all duration-300 relative z-10 p-3 sm:p-5 shadow-xl hover:shadow-2xl overflow-hidden"
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

        {/* Top Bar Header inside Card */}
        <div className="flex items-center justify-between gap-2 pb-2 flex-shrink-0 z-20" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] sm:text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ background: 'var(--color-surface-2)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
              {project.category || 'Featured'}
            </span>
            {project.featured && (
              <span 
                className="text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-sm hidden sm:inline-flex"
                style={{
                  background: 'var(--color-surface-2)',
                  color: 'var(--color-accent)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Award className="w-3 h-3" style={{ color: 'var(--color-accent)' }} />
                <span>Flagship</span>
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0" style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.25)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            LIVE DEMO
          </span>
        </div>

        {/* 2-Column Side-by-Side Body (50% Picture, 50% Content) */}
        <div className="grid grid-cols-12 gap-2 sm:gap-4 md:gap-5 items-center my-0.5 sm:my-2">
          
          {/* LEFT COLUMN: Project Screenshot */}
          <div 
            className="col-span-6 md:col-span-6 relative rounded-lg sm:rounded-2xl overflow-hidden bg-black/40 h-28 sm:h-36 md:h-40 lg:h-44 xl:h-48 group/img shadow-inner cursor-pointer" 
            style={{ border: '1px solid var(--color-border)' }}
            onClick={() => onInspect(project)}
            onMouseEnter={() => {
              if (typeof window !== 'undefined' && window.innerWidth >= 768) {
                onInspect(project);
              }
            }}
          >
            <img
              src={mainImage}
              alt={project.title}
              loading="lazy"
              decoding="async"
              onError={(e) => { e.currentTarget.src = '/tech2.JPG'; }}
              className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute top-1 left-1 sm:top-2.5 sm:left-2.5 opacity-90 backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md text-[8px] sm:text-[9px] md:text-xs font-bold font-mono tracking-wider text-white bg-black/50 border border-white/10 pointer-events-none">
              {projectTechTags[0] || 'Web'}
            </div>

            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 opacity-0 group-hover/img:opacity-100 transition-all duration-300 font-mono text-xs font-bold gap-2 cursor-pointer backdrop-blur-xs pointer-events-none"
              style={{ color: 'var(--color-accent)' }}
            >
              <span className="p-1.5 sm:p-2 rounded-full bg-white/10 border border-white/20 transform group-hover/img:scale-110 transition-transform">
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: 'var(--color-accent)' }} />
              </span>
              <span className="tracking-wide uppercase text-[9px] sm:text-[10px] md:text-xs">Inspect Spec</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Project Content & Specs */}
          <div className="col-span-6 md:col-span-6 space-y-1 sm:space-y-2 lg:space-y-3">
            <div>
              <h3 className="text-xs sm:text-lg md:text-xl lg:text-2xl font-bold transition-colors leading-snug font-sans tracking-tight line-clamp-2" style={{ color: 'var(--color-text)' }}>
                {project.title}
              </h3>
              <p className="text-[10px] sm:text-xs md:text-[13px] lg:text-sm leading-snug sm:leading-relaxed pt-0.5 line-clamp-2 font-sans" style={{ color: 'var(--color-text-muted)' }}>
                {project.longDesc || project.description}
              </p>
            </div>

            {/* Metric Telemetry Chip */}
            {project.metrics && (
              <div 
                className="p-1 sm:p-1.5 rounded-md sm:rounded-xl flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-mono shadow-sm"
                style={{
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-accent)',
                }}
              >
                <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 animate-pulse" style={{ color: 'var(--color-accent)' }} />
                <span className="truncate font-bold tracking-wide">{project.metrics}</span>
              </div>
            )}

            {/* Tech Stack Micro-Chips */}
            <div className="flex flex-wrap gap-1 pt-0.5">
              {projectTechTags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[8px] sm:text-[9px] font-mono px-1.5 sm:px-2 py-0.5 rounded-md sm:rounded-lg font-semibold transition-all"
                  style={{
                    background: 'var(--color-surface-3)',
                    color: 'var(--color-text-muted)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Action Links Footer Bar */}
        <div className="pt-1.5 sm:pt-2 flex items-center justify-between gap-1.5" style={{ borderTop: '1px solid var(--color-border)' }}>
          <Magnetic>
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold transition-colors px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-transparent hover:border-border hover:bg-surface-2"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              <GithubIcon className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
              <span>Code</span>
            </a>
          </Magnetic>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button
              onClick={() => onInspect(project)}
              className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-surface-2)'; e.currentTarget.style.color = 'var(--color-text)'; }}
            >
              <span>Inspect</span>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            <Magnetic>
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg sm:rounded-xl font-mono font-bold text-[10px] sm:text-xs transition-all flex items-center gap-1 cursor-pointer shadow-md hover:shadow-lg"
                style={{
                  background: 'var(--color-accent)',
                  color: '#000',
                }}
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects = [], techSkills = [] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTechFilter, setActiveTechFilter] = useState('all');
  const [inspectedProject, setInspectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen for tech click events from TechStack component hover popups
  useEffect(() => {
    const handleFilterTech = (e) => {
      if (e.detail) {
        setActiveTechFilter(e.detail);
        setActiveCategory('all');
      }
    };
    window.addEventListener('filter-project-tech', handleFilterTech);
    return () => window.removeEventListener('filter-project-tech', handleFilterTech);
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects', icon: Layers },
    { id: 'Full-Stack Web App', label: 'Full-Stack Web', icon: Globe },
    { id: 'AI & Embedded IoT', label: 'AI & Embedded', icon: Cpu },
    { id: 'Interactive Canvas & Game', label: 'Canvas & Game', icon: Brain }
  ];

  // Extract all unique tech tags across all projects and tech skills
  const availableTechTags = Array.from(new Set([
    ...(techSkills || []).map(s => s.name).filter(Boolean),
    ...projects.flatMap(p => {
      if (!p.tech) return [];
      return Array.isArray(p.tech) ? p.tech : String(p.tech).split(',').map(s => s.trim());
    }).filter(Boolean)
  ])).sort();

  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    if (!matchesCategory) return false;

    if (!activeTechFilter || activeTechFilter === 'all') return true;

    const pTechs = Array.isArray(p.tech) 
      ? p.tech 
      : typeof p.tech === 'string' 
      ? p.tech.split(',').map(s => s.trim()) 
      : [];

    const target = activeTechFilter.toLowerCase().trim();
    return pTechs.some(t => {
      const norm = t.toLowerCase().trim();
      if (norm === target || norm.includes(target) || target.includes(norm)) return true;
      if (target === 'next.js' && norm.includes('next')) return true;
      if (target === 'react' && norm.includes('react')) return true;
      if (target === 'c++' && (norm.includes('c++') || norm.includes('cpp'))) return true;
      if (target === 'pytorch' && (norm.includes('pytorch') || norm.includes('tinyml'))) return true;
      return false;
    });
  });

  return (
    <SectionWrapper id="projects" variant="zoom-portal">
      <div className="w-full relative z-10 perspective-1200 mx-auto" style={{ maxWidth: 'var(--container-inner)', display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
        
        {/* Section Header */}
        <SectionHeader
          number="04"
          category="Featured Showcase"
          title="Featured Projects &"
          highlight="Works"
        />

        {/* 🎛️ SLEEK MODERN CATEGORY & TECH STACK FILTER BAR */}
        <div className="space-y-2 pb-2 w-full" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {categories.map((cat) => {
                const count = cat.id === 'all'
                  ? projects.length
                  : projects.filter(p => p.category === cat.id).length;

                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="px-2 py-1 sm:px-3 sm:py-1 rounded-xl text-[10px] sm:text-xs font-mono font-bold transition-all duration-200 flex items-center gap-1 sm:gap-1.5 cursor-pointer select-none shadow-sm hover:scale-105 active:scale-95 touch-target-exempt"
                    style={{
                      background: isActive ? 'var(--color-accent)' : 'var(--color-surface-2)',
                      color: isActive ? '#000' : 'var(--color-text-muted)',
                      border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                      boxShadow: isActive ? '0 0 15px rgba(56, 189, 248, 0.35)' : 'none',
                      minHeight: 'unset',
                    }}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {/* Hide label text on very small screens */}
                    <span className="hidden xs:inline sm:inline">{cat.label}</span>
                    <span className="xs:hidden">{cat.id === 'all' ? 'All' : cat.label.split(' ')[0]}</span>
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

            {/* ⚡ SYNCHRONIZED TECH STACK DROPDOWN SELECTOR */}
            <div className="flex items-center gap-2">
              <div className="relative flex items-center">
                <select
                  value={activeTechFilter}
                  onChange={(e) => setActiveTechFilter(e.target.value)}
                  className="px-3 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold outline-none cursor-pointer border shadow-sm transition-all"
                  style={{
                    background: activeTechFilter !== 'all' ? 'var(--color-accent)' : 'var(--color-surface-2)',
                    color: activeTechFilter !== 'all' ? '#000' : 'var(--color-text)',
                    borderColor: activeTechFilter !== 'all' ? 'var(--color-accent)' : 'var(--color-border)',
                  }}
                >
                  <option value="all" style={{ background: '#12131a', color: '#fff' }}>⚡ All Tech Stacks ({availableTechTags.length})</option>
                  {availableTechTags.map(tech => {
                    const matchCount = projects.filter(p => {
                      const pTechs = Array.isArray(p.tech) ? p.tech : (typeof p.tech === 'string' ? p.tech.split(',').map(s => s.trim()) : []);
                      const norm = tech.toLowerCase();
                      return pTechs.some(t => t.toLowerCase().includes(norm) || norm.includes(t.toLowerCase()));
                    }).length;
                    return (
                      <option key={tech} value={tech} style={{ background: '#12131a', color: '#fff' }}>
                        {tech} {matchCount > 0 ? `(${matchCount} Project${matchCount > 1 ? 's' : ''})` : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              {activeTechFilter !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveTechFilter('all')}
                  className="px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-bold flex items-center gap-1 border cursor-pointer hover:bg-red-500/20 text-red-400 border-red-500/30"
                  title="Clear tech filter"
                >
                  <span>Reset Tech</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Status & Count */}
          <div className="flex items-center justify-between text-xs font-mono pt-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-zinc-400">
                Filtered: <strong style={{ color: 'var(--color-accent)' }}>{filteredProjects.length} Projects</strong>
                {activeTechFilter !== 'all' && (
                  <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] bg-accent/15 text-accent font-bold" style={{ color: 'var(--color-accent)' }}>
                    Stack: {activeTechFilter}
                  </span>
                )}
              </span>
            </div>

            {(activeCategory !== 'all' || activeTechFilter !== 'all') && (
              <button 
                onClick={() => { setActiveCategory('all'); setActiveTechFilter('all'); }} 
                className="text-accent underline hover:opacity-80 text-[11px] cursor-pointer"
                style={{ color: 'var(--color-accent)' }}
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* SCROLLSTACK FOLDER DECK CONTAINER */}
        <div className="w-full h-[420px] sm:h-[500px] md:h-[550px] lg:h-[590px] xl:h-[630px] relative pt-2 sm:pt-3 pb-6">
          <ScrollStack
            itemDistance={isMobile ? 140 : 240}
            itemScale={0.02}
            itemStackDistance={isMobile ? 6 : 8}
            stackPosition="1%"
            scaleEndPosition="0%"
            baseScale={0.96}
            blurAmount={0}
            useWindowScroll={false}
            duration={0.5}
            wheelMultiplier={1.2}
            touchMultiplier={1.6}
            className="w-full h-full pr-2 custom-scrollbar"
          >
            {filteredProjects.map((project, index) => (
              <ScrollStackItem key={project.id}>
                <StackableDeckCard
                  project={project}
                  index={index}
                  total={filteredProjects.length}
                  onInspect={setInspectedProject}
                />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* Project Inspection Spec Modal Drawer */}
        <AnimatePresence>
          {inspectedProject && (
            <ProjectInspectModal
              inspectedProject={inspectedProject}
              onClose={() => setInspectedProject(null)}
            />
          )}
        </AnimatePresence>

      </div>
    </SectionWrapper>
  );
}

// Project Inspection Spec Modal Drawer Component
function ProjectInspectModal({ inspectedProject, onClose }) {
  const gallery = Array.isArray(inspectedProject.gallery) && inspectedProject.gallery.length > 0
    ? inspectedProject.gallery
    : [inspectedProject.image || '/tech1.jpg'];

  const [activeImg, setActiveImg] = useState(gallery[0]);

  const githubLink = inspectedProject.githubUrl || 'https://github.com/Ratul-NotFound';
  const liveLink = inspectedProject.liveUrl || 'https://vercel.com';

  const techTags = Array.isArray(inspectedProject.tech)
    ? inspectedProject.tech
    : (typeof inspectedProject.tech === 'string' ? inspectedProject.tech.split(',') : ['Next.js', 'React']);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-xl" 
      style={{ background: 'rgba(0,0,0,0.65)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-2xl rounded-none sm:rounded-3xl p-4 sm:p-6 space-y-4 relative overflow-hidden font-mono shadow-2xl max-h-[90vh] sm:max-h-[90vh] overflow-y-auto custom-scrollbar"
        style={{
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:opacity-85 transition-opacity cursor-pointer shadow-md"
          style={{
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
          }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Main Image Display */}
        <div className="relative w-full h-60 sm:h-72 rounded-2xl overflow-hidden bg-black/40 shadow-inner" style={{ border: '1px solid var(--color-border)' }}>
          <img src={activeImg} alt={inspectedProject.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-all duration-300" />
        </div>

        {/* Gallery Thumbnails */}
        {gallery.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {gallery.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(imgUrl)}
                className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all border-2"
                style={{
                  borderColor: activeImg === imgUrl ? 'var(--color-accent)' : 'var(--color-border)',
                  opacity: activeImg === imgUrl ? 1 : 0.6,
                }}
              >
                <img src={imgUrl} alt={`Gallery ${i}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span 
              className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider"
              style={{
                background: 'var(--color-surface-2)',
                color: 'var(--color-accent)',
                border: '1px solid var(--color-border)',
              }}
            >
              {inspectedProject.category}
            </span>

            {inspectedProject.featured && (
              <span 
                className="text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1"
                style={{
                  background: 'var(--color-surface-2)',
                  color: 'var(--color-accent)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Award className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
                <span>Flagship Project</span>
              </span>
            )}
          </div>

          <h2 className="text-2xl font-bold leading-snug font-sans" style={{ color: 'var(--color-text)' }}>{inspectedProject.title}</h2>
          <p className="text-xs sm:text-sm leading-relaxed font-sans" style={{ color: 'var(--color-text-muted)' }}>{inspectedProject.longDesc || inspectedProject.description}</p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {techTags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 rounded-lg font-semibold"
                style={{
                  background: 'var(--color-surface-3)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {tag.trim()}
              </span>
            ))}
          </div>

          {inspectedProject.metrics && (
            <div 
              className="p-3 rounded-xl text-xs flex items-center gap-2.5 font-mono shadow-sm"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-accent)',
              }}
            >
              <Activity className="w-4 h-4 flex-shrink-0 animate-pulse" style={{ color: 'var(--color-accent)' }} />
              <span className="font-bold">Telemetry: {inspectedProject.metrics}</span>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="pt-4 flex items-center justify-between flex-wrap gap-3" style={{ borderTop: '1px solid var(--color-border)' }}>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-xl transition-all border"
            style={{
              background: 'var(--color-surface-2)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            <GithubIcon className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
            <span>Repository</span>
          </a>

          <div className="flex items-center gap-2.5">
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow-md hover:opacity-90"
              style={{
                background: 'var(--color-accent)',
                color: '#000',
              }}
            >
              <span>Launch App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-bold text-xs cursor-pointer transition-all"
              style={{
                background: 'var(--color-surface-3)',
                color: 'var(--color-text-muted)',
                border: '1px solid var(--color-border)',
              }}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
