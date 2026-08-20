const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: chromePath,
            headless: true,
            defaultViewport: { width: 390, height: 844, isMobile: true, hasTouch: true }
        });

        const page = await browser.newPage();
        await page.goto('file:///' + path.resolve('v2/index.html').replace(/\\/g, '/'), { waitUntil: 'load' });

        const info = await page.evaluate(() => {
            const drawer = document.getElementById('mobile-drawer');
            if (!drawer) return 'No #mobile-drawer found';
            drawer.classList.add('active');
            const cs = window.getComputedStyle(drawer);
            return {
                display: cs.display,
                position: cs.position,
                transform: cs.transform,
                zIndex: cs.zIndex,
                width: cs.width,
                height: cs.height,
                classList: Array.from(drawer.classList)
            };
        });
        console.log('Drawer computed info:', JSON.stringify(info, null, 2));

        const testDir = path.resolve('fleet_test_screenshots');
        await page.screenshot({ path: path.join(testDir, 'inspect_drawer_active.png') });
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
