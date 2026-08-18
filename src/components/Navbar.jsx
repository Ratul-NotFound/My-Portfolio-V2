'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Download, Menu, X, User, Layers, Cpu, Briefcase, Mail, Award, BookOpen } from 'lucide-react';
import ThemeToggle from './ux/ThemeToggle';

const navItems = [
  { name: 'About',      href: '#about',      icon: User      },
  { name: 'Skills',     href: '#tech-stack',  icon: Layers    },
  { name: 'Projects',   href: '#projects',   icon: Cpu       },
  { name: 'Research',   href: '#research',   icon: BookOpen  },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Activities', href: '#activities', icon: Award     },
  { name: 'Contact',    href: '#contact',    icon: Mail      },
];

export default function Navbar({ personInfo }) {
  const [scrolled, setScrolled]           = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = navItems.map(i => i.href.slice(1));
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 220 && r.bottom >= 180) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        paddingTop:    scrolled ? '0.625rem' : '1rem',
        paddingBottom: scrolled ? '0.625rem' : '1rem',
        background:    scrolled ? 'var(--glass-panel-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom:  scrolled ? '1px solid var(--color-border)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">

        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center glass-button transition-transform duration-300 group-hover:scale-105">
            <Terminal className="w-4 h-4" style={{ color: 'var(--color-text)' }} />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
              RATUL
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Full-Stack &amp; AI
            </span>
          </div>
        </a>

        {/* Desktop Nav (Visible on lg screens 1024px+) */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 glass-panel px-2.5 py-1.5 rounded-full">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.name}
                href={item.href}
                className="relative px-2.5 xl:px-3 py-1.5 rounded-full text-[11px] xl:text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap"
                style={{
                  color:      isActive ? '#000' : 'var(--color-text-muted)',
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5 relative z-10 shrink-0" />
                <span className="relative z-10">{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Controls (ThemeToggle + CV Button + Hamburger) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme Toggle - Always visible */}
          <ThemeToggle />

          {/* CV Button - Visible on sm screens and up */}
          <a
            href="/Mahmud_Hasan_Ratul_CV.tex"
            download
            className="hidden sm:flex glass-button px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold items-center gap-2 transition-all hover:scale-105"
          >
            <Download className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
            <span className="hidden md:inline">CV / Resume</span>
            <span className="md:hidden">CV</span>
          </a>

          {/* Mobile / Tablet Menu Button - Visible on screens < 1024px */}
          <button
            onClick={() => setMobileMenuOpen(o => !o)}
            className="lg:hidden glass-button p-2 rounded-xl focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen
              ? <X className="w-5 h-5" style={{ color: 'var(--color-text)' }} />
              : <Menu className="w-5 h-5" style={{ color: 'var(--color-text)' }} />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Drawer (< 1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden px-4 pt-3 pb-6 mt-2 max-w-7xl mx-auto"
            style={{
              borderTop: '1px solid var(--color-border)',
              background: 'var(--glass-panel-bg)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: isActive ? 'var(--color-surface-2)' : 'transparent',
                      color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                      border: isActive ? '1px solid var(--color-border-accent)' : '1px solid transparent',
                    }}
                  >
                    <Icon className="w-4 h-4 shrink-0" style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-text-faint)' }} />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>

            {/* CV Download button inside mobile drawer for quick access */}
            <div className="pt-3 mt-2 border-t border-theme">
              <a
                href="/Mahmud_Hasan_Ratul_CV.tex"
                download
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl glass-button text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <span>Download CV / Resume</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
