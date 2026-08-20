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
        await page.screenshot({ path: path.join(testDir, 'mobile_hero_current.png'), fullPage: false });

        // 2. Click Mobile Menu Hamburger if present
        const hamburger = await page.$('.nav-toggle, .mobile-menu-btn, .hamburger-btn, #mobile-menu-toggle');
        if (hamburger) {
            await hamburger.click();
            await new Promise(r => setTimeout(r, 400));
            await page.screenshot({ path: path.join(testDir, 'mobile_menu_open_current.png') });
        }

        // 3. Full page mobile
        await page.screenshot({ path: path.join(testDir, 'mobile_full_page_current.png'), fullPage: true });

        console.log('Captured mobile screenshots');
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
