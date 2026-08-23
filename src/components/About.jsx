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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const imageVariants = {
  hidden: { opacity: 0, x: -35, scale: 0.92 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
  }
};

const statVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
  })
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function About({ personInfo = {}, stats = [], education = [] }) {
  const edu = (education && education.length > 0) ? education[0] : {
    degree: 'B.Sc. in Computer Science & Engineering',
    institution: 'Daffodil International University (DIU)',
    period: '2021 - Present',
    cgpa: '3.85 / 4.00',
  };

  const name = personInfo.name || 'Mahmud Hasan Ratul';
  const role = personInfo.title || personInfo.role || 'Full-Stack Developer & AI Automation Engineer';
  const location = personInfo.location || 'Savar, Dhaka, BD';
  const status = personInfo.status || personInfo.availability || 'Available for Roles';
  const avatar = personInfo.avatar || personInfo.avatar_url || '/images/profile/Profile Pic Without BG.png';
  
  const bioText = personInfo.about || personInfo.bio || 
    "B.Sc in CSE at Daffodil International University. Specializing in Next.js production platforms, RAG document search engines, and embedded Edge AI deployments.";

  const headline = personInfo.aboutHeadline || 
    "Architecting high-performance web systems and autonomous AI workflows.";

  // Dynamic stats / metrics from DB or computed defaults
  const metrics = (stats && stats.length >= 3) ? [
    { num: stats[0].value || '3.85', label: stats[0].label || 'CGPA', sub: stats[0].description || `${edu.institution}`, icon: GraduationCap },
    { num: stats[1].value || 'VP', label: stats[1].label || 'Leadership', sub: stats[1].description || 'DIU Computer Programming Club', icon: Award },
    { num: stats[2].value || '10+', label: stats[2].label || 'Contests', sub: stats[2].description || 'National Events & Hackathons', icon: Cpu },
  ] : [
    { num: edu.cgpa ? `CGPA ${edu.cgpa.split('/')[0].trim()}` : '3.85', label: 'Academic', sub: edu.institution || 'Daffodil International University', icon: GraduationCap },
    { num: 'VP', label: 'Leadership', sub: 'DIU Computer Programming Club (DIUCPC)', icon: Award },
    { num: '10+', label: 'Contests', sub: 'National Events & Hackathons', icon: Cpu },
  ];

  // Dynamic skill pills from DB personInfo.skills or defaults
  const coreStack = Array.isArray(personInfo.skills) && personInfo.skills.length > 0
    ? personInfo.skills
    : ['Next.js 14', 'React', 'TypeScript', 'Python', 'LangChain & RAG', 'Edge AI / TinyML', 'Tailwind CSS'];

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

        {/* ── High-Impact Creative Editorial Spread with Spring Entrance ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end mt-2">

          {/* ── LEFT: Dominant Floating Cutout Portrait (5 Cols) ── */}
          <motion.div 
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-5 relative flex flex-col items-center justify-end select-none"
          >
            {/* Ambient Cyan/Purple Aura */}
            <div 
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[300px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-30"
              style={{
                background: 'radial-gradient(circle, var(--color-accent) 0%, rgba(168,85,247,0.4) 60%, transparent 80%)',
              }}
            />

            {/* Large Floating Cutout Figure with Continuous Levitation */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-[340px] sm:max-w-[400px] h-[400px] sm:h-[480px] flex items-end justify-center"
            >
              <img
                src={avatar}
                alt={name}
                draggable={false}
                className="relative z-10 object-contain object-bottom w-full h-full pointer-events-none"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.9)) drop-shadow(0 0 35px rgba(56,189,248,0.25))',
                }}
              />
            </motion.div>

            {/* Grounded Status Accent */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full pt-2.5 flex items-center justify-between font-mono text-[11px] text-zinc-400 border-t" 
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{status}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>{location}</span>
              </span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: High-Impact Minimal Typography & Big Metrics (7 Cols) ── */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >

            {/* Punchy Statement */}
            <div className="space-y-3">
              <motion.div variants={itemFadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400" style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.25)' }}>
                <Terminal className="w-3 h-3" />
                <span>{role}</span>
              </motion.div>

              <motion.h3 variants={itemFadeUp} className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-white">
                {headline}
              </motion.h3>

              <motion.p variants={itemFadeUp} className="font-sans text-sm sm:text-base leading-relaxed text-zinc-300 max-w-xl">
                {bioText}
              </motion.p>
            </div>

            {/* Big Editorial Impact Metrics */}
            <motion.div variants={itemFadeUp} className="grid grid-cols-3 gap-3 sm:gap-4 py-2 border-t border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              {metrics.map((m, i) => (
                <motion.div key={m.label} custom={i} variants={statVariants} className="space-y-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono leading-none text-white tracking-tight">
                    {m.num}
                  </div>
                  <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>
                    {m.label}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-sans text-zinc-400 leading-tight">
                    {m.sub}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Sleek Skill Pills with Staggered Entrance & Spring Physics */}
            <motion.div variants={itemFadeUp} className="flex flex-wrap gap-2 pt-1">
              {coreStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  custom={i}
                  variants={pillVariants}
                  whileHover={{ y: -3, scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-shadow cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

          </motion.div>

        </div>

      </div>
    </SectionWrapper>
  );
}
