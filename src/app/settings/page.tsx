'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SettingsPage() {
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
            <span className="text-primary">Settings</span>
          </h1>
          <p className="mt-2 text-lg text-white/60">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <div className="rounded-lg bg-surface border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Name</label>
                  <input
                    type="text"
                    disabled
                    value={user?.displayName || ''}
                    className="w-full rounded-lg bg-background-dark border border-white/10 px-4 py-3 text-white/60 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="w-full rounded-lg bg-background-dark border border-white/10 px-4 py-3 text-white/60 cursor-not-allowed"
                  />
                </div>
                <p className="text-sm text-white/60">
                  Profile editing coming soon. Contact support if you need to make changes.
                </p>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="rounded-lg bg-surface border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Email Notifications</p>
                    <p className="text-sm text-white/60">Receive updates about your oaths</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 rounded border-white/10 bg-background-dark text-primary focus:ring-primary"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Push Notifications</p>
                    <p className="text-sm text-white/60">Get notified about deadlines</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 rounded border-white/10 bg-background-dark text-primary focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Account Summary */}
          <div className="space-y-6">
            <div className="rounded-lg bg-surface border border-white/10 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Account Summary</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-white/60">Member Since</p>
                  <p className="text-white font-medium">
                    {user?.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).toLocaleDateString()
                      : 'Today'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-white/60">Account Status</p>
                  <p className="text-success font-medium">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
