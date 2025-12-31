const fs = require('fs');
const path = require('path');

// Helper to generate CUID-like IDs (lowercase alphanumeric, 25 chars)
const createId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 25; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

// Variables
const varChatHistoryId = createId();
const varUserInputId = createId();
const varAiResponseId = createId();

// Block IDs
const blockSetStartId = createId();
const blockInitHistoryId = createId();
const blockOpenAIId = createId();
const blockConditionId = createId();
const blockAiMsgId = createId();
const blockUserMsgId = createId();
const blockAppendHistId = createId();
const blockEndMsgId = createId();

// Group IDs
const groupInitId = createId();
const groupAiId = createId();
const groupChatId = createId();
const groupUpdateHistId = createId();
const groupEndId = createId();

// Event IDs
const eventStartId = createId();

// Item IDs (for conditions)
const itemCompletedId = createId();

// Edges
const edge1 = createId();
const edge2 = createId();
const edge3 = createId();
const edge4 = createId();
const edgeLoop = createId();
const edgeEnd = createId();

const typebotData = {
    version: "6.1",
    id: createId(),
    name: "AI Resume Interviewer (v4)",
    events: [
        {
            id: eventStartId,
            type: "start",
            outgoingEdgeId: edge1,
            graphCoordinates: { x: 0, y: 0 }
        }
    ],
    variables: [
        { id: varChatHistoryId, name: "chat_history" },
        { id: varUserInputId, name: "user_input" },
        { id: varAiResponseId, name: "ai_response" }
    ],
    groups: [
        {
            id: groupInitId,
            title: "Initialization",
            graphCoordinates: { x: 200, y: 0 },
            blocks: [
                {
                    id: blockSetStartId,
                    type: "Set variable",
                    options: {
                        variableId: varUserInputId,
                        expressionToEvaluate: "面接開始",
                        type: "Custom"
                    }
                },
                {
                    id: blockInitHistoryId,
                    type: "Set variable",
                    options: {
                        variableId: varChatHistoryId,
                        expressionToEvaluate: " ",
                        type: "Custom"
                    }
                }
            ],
            outgoingEdgeId: edge2
        },
        {
            id: groupAiId,
            title: "AI Processing",
            graphCoordinates: { x: 600, y: 0 },
            blocks: [
                {
                    id: blockOpenAIId,
                    type: "openai",
                    options: {
                        action: "Create chat completion",
                        model: "gpt-4o",
                        messages: [
                            {
                                role: "system",
                                content: `あなたは優秀なキャリアコーチAIです。
以下はこれまでの会話履歴です：
---
{{${varChatHistoryId}}}
---

この履歴を踏まえて、ユーザーの次の発言（User Input）に対して応答してください。

【面接ルール】
1. 質問は必ず**1回につき1つ**だけにする。
2. 履歴情報に基づき、ユーザーの回答が抽象的なら「深掘り質問」をする。
3. 以下の必須項目を全て回収するまで会話を続ける。

【必須回収項目】
1. 基本情報（名前・所属）
2. 役割詳細
3. スキル・資格
4. プロジェクト名
5. 成果 (数字で)
6. 困難
7. 工夫・行動 (Action)
8. 学び・強み
9. 無限にできること (Infinite Fuel)
10. やる気が削がれること (Energy Drain)
11. 起動コマンド

【終了条件】
全項目を聞き出し終えたら、最後に \`[COMPLETED]\` と出力してください。`
                            },
                            {
                                role: "user",
                                content: `{{${varUserInputId}}}`
                            }
                        ],
                        responseMapping: [
                            {
                                variableId: varAiResponseId
                            }
                        ]
                    }
                },
                {
                    id: blockConditionId,
                    type: "Condition",
                    items: [
                        {
                            id: itemCompletedId,
                            content: {
                                comparisons: [
                                    {
                                        variableId: varAiResponseId,
                                        comparisonOperator: "Contains",
                                        value: "[COMPLETED]"
                                    }
                                ]
                            },
                            outgoingEdgeId: edgeEnd
                        }
                    ]
                }
            ],
            outgoingEdgeId: edge3
        },
        {
            id: groupChatId,
            title: "Chat & Input",
            graphCoordinates: { x: 600, y: 400 },
            blocks: [
                {
                    id: blockAiMsgId,
                    type: "text",
                    content: {
                        richText: [
                            { type: "p", children: [{ text: `{{${varAiResponseId}}}` }] }
                        ]
                    }
                },
                {
                    id: blockUserMsgId,
                    type: "text-input",
                    options: {
                        labels: { placeholder: "回答を入力..." },
                        variableId: varUserInputId,
                        isLong: true
                    }
                }
            ],
            outgoingEdgeId: edge4
        },
        {
            id: groupUpdateHistId,
            title: "History Logic",
            graphCoordinates: { x: 200, "y": 400 },
            blocks: [
                {
                    id: blockAppendHistId,
                    type: "Set variable",
                    options: {
                        variableId: varChatHistoryId,
                        expressionToEvaluate: `{{${varChatHistoryId}}}\nUser: {{${varUserInputId}}}\nAI: {{${varAiResponseId}}}`,
                        type: "Custom"
                    }
                }
            ],
            outgoingEdgeId: edgeLoop
        },
        {
            id: groupEndId,
            title: "End",
            graphCoordinates: { x: 1200, y: 0 },
            blocks: [
                {
                    id: blockEndMsgId,
                    type: "text",
                    content: {
                        richText: [
                            { type: "p", children: [{ text: "ありがとうございました！履歴書を作成します。" }] }
                        ]
                    }
                }
            ]
        }
    ],
    edges: [
        { id: edge1, from: { eventId: eventStartId }, to: { groupId: groupInitId, blockId: blockSetStartId } },
        { id: edge2, from: { blockId: blockInitHistoryId }, to: { groupId: groupAiId, blockId: blockOpenAIId } },
        { id: edge3, from: { blockId: blockConditionId }, to: { groupId: groupChatId, blockId: blockAiMsgId } },
        { id: edge4, from: { blockId: blockUserMsgId }, to: { groupId: groupUpdateHistId, blockId: blockAppendHistId } },
        { id: edgeLoop, from: { blockId: blockAppendHistId }, to: { groupId: groupAiId, blockId: blockOpenAIId } },
        { id: edgeEnd, from: { blockId: blockConditionId, itemId: itemCompletedId }, to: { groupId: groupEndId, blockId: blockEndMsgId } }
    ]
};

console.log(JSON.stringify(typebotData, null, 2));
