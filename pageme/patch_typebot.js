const fs = require('fs');

// The user's JSON from Step 281
const baseJson = {
    "version": "6.1",
    "id": "cmjljgb810003kz04gulqv310",
    "name": "AI Resume Interviewer (Fixed)",
    "events": [{ "id": "pugjk93zusob5vz8n5fc7xwa", "outgoingEdgeId": "elyk9ksq8g4fktgrz7ux2me5", "graphCoordinates": { "x": 0, "y": 0 }, "type": "start" }],
    "groups": [
        { "id": "kdo91f5ag4imh6mjh5ue62zv", "title": "chat_history", "graphCoordinates": { "x": 316.67, "y": -36.65 }, "blocks": [{ "id": "lgy1qv3yey5y2u4da6a7wnw3", "outgoingEdgeId": "ecumankx5s9hd2e80f3386eo", "type": "Set variable", "options": { "variableId": "vnxqw2piysac9i1w4xbu3uvbe" } }] },
        { "id": "n48t7dlujw4juz6y40snwnqa", "title": "user_input", "graphCoordinates": { "x": 700.67, "y": -31.32 }, "blocks": [{ "id": "i6nfaz7ua5gi97wh9vsypebf", "outgoingEdgeId": "rwsiuixxkjtj4tuh0job2dlz", "type": "Set variable", "options": { "variableId": "vm51gu804a0xavs8rzkyg5kqc", "expressionToEvaluate": "入力開始", "type": "Custom" } }] },
        { "id": "lj8u7as6e2pzc3y03ydcz25s", "title": "ai_response", "graphCoordinates": { "x": 1090, "y": -38.66 }, "blocks": [{ "id": "cqrbrodvtsn2aj1lf1uc6sj6", "outgoingEdgeId": "qxud0y07y7iwhpxszdc94pbu", "type": "Set variable", "options": { "variableId": "vbl4vqdmldrmmzuzlllmgn3c5" } }] },
        {
            "id": "quhdt55280rjrnaoph6mgpr7", "title": "ChatGPT", "graphCoordinates": { "x": 1508.96, "y": -39.62 },
            "blocks": [{
                "id": "oo7to1lnyiq8m1xects4wnd6", "outgoingEdgeId": "yhz70ir988qo0tfsg7wtuidn", "type": "openai",
                "options": {
                    "credentialsId": "cmjljlu0w0007jp048y964wl8", "action": "Create chat completion", "model": "gpt-4o",
                    "messages": [
                        // MODIFIED: Explicitly use System with history + User input
                        { "role": "system", "content": "あなたは優秀なキャリアコーチAIです。\n以下はこれまでの会話履歴です：\n---\n{{chat_history}}\n---\n\nこの履歴を踏まえて、ユーザーの次の発言（User Input）に対して応答してください。\n\n【面接ルール】\n1. 質問は必ず**1回につき1つ**だけにする。\n2. 履歴情報に基づき、ユーザーの回答が抽象的なら「深掘り質問」をする。\n3. 以下の必須項目を全て回収するまで会話を続ける。\n\n【必須回収項目】\n1. 基本情報（名前・所属）\n2. 役割詳細\n3. スキル・資格\n4. プロジェクト名\n5. 成果 (数字で)\n6. 困難\n7. 工夫・行動 (Action)\n8. 学び・強み\n9. 無限にできること (Infinite Fuel)\n10. やる気が削がれること (Energy Drain)\n11. 起動コマンド\n\n【終了条件】\n全項目を聞き出し終えたら、最後に `[COMPLETED]` と出力してください。" },
                        { "role": "user", "content": "{{user_input}}" }
                    ],
                    "responseMapping": [{ "variableId": "vbl4vqdmldrmmzuzlllmgn3c5" }]
                }
            }]
        },
        { "id": "o4hmfb3ru6caszxmd26jjbiq", "title": "出力結果", "graphCoordinates": { "x": 1530.7, "y": 236.35 }, "blocks": [{ "id": "vja6niwupffv4ivrr93wc7kx", "outgoingEdgeId": "nctazvbpubs8g0tf9ubkwd64", "type": "text", "content": { "richText": [{ "id": "rkFGRuFder", "type": "p", "children": [{ "text": "{{ai_response}}" }] }] } }] },
        { "id": "jdda526o1p988213miswnj1m", "title": "Group #7", "graphCoordinates": { "x": 1096.03, "y": 236.68 }, "blocks": [{ "id": "ejzx8iy2qqcfyj6i6oft8gvl", "outgoingEdgeId": "edge-input-to-hist", "type": "text input", "options": { "labels": { "placeholder": "追加で入力してください" }, "variableId": "vm51gu804a0xavs8rzkyg5kqc", "isLong": true } }] },
        { "id": "rf1bq5mbgd7hfdxwez1p5x1w", "title": "条件分岐", "graphCoordinates": { "x": 1923.35, "y": 52.64 }, "blocks": [{ "id": "t4ql7pbiinaqey72f8c8at72", "outgoingEdgeId": "xu6bnv58ajnvnze8lemqejhs", "type": "Condition", "items": [{ "id": "az1wceoguqbo0wp8pidhcedg", "outgoingEdgeId": "g3of92jb8r8nz41ne34fsd6l", "content": { "comparisons": [{ "id": "g4udf94u4739w3giga1geh54", "variableId": "vbl4vqdmldrmmzuzlllmgn3c5", "comparisonOperator": "Contains", "value": "[COMPLETED]" }] } }] }] },
        { "id": "ua5curbls67plyiwhfz2gjhr", "title": "end", "graphCoordinates": { "x": 2446.73, "y": 163.35 }, "blocks": [{ "id": "cykt5l4rgq5d2m29lp2shqc2", "type": "text", "content": { "richText": [{ "id": "QFJfjEGMp3", "type": "p", "children": [{ "text": "入力は完了です！" }] }, { "id": "0SbvwDVX02", "type": "p", "children": [{ "text": "ありがとうございました！" }] }] } }] },

        // NEW GROUP: History Update
        {
            "id": "grp-history-update",
            "title": "History Update",
            "graphCoordinates": { "x": 1300, "y": 400 }, // Positioned nicely
            "blocks": [
                {
                    "id": "blk-hist-update",
                    "type": "Set variable",
                    "options": {
                        "variableId": "vnxqw2piysac9i1w4xbu3uvbe", // chat_history variable ID
                        "expressionToEvaluate": "{{chat_history}}\nUser: {{user_input}}\nAI: {{ai_response}}",
                        "type": "Custom"
                    },
                    "outgoingEdgeId": "edge-hist-to-ai"
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
        { "id": "yhz70ir988qo0tfsg7wtuidn", "from": { "blockId": "oo7to1lnyiq8m1xects4wnd6" }, "to": { "groupId": "rf1bq5mbgd7hfdxwez1p5x1w", "blockId": "t4ql7pbiinaqey72f8c8at72" } },
        { "id": "xu6bnv58ajnvnze8lemqejhs", "from": { "blockId": "t4ql7pbiinaqey72f8c8at72" }, "to": { "groupId": "o4hmfb3ru6caszxmd26jjbiq", "blockId": "vja6niwupffv4ivrr93wc7kx" } },
        { "id": "g3of92jb8r8nz41ne34fsd6l", "from": { "blockId": "t4ql7pbiinaqey72f8c8at72", "itemId": "az1wceoguqbo0wp8pidhcedg" }, "to": { "groupId": "ua5curbls67plyiwhfz2gjhr" } },

        // MODIFIED EDGES
        // Input -> History Update
        { "id": "edge-input-to-hist", "from": { "blockId": "ejzx8iy2qqcfyj6i6oft8gvl" }, "to": { "groupId": "grp-history-update", "blockId": "blk-hist-update" } },
        // History Update -> OpenAI (Loop back)
        { "id": "edge-hist-to-ai", "from": { "blockId": "blk-hist-update" }, "to": { "groupId": "quhdt55280rjrnaoph6mgpr7", "blockId": "oo7to1lnyiq8m1xects4wnd6" } }
    ],
    "variables": [
        { "id": "vbl4vqdmldrmmzuzlllmgn3c5", "name": "ai_response", "isSessionVariable": false },
        { "id": "vm51gu804a0xavs8rzkyg5kqc", "name": "user_input", "isSessionVariable": false },
        { "id": "vnxqw2piysac9i1w4xbu3uvbe", "name": "chat_history", "isSessionVariable": false }
    ],
    "theme": {},
    "settings": { "general": { "isBrandingEnabled": true } }
};

console.log(JSON.stringify(baseJson, null, 2));
