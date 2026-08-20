import { getPortfolioData } from '@/lib/supabase';
import StandalonePageLayout from '@/components/StandalonePageLayout';
import Contact from '@/components/Contact';

export const revalidate = 60;

export const metadata = {
  title: 'Contact & Connect | Mahmud Hasan Ratul — Get In Touch',
  description: 'Reach out to Mahmud Hasan Ratul for software architecture consulting, AI engineering projects, research collaboration, or speaking invitations.',
};

export default async function ContactPage() {
  const data = await getPortfolioData();

  return (
    <StandalonePageLayout initialData={data}>
      <Contact personInfo={data.personInfo} />
    </StandalonePageLayout>
  );
}
