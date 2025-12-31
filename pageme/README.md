# AI Resume Generator (Pageme)

**AIとの「壁打ち」だけで、最強の履歴書を。**
Next.js, Supabase, Typebot, n8n を組み合わせた、モダンでインテリジェントな履歴書生成アプリケーション。

## プロジェクト概要
従来のフォーム入力式の履歴書作成とは異なり、チャットボット（Typebot）との自然な会話を通じて、ユーザーの強みや経験を引き出し、**「Nano Banana (Nano Banana)」** スタイルのモダンな履歴書ページを自動生成します。

### 主要機能
- **AI Wall-bashing (壁打ち)**: Typebotによるインタビュー形式のデータ収集。
- **Modern UI**: ゲームUIのようなキャラクターカードと、洗練されたタイムライン履歴書。
- **UX Psychology**: 「労働の錯覚」や「ピーク・エンドの法則」を応用した、満足度の高い体験設計。

## 技術スタック
- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide React, Shadcn/UI
- **Backend (BaaS)**: Supabase (Auth, Database, Storage)
- **Chat Interface**: Typebot (Embed)
- **Workflow Automation**: n8n (Webhook processing, LLM integration)

## セットアップ手順

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 環境変数の設定
`.env.local` ファイルを作成し、以下の変数を設定してください（Supabase連携用）。
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 開発サーバーの起動
```bash
npm run dev
```
ブラウザで `http://localhost:3000` にアクセスします。

## ページ構成
- `/`: ランディングページ & ログイン
- `/onboarding`: Typebotによるチャット入力画面
- `/demo`: 生成された履歴書のプレビュー（モックアップ）

## UXデザイン原則の適用
本アプリでは、以下の心理学効果を意図的に組み込んでいます。
- **労働の錯覚 (Labor Illusion)**: 生成待ち時間にプロセスを表示し、価値を感じさせる。
- **美的ユーザビリティ効果**: 美しいデザインで、使いやすさと信頼感を向上。
- **Nano Banana UI**: シンプルかつ愛着の湧く（Lovable）キャラクターデザイン。

## 今後の拡張 (Roadmap)
- [ ] n8n Webhookとの完全な接続
- [ ] 編集機能の実装（生成後の手直し）
- [ ] PDFエクスポート機能

---
Developed with Next.js & Generative AI.
