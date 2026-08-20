const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: chromePath,
            headless: true,
            defaultViewport: { width: 1200, height: 900 }
        });

        const page = await browser.newPage();
        
        // Read source image as base64
        const srcPath = 'C:\\Users\\kiran\\.gemini\\antigravity-ide\\brain\\2224d00e-0026-4df7-9dd8-66b3fb3bd6b9\\hero_seamless_car_1787255042948.jpg';
        const base64Data = fs.readFileSync(srcPath).toString('base64');
        const dataUrl = `data:image/jpeg;base64,${base64Data}`;

        const pngBase64 = await page.evaluate(async (src) => {
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

                    // Flood fill / background removal from edges
                    // Any pixel with near-white color (r > 240, g > 240, b > 240) in upper 75% gets alpha = 0
                    // In lower 25% (ground shadow area), preserve shadow by converting gray to black with opacity
                    for (let y = 0; y < canvas.height; y++) {
                        for (let x = 0; x < canvas.width; x++) {
                            const idx = (y * canvas.width + x) * 4;
                            const r = data[idx];
                            const g = data[idx + 1];
                            const b = data[idx + 2];
                            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
                            const yNorm = y / canvas.height;

                            if (yNorm < 0.78) {
                                // Upper car area - transparent if near white
                                if (r > 242 && g > 242 && b > 242) {
                                    data[idx + 3] = 0;
                                } else if (r > 230 && g > 230 && b > 230) {
                                    // Smooth edge feathering
                                    const diff = Math.max(0, 242 - lum);
                                    data[idx + 3] = Math.min(255, Math.round((diff / 12) * 255));
                                }
                            } else {
                                // Ground shadow area
                                if (r > 248 && g > 248 && b > 248) {
                                    data[idx + 3] = 0;
                                } else if (lum > 180) {
                                    // Soft contact shadow feathering
                                    const shadowAlpha = Math.max(0, Math.min(255, Math.round((255 - lum) * 1.8)));
                                    data[idx] = 20;
                                    data[idx + 1] = 25;
                                    data[idx + 2] = 35;
                                    data[idx + 3] = shadowAlpha;
                                }
                            }
                        }
                    }

                    ctx.putImageData(imgData, 0, 0);
                    resolve(canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, ''));
                };
                img.src = src;
            });
        }, dataUrl);

        const outBuffer = Buffer.from(pngBase64, 'base64');
        const targetPaths = [
            'Assets/hero_car_transparent.png',
            'v2/Assets/hero_car_transparent.png',
            'deploy_ready/Assets/hero_car_transparent.png'
        ];

        targetPaths.forEach(tp => {
            const full = path.resolve(__dirname, tp);
            fs.writeFileSync(full, outBuffer);
            console.log('Saved transparent car PNG to:', full);
        });

        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
