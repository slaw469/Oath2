import { useState } from "react";

interface DefineOathProps {
  onNext: () => void;
  onBack: () => void;
  onUpdateData: (data: any) => void;
  currentData: any;
}

const categories = [
  { id: "fitness", label: "💪 Fitness", color: "bg-red-500" },
  { id: "productivity", label: "⚡ Productivity", color: "bg-blue-500" },
  { id: "learning", label: "📚 Learning", color: "bg-purple-500" },
  { id: "health", label: "🍎 Health", color: "bg-green-500" },
  { id: "creativity", label: "🎨 Creativity", color: "bg-pink-500" },
  { id: "social", label: "👥 Social", color: "bg-orange-500" },
  { id: "mindfulness", label: "🧘 Mindfulness", color: "bg-teal-500" },
  { id: "other", label: "✨ Other", color: "bg-yellow-500" },
];

const suggestedOaths = [
  "Exercise for 30 minutes every day",
  "Read for 1 hour daily",
  "Meditate for 10 minutes each morning",
  "Complete a coding challenge daily",
  "Write 500 words every day",
  "No social media for a week",
];

export default function DefineOath({ onNext, onBack, onUpdateData, currentData }: DefineOathProps) {
  const [title, setTitle] = useState(currentData.title || "");
  const [description, setDescription] = useState(currentData.description || "");
  const [category, setCategory] = useState(currentData.category || "");
   const [isLeetCodeDaily, setIsLeetCodeDaily] = useState<boolean>(currentData.isLeetCodeDaily || false);
   const [leetcodeUsername, setLeetcodeUsername] = useState<string>(currentData.leetcodeUsername || "");

  const handleContinue = () => {
    if (title && description && category) {
      onUpdateData({
        title,
        description,
        category,
        isLeetCodeDaily,
        leetcodeUsername: leetcodeUsername.trim() || undefined,
      });
      onNext();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTitle(suggestion);
  };

  const isValid = title.trim() && description.trim() && category;

  return (
    <div className="space-y-8">
      {/* Title Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Oath Title <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What are you committing to?"
          className="w-full rounded-lg border-2 border-white/10 bg-surface px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
          maxLength={100}
        />
        <p className="text-xs text-white/40">{title.length}/100 characters</p>
      </div>

      {/* Suggested Oaths */}
      <div className="space-y-2">
        <p className="text-sm text-white/60">Popular oath ideas:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedOaths.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="rounded-full border border-white/20 bg-surface px-4 py-2 text-xs text-white/80 transition-all hover:border-primary hover:bg-primary/10"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Description Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Description <span className="text-danger">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about your oath, success criteria, and any rules..."
          rows={5}
          className="w-full rounded-lg border-2 border-white/10 bg-surface px-4 py-3 text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
          maxLength={500}
        />
        <p className="text-xs text-white/40">{description.length}/500 characters</p>
      </div>

      {/* Category Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">
          Category <span className="text-danger">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all ${
                category === cat.id
                  ? "border-primary bg-primary/10 text-white"
                  : "border-white/10 bg-surface text-white/60 hover:border-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Daily LeetCode Toggle (for versus-style coding challenges) */}
      <div className="space-y-3 rounded-lg bg-surface/60 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">Make this a Daily LeetCode challenge</p>
            <p className="text-xs text-white/60">
              One accepted LeetCode problem per day. Progress is auto-verified via the LeetCode API.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsLeetCodeDaily(!isLeetCodeDaily)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isLeetCodeDaily ? "bg-primary" : "bg-white/20"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-black transition-transform ${
                isLeetCodeDaily ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {isLeetCodeDaily && (
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-medium text-white">
              Your LeetCode username <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={leetcodeUsername}
              onChange={(e) => setLeetcodeUsername(e.target.value)}
              placeholder="e.g. miguel_leetcode"
              className="w-full rounded-lg border-2 border-white/10 bg-background-dark px-4 py-2 text-sm text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
            />
            <p className="text-[11px] text-white/50">
              We use this to verify your daily completion automatically. Your opponent will need to set theirs too.
            </p>
          </div>
        )}
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

