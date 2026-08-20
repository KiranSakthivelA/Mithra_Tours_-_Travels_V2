const fs = require('fs');
const path = require('path');

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
            html = html.substring(0, startIndex) + heroCenteredHtml.trim() + '\n' + html.substring(endIndex + endMarker.length);
            fs.writeFileSync(file, html, 'utf8');
            console.log('Successfully replaced Banner in:', file);
        }
    }
});
