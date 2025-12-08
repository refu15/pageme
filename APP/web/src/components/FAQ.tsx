export default function FAQ() {
    return (
        <section id="faq" className="py-16 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter mb-4 text-foreground">よくあるご質問</h2>
                    <p className="text-muted-foreground">サービスの導入に関する疑問にお答えします。</p>
                </div>

                <div className="space-y-4">
                    <FAQItem
                        question="Q. 毎月5,000円の費用対効果は？"
                        answer="事務スタッフの方が入札情報を毎日チェックする場合、時間コストがかかります。AIであれば、月額5,000円（1日換算で約160円）で、毎朝確実に見落としなく情報をお届けできます。業務効率化のツールとしてご検討ください。"
                    />
                    <FAQItem
                        question="Q. これまで入札をしたことがないのですが？"
                        answer="これから入札を始めたい方にも最適です。「どのような工事が、どのくらいの金額で出ているか」という相場観を養うだけでも、今後の営業活動の参考になります。まずは情報の収集から始めてみてはいかがでしょうか。"
                    />
                    <FAQItem
                        question="Q. もし案件情報が少なかったら？"
                        answer="そのための「1ヶ月無料体験」をご用意しております。実際に使ってみて、お客様の事業に役立つ情報が少ないと感じられた場合は、無料期間中にLINEをブロックしていただければ費用は一切かかりません。"
                    />
                    <FAQItem
                        question="Q. 通知される情報の種類は？"
                        answer="米沢市・南陽市・周辺の自治体が公表する「建設」「土木」「舗装」「管工事」「設備」などの入札・見積合わせ情報が中心です。物品購入など、建設に関連しない情報はAIが自動的に除外します。"
                    />
                </div>
            </div>
        </section>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    return (
        <div className="border-b border-border">
            <details className="group">
                <summary className="flex justify-between items-start font-bold cursor-pointer list-none py-6 text-foreground transition-colors hover:text-primary">
                    <span className="text-lg">{question}</span>
                    <span className="transition ml-4 group-open:rotate-180 flex-none text-muted-foreground">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                </summary>
                <div className="text-muted-foreground pb-6 leading-relaxed">
                    {answer}
                </div>
            </details>
        </div>
    );
}
