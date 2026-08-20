const fs = require('fs');
const path = require('path');

const whatWeDo6GridCss = `
/* ── 2. WHAT WE DO SHOWCASE (3-COLUMN 6-CARD GRID) ── */
.about-services-6grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}

.about-service-card {
    background: #FFFFFF;
    border-radius: 20px;
    border: 1.5px solid #E2E8F0;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04);
    padding: 2rem 1.75rem;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-service-card:hover {
    transform: translateY(-4px);
    border-color: #CBD5E1;
    box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.08);
}

.about-service-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
}

.about-service-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: #FFFFFF;
    color: #D97706;
    border: 1.5px solid #FDE68A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;
}

.about-service-card:hover .about-service-icon {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    border-color: transparent;
    box-shadow: 0 6px 16px rgba(217, 119, 6, 0.25);
}

.about-service-badge {
    font-size: 0.70rem;
    font-weight: 800;
    color: #D97706;
    background: #FFFBEB;
    border: 1px solid #FDE68A;
    padding: 0.25rem 0.65rem;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.about-service-title {
    font-size: 1.12rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0 0 0.5rem;
    line-height: 1.35;
}

.about-service-desc {
    font-size: 0.84rem;
    color: #64748B;
    line-height: 1.55;
    margin: 0;
}

@media (max-width: 1024px) {
    .about-services-6grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
    }
}

@media (max-width: 640px) {
    .about-services-6grid {
        grid-template-columns: 1fr;
    }
}
`;

const whatWeDo6GridHtml = `<!-- 4. WHAT WE DO (OUR SERVICES - 6 DISTINCT SERVICE CARDS) -->
<section class="section" id="what-we-do">
    <div class="container">
        <div class="section-header center">
            <span class="section-label center">Complete Solutions</span>
            <h2 class="section-title center">What We Do</h2>
            <p class="section-desc center">Comprehensive mobility and travel solutions covering executive Ground Transport and global Holiday services.</p>
        </div>

        <div class="about-services-6grid">
            <!-- 1. Corporate Cab Services -->
            <div class="about-service-card">
                <div class="about-service-top">
                    <div class="about-service-icon"><i class="fa-solid fa-building"></i></div>
                    <span class="about-service-badge">Daily / Monthly</span>
                </div>
                <h3 class="about-service-title">Corporate Mobility &amp; Shuttles</h3>
                <p class="about-service-desc">Dedicated employee transport, spot corporate rentals, monthly invoicing, and customized fleet deployments for IT and enterprise teams.</p>
            </div>

            <!-- 2. Airport Transfers -->
            <div class="about-service-card">
                <div class="about-service-top">
                    <div class="about-service-icon"><i class="fa-solid fa-plane-departure"></i></div>
                    <span class="about-service-badge">24×7 Available</span>
                </div>
                <h3 class="about-service-title">Airport Pickups &amp; Drops</h3>
                <p class="about-service-desc">Guaranteed on-time terminal pickups and drops with live flight status tracking, professional chauffeurs, and zero delay guarantee.</p>
            </div>

            <!-- 3. Outstation Trips -->
            <div class="about-service-card">
                <div class="about-service-top">
                    <div class="about-service-icon"><i class="fa-solid fa-road"></i></div>
                    <span class="about-service-badge">Pan-India</span>
                </div>
                <h3 class="about-service-title">Outstation &amp; Intercity Cabs</h3>
                <p class="about-service-desc">Comfortable one-way drops and roundtrips from Chennai to Pondicherry, Bengaluru, Tirupati, Coimbatore, Madurai, and all major cities.</p>
            </div>

            <!-- 4. Domestic Holiday Packages -->
            <div class="about-service-card">
                <div class="about-service-top">
                    <div class="about-service-icon"><i class="fa-solid fa-mountain-sun"></i></div>
                    <span class="about-service-badge">Curated Tours</span>
                </div>
                <h3 class="about-service-title">Domestic Holiday Packages</h3>
                <p class="about-service-desc">Handcrafted itineraries across Kerala Backwaters, Royal Rajasthan palaces, Ooty hill escapes, and pilgrimage tours with resort stays and private cabs.</p>
            </div>

            <!-- 5. International Holidays -->
            <div class="about-service-card">
                <div class="about-service-top">
                    <div class="about-service-icon"><i class="fa-solid fa-earth-asia"></i></div>
                    <span class="about-service-badge">Global Escapes</span>
                </div>
                <h3 class="about-service-title">International Tours &amp; Getaways</h3>
                <p class="about-service-desc">Custom worldwide vacations to Bali private villas, Dubai luxury towers &amp; desert safaris, Singapore family wonders, and European packages.</p>
            </div>

            <!-- 6. Ticketing, Cruises & Visas -->
            <div class="about-service-card">
                <div class="about-service-top">
                    <div class="about-service-icon"><i class="fa-solid fa-passport"></i></div>
                    <span class="about-service-badge">End-to-End</span>
                </div>
                <h3 class="about-service-title">Flights, Trains, Cruises &amp; Visas</h3>
                <p class="about-service-desc">Competitive airfares, IRCTC confirmed train tickets, Cordelia ocean cruises, and hassle-free tourist and business visa assistance for 50+ nations.</p>
            </div>
        </div>
    </div>
</section>`;

// 1. Update CSS
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ── 2\. WHAT WE DO SHOWCASE[\s\S]*?(?=\/\* ═|@media|$)/;
    if (regex.test(css)) {
        css = css.replace(regex, whatWeDo6GridCss.trim() + '\n\n');
    } else {
        css += '\n\n' + whatWeDo6GridCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated What We Do CSS in:', file);
});

// 2. Update HTML
['v2/about.html', 'about.html', 'deploy_ready/about.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const wwdRegex = /<!--\s*4\.\s*WHAT WE DO[\s\S]*?<\/section>/;
    if (wwdRegex.test(html)) {
        html = html.replace(wwdRegex, whatWeDo6GridHtml);
    }
    fs.writeFileSync(file, html, 'utf8');
    console.log('Applied 6-card grid What We Do in:', file);
});
