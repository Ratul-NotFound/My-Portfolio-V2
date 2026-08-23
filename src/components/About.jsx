'use client';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Terminal, 
  Award, 
  MapPin, 
  Sparkles,
  ArrowUpRight,
  Code2,
  Cpu,
  Layers
} from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';

export default function About({ personInfo = {}, stats, education }) {
  const edu = (education && education.length > 0) ? education[0] : {
    degree: 'B.Sc. in Computer Science & Engineering',
    institution: 'Daffodil International University (DIU)',
    period: '2021 - Present',
    cgpa: '3.85 / 4.00',
  };

  const name = personInfo.name || 'Mahmud Hasan Ratul';

  const metrics = [
    { num: '3.85', label: 'CGPA', sub: 'DIU B.Sc in CSE', icon: GraduationCap, color: 'text-sky-400', border: 'rgba(56,189,248,0.3)' },
    { num: 'VP', label: 'Leadership', sub: 'DIU Computer Programming Club', icon: Award, color: 'text-purple-400', border: 'rgba(168,85,247,0.3)' },
    { num: '10+', label: 'Contests', sub: 'National Events & Hackathons', icon: Cpu, color: 'text-emerald-400', border: 'rgba(34,197,94,0.3)' },
  ];

  const coreStack = [
    'Next.js 14', 'React', 'TypeScript', 'Python', 'LangChain & RAG', 'Edge AI', 'Tailwind'
  ];

  return (
    <SectionWrapper id="about" variant="flip-left">
      <div className="w-full relative z-10" style={{ maxWidth: 'var(--container-inner)', margin: '0 auto' }}>
        
        {/* Section Header */}
        <SectionHeader 
          number="02" 
          category="Biography & Profile" 
          title="Background &" 
          highlight="Engineering Roots" 
        />

        {/* ── High-Impact Creative Editorial Spread ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mt-2">

          {/* ── LEFT: Dominant Floating Cutout Portrait (5 Cols) ── */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-end select-none">
            
            {/* Ambient Cyan/Purple Aura */}
            <div 
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[300px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-30"
              style={{
                background: 'radial-gradient(circle, var(--color-accent) 0%, rgba(168,85,247,0.4) 60%, transparent 80%)',
              }}
            />

            {/* Large Floating Cutout Figure */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] h-[400px] sm:h-[480px] flex items-end justify-center"
            >
              <img
                src="/images/profile/Profile Pic Without BG.png"
                alt={name}
                draggable={false}
                className="relative z-10 object-contain object-bottom w-full h-full pointer-events-none"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.9)) drop-shadow(0 0 35px rgba(56,189,248,0.25))',
                }}
              />
            </motion.div>

            {/* Grounded Status Accent */}
            <div className="w-full pt-2.5 flex items-center justify-between font-mono text-[11px] text-zinc-400 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Roles</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-sky-400" />
                <span>Savar, Dhaka</span>
              </span>
            </div>
          </div>

          {/* ── RIGHT: High-Impact Minimal Typography & Big Metrics (7 Cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">

            {/* Punchy Statement */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400" style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)' }}>
                <Terminal className="w-3 h-3" />
                <span>Full-Stack & Applied AI</span>
              </div>

              <h3 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-white">
                Architecting high-performance web systems and <span style={{ color: 'var(--color-accent)' }}>autonomous AI workflows</span>.
              </h3>

              <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-300 max-w-xl">
                B.Sc in CSE at Daffodil International University. Specializing in Next.js production platforms, RAG document search engines, and embedded Edge AI deployments.
              </p>
            </div>

            {/* Big Editorial Impact Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 py-2 border-t border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              {metrics.map((m) => (
                <div key={m.label} className="space-y-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono leading-none text-white tracking-tight">
                    {m.num}
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>
                    {m.label}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-sans text-zinc-400 leading-tight">
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Sleek Skill Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {coreStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>
    </SectionWrapper>
  );
}
