const fs = require('fs');
const path = require('path');

const sideCarHeroCss = `
/* ═══════════════════════════════════════════════════════════
   HOME PAGE HERO — SIDE CAR INSPIRATION LAYOUT
   ═══════════════════════════════════════════════════════════ */
.hero-sidecar-section {
    position: relative;
    padding: 135px 0 70px;
    background: radial-gradient(circle at 75% 35%, rgba(245, 158, 11, 0.06) 0%, rgba(255, 255, 255, 0) 65%), #FFFFFF;
    overflow: hidden;
}

.hero-sidecar-container {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
}

.hero-sidecar-grid {
    display: grid;
    grid-template-columns: 1.15fr 0.95fr;
    gap: 3rem;
    align-items: center;
    position: relative;
}

/* Left Column */
.hero-sidecar-left {
    z-index: 2;
    text-align: left;
}

.hero-sidecar-badge {
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
    margin-bottom: 1.35rem;
    box-shadow: 0 2px 8px rgba(217, 119, 6, 0.08);
}

.hero-sidecar-badge i {
    color: #D97706;
}

.hero-sidecar-title {
    font-size: clamp(2.6rem, 4.2vw, 3.8rem);
    font-weight: 800;
    color: #0F172A;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 1.25rem;
}

.hero-sidecar-title .gold-highlight {
    color: #D97706;
}

.hero-sidecar-desc {
    font-size: 0.98rem;
    color: #64748B;
    line-height: 1.65;
    margin-bottom: 2.25rem;
    max-width: 600px;
}

/* Floating Dock Bar */
.hero-dock-bar {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 22px;
    box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.09), 0 2px 10px rgba(0,0,0,0.02);
    padding: 0.85rem 1rem 0.85rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    max-width: 820px;
    width: 100%;
    position: relative;
    z-index: 10;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-dock-bar:hover,
.hero-dock-bar:focus-within {
    border-color: #CBD5E1;
    box-shadow: 0 25px 60px -12px rgba(217, 119, 6, 0.12);
}

.dock-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0.2rem 0.6rem;
}

.dock-bar-divider {
    width: 1px;
    height: 38px;
    background: #E2E8F0;
    flex-shrink: 0;
}

.dock-bar-item label {
    font-size: 0.68rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #64748B;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.35rem;
}

.dock-bar-item label i {
    color: #D97706;
    font-size: 0.72rem;
}

.dock-bar-item input,
.dock-bar-item select {
    border: none;
    background: transparent;
    font-size: 0.90rem;
    font-weight: 700;
    color: #0F172A;
    outline: none;
    font-family: inherit;
    cursor: pointer;
    width: 100%;
    padding: 0;
    line-height: 1.3;
}

.dock-bar-item input::placeholder {
    color: #94A3B8;
    font-weight: 500;
}

.dock-bar-item select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23D97706' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.2rem center;
    padding-right: 1.25rem;
}

.dock-bar-send-btn {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    font-weight: 800;
    font-size: 0.92rem;
    padding: 0.85rem 1.6rem;
    border-radius: 14px;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(217, 119, 6, 0.28);
    flex-shrink: 0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dock-bar-send-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(217, 119, 6, 0.38);
}

/* Right Column (Visual + Trajectory + Badges) */
.hero-sidecar-right {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-trajectory-svg {
    position: absolute;
    width: 140%;
    height: 130%;
    top: -15%;
    left: -20%;
    pointer-events: none;
    z-index: 1;
}

.hero-sidecar-img-wrap {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 580px;
    border-radius: 28px;
    overflow: hidden;
    background: #FFFFFF;
    box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.08);
}

.hero-sidecar-img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.4s ease;
}

.hero-sidecar-img-wrap:hover .hero-sidecar-img {
    transform: scale(1.03);
}

/* Floating Badges */
.hero-floating-pill {
    position: absolute;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    padding: 0.55rem 1.15rem;
    border-radius: 30px;
    box-shadow: 0 12px 28px -5px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    font-weight: 800;
    color: #0F172A;
    z-index: 5;
    animation: floatBadgeAnim 4s ease-in-out infinite alternate;
}

.hero-floating-pill i {
    color: #D97706;
    font-size: 0.90rem;
}

.hero-floating-pill.pill-top-right {
    top: -10px;
    right: 15px;
}

.hero-floating-pill.pill-bottom-left {
    bottom: 20px;
    left: -20px;
    animation-delay: 2s;
}

.hero-floating-pill.pill-mid-right {
    top: 40%;
    right: -25px;
    animation-delay: 1s;
}

@keyframes floatBadgeAnim {
    0% { transform: translateY(0px); }
    100% { transform: translateY(-8px); }
}

@media (max-width: 1024px) {
    .hero-sidecar-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
    }
    .hero-sidecar-left {
        text-align: center;
    }
    .hero-sidecar-desc {
        margin-left: auto;
        margin-right: auto;
    }
    .hero-dock-bar {
        margin: 0 auto;
    }
}

@media (max-width: 768px) {
    .hero-dock-bar {
        flex-direction: column;
        gap: 0.75rem;
        padding: 1.25rem;
        border-radius: 18px;
    }
    .dock-bar-divider {
        display: none;
    }
    .dock-bar-item {
        width: 100%;
        border-bottom: 1px solid #F1F5F9;
        padding-bottom: 0.5rem;
    }
    .dock-bar-send-btn {
        width: 100%;
        justify-content: center;
    }
    .hero-floating-pill {
        display: none;
    }
}
`;

const heroSideCarHtml = `<!-- ═══════════════════════════════════════════════
     1. BANNER (Home Page Hero — Travel Agency Inspiration)
════════════════════════════════════════════════ -->
<section class="hero-sidecar-section" id="banner">
    <div class="hero-sidecar-container">
        <div class="hero-sidecar-grid">
            <!-- Left Content Column -->
            <div class="hero-sidecar-left">
                <!-- Top Badge -->
                <div class="hero-sidecar-badge">
                    <i class="fa-solid fa-crown"></i> Chennai&rsquo;s Most Trusted Travel Partner
                </div>

                <!-- Main Headline -->
                <h1 class="hero-sidecar-title">
                    Journeys That Connect,<br>
                    <span class="gold-highlight">Safe &amp; Comfortable.</span>
                </h1>

                <!-- Subtitle Services -->
                <p class="hero-sidecar-desc">
                    Corporate Cabs &middot; Airport Transfers &middot; Outstation &amp; Business Tours &middot; Holiday Packages &middot; Flight / Train / Cruise Booking &middot; Visa Assistance
                </p>

                <!-- Floating Quick Enquiry Bar -->
                <form class="hero-dock-bar" id="hero-sidecar-form" onsubmit="handleHeroSideCarSend(event)">
                    <div class="dock-bar-item">
                        <label for="sidecar-name"><i class="fa-solid fa-user"></i> Name</label>
                        <input type="text" id="sidecar-name" placeholder="Your Full Name" required autocomplete="name">
                    </div>

                    <div class="dock-bar-divider"></div>

                    <div class="dock-bar-item">
                        <label for="sidecar-phone"><i class="fa-solid fa-phone"></i> Contact</label>
                        <input type="tel" id="sidecar-phone" placeholder="+91 Phone Number" required autocomplete="tel">
                    </div>

                    <div class="dock-bar-divider"></div>

                    <div class="dock-bar-item">
                        <label for="sidecar-service"><i class="fa-solid fa-car-side"></i> Service</label>
                        <select id="sidecar-service" required>
                            <option value="Corporate Mobility" selected>Corporate Mobility</option>
                            <option value="Airport Transfers">Airport Transfers</option>
                            <option value="Outstation Cabs">Outstation Cabs</option>
                            <option value="Holiday Packages">Holiday Packages</option>
                            <option value="Flight / Train Tickets">Flight / Train Tickets</option>
                            <option value="Visa & Cruise Booking">Visa &amp; Cruise Booking</option>
                        </select>
                    </div>

                    <div class="dock-bar-divider"></div>

                    <div class="dock-bar-item">
                        <label for="sidecar-date"><i class="fa-solid fa-calendar-days"></i> Date</label>
                        <input type="date" id="sidecar-date" required>
                    </div>

                    <button type="submit" class="dock-bar-send-btn">
                        <i class="fa-solid fa-paper-plane"></i> Send
                    </button>
                </form>
            </div>

            <!-- Right Visual Column -->
            <div class="hero-sidecar-right">
                <!-- Curved dashed travel route -->
                <svg class="hero-trajectory-svg" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 30 360 C 120 80, 480 40, 570 240" stroke="#CBD5E1" stroke-width="2.5" stroke-dasharray="8 8" />
                </svg>

                <!-- Floating Badges -->
                <div class="hero-floating-pill pill-top-right">
                    <i class="fa-solid fa-shield-halved"></i> 100% Verified Chauffeurs
                </div>
                <div class="hero-floating-pill pill-bottom-left">
                    <i class="fa-solid fa-star"></i> 4.9 / 5 Rating
                </div>
                <div class="hero-floating-pill pill-mid-right">
                    <i class="fa-solid fa-car-side"></i> 100+ Affiliated Fleet
                </div>

                <!-- Studio Vehicle Showcase -->
                <div class="hero-sidecar-img-wrap">
                    <img src="Assets/car_innova.jpg" alt="Mithra Tours & Travels Luxury Fleet" class="hero-sidecar-img">
                </div>
            </div>
        </div>
    </div>
</section>

<script>
function handleHeroSideCarSend(e) {
    e.preventDefault();
    const name = document.getElementById('sidecar-name')?.value || '';
    const phone = document.getElementById('sidecar-phone')?.value || '';
    const service = document.getElementById('sidecar-service')?.value || '';
    const date = document.getElementById('sidecar-date')?.value || '';
    
    const text = encodeURIComponent(
        'Hello Mithra Tours & Travels,\n\n' +
        'I would like to request an instant quote:\n' +
        '• Name: ' + name + '\n' +
        '• Contact Number: ' + phone + '\n' +
        '• Service Required: ' + service + '\n' +
        '• Travel Date: ' + date
    );
    
    window.open('https://wa.me/919629245533?text=' + text, '_blank');
}
</script>`;

// Update CSS
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*HOME PAGE HERO[\s\S]*?(?=\/\* ═|$)/;
    if (regex.test(css)) {
        css = css.replace(regex, sideCarHeroCss.trim() + '\n\n');
    } else {
        css += '\n\n' + sideCarHeroCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated sidecar hero CSS in:', file);
});

// Update HTML
['v2/index.html', 'index.html', 'deploy_ready/index.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const startMarker = '<!-- ═══════════════════════════════════════════════\n     1. BANNER';
    const endMarker = '</section>';
    const startIndex = html.indexOf(startMarker);
    if (startIndex !== -1) {
        const endIndex = html.indexOf(endMarker, startIndex);
        if (endIndex !== -1) {
            html = html.replace(/<script>\s*function (?:handleHeroQuickSend|selectDockCategory|handleHeroDockSend|handleHeroSideCarSend)[\s\S]*?<\/script>\s*/g, '');
            html = html.substring(0, startIndex) + heroSideCarHtml.trim() + '\n' + html.substring(endIndex + endMarker.length);
            fs.writeFileSync(file, html, 'utf8');
            console.log('Applied sidecar Hero HTML in:', file);
        }
    }
});
