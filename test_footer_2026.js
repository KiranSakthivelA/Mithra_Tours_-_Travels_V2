const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: chromePath,
            headless: true,
            defaultViewport: { width: 1440, height: 1050 }
        });

        const page = await browser.newPage();
        const testDir = path.resolve('fleet_test_screenshots');
        if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);

        await page.goto('file:///' + path.resolve('v2/index.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            const el = document.querySelector('footer');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        await new Promise(r => setTimeout(r, 600));
        const footerSection = await page.$('footer');
        if (footerSection) {
            await footerSection.screenshot({ path: path.join(testDir, 'footer_2026_universal.png') });
            console.log('Saved footer_2026_universal.png');
        }

        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
