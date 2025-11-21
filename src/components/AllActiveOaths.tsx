'use client';

import React, { useState, useEffect } from 'react';
import { useDbUser } from '@/hooks/useDbUser';
import { getUserOaths } from '@/actions/oaths';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Oath {
  id: string;
  title: string;
  description: string;
  stakeAmount: number;
  currencyType: string;
  endDate: Date;
  status: string;
  participants: {
    user: {
      id: string;
      displayName: string | null;
      email: string;
    };
  }[];
}

const AllActiveOaths = () => {
  const { dbUser, loading: dbUserLoading } = useDbUser();
  const [oaths, setOaths] = useState<Oath[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOaths() {
      if (!dbUser) return;
      setLoading(true);
      const result = await getUserOaths(dbUser.id, 'ACTIVE');
      if (result.success && result.data) {
        setOaths(result.data);
      } else if (result.error) {
        toast.error(result.error);
      }
      setLoading(false);
    }
    if (!dbUserLoading) {
      fetchOaths();
    }
  }, [dbUser, dbUserLoading]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getOpponent = (oath: Oath) => {
    if (!dbUser) return 'Solo';
    const otherParticipants = oath.participants.filter(p => p.user.id !== dbUser.id);
    if (otherParticipants.length === 0) return 'Solo';
    return otherParticipants[0].user.displayName || otherParticipants[0].user.email;
  };

  if (loading || dbUserLoading) {
    return (
      <section>
        <div className="mb-4">
          <h3 className="text-xl font-bold leading-tight tracking-tight text-white">All Active Oaths</h3>
          <p className="text-sm text-white/60">Everything you're committed to right now.</p>
        </div>
        <div className="overflow-hidden rounded border border-surface bg-surface p-8 text-center">
          <p className="text-white/60">Loading oaths...</p>
        </div>
      </section>
    );
  }

  if (oaths.length === 0) {
    return (
      <section>
        <div className="mb-4">
          <h3 className="text-xl font-bold leading-tight tracking-tight text-white">All Active Oaths</h3>
          <p className="text-sm text-white/60">Everything you're committed to right now.</p>
        </div>
        <div className="overflow-hidden rounded border border-surface bg-surface p-8 text-center">
          <p className="text-white/60">No active oaths yet.</p>
          <Link
            href="/create-oath"
            className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-sm font-bold text-black transition-all hover:bg-primary/90"
          >
            Create Your First Oath
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4">
        <h3 className="text-xl font-bold leading-tight tracking-tight text-white">All Active Oaths</h3>
        <p className="text-sm text-white/60">Everything you're committed to right now.</p>
      </div>
      <div className="overflow-hidden rounded border border-surface bg-surface">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase text-white/60">
              <tr>
                <th className="px-4 py-3 font-medium">Oath Name</th>
                <th className="px-4 py-3 font-medium">Opponent</th>
                <th className="px-4 py-3 font-medium">Stake</th>
                <th className="px-4 py-3 font-medium">End Date</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="text-white/90">
              {oaths.map((oath) => (
                <tr key={oath.id} className="border-b border-white/10 last:border-b-0">
                  <td className="px-4 py-3 font-medium">{oath.title}</td>
                  <td className="px-4 py-3">{getOpponent(oath)}</td>
                  <td className="px-4 py-3 font-bold text-primary">
                    {oath.currencyType === 'GEMS' ? `💎 ${oath.stakeAmount.toLocaleString()}` : `$${oath.stakeAmount}`}
                  </td>
                  <td className="px-4 py-3">{formatDate(oath.endDate)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/oath/${oath.id}`}
                      className="font-medium text-primary/80 hover:text-primary"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllActiveOaths;
