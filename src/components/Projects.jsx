'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Globe, Cpu, Brain, Sparkles, X, ChevronRight, Activity } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { GithubIcon } from './SocialIcons';
import Magnetic from './ux/Magnetic';

// Glassmorphic Project Card Component (Supports Dark & Light Themes)
function StackableDeckCard({ project, index, total, onInspect }) {
  const mainImage = project.image || '/images/projects/sipprq1.png';
  const githubLink = project.githubUrl || 'https://github.com/Ratul-NotFound';
  const liveLink = project.liveUrl || 'https://vercel.com';

  const projectTechTags = Array.isArray(project.tech)
    ? project.tech
    : (typeof project.tech === 'string' ? project.tech.split(',') : ['Next.js', 'React']);

  return (
    <div 
      className="w-full rounded-3xl overflow-hidden transition-all duration-300 relative z-10 select-none p-5 sm:p-6 group font-mono shadow-xl hover:shadow-2xl"
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

      {/* Top Bar Header */}
      <div className="flex items-center justify-between gap-4 pb-3.5 flex-shrink-0 z-20" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-2">
          <span 
            className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full"
            style={{
              background: 'var(--color-surface-2)',
              color: 'var(--color-accent)',
              border: '1px solid var(--color-border)',
            }}
          >
            {project.category}
          </span>
          {project.featured && (
            <span 
              className="text-[10px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-sm"
              style={{
                background: 'var(--color-surface-2)',
                color: 'var(--color-accent)',
                border: '1px solid var(--color-border)',
              }}
            >
              <Sparkles className="w-3 h-3" style={{ color: 'var(--color-accent)' }} />
              <span>Flagship</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-0.5 rounded-full font-bold" style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.25)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            LIVE
          </span>
          <span 
            className="text-xs px-3 py-1 rounded-full font-bold hidden sm:inline-block"
            style={{
              background: 'var(--color-surface-2)',
              color: 'var(--color-accent)',
              border: '1px solid var(--color-border)',
            }}
          >
            0{index + 1} / 0{total}
          </span>
        </div>
      </div>

      {/* 2-Column Split Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-4">
        
        {/* LEFT COLUMN (6/12 Width): Interactive Project Thumbnail */}
        <div className="md:col-span-6 relative rounded-2xl overflow-hidden bg-black/40 h-52 sm:h-60 group/img shadow-inner" style={{ border: '1px solid var(--color-border)' }}>
          <img
            src={mainImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover/img:scale-108 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute top-3 left-3 opacity-90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono tracking-wider text-white bg-black/50 border border-white/10">
            {projectTechTags[0] || 'Web'}
          </div>

          <button
            onClick={() => onInspect(project)}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 opacity-0 group-hover/img:opacity-100 transition-all duration-300 font-mono text-xs font-bold gap-2 cursor-pointer backdrop-blur-xs"
            style={{ color: 'var(--color-accent)' }}
          >
            <span className="p-2.5 rounded-full bg-white/10 border border-white/20 transform group-hover/img:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
            </span>
            <span className="tracking-wide uppercase text-[11px]">Inspect Full Spec & Gallery</span>
          </button>
        </div>

        {/* RIGHT COLUMN (6/12 Width): Content Spec */}
        <div className="md:col-span-6 space-y-3.5">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold transition-colors leading-tight font-sans tracking-tight" style={{ color: 'var(--color-text)' }}>
              {project.title}
            </h3>
            <p className="text-xs leading-relaxed pt-2 line-clamp-3 font-sans" style={{ color: 'var(--color-text-muted)' }}>
              {project.longDesc || project.description}
            </p>
          </div>

          {/* Metric Telemetry Chip */}
          {project.metrics && (
            <div 
              className="p-2.5 rounded-xl flex items-center gap-2.5 text-xs font-mono shadow-sm"
              style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-accent)',
              }}
            >
              <Activity className="w-4 h-4 flex-shrink-0 animate-pulse" style={{ color: 'var(--color-accent)' }} />
              <span className="truncate font-bold tracking-wide">{project.metrics}</span>
            </div>
          )}

          {/* Tech Stack Micro-Chips */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {projectTechTags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2.5 py-1 rounded-lg font-semibold transition-all hover:border-accent"
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

      {/* Action Links Bar */}
      <div className="pt-3.5 flex items-center justify-between gap-2" style={{ borderTop: '1px solid var(--color-border)' }}>
        <Magnetic>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold transition-colors px-3 py-1.5 rounded-xl border border-transparent hover:border-border hover:bg-surface-2"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
          >
            <GithubIcon className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
            <span>Code</span>
          </a>
        </Magnetic>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onInspect(project)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
            style={{
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.color = '#000'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-surface-2)'; e.currentTarget.style.color = 'var(--color-text)'; }}
          >
            <span>Inspect Spec</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <Magnetic>
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-xl font-mono font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg"
              style={{
                background: 'var(--color-accent)',
                color: '#000',
              }}
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects = [] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [inspectedProject, setInspectedProject] = useState(null);

  const categories = [
    { id: 'all', label: 'All Projects', icon: Layers },
    { id: 'Full-Stack Web App', label: 'Full-Stack Web', icon: Globe },
    { id: 'AI & Embedded IoT', label: 'AI & Embedded', icon: Cpu },
    { id: 'Interactive Canvas & Game', label: 'Canvas & Game', icon: Brain }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <SectionWrapper id="projects" variant="zoom-portal" className="">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5 lg:space-y-6 perspective-1200">
        
        {/* Section Header */}
        <SectionHeader
          number="04"
          category="Featured Showcase"
          title="Featured Projects &"
          highlight="Works"
        />

        {/* SUBSECTION TAB FILTER BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div 
            className="flex flex-wrap items-center justify-center sm:justify-start gap-2 p-1.5 rounded-2xl border"
            style={{
              background: 'var(--color-surface-2)',
              borderColor: 'var(--color-border)',
            }}
          >
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
                  className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer select-none"
                  style={{
                    background: isActive ? 'var(--color-accent)' : 'transparent',
                    color: isActive ? '#000' : 'var(--color-text-muted)',
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

          <div className="text-xs font-mono flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
            <span>Scroll Deck:</span>
            <strong style={{ color: 'var(--color-accent)' }}>{filteredProjects.length} Works Listed</strong>
          </div>
        </div>

        {/* SCROLLSTACK CONTAINER */}
        <div className="w-full h-[540px] relative">
          <ScrollStack
            itemDistance={40}
            itemScale={0.02}
            itemStackDistance={35}
            stackPosition="4%"
            scaleEndPosition="2%"
            baseScale={0.94}
            blurAmount={0}
            useWindowScroll={false}
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
    : [inspectedProject.image || '/images/projects/sipprq1.png'];

  const [activeImg, setActiveImg] = useState(gallery[0]);

  const githubLink = inspectedProject.githubUrl || 'https://github.com/Ratul-NotFound';
  const liveLink = inspectedProject.liveUrl || 'https://vercel.com';

  const techTags = Array.isArray(inspectedProject.tech)
    ? inspectedProject.tech
    : (typeof inspectedProject.tech === 'string' ? inspectedProject.tech.split(',') : ['Next.js', 'React']);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl" 
      style={{ background: 'rgba(0,0,0,0.65)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl p-6 space-y-4 relative overflow-hidden font-mono shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
        style={{
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
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
          <img src={activeImg} alt={inspectedProject.title} className="w-full h-full object-cover transition-all duration-300" />
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
                <img src={imgUrl} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
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
                <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
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
