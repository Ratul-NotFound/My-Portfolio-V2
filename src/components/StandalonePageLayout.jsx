'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { getPortfolioData } from '@/lib/supabase';

const AIAssistant = dynamic(() => import('@/components/ai/AIAssistant'), { ssr: false });

export default function StandalonePageLayout({ initialData, children }) {
  const [data, setData] = useState(initialData || {});

  useEffect(() => {
    // Reset scroll to top when opening a dedicated page
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // Client-side instant synchronization with Supabase or LocalStorage cache
    getPortfolioData().then((freshData) => {
      if (freshData) {
        setData(freshData);
      }
    }).catch(err => {
      console.warn("Portfolio data sync check:", err);
    });
  }, []);

  return (
    <main className="relative min-h-screen w-full max-w-full overflow-x-hidden flex flex-col justify-between">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* AI Assistant Floating Widget */}
      <AIAssistant data={data} />

      {/* Navbar */}
      <Navbar personInfo={data.personInfo} />

      {/* Page Main Content Container with navbar clearance */}
      <div className="w-full flex-1 pt-20 sm:pt-24 pb-12 sm:pb-16 flex flex-col justify-center">
        {children}
      </div>

      {/* Footer */}
      <Footer personInfo={data.personInfo} />
    </main>
  );
}
