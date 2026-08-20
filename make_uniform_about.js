const fs = require('fs');
const path = require('path');

const uniformAboutCss = `
/* ═══════════════════════════════════════════════════════════
   ABOUT US — UNIFORM COMPACT VISION, MISSION & WHAT WE DO
   ═══════════════════════════════════════════════════════════ */

/* ── 1. VISION & MISSION SHOWCASE ── */
.premium-vm-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: stretch;
}

.premium-vm-card {
    background: #FFFFFF;
    border-radius: 20px;
    border: 1.5px solid #E2E8F0;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.04);
    padding: 2.25rem 2rem;
    display: flex;
    flex-direction: column;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-vm-card:hover {
    transform: translateY(-3px);
    border-color: #CBD5E1;
    box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.08);
}

.vm-badge-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.1rem;
}

.vm-icon-squircle {
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
    flex-shrink: 0;
}

.vm-card-tag {
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #D97706;
    margin-bottom: 0.15rem;
}

.vm-card-title {
    font-size: 1.3rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0;
}

.vm-desc-text {
    font-size: 0.88rem;
    color: #475569;
    line-height: 1.65;
    margin-bottom: 1.4rem;
}

/* Uniform 4-Pillars Grid */
.vm-pillars-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
    margin-top: auto;
}

.vm-pillar-item {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 14px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    transition: all 0.2s ease;
}

.vm-pillar-item:hover {
    background: #FFFFFF !important;
    border-color: #CBD5E1 !important;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
}

.vm-pillar-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.vm-pillar-icon {
    font-size: 0.95rem;
    color: #D97706;
    flex-shrink: 0;
}

.vm-pillar-item h5 {
    font-size: 0.84rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0;
}

.vm-pillar-item p {
    font-size: 0.76rem;
    color: #64748B;
    line-height: 1.45;
    margin: 0;
}


/* ── 2. WHAT WE DO SHOWCASE (GRID CARDS) ── */
.premium-wwd-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.premium-wwd-card {
    background: #FFFFFF;
    border-radius: 20px;
    border: 1.5px solid #E2E8F0;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.04);
    padding: 2.25rem 2rem;
    display: flex;
    flex-direction: column;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-wwd-card:hover {
    transform: translateY(-3px);
    border-color: #CBD5E1;
    box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.08);
}

.wwd-card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid #F1F5F9;
}

.wwd-header-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    box-shadow: 0 6px 14px rgba(217, 119, 6, 0.2);
    flex-shrink: 0;
}

.wwd-header-title {
    font-size: 1.3rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0 0 0.2rem;
}

.wwd-header-sub {
    font-size: 0.82rem;
    color: #64748B;
    margin: 0;
}

/* 4 Feature Service Blocks per Card */
.wwd-services-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
}

.wwd-service-tile {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 14px;
    padding: 1rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    transition: all 0.2s ease;
}

.wwd-service-tile:hover {
    background: #FFFFFF !important;
    border-color: #CBD5E1 !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06) !important;
}

.wwd-service-tile:hover .wwd-tile-icon {
    background: #D97706;
    color: #FFFFFF;
    border-color: #D97706;
}

.wwd-tile-icon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: #FFFFFF;
    color: #D97706;
    border: 1px solid #FDE68A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.90rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
    transition: all 0.2s ease;
}

.wwd-service-tile h4 {
    font-size: 0.86rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0;
    line-height: 1.35;
}

.wwd-service-tile p {
    font-size: 0.76rem;
    color: #64748B;
    line-height: 1.45;
    margin: 0;
}

@media (max-width: 1024px) {
    .premium-vm-grid,
    .premium-wwd-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    .vm-pillars-grid,
    .wwd-services-grid {
        grid-template-columns: 1fr;
    }
}
`;

const uniformVisionMissionHtml = `<!-- 3. VISION, MISSION & VALUES -->
<section class="section section-light" id="vision-mission">
    <div class="container">
        <div class="section-header center">
            <span class="section-label center">Our Principles</span>
            <h2 class="section-title center">Vision &amp; Mission</h2>
            <p class="section-desc center">Guiding principles shaping dependable travel, trusted relationships, and operational excellence.</p>
        </div>

        <div class="premium-vm-grid">
            <!-- Our Vision -->
            <div class="premium-vm-card">
                <div class="vm-badge-row">
                    <div class="vm-icon-squircle"><i class="fa-solid fa-compass"></i></div>
                    <div>
                        <div class="vm-card-tag">The Future We Build</div>
                        <h3 class="vm-card-title">Our Vision</h3>
                    </div>
                </div>
                <p class="vm-desc-text">
                    To become India&rsquo;s most trusted travel and mobility partner &mdash; recognised across corporate and retail sectors for uncompromising punctuality, passenger safety, service excellence, and enduring relationships.
                </p>
                <div class="vm-pillars-grid">
                    <div class="vm-pillar-item">
                        <div class="vm-pillar-header">
                            <i class="fa-solid fa-earth-asia vm-pillar-icon"></i>
                            <h5>Pan-India Reach</h5>
                        </div>
                        <p>Expanding dependable mobility connectivity across all major cities.</p>
                    </div>
                    <div class="vm-pillar-item">
                        <div class="vm-pillar-header">
                            <i class="fa-solid fa-award vm-pillar-icon"></i>
                            <h5>Service Standard</h5>
                        </div>
                        <p>Setting benchmarks in corporate fleet quality and driver etiquette.</p>
                    </div>
                    <div class="vm-pillar-item">
                        <div class="vm-pillar-header">
                            <i class="fa-solid fa-heart-circle-check vm-pillar-icon"></i>
                            <h5>Customer First</h5>
                        </div>
                        <p>Prioritising passenger comfort, responsiveness, and trust.</p>
                    </div>
                    <div class="vm-pillar-item">
                        <div class="vm-pillar-header">
                            <i class="fa-solid fa-gem vm-pillar-icon"></i>
                            <h5>Long-Term Value</h5>
                        </div>
                        <p>Building enduring relationships through transparent operations.</p>
                    </div>
                </div>
            </div>

            <!-- Our Mission -->
            <div class="premium-vm-card">
                <div class="vm-badge-row">
                    <div class="vm-icon-squircle"><i class="fa-solid fa-bullseye"></i></div>
                    <div>
                        <div class="vm-card-tag">How We Deliver</div>
                        <h3 class="vm-card-title">Our Mission</h3>
                    </div>
                </div>
                <p class="vm-desc-text">
                    To deliver seamless travel experiences through dependable vehicle rentals, thoughtful customer care, and consistent operational excellence.
                </p>
                <div class="vm-pillars-grid">
                    <div class="vm-pillar-item">
                        <div class="vm-pillar-header">
                            <i class="fa-solid fa-shield-halved vm-pillar-icon"></i>
                            <h5>Safe Journeys</h5>
                        </div>
                        <p>Rigorously maintained fleet and background-checked drivers.</p>
                    </div>
                    <div class="vm-pillar-item">
                        <div class="vm-pillar-header">
                            <i class="fa-solid fa-clock vm-pillar-icon"></i>
                            <h5>Reliable Mobility</h5>
                        </div>
                        <p>Guaranteed on-time dispatch with 24×7 proactive coordination.</p>
                    </div>
                    <div class="vm-pillar-item">
                        <div class="vm-pillar-header">
                            <i class="fa-solid fa-route vm-pillar-icon"></i>
                            <h5>Seamless Travel</h5>
                        </div>
                        <p>Unified solutions spanning corporate cabs, outstation &amp; holidays.</p>
                    </div>
                    <div class="vm-pillar-item">
                        <div class="vm-pillar-header">
                            <i class="fa-solid fa-handshake vm-pillar-icon"></i>
                            <h5>Lasting Partnerships</h5>
                        </div>
                        <p>Transparent GST billing and dedicated corporate account support.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;

// Update CSS
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*ABOUT US (?:REDESIGNED|— PREMIUM|— CLEAN|— UNIFORM)[\s\S]*?(?=\/\* ═|$)/;
    if (regex.test(css)) {
        css = css.replace(regex, uniformAboutCss.trim() + '\n\n');
    } else {
        css += '\n\n' + uniformAboutCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated uniform CSS in:', file);
});

// Update HTML
['v2/about.html', 'about.html', 'deploy_ready/about.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const vmRegex = /<!--\s*3\.\s*VISION, MISSION & VALUES[\s\S]*?<\/section>/;
    if (vmRegex.test(html)) {
        html = html.replace(vmRegex, uniformVisionMissionHtml);
    }

    fs.writeFileSync(file, html, 'utf8');
    console.log('Applied uniform HTML in:', file);
});
