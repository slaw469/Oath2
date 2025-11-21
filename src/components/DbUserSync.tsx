'use client';

// Component that syncs Firebase users to the database
// Place this inside your AuthProvider to ensure every logged-in user has a DB record

import { useDbUser } from '@/hooks/useDbUser';

export default function DbUserSync({ children }: { children: React.ReactNode }) {
  const { dbUser, loading, error } = useDbUser();

  // Log sync status for debugging
  if (typeof window !== 'undefined' && dbUser) {
    console.log('✅ DB User synced:', {
      id: dbUser.id,
      email: dbUser.email,
      credits: dbUser.credits,
      gems: dbUser.gems
    });
  }

  if (error) {
    console.error('❌ DB User sync error:', error);
  }

  // Don't block rendering - user sync happens in background
  return <>{children}</>;
}

