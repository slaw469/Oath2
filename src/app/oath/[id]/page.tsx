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
                  <p className="text-sm text-white/60">{currentUserParticipant?.successCount || 0} completions</p>
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
                      <p className="text-sm text-white/60">{opponent.successCount || 0} completions</p>
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
          <div className="mb-6 flex gap-4">
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

