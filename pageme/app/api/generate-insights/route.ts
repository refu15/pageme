import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { calculateParameterScores } from '@/lib/data/parameter-scoring';

// Gemini APIキーを環境変数から取得
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const profileData = await request.json();

        // パラメータスコアを計算（決定論的ロジック）
        const calculatedParameters = calculateParameterScores(profileData);

        // プロフィールデータからプロンプトを生成
        const prompt = generateInsightsPrompt(profileData, calculatedParameters);

        // Gemini APIで分析
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // JSONをパース
        const insights = parseInsightsResponse(text);

        // 重要: 計算されたパラメータでAIの出力を上書き
        insights.parameters = calculatedParameters;

        return NextResponse.json({
            success: true,
            insights: insights
        });
    } catch (error) {
        console.error('Gemini API Error:', error);
        return NextResponse.json(
            { success: false, error: 'AIの分析に失敗しました' },
            { status: 500 }
        );
    }
}

function generateInsightsPrompt(profile: any, parameters: any[]): string {
    const paramString = parameters.map(p => `- ${p.label}: ${p.value}`).join('\n');

    return `
あなたは洞察力に優れた心理学者かつキャリアコンサルタントです。
以下のプロフィール情報と、事前に算出された「性格パラメータ」から、ユーザーの本質を最もよく表す「動物」を選定し、性格を分析してください。

## 動物選定のルール
- 定番の動物（犬、猫、ライオン）だけでなく、**300種類以上の多様な動物**（ハシビロコウ、カモノハシ、キツネザル、マグロ、ミツバチ、クジラ、ナマケモノ、ラーテルなど）から選んでください。
- **以下の性格パラメータ数値を強く反映した動物**を選んでください。
  ${paramString}

## プロフィール情報
### 基本情報
- 名前: ${profile.basic_info?.name || '不明'}
- 業種: ${profile.basic_info?.industry || '不明'}
- 役職: ${profile.basic_info?.role || '不明'}

### スキル
${(profile.skills || []).join(', ') || '不明'}

### 働き方スタイル
- 時間帯: ${profile.work_style?.time_preference || 3} (1=朝型, 5=夜型)
- コミュニケーション: ${profile.work_style?.communication_preference || 3} (1=非同期, 5=同期)
- 意思決定: ${profile.work_style?.decision_style || '不明'}

### Infinite Fuel（無限にできること）
${(profile.infinite_fuel || []).join(', ') || '不明'}

### Energy Drain（やる気が削がれること）
${(profile.energy_drain || []).join(', ') || '不明'}

### ストレスサイン
${(profile.communication?.stress_signs || []).join(', ') || '不明'}

## 出力形式 (JSONのみ)
{
    "animal": {
        "type": "動物名（日本語）",
        "emoji": "動物の絵文字",
        "english_name": "動物名（英語）",
        "reason": "選定理由（一言で、キャッチーに）。例：『嵐の中でも動じない不動の哲学者』"
    },
    "parameters": [
        { "label": "論理性", "value": 0-100の数値 },
        { "label": "行動力", "value": 0-100の数値 },
        { "label": "協調性", "value": 0-100の数値 },
        { "label": "独創性", "value": 0-100の数値 },
        { "label": "自律性", "value": 0-100の数値 },
        { "label": "柔軟性", "value": 0-100の数値 }
    ],
    "hidden_strengths": [
        { "title": "強み1タイトル", "description": "説明" },
        { "title": "強み2タイトル", "description": "説明" },
        { "title": "強み3タイトル", "description": "説明" }
    ],
    "work_advice": "アドバイス（100文字以内）",
    "collaboration_tip": "協働のコツ（80文字以内）",
    "detailed_bio": "詳細なプロフィール文章（300文字程度）。詩的で魅力的な表現を使ってください。"
}
`;
}

function parseInsightsResponse(text: string): any {
    try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error('No valid JSON found');
    } catch (error) {
        console.error('Failed to parse insights:', error);
        return {
            animal: {
                type: 'キツネ',
                emoji: '🦊',
                english_name: 'Fox',
                reason: 'あらゆる状況に即座に適応する、現代のトリックスター'
            },
            parameters: [
                { label: "論理性", value: 70 },
                { label: "行動力", value: 60 },
                { label: "協調性", value: 50 },
                { label: "独創性", value: 80 },
                { label: "柔軟性", value: 90 }
            ],
            hidden_strengths: [
                { title: '適応力', description: '状況に応じて柔軟に対応できる能力を持っています' }
            ],
            work_advice: 'あなたの直感を信じて行動することで、より良い結果を得られるでしょう',
            collaboration_tip: 'ある程度の自由度を持たせると、最高のパフォーマンスを発揮します',
            detailed_bio: '柔軟な思考と高い適応力を持ち、どんな環境でも自分の役割を見つけることができます。新しいことへの挑戦を楽しみ、直感的なひらめきで問題を解決へと導く、まさに現代の開拓者といえるでしょう。'
        };
    }
}
