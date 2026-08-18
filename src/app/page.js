import { getPortfolioData } from '@/lib/supabase';
import PortfolioApp from '@/components/PortfolioApp';

export const revalidate = 60; // Revalidate dynamic data every 60 seconds

export default async function Home() {
  const data = await getPortfolioData();

  return <PortfolioApp initialData={data} />;
}
