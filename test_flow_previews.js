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

        // 1. Corporate Desktop
        await page.goto('file:///' + path.resolve('v2/corporate.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            const el = document.getElementById('why-choose-us');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        await new Promise(r => setTimeout(r, 600));
        const corpSection = await page.$('#why-choose-us');
        if (corpSection) {
            await corpSection.screenshot({ path: path.join(testDir, 'corporate_flow_desktop.png') });
            console.log('Saved corporate_flow_desktop.png');
        }

        // 2. Corporate Mobile
        await page.setViewport({ width: 390, height: 844 });
        await page.evaluate(() => {
            const el = document.getElementById('why-choose-us');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        await new Promise(r => setTimeout(r, 600));
        if (corpSection) {
            await corpSection.screenshot({ path: path.join(testDir, 'corporate_flow_mobile.png') });
            console.log('Saved corporate_flow_mobile.png');
        }

        // 3. About Desktop
        await page.setViewport({ width: 1440, height: 1050 });
        await page.goto('file:///' + path.resolve('v2/about.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            const el = document.getElementById('why-choose-mithra');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        await new Promise(r => setTimeout(r, 600));
        const aboutSection = await page.$('#why-choose-mithra');
        if (aboutSection) {
            await aboutSection.screenshot({ path: path.join(testDir, 'about_flow_desktop.png') });
            console.log('Saved about_flow_desktop.png');
        }

        // 4. About Mobile
        await page.setViewport({ width: 390, height: 844 });
        await page.evaluate(() => {
            const el = document.getElementById('why-choose-mithra');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        await new Promise(r => setTimeout(r, 600));
        if (aboutSection) {
            await aboutSection.screenshot({ path: path.join(testDir, 'about_flow_mobile.png') });
            console.log('Saved about_flow_mobile.png');
        }

        await browser.close();
        console.log('Screenshots complete!');
    } catch (e) {
        console.error(e);
    }
})();
