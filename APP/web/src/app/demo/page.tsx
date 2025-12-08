import LinePreview from "@/components/LinePreview";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DemoPage() {
    return (
        <main className="min-h-screen bg-slate-100 dark:bg-slate-900 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    トップページに戻る
                </Link>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold tracking-tight">あなたのLINEに、<br />毎朝こう届きます。</h1>
                        <p className="text-muted-foreground text-lg">
                            「詳細PDFを開く」を押す前に、参加資格があるか（ランク）、いつまでか（期限）、何をするか（要約）が分かります。
                        </p>
                        <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                            <h3 className="font-bold mb-4">UXのこだわり</h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li className="flex gap-2">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <span>
                                        <strong className="text-foreground">赤色のヘッダー:</strong>
                                        一番重要な「期限」と「ランク」を視線誘導で即座に認識させます。
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <span>
                                        <strong className="text-foreground">3行要約:</strong>
                                        専門用語を平易な言葉に変換し、パッと見で内容を把握できます。
                                    </span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-emerald-500 font-bold">✓</span>
                                    <span>
                                        <strong className="text-foreground">カレンダー登録:</strong>
                                        「いいな」と思ったらその場でスケジュールを押さえられます。
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="relative">
                            {/* Phone Frame Mockup (CSS only) */}
                            <div className="absolute -inset-4 bg-slate-800 rounded-[2.5rem] shadow-2xl -z-10 border-4 border-slate-700"></div>
                            <LinePreview />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
