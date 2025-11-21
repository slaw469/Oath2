import { useState } from "react";

interface SetDurationProps {
  onNext: () => void;
  onBack: () => void;
  onUpdateData: (data: any) => void;
  currentData: any;
}

const presetDurations = [
  { id: "1day", label: "1 Day", days: 1, icon: "⚡" },
  { id: "3days", label: "3 Days", days: 3, icon: "🔥" },
  { id: "1week", label: "1 Week", days: 7, icon: "📅" },
  { id: "2weeks", label: "2 Weeks", days: 14, icon: "💪" },
  { id: "1month", label: "1 Month", days: 30, icon: "🎯" },
  { id: "3months", label: "3 Months", days: 90, icon: "🏆" },
];

export default function SetDuration({ onNext, onBack, onUpdateData, currentData }: SetDurationProps) {
  const [selectedDuration, setSelectedDuration] = useState(currentData.duration || "");
  const [endDate, setEndDate] = useState(currentData.endDate || "");
  const [customDate, setCustomDate] = useState(false);

  const handleDurationSelect = (duration: string, days: number) => {
    setSelectedDuration(duration);
    setCustomDate(false);
    // Calculate end date
    const date = new Date();
    date.setDate(date.getDate() + days);
    setEndDate(date.toISOString().split("T")[0]);
  };

  const handleCustomDateChange = (date: string) => {
    setEndDate(date);
    setSelectedDuration("custom");
    setCustomDate(true);
  };

  const handleContinue = () => {
    if (selectedDuration && endDate) {
      onUpdateData({ duration: selectedDuration, endDate });
      onNext();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isValid = selectedDuration && endDate;
  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-8">
      {/* Duration Info */}
      <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6">
        <div className="mb-4 text-4xl">⏱️</div>
        <h3 className="mb-2 text-xl font-bold text-white">Choose Your Timeline</h3>
        <p className="text-sm text-white/80">
          How long will you commit to this oath? Choose a duration that's challenging but achievable.
        </p>
      </div>

      {/* Preset Durations */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">Quick Select</label>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {presetDurations.map((duration) => (
            <button
              key={duration.id}
              onClick={() => handleDurationSelect(duration.id, duration.days)}
              className={`group rounded-lg border-2 p-4 text-left transition-all ${
                selectedDuration === duration.id && !customDate
                  ? "border-primary bg-primary/10"
                  : "border-white/10 bg-surface hover:border-white/20"
              }`}
            >
              <div className="mb-2 text-2xl">{duration.icon}</div>
              <div className="font-bold text-white">{duration.label}</div>
              <div className="text-xs text-white/60">{duration.days} days</div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Date Picker */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">Custom End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => handleCustomDateChange(e.target.value)}
          min={minDate}
          className="w-full rounded-lg border-2 border-white/10 bg-surface px-4 py-3 text-white focus:border-primary focus:outline-none"
        />
      </div>

      {/* End Date Display */}
      {endDate && (
        <div className="rounded-lg bg-surface p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-1 text-sm text-white/60">Oath Ends On</p>
              <p className="text-lg font-bold text-white">{formatDate(endDate)}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-white/60">Duration</p>
              <p className="text-lg font-bold text-primary">
                {getDaysUntil(endDate)} days
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recommendation */}
      <div className="rounded-lg bg-surface/50 p-4 text-sm text-white/60">
        <p>
          💡 <strong className="text-white">Tip:</strong> Start with shorter durations if you're new to making oaths.
          You can always create longer ones as you build consistency!
        </p>
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

