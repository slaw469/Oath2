'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDbUser } from '@/hooks/useDbUser';
import { getUserOaths } from '@/actions/oaths';
import { getDeadlineStatus, formatTimeRemaining, calculateStreak, formatCurrency, formatOathType } from '@/lib/oath-utils';
import toast from 'react-hot-toast';

interface OathWithDetails {
  id: string;
  title: string;
  description: string;
  type: string;
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
    successCount: number;
  }[];
  checkIns: {
    dueDate: Date;
    status: string;
  }[];
}

const TodaysOaths = () => {
  const router = useRouter();
  const { dbUser, loading: dbUserLoading } = useDbUser();
  const [oaths, setOaths] = useState<OathWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodaysOaths() {
      if (!dbUser) return;
      setLoading(true);
      
      const result = await getUserOaths(dbUser.id, 'ACTIVE');
      if (result.success && result.data) {
        // Filter to only today's oaths (those with deadlines today)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todaysOaths = result.data.filter((oath: any) => {
          const endDate = new Date(oath.endDate);
          return endDate >= today && endDate < tomorrow;
        });

        setOaths(todaysOaths);
      } else if (result.error) {
        toast.error(result.error);
      }
      setLoading(false);
    }
    
    if (!dbUserLoading) {
      fetchTodaysOaths();
    }
  }, [dbUser, dbUserLoading]);

  const getOpponent = (oath: OathWithDetails) => {
    if (!dbUser) return null;
    return oath.participants.find(p => p.user.id !== dbUser.id);
  };

  const getCurrentUser = (oath: OathWithDetails) => {
    if (!dbUser) return null;
    return oath.participants.find(p => p.user.id === dbUser.id);
  };

  const handleUploadProof = (oathId: string) => {
    router.push(`/oath/${oathId}?action=upload`);
  };

  const handleViewSubmissions = (oathId: string) => {
    router.push(`/oath/${oathId}?tab=submissions`);
  };

  if (loading || dbUserLoading) {
    return (
      <section>
        <div className="mb-4">
          <h3 className="text-xl font-bold leading-tight tracking-tight text-white">Today's Oaths</h3>
          <p className="text-sm text-white/60">These Oaths have check-ins or deadlines today.</p>
        </div>
        <div className="rounded border border-surface bg-surface p-8 text-center">
          <p className="text-white/60">Loading today's oaths...</p>
        </div>
      </section>
    );
  }

  if (oaths.length === 0) {
    return (
      <section>
        <div className="mb-4">
          <h3 className="text-xl font-bold leading-tight tracking-tight text-white">Today's Oaths</h3>
          <p className="text-sm text-white/60">These Oaths have check-ins or deadlines today.</p>
        </div>
        <div className="rounded border border-surface bg-surface p-8 text-center">
          <p className="text-white/60">No oaths due today. You're all caught up! 🎯</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4">
        <h3 className="text-xl font-bold leading-tight tracking-tight text-white">Today's Oaths</h3>
        <p className="text-sm text-white/60">These Oaths have check-ins or deadlines today.</p>
      </div>
      <div className="flex flex-col gap-4">
        {oaths.map((oath) => {
          const opponent = getOpponent(oath);
          const currentUser = getCurrentUser(oath);
          const deadline = new Date(oath.endDate);
          const myStatus = getDeadlineStatus(deadline);
          const opponentStatus = opponent ? getDeadlineStatus(deadline) : null;
          const streak = currentUser ? currentUser.successCount : 0;
          const isUrgent = myStatus.status === 'at-risk';

          return (
            <div
              key={oath.id}
              className={`flex flex-col gap-4 rounded border ${
                isUrgent ? 'border-danger/50 shadow-lg shadow-danger/10' : 'border-surface'
              } bg-surface p-5 transition-all ${
                isUrgent ? 'hover:shadow-danger/20' : 'hover:border-white/20'
              }`}
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-white">{oath.title}</p>
                    <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                      {formatOathType(oath.type)}
                    </span>
                  </div>
                  <p className="text-sm text-white/60">{oath.description.substring(0, 50)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60">POT</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(oath.stakeAmount * oath.participants.length, oath.currencyType as any)}
                  </p>
                </div>
              </div>

              {/* Participants */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Current User */}
                  <div className="flex items-center gap-2">
                    <div 
                      className="size-8 rounded-full bg-cover bg-center bg-primary/20 flex items-center justify-center text-sm font-bold text-primary"
                      style={dbUser?.photoURL ? { backgroundImage: `url('${dbUser.photoURL}')` } : {}}
                    >
                      {!dbUser?.photoURL && (dbUser?.displayName?.[0] || dbUser?.email?.[0] || 'U')}
                    </div>
                    <span className="text-sm font-medium text-white">You</span>
                  </div>

                  {opponent && (
                    <>
                      <span className="text-sm text-white/40">vs</span>
                      {/* Opponent */}
                      <div className="flex items-center gap-2">
                        <div 
                          className="size-8 rounded-full bg-cover bg-center bg-primary/20 flex items-center justify-center text-sm font-bold text-primary"
                          style={opponent.user.photoURL ? { backgroundImage: `url('${opponent.user.photoURL}')` } : {}}
                        >
                          {!opponent.user.photoURL && (opponent.user.displayName?.[0] || opponent.user.email[0])}
                        </div>
                        <span className="text-sm font-medium text-white">
                          {opponent.user.displayName || opponent.user.email.split('@')[0]}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-2">
                  <div className={`rounded-full ${myStatus.bgColor} px-2.5 py-1 text-xs font-medium ${myStatus.color}`}>
                    {myStatus.label}
                  </div>
                  {opponent && opponentStatus && (
                    <div className={`rounded-full ${opponentStatus.bgColor} px-2.5 py-1 text-xs font-medium ${opponentStatus.color}`}>
                      Their status: {opponentStatus.status === 'safe' ? 'Safe' : opponentStatus.status === 'moderate' ? 'Moderate' : 'At Risk'}
                    </div>
                  )}
                </div>
              </div>

              <div className="h-px w-full bg-white/10"></div>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-white/60">Deadline</p>
                    <p className="font-medium text-white">
                      {deadline.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                  </div>
                  <div className={`text-center ${myStatus.color}`}>
                    <p className="text-xs">Time Remaining</p>
                    <p className="font-medium">{formatTimeRemaining(deadline)}</p>
                  </div>
                  <div className="hidden text-center sm:block">
                    <p className="text-xs text-white/60">Streak</p>
                    <p className="font-medium text-white">{streak} days</p>
                  </div>
                </div>
                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <button 
                    onClick={() => handleViewSubmissions(oath.id)}
                    className="flex h-10 flex-1 items-center justify-center rounded-full bg-white/10 px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/20"
                  >
                    View Submissions
                  </button>
                  <button 
                    onClick={() => handleUploadProof(oath.id)}
                    className="flex h-10 flex-1 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-background-dark transition-opacity hover:opacity-90"
                  >
                    Upload Proof
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

export default TodaysOaths;
