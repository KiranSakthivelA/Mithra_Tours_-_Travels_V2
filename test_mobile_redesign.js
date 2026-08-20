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
            defaultViewport: { width: 390, height: 844, isMobile: true, hasTouch: true }
        });

        const page = await browser.newPage();
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body {
                    font-family: 'DM Sans', sans-serif;
                    background: #FFFFFF;
                    color: #0F172A;
                    overflow-x: hidden;
                    -webkit-font-smoothing: antialiased;
                }

                /* Mobile Navbar */
                .navbar {
                    position: fixed; top: 0; left: 0; right: 0;
                    height: 64px; padding: 0 1.25rem;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
                    display: flex; align-items: center; justify-content: space-between;
                    z-index: 1000;
                }
                .logo img { height: 38px; width: auto; }
                .nav-actions-desktop { display: none; }

                .menu-toggle-btn {
                    width: 42px; height: 42px;
                    border-radius: 12px;
                    background: #F8FAFC;
                    border: 1.5px solid #E2E8F0;
                    color: #0F172A;
                    font-size: 1.15rem;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                }

                /* ── FULL-SCREEN LENGTH MOBILE DRAWER MENU ── */
                .mobile-drawer-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.45);
                    backdrop-filter: blur(6px);
                    z-index: 99998;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                }
                .mobile-drawer-overlay.active {
                    opacity: 1;
                    pointer-events: auto;
                }

                .mobile-drawer {
                    position: fixed;
                    top: 0; right: 0; bottom: 0;
                    width: 100%;
                    max-width: 100vw;
                    height: 100vh;
                    height: 100dvh;
                    background: #FFFFFF;
                    z-index: 99999;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 1.25rem 1.5rem 2rem;
                    transform: translateX(100%);
                    transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
                    overflow-y: auto;
                }
                .mobile-drawer.active {
                    transform: translateX(0);
                }

                .drawer-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-bottom: 1.25rem;
                    border-bottom: 1px solid #F1F5F9;
                }
                .drawer-close-btn {
                    width: 42px; height: 42px;
                    border-radius: 12px;
                    background: #F1F5F9;
                    border: none;
                    color: #0F172A;
                    font-size: 1.2rem;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                }

                .drawer-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.35rem;
                    margin: 1.5rem 0;
                }
                .drawer-link {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.90rem 1rem;
                    border-radius: 14px;
                    text-decoration: none;
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: #334155;
                    transition: all 0.2s ease;
                }
                .drawer-link.active, .drawer-link:hover {
                    background: #FFFBEB;
                    color: #D97706;
                }
                .drawer-link i { font-size: 0.90rem; opacity: 0.6; }

                .drawer-footer {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    padding-top: 1.25rem;
                    border-top: 1px solid #F1F5F9;
                }

                .drawer-btn-gold {
                    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
                    color: #FFFFFF;
                    font-weight: 800;
                    font-size: 0.95rem;
                    padding: 0.85rem 1.25rem;
                    border-radius: 14px;
                    text-decoration: none;
                    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
                }
                .drawer-btn-wa {
                    background: #25D366;
                    color: #FFFFFF;
                    font-weight: 800;
                    font-size: 0.95rem;
                    padding: 0.85rem 1.25rem;
                    border-radius: 14px;
                    text-decoration: none;
                    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
                }

                /* ── MOBILE HERO SECTION ── */
                .hero-mobile-section {
                    padding: 85px 1.25rem 40px;
                    background: radial-gradient(circle at 50% 25%, rgba(245, 158, 11, 0.07) 0%, rgba(255, 255, 255, 0) 65%), #FFFFFF;
                    text-align: center;
                }

                .hero-badge-mobile {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    padding: 0.25rem 0.80rem;
                    background: #FFFBEB;
                    border: 1px solid #FDE68A;
                    border-radius: 20px;
                    font-size: 0.72rem;
                    font-weight: 700;
                    color: #B45309;
                    margin-bottom: 0.85rem;
                }

                .hero-title-mobile {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 2.15rem;
                    font-weight: 900;
                    color: #0F172A;
                    line-height: 1.15;
                    letter-spacing: -0.03em;
                    margin-bottom: 0.75rem;
                }
                .hero-title-mobile .gold-text { color: #D97706; }

                .hero-sub-mobile {
                    font-size: 0.86rem;
                    color: #64748B;
                    line-height: 1.5;
                    margin-bottom: 1.35rem;
                }

                /* Mobile Enquiry Dock Bar */
                .hero-dock-mobile {
                    background: #FFFFFF;
                    border: 1.5px solid #E2E8F0;
                    border-radius: 18px;
                    box-shadow: 0 12px 35px -5px rgba(0, 0, 0, 0.08);
                    padding: 1.1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.70rem;
                    margin-bottom: 1.35rem;
                    text-align: left;
                }

                .dock-item-mobile {
                    display: flex;
                    flex-direction: column;
                    border-bottom: 1px solid #F1F5F9;
                    padding-bottom: 0.45rem;
                }
                .dock-item-mobile:last-of-type { border-bottom: none; padding-bottom: 0; }
                .dock-item-mobile label {
                    font-size: 0.65rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 0.8px;
                    color: #64748B;
                    margin-bottom: 0.15rem;
                    display: flex; align-items: center; gap: 0.3rem;
                }
                .dock-item-mobile label i { color: #D97706; font-size: 0.70rem; }
                .dock-item-mobile input, .dock-item-mobile select {
                    border: none;
                    background: transparent;
                    font-size: 0.92rem;
                    font-weight: 700;
                    color: #0F172A;
                    outline: none;
                    width: 100%;
                    font-family: inherit;
                }
                .dock-send-mobile-btn {
                    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
                    color: #FFFFFF;
                    border: none;
                    border-radius: 12px;
                    padding: 0.85rem;
                    font-weight: 800;
                    font-size: 0.92rem;
                    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
                    box-shadow: 0 6px 18px rgba(217, 119, 6, 0.32);
                    margin-top: 0.3rem;
                }

                /* Mobile Action Buttons */
                .hero-actions-mobile {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.65rem;
                    margin-bottom: 1.5rem;
                }
                .btn-mob-gold {
                    background: #FFFBEB;
                    border: 1px solid #FDE68A;
                    color: #B45309;
                    font-weight: 700;
                    font-size: 0.84rem;
                    padding: 0.65rem 0.5rem;
                    border-radius: 12px;
                    text-decoration: none;
                    display: flex; align-items: center; justify-content: center; gap: 0.35rem;
                }
                .btn-mob-wa {
                    background: #25D366;
                    color: #FFFFFF;
                    font-weight: 700;
                    font-size: 0.84rem;
                    padding: 0.65rem 0.5rem;
                    border-radius: 12px;
                    text-decoration: none;
                    display: flex; align-items: center; justify-content: center; gap: 0.35rem;
                }

                /* Mobile Car Image (Seamless Cutout) */
                .hero-car-mobile-wrap {
                    max-width: 320px;
                    margin: 0 auto 1.5rem;
                }
                .hero-car-mobile-wrap img {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                /* Mobile Stats Grid */
                .hero-stats-mobile {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem 1.25rem;
                    padding-top: 1.25rem;
                    border-top: 1px solid #F1F5F9;
                }
                .stat-box-mob .num {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    font-size: 1.45rem;
                    font-weight: 900;
                    color: #0F172A;
                    line-height: 1.1;
                }
                .stat-box-mob .num span { color: #D97706; }
                .stat-box-mob .lbl {
                    font-size: 0.64rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: #64748B;
                    letter-spacing: 0.6px;
                    margin-top: 0.2rem;
                }
            </style>
        </head>
        <body>
            <!-- Navbar -->
            <nav class="navbar">
                <a href="#" class="logo"><img src="${toBase64Png('Assets/Site_Logo.png')}"></a>
                <button class="menu-toggle-btn" id="open-menu"><i class="fa-solid fa-bars"></i></button>
            </nav>

            <!-- Mobile Full-Length Menu Drawer -->
            <div class="mobile-drawer-overlay" id="drawer-overlay"></div>
            <div class="mobile-drawer" id="drawer-menu">
                <div class="drawer-header">
                    <img src="${toBase64Png('Assets/Site_Logo.png')}" style="height: 38px;">
                    <button class="drawer-close-btn" id="close-menu"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="drawer-links">
                    <a href="index.html" class="drawer-link active"><span>Home</span> <i class="fa-solid fa-arrow-right"></i></a>
                    <a href="corporate.html" class="drawer-link"><span>Corporate Mobility</span> <i class="fa-solid fa-arrow-right"></i></a>
                    <a href="our-fleet.html" class="drawer-link"><span>Our Fleet</span> <i class="fa-solid fa-arrow-right"></i></a>
                    <a href="holidays.html" class="drawer-link"><span>Holiday Packages</span> <i class="fa-solid fa-arrow-right"></i></a>
                    <a href="about.html" class="drawer-link"><span>About Us</span> <i class="fa-solid fa-arrow-right"></i></a>
                    <a href="cab-attachment.html" class="drawer-link"><span>Cab Attachment</span> <i class="fa-solid fa-arrow-right"></i></a>
                    <a href="contact.html" class="drawer-link"><span>Contact Us</span> <i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div class="drawer-footer">
                    <a href="tel:+919629245533" class="drawer-btn-gold"><i class="fa-solid fa-phone"></i> Call +91 96292 45533</a>
                    <a href="https://wa.me/919629245533" class="drawer-btn-wa"><i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp</a>
                </div>
            </div>

            <!-- Hero Section -->
            <section class="hero-mobile-section">
                <div class="hero-badge-mobile"><i class="fa-solid fa-crown"></i> Chennai's Most Trusted Travel Partner</div>
                <h1 class="hero-title-mobile">Journeys That Connect,<br><span class="gold-text">Safe &amp; Comfortable.</span></h1>
                <p class="hero-sub-mobile">Corporate Cabs &middot; Airport Transfers &middot; Outstation &amp; Business Tours &middot; Holiday Packages &middot; Flight / Train / Cruise Booking</p>

                <!-- Seamless Car Cutout -->
                <div class="hero-car-mobile-wrap">
                    <img src="${toBase64Png('Assets/hero_car_transparent.png')}" alt="Mithra Luxury Fleet">
                </div>

                <!-- Floating Dock Bar -->
                <div class="hero-dock-mobile">
                    <div class="dock-item-mobile">
                        <label><i class="fa-solid fa-user"></i> Name</label>
                        <input type="text" placeholder="Your Full Name">
                    </div>
                    <div class="dock-item-mobile">
                        <label><i class="fa-solid fa-phone"></i> Contact</label>
                        <input type="tel" placeholder="+91 Phone Number">
                    </div>
                    <div class="dock-item-mobile">
                        <label><i class="fa-solid fa-car-side"></i> Service</label>
                        <select>
                            <option>Corporate Mobility</option>
                            <option>Airport Transfers</option>
                            <option>Outstation Cabs</option>
                            <option>Holiday Packages</option>
                        </select>
                    </div>
                    <div class="dock-item-mobile">
                        <label><i class="fa-solid fa-calendar-days"></i> Date</label>
                        <input type="date" value="2026-08-22">
                    </div>
                    <button class="dock-send-mobile-btn"><i class="fa-solid fa-paper-plane"></i> Send Instant Request</button>
                </div>

                <!-- Action Buttons -->
                <div class="hero-actions-mobile">
                    <a href="corporate.html" class="btn-mob-gold"><i class="fa-solid fa-briefcase"></i> Corporate Mobility</a>
                    <a href="https://wa.me/919629245533" class="btn-mob-wa"><i class="fa-brands fa-whatsapp"></i> WhatsApp Quote</a>
                </div>

                <!-- Stats Strip -->
                <div class="hero-stats-mobile">
                    <div class="stat-box-mob">
                        <div class="num">2024</div>
                        <div class="lbl">Established</div>
                    </div>
                    <div class="stat-box-mob">
                        <div class="num">100<span>+</span></div>
                        <div class="lbl">Vehicles</div>
                    </div>
                    <div class="stat-box-mob">
                        <div class="num">24×7</div>
                        <div class="lbl">Support</div>
                    </div>
                    <div class="stat-box-mob">
                        <div class="num">GST</div>
                        <div class="lbl">Compliant</div>
                    </div>
                </div>
            </section>
        </body>
        </html>
        `;

        await page.setContent(html);
        const testDir = path.resolve('fleet_test_screenshots');
        if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);

        // 1. Mobile Hero View
        await page.screenshot({ path: path.join(testDir, 'test_mobile_hero_redesign.png'), fullPage: false });

        // 2. Open Drawer Menu
        await page.evaluate(() => {
            document.getElementById('drawer-menu').classList.add('active');
            document.getElementById('drawer-overlay').classList.add('active');
        });
        await new Promise(r => setTimeout(r, 400));
        await page.screenshot({ path: path.join(testDir, 'test_mobile_drawer_redesign.png'), fullPage: false });

        console.log('Saved mobile screenshots');
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
