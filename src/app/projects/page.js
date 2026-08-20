import { getPortfolioData } from '@/lib/supabase';
import StandalonePageLayout from '@/components/StandalonePageLayout';
import Projects from '@/components/Projects';

export const revalidate = 60;

export const metadata = {
  title: 'Projects | Mahmud Hasan Ratul — Full-Stack Developer & AI Automation Engineer',
  description: 'Production software systems, AI automation frameworks, RAG document engines, and scalable web applications built by Mahmud Hasan Ratul.',
};

export default async function ProjectsPage() {
  const data = await getPortfolioData();

  return (
    <StandalonePageLayout initialData={data}>
      <Projects
        projects={data.projects}
        techSkills={data.techSkills}
      />
    </StandalonePageLayout>
  );
}
