'use client';

import { useState, useEffect } from "react";
import { useDbUser } from "@/hooks/useDbUser";
import { getFriends } from "@/actions/friends";
import toast from "react-hot-toast";

interface SelectOpponentProps {
  onNext: () => void;
  onBack: () => void;
  onUpdateData: (data: any) => void;
  currentData: any;
}

interface Friend {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
}

export default function SelectOpponent({ onNext, onBack, onUpdateData, currentData }: SelectOpponentProps) {
  const { dbUser, loading: dbUserLoading } = useDbUser();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOpponent, setSelectedOpponent] = useState<Friend | null>(
    currentData.opponent || null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [privacy, setPrivacy] = useState(currentData.privacy || "public");

  useEffect(() => {
    async function fetchFriends() {
      if (!dbUser) return;
      setLoading(true);
      const result = await getFriends(dbUser.id);
      if (result.success && result.data) {
        setFriends(result.data);
      } else {
        toast.error(result.error || "Failed to load friends");
      }
      setLoading(false);
    }
    if (!dbUserLoading) {
      fetchFriends();
    }
  }, [dbUser, dbUserLoading]);

  const filteredFriends = friends.filter((friend) =>
    (friend.displayName || friend.email).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpponentSelect = (friend: Friend) => {
    setSelectedOpponent(friend);
    onUpdateData({ opponent: friend });
  };

  const handleContinue = () => {
    // For solo challenges, opponent is optional
    if (currentData.type === "solo" || selectedOpponent) {
      onUpdateData({ privacy });
      onNext();
    }
  };

  const isVersusChallenge = currentData.type === "versus";
  const isValid = !isVersusChallenge || selectedOpponent;

  if (loading || dbUserLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center text-white/60">
          Loading friends...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Opponent Info */}
      {isVersusChallenge ? (
        <div className="rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 p-6">
          <div className="mb-4 text-4xl">⚔️</div>
          <h3 className="mb-2 text-xl font-bold text-white">Choose Your Opponent</h3>
          <p className="text-sm text-white/80">
            Select a friend to challenge. They'll need to accept before the oath begins.
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6">
          <div className="mb-4 text-4xl">👥</div>
          <h3 className="mb-2 text-xl font-bold text-white">Share Your Journey (Optional)</h3>
          <p className="text-sm text-white/80">
            Invite friends to follow your progress and cheer you on, or go solo!
          </p>
        </div>
      )}

      {/* Search Bar */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          {isVersusChallenge ? "Search Friends" : "Invite Friends (Optional)"}
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name..."
            className="w-full rounded-lg border-2 border-white/10 bg-surface py-3 pl-10 pr-4 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
          />
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Friends List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-white">Your Friends</label>
          <span className="text-xs text-white/40">{filteredFriends.length} available</span>
        </div>
        {filteredFriends.length === 0 ? (
          <div className="rounded-lg bg-surface p-8 text-center">
            <p className="text-white/60">
              {friends.length === 0 
                ? "No friends yet. Add some friends first!" 
                : "No friends match your search."}
            </p>
          </div>
        ) : (
          <div className="max-h-80 space-y-2 overflow-y-auto rounded-lg bg-surface p-4">
            {filteredFriends.map((friend) => (
              <button
                key={friend.id}
                onClick={() => handleOpponentSelect(friend)}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                  selectedOpponent?.id === friend.id
                    ? "border-primary bg-primary/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-lg font-bold text-primary">
                      {friend.photoURL ? (
                        <img src={friend.photoURL} alt={friend.displayName || friend.email} className="h-10 w-10 rounded-full" />
                      ) : (
                        (friend.displayName || friend.email).charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-white">{friend.displayName || friend.email}</div>
                      <div className="text-xs text-white/60">{friend.email}</div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Skip Option for Solo */}
      {!isVersusChallenge && !selectedOpponent && (
        <div className="rounded-lg border-2 border-dashed border-white/20 p-6 text-center">
          <p className="text-sm text-white/60">
            No opponent selected. This oath will be a solo challenge!
          </p>
        </div>
      )}

      {/* Privacy Settings */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">Privacy</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setPrivacy("public")}
            className={`rounded-lg border-2 p-3 text-center transition-all ${
              privacy === "public"
                ? "border-primary bg-primary/10 text-white"
                : "border-white/10 bg-surface text-white/60 hover:border-white/20"
            }`}
          >
            <div className="mb-1 text-xl">🌍</div>
            <div className="text-xs font-medium">Public</div>
          </button>
          <button
            onClick={() => setPrivacy("friends")}
            className={`rounded-lg border-2 p-3 text-center transition-all ${
              privacy === "friends"
                ? "border-primary bg-primary/10 text-white"
                : "border-white/10 bg-surface text-white/60 hover:border-white/20"
            }`}
          >
            <div className="mb-1 text-xl">👥</div>
            <div className="text-xs font-medium">Friends</div>
          </button>
          <button
            onClick={() => setPrivacy("private")}
            className={`rounded-lg border-2 p-3 text-center transition-all ${
              privacy === "private"
                ? "border-primary bg-primary/10 text-white"
                : "border-white/10 bg-surface text-white/60 hover:border-white/20"
            }`}
          >
            <div className="mb-1 text-xl">🔒</div>
            <div className="text-xs font-medium">Private</div>
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="rounded-full border-2 border-white/20 px-8 py-3 font-bold text-white transition-all hover:border-white/40"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className={`rounded-full px-8 py-3 font-bold transition-all ${
            isValid
              ? "bg-primary text-black hover:bg-primary/90"
              : "cursor-not-allowed bg-white/10 text-white/40"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

