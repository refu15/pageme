"use client";

import { UserManual } from "@/lib/types/onboarding";
import { ALL_SKILLS, INITIAL_SKILLS, SKILL_CATEGORIES } from "@/lib/data/skills";
import { getIndustryRecommendedSkills } from "@/lib/data/recommended-skills";
import { Wrench, Check, Plus, ChevronDown, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";

interface Step2Props {
    data: UserManual;
    onUpdate: (updates: Partial<UserManual>) => void;
}

const ITEMS_PER_PAGE = 15;

export function Step2Skills({ data, onUpdate }: Step2Props) {
    const [customSkill, setCustomSkill] = useState("");
    const [showCount, setShowCount] = useState(ITEMS_PER_PAGE);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // フィルタリングされたスキルリスト
    const filteredSkills = useMemo(() => {
        let skills = ALL_SKILLS;

        // カテゴリフィルター
        if (activeCategory && SKILL_CATEGORIES[activeCategory as keyof typeof SKILL_CATEGORIES]) {
            const cat = SKILL_CATEGORIES[activeCategory as keyof typeof SKILL_CATEGORIES];
            skills = ALL_SKILLS.slice(cat.start, cat.end);
        } else if (!activeCategory && !searchQuery) {
            // 職種別おすすめ順（すべて表示時）
            const industry = data.industry;
            if (industry) {
                const recommended = getIndustryRecommendedSkills(industry);
                if (recommended.length > 0) {
                    const others = ALL_SKILLS.filter(s => !recommended.includes(s));
                    skills = [...recommended, ...others];
                }
            }
        }

        // 検索フィルター
        if (searchQuery) {
            skills = skills.filter(skill =>
                skill.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return skills;
    }, [activeCategory, searchQuery, data.industry]);

    const displayedSkills = filteredSkills.slice(0, showCount);
    const hasMore = showCount < filteredSkills.length;

    const toggleSkill = (skill: string) => {
        const currentSkills = data.skills;
        if (currentSkills.includes(skill)) {
            onUpdate({ skills: currentSkills.filter((s) => s !== skill) });
        } else {
            onUpdate({ skills: [...currentSkills, skill] });
        }
    };

    const addCustomSkill = () => {
        if (customSkill.trim() && !data.skills.includes(customSkill.trim())) {
            onUpdate({ skills: [...data.skills, customSkill.trim()] });
            setCustomSkill("");
        }
    };

    const showMore = () => {
        setShowCount(prev => prev + ITEMS_PER_PAGE);
    };

    return (
        <div className="space-y-6 font-sans">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-[#0A0A0A] mb-4">
                    <Wrench className="w-8 h-8 text-[#0A0A0A]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0A0A0A]">スキル・得意領域</h2>
                <p className="text-[#666] mt-2 font-medium">あなたの得意な領域を選んでください（複数選択可）</p>
            </div>

            {/* 検索 */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666] w-4 h-4" />
                <Input
                    placeholder="スキルを検索..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowCount(ITEMS_PER_PAGE);
                    }}
                    className="pl-10 h-12 border-2 border-[#0A0A0A] rounded-none focus:ring-0 focus:border-[#E63946]"
                />
            </div>

            {/* カテゴリフィルター */}
            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => {
                        setActiveCategory(null);
                        setShowCount(ITEMS_PER_PAGE);
                    }}
                    className={`px-4 py-2 border-2 text-sm font-bold transition-colors ${activeCategory === null
                        ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                        : "bg-white text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#F5F5F5]"
                        }`}
                >
                    すべて
                </button>
                {Object.entries(SKILL_CATEGORIES).map(([key, cat]) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => {
                            setActiveCategory(key);
                            setShowCount(ITEMS_PER_PAGE);
                        }}
                        className={`px-4 py-2 border-2 text-sm font-bold transition-colors ${activeCategory === key
                            ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                            : "bg-white text-[#0A0A0A] border-[#0A0A0A] hover:bg-[#F5F5F5]"
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* スキルグリッド */}
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {displayedSkills.map((skill) => {
                    const isSelected = data.skills.includes(skill);
                    return (
                        <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`p-3 border-2 transition-all duration-200 text-left flex items-center gap-2 text-sm font-medium group ${isSelected
                                ? "border-[#E63946] bg-[#FFF5F5]"
                                : "border-[#0A0A0A] hover:bg-[#F5F5F5] hover:border-[#0A0A0A]"
                                }`}
                        >
                            <div
                                className={`w-5 h-5 flex items-center justify-center flex-shrink-0 transition-all border border-[#0A0A0A] ${isSelected ? "bg-[#E63946] border-[#E63946] text-white" : "bg-white"
                                    }`}
                            >
                                {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span className={`line-clamp-1 font-bold ${isSelected ? "text-[#E63946]" : "text-[#0A0A0A]"}`}>
                                {skill}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* もっと見るボタン */}
            {hasMore && (
                <button
                    type="button"
                    onClick={showMore}
                    className="w-full py-3 text-sm font-bold text-[#0A0A0A] border-2 border-dashed border-[#0A0A0A] hover:text-[#E63946] hover:border-[#E63946] flex items-center justify-center gap-2 transition-colors"
                >
                    <span>もっと見る ({filteredSkills.length - showCount}件)</span>
                    <ChevronDown className="w-4 h-4" />
                </button>
            )}

            {/* カスタムスキル入力 */}
            <div className="flex gap-2">
                <Input
                    placeholder="その他のスキルを追加"
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCustomSkill()}
                    className="flex-1 border-2 border-[#0A0A0A] rounded-none focus:ring-0 focus:border-[#E63946]"
                />
                <button
                    type="button"
                    onClick={addCustomSkill}
                    className="px-4 py-2 bg-[#0A0A0A] text-white hover:bg-[#333] border-2 border-[#0A0A0A] transition-colors"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            {/* 選択中のスキルプレビュー */}
            {data.skills.length > 0 && (
                <div className="bg-[#F5F5F5] border-2 border-[#0A0A0A] p-4">
                    <p className="text-sm text-[#0A0A0A] font-bold mb-3">選択中: {data.skills.length}個</p>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.slice(0, 10).map((skill) => (
                            <span
                                key={skill}
                                onClick={() => toggleSkill(skill)}
                                className="px-3 py-1 bg-[#0A0A0A] text-white border border-[#0A0A0A] text-sm cursor-pointer hover:bg-[#E63946] hover:border-[#E63946] transition-colors flex items-center gap-1"
                            >
                                {skill} <span className="text-xs">×</span>
                            </span>
                        ))}
                        {data.skills.length > 10 && (
                            <span className="px-3 py-1 bg-white text-[#0A0A0A] border border-[#0A0A0A] text-sm font-bold">
                                +{data.skills.length - 10}件
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
