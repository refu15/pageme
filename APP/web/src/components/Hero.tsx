import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center bg-slate-50 overflow-hidden">
            {/* Background Image Area (Right Side on Desktop, Top on Mobile) */}
            <div className="absolute inset-0 md:bg-transparent">
                {/* Mobile layout: Image takes top half usually handled by layout */}
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center h-full pt-20 md:pt-0">
                {/* Text Content */}
                <div className="order-2 md:order-1 space-y-8">
                    <div className="inline-block px-4 py-2 bg-[#F59E0B] text-slate-900 font-bold text-sm tracking-wider transform -skew-x-12">
                        <span className="not-italic block transform skew-x-12">米沢・置賜エリア建設業専用</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                        このまちの<br />
                        <span className="relative inline-block z-10">
                            <span className="absolute inset-x-0 bottom-1 h-4 bg-[#F59E0B]/50 -z-10 transform -rotate-1"></span>
                            入札情報
                        </span>
                        を、もっと身近に。
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-lg">
                        毎朝7時、地元の入札情報がLINEに届きます。<br />
                        「探す手間」も「読む時間」も、AIがお手伝いします。<br />
                        <span className="text-sm mt-2 block opacity-70">（月額5,000円 / 1ヶ月無料体験 / いつでも解約可能）</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link
                            href="https://line.me/"
                            className="inline-flex h-14 items-center justify-center rounded-none bg-slate-900 px-8 text-lg font-bold text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl transform hover:-translate-y-1"
                        >
                            LINEで無料で試してみる
                        </Link>
                        <Link
                            href="/demo"
                            className="inline-flex h-14 items-center justify-center rounded-none border-2 border-slate-900 text-slate-900 px-8 text-lg font-bold transition-all hover:bg-slate-100"
                        >
                            実際の画面を見る
                        </Link>
                    </div>

                    <p className="text-xs text-muted-foreground">
                        ※面倒な登録作業は一切ありません。LINEで友だち追加するだけ。
                    </p>
                </div>

                {/* Hero Image */}
                <div className="order-1 md:order-2 relative h-[300px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl skew-y-0">
                    {/* Image Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 md:hidden"></div>
                    <Image
                        src="/hero.png"
                        alt="Construction Manager checking smartphone in Yonezawa"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Floating Badge (Visual Proof) */}
                    <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur shadow-lg p-4 rounded-lg hidden md:block max-w-xs border-l-4 border-[#F59E0B]">
                        <p className="text-xs font-bold text-slate-500 mb-1">本日の成果</p>
                        <p className="text-sm font-bold text-slate-900">
                            「おっ、大手の隙間案件が出てるな…<br />これならウチでも取れそうだ」
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative Strip */}
            <div className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-[#F59E0B] to-slate-900"></div>
        </section>
    );
}
