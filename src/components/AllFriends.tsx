'use client';

import React, { useEffect, useState } from 'react';
import { useDbUser } from '@/hooks/useDbUser';
import { getFriends, removeFriend } from '@/actions/friends';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AllFriends = () => {
  const { dbUser } = useDbUser();
  const router = useRouter();
  const [friends, setFriends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    if (dbUser) {
      loadFriends();
    }
  }, [dbUser]);

  async function loadFriends() {
    if (!dbUser) return;
    setLoading(true);
    const result = await getFriends(dbUser.id);
    setLoading(false);
    if (result.success) {
      setFriends(result.data);
    }
  }

  async function handleRemoveFriend(friendshipId: string, friendName: string) {
    if (!confirm(`Remove ${friendName} from your friends?`)) return;
    if (!dbUser) return;

    const result = await removeFriend(dbUser.id, friendshipId);
    if (result.success) {
      toast.success('Friend removed');
      loadFriends();
    } else {
      toast.error(result.error || 'Failed to remove friend');
    }
    setOpenMenuId(null);
  }

  function handleChallenge(friend: any) {
    if (!dbUser) {
      toast.error('You must be logged in to create a challenge');
      return;
    }

    const opponentPayload = encodeURIComponent(
      JSON.stringify({
        id: friend.id,
        displayName: friend.displayName,
        email: friend.email,
        photoURL: friend.photoURL,
      }),
    );

    router.push(`/create-oath?opponent=${opponentPayload}`);
  }

  if (loading) {
    return (
      <section>
        <div className="mb-4">
          <h3 className="text-xl font-bold leading-tight tracking-tight text-white">All friends</h3>
          <p className="text-sm text-white/60">Everyone you've added on Oath.</p>
        </div>
        <div className="flex flex-col rounded border border-surface bg-surface p-8">
          <p className="text-center text-white/60">Loading...</p>
        </div>
      </section>
    );
  }

  if (friends.length === 0) {
    return (
      <section>
        <div className="mb-4">
          <h3 className="text-xl font-bold leading-tight tracking-tight text-white">All friends</h3>
          <p className="text-sm text-white/60">Everyone you've added on Oath.</p>
        </div>
        <div className="flex flex-col rounded border border-surface bg-surface p-8">
          <p className="text-center text-white/60">No friends yet. Add some to get started!</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4">
        <h3 className="text-xl font-bold leading-tight tracking-tight text-white">All friends</h3>
        <p className="text-sm text-white/60">Everyone you've added on Oath.</p>
      </div>
      <div className="flex flex-col rounded border border-surface bg-surface">
        {friends.map((friend, index) => (
          <React.Fragment key={friend.friendshipId}>
            {index > 0 && <div className="mx-4 h-px bg-white/10"></div>}
            <div className="flex flex-wrap items-center gap-4 p-4 transition-colors hover:bg-white/5">
              <div className="flex w-full items-center gap-3 sm:w-auto sm:flex-1">
                {friend.photoURL ? (
                  <div
                    className="size-10 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${friend.photoURL}')` }}
                  ></div>
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-white">{friend.displayName || 'User'}</p>
                  <p className="text-xs text-white/60">{friend.email}</p>
                </div>
              </div>
              <div className="flex flex-1 items-center">
                <div className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                  No Oaths yet — break the ice.
                </div>
              </div>
              <div className="flex w-full items-center justify-end gap-2 sm:w-auto relative">
                <button 
                  onClick={() => handleChallenge(friend)}
                  className="h-9 rounded-full bg-primary px-5 text-sm font-bold text-background-dark transition-opacity hover:opacity-90"
                >
                  Challenge
                </button>
                <button 
                  onClick={() =>
                    setOpenMenuId((prev) =>
                      prev === friend.friendshipId ? null : friend.friendshipId,
                    )
                  }
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20"
                >
                  <span className="material-symbols-outlined text-xl">more_horiz</span>
                </button>
                {openMenuId === friend.friendshipId && (
                  <div className="absolute right-0 top-10 z-20 w-44 rounded-lg bg-surface border border-white/10 shadow-lg py-1 text-sm text-white/80">
                    <button
                      type="button"
                      onClick={() => {
                        toast('Friend profile coming soon');
                        setOpenMenuId(null);
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-white/10"
                    >
                      View profile (coming soon)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveFriend(
                          friend.friendshipId,
                          friend.displayName || friend.email,
                        )
                      }
                      className="block w-full px-4 py-2 text-left text-danger hover:bg-white/10"
                    >
                      Remove friend
                    </button>
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default AllFriends;
