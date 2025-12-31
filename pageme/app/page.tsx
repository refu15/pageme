// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BrushSpiral } from "@/components/brush/BrushElements"; // Assuming this exists or using Sparkles as backup
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    const redirectTo = `${window.location.origin}/profile`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('Login failed:', error);
      alert('ログインに失敗しました: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] relative overflow-hidden">
      {/* Texture Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0 mix-blend-multiply"
        style={{ backgroundImage: 'url(/texture.png)', backgroundSize: 'cover' }}
      />

      <div className="max-w-md w-full relative z-10 p-8 text-center">

        <div className="mb-8 flex justify-center">
          {/* Keeping it simple and monochrome like demo page */}
          <BrushSpiral className="w-24 h-24 text-[#0A0A0A]" />
        </div>

        <h1 className="text-3xl font-bold text-[#0A0A0A] mb-4">
          自分図鑑
        </h1>
        <p className="text-[#666] mb-10 leading-relaxed">
          チャットで話すだけで、<br />
          あなたの強みが一目で伝わる履歴書が完成します。
        </p>

        <div className="space-y-4">
          <Button
            onClick={handleLogin}
            className="w-full h-12 text-lg font-bold bg-[#0A0A0A] text-[#FAFAFA] hover:bg-[#E63946] hover:text-[#FAFAFA] transition-all duration-300 rounded-full shadow-lg"
          >
            Googleで登録・ログイン
          </Button>

          <Button
            variant="ghost"
            onClick={() => router.push("/demo")}
            className="w-full text-[#666] hover:text-[#0A0A0A] hover:bg-transparent"
          >
            デモページを見る <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <p className="mt-12 text-xs text-[#999]">
          Powered by Next.js & Supabase & Gemini
        </p>
      </div>
    </div>
  );
}
