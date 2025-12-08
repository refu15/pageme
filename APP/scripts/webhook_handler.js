// n8n Function Node: LINE Webhook Handler
// This script processes incoming events from LINE Messaging API.
// It assumes the input 'items' contains the JSON body of the webhook request.

const events = items[0].json.events;
const responseMessages = [];

if (events && Array.isArray(events)) {
    for (const event of events) {
        const userId = event.source.userId;
        const replyToken = event.replyToken;
        const type = event.type;

        // Handle Text Messages
        if (type === 'message' && event.message.type === 'text') {
            const text = event.message.text.trim();

            if (text === '設定') {
                responseMessages.push({
                    replyToken: replyToken,
                    messages: [{
                        type: 'text',
                        text: '設定メニューです。\n1. エリア設定\n2. キーワード設定\n設定したい項目を入力してください。'
                    }]
                });
            } else if (text.includes('キーワード')) {
                // Logic to start keyword setting flow
                responseMessages.push({
                    replyToken: replyToken,
                    messages: [{
                        type: 'text',
                        text: '通知したいキーワードを入力してください。\n（例：舗装、解体、除雪）'
                    }]
                });
            } else {
                // Default echo or help
                responseMessages.push({
                    replyToken: replyToken,
                    messages: [{
                        type: 'text',
                        text: `「${text}」を受け取りました。\nメニューを表示するには「設定」と送信してください。`
                    }]
                });
            }
        }
        // Handle Follow Event (Friend Add)
        else if (type === 'follow') {
            responseMessages.push({
                replyToken: replyToken,
                messages: [{
                    type: 'text',
                    text: '友だち追加ありがとうございます！\nまずは「設定」と入力して、通知条件を設定しましょう。'
                }]
            });
        }
    }
}

// Check if any response is needed
if (responseMessages.length === 0) {
    return [];
}

// Return formatted for the next node (e.g. HTTP Request to LINE Reply API)
return responseMessages.map(msg => ({ json: msg }));
