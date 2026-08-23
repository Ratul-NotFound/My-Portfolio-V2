'use client';

import { useState, useEffect } from 'react';
import { 
  getPortfolioData, 
  savePersonInfo, 
  saveProject, 
  deleteProject, 
  saveExperience, 
  deleteExperience, 
  saveActivity,
  deleteActivity,
  saveTechSkill,
  deleteTechSkill,
  saveStat,
  deleteStat,
  saveResearch,
  deleteResearch,
  saveEducation,
  deleteEducation,
  submitContactMessage, 
  getContactMessages, 
  deleteContactMessage,
  uploadImageToSupabase,
  signInAdmin,
  signUpAdmin,
  sendMagicLink,
  signOutAdmin,
  getAdminSession,
  onAdminAuthStateChange
} from '@/lib/supabase';
import { 
  Lock, 
  ShieldCheck, 
  User, 
  Layers, 
  Briefcase, 
  BookOpen, 
  Mail, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  RefreshCw, 
  ArrowLeft, 
  Database,
  Search,
  Eye,
  LogOut,
  X,
  Award,
  Upload,
  Image as ImageIcon,
  Code,
  BarChart2,
  GraduationCap,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Images,
  KeyRound,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Portfolio Data State
  const [personInfo, setPersonInfo] = useState({});
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [researchPapers, setResearchPapers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [techSkills, setTechSkills] = useState([]);
  const [stats, setStats] = useState([]);
  const [education, setEducation] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLiveSupabase, setIsLiveSupabase] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Modals / Form States for All Sections
  const [editingProject, setEditingProject] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingStat, setEditingStat] = useState(null);
  const [editingResearch, setEditingResearch] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);

  // Options & Dropdowns
  const PROJECT_CATEGORIES = [
    'Full-Stack Web App',
    'AI & Embedded IoT',
    'Interactive Canvas & Game',
    'Backend Microservice',
    'Mobile Application',
    'Cloud & Infrastructure'
  ];

  const PROJECT_STATUSES = [
    'LIVE DEMO',
    'ONGOING BUILD',
    'COMPLETED',
    'RESEARCH PROTOTYPE',
    'MAINTENANCE'
  ];

  const EXPERIENCE_CATEGORIES = [
    'Internship',
    'Full-Time',
    'Part-Time',
    'Research',
    'Volunteering'
  ];

  const CAMPUS_CATEGORIES = [
    'University Events',
    'National Events',
    'International Events',
    'Volunteering & Community',
    'Workshops & Mentorship',
    'Clubs & Organizations'
  ];

  const SKILL_CATEGORIES = ['frontend', 'backend', 'ai', 'tools'];
  const SKILL_LEVELS = ['Advanced', 'Intermediate', 'Expert'];

  useEffect(() => {
    // Check existing active Supabase session
    getAdminSession().then(({ session, user }) => {
      if (session && user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    });

    // Listen to real-time auth events
    const unsubscribePromise = onAdminAuthStateChange((event, session) => {
      if (session?.user) {
        setCurrentUser(session.user);
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      if (unsubscribePromise?.then) {
        unsubscribePromise.then(sub => sub?.unsubscribe?.());
      }
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    const data = await getPortfolioData();
    setPersonInfo(data.personInfo || {});
    setProjects(data.projects || []);
    setExperiences(data.experiences || []);
    setResearchPapers(data.researchPapers || []);
    setActivities(data.activities || []);
    setTechSkills(data.techSkills || []);
    setStats(data.stats || []);
    setEducation(data.education || []);
    setIsLiveSupabase(data.isLiveSupabase);

    const msgs = await getContactMessages();
    setMessages(msgs.data || []);
    setLoading(false);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const { data, error } = await signInAdmin(email.trim(), password);
      if (error) {
        setAuthError(error.message || 'Invalid admin credentials.');
      } else if (data?.user) {
        setCurrentUser(data.user);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setAuthError(err.message || 'Authentication error occurred.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOutAdmin();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const showStatus = (msg) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  // --- SINGLE FILE UPLOADER HANDLER ---
  const handleSingleFileUpload = async (e, onUrlUploaded) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    showStatus('Uploading file...');

    const res = await uploadImageToSupabase(file);
    setUploading(false);

    if (res.url) {
      onUrlUploaded(res.url);
      showStatus(res.isLocal ? 'File loaded locally!' : 'File uploaded to Supabase!');
    } else {
      showStatus('File upload failed.');
    }
  };

  // --- MULTIPLE FILES UPLOADER HANDLER ---
  const handleMultipleFilesUpload = async (e, onUrlsUploaded) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    showStatus(`Uploading ${files.length} image files...`);

    const uploadedUrls = [];
    for (const file of files) {
      const res = await uploadImageToSupabase(file);
      if (res.url) {
        uploadedUrls.push(res.url);
      }
    }

    setUploading(false);
    if (uploadedUrls.length > 0) {
      onUrlsUploaded(uploadedUrls);
      showStatus(`Uploaded ${uploadedUrls.length} images successfully!`);
    } else {
      showStatus('Failed to upload images.');
    }
  };

  // --- SAVE PERSON INFO ---
  const handleSavePersonInfo = async (e) => {
    e.preventDefault();
    setSaving(true);
    const res = await savePersonInfo(personInfo);
    setSaving(false);
    if (res.error) showStatus(`Error: ${res.error}`);
    else { showStatus('Profile & Social Links updated!'); loadData(); }
  };

  // --- PROJECTS CRUD ---
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!editingProject) return;
    setSaving(true);
    const formatted = {
      ...editingProject,
      tech: typeof editingProject.tech === 'string' ? editingProject.tech.split(',').map(s => s.trim()) : editingProject.tech,
      gallery: typeof editingProject.gallery === 'string' ? editingProject.gallery.split('\n').map(s => s.trim()).filter(s => s) : editingProject.gallery,
      githubUrl: editingProject.githubUrl || editingProject.github_url || '',
      liveUrl: editingProject.liveUrl || editingProject.live_url || ''
    };
    const res = await saveProject(formatted);
    setSaving(false);
    if (res.error) showStatus(`Error: ${res.error}`);
    else { showStatus('Project saved!'); setEditingProject(null); loadData(); }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    setSaving(true);
    await deleteProject(id);
    setSaving(false);
    showStatus('Project deleted.');
    loadData();
  };

  // --- EXPERIENCE CRUD ---
  const handleSaveExperience = async (e) => {
    e.preventDefault();
    if (!editingExperience) return;
    setSaving(true);
    const formatted = {
      ...editingExperience,
      bullets: typeof editingExperience.bullets === 'string' ? editingExperience.bullets.split('\n').filter(b => b.trim() !== '') : editingExperience.bullets
    };
    const res = await saveExperience(formatted);
    setSaving(false);
    if (res.error) showStatus(`Error: ${res.error}`);
    else { showStatus('Experience saved!'); setEditingExperience(null); loadData(); }
  };

  const handleDeleteExperience = async (id) => {
    if (!confirm('Delete this role?')) return;
    setSaving(true);
    await deleteExperience(id);
    setSaving(false);
    showStatus('Experience deleted.');
    loadData();
  };

  // --- CAMPUS & LEADERSHIP CRUD ---
  const handleSaveActivity = async (e) => {
    e.preventDefault();
    if (!editingActivity) return;
    setSaving(true);
    const galleryArr = typeof editingActivity.gallery === 'string'
      ? editingActivity.gallery.split('\n').map(s => s.trim()).filter(Boolean)
      : (editingActivity.gallery || []);

    const formatted = {
      ...editingActivity,
      gallery: galleryArr,
      images: galleryArr.length > 0 ? galleryArr : (editingActivity.images || []),
      img: editingActivity.img || (galleryArr.length > 0 ? galleryArr[0] : '/cpc1.jpg')
    };
    const res = await saveActivity(formatted);
    setSaving(false);
    if (res.error) showStatus(`Error: ${res.error}`);
    else { showStatus('Campus & Leadership activity saved!'); setEditingActivity(null); loadData(); }
  };

  const handleDeleteActivity = async (id) => {
    if (!confirm('Delete this activity?')) return;
    setSaving(true);
    await deleteActivity(id);
    setSaving(false);
    showStatus('Activity deleted.');
    loadData();
  };

  // --- TECH SKILLS CRUD ---
  const handleSaveSkill = async (e) => {
    e.preventDefault();
    if (!editingSkill) return;
    setSaving(true);
    const res = await saveTechSkill(editingSkill);
    setSaving(false);
    if (res.error) showStatus(`Error: ${res.error}`);
    else { showStatus('Skill saved!'); setEditingSkill(null); loadData(); }
  };

  const handleDeleteSkill = async (id) => {
    if (!confirm('Delete this skill?')) return;
    setSaving(true);
    await deleteTechSkill(id);
    setSaving(false);
    showStatus('Skill deleted.');
    loadData();
  };

  // --- STATS CRUD ---
  const handleSaveStat = async (e) => {
    e.preventDefault();
    if (!editingStat) return;
    setSaving(true);
    const res = await saveStat(editingStat);
    setSaving(false);
    if (res.error) showStatus(`Error: ${res.error}`);
    else { showStatus('Stat saved!'); setEditingStat(null); loadData(); }
  };

  const handleDeleteStat = async (id) => {
    if (!confirm('Delete this stat?')) return;
    setSaving(true);
    await deleteStat(id);
    setSaving(false);
    showStatus('Stat deleted.');
    loadData();
  };

  // --- RESEARCH CRUD ---
  const handleSaveResearch = async (e) => {
    e.preventDefault();
    if (!editingResearch) return;
    setSaving(true);
    const res = await saveResearch(editingResearch);
    setSaving(false);
    if (res.error) showStatus(`Error: ${res.error}`);
    else { showStatus('Paper saved!'); setEditingResearch(null); loadData(); }
  };

  const handleDeleteResearch = async (id) => {
    if (!confirm('Delete this paper?')) return;
    setSaving(true);
    await deleteResearch(id);
    setSaving(false);
    showStatus('Paper deleted.');
    loadData();
  };

  // --- EDUCATION CRUD ---
  const handleSaveEducation = async (e) => {
    e.preventDefault();
    if (!editingEducation) return;
    setSaving(true);
    const res = await saveEducation(editingEducation);
    setSaving(false);
    if (res.error) showStatus(`Error: ${res.error}`);
    else { showStatus('Education saved!'); setEditingEducation(null); loadData(); }
  };

  const handleDeleteEducation = async (id) => {
    if (!confirm('Delete education item?')) return;
    setSaving(true);
    await deleteEducation(id);
    setSaving(false);
    showStatus('Education deleted.');
    loadData();
  };

  // --- MESSAGES INBOX ---
  const handleDeleteMessage = async (id) => {
    await deleteContactMessage(id);
    showStatus('Message removed.');
    loadData();
  };

  // Filtered lists
  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Helper to parse gallery input into an array
  const getGalleryArray = (galleryVal) => {
    if (!galleryVal) return [];
    if (Array.isArray(galleryVal)) return galleryVal;
    return galleryVal.split('\n').map(s => s.trim()).filter(s => s);
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center p-4 select-none font-sans" style={{ background: 'var(--color-bg)' }}>
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center shadow-md" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              <Lock className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
            </div>
            <h1 className="text-xl font-bold text-white font-sans">Admin Control Center</h1>
            <p className="text-xs text-zinc-400 font-mono">Authenticate with your Supabase account</p>
          </div>

          {/* Error Notification */}
          {authError && (
            <div className="p-3.5 rounded-xl text-xs font-mono flex items-center gap-2 text-red-400 bg-red-950/40 border border-red-800/50">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4 font-mono">
            <div>
              <label className="text-xs block mb-1.5 text-zinc-300">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mhratul.dev@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-white transition-colors focus:border-accent"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
                required
              />
            </div>

            <div>
              <label className="text-xs block mb-1.5 text-zinc-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-white transition-colors focus:border-accent"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-2.5 rounded-xl font-bold text-sm cursor-pointer shadow-md font-sans flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: 'var(--color-accent)', color: '#000' }}
            >
              {authLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Unlock Dashboard &rarr;</span>
              )}
            </button>
          </form>

          <div className="pt-4 text-center border-t" style={{ borderColor: 'var(--color-border)' }}>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Portfolio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // MAIN DASHBOARD
  return (
    <main className="min-h-screen w-full font-sans p-4 sm:p-8 select-none" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header Navbar */}
        <header className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border shadow-sm" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              <ShieldCheck className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold font-sans text-white">Portfolio Admin Dashboard</h1>
              <p className="text-xs font-mono text-zinc-400">
                {currentUser?.email ? `Logged in as ${currentUser.email}` : 'Authenticated via Supabase Auth'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span 
              className="text-xs px-3 py-1 rounded-full font-mono font-bold flex items-center gap-1.5 border"
              style={isLiveSupabase ? { background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', borderColor: 'rgba(34, 197, 94, 0.3)' } : { background: 'var(--color-surface-2)', color: 'var(--color-accent)', borderColor: 'var(--color-border)' }}
            >
              <Database className="w-3.5 h-3.5" />
              {isLiveSupabase ? 'SUPABASE CONNECTED' : 'LOCAL MODE'}
            </span>

            <button onClick={loadData} className="p-2 rounded-xl border text-zinc-300 hover:text-white cursor-pointer" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }} title="Refresh Data">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <Link href="/" className="px-3.5 py-1.5 rounded-xl border text-xs font-bold font-mono flex items-center gap-1.5" style={{ background: 'var(--color-accent)', color: '#000', borderColor: 'var(--color-accent)' }}>
              <Eye className="w-3.5 h-3.5" /> View Live Site
            </Link>

            <button onClick={handleLogout} className="p-2 rounded-xl border text-zinc-400 hover:text-red-400 cursor-pointer flex items-center gap-1.5 text-xs font-mono" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }} title="Logout">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Status Toast */}
        {statusMsg && (
          <div className="p-3.5 rounded-xl text-xs font-mono flex items-center gap-2 shadow-sm border animate-fade-in" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border-accent)', color: 'var(--color-accent)' }}>
            <Check className="w-4 h-4 flex-shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Sidebar + Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Navigation Sidebar */}
          <div className="md:col-span-3 space-y-2">
            <div className="p-3 rounded-2xl border space-y-1 shadow-sm" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              {[
                { id: 'projects', label: '🚀 Projects', count: projects.length },
                { id: 'experience', label: '💼 Work Experience', count: experiences.length },
                { id: 'campus', label: '🏫 Campus & Leadership', count: activities.length },
                { id: 'skills', label: '⚡ Tech Arsenal', count: techSkills.length },
                { id: 'stats', label: '📊 Hero Stats', count: stats.length },
                { id: 'education', label: '🎓 Education', count: education.length },
                { id: 'research', label: '📚 Research Papers', count: researchPapers.length },
                { id: 'profile', label: '👤 Profile & Links' },
                { id: 'messages', label: '✉️ Messages Inbox', count: messages.length },
              ].map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all flex items-center justify-between cursor-pointer border"
                    style={isActive ? { background: 'var(--color-accent)', color: '#000', borderColor: 'var(--color-accent)' } : { background: 'transparent', color: 'var(--color-text-muted)', borderColor: 'transparent' }}
                  >
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold" style={isActive ? { background: '#000', color: '#fff' } : { background: 'var(--color-surface-2)', color: 'var(--color-text)' }}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-9 space-y-4">
            <div className="p-6 rounded-2xl border shadow-sm space-y-5" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              
              {/* ================= PROJECTS ================= */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div>
                      <h2 className="text-base font-bold font-sans text-white">Projects Showcase ({projects.length})</h2>
                      <p className="text-xs text-zinc-400 font-mono">Multi-photo gallery upload, live links, status, & tech stack</p>
                    </div>

                    <button
                      onClick={() => setEditingProject({ 
                        title: '', 
                        category: PROJECT_CATEGORIES[0], 
                        status: PROJECT_STATUSES[0], 
                        description: '', 
                        longDesc: '',
                        tech: 'Next.js 14, React, Node.js, PostgreSQL', 
                        githubUrl: 'https://github.com/Ratul-NotFound', 
                        liveUrl: 'https://vercel.com', 
                        image: '/images/projects/sipprq1.png', 
                        gallery: '/images/projects/sipprq1.png\n/images/projects/sipprq2.png', 
                        metrics: '95+ Lighthouse Score | 120ms Latency',
                        time: 'Q3 2024',
                        featured: true 
                      })}
                      className="px-4 py-2 rounded-xl font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-md hover:opacity-90"
                      style={{ background: 'var(--color-accent)', color: '#000' }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Create Project</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredProjects.map((project, idx) => (
                      <div key={project.id || idx} className="p-4 rounded-xl border space-y-3" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold border uppercase" style={{ background: 'var(--color-surface)', color: 'var(--color-accent)', borderColor: 'var(--color-border)' }}>
                            {project.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => setEditingProject({
                                ...project,
                                gallery: Array.isArray(project.gallery) ? project.gallery.join('\n') : (project.gallery || '')
                              })} 
                              className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 border cursor-pointer" 
                              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-accent)' }}
                            >
                              <Edit3 className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button onClick={() => handleDeleteProject(project.id)} className="p-1 rounded-lg border text-zinc-400 hover:text-red-400 cursor-pointer" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <h3 className="text-sm font-bold font-sans text-white">{project.title}</h3>
                        <p className="text-xs text-zinc-400 font-sans line-clamp-2">{project.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= WORK EXPERIENCE ================= */}
              {activeTab === 'experience' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div>
                      <h2 className="text-base font-bold font-sans text-white">Work Experience ({experiences.length})</h2>
                      <p className="text-xs text-zinc-400 font-mono">Manage software roles, internships, dates, & achievements</p>
                    </div>

                    <button
                      onClick={() => setEditingExperience({ role: '', organization: '', period: '2023 - Present', startYear: '2023', endYear: 'Present', category: EXPERIENCE_CATEGORIES[0], logo: '/tech1.jpg', bullets: 'Delivered 15+ production apps.' })}
                      className="px-4 py-2 rounded-xl font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-md hover:opacity-90"
                      style={{ background: 'var(--color-accent)', color: '#000' }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add Role</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {experiences.map((exp, idx) => (
                      <div key={exp.id || idx} className="p-4 rounded-xl border flex items-center justify-between" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}>
                        <div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono text-accent font-bold" style={{ color: 'var(--color-accent)' }}>{exp.category} • {exp.period}</span>
                          <h3 className="text-sm font-bold text-white font-sans pt-1">{exp.role}</h3>
                          <p className="text-xs text-zinc-400 font-sans">{exp.organization}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setEditingExperience(exp)} className="px-2.5 py-1 rounded text-xs font-mono font-bold border text-accent cursor-pointer" style={{ color: 'var(--color-accent)', borderColor: 'var(--color-border)' }}><Edit3 className="w-3.5 h-3.5 inline mr-1" />Edit</button>
                          <button onClick={() => handleDeleteExperience(exp.id)} className="p-1 rounded text-zinc-400 hover:text-red-400 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= CAMPUS & LEADERSHIP ================= */}
              {activeTab === 'campus' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div>
                      <h2 className="text-base font-bold font-sans text-white">Extracurricular & Leadership ({activities.length})</h2>
                      <p className="text-xs text-zinc-400 font-mono">Multi-photo albums, event categories, roles, impact telemetry & stats</p>
                    </div>

                    <button
                      onClick={() => setEditingActivity({ 
                        title: '', 
                        category: CAMPUS_CATEGORIES[0], 
                        role: 'Executive Member & Lead Organizer', 
                        year: '2023 - Present', 
                        impact: '500+ Donors Registered • 12 On-Campus Drives',
                        stat: '500+ Donors',
                        tag: 'Campus Leadership',
                        img: '/cpc1.jpg', 
                        gallery: '/cpc1.jpg\n/tech2.JPG',
                        desc: 'Summary of event operations, leadership responsibilities, and achievements.' 
                      })}
                      className="px-4 py-2 rounded-xl font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-md hover:opacity-90"
                      style={{ background: 'var(--color-accent)', color: '#000' }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add Event / Activity</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activities.map((act, idx) => {
                      const photoCount = getGalleryArray(act.gallery || act.images).length || (act.img ? 1 : 0);

                      return (
                        <div key={act.id || idx} className="p-4 rounded-xl border space-y-3 flex flex-col justify-between" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}>
                          <div className="space-y-2">
                            {/* Card Image Thumbnail + Badges */}
                            <div className="relative w-full h-32 rounded-lg overflow-hidden bg-black/40 border shadow-inner group" style={{ borderColor: 'var(--color-border)' }}>
                              <img src={act.img || '/cpc1.jpg'} alt={act.title} className="w-full h-full object-cover" />
                              <div className="absolute top-2 left-2 flex items-center gap-1">
                                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase shadow backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.7)', color: 'var(--color-accent)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                  {act.category}
                                </span>
                              </div>
                              <div className="absolute bottom-2 right-2 flex items-center gap-1">
                                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-black/80 text-white border border-white/10 shadow flex items-center gap-1">
                                  <Images className="w-3 h-3 text-accent" style={{ color: 'var(--color-accent)' }} />
                                  <span>{photoCount} {photoCount === 1 ? 'Photo' : 'Photos'}</span>
                                </span>
                              </div>
                            </div>

                            <div className="flex items-start justify-between gap-2 pt-1">
                              <div>
                                <h3 className="text-sm font-bold text-white font-sans line-clamp-1">{act.title}</h3>
                                <p className="text-xs font-semibold font-sans pt-0.5" style={{ color: 'var(--color-accent)' }}>{act.role}</p>
                                <p className="text-[11px] text-zinc-400 font-mono">{act.year || '2023 - Present'}</p>
                              </div>
                            </div>

                            {act.impact && (
                              <div className="text-[11px] px-2.5 py-1 rounded-lg font-mono font-semibold truncate shadow-inner" style={{ background: 'rgba(56, 189, 248, 0.08)', color: 'var(--color-accent)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                                ⚡ {act.impact}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                            <span className="text-[10px] text-zinc-400 font-mono truncate max-w-[140px]">{act.tag || act.stat || ''}</span>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => setEditingActivity({
                                  ...act,
                                  gallery: Array.isArray(act.gallery || act.images) 
                                    ? (act.gallery || act.images).join('\n') 
                                    : (act.gallery || act.images || act.img || '')
                                })} 
                                className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 border cursor-pointer" 
                                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-accent)' }}
                              >
                                <Edit3 className="w-3.5 h-3.5" /> Edit
                              </button>
                              <button onClick={() => handleDeleteActivity(act.id)} className="p-1 rounded-lg border text-zinc-400 hover:text-red-400 cursor-pointer" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ================= TECH SKILLS ================= */}
              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div>
                      <h2 className="text-base font-bold font-sans text-white">Tech Arsenal ({techSkills.length})</h2>
                      <p className="text-xs text-zinc-400 font-mono">Manage languages, frameworks, AI models, & DevOps tools</p>
                    </div>

                    <button
                      onClick={() => setEditingSkill({ name: '', category: SKILL_CATEGORIES[0], level: SKILL_LEVELS[0] })}
                      className="px-4 py-2 rounded-xl font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-md hover:opacity-90"
                      style={{ background: 'var(--color-accent)', color: '#000' }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add Skill</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {techSkills.map((skill, idx) => (
                      <div key={skill.id || idx} className="p-3 rounded-xl border flex items-center justify-between" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}>
                        <div>
                          <h4 className="text-xs font-bold text-white font-sans">{skill.name}</h4>
                          <span className="text-[10px] font-mono text-accent uppercase" style={{ color: 'var(--color-accent)' }}>{skill.category} • {skill.level}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setEditingSkill(skill)} className="p-1 rounded text-zinc-400 hover:text-white cursor-pointer"><Edit3 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDeleteSkill(skill.id)} className="p-1 rounded text-zinc-400 hover:text-red-400 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= HERO STATS ================= */}
              {activeTab === 'stats' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div>
                      <h2 className="text-base font-bold font-sans text-white">Hero Telemetry Stats ({stats.length})</h2>
                      <p className="text-xs text-zinc-400 font-mono">Production Apps (15+), Commits (1,400+), Papers (04)</p>
                    </div>

                    <button
                      onClick={() => setEditingStat({ label: 'Production Apps', value: '15+' })}
                      className="px-4 py-2 rounded-xl font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-md hover:opacity-90"
                      style={{ background: 'var(--color-accent)', color: '#000' }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add Stat</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {stats.map((stat, idx) => (
                      <div key={stat.id || idx} className="p-4 rounded-xl border flex items-center justify-between" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}>
                        <div>
                          <span className="text-xs text-zinc-400 font-mono">{stat.label}</span>
                          <h3 className="text-xl font-bold text-white font-sans">{stat.value}</h3>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setEditingStat(stat)} className="p-1.5 rounded text-zinc-400 hover:text-white cursor-pointer"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteStat(stat.id)} className="p-1.5 rounded text-zinc-400 hover:text-red-400 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= EDUCATION ================= */}
              {activeTab === 'education' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div>
                      <h2 className="text-base font-bold font-sans text-white">Education History ({education.length})</h2>
                      <p className="text-xs text-zinc-400 font-mono">Academic degrees, university, CGPA, & specializations</p>
                    </div>

                    <button
                      onClick={() => setEditingEducation({ degree: 'B.Sc. in Computer Science & Engineering', institution: 'Daffodil International University (DIU)', period: '2021 - Present', cgpa: '3.85 / 4.00', details: 'Specializing in Intelligent Systems.' })}
                      className="px-4 py-2 rounded-xl font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-md hover:opacity-90"
                      style={{ background: 'var(--color-accent)', color: '#000' }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add Education</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {education.map((edu, idx) => (
                      <div key={edu.id || idx} className="p-4 rounded-xl border flex items-center justify-between" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}>
                        <div className="space-y-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold text-accent" style={{ color: 'var(--color-accent)' }}>{edu.period} • CGPA: {edu.cgpa}</span>
                          <h3 className="text-sm font-bold text-white font-sans">{edu.degree}</h3>
                          <p className="text-xs text-zinc-400 font-sans">{edu.institution}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setEditingEducation(edu)} className="px-3 py-1 rounded text-xs font-mono font-bold border text-accent cursor-pointer" style={{ color: 'var(--color-accent)', borderColor: 'var(--color-border)' }}><Edit3 className="w-3.5 h-3.5 inline mr-1" />Edit</button>
                          <button onClick={() => handleDeleteEducation(edu.id)} className="p-1 rounded text-zinc-400 hover:text-red-400 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= RESEARCH PAPERS ================= */}
              {activeTab === 'research' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div>
                      <h2 className="text-base font-bold font-sans text-white">Research Papers ({researchPapers.length})</h2>
                      <p className="text-xs text-zinc-400 font-mono">IEEE/Springer papers, DOI, abstracts, & citation telemetry</p>
                    </div>

                    <button
                      onClick={() => setEditingResearch({ title: '', domain: 'AgriTech & Environment 🌾', mlTech: 'TinyML / Signal Processing', venue: 'IEEE Edge AI (2024)', year: '2024', hardware: 'ESP32-S3', metrics: '94.2% Accuracy', abstract: 'Novel low-latency neural network architecture...', doi: '10.1109/IEEE.2024.1042', citation: 'Ratul, M. H. et al. (2024).' })}
                      className="px-4 py-2 rounded-xl font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-md hover:opacity-90"
                      style={{ background: 'var(--color-accent)', color: '#000' }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add Paper</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {researchPapers.map((paper, idx) => (
                      <div key={paper.id || idx} className="p-4 rounded-xl border flex items-center justify-between" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}>
                        <div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-mono text-accent font-bold" style={{ color: 'var(--color-accent)' }}>{paper.venue || 'IEEE'} {paper.year}</span>
                          <h3 className="text-sm font-bold text-white font-sans pt-1">{paper.title}</h3>
                          <p className="text-xs text-zinc-400 font-sans line-clamp-1">{paper.abstract}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setEditingResearch(paper)} className="px-2.5 py-1 rounded text-xs font-mono font-bold border text-accent cursor-pointer" style={{ color: 'var(--color-accent)', borderColor: 'var(--color-border)' }}><Edit3 className="w-3.5 h-3.5 inline mr-1" />Edit</button>
                          <button onClick={() => handleDeleteResearch(paper.id)} className="p-1 rounded text-zinc-400 hover:text-red-400 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= PROFILE & ABOUT ME CONTENT ================= */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSavePersonInfo} className="space-y-5 font-sans">
                  <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div>
                      <h2 className="text-base font-bold text-white">Edit Profile, About Content & Social Links</h2>
                      <p className="text-xs text-zinc-400 font-mono">Live synchronization with Hero, About, Navbar, and Footer sections</p>
                    </div>
                    <button type="submit" disabled={saving} className="px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md font-mono hover:opacity-90" style={{ background: 'var(--color-accent)', color: '#000' }}>
                      <Check className="w-4 h-4" />
                      <span>{saving ? 'Saving...' : 'Save Profile & About'}</span>
                    </button>
                  </div>

                  {/* 1. Identity & Hero */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent" style={{ color: 'var(--color-accent)' }}>1. Identity & Hero Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <label className="text-xs block mb-1 text-zinc-400 font-sans">Full Name</label>
                        <input type="text" value={personInfo.name || ''} onChange={e => setPersonInfo({ ...personInfo, name: e.target.value })} className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                      </div>

                      <div>
                        <label className="text-xs block mb-1 text-zinc-400 font-sans">Headline Title / Role</label>
                        <input type="text" value={personInfo.title || personInfo.role || ''} onChange={e => setPersonInfo({ ...personInfo, title: e.target.value, role: e.target.value })} className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                      </div>

                      <div>
                        <label className="text-xs block mb-1 text-zinc-400 font-sans">Availability Status</label>
                        <input type="text" value={personInfo.status || personInfo.availability || ''} onChange={e => setPersonInfo({ ...personInfo, status: e.target.value, availability: e.target.value })} placeholder="Available for Roles / Open for Work" className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                      </div>

                      <div>
                        <label className="text-xs block mb-1 text-zinc-400 font-sans">Location</label>
                        <input type="text" value={personInfo.location || ''} onChange={e => setPersonInfo({ ...personInfo, location: e.target.value })} placeholder="Savar, Dhaka, Bangladesh" className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs block mb-1 text-zinc-400 font-sans">Hero Subtitle Tagline</label>
                        <input type="text" value={personInfo.tagline || ''} onChange={e => setPersonInfo({ ...personInfo, tagline: e.target.value })} placeholder="Building high-performance web systems..." className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                      </div>
                    </div>
                  </div>

                  {/* 2. About Section Content */}
                  <div className="space-y-3 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent" style={{ color: 'var(--color-accent)' }}>2. About Section Content</h3>
                    
                    <div>
                      <label className="text-xs block mb-1 text-zinc-400 font-sans">About Section Bold Headline</label>
                      <input type="text" value={personInfo.aboutHeadline || ''} onChange={e => setPersonInfo({ ...personInfo, aboutHeadline: e.target.value })} placeholder="Architecting high-performance web systems and autonomous AI workflows." className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                    </div>

                    <div>
                      <label className="text-xs block mb-1 text-zinc-400 font-sans">About Narrative Bio (Summary)</label>
                      <textarea rows={3} value={personInfo.about || personInfo.bio || ''} onChange={e => setPersonInfo({ ...personInfo, about: e.target.value, bio: e.target.value })} placeholder="B.Sc in CSE at Daffodil International University..." className="w-full px-3.5 py-2 rounded-xl text-xs outline-none text-white font-sans leading-relaxed" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                    </div>

                    <div>
                      <label className="text-xs block mb-1 text-zinc-400 font-sans">Core Capability Pills (Comma Separated)</label>
                      <input 
                        type="text" 
                        value={Array.isArray(personInfo.skills) ? personInfo.skills.join(', ') : (personInfo.skills || '')} 
                        onChange={e => setPersonInfo({ ...personInfo, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} 
                        placeholder="Next.js 14, React, TypeScript, Python, LangChain & RAG, Edge AI / TinyML, Tailwind CSS" 
                        className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans text-xs" 
                        style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} 
                      />
                    </div>
                  </div>

                  {/* 3. Media & Documents */}
                  <div className="space-y-3 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent" style={{ color: 'var(--color-accent)' }}>3. Profile Avatar & Documents</h3>
                    
                    <div>
                      <label className="text-xs block mb-1 text-zinc-400 font-sans">Profile Cutout Avatar (Upload or URL)</label>
                      <div className="flex items-center gap-2 font-mono">
                        <input type="text" value={personInfo.avatar || ''} onChange={e => setPersonInfo({ ...personInfo, avatar: e.target.value })} placeholder="/images/profile/Profile Pic Without BG.png" className="flex-1 px-3.5 py-2 rounded-xl text-xs outline-none text-white font-mono" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                        <label className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer border hover:opacity-90" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)', color: 'var(--color-accent)' }}>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Avatar</span>
                          <input type="file" accept="image/*" className="hidden" onChange={e => handleSingleFileUpload(e, url => setPersonInfo({ ...personInfo, avatar: url }))} />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs block mb-1 text-zinc-400 font-sans">Resume PDF Document (Upload or URL)</label>
                      <div className="flex items-center gap-2 font-mono">
                        <input type="text" value={personInfo.resumeUrl || ''} onChange={e => setPersonInfo({ ...personInfo, resumeUrl: e.target.value })} placeholder="/Mahmud_Hasan_Ratul_CV.pdf" className="flex-1 px-3.5 py-2 rounded-xl text-xs outline-none text-white font-mono" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                        <label className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer border hover:opacity-90" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)', color: 'var(--color-accent)' }}>
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload PDF</span>
                          <input type="file" accept="application/pdf" className="hidden" onChange={e => handleSingleFileUpload(e, url => setPersonInfo({ ...personInfo, resumeUrl: url }))} />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* 4. Social Links & Contact */}
                  <div className="space-y-3 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-accent" style={{ color: 'var(--color-accent)' }}>4. Contact & Social Profiles</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <label className="text-xs block mb-1 text-zinc-400 font-sans">Email Address</label>
                        <input type="email" value={personInfo.email || ''} onChange={e => setPersonInfo({ ...personInfo, email: e.target.value })} className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                      </div>

                      <div>
                        <label className="text-xs block mb-1 text-zinc-400 font-sans">GitHub Profile URL</label>
                        <input type="text" value={personInfo.github || ''} onChange={e => setPersonInfo({ ...personInfo, github: e.target.value })} placeholder="https://github.com/..." className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                      </div>

                      <div>
                        <label className="text-xs block mb-1 text-zinc-400 font-sans">LinkedIn Profile URL</label>
                        <input type="text" value={personInfo.linkedin || ''} onChange={e => setPersonInfo({ ...personInfo, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                      </div>

                      <div>
                        <label className="text-xs block mb-1 text-zinc-400 font-sans">Twitter / X URL</label>
                        <input type="text" value={personInfo.twitter || ''} onChange={e => setPersonInfo({ ...personInfo, twitter: e.target.value })} placeholder="https://twitter.com/..." className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* ================= MESSAGES INBOX ================= */}
              {activeTab === 'messages' && (
                <div className="space-y-4 font-sans">
                  <div className="pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <h2 className="text-base font-bold text-white">Visitor Contact Submissions ({messages.length})</h2>
                  </div>

                  {messages.length === 0 ? (
                    <div className="p-6 text-center text-xs font-mono text-zinc-400 rounded-xl border" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}>No messages in inbox.</div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg, idx) => (
                        <div key={msg.id || idx} className="p-4 rounded-xl border space-y-2" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}>
                          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--color-border)' }}>
                            <div>
                              <span className="text-sm font-bold text-white font-sans">{msg.name}</span>
                              <a href={`mailto:${msg.email}`} className="text-xs font-mono text-accent ml-2 underline">({msg.email})</a>
                            </div>
                            <button onClick={() => handleDeleteMessage(msg.id)} className="p-1 rounded-lg border text-zinc-400 hover:text-red-400 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                          <p className="text-xs text-zinc-300 font-sans leading-relaxed">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* ================= CLEAN MODAL 1: PROJECTS WITH MULTI-IMAGE UPLOAD ================= */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-2xl rounded-2xl p-6 space-y-4 shadow-2xl relative border max-h-[90vh] overflow-y-auto custom-scrollbar" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-base font-bold text-white">{editingProject.id ? '✏️ Edit Project' : '🚀 Create New Project'}</h3>
              <button onClick={() => setEditingProject(null)} className="p-1 text-zinc-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-zinc-400">Project Title</label>
                  <input type="text" value={editingProject.title || ''} onChange={e => setEditingProject({ ...editingProject, title: e.target.value })} placeholder="e.g. SIPPRQ Engine" className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-zinc-400">Category (Select or Type Custom)</label>
                    <span className="text-[10px] font-mono text-accent" style={{ color: 'var(--color-accent)' }}>Customizable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      list="project-categories-list"
                      value={editingProject.category || ''} 
                      onChange={e => setEditingProject({ ...editingProject, category: e.target.value })} 
                      placeholder="e.g. Full-Stack Web App, Robotics, AI..." 
                      className="flex-1 px-3.5 py-2 rounded-xl outline-none text-white font-sans" 
                      style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} 
                      required 
                    />
                    <select 
                      value={PROJECT_CATEGORIES.includes(editingProject.category) ? editingProject.category : ''} 
                      onChange={e => { if (e.target.value) setEditingProject({ ...editingProject, category: e.target.value }); }} 
                      className="w-32 px-2.5 py-2 rounded-xl outline-none text-xs text-white cursor-pointer font-sans" 
                      style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
                    >
                      <option value="">Presets ▾</option>
                      {PROJECT_CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#141419' }}>{c}</option>)}
                    </select>
                  </div>
                  <datalist id="project-categories-list">
                    {PROJECT_CATEGORIES.map(c => <option key={c} value={c} />)}
                  </datalist>
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">Status (Dropdown)</label>
                  <select value={editingProject.status || PROJECT_STATUSES[0]} onChange={e => setEditingProject({ ...editingProject, status: e.target.value })} className="w-full px-3 py-2 rounded-xl outline-none text-white cursor-pointer font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
                    {PROJECT_STATUSES.map(s => <option key={s} value={s} style={{ background: '#141419' }}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">Timeline / Date</label>
                  <input type="text" value={editingProject.time || ''} onChange={e => setEditingProject({ ...editingProject, time: e.target.value })} placeholder="Q3 2024 / Jan 2024 - Present" className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-zinc-400">Tech Stack (Synced with Tech Arsenal)</label>
                    <span className="text-[10px] font-mono text-accent" style={{ color: 'var(--color-accent)' }}>
                      Click pills to toggle or type below
                    </span>
                  </div>

                  {/* Live Tech Skills Quick Toggle Pills */}
                  {techSkills.length > 0 && (
                    <div className="p-2.5 rounded-xl border space-y-1.5" style={{ background: 'rgba(0,0,0,0.35)', borderColor: 'var(--color-border)' }}>
                      <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                        <span>⚡ Quick Add from Tech Skills ({techSkills.length}):</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto custom-scrollbar p-1">
                        {techSkills.map((s) => {
                          const currentTechs = Array.isArray(editingProject.tech) 
                            ? editingProject.tech 
                            : typeof editingProject.tech === 'string' 
                            ? editingProject.tech.split(',').map(t => t.trim()).filter(Boolean) 
                            : [];
                          const isSelected = currentTechs.some(t => t.toLowerCase() === s.name.toLowerCase());

                          return (
                            <button
                              key={s.id || s.name}
                              type="button"
                              onClick={() => {
                                let updated;
                                if (isSelected) {
                                  updated = currentTechs.filter(t => t.toLowerCase() !== s.name.toLowerCase());
                                } else {
                                  updated = [...currentTechs, s.name];
                                }
                                setEditingProject({ ...editingProject, tech: updated.join(', ') });
                              }}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold flex items-center gap-1 border transition-all cursor-pointer shadow-sm hover:scale-105"
                              style={{
                                background: isSelected ? 'var(--color-accent)' : 'var(--color-surface)',
                                color: isSelected ? '#000' : 'var(--color-text-muted)',
                                borderColor: isSelected ? 'var(--color-accent)' : 'var(--color-border)',
                                fontWeight: isSelected ? 'bold' : 'normal'
                              }}
                            >
                              <span>{isSelected ? '✓' : '+'}</span>
                              <span>{s.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <input 
                    type="text" 
                    value={Array.isArray(editingProject.tech) ? editingProject.tech.join(', ') : (editingProject.tech || '')} 
                    onChange={e => setEditingProject({ ...editingProject, tech: e.target.value })} 
                    placeholder="Next.js 14, React, Node.js, PyTorch..." 
                    className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" 
                    style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} 
                  />
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">Metrics Chip</label>
                  <input type="text" value={editingProject.metrics || ''} onChange={e => setEditingProject({ ...editingProject, metrics: e.target.value })} placeholder="95+ Lighthouse Score" className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">GitHub Repo URL</label>
                  <input type="text" value={editingProject.githubUrl || editingProject.github_url || ''} onChange={e => setEditingProject({ ...editingProject, githubUrl: e.target.value, github_url: e.target.value })} placeholder="https://github.com/..." className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-mono text-[11px]" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">Live Demo URL</label>
                  <input type="text" value={editingProject.liveUrl || editingProject.live_url || ''} onChange={e => setEditingProject({ ...editingProject, liveUrl: e.target.value, live_url: e.target.value })} placeholder="https://..." className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-mono text-[11px]" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-zinc-400">Main Cover Image (Single Upload or URL)</label>
                <div className="flex items-center gap-2">
                  <input type="text" value={editingProject.image || ''} onChange={e => setEditingProject({ ...editingProject, image: e.target.value })} placeholder="/images/projects/sipprq1.png" className="flex-1 px-3.5 py-2 rounded-xl outline-none text-white font-mono text-[11px]" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                  <label className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer border" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)', color: 'var(--color-accent)' }}>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Cover</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleSingleFileUpload(e, url => setEditingProject({ ...editingProject, image: url }))} />
                  </label>
                </div>
              </div>

              {/* MULTI-IMAGE GALLERY MANAGER */}
              <div className="p-3.5 rounded-xl border space-y-3" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Images className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                    <label className="font-bold text-white text-xs">Project Gallery Screenshots ({getGalleryArray(editingProject.gallery).length})</label>
                  </div>

                  <label className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer border shadow-sm" style={{ background: 'var(--color-accent)', color: '#000', borderColor: 'var(--color-accent)' }}>
                    <Upload className="w-3.5 h-3.5" />
                    <span>+ Upload Multiple Images</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                      onChange={e => handleMultipleFilesUpload(e, urls => {
                        const current = getGalleryArray(editingProject.gallery);
                        const updated = [...current, ...urls];
                        setEditingProject({ ...editingProject, gallery: updated.join('\n') });
                      })} 
                    />
                  </label>
                </div>

                {/* Thumbnails Grid Preview */}
                {getGalleryArray(editingProject.gallery).length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {getGalleryArray(editingProject.gallery).map((url, i) => (
                      <div key={i} className="relative group rounded-xl overflow-hidden border aspect-video bg-black/60 shadow-inner" style={{ borderColor: 'var(--color-border)' }}>
                        <img src={url} alt={`Gallery item ${i + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const current = getGalleryArray(editingProject.gallery);
                            const updated = current.filter((_, idx) => idx !== i);
                            setEditingProject({ ...editingProject, gallery: updated.join('\n') });
                          }}
                          className="absolute top-1 right-1 p-1 rounded-lg bg-red-600/90 hover:bg-red-600 text-white shadow-md cursor-pointer transition-transform group-hover:scale-105"
                          title="Remove picture"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="block mb-1 text-[11px] text-zinc-400 font-mono">Gallery Image URLs (One URL per line)</label>
                  <textarea rows={2} value={typeof editingProject.gallery === 'string' ? editingProject.gallery : (getGalleryArray(editingProject.gallery).join('\n'))} onChange={e => setEditingProject({ ...editingProject, gallery: e.target.value })} placeholder="/images/projects/sipprq1.png&#10;/images/projects/sipprq2.png" className="w-full px-3 py-2 rounded-xl outline-none text-white font-mono text-[11px]" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }} />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-zinc-400">Short Summary</label>
                <textarea rows={2} value={editingProject.description || ''} onChange={e => setEditingProject({ ...editingProject, description: e.target.value })} placeholder="Short summary..." className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
              </div>

              <div>
                <label className="block mb-1 text-zinc-400">Long Architecture & Detailed Spec</label>
                <textarea rows={3} value={editingProject.longDesc || ''} onChange={e => setEditingProject({ ...editingProject, longDesc: e.target.value })} placeholder="Full architecture breakdown..." className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
              </div>

              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <label className="flex items-center gap-2 text-xs cursor-pointer text-white">
                  <input type="checkbox" checked={Boolean(editingProject.featured)} onChange={e => setEditingProject({ ...editingProject, featured: e.target.checked })} className="rounded" />
                  <span>★ Featured Flagship Work</span>
                </label>

                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setEditingProject(null)} className="px-4 py-2 rounded-xl font-bold cursor-pointer text-zinc-400">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-md font-mono" style={{ background: 'var(--color-accent)', color: '#000' }}><Check className="w-4 h-4" /><span>Save Project</span></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CLEAN MODAL 2: WORK EXPERIENCE ================= */}
      {editingExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-xl rounded-2xl p-6 space-y-4 shadow-2xl relative border max-h-[90vh] overflow-y-auto" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-base font-bold text-white">{editingExperience.id ? '✏️ Edit Experience Role' : '💼 Add Experience Role'}</h3>
              <button onClick={() => setEditingExperience(null)} className="p-1 text-zinc-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveExperience} className="space-y-3 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-zinc-400">Role Title</label>
                  <input type="text" value={editingExperience.role || ''} onChange={e => setEditingExperience({ ...editingExperience, role: e.target.value })} placeholder="e.g. Full-Stack Intern" className="w-full px-3.5 py-2 rounded-xl outline-none text-white" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">Company / Organization</label>
                  <input type="text" value={editingExperience.organization || ''} onChange={e => setEditingExperience({ ...editingExperience, organization: e.target.value })} placeholder="e.g. Tech Solutions" className="w-full px-3.5 py-2 rounded-xl outline-none text-white" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-zinc-400">Category (Select or Type Custom)</label>
                    <span className="text-[10px] font-mono text-accent" style={{ color: 'var(--color-accent)' }}>Customizable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      list="experience-categories-list"
                      value={editingExperience.category || ''} 
                      onChange={e => setEditingExperience({ ...editingExperience, category: e.target.value })} 
                      placeholder="e.g. Internship, Full-Time..." 
                      className="flex-1 px-3.5 py-2 rounded-xl outline-none text-white font-sans" 
                      style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} 
                      required 
                    />
                    <select 
                      value={EXPERIENCE_CATEGORIES.includes(editingExperience.category) ? editingExperience.category : ''} 
                      onChange={e => { if (e.target.value) setEditingExperience({ ...editingExperience, category: e.target.value }); }} 
                      className="w-28 px-2 py-2 rounded-xl outline-none text-xs text-white cursor-pointer font-sans" 
                      style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
                    >
                      <option value="">Presets ▾</option>
                      {EXPERIENCE_CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#141419' }}>{c}</option>)}
                    </select>
                  </div>
                  <datalist id="experience-categories-list">
                    {EXPERIENCE_CATEGORIES.map(c => <option key={c} value={c} />)}
                  </datalist>
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">Timeline Period</label>
                  <input type="text" value={editingExperience.period || ''} onChange={e => setEditingExperience({ ...editingExperience, period: e.target.value })} placeholder="2023 - Present" className="w-full px-3.5 py-2 rounded-xl outline-none text-white" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-zinc-400">Company Logo (URL or Upload File)</label>
                <div className="flex items-center gap-2">
                  <input type="text" value={editingExperience.logo || ''} onChange={e => setEditingExperience({ ...editingExperience, logo: e.target.value })} placeholder="/tech1.jpg" className="flex-1 px-3.5 py-2 rounded-xl outline-none text-white font-mono text-[11px]" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                  <label className="px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer border" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)', color: 'var(--color-accent)' }}>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleSingleFileUpload(e, url => setEditingExperience({ ...editingExperience, logo: url }))} />
                  </label>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-zinc-400">Key Achievements (One bullet per line)</label>
                <textarea rows={4} value={Array.isArray(editingExperience.bullets) ? editingExperience.bullets.join('\n') : (editingExperience.bullets || '')} onChange={e => setEditingExperience({ ...editingExperience, bullets: e.target.value })} placeholder="Delivered 15+ production apps...\nOptimized performance..." className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <button type="button" onClick={() => setEditingExperience(null)} className="px-4 py-2 rounded-xl font-bold cursor-pointer text-zinc-400">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-md font-mono" style={{ background: 'var(--color-accent)', color: '#000' }}><Check className="w-4 h-4" /><span>Save Role</span></button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CLEAN MODAL 3: CAMPUS ACTIVITY WITH MULTI-IMAGE UPLOADING ================= */}
      {editingActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-2xl rounded-2xl p-6 space-y-4 shadow-2xl relative border max-h-[90vh] overflow-y-auto custom-scrollbar" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-base font-bold text-white">{editingActivity.id ? '✏️ Edit Event / Leadership Activity' : '🏫 Add Event / Leadership Activity'}</h3>
              <button onClick={() => setEditingActivity(null)} className="p-1 text-zinc-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveActivity} className="space-y-3.5 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-zinc-400">Activity / Event Title</label>
                  <input type="text" value={editingActivity.title || ''} onChange={e => setEditingActivity({ ...editingActivity, title: e.target.value })} placeholder="e.g. DIU Blood Donors Club (DIU BDC)" className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-zinc-400">Category (Select or Type Custom)</label>
                    <span className="text-[10px] font-mono text-accent" style={{ color: 'var(--color-accent)' }}>Customizable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      list="campus-categories-list"
                      value={editingActivity.category || ''} 
                      onChange={e => setEditingActivity({ ...editingActivity, category: e.target.value })} 
                      placeholder="e.g. University Events, Hackathons..." 
                      className="flex-1 px-3.5 py-2 rounded-xl outline-none text-white font-sans" 
                      style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} 
                      required 
                    />
                    <select 
                      value={CAMPUS_CATEGORIES.includes(editingActivity.category) ? editingActivity.category : ''} 
                      onChange={e => { if (e.target.value) setEditingActivity({ ...editingActivity, category: e.target.value }); }} 
                      className="w-28 px-2 py-2 rounded-xl outline-none text-xs text-white cursor-pointer font-sans" 
                      style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
                    >
                      <option value="">Presets ▾</option>
                      {CAMPUS_CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#141419' }}>{c}</option>)}
                    </select>
                  </div>
                  <datalist id="campus-categories-list">
                    {CAMPUS_CATEGORIES.map(c => <option key={c} value={c} />)}
                  </datalist>
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">Role / Position</label>
                  <input type="text" value={editingActivity.role || ''} onChange={e => setEditingActivity({ ...editingActivity, role: e.target.value })} placeholder="e.g. Executive Member & Lead Organizer" className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">Tenure / Year Range</label>
                  <input type="text" value={editingActivity.year || ''} onChange={e => setEditingActivity({ ...editingActivity, year: e.target.value })} placeholder="2022 - Present / 2024" className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">Key Impact Metric</label>
                  <input type="text" value={editingActivity.impact || ''} onChange={e => setEditingActivity({ ...editingActivity, impact: e.target.value })} placeholder="500+ Donors Registered • 12 On-Campus Drives" className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">Short Stat Badge / Tag</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" value={editingActivity.stat || ''} onChange={e => setEditingActivity({ ...editingActivity, stat: e.target.value })} placeholder="500+ Donors" className="w-full px-3 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                    <input type="text" value={editingActivity.tag || ''} onChange={e => setEditingActivity({ ...editingActivity, tag: e.target.value })} placeholder="Campus Leadership" className="w-full px-3 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-zinc-400">Primary Cover Image (Single Upload or URL)</label>
                <div className="flex items-center gap-2">
                  <input type="text" value={editingActivity.img || ''} onChange={e => setEditingActivity({ ...editingActivity, img: e.target.value })} placeholder="/cpc1.jpg" className="flex-1 px-3.5 py-2 rounded-xl outline-none text-white font-mono text-[11px]" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                  <label className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer border" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)', color: 'var(--color-accent)' }}>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Cover</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleSingleFileUpload(e, url => setEditingActivity({ ...editingActivity, img: url }))} />
                  </label>
                </div>
              </div>

              {/* MULTI-IMAGE EVENT PHOTO ALBUM MANAGER */}
              <div className="p-3.5 rounded-xl border space-y-3" style={{ background: 'var(--color-surface-2)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Images className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                    <label className="font-bold text-white text-xs">Event Photo Album ({getGalleryArray(editingActivity.gallery || editingActivity.images).length} Photos)</label>
                  </div>

                  <label className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer border shadow-sm" style={{ background: 'var(--color-accent)', color: '#000', borderColor: 'var(--color-accent)' }}>
                    <Upload className="w-3.5 h-3.5" />
                    <span>+ Upload Multiple Photos</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden" 
                      onChange={e => handleMultipleFilesUpload(e, urls => {
                        const current = getGalleryArray(editingActivity.gallery || editingActivity.images);
                        const updated = [...current, ...urls];
                        setEditingActivity({ 
                          ...editingActivity, 
                          gallery: updated.join('\n'),
                          images: updated,
                          img: editingActivity.img || updated[0] || ''
                        });
                      })} 
                    />
                  </label>
                </div>

                {/* Thumbnails Grid Preview */}
                {getGalleryArray(editingActivity.gallery || editingActivity.images).length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {getGalleryArray(editingActivity.gallery || editingActivity.images).map((url, i) => (
                      <div key={i} className="relative group rounded-xl overflow-hidden border aspect-video bg-black/60 shadow-inner" style={{ borderColor: 'var(--color-border)' }}>
                        <img src={url} alt={`Event photo ${i + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            const current = getGalleryArray(editingActivity.gallery || editingActivity.images);
                            const updated = current.filter((_, idx) => idx !== i);
                            setEditingActivity({ 
                              ...editingActivity, 
                              gallery: updated.join('\n'),
                              images: updated 
                            });
                          }}
                          className="absolute top-1 right-1 p-1 rounded-lg bg-red-600/90 hover:bg-red-600 text-white shadow-md cursor-pointer transition-transform group-hover:scale-105"
                          title="Remove picture"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="block mb-1 text-[11px] text-zinc-400 font-mono">Event Image URLs (One URL per line)</label>
                  <textarea rows={2} value={typeof editingActivity.gallery === 'string' ? editingActivity.gallery : (getGalleryArray(editingActivity.gallery || editingActivity.images).join('\n'))} onChange={e => setEditingActivity({ ...editingActivity, gallery: e.target.value })} placeholder="/cpc1.jpg&#10;/tech2.JPG&#10;/icpc1.jpg" className="w-full px-3 py-2 rounded-xl outline-none text-white font-mono text-[11px]" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }} />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-zinc-400">Detailed Description & Responsibilities</label>
                <textarea rows={3} value={editingActivity.desc || editingActivity.description || ''} onChange={e => setEditingActivity({ ...editingActivity, desc: e.target.value, description: e.target.value })} placeholder="Summary of responsibilities, achievements, and impact..." className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <button type="button" onClick={() => setEditingActivity(null)} className="px-4 py-2 rounded-xl font-bold cursor-pointer text-zinc-400">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-md font-mono" style={{ background: 'var(--color-accent)', color: '#000' }}><Check className="w-4 h-4" /><span>Save Activity</span></button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CLEAN MODAL 4: RESEARCH PAPERS ================= */}
      {editingResearch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-xl rounded-2xl p-6 space-y-4 shadow-2xl relative border max-h-[90vh] overflow-y-auto" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-base font-bold text-white">{editingResearch.id ? '✏️ Edit Paper' : '📚 Add Research Paper'}</h3>
              <button onClick={() => setEditingResearch(null)} className="p-1 text-zinc-400 hover:text-white cursor-pointer"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSaveResearch} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block mb-1 text-zinc-400">Paper Title</label>
                <input type="text" value={editingResearch.title || ''} onChange={e => setEditingResearch({ ...editingResearch, title: e.target.value })} placeholder="e.g. Edge-AI Acoustic Deforestation Monitor" className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-zinc-400">Domain Tag</label>
                  <input type="text" value={editingResearch.domain || ''} onChange={e => setEditingResearch({ ...editingResearch, domain: e.target.value })} placeholder="AgriTech & Environment 🌾" className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">ML Tech Tag</label>
                  <input type="text" value={editingResearch.mlTech || ''} onChange={e => setEditingResearch({ ...editingResearch, mlTech: e.target.value })} placeholder="TinyML / Signal Processing" className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">Venue / Journal</label>
                  <input type="text" value={editingResearch.venue || ''} onChange={e => setEditingResearch({ ...editingResearch, venue: e.target.value })} placeholder="IEEE Edge AI (2024)" className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">Publication Year</label>
                  <input type="text" value={editingResearch.year || ''} onChange={e => setEditingResearch({ ...editingResearch, year: e.target.value })} placeholder="2024" className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                </div>
              </div>
              <div>
                <label className="block mb-1 text-zinc-400">Abstract Summary</label>
                <textarea rows={3} value={editingResearch.abstract || ''} onChange={e => setEditingResearch({ ...editingResearch, abstract: e.target.value })} placeholder="Paper abstract..." className="w-full px-3.5 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <button type="button" onClick={() => setEditingResearch(null)} className="px-4 py-2 rounded-xl font-bold cursor-pointer text-zinc-400">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-md font-mono" style={{ background: 'var(--color-accent)', color: '#000' }}><Check className="w-4 h-4" /><span>Save Paper</span></button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CLEAN MODAL 5: TECH SKILLS ================= */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-sm font-bold text-white">{editingSkill.id ? 'Edit Skill' : 'Add Tech Skill'}</h3>
              <button onClick={() => setEditingSkill(null)} className="text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveSkill} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block mb-1 text-zinc-400">Skill Name</label>
                <input type="text" value={editingSkill.name || ''} onChange={e => setEditingSkill({ ...editingSkill, name: e.target.value })} placeholder="e.g. Next.js 14" className="w-full px-3 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
              </div>
              <div>
                <label className="block mb-1 text-zinc-400">Category</label>
                <select value={editingSkill.category || SKILL_CATEGORIES[0]} onChange={e => setEditingSkill({ ...editingSkill, category: e.target.value })} className="w-full px-3 py-2 rounded-xl outline-none text-white uppercase cursor-pointer font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
                  {SKILL_CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#141419' }}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-zinc-400">Proficiency Level</label>
                <select value={editingSkill.level || SKILL_LEVELS[0]} onChange={e => setEditingSkill({ ...editingSkill, level: e.target.value })} className="w-full px-3 py-2 rounded-xl outline-none text-white cursor-pointer font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
                  {SKILL_LEVELS.map(l => <option key={l} value={l} style={{ background: '#141419' }}>{l}</option>)}
                </select>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <button type="button" onClick={() => setEditingSkill(null)} className="px-3 py-1.5 rounded-lg text-zinc-400 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded-lg font-bold cursor-pointer font-mono" style={{ background: 'var(--color-accent)', color: '#000' }}>Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CLEAN MODAL 6: HERO STATS ================= */}
      {editingStat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl relative border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-sm font-bold text-white">{editingStat.id ? 'Edit Stat' : 'Add Hero Stat'}</h3>
              <button onClick={() => setEditingStat(null)} className="text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveStat} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block mb-1 text-zinc-400">Stat Label</label>
                <input type="text" value={editingStat.label || ''} onChange={e => setEditingStat({ ...editingStat, label: e.target.value })} placeholder="e.g. Production Apps" className="w-full px-3 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
              </div>
              <div>
                <label className="block mb-1 text-zinc-400">Value</label>
                <input type="text" value={editingStat.value || ''} onChange={e => setEditingStat({ ...editingStat, value: e.target.value })} placeholder="15+" className="w-full px-3 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <button type="button" onClick={() => setEditingStat(null)} className="px-3 py-1.5 rounded-lg text-zinc-400 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded-lg font-bold cursor-pointer font-mono" style={{ background: 'var(--color-accent)', color: '#000' }}>Save Stat</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CLEAN MODAL 7: EDUCATION ================= */}
      {editingEducation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-2xl relative border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-sm font-bold text-white">{editingEducation.id ? 'Edit Education' : 'Add Education'}</h3>
              <button onClick={() => setEditingEducation(null)} className="text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSaveEducation} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block mb-1 text-zinc-400">Degree Title</label>
                <input type="text" value={editingEducation.degree || ''} onChange={e => setEditingEducation({ ...editingEducation, degree: e.target.value })} placeholder="B.Sc. in Computer Science & Engineering" className="w-full px-3 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
              </div>
              <div>
                <label className="block mb-1 text-zinc-400">Institution / University</label>
                <input type="text" value={editingEducation.institution || ''} onChange={e => setEditingEducation({ ...editingEducation, institution: e.target.value })} placeholder="Daffodil International University (DIU)" className="w-full px-3 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-1 text-zinc-400">Period</label>
                  <input type="text" value={editingEducation.period || ''} onChange={e => setEditingEducation({ ...editingEducation, period: e.target.value })} placeholder="2021 - Present" className="w-full px-3 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                </div>
                <div>
                  <label className="block mb-1 text-zinc-400">CGPA</label>
                  <input type="text" value={editingEducation.cgpa || ''} onChange={e => setEditingEducation({ ...editingEducation, cgpa: e.target.value })} placeholder="3.85 / 4.00" className="w-full px-3 py-2 rounded-xl outline-none text-white font-sans" style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }} />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <button type="button" onClick={() => setEditingEducation(null)} className="px-3 py-1.5 rounded-lg text-zinc-400 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-1.5 rounded-lg font-bold cursor-pointer font-mono" style={{ background: 'var(--color-accent)', color: '#000' }}>Save Education</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
