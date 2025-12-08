// Google Apps Script for Yonezawa AI Secretary
// This script receives a POST request from n8n and pushes a LINE Flex Message.

const LINE_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN'; // Replace with your actual token
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheet ID

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const users = getUsersToSend(); // Filter users based on criteria if needed
    
    // In a real scenario, you might loop through users or use Multicast API
    // For MVP, we might just send to a specific admin or a list of users
    
    // Example: Sending to a specific user ID provided in the request or hardcoded for testing
    const targetUserId = data.userId || 'YOUR_USER_ID'; 

    const message = createFlexMessage(data.project);

    pushMessage(targetUserId, message);

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getUsersToSend() {
  // Logic to fetch users from Google Sheet
  // const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Users');
  // ...
  return [];
}

function pushMessage(userId, flexContent) {
  const url = 'https://api.line.me/v2/bot/message/push';
  const payload = {
    to: userId,
    messages: [flexContent]
  };

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN
    },
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}

function createFlexMessage(project) {
  // project object should contain: title, deadline, rank, summary, url, calendarUrl
  
  return {
    "type": "flex",
    "altText": `【新着】${project.title}`,
    "contents": {
      "type": "bubble",
      "size": "giga",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": `🔴 期限: ${project.deadline}`,
                "color": "#ffffff",
                "weight": "bold",
                "size": "sm",
                "flex": 1
              },
              {
                "type": "text",
                "text": `ランク: ${project.rank}`,
                "weight": "bold",
                "color": "#ffffff",
                "size": "sm",
                "align": "end",
                "flex": 0
              }
            ]
          }
        ],
        "backgroundColor": "#D32F2F", // Red for urgency
        "paddingAll": "12px"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": project.title,
            "weight": "bold",
            "size": "lg",
            "wrap": true,
            "margin": "md"
          },
          {
            "type": "separator",
            "margin": "md"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "【3行要約】",
                "size": "xs",
                "color": "#aaaaaa",
                "weight": "bold",
                "margin": "lg"
              },
              {
                "type": "text",
                "text": project.summary,
                "wrap": true,
                "size": "sm",
                "color": "#555555",
                "margin": "sm",
                "lineSpacing": "4px"
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "詳細PDFを開く",
              "uri": project.url
            },
            "style": "primary",
            "color": "#212121",
            "height": "sm"
          },
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "カレンダー登録",
              "uri": project.calendarUrl || "https://calendar.google.com/"
            },
            "style": "link",
            "height": "sm",
            "margin": "sm",
            "color": "#1E88E5"
          }
        ],
        "paddingAll": "16px"
      }
    }
  };
}
