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
        const htmlFile = 'file:///' + path.resolve('v2/our-fleet.html').replace(/\\/g, '/');
        await page.goto(htmlFile, { waitUntil: 'networkidle0' });

        await page.evaluate(() => {
            const section = document.getElementById('fleet-showcase-section');
            if (section) section.scrollIntoView({ behavior: 'instant', block: 'center' });
        });

        // Click Van filter
        const vanBtn = await page.$('button[data-filter="van"]');
        if (vanBtn) {
            await vanBtn.click();
            await new Promise(r => setTimeout(r, 600));
            const sectionEl = await page.$('#fleet-showcase-section');
            await sectionEl.screenshot({ path: path.join(testDir, '3_van_urbania_preview.png') });
            console.log('Saved 3_van_urbania_preview.png');
        }

        // Click Luxury filter
        const luxBtn = await page.$('button[data-filter="luxury"]');
        if (luxBtn) {
            await luxBtn.click();
            await new Promise(r => setTimeout(r, 600));
            const sectionEl = await page.$('#fleet-showcase-section');
            await sectionEl.screenshot({ path: path.join(testDir, '4_luxury_preview.png') });
            console.log('Saved 4_luxury_preview.png');
        }

        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
