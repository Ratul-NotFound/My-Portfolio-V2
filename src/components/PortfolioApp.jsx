'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { getPortfolioData } from '@/lib/supabase';
import ScrollProgress from '@/components/ScrollProgress';
import IntroLoader from '@/components/IntroLoader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

// ── Lazy-load ALL below-fold sections — code-split, parsed only when needed ──
// This cuts initial JS parse time significantly on low-end devices
const About      = dynamic(() => import('@/components/About'),      { ssr: false });
const TechStack  = dynamic(() => import('@/components/TechStack'),  { ssr: false });
const Projects   = dynamic(() => import('@/components/Projects'),   { ssr: false });
const Research   = dynamic(() => import('@/components/Research'),   { ssr: false });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });
const Activities = dynamic(() => import('@/components/Activities'), { ssr: false });
const Contact    = dynamic(() => import('@/components/Contact'),    { ssr: false });
const Footer     = dynamic(() => import('@/components/Footer'),     { ssr: false });

// Defer non-critical floating widgets to reduce initial payload and CPU workload
const FloatingSideControls = dynamic(() => import('@/components/FloatingSideControls'), { ssr: false });
const AIAssistant = dynamic(() => import('@/components/ai/AIAssistant'), { ssr: false });

export default function PortfolioApp({ initialData }) {
  const [data, setData] = useState(initialData || {});

  useEffect(() => {
    // Reset scroll to top on fresh reload if no specific anchor hash is present
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    }

    // Client-side instant synchronization with Supabase or LocalStorage cache
    getPortfolioData().then((freshData) => {
      if (freshData) {
        setData(freshData);
      }
    }).catch(err => {
      console.warn("Portfolio data sync check:", err);
    });
  }, []);

  return (
    <main className="relative min-h-screen w-full max-w-full overflow-x-hidden">
      {/* Intro Tile Curtain Loader */}
      <IntroLoader />

      {/* Interactive Portfolio AI Assistant Floating Widget */}
      <AIAssistant data={data} />

      {/* Scroll Progress Bar & Floating Side Indicator */}
      <ScrollProgress />

      {/* Floating Side Controls */}
      <FloatingSideControls personInfo={data.personInfo} />

      {/* Glassmorphic Navbar */}
      <Navbar personInfo={data.personInfo} />

      {/* 1. Hero Section */}
      <Hero personInfo={data.personInfo} />

      {/* 2. About Me Section */}
      <About
        personInfo={data.personInfo}
        stats={data.stats}
        education={data.education}
      />

      {/* 3. Tech Stack & Skills Section */}
      <TechStack
        categories={data.techCategories}
        skills={data.techSkills}
        projects={data.projects}
      />

      {/* 4. Featured Projects Section */}
      <Projects 
        projects={data.projects}
        techSkills={data.techSkills}
      />

      {/* 5. Research & Academic Achievements Section */}
      <Research researchPapers={data.researchPapers} />

      {/* 6. Work Experience & Leadership Section */}
      <Experience experiences={data.experiences} />

      {/* 7. Extracurricular Activities Section */}
      <Activities activities={data.activities} />

      {/* 8. Contact Section */}
      <Contact personInfo={data.personInfo} />

      {/* 9. Footer */}
      <Footer personInfo={data.personInfo} />
    </main>
  );
}
