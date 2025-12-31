"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { INDUSTRY_CATEGORIES } from "@/lib/data/industries";
import { matchAnimal, AnimalResult } from "@/lib/data/animal-matching"; // Import necessary logic
import { BrushCircle, BrushHeart, BrushStar, BrushWave, BrushSpiral, BrushVerticalLine } from "@/components/brush/BrushElements";
import { FlipCardSection } from "@/components/demo/FlipCardSection";
import { AnimalRadarModal } from "@/components/demo/AnimalRadarModal";
import { ExpandableBio } from "@/components/demo/ExpandableBio";
import { ZukanCard } from "@/components/demo/ZukanCard";
import { ExportPreviewModal } from "@/components/demo/ExportPreviewModal";
import { Loader2, Zap, Info, Share2, Download, Check } from "lucide-react";
import { toPng, toBlob } from 'html-to-image';
import { jsPDF } from 'jspdf';

// --- Type Definitions (Copied from demo/page.tsx to avoid direct dependency modification) ---
interface ProfileData {
    basic_info: {
        name: string;
        affiliation_type: string;
        industry: string;
        affiliation_name: string;
        role: string;
    };
    skills: string[];
    work_style: {
        time_preference: number;
        communication_preference: number;
        decision_style: string;
        feedback_preference: string;
    };
    infinite_fuel: string[];
    energy_drain: string[];
    communication: {
        preferred_tools: string[];
        custom_tool: string;
        best_time_to_reach: string[];
        stress_signs: string[];
    };
    activation_command: string;
}

interface AIInsights {
    animal: {
        type: string;
        emoji: string;
        reason: string;
        english_name?: string;
    };
    parameters?: {
        label: string;
        value: number;
    }[];
    hidden_strengths: {
        title: string;
        description: string;
    }[];
    work_advice: string;
    collaboration_tip: string;
    detailed_bio?: string;
    avatar_url?: string; // Add this field for persisted avatar
}

export default function ResultPage() {
    const params = useParams();
    const id = params?.id as string;

    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [matchedResult, setMatchedResult] = useState<AnimalResult | null>(null);

    // UI States
    const [isAnimalModalOpen, setIsAnimalModalOpen] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [isExportPreviewOpen, setIsExportPreviewOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            try {
                const { data, error } = await supabase
                    .from('analysis_results')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (!data) throw new Error('Result not found');

                const pData = data.profile_data as ProfileData;
                const aInsights = data.ai_insights as AIInsights;

                setProfileData(pData);
                setAiInsights(aInsights);

                // Re-calculate matched result for internal logic
                const result = matchAnimal({
                    work_style: pData.work_style,
                    infinite_fuel: pData.infinite_fuel,
                    energy_drain: pData.energy_drain,
                    skills: pData.skills
                });
                setMatchedResult(result);

            } catch (err) {
                console.error('Fetch error:', err);
                setError('データの取得に失敗しました。');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // --- Reuse Export Logic (Simplified) ---
    const handleExportPNG = async () => {
        if (!cardRef.current) return;
        setIsExporting(true);
        try {
            const blob = await toBlob(cardRef.current, {
                quality: 1.0, pixelRatio: 2, backgroundColor: '#FAFAFA', skipFonts: true,
                filter: (node) => !(node.tagName === 'STYLE' || (node.tagName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet'))
            });
            if (!blob) throw new Error('Failed to generate image');

            const safeName = (profileData?.basic_info?.name || 'user').replace(/[^a-zA-Z0-9\-_]/g, '_');
            const filename = `jibun_zukan_${safeName}.png`;

            // Try filesystem API
            try {
                // @ts-ignore
                if (window.showSaveFilePicker) {
                    // @ts-ignore
                    const handle = await window.showSaveFilePicker({ suggestedName: filename, types: [{ description: 'PNG', accept: { 'image/png': ['.png'] } }] });
                    const writable = await handle.createWritable();
                    await writable.write(blob);
                    await writable.close();
                    return;
                }
            } catch (e) { /* ignore cancel */ }

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url; link.download = filename;
            document.body.appendChild(link); link.click(); document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (err) {
            console.error(err); alert('保存に失敗しました');
        } finally {
            setIsExporting(false); setIsExportPreviewOpen(false);
        }
    };

    const handleExportPDF = async () => {
        if (!cardRef.current) return;
        setIsExporting(true);
        try {
            const dataUrl = await toPng(cardRef.current, {
                quality: 1.0, pixelRatio: 2, backgroundColor: '#FAFAFA', skipFonts: true,
                filter: (node) => !(node.tagName === 'STYLE' || (node.tagName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet'))
            });
            const img = new Image(); img.src = dataUrl;
            await new Promise(r => img.onload = r);
            const pdf = new jsPDF({ orientation: img.height > img.width ? 'portrait' : 'landscape', unit: 'px', format: [img.width / 2, img.height / 2] });
            pdf.addImage(dataUrl, 'PNG', 0, 0, img.width / 2, img.height / 2);

            const safeName = (profileData?.basic_info?.name || 'user').replace(/[^a-zA-Z0-9\-_]/g, '_');
            const filename = `jibun_zukan_${safeName}.pdf`;
            const blob = pdf.output('blob');

            try {
                // @ts-ignore
                if (window.showSaveFilePicker) {
                    // @ts-ignore
                    const handle = await window.showSaveFilePicker({ suggestedName: filename, types: [{ description: 'PDF', accept: { 'application/pdf': ['.pdf'] } }] });
                    const writable = await handle.createWritable();
                    await writable.write(blob);
                    await writable.close();
                    return;
                }
            } catch (e) { /* ignore */ }

            pdf.save(filename);
        } catch (err) {
            console.error(err); alert('保存に失敗しました');
        } finally {
            setIsExporting(false); setIsExportPreviewOpen(false);
        }
    };

    const handleShare = async () => {
        const url = window.location.href; // Share current full URL
        const text = `自分図鑑: ${profileData?.basic_info.name}さんの分析結果`;
        if (navigator.share) {
            try { await navigator.share({ title: '自分図鑑', text, url }); } catch (e) { /* ignore */ }
        } else {
            navigator.clipboard.writeText(`${text} ${url}`);
            alert('リンクをコピーしました！');
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]"><Loader2 className="w-8 h-8 animate-spin text-[#0A0A0A]" /></div>;
    }

    if (error || !profileData || !matchedResult || !aiInsights) {
        return <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] text-[#0A0A0A]">{error || 'データ読み込みエラー'}</div>;
    }

    const animalInfo = aiInsights.animal;
    const displayAnimalName = animalInfo.type;
    const industryInfo = INDUSTRY_CATEGORIES.find(i => i.id === profileData.basic_info.industry);
    const formattedCommand = profileData.activation_command ? profileData.activation_command.split(/([。！？\n])/).reduce((acc: string[], part) => {
        if (part.match(/[。！？\n]/)) { if (acc.length > 0) acc[acc.length - 1] += part; } else if (part.trim()) acc.push(part); return acc;
    }, []) : [];

    // Use persisted avatar URL or rebuild fallback
    const avatarUrl = aiInsights.avatar_url;

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] relative selection:bg-[#E63946] selection:text-white">
            <div className="fixed inset-0 pointer-events-none opacity-40 z-0 mix-blend-multiply" style={{ backgroundImage: 'url(/texture.png)', backgroundSize: 'cover' }} />

            {/* Hidden Card */}
            <div className="fixed left-[-9999px] top-0 pointer-events-none">
                <ZukanCard ref={cardRef} name={profileData.basic_info.name} role={profileData.basic_info.role} avatarUrl={avatarUrl}
                    animal={{ type: animalInfo.type, emoji: animalInfo.emoji, english_name: animalInfo.english_name || matchedResult.best.animal, reason: animalInfo.reason }}
                    parameters={aiInsights.parameters || []} energyDrain={profileData.energy_drain} infiniteFuel={profileData.infinite_fuel} />
            </div>

            {/* Header Actions */}
            <div className="fixed top-4 right-4 z-50 flex gap-2">
                <button onClick={handleShare} className="bg-white border-2 border-[#0A0A0A] p-3 hover:bg-[#F0F0F0] transition-all shadow-[4px_4px_0px_0px_rgba(10,10,10,1)] hover:translate-y-[2px] rounded-full">
                    <Share2 className="w-5 h-5 text-[#0A0A0A]" />
                </button>
            </div>

            <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative z-10">
                <div className="absolute top-20 left-10 opacity-10"><BrushCircle className="w-32 h-32 text-[#0A0A0A]" /></div>
                <div className="absolute bottom-20 right-10 opacity-10"><BrushSpiral className="w-24 h-24 text-[#0A0A0A]" /></div>

                {/* Avatar */}
                <div className="relative mb-12">
                    <BrushCircle className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] text-[#0A0A0A]" />
                    <div className="w-32 h-32 rounded-full overflow-hidden relative z-10 border-2 border-[#0A0A0A] bg-white">
                        {avatarUrl ? <img src={avatarUrl} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#F0F0F0] flex items-center justify-center text-4xl">{animalInfo.emoji}</div>}
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{profileData.basic_info.name}</h1>
                <p className="text-xl text-[#666] mb-2 font-medium">{industryInfo?.emoji} {industryInfo?.name} / {profileData.basic_info.role}</p>
                <button onClick={() => setIsAnimalModalOpen(true)} className="group flex items-center gap-2 text-lg text-[#888] mb-8 hover:text-[#E63946] transition-colors">
                    <span>{animalInfo.emoji} {displayAnimalName}</span>
                    <Info className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </button>

                {/* Export Button */}
                <button onClick={() => setIsExportPreviewOpen(true)} disabled={isExporting} className="mb-12 flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white font-bold border-2 border-[#0A0A0A] shadow-[4px_4px_0px_0px_rgba(200,80,80,1)] hover:translate-y-0.5 transition-all">
                    {isExporting ? '保存中...' : <><Download className="w-4 h-4" /> 図鑑カードとして保存</>}
                </button>

                <blockquote className="text-center max-w-xl mb-16 mx-auto"><p className="text-2xl md:text-3xl font-bold leading-relaxed text-[#0A0A0A] [text-wrap:balance] break-words">"{animalInfo.reason}"</p></blockquote>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-[#0A0A0A] rounded-full flex items-start justify-center p-2"><div className="w-1 h-2 bg-[#0A0A0A] rounded-full"></div></div>
                </div>
            </section>

            {aiInsights.detailed_bio && (
                <>
                    <div className="flex justify-center py-8 relative z-10"><BrushWave className="w-64 text-[#0A0A0A]" /></div>
                    <ExpandableBio text={aiInsights.detailed_bio} parameters={aiInsights.parameters || []} />
                </>
            )}

            <div className="flex justify-center py-8 relative z-10"><BrushWave className="w-64 text-[#0A0A0A]" /></div>
            <FlipCardSection title="無限にできること" items={profileData.infinite_fuel} type="fuel" icon={BrushHeart} iconColor="text-[#E63946]" />
            <div className="flex justify-center py-8 relative z-10"><BrushWave className="w-64 text-[#0A0A0A]" /></div>
            <FlipCardSection title="やる気が削がれること" items={profileData.energy_drain} type="drain" icon={BrushStar} iconColor="text-[#0A0A0A]" />
            <div className="flex justify-center py-8 relative z-10"><BrushWave className="w-64 text-[#0A0A0A]" /></div>

            <section className="px-6 py-20 max-w-3xl mx-auto relative z-10">
                <div className="flex items-center gap-3 mb-12"><BrushStar className="w-8 h-8 text-[#E63946]" /><h2 className="text-3xl font-bold">隠れた強み</h2></div>
                <div className="space-y-8">
                    {aiInsights.hidden_strengths.map((s, i) => (
                        <div key={i} className="flex gap-4"><div className="w-2 shrink-0 pt-1"><BrushVerticalLine className="h-full w-full text-[#E63946]" /></div><div className="flex-1"><h3 className="text-xl font-bold text-[#0A0A0A] mb-2">{s.title}</h3><p className="text-[#444] leading-relaxed">{s.description}</p></div></div>
                    ))}
                </div>
            </section>

            <div className="flex justify-center py-8 relative z-10"><BrushWave className="w-64 text-[#0A0A0A]" /></div>
            <section className="px-6 py-20 max-w-3xl mx-auto relative z-10">
                <div className="flex items-center gap-3 mb-12"><BrushStar className="w-8 h-8 text-[#0A0A0A]" /><h2 className="text-3xl font-bold">スキル</h2></div>
                <div className="flex flex-wrap gap-3">{profileData.skills.map((s, i) => <span key={i} className="px-4 py-2 border-2 border-[#0A0A0A] text-[#0A0A0A] font-bold hover:bg-[#0A0A0A] hover:text-[#FAFAFA] transition-colors">{s}</span>)}</div>
            </section>

            <div className="flex justify-center py-8 relative z-10"><BrushWave className="w-64 text-[#0A0A0A]" /></div>
            <section className="px-6 py-20 max-w-3xl mx-auto relative z-10">
                <h2 className="text-3xl font-bold mb-12">この人と働くには</h2>
                <div className="mb-12 p-8 border-2 border-[#0A0A0A] bg-white shadow-[4px_4px_0px_0px_rgba(10,10,10,1)]"><p className="text-xl text-[#0A0A0A] leading-relaxed font-medium">"{aiInsights.collaboration_tip}"</p></div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-6 border-2 border-[#0A0A0A] bg-[#FAFAFA] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#0A0A0A]"></div>
                        <h3 className="text-xl text-[#0A0A0A] mb-6 font-bold flex items-center gap-2"><Zap className="w-5 h-5" /> 連絡手段</h3>
                        <div className="flex flex-wrap gap-2 relative z-10">{profileData.communication.preferred_tools.map((tool, i) => <span key={i} className="px-3 py-1 bg-white border-2 border-[#0A0A0A] text-[#0A0A0A] font-bold shadow-[2px_2px_0px_0px_rgba(10,10,10,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(10,10,10,1)] transition-all">{tool}</span>)}</div>
                    </div>
                    <div className="p-6 border-2 border-[#0A0A0A] bg-[#FAFAFA] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#0A0A0A]"></div>
                        <h3 className="text-xl text-[#0A0A0A] mb-6 font-bold flex items-center gap-2"><Loader2 className="w-5 h-5" /> 反応しやすい時間</h3>
                        <div className="relative z-10"><p className="text-[#0A0A0A] font-bold text-2xl">{profileData.communication.best_time_to_reach.map(t => ({ 'morning': '午前', 'afternoon': '午後', 'evening': '夕方', 'night': '夜' })[t] || t).join(' / ')}</p><p className="text-sm text-[#666] mt-2 font-medium">※ この時間帯だと返信が早いです</p></div>
                    </div>
                </div>
            </section>

            <div className="flex justify-center py-8 relative z-10"><BrushWave className="w-64 text-[#0A0A0A]" /></div>
            <section className="px-6 py-20 max-w-3xl mx-auto text-center relative z-10">
                <h2 className="text-3xl font-bold mb-8">起動コマンド</h2>
                <div className="text-xl md:text-2xl text-[#0A0A0A] leading-relaxed max-w-xl mx-auto font-bold">{formattedCommand.length > 0 ? formattedCommand.map((l, i) => <p key={i} className="mb-2 block">{l}</p>) : <p>"{profileData.activation_command}"</p>}</div>
            </section>

            <footer className="py-20 text-center relative z-10">
                <BrushSpiral className="w-16 h-16 mx-auto mb-6 text-[#0A0A0A]" />
                <p className="text-[#666] text-sm">自分図鑑</p>
                <a href="/" className="inline-block mt-6 text-[#888] hover:text-[#E63946] transition-colors underline">トップへ戻る</a>
            </footer>

            <AnimalRadarModal isOpen={isAnimalModalOpen} onClose={() => setIsAnimalModalOpen(false)} animalName={animalInfo.type} animalEmoji={animalInfo.emoji} reason={animalInfo.reason} parameters={aiInsights.parameters || []} />
            <ExportPreviewModal isOpen={isExportPreviewOpen} onClose={() => setIsExportPreviewOpen(false)} onExportPNG={handleExportPNG} onExportPDF={handleExportPDF} isExporting={isExporting} name={profileData.basic_info.name} role={profileData.basic_info.role} avatarUrl={avatarUrl} animal={{ type: animalInfo.type, emoji: animalInfo.emoji, english_name: animalInfo.english_name || matchedResult.best.animal, reason: animalInfo.reason }} parameters={aiInsights.parameters || []} energyDrain={profileData.energy_drain} infiniteFuel={profileData.infinite_fuel} />
        </div>
    );
}
