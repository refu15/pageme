const fs = require('fs');
const path = require('path');

const createCuid = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const segment = () => {
        let s = '';
        for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
        return s;
    };
    return 'c' + new Date().getTime().toString(36) + segment() + segment();
};

// 1. Create IDs first
const botId = createCuid();
const eventId = createCuid();

const grpInitId = createCuid();
const blkSetStartId = createCuid();
const blkInitHistId = createCuid();

const grpAiId = createCuid();
const blkOpenAiId = createCuid();
const blkCondId = createCuid();
const itemCompId = createCuid();

const grpUiId = createCuid();
const blkTextId = createCuid();
const blkInputId = createCuid();

const grpHistId = createCuid();
const blkHistUpdId = createCuid();

const grpEndId = createCuid();
const blkEndMsgId = createCuid();

const varChat = createCuid();
const varUser = createCuid();
const varAi = createCuid();

const edge1 = createCuid();
const edge2 = createCuid();
const edge3 = createCuid();
const edge4 = createCuid();
const edgeLoop = createCuid();
const edgeEnd = createCuid();

// 2. Construct Object
const typebot = {
    "version": "6.1",
    "id": botId,
    "name": "AI Resume Interviewer (Sanitized v2)",
    "events": [
        {
            "id": eventId,
            "type": "start",
            "outgoingEdgeId": edge1,
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
            "id": grpInitId,
            "title": "Initialization",
            "graphCoordinates": { "x": 0, "y": 0 },
            "blocks": [
                {
                    "id": blkSetStartId,
                    "type": "Set variable",
                    "options": {
                        "variableId": varUser,
                        "expressionToEvaluate": "面接開始",
                        "type": "Custom"
                    }
                },
                {
                    "id": blkInitHistId,
                    "type": "Set variable",
                    "options": {
                        "variableId": varChat,
                        "expressionToEvaluate": " ",
                        "type": "Custom"
                    }
                }
            ],
            "outgoingEdgeId": edge2
        },
        {
            "id": grpAiId,
            "title": "AI Logic",
            "graphCoordinates": { "x": 400, "y": 0 },
            "blocks": [
                {
                    "id": blkOpenAiId,
                    "type": "openai",
                    "options": {
                        "credentialsId": "", // Intentional empty string
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
                    "id": blkCondId,
                    "type": "Condition",
                    "items": [
                        {
                            "id": itemCompId,
                            "content": {
                                "comparisons": [
                                    {
                                        "variableId": varAi,
                                        "comparisonOperator": "Contains",
                                        "value": "[COMPLETED]"
                                    }
                                ]
                            },
                            "outgoingEdgeId": edgeEnd
                        }
                    ]
                }
            ],
            "outgoingEdgeId": edge3
        },
        {
            "id": grpUiId,
            "title": "Chat UI",
            "graphCoordinates": { "x": 400, "y": 400 },
            "blocks": [
                {
                    "id": blkTextId,
                    "type": "text",
                    "content": {
                        "richText": [
                            { "type": "p", "children": [{ "text": `{{${varAi}}}` }] }
                        ]
                    }
                },
                {
                    "id": blkInputId,
                    "type": "text input",
                    "options": {
                        "labels": { "placeholder": "回答を入力..." },
                        "variableId": varUser,
                        "isLong": true
                    }
                }
            ],
            "outgoingEdgeId": edge4
        },
        {
            "id": grpHistId,
            "title": "Update History",
            "graphCoordinates": { "x": 0, "y": 400 },
            "blocks": [
                {
                    "id": blkHistUpdId,
                    "type": "Set variable",
                    "options": {
                        "variableId": varChat,
                        "expressionToEvaluate": `{{${varChat}}}\\nUser: {{${varUser}}}\\nAI: {{${varAi}}}`,
                        "type": "Custom"
                    }
                }
            ],
            "outgoingEdgeId": edgeLoop
        },
        {
            "id": grpEndId,
            "title": "End",
            "graphCoordinates": { "x": 1000, "y": 0 },
            "blocks": [
                {
                    "id": blkEndMsgId,
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
        { "id": edge1, "from": { "eventId": eventId }, "to": { "groupId": grpInitId, "blockId": blkSetStartId } },
        { "id": edge2, "from": { "blockId": blkInitHistId }, "to": { "groupId": grpAiId, "blockId": blkOpenAiId } },
        { "id": edge3, "from": { "blockId": blkCondId }, "to": { "groupId": grpUiId, "blockId": blkTextId } },
        { "id": edge4, "from": { "blockId": blkInputId }, "to": { "groupId": grpHistId, "blockId": blkHistUpdId } },
        { "id": edgeLoop, "from": { "blockId": blkHistUpdId }, "to": { "groupId": grpAiId, "blockId": blkOpenAiId } },
        { "id": edgeEnd, "from": { "blockId": blkCondId, "itemId": itemCompId }, "to": { "groupId": grpEndId, "blockId": blkEndMsgId } }
    ]
};

const outFile = path.join(__dirname, 'typebot-resume-sanitized.json');
fs.writeFileSync(outFile, JSON.stringify(typebot, null, 2), 'utf8');
console.log("Written sanitized JSON v2");
