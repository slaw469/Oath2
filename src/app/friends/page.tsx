'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FriendsPage() {
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
          <h1 className="text-4xl font-bold text-white">
            <span className="text-primary">Friends</span> & Connections
          </h1>
          <p className="mt-2 text-lg text-white/60">
            Connect with friends and compete together
          </p>
        </div>

        <div className="rounded-lg bg-surface border border-white/10 p-12 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
            <span className="material-symbols-outlined text-5xl text-primary">group</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
          <p className="text-white/60 max-w-md mx-auto">
            Manage your friends, send challenges, and compete on leaderboards.
          </p>
        </div>
      </main>
    </div>
  );
}
