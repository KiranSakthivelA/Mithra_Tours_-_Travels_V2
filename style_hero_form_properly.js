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

/* ── FLOATING QUICK SEARCH / ENQUIRY BAR ── */
.hero-quick-search-bar {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 22px;
    box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.02);
    padding: 0.75rem 0.85rem 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    max-width: 1050px;
    width: 100%;
    margin: 0 auto 2rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 10;
}

.hero-quick-search-bar:hover,
.hero-quick-search-bar:focus-within {
    border-color: #CBD5E1;
    box-shadow: 0 25px 60px -12px rgba(217, 119, 6, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
}

.search-field-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0.35rem 1rem;
    position: relative;
}

.search-field-divider {
    width: 1px;
    height: 38px;
    background: #E2E8F0;
    flex-shrink: 0;
}

.search-field-item label {
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.9px;
    color: #64748B;
    margin-bottom: 0.35rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.search-field-item label i {
    color: #D97706;
    font-size: 0.78rem;
}

.search-field-item input,
.search-field-item select {
    width: 100%;
    border: none;
    background: transparent;
    font-size: 0.94rem;
    font-weight: 700;
    color: #0F172A;
    outline: none;
    font-family: inherit;
    padding: 0;
    cursor: pointer;
    line-height: 1.3;
}

.search-field-item input::placeholder {
    color: #94A3B8;
    font-weight: 500;
    font-size: 0.90rem;
}

.search-field-item select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23D97706' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.25rem center;
    padding-right: 1.5rem;
}

.search-field-item select option {
    font-weight: 600;
    color: #0F172A;
    background: #FFFFFF;
}

.search-field-item input[type="date"] {
    cursor: pointer;
    font-weight: 700;
}

.search-action-wrap {
    flex-shrink: 0;
    padding-left: 0.5rem;
}

.search-action-btn {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    font-weight: 800;
    font-size: 0.95rem;
    padding: 0.95rem 2rem;
    border-radius: 16px;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(217, 119, 6, 0.28);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
}

.search-action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(217, 119, 6, 0.38);
    color: #FFFFFF;
}

.search-action-btn i {
    font-size: 0.90rem;
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

@media (max-width: 960px) {
    .hero-quick-search-bar {
        flex-direction: column;
        gap: 0.9rem;
        padding: 1.25rem;
        border-radius: 18px;
    }
    .search-field-divider {
        display: none;
    }
    .search-field-item {
        width: 100%;
        padding: 0.25rem 0;
        border-bottom: 1px solid #F1F5F9;
        padding-bottom: 0.6rem;
    }
    .search-action-wrap {
        width: 100%;
        padding-left: 0;
    }
    .search-action-btn {
        width: 100%;
        justify-content: center;
        padding: 0.9rem 1.5rem;
    }
}
`;

const updatedHeroHtml = `<!-- ═══════════════════════════════════════════════
     1. BANNER (Home Page Hero — Quick Enquiry Form)
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

        <!-- Quick Enquiry Form Bar -->
        <form class="hero-quick-search-bar" id="hero-quick-enquiry-form" onsubmit="handleHeroQuickSend(event)">
            <div class="search-field-item">
                <label for="hero-name"><i class="fa-solid fa-user"></i> Name</label>
                <input type="text" id="hero-name" name="name" placeholder="Your Full Name" required autocomplete="name">
            </div>

            <div class="search-field-divider"></div>

            <div class="search-field-item">
                <label for="hero-phone"><i class="fa-solid fa-phone"></i> Contact Number</label>
                <input type="tel" id="hero-phone" name="phone" placeholder="+91 Phone Number" required autocomplete="tel">
            </div>

            <div class="search-field-divider"></div>

            <div class="search-field-item">
                <label for="hero-service"><i class="fa-solid fa-car-side"></i> Service Required</label>
                <select id="hero-service" name="service" required>
                    <option value="" disabled selected>Select Service</option>
                    <option value="Corporate Mobility">Corporate Mobility</option>
                    <option value="Airport Transfers">Airport Transfers</option>
                    <option value="Outstation Cabs">Outstation Cabs</option>
                    <option value="Holiday Packages">Holiday Packages</option>
                    <option value="Flight / Train Tickets">Flight / Train Tickets</option>
                    <option value="Visa & Cruise Booking">Visa &amp; Cruise Booking</option>
                </select>
            </div>

            <div class="search-field-divider"></div>

            <div class="search-field-item">
                <label for="hero-date"><i class="fa-solid fa-calendar-days"></i> Travel Date</label>
                <input type="date" id="hero-date" name="date" required>
            </div>

            <div class="search-action-wrap">
                <button type="submit" class="search-action-btn">
                    <i class="fa-solid fa-paper-plane"></i> Send
                </button>
            </div>
        </form>

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
</section>

<script>
function handleHeroQuickSend(e) {
    e.preventDefault();
    const name = document.getElementById('hero-name')?.value || '';
    const phone = document.getElementById('hero-phone')?.value || '';
    const service = document.getElementById('hero-service')?.value || '';
    const date = document.getElementById('hero-date')?.value || '';
    
    const text = encodeURIComponent(
        'Hello Mithra Tours & Travels,\n\n' +
        'I would like to request a quote:\n' +
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

    const regex = /\/\* ═+\r?\n\s*HOME PAGE HERO — CENTERED INSPIRATION[\s\S]*?(?=\/\* ═|$)/;
    if (regex.test(css)) {
        css = css.replace(regex, heroCenteredCss.trim() + '\n\n');
    } else {
        css += '\n\n' + heroCenteredCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated refined hero CSS in:', file);
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
            html = html.replace(/<script>\s*function handleHeroQuickSend[\s\S]*?<\/script>\s*/g, '');
            html = html.substring(0, startIndex) + updatedHeroHtml.trim() + '\n' + html.substring(endIndex + endMarker.length);
            fs.writeFileSync(file, html, 'utf8');
            console.log('Successfully updated polished hero in:', file);
        }
    }
});
