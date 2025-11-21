'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import HistoryStats from '@/components/HistoryStats';
import HistoryContent from '@/components/HistoryContent';

export default function HistoryPage() {
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
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">History</h1>
          <p className="mt-2 text-lg text-white/60">
            Your wins, losses, and Oaths so far.
          </p>
        </div>

        <HistoryStats />
        <HistoryContent />
      </main>
    </div>
  );
}
