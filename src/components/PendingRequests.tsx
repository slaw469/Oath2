'use client';

import React, { useEffect, useState } from 'react';
import { useDbUser } from '@/hooks/useDbUser';
import { getPendingFriendRequests, getSentFriendRequests, acceptFriendRequest, rejectFriendRequest, removeFriend } from '@/actions/friends';
import toast from 'react-hot-toast';

interface PendingRequestsProps {
  onUpdate?: () => void;
}

const PendingRequests: React.FC<PendingRequestsProps> = ({ onUpdate }) => {
  const { dbUser } = useDbUser();
  const [incomingRequests, setIncomingRequests] = useState<any[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dbUser) {
      loadRequests();
    }
  }, [dbUser]);

  async function loadRequests() {
    if (!dbUser) return;
    setLoading(true);
    
    const [incoming, outgoing] = await Promise.all([
      getPendingFriendRequests(dbUser.id),
      getSentFriendRequests(dbUser.id)
    ]);
    
    setLoading(false);
    
    if (incoming.success) setIncomingRequests(incoming.data);
    if (outgoing.success) setOutgoingRequests(outgoing.data);
  }

  async function handleAccept(friendshipId: string, friendName: string) {
    if (!dbUser) return;
    
    const result = await acceptFriendRequest(dbUser.id, friendshipId);
    if (result.success) {
      toast.success(`You're now friends with ${friendName}!`);
      loadRequests();
      onUpdate?.();
    } else {
      toast.error(result.error || 'Failed to accept request');
    }
  }

  async function handleReject(friendshipId: string) {
    if (!dbUser) return;
    
    const result = await rejectFriendRequest(dbUser.id, friendshipId);
    if (result.success) {
      toast.success('Request declined');
      loadRequests();
    } else {
      toast.error(result.error || 'Failed to decline request');
    }
  }

  async function handleCancelOutgoing(friendshipId: string) {
    if (!dbUser) return;
    
    const result = await removeFriend(dbUser.id, friendshipId);
    if (result.success) {
      toast.success('Request cancelled');
      loadRequests();
    } else {
      toast.error(result.error || 'Failed to cancel request');
    }
  }

  if (loading) {
    return (
      <section>
        <div className="rounded border border-surface bg-surface p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold leading-tight tracking-tight text-white">
              Pending requests
            </h3>
            <p className="text-sm text-white/60">Manage friend requests and invitations.</p>
          </div>
          <p className="text-center text-sm text-white/60">Loading...</p>
        </div>
      </section>
    );
  }

  if (incomingRequests.length === 0 && outgoingRequests.length === 0) {
    return (
      <section>
        <div className="rounded border border-surface bg-surface p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold leading-tight tracking-tight text-white">
              Pending requests
            </h3>
            <p className="text-sm text-white/60">Manage friend requests and invitations.</p>
          </div>
          <p className="text-center text-sm text-white/60">No pending requests</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="rounded border border-surface bg-surface p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold leading-tight tracking-tight text-white">
            Pending requests
          </h3>
          <p className="text-sm text-white/60">Manage friend requests and invitations.</p>
        </div>
        <div className="flex flex-col gap-4">
          {incomingRequests.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-white/60">
                Incoming ({incomingRequests.length})
              </h4>
              {incomingRequests.map((request) => (
                <div key={request.friendshipId} className="flex items-center gap-3 mb-3 last:mb-0">
                  {request.photoURL ? (
                    <div
                      className="size-10 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${request.photoURL}')` }}
                    ></div>
                  ) : (
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{request.displayName || 'User'}</p>
                    <p className="text-xs text-white/60">wants to be your friend</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleReject(request.friendshipId)}
                      className="flex size-8 items-center justify-center rounded-full bg-danger/20 text-danger transition-colors hover:bg-danger/30"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                    <button 
                      onClick={() => handleAccept(request.friendshipId, request.displayName || request.email)}
                      className="flex size-8 items-center justify-center rounded-full bg-success/20 text-success transition-colors hover:bg-success/30"
                    >
                      <span className="material-symbols-outlined text-lg">check</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {outgoingRequests.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-white/60">
                Outgoing ({outgoingRequests.length})
              </h4>
              {outgoingRequests.map((request) => (
                <div key={request.friendshipId} className="flex items-center gap-3 mb-3 last:mb-0">
                  <div className="flex size-10 items-center justify-center rounded-full bg-background-dark text-white/60">
                    <span className="material-symbols-outlined">alternate_email</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{request.email}</p>
                    <p className="text-xs text-white/60">Invite sent</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleCancelOutgoing(request.friendshipId)}
                      className="text-xs font-medium text-primary/80 hover:text-primary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PendingRequests;
