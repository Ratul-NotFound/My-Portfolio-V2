-- ====================================================================
-- SUPABASE DATABASE SCHEMA FOR MAHMUD HASAN RATUL'S PORTFOLIO (V2)
-- Copy and paste this script into your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ====================================================================

-- 1. PERSON INFO TABLE (Profile, Bio, Social Links)
CREATE TABLE IF NOT EXISTS public.person_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Mahmud Hasan Ratul',
  title TEXT DEFAULT 'Full-Stack Software & Edge AI Engineer',
  role TEXT DEFAULT 'Full-Stack Software & Edge AI Engineer',
  tagline TEXT DEFAULT 'Building high-performance web systems, low-latency Edge AI nodes, and enterprise RAG document intelligence platforms.',
  about TEXT DEFAULT 'I specialize in architecting high-throughput full-stack web applications and low-latency Edge AI hardware systems. My work spans building modern React/Next.js production platforms, engineering RAG document vector search engines, and deploying quantized neural networks onto microcontrollers.',
  bio TEXT DEFAULT 'Full-Stack Software Engineer & Edge AI Researcher specializing in Next.js, React, Node.js, C++, and PyTorch.',
  email TEXT DEFAULT 'mhratul.dev@gmail.com',
  location TEXT DEFAULT 'Savar, Dhaka, Bangladesh',
  avatar TEXT DEFAULT '/images/profile/Profile Pic Without BG.png',
  resumeUrl TEXT DEFAULT '/Mahmud_Hasan_Ratul_CV.pdf',
  github TEXT DEFAULT 'https://github.com/Ratul-NotFound',
  linkedin TEXT DEFAULT 'https://linkedin.com/in/ratul-notfound',
  twitter TEXT DEFAULT 'https://twitter.com',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROJECTS TABLE (Featured Projects Showcase & Multi-Image Gallery)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Full-Stack Web App',
  status TEXT DEFAULT 'LIVE DEMO',
  description TEXT NOT NULL,
  longDesc TEXT,
  tech TEXT DEFAULT 'Next.js 14, React, Node.js, PostgreSQL',
  githubUrl TEXT DEFAULT 'https://github.com/Ratul-NotFound',
  liveUrl TEXT DEFAULT 'https://vercel.com',
  image TEXT DEFAULT '/images/projects/sipprq1.png',
  gallery TEXT DEFAULT '/images/projects/sipprq1.png',
  metrics TEXT DEFAULT '95+ Lighthouse Score | 120ms Latency',
  time TEXT DEFAULT 'Q3 2024',
  featured BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. WORK EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Internship',
  period TEXT NOT NULL DEFAULT '2023 - Present',
  startYear TEXT DEFAULT '2023',
  endYear TEXT DEFAULT 'Present',
  logo TEXT DEFAULT '/tech1.jpg',
  bullets TEXT DEFAULT 'Delivered 15+ production apps using Next.js and PostgreSQL.\nOptimized frontend performance achieving 95+ Lighthouse scores.',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXTRACURRICULAR & LEADERSHIP ACTIVITIES TABLE (With Photo Albums)
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'University Events',
  role TEXT NOT NULL DEFAULT 'Executive Member & Lead Organizer',
  year TEXT DEFAULT '2023 - Present',
  impact TEXT DEFAULT '500+ Donors Registered • 12 On-Campus Drives',
  stat TEXT DEFAULT '500+ Donors',
  tag TEXT DEFAULT 'Campus Leadership',
  img TEXT DEFAULT '/cpc1.jpg',
  gallery TEXT DEFAULT '/cpc1.jpg\n/tech2.JPG',
  "desc" TEXT DEFAULT 'Summary of event operations, leadership responsibilities, and key community milestones.',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TECH ARSENAL / SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.tech_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'frontend',
  level TEXT DEFAULT 'Expert',
  proficiency INT DEFAULT 90,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. HERO TELEMETRY STATS TABLE
CREATE TABLE IF NOT EXISTS public.stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. EDUCATION HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree TEXT NOT NULL DEFAULT 'B.Sc. in Computer Science & Engineering',
  institution TEXT NOT NULL DEFAULT 'Daffodil International University (DIU)',
  period TEXT DEFAULT '2021 - Present',
  cgpa TEXT DEFAULT '3.85 / 4.00',
  details TEXT DEFAULT 'Specializing in Intelligent Systems & High-Performance Web Architectures.',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. RESEARCH PAPERS TABLE
CREATE TABLE IF NOT EXISTS public.research_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  domain TEXT DEFAULT 'AgriTech & Environment 🌾',
  mlTech TEXT DEFAULT 'TinyML / Signal Processing',
  venue TEXT DEFAULT 'IEEE Edge AI (2024)',
  year TEXT DEFAULT '2024',
  abstract TEXT NOT NULL,
  pdfUrl TEXT DEFAULT '/research/paper1.pdf',
  doi TEXT DEFAULT '10.1109/IEEE.2024.1042',
  citation TEXT DEFAULT 'Ratul, M. H. et al. (2024).',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. MESSAGES INBOX TABLE (Contact Form Submissions)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES (Allow Read & Admin Write)
-- ====================================================================
ALTER TABLE public.person_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tech_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (prevents 42710 already exists error)
DROP POLICY IF EXISTS "Public All person_info" ON public.person_info;
DROP POLICY IF EXISTS "Public All projects" ON public.projects;
DROP POLICY IF EXISTS "Public All experiences" ON public.experiences;
DROP POLICY IF EXISTS "Public All activities" ON public.activities;
DROP POLICY IF EXISTS "Public All tech_skills" ON public.tech_skills;
DROP POLICY IF EXISTS "Public All stats" ON public.stats;
DROP POLICY IF EXISTS "Public All education" ON public.education;
DROP POLICY IF EXISTS "Public All research_papers" ON public.research_papers;
DROP POLICY IF EXISTS "Public All messages" ON public.messages;

-- Create Public All Policies
CREATE POLICY "Public All person_info" ON public.person_info FOR ALL USING (true);
CREATE POLICY "Public All projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Public All experiences" ON public.experiences FOR ALL USING (true);
CREATE POLICY "Public All activities" ON public.activities FOR ALL USING (true);
CREATE POLICY "Public All tech_skills" ON public.tech_skills FOR ALL USING (true);
CREATE POLICY "Public All stats" ON public.stats FOR ALL USING (true);
CREATE POLICY "Public All education" ON public.education FOR ALL USING (true);
CREATE POLICY "Public All research_papers" ON public.research_papers FOR ALL USING (true);
CREATE POLICY "Public All messages" ON public.messages FOR ALL USING (true);

-- ====================================================================
-- STORAGE BUCKET CREATION (For Image & Document Uploads)
-- ====================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Read Portfolio Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload Portfolio Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Portfolio Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete Portfolio Images" ON storage.objects;

CREATE POLICY "Public Read Portfolio Images" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-images');
CREATE POLICY "Public Upload Portfolio Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-images');
CREATE POLICY "Public Update Portfolio Images" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-images');
CREATE POLICY "Public Delete Portfolio Images" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio-images');

-- ====================================================================
-- INITIAL SEED DATA
-- ====================================================================
INSERT INTO public.person_info (name, title, tagline, email, location, avatar, resumeUrl, github, linkedin)
VALUES (
  'Mahmud Hasan Ratul',
  'Full-Stack & Edge AI Architect',
  'Building high-performance web systems, low-latency Edge AI nodes, and enterprise RAG document intelligence platforms.',
  'mhratul.dev@gmail.com',
  'Savar, Dhaka, Bangladesh',
  '/images/profile/Profile Pic Without BG.png',
  '/Mahmud_Hasan_Ratul_CV.pdf',
  'https://github.com/Ratul-NotFound',
  'https://linkedin.com/in/ratul-notfound'
) ON CONFLICT DO NOTHING;

INSERT INTO public.stats (label, value) VALUES
('Production Apps', '15+'),
('GitHub Commits', '1,400+'),
('Research Papers', '04'),
('Tech Stacks Mastered', '12+')
ON CONFLICT DO NOTHING;

INSERT INTO public.education (degree, institution, period, cgpa, details) VALUES
('B.Sc. in Computer Science & Engineering', 'Daffodil International University (DIU)', '2021 - Present', '3.85 / 4.00', 'Specializing in Intelligent Systems & High-Performance Distributed Architectures.')
ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, category, status, description, longDesc, tech, githubUrl, liveUrl, image, gallery, metrics, time, featured) VALUES
(
  'SIPPRQ - Next.js AI Prompt & Code Platform',
  'Full-Stack Web App',
  'LIVE DEMO',
  'Production AI prompt engineering platform with serverless API, dynamic code snippet generation, and vector RAG search.',
  'SIPPRQ is a high-performance web platform built with Next.js 14, React, TailwindCSS, and PostgreSQL. It features AI prompt optimization, serverless code execution benchmarks, and RAG document search.',
  'Next.js 14, React, TailwindCSS, PostgreSQL, Serverless AI',
  'https://github.com/Ratul-NotFound/SIPPRQ',
  'https://sipprq.vercel.app',
  '/images/projects/sipprq1.png',
  '/images/projects/sipprq1.png\n/images/projects/sipprq2.png',
  '95+ Lighthouse Score | 120ms Latency',
  'Q3 2024',
  TRUE
),
(
  'Edge-AI Acoustic Feature Pipeline',
  'AI & Embedded IoT',
  'COMPLETED',
  'C++ feature extraction pipeline for ESP32-S3 microcontrollers enabling real-time edge acoustic anomaly detection.',
  'Engineered low-latency C++ signal processing pipelines extracting MFCC acoustic features directly on ESP32-S3 microcontrollers with memory footprint under 32KB RAM.',
  'C++, ESP32-S3, TinyML, PyTorch, DSP',
  'https://github.com/Ratul-NotFound',
  'https://github.com/Ratul-NotFound',
  '/tech1.jpg',
  '/tech1.jpg',
  '32KB RAM Footprint | 15ms Inference',
  'Jan 2024 - Present',
  TRUE
) ON CONFLICT DO NOTHING;

INSERT INTO public.experiences (role, organization, category, period, logo, bullets) VALUES
(
  'Full-Stack Software Engineering Intern',
  'Tech Product Solutions',
  'Internship',
  '2023 - Present',
  '/cpc1.jpg',
  'Delivered 15+ production applications using Next.js, Node.js, and PostgreSQL.\nOptimized frontend performance achieving 95+ Lighthouse benchmark scores.'
),
(
  'Vice President & Lead Tech Director',
  'Daffodil International University Computer Programming Club (DIUCPC)',
  'Volunteering',
  '2023 - Present',
  '/vp.jpg',
  'Mentored over 500+ student developers in algorithms and web technologies.\nCo-led logistics for ICPC Dhaka Regional 2024 hosted at DIU campus.'
) ON CONFLICT DO NOTHING;

INSERT INTO public.activities (title, category, role, year, impact, stat, tag, img, gallery, "desc") VALUES
(
  'DIU Blood Donors Club (DIU BDC)',
  'University Events',
  'Executive Member & Lead Organizer',
  '2022 - Present',
  '500+ Donors Registered • 12 On-Campus Drives',
  '500+ Donors',
  'Campus Leadership',
  '/cpc1.jpg',
  '/cpc1.jpg\n/tech2.JPG',
  'Led executive operations for campus-wide emergency blood donation drives. Coordinated with regional blood banks and registered 500+ verified student donors across 12 physical campaigns.'
),
(
  'DIU CPC Take-Off Programming Contest',
  'University Events',
  'Judge & Problem Setter',
  '2023',
  '500+ Competitors • 8 Original Problems Authored',
  '500+ Competitors',
  'Competitive Programming',
  '/tech2.JPG',
  '/tech2.JPG\n/icpc1.jpg',
  'Authored and calibrated algorithmic problem sets covering graph theory, dynamic programming, and data structures. Supervised live test cases and judge arena operations.'
) ON CONFLICT DO NOTHING;
