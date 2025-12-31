const fs = require('fs');
const path = require('path');

const typebot = {
    "version": "6.1",
    "id": "cmjljgb810003kz04gulqv310",
    "name": "AI Resume Interviewer (v9 Success Pattern)",
    "events": [
        {
            "id": "pugjk93zusob5vz8n5fc7xwa",
            "outgoingEdgeId": "elyk9ksq8g4fktgrz7ux2me5",
            "graphCoordinates": { "x": 0, "y": 0 },
            "type": "start"
        }
    ],
    "groups": [
        {
            "id": "kdo91f5ag4imh6mjh5ue62zv",
            "title": "chat_history",
            "graphCoordinates": { "x": 316.67, "y": -36.65 },
            "blocks": [
                {
                    "id": "lgy1qv3yey5y2u4da6a7wnw3",
                    "outgoingEdgeId": "ecumankx5s9hd2e80f3386eo",
                    "type": "Set variable",
                    "options": { "variableId": "vnxqw2piysac9i1w4xbu3uvbe" }
                }
            ]
        },
        {
            "id": "n48t7dlujw4juz6y40snwnqa",
            "title": "user_input",
            "graphCoordinates": { "x": 700.67, "y": -31.32 },
            "blocks": [
                {
                    "id": "i6nfaz7ua5gi97wh9vsypebf",
                    "outgoingEdgeId": "rwsiuixxkjtj4tuh0job2dlz",
                    "type": "Set variable",
                    "options": {
                        "variableId": "vm51gu804a0xavs8rzkyg5kqc",
                        "expressionToEvaluate": "入力開始",
                        "type": "Custom"
                    }
                }
            ]
        },
        {
            "id": "lj8u7as6e2pzc3y03ydcz25s",
            "title": "ai_response",
            "graphCoordinates": { "x": 1090, "y": -38.66 },
            "blocks": [
                {
                    "id": "cqrbrodvtsn2aj1lf1uc6sj6",
                    "outgoingEdgeId": "qxud0y07y7iwhpxszdc94pbu",
                    "type": "Set variable",
                    "options": { "variableId": "vbl4vqdmldrmmzuzlllmgn3c5" }
                }
            ]
        },
        {
            "id": "quhdt55280rjrnaoph6mgpr7",
            "title": "ChatGPT",
            "graphCoordinates": { "x": 1508.96, "y": -39.62 },
            "blocks": [
                {
                    "id": "oo7to1lnyiq8m1xects4wnd6",
                    "outgoingEdgeId": "yhz70ir988qo0tfsg7wtuidn",
                    "type": "openai",
                    "options": {
                        "credentialsId": "cmjljlu0w0007jp048y964wl8",
                        "action": "Create chat completion",
                        "model": "gpt-4o",
                        "messages": [
                            {
                                "role": "Dialogue",
                                "dialogueVariableId": "vnxqw2piysac9i1w4xbu3uvbe"
                            },
                            {
                                "role": "system",
                                "content": "あなたは優秀なキャリアコーチAIです。\\nユーザーとの対話を通じて、以下の「履歴書作成に必要な11の情報」を全て引き出してください。\\n一度に全ての質問をせず、**1つずつ**順番に聞いてください。\\nユーザーの回答が抽象的だったり浅い場合は、**必ず「深掘り質問」を行って**、具体的なエピソードや数字を引き出してください。\\n\\n【必須回収項目リスト】\\n1. 基本情報（名前・現在の所属）\\n2. 所属の詳細（部署・役職・学年等）\\n3. スキル・資格・リンク\\n4. アピールしたいプロジェクト名（タイトル）\\n5. その活動での具体的な「成果」(数字を含めるよう促す)\\n6. 直面した「困難・壁」\\n7. その壁を乗り越えた「工夫・行動」(Action) ※最重要。詳細に聞く。\\n8. 経験からの「学び」と、自覚している「強み」\\n9. 無限に湧くやる気の源泉 (Infinite Fuel / いくらやっても疲れないこと)\\n10. やる気を削ぐ要因 (Energy Drain / 苦手な環境)\\n11. 自分をうまく扱うための「起動コマンド」(連携のコツ)\\n\\n【ルール】\\n- 口調は親しみやすく、かつプロフェッショナルに。\\n- 1回の発言で質問は1つまで。\\n- 全ての項目を聞き出し終えたら、最後に必ず「[COMPLETED]」という文字列を含めて終了の挨拶をしてください。"
                            }
                            // Removed extra User message because 'Dialogue' role likely handles input context
                        ],
                        "responseMapping": [
                            { "variableId": "vbl4vqdmldrmmzuzlllmgn3c5" }
                        ]
                    }
                }
            ]
        },
        {
            "id": "o4hmfb3ru6caszxmd26jjbiq",
            "title": "出力結果",
            "graphCoordinates": { "x": 1530.7, "y": 236.35 },
            "blocks": [
                {
                    "id": "vja6niwupffv4ivrr93wc7kx",
                    "outgoingEdgeId": "nctazvbpubs8g0tf9ubkwd64",
                    "type": "text",
                    "content": {
                        "richText": [
                            { "type": "p", "children": [{ "text": "{{ai_response}}" }] }
                        ]
                    }
                }
            ]
        },
        {
            "id": "jdda526o1p988213miswnj1m",
            "title": "Group #7",
            "graphCoordinates": { "x": 1096.03, "y": 236.68 },
            "blocks": [
                {
                    "id": "ejzx8iy2qqcfyj6i6oft8gvl",
                    "outgoingEdgeId": "en9s37r87jexphgi5iolafua",
                    "type": "text input",
                    "options": {
                        "labels": { "placeholder": "追加で入力してください" },
                        "variableId": "vm51gu804a0xavs8rzkyg5kqc",
                        "isLong": true
                    }
                }
            ]
        },
        {
            "id": "rf1bq5mbgd7hfdxwez1p5x1w",
            "title": "条件分岐",
            "graphCoordinates": { "x": 1923.35, "y": 52.64 },
            "blocks": [
                {
                    "id": "t4ql7pbiinaqey72f8c8at72",
                    "outgoingEdgeId": "xu6bnv58ajnvnze8lemqejhs",
                    "type": "Condition",
                    "items": [
                        {
                            "id": "az1wceoguqbo0wp8pidhcedg",
                            "outgoingEdgeId": "g3of92jb8r8nz41ne34fsd6l",
                            "content": {
                                "comparisons": [
                                    {
                                        "variableId": "vbl4vqdmldrmmzuzlllmgn3c5",
                                        "comparisonOperator": "Contains",
                                        "value": "[COMPLETED]"
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        {
            "id": "ua5curbls67plyiwhfz2gjhr",
            "title": "end",
            "graphCoordinates": { "x": 2446.73, "y": 163.35 },
            "blocks": [
                {
                    "id": "cykt5l4rgq5d2m29lp2shqc2",
                    "type": "text",
                    "content": {
                        "richText": [
                            { "type": "p", "children": [{ "text": "入力は完了です！" }] },
                            { "type": "p", "children": [{ "text": "ありがとうございました！" }] }
                        ]
                    }
                }
            ]
        }
    ],
    "edges": [
        { "id": "elyk9ksq8g4fktgrz7ux2me5", "from": { "eventId": "pugjk93zusob5vz8n5fc7xwa" }, "to": { "groupId": "kdo91f5ag4imh6mjh5ue62zv", "blockId": "lgy1qv3yey5y2u4da6a7wnw3" } },
        { "id": "ecumankx5s9hd2e80f3386eo", "from": { "blockId": "lgy1qv3yey5y2u4da6a7wnw3" }, "to": { "groupId": "n48t7dlujw4juz6y40snwnqa" } },
        { "id": "rwsiuixxkjtj4tuh0job2dlz", "from": { "blockId": "i6nfaz7ua5gi97wh9vsypebf" }, "to": { "groupId": "lj8u7as6e2pzc3y03ydcz25s" } },
        { "id": "qxud0y07y7iwhpxszdc94pbu", "from": { "blockId": "cqrbrodvtsn2aj1lf1uc6sj6" }, "to": { "groupId": "quhdt55280rjrnaoph6mgpr7", "blockId": "oo7to1lnyiq8m1xects4wnd6" } },
        { "id": "nctazvbpubs8g0tf9ubkwd64", "from": { "blockId": "vja6niwupffv4ivrr93wc7kx" }, "to": { "groupId": "jdda526o1p988213miswnj1m", "blockId": "ejzx8iy2qqcfyj6i6oft8gvl" } },
        { "id": "en9s37r87jexphgi5iolafua", "from": { "blockId": "ejzx8iy2qqcfyj6i6oft8gvl" }, "to": { "groupId": "quhdt55280rjrnaoph6mgpr7", "blockId": "oo7to1lnyiq8m1xects4wnd6" } },
        { "id": "yhz70ir988qo0tfsg7wtuidn", "from": { "blockId": "oo7to1lnyiq8m1xects4wnd6" }, "to": { "groupId": "rf1bq5mbgd7hfdxwez1p5x1w", "blockId": "t4ql7pbiinaqey72f8c8at72" } },
        { "id": "xu6bnv58ajnvnze8lemqejhs", "from": { "blockId": "t4ql7pbiinaqey72f8c8at72" }, "to": { "groupId": "o4hmfb3ru6caszxmd26jjbiq", "blockId": "vja6niwupffv4ivrr93wc7kx" } },
        { "id": "g3of92jb8r8nz41ne34fsd6l", "from": { "blockId": "t4ql7pbiinaqey72f8c8at72", "itemId": "az1wceoguqbo0wp8pidhcedg" }, "to": { "groupId": "ua5curbls67plyiwhfz2gjhr" } }
    ],
    "variables": [
        { "id": "vbl4vqdmldrmmzuzlllmgn3c5", "name": "ai_response", "isSessionVariable": false },
        { "id": "vm51gu804a0xavs8rzkyg5kqc", "name": "user_input", "isSessionVariable": false },
        { "id": "vnxqw2piysac9i1w4xbu3uvbe", "name": "chat_history", "isSessionVariable": false }
    ],
    "theme": {},
    "settings": { "general": { "isBrandingEnabled": true } }
};

const outFile = path.join(__dirname, 'typebot-resume-v9.json');
fs.writeFileSync(outFile, JSON.stringify(typebot, null, 2), 'utf8');
console.log("Written typebot-resume-v9.json");
