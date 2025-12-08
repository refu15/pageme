export default function Privacy() {
    return (
        <div className="container mx-auto px-4 py-16 md:px-6 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>

            <div className="space-y-6 text-sm md:text-base leading-relaxed text-slate-700">
                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">1. 個人情報の収集</h2>
                    <p>当方は、本サービスの提供にあたり、以下の個人情報を取得することがあります。</p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>LINEアカウント情報</li>
                        <li>お支払い情報（クレジットカード情報等は決済代行会社が管理します）</li>
                        <li>その他、本サービスの運営に必要な情報</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">2. 利用目的</h2>
                    <p>取得した個人情報は、以下の目的で利用します。</p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>本サービスの提供・運営のため</li>
                        <li>ユーザーサポートのため</li>
                        <li>重要なお知らせの通知のため</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">3. 第三者への提供</h2>
                    <p>法令に基づく場合を除き、あらかじめ本人の同意を得ることなく、第三者に個人情報を提供することはありません。</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">4. お問い合わせ</h2>
                    <p>個人情報の取り扱いに関するお問い合わせは、LINE公式アカウントまでお願いいたします。</p>
                </section>
            </div>
        </div>
    );
}
