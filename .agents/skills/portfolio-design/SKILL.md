---
name: portfolio-design
description: >-
  Design and build elite, high-converting developer and designer portfolio websites with project showcases, interactive experience timelines, Bento grids, live project modals, tech stack matrices, and engaging storytelling. Use when building or upgrading portfolio sections and personal showcases.
---

# Portfolio Design Skill

This skill provides blueprint patterns and standards for engineering high-impact personal portfolio websites that stand out to tech leaders, recruiters, and clients worldwide.

---

## 1. Portfolio Information Architecture

An elite portfolio consists of 7 high-impact sections:

1. **Hero with Personality & Value Proposition**: Clear identity, specialization, status badge, and immediate call-to-action.
2. **Featured Projects Showcase**: Depth over quantity (3-5 signature projects with problem/solution breakdown, live demo, github link, architecture tags, and metrics).
3. **Interactive Bento Grid (About & Philosophy)**: Dynamic layout showing skills, real-time timezone, current listening/learning, hardware setup, and statistics.
4. **Experience & Career Timeline**: Interactive step-through of roles, milestones, publications, and key deliverables.
5. **Technical Proficiency Matrix**: Categorized tech stack (Languages, Frontend, Backend, Cloud/DevOps, AI/ML) with confidence tags.
6. **Research, Writing, & Side Quests**: Articles, open-source contributions, awards, and certifications.
7. **High-Converting Contact Section**: Interactive form, direct calendar/email link, and active social hubs.

---

## 2. Signature Project Card Pattern

```jsx
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

export function PortfolioProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-500 overflow-hidden shadow-2xl"
    >
      {/* Dynamic Hover Spotlight */}
      <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Project Visual / Mockup */}
        <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-white/10 bg-slate-950 aspect-video group-hover:scale-[1.01] transition-transform duration-500">
          <img
            src={project.image || "/placeholder-project.png"}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          {/* Tag Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {project.featured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/90 text-white backdrop-blur-md shadow-md">
                Featured Case Study
              </span>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
              {project.category || "Full-Stack Application"}
            </div>
            <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Impact / Metrics Pill */}
          {project.metrics && (
            <div className="flex items-center gap-4 py-2 border-y border-white/5 text-xs text-slate-300">
              <span className="text-emerald-400 font-semibold font-mono">{project.metrics.stat}</span>
              <span>{project.metrics.label}</span>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack?.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 text-slate-300 border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-indigo-400 transition-colors"
              >
                Live Demo <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" /> Source
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

---

## 3. Bento Grid "About Me" Layout

Bento grids combine disparate elements into a cohesive, highly engaging collage:
- **Card 1 (Large - 2 cols)**: Core Philosophy / Background summary with animated headline.
- **Card 2 (1 col)**: Interactive Timezone & Location badge (e.g., "Dhaka, Bangladesh — 09:30 PM (UTC+6)").
- **Card 3 (1 col)**: Tech Philosophy or Fast facts ("5+ Years Exp", "20+ Production Apps").
- **Card 4 (2 cols)**: Current Focus & Open-source contributions with animated pulse indicator.

---

## 4. Experience Timeline Pattern

```jsx
export function ExperienceTimeline({ experiences }) {
  return (
    <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12">
      {experiences.map((exp, idx) => (
        <div key={idx} className="relative pl-8 md:pl-10 group">
          {/* Glowing Timeline Marker */}
          <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-indigo-500 group-hover:border-purple-400 group-hover:scale-125 transition-all duration-300" />

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
            <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
              {exp.role}
            </h4>
            <span className="text-slate-400 text-sm font-medium">@ {exp.company}</span>
            <span className="text-xs font-mono text-indigo-400 ml-auto">{exp.period}</span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mt-2 mb-3">
            {exp.description}
          </p>

          <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
            {exp.achievements?.map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```
