import { NextRequest, NextResponse } from 'next/server';
import { Client, FlexMessage } from '@line/bot-sdk';

const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
    channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

const client = new Client(config);

// Protected by a simple secret shared with n8n
const N8N_SECRET = process.env.N8N_API_SECRET || 'my-secret-key';

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${N8N_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        // body.items should contain the bid data from n8n

        if (!body.items || !Array.isArray(body.items)) {
            return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
        }

        // Broadcast or Multicast
        // For MVP, we use broadcast() which sends to ALL friends.
        // In production, we would filter by User ID from DB.

        // Create Flex Message Bubble based on items
        // Simplified Logic: Create one message per item or a carousel?
        // LINE Flex Carousel is best for multiple items.

        const bubbles = body.items.map((item: any) => ({
            type: "bubble",
            header: {
                type: "box",
                layout: "vertical",
                contents: [{ type: "text", text: "新着入札情報", weight: "bold", color: "#FFFFFF" }],
                backgroundColor: "#EF4444"
            },
            body: {
                type: "box",
                layout: "vertical",
                contents: [
                    { type: "text", text: item.title || "No Title", weight: "bold", wrap: true },
                    { type: "text", text: item.date || "日付なし", size: "sm", color: "#666666" }
                ]
            },
            footer: {
                type: "box",
                layout: "vertical",
                contents: [{
                    type: "button",
                    action: { type: "uri", label: "詳細を見る", uri: item.url || "https://google.com" },
                    style: "primary"
                }]
            }
        }));

        // Limit to 12 bubbles for carousel
        const slicedBubbles = bubbles.slice(0, 10);

        if (slicedBubbles.length > 0) {
            const flexMessage: FlexMessage = {
                type: "flex",
                altText: "新着入札情報が届きました",
                contents: {
                    type: "carousel",
                    contents: slicedBubbles
                }
            };

            await client.broadcast(flexMessage);
        }

        return NextResponse.json({ success: true, count: slicedBubbles.length });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
    }
}
