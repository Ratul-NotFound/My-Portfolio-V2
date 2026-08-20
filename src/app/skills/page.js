import { getPortfolioData } from '@/lib/supabase';
import StandalonePageLayout from '@/components/StandalonePageLayout';
import TechStack from '@/components/TechStack';

export const revalidate = 60;

export const metadata = {
  title: 'Skills & Technologies | Mahmud Hasan Ratul — Tech Stack',
  description: 'Explore Mahmud Hasan Ratul\'s technical expertise across Frontend, Backend, AI/ML, Cloud Infrastructure, and DevOps.',
};

export default async function SkillsPage() {
  const data = await getPortfolioData();

  return (
    <StandalonePageLayout initialData={data}>
      <TechStack
        categories={data.techCategories}
        skills={data.techSkills}
        projects={data.projects}
      />
    </StandalonePageLayout>
  );
}
