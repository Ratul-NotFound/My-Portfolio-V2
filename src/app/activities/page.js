import { getPortfolioData } from '@/lib/supabase';
import StandalonePageLayout from '@/components/StandalonePageLayout';
import Activities from '@/components/Activities';

export const revalidate = 60;

export const metadata = {
  title: 'Extracurricular & Leadership | Mahmud Hasan Ratul — Activities',
  description: 'Community leadership, DIU Computer Programming Club (DIUCPC) executive duties, hackathons, and youth leadership initiatives.',
};

export default async function ActivitiesPage() {
  const data = await getPortfolioData();

  return (
    <StandalonePageLayout initialData={data}>
      <Activities activities={data.activities} />
    </StandalonePageLayout>
  );
}
