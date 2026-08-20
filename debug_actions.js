const puppeteer = require('puppeteer-core');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: chromePath,
            headless: true,
            defaultViewport: { width: 1440, height: 900 }
        });

        const page = await browser.newPage();
        const htmlFile = 'file:///' + path.resolve('v2/our-fleet.html').replace(/\\/g, '/');
        await page.goto(htmlFile, { waitUntil: 'networkidle0' });

        await new Promise(r => setTimeout(r, 1000));

        const info = await page.evaluate(() => {
            const card = document.querySelector('.coverflow-card.active');
            const actions = card ? card.querySelector('.card-actions-row') : null;
            if (!actions) return 'No actions row found';
            const rect = actions.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const computed = window.getComputedStyle(actions);
            return {
                cardClasses: card.className,
                cardHeight: cardRect.height,
                cardTop: cardRect.top,
                actionsTop: rect.top,
                actionsHeight: rect.height,
                display: computed.display,
                visibility: computed.visibility,
                opacity: computed.opacity,
                offsetParent: actions.offsetParent !== null
            };
        });

        console.log('Actions info:', info);
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
