"use client";

import { UserManual, DecisionStyle, FeedbackPreference } from "@/lib/types/onboarding";
import { Settings2, Sun, Moon, MessageSquare, Zap } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Step3Props {
    data: UserManual;
    onUpdate: (updates: Partial<UserManual>) => void;
}

const decisionStyles: { value: DecisionStyle; label: string; emoji: string }[] = [
    { value: "data", label: "データ重視", emoji: "📊" },
    { value: "intuition", label: "直感で判断", emoji: "💡" },
    { value: "collaborative", label: "議論して決める", emoji: "🤝" },
];

const feedbackPreferences: { value: FeedbackPreference; label: string; emoji: string }[] = [
    { value: "direct", label: "直接ハッキリ", emoji: "🎯" },
    { value: "written", label: "文章で整理して", emoji: "📝" },
    { value: "gentle", label: "やんわりと", emoji: "🌸" },
];

export function Step3WorkStyle({ data, onUpdate }: Step3Props) {
    const updateWorkStyle = (key: keyof typeof data.workStyle, value: number | string) => {
        onUpdate({
            workStyle: { ...data.workStyle, [key]: value },
        });
    };

    return (
        <div className="space-y-8 font-sans">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-[#0A0A0A] mb-4">
                    <Settings2 className="w-8 h-8 text-[#0A0A0A]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0A0A0A]">働き方スタイル</h2>
                <p className="text-[#666] mt-2 font-medium">あなたの仕事の進め方を教えてください</p>
            </div>

            {/* Time Preference Slider */}
            <div className="space-y-4">
                <Label className="text-sm font-bold text-[#0A0A0A]">活動しやすい時間帯</Label>
                <div className="flex items-center gap-4">
                    <Sun className="w-6 h-6 text-[#0A0A0A]" />
                    <div className="flex-1 space-y-2">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={data.workStyle.timePreference}
                            onChange={(e) => updateWorkStyle("timePreference", parseInt(e.target.value))}
                            className="w-full h-2 bg-white border border-[#0A0A0A] rounded-full appearance-none cursor-pointer accent-[#E63946]"
                        />
                        <div className="flex justify-between text-xs font-bold text-[#666]">
                            <span>朝型</span>
                            <span>どちらでも</span>
                            <span>夜型</span>
                        </div>
                    </div>
                    <Moon className="w-6 h-6 text-[#0A0A0A]" />
                </div>
            </div>

            {/* Communication Preference Slider */}
            <div className="space-y-4">
                <Label className="text-sm font-bold text-[#0A0A0A]">コミュニケーションスタイル</Label>
                <div className="flex items-center gap-4">
                    <MessageSquare className="w-6 h-6 text-[#0A0A0A]" />
                    <div className="flex-1 space-y-2">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={data.workStyle.communicationPreference}
                            onChange={(e) => updateWorkStyle("communicationPreference", parseInt(e.target.value))}
                            className="w-full h-2 bg-white border border-[#0A0A0A] rounded-full appearance-none cursor-pointer accent-[#E63946]"
                        />
                        <div className="flex justify-between text-xs font-bold text-[#666]">
                            <span>非同期（テキスト）</span>
                            <span>バランス</span>
                            <span>同期（会話）</span>
                        </div>
                    </div>
                    <Zap className="w-6 h-6 text-[#0A0A0A]" />
                </div>
            </div>

            {/* Decision Style */}
            <div className="space-y-3">
                <Label className="text-sm font-bold text-[#0A0A0A]">意思決定スタイル</Label>
                <div className="grid grid-cols-3 gap-3">
                    {decisionStyles.map((style) => (
                        <button
                            key={style.value}
                            type="button"
                            onClick={() => updateWorkStyle("decisionStyle", style.value)}
                            className={`p-4 border-2 transition-all duration-200 text-center ${data.workStyle.decisionStyle === style.value
                                ? "border-[#E63946] bg-[#0A0A0A] text-white"
                                : "border-[#0A0A0A] hover:bg-[#F5F5F5] text-[#0A0A0A]"
                                }`}
                        >
                            <span className="text-2xl block mb-2">{style.emoji}</span>
                            <span className="text-sm font-bold">{style.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Feedback Preference */}
            <div className="space-y-3">
                <Label className="text-sm font-bold text-[#0A0A0A]">フィードバックの受け取り方</Label>
                <div className="grid grid-cols-3 gap-3">
                    {feedbackPreferences.map((pref) => (
                        <button
                            key={pref.value}
                            type="button"
                            onClick={() => updateWorkStyle("feedbackPreference", pref.value)}
                            className={`p-4 border-2 transition-all duration-200 text-center ${data.workStyle.feedbackPreference === pref.value
                                ? "border-[#E63946] bg-[#0A0A0A] text-white"
                                : "border-[#0A0A0A] hover:bg-[#F5F5F5] text-[#0A0A0A]"
                                }`}
                        >
                            <span className="text-2xl block mb-2">{pref.emoji}</span>
                            <span className="text-sm font-bold">{pref.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
