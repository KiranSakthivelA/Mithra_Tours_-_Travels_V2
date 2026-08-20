const fs = require('fs');
const path = require('path');

const cleanHeroHtml = `<!-- ═══════════════════════════════════════════════
     1. BANNER (Home Page Hero — Clean Focused Layout)
════════════════════════════════════════════════ -->
<section class="hero-curved-section" id="banner" style="padding: 140px 0 80px;">
    <div class="hero-curved-container">
        <!-- Top Badge -->
        <div class="hero-curved-badge">
            <i class="fa-solid fa-crown"></i> Chennai&rsquo;s Most Trusted Travel Partner
        </div>

        <!-- Main Headline -->
        <h1 class="hero-curved-title" style="margin-bottom: 1.25rem;">
            Journeys That Connect,<br>
            <span class="gold-highlight">Safe &amp; Comfortable.</span>
        </h1>

        <!-- Subtitle Services -->
        <p class="hero-center-desc" style="font-size: 0.98rem; color: #475569; line-height: 1.6; margin-bottom: 2.25rem; max-width: 820px;">
            Corporate Cabs &middot; Airport Transfers &middot; Outstation &amp; Business Tours &middot; Holiday Packages &middot; Flight / Train / Cruise Booking &middot; Visa Assistance
        </p>

        <!-- Floating Travel Enquiry Card -->
        <div class="hero-dock-card" style="padding: 1.15rem 1.4rem;">
            <!-- Form Fields Row -->
            <form id="hero-dock-form" onsubmit="handleHeroDockSend(event)">
                <div class="dock-grid">
                    <div class="dock-box">
                        <label for="dock-name"><i class="fa-solid fa-user"></i> Name</label>
                        <input type="text" id="dock-name" placeholder="Your Full Name" required autocomplete="name">
                    </div>

                    <div class="dock-box">
                        <label for="dock-phone"><i class="fa-solid fa-phone"></i> Contact Number</label>
                        <input type="tel" id="dock-phone" placeholder="+91 Phone Number" required autocomplete="tel">
                    </div>

                    <div class="dock-box">
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

                    <div class="dock-box">
                        <label for="dock-date"><i class="fa-solid fa-calendar-days"></i> Travel Date</label>
                        <input type="date" id="dock-date" required>
                    </div>

                    <button type="submit" class="dock-btn" title="Send Instant Enquiry" aria-label="Send Instant Enquiry">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>

<script>
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
            html = html.substring(0, startIndex) + cleanHeroHtml.trim() + '\n' + html.substring(endIndex + endMarker.length);
            fs.writeFileSync(file, html, 'utf8');
            console.log('Updated Hero with subtitle in:', file);
        }
    }
});
