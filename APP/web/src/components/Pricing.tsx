import { Check } from "lucide-react";

export default function Pricing() {
    return (
        <section id="pricing" className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                        1日160円で、
                        <br />
                        年間数百万円の機会損失を防ぐ。
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
                        事務員を雇うより圧倒的に安く、確実です。
                        <br />
                        まずは月額5,000円のスタンダードプランから。
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <div className="rounded-xl border border-border bg-card text-card-foreground shadow-lg overflow-hidden relative">
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                            POPULAR
                        </div>
                        <div className="p-6 md:p-8">
                            <h3 className="text-2xl font-bold">スタンダードプラン</h3>
                            <div className="mt-4 flex items-baseline text-5xl font-extrabold tracking-tight">
                                ¥5,000
                                <span className="ml-1 text-xl font-medium text-muted-foreground">/月 (税別)</span>
                            </div>
                            <p className="mt-4 text-muted-foreground">
                                米沢・置賜エリアの全入札情報をAIが毎朝お届けします。
                            </p>

                            <ul className="mt-8 space-y-4">
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-emerald-500 mr-2" />
                                    <span>毎朝7時のLINE通知</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-emerald-500 mr-2" />
                                    <span>AIによる「3行要約」</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-emerald-500 mr-2" />
                                    <span>参加ランク・期限の自動抽出</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-emerald-500 mr-2" />
                                    <span>Googleカレンダー登録リンク</span>
                                </li>
                                <li className="flex items-center">
                                    <Check className="h-5 w-5 text-emerald-500 mr-2" />
                                    <span>随意契約・見積合わせ情報</span>
                                </li>
                            </ul>

                            <div className="mt-8">
                                <button className="w-full rounded-md bg-primary py-3 text-center text-sm font-bold text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors">
                                    今すぐ申し込む
                                </button>
                                <p className="mt-4 text-xs text-center text-muted-foreground">
                                    ※いつでも解約可能です。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
