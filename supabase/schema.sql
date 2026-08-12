-- ====================================================================
-- SUPABASE DATABASE SCHEMA FOR MAHMUD HASAN RATUL'S PORTFOLIO (V2)
-- Execute this SQL script in your Supabase SQL Editor: https://app.supabase.com
-- ====================================================================

-- 1. PERSON INFO TABLE (Personal Details, Bio, Social Links)
CREATE TABLE IF NOT EXISTS public.person_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Mahmud Hasan Ratul',
  role TEXT NOT NULL DEFAULT 'Full-Stack Software & Edge AI Engineer',
  tagline TEXT DEFAULT 'Architecting high-throughput web applications and low-latency embedded AI hardware systems.',
  bio TEXT DEFAULT 'Full-Stack Software Engineer & Edge AI Researcher specializing in Next.js, React, Node.js, C++, and PyTorch.',
  email TEXT DEFAULT 'mhratul070@gmail.com',
  phone TEXT DEFAULT '+8801646877073',
  location TEXT DEFAULT 'Savar, Dhaka, Bangladesh',
  avatar_url TEXT DEFAULT '/images/profile/Profile Pic Without BG.png',
  github_url TEXT DEFAULT 'https://github.com/Ratul-NotFound',
  linkedin_url TEXT DEFAULT 'https://linkedin.com/in/mahmud-hasan-ratul',
  resume_url TEXT DEFAULT '/Mahmud_Hasan_Ratul_CV.pdf',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROJECTS TABLE (Featured Showcase & Works)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Full-Stack Web App',
  description TEXT NOT NULL,
  long_desc TEXT,
  tech TEXT[] NOT NULL DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  image TEXT,
  metrics TEXT,
  featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EXPERIENCES TABLE (Work Experience & Leadership Roles)
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Internship',
  period TEXT NOT NULL,
  logo TEXT,
  bullets TEXT[] NOT NULL DEFAULT '{}',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RESEARCH PAPERS TABLE (Publications & AI Lab Research)
CREATE TABLE IF NOT EXISTS public.research_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  journal TEXT NOT NULL,
  year INT DEFAULT 2024,
  doi TEXT,
  abstract TEXT,
  pdf_url TEXT,
  citations INT DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TECH SKILLS TABLE (Skills & Ecosystem)
CREATE TABLE IF NOT EXISTS public.tech_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Frontend',
  icon TEXT,
  proficiency INT DEFAULT 90,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. MESSAGES TABLE (Contact Form Submissions from Visitors)
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
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.person_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tech_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow Public READ access to all portfolio content
CREATE POLICY "Public Read person_info" ON public.person_info FOR SELECT USING (true);
CREATE POLICY "Public Read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public Read research_papers" ON public.research_papers FOR SELECT USING (true);
CREATE POLICY "Public Read tech_skills" ON public.tech_skills FOR SELECT USING (true);

-- Allow Public INSERT for Contact Form submissions
CREATE POLICY "Public Insert messages" ON public.messages FOR INSERT WITH CHECK (true);

-- Allow Public All (for demo admin panel when auth is configured or anon key enabled)
CREATE POLICY "Public All person_info" ON public.person_info FOR ALL USING (true);
CREATE POLICY "Public All projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Public All experiences" ON public.experiences FOR ALL USING (true);
CREATE POLICY "Public All research_papers" ON public.research_papers FOR ALL USING (true);
CREATE POLICY "Public All tech_skills" ON public.tech_skills FOR ALL USING (true);
CREATE POLICY "Public All messages" ON public.messages FOR ALL USING (true);

-- ====================================================================
-- INITIAL SEED DATA
-- ====================================================================
INSERT INTO public.person_info (name, role, tagline, email, location, avatar_url, github_url, linkedin_url)
VALUES (
  'Mahmud Hasan Ratul',
  'Full-Stack Software & Edge AI Engineer',
  'Architecting high-throughput web applications and low-latency embedded AI hardware systems.',
  'mhratul070@gmail.com',
  'Savar, Dhaka, Bangladesh',
  '/images/profile/Profile Pic Without BG.png',
  'https://github.com/Ratul-NotFound',
  'https://linkedin.com/in/mahmud-hasan-ratul'
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, category, description, long_desc, tech, github_url, live_url, image, metrics, featured) VALUES
(
  'SIPPRQ - Next.js AI Prompt & Code Platform',
  'Full-Stack Web App',
  'Production AI prompt engineering platform with serverless API, dynamic code snippet generation, and vector RAG search.',
  'SIPPRQ is a high-performance web platform built with Next.js 14, React, TailwindCSS, and PostgreSQL. It features AI prompt optimization, serverless code execution benchmarks, and RAG document search.',
  ARRAY['Next.js 14', 'React', 'TailwindCSS', 'PostgreSQL', 'Serverless AI'],
  'https://github.com/Ratul-NotFound/SIPPRQ',
  'https://sipprq.vercel.app',
  '/images/projects/sipprq1.png',
  '95+ Lighthouse Score | 120ms Latency',
  TRUE
),
(
  'Edge-AI Acoustic Feature Pipeline',
  'AI & Embedded IoT',
  'C++ feature extraction pipeline for ESP32-S3 microcontrollers enabling real-time edge acoustic anomaly detection.',
  'Engineered low-latency C++ signal processing pipelines extracting MFCC acoustic features directly on ESP32-S3 microcontrollers with memory footprint under 32KB RAM.',
  ARRAY['C++', 'ESP32-S3', 'TinyML', 'PyTorch', 'DSP'],
  'https://github.com/Ratul-NotFound',
  'https://github.com/Ratul-NotFound',
  '/tech1.jpg',
  '32KB RAM Footprint | 15ms Inference',
  TRUE
) ON CONFLICT DO NOTHING;

INSERT INTO public.experiences (role, organization, category, period, logo, bullets) VALUES
(
  'Full-Stack Software Engineering Intern',
  'Tech Product Solutions',
  'Internship',
  '2023 - Present',
  '/cpc1.jpg',
  ARRAY['Delivered 15+ production applications using Next.js, Node.js, and PostgreSQL.', 'Optimized frontend performance achieving 95+ Lighthouse benchmark scores.']
),
(
  'Edge-AI & Embedded Systems Research Intern',
  'Edge AI & Intelligent Systems Lab',
  'Internship',
  '2023 - 2024',
  '/tech2.JPG',
  ARRAY['Built C++ acoustic feature extraction pipelines for ESP32-S3 microcontrollers.', 'Optimized neural network memory footprint down to 32KB RAM.']
),
(
  'Vice President & Lead Tech Director',
  'Daffodil International University Computer Programming Club (DIUCPC)',
  'Volunteering',
  '2023 - Present',
  '/vp.jpg',
  ARRAY['Mentored over 500+ student developers in algorithms and web technologies.', 'Co-led logistics for ICPC Dhaka Regional 2024 hosted at DIU campus.']
),
(
  'Lead Volunteer & Technical Operations Lead',
  'ICPC Asia Dhaka Regional & BDOI National Olympiad',
  'Volunteering',
  '2023 - 2024',
  '/icpc1.jpg',
  ARRAY['Managed arena scoring infrastructure for 300+ university teams across Bangladesh.', 'Coordinated volunteer logistics and contestant onboarding workflows.']
) ON CONFLICT DO NOTHING;
