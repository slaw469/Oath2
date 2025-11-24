'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useDbUser } from '@/hooks/useDbUser';

export default function GemsPage() {
  const { user, loading } = useAuth();
  const { dbUser, loading: dbLoading } = useDbUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [loading, user, router]);

  if (loading || dbLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-dark">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-white/60">Loading your gem balance...</p>
        </div>
      </div>
    );
  }

  if (!user || !dbUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            <span className="mr-2">💎</span>
            Gems
          </h1>
          <p className="mt-2 text-lg text-white/60">
            Your in-game currency for Oath stakes and challenges.
          </p>
        </div>

        {/* Current balance */}
        <section className="mb-8 rounded-xl bg-gradient-to-br from-primary/20 to-green-500/20 p-6">
          <p className="text-sm font-medium text-white/70 mb-1">Current balance</p>
          <p className="text-4xl font-extrabold text-white">
            💎 {dbUser.gems.toLocaleString()}
          </p>
          <p className="mt-3 text-sm text-white/70">
            Every new account starts with <span className="font-semibold text-primary">💎 100</span> gems.
            Use gems to back your oaths and versus challenges with real stakes.
          </p>
        </section>

        {/* Coming soon: buy gems */}
        <section className="space-y-4 rounded-xl bg-surface border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Buy more gems</h2>
              <p className="mt-1 text-sm text-white/60">
                Top up your balance to enter higher-stakes challenges.
              </p>
            </div>
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase text-white/60">
              Coming soon
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 mt-4">
            {[500, 1000, 2500].map((amount) => (
              <div
                key={amount}
                className="flex flex-col justify-between rounded-lg border border-white/10 bg-background-dark/70 p-4 text-white/70"
              >
                <div>
                  <p className="text-sm font-semibold text-white/80">💎 {amount.toLocaleString()}</p>
                  <p className="mt-1 text-xs text-white/50">Perfect for frequent challengers.</p>
                </div>
                <button
                  type="button"
                  disabled
                  className="mt-4 w-full cursor-not-allowed rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/50"
                >
                  Buy (coming soon)
                </button>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-white/50">
            Real-money top-ups, rewards, and leaderboards are in development. For now, use your starter
            gems to test out oaths and versus challenges.
          </p>
        </section>
      </main>
    </div>
  );
}


