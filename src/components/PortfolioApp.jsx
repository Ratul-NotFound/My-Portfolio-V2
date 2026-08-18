'use client';

import { useState, useEffect } from 'react';
import { getPortfolioData } from '@/lib/supabase';
import ScrollProgress from '@/components/ScrollProgress';
import IntroLoader from '@/components/IntroLoader';
import FloatingSideControls from '@/components/FloatingSideControls';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import Research from '@/components/Research';
import Experience from '@/components/Experience';
import Activities from '@/components/Activities';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/ai/AIAssistant';

export default function PortfolioApp({ initialData }) {
  const [data, setData] = useState(initialData || {});

  useEffect(() => {
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
      />

      {/* 4. Featured Projects Section */}
      <Projects projects={data.projects} />

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
