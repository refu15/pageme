"use client";

import { UserManual, TimeOfDay } from "@/lib/types/onboarding";
import { EXTENDED_COMMUNICATION_TOOLS, ALL_STRESS_SIGNS, INITIAL_STRESS_SIGNS } from "@/lib/data/communication";
import { MessageCircle, Clock, AlertTriangle, Check, Plus, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Step5Props {
    data: UserManual;
    onUpdate: (updates: Partial<UserManual>) => void;
}

const timeOptions: { value: TimeOfDay; label: string; emoji: string }[] = [
    { value: "morning", label: "午前", emoji: "🌅" },
    { value: "afternoon", label: "午後", emoji: "☀️" },
    { value: "evening", label: "夕方", emoji: "🌇" },
    { value: "night", label: "夜", emoji: "🌙" },
];

const ITEMS_PER_PAGE = 15;

export function Step5Communication({ data, onUpdate }: Step5Props) {
    const [stressShowCount, setStressShowCount] = useState(ITEMS_PER_PAGE);
    const [customTool, setCustomTool] = useState(data.communication.customTool || "");

    const updateCommunication = (key: keyof typeof data.communication, value: string | string[] | TimeOfDay[]) => {
        onUpdate({
            communication: { ...data.communication, [key]: value },
        });
    };

    const toggleTool = (tool: string) => {
        const currentTools = data.communication.preferredTools;
        if (currentTools.includes(tool)) {
            updateCommunication("preferredTools", currentTools.filter((t) => t !== tool));
        } else {
            updateCommunication("preferredTools", [...currentTools, tool]);
        }
    };

    const toggleTime = (time: TimeOfDay) => {
        const currentTimes = data.communication.bestTimeToReach;
        if (currentTimes.includes(time)) {
            updateCommunication("bestTimeToReach", currentTimes.filter((t) => t !== time));
        } else {
            updateCommunication("bestTimeToReach", [...currentTimes, time]);
        }
    };

    const toggleStressSign = (sign: string) => {
        const currentSigns = data.communication.stressSigns;
        if (currentSigns.includes(sign)) {
            updateCommunication("stressSigns", currentSigns.filter((s) => s !== sign));
        } else {
            updateCommunication("stressSigns", [...currentSigns, sign]);
        }
    };

    const addCustomTool = () => {
        if (customTool.trim() && !data.communication.preferredTools.includes(customTool.trim())) {
            updateCommunication("preferredTools", [...data.communication.preferredTools, customTool.trim()]);
            updateCommunication("customTool", customTool.trim());
            setCustomTool("");
        }
    };

    const displayedStressSigns = ALL_STRESS_SIGNS.slice(0, stressShowCount);

    return (
        <div className="space-y-6 font-sans">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-[#0A0A0A] mb-4">
                    <MessageCircle className="w-8 h-8 text-[#0A0A0A]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0A0A0A]">コミュニケーション設定</h2>
                <p className="text-[#666] mt-2 font-medium">連絡・連携に関する好みを教えてください</p>
            </div>

            {/* Preferred Tools */}
            <div className="space-y-3">
                <Label className="text-sm font-bold text-[#0A0A0A] flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#0A0A0A]" />
                    連絡手段の好み（複数選択可）
                </Label>
                <div className="flex flex-wrap gap-2">
                    {EXTENDED_COMMUNICATION_TOOLS.map((tool) => {
                        const isSelected = data.communication.preferredTools.includes(tool);
                        return (
                            <button
                                key={tool}
                                type="button"
                                onClick={() => toggleTool(tool)}
                                className={`px-4 py-2 border-2 transition-all duration-200 text-sm font-bold ${isSelected
                                    ? "border-[#E63946] bg-[#0A0A0A] text-white"
                                    : "border-[#0A0A0A] hover:bg-[#F5F5F5] text-[#0A0A0A]"
                                    }`}
                            >
                                {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                                {tool}
                            </button>
                        );
                    })}
                </div>
                {/* その他入力 */}
                <div className="flex gap-2">
                    <Input
                        placeholder="その他のツールを追加"
                        value={customTool}
                        onChange={(e) => setCustomTool(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addCustomTool()}
                        className="flex-1 border-2 border-[#0A0A0A] rounded-none focus:ring-0 focus:border-[#E63946]"
                    />
                    <button
                        type="button"
                        onClick={addCustomTool}
                        className="px-3 py-2 bg-[#0A0A0A] text-white hover:bg-[#333] border-2 border-[#0A0A0A] transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Best Time to Reach - 複数選択可 */}
            <div className="space-y-3">
                <Label className="text-sm font-bold text-[#0A0A0A] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0A0A0A]" />
                    反応しやすい時間帯（複数選択可）
                </Label>
                <div className="grid grid-cols-4 gap-2">
                    {timeOptions.map((time) => {
                        const isSelected = data.communication.bestTimeToReach.includes(time.value);
                        return (
                            <button
                                key={time.value}
                                type="button"
                                onClick={() => toggleTime(time.value)}
                                className={`p-3 border-2 transition-all duration-200 text-center ${isSelected
                                    ? "border-[#E63946] bg-[#FFF5F5]"
                                    : "border-[#0A0A0A] hover:bg-[#F5F5F5]"
                                    }`}
                            >
                                <span className="text-xl block mb-1">{time.emoji}</span>
                                <span className={`text-xs font-bold ${isSelected ? "text-[#E63946]" : "text-[#0A0A0A]"}`}>{time.label}</span>
                                {isSelected && <Check className="w-3 h-3 text-[#E63946] mx-auto mt-1" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Stress Signs - 100個から選択 */}
            <div className="space-y-3">
                <Label className="text-sm font-bold text-[#E63946] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#E63946]" />
                    ストレス時のサイン（複数選択可）
                    <span className="text-xs text-[#666] font-normal">選択中: {data.communication.stressSigns.length}</span>
                </Label>
                <p className="text-sm text-[#0A0A0A]">周りに気づいてもらえると助かるサイン</p>
                <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {displayedStressSigns.map((sign) => {
                        const isSelected = data.communication.stressSigns.includes(sign);
                        return (
                            <button
                                key={sign}
                                type="button"
                                onClick={() => toggleStressSign(sign)}
                                className={`p-3 border-2 transition-all duration-200 text-left text-xs font-bold flex items-center gap-2 ${isSelected
                                    ? "border-[#E63946] bg-[#FFF5F5]"
                                    : "border-[#0A0A0A] hover:bg-[#F5F5F5]"
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 flex items-center justify-center flex-shrink-0 transition-all border border-[#0A0A0A] ${isSelected ? "bg-[#E63946] border-[#E63946] text-white" : "bg-white"
                                        }`}
                                >
                                    {isSelected && <Check className="w-3 h-3" />}
                                </div>
                                <span className={`line-clamp-1 ${isSelected ? "text-[#E63946]" : "text-[#0A0A0A]"}`}>{sign}</span>
                            </button>
                        );
                    })}
                </div>
                {stressShowCount < ALL_STRESS_SIGNS.length && (
                    <button
                        type="button"
                        onClick={() => setStressShowCount(prev => prev + ITEMS_PER_PAGE)}
                        className="w-full py-2 text-sm font-bold text-[#E63946] border-2 border-dashed border-[#E63946] hover:bg-[#FFF5F5] flex items-center justify-center gap-1 transition-colors"
                    >
                        もっと見る ({ALL_STRESS_SIGNS.length - stressShowCount}件)
                        <ChevronDown className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
