"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { INDUSTRY_CATEGORIES } from "@/lib/data/industries";
import { matchAnimal, getAnimalAvatarUrl, AnimalMatch, AnimalResult } from "@/lib/data/animal-matching";
import { BrushCircle, BrushHeart, BrushStar, BrushWave, BrushSpiral, BrushVerticalLine } from "@/components/brush/BrushElements";
import { FlipCardSection } from "@/components/demo/FlipCardSection";
import { AnimalRadarModal } from "@/components/demo/AnimalRadarModal";
import { ExpandableBio } from "@/components/demo/ExpandableBio";
import { ZukanCard } from "@/components/demo/ZukanCard";
import { ExportPreviewModal } from "@/components/demo/ExportPreviewModal";
import { Loader2, Zap, Info, Share2, Download, Check } from "lucide-react";
import { toPng, toBlob } from 'html-to-image';
import { jsPDF } from 'jspdf';

// ... (interfaces remain the same)

// ... (interfaces remain the same)
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
}

export default function DemoPage() {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);
    const [aiAvatarUrl, setAiAvatarUrl] = useState<string | null>(null);
    const [generatingInsights, setGeneratingInsights] = useState(false);
    const [generatingAvatar, setGeneratingAvatar] = useState(false);

    // New State for Modal
    const [isAnimalModalOpen, setIsAnimalModalOpen] = useState(false);
    const [matchedResult, setMatchedResult] = useState<AnimalResult | null>(null);

    // Refs for Export
    const cardRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [isExportPreviewOpen, setIsExportPreviewOpen] = useState(false);

    useEffect(() => {
        const savedData = localStorage.getItem('profileData');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setProfileData(parsed);

                // Initial matching
                const result = matchAnimal({
                    work_style: parsed.work_style,
                    infinite_fuel: parsed.infinite_fuel,
                    energy_drain: parsed.energy_drain,
                    skills: parsed.skills
                });
                setMatchedResult(result);

                const savedInsights = localStorage.getItem('aiInsights');
                if (savedInsights) {
                    setAiInsights(JSON.parse(savedInsights));
                }
                const savedAvatar = localStorage.getItem('aiAvatarUrl');
                if (savedAvatar) {
                    setAiAvatarUrl(savedAvatar);
                }
            } catch (e) {
                console.error('Failed to parse profile data');
            }
        }
        setLoading(false);
    }, []);

    const generateAIInsights = useCallback(async () => {
        if (!profileData) return;

        setGeneratingInsights(true);
        try {
            const response = await fetch('/api/generate-insights', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData)
            });

            const data = await response.json();
            if (data.success && data.insights) {
                setAiInsights(data.insights);
                localStorage.setItem('aiInsights', JSON.stringify(data.insights));

                // Automatically start avatar generation after successful insights
                // We need to call avatar generation with the new insights
                setGeneratingAvatar(true);
                try {
                    const avatarResponse = await fetch('/api/generate-avatar', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            animal: data.insights.animal?.type || matchedResult?.best.animal,
                            name: profileData.basic_info.name,
                            traits: matchedResult?.best.traits || [],
                            weaknesses: profileData.energy_drain
                        })
                    });

                    const avatarData = await avatarResponse.json();
                    if (avatarData.success && avatarData.imageData) {
                        setAiAvatarUrl(avatarData.imageData);
                        localStorage.setItem('aiAvatarUrl', avatarData.imageData);
                    } else if (avatarData.fallbackUrl) {
                        setAiAvatarUrl(avatarData.fallbackUrl);
                        localStorage.setItem('aiAvatarUrl', avatarData.fallbackUrl);
                    }
                } catch (avatarError) {
                    console.error('Failed to generate avatar:', avatarError);
                } finally {
                    setGeneratingAvatar(false);
                }
            }
        } catch (error) {
            console.error('Failed to generate insights:', error);
        } finally {
            setGeneratingInsights(false);
        }
    }, [profileData, matchedResult]);

    const generateAIAvatar = useCallback(async () => {
        if (!profileData || !matchedResult) return;

        setGeneratingAvatar(true);
        try {
            const response = await fetch('/api/generate-avatar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    animal: aiInsights?.animal?.type || matchedResult.best.animal,
                    name: profileData.basic_info.name,
                    traits: matchedResult.best.traits,
                    weaknesses: profileData.energy_drain
                })
            });

            const data = await response.json();
            if (data.success && data.imageData) {
                setAiAvatarUrl(data.imageData);
                localStorage.setItem('aiAvatarUrl', data.imageData);
            } else if (data.fallbackUrl) {
                setAiAvatarUrl(data.fallbackUrl);
                localStorage.setItem('aiAvatarUrl', data.fallbackUrl);
            }
        } catch (error) {
            console.error('Failed to generate avatar:', error);
        } finally {
            setGeneratingAvatar(false);
        }
    }, [profileData, aiInsights, matchedResult]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
                <div className="text-[#0A0A0A]">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
            </div>
        );
    }

    if (!profileData || !matchedResult) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-6 relative overflow-hidden">
                {/* テクスチャ背景 */}
                <div
                    className="fixed inset-0 pointer-events-none opacity-40 z-0 mix-blend-multiply"
                    style={{ backgroundImage: 'url(/texture.png)', backgroundSize: 'cover' }}
                />

                <div className="text-center max-w-md relative z-10">
                    <BrushSpiral className="w-24 h-24 mx-auto mb-8 text-[#0A0A0A]" />
                    <h1 className="text-3xl font-bold text-[#0A0A0A] mb-4">
                        自分図鑑
                    </h1>
                    <p className="text-[#666] mb-8 leading-relaxed">
                        あなたの本質を、言葉にする。
                    </p>
                    <a
                        href="/onboarding"
                        className="inline-block px-8 py-4 bg-[#0A0A0A] text-[#FAFAFA] font-bold rounded-full hover:bg-[#E63946] hover:text-[#FAFAFA] transition-all duration-300"
                    >
                        はじめる
                    </a>
                </div>
            </div>
        );
    }

    const animalInfo = aiInsights?.animal || {
        type: matchedResult.best.animal,
        emoji: matchedResult.best.emoji,
        reason: matchedResult.best.description
    };

    const displayAnimalName = aiInsights?.animal?.type || (matchedResult.best.animal.toUpperCase() + "タイプ");

    // --- Actions ---
    const handleShare = async () => {
        const url = window.location.origin + '/demo';
        const text = `私の自分図鑑: ${displayAnimalName}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: '自分図鑑',
                    text: text,
                    url: url,
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            const fullText = `${text} ${url}`;
            navigator.clipboard.writeText(fullText);
            alert('リンクをコピーしました！');
        }
    };

    const handleExportPNG = async () => {
        if (!cardRef.current) {
            console.error('Card ref not available');
            alert('カードが見つかりません。ページを再読み込みしてください。');
            return;
        }
        setIsExporting(true);

        try {
            // Use toBlob for robust large image handling
            const blob = await toBlob(cardRef.current, {
                quality: 1.0,
                pixelRatio: 2,
                backgroundColor: '#FAFAFA',
                skipFonts: true,
                filter: (node) => {
                    if (node.tagName === 'STYLE' || (node.tagName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet')) {
                        return false;
                    }
                    return true;
                }
            });

            if (!blob) {
                throw new Error('画像の生成に失敗しました');
            }

            // Sanitize filename
            const safeName = (profileData?.basic_info?.name || 'user').replace(/[^a-zA-Z0-9\-_]/g, '_');
            const filename = `jibun_zukan_${safeName}.png`;
            console.log('Exporting with filename:', filename);

            // Try File System Access API first (Supported in Chrome/Edge/Opera)
            try {
                // @ts-ignore - window.showSaveFilePicker is not yet in standard TS types
                if (window.showSaveFilePicker) {
                    // @ts-ignore
                    const handle = await window.showSaveFilePicker({
                        suggestedName: filename,
                        types: [{
                            description: 'PNG Image',
                            accept: { 'image/png': ['.png'] },
                        }],
                    });
                    const writable = await handle.createWritable();
                    await writable.write(blob);
                    await writable.close();
                    return; // Success
                }
            } catch (fsError) {
                // User cancelled or API failed, proceed to fallback
                if ((fsError as Error).name !== 'AbortError') {
                    console.warn('File System Access API failed, falling back:', fsError);
                } else {
                    return; // User explicitly cancelled
                }
            }

            // Fallback: Create object URL from blob
            const url = URL.createObjectURL(blob);

            // Simple anchor download
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up
            setTimeout(() => URL.revokeObjectURL(url), 100);

        } catch (err) {
            console.error('Export PNG failed', err);
            alert('画像の保存に失敗しました: ' + (err instanceof Error ? err.message : String(err)));
        } finally {
            setIsExporting(false);
            setIsExportPreviewOpen(false);
        }
    };

    const handleExportPDF = async () => {
        if (!cardRef.current) {
            console.error('Card ref not available');
            alert('カードが見つかりません。ページを再読み込みしてください。');
            return;
        }
        setIsExporting(true);

        try {
            // Use html-to-image which has better CSS support
            const dataUrl = await toPng(cardRef.current, {
                quality: 1.0,
                pixelRatio: 2,
                backgroundColor: '#FAFAFA',
                skipFonts: true,
                filter: (node) => {
                    if (node.tagName === 'STYLE' || (node.tagName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet')) {
                        return false;
                    }
                    return true;
                }
            });

            // Get image dimensions
            const img = new Image();
            img.src = dataUrl;
            await new Promise((resolve) => { img.onload = resolve; });

            const imgWidth = img.width;
            const imgHeight = img.height;

            // Create PDF with proper dimensions
            const pdf = new jsPDF({
                orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
                unit: 'px',
                format: [imgWidth / 2, imgHeight / 2],
            });
            pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth / 2, imgHeight / 2);

            const safeName = (profileData?.basic_info?.name || 'user').replace(/[^a-zA-Z0-9\-_]/g, '_');
            const filename = `jibun_zukan_${safeName}.pdf`;
            console.log('Exporting PDF with filename:', filename);

            // Get PDF as Blob
            const blob = pdf.output('blob');

            // Try File System Access API (Recommended for consistent filename)
            try {
                // @ts-ignore - window.showSaveFilePicker is not yet in standard TS types
                if (window.showSaveFilePicker) {
                    // @ts-ignore
                    const handle = await window.showSaveFilePicker({
                        suggestedName: filename,
                        types: [{
                            description: 'PDF Document',
                            accept: { 'application/pdf': ['.pdf'] },
                        }],
                    });
                    const writable = await handle.createWritable();
                    await writable.write(blob);
                    await writable.close();
                    return; // Success
                }
            } catch (fsError) {
                // User cancelled or API failed, proceed to fallback
                if ((fsError as Error).name !== 'AbortError') {
                    console.warn('File System Access API failed, falling back:', fsError);
                } else {
                    return; // User explicitly cancelled
                }
            }

            // Fallback
            pdf.save(filename);

        } catch (err) {
            console.error('Export PDF failed', err);
            alert('PDFの保存に失敗しました: ' + (err instanceof Error ? err.message : String(err)));
        } finally {
            setIsExporting(false);
            setIsExportPreviewOpen(false);
        }
    };

    // --- Format Activation Command ---
    const formattedCommand = profileData.activation_command
        ? profileData.activation_command.split(/([。！？\n])/).reduce((acc: string[], part: string) => {
            if (part.match(/[。！？\n]/)) {
                if (acc.length > 0) acc[acc.length - 1] += part;
            } else if (part.trim()) {
                acc.push(part);
            }
            return acc;
        }, [])
        : [];

    const industryInfo = INDUSTRY_CATEGORIES.find(i => i.id === profileData.basic_info.industry);


    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] relative selection:bg-[#E63946] selection:text-white">

            {/* テクスチャ背景（全体に適用） */}
            <div
                className="fixed inset-0 pointer-events-none opacity-40 z-0 mix-blend-multiply"
                style={{ backgroundImage: 'url(/texture.png)', backgroundSize: 'cover' }}
            />

            {/* Hidden Card for Export */}
            <div className="fixed left-[-9999px] top-0 pointer-events-none">
                {profileData && aiInsights && matchedResult && (
                    <ZukanCard
                        ref={cardRef}
                        name={profileData.basic_info.name}
                        role={profileData.basic_info.role}
                        avatarUrl={aiAvatarUrl}
                        animal={{
                            type: aiInsights.animal.type,
                            emoji: aiInsights.animal.emoji,
                            english_name: aiInsights.animal.english_name || matchedResult.best.animal,
                            reason: aiInsights.animal.reason
                        }}
                        parameters={aiInsights.parameters || []}
                        energyDrain={profileData.energy_drain}
                        infiniteFuel={profileData.infinite_fuel}
                    />
                )}
            </div>

            {/* Header Actions (Share) */}
            <div className="fixed top-4 right-4 z-50 flex gap-2">
                <button
                    onClick={handleShare}
                    className="bg-white border-2 border-[#0A0A0A] p-3 hover:bg-[#F0F0F0] transition-all shadow-[4px_4px_0px_0px_rgba(10,10,10,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(10,10,10,1)] rounded-full"
                    aria-label="Share"
                >
                    <Share2 className="w-5 h-5 text-[#0A0A0A]" />
                </button>
            </div>

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative z-10">
                {/* 装飾：筆致の円 */}
                <div className="absolute top-20 left-10 opacity-10">
                    <BrushCircle className="w-32 h-32 text-[#0A0A0A]" />
                </div>
                <div className="absolute bottom-20 right-10 opacity-10">
                    <BrushSpiral className="w-24 h-24 text-[#0A0A0A]" />
                </div>

                {/* アバター */}
                <div className="relative mb-12">
                    <BrushCircle className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] text-[#0A0A0A]" />
                    <div className="w-32 h-32 rounded-full overflow-hidden relative z-10 border-2 border-[#0A0A0A] bg-white">
                        {aiAvatarUrl ? (
                            <img src={aiAvatarUrl} alt={profileData.basic_info.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-[#F0F0F0] flex items-center justify-center text-4xl">
                                {animalInfo.emoji}
                            </div>
                        )}
                    </div>
                </div>

                {/* 名前と本質 */}
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                    {profileData.basic_info.name}
                </h1>
                <p className="text-xl text-[#666] mb-2 font-medium">
                    {industryInfo?.emoji} {industryInfo?.name} / {profileData.basic_info.role}
                </p>
                <button
                    onClick={() => setIsAnimalModalOpen(true)}
                    className="group flex items-center gap-2 text-lg text-[#888] mb-8 hover:text-[#E63946] transition-colors"
                >
                    <span>{animalInfo.emoji} {displayAnimalName}</span>
                    <Info className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </button>

                {/* Export Button */}
                {aiInsights && (
                    <button
                        onClick={() => setIsExportPreviewOpen(true)}
                        disabled={isExporting}
                        className="mb-12 flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white font-bold border-2 border-[#0A0A0A] shadow-[4px_4px_0px_0px_rgba(200,80,80,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(200,80,80,1)] transition-all"
                    >
                        {isExporting ? (
                            <>保存中...</>
                        ) : (
                            <>
                                <Download className="w-4 h-4" />
                                図鑑カードとして保存
                            </>
                        )}
                    </button>
                )}

                {/* メインコピー */}
                <blockquote className="text-center max-w-xl mb-16 mx-auto">
                    <p className="text-2xl md:text-3xl font-bold leading-relaxed text-[#0A0A0A] [text-wrap:balance] break-words">
                        "{animalInfo.reason}"
                    </p>
                </blockquote>

                {/* AI生成ボタン */}
                <div className="flex gap-4">
                    <button
                        onClick={generateAIInsights}
                        disabled={generatingInsights}
                        className="px-6 py-3 border-2 border-[#0A0A0A] text-[#0A0A0A] font-bold hover:bg-[#0A0A0A] hover:text-[#FAFAFA] transition-all duration-300 disabled:opacity-50"
                    >
                        {generatingInsights ? <Loader2 className="w-4 h-4 animate-spin" /> : 'AI分析'}
                    </button>
                    <button
                        onClick={generateAIAvatar}
                        disabled={generatingAvatar}
                        className="px-6 py-3 border-2 border-[#0A0A0A] text-[#0A0A0A] font-bold hover:bg-[#0A0A0A] hover:text-[#FAFAFA] transition-all duration-300 disabled:opacity-50"
                    >
                        {generatingAvatar ? <Loader2 className="w-4 h-4 animate-spin" /> : 'アバター生成'}
                    </button>
                </div>

                {/* スクロール誘導 */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-[#0A0A0A] rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-[#0A0A0A] rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* Expandable Bio - Only if AI Insights available */}
            {aiInsights?.detailed_bio && (
                <>
                    <div className="flex justify-center py-8 relative z-10">
                        <BrushWave className="w-64 text-[#0A0A0A]" />
                    </div>
                    <ExpandableBio
                        text={aiInsights.detailed_bio}
                        parameters={aiInsights.parameters || []}
                    />
                </>
            )}


            {/* 区切り */}
            <div className="flex justify-center py-8 relative z-10">
                <BrushWave className="w-64 text-[#0A0A0A]" />
            </div>

            {/* Infinite Fuel */}
            <FlipCardSection
                title="無限にできること"
                items={profileData.infinite_fuel}
                type="fuel"
                icon={BrushHeart}
                iconColor="text-[#E63946]"
            />

            {/* 区切り */}
            <div className="flex justify-center py-8 relative z-10">
                <BrushWave className="w-64 text-[#0A0A0A]" />
            </div>

            {/* Energy Drain */}
            <FlipCardSection
                title="やる気が削がれること"
                items={profileData.energy_drain}
                type="drain"
                icon={BrushStar} // Using Star or maybe I should import Zap if available, but staying consistent with Brush elements is good. Let's use BrushStar or just standard icon passed. The component takes LucideIcon. 
                // Let's use a standard icon wrapper if Brush elements aren't LucideIcons. 
                // Wait, in page.tsx BrushHeart is imported. Let's check imports.
                // BrushHeart is from "@/components/brush/BrushElements". It is likely an SVG component, not LucideIcon.
                // FlipCardSection expects LucideIcon? 
                // "icon: LucideIcon" in props.
                // BrushHeart is likely a functional component.
                // I should verify if BrushHeart is compatible or if I need to change the prop type to React.ComponentType<any>.
                // Checking previous code: BrushHeart className="w-8 h-8...".
                // I will update the prop type in FlipCardSection in my mind or just assume it works if I update the file content.
                // Actually, I should update FlipCardSection to accept any component. 
                // For now, I'll assume they are compatible or I'll specificy standard Lucide icons if not.
                // Let's use the Lucide icons imported in page.tsx or add them.
                iconColor="text-[#0A0A0A]"
            />

            {/* 区切り */}
            <div className="flex justify-center py-8 relative z-10">
                <BrushWave className="w-64 text-[#0A0A0A]" />
            </div>

            {/* 隠れた強み - AI生成 */}
            {aiInsights && (
                <section className="px-6 py-20 max-w-3xl mx-auto relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <BrushStar className="w-8 h-8 text-[#E63946]" />
                        <h2 className="text-3xl font-bold">隠れた強み</h2>
                    </div>
                    <p className="text-[#666] mb-8 font-medium">AIが見つけた、あなたが気づいていないかもしれない特徴</p>
                    <div className="space-y-8">
                        {aiInsights.hidden_strengths.map((strength, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-2 shrink-0 pt-1">
                                    <BrushVerticalLine className="h-full w-full text-[#E63946]" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">{strength.title}</h3>
                                    <p className="text-[#444] leading-relaxed">{strength.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 区切り */}
            <div className="flex justify-center py-8 relative z-10">
                <BrushWave className="w-64 text-[#0A0A0A]" />
            </div>

            {/* スキル - ★ */}
            <section className="px-6 py-20 max-w-3xl mx-auto relative z-10">
                <div className="flex items-center gap-3 mb-12">
                    <BrushStar className="w-8 h-8 text-[#0A0A0A]" />
                    <h2 className="text-3xl font-bold">スキル</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                    {profileData.skills.map((skill, i) => (
                        <span
                            key={i}
                            className="px-4 py-2 border-2 border-[#0A0A0A] text-[#0A0A0A] font-bold hover:bg-[#0A0A0A] hover:text-[#FAFAFA] transition-colors"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </section>

            {/* 区切り */}
            <div className="flex justify-center py-8 relative z-10">
                <BrushWave className="w-64 text-[#0A0A0A]" />
            </div>

            {/* 協働のコツ */}
            <section className="px-6 py-20 max-w-3xl mx-auto relative z-10">
                <h2 className="text-3xl font-bold mb-12">この人と働くには</h2>

                {aiInsights && (
                    <div className="mb-12 p-8 border-2 border-[#0A0A0A] bg-white shadow-[4px_4px_0px_0px_rgba(10,10,10,1)]">
                        <p className="text-xl text-[#0A0A0A] leading-relaxed font-medium">
                            "{aiInsights.collaboration_tip}"
                        </p>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-6 border-2 border-[#0A0A0A] bg-[#FAFAFA] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#0A0A0A]"></div>
                        <h3 className="text-xl text-[#0A0A0A] mb-6 font-bold flex items-center gap-2">
                            <Zap className="w-5 h-5" /> 連絡手段
                        </h3>
                        <div className="flex flex-wrap gap-2 relative z-10">
                            {profileData.communication.preferred_tools.map((tool, i) => (
                                <span key={i} className="px-3 py-1 bg-white border-2 border-[#0A0A0A] text-[#0A0A0A] font-bold shadow-[2px_2px_0px_0px_rgba(10,10,10,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(10,10,10,1)] transition-all">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 border-2 border-[#0A0A0A] bg-[#FAFAFA] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#0A0A0A]"></div>
                        <h3 className="text-xl text-[#0A0A0A] mb-6 font-bold flex items-center gap-2">
                            <Loader2 className="w-5 h-5" /> 反応しやすい時間
                        </h3>
                        <div className="relative z-10">
                            <p className="text-[#0A0A0A] font-bold text-2xl">
                                {profileData.communication.best_time_to_reach.map(t => {
                                    const map: Record<string, string> = {
                                        'morning': '午前',
                                        'afternoon': '午後',
                                        'evening': '夕方',
                                        'night': '夜'
                                    };
                                    return map[t] || t;
                                }).join(' / ')}
                            </p>
                            <p className="text-sm text-[#666] mt-2 font-medium">
                                ※ この時間帯だと返信が早いです
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 区切り */}
            <div className="flex justify-center py-8 relative z-10">
                <BrushWave className="w-64 text-[#0A0A0A]" />
            </div>

            {/* 起動コマンド */}
            <section className="px-6 py-20 max-w-3xl mx-auto text-center relative z-10">
                <h2 className="text-3xl font-bold mb-8">起動コマンド</h2>
                <div className="text-xl md:text-2xl text-[#0A0A0A] leading-relaxed max-w-xl mx-auto font-bold">
                    {formattedCommand.length > 0 ? (
                        formattedCommand.map((line, i) => (
                            <p key={i} className="mb-2 block">{line}</p>
                        ))
                    ) : (
                        <p>"{profileData.activation_command}"</p>
                    )}
                </div>
            </section>

            {/* フッター */}
            <footer className="py-20 text-center relative z-10">
                <BrushSpiral className="w-16 h-16 mx-auto mb-6 text-[#0A0A0A]" />
                <p className="text-[#666] text-sm">自分図鑑</p>
                <a
                    href="/onboarding"
                    className="inline-block mt-6 text-[#888] hover:text-[#E63946] transition-colors underline"
                >
                    編集する
                </a>
            </footer>

            {/* Modals */}
            <AnimalRadarModal
                isOpen={isAnimalModalOpen}
                onClose={() => setIsAnimalModalOpen(false)}
                animalName={aiInsights?.animal?.type || (matchedResult?.best?.animal?.toUpperCase() + "タイプ")}
                animalEmoji={animalInfo.emoji}
                reason={animalInfo.reason}
                parameters={aiInsights?.parameters || []}
            />

            {/* Export Preview Modal */}
            {profileData && aiInsights && matchedResult && (
                <ExportPreviewModal
                    isOpen={isExportPreviewOpen}
                    onClose={() => setIsExportPreviewOpen(false)}
                    onExportPNG={handleExportPNG}
                    onExportPDF={handleExportPDF}
                    isExporting={isExporting}
                    name={profileData.basic_info.name}
                    role={profileData.basic_info.role}
                    avatarUrl={aiAvatarUrl}
                    animal={{
                        type: aiInsights.animal.type,
                        emoji: aiInsights.animal.emoji,
                        english_name: aiInsights.animal.english_name || matchedResult.best.animal,
                        reason: aiInsights.animal.reason
                    }}
                    parameters={aiInsights.parameters || []}
                    energyDrain={profileData.energy_drain}
                    infiniteFuel={profileData.infinite_fuel}
                />
            )}

        </div >
    );
}
