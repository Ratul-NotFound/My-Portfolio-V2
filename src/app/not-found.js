import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6" style={{ background: 'var(--color-bg, #08090D)', color: 'var(--color-text, #fff)' }}>
      <h1 className="text-6xl font-black font-mono mb-4 text-sky-400">404</h1>
      <h2 className="text-xl font-bold font-sans mb-2">Page Not Found</h2>
      <p className="text-sm font-sans text-zinc-400 mb-6 max-w-md">The page you are looking for does not exist or has been moved.</p>
      <Link 
        href="/"
        className="px-5 py-2.5 rounded-xl font-bold font-mono text-xs bg-sky-400 text-black hover:opacity-90 transition-opacity"
      >
        Return Home
      </Link>
    </div>
  );
}
