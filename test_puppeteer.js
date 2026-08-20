const puppeteer = require('puppeteer-core');
const path = require('path');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'; // common windows path

(async () => {
    try {
        const browser = await puppeteer.launch({ executablePath: chromePath, headless: true });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
        page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
        page.on('requestfailed', req => console.log('REQ FAILED:', req.url(), req.failure().errorText));

        // Use file URL to load local file
        const fileUrl = 'http://localhost:8080/';
        console.log("Loading", fileUrl);
        await page.goto(fileUrl, { waitUntil: 'networkidle0' });
        
        await page.evaluate(() => new Promise(r => setTimeout(r, 1000))); // wait for maps to init
        console.log("Typing 'madurai' in #qb-drop");
        await page.type('#qb-drop', 'madurai');
        await page.evaluate(() => new Promise(r => setTimeout(r, 2000))); // wait for predictions
        const pacExists = await page.evaluate(() => {
            const pacs = document.querySelectorAll('.pac-container');
            if (pacs.length === 0) return "No pac-container found";
            let res = [];
            pacs.forEach((p, i) => {
                const rect = p.getBoundingClientRect();
                const style = window.getComputedStyle(p);
                if (style.display !== 'none') {
                    res.push(`pac ${i}: innerHTML=${p.innerHTML}`);
                }
            });
            return res.join(' | ');
        });
        console.log("PAC STATUS:", pacExists);
        await browser.close();
    } catch (e) {
        console.error("Puppeteer test failed:", e);
    }
})();
