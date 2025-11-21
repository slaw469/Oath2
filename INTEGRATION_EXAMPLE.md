# Integration Example - Using the Database Layer

This document shows practical examples of integrating the database layer into your Oath app.

## 1. Update Root Layout - User Sync

First, ensure Firebase users are synced with the database:

```typescript
// src/app/layout.tsx
import { AuthProvider } from '@/contexts/AuthContext';
import UserSyncWrapper from '@/components/UserSyncWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <UserSyncWrapper>
            {children}
          </UserSyncWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
```

```typescript
// src/components/UserSyncWrapper.tsx
'use client';

import { useDbUser } from '@/hooks/useDbUser';

export default function UserSyncWrapper({ children }: { children: React.ReactNode }) {
  const { dbUser, loading, error } = useDbUser();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (error) {
    console.error('User sync error:', error);
    // Continue anyway - user might not be logged in
  }
  
  return <>{children}</>;
}
```

## 2. Friends Page Example

```typescript
// src/app/friends/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useDbUser } from '@/hooks/useDbUser';
import { 
  getFriends, 
  getPendingFriendRequests,
  addFriendByEmail,
  acceptFriendRequest,
  removeFriend 
} from '@/actions/friends';

export default function FriendsPage() {
  const { dbUser, loading: userLoading } = useDbUser();
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (dbUser) {
      loadData();
    }
  }, [dbUser]);

  async function loadData() {
    if (!dbUser) return;

    const [friendsResult, requestsResult] = await Promise.all([
      getFriends(dbUser.id),
      getPendingFriendRequests(dbUser.id),
    ]);

    if (friendsResult.success) setFriends(friendsResult.data);
    if (requestsResult.success) setPendingRequests(requestsResult.data);
  }

  async function handleAddFriend(e: React.FormEvent) {
    e.preventDefault();
    if (!dbUser || !email) return;

    setLoading(true);
    const result = await addFriendByEmail(dbUser.id, email);
    setLoading(false);

    if (result.success) {
      setMessage('Friend request sent!');
      setEmail('');
    } else {
      setMessage(result.error || 'Failed to send request');
    }
  }

  async function handleAcceptRequest(friendshipId: string) {
    if (!dbUser) return;

    const result = await acceptFriendRequest(dbUser.id, friendshipId);
    if (result.success) {
      await loadData();
      setMessage('Friend request accepted!');
    }
  }

  async function handleRemoveFriend(friendshipId: string) {
    if (!dbUser) return;
    if (!confirm('Remove this friend?')) return;

    const result = await removeFriend(dbUser.id, friendshipId);
    if (result.success) {
      await loadData();
      setMessage('Friend removed');
    }
  }

  if (userLoading) return <div>Loading...</div>;
  if (!dbUser) return <div>Please log in</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Friends</h1>

      {/* Add Friend Form */}
      <form onSubmit={handleAddFriend} className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add Friend</h2>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="friend@example.com"
            className="border rounded px-3 py-2 flex-1"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Add Friend'}
          </button>
        </div>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Pending Requests</h2>
          <div className="space-y-2">
            {pendingRequests.map((request: any) => (
              <div key={request.friendshipId} className="border rounded p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">{request.displayName || request.email}</p>
                  <p className="text-sm text-gray-600">{request.email}</p>
                </div>
                <button
                  onClick={() => handleAcceptRequest(request.friendshipId)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Accept
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Friends List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">My Friends ({friends.length})</h2>
        {friends.length === 0 ? (
          <p className="text-gray-600">No friends yet. Add some above!</p>
        ) : (
          <div className="space-y-2">
            {friends.map((friend: any) => (
              <div key={friend.friendshipId} className="border rounded p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {friend.photoURL && (
                    <img src={friend.photoURL} alt="" className="w-10 h-10 rounded-full" />
                  )}
                  <div>
                    <p className="font-medium">{friend.displayName || friend.email}</p>
                    <p className="text-sm text-gray-600">{friend.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFriend(friend.friendshipId)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

## 3. Create Oath Page Example

```typescript
// src/app/create-oath/CreateOathForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDbUser } from '@/hooks/useDbUser';
import { getFriends } from '@/actions/friends';
import { createOath } from '@/actions/oaths';

export default function CreateOathForm() {
  const router = useRouter();
  const { dbUser } = useDbUser();
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'DAILY' as const,
    startDate: new Date().toISOString().split('T')[0],
    duration: 30,
    stakeAmount: 50,
    verificationPrompt: '',
  });

  useEffect(() => {
    if (dbUser) {
      loadFriends();
    }
  }, [dbUser]);

  async function loadFriends() {
    if (!dbUser) return;
    const result = await getFriends(dbUser.id);
    if (result.success) setFriends(result.data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dbUser) return;

    if (selectedFriends.length === 0) {
      alert('Please select at least one friend');
      return;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + formData.duration);

    const result = await createOath(dbUser.id, {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      startDate,
      endDate,
      stakeAmount: formData.stakeAmount,
      verificationPrompt: formData.verificationPrompt,
      participantUserIds: [dbUser.id, ...selectedFriends],
    });

    if (result.success) {
      router.push(`/oath/${result.data.id}`);
    } else {
      alert(result.error || 'Failed to create oath');
    }
  }

  if (!dbUser) return <div>Please log in</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">Create New Oath</h1>

      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border rounded px-3 py-2"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Stake Amount (Credits)</label>
        <input
          type="number"
          value={formData.stakeAmount}
          onChange={(e) => setFormData({ ...formData, stakeAmount: parseInt(e.target.value) })}
          className="w-full border rounded px-3 py-2"
          min={1}
          max={dbUser.credits}
          required
        />
        <p className="text-sm text-gray-600 mt-1">Your balance: {dbUser.credits} credits</p>
      </div>

      <div>
        <label className="block font-medium mb-1">Select Rival(s)</label>
        <div className="space-y-2">
          {friends.map((friend: any) => (
            <label key={friend.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedFriends.includes(friend.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFriends([...selectedFriends, friend.id]);
                  } else {
                    setSelectedFriends(selectedFriends.filter(id => id !== friend.id));
                  }
                }}
              />
              <span>{friend.displayName || friend.email}</span>
            </label>
          ))}
        </div>
        {friends.length === 0 && (
          <p className="text-gray-600">Add friends first to create oaths with them</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Verification Instructions (for AI)</label>
        <textarea
          value={formData.verificationPrompt}
          onChange={(e) => setFormData({ ...formData, verificationPrompt: e.target.value })}
          className="w-full border rounded px-3 py-2"
          rows={2}
          placeholder="e.g., Check if the user submitted a valid LeetCode solution link"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
      >
        Create Oath
      </button>
    </form>
  );
}
```

## 4. Daily Check-in Component Example

```typescript
// src/components/DailyCheckIn.tsx
'use client';

import { useState } from 'react';
import { useDbUser } from '@/hooks/useDbUser';
import { submitCheckIn } from '@/actions/checkins';

export default function DailyCheckIn({ oathId }: { oathId: string }) {
  const { dbUser } = useDbUser();
  const [proofUrl, setProofUrl] = useState('');
  const [proofText, setProofText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dbUser) return;

    setSubmitting(true);
    const result = await submitCheckIn({
      oathId,
      userId: dbUser.id,
      dueDate: new Date(),
      proofUrl: proofUrl || undefined,
      proofText: proofText || undefined,
    });
    setSubmitting(false);

    if (result.success) {
      alert('Proof submitted! Waiting for AI verification...');
      setProofUrl('');
      setProofText('');
    } else {
      alert(result.error || 'Failed to submit');
    }
  }

  if (!dbUser) return null;

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4">
      <h3 className="font-semibold mb-3">Submit Today's Proof</h3>

      <div className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Proof URL (optional)</label>
          <input
            type="url"
            value={proofUrl}
            onChange={(e) => setProofUrl(e.target.value)}
            placeholder="https://leetcode.com/..."
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            value={proofText}
            onChange={(e) => setProofText(e.target.value)}
            placeholder="Describe what you did..."
            className="w-full border rounded px-3 py-2"
            rows={3}
            required={!proofUrl}
          />
        </div>

        <button
          type="submit"
          disabled={submitting || (!proofUrl && !proofText)}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Proof'}
        </button>
      </div>
    </form>
  );
}
```

## 5. Using in Server Components

```typescript
// src/app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getUserOaths } from '@/actions/oaths';
import { getPendingFriendRequests } from '@/actions/friends';

// This would need your auth logic to get the user ID from session
async function getCurrentUserId() {
  // Your implementation here
  // Could use Firebase Admin SDK to verify session cookie
  return 'user-id-from-session';
}

export default async function DashboardPage() {
  const userId = await getCurrentUserId();
  
  if (!userId) {
    redirect('/auth/signin');
  }

  // Fetch data server-side
  const [oathsResult, requestsResult] = await Promise.all([
    getUserOaths(userId, 'ACTIVE'),
    getPendingFriendRequests(userId),
  ]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Active Oaths */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Active Oaths</h2>
        {oathsResult.success && oathsResult.data.length > 0 ? (
          <div className="grid gap-4">
            {oathsResult.data.map((oath: any) => (
              <div key={oath.id} className="border rounded-lg p-4">
                <h3 className="font-semibold">{oath.title}</h3>
                <p className="text-sm text-gray-600">{oath.description}</p>
                <p className="text-sm mt-2">
                  Stake: {oath.stakeAmount} credits | 
                  Participants: {oath.participants.length}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No active oaths</p>
        )}
      </section>

      {/* Friend Requests */}
      {requestsResult.success && requestsResult.data.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Friend Requests ({requestsResult.data.length})
          </h2>
          <p className="text-gray-600">You have pending friend requests!</p>
        </section>
      )}
    </div>
  );
}
```

## 6. Type Safety Tips

```typescript
// Import Prisma types for type safety
import { User, Oath, CheckIn, Friendship } from '@prisma/client';

// Use Prisma's generated types with relations
import { Prisma } from '@prisma/client';

type OathWithParticipants = Prisma.OathGetPayload<{
  include: { participants: { include: { user: true } } }
}>;

type FriendshipWithUsers = Prisma.FriendshipGetPayload<{
  include: { initiator: true; receiver: true }
}>;

function MyComponent({ oath }: { oath: OathWithParticipants }) {
  // Fully typed!
  const participantNames = oath.participants.map(p => p.user.displayName);
}
```

## Summary

These examples show:
- ✅ Client-side usage with React hooks
- ✅ Server-side usage with server components
- ✅ Form handling and validation
- ✅ Error handling patterns
- ✅ Loading states
- ✅ Type safety with Prisma types

Adapt these patterns to match your UI design and component structure!

