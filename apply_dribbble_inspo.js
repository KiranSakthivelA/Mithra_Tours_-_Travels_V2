const fs = require('fs');
const path = require('path');

const heroDribbbleCss = `
/* ═══════════════════════════════════════════════════════════
   HOME PAGE HERO — DRIBBBLE / TRAVEL AGENCY INSPIRATION
   ═══════════════════════════════════════════════════════════ */
.hero-dribbble-section {
    position: relative;
    padding: 130px 0 60px;
    background: radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.06) 0%, rgba(255, 255, 255, 0) 60%), #F8FAFC;
    overflow: hidden;
    text-align: center;
}

.hero-dribbble-container {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hero-dribbble-label {
    font-size: 0.80rem;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #D97706;
    margin-bottom: 0.75rem;
}

.hero-dribbble-title {
    font-size: clamp(2.5rem, 5.5vw, 4.2rem);
    font-weight: 900;
    color: #0F172A;
    line-height: 1.12;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    max-width: 950px;
}

.hero-dribbble-title .gold-text {
    color: #D97706;
}

/* ── CENTER VEHICLE HERO IMAGE ── */
.hero-center-vehicle-wrap {
    width: 100%;
    max-width: 860px;
    margin: 0 auto -20px;
    position: relative;
    z-index: 2;
    transition: transform 0.4s ease;
}

.hero-center-vehicle-wrap:hover {
    transform: translateY(-4px) scale(1.01);
}

.hero-center-vehicle-img {
    width: 100%;
    height: auto;
    display: block;
    filter: drop-shadow(0 25px 35px rgba(0, 0, 0, 0.12));
}

/* ── FLOATING TRAVEL DOCK CARD ── */
.hero-floating-dock {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 26px;
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.09), 0 4px 16px rgba(0,0,0,0.02);
    padding: 1.5rem 1.75rem;
    max-width: 1050px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 5;
    text-align: left;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-floating-dock:hover {
    border-color: #CBD5E1;
    box-shadow: 0 30px 70px -15px rgba(217, 119, 6, 0.14);
}

/* Dock Category Pills */
.dock-pill-tabs {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
}

.dock-pill-btn {
    background: #F1F5F9;
    border: 1px solid #E2E8F0;
    border-radius: 30px;
    padding: 0.45rem 1.1rem;
    font-size: 0.82rem;
    font-weight: 700;
    color: #64748B;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
}

.dock-pill-btn:hover {
    background: #E2E8F0;
    color: #0F172A;
}

.dock-pill-btn.active {
    background: #D97706;
    border-color: #D97706;
    color: #FFFFFF;
    box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
}

/* Dock Micro-Box Form Fields */
.dock-fields-row {
    display: grid;
    grid-template-columns: 1.1fr 1.1fr 1.2fr 1fr auto;
    gap: 0.85rem;
    align-items: center;
}

.dock-input-box {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 14px;
    padding: 0.65rem 0.95rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    transition: all 0.2s ease;
}

.dock-input-box:focus-within,
.dock-input-box:hover {
    background: #FFFFFF;
    border-color: #D97706;
    box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
}

.dock-input-box label {
    font-size: 0.68rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #64748B;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin: 0;
}

.dock-input-box label i {
    color: #D97706;
    font-size: 0.72rem;
}

.dock-input-box input,
.dock-input-box select {
    border: none;
    background: transparent;
    font-size: 0.90rem;
    font-weight: 700;
    color: #0F172A;
    outline: none;
    font-family: inherit;
    padding: 0;
    cursor: pointer;
    line-height: 1.3;
}

.dock-input-box input::placeholder {
    color: #94A3B8;
    font-weight: 500;
    font-size: 0.86rem;
}

.dock-input-box select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23D97706' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.2rem center;
    padding-right: 1.25rem;
}

.dock-submit-circle {
    width: 54px;
    height: 54px;
    border-radius: 16px;
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(217, 119, 6, 0.32);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
}

.dock-submit-circle:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 12px 28px rgba(217, 119, 6, 0.42);
}

@media (max-width: 990px) {
    .dock-fields-row {
        grid-template-columns: 1fr 1fr;
    }
    .dock-submit-circle {
        grid-column: span 2;
        width: 100%;
        border-radius: 14px;
        height: 48px;
    }
}

@media (max-width: 600px) {
    .dock-fields-row {
        grid-template-columns: 1fr;
    }
    .dock-submit-circle {
        grid-column: 1;
    }
}
`;

const heroDribbbleHtml = `<!-- ═══════════════════════════════════════════════
     1. BANNER (Home Page Hero — Travel Agency Inspo Layout)
════════════════════════════════════════════════ -->
<section class="hero-dribbble-section" id="banner">
    <div class="hero-dribbble-container">
        <!-- Top Label -->
        <div class="hero-dribbble-label">
            <i class="fa-solid fa-crown"></i> Chennai&rsquo;s Most Trusted Travel &amp; Mobility Partner
        </div>

        <!-- Main Headline -->
        <h1 class="hero-dribbble-title">
            Journeys That Connect,<br>
            <span class="gold-text">Safe &amp; Comfortable.</span>
        </h1>

        <!-- Center Vehicle Visual -->
        <div class="hero-center-vehicle-wrap">
            <img src="Assets/hero_fleet_lineup.jpg" alt="Mithra Tours & Travels Fleet" class="hero-center-vehicle-img">
        </div>

        <!-- Floating Travel Dock Card -->
        <div class="hero-floating-dock">
            <!-- Top Category Tabs -->
            <div class="dock-pill-tabs">
                <button type="button" class="dock-pill-btn active" onclick="selectDockCategory(this, 'Corporate Mobility')">
                    <i class="fa-solid fa-briefcase"></i> Corporate Mobility
                </button>
                <button type="button" class="dock-pill-btn" onclick="selectDockCategory(this, 'Airport Transfers')">
                    <i class="fa-solid fa-plane-departure"></i> Airport Transfers
                </button>
                <button type="button" class="dock-pill-btn" onclick="selectDockCategory(this, 'Outstation Cabs')">
                    <i class="fa-solid fa-route"></i> Outstation Cabs
                </button>
                <button type="button" class="dock-pill-btn" onclick="selectDockCategory(this, 'Holiday Packages')">
                    <i class="fa-solid fa-umbrella-beach"></i> Holiday Packages
                </button>
            </div>

            <!-- Form Fields Row -->
            <form id="hero-dock-form" onsubmit="handleHeroDockSend(event)">
                <div class="dock-fields-row">
                    <div class="dock-input-box">
                        <label for="dock-name"><i class="fa-solid fa-user"></i> Name</label>
                        <input type="text" id="dock-name" placeholder="Your Full Name" required autocomplete="name">
                    </div>

                    <div class="dock-input-box">
                        <label for="dock-phone"><i class="fa-solid fa-phone"></i> Contact Number</label>
                        <input type="tel" id="dock-phone" placeholder="+91 Phone Number" required autocomplete="tel">
                    </div>

                    <div class="dock-input-box">
                        <label for="dock-service"><i class="fa-solid fa-car-side"></i> Service Required</label>
                        <select id="dock-service" required>
                            <option value="Corporate Mobility" selected>Corporate Mobility</option>
                            <option value="Airport Transfers">Airport Transfers</option>
                            <option value="Outstation Cabs">Outstation Cabs</option>
                            <option value="Holiday Packages">Holiday Packages</option>
                            <option value="Flight / Train Tickets">Flight / Train Tickets</option>
                            <option value="Visa & Cruise Booking">Visa &amp; Cruise Booking</option>
                        </select>
                    </div>

                    <div class="dock-input-box">
                        <label for="dock-date"><i class="fa-solid fa-calendar-days"></i> Travel Date</label>
                        <input type="date" id="dock-date" required>
                    </div>

                    <button type="submit" class="dock-submit-circle" title="Send Instant Enquiry" aria-label="Send Instant Enquiry">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>

<script>
function selectDockCategory(btn, category) {
    document.querySelectorAll('.dock-pill-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const serviceSelect = document.getElementById('dock-service');
    if (serviceSelect) {
        serviceSelect.value = category;
    }
}

function handleHeroDockSend(e) {
    e.preventDefault();
    const name = document.getElementById('dock-name')?.value || '';
    const phone = document.getElementById('dock-phone')?.value || '';
    const service = document.getElementById('dock-service')?.value || '';
    const date = document.getElementById('dock-date')?.value || '';
    
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
        css = css.replace(regex, heroDribbbleCss.trim() + '\n\n');
    } else {
        css += '\n\n' + heroDribbbleCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated Dribbble Hero CSS in:', file);
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
            html = html.replace(/<script>\s*function (?:handleHeroQuickSend|selectDockCategory|handleHeroDockSend)[\s\S]*?<\/script>\s*/g, '');
            html = html.substring(0, startIndex) + heroDribbbleHtml.trim() + '\n' + html.substring(endIndex + endMarker.length);
            fs.writeFileSync(file, html, 'utf8');
            console.log('Applied Dribbble Hero HTML in:', file);
        }
    }
});
