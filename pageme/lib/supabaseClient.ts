import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    // 環境変数が設定されていない場合でもビルドは通るように警告のみにする（必須ならエラーにする）
    console.warn('Supabase URL or Anon Key is missing. Check your .env.local or Vercel Environment Variables.');
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
);
