import Link from "next/link";

export default function Onboarding() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-slate-900 text-white py-12 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">ご利用の流れ</h1>
                    <p className="text-slate-300">お申し込みから配信開始までの3ステップ</p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-12">
                    {/* Step 1 */}
                    <div className="flex gap-6 md:gap-8">
                        <div className="flex-none w-12 h-12 md:w-16 md:h-16 bg-[#F59E0B] text-white rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold font-mono">1</div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold mb-4">LINEで友だち追加</h2>
                            <p className="text-slate-600 mb-4">
                                まずは「1ヶ月無料体験」を始めるために、公式LINEアカウントを友だち追加してください。<br />
                                面倒なメールアドレス登録やパスワード設定は不要です。
                            </p>
                            <Link href="https://line.me/" className="inline-block bg-[#06C755] text-white font-bold px-6 py-3 rounded-md hover:opacity-90 transition">
                                公式LINEを友だち追加する
                            </Link>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-6 md:gap-8">
                        <div className="flex-none w-12 h-12 md:w-16 md:h-16 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold font-mono">2</div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold mb-4">通知設定（エリア選択など）</h2>
                            <p className="text-slate-600">
                                お住まいの地域や、通知を受け取りたいキーワード（例：「舗装」「解体」など）をLINEのメニューから設定します。<br />
                                設定はいつでも変更可能です。
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-6 md:gap-8">
                        <div className="flex-none w-12 h-12 md:w-16 md:h-16 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold font-mono">3</div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold mb-4">配信スタート</h2>
                            <p className="text-slate-600">
                                翌日の朝7時から、あなたにぴったりの入札情報が届き始めます。<br />
                                気になる案件があれば、詳細リンクから市のホームページを確認しましょう。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-12">
                <Link href="/" className="text-slate-500 hover:text-slate-900 underline">
                    トップページに戻る
                </Link>
            </div>
        </div>
    );
}
