"use client";

import { UserManual, AffiliationType } from "@/lib/types/onboarding";
import { INDUSTRY_CATEGORIES, ROLES_BY_INDUSTRY, COMMON_ROLES } from "@/lib/data/industries";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Building2, Briefcase, Factory, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Step1Props {
    data: UserManual;
    onUpdate: (updates: Partial<UserManual>) => void;
}

const affiliationTypes: { value: AffiliationType; label: string; icon: string }[] = [
    { value: "employee", label: "会社員", icon: "🏢" },
    { value: "student", label: "学生", icon: "🎓" },
    { value: "freelance", label: "フリーランス", icon: "💼" },
    { value: "other", label: "その他", icon: "🌟" },
];

export function Step1BasicInfo({ data, onUpdate }: Step1Props) {
    const [showAllRoles, setShowAllRoles] = useState(false);

    // 選択した産業に応じた役職リストを取得
    const getRolesForIndustry = () => {
        if (!data.industry) return COMMON_ROLES;
        const industryRoles = ROLES_BY_INDUSTRY[data.industry] || [];
        return [...industryRoles, ...COMMON_ROLES.slice(0, 10)];
    };

    const availableRoles = getRolesForIndustry();
    const displayedRoles = showAllRoles ? availableRoles : availableRoles.slice(0, 12);

    return (
        <div className="space-y-8 font-sans">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-[#0A0A0A] mb-4">
                    <User className="w-8 h-8 text-[#0A0A0A]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0A0A0A]">基本情報</h2>
                <p className="text-[#666] mt-2 font-medium">まずはあなたのことを教えてください</p>
            </div>

            {/* 名前 */}
            <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-bold text-[#0A0A0A]">
                    お名前
                </Label>
                <Input
                    id="name"
                    placeholder="山田 太郎"
                    value={data.name}
                    onChange={(e) => onUpdate({ name: e.target.value })}
                    className="h-12 text-lg border-2 border-[#0A0A0A] rounded-none focus:ring-offset-0 focus:ring-0 focus:border-[#E63946]"
                />
            </div>

            {/* 所属タイプ */}
            <div className="space-y-3">
                <Label className="text-sm font-bold text-[#0A0A0A]">所属タイプ</Label>
                <div className="grid grid-cols-2 gap-4">
                    {affiliationTypes.map((type) => (
                        <button
                            key={type.value}
                            type="button"
                            onClick={() => onUpdate({ affiliationType: type.value })}
                            className={`p-4 border-2 transition-all duration-200 text-left relative overflow-hidden group ${data.affiliationType === type.value
                                ? "border-[#E63946] bg-[#FFF5F5]"
                                : "border-[#0A0A0A] hover:bg-[#F5F5F5]"
                                }`}
                        >
                            {data.affiliationType === type.value && (
                                <div className="absolute top-0 right-0 w-8 h-8 bg-[#E63946] -mr-4 -mt-4 rotate-45" />
                            )}
                            <span className="text-2xl mb-2 block">{type.icon}</span>
                            <span className={`font-bold ${data.affiliationType === type.value ? "text-[#E63946]" : "text-[#0A0A0A]"}`}>
                                {type.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 産業分類 */}
            <div className="space-y-3">
                <Label className="text-sm font-bold text-[#0A0A0A] flex items-center gap-2">
                    <Factory className="w-4 h-4" />
                    業種・産業
                </Label>
                <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {INDUSTRY_CATEGORIES.map((industry) => (
                        <button
                            key={industry.id}
                            type="button"
                            onClick={() => onUpdate({ industry: industry.id, role: '' })}
                            className={`p-3 border-2 transition-all duration-200 text-center text-sm ${data.industry === industry.id
                                ? "border-[#E63946] bg-[#0A0A0A] text-white"
                                : "border-[#0A0A0A] hover:bg-[#F5F5F5] text-[#0A0A0A]"
                                }`}
                        >
                            <span className="text-lg block mb-1">{industry.emoji}</span>
                            <span className="text-xs font-bold line-clamp-1">{industry.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 所属名 */}
            <div className="space-y-2">
                <Label htmlFor="affiliationName" className="text-sm font-bold text-[#0A0A0A] flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    所属名
                </Label>
                <Input
                    id="affiliationName"
                    placeholder="株式会社〇〇 / 〇〇大学"
                    value={data.affiliationName}
                    onChange={(e) => onUpdate({ affiliationName: e.target.value })}
                    className="h-12 border-2 border-[#0A0A0A] rounded-none focus:ring-0 focus:border-[#E63946]"
                />
            </div>

            {/* 役職・役割（選択式） */}
            <div className="space-y-3">
                <Label className="text-sm font-bold text-[#0A0A0A] flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    役職・役割
                </Label>
                <div className="grid grid-cols-3 gap-2">
                    {displayedRoles.map((role) => (
                        <button
                            key={role}
                            type="button"
                            onClick={() => onUpdate({ role })}
                            className={`p-2 border-2 transition-all duration-200 text-sm font-medium ${data.role === role
                                ? "border-[#E63946] bg-[#E63946] text-white"
                                : "border-[#0A0A0A] hover:bg-[#F5F5F5] text-[#0A0A0A]"
                                }`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
                {availableRoles.length > 12 && (
                    <button
                        type="button"
                        onClick={() => setShowAllRoles(!showAllRoles)}
                        className="w-full py-2 text-sm font-bold text-[#0A0A0A] border-b-2 border-dashed border-[#0A0A0A] hover:text-[#E63946] hover:border-[#E63946] flex items-center justify-center gap-1 transition-colors"
                    >
                        {showAllRoles ? "閉じる" : `もっと見る (${availableRoles.length - 12}件)`}
                        <ChevronDown className={`w-4 h-4 transition-transform ${showAllRoles ? "rotate-180" : ""}`} />
                    </button>
                )}
                {/* その他入力 */}
                <Input
                    placeholder="その他の役職を入力"
                    value={!availableRoles.includes(data.role) ? data.role : ""}
                    onChange={(e) => onUpdate({ role: e.target.value })}
                    className="mt-2 border-2 border-[#0A0A0A] rounded-none focus:ring-0 focus:border-[#E63946]"
                />
            </div>
        </div>
    );
}
