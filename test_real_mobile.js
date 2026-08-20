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

        const testDir = path.resolve('fleet_test_screenshots');
        if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);

        // 1. Mobile Hero
        await page.screenshot({ path: path.join(testDir, 'real_mobile_hero.png'), fullPage: false });

        // 2. Open Mobile Drawer
        const menuBtn = await page.$('#mobile-menu');
        if (menuBtn) {
            await menuBtn.click();
            await new Promise(r => setTimeout(r, 400));
            await page.screenshot({ path: path.join(testDir, 'real_mobile_drawer.png'), fullPage: false });
        }

        console.log('Saved real mobile screenshots');
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
