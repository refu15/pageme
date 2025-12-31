"use client";

import { UserManual } from "@/lib/types/onboarding";
import { Zap, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

interface Step6Props {
    data: UserManual;
    onUpdate: (updates: Partial<UserManual>) => void;
}

// AIが生成する例のベース（入力内容に基づいてカスタマイズ）
function generateSuggestions(data: UserManual): string[] {
    const suggestions: string[] = [];

    // スキルに基づく提案
    if (data.skills.length > 0) {
        suggestions.push(`${data.skills[0]}の仕事を任せてもらえると力を発揮できます`);
    }

    // 働き方に基づく提案
    if (data.workStyle.timePreference <= 2) {
        suggestions.push("午前中に重要な打ち合わせを入れてもらえると集中して参加できます");
    } else if (data.workStyle.timePreference >= 4) {
        suggestions.push("午後以降に重要なタスクを振ってもらえるとパフォーマンスが上がります");
    }

    if (data.workStyle.communicationPreference <= 2) {
        suggestions.push("急ぎでなければSlackやメールでの連絡が助かります");
    } else if (data.workStyle.communicationPreference >= 4) {
        suggestions.push("直接話した方が早いタイプなので、気軽に声をかけてください");
    }

    // 意思決定スタイルに基づく提案
    if (data.workStyle.decisionStyle === 'data') {
        suggestions.push("判断材料としてデータや根拠を共有してもらえると動きやすいです");
    } else if (data.workStyle.decisionStyle === 'collaborative') {
        suggestions.push("重要な決定は一緒に議論してから進めたいタイプです");
    }

    // フィードバック好みに基づく提案
    if (data.workStyle.feedbackPreference === 'direct') {
        suggestions.push("フィードバックは率直に伝えてもらって大丈夫です");
    } else if (data.workStyle.feedbackPreference === 'written') {
        suggestions.push("フィードバックは文章でまとめてもらえると理解しやすいです");
    }

    // Infinite Fuelに基づく提案
    if (data.infiniteFuel.includes('新しいことを学ぶ')) {
        suggestions.push("新しい技術やツールの検証を任せてもらえるとモチベーションが上がります");
    }
    if (data.infiniteFuel.includes('人に教える')) {
        suggestions.push("後輩のメンタリングや勉強会の講師を振ってもらえると嬉しいです");
    }
    if (data.infiniteFuel.includes('効率化する')) {
        suggestions.push("非効率なプロセスを見つけたら改善提案させてください");
    }

    // Energy Drainに基づく提案
    if (data.energyDrain.includes('割り込みが多い')) {
        suggestions.push("集中したい時間帯は連絡を遅らせてもらえると助かります");
    }
    if (data.energyDrain.includes('曖昧な指示')) {
        suggestions.push("依頼時に背景と期待する成果を明確にしてもらえると動きやすいです");
    }
    if (data.energyDrain.includes('長時間ミーティング')) {
        suggestions.push("会議は事前にアジェンダを共有してもらえると効率的に参加できます");
    }

    // ストレスサインに基づく提案
    if (data.communication.stressSigns.includes('無口になる')) {
        suggestions.push("無口になっている時は声をかけてもらえると助かります");
    }
    if (data.communication.stressSigns.includes('返信が遅くなる')) {
        suggestions.push("レスが遅くなっている時は余裕がない合図かもしれません");
    }

    // デフォルトの提案
    const defaults = [
        "仕事を依頼する前に、背景と目的を先に説明してもらえると動きやすいです",
        "急ぎの場合は「急ぎ」と明記してもらえると優先度を調整できます",
        "1on1では先にアジェンダを共有してもらえると準備ができます",
        "困っていそうな時は声をかけてもらえると助かります",
        "成果を出した時は一言フィードバックをもらえるとモチベーションになります",
        "長期的なキャリアについて定期的に話し合う機会があると嬉しいです",
        "チームの方向性が変わる時は早めに共有してもらえると準備できます",
        "自分の強みを活かせる仕事を優先的にアサインしてもらえると成果を出せます",
    ];

    // 足りない分はデフォルトから追加
    for (const def of defaults) {
        if (suggestions.length >= 10) break;
        if (!suggestions.includes(def)) {
            suggestions.push(def);
        }
    }

    return suggestions.slice(0, 10);
}

export function Step6ActivationCommand({ data, onUpdate }: Step6Props) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        // 入力データに基づいて提案を生成
        const generated = generateSuggestions(data);
        setSuggestions(generated);
    }, [data.skills, data.workStyle, data.infiniteFuel, data.energyDrain, data.communication.stressSigns]);

    const regenerateSuggestions = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const generated = generateSuggestions(data);
            // シャッフルして異なる順序で表示
            const shuffled = generated.sort(() => Math.random() - 0.5);
            setSuggestions(shuffled);
            setIsGenerating(false);
        }, 500);
    };

    const selectSuggestion = (suggestion: string) => {
        const current = data.activationCommand;
        if (current) {
            onUpdate({ activationCommand: current + "\n" + suggestion });
        } else {
            onUpdate({ activationCommand: suggestion });
        }
    };

    return (
        <div className="space-y-6 font-sans">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-[#0A0A0A] mb-4">
                    <Zap className="w-8 h-8 text-[#0A0A0A]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0A0A0A]">起動コマンド</h2>
                <p className="text-[#666] mt-2 font-medium">
                    あなたと上手く協働するためのコツを教えてください
                </p>
            </div>

            {/* AI生成の提案 */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Label className="text-sm font-bold text-[#0A0A0A] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#E63946]" />
                        AIがあなたの入力に基づいて提案（クリックで追加）
                    </Label>
                    <button
                        type="button"
                        onClick={regenerateSuggestions}
                        disabled={isGenerating}
                        className="text-xs font-bold text-[#E63946] hover:text-[#D62828] flex items-center gap-1 transition-colors"
                    >
                        {isGenerating ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                            <RefreshCw className="w-3 h-3" />
                        )}
                        再生成
                    </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => selectSuggestion(suggestion)}
                            className="w-full p-3 text-left text-sm font-medium bg-white hover:bg-[#F5F5F5] hover:border-[#E63946] border-2 border-[#0A0A0A] transition-all text-[#0A0A0A]"
                        >
                            💡 {suggestion}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Input */}
            <div className="space-y-2">
                <Label htmlFor="activationCommand" className="text-sm font-bold text-[#0A0A0A]">
                    私をうまく動かすためのコツ（自由記述）
                </Label>
                <Textarea
                    id="activationCommand"
                    placeholder="提案を選択するか、自由に記述してください..."
                    value={data.activationCommand}
                    onChange={(e) => onUpdate({ activationCommand: e.target.value })}
                    rows={5}
                    className="resize-none border-2 border-[#0A0A0A] rounded-none focus:ring-0 focus:border-[#E63946]"
                />
            </div>

            {/* Completion Message */}
            <div className="bg-[#FFF5F5] border-2 border-[#E63946] p-5">
                <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold text-[#0A0A0A] mb-1">これで最後です！</p>
                        <p className="text-sm text-[#0A0A0A] font-medium">
                            「完了して自分図鑑を作成」ボタンを押すと、あなたの取扱説明書が完成します。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
