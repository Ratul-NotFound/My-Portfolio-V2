'use client';
import { useState, useEffect } from 'react';
import { ArrowUp, Terminal, Clock } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import Magnetic from './ux/Magnetic';

const NAV_LINKS = [
  { id: 'hero',       label: 'Home' },
  { id: 'about',      label: 'About' },
  { id: 'tech-stack', label: 'Skills' },
  { id: 'projects',   label: 'Projects' },
  { id: 'research',   label: 'Research' },
  { id: 'experience', label: 'Experience' },
  { id: 'activities', label: 'Activities' },
  { id: 'contact',    label: 'Contact' },
];

export default function Footer({ personInfo = {} }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => setTime(
      new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="py-12 relative z-10 text-xs font-mono"
      style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-3)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* TOP: 3-column */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8" style={{ borderBottom: '1px solid var(--color-border)' }}>

          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center glass-button">
                <Terminal className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
              </div>
              <div>
                <span className="text-base font-bold font-sans block" style={{ color: 'var(--color-text)' }}>
                  {personInfo.name || 'Mahmud Hasan Ratul'}
                </span>
                <span className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>
                  Full-Stack &amp; Edge AI Architect
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed font-sans max-w-sm" style={{ color: 'var(--color-text-muted)' }}>
              Architecting high-throughput full-stack web platforms, low-latency Edge AI hardware systems, and enterprise RAG search engines.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold"
              style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border-accent)', color: 'var(--color-accent)' }}>
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--color-accent)' }} />
              Available for Technical Roles &amp; AI Research
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-4 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider font-sans block" style={{ color: 'var(--color-text)' }}>
              Quick Navigation
            </span>
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map(link => (
                <button key={link.id} onClick={() => scrollTo(link.id)}
                  className="text-xs font-semibold text-left py-0.5 transition-colors"
                  style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
                >
                  → {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clock + Top */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: 'var(--color-text-muted)' }}>
                LOCAL TIME (DHAKA, BST)
              </span>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
                <Clock className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
                {time || '12:00:00 AM'}
              </div>
            </div>
            <Magnetic>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-4 py-2 rounded-2xl font-mono font-bold text-xs flex items-center gap-2 cursor-pointer transition-opacity"
                style={{ background: 'var(--color-accent)', color: '#000' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Back To Top <ArrowUp className="w-4 h-4" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* BOTTOM: copyright */}
        <div className="flex flex-wrap items-center justify-between gap-4" style={{ color: 'var(--color-text-muted)' }}>
          <p>© {new Date().getFullYear()} {personInfo.name || 'Mahmud Hasan Ratul'}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Engineered with</span>
            {['Next.js 14', 'Three.js', 'Tailwind CSS', 'Supabase'].map((tech, i, arr) => (
              <span key={tech}>
                <span style={{ color: i === arr.length - 1 ? 'var(--color-accent)' : 'var(--color-text)', fontWeight: 700 }}>{tech}</span>
                {i < arr.length - 1 && <span className="mx-1">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
