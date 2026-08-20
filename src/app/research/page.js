import { getPortfolioData } from '@/lib/supabase';
import StandalonePageLayout from '@/components/StandalonePageLayout';
import Research from '@/components/Research';

export const revalidate = 60;

export const metadata = {
  title: 'Research & Publications | Mahmud Hasan Ratul — AI & TinyML',
  description: 'Academic research papers, conference publications, and AI investigations in TinyML, edge sensor networks, and deep learning architectures.',
};

export default async function ResearchPage() {
  const data = await getPortfolioData();

  return (
    <StandalonePageLayout initialData={data}>
      <Research researchPapers={data.researchPapers} />
    </StandalonePageLayout>
  );
}
