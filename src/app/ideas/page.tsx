'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import OathGenerator from '@/components/OathGenerator';
import CuratedOaths from '@/components/CuratedOaths';
import RandomOath from '@/components/RandomOath';
import TrendingOaths from '@/components/TrendingOaths';

export default function IdeasPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-dark">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-white/60">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Don&apos;t know what to bet on? Start here.
          </h1>
          <p className="mt-3 text-lg text-white/60">
            Describe what you&apos;re struggling with, and we&apos;ll turn it into an Oath with real stakes.
          </p>
        </div>

        {/* Oath Generator Section */}
        <div className="mb-16">
          <OathGenerator />
        </div>

        {/* Curated Oaths Section */}
        <div className="mb-16 flex justify-center">
          <CuratedOaths />
        </div>

        {/* Random Oath Section */}
        <div className="mb-16 flex justify-center">
          <RandomOath />
        </div>

        {/* Trending Oaths Section */}
        <div className="flex justify-center">
          <TrendingOaths />
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-white/60">
            All Oaths are customizable. You can adjust frequency, duration, and stake before you confirm.
          </p>
          <button className="mt-6 text-sm font-medium text-primary hover:underline">
            View all your active Oaths →
          </button>
        </div>
      </main>
    </div>
  );
}
