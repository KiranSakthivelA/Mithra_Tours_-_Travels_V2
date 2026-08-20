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

        await page.goto('file:///' + path.resolve('v2/about.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            const el = document.getElementById('what-we-do');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        await new Promise(r => setTimeout(r, 400));

        // Hover over the second tile (Airport Transfers)
        const tiles = await page.$$('.wwd-service-tile');
        if (tiles.length > 1) {
            await tiles[1].hover();
            await new Promise(r => setTimeout(r, 400));
        }

        const wwdSection = await page.$('#what-we-do');
        if (wwdSection) {
            await wwdSection.screenshot({ path: path.join(testDir, 'about_what_we_do_hover_clean.png') });
            console.log('Saved about_what_we_do_hover_clean.png');
        }

        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
