'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useDbUser } from '@/hooks/useDbUser';

const DashboardHeader = () => {
  const { user, loading: authLoading } = useAuth();
  const { dbUser, loading: dbLoading } = useDbUser();

  const loading = authLoading || dbLoading;

  const name =
    dbUser?.displayName ||
    user?.displayName ||
    (user?.email ? user.email.split('@')[0] : null);

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">
          {loading ? 'Welcome back' : name ? `Welcome back, ${name}` : 'Welcome back'}
        </h1>
        <p className="mt-2 text-sm text-white/60">Here's what's at stake today.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Tues, November 18</span>
        </div>
        <Link
          href="/create-oath"
          className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-black transition-all hover:bg-primary/90"
        >
          Start New Oath
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;


