const fs = require('fs');
const path = require('path');

// CUID generator function to ensure valid IDs
const createCuid = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const segment = () => {
        let s = '';
        for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
        return s;
    };
    return 'c' + new Date().getTime().toString(36) + segment() + segment();
};

// Clean IDs for variables and blocks to avoid collision
const varChat = createCuid();
const varUser = createCuid();
const varAi = createCuid();

const typebot = {
    "version": "6.1",
    // New unique ID to avoid collision
    "id": createCuid(),
    "name": "AI Resume Interviewer (Sanitized)",
    // REMOVED workspaceId, publicId, folderId to allow clean import
    "events": [
        {
            "id": createCuid(),
            "type": "start",
            "outgoingEdgeId": "edge-1",
            "graphCoordinates": { "x": 0, "y": 0 }
        }
    ],
    "variables": [
        { "id": varChat, "name": "chat_history", "isSessionVariable": false },
        { "id": varUser, "name": "user_input", "isSessionVariable": false },
        { "id": varAi, "name": "ai_response", "isSessionVariable": false }
    ],
    "groups": [
        {
            "id": createCuid(),
            "title": "Initialization",
            "graphCoordinates": { "x": 0, "y": 0 },
            "blocks": [
                {
                    "id": createCuid(),
                    "type": "Set variable",
                    "options": {
                        "variableId": varUser,
                        "expressionToEvaluate": "面接開始",
                        "type": "Custom"
                    }
                },
                {
                    "id": createCuid(),
                    "type": "Set variable",
                    "options": {
                        "variableId": varChat,
                        "expressionToEvaluate": " ",
                        "type": "Custom"
                    }
                }
            ],
            "outgoingEdgeId": "edge-2"
        },
        {
            "id": createCuid(),
            "title": "AI Logic",
            "graphCoordinates": { "x": 400, "y": 0 },
            "blocks": [
                {
                    "id": createCuid(),
                    "type": "openai",
                    "options": {
                        // Empty credentials to force user to select theirs (avoids bad request)
                        "credentialsId": "",
                        "action": "Create chat completion",
                        "model": "gpt-4o",
                        "messages": [
                            {
                                "role": "system",
                                "content": "あなたは優秀なキャリアコーチAIです。\\nユーザーとの対話を通じて、以下の「履歴書作成に必要な11の情報」を全て引き出してください。\\n一度に全ての質問をせず、**1つずつ**順番に聞いてください。\\nユーザーの回答が抽象的だったり浅い場合は、**必ず「深掘り質問」を行って**、具体的なエピソードや数字を引き出してください。\\n\\n【必須回収項目リスト】\\n1. 基本情報（名前・現在の所属）\\n2. 所属の詳細（部署・役職・学年等）\\n3. スキル・資格・リンク\\n4. アピールしたいプロジェクト名（タイトル）\\n5. その活動での具体的な「成果」(数字を含めるよう促す)\\n6. 直面した「困難・壁」\\n7. その壁を乗り越えた「工夫・行動」(Action) ※最重要。詳細に聞く。\\n8. 経験からの「学び」と、自覚している「強み」\\n9. 無限に湧くやる気の源泉 (Infinite Fuel / いくらやっても疲れないこと)\\n10. やる気を削ぐ要因 (Energy Drain / 苦手な環境)\\n11. 自分をうまく扱うための「起動コマンド」(連携のコツ)\\n\\n【ルール】\\n- 口調は親しみやすく、かつプロフェッショナルに。\\n- 1回の発言で質問は1つまで。\\n- 全ての項目を聞き出し終えたら、最後に必ず「[COMPLETED]」という文字列を含めて終了の挨拶をしてください。"
                            },
                            {
                                "role": "user",
                                "content": `{{${varUser}}}`
                            }
                        ],
                        "responseMapping": [
                            { "variableId": varAi }
                        ]
                    }
                },
                {
                    "id": createCuid(),
                    "type": "Condition",
                    "items": [
                        {
                            "id": createCuid(),
                            "content": {
                                "comparisons": [
                                    {
                                        "variableId": varAi,
                                        "comparisonOperator": "Contains",
                                        "value": "[COMPLETED]"
                                    }
                                ]
                            },
                            "outgoingEdgeId": "edge-end"
                        }
                    ]
                }
            ],
            "outgoingEdgeId": "edge-3"
        },
        {
            "id": createCuid(),
            "title": "Chat UI",
            "graphCoordinates": { "x": 400, "y": 400 },
            "blocks": [
                {
                    "id": createCuid(),
                    "type": "text",
                    "content": {
                        "richText": [
                            { "type": "p", "children": [{ "text": `{{${varAi}}}` }] }
                        ]
                    }
                },
                {
                    "id": createCuid(),
                    "type": "text input",
                    "options": {
                        "labels": { "placeholder": "回答を入力..." },
                        "variableId": varUser,
                        "isLong": true
                    }
                }
            ],
            "outgoingEdgeId": "edge-4"
        },
        {
            "id": createCuid(),
            "title": "Update History",
            "graphCoordinates": { "x": 0, "y": 400 },
            "blocks": [
                {
                    "id": createCuid(),
                    "type": "Set variable",
                    "options": {
                        "variableId": varChat,
                        "expressionToEvaluate": `{{${varChat}}}\\nUser: {{${varUser}}}\\nAI: {{${varAi}}}`,
                        "type": "Custom"
                    }
                }
            ],
            "outgoingEdgeId": "edge-loop"
        },
        {
            "id": createCuid(),
            "title": "End",
            "graphCoordinates": { "x": 1000, "y": 0 },
            "blocks": [
                {
                    "id": createCuid(),
                    "type": "text",
                    "content": {
                        "richText": [
                            { "type": "p", "children": [{ "text": "インタビュー終了です！" }] }
                        ]
                    }
                }
            ]
        }
    ],
    "edges": [
        { "id": "edge-1", "from": { "eventId": typebot.events[0].id }, "to": { "groupId": typebot.groups[0].id, "blockId": typebot.groups[0].blocks[0].id } }, // Init
        { "id": "edge-2", "from": { "blockId": typebot.groups[0].blocks[1].id }, "to": { "groupId": typebot.groups[1].id, "blockId": typebot.groups[1].blocks[0].id } }, // AI
        { "id": "edge-3", "from": { "blockId": typebot.groups[1].blocks[1].id }, "to": { "groupId": typebot.groups[2].id, "blockId": typebot.groups[2].blocks[0].id } }, // UI
        { "id": "edge-4", "from": { "blockId": typebot.groups[2].blocks[1].id }, "to": { "groupId": typebot.groups[3].id, "blockId": typebot.groups[3].blocks[0].id } }, // History
        { "id": "edge-loop", "from": { "blockId": typebot.groups[3].blocks[0].id }, "to": { "groupId": typebot.groups[1].id, "blockId": typebot.groups[1].blocks[0].id } }, // Loop
        { "id": "edge-end", "from": { "blockId": typebot.groups[1].blocks[1].id, "itemId": typebot.groups[1].blocks[1].items[0].id }, "to": { "groupId": typebot.groups[4].id, "blockId": typebot.groups[4].blocks[0].id } } // End
    ]
};

const outFile = path.join(__dirname, 'typebot-resume-sanitized.json');
fs.writeFileSync(outFile, JSON.stringify(typebot, null, 2), 'utf8');
console.log("Written sanitized JSON");
