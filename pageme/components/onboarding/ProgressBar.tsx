"use client";

import { Check } from "lucide-react";

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const STEP_LABELS = [
    "基本情報",
    "スキル",
    "働き方",
    "燃料",
    "連携",
    "コマンド",
];

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    return (
        <div className="w-full">
            {/* Step indicators */}
            <div className="flex items-center justify-between mb-4">
                {Array.from({ length: totalSteps }, (_, i) => {
                    const stepNum = i + 1;
                    const isCompleted = stepNum < currentStep;
                    const isCurrent = stepNum === currentStep;

                    return (
                        <div key={stepNum} className="flex flex-col items-center z-10">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${isCompleted
                                    ? "bg-[#0A0A0A] border-[#0A0A0A] text-white"
                                    : isCurrent
                                        ? "bg-[#E63946] border-[#E63946] text-white scale-110"
                                        : "bg-white border-[#0A0A0A] text-[#0A0A0A]"
                                    }`}
                            >
                                {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                            </div>
                            <span
                                className={`text-xs mt-2 hidden sm:block font-bold ${isCurrent ? "text-[#E63946]" : "text-[#666]"
                                    }`}
                            >
                                {STEP_LABELS[i]}
                            </span>
                        </div>
                    );
                })}

                {/* Connecting Line (Background) */}
                <div className="absolute left-0 right-0 top-4 h-0.5 bg-[#E0E0E0] -z-0 hidden sm:block" />
            </div>

            {/* Progress bar (Mobile) */}
            <div className="h-2 bg-[#F0F0F0] border border-[#0A0A0A] rounded-full overflow-hidden sm:hidden">
                <div
                    className="h-full bg-[#0A0A0A] transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                />
            </div>

            {/* Current step label (mobile) */}
            <p className="text-center text-sm font-bold text-[#0A0A0A] mt-2 sm:hidden">
                Step {currentStep}/{totalSteps}: {STEP_LABELS[currentStep - 1]}
            </p>
        </div>
    );
}
