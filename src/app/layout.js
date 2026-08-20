import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import SmoothCursor from '@/components/ux/SmoothCursor';

export const metadata = {
  title: 'Mahmud Hasan Ratul — Full-Stack Developer & AI Automation Engineer',
  description: 'Executive Portfolio of Mahmud Hasan Ratul. Full-Stack Developer & AI Automation Engineer specializing in High-Performance Web Systems, Autonomous AI Workflows, and Scalable Cloud Architectures.',
  keywords: [
    'Mahmud Hasan Ratul',
    'Full-Stack Developer',
    'AI Automation Engineer',
    'Next.js 14',
    'React Developer',
    'AI Agent Workflows',
    'DIUCPC Vice President',
    'Full Stack Cloud Architect'
  ],
  authors: [{ name: 'Mahmud Hasan Ratul', url: 'https://github.com/ratul-notfound' }],
  openGraph: {
    title: 'Mahmud Hasan Ratul — Full-Stack Developer & AI Automation Engineer',
    description: 'Executive Portfolio of Mahmud Hasan Ratul. Architecting High-Performance Web Applications, Autonomous AI Workflows & Cloud Platforms.',
    url: 'https://github.com/ratul-notfound',
    siteName: 'Mahmud Hasan Ratul Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <SmoothCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
