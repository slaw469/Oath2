'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useDbUser } from '@/hooks/useDbUser';
import { getOathById } from '@/actions/oaths';
import { getOathCheckIns } from '@/actions/checkins';
import { getDeadlineStatus, formatTimeRemaining, formatCurrency } from '@/lib/oath-utils';
import UploadProofModal from '@/components/UploadProofModal';
import ViewSubmissionsModal from '@/components/ViewSubmissionsModal';
import toast from 'react-hot-toast';

export default function OathDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { dbUser, loading: dbUserLoading } = useDbUser();
  
  const oathId = params.id as string;
  const action = searchParams.get('action');
  const tab = searchParams.get('tab');

  const [oath, setOath] = useState<any>(null);
  const [checkIns, setCheckIns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(action === 'upload');
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(tab === 'submissions');
  const [checkingLeetCode, setCheckingLeetCode] = useState(false);

  useEffect(() => {
    async function fetchOathDetails() {
      if (!dbUser || !oathId) return;
      
      setLoading(true);
      const oathResult = await getOathById(oathId);
      if (oathResult.success && oathResult.data) {
        setOath(oathResult.data);
      } else {
        toast.error(oathResult.error || 'Failed to load oath');
        router.push('/dashboard');
        return;
      }

      const checkInsResult = await getOathCheckIns(oathId);
      if (checkInsResult.success && checkInsResult.data) {
        setCheckIns(checkInsResult.data);
      }

      setLoading(false);
    }

    if (!dbUserLoading) {
      fetchOathDetails();
    }
  }, [dbUser, dbUserLoading, oathId, router]);

  useEffect(() => {
    setShowUploadModal(action === 'upload');
  }, [action]);

  useEffect(() => {
    setShowSubmissionsModal(tab === 'submissions');
  }, [tab]);

  const handleUploadSuccess = () => {
    // Refresh oath details
    if (dbUser && oathId) {
      getOathCheckIns(oathId).then((result) => {
        if (result.success && result.data) {
          setCheckIns(result.data);
        }
      });
    }
    setShowUploadModal(false);
    router.push(`/oath/${oathId}`);
  };

  const handleCheckLeetCode = async () => {
    if (!oathId) return;
    setCheckingLeetCode(true);
    try {
      const res = await fetch(`/api/oath/${oathId}/check-leetcode`, {
        method: 'POST',
      });
      if (!res.ok) {
        const text = await res.text();
        console.error('LeetCode check failed:', res.status, res.statusText, text);
        toast.error('Failed to check LeetCode progress. Please try again.');
      } else {
        // Refresh oath + check-ins so UI reflects any completions we may have recorded
        const [oathResult, checkInsResult] = await Promise.all([
          getOathById(oathId),
          getOathCheckIns(oathId),
        ]);
        if (oathResult.success && oathResult.data) {
          setOath(oathResult.data);
        }
        if (checkInsResult.success && checkInsResult.data) {
          setCheckIns(checkInsResult.data);
        }

        // Recompute based on latest checkIns
        const completeStatusesLocal = new Set(['VERIFIED_COMPLETE', 'RESOLVED_COMPLETE']);
        const todayLocal = new Date();
        todayLocal.setHours(0, 0, 0, 0);
        const isSameDayLocal = (d: Date) => {
          const dd = new Date(d);
          dd.setHours(0, 0, 0, 0);
          return dd.getTime() === todayLocal.getTime();
        };

        const anyTodayCompletion =
          checkInsResult.success &&
          Array.isArray(checkInsResult.data) &&
          checkInsResult.data.some(
            (c: any) =>
              completeStatusesLocal.has(c.status) && isSameDayLocal(new Date(c.dueDate)),
          );

        if (anyTodayCompletion) {
          toast.success('LeetCode completions have been recorded for this oath.');
        } else {
          toast('No LeetCode completion recorded for today yet for this oath.');
        }
      }
    } catch (err) {
      console.error('Error calling LeetCode check endpoint:', err);
      toast.error('Unexpected error while checking LeetCode.');
    } finally {
      setCheckingLeetCode(false);
    }
  };

  if (loading || dbUserLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-background-dark">
        <main className="flex-1 px-4 py-8 sm:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded border border-surface bg-surface p-8 text-center">
              <p className="text-white/60">Loading oath details...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!oath) {
    return null;
  }

  const opponent = oath.participants.find((p: any) => p.userId !== dbUser?.id);
  const currentUserParticipant = oath.participants.find((p: any) => p.userId === dbUser?.id);
  const deadline = new Date(oath.endDate);
  const status = getDeadlineStatus(deadline);

  // Derived completion state from check-ins (for visual feedback)
  const completeStatuses = new Set(['VERIFIED_COMPLETE', 'RESOLVED_COMPLETE']);

  // Compare days in UTC so we're consistent with how we store dueDate for LeetCode
  const getUtcDayKey = (date: Date) => {
    const d = new Date(date);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  };

  const todayUtcKey = getUtcDayKey(new Date());

  const isSameUtcDay = (d: Date) => getUtcDayKey(d) === todayUtcKey;

  const currentUserHasTodayCompletion = checkIns.some(
    (c: any) =>
      c.userId === dbUser?.id &&
      completeStatuses.has(c.status) &&
      isSameUtcDay(new Date(c.dueDate)),
  );

  const opponentHasTodayCompletion =
    opponent &&
    checkIns.some(
      (c: any) =>
        c.userId === opponent.userId &&
        completeStatuses.has(c.status) &&
        isSameUtcDay(new Date(c.dueDate)),
    );

  return (
    <div className="flex min-h-screen w-full flex-col bg-background-dark">
      <main className="flex-1 px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => router.push('/dashboard')}
            className="mb-6 flex items-center gap-2 text-white/60 transition-colors hover:text-white"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Dashboard
          </button>

          {/* Oath Header */}
          <div className="mb-6 rounded border border-surface bg-surface p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-white">{oath.title}</h1>
                <p className="text-white/60">{oath.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/60">Total Pot</p>
                <p className="text-4xl font-bold text-primary">
                  {formatCurrency(oath.stakeAmount * oath.participants.length, oath.currencyType)}
                </p>
              </div>
            </div>

            {/* Participants */}
            <div className="mb-4 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div
                  className="size-12 rounded-full bg-cover bg-center bg-primary/20 flex items-center justify-center text-lg font-bold text-primary"
                  style={dbUser?.photoURL ? { backgroundImage: `url('${dbUser.photoURL}')` } : {}}
                >
                  {!dbUser?.photoURL && (dbUser?.displayName?.[0] || dbUser?.email?.[0] || 'U')}
                </div>
                <div>
                  <p className="font-medium text-white">You</p>
                  <p className="text-sm text-white/60">
                    {currentUserParticipant?.successCount || 0} completions total
                  </p>
                  <p className="text-xs">
                    {currentUserHasTodayCompletion ? (
                      <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[11px] font-semibold text-green-300">
                        Today: Complete via LeetCode
                      </span>
                    ) : (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/60">
                        Today: Not yet completed
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {opponent && (
                <>
                  <span className="text-white/40">vs</span>
                  <div className="flex items-center gap-3">
                    <div
                      className="size-12 rounded-full bg-cover bg-center bg-primary/20 flex items-center justify-center text-lg font-bold text-primary"
                      style={opponent.user.photoURL ? { backgroundImage: `url('${opponent.user.photoURL}')` } : {}}
                    >
                      {!opponent.user.photoURL && (opponent.user.displayName?.[0] || opponent.user.email[0])}
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {opponent.user.displayName || opponent.user.email.split('@')[0]}
                      </p>
                      <p className="text-sm text-white/60">
                        {opponent.successCount || 0} completions total
                      </p>
                      <p className="text-xs">
                        {opponentHasTodayCompletion ? (
                          <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[11px] font-semibold text-green-300">
                            Today: Complete via LeetCode
                          </span>
                        ) : (
                          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/60">
                            Today: Not yet completed
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Status & Deadline */}
            <div className="flex items-center gap-4">
              <div className={`rounded-full ${status.bgColor} px-4 py-2 text-sm font-medium ${status.color}`}>
                {status.label}
              </div>
              <div className="text-white/60">
                <span className="font-medium">Deadline:</span> {deadline.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
              </div>
              <div className={status.color}>
                <span className="font-medium">{formatTimeRemaining(deadline)} remaining</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-background-dark transition-opacity hover:opacity-90"
            >
              <span className="material-symbols-outlined">upload</span>
              Upload Proof
            </button>
            <button
              onClick={() => setShowSubmissionsModal(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 font-medium text-white transition-colors hover:bg-white/20"
            >
              <span className="material-symbols-outlined">history</span>
              View Submissions
            </button>
            {oath.type === 'DAILY' && (
              <button
                onClick={handleCheckLeetCode}
                disabled={checkingLeetCode}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-500/20 px-6 py-3 text-sm font-semibold text-blue-300 transition-colors hover:bg-blue-500/30 disabled:opacity-60"
              >
                <span className="material-symbols-outlined">autorenew</span>
                {checkingLeetCode ? 'Checking LeetCode…' : 'Check LeetCode now'}
              </button>
            )}
          </div>

          {/* Verification Info */}
          <div className="rounded border border-surface bg-surface p-6">
            <h2 className="mb-3 text-xl font-bold text-white">AI Verification Instructions</h2>
            <p className="text-white/80">{oath.verificationPrompt}</p>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showUploadModal && (
        <UploadProofModal
          oath={oath}
          onClose={() => {
            setShowUploadModal(false);
            router.push(`/oath/${oathId}`);
          }}
          onSuccess={handleUploadSuccess}
        />
      )}

      {showSubmissionsModal && (
        <ViewSubmissionsModal
          oath={oath}
          checkIns={checkIns}
          onClose={() => {
            setShowSubmissionsModal(false);
            router.push(`/oath/${oathId}`);
          }}
        />
      )}
    </div>
  );
}

