'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDbUser } from '@/hooks/useDbUser';
import { getUserOathInvitations, acceptOathInvitation, declineOathInvitation } from '@/actions/oaths';
import toast from 'react-hot-toast';

interface OathInvitation {
  id: string;
  title: string;
  description: string;
  stakeAmount: number;
  currencyType: string;
  endDate: Date;
  participants: {
    user: {
      id: string;
      displayName: string | null;
      email: string;
      photoURL: string | null;
    };
  }[];
}

const OathInvitations = () => {
  const router = useRouter();
  const { dbUser, loading: dbUserLoading } = useDbUser();
  const [invitations, setInvitations] = useState<OathInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchInvitations = async () => {
    if (!dbUser) return;
    setLoading(true);
    const result = await getUserOathInvitations(dbUser.id);
    if (result.success && result.data) {
      setInvitations(result.data);
    } else if (result.error) {
      toast.error(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!dbUserLoading) {
      fetchInvitations();
    }
  }, [dbUser, dbUserLoading]);

  const handleAccept = async (oathId: string) => {
    if (!dbUser) return;
    setProcessingId(oathId);
    
    const result = await acceptOathInvitation(dbUser.id, oathId);
    
    if (result.success) {
      toast.success('⚔️ Challenge accepted! Good luck!');
      // Refresh the entire page data to show updated oaths
      router.refresh();
      // Also refresh local invitations list
      setTimeout(() => {
        fetchInvitations();
      }, 100);
    } else {
      toast.error(result.error || 'Failed to accept invitation');
    }
    
    setProcessingId(null);
  };

  const handleDecline = async (oathId: string) => {
    if (!dbUser) return;
    setProcessingId(oathId);
    
    const result = await declineOathInvitation(dbUser.id, oathId);
    
    if (result.success) {
      toast.success('Challenge declined');
      // Refresh the entire page data
      router.refresh();
      // Also refresh local invitations list
      setTimeout(() => {
        fetchInvitations();
      }, 100);
    } else {
      toast.error(result.error || 'Failed to decline invitation');
    }
    
    setProcessingId(null);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getInviter = (invitation: OathInvitation) => {
    if (!dbUser) return null;
    const inviter = invitation.participants.find(p => p.user.id !== dbUser.id);
    return inviter?.user;
  };

  if (loading || dbUserLoading) {
    return null; // Don't show section while loading
  }

  if (invitations.length === 0) {
    return null; // Don't show section if no invitations
  }

  return (
    <section>
      <div className="mb-4">
        <h3 className="text-xl font-bold leading-tight tracking-tight text-white">Oath Invitations</h3>
        <p className="text-sm text-white/60">Accept or decline challenges from your friends.</p>
      </div>
      <div className="space-y-3">
        {invitations.map((invitation) => {
          const inviter = getInviter(invitation);
          const isProcessing = processingId === invitation.id;

          return (
            <div
              key={invitation.id}
              className="rounded-lg border border-primary/30 bg-surface p-4 transition-all hover:border-primary/50"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {inviter && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">
                        {inviter.photoURL ? (
                          <img
                            src={inviter.photoURL}
                            alt={inviter.displayName || inviter.email}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          (inviter.displayName || inviter.email).charAt(0).toUpperCase()
                        )}
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-white/60">
                        <span className="font-bold text-white">
                          {inviter?.displayName || inviter?.email}
                        </span>{' '}
                        challenged you
                      </p>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{invitation.title}</h4>
                  <p className="text-sm text-white/70 mb-2">{invitation.description}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="font-bold text-primary">
                      Stake: {invitation.currencyType === 'GEMS' ? `💎 ${invitation.stakeAmount.toLocaleString()}` : `$${invitation.stakeAmount}`}
                    </span>
                    <span className="text-white/60">
                      Ends: {formatDate(invitation.endDate)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecline(invitation.id)}
                    disabled={isProcessing}
                    className="rounded-full border-2 border-danger/50 bg-danger/10 px-4 py-2 text-sm font-medium text-danger transition-all hover:bg-danger/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? '...' : 'Decline'}
                  </button>
                  <button
                    onClick={() => handleAccept(invitation.id)}
                    disabled={isProcessing}
                    className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-black transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? '...' : 'Accept Challenge ⚔️'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OathInvitations;

