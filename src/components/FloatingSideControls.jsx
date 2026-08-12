'use client';
import { useEffect, useState, useRef } from 'react';
import { Mail, Hand } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const SECTIONS = [
  { id: 'hero',       number: '01', label: 'Home',       subtitle: 'Overview & Introduction' },
  { id: 'about',      number: '02', label: 'About',      subtitle: 'Biography & Core Focus' },
  { id: 'tech-stack', number: '03', label: 'Skills',     subtitle: 'Technologies & Stack' },
  { id: 'projects',   number: '04', label: 'Projects',   subtitle: 'Featured Showcase & Demos' },
  { id: 'research',   number: '05', label: 'Research',   subtitle: 'Publications & AI Lab' },
  { id: 'experience', number: '06', label: 'Experience', subtitle: 'Career & Leadership' },
  { id: 'contact',    number: '07', label: 'Contact',    subtitle: 'Get In Touch' },
];

const iconBtn = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 40, height: 40, borderRadius: '50%',
  border: '1px solid var(--color-border)',
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(12px)',
  cursor: 'pointer', transition: 'all 0.3s ease',
  color: 'var(--color-text-muted)',
};

function ActualSectionPreview({ sec, isActive, isHovered }) {
  const previewRef = useRef(null);
  const [scale, setScale] = useState(0.24);
  const [screenWidth, setScreenWidth] = useState(1280);

  useEffect(() => {
    if (!isHovered || !previewRef.current) return;
    const targetEl = document.getElementById(sec.id);
    if (!targetEl) return;

    const currentScreenWidth = window.innerWidth || 1280;
    const previewContainerWidth = 296; // 320px minus padding
    const calculatedScale = previewContainerWidth / currentScreenWidth;

    setScreenWidth(currentScreenWidth);
    setScale(calculatedScale);

    previewRef.current.innerHTML = '';
    const clone = targetEl.cloneNode(true);

    // Strip IDs to avoid duplicate DOM keys
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));

    // Copy canvas pixel data from original canvases to cloned canvases
    const origCanvases = targetEl.querySelectorAll('canvas');
    const cloneCanvases = clone.querySelectorAll('canvas');
    origCanvases.forEach((origCanvas, i) => {
      if (cloneCanvases[i]) {
        try {
          const destCtx = cloneCanvases[i].getContext('2d');
          if (destCtx) {
            destCtx.drawImage(origCanvas, 0, 0);
          }
        } catch (e) {
          // ignore canvas security/cross-origin errors
        }
      }
    });

    // Reset all motion & transform overrides on root clone & all descendant nodes
    const resetNodeStyles = (el) => {
      if (el.style) {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
        el.style.webkitTransform = 'none';
        el.style.filter = 'none';
      }
    };

    resetNodeStyles(clone);
    clone.style.pointerEvents = 'none';
    clone.style.userSelect = 'none';
    clone.style.width = `${currentScreenWidth}px`;

    clone.querySelectorAll('*').forEach(resetNodeStyles);

    previewRef.current.appendChild(clone);
  }, [sec.id, isHovered]);

  return (
    <div
      className={`pointer-events-none absolute left-full ml-4 top-1/2 -translate-y-1/2 w-[320px] rounded-2xl p-3 text-xs font-mono transition-all duration-300 z-50 shadow-2xl backdrop-blur-2xl flex flex-col gap-2 cursor-default ${
        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
      }`}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-accent)',
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.75)',
      }}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-1.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex items-center gap-2">
          <span
            className="px-2 py-0.5 rounded-md text-[10px] font-bold font-mono"
            style={{
              background: 'var(--color-surface-2)',
              color: 'var(--color-accent)',
              border: '1px solid var(--color-border-accent)',
            }}
          >
            {sec.number}
          </span>
          <span className="font-bold text-xs uppercase tracking-wider font-mono" style={{ color: 'var(--color-accent)' }}>
            {sec.label}
          </span>
        </div>

        {isActive && (
          <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            LIVE
          </span>
        )}
      </div>

      {/* Actual Scaled Live Viewport Window */}
      <div 
        className="w-full h-[185px] rounded-xl overflow-hidden relative shadow-inner"
        style={{
          background: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div 
          ref={previewRef}
          className="origin-top-left pointer-events-none select-none overflow-hidden"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${screenWidth}px`,
            height: `${Math.round(185 / scale)}px`,
          }}
        />
        
        {/* Subtle Bottom Fade Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
      </div>

      {/* Subtitle Footer */}
      <div className="text-[10px] text-zinc-400 text-left font-sans italic flex items-center justify-between pt-0.5">
        <span className="truncate max-w-[190px]">{sec.subtitle}</span>
        <span className="text-accent font-mono not-italic text-[9px] font-bold flex-shrink-0">Jump &rarr;</span>
      </div>
    </div>
  );
}

export default function FloatingSideControls({ personInfo }) {
  const [active, setActive] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.4;
      let cur = 0;
      SECTIONS.forEach((sec, idx) => {
        const el = document.getElementById(sec.id);
        if (el && mid >= el.offsetTop) cur = idx;
      });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialStyle = {
    ...iconBtn,
    position: 'relative',
  };

  return (
    <>
      {/* Left section nav bar with hover section previews */}
      <nav
        aria-label="Section Navigation"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start gap-3 pointer-events-auto"
      >
        {SECTIONS.map((sec, idx) => (
          <button 
            key={sec.id} 
            onClick={() => scrollTo(sec.id)}
            onMouseEnter={() => setHoveredId(sec.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative flex items-center cursor-pointer py-1.5 px-1"
            aria-label={`Scroll to ${sec.label}`}
          >
            {/* Nav Line Indicator */}
            <span
              className="h-[3px] transition-all duration-300 rounded-full group-hover:w-9"
              style={{
                width: active === idx ? '2.25rem' : '1.25rem',
                backgroundColor: active === idx ? 'var(--color-accent)' : 'var(--color-border)',
                boxShadow: active === idx ? '0 0 10px var(--color-accent)' : 'none',
              }}
            />

            {/* ACTUAL LIVE SECTION PREVIEW CARD ON HOVER */}
            <ActualSectionPreview 
              sec={sec} 
              isActive={active === idx}
              isHovered={hoveredId === sec.id}
            />
          </button>
        ))}
      </nav>

      {/* Right social dock */}
      <aside
        aria-label="Social Profiles"
        className="fixed right-6 bottom-10 z-40 hidden lg:flex flex-col items-end gap-3.5 pointer-events-auto"
      >
        {/* Get in Touch */}
        <button
          onClick={() => scrollTo('contact')}
          className="group relative flex items-center cursor-pointer"
          aria-label="Get in Touch"
        >
          <span
            className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-mono font-bold opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 flex items-center gap-1.5"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-accent)', color: 'var(--color-accent)', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
          >
            Get in Touch <Hand className="w-3.5 h-3.5" />
          </span>
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
            style={{ ...iconBtn, width: 44, height: 44, color: 'var(--color-accent)', borderColor: 'var(--color-border-accent)' }}
          >
            <Hand className="h-5 w-5 animate-pulse" />
          </span>
        </button>

        {/* GitHub */}
        {[
          { href: personInfo?.github || '#', label: 'GitHub Profile', icon: <GithubIcon className="h-4 w-4" /> },
          { href: personInfo?.linkedin || '#', label: 'LinkedIn', icon: <LinkedinIcon className="h-4 w-4" /> },
          { href: `mailto:${personInfo?.email}`, label: personInfo?.email, icon: <Mail className="h-4 w-4" /> },
        ].map(({ href, label, icon }) => (
          <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer" className="group relative flex items-center" aria-label={label}>
            <span
              className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg px-3 py-1 text-[11px] font-mono opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            >
              {label}
            </span>
            <span
              className="transition-all duration-300 group-hover:-translate-x-1 group-hover:scale-110"
              style={iconBtn}
            >
              {icon}
            </span>
          </a>
        ))}
      </aside>
    </>
  );
}
