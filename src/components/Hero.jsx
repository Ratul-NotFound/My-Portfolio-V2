'use client';
import { useRef } from 'react';
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

export default function Hero({ personInfo }) {
  return (
    <SectionWrapper id="hero" variant="recede">
      {/* 3D Background Canvas */}
      <HeroCanvas />

      {/* Ambient Spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] blur-[120px] rounded-full pointer-events-none z-0 opacity-50 animate-pulse"
        style={{ backgroundColor: 'rgba(56,189,248,0.12)' }}
      />

      <motion.div className="w-full h-full flex flex-col justify-center items-center relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full space-y-6 sm:space-y-8 lg:space-y-10"
        >
          {/* Status Pill */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel text-xs font-mono uppercase tracking-widest font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--color-accent)' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--color-accent)' }} />
              </span>
              <span style={{ color: 'var(--color-text)' }}>
                <WordRotate words={['Full-Stack Architect', 'Edge AI Engineer', 'RAG Search Specialist', 'DIUCPC VP Leader']} duration={2600} />
              </span>
            </div>
          </motion.div>

          {/* Animated Name */}
          <motion.div variants={itemVariants} className="w-full py-2">
            <StrokeText
              text={personInfo?.name || 'Mahmud Hasan Ratul'}
              strokeColor="var(--color-accent)"
              fillColor="var(--color-text)"
              strokeWidth={1.5}
              drawDuration={1.5}
              fillDelay={0.2}
              stagger={0.05}
              ease="power2.out"
              trigger="mount"
              fillMode="wipe"
              fontSize={120}
              fontWeight={900}
              letterSpacing={-3}
              delay={1.15}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="pt-2">
            <p className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-sans" style={{ color: 'var(--color-text-muted)' }}>
              Building high-performance web systems, low-latency Edge AI nodes, and enterprise RAG document intelligence platforms.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Magnetic>
              <a
                href="#projects"
                className="px-7 py-3.5 rounded-2xl font-mono font-bold text-sm flex items-center gap-2 group cursor-pointer transition-all"
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
                href="/Mahmud_Hasan_Ratul_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-2xl glass-panel font-mono font-bold text-sm flex items-center gap-2 group cursor-pointer transition-all"
                style={{ color: 'var(--color-text)' }}
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-accent)' }} />
                <span>Download Resume</span>
              </a>
            </Magnetic>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 pt-4">
            {[
              { href: 'https://github.com/Ratul-NotFound', icon: <GithubIcon className="w-5 h-5 fill-current" />, label: 'GitHub' },
              { href: 'https://linkedin.com/in/ratul-notfound', icon: <LinkedinIcon className="w-5 h-5 fill-current" />, label: 'LinkedIn' },
              { href: 'mailto:mhratul.dev@gmail.com', icon: <Mail className="w-5 h-5" />, label: 'Email' },
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
