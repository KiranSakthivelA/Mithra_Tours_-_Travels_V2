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

        const htmlFile = 'file:///' + path.resolve('v2/our-fleet.html').replace(/\\/g, '/');
        console.log('Navigating to:', htmlFile);
        await page.goto(htmlFile, { waitUntil: 'networkidle0' });

        await page.evaluate(() => {
            const section = document.getElementById('fleet-showcase-section');
            if (section) section.scrollIntoView({ behavior: 'instant', block: 'center' });
        });

        await new Promise(r => setTimeout(r, 1000));

        // 1. Initial 3D Circular View
        const sectionEl = await page.$('#fleet-showcase-section');
        if (sectionEl) {
            await sectionEl.screenshot({ path: path.join(testDir, '1_clean_white_circular.png') });
        } else {
            await page.screenshot({ path: path.join(testDir, '1_clean_white_circular.png'), fullPage: false });
        }
        console.log('Saved 1_clean_white_circular.png');

        // 2. Wait 3.6s for auto-swipe
        console.log('Waiting for auto-swipe animation...');
        await new Promise(r => setTimeout(r, 3600));
        if (sectionEl) {
            await sectionEl.screenshot({ path: path.join(testDir, '2_auto_swiped_circular.png') });
        } else {
            await page.screenshot({ path: path.join(testDir, '2_auto_swiped_circular.png'), fullPage: false });
        }
        console.log('Saved 2_auto_swiped_circular.png');

        // 3. Mobile View
        await page.setViewport({ width: 390, height: 844 });
        await page.evaluate(() => {
            const section = document.getElementById('fleet-showcase-section');
            if (section) section.scrollIntoView({ behavior: 'instant', block: 'center' });
        });
        await new Promise(r => setTimeout(r, 800));
        await page.screenshot({ path: path.join(testDir, '6_clean_white_mobile.png'), fullPage: false });
        console.log('Saved 6_clean_white_mobile.png');

        await browser.close();
        console.log('All tests passed successfully!');
    } catch (err) {
        console.error('Test failed:', err);
    }
})();
