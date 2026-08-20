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

        const htmlFile = 'file:///' + path.resolve('v2/corporate.html').replace(/\\/g, '/');
        console.log('Navigating to:', htmlFile);
        await page.goto(htmlFile, { waitUntil: 'networkidle0' });

        // 1. Desktop View of Fleet Section & CTA Card
        await page.evaluate(() => {
            const el = document.getElementById('our-fleet');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        await new Promise(r => setTimeout(r, 600));

        const fleetSec = await page.$('#our-fleet');
        if (fleetSec) {
            await fleetSec.screenshot({ path: path.join(testDir, 'corporate_fleet_desktop.png') });
            console.log('Saved corporate_fleet_desktop.png');
        }

        // 2. Mobile View (390px)
        await page.setViewport({ width: 390, height: 844 });
        await page.evaluate(() => {
            const el = document.getElementById('our-fleet');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        await new Promise(r => setTimeout(r, 600));

        if (fleetSec) {
            await fleetSec.screenshot({ path: path.join(testDir, 'corporate_fleet_mobile.png') });
            console.log('Saved corporate_fleet_mobile.png');
        }

        await browser.close();
        console.log('Done test!');
    } catch (e) {
        console.error(e);
    }
})();
