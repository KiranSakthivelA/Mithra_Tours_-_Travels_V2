const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: chromePath,
            headless: true,
            defaultViewport: { width: 1440, height: 1100 }
        });

        const page = await browser.newPage();
        const testDir = path.resolve('fleet_test_screenshots');
        if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);

        await page.goto('file:///' + path.resolve('v2/index.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 400));

        // 1. Screenshot at top (seamless navbar inside hero)
        await page.screenshot({ path: path.join(testDir, 'navbar_seamless_top.png') });
        console.log('Saved navbar_seamless_top.png');

        // 2. Scroll down 400px
        await page.evaluate(() => window.scrollBy(0, 450));
        await new Promise(r => setTimeout(r, 400));

        // 3. Screenshot when scrolled (sticky frosted navbar)
        await page.screenshot({ path: path.join(testDir, 'navbar_scrolled_sticky.png') });
        console.log('Saved navbar_scrolled_sticky.png');

        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
