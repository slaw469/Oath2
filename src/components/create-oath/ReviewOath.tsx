'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDbUser } from '@/hooks/useDbUser';
import { createSoloOath, createOath } from '@/actions/oaths';
import toast from 'react-hot-toast';

interface ReviewOathProps {
  onBack: () => void;
  oathData: any;
}

const getCategoryLabel = (category: string) => {
  const categories: Record<string, string> = {
    fitness: "💪 Fitness",
    productivity: "⚡ Productivity",
    learning: "📚 Learning",
    health: "🍎 Health",
    creativity: "🎨 Creativity",
    social: "👥 Social",
    mindfulness: "🧘 Mindfulness",
    other: "✨ Other",
  };
  return categories[category] || category;
};

const getTypeLabel = (type: string) => {
  const types: Record<string, string> = {
    solo: "Solo Challenge",
    versus: "Versus Challenge",
    group: "Group Challenge",
    community: "Community Challenge",
  };
  return types[type] || type;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getDaysUntil = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function ReviewOath({ onBack, oathData }: ReviewOathProps) {
  const router = useRouter();
  const { dbUser } = useDbUser();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateOath = async () => {
    if (!dbUser) {
      toast.error('You must be logged in to create an oath');
      return;
    }

    setIsCreating(true);

    try {
      let result;

      if (oathData.type === 'solo') {
        // Create solo oath
        result = await createSoloOath(dbUser.id, {
          title: oathData.title,
          description: oathData.description,
          category: oathData.category,
          type: oathData.oathType || 'CUSTOM', // Use selected oath type
          startDate: new Date(),
          endDate: new Date(oathData.endDate),
          stakeAmount: oathData.stake,
          currencyType: oathData.currencyType || 'GEMS',
          privacy: oathData.privacy || 'public',
        });
      } else if (oathData.type === 'versus') {
        // Create versus oath
        if (!oathData.opponent) {
          toast.error('Please select an opponent');
          setIsCreating(false);
          return;
        }

        const verificationPrompt = oathData.isLeetCodeDaily
          ? `Verify that the user completed their daily LeetCode problem for: ${oathData.title}. ${oathData.description}`
          : `Verify that the user completed their commitment for: ${oathData.title}. ${oathData.description}`;

        result = await createOath(dbUser.id, {
          title: oathData.title,
          description: oathData.description,
          type: oathData.isLeetCodeDaily ? 'DAILY' : (oathData.oathType || 'CUSTOM'), // Daily for LeetCode
          startDate: new Date(),
          endDate: new Date(oathData.endDate),
          stakeAmount: oathData.stake,
          currencyType: oathData.currencyType || 'GEMS',
          verificationPrompt,
          participantUserIds: [dbUser.id, oathData.opponent.id],
          isLeetCodeDaily: !!oathData.isLeetCodeDaily,
          leetcodeUsername: oathData.leetcodeUsername,
        });
      } else {
        toast.error('Only solo and versus oaths are supported right now');
        setIsCreating(false);
        return;
      }

      if (result.success) {
        if (oathData.type === 'versus') {
          toast.success('⚔️ Challenge sent! Waiting for opponent to accept.');
        } else {
          toast.success('🎯 Oath created successfully!');
        }
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        toast.error(result.error || 'Failed to create oath');
        setIsCreating(false);
      }
    } catch (error) {
      console.error('Error creating oath:', error);
      toast.error('An unexpected error occurred');
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Success Preview */}
      <div className="rounded-xl bg-gradient-to-br from-primary/20 to-green-500/20 p-6 text-center">
        <div className="mb-4 text-6xl">🎯</div>
        <h3 className="mb-2 text-2xl font-bold text-white">Review Your Oath</h3>
        <p className="text-sm text-white/80">
          Take a moment to review everything. Once you create this oath, the stakes are real!
        </p>
      </div>

      {/* Oath Summary Card */}
      <div className="rounded-xl border-2 border-primary/30 bg-surface p-6">
        {/* Title & Category */}
        <div className="mb-6">
          <div className="mb-2 text-sm text-primary">{getCategoryLabel(oathData.category)}</div>
          <h2 className="mb-2 text-2xl font-bold text-white">{oathData.title}</h2>
          <p className="text-white/70">{oathData.description}</p>
        </div>

        {/* Key Details Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Type */}
          <div className="rounded-lg bg-background-dark p-4">
            <div className="mb-1 text-xs text-white/60">Challenge Type</div>
            <div className="font-bold text-white">{getTypeLabel(oathData.type)}</div>
          </div>

          {/* Stakes */}
          <div className="rounded-lg bg-background-dark p-4">
            <div className="mb-1 text-xs text-white/60">Stakes</div>
            <div className="font-bold text-primary">
              {oathData.currencyType === 'GEMS' ? `💎 ${oathData.stake.toLocaleString()}` : `$${oathData.stake.toFixed(2)}`}
            </div>
          </div>

          {/* Duration */}
          <div className="rounded-lg bg-background-dark p-4">
            <div className="mb-1 text-xs text-white/60">Duration</div>
            <div className="font-bold text-white">{getDaysUntil(oathData.endDate)} Days</div>
          </div>

          {/* End Date */}
          <div className="rounded-lg bg-background-dark p-4">
            <div className="mb-1 text-xs text-white/60">Ends On</div>
            <div className="font-bold text-white">{formatDate(oathData.endDate)}</div>
          </div>

          {/* Opponent */}
          {oathData.opponent && (
            <div className="rounded-lg bg-background-dark p-4 md:col-span-2">
              <div className="mb-1 text-xs text-white/60">Opponent</div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">
                  {oathData.opponent.photoURL ? (
                    <img src={oathData.opponent.photoURL} alt={oathData.opponent.displayName || oathData.opponent.email} className="h-10 w-10 rounded-full" />
                  ) : (
                    (oathData.opponent.displayName || oathData.opponent.email).charAt(0).toUpperCase()
                  )}
                </div>
                <span className="font-bold text-white">{oathData.opponent.displayName || oathData.opponent.email}</span>
              </div>
            </div>
          )}

          {/* Privacy */}
          <div className="rounded-lg bg-background-dark p-4 md:col-span-2">
            <div className="mb-1 text-xs text-white/60">Privacy</div>
            <div className="flex items-center gap-2 font-bold text-white">
              {oathData.privacy === "public" && "🌍 Public"}
              {oathData.privacy === "friends" && "👥 Friends Only"}
              {oathData.privacy === "private" && "🔒 Private"}
            </div>
          </div>
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="rounded-lg border-2 border-orange-500/50 bg-orange-500/10 p-6">
        <h4 className="mb-3 font-bold text-orange-300">⚠️ Important Terms</h4>
        <ul className="space-y-2 text-sm text-orange-200/80">
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>You commit to {oathData.currencyType === 'GEMS' ? `💎 ${oathData.stake.toLocaleString()}` : `$${oathData.stake.toFixed(2)}`} for this oath.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>If you succeed, you keep your stake. If you fail, you lose it.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>You can submit progress updates anytime before the deadline.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Your opponent (if any) must accept the challenge within 24 hours.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>Once started, oaths cannot be cancelled without penalty.</span>
          </li>
        </ul>
      </div>

      {/* What Happens Next */}
      <div className="rounded-lg bg-surface/50 p-6">
        <h4 className="mb-3 font-bold text-white">📋 What Happens Next?</h4>
        <ol className="space-y-2 text-sm text-white/70">
          <li className="flex items-start gap-2">
            <span className="font-bold text-primary">1.</span>
            <span>Your oath will be created and visible based on your privacy settings</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-primary">2.</span>
            <span>
              {oathData.opponent
                ? "Your opponent will receive a notification to accept or decline"
                : "You can start working on your goal immediately"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-primary">3.</span>
            <span>Track your progress and submit updates through the dashboard</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-primary">4.</span>
            <span>On the end date, results will be evaluated and stakes will be settled</span>
          </li>
        </ol>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onBack}
          className="rounded-full border-2 border-white/20 px-8 py-3 font-bold text-white transition-all hover:border-white/40"
        >
          Back
        </button>
        <button
          onClick={handleCreateOath}
          disabled={isCreating}
          className="flex-1 rounded-full bg-primary px-8 py-4 text-lg font-bold text-black transition-all hover:bg-primary/90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? 'Creating...' : 'Create Oath 🎯'}
        </button>
      </div>
    </div>
  );
}

