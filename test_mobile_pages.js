const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: chromePath,
            headless: true,
            defaultViewport: { width: 390, height: 844, isMobile: true, hasTouch: true }
        });

        const pages = ['index.html', 'our-fleet.html', 'corporate.html', 'holidays.html'];
        const testDir = path.resolve('fleet_test_screenshots');

        for (const p of pages) {
            const page = await browser.newPage();
            await page.goto('file:///' + path.resolve('v2/' + p).replace(/\\/g, '/'), { waitUntil: 'load' });
            await new Promise(r => setTimeout(r, 400));
            await page.screenshot({ path: path.join(testDir, 'mobile_full_' + p.replace('.html', '.png')), fullPage: true });
            await page.close();
        }

        console.log('Saved mobile full pages');
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
