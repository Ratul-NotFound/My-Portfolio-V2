import * as fallbackData from '../data/portfolio';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.trim() !== '' && 
  supabaseAnonKey.trim() !== ''
);

let supabaseInstance = null;

export async function getSupabaseClient() {
  if (!isConfigured) return null;
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
 * Fetch portfolio data with zero-latency fallback to local portfolio.js
 */
export async function getPortfolioData() {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return {
      personInfo: fallbackData.personInfo,
      stats: fallbackData.stats,
      techCategories: fallbackData.techCategories,
      techSkills: fallbackData.techSkills,
      projects: fallbackData.projects,
      researchPapers: fallbackData.researchPapers,
      experiences: fallbackData.experiences,
      activities: fallbackData.activities,
      education: fallbackData.education,
      isLiveSupabase: false
    };
  }

  try {
    const [
      { data: personInfoData },
      { data: projectsData },
      { data: skillsData },
      { data: researchData },
      { data: experiencesData }
    ] = await Promise.all([
      supabase.from('person_info').select('*').limit(1).single(),
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('tech_skills').select('*'),
      supabase.from('research_papers').select('*'),
      supabase.from('experiences').select('*').order('created_at', { ascending: false })
    ]);

    return {
      personInfo: personInfoData || fallbackData.personInfo,
      stats: fallbackData.stats,
      techCategories: fallbackData.techCategories,
      techSkills: (skillsData && skillsData.length > 0) ? skillsData : fallbackData.techSkills,
      projects: (projectsData && projectsData.length > 0) ? projectsData : fallbackData.projects,
      researchPapers: (researchData && researchData.length > 0) ? researchData : fallbackData.researchPapers,
      experiences: (experiencesData && experiencesData.length > 0) ? experiencesData : fallbackData.experiences,
      activities: fallbackData.activities,
      education: fallbackData.education,
      isLiveSupabase: true
    };
  } catch (error) {
    console.warn("Supabase fetch failed, utilizing local fallback:", error);
    return {
      personInfo: fallbackData.personInfo,
      stats: fallbackData.stats,
      techCategories: fallbackData.techCategories,
      techSkills: fallbackData.techSkills,
      projects: fallbackData.projects,
      researchPapers: fallbackData.researchPapers,
      experiences: fallbackData.experiences,
      activities: fallbackData.activities,
      education: fallbackData.education,
      isLiveSupabase: false
    };
  }
}

