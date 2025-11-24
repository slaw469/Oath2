"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import StepIndicator from "@/components/create-oath/StepIndicator";
import ChooseOathType from "@/components/create-oath/ChooseOathType";
import DefineOath from "@/components/create-oath/DefineOath";
import SetStakes from "@/components/create-oath/SetStakes";
import SetDuration from "@/components/create-oath/SetDuration";
import SelectOpponent from "@/components/create-oath/SelectOpponent";
import ReviewOath from "@/components/create-oath/ReviewOath";

export default function CreateOathPage() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [oathData, setOathData] = useState({
    type: "",
    title: "",
    description: "",
    category: "",
    stake: 0,
    duration: "",
    endDate: "",
    opponent: null,
    privacy: "public",
  });

  // If navigated from the Friends "Challenge" button, preselect Versus and opponent
  useEffect(() => {
    const opponentParam = searchParams.get("opponent");
    if (!opponentParam) return;

    try {
      const opponent = JSON.parse(decodeURIComponent(opponentParam));
      setOathData((prev) => ({
        ...prev,
        type: "versus",
        opponent,
      }));
      // Skip the type selection step when coming from a friend challenge
      setCurrentStep(2);
    } catch (err) {
      console.error("Failed to parse opponent from query params:", err);
    }
  }, [searchParams]);

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUpdateData = (data: any) => {
    setOathData({ ...oathData, ...data });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ChooseOathType onNext={handleNext} onUpdateData={handleUpdateData} currentData={oathData} />;
      case 2:
        return <DefineOath onNext={handleNext} onBack={handleBack} onUpdateData={handleUpdateData} currentData={oathData} />;
      case 3:
        return <SetStakes onNext={handleNext} onBack={handleBack} onUpdateData={handleUpdateData} currentData={oathData} />;
      case 4:
        return <SetDuration onNext={handleNext} onBack={handleBack} onUpdateData={handleUpdateData} currentData={oathData} />;
      case 5:
        return <SelectOpponent onNext={handleNext} onBack={handleBack} onUpdateData={handleUpdateData} currentData={oathData} />;
      case 6:
        return <ReviewOath onBack={handleBack} oathData={oathData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background-dark">
      <main className="flex-1 px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white">Create New Oath</h1>
            <p className="mt-2 text-white/60">Set your commitment, stake your claim</p>
          </div>

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          {/* Step Content */}
          <div className="mt-8">
            {renderStep()}
          </div>
        </div>
      </main>
    </div>
  );
}

