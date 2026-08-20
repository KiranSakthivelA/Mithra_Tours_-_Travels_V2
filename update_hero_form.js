const fs = require('fs');
const path = require('path');

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
                <input type="text" id="hero-name" name="name" placeholder="Your Full Name" required>
            </div>

            <div class="search-field-item">
                <label for="hero-phone"><i class="fa-solid fa-phone"></i> Contact Number</label>
                <input type="tel" id="hero-phone" name="phone" placeholder="+91 Phone Number" required>
            </div>

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
            // Also remove any existing <script> for handleHeroQuickSend if present
            html = html.replace(/<script>\s*function handleHeroQuickSend[\s\S]*?<\/script>\s*/g, '');
            html = html.substring(0, startIndex) + updatedHeroHtml.trim() + '\n' + html.substring(endIndex + endMarker.length);
            fs.writeFileSync(file, html, 'utf8');
            console.log('Successfully updated Hero form in:', file);
        }
    }
});
