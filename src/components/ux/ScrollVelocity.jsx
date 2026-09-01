'use client';

export default function ScrollVelocity({
  text = "FULL-STACK DEVELOPER // AI & AUTOMATION // CLOUD & WEB PLATFORMS // DIU LEADER // NEXT.JS //",
  className = ""
}) {
  const repeated = `${text}   ${text}   ${text}   ${text}   `;

  return (
    <div
      className={`overflow-hidden whitespace-nowrap flex flex-nowrap py-3 backdrop-blur-md marquee-container ${className}`}
      style={{
        background: 'rgba(56, 189, 248, 0.03)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        className="marquee-track marquee-track--animate flex flex-nowrap whitespace-nowrap text-xs font-mono font-bold tracking-widest uppercase"
        style={{ color: 'var(--color-accent)' }}
        aria-hidden="true"
      >
        <span className="pr-8">{repeated}</span>
        <span className="pr-8">{repeated}</span>
      </div>
    </div>
  );
}
