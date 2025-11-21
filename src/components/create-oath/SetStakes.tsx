import { useState } from "react";

interface SetStakesProps {
  onNext: () => void;
  onBack: () => void;
  onUpdateData: (data: any) => void;
  currentData: any;
}

const presetAmounts = [5, 10, 25, 50, 100, 250];

export default function SetStakes({ onNext, onBack, onUpdateData, currentData }: SetStakesProps) {
  const [stake, setStake] = useState(currentData.stake || 0);
  const [customAmount, setCustomAmount] = useState("");

  const handlePresetClick = (amount: number) => {
    setStake(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setStake(numValue);
      setCustomAmount(value);
    } else if (value === "") {
      setStake(0);
      setCustomAmount("");
    }
  };

  const handleContinue = () => {
    if (stake > 0) {
      onUpdateData({ stake });
      onNext();
    }
  };

  const isValid = stake > 0;

  return (
    <div className="space-y-8">
      {/* Stakes Info Card */}
      <div className="rounded-xl bg-gradient-to-br from-primary/20 to-orange-500/20 p-6">
        <div className="mb-4 text-4xl">💰</div>
        <h3 className="mb-2 text-xl font-bold text-white">Put Your Money Where Your Mouth Is</h3>
        <p className="text-sm text-white/80">
          The stake is what you're willing to risk to prove your commitment. If you succeed, you keep it.
          If you fail, you lose it to your opponent or charity.
        </p>
      </div>

      {/* Current Stake Display */}
      <div className="text-center">
        <p className="mb-2 text-sm text-white/60">Your Stake</p>
        <div className="text-6xl font-bold text-primary">
          ${stake > 0 ? stake.toFixed(2) : "0.00"}
        </div>
      </div>

      {/* Preset Amounts */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">Quick Select</label>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handlePresetClick(amount)}
              className={`rounded-lg border-2 px-4 py-3 font-bold transition-all ${
                stake === amount && !customAmount
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-white/10 bg-surface text-white hover:border-white/20"
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Amount */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white">Custom Amount</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-white/60">$</span>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => handleCustomChange(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full rounded-lg border-2 border-white/10 bg-surface py-3 pl-10 pr-4 text-xl text-white placeholder:text-white/40 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Risk Indicator */}
      <div className="rounded-lg bg-surface/50 p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-white/60">Risk Level</span>
          <span className={`font-bold ${
            stake < 25 ? "text-green-500" : stake < 100 ? "text-yellow-500" : "text-red-500"
          }`}>
            {stake < 25 ? "Low 🟢" : stake < 100 ? "Medium 🟡" : "High 🔴"}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full transition-all ${
              stake < 25 ? "bg-green-500" : stake < 100 ? "bg-yellow-500" : "bg-red-500"
            }`}
            style={{ width: `${Math.min((stake / 250) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Warning */}
      {stake > 100 && (
        <div className="rounded-lg border-2 border-orange-500/50 bg-orange-500/10 p-4 text-sm text-orange-300">
          <strong>⚠️ High Stakes:</strong> You're risking a significant amount. Make sure you're confident in your ability to complete this oath!
        </div>
      )}

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

