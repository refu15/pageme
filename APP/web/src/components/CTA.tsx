import { ShieldCheck, Smartphone } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute right-0 top-0 w-64 h-64 bg-[#F59E0B] rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute left-0 bottom-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        「自分に合わない」と思ったら、<br />
                        <span className="text-[#F59E0B]">すぐに通知を停止</span>できます。
                    </h2>

                    <p className="text-xl text-slate-300 leading-relaxed">
                        解約の手続きや、引き止めの電話は一切ありません。<br />
                        LINEをブロックするだけで完了します。安心して無料体験をお試しください。
                    </p>

                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl inline-block text-left mb-8">
                        <div className="flex items-start gap-4">
                            <ShieldCheck className="w-8 h-8 text-[#F59E0B] flex-none" />
                            <div>
                                <p className="font-bold text-lg mb-1">1ヶ月間の無料体験</p>
                                <p className="text-sm text-slate-300">
                                    まずは1ヶ月、実際の情報を受け取ってみてください。<br />
                                    「役に立つ」と実感できた場合のみ、継続してご利用ください。
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href="https://line.me/"
                            className="inline-flex h-16 items-center justify-center rounded-full bg-[#06C755] px-10 text-xl font-bold text-white shadow-lg transition-all hover:bg-[#05b34c] hover:scale-105 animate-pulse"
                        >
                            <Smartphone className="mr-2 w-6 h-6" />
                            LINEで友だち追加（無料）
                        </Link>
                        <p className="text-sm text-slate-400">
                            ※ クレジットカード登録は不要です
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
