interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, label: "Type" },
  { number: 2, label: "Define" },
  { number: 3, label: "Stakes" },
  { number: 4, label: "Duration" },
  { number: 5, label: "Opponent" },
  { number: 6, label: "Review" },
];

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.number} className="flex flex-1 items-center">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                currentStep >= step.number
                  ? "border-primary bg-primary text-black"
                  : "border-white/20 bg-surface text-white/40"
              }`}
            >
              <span className="text-sm font-bold">{step.number}</span>
            </div>
            <span
              className={`mt-2 text-xs ${
                currentStep >= step.number ? "text-white" : "text-white/40"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`mx-2 h-0.5 flex-1 transition-all ${
                currentStep > step.number ? "bg-primary" : "bg-white/20"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

