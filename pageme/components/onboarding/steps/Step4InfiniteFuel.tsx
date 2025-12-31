"use client";

import { UserManual } from "@/lib/types/onboarding";
import { ALL_INFINITE_FUEL, ALL_ENERGY_DRAIN, INITIAL_INFINITE_FUEL, INITIAL_ENERGY_DRAIN } from "@/lib/data/fuel-drain";
import { Flame, BatteryLow, Check, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Step4Props {
    data: UserManual;
    onUpdate: (updates: Partial<UserManual>) => void;
}

const ITEMS_PER_PAGE = 15;

export function Step4InfiniteFuel({ data, onUpdate }: Step4Props) {
    const [customFuel, setCustomFuel] = useState("");
    const [customDrain, setCustomDrain] = useState("");
    const [fuelShowCount, setFuelShowCount] = useState(ITEMS_PER_PAGE);
    const [drainShowCount, setDrainShowCount] = useState(ITEMS_PER_PAGE);

    const toggleItem = (
        type: "infiniteFuel" | "energyDrain",
        item: string
    ) => {
        const currentItems = data[type];
        if (currentItems.includes(item)) {
            onUpdate({ [type]: currentItems.filter((i) => i !== item) });
        } else {
            onUpdate({ [type]: [...currentItems, item] });
        }
    };

    const addCustomItem = (type: "infiniteFuel" | "energyDrain") => {
        const value = type === "infiniteFuel" ? customFuel : customDrain;
        if (value.trim() && !data[type].includes(value.trim())) {
            onUpdate({ [type]: [...data[type], value.trim()] });
            if (type === "infiniteFuel") {
                setCustomFuel("");
            } else {
                setCustomDrain("");
            }
        }
    };

    const displayedFuel = ALL_INFINITE_FUEL.slice(0, fuelShowCount);
    const displayedDrain = ALL_ENERGY_DRAIN.slice(0, drainShowCount);

    return (
        <div className="space-y-8 font-sans">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-[#E63946] mb-4">
                    <Flame className="w-8 h-8 text-[#E63946]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0A0A0A]">Infinite Fuel & Energy Drain</h2>
                <p className="text-[#666] mt-2 font-medium">エネルギーの源と消耗するものを教えてください</p>
            </div>

            {/* Infinite Fuel Section */}
            <div className="space-y-4">
                <Label className="text-sm font-bold text-[#E63946] flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#E63946]" />
                    無限にできること（Infinite Fuel）
                    <span className="text-xs text-[#666] font-normal">選択中: {data.infiniteFuel.length}</span>
                </Label>
                <p className="text-sm text-[#0A0A0A]">いくらやっても疲れない、むしろ元気が出ること</p>

                <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {displayedFuel.map((item) => {
                        const isSelected = data.infiniteFuel.includes(item);
                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => toggleItem("infiniteFuel", item)}
                                className={`p-3 border-2 transition-all duration-200 text-left flex items-center gap-2 text-xs font-bold ${isSelected
                                    ? "border-[#E63946] bg-[#FFF5F5]"
                                    : "border-[#0A0A0A] hover:bg-[#F5F5F5] hover:border-[#E63946]"
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 flex items-center justify-center flex-shrink-0 transition-all border border-[#0A0A0A] ${isSelected ? "bg-[#E63946] border-[#E63946] text-white" : "bg-white"
                                        }`}
                                >
                                    {isSelected && <Check className="w-3 h-3" />}
                                </div>
                                <span className={`line-clamp-1 ${isSelected ? "text-[#E63946]" : "text-[#0A0A0A]"}`}>{item}</span>
                            </button>
                        );
                    })}
                </div>

                {fuelShowCount < ALL_INFINITE_FUEL.length && (
                    <button
                        type="button"
                        onClick={() => setFuelShowCount(prev => prev + ITEMS_PER_PAGE)}
                        className="w-full py-2 text-sm font-bold text-[#E63946] border-2 border-dashed border-[#E63946] hover:bg-[#FFF5F5] flex items-center justify-center gap-1 transition-colors"
                    >
                        もっと見る ({ALL_INFINITE_FUEL.length - fuelShowCount}件)
                        <ChevronDown className="w-4 h-4" />
                    </button>
                )}

                <div className="flex gap-2">
                    <Input
                        placeholder="その他を追加"
                        value={customFuel}
                        onChange={(e) => setCustomFuel(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addCustomItem("infiniteFuel")}
                        className="flex-1 text-sm border-2 border-[#0A0A0A] rounded-none focus:ring-0 focus:border-[#E63946]"
                    />
                    <button
                        type="button"
                        onClick={() => addCustomItem("infiniteFuel")}
                        className="px-3 py-2 bg-[#E63946] text-white hover:bg-[#D62828] border-2 border-[#E63946] transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Energy Drain Section */}
            <div className="space-y-4">
                <Label className="text-sm font-bold text-[#0A0A0A] flex items-center gap-2">
                    <BatteryLow className="w-4 h-4 text-[#0A0A0A]" />
                    やる気が削がれること（Energy Drain）
                    <span className="text-xs text-[#666] font-normal">選択中: {data.energyDrain.length}</span>
                </Label>
                <p className="text-sm text-[#0A0A0A]">これがあるとパフォーマンスが落ちる環境・状況</p>

                <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {displayedDrain.map((item) => {
                        const isSelected = data.energyDrain.includes(item);
                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => toggleItem("energyDrain", item)}
                                className={`p-3 border-2 transition-all duration-200 text-left flex items-center gap-2 text-xs font-bold ${isSelected
                                    ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                                    : "border-[#0A0A0A] hover:bg-[#F5F5F5]"
                                    }`}
                            >
                                <div
                                    className={`w-4 h-4 flex items-center justify-center flex-shrink-0 transition-all border border-[#0A0A0A] ${isSelected ? "bg-white text-[#0A0A0A]" : "bg-white"
                                        }`}
                                >
                                    {isSelected && <Check className="w-3 h-3" />}
                                </div>
                                <span className={`line-clamp-1 ${isSelected ? "text-white" : "text-[#0A0A0A]"}`}>{item}</span>
                            </button>
                        );
                    })}
                </div>

                {drainShowCount < ALL_ENERGY_DRAIN.length && (
                    <button
                        type="button"
                        onClick={() => setDrainShowCount(prev => prev + ITEMS_PER_PAGE)}
                        className="w-full py-2 text-sm font-bold text-[#0A0A0A] border-2 border-dashed border-[#0A0A0A] hover:bg-[#F5F5F5] flex items-center justify-center gap-1 transition-colors"
                    >
                        もっと見る ({ALL_ENERGY_DRAIN.length - drainShowCount}件)
                        <ChevronDown className="w-4 h-4" />
                    </button>
                )}

                <div className="flex gap-2">
                    <Input
                        placeholder="その他を追加"
                        value={customDrain}
                        onChange={(e) => setCustomDrain(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addCustomItem("energyDrain")}
                        className="flex-1 text-sm border-2 border-[#0A0A0A] rounded-none focus:ring-0 focus:border-[#E63946]"
                    />
                    <button
                        type="button"
                        onClick={() => addCustomItem("energyDrain")}
                        className="px-3 py-2 bg-[#0A0A0A] text-white hover:bg-[#333] border-2 border-[#0A0A0A] transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
