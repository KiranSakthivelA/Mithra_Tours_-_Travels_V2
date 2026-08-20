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

        // 1. Index About Us section (No Badge)
        await page.goto('file:///' + path.resolve('v2/index.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            const el = document.getElementById('about-us');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        await new Promise(r => setTimeout(r, 600));
        const aboutSection = await page.$('#about-us');
        if (aboutSection) {
            await aboutSection.screenshot({ path: path.join(testDir, 'index_about_no_badge.png') });
            console.log('Saved index_about_no_badge.png');
        }

        // 2. Footer Contact Column
        await page.evaluate(() => {
            const el = document.querySelector('footer');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        });
        await new Promise(r => setTimeout(r, 600));
        const footerSection = await page.$('footer');
        if (footerSection) {
            await footerSection.screenshot({ path: path.join(testDir, 'footer_contact_fixed.png') });
            console.log('Saved footer_contact_fixed.png');
        }

        // 3. Contact page cards
        await page.goto('file:///' + path.resolve('v2/contact.html').replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 600));
        const contactDetails = await page.$('.contact-details-col');
        if (contactDetails) {
            await contactDetails.screenshot({ path: path.join(testDir, 'contact_page_cards.png') });
            console.log('Saved contact_page_cards.png');
        }

        await browser.close();
        console.log('Preview captures complete!');
    } catch (e) {
        console.error(e);
    }
})();
