// Test Script for Scraper
// Usage: node scripts/test_scraper.js

const { parseBidPage } = require('./scraper');

// Simple fetch mock using standard Node https (since we might not have axios/node-fetch installed in scripts root)
// Actually, let's try to use built-in fetch if Node 18+ or https
const https = require('https');

const TARGET_URL = 'https://www.city.yonezawa.yamagata.jp/soshiki/1/1005/koukoku/index.html';

console.log(`Fetching ${TARGET_URL}...`);

https.get(TARGET_URL, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(`Fetched ${data.length} bytes.`);
        try {
            console.log('Parsing...');
            const results = parseBidPage(data);
            console.log(`Found ${results.length} bid announcements:`);
            console.log(JSON.stringify(results.slice(0, 5), null, 2)); // Show top 5
            if (results.length > 5) console.log(`...and ${results.length - 5} more.`);
        } catch (e) {
            console.error('Error parsing:', e);
        }
    });

}).on('error', (err) => {
    console.error('Error fetching URL:', err);
});
