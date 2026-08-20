import { getPortfolioData } from '@/lib/supabase';
import StandalonePageLayout from '@/components/StandalonePageLayout';
import Experience from '@/components/Experience';

export const revalidate = 60;

export const metadata = {
  title: 'Work Experience & Roles | Mahmud Hasan Ratul — Career History',
  description: 'Professional software engineering experience, roles, leadership tenures, and key project deliveries of Mahmud Hasan Ratul.',
};

export default async function ExperiencePage() {
  const data = await getPortfolioData();

  return (
    <StandalonePageLayout initialData={data}>
      <Experience experiences={data.experiences} />
    </StandalonePageLayout>
  );
}
