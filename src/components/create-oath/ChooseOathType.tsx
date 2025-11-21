import { useState } from "react";

interface ChooseOathTypeProps {
  onNext: () => void;
  onUpdateData: (data: any) => void;
  currentData: any;
}

const oathTypes = [
  {
    id: "solo",
    title: "Solo Challenge",
    description: "Take on a personal challenge and hold yourself accountable",
    icon: "💪",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: "versus",
    title: "Versus Challenge",
    description: "Challenge a friend head-to-head and see who wins",
    icon: "⚔️",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "group",
    title: "Group Challenge",
    description: "Team up or compete with multiple friends",
    icon: "👥",
    color: "from-green-500 to-teal-500",
  },
  {
    id: "community",
    title: "Community Challenge",
    description: "Join an open challenge and compete with everyone",
    icon: "🌍",
    color: "from-yellow-500 to-pink-500",
  },
];

export default function ChooseOathType({ onNext, onUpdateData, currentData }: ChooseOathTypeProps) {
  const [selectedType, setSelectedType] = useState(currentData.type || "");

  const handleSelect = (typeId: string) => {
    setSelectedType(typeId);
    onUpdateData({ type: typeId });
  };

  const handleContinue = () => {
    if (selectedType) {
      onNext();
    }
  };

  return (
    <div className="space-y-8">
      {/* Oath Type Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {oathTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`group relative overflow-hidden rounded-xl border-2 p-6 text-left transition-all ${
              selectedType === type.id
                ? "border-primary bg-primary/10 scale-[1.02]"
                : "border-white/10 bg-surface hover:border-white/20"
            }`}
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 transition-opacity group-hover:opacity-10 ${
                selectedType === type.id ? "opacity-5" : ""
              }`}
            />

            <div className="relative">
              <div className="mb-4 text-4xl">{type.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-white">{type.title}</h3>
              <p className="text-sm text-white/60">{type.description}</p>

              {/* Selection Indicator */}
              {selectedType === type.id && (
                <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Help Text */}
      <div className="rounded-lg bg-surface/50 p-4 text-sm text-white/60">
        <p>
          💡 <strong className="text-white">Tip:</strong> Solo challenges are great for building personal habits,
          while versus challenges add competitive motivation!
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4">
        <button
          onClick={handleContinue}
          disabled={!selectedType}
          className={`rounded-full px-8 py-3 font-bold transition-all ${
            selectedType
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

