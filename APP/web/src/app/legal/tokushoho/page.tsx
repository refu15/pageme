export default function Tokushoho() {
    return (
        <div className="container mx-auto px-4 py-16 md:px-6 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">特定商取引法に基づく表記</h1>
            <div className="prose prose-slate max-w-none">
                <table className="w-full text-left border-collapse">
                    <tbody>
                        <tr className="border-b">
                            <th className="py-4 font-bold w-1/3">販売業者</th>
                            <td className="py-4">米沢・置賜エリア建設業専用 AI秘書事務局<br />（運営：株式会社〇〇 / 代行：〇〇）</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-4 font-bold">代表責任者</th>
                            <td className="py-4">（実際の代表者名を記載）</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-4 font-bold">所在地</th>
                            <td className="py-4">〒992-0012 山形県米沢市金池5丁目（実際の住所を記載）</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-4 font-bold">電話番号</th>
                            <td className="py-4">0238-XX-XXXX（請求があれば遅滞なく開示いたします）</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-4 font-bold">メールアドレス</th>
                            <td className="py-4">support@example.com</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-4 font-bold">販売価格</th>
                            <td className="py-4">月額5,000円（税別）</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-4 font-bold">商品代金以外の必要料金</th>
                            <td className="py-4">消費税、インターネット接続料金、通信料金</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-4 font-bold">支払方法</th>
                            <td className="py-4">クレジットカード決済</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-4 font-bold">支払時期</th>
                            <td className="py-4">初回お申し込み時、および毎月1回の自動課金</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-4 font-bold">商品の引渡時期</th>
                            <td className="py-4">クレジットカード決済完了後、直ちにご利用いただけます。</td>
                        </tr>
                        <tr className="border-b">
                            <th className="py-4 font-bold">返品・交換・キャンセル等</th>
                            <td className="py-4">デジタルコンテンツの性質上、返品・返金はお受けできません。<br />解約はいつでも可能です。次回決済日の前日までにLINE公式アカウントのメニューよりお手続きください。</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
