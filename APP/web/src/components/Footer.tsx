import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-2">
                        <div className="font-bold text-white text-xl mb-4">米沢・置賜エリア建設業専用 AI秘書</div>
                        <p className="text-sm">
                            地元の入札情報を、もっと身近に。<br />
                            AIの力で、建設業の皆様の機会損失をゼロにします。
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-4">サービス</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/#features" className="hover:text-white transition">機能紹介</Link></li>
                            <li><Link href="/#pricing" className="hover:text-white transition">料金プラン</Link></li>
                            <li><Link href="/#faq" className="hover:text-white transition">よくある質問</Link></li>
                            <li><Link href="/demo" className="hover:text-white transition">デモ画面</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-4">法的情報</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/legal/terms" className="hover:text-white transition">利用規約</Link></li>
                            <li><Link href="/legal/privacy" className="hover:text-white transition">プライバシーポリシー</Link></li>
                            <li><Link href="/legal/tokushoho" className="hover:text-white transition">特定商取引法に基づく表記</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 text-center text-xs">
                    <p>&copy; {new Date().getFullYear()} Yonezawa AI Secretary. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
