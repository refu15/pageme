"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // Mock login -> Go to onboarding
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50 text-center">

        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          AI Resume Builder
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          チャットで話すだけで、<br />
          あなたの強みが一目で伝わる履歴書が完成します。
        </p>

        <div className="space-y-4">
          <Button
            onClick={handleLogin}
            className="w-full h-12 text-lg font-medium bg-gray-900 hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
          >
            Googleで登録・ログイン
          </Button>

          <Button
            variant="ghost"
            onClick={() => router.push("/demo")}
            className="w-full text-gray-500"
          >
            デモページを見る <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          Powered by Next.js & Supabase & Typebot
        </p>
      </div>
    </div>
  );
}
