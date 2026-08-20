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

        await page.goto('file:///' + path.resolve('v2/holidays.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            const el = document.getElementById('domestic-packages');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        await new Promise(r => setTimeout(r, 600));
        const domesticSection = await page.$('#domestic-packages');
        if (domesticSection) {
            await domesticSection.screenshot({ path: path.join(testDir, 'domestic_packages_fixed.png') });
            console.log('Saved domestic_packages_fixed.png');
        }

        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
