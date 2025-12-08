import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    {/* Logo Mark */}
                    <div className="w-10 h-10 bg-[#F59E0B] flex items-center justify-center font-bold text-slate-900 text-xl rounded-sm">
                        米
                    </div>
                    {/* Logo Text */}
                    <div className="hidden md:block">
                        <span className="block text-lg font-bold leading-none tracking-tight">米沢・置賜特化</span>
                        <span className="block text-xs text-muted-foreground tracking-widest">入札案件AI秘書</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="#features" className="hover:text-primary transition-colors">機能・特徴</Link>
                    <Link href="#faq" className="hover:text-primary transition-colors">よくある質問</Link>
                    <div className="flex items-center gap-4 ml-4">
                        <Link
                            href="#pricing"
                            className="text-muted-foreground hover:text-foreground transition-colors text-xs"
                        >
                            料金プラン
                        </Link>
                        <Link
                            href="https://line.me/"
                            target="_blank"
                            className="inline-flex h-10 items-center justify-center rounded-full bg-slate-900 px-6 font-bold text-white transition-colors hover:bg-slate-700"
                        >
                            お問い合わせ
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Toggle (Simplified) */}
                <button className="md:hidden p-2">
                    <Menu className="h-6 w-6" />
                </button>
            </div>
        </header>
    );
}
