import * as fallbackData from '../data/portfolio';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.trim() !== '' && 
  supabaseAnonKey.trim() !== ''
);

let supabaseInstance = null;

export async function getSupabaseClient() {
  if (!isSupabaseConfigured) return null;
  if (supabaseInstance) return supabaseInstance;

  try {
    const { createClient } = await import('@supabase/supabase-js');
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
    return supabaseInstance;
  } catch (error) {
    console.warn("Failed to initialize Supabase client:", error);
    return null;
  }
}

// LocalStorage helpers
function getLocalCache(key, defaultValue) {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(`portfolio_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalCache(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`portfolio_${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn("LocalStorage write error:", e);
  }
}

// ====================================================================
// DATA NORMALIZERS (DB -> Frontend)
// ====================================================================

function normalizePersonInfo(p) {
  if (!p) return fallbackData.personInfo;
  return {
    ...p,
    title: p.title || p.role || fallbackData.personInfo.title,
    role: p.role || p.title || fallbackData.personInfo.title,
    about: p.about || p.bio || fallbackData.personInfo.about,
    bio: p.bio || p.about || fallbackData.personInfo.bio,
    avatar: p.avatar || p.avatar_url || fallbackData.personInfo.avatar,
    resumeUrl: p.resumeurl || p.resumeUrl || p.resume_url || fallbackData.personInfo.resumeUrl,
    github: p.github || p.github_url || fallbackData.personInfo.github,
    linkedin: p.linkedin || p.linkedin_url || fallbackData.personInfo.linkedin,
    twitter: p.twitter || p.twitter_url || fallbackData.personInfo.twitter,
  };
}

function normalizeProject(p) {
  if (!p) return p;
  const techArr = Array.isArray(p.tech) 
    ? p.tech 
    : typeof p.tech === 'string' 
    ? p.tech.split(',').map(s => s.trim()).filter(Boolean) 
    : [];
  
  const galleryArr = Array.isArray(p.gallery) 
    ? p.gallery 
    : typeof p.gallery === 'string' 
    ? p.gallery.split('\n').map(s => s.trim()).filter(Boolean) 
    : (p.image ? [p.image] : []);

  return {
    ...p,
    tech: techArr,
    gallery: galleryArr.length > 0 ? galleryArr : (p.image ? [p.image] : []),
    longDesc: p.longdesc || p.longDesc || p.description || '',
    longdesc: p.longdesc || p.longDesc || p.description || '',
    githubUrl: p.githuburl || p.githubUrl || p.github_url || '',
    githuburl: p.githuburl || p.githubUrl || p.github_url || '',
    liveUrl: p.liveurl || p.liveUrl || p.live_url || '',
    liveurl: p.liveurl || p.liveUrl || p.live_url || '',
  };
}

function normalizeExperience(exp) {
  if (!exp) return exp;
  const bulletsArr = Array.isArray(exp.bullets)
    ? exp.bullets
    : typeof exp.bullets === 'string'
    ? exp.bullets.split('\n').map(s => s.trim()).filter(Boolean)
    : [];

  return {
    ...exp,
    bullets: bulletsArr,
    startYear: exp.startyear || exp.startYear || '2023',
    endYear: exp.endyear || exp.endYear || 'Present',
    startyear: exp.startyear || exp.startYear || '2023',
    endyear: exp.endyear || exp.endYear || 'Present',
  };
}

function normalizeActivity(act) {
  if (!act) return act;
  const galleryArr = Array.isArray(act.gallery)
    ? act.gallery
    : typeof act.gallery === 'string'
    ? act.gallery.split('\n').map(s => s.trim()).filter(Boolean)
    : (act.img ? [act.img] : []);

  return {
    ...act,
    gallery: galleryArr,
    images: galleryArr,
    desc: act.desc || act.description || '',
    description: act.desc || act.description || '',
  };
}

function normalizeResearch(r) {
  if (!r) return r;
  return {
    ...r,
    mlTech: r.mltech || r.mlTech || '',
    mltech: r.mltech || r.mlTech || '',
    pdfUrl: r.pdfurl || r.pdfUrl || '',
    pdfurl: r.pdfurl || r.pdfUrl || '',
    venue: r.venue || r.journal || '',
  };
}

// ====================================================================
// MAIN PORTFOLIO DATA FETCHER
// ====================================================================

export async function getPortfolioData() {
  const supabase = await getSupabaseClient();

  if (!supabase) {
    return {
      personInfo: getLocalCache('personInfo', fallbackData.personInfo),
      stats: getLocalCache('stats', fallbackData.stats),
      techCategories: fallbackData.techCategories,
      techSkills: getLocalCache('techSkills', fallbackData.techSkills),
      projects: getLocalCache('projects', fallbackData.projects),
      researchPapers: getLocalCache('researchPapers', fallbackData.researchPapers),
      experiences: getLocalCache('experiences', fallbackData.experiences),
      activities: getLocalCache('activities', fallbackData.activities),
      education: getLocalCache('education', fallbackData.education),
      isLiveSupabase: false
    };
  }

  try {
    const [
      { data: personInfoData },
      { data: projectsData },
      { data: skillsData },
      { data: researchData },
      { data: experiencesData },
      { data: activitiesData },
      { data: statsData },
      { data: educationData }
    ] = await Promise.all([
      supabase.from('person_info').select('*').limit(1).maybeSingle(),
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('tech_skills').select('*'),
      supabase.from('research_papers').select('*'),
      supabase.from('experiences').select('*').order('created_at', { ascending: false }),
      supabase.from('activities').select('*').order('created_at', { ascending: false }),
      supabase.from('stats').select('*'),
      supabase.from('education').select('*')
    ]);

    return {
      personInfo: normalizePersonInfo(personInfoData),
      stats: (statsData && statsData.length > 0) ? statsData : fallbackData.stats,
      techCategories: fallbackData.techCategories,
      techSkills: (skillsData && skillsData.length > 0) ? skillsData : fallbackData.techSkills,
      projects: (projectsData && projectsData.length > 0) ? projectsData.map(normalizeProject) : fallbackData.projects,
      researchPapers: (researchData && researchData.length > 0) ? researchData.map(normalizeResearch) : fallbackData.researchPapers,
      experiences: (experiencesData && experiencesData.length > 0) ? experiencesData.map(normalizeExperience) : fallbackData.experiences,
      activities: (activitiesData && activitiesData.length > 0) ? activitiesData.map(normalizeActivity) : fallbackData.activities,
      education: (educationData && educationData.length > 0) ? educationData : fallbackData.education,
      isLiveSupabase: true
    };
  } catch (error) {
    console.warn("Supabase fetch failed, utilizing local fallback:", error);
    return {
      personInfo: getLocalCache('personInfo', fallbackData.personInfo),
      stats: getLocalCache('stats', fallbackData.stats),
      techCategories: fallbackData.techCategories,
      techSkills: getLocalCache('techSkills', fallbackData.techSkills),
      projects: getLocalCache('projects', fallbackData.projects),
      researchPapers: getLocalCache('researchPapers', fallbackData.researchPapers),
      experiences: getLocalCache('experiences', fallbackData.experiences),
      activities: getLocalCache('activities', fallbackData.activities),
      education: getLocalCache('education', fallbackData.education),
      isLiveSupabase: false
    };
  }
}

// ====================================================================
// ADMIN PORTAL COMPLETE CRUD HELPERS (SUPABASE + LOCALSTORAGE FALLBACK)
// ====================================================================

/** Helper for Local Storage Item Upsert */
function upsertLocalItem(key, fallbackList, itemData) {
  const currentList = getLocalCache(key, fallbackList);
  let updated;
  if (itemData.id) {
    const exists = currentList.some(i => i.id === itemData.id);
    if (exists) {
      updated = currentList.map(i => i.id === itemData.id ? { ...i, ...itemData } : i);
    } else {
      updated = [{ ...itemData }, ...currentList];
    }
  } else {
    const newItem = { id: `local-${Date.now()}`, ...itemData };
    updated = [newItem, ...currentList];
  }
  setLocalCache(key, updated);
  return { data: itemData, success: true };
}

/** Helper for Local Storage Item Delete */
function deleteLocalItem(key, fallbackList, id) {
  const currentList = getLocalCache(key, fallbackList);
  const updated = currentList.filter(i => i.id !== id);
  setLocalCache(key, updated);
  return { success: true };
}

/** Save or Update Person Info */
export async function savePersonInfo(infoData) {
  const supabase = await getSupabaseClient();
  const payload = {
    name: infoData.name || 'Mahmud Hasan Ratul',
    title: infoData.title || infoData.role || 'Full-Stack & Edge AI Architect',
    role: infoData.role || infoData.title || 'Full-Stack & Edge AI Architect',
    tagline: infoData.tagline || '',
    about: infoData.about || infoData.bio || '',
    bio: infoData.bio || infoData.about || '',
    email: infoData.email || '',
    location: infoData.location || '',
    avatar: infoData.avatar || infoData.avatar_url || '',
    resumeurl: infoData.resumeUrl || infoData.resumeurl || infoData.resume_url || '',
    github: infoData.github || infoData.github_url || '',
    linkedin: infoData.linkedin || infoData.linkedin_url || '',
    twitter: infoData.twitter || infoData.twitter_url || '',
    updated_at: new Date()
  };

  if (!supabase) {
    setLocalCache('personInfo', payload);
    return { data: payload, success: true };
  }

  try {
    const { data: existing } = await supabase.from('person_info').select('id').limit(1).maybeSingle();
    if (existing?.id) {
      const { data, error } = await supabase.from('person_info').update(payload).eq('id', existing.id).select();
      if (error) throw error;
      return { data, success: true };
    } else {
      const { data, error } = await supabase.from('person_info').insert([payload]).select();
      if (error) throw error;
      return { data, success: true };
    }
  } catch (err) {
    console.error("savePersonInfo error:", err);
    setLocalCache('personInfo', payload);
    return { data: payload, error: err.message, success: true };
  }
}

/** Create or Update Project */
export async function saveProject(projectData) {
  const supabase = await getSupabaseClient();
  const payload = {
    title: projectData.title || '',
    category: projectData.category || 'Full-Stack Web App',
    status: projectData.status || 'LIVE DEMO',
    description: projectData.description || '',
    longdesc: projectData.longDesc || projectData.longdesc || projectData.description || '',
    tech: Array.isArray(projectData.tech) ? projectData.tech.join(', ') : (projectData.tech || ''),
    githuburl: projectData.githubUrl || projectData.githuburl || projectData.github_url || '',
    liveurl: projectData.liveUrl || projectData.liveurl || projectData.live_url || '',
    image: projectData.image || '',
    gallery: Array.isArray(projectData.gallery) ? projectData.gallery.join('\n') : (projectData.gallery || projectData.image || ''),
    metrics: projectData.metrics || '',
    time: projectData.time || '2024',
    featured: Boolean(projectData.featured)
  };

  if (!supabase) {
    return upsertLocalItem('projects', fallbackData.projects, { ...projectData, ...payload });
  }

  try {
    if (projectData.id && typeof projectData.id === 'string' && projectData.id.length > 20) {
      const { data, error } = await supabase.from('projects').update(payload).eq('id', projectData.id).select();
      if (error) throw error;
      return { data, success: true };
    } else {
      const { data, error } = await supabase.from('projects').insert([payload]).select();
      if (error) throw error;
      return { data, success: true };
    }
  } catch (err) {
    console.error("saveProject error:", err);
    upsertLocalItem('projects', fallbackData.projects, { ...projectData, ...payload });
    return { data: payload, error: err.message, success: true };
  }
}

/** Delete Project */
export async function deleteProject(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('projects', fallbackData.projects, id);
  }

  try {
    const { data, error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    deleteLocalItem('projects', fallbackData.projects, id);
    return { data, success: true };
  } catch (err) {
    console.error("deleteProject error:", err);
    deleteLocalItem('projects', fallbackData.projects, id);
    return { error: err.message };
  }
}

/** Create or Update Experience */
export async function saveExperience(expData) {
  const supabase = await getSupabaseClient();
  const payload = {
    role: expData.role || '',
    organization: expData.organization || expData.company || '',
    category: expData.category || 'Internship',
    period: expData.period || '2023 - Present',
    startyear: expData.startYear || expData.startyear || '2023',
    endyear: expData.endYear || expData.endyear || 'Present',
    logo: expData.logo || '',
    bullets: Array.isArray(expData.bullets) ? expData.bullets.join('\n') : (expData.bullets || '')
  };

  if (!supabase) {
    return upsertLocalItem('experiences', fallbackData.experiences, { ...expData, ...payload });
  }

  try {
    if (expData.id && typeof expData.id === 'string' && expData.id.length > 20) {
      const { data, error } = await supabase.from('experiences').update(payload).eq('id', expData.id).select();
      if (error) throw error;
      return { data, success: true };
    } else {
      const { data, error } = await supabase.from('experiences').insert([payload]).select();
      if (error) throw error;
      return { data, success: true };
    }
  } catch (err) {
    console.error("saveExperience error:", err);
    upsertLocalItem('experiences', fallbackData.experiences, { ...expData, ...payload });
    return { data: payload, error: err.message, success: true };
  }
}

/** Delete Experience */
export async function deleteExperience(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('experiences', fallbackData.experiences, id);
  }

  try {
    const { data, error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) throw error;
    deleteLocalItem('experiences', fallbackData.experiences, id);
    return { data, success: true };
  } catch (err) {
    deleteLocalItem('experiences', fallbackData.experiences, id);
    return { error: err.message };
  }
}

/** Create or Update Campus Activity */
export async function saveActivity(actData) {
  const supabase = await getSupabaseClient();
  const galleryVal = Array.isArray(actData.gallery) 
    ? actData.gallery.join('\n') 
    : (actData.gallery || actData.img || '');

  const payload = {
    title: actData.title || '',
    category: actData.category || 'University Events',
    role: actData.role || 'Organizer',
    year: actData.year || '2023 - Present',
    impact: actData.impact || '',
    stat: actData.stat || '',
    tag: actData.tag || 'Campus Leadership',
    img: actData.img || (Array.isArray(actData.gallery) && actData.gallery[0] ? actData.gallery[0] : '/cpc1.jpg'),
    gallery: galleryVal,
    desc: actData.desc || actData.description || ''
  };

  if (!supabase) {
    return upsertLocalItem('activities', fallbackData.activities, { ...actData, ...payload });
  }

  try {
    if (actData.id && typeof actData.id === 'string' && actData.id.length > 20) {
      const { data, error } = await supabase.from('activities').update(payload).eq('id', actData.id).select();
      if (error) throw error;
      return { data, success: true };
    } else {
      const { data, error } = await supabase.from('activities').insert([payload]).select();
      if (error) throw error;
      return { data, success: true };
    }
  } catch (err) {
    console.error("saveActivity error:", err);
    upsertLocalItem('activities', fallbackData.activities, { ...actData, ...payload });
    return { data: payload, error: err.message, success: true };
  }
}

/** Delete Campus Activity */
export async function deleteActivity(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('activities', fallbackData.activities, id);
  }

  try {
    const { data, error } = await supabase.from('activities').delete().eq('id', id);
    if (error) throw error;
    deleteLocalItem('activities', fallbackData.activities, id);
    return { data, success: true };
  } catch (err) {
    deleteLocalItem('activities', fallbackData.activities, id);
    return { error: err.message };
  }
}

/** Create or Update Tech Skill */
export async function saveTechSkill(skillData) {
  const supabase = await getSupabaseClient();
  const payload = {
    name: skillData.name || '',
    category: skillData.category || 'frontend',
    level: skillData.level || 'Expert',
    proficiency: parseInt(skillData.proficiency, 10) || 90
  };

  if (!supabase) {
    return upsertLocalItem('techSkills', fallbackData.techSkills, { ...skillData, ...payload });
  }

  try {
    if (skillData.id && typeof skillData.id === 'string' && skillData.id.length > 20) {
      const { data, error } = await supabase.from('tech_skills').update(payload).eq('id', skillData.id).select();
      if (error) throw error;
      return { data, success: true };
    } else {
      const { data, error } = await supabase.from('tech_skills').insert([payload]).select();
      if (error) throw error;
      return { data, success: true };
    }
  } catch (err) {
    console.error("saveTechSkill error:", err);
    upsertLocalItem('techSkills', fallbackData.techSkills, { ...skillData, ...payload });
    return { data: payload, error: err.message, success: true };
  }
}

/** Delete Tech Skill */
export async function deleteTechSkill(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('techSkills', fallbackData.techSkills, id);
  }

  try {
    const { data, error } = await supabase.from('tech_skills').delete().eq('id', id);
    if (error) throw error;
    deleteLocalItem('techSkills', fallbackData.techSkills, id);
    return { data, success: true };
  } catch (err) {
    deleteLocalItem('techSkills', fallbackData.techSkills, id);
    return { error: err.message };
  }
}

/** Create or Update Stat */
export async function saveStat(statData) {
  const supabase = await getSupabaseClient();
  const payload = {
    label: statData.label || '',
    value: statData.value || ''
  };

  if (!supabase) {
    return upsertLocalItem('stats', fallbackData.stats, { ...statData, ...payload });
  }

  try {
    if (statData.id && typeof statData.id === 'string' && statData.id.length > 20) {
      const { data, error } = await supabase.from('stats').update(payload).eq('id', statData.id).select();
      if (error) throw error;
      return { data, success: true };
    } else {
      const { data, error } = await supabase.from('stats').insert([payload]).select();
      if (error) throw error;
      return { data, success: true };
    }
  } catch (err) {
    console.error("saveStat error:", err);
    upsertLocalItem('stats', fallbackData.stats, { ...statData, ...payload });
    return { data: payload, error: err.message, success: true };
  }
}

/** Delete Stat */
export async function deleteStat(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('stats', fallbackData.stats, id);
  }

  try {
    const { data, error } = await supabase.from('stats').delete().eq('id', id);
    if (error) throw error;
    deleteLocalItem('stats', fallbackData.stats, id);
    return { data, success: true };
  } catch (err) {
    deleteLocalItem('stats', fallbackData.stats, id);
    return { error: err.message };
  }
}

/** Create or Update Research Paper */
export async function saveResearch(researchData) {
  const supabase = await getSupabaseClient();
  const payload = {
    title: researchData.title || '',
    domain: researchData.domain || '',
    mltech: researchData.mlTech || researchData.mltech || '',
    venue: researchData.venue || researchData.journal || '',
    year: parseInt(researchData.year, 10) || 2024,
    abstract: researchData.abstract || '',
    pdfurl: researchData.pdfUrl || researchData.pdfurl || '',
    doi: researchData.doi || '',
    citation: researchData.citation || ''
  };

  if (!supabase) {
    return upsertLocalItem('researchPapers', fallbackData.researchPapers, { ...researchData, ...payload });
  }

  try {
    if (researchData.id && typeof researchData.id === 'string' && researchData.id.length > 20) {
      const { data, error } = await supabase.from('research_papers').update(payload).eq('id', researchData.id).select();
      if (error) throw error;
      return { data, success: true };
    } else {
      const { data, error } = await supabase.from('research_papers').insert([payload]).select();
      if (error) throw error;
      return { data, success: true };
    }
  } catch (err) {
    console.error("saveResearch error:", err);
    upsertLocalItem('researchPapers', fallbackData.researchPapers, { ...researchData, ...payload });
    return { data: payload, error: err.message, success: true };
  }
}

/** Delete Research Paper */
export async function deleteResearch(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('researchPapers', fallbackData.researchPapers, id);
  }

  try {
    const { data, error } = await supabase.from('research_papers').delete().eq('id', id);
    if (error) throw error;
    deleteLocalItem('researchPapers', fallbackData.researchPapers, id);
    return { data, success: true };
  } catch (err) {
    deleteLocalItem('researchPapers', fallbackData.researchPapers, id);
    return { error: err.message };
  }
}

/** Create or Update Education */
export async function saveEducation(eduData) {
  const supabase = await getSupabaseClient();
  const payload = {
    degree: eduData.degree || '',
    institution: eduData.institution || '',
    period: eduData.period || '2021 - Present',
    cgpa: eduData.cgpa || '',
    details: eduData.details || ''
  };

  if (!supabase) {
    return upsertLocalItem('education', fallbackData.education, { ...eduData, ...payload });
  }

  try {
    if (eduData.id && typeof eduData.id === 'string' && eduData.id.length > 20) {
      const { data, error } = await supabase.from('education').update(payload).eq('id', eduData.id).select();
      if (error) throw error;
      return { data, success: true };
    } else {
      const { data, error } = await supabase.from('education').insert([payload]).select();
      if (error) throw error;
      return { data, success: true };
    }
  } catch (err) {
    console.error("saveEducation error:", err);
    upsertLocalItem('education', fallbackData.education, { ...eduData, ...payload });
    return { data: payload, error: err.message, success: true };
  }
}

/** Delete Education */
export async function deleteEducation(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('education', fallbackData.education, id);
  }

  try {
    const { data, error } = await supabase.from('education').delete().eq('id', id);
    if (error) throw error;
    deleteLocalItem('education', fallbackData.education, id);
    return { data, success: true };
  } catch (err) {
    deleteLocalItem('education', fallbackData.education, id);
    return { error: err.message };
  }
}

/** Submit Contact Form Message */
export async function submitContactMessage(msgData) {
  const supabase = await getSupabaseClient();
  const payload = {
    name: msgData.name || '',
    email: msgData.email || '',
    subject: msgData.subject || '',
    message: msgData.message || '',
    is_read: false
  };

  if (!supabase) {
    const currentMsgs = getLocalCache('messages', []);
    const newMsg = { id: `msg-${Date.now()}`, ...payload, created_at: new Date().toISOString() };
    setLocalCache('messages', [newMsg, ...currentMsgs]);
    return { success: true, isMock: true };
  }

  try {
    const { data, error } = await supabase.from('messages').insert([payload]).select();
    if (error) throw error;
    return { data, success: true };
  } catch (err) {
    console.error("submitContactMessage error:", err);
    return { error: err.message, success: false };
  }
}

/** Get Contact Messages for Admin Inbox */
export async function getContactMessages() {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getLocalCache('messages', []) };
  }

  try {
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    return { data: data || [], error };
  } catch (err) {
    return { data: getLocalCache('messages', []), error: err.message };
  }
}

/** Delete Contact Message */
export async function deleteContactMessage(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('messages', [], id);
  }

  try {
    const { data, error } = await supabase.from('messages').delete().eq('id', id);
    deleteLocalItem('messages', [], id);
    return { data, error, success: !error };
  } catch (err) {
    deleteLocalItem('messages', [], id);
    return { error: err.message };
  }
}

// ====================================================================
// STORAGE IMAGE UPLOADER
// ====================================================================

export async function uploadImageToSupabase(file) {
  const supabase = await getSupabaseClient();
  if (!supabase || !file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({ url: reader.result, isLocal: true });
      };
      reader.readAsDataURL(file);
    });
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (uploadError) {
      console.warn("Supabase storage upload error, falling back to base64:", uploadError);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ url: reader.result, isLocal: true });
        };
        reader.readAsDataURL(file);
      });
    }

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath);

    return { url: publicUrl, isLocal: false };
  } catch (err) {
    console.warn("Storage upload exception, falling back to base64:", err);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({ url: reader.result, isLocal: true });
      };
      reader.readAsDataURL(file);
    });
  }
}

// ====================================================================
// SUPABASE AUTHENTICATION
// ====================================================================

export async function signInAdmin(email, password) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: null, error: { message: 'Supabase is not configured' } };
  }
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signUpAdmin(email, password) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: null, error: { message: 'Supabase is not configured' } };
  }
  return await supabase.auth.signUp({ email, password });
}

export async function sendMagicLink(email) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: null, error: { message: 'Supabase is not configured' } };
  }
  return await supabase.auth.signInWithOtp({ email });
}

export async function signOutAdmin() {
  const supabase = await getSupabaseClient();
  if (!supabase) return { error: null };
  return await supabase.auth.signOut();
}

export async function getAdminSession() {
  const supabase = await getSupabaseClient();
  if (!supabase) return { session: null, user: null };
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, user: session?.user || null, error };
}

export async function onAdminAuthStateChange(callback) {
  const supabase = await getSupabaseClient();
  if (!supabase) return { unsubscribe: () => {} };
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return subscription;
}
