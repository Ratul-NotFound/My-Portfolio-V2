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

export const revalidate = 60; // Revalidate dynamic data every 60 seconds

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <main className="relative min-h-screen">
      {/* Intro Tile Curtain Loader */}
      <IntroLoader />

      {/* Scroll Progress Bar & Floating Side Indicator */}
      <ScrollProgress />

      {/* Floating Side Controls (Left section lines + Right social dock with tooltips) */}
      <FloatingSideControls personInfo={data.personInfo} />

      {/* Glassmorphic Navbar */}
      <Navbar personInfo={data.personInfo} />

      {/* 1. Hero Section with 3D Canvas */}
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
