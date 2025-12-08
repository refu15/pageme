import { User, Bot } from "lucide-react";

export default function Comparison() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4 text-slate-900">
                        情報のチェックは、<br /><span className="text-[#F59E0B]">AIにお任せください。</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        役所のホームページ確認は、意外と手間がかかる作業です。<br />
                        AIを活用することで、コストを抑えながら確実な情報収集が可能になります。
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-end">
                    {/* Cost A: Human */}
                    <div className="bg-white rounded-xl p-8 border-2 border-dashed border-slate-300 relative opacity-90 transition-opacity">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                            担当者様が行う場合
                        </div>
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
                                <User className="w-10 h-10 text-slate-500" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-center mb-2">手作業でのチェック</h3>
                        <ul className="space-y-2 text-sm text-slate-600 mb-6">
                            <li>• 毎朝の確認作業が必要</li>
                            <li>• 他の業務への影響</li>
                            <li>• 見落としの心配</li>
                        </ul>
                        <div className="text-center border-t border-slate-200 pt-6">
                            <p className="text-sm font-bold text-slate-500 mb-1">想定コスト（人件費など）</p>
                            <p className="text-2xl font-bold text-slate-700">数万円<span className="text-sm">〜 /月</span></p>
                        </div>
                    </div>

                    {/* Cost B: AI */}
                    <div className="bg-white rounded-xl p-8 border-4 border-[#F59E0B] relative shadow-xl transform scale-105">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-slate-900 px-6 py-2 rounded-full text-base font-bold shadow-lg">
                            AI秘書にお任せ
                        </div>
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-[#F59E0B]/20 rounded-full flex items-center justify-center">
                                <Bot className="w-10 h-10 text-[#F59E0B]" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-center mb-2">AIによる自動通知</h3>
                        <ul className="space-y-2 text-sm text-slate-600 mb-6">
                            <li className="font-bold text-slate-900">✓ 一瞬で全案件をチェック</li>
                            <li className="font-bold text-slate-900">✓ 24時間365日稼働</li>
                            <li className="font-bold text-slate-900">✓ 必要な時だけ利用可能</li>
                        </ul>
                        <div className="text-center border-t border-slate-200 pt-6 bg-slate-50 -mx-8 -mb-8 pb-8 rounded-b-xl">
                            <p className="text-sm font-bold text-slate-500 mb-1 pt-4">月額利用料</p>
                            <p className="text-4xl font-extrabold text-[#D32F2F]">
                                5,000<span className="text-xl text-slate-900">円</span>
                            </p>
                            <p className="text-xs text-slate-500 font-medium mt-2">※飲み会 1回分程度のコストです</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
