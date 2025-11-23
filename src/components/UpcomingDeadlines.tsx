'use client';

import React, { useState, useEffect } from 'react';
import { useDbUser } from '@/hooks/useDbUser';
import { getUserOaths } from '@/actions/oaths';
import { getDeadlineColorByType, formatTimeRemaining, formatCurrency } from '@/lib/oath-utils';
import toast from 'react-hot-toast';

interface OathWithDetails {
  id: string;
  title: string;
  stakeAmount: number;
  currencyType: string;
  type: string;
  startDate: Date;
  endDate: Date;
  participants: {
    user: {
      id: string;
      displayName: string | null;
      email: string;
    };
  }[];
}

const UpcomingDeadlines = () => {
  const { dbUser, loading: dbUserLoading } = useDbUser();
  const [deadlines, setDeadlines] = useState<OathWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUpcomingDeadlines() {
      if (!dbUser) return;
      setLoading(true);
      
      const result = await getUserOaths(dbUser.id, 'ACTIVE');
      if (result.success && result.data) {
        // Sort by end date (soonest first) and take top 5
        const upcoming = [...result.data]
          .sort((a: any, b: any) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
          .slice(0, 5);

        setDeadlines(upcoming);
      } else if (result.error) {
        toast.error(result.error);
      }
      setLoading(false);
    }
    
    if (!dbUserLoading) {
      fetchUpcomingDeadlines();
    }
  }, [dbUser, dbUserLoading]);

  const getOpponent = (oath: OathWithDetails) => {
    if (!dbUser) return null;
    return oath.participants.find(p => p.user.id !== dbUser.id);
  };

  const getStatusColor = (status: 'safe' | 'moderate' | 'at-risk', bgColor: string) => {
    switch (status) {
      case 'at-risk':
        return {
          dot: bgColor,
          badge: 'bg-danger/20 text-danger',
        };
      case 'moderate':
        return {
          dot: bgColor,
          badge: 'bg-warning/20 text-warning',
        };
      case 'safe':
        return {
          dot: bgColor,
          badge: 'bg-success/20 text-success',
        };
      default:
        return {
          dot: 'bg-white/20',
          badge: 'bg-white/10 text-white/80',
        };
    }
  };

  if (loading || dbUserLoading) {
    return (
      <section>
        <div className="rounded border border-surface bg-surface p-6">
          <h3 className="mb-4 text-lg font-bold leading-tight tracking-tight text-white">Upcoming deadlines</h3>
          <p className="text-center text-sm text-white/60">Loading...</p>
        </div>
      </section>
    );
  }

  if (deadlines.length === 0) {
    return (
      <section>
        <div className="rounded border border-surface bg-surface p-6">
          <h3 className="mb-4 text-lg font-bold leading-tight tracking-tight text-white">Upcoming deadlines</h3>
          <p className="text-center text-sm text-white/60">No upcoming deadlines</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="rounded border border-surface bg-surface p-6">
        <h3 className="mb-4 text-lg font-bold leading-tight tracking-tight text-white">Upcoming deadlines</h3>
        <div className="relative flex flex-col gap-6 pl-5">
          {/* Timeline line */}
          <div className="absolute bottom-4 left-1.5 top-4 w-0.5 bg-white/10"></div>
          
          {deadlines.map((oath, index) => {
            const opponent = getOpponent(oath);
            const deadline = new Date(oath.endDate);
            const startDate = new Date(oath.startDate);
            const colorStatus = getDeadlineColorByType(deadline, oath.type as any, startDate);
            const colors = getStatusColor(colorStatus.status, colorStatus.bgColor);

            return (
              <div key={oath.id} className="relative flex items-start gap-4">
                <div className={`absolute -left-3.5 top-1.5 z-10 flex size-3 items-center justify-center rounded-full ${colors.dot} ring-4 ring-surface`}></div>
                <div>
                  <p className="font-bold text-white">{oath.title}</p>
                  <p className="text-sm text-white/60">
                    {opponent ? (
                      <>
                        vs {opponent.user.displayName || opponent.user.email.split('@')[0]} -{' '}
                        <span className="font-semibold text-primary">
                          {formatCurrency(oath.stakeAmount * oath.participants.length, oath.currencyType as any)}
                        </span>
                      </>
                    ) : (
                      <>
                        Solo -{' '}
                        <span className="font-semibold text-primary">
                          {formatCurrency(oath.stakeAmount, oath.currencyType as any)}
                        </span>
                      </>
                    )}
                  </p>
                </div>
                <div className={`ml-auto whitespace-nowrap rounded-full ${colors.badge} px-2 py-0.5 text-xs font-medium`}>
                  {formatTimeRemaining(deadline)} left
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpcomingDeadlines;
