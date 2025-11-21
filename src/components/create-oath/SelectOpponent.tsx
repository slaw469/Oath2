import { useState } from "react";

interface SelectOpponentProps {
  onNext: () => void;
  onBack: () => void;
  onUpdateData: (data: any) => void;
  currentData: any;
}

// Mock friends data - this would come from your database
const mockFriends = [
  { id: "1", name: "Sarah Chen", avatar: "👩", status: "online", winRate: 78 },
  { id: "2", name: "Mike Johnson", avatar: "👨", status: "online", winRate: 65 },
  { id: "3", name: "Emily Davis", avatar: "👧", status: "offline", winRate: 82 },
  { id: "4", name: "Alex Kumar", avatar: "🧑", status: "online", winRate: 71 },
  { id: "5", name: "Jessica Lee", avatar: "👩‍🦰", status: "offline", winRate: 58 },
];

export default function SelectOpponent({ onNext, onBack, onUpdateData, currentData }: SelectOpponentProps) {
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(
    currentData.opponent?.id || null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [privacy, setPrivacy] = useState(currentData.privacy || "public");

  const filteredFriends = mockFriends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpponentSelect = (friend: any) => {
    setSelectedOpponent(friend.id);
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
        <div className="max-h-80 space-y-2 overflow-y-auto rounded-lg bg-surface p-4">
          {filteredFriends.map((friend) => (
            <button
              key={friend.id}
              onClick={() => handleOpponentSelect(friend)}
              className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                selectedOpponent === friend.id
                  ? "border-primary bg-primary/10"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{friend.avatar}</div>
                  <div>
                    <div className="font-bold text-white">{friend.name}</div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          friend.status === "online" ? "bg-green-500" : "bg-white/20"
                        }`}
                      />
                      {friend.status}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">{friend.winRate}%</div>
                  <div className="text-xs text-white/40">Win Rate</div>
                </div>
              </div>
            </button>
          ))}
        </div>
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

