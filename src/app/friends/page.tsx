'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDbUser } from '@/hooks/useDbUser';
import { addFriendByEmail, addFriendByCode } from '@/actions/friends';
import toast from 'react-hot-toast';
import FriendsStats from '@/components/FriendsStats';
import TopRivals from '@/components/TopRivals';
import AllFriends from '@/components/AllFriends';
import PendingRequests from '@/components/PendingRequests';
import SuggestedConnections from '@/components/SuggestedConnections';

export default function FriendsPage() {
  const { user, loading } = useAuth();
  const { dbUser } = useDbUser();
  const router = useRouter();
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [friendEmail, setFriendEmail] = useState('');
  const [friendCode, setFriendCode] = useState('');
  const [addMode, setAddMode] = useState<'email' | 'code'>('email');
  const [addingFriend, setAddingFriend] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

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

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dbUser) return;

    if (addMode === 'email' && !friendEmail) return;
    if (addMode === 'code' && !friendCode) return;

    setAddingFriend(true);
    const result =
      addMode === 'email'
        ? await addFriendByEmail(dbUser.id, friendEmail)
        : await addFriendByCode(dbUser.id, friendCode);
    setAddingFriend(false);

    if (result.success) {
      toast.success('Friend request sent!');
      setFriendEmail('');
      setFriendCode('');
      setShowAddFriendModal(false);
      setRefreshKey(prev => prev + 1); // Trigger refresh
    } else {
      toast.error(result.error || 'Failed to send request');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background-dark">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Friends & Rivals
            </h1>
            <p className="mt-2 text-lg text-white/60">
              See your circle, your record, and who to challenge next.
            </p>
            {dbUser?.friendCode && (
              <p className="mt-2 text-sm text-primary/90">
                Your friend code:{' '}
                <span className="font-mono font-bold bg-primary/10 px-2 py-0.5 rounded">
                  {dbUser.friendCode}
                </span>
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search friends..."
                className="h-11 w-64 rounded-full border border-white/10 bg-surface pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-white/40">
                search
              </span>
            </div>
            <button 
              onClick={() => setShowAddFriendModal(true)}
              className="h-11 rounded-full bg-primary px-6 text-sm font-bold text-background-dark transition-opacity hover:opacity-90"
            >
              Add friend
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <FriendsStats />

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Takes 2/3 width */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            <TopRivals />
            <AllFriends key={refreshKey} />
          </div>

          {/* Right Column - Takes 1/3 width */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <PendingRequests key={refreshKey} onUpdate={() => setRefreshKey(prev => prev + 1)} />
            <SuggestedConnections />
          </div>
        </div>
      </main>

      {/* Add Friend Modal */}
      {showAddFriendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-lg border border-white/10 bg-surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Add Friend</h2>
              <button
                onClick={() => setShowAddFriendModal(false)}
                className="text-white/60 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="mb-4 flex gap-2 rounded-full bg-background-dark/60 p-1">
              <button
                type="button"
                onClick={() => setAddMode('email')}
                className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${
                  addMode === 'email'
                    ? 'bg-primary text-background-dark'
                    : 'text-white/70 hover:bg-white/5'
                }`}
              >
                By Email
              </button>
              <button
                type="button"
                onClick={() => setAddMode('code')}
                className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${
                  addMode === 'code'
                    ? 'bg-primary text-background-dark'
                    : 'text-white/70 hover:bg-white/5'
                }`}
              >
                By Code
              </button>
            </div>
            <form onSubmit={handleAddFriend}>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-white/80">
                  {addMode === 'email' ? "Friend's Email" : "Friend's Code"}
                </label>
                {addMode === 'email' ? (
                  <input
                    type="email"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    placeholder="friend@example.com"
                    className="w-full rounded-lg border border-white/10 bg-background-dark px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                    autoFocus
                  />
                ) : (
                  <input
                    type="text"
                    value={friendCode}
                    onChange={(e) => setFriendCode(e.target.value.toUpperCase())}
                    placeholder="e.g. ABCD1234"
                    className="w-full rounded-lg border border-white/10 bg-background-dark px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
                    required
                    autoFocus
                  />
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddFriendModal(false)}
                  className="flex-1 rounded-full border border-white/10 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingFriend}
                  className="flex-1 rounded-full bg-primary px-4 py-3 text-sm font-bold text-background-dark transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {addingFriend ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
