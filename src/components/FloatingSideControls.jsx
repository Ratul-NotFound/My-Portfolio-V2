'use client';
import { useEffect, useState } from 'react';
import { Mail, Hand } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const SECTIONS = [
  { id: 'hero',       label: 'Home' },
  { id: 'about',      label: 'About' },
  { id: 'tech-stack', label: 'Skills' },
  { id: 'projects',   label: 'Projects' },
  { id: 'research',   label: 'Research' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact' },
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

export default function FloatingSideControls({ personInfo }) {
  const [active, setActive] = useState(0);

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
      {/* Left nav bar */}
      <nav
        aria-label="Section Navigation"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-start gap-3 pointer-events-auto"
      >
        {SECTIONS.map((sec, idx) => (
          <button key={sec.id} onClick={() => scrollTo(sec.id)}
            className="group flex h-4 w-12 items-center cursor-pointer py-1"
            aria-label={`Scroll to ${sec.label}`}
          >
            <span
              className="h-[2px] transition-all duration-300 rounded-full"
              style={{
                width: active === idx ? '2.25rem' : '1.5rem',
                backgroundColor: active === idx ? 'var(--color-accent)' : 'var(--color-border)',
              }}
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
