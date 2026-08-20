const fs = require('fs');
const path = require('path');

// 1. Update cab-attachment.html across all directories
const cabAttachmentFiles = ['v2/cab-attachment.html', 'cab-attachment.html', 'deploy_ready/cab-attachment.html'];

cabAttachmentFiles.forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // 1. Change title to SUV & MUV (Toyota Innova & Innova Crysta)
    html = html.replace(
        /<h4>Toyota Innova & Innova Crysta<\/h4>/,
        '<h4>SUV & MUV (Toyota Innova & Innova Crysta)</h4>'
    );

    // 2. Add Pollution Certificate to Required Documentation
    const docItemRegex = /<li style="[^"]*">\s*<i class="fa-solid fa-circle-check"[^>]*><\/i>\s*Fitness Certificate \(FC\) & State Tourist Permit\s*<\/li>/;
    const docWithPollution = `<li style="font-size:0.90rem; color:var(--text-heading); font-weight:600; display:flex; gap:0.6rem; align-items:center;">
                        <i class="fa-solid fa-circle-check" style="color:var(--gold-3);"></i> Fitness Certificate (FC) & State Tourist Permit
                    </li>
                    <li style="font-size:0.90rem; color:var(--text-heading); font-weight:600; display:flex; gap:0.6rem; align-items:center;">
                        <i class="fa-solid fa-circle-check" style="color:var(--gold-3);"></i> Pollution Under Control (PUC) Certificate
                    </li>`;

    if (docItemRegex.test(html) && !html.includes('Pollution Under Control')) {
        html = html.replace(docItemRegex, docWithPollution);
    }

    fs.writeFileSync(file, html, 'utf8');
    console.log('Updated cab-attachment.html:', file);
});

// 2. Add stylish CSS for About Us redesigned Vision, Mission, and What We Do
const aboutUsRedesignCss = `
/* ═══════════════════════════════════════════════════════════
   ABOUT US REDESIGNED — VISION, MISSION & WHAT WE DO
   ═══════════════════════════════════════════════════════════ */

/* Vision & Mission Grid */
.about-vm-grid {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 2rem;
    align-items: stretch;
}

.about-vm-card {
    background: #FFFFFF;
    border-radius: var(--r-xl, 24px);
    border: 1.5px solid var(--border-card, rgba(0,0,0,0.06));
    box-shadow: 0 10px 30px -5px rgba(0,0,0,0.04);
    padding: 2.5rem 2.2rem;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-vm-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -10px rgba(217, 119, 6, 0.12);
    border-color: var(--border-gold, #FDE68A);
}

.about-vm-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #F59E0B 0%, #D97706 100%);
    opacity: 0.85;
}

.about-vm-header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 1.25rem;
}

.about-vm-icon {
    width: 54px;
    height: 54px;
    border-radius: 16px;
    background: #FFFBEB;
    color: #D97706;
    border: 1.5px solid #FDE68A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.35rem;
    flex-shrink: 0;
}

.about-vm-title {
    font-size: 1.35rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0;
}

.about-vm-desc {
    font-size: 0.94rem;
    color: #475569;
    line-height: 1.75;
    margin-bottom: 1.5rem;
}

/* Mission 4 Pillars Grid */
.about-pillars-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.9rem;
    margin-top: auto;
}

.about-pillar-item {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 14px;
    padding: 0.9rem 1rem;
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    transition: all 0.2s ease;
}

.about-pillar-item:hover {
    background: #FFFBEB;
    border-color: #FDE68A;
    transform: translateY(-2px);
}

.about-pillar-icon {
    color: #D97706;
    font-size: 1.05rem;
    margin-top: 2px;
    flex-shrink: 0;
}

.about-pillar-item h5 {
    font-size: 0.84rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0 0 0.2rem;
}

.about-pillar-item p {
    font-size: 0.78rem;
    color: #64748B;
    line-height: 1.45;
    margin: 0;
}

/* ── WHAT WE DO (SERVICES SHOWCASE) ── */
.about-wwd-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}

.about-wwd-card {
    background: #FFFFFF;
    border-radius: var(--r-xl, 24px);
    border: 1.5px solid var(--border-card, rgba(0,0,0,0.06));
    box-shadow: 0 10px 30px -5px rgba(0,0,0,0.04);
    padding: 2.25rem;
    display: flex;
    flex-direction: column;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-wwd-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -10px rgba(217, 119, 6, 0.12);
    border-color: var(--border-gold, #FDE68A);
}

.about-wwd-header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid #F1F5F9;
}

.about-wwd-icon {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: #FFFBEB;
    color: #D97706;
    border: 1.5px solid #FDE68A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.35rem;
    flex-shrink: 0;
}

.about-wwd-title {
    font-size: 1.3rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0 0 0.2rem;
}

.about-wwd-subtitle {
    font-size: 0.82rem;
    color: #64748B;
    margin: 0;
}

/* Service Capsules List */
.about-service-capsules {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.about-capsule-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 0.8rem 1.1rem;
    transition: all 0.2s ease;
}

.about-capsule-item:hover {
    background: #FFFBEB;
    border-color: #FDE68A;
    transform: translateX(4px);
}

.about-capsule-left {
    display: flex;
    align-items: center;
    gap: 0.85rem;
}

.about-capsule-left i {
    color: #D97706;
    font-size: 0.95rem;
    width: 18px;
    text-align: center;
}

.about-capsule-left span {
    font-size: 0.88rem;
    font-weight: 700;
    color: #1E293B;
}

.about-capsule-tag {
    font-size: 0.72rem;
    font-weight: 800;
    color: #D97706;
    background: rgba(245, 158, 11, 0.12);
    padding: 0.2rem 0.55rem;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

@media (max-width: 1024px) {
    .about-vm-grid,
    .about-wwd-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .about-pillars-grid {
        grid-template-columns: 1fr;
    }
}
`;

// Append to CSS files
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*ABOUT US REDESIGNED — VISION[\s\S]*?(?=\/\*|$)/;
    if (regex.test(css)) {
        css = css.replace(regex, aboutUsRedesignCss.trim() + '\n\n');
    } else {
        css += '\n\n' + aboutUsRedesignCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated About Us redesign CSS in:', file);
});

// Redesigned HTML for Vision & Mission and What We Do
const redesignedVisionMissionHtml = `<!-- 3. VISION, MISSION & VALUES -->
<section class="section section-light" id="vision-mission">
    <div class="container">
        <div class="section-header center">
            <span class="section-label center">Our Principles</span>
            <h2 class="section-title center">Vision &amp; Mission</h2>
            <p class="section-desc center">Guiding principles shaping dependable travel, trusted relationships, and operational excellence.</p>
        </div>

        <div class="about-vm-grid">
            <!-- Our Vision -->
            <div class="about-vm-card">
                <div class="about-vm-header">
                    <div class="about-vm-icon"><i class="fa-solid fa-eye"></i></div>
                    <h3 class="about-vm-title">Our Vision</h3>
                </div>
                <p class="about-vm-desc">
                    To become the most trusted Pan-India travel and mobility partner &mdash; recognised across corporate and retail sectors for uncompromising punctuality, passenger safety, service excellence, and enduring client relationships.
                </p>
                <div style="margin-top:auto; padding:1.1rem; background:#FFFBEB; border-radius:14px; border:1px dashed #FDE68A;">
                    <div style="font-size:0.76rem; font-weight:800; color:#D97706; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.25rem;">Core Promise</div>
                    <div style="font-size:0.86rem; color:#78350F; font-weight:600; line-height:1.5;">Every vehicle inspected. Every driver verified. Every pickup on time.</div>
                </div>
            </div>

            <!-- Our Mission -->
            <div class="about-vm-card">
                <div class="about-vm-header">
                    <div class="about-vm-icon"><i class="fa-solid fa-bullseye"></i></div>
                    <h3 class="about-vm-title">Our Mission</h3>
                </div>
                <p class="about-vm-desc">
                    To deliver seamless travel experiences through dependable vehicle rentals, thoughtful customer care, and consistent operational precision.
                </p>
                
                <div class="about-pillars-grid">
                    <div class="about-pillar-item">
                        <i class="fa-solid fa-shield-halved about-pillar-icon"></i>
                        <div>
                            <h5>Safe Journeys</h5>
                            <p>Rigorously maintained fleet and background-checked drivers.</p>
                        </div>
                    </div>
                    <div class="about-pillar-item">
                        <i class="fa-solid fa-car-side about-pillar-icon"></i>
                        <div>
                            <h5>Reliable Mobility</h5>
                            <p>Guaranteed vehicle dispatch with strict schedule adherence.</p>
                        </div>
                    </div>
                    <div class="about-pillar-item">
                        <i class="fa-solid fa-route about-pillar-icon"></i>
                        <div>
                            <h5>Seamless Travel</h5>
                            <p>Unified solutions spanning daily cabs, outstation & holidays.</p>
                        </div>
                    </div>
                    <div class="about-pillar-item">
                        <i class="fa-solid fa-handshake about-pillar-icon"></i>
                        <div>
                            <h5>Lasting Partnerships</h5>
                            <p>Transparent billing, GST compliance, and dedicated support.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;

const redesignedWhatWeDoHtml = `<!-- 4. WHAT WE DO (OUR SERVICES) -->
<section class="section" id="what-we-do">
    <div class="container">
        <div class="section-header center">
            <span class="section-label center">Complete Solutions</span>
            <h2 class="section-title center">What We Do</h2>
            <p class="section-desc center">Structured operations covering executive Ground Transport as well as complete Travel &amp; Holidays.</p>
        </div>

        <div class="about-wwd-grid">
            <!-- Ground Transport -->
            <div class="about-wwd-card">
                <div class="about-wwd-header">
                    <div class="about-wwd-icon"><i class="fa-solid fa-car-side"></i></div>
                    <div>
                        <h3 class="about-wwd-title">Ground Transport</h3>
                        <p class="about-wwd-subtitle">Corporate mobility &amp; commercial passenger transit</p>
                    </div>
                </div>
                <div class="about-service-capsules">
                    <div class="about-capsule-item">
                        <div class="about-capsule-left">
                            <i class="fa-solid fa-building"></i>
                            <span>Corporate Cab Services &amp; Employee Shuttles</span>
                        </div>
                        <span class="about-capsule-tag">Daily / Monthly</span>
                    </div>
                    <div class="about-capsule-item">
                        <div class="about-capsule-left">
                            <i class="fa-solid fa-plane-departure"></i>
                            <span>Airport Pickups &amp; Guaranteed On-Time Drops</span>
                        </div>
                        <span class="about-capsule-tag">24×7</span>
                    </div>
                    <div class="about-capsule-item">
                        <div class="about-capsule-left">
                            <i class="fa-solid fa-road"></i>
                            <span>Outstation Roundtrips &amp; One-Way Transfers</span>
                        </div>
                        <span class="about-capsule-tag">Pan-India</span>
                    </div>
                    <div class="about-capsule-item">
                        <div class="about-capsule-left">
                            <i class="fa-solid fa-users"></i>
                            <span>Family &amp; Group Excursions (Tempo / Urbania)</span>
                        </div>
                        <span class="about-capsule-tag">Custom</span>
                    </div>
                    <div class="about-capsule-item">
                        <div class="about-capsule-left">
                            <i class="fa-solid fa-briefcase"></i>
                            <span>VIP Delegations &amp; Executive Travel</span>
                        </div>
                        <span class="about-capsule-tag">Business</span>
                    </div>
                </div>
            </div>

            <!-- Travel & Holidays -->
            <div class="about-wwd-card">
                <div class="about-wwd-header">
                    <div class="about-wwd-icon"><i class="fa-solid fa-umbrella-beach"></i></div>
                    <div>
                        <h3 class="about-wwd-title">Travel &amp; Holidays</h3>
                        <p class="about-wwd-subtitle">End-to-end holiday packages &amp; global travel ticketing</p>
                    </div>
                </div>
                <div class="about-service-capsules">
                    <div class="about-capsule-item">
                        <div class="about-capsule-left">
                            <i class="fa-solid fa-mountain-sun"></i>
                            <span>Domestic Tour Packages (Kerala, Rajasthan, Ooty)</span>
                        </div>
                        <span class="about-capsule-tag">Curated</span>
                    </div>
                    <div class="about-capsule-item">
                        <div class="about-capsule-left">
                            <i class="fa-solid fa-earth-asia"></i>
                            <span>International Holidays (Bali, Dubai, Singapore)</span>
                        </div>
                        <span class="about-capsule-tag">Global</span>
                    </div>
                    <div class="about-capsule-item">
                        <div class="about-capsule-left">
                            <i class="fa-solid fa-ticket"></i>
                            <span>Flight Ticket Reservations &amp; Group Airfares</span>
                        </div>
                        <span class="about-capsule-tag">Instant</span>
                    </div>
                    <div class="about-capsule-item">
                        <div class="about-capsule-left">
                            <i class="fa-solid fa-train"></i>
                            <span>IRCTC Confirmed Train Bookings Pan-India</span>
                        </div>
                        <span class="about-capsule-tag">Tatkal Support</span>
                    </div>
                    <div class="about-capsule-item">
                        <div class="about-capsule-left">
                            <i class="fa-solid fa-ship"></i>
                            <span>Luxury Ocean Cruise Bookings (Cordelia / Asia)</span>
                        </div>
                        <span class="about-capsule-tag">Voyages</span>
                    </div>
                    <div class="about-capsule-item">
                        <div class="about-capsule-left">
                            <i class="fa-solid fa-passport"></i>
                            <span>Comprehensive Tourist &amp; Business Visa Assistance</span>
                        </div>
                        <span class="about-capsule-tag">Hassle-Free</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;

// Update about.html across all directories
const aboutFiles = ['v2/about.html', 'about.html', 'deploy_ready/about.html'];

aboutFiles.forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // Replace Vision & Mission
    const vmRegex = /<!--\s*3\.\s*VISION, MISSION & VALUES[\s\S]*?<\/section>/;
    if (vmRegex.test(html)) {
        html = html.replace(vmRegex, redesignedVisionMissionHtml);
    }

    // Replace What We Do
    const wwdRegex = /<!--\s*4\.\s*WHAT WE DO[\s\S]*?<\/section>/;
    if (wwdRegex.test(html)) {
        html = html.replace(wwdRegex, redesignedWhatWeDoHtml);
    }

    fs.writeFileSync(file, html, 'utf8');
    console.log('Applied redesigned Vision, Mission, and What We Do in:', file);
});
