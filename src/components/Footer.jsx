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

  const name = personInfo.name || 'Mahmud Hasan Ratul';
  const title = personInfo.title || personInfo.role || 'Full-Stack Developer & AI Automation Engineer';
  const tagline = personInfo.tagline || 'Architecting high-throughput full-stack web platforms, low-latency Edge AI hardware systems, and enterprise RAG search engines.';

  return (
    <footer
      className="pt-8 pb-24 md:py-12 relative z-10 text-xs font-mono"
      style={{ borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-3)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* TOP: 3-column */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-6" style={{ borderBottom: '1px solid var(--color-border)' }}>

          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center glass-button">
                <Terminal className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
              </div>
              <div>
                <span className="text-base font-bold font-sans block" style={{ color: 'var(--color-text)' }}>
                  {name}
                </span>
                <span className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>
                  {title}
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed font-sans max-w-sm" style={{ color: 'var(--color-text-muted)' }}>
              {tagline}
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)', cursor: 'pointer' }}
                aria-label="Back to top"
              >
                Back to Top
                <ArrowUp className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* BOTTOM: Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
          <div>
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Ratul-NotFound" target="_blank" rel="noopener noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
              <GithubIcon className="w-3.5 h-3.5 fill-current" /> GitHub
            </a>
            <a href="https://linkedin.com/in/ratul-notfound" target="_blank" rel="noopener noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
              <LinkedinIcon className="w-3.5 h-3.5 fill-current" /> LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
