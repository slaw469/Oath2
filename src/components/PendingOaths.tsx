'use client';

import React, { useState, useEffect } from 'react';
import { useDbUser } from '@/hooks/useDbUser';
import { getUserOaths } from '@/actions/oaths';
import toast from 'react-hot-toast';

interface PendingOath {
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
    status: string;
  }[];
}

const PendingOaths = () => {
  const { dbUser, loading: dbUserLoading } = useDbUser();
  const [pendingOaths, setPendingOaths] = useState<PendingOath[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPendingOaths() {
      if (!dbUser) return;
      setLoading(true);
      const result = await getUserOaths(dbUser.id, 'PENDING');
      if (result.success && result.data) {
        setPendingOaths(result.data);
      } else if (result.error) {
        toast.error(result.error);
      }
      setLoading(false);
    }
    if (!dbUserLoading) {
      fetchPendingOaths();
    }
  }, [dbUser, dbUserLoading]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getWaitingFor = (oath: PendingOath) => {
    if (!dbUser) return [];
    return oath.participants.filter(
      (p) => p.user.id !== dbUser.id && p.status === 'INVITED'
    );
  };

  if (loading || dbUserLoading) {
    return null;
  }

  if (pendingOaths.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-white/10 bg-surface p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">Pending Acceptance</h3>
        <p className="text-sm text-white/60">Waiting for friends to accept your challenges</p>
      </div>
      <div className="space-y-3">
        {pendingOaths.map((oath) => {
          const waitingFor = getWaitingFor(oath);
          
          return (
            <div
              key={oath.id}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-background-dark p-3"
            >
              <div className="flex-1">
                <h4 className="font-medium text-white">{oath.title}</h4>
                <div className="mt-1 flex items-center gap-3 text-xs text-white/60">
                  <span>
                    Stake: {oath.currencyType === 'GEMS' ? `💎 ${oath.stakeAmount.toLocaleString()}` : `$${oath.stakeAmount}`}
                  </span>
                  <span>•</span>
                  <span>Ends: {formatDate(oath.endDate)}</span>
                </div>
                {waitingFor.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-white/40">Waiting for:</span>
                    {waitingFor.map((p) => (
                      <div key={p.user.id} className="flex items-center gap-1">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                          {p.user.photoURL ? (
                            <img
                              src={p.user.photoURL}
                              alt={p.user.displayName || p.user.email}
                              className="h-5 w-5 rounded-full"
                            />
                          ) : (
                            (p.user.displayName || p.user.email).charAt(0).toUpperCase()
                          )}
                        </div>
                        <span className="text-xs text-white/70">
                          {p.user.displayName || p.user.email.split('@')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-yellow-500">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>Pending</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PendingOaths;

