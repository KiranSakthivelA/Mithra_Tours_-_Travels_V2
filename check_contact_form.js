const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: chromePath,
            headless: true,
            defaultViewport: { width: 1440, height: 960 }
        });

        const page = await browser.newPage();
        await page.goto('file:///' + path.resolve('v2/index.html').replace(/\\/g, '/'), { waitUntil: 'load' });
        
        // Scroll to #get-in-touch
        const contactSection = await page.$('#get-in-touch');
        if (contactSection) {
            await contactSection.scrollIntoView();
        }

        const testDir = path.resolve('fleet_test_screenshots');
        if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);
        await page.screenshot({ path: path.join(testDir, 'test_contact_form_before.png') });
        console.log('Saved test_contact_form_before.png');
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
