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

        // 1. Cab attachment section
        await page.goto('file:///' + path.resolve('v2/cab-attachment.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            const h = Array.from(document.querySelectorAll('h2')).find(el => el.textContent.includes('Eligible Vehicles'));
            if (h) h.scrollIntoView({ behavior: 'instant', block: 'center' });
        });
        await new Promise(r => setTimeout(r, 600));
        await page.screenshot({ path: path.join(testDir, 'cab_attachment_criteria_fixed.png') });
        console.log('Saved cab_attachment_criteria_fixed.png');

        // 2. About Vision & Mission
        await page.goto('file:///' + path.resolve('v2/about.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            const el = document.getElementById('vision-mission');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        await new Promise(r => setTimeout(r, 600));
        const vmSection = await page.$('#vision-mission');
        if (vmSection) {
            await vmSection.screenshot({ path: path.join(testDir, 'about_vision_mission_redesign.png') });
            console.log('Saved about_vision_mission_redesign.png');
        }

        // 3. About What We Do
        await page.evaluate(() => {
            const el = document.getElementById('what-we-do');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        await new Promise(r => setTimeout(r, 600));
        const wwdSection = await page.$('#what-we-do');
        if (wwdSection) {
            await wwdSection.screenshot({ path: path.join(testDir, 'about_what_we_do_redesign.png') });
            console.log('Saved about_what_we_do_redesign.png');
        }

        await browser.close();
        console.log('Captures completed!');
    } catch (e) {
        console.error(e);
    }
})();
