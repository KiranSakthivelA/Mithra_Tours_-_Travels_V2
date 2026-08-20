const fs = require('fs');
const path = require('path');

const heroCenteredCss = `
/* ═══════════════════════════════════════════════════════════
   HOME PAGE HERO — CENTERED INSPIRATION DESIGN
   ═══════════════════════════════════════════════════════════ */
.hero-centered-section {
    position: relative;
    padding: 140px 0 0;
    background: radial-gradient(circle at 50% 15%, rgba(245, 158, 11, 0.08) 0%, rgba(255, 255, 255, 0) 65%), #FFFFFF;
    overflow: hidden;
    text-align: center;
}

.hero-center-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hero-center-badge {
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
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 8px rgba(217, 119, 6, 0.08);
}

.hero-center-badge i {
    color: #D97706;
}

.hero-center-title {
    font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: 900;
    color: #0F172A;
    line-height: 1.18;
    letter-spacing: -0.02em;
    margin-bottom: 2rem;
    max-width: 900px;
}

.hero-center-title .gold-highlight {
    color: #D97706;
    display: inline;
}

/* ── FLOATING QUICK SEARCH BAR ── */
.hero-quick-search-bar {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 20px;
    box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0,0,0,0.02);
    padding: 0.85rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 1050px;
    width: 100%;
    margin-bottom: 2rem;
    transition: all 0.3s ease;
}

.hero-quick-search-bar:hover {
    border-color: #CBD5E1;
    box-shadow: 0 25px 60px -12px rgba(217, 119, 6, 0.12);
}

.search-field-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0.25rem 0.75rem;
    border-right: 1px solid #F1F5F9;
}

.search-field-item:last-of-type {
    border-right: none;
}

.search-field-item label {
    font-size: 0.70rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #64748B;
    margin-bottom: 0.2rem;
    display: flex;
    align-items: center;
    gap: 0.35rem;
}

.search-field-item label i {
    color: #D97706;
}

.search-field-item select,
.search-field-item input {
    border: none;
    background: transparent;
    font-size: 0.88rem;
    font-weight: 700;
    color: #0F172A;
    outline: none;
    cursor: pointer;
    font-family: inherit;
    padding: 0;
}

.search-action-wrap {
    flex-shrink: 0;
}

.search-action-btn {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    font-weight: 800;
    font-size: 0.90rem;
    padding: 0.85rem 1.6rem;
    border-radius: 14px;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 6px 16px rgba(217, 119, 6, 0.28);
    transition: all 0.25s ease;
    white-space: nowrap;
}

.search-action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(217, 119, 6, 0.38);
    color: #FFFFFF;
}

/* ── SUBTITLE & ACTION BUTTONS ── */
.hero-center-desc {
    font-size: 0.94rem;
    color: #475569;
    line-height: 1.6;
    margin-bottom: 1.75rem;
    max-width: 800px;
}

.hero-center-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
}

/* ── FLEET PANORAMA LINEUP ── */
.hero-fleet-lineup-wrap {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
}

.hero-fleet-lineup-img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 16px;
}

.hero-fleet-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFFFF 100%);
    pointer-events: none;
}

@media (max-width: 900px) {
    .hero-quick-search-bar {
        flex-direction: column;
        gap: 0.75rem;
        padding: 1.25rem;
    }
    .search-field-item {
        border-right: none;
        border-bottom: 1px solid #F1F5F9;
        padding-bottom: 0.5rem;
        width: 100%;
    }
    .search-action-btn {
        width: 100%;
        justify-content: center;
    }
}
`;

// HTML for Centered Hero Section
const heroCenteredHtml = `<!-- ═══════════════════════════════════════════════
     1. BANNER (Home Page Hero — Centered Inspiration)
════════════════════════════════════════════════ -->
<section class="hero-centered-section" id="banner">
    <div class="hero-center-container">
        <!-- Top Badge -->
        <div class="hero-center-badge">
            <i class="fa-solid fa-crown"></i> Chennai&rsquo;s Most Trusted Travel Partner
        </div>

        <!-- Main Headline -->
        <h1 class="hero-center-title">
            Journeys That Connect,<br>
            <span class="gold-highlight">Safe &amp; Comfortable.</span>
        </h1>

        <!-- Floating Quick Search Bar -->
        <div class="hero-quick-search-bar">
            <div class="search-field-item">
                <label><i class="fa-solid fa-location-dot"></i> Pickup City</label>
                <select id="hero-quick-city">
                    <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu</option>
                    <option value="Coimbatore, Tamil Nadu">Coimbatore, Tamil Nadu</option>
                    <option value="Madurai, Tamil Nadu">Madurai, Tamil Nadu</option>
                    <option value="Trichy, Tamil Nadu">Trichy, Tamil Nadu</option>
                    <option value="Salem, Tamil Nadu">Salem, Tamil Nadu</option>
                    <option value="Bangalore, Karnataka">Bangalore, Karnataka</option>
                    <option value="Ooty, Tamil Nadu">Ooty, Tamil Nadu</option>
                    <option value="Kodaikanal, Tamil Nadu">Kodaikanal, Tamil Nadu</option>
                </select>
            </div>

            <div class="search-field-item">
                <label><i class="fa-solid fa-car-side"></i> Service Type</label>
                <select id="hero-quick-service">
                    <option value="Corporate Mobility">Corporate Mobility</option>
                    <option value="Airport Transfer">Airport Transfer</option>
                    <option value="Outstation Roundtrip">Outstation Roundtrip</option>
                    <option value="Holiday Package">Holiday Package</option>
                </select>
            </div>

            <div class="search-field-item">
                <label><i class="fa-solid fa-users"></i> Passengers / Fleet</label>
                <select id="hero-quick-pax">
                    <option value="1-4 Pax (Sedan Dzire)">1-4 Pax (Sedan Dzire)</option>
                    <option value="6-7 Pax (Innova Crysta)">6-7 Pax (Innova Crysta)</option>
                    <option value="12-18 Pax (Tempo / Urbania)">12-18 Pax (Tempo / Urbania)</option>
                    <option value="25-45 Pax (Mini / Large Coach)">25-45 Pax (Coach Bus)</option>
                </select>
            </div>

            <div class="search-field-item">
                <label><i class="fa-solid fa-calendar-days"></i> Travel Date</label>
                <input type="date" id="hero-quick-date" value="2026-08-22">
            </div>

            <div class="search-action-wrap">
                <a href="#quick-booking" class="search-action-btn">
                    <i class="fa-solid fa-magnifying-glass"></i> Get Instant Quote
                </a>
            </div>
        </div>

        <!-- Subtitle Services -->
        <p class="hero-center-desc">
            Corporate Cabs &middot; Airport Transfers &middot; Outstation &amp; Business Tours &middot; Holiday Packages &middot; Flight / Train / Cruise Booking &middot; Visa Assistance
        </p>

        <!-- CTA Actions -->
        <div class="hero-center-actions">
            <a href="#quick-booking" class="btn btn-gold">
                <i class="fa-solid fa-calendar-check"></i> Book Now
            </a>
            <a href="corporate.html" class="btn btn-gold-soft">
                <i class="fa-solid fa-briefcase"></i> Corporate Mobility
            </a>
            <a href="https://wa.me/919629245533?text=Hello%20Mithra%20Tours%2C%20I%20need%20a%20travel%20quote" class="btn btn-whatsapp" target="_blank" rel="noopener">
                <i class="fa-brands fa-whatsapp"></i> WhatsApp Us
            </a>
        </div>

        <!-- Hero Fleet Lineup Showcase -->
        <div class="hero-fleet-lineup-wrap">
            <img src="Assets/hero_fleet_lineup.jpg" alt="Mithra Tours & Travels Fleet Showcase" class="hero-fleet-lineup-img">
            <div class="hero-fleet-fade"></div>
        </div>
    </div>
</section>`;

// Update CSS
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*HOME PAGE HERO — CENTERED INSPIRATION[\s\S]*?(?=\/\* ═|$)/;
    if (regex.test(css)) {
        css = css.replace(regex, heroCenteredCss.trim() + '\n\n');
    } else {
        css += '\n\n' + heroCenteredCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated hero centered CSS in:', file);
});

// Update index.html
['v2/index.html', 'index.html', 'deploy_ready/index.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const heroRegex = /<!--\s*1\.\s*BANNER\s*\(Home Page Hero[\s\S]*?<\/section>/;
    if (heroRegex.test(html)) {
        html = html.replace(heroRegex, heroCenteredHtml);
    }

    fs.writeFileSync(file, html, 'utf8');
    console.log('Applied centered hero HTML in:', file);
});
