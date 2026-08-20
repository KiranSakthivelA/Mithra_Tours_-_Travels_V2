const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: chromePath,
            headless: true,
            defaultViewport: { width: 1200, height: 600 }
        });

        const page = await browser.newPage();
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { margin: 0; background: #e0f2fe; display: flex; align-items: center; justify-content: center; height: 100vh; }
                img { width: 200px; height: auto; margin: 10px; }
            </style>
        </head>
        <body>
            <img src="file:///${path.resolve('Assets/car_sedan.png').replace(/\\/g, '/')}">
            <img src="file:///${path.resolve('Assets/car_innova.png').replace(/\\/g, '/')}">
            <img src="file:///${path.resolve('Assets/car_fortuner.png').replace(/\\/g, '/')}">
        </body>
        </html>
        `;
        await page.setContent(html);
        const testDir = path.resolve('fleet_test_screenshots');
        if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);
        await page.screenshot({ path: path.join(testDir, 'test_png_transparency.png') });
        console.log('Saved test_png_transparency.png');
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
