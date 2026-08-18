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
        persistSession: typeof window !== 'undefined',
      },
      global: {
        fetch: (url, options) => globalThis.fetch(url, options),
      },
    });
    return supabaseInstance;
  } catch (error) {
    console.warn("Failed to initialize Supabase client:", error);
    return null;
  }
}

/**
 * Upload Image to Supabase Storage bucket (or Base64 fallback in Local Mode)
 */
export async function uploadImageToSupabase(file, bucketName = 'portfolio-images') {
  if (!file) return { error: "No file provided" };
  const supabase = await getSupabaseClient();

  if (!supabase) {
    // Local mode fallback: Convert file to Base64 Data URL so local uploads work instantly
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ url: reader.result, isLocal: true });
      reader.readAsDataURL(file);
    });
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (error) {
      console.warn("Supabase Storage error (Ensure bucket 'portfolio-images' is public):", error.message);
      // Fallback to base64 if bucket doesn't exist yet
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ url: reader.result, isLocal: true });
        reader.readAsDataURL(file);
      });
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return { url: publicUrlData.publicUrl, isLocal: false };
  } catch (err) {
    console.warn("Storage upload failed, falling back to base64:", err);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ url: reader.result, isLocal: true });
      reader.readAsDataURL(file);
    });
  }
}

// Local Storage Persistence Helpers for Local Mode
function getLocalCache(key, fallbackValue) {
  if (typeof window === 'undefined') return fallbackValue;
  try {
    const item = localStorage.getItem(`portfolio_${key}`);
    return item ? JSON.parse(item) : fallbackValue;
  } catch (e) {
    return fallbackValue;
  }
}

function setLocalCache(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`portfolio_${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn("LocalStorage save error:", e);
  }
}

/**
 * Fetch portfolio data with zero-latency fallback to local portfolio.js & localStorage
 */
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
      supabase.from('person_info').select('*').limit(1).single(),
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('tech_skills').select('*'),
      supabase.from('research_papers').select('*'),
      supabase.from('experiences').select('*').order('created_at', { ascending: false }),
      supabase.from('activities').select('*').order('created_at', { ascending: false }),
      supabase.from('stats').select('*'),
      supabase.from('education').select('*')
    ]);

    const normalizedExperiences = (experiencesData && experiencesData.length > 0)
      ? experiencesData.map(exp => ({
          ...exp,
          bullets: Array.isArray(exp.bullets)
            ? exp.bullets
            : typeof exp.bullets === 'string'
            ? exp.bullets.split('\n').map(s => s.trim()).filter(Boolean)
            : []
        }))
      : fallbackData.experiences;

    const normalizedProjects = (projectsData && projectsData.length > 0)
      ? projectsData.map(p => ({
          ...p,
          tech: Array.isArray(p.tech)
            ? p.tech
            : typeof p.tech === 'string'
            ? p.tech.split(',').map(s => s.trim()).filter(Boolean)
            : []
        }))
      : fallbackData.projects;

    return {
      personInfo: personInfoData || fallbackData.personInfo,
      stats: (statsData && statsData.length > 0) ? statsData : fallbackData.stats,
      techCategories: fallbackData.techCategories,
      techSkills: (skillsData && skillsData.length > 0) ? skillsData : fallbackData.techSkills,
      projects: normalizedProjects,
      researchPapers: (researchData && researchData.length > 0) ? researchData : fallbackData.researchPapers,
      experiences: normalizedExperiences,
      activities: (activitiesData && activitiesData.length > 0) ? activitiesData : fallbackData.activities,
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
  if (!supabase) {
    setLocalCache('personInfo', infoData);
    return { data: infoData, success: true };
  }

  try {
    const { data: existing } = await supabase.from('person_info').select('id').limit(1).single();
    if (existing?.id) {
      const { data, error } = await supabase.from('person_info').update({ ...infoData, updated_at: new Date() }).eq('id', existing.id).select();
      return { data, error };
    } else {
      const { data, error } = await supabase.from('person_info').insert([infoData]).select();
      return { data, error };
    }
  } catch (err) {
    setLocalCache('personInfo', infoData);
    return { data: infoData, success: true };
  }
}

/** Create or Update Project */
export async function saveProject(projectData) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return upsertLocalItem('projects', fallbackData.projects, projectData);
  }

  try {
    if (projectData.id && typeof projectData.id === 'string' && projectData.id.length > 15) {
      const { data, error } = await supabase.from('projects').update(projectData).eq('id', projectData.id).select();
      return { data, error };
    } else {
      const { id, ...newProject } = projectData;
      const { data, error } = await supabase.from('projects').insert([newProject]).select();
      return { data, error };
    }
  } catch (err) {
    return upsertLocalItem('projects', fallbackData.projects, projectData);
  }
}

/** Delete Project */
export async function deleteProject(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('projects', fallbackData.projects, id);
  }

  const { data, error } = await supabase.from('projects').delete().eq('id', id);
  deleteLocalItem('projects', fallbackData.projects, id);
  return { data, error };
}

/** Create or Update Experience */
export async function saveExperience(expData) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return upsertLocalItem('experiences', fallbackData.experiences, expData);
  }

  try {
    if (expData.id && typeof expData.id === 'string' && expData.id.length > 15) {
      const { data, error } = await supabase.from('experiences').update(expData).eq('id', expData.id).select();
      return { data, error };
    } else {
      const { id, ...newExp } = expData;
      const { data, error } = await supabase.from('experiences').insert([newExp]).select();
      return { data, error };
    }
  } catch (err) {
    return upsertLocalItem('experiences', fallbackData.experiences, expData);
  }
}

/** Delete Experience */
export async function deleteExperience(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('experiences', fallbackData.experiences, id);
  }

  const { data, error } = await supabase.from('experiences').delete().eq('id', id);
  deleteLocalItem('experiences', fallbackData.experiences, id);
  return { data, error };
}

/** Create or Update Campus Activity */
export async function saveActivity(actData) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return upsertLocalItem('activities', fallbackData.activities, actData);
  }

  try {
    if (actData.id && typeof actData.id === 'string' && actData.id.length > 15) {
      const { data, error } = await supabase.from('activities').update(actData).eq('id', actData.id).select();
      return { data, error };
    } else {
      const { id, ...newAct } = actData;
      const { data, error } = await supabase.from('activities').insert([newAct]).select();
      return { data, error };
    }
  } catch (err) {
    return upsertLocalItem('activities', fallbackData.activities, actData);
  }
}

/** Delete Campus Activity */
export async function deleteActivity(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('activities', fallbackData.activities, id);
  }

  const { data, error } = await supabase.from('activities').delete().eq('id', id);
  deleteLocalItem('activities', fallbackData.activities, id);
  return { data, error };
}

/** Create or Update Tech Skill */
export async function saveTechSkill(skillData) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return upsertLocalItem('techSkills', fallbackData.techSkills, skillData);
  }

  try {
    if (skillData.id && typeof skillData.id === 'string' && skillData.id.length > 15) {
      const { data, error } = await supabase.from('tech_skills').update(skillData).eq('id', skillData.id).select();
      return { data, error };
    } else {
      const { id, ...newSkill } = skillData;
      const { data, error } = await supabase.from('tech_skills').insert([newSkill]).select();
      return { data, error };
    }
  } catch (err) {
    return upsertLocalItem('techSkills', fallbackData.techSkills, skillData);
  }
}

/** Delete Tech Skill */
export async function deleteTechSkill(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('techSkills', fallbackData.techSkills, id);
  }

  const { data, error } = await supabase.from('tech_skills').delete().eq('id', id);
  deleteLocalItem('techSkills', fallbackData.techSkills, id);
  return { data, error };
}

/** Create or Update Stat */
export async function saveStat(statData) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return upsertLocalItem('stats', fallbackData.stats, statData);
  }

  try {
    if (statData.id && typeof statData.id === 'string' && statData.id.length > 15) {
      const { data, error } = await supabase.from('stats').update(statData).eq('id', statData.id).select();
      return { data, error };
    } else {
      const { id, ...newStat } = statData;
      const { data, error } = await supabase.from('stats').insert([newStat]).select();
      return { data, error };
    }
  } catch (err) {
    return upsertLocalItem('stats', fallbackData.stats, statData);
  }
}

/** Delete Stat */
export async function deleteStat(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('stats', fallbackData.stats, id);
  }

  const { data, error } = await supabase.from('stats').delete().eq('id', id);
  deleteLocalItem('stats', fallbackData.stats, id);
  return { data, error };
}

/** Create or Update Research Paper */
export async function saveResearch(researchData) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return upsertLocalItem('researchPapers', fallbackData.researchPapers, researchData);
  }

  try {
    if (researchData.id && typeof researchData.id === 'string' && researchData.id.length > 15) {
      const { data, error } = await supabase.from('research_papers').update(researchData).eq('id', researchData.id).select();
      return { data, error };
    } else {
      const { id, ...newResearch } = researchData;
      const { data, error } = await supabase.from('research_papers').insert([newResearch]).select();
      return { data, error };
    }
  } catch (err) {
    return upsertLocalItem('researchPapers', fallbackData.researchPapers, researchData);
  }
}

/** Delete Research Paper */
export async function deleteResearch(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('researchPapers', fallbackData.researchPapers, id);
  }

  const { data, error } = await supabase.from('research_papers').delete().eq('id', id);
  deleteLocalItem('researchPapers', fallbackData.researchPapers, id);
  return { data, error };
}

/** Create or Update Education */
export async function saveEducation(eduData) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return upsertLocalItem('education', fallbackData.education, eduData);
  }

  try {
    if (eduData.id && typeof eduData.id === 'string' && eduData.id.length > 15) {
      const { data, error } = await supabase.from('education').update(eduData).eq('id', eduData.id).select();
      return { data, error };
    } else {
      const { id, ...newEdu } = eduData;
      const { data, error } = await supabase.from('education').insert([newEdu]).select();
      return { data, error };
    }
  } catch (err) {
    return upsertLocalItem('education', fallbackData.education, eduData);
  }
}

/** Delete Education */
export async function deleteEducation(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('education', fallbackData.education, id);
  }

  const { data, error } = await supabase.from('education').delete().eq('id', id);
  deleteLocalItem('education', fallbackData.education, id);
  return { data, error };
}

/** Submit Contact Form Message */
export async function submitContactMessage(msgData) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    const currentMsgs = getLocalCache('messages', []);
    const newMsg = { id: `msg-${Date.now()}`, ...msgData, created_at: new Date().toISOString() };
    setLocalCache('messages', [newMsg, ...currentMsgs]);
    return { success: true, isMock: true };
  }

  const { data, error } = await supabase.from('messages').insert([msgData]).select();
  return { data, error, success: !error };
}

/** Get Contact Messages for Admin Inbox */
export async function getContactMessages() {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { data: getLocalCache('messages', []) };
  }

  const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
  return { data: data || [], error };
}

/** Delete Contact Message */
export async function deleteContactMessage(id) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return deleteLocalItem('messages', [], id);
  }

  const { data, error } = await supabase.from('messages').delete().eq('id', id);
  deleteLocalItem('messages', [], id);
  return { data, error };
}
