const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const toBase64Png = (relPath) => {
    const p = path.resolve(relPath);
    if (!fs.existsSync(p)) return '';
    return 'data:image/png;base64,' + fs.readFileSync(p).toString('base64');
};

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: chromePath,
            headless: true,
            defaultViewport: { width: 1440, height: 960 }
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
                    background: radial-gradient(circle at 80% 40%, rgba(245, 158, 11, 0.05) 0%, rgba(255, 255, 255, 0) 65%), #FFFFFF;
                    color: #0F172A;
                    overflow-x: hidden;
                }

                /* Nav Header */
                .navbar {
                    position: absolute; top: 0; left: 0; right: 0;
                    height: 80px; padding: 0 4rem;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .logo img { height: 44px; }
                .nav-links { display: flex; gap: 2.2rem; }
                .nav-links a { text-decoration: none; font-size: 0.94rem; font-weight: 600; color: #334155; }
                .nav-links a.active { color: #0F172A; font-weight: 800; }
                .nav-btn { background: #D97706; color: #fff; padding: 0.6rem 1.4rem; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 0.90rem; }

                /* Hero Section - Airy & Spacious */
                .hero-inspo-section {
                    position: relative;
                    padding: 120px 4rem 85px;
                    max-width: 1440px;
                    margin: 0 auto;
                    min-height: 880px;
                    display: flex;
                    align-items: center;
                }

                .hero-grid {
                    display: grid;
                    grid-template-columns: 1.22fr 1fr;
                    gap: 3.5rem;
                    align-items: center;
                    width: 100%;
                    position: relative;
                }

                /* Left Content */
                .hero-left {
                    z-index: 2;
                    text-align: left;
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
                    margin-bottom: 1.4rem;
                }
                .hero-badge i { color: #D97706; }

                /* Punchy Weight Title */
                .hero-title {
                    font-family: 'Plus Jakarta Sans', 'DM Sans', sans-serif;
                    font-size: clamp(2.6rem, 3.8vw, 3.5rem);
                    font-weight: 900;
                    color: #0F172A;
                    line-height: 1.14;
                    letter-spacing: -0.03em;
                    margin-bottom: 1.25rem;
                }
                .hero-title .gold-text { color: #D97706; }

                .hero-subtitle {
                    font-size: 0.96rem;
                    color: #64748B;
                    line-height: 1.65;
                    margin-bottom: 2.2rem;
                    max-width: 580px;
                }

                /* Floating Dock */
                .hero-dock {
                    background: #FFFFFF;
                    border: 1.5px solid #E2E8F0;
                    border-radius: 20px;
                    box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.08), 0 2px 10px rgba(0,0,0,0.02);
                    padding: 0.70rem 0.85rem 0.70rem 1.15rem;
                    display: flex;
                    align-items: center;
                    width: 100%;
                    max-width: 680px;
                    position: relative;
                    z-index: 10;
                    margin-bottom: 2rem;
                }

                .dock-item {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                    padding: 0.15rem 0.6rem;
                    min-width: 0;
                }
                .dock-divider {
                    width: 1px;
                    height: 36px;
                    background: #E2E8F0;
                    flex-shrink: 0;
                }
                .dock-item label {
                    font-size: 0.66rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    color: #64748B;
                    margin-bottom: 0.2rem;
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                    white-space: nowrap;
                }
                .dock-item label i { color: #D97706; font-size: 0.70rem; }
                .dock-item input, .dock-item select {
                    border: none;
                    background: transparent;
                    font-size: 0.88rem;
                    font-weight: 700;
                    color: #0F172A;
                    outline: none;
                    font-family: inherit;
                    cursor: pointer;
                    width: 100%;
                    padding: 0;
                }
                .dock-item input::placeholder { color: #94A3B8; font-weight: 500; }
                .dock-item select {
                    -webkit-appearance: none;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23D97706' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 0.1rem center;
                    padding-right: 1.15rem;
                }

                .dock-send-icon-btn {
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
                    color: #FFFFFF;
                    border-radius: 14px;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.15rem;
                    cursor: pointer;
                    box-shadow: 0 6px 18px rgba(217, 119, 6, 0.32);
                    flex-shrink: 0;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                /* Hero Action Buttons */
                .hero-action-row {
                    display: flex;
                    align-items: center;
                    gap: 0.95rem;
                    margin-bottom: 2.2rem;
                    flex-wrap: wrap;
                }

                .btn-gold {
                    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
                    color: #FFFFFF;
                    font-weight: 700;
                    font-size: 0.90rem;
                    padding: 0.70rem 1.4rem;
                    border-radius: 30px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    box-shadow: 0 4px 14px rgba(217, 119, 6, 0.25);
                }

                .btn-gold-soft {
                    background: #FFFBEB;
                    border: 1px solid #FDE68A;
                    color: #B45309;
                    font-weight: 700;
                    font-size: 0.90rem;
                    padding: 0.70rem 1.4rem;
                    border-radius: 30px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .btn-whatsapp {
                    background: #25D366;
                    color: #FFFFFF;
                    font-weight: 700;
                    font-size: 0.90rem;
                    padding: 0.70rem 1.4rem;
                    border-radius: 30px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    box-shadow: 0 4px 14px rgba(37, 211, 102, 0.25);
                }

                /* Stats Row */
                .hero-stats-strip {
                    display: flex;
                    align-items: flex-start;
                    gap: 2.5rem;
                    padding-top: 1.85rem;
                    border-top: 1px solid #F1F5F9;
                    max-width: 650px;
                }

                .stat-box {
                    display: flex;
                    flex-direction: column;
                    text-align: left;
                }

                .stat-num {
                    font-size: 1.55rem;
                    font-weight: 900;
                    color: #0F172A;
                    line-height: 1.1;
                    letter-spacing: -0.02em;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                }
                .stat-num span { color: #D97706; }

                .stat-lbl {
                    font-size: 0.68rem;
                    font-weight: 800;
                    color: #64748B;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    margin-top: 0.3rem;
                }

                /* Right Column */
                .hero-right {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .hero-car-seamless-wrap {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    max-width: 660px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .hero-car-seamless-img {
                    width: 100%;
                    height: auto;
                    display: block;
                    transition: transform 0.4s ease;
                }

                .hero-car-seamless-wrap:hover .hero-car-seamless-img {
                    transform: translateY(-4px) scale(1.02);
                }
            </style>
        </head>
        <body>
            <nav class="navbar">
                <a href="#" class="logo"><img src="${toBase64Png('Assets/Site_Logo.png')}"></a>
                <div class="nav-links">
                    <a href="#" class="active">Home</a>
                    <a href="#">Corporate</a>
                    <a href="#">Our Fleet</a>
                    <a href="#">Holidays</a>
                    <a href="#">About Us</a>
                    <a href="#">Cab Attachment</a>
                    <a href="#">Contact</a>
                </div>
                <a href="#" class="nav-btn"><i class="fa-solid fa-bolt"></i> Get Quote</a>
            </nav>

            <section class="hero-inspo-section">
                <div class="hero-grid">
                    <!-- Left Content -->
                    <div class="hero-left">
                        <div class="hero-badge"><i class="fa-solid fa-crown"></i> Chennai's Most Trusted Travel Partner</div>
                        <h1 class="hero-title">Journeys That Connect,<br><span class="gold-text">Safe &amp; Comfortable.</span></h1>
                        <p class="hero-subtitle">Corporate Cabs &middot; Airport Transfers &middot; Outstation &amp; Business Tours &middot; Holiday Packages &middot; Flight / Train / Cruise Booking &middot; Visa Assistance</p>

                        <!-- Floating Search Bar -->
                        <div class="hero-dock">
                            <div class="dock-item">
                                <label><i class="fa-solid fa-user"></i> Name</label>
                                <input type="text" placeholder="Your Full Name">
                            </div>
                            <div class="dock-divider"></div>
                            <div class="dock-item">
                                <label><i class="fa-solid fa-phone"></i> Contact</label>
                                <input type="text" placeholder="+91 Phone Number">
                            </div>
                            <div class="dock-divider"></div>
                            <div class="dock-item">
                                <label><i class="fa-solid fa-car-side"></i> Service</label>
                                <select>
                                    <option>Corporate Mobility</option>
                                    <option>Airport Transfers</option>
                                    <option>Outstation Cabs</option>
                                    <option>Holiday Packages</option>
                                </select>
                            </div>
                            <div class="dock-divider"></div>
                            <div class="dock-item">
                                <label><i class="fa-solid fa-calendar-days"></i> Date</label>
                                <input type="text" value="22-08-2026">
                            </div>
                            <button class="dock-send-icon-btn" title="Send Instant Quote Request"><i class="fa-solid fa-paper-plane"></i></button>
                        </div>

                        <!-- Action Buttons Row -->
                        <div class="hero-action-row">
                            <a href="#quick-booking" class="btn-gold"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                            <a href="corporate.html" class="btn-gold-soft"><i class="fa-solid fa-briefcase"></i> Corporate Mobility</a>
                            <a href="https://wa.me/919629245533" class="btn-whatsapp"><i class="fa-brands fa-whatsapp"></i> WhatsApp Quote</a>
                        </div>

                        <!-- Stats Strip -->
                        <div class="hero-stats-strip">
                            <div class="stat-box">
                                <div class="stat-num">2024</div>
                                <div class="stat-lbl">Established in Chennai</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-num">100<span>+</span></div>
                                <div class="stat-lbl">Affiliated Vehicles</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-num">24×7</div>
                                <div class="stat-lbl">×365 Operational Support</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-num">GST</div>
                                <div class="stat-lbl">Compliant Billing</div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Visual -->
                    <div class="hero-right">
                        <div class="hero-car-seamless-wrap">
                            <img src="${toBase64Png('Assets/hero_car_transparent.png')}" alt="Mithra Luxury Fleet" class="hero-car-seamless-img">
                        </div>
                    </div>
                </div>
            </section>
        </body>
        </html>
        `;

        await page.setContent(html);
        const testDir = path.resolve('fleet_test_screenshots');
        if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);
        await page.screenshot({ path: path.join(testDir, 'test_hero_spacious_breathing_room.png') });
        console.log('Saved test_hero_spacious_breathing_room.png');
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
