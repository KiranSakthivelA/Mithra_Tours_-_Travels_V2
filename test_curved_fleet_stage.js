const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const toBase64 = (relPath) => {
    const p = path.resolve(relPath);
    if (!fs.existsSync(p)) return '';
    return 'data:image/jpeg;base64,' + fs.readFileSync(p).toString('base64');
};

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: chromePath,
            headless: true,
            defaultViewport: { width: 1440, height: 950 }
        });

        const page = await browser.newPage();
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body {
                    font-family: 'DM Sans', sans-serif;
                    background: radial-gradient(circle at 50% 15%, rgba(245, 158, 11, 0.08) 0%, rgba(255, 255, 255, 0) 65%), #FFFFFF;
                    color: #0F172A;
                    text-align: center;
                    padding: 40px 20px;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.45rem 1.15rem;
                    background: #FFFBEB;
                    border: 1px solid #FDE68A;
                    border-radius: 30px;
                    font-size: 0.82rem;
                    font-weight: 700;
                    color: #B45309;
                    margin-bottom: 1.25rem;
                }
                .hero-badge i { color: #D97706; }

                .hero-title {
                    font-size: 3.4rem;
                    font-weight: 800;
                    color: #0F172A;
                    line-height: 1.18;
                    letter-spacing: -0.02em;
                    margin-bottom: 2rem;
                }
                .hero-title .gold-text { color: #D97706; }

                /* Curved Stage */
                .curved-fleet-stage {
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    position: relative;
                    max-width: 1100px;
                    margin: 0 auto 2.5rem;
                    height: 250px;
                }

                .fleet-curve-item {
                    position: absolute;
                    bottom: 0;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .fleet-curve-item img {
                    width: 100%;
                    height: 155px;
                    object-fit: cover;
                    border-radius: 18px;
                    box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(0,0,0,0.04);
                    border: 3px solid #FFFFFF;
                    background: #FFFFFF;
                }

                .fleet-curve-tag {
                    margin-top: 6px;
                    font-size: 0.74rem;
                    font-weight: 800;
                    color: #0F172A;
                    background: #FFFFFF;
                    padding: 0.25rem 0.65rem;
                    border-radius: 20px;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.06);
                    border: 1px solid #E2E8F0;
                }

                .fleet-curve-item.item-left-2 {
                    left: 2%;
                    bottom: 20px;
                    transform: rotate(-10deg) scale(0.80);
                    z-index: 1;
                    width: 210px;
                }

                .fleet-curve-item.item-left-1 {
                    left: 21%;
                    bottom: 8px;
                    transform: rotate(-4deg) scale(0.92);
                    z-index: 2;
                    width: 235px;
                }

                .fleet-curve-item.item-center {
                    left: 50%;
                    transform: translateX(-50%) scale(1.08);
                    bottom: 0px;
                    z-index: 4;
                    width: 270px;
                }
                .fleet-curve-item.item-center .fleet-curve-tag {
                    background: #D97706;
                    color: #FFFFFF;
                    border-color: #D97706;
                }

                .fleet-curve-item.item-right-1 {
                    right: 21%;
                    bottom: 8px;
                    transform: rotate(4deg) scale(0.92);
                    z-index: 2;
                    width: 235px;
                }

                .fleet-curve-item.item-right-2 {
                    right: 2%;
                    bottom: 20px;
                    transform: rotate(10deg) scale(0.80);
                    z-index: 1;
                    width: 210px;
                }

                /* Dock Card */
                .hero-dock-card {
                    background: #FFFFFF;
                    border: 1.5px solid #E2E8F0;
                    border-radius: 24px;
                    box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.08);
                    padding: 1.25rem 1.5rem;
                    max-width: 1050px;
                    margin: 0 auto;
                    text-align: left;
                }

                .dock-pills {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }
                .dock-pill {
                    background: #F1F5F9;
                    border: 1px solid #E2E8F0;
                    padding: 0.4rem 1rem;
                    border-radius: 20px;
                    font-size: 0.80rem;
                    font-weight: 700;
                    color: #64748B;
                }
                .dock-pill.active {
                    background: #D97706;
                    border-color: #D97706;
                    color: #FFFFFF;
                }

                .dock-grid {
                    display: grid;
                    grid-template-columns: 1.1fr 1.1fr 1.2fr 1fr auto;
                    gap: 0.75rem;
                    align-items: center;
                }
                .dock-box {
                    background: #F8FAFC;
                    border: 1px solid #E2E8F0;
                    border-radius: 12px;
                    padding: 0.6rem 0.85rem;
                }
                .dock-box label {
                    font-size: 0.68rem;
                    font-weight: 800;
                    color: #64748B;
                    text-transform: uppercase;
                    display: block;
                    margin-bottom: 0.2rem;
                }
                .dock-box label i { color: #D97706; }
                .dock-box input, .dock-box select {
                    border: none;
                    background: transparent;
                    font-weight: 700;
                    font-size: 0.88rem;
                    width: 100%;
                    outline: none;
                }
                .dock-btn {
                    width: 50px;
                    height: 50px;
                    border-radius: 14px;
                    background: #D97706;
                    color: #fff;
                    border: none;
                    font-size: 1.1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <div class="hero-badge"><i class="fa-solid fa-crown"></i> Chennai's Most Trusted Travel Partner</div>
            <h1 class="hero-title">Journeys That Connect,<br><span class="gold-text">Safe & Comfortable.</span></h1>

            <!-- Curved Vehicle Arrangement -->
            <div class="curved-fleet-stage">
                <div class="fleet-curve-item item-left-2">
                    <img src="${toBase64('Assets/car_sedan.jpg')}">
                    <span class="fleet-curve-tag">Sedan (Dzire)</span>
                </div>
                <div class="fleet-curve-item item-left-1">
                    <img src="${toBase64('Assets/car_suv.jpg')}">
                    <span class="fleet-curve-tag">Ertiga MUV</span>
                </div>
                <div class="fleet-curve-item item-center">
                    <img src="${toBase64('Assets/car_innova.jpg')}">
                    <span class="fleet-curve-tag">Innova Crysta</span>
                </div>
                <div class="fleet-curve-item item-right-1">
                    <img src="${toBase64('Assets/car_fortuner.jpg')}">
                    <span class="fleet-curve-tag">Fortuner SUV</span>
                </div>
                <div class="fleet-curve-item item-right-2">
                    <img src="${toBase64('Assets/van_urbania.jpg')}">
                    <span class="fleet-curve-tag">Luxury Urbania</span>
                </div>
            </div>

            <!-- Dock Form -->
            <div class="hero-dock-card">
                <div class="dock-pills">
                    <span class="dock-pill active"><i class="fa-solid fa-briefcase"></i> Corporate Mobility</span>
                    <span class="dock-pill"><i class="fa-solid fa-plane-departure"></i> Airport Transfers</span>
                    <span class="dock-pill"><i class="fa-solid fa-route"></i> Outstation Cabs</span>
                    <span class="dock-pill"><i class="fa-solid fa-umbrella-beach"></i> Holiday Packages</span>
                </div>
                <div class="dock-grid">
                    <div class="dock-box">
                        <label><i class="fa-solid fa-user"></i> Name</label>
                        <input type="text" value="Kiran Sakthivel" readonly>
                    </div>
                    <div class="dock-box">
                        <label><i class="fa-solid fa-phone"></i> Contact Number</label>
                        <input type="text" value="+91 96292 45533" readonly>
                    </div>
                    <div class="dock-box">
                        <label><i class="fa-solid fa-car-side"></i> Service Required</label>
                        <select><option>Corporate Mobility</option></select>
                    </div>
                    <div class="dock-box">
                        <label><i class="fa-solid fa-calendar-days"></i> Travel Date</label>
                        <input type="text" value="22-08-2026" readonly>
                    </div>
                    <button class="dock-btn"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        </body>
        </html>
        `;

        await page.setContent(html);
        const testDir = path.resolve('fleet_test_screenshots');
        if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);
        await page.screenshot({ path: path.join(testDir, 'test_curved_fleet_stage.png') });
        console.log('Saved test_curved_fleet_stage.png');
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
