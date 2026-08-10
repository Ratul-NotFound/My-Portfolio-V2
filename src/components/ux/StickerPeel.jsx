'use client';

import { motion } from 'framer-motion';

export default function StickerPeel({ text, icon: Icon, color = 'var(--color-accent)', className = '' }) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -60, right: 60, top: -40, bottom: 40 }}
      dragElastic={0.2}
      whileHover={{ scale: 1.08, rotate: 4, cursor: 'grab' }}
      whileTap={{ scale: 0.95, cursor: 'grabbing' }}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono select-none ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        background: 'var(--glass-bg)',
        border: '1px solid var(--color-border)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
      }}
    >
      {Icon && <Icon className="w-3.5 h-3.5" style={{ color }} />}
      <span style={{ color: 'var(--color-text)', fontWeight: 600, letterSpacing: '0.03em' }}>{text}</span>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
    </motion.div>
  );
}
