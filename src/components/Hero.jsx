'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import dynamic from 'next/dynamic';
const HeroCanvas = dynamic(() => import('./three/HeroCanvas'), { ssr: false });
import StrokeText from './StrokeText';
import SectionWrapper from './SectionWrapper';
import WordRotate from './ux/WordRotate';
import Magnetic from './ux/Magnetic';

const containerVariants = {
  hidden: { opacity: 0, rotateX: 16, y: 40, scale: 0.92 },
  visible: {
    opacity: 1, rotateX: 0, y: 0, scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.14, delayChildren: 1.1 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
};

export default function Hero({ personInfo = {} }) {
  const [fontSize, setFontSize] = useState(120);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 380) setFontSize(42);
      else if (w < 480) setFontSize(52);
      else if (w < 640) setFontSize(68);
      else if (w < 768) setFontSize(82);
      else if (w < 1024) setFontSize(96);
      else if (w < 1280) setFontSize(108);
      else if (w < 1600) setFontSize(118);
      else setFontSize(Math.min(140, Math.floor(w * 0.075)));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const resumeLink = personInfo.resumeUrl || '/Mahmud_Hasan_Ratul_CV.pdf';
  const tagline = personInfo.tagline || 'Building high-performance web systems, low-latency Edge AI nodes, and enterprise RAG document intelligence platforms.';
  const githubLink = personInfo.github || 'https://github.com/Ratul-NotFound';
  const linkedinLink = personInfo.linkedin || 'https://linkedin.com/in/ratul-notfound';
  const emailLink = personInfo.email ? `mailto:${personInfo.email}` : 'mailto:mhratul.dev@gmail.com';

  return (
    <SectionWrapper id="hero" variant="recede" className="min-h-[100svh]">
      {/* 3D Background Canvas */}
      <HeroCanvas />

      {/* Ambient Spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] blur-[120px] rounded-full pointer-events-none z-0 opacity-50 animate-pulse"
        style={{ backgroundColor: 'rgba(56,189,248,0.12)' }}
      />

      <motion.div className="w-full flex flex-col justify-center items-center relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-4 sm:py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full space-y-3 sm:space-y-5 lg:space-y-6"
        >
          {/* Status Pill */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel text-xs font-mono uppercase tracking-widest font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--color-accent)' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--color-accent)' }} />
              </span>
              <span style={{ color: 'var(--color-text)' }}>
                <WordRotate words={['Full Stack Developer', 'AI & Automation Engineer', 'Full-Stack Architect', 'DIUCPC VP Leader']} duration={2600} />
              </span>
            </div>
          </motion.div>

          {/* Animated Name */}
          <motion.div variants={itemVariants} className="w-full py-0.5 sm:py-2 flex justify-center">
            <StrokeText
              text={personInfo.name || 'Mahmud Hasan Ratul'}
              strokeColor="var(--color-accent)"
              fillColor="var(--color-text)"
              strokeWidth={fontSize < 70 ? 1 : 1.5}
              drawDuration={1.5}
              fillDelay={0.2}
              stagger={0.05}
              ease="power2.out"
              trigger="mount"
              fillMode="wipe"
              fontSize={fontSize}
              fontWeight={900}
              letterSpacing={fontSize < 70 ? -1 : -3}
              delay={1.15}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="pt-1 sm:pt-2">
            <p className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-sans" style={{ color: 'var(--color-text-muted)' }}>
              {tagline}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
            <Magnetic>
              <a
                href="#projects"
                className="w-full sm:w-auto px-7 py-3 rounded-2xl font-mono font-bold text-sm flex items-center justify-center gap-2 group cursor-pointer transition-all"
                style={{ background: 'var(--color-accent)', color: '#000', boxShadow: '0 0 25px rgba(56,189,248,0.35)' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="w-full sm:w-auto px-7 py-3 rounded-2xl glass-panel font-mono font-bold text-sm flex items-center justify-center gap-2 group cursor-pointer transition-all"
                style={{ color: 'var(--color-text)' }}
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-accent)' }} />
                <span>Download Resume</span>
              </a>
            </Magnetic>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            {[
              { href: githubLink, icon: <GithubIcon className="w-5 h-5 fill-current" />, label: 'GitHub' },
              { href: linkedinLink, icon: <LinkedinIcon className="w-5 h-5 fill-current" />, label: 'LinkedIn' },
              { href: emailLink, icon: <Mail className="w-5 h-5" />, label: 'Email' },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-button transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
