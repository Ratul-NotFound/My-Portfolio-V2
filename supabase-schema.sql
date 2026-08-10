-- ========================================================
-- SUPABASE MIGRATION SCRIPT FOR PORTFOLIO VERSION 2
-- Run this in Supabase SQL Editor to create dynamic tables
-- ========================================================

-- 1. PERSON INFO TABLE
CREATE TABLE IF NOT EXISTS person_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  subtitle TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  github TEXT,
  linkedin TEXT,
  status TEXT,
  avatar_url TEXT,
  cv_file_name TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Default Info
INSERT INTO person_info (name, role, subtitle, bio, email, phone, location, github, linkedin, status, cv_file_name)
VALUES (
  'Mahmud Hasan Ratul',
  'Full-Stack Engineer & AI Researcher',
  'Architecting High-Performance Web Applications, Edge AI Systems & RAG Frameworks',
  'Full-Stack Engineer and AI Researcher specializing in scalable web systems, machine learning, and low-power Edge AI hardware integration. Serving as Vice President of DIU Computer & Programming Club (DIUCPC), I have mentored over 500 developers.',
  'm.h.ratul18@gmail.com',
  '+8801784090278',
  'Savar, Dhaka, Bangladesh',
  'https://github.com/ratul-notfound',
  'https://linkedin.com/in/mahmud-hasan-ratul',
  'Open to AI & Full-Stack Opportunities',
  'Mahmud_Hasan_Ratul_CV.pdf'
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  metrics TEXT,
  github TEXT,
  demo TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. SKILLS TABLE
CREATE TABLE IF NOT EXISTS tech_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INT DEFAULT 85,
  icon TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. RESEARCH PAPERS TABLE
CREATE TABLE IF NOT EXISTS research_papers (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  venue TEXT,
  year TEXT,
  abstract TEXT,
  keywords TEXT[] DEFAULT '{}',
  hardware TEXT,
  metrics TEXT,
  link TEXT,
  citation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS experiences (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  period TEXT NOT NULL,
  type TEXT,
  location TEXT,
  description TEXT,
  bullets TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (Public Read Access)
ALTER TABLE person_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on person_info" ON person_info FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on tech_skills" ON tech_skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access on research_papers" ON research_papers FOR SELECT USING (true);
CREATE POLICY "Allow public read access on experiences" ON experiences FOR SELECT USING (true);
