'use client';
import { motion } from 'framer-motion';

export default function SectionHeader({ number = '01', category = '', title = '', highlight = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="text-center max-w-3xl mx-auto space-y-2 mb-6"
    >
      {/* Category Pill */}
      <div
        className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full text-xs font-mono glass-panel"
      >
        <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{number} {"//"}</span>
        <span style={{ color: 'var(--color-text)', fontWeight: 600 }} className="uppercase tracking-wider">
          {category}
        </span>
      </div>

      {/* Separator line */}
      <div className="flex items-center justify-center gap-4 py-1">
        <div className="h-[1px] w-16 sm:w-24" style={{ background: `linear-gradient(to right, transparent, var(--color-accent))` }} />
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
        <div className="h-[1px] w-16 sm:w-24" style={{ background: `linear-gradient(to left, transparent, var(--color-accent))` }} />
      </div>

      {/* Main Title */}
      <h2
        className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
        style={{ color: 'var(--color-text)' }}
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
