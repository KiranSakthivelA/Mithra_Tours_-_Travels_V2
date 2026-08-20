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

        const page = await browser.newPage();
        await page.goto('file:///' + path.resolve('v2/index.html').replace(/\\/g, '/'), { waitUntil: 'load' });
        await new Promise(r => setTimeout(r, 600));

        // Evaluate toggleMobileDrawer(true)
        await page.evaluate(() => {
            if (typeof window.toggleMobileDrawer === 'function') {
                window.toggleMobileDrawer(true);
            }
        });
        await new Promise(r => setTimeout(r, 400));

        const testDir = path.resolve('fleet_test_screenshots');
        await page.screenshot({ path: path.join(testDir, 'real_mobile_drawer_open.png'), fullPage: false });
        console.log('Saved real_mobile_drawer_open.png');
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
