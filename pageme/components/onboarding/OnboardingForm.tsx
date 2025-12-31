"use client";

import { useState } from "react";
import { UserManual, initialUserManual } from "@/lib/types/onboarding";
import { ProgressBar } from "./ProgressBar";
import { Step1BasicInfo } from "./steps/Step1BasicInfo";
import { Step2Skills } from "./steps/Step2Skills";
import { Step3WorkStyle } from "./steps/Step3WorkStyle";
import { Step4InfiniteFuel } from "./steps/Step4InfiniteFuel";
import { Step5Communication } from "./steps/Step5Communication";
import { Step6ActivationCommand } from "./steps/Step6ActivationCommand";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { BrushSpiral, BrushWave } from "@/components/brush/BrushElements"; // Added brush imports

const TOTAL_STEPS = 6;

interface OnboardingFormProps {
    onComplete?: (data: UserManual) => void;
}

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<UserManual>(initialUserManual);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateFormData = (updates: Partial<UserManual>) => {
        setFormData((prev) => ({ ...prev, ...updates }));
    };

    const nextStep = () => {
        if (currentStep < TOTAL_STEPS) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Transform form data into the format expected by demo page
            const profileData = {
                basic_info: {
                    name: formData.name,
                    affiliation_type: formData.affiliationType,
                    industry: formData.industry,
                    affiliation_name: formData.affiliationName,
                    role: formData.role,
                },
                skills: formData.skills,
                work_style: {
                    time_preference: formData.workStyle.timePreference,
                    communication_preference: formData.workStyle.communicationPreference,
                    decision_style: formData.workStyle.decisionStyle,
                    feedback_preference: formData.workStyle.feedbackPreference,
                },
                infinite_fuel: formData.infiniteFuel,
                energy_drain: formData.energyDrain,
                communication: {
                    preferred_tools: formData.communication.preferredTools,
                    custom_tool: formData.communication.customTool,
                    best_time_to_reach: formData.communication.bestTimeToReach,
                    stress_signs: formData.communication.stressSigns,
                },
                activation_command: formData.activationCommand,
            };


            // Save to localStorage for demo page
            localStorage.setItem('profileData', JSON.stringify(profileData));
            // DATA RESET: Clear previous AI analysis and avatar to force regeneration for new/edited profile
            localStorage.removeItem('aiInsights');
            localStorage.removeItem('aiAvatarUrl');

            // Also save to API (Supabase) if configured
            const response = await fetch("/api/save-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                onComplete?.(formData);
                router.push("/demo");
            } else {
                // Even if API fails, still redirect since we have localStorage
                console.error("Failed to save to API, but localStorage is saved");
                router.push("/demo");
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            // Still try to redirect with localStorage data
            router.push("/demo");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1BasicInfo data={formData} onUpdate={updateFormData} />;
            case 2:
                return <Step2Skills data={formData} onUpdate={updateFormData} />;
            case 3:
                return <Step3WorkStyle data={formData} onUpdate={updateFormData} />;
            case 4:
                return <Step4InfiniteFuel data={formData} onUpdate={updateFormData} />;
            case 5:
                return <Step5Communication data={formData} onUpdate={updateFormData} />;
            case 6:
                return <Step6ActivationCommand data={formData} onUpdate={updateFormData} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] relative flex flex-col font-sans selection:bg-[#E63946] selection:text-white">
            {/* Texture Background */}
            <div
                className="fixed inset-0 pointer-events-none opacity-40 z-0 mix-blend-multiply"
                style={{ backgroundImage: 'url(/texture.png)', backgroundSize: 'cover' }}
            />

            {/* Header with Progress */}
            <div className="sticky top-0 bg-[#FAFAFA]/90 backdrop-blur-sm border-b-2 border-[#0A0A0A] p-4 z-20">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-center mb-4">
                        <div className="flex items-center gap-2">
                            <BrushSpiral className="w-6 h-6 text-[#0A0A0A]" />
                            <span className="font-bold text-lg tracking-tight">自分図鑑</span>
                        </div>
                    </div>
                    <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 p-6 overflow-y-auto relative z-10">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-none shadow-[8px_8px_0px_0px_rgba(10,10,10,1)] border-2 border-[#0A0A0A] p-6 md:p-12 relative">
                        {/* Decorative corner accent? or keep clean */}
                        {renderStep()}
                    </div>
                </div>
            </div>

            {/* Navigation Footer */}
            <div className="sticky bottom-0 bg-[#FAFAFA]/90 backdrop-blur-sm border-t-2 border-[#0A0A0A] p-4 z-20">
                <div className="max-w-2xl mx-auto flex justify-between items-center">
                    <Button
                        variant="ghost"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="gap-2 text-[#666] hover:text-[#0A0A0A] hover:bg-transparent -ml-4"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        戻る
                    </Button>

                    {currentStep < TOTAL_STEPS ? (
                        <Button
                            onClick={nextStep}
                            className="gap-2 bg-[#0A0A0A] text-white hover:bg-[#333] border-2 border-[#0A0A0A] rounded-none px-8 py-6 font-bold transition-all shadow-[4px_4px_0px_0px_rgba(200,200,200,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                        >
                            次へ
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="gap-2 bg-[#E63946] text-white hover:bg-[#D62828] border-2 border-[#0A0A0A] rounded-none px-8 py-6 font-bold transition-all shadow-[4px_4px_0px_0px_rgba(10,10,10,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    保存中...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4" />
                                    作成する
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
