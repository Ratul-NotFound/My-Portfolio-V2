'use client';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Terminal } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import PhotoCircle from './ux/PhotoCircle';

const card = {
  borderRadius: '1.5rem',
  padding: '1.5rem',
  border: '1px solid var(--color-border)',
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  transition: 'border-color 0.3s ease',
};

export default function About({ personInfo = {}, stats, education }) {
  const edu = (education && education.length > 0) ? education[0] : {
    degree: 'B.Sc. in Computer Science & Engineering',
    institution: 'Daffodil International University (DIU)',
    period: '2021 - Present',
    cgpa: '3.85 / 4.00',
  };

  const bioText = personInfo.about || personInfo.bio || 
    "I specialize in architecting high-throughput full-stack web applications and low-latency Edge AI hardware systems. My work spans building modern React/Next.js production platforms, engineering RAG document vector search engines, and deploying quantized neural networks onto microcontrollers.";

  return (
    <SectionWrapper id="about" variant="flip-left">
      <div className="w-full" style={{ maxWidth: 'var(--container-inner)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
        <SectionHeader number="02" category="About Mahmud" title="Background &" highlight="Engineering Roots" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))', gap: 'var(--gap-md)', alignItems: 'stretch' }}>

          {/* Left: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="flex flex-col justify-between items-center text-center group relative rounded-3xl"
            style={{ ...card, padding: 'var(--card-p)', gap: 'var(--gap-sm)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            {/* Top laser line */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} />

            <PhotoCircle src={personInfo.avatar || "/images/profile/Profile Pic Without BG.png"} alt={personInfo.name || "Mahmud Hasan Ratul"} />

            <div className="space-y-0.5">
              <h3 className="font-bold font-sans" style={{ color: 'var(--color-text)', fontSize: 'var(--text-xl)' }}>
                {personInfo.name || 'Mahmud Hasan Ratul'}
              </h3>
              <p className="font-mono font-bold" style={{ color: 'var(--color-accent)', fontSize: 'var(--text-sm)' }}>
                {personInfo.title || personInfo.role || 'Full-Stack Developer & AI Automation Engineer'}
              </p>
            </div>

            <div className="w-full flex items-center justify-between font-mono"
              style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)', paddingTop: 'clamp(0.625rem, 1.2vw, 1rem)', fontSize: 'var(--text-xs)' }}>
              <span className="flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                <MapPin style={{ width: 'clamp(0.875rem, 1.2vw, 1rem)', height: 'clamp(0.875rem, 1.2vw, 1rem)', color: 'var(--color-accent)' }} />
                {personInfo.location || 'Savar, Dhaka, BD'}
              </span>
              <span className="font-bold" style={{ color: 'var(--color-accent)' }}>
                {personInfo.tagline ? 'Open for Roles' : 'VP @ DIUCPC'}
              </span>
            </div>
          </motion.div>

          {/* Right: Bio + Education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-between group relative rounded-3xl"
            style={{ ...card, padding: 'var(--card-p)', gap: 'var(--gap-md)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            <div className="absolute inset-x-0 top-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} />

            {/* Bio */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 pb-2 sm:pb-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--color-accent)' }} />
                <h3 className="text-base sm:text-lg md:text-xl font-bold font-sans" style={{ color: 'var(--color-text)' }}>Engineering Journey</h3>
              </div>
              <p className="leading-relaxed font-sans" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                {bioText}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                {['Next.js 14 / React', 'Edge AI & TinyML', 'RAG Vector Search'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs md:text-sm font-mono font-bold"
                    style={{ background: 'var(--color-surface-2)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="p-3.5 sm:p-4 lg:p-5 rounded-2xl space-y-1.5 sm:space-y-2 font-mono"
              style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center justify-between pb-1.5 sm:pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 sm:w-4.5 sm:h-4.5" style={{ color: 'var(--color-accent)' }} />
                  <span className="text-xs sm:text-sm font-bold font-sans" style={{ color: 'var(--color-text)' }}>Academic Foundation</span>
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm font-bold px-2.5 py-0.5 rounded-full"
                  style={{ background: 'var(--color-surface-2)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                  CGPA {edu.cgpa || '3.85 / 4.00'}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm md:text-base font-bold font-sans" style={{ color: 'var(--color-text)' }}>{edu.degree}</h4>
              <p className="text-[11px] sm:text-xs md:text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
                {edu.institution} ({edu.period || '2021 - Present'})
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
