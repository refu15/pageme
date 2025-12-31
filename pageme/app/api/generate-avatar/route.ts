import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: NextRequest) {
    try {
        const { animal, name, traits, weaknesses } = await request.json();

        // Gemini Imagen モデルで画像生成
        const prompt = generateImagePrompt(animal, traits, weaknesses);

        // Gemini 2.0 Flash の画像生成機能を使用
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-exp',
            generationConfig: {
                responseModalities: ['Text', 'Image']
            } as any
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;

        // レスポンスからBase64画像を抽出
        let imageBase64 = null;
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if ((part as any).inlineData?.mimeType?.startsWith('image/')) {
                imageBase64 = (part as any).inlineData.data;
                break;
            }
        }

        if (imageBase64) {
            return NextResponse.json({
                success: true,
                imageData: `data:image/png;base64,${imageBase64}`
            });
        } else {
            // 画像生成に失敗した場合のフォールバック
            return NextResponse.json({
                success: false,
                fallbackUrl: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${animal}-${name}&backgroundColor=b6e3f4,c0aede,d1d4f9`
            });
        }
    } catch (error) {
        console.error('Image generation error:', error);
        return NextResponse.json({
            success: false,
            fallbackUrl: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=default&backgroundColor=b6e3f4`
        });
    }
}

function generateImagePrompt(animal: string, traits: string[], weaknesses: string[]): string {
    const weaknessText = weaknesses?.slice(0, 3).join('、') || '細かい作業、急な変更';

    return `
この人が苦手なことを頑張っている動物のイラストを生成してください。

## 動物の種類
${animal}

## この人が苦手なこと
${weaknessText}

## 画像の要件
- この動物が「${weaknessText}」という苦手なことに挑戦している様子
- 苦手なことをがんばっているけど、ちょっと困っている、戸惑っている表情
- 例：整理整頓が苦手なら散らかった部屋で困っている、締め切りが苦手なら時計を見て焦っている

## スタイル
- ちょっとブサイクだけどかわいい感じ
- 不格好だけど愛嬌がある
- 目がちょっと離れていたり、顔のバランスが少しおかしい
- でも憎めない、愛おしくなるような表情
- 丸みを帯びたぽってりした体型
- パステルカラーで柔らかい雰囲気
- シンプルでゆるい線

## フォーマット
- 正方形、プロフィールアバター用
- 白または淡いグラデーション背景
- 高品質
`;
}

