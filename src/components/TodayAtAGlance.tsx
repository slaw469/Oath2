'use client';

import React, { useState, useEffect } from 'react';
import { useDbUser } from '@/hooks/useDbUser';
import { getUserOaths } from '@/actions/oaths';
import { formatTimeRemaining } from '@/lib/oath-utils';
import toast from 'react-hot-toast';

interface OathSummary {
  id: string;
  stakeAmount: number;
  currencyType: string;
  endDate: Date;
}

const TodayAtAGlance = () => {
  const { dbUser, loading: dbUserLoading } = useDbUser();
  const [activeOaths, setActiveOaths] = useState<OathSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOathStats() {
      if (!dbUser) return;
      setLoading(true);
      
      const result = await getUserOaths(dbUser.id, 'ACTIVE');
      if (result.success && result.data) {
        setActiveOaths(result.data);
      } else if (result.error) {
        toast.error(result.error);
      }
      setLoading(false);
    }
    
    if (!dbUserLoading) {
      fetchOathStats();
    }
  }, [dbUser, dbUserLoading]);

  // Calculate stats
  const activeOathsCount = activeOaths.length;
  
  const totalStakes = activeOaths.reduce(
    (acc, oath) => {
      if (oath.currencyType === 'GEMS') {
        acc.gems += oath.stakeAmount;
      } else {
        acc.usd += oath.stakeAmount;
      }
      return acc;
    },
    { usd: 0, gems: 0 }
  );

  // Find next deadline
  const nextDeadline = activeOaths.length > 0
    ? new Date(
        Math.min(...activeOaths.map((oath) => new Date(oath.endDate).getTime()))
      )
    : null;

  if (loading || dbUserLoading) {
    return (
      <section>
        <div className="rounded border border-surface bg-surface p-6">
          <h3 className="mb-4 text-lg font-bold leading-tight tracking-tight text-white">Today at a glance</h3>
          <p className="text-center text-sm text-white/60">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="rounded border border-surface bg-surface p-6">
        <h3 className="mb-4 text-lg font-bold leading-tight tracking-tight text-white">Today at a glance</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex min-w-[158px] flex-1 flex-col gap-1">
            <p className="text-sm font-medium leading-normal text-white/80">Active Oaths Today</p>
            <p className="text-3xl font-bold leading-tight tracking-tight text-white">{activeOathsCount}</p>
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-1">
            <p className="text-sm font-medium leading-normal text-white/80">Total at Stake</p>
            {totalStakes.usd > 0 && (
              <p className="text-3xl font-bold leading-tight tracking-tight text-white">${totalStakes.usd}</p>
            )}
            {totalStakes.gems > 0 && (
              <p className={`${totalStakes.usd > 0 ? 'text-lg' : 'text-3xl'} font-bold leading-tight tracking-tight text-primary`}>
                💎 {totalStakes.gems.toLocaleString()}
              </p>
            )}
            {totalStakes.usd === 0 && totalStakes.gems === 0 && (
              <p className="text-3xl font-bold leading-tight tracking-tight text-white/40">$0</p>
            )}
          </div>
          <div className="flex min-w-[158px] flex-1 flex-col gap-1">
            <p className="text-sm font-medium leading-normal text-white/80">Next Deadline</p>
            {nextDeadline ? (
              <p className="text-3xl font-bold leading-tight tracking-tight text-primary">
                In {formatTimeRemaining(nextDeadline)}
              </p>
            ) : (
              <p className="text-3xl font-bold leading-tight tracking-tight text-white/40">None</p>
            )}
          </div>
        </div>
        <p className="mt-4 text-xs font-normal leading-normal text-white/60">
          Auto payouts trigger at your deadline if proof is missing.
        </p>
      </div>
    </section>
  );
};

export default TodayAtAGlance;
