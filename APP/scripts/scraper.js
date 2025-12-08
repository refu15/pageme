// n8n Function Node Code for Yonezawa City Hall Scraper
// Target URL: https://www.city.yonezawa.yamagata.jp/soshiki/1/1005/koukoku/index.html
// This script parses the HTML to extract bid announcement links.

const $ = require('cheerio'); // Standard n8n library

// If running in n8n, 'items' contains the input.
// const html = items[0].json.data;

// Logic encapsulated for reuse/testing
function parseBidPage(html) {
    const $doc = $.load(html);
    const results = [];
    const baseUrl = 'https://www.city.yonezawa.yamagata.jp';

    // Strategy: Find all links that contain '/koukoku/' path
    // This is more robust than relying on exact list structure <ul> which might change.
    $doc('a').each((i, el) => {
        const link = $doc(el);
        const href = link.attr('href');
        const title = link.text().trim();

        // Filter for valid bid announcement links
        // Exclude the index page itself
        if (href && href.includes('/koukoku/') && href.endsWith('.html') && !href.endsWith('index.html')) {
            // Normalize URL
            const absoluteUrl = href.startsWith('http') ? href : `${baseUrl}${href}`;

            // Clean title (remove newlines/tabs)
            const cleanTitle = title.replace(/\s+/g, ' ').trim();

            if (cleanTitle) {
                results.push({
                    title: cleanTitle,
                    url: absoluteUrl,
                    source: 'Yonezawa City Hall',
                    scraped_at: new Date().toISOString()
                });
            }
        }
    });

    // Deduplicate based on URL
    const uniqueResults = Array.from(new Map(results.map(item => [item.url, item])).values());
    return uniqueResults;
}

// Export for test script
module.exports = { parseBidPage };

// ----------------------------------------
// n8n Execution Block (Uncomment for n8n)
// ----------------------------------------
/*
const html = items[0].json.data;
const results = parseBidPage(html);
return results.map(item => ({ json: item }));
*/
