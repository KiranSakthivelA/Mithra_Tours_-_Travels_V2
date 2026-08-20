const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const targetImages = [
    'car_luxury.jpg',
    'van_urbania.jpg',
    'van_tempo.jpg',
    'van_tourist.jpg',
    'bus_minibus.jpg',
    'bus_coach.jpg'
];

(async () => {
    const browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: true,
        defaultViewport: { width: 1024, height: 1024 }
    });

    const page = await browser.newPage();

    for (const imgName of targetImages) {
        const filePath = path.resolve('Assets', imgName);
        if (!fs.existsSync(filePath)) continue;

        const base64Data = fs.readFileSync(filePath).toString('base64');
        const dataUrl = `data:image/jpeg;base64,${base64Data}`;

        const processedBase64 = await page.evaluate(async (src) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);

                    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imgData.data;

                    for (let y = 0; y < canvas.height; y++) {
                        for (let x = 0; x < canvas.width; x++) {
                            const idx = (y * canvas.width + x) * 4;
                            let r = data[idx];
                            let g = data[idx + 1];
                            let b = data[idx + 2];

                            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
                            const yNorm = y / canvas.height;

                            // If on floor area (lower 45% of image)
                            if (yNorm > 0.55) {
                                // Whiten reflective floor
                                if (lum > 110) {
                                    const floorEase = Math.min(1.0, (lum - 110) / 100);
                                    r = r + (255 - r) * floorEase;
                                    g = g + (255 - g) * floorEase;
                                    b = b + (255 - b) * floorEase;
                                }
                            } else {
                                // Wall/Background area (upper 55%)
                                if (lum > 170) {
                                    const wallEase = Math.min(1.0, (lum - 170) / 60);
                                    r = r + (255 - r) * wallEase;
                                    g = g + (255 - g) * wallEase;
                                    b = b + (255 - b) * wallEase;
                                }
                            }

                            // Neutralize all color tints (no beige/yellow/red)
                            if (lum > 120) {
                                const maxC = Math.max(r, g, b);
                                r = r + (maxC - r) * 0.8;
                                g = g + (maxC - g) * 0.8;
                                b = b + (maxC - b) * 0.8;
                            }

                            data[idx] = Math.min(255, Math.round(r));
                            data[idx + 1] = Math.min(255, Math.round(g));
                            data[idx + 2] = Math.min(255, Math.round(b));
                        }
                    }

                    ctx.putImageData(imgData, 0, 0);
                    resolve(canvas.toDataURL('image/jpeg', 0.96));
                };
                img.src = src;
            });
        }, dataUrl);

        const buffer = Buffer.from(processedBase64.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
        fs.writeFileSync(filePath, buffer);
        fs.writeFileSync(path.resolve('v2/Assets', imgName), buffer);
        console.log('Cleaned floor & saved:', imgName);
    }

    await browser.close();
    console.log('All images updated with pure white floor & background!');
})();
