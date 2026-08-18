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
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <SectionHeader number="02" category="About Mahmud" title="Background &" highlight="Engineering Roots" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between items-center text-center space-y-5 group relative"
            style={card}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            {/* Top laser line */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} />

            <PhotoCircle src={personInfo.avatar || "/images/profile/Profile Pic Without BG.png"} alt={personInfo.name || "Mahmud Hasan Ratul"} />

            <div className="space-y-1">
              <h3 className="text-xl font-bold font-sans" style={{ color: 'var(--color-text)' }}>
                {personInfo.name || 'Mahmud Hasan Ratul'}
              </h3>
              <p className="text-xs font-mono font-bold" style={{ color: 'var(--color-accent)' }}>
                {personInfo.title || personInfo.role || 'Full-Stack & Edge AI Architect'}
              </p>
            </div>

            <div className="w-full flex items-center justify-between text-xs font-mono pt-3"
              style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
              <span className="flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
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
            className="lg:col-span-7 flex flex-col justify-between space-y-5 group relative"
            style={card}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-border-accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
          >
            <div className="absolute inset-x-0 top-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }} />

            {/* Bio */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 pb-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <Terminal className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <h3 className="text-lg font-bold font-sans" style={{ color: 'var(--color-text)' }}>Engineering Journey</h3>
              </div>
              <p className="text-sm leading-relaxed font-sans" style={{ color: 'var(--color-text-muted)' }}>
                {bioText}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Next.js 14 / React', 'Edge AI & TinyML', 'RAG Vector Search'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                    style={{ background: 'var(--color-surface-2)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="p-4 rounded-2xl space-y-2 font-mono"
              style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center justify-between pb-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                  <span className="text-xs font-bold font-sans" style={{ color: 'var(--color-text)' }}>Academic Foundation</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                  style={{ background: 'var(--color-surface-2)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>
                  CGPA {edu.cgpa || '3.85 / 4.00'}
                </span>
              </div>
              <h4 className="text-xs font-bold font-sans" style={{ color: 'var(--color-text)' }}>{edu.degree}</h4>
              <p className="text-[11px] font-semibold" style={{ color: 'var(--color-accent)' }}>
                {edu.institution} ({edu.period || '2021 - Present'})
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
