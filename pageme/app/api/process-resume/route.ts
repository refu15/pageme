import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        const { chatHistory, resultId } = await request.json();

        if (!chatHistory) {
            return NextResponse.json({ error: 'chatHistory is required' }, { status: 400 });
        }

        // Step 1: Extract structured data using OpenAI
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.3,
            messages: [
                {
                    role: 'system',
                    content: `あなたはインタビュー記録から情報を抽出するAIです。
以下の会話履歴から、指定された11項目を抽出し、JSON形式で出力してください。
該当する情報がない場合は空文字列""を入れてください。
出力形式（JSONのみ、説明不要）:
{
  "name": "名前",
  "affiliation": "所属",
  "role_detail": "役割詳細",
  "skills": ["スキル1", "スキル2"],
  "project_name": "プロジェクト名",
  "achievement": "成果（数字含む）",
  "challenge": "困難",
  "action": "工夫・行動",
  "learning_strength": "学び・強み",
  "infinite_fuel": "無限にできること",
  "energy_drain": "やる気が削がれること",
  "activation_command": "起動コマンド"
}`
                },
                {
                    role: 'user',
                    content: `会話履歴:\n${chatHistory}`
                }
            ]
        });

        // Step 2: Parse the AI response
        let resumeData;
        const aiContent = completion.choices[0]?.message?.content || '';

        try {
            let jsonStr = aiContent;
            if (aiContent.includes('```json')) {
                jsonStr = aiContent.split('```json')[1].split('```')[0].trim();
            } else if (aiContent.includes('```')) {
                jsonStr = aiContent.split('```')[1].split('```')[0].trim();
            }
            resumeData = JSON.parse(jsonStr);
        } catch {
            resumeData = { raw: aiContent, parseError: true };
        }

        // Step 3: Save to Supabase
        const { data, error } = await supabase
            .from('profiles')
            .upsert({
                id: resultId || `temp-${Date.now()}`,
                resume_data: resumeData,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'id'
            });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            resumeData,
            message: 'Resume data saved successfully'
        });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({
            error: 'Internal server error'
        }, { status: 500 });
    }
}
