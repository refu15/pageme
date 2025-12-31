const fs = require('fs');
const path = require('path');

// Helper to ensure safe strings
const safePrompt = [
    "あなたは優秀なキャリアコーチAIです。",
    "以下はこれまでの会話履歴です：",
    "---",
    "{{chat_history}}",
    "---",
    "",
    "この履歴を踏まえて、ユーザーの次の発言（User Input）に対して応答してください。",
    "",
    "【面接ルール】",
    "1. 質問は必ず**1回につき1つ**だけにする。",
    "2. 履歴情報に基づき、ユーザーの回答が抽象的なら「深掘り質問」をする。",
    "3. 以下の必須項目を全て回収するまで会話を続ける。",
    "",
    "【必須回収項目】",
    "1. 基本情報（名前・所属）",
    "2. 役割詳細",
    "3. スキル・資格",
    "4. プロジェクト名",
    "5. 成果 (数字で)",
    "6. 困難",
    "7. 工夫・行動 (Action)",
    "8. 学び・強み",
    "9. 無限にできること (Infinite Fuel)",
    "10. やる気が削がれること (Energy Drain)",
    "11. 起動コマンド",
    "",
    "【終了条件】",
    "全項目を聞き出し終えたら、最後に `[COMPLETED]` と出力してください。"
].join("\\n");

const typebot = {
    "version": "6.1",
    "id": "typebot-resume-v8",
    "name": "AI Resume Interviewer (v8 Safe)",
    "events": [
        {
            "id": "ev-start-v8",
            "type": "start",
            "outgoingEdgeId": "edge-1-v8",
            "graphCoordinates": { "x": 0, "y": 0 }
        }
    ],
    "variables": [
        { "id": "var-chat_hist-v8", "name": "chat_history" },
        { "id": "var-user_input-v8", "name": "user_input" },
        { "id": "var-ai_resp-v8", "name": "ai_response" }
    ],
    "groups": [
        {
            "id": "grp-init-v8",
            "title": "Initialization",
            "graphCoordinates": { "x": 0, "y": 0 },
            "blocks": [
                {
                    "id": "blk-set-start-v8",
                    "type": "Set variable",
                    "options": {
                        "variableId": "var-user_input-v8",
                        "expressionToEvaluate": "面接開始",
                        "type": "Custom"
                    }
                },
                {
                    "id": "blk-init-history-v8",
                    "type": "Set variable",
                    "options": {
                        "variableId": "var-chat_hist-v8",
                        "expressionToEvaluate": " ",
                        "type": "Custom"
                    }
                }
            ],
            "outgoingEdgeId": "edge-2-v8"
        },
        {
            "id": "grp-ai-v8",
            "title": "AI Logic",
            "graphCoordinates": { "x": 400, "y": 0 },
            "blocks": [
                {
                    "id": "blk-openai-v8",
                    "type": "openai",
                    "options": {
                        "credentialsId": "",
                        "action": "Create chat completion",
                        "model": "gpt-4o",
                        "messages": [
                            {
                                "role": "system",
                                "content": safePrompt
                            },
                            {
                                "role": "user",
                                "content": "{{user_input}}"
                            }
                        ],
                        "responseMapping": [
                            {
                                "variableId": "var-ai_resp-v8"
                            }
                        ]
                    }
                },
                {
                    "id": "blk-cond-v8",
                    "type": "Condition",
                    "items": [
                        {
                            "id": "item-completed-v8",
                            "content": {
                                "comparisons": [
                                    {
                                        "variableId": "var-ai_resp-v8",
                                        "comparisonOperator": "Contains",
                                        "value": "[COMPLETED]"
                                    }
                                ]
                            },
                            "outgoingEdgeId": "edge-end-v8"
                        }
                    ]
                }
            ],
            "outgoingEdgeId": "edge-3-v8"
        },
        {
            "id": "grp-ui-v8",
            "title": "Chat UI",
            "graphCoordinates": { "x": 400, "y": 400 },
            "blocks": [
                {
                    "id": "blk-text-v8",
                    "type": "text",
                    "content": {
                        "richText": [
                            { "type": "p", "children": [{ "text": "{{ai_response}}" }] }
                        ]
                    }
                },
                {
                    "id": "blk-input-v8",
                    "type": "text input",
                    "options": {
                        "labels": { "placeholder": "回答を入力..." },
                        "variableId": "var-user_input-v8",
                        "isLong": true
                    }
                }
            ],
            "outgoingEdgeId": "edge-4-v8"
        },
        {
            "id": "grp-hist-v8",
            "title": "Update History",
            "graphCoordinates": { "x": 0, "y": 400 },
            "blocks": [
                {
                    "id": "blk-upd-v8",
                    "type": "Set variable",
                    "options": {
                        "variableId": "var-chat_hist-v8",
                        "expressionToEvaluate": "{{chat_history}}\\nUser: {{user_input}}\\nAI: {{ai_response}}",
                        "type": "Custom"
                    }
                }
            ],
            "outgoingEdgeId": "edge-loop-v8"
        },
        {
            "id": "grp-end-v8",
            "title": "End",
            "graphCoordinates": { "x": 1000, "y": 0 },
            "blocks": [
                {
                    "id": "blk-finish-v8",
                    "type": "text",
                    "content": {
                        "richText": [
                            { "type": "p", "children": [{ "text": "インタビュー終了です！履歴書生成に進みます。" }] }
                        ]
                    }
                }
            ]
        }
    ],
    "edges": [
        { "id": "edge-1-v8", "from": { "eventId": "ev-start-v8" }, "to": { "groupId": "grp-init-v8", "blockId": "blk-set-start-v8" } },
        { "id": "edge-2-v8", "from": { "blockId": "blk-init-history-v8" }, "to": { "groupId": "grp-ai-v8", "blockId": "blk-openai-v8" } },
        { "id": "edge-3-v8", "from": { "blockId": "blk-cond-v8" }, "to": { "groupId": "grp-ui-v8", "blockId": "blk-text-v8" } },
        { "id": "edge-4-v8", "from": { "blockId": "blk-input-v8" }, "to": { "groupId": "grp-hist-v8", "blockId": "blk-upd-v8" } },
        { "id": "edge-loop-v8", "from": { "blockId": "blk-upd-v8" }, "to": { "groupId": "grp-ai-v8", "blockId": "blk-openai-v8" } },
        { "id": "edge-end-v8", "from": { "blockId": "blk-cond-v8", "itemId": "item-completed-v8" }, "to": { "groupId": "grp-end-v8", "blockId": "blk-finish-v8" } }
    ]
};

const outFile = path.join(__dirname, 'typebot-resume-v8.json');
fs.writeFileSync(outFile, JSON.stringify(typebot, null, 2), 'utf8');

// Verification check
try {
    const raw = fs.readFileSync(outFile, 'utf8');
    JSON.parse(raw);
    console.log("SUCCESS: JSON is valid.");
} catch (e) {
    console.error("ERROR: JSON invalid:", e.message);
}
