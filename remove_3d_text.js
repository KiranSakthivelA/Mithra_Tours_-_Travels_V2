const fs = require('fs');
const path = require('path');

const cleanCtaCardHtml = `        <!-- Visual Fleet Showcase CTA Card -->
        <div class="fleet-showcase-cta-card">
            <div class="cta-card-badge"><i class="fa-solid fa-sparkles"></i> Visual Fleet Showcase</div>
            <div class="cta-card-body">
                <div class="cta-card-info">
                    <h3>Explore Our Complete Fleet & Booking Options</h3>
                    <p>Browse all 11 vehicle categories with detailed technical specs, corporate amenities, luggage capacities, and instant direct bookings.</p>
                </div>
                <a href="our-fleet.html" class="cta-showcase-btn">
                    <span>Explore Full Fleet Showcase</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </a>
            </div>
        </div>`;

const files = ['v2/corporate.html', 'corporate.html', 'deploy_ready/corporate.html'];

files.forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const ctaRegex = /<!--\s*(?:3D\s*)?Fleet Showcase CTA Card\s*-->[\s\S]*?<div class="fleet-showcase-cta-card">[\s\S]*?<\/div>\s*<\/div>/;
    if (ctaRegex.test(html)) {
        html = html.replace(ctaRegex, cleanCtaCardHtml);
    }

    fs.writeFileSync(file, html, 'utf8');
    console.log('Removed 3D mentions from CTA card in:', file);
});
