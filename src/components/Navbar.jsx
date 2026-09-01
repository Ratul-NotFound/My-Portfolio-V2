'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Terminal, Download, Menu, X, User, Layers, Cpu, Briefcase, Mail, Award, BookOpen } from 'lucide-react';
import ThemeToggle from './ux/ThemeToggle';
import { downloadResumeFile } from '@/lib/downloadHelper';

const navItems = [
  { name: 'Home',       path: '/',           id: 'hero',       icon: Home      },
  { name: 'About',      path: '/about',      id: 'about',      icon: User      },
  { name: 'Skills',     path: '/skills',     id: 'skills',     icon: Layers    },
  { name: 'Projects',   path: '/projects',   id: 'projects',   icon: Cpu       },
  { name: 'Research',   path: '/research',   id: 'research',   icon: BookOpen  },
  { name: 'Experience', path: '/experience', id: 'experience', icon: Briefcase },
  { name: 'Activities', path: '/activities', id: 'activities', icon: Award     },
  { name: 'Contact',    path: '/contact',    id: 'contact',    icon: Mail      },
];

export default function Navbar({ personInfo = {} }) {
  const pathname = usePathname();
  const isHome = pathname === '/' || !pathname;

  const [scrolled, setScrolled]           = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const brandName = personInfo.name ? personInfo.name.split(' ').pop().toUpperCase() : 'RATUL';
  const resumeLink = personInfo.resumeUrl || '/Mahmud_Hasan_Ratul_CV.pdf';

  useEffect(() => {
    if (!isHome) return;
    let rafId = null;

    // Cache section offset positions — calculated on resize, not on every scroll tick
    let sectionPositions = [];
    const measure = () => {
      sectionPositions = navItems.map(item => {
        const el = document.getElementById(item.id);
        return {
          id: item.id,
          top: el ? el.offsetTop : 0,
          bottom: el ? el.offsetTop + el.offsetHeight : 0
        };
      });
    };
    measure();
    window.addEventListener('resize', measure, { passive: true });

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        setScrolled(scrollY > 40);

        const checkY = scrollY + 200;
        for (const sec of sectionPositions) {
          if (checkY >= sec.top && checkY <= sec.bottom) {
            setActiveSection(sec.id);
            break;
          }
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHome]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        paddingTop:    scrolled || !isHome ? '0.625rem' : '1rem',
        paddingBottom: scrolled || !isHome ? '0.625rem' : '1rem',
        background:    scrolled || !isHome ? 'var(--glass-panel-bg)' : 'transparent',
        backdropFilter: scrolled || !isHome ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled || !isHome ? 'blur(16px)' : 'none',
        borderBottom:  scrolled || !isHome ? '1px solid var(--color-border)' : 'none',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between min-h-[44px]">

        {/* LEFT ZONE: Brand Logo & Name */}
        <div className="flex items-center justify-start z-10 min-w-0">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center glass-button transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
              <Terminal className="w-4 h-4" style={{ color: 'var(--color-text)' }} />
            </div>
            <span className="font-mono text-sm font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>
              {brandName}
            </span>
          </Link>
        </div>

        {/* CENTER ZONE: 100% Absolute Geometric Center on Desktop */}
        <div className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
          <nav className="flex items-center gap-1 glass-panel px-3 py-1.5 rounded-full shadow-lg">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.path || (isHome && activeSection === item.id);

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className="relative px-2.5 2xl:px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap select-none"
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
                  <Icon className="w-3.5 h-3.5 relative z-10 shrink-0 hidden 2xl:block" />
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* RIGHT ZONE: Controls (ThemeToggle + CV Button + Mobile Menu) */}
        <div className="flex items-center gap-2 sm:gap-3 z-10 shrink-0">
          {/* Theme Toggle - Always visible */}
          <ThemeToggle />

          {/* CV Button - Visible on sm screens and up */}
          <button
            type="button"
            onClick={() => downloadResumeFile(resumeLink, 'Mahmud_Hasan_Ratul_Resume.pdf')}
            className="hidden sm:flex glass-button px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-semibold items-center gap-2 transition-all hover:scale-105 cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
            <span className="hidden md:inline">CV / Resume</span>
            <span className="md:hidden">CV</span>
          </button>

          {/* Mobile / Tablet Menu Button - Strictly visible ONLY on screens < 1280px */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(o => !o)}
            className="xl:hidden flex items-center justify-center w-10 h-10 glass-button rounded-xl focus:outline-none touch-target-exempt cursor-pointer shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen
              ? <X className="w-5 h-5" style={{ color: 'var(--color-text)' }} />
              : <Menu className="w-5 h-5" style={{ color: 'var(--color-text)' }} />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Drawer (< 1280px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="xl:hidden overflow-hidden px-4 pt-3 pb-6 mt-2 max-w-7xl mx-auto"
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
                const isActive = pathname === item.path || (isHome && activeSection === item.id);

                return (
                  <Link
                    key={item.name}
                    href={item.path}
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
                  </Link>
                );
              })}
            </div>

            {/* CV Download button inside mobile drawer for quick access */}
            <div className="pt-3 mt-2 border-t border-theme">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  downloadResumeFile(resumeLink, 'Mahmud_Hasan_Ratul_Resume.pdf');
                }}
                className="w-full py-2.5 rounded-xl glass-button text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <span>Download CV / Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
