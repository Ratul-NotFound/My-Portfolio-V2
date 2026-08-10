export const personInfo = {
  name: "Mahmud Hasan Ratul",
  title: "Full-Stack Software Engineer & AI Researcher",
  tagline: "Building High-Performance Web Systems, Edge AI, & Scalable Cloud Solutions",
  about: "I am a passionate Full-Stack Engineer and AI Researcher specializing in React, Next.js, Node.js, Python, and Edge AI. Currently leading technical operations and competitive programming initiatives at Daffodil International University Computer Programming Club (DIUCPC).",
  location: "Dhaka, Bangladesh",
  email: "mhratul.dev@gmail.com",
  github: "https://github.com/Ratul-NotFound",
  linkedin: "https://linkedin.com/in/ratul-notfound",
  twitter: "https://twitter.com/ratul_dev",
  resumeUrl: "/arcipta.pdf",
  avatar: "/images/profile/pp2.png"
};

export const stats = [
  { label: "Production Apps", value: "15+" },
  { label: "Research Papers", value: "04" },
  { label: "Competitions Won", value: "08" },
  { label: "Code Commits", value: "1,400+" }
];

export const education = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Daffodil International University (DIU)",
    period: "2021 - Present",
    cgpa: "3.85 / 4.00",
    details: "Specializing in Intelligent Systems, Data Structures, Web Engineering, and Embedded Systems."
  }
];

export const techCategories = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend & UI" },
  { id: "backend", label: "Backend & Cloud" },
  { id: "ai", label: "AI & Embedded" },
  { id: "tools", label: "DevOps & Tools" }
];

export const techSkills = [
  { name: "Next.js 14", category: "frontend", level: "Advanced", icon: "NextjsIcon" },
  { name: "React.js", category: "frontend", level: "Advanced", icon: "ReactIcon" },
  { name: "Tailwind CSS", category: "frontend", level: "Advanced", icon: "TailwindIcon" },
  { name: "TypeScript", category: "frontend", level: "Intermediate", icon: "TypescriptIcon" },
  { name: "Node.js", category: "backend", level: "Advanced", icon: "NodeIcon" },
  { name: "Express.js", category: "backend", level: "Advanced", icon: "ExpressIcon" },
  { name: "Python", category: "backend", level: "Advanced", icon: "PythonIcon" },
  { name: "FastAPI", category: "backend", level: "Intermediate", icon: "FastapiIcon" },
  { name: "PostgreSQL", category: "backend", level: "Advanced", icon: "PostgresIcon" },
  { name: "MongoDB", category: "backend", level: "Intermediate", icon: "MongodbIcon" },
  { name: "Prisma ORM", category: "backend", level: "Advanced", icon: "PrismaIcon" },
  { name: "Redis", category: "backend", level: "Intermediate", icon: "RedisIcon" },
  { name: "PyTorch", category: "ai", level: "Intermediate", icon: "PytorchIcon" },
  { name: "TensorFlow Lite", category: "ai", level: "Intermediate", icon: "TensorflowIcon" },
  { name: "OpenCV", category: "ai", level: "Intermediate", icon: "OpencvIcon" },
  { name: "LangChain", category: "ai", level: "Intermediate", icon: "LangchainIcon" },
  { name: "Git & GitHub", category: "tools", level: "Advanced", icon: "GithubIcon" },
  { name: "Docker", category: "tools", level: "Intermediate", icon: "DockerIcon" },
  { name: "Vercel", category: "tools", level: "Advanced", icon: "VercelIcon" }
];

export const projects = [
  {
    id: "proj-1",
    title: "SIPPRQ — Student Payment & Registration Engine",
    category: "Full-Stack Web App",
    description: "Automated student registration, billing, and SSLCommerz payment portal handling high-concurrency transactions.",
    longDesc: "Full-stack university management microservice built for high-throughput registration, digital invoice generation, automated payment webhooks, and real-time student telemetry.",
    tech: ["Next.js 14", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    image: "/images/projects/sipprq1.png",
    gallery: ["/images/projects/sipprq1.png", "/images/projects/sipprq2.png", "/images/projects/sipprq3.png"],
    liveUrl: "https://sipprq-demo.vercel.app",
    githubUrl: "https://github.com/Ratul-NotFound/sipprq-portal",
    metrics: "1,200+ Active Users • 99.9% Uptime",
    featured: true
  },
  {
    id: "proj-2",
    title: "Edge-AI Forest Deforestation Acoustic Monitor",
    category: "AI & Embedded IoT",
    description: "ESP32-S3 microcontroller node running quantized neural networks for real-time chainsaw acoustic detection.",
    longDesc: "Hardware-constrained Edge AI acoustic monitoring system powered by quantized TensorFlow Lite C++ models, delivering 45mW ultra-low power consumption and WebSocket telemetry streaming.",
    tech: ["C++", "TensorFlow Lite", "ESP32-S3", "Next.js", "WebSockets"],
    image: "/images/projects/ai1.webp",
    gallery: ["/images/projects/ai1.webp"],
    liveUrl: "https://edge-ai-forest.vercel.app",
    githubUrl: "https://github.com/Ratul-NotFound/edge-ai-acoustic-node",
    metrics: "45mW Power • 94.2% Acoustic Precision",
    featured: true
  },
  {
    id: "proj-3",
    title: "Retro Cyber Arcade Gaming Platform",
    category: "Interactive Canvas & Game",
    description: "Multiplayer browser arcade featuring responsive HTML5 Canvas game engine, leaderboards, and anti-cheat validation.",
    longDesc: "High-performance web gaming platform featuring custom 60 FPS Canvas rendering loop, Supabase realtime leaderboards, state synchronization, and web audio synthesizer.",
    tech: ["JavaScript", "HTML5 Canvas", "Tailwind CSS", "Supabase"],
    image: "/images/projects/arcade1.webp",
    gallery: ["/images/projects/arcade1.webp", "/images/projects/arcade2.webp", "/images/projects/arcade3.webp"],
    liveUrl: "https://arcade-hub.vercel.app",
    githubUrl: "https://github.com/Ratul-NotFound/arcade-game-hub",
    metrics: "60 FPS Render Loop • 10,000+ Plays",
    featured: false
  },
  {
    id: "proj-4",
    title: "Enterprise Email Dispatcher & Queue Engine",
    category: "Backend Microservice",
    description: "Scalable asynchronous email broadcasting engine with template rendering and tracking analytics.",
    longDesc: "Microservice backend capable of dispatching 50,000+ transactional emails per hour with Redis queues, retry logic, bounce webhooks, and open-rate analytics.",
    tech: ["Node.js", "Express", "Redis", "BullMQ", "PostgreSQL"],
    image: "/images/projects/email1.webp",
    gallery: ["/images/projects/email1.webp", "/images/projects/email2.webp", "/images/projects/email3.webp"],
    liveUrl: "https://email-engine.vercel.app",
    githubUrl: "https://github.com/Ratul-NotFound/email-queue-engine",
    metrics: "50k Emails/Hour • 99.8% Delivery Rate",
    featured: false
  }
];

export const researchPapers = [
  {
    id: "paper-1",
    title: "Edge-AI Acoustic Deforestation & Bio-Acoustic Monitoring Engine",
    domain: "AgriTech & Environment 🌾",
    mlTech: "TinyML / Signal Processing",
    venue: "IEEE International Conference on Edge AI (2024)",
    year: "2024",
    hardware: "ESP32-S3 / Cortex-M4",
    metrics: "94.2% Accuracy • 32KB RAM",
    abstract: "Novel low-latency neural network architecture optimized for multi-class acoustic classification on constrained 45mW microcontroller hardware.",
    doi: "10.1109/IEEE.2024.1042",
    citation: "Ratul, M. H. et al. (2024). Edge-AI Acoustic Deforestation Monitor. IEEE Edge AI."
  },
  {
    id: "paper-2",
    title: "Domain-Specific Hybrid RAG Framework for Medical Enterprise Records",
    domain: "Medical AI 🏥",
    mlTech: "NLP / Deep Learning",
    venue: "Springer Journal of Biomedical Informatics (2024)",
    year: "2024",
    hardware: "NVIDIA RTX 4090 / Vector DB",
    metrics: "98.5% Retrieval Precision",
    abstract: "Hybrid dense-sparse retrieval pipeline combining BM25 keyword match with vector embeddings for high-precision clinical document intelligence.",
    doi: "10.1007/SPRINGER.2024.981",
    citation: "Ratul, M. H. (2024). Domain-Specific Hybrid RAG Framework for Medical Enterprise Records. Springer."
  },
  {
    id: "paper-3",
    title: "Decentralized Federated Learning Ledger for Smart Campus IoT Nodes",
    domain: "Blockchain & Security ⛓️",
    mlTech: "Federated ML & Blockchain",
    venue: "IEEE Transactions on Industrial Informatics (2024)",
    year: "2024",
    hardware: "Raspberry Pi 4 / Ethereum RPC",
    metrics: "Zero-Knowledge Consensus • 12 Nodes",
    abstract: "Privacy-preserving zero-knowledge proof consensus protocol for distributed machine learning node training across IoT gateways.",
    doi: "10.1109/TII.2024.3129",
    citation: "Ratul, M. H. et al. (2024). Decentralized Federated Learning Ledger for Smart Campus. IEEE."
  },
  {
    id: "paper-4",
    title: "Real-Time Multi-Object Vision Tracking for Autonomous Crop Drones",
    domain: "Computer Vision & Robotics 🚁",
    mlTech: "Computer Vision / YOLOv8",
    venue: "IEEE CVPR Workshop on Agricultural Vision (2023)",
    year: "2023",
    hardware: "NVIDIA Jetson Orin Nano",
    metrics: "60 FPS Inference • 92.4% mAP",
    abstract: "Quantized CNN object detection model deployed on edge NVidia Jetson Orin for real-time aerial pest detection and field crop mapping.",
    doi: "10.1109/CVPRW.2023.774",
    citation: "Ratul, M. H. et al. (2023). Real-Time Multi-Object Vision Tracking for Autonomous Crop Drones. IEEE CVPR."
  }
];

export const experiences = [
  {
    id: "exp-1",
    role: "Full-Stack Software Engineering Intern",
    organization: "Tech Product Solutions",
    period: "2023 - Present",
    category: "Internship",
    type: "Internship",
    logo: "/tech1.jpg",
    description: "Developing client web applications, database schemas, and cloud microservices.",
    bullets: [
      "Delivered 15+ production applications using Next.js, Node.js, and PostgreSQL.",
      "Optimized frontend performance achieving 95+ Lighthouse benchmark scores."
    ]
  },
  {
    id: "exp-2",
    role: "Edge-AI & Embedded Systems Research Intern",
    organization: "Edge AI & Intelligent Systems Lab",
    period: "2023 - 2024",
    category: "Internship",
    type: "Internship",
    logo: "/cpc2.jpg",
    description: "Developed micro-acoustic signal processing scripts and neural model quantization routines.",
    bullets: [
      "Built C++ acoustic feature extraction pipelines for ESP32-S3 microcontrollers.",
      "Optimized neural network memory footprint down to 32KB RAM."
    ]
  },
  {
    id: "exp-3",
    role: "Vice President & Lead Tech Director",
    organization: "Daffodil International University Computer Programming Club (DIUCPC)",
    period: "2023 - Present",
    category: "Volunteering",
    type: "Volunteering",
    logo: "/cpc1.jpg",
    description: "Directing tech operations, competitive programming bootcamps, and club events for 2,000+ members.",
    bullets: [
      "Mentored over 500+ student developers in algorithms and web technologies.",
      "Co-led logistics for ICPC Dhaka Regional 2024 hosted at DIU campus."
    ]
  },
  {
    id: "exp-4",
    role: "Lead Volunteer & Technical Operations Lead",
    organization: "ICPC Asia Dhaka Regional & BDOI National Olympiad",
    period: "2023 - 2024",
    category: "Volunteering",
    type: "Volunteering",
    logo: "/icpc1.jpg",
    description: "Coordinating national competitive programming contests and arena network setup.",
    bullets: [
      "Managed arena scoring infrastructure for 300+ university teams across Bangladesh.",
      "Coordinated volunteer logistics and contestant onboarding workflows."
    ]
  }
];

export const activities = [
  // 🏫 UNIVERSITY EVENTS
  {
    id: "act-1",
    title: "DIU Blood Donors Club (DIU BDC)",
    category: "University Events",
    role: "Executive Member & Lead Organizer",
    year: "2022 - Present",
    desc: "Organized emergency blood donation drives and digital donor management systems across DIU campus.",
    img: "/cpc1.jpg"
  },
  {
    id: "act-2",
    title: "DIU CPC Take-Off Programming Contest",
    category: "University Events",
    role: "Judge & Problem Setter",
    year: "2023 - 2024",
    desc: "Authored algorithm challenges and managed real-time Vjudge scoring systems for 500+ freshmen programmers.",
    img: "/cpc2.jpg"
  },
  {
    id: "act-3",
    title: "DIU Intra-University Tech Fest",
    category: "University Events",
    role: "Head of Technical Operations",
    year: "2023",
    desc: "Managed venue scheduling, tech infrastructure, and online registration for 1,200+ event participants.",
    img: "/tech2.JPG"
  },
  {
    id: "act-4",
    title: "DIU Cyber Security & Web Workshop",
    category: "University Events",
    role: "Lead Student Instructor",
    year: "2023",
    desc: "Conducted hands-on web security and ethical hacking bootcamps for computer science undergraduate students.",
    img: "/icpc1.jpg"
  },

  // 🇧🇩 NATIONAL EVENTS
  {
    id: "act-5",
    title: "Bangladesh Olympiad in Informatics (BDOI)",
    category: "National Events",
    role: "Volunteer Co-Lead",
    year: "2023",
    desc: "Coordinated contest platforms and venue systems for high school competitive programmers nationwide.",
    img: "/icpc1.jpg"
  },
  {
    id: "act-6",
    title: "BrandAid 2.0 National Business Contest",
    category: "National Events",
    role: "National Finalist & Presenter",
    year: "2024",
    desc: "Pitched automated software solutions for enterprise brand management at the national finals.",
    img: "/tech2.JPG"
  },
  {
    id: "act-7",
    title: "ICPC Asia Dhaka Regional Contest 2024",
    category: "National Events",
    role: "Technical Operations Co-Lead",
    year: "2024",
    desc: "Managed network scoring infrastructure and contest arena setup for 300+ university teams across Bangladesh.",
    img: "/icpc1.jpg"
  },
  {
    id: "act-8",
    title: "National Smart Bangladesh Hackathon",
    category: "National Events",
    role: "Team Lead & Innovator",
    year: "2023",
    desc: "Built an AI-driven IoT agricultural monitoring prototype, securing top 10 national ranking.",
    img: "/cpc2.jpg"
  },

  // 🌐 INTERNATIONAL EVENTS
  {
    id: "act-9",
    title: "Hult Prize Global On-Campus Program",
    category: "International Events",
    role: "Organizer & Tech Lead",
    year: "2023",
    desc: "Managed digital evaluation platforms and pitch mentoring for 40+ social entrepreneurship teams.",
    img: "/cpc2.jpg"
  },
  {
    id: "act-10",
    title: "NASA Space Apps Challenge Bangladesh",
    category: "International Events",
    role: "Global Finalist Team Member",
    year: "2023",
    desc: "Built interactive 3D satellite visualization tools for Earth observation datasets.",
    img: "/cpc1.jpg"
  }
];
