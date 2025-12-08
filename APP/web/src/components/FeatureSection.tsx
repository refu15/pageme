import LinePreview from "@/components/LinePreview";

export default function FeatureSection() {
    return (
        <section id="features" className="py-16 md:py-24 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">
                        毎朝7時、スマホに<br />
                        必要な情報だけが届きます。
                    </h2>
                    <p className="text-muted-foreground mt-4 text-lg">
                        面倒な仕様書の確認はAIがサポート。<br />
                        お客様は、届いた情報をチェックするだけです。
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                    {/* Left Column: Explanation */}
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="flex-none w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                                1
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-slate-900">「ランク」と「期限」が一目で分かる</h3>
                                <p className="text-muted-foreground">
                                    参加資格（ランク）と入札期限は最も重要な情報です。AIがこれらを抽出し、分かりやすく赤字で表示します。
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-none w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                2
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-slate-900">AIによる「やさしい要約」</h3>
                                <p className="text-muted-foreground">
                                    専門用語が多い仕様書を、AIが分かりやすい言葉で要約。「どこで」「何をする」工事なのか、3行読むだけで内容がつかめます。
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-none w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                                3
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-slate-900">カレンダーにワンタッチ登録</h3>
                                <p className="text-muted-foreground">
                                    気になる案件は、その場でGoogleカレンダー等に登録可能。スケジュールの管理もスムーズに行えます。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Preview */}
                    <div className="flex justify-center md:justify-end">
                        <div className="relative transform scale-90 md:scale-100 transition-transform hover:scale-105 duration-500">
                            <div className="absolute -inset-4 bg-slate-800 rounded-[2.5rem] shadow-2xl -z-10 border-4 border-slate-700"></div>
                            {/* Blurring effect behind the phone */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-blue-500/20 blur-[100px] -z-20 rounded-full"></div>
                            <LinePreview />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
