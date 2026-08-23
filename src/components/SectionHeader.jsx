'use client';
import { motion } from 'framer-motion';

export default function SectionHeader({ number = '01', category = '', title = '', highlight = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mx-auto glass-panel"
      style={{ 
        maxWidth: 'var(--container-inner)',
        width: '100%',
        marginBottom: 'var(--gap-lg)',
        paddingTop: 'var(--gap-sm)',
        borderRadius: '9999px',
        background: 'transparent',
        border: 'none',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      }}
    >
      {/* Category Pill */}
      <div
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full font-mono glass-panel"
        style={{ 
          fontSize: 'var(--text-xs)',
          border: '1px solid var(--color-border-strong, rgba(255,255,255,0.12))',
          boxShadow: '0 0 20px rgba(56, 189, 248, 0.12)',
        }}
      >
        <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{number} {"//"}</span>
        <span style={{ color: 'var(--color-text)', fontWeight: 600 }} className="uppercase tracking-wider">
          {category}
        </span>
      </div>

      {/* Separator line */}
      <div className="flex items-center justify-center gap-3" style={{ padding: 'clamp(0.35rem, 0.6vw, 0.65rem) 0' }}>
        <div className="h-[1px]" style={{ width: 'clamp(3rem, 8vw, 7rem)', background: 'linear-gradient(to right, transparent, var(--color-accent))' }} />
        <div className="h-1.5 w-1.5 rounded-full shadow-sm" style={{ backgroundColor: 'var(--color-accent)', boxShadow: '0 0 8px var(--color-accent)' }} />
        <div className="h-[1px]" style={{ width: 'clamp(3rem, 8vw, 7rem)', background: 'linear-gradient(to left, transparent, var(--color-accent))' }} />
      </div>

      {/* Main Title */}
      <h2
        className="font-black tracking-tight leading-tight"
        style={{ color: 'var(--color-text)', fontSize: 'var(--text-5xl)' }}
      >
        {title}{' '}
        {highlight && (
          <span style={{ color: 'var(--color-accent)' }}>
            {highlight}
          </span>
        )}
      </h2>
    </motion.div>
  );
}
