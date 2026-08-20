import { getPortfolioData } from '@/lib/supabase';
import StandalonePageLayout from '@/components/StandalonePageLayout';
import About from '@/components/About';

export const revalidate = 60;

export const metadata = {
  title: 'About | Mahmud Hasan Ratul — Full-Stack Engineer & AI Researcher',
  description: 'Learn about Mahmud Hasan Ratul: background, education, core philosophy, and specialized engineering skills in Full-Stack development and Edge AI.',
};

export default async function AboutPage() {
  const data = await getPortfolioData();

  return (
    <StandalonePageLayout initialData={data}>
      <About
        personInfo={data.personInfo}
        stats={data.stats}
        education={data.education}
      />
    </StandalonePageLayout>
  );
}
