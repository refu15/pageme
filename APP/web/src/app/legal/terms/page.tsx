export default function Terms() {
    return (
        <div className="container mx-auto px-4 py-16 md:px-6 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">利用規約</h1>

            <div className="space-y-6 text-sm md:text-base leading-relaxed text-slate-700">
                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">第1条（はじめに）</h2>
                    <p>この利用規約（以下「本規約」）は、AI秘書事務局（以下「当方」）が提供する「米沢・置賜エリア建設業専用 AI秘書」（以下「本サービス」）の利用条件を定めるものです。</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">第2条（サービス内容）</h2>
                    <p>本サービスは、米沢市等の自治体が公表する入札情報をAIが収集・要約し、LINE等の手段を用いて利用者に通知するサービスです。</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">第3条（利用料金）</h2>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>月額料金：5,000円（税別）</li>
                        <li>支払方法：クレジットカード決済</li>
                        <li>当方は、利用者の承諾を得ることなく料金を変更できるものとします。</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">第4条（免責事項）</h2>
                    <p>当方は、本サービスの提供する情報の正確性や完全性を保証するものではありません。本情報の利用により生じた損害について、当方は一切の責任を負いません。入札への参加可否等の最終確認は、必ず発注機関の公式サイトにて利用者ご自身で行ってください。</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">第5条（サービスの停止）</h2>
                    <p>当方は、システム保守や天災などのやむを得ない事由により、予告なくサービスを停止することがあります。</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">第6条（解約）</h2>
                    <p>利用者は、所定の手続きを行うことでいつでも本サービスを解約できます。日割り計算による返金は行いません。</p>
                </section>
            </div>
        </div>
    );
}
