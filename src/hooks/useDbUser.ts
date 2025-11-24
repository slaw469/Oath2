'use client';

// Hook to sync Firebase user with database user
// Call this in your app layout or auth provider to ensure DB user exists

import { useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';

export interface DbUser {
  id: string;
  firebaseUid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  friendCode?: string | null;
  leetcodeUsername?: string | null;
  credits: number;
  gems: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Hook to get the database user record
 * Automatically syncs Firebase user with database on authentication
 */
export function useDbUser() {
  const { user: firebaseUser, loading: authLoading } = useAuth();
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function syncUser() {
      if (authLoading) {
        return;
      }

      if (!firebaseUser) {
        setDbUser(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Call API route to sync user
        const response = await fetch('/api/auth/sync-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to sync user');
        }

        const data = await response.json();
        setDbUser(data.user);
        setError(null);
      } catch (err) {
        console.error('Error syncing user with database:', err);
        setError(err instanceof Error ? err.message : 'Failed to sync user');
      } finally {
        setLoading(false);
      }
    }

    syncUser();
  }, [firebaseUser, authLoading]);

  return {
    dbUser,
    loading: loading || authLoading,
    error,
  };
}

