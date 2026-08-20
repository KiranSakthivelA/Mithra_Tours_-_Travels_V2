const fs = require('fs');
const path = require('path');

const premiumAboutCss = `
/* ═══════════════════════════════════════════════════════════
   ABOUT US — PREMIUM VISION, MISSION & WHAT WE DO
   ═══════════════════════════════════════════════════════════ */

/* ── 1. VISION & MISSION SHOWCASE ── */
.premium-vm-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    align-items: stretch;
}

.premium-vm-card {
    border-radius: 24px;
    padding: 3rem 2.5rem;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-vm-card:hover {
    transform: translateY(-5px);
}

/* Vision Card (Warm Gold Gradient) */
.premium-vm-card.vision-card {
    background: linear-gradient(145deg, #FFFDF5 0%, #FEF3C7 100%);
    border: 1.5px solid #FDE68A;
    box-shadow: 0 15px 35px -5px rgba(217, 119, 6, 0.12);
}

.premium-vm-card.vision-card:hover {
    box-shadow: 0 25px 50px -10px rgba(217, 119, 6, 0.22);
}

/* Mission Card (Crisp White with Gold Accents) */
.premium-vm-card.mission-card {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.05);
}

.premium-vm-card.mission-card:hover {
    border-color: #FDE68A;
    box-shadow: 0 25px 50px -10px rgba(217, 119, 6, 0.14);
}

.vm-badge-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.vm-icon-squircle {
    width: 60px;
    height: 60px;
    border-radius: 18px;
    background: #FFFFFF;
    color: #D97706;
    border: 1.5px solid #FDE68A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 8px 20px rgba(217, 119, 6, 0.15);
    flex-shrink: 0;
}

.vm-card-tag {
    font-size: 0.76rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: #D97706;
}

.vm-card-title {
    font-size: 1.65rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0;
}

.vm-quote-text {
    font-size: 1.05rem;
    font-weight: 600;
    color: #1E293B;
    line-height: 1.75;
    margin-bottom: 2rem;
}

/* Vision Commitments Pills */
.vision-commitments {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(217, 119, 6, 0.2);
}

.vision-pill {
    background: #FFFFFF;
    border: 1px solid #FDE68A;
    padding: 0.5rem 1rem;
    border-radius: 30px;
    font-size: 0.82rem;
    font-weight: 700;
    color: #92400E;
    box-shadow: 0 2px 6px rgba(217, 119, 6, 0.08);
}

/* Mission 4-Grid Blocks */
.mission-blocks-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: auto;
}

.mission-block {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    padding: 1.1rem;
    transition: all 0.25s ease;
}

.mission-block:hover {
    background: #FFFBEB;
    border-color: #FDE68A;
    transform: translateY(-2px);
}

.mission-block-icon {
    font-size: 1.2rem;
    color: #D97706;
    margin-bottom: 0.5rem;
}

.mission-block h5 {
    font-size: 0.88rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0 0 0.25rem;
}

.mission-block p {
    font-size: 0.78rem;
    color: #64748B;
    line-height: 1.45;
    margin: 0;
}


/* ── 2. WHAT WE DO SHOWCASE (GRID CARDS) ── */
.premium-wwd-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
}

.premium-wwd-card {
    background: #FFFFFF;
    border-radius: 24px;
    border: 1.5px solid #E2E8F0;
    box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.05);
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-wwd-card:hover {
    transform: translateY(-5px);
    border-color: #FDE68A;
    box-shadow: 0 25px 50px -10px rgba(217, 119, 6, 0.14);
}

.wwd-card-header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #F1F5F9;
}

.wwd-header-icon {
    width: 60px;
    height: 60px;
    border-radius: 18px;
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 10px 20px rgba(217, 119, 6, 0.25);
    flex-shrink: 0;
}

.wwd-header-title {
    font-size: 1.45rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0 0 0.3rem;
}

.wwd-header-sub {
    font-size: 0.85rem;
    color: #64748B;
    margin: 0;
}

/* 4 Feature Service Blocks per Card */
.wwd-services-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.wwd-service-tile {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: all 0.25s ease;
}

.wwd-service-tile:hover {
    background: #FFFBEB;
    border-color: #FDE68A;
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(217, 119, 6, 0.08);
}

.wwd-tile-icon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: #FFFFFF;
    color: #D97706;
    border: 1px solid #FDE68A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.wwd-service-tile h4 {
    font-size: 0.94rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0;
    line-height: 1.35;
}

.wwd-service-tile p {
    font-size: 0.80rem;
    color: #64748B;
    line-height: 1.45;
    margin: 0;
}

@media (max-width: 1024px) {
    .premium-vm-grid,
    .premium-wwd-grid {
        grid-template-columns: 1fr;
        gap: 1.75rem;
    }
    .mission-blocks-grid,
    .wwd-services-grid {
        grid-template-columns: 1fr;
    }
}
`;

// HTML for Vision & Mission
const premiumVisionMissionHtml = `<!-- 3. VISION, MISSION & VALUES -->
<section class="section section-light" id="vision-mission">
    <div class="container">
        <div class="section-header center">
            <span class="section-label center">Our Principles</span>
            <h2 class="section-title center">Vision &amp; Mission</h2>
            <p class="section-desc center">Guiding principles shaping dependable travel, trusted relationships, and operational excellence.</p>
        </div>

        <div class="premium-vm-grid">
            <!-- Our Vision -->
            <div class="premium-vm-card vision-card">
                <div class="vm-badge-row">
                    <div class="vm-icon-squircle"><i class="fa-solid fa-compass"></i></div>
                    <div>
                        <div class="vm-card-tag">The Future We Build</div>
                        <h3 class="vm-card-title">Our Vision</h3>
                    </div>
                </div>
                <p class="vm-quote-text">
                    &ldquo;To become India&rsquo;s most trusted travel and mobility partner &mdash; recognised across corporate and retail sectors for uncompromising punctuality, passenger safety, service excellence, and enduring relationships.&rdquo;
                </p>
                <div class="vision-commitments">
                    <span class="vision-pill"><i class="fa-solid fa-check" style="margin-right:4px;"></i> Pan-India Reach</span>
                    <span class="vision-pill"><i class="fa-solid fa-check" style="margin-right:4px;"></i> Verified Chauffeurs</span>
                    <span class="vision-pill"><i class="fa-solid fa-check" style="margin-right:4px;"></i> 100% Punctual Dispatch</span>
                </div>
            </div>

            <!-- Our Mission -->
            <div class="premium-vm-card mission-card">
                <div class="vm-badge-row">
                    <div class="vm-icon-squircle"><i class="fa-solid fa-bullseye"></i></div>
                    <div>
                        <div class="vm-card-tag">How We Deliver</div>
                        <h3 class="vm-card-title">Our Mission</h3>
                    </div>
                </div>
                <p style="font-size:0.92rem; color:#475569; line-height:1.7; margin-bottom:1.5rem;">
                    To deliver seamless travel experiences through dependable vehicle rentals, thoughtful customer care, and consistent operational excellence.
                </p>
                
                <div class="mission-blocks-grid">
                    <div class="mission-block">
                        <i class="fa-solid fa-shield-halved mission-block-icon"></i>
                        <h5>Safe Journeys</h5>
                        <p>Rigorously maintained fleet and background-checked drivers.</p>
                    </div>
                    <div class="mission-block">
                        <i class="fa-solid fa-clock mission-block-icon"></i>
                        <h5>Reliable Mobility</h5>
                        <p>Guaranteed on-time dispatch with 24×7 proactive coordination.</p>
                    </div>
                    <div class="mission-block">
                        <i class="fa-solid fa-route mission-block-icon"></i>
                        <h5>Seamless Travel</h5>
                        <p>Unified solutions spanning corporate cabs, outstation & holidays.</p>
                    </div>
                    <div class="mission-block">
                        <i class="fa-solid fa-handshake mission-block-icon"></i>
                        <h5>Lasting Partnerships</h5>
                        <p>Transparent GST billing and dedicated corporate account support.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;

// HTML for What We Do
const premiumWhatWeDoHtml = `<!-- 4. WHAT WE DO (OUR SERVICES) -->
<section class="section" id="what-we-do">
    <div class="container">
        <div class="section-header center">
            <span class="section-label center">Complete Solutions</span>
            <h2 class="section-title center">What We Do</h2>
            <p class="section-desc center">Structured operations covering executive Ground Transport as well as complete Travel &amp; Holidays.</p>
        </div>

        <div class="premium-wwd-grid">
            <!-- 1. Ground Transport -->
            <div class="premium-wwd-card">
                <div class="wwd-card-header">
                    <div class="wwd-header-icon"><i class="fa-solid fa-car-side"></i></div>
                    <div>
                        <h3 class="wwd-header-title">Ground Transport</h3>
                        <p class="wwd-header-sub">Corporate mobility, airport transfers &amp; long-distance travel</p>
                    </div>
                </div>
                <div class="wwd-services-grid">
                    <div class="wwd-service-tile">
                        <div class="wwd-tile-icon"><i class="fa-solid fa-building"></i></div>
                        <h4>Corporate Mobility</h4>
                        <p>Daily employee shuttles, monthly corporate contracts &amp; dedicated cabs.</p>
                    </div>
                    <div class="wwd-service-tile">
                        <div class="wwd-tile-icon"><i class="fa-solid fa-plane-departure"></i></div>
                        <h4>Airport Transfers</h4>
                        <p>Flight-tracked pickups and guaranteed on-time terminal drops 24×7.</p>
                    </div>
                    <div class="wwd-service-tile">
                        <div class="wwd-tile-icon"><i class="fa-solid fa-road"></i></div>
                        <h4>Outstation Trips</h4>
                        <p>One-way and roundtrip journeys across Tamil Nadu and South India.</p>
                    </div>
                    <div class="wwd-service-tile">
                        <div class="wwd-tile-icon"><i class="fa-solid fa-van-shuttle"></i></div>
                        <h4>Group &amp; VIP Travel</h4>
                        <p>Innova Crysta, Tempo Travellers &amp; Urbania for delegations and tours.</p>
                    </div>
                </div>
            </div>

            <!-- 2. Travel & Holidays -->
            <div class="premium-wwd-card">
                <div class="wwd-card-header">
                    <div class="wwd-header-icon"><i class="fa-solid fa-umbrella-beach"></i></div>
                    <div>
                        <h3 class="wwd-header-title">Travel &amp; Holidays</h3>
                        <p class="wwd-header-sub">Custom vacation packages, global flight ticketing &amp; visas</p>
                    </div>
                </div>
                <div class="wwd-services-grid">
                    <div class="wwd-service-tile">
                        <div class="wwd-tile-icon"><i class="fa-solid fa-mountain-sun"></i></div>
                        <h4>Domestic Tours</h4>
                        <p>Curated holiday packages across Kerala, Rajasthan, Ooty &amp; Kashmir.</p>
                    </div>
                    <div class="wwd-service-tile">
                        <div class="wwd-tile-icon"><i class="fa-solid fa-earth-asia"></i></div>
                        <h4>Global Holidays</h4>
                        <p>Custom international tours to Bali, Dubai, Singapore &amp; Europe.</p>
                    </div>
                    <div class="wwd-service-tile">
                        <div class="wwd-tile-icon"><i class="fa-solid fa-ticket"></i></div>
                        <h4>Flight &amp; Train Tickets</h4>
                        <p>Instant domestic/global flight ticketing &amp; IRCTC train reservations.</p>
                    </div>
                    <div class="wwd-service-tile">
                        <div class="wwd-tile-icon"><i class="fa-solid fa-passport"></i></div>
                        <h4>Cruises &amp; Visas</h4>
                        <p>Cordelia luxury ocean cruises and hassle-free visa processing for 50+ nations.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;

// 1. Update CSS
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*ABOUT US (?:REDESIGNED|— PREMIUM)[\s\S]*?(?=\/\* ═|$)/;
    if (regex.test(css)) {
        css = css.replace(regex, premiumAboutCss.trim() + '\n\n');
    } else {
        css += '\n\n' + premiumAboutCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated premium CSS in:', file);
});

// 2. Update HTML
['v2/about.html', 'about.html', 'deploy_ready/about.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const vmRegex = /<!--\s*3\.\s*VISION, MISSION & VALUES[\s\S]*?<\/section>/;
    if (vmRegex.test(html)) {
        html = html.replace(vmRegex, premiumVisionMissionHtml);
    }

    const wwdRegex = /<!--\s*4\.\s*WHAT WE DO[\s\S]*?<\/section>/;
    if (wwdRegex.test(html)) {
        html = html.replace(wwdRegex, premiumWhatWeDoHtml);
    }

    fs.writeFileSync(file, html, 'utf8');
    console.log('Applied premium HTML in:', file);
});
