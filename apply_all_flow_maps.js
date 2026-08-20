const fs = require('fs');
const path = require('path');

// 1. Updated CSS with flexible grid support for 4, 5, and 6 columns
const flowMapGlobalCss = `/* ═══════════════════════════════════════════════════════════
   MITHRA — S-PATTERN FLOW / ROAD MAP COMPONENT (REUSABLE)
   ═══════════════════════════════════════════════════════════ */

.why-flow-section {
    position: relative;
    padding: 3.5rem 0 5rem;
    background: #FFFFFF;
    overflow: hidden;
}

.why-flow-wrapper {
    position: relative;
    max-width: 1280px;
    margin: 3rem auto 1rem;
    height: 440px;
}

/* Background S-Curve Road SVG */
.flow-road-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

/* Step Columns Grid */
.flow-steps-grid {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 1.5rem;
    height: 100%;
}

.flow-steps-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
.flow-steps-grid.cols-5 { grid-template-columns: repeat(5, 1fr); gap: 1.25rem; }
.flow-steps-grid.cols-6 { grid-template-columns: repeat(6, 1fr); gap: 1rem; }

/* Individual Flow Step */
.flow-node-item {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    position: relative;
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
    height: 100%;
}

.flow-node-item:hover {
    transform: translateY(-4px);
}

/* Top Steps: Text in Top Band, Icon on Road */
.flow-node-item.pos-top {
    justify-content: flex-start;
    padding-top: 0.5rem;
}

/* Bottom Steps: Icon on Road, Text in Bottom Band */
.flow-node-item.pos-bottom {
    justify-content: flex-end;
    padding-bottom: 0.5rem;
}

/* Squircle Icon */
.flow-squircle-icon {
    width: 58px;
    height: 58px;
    border-radius: 18px;
    background: #FFFFFF;
    color: #D97706;
    border: 1.5px solid #FDE68A;
    box-shadow: 0 10px 25px -4px rgba(217, 119, 6, 0.14), 0 2px 6px rgba(0, 0, 0, 0.02);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    flex-shrink: 0;
    position: relative;
    z-index: 3;
    align-self: center;
    transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 6-column / 5-column slightly compact icon */
.flow-steps-grid.cols-6 .flow-squircle-icon {
    width: 52px;
    height: 52px;
    font-size: 1.25rem;
    border-radius: 16px;
}

.flow-steps-grid.cols-5 .flow-squircle-icon {
    width: 54px;
    height: 54px;
    font-size: 1.3rem;
    border-radius: 17px;
}

/* Interactive Hover Transformation */
.flow-node-item:hover .flow-squircle-icon {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    border-color: transparent;
    transform: scale(1.12) rotate(3deg);
    box-shadow: 0 14px 30px rgba(217, 119, 6, 0.38);
}

/* Text Content Container */
.flow-node-body {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    text-align: center;
}

.flow-node-body h3 {
    font-size: 1.05rem;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.3;
    margin: 0;
    letter-spacing: -0.01em;
    transition: color 0.2s ease;
}

.flow-steps-grid.cols-6 .flow-node-body h3 {
    font-size: 0.96rem;
}

.flow-node-item:hover .flow-node-body h3 {
    color: #D97706;
}

.flow-node-body p {
    font-size: 0.81rem;
    color: #64748B;
    line-height: 1.5;
    margin: 0;
}

.flow-steps-grid.cols-6 .flow-node-body p {
    font-size: 0.76rem;
    line-height: 1.45;
}

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE FLOW MAP (TABLET & MOBILE)
   ═══════════════════════════════════════════════════════════ */
@media (max-width: 1024px) {
    .why-flow-wrapper {
        height: auto;
        padding-left: 2.5rem;
        margin-top: 2rem;
    }

    .flow-road-svg {
        display: none;
    }

    /* Vertical Connected Flow Road on Mobile */
    .why-flow-wrapper::before {
        content: '';
        position: absolute;
        top: 2rem;
        bottom: 2rem;
        left: 29px;
        width: 2.5px;
        background: repeating-linear-gradient(
            180deg,
            #F59E0B 0px,
            #F59E0B 7px,
            transparent 7px,
            transparent 14px
        );
        opacity: 0.25;
        z-index: 1;
    }

    .flow-steps-grid {
        display: flex !important;
        flex-direction: column !important;
        gap: 2rem !important;
        height: auto !important;
    }

    .flow-node-item.pos-top,
    .flow-node-item.pos-bottom {
        height: auto !important;
        flex-direction: row !important;
        align-items: flex-start !important;
        gap: 1.25rem !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    .flow-node-item .flow-squircle-icon {
        align-self: flex-start !important;
        order: -1 !important;
        width: 52px !important;
        height: 52px !important;
        font-size: 1.3rem !important;
        border-radius: 16px !important;
    }

    .flow-node-body {
        text-align: left !important;
    }

    .flow-node-body h3 {
        font-size: 1.06rem !important;
    }

    .flow-node-body p {
        font-size: 0.84rem !important;
    }
}
`;

// Corporate S-Flow HTML (6 Steps)
const corporateFlowHtml = `<!-- ═══════════════════════════════════════════════
     3. WHY CHOOSE US (Corporate S-Pattern Road Map)
════════════════════════════════════════════════ -->
<section class="section section-light why-flow-section" id="why-choose-us">
    <div class="container">
        <div class="section-header center">
            <span class="section-label center">Why Mithra</span>
            <h2 class="section-title center">Built Around Your Business</h2>
            <p class="section-desc center">Corporate transportation demands more than a vehicle. It requires <strong>reliability, responsiveness and consistency</strong>.</p>
        </div>

        <div class="why-flow-wrapper">
            <!-- Dynamic S-Curve Road SVG -->
            <svg class="flow-road-svg"></svg>

            <!-- 6 Flow Step Nodes -->
            <div class="flow-steps-grid cols-6">
                <!-- 1. Reliability (Top) -->
                <div class="flow-node-item pos-top">
                    <div class="flow-node-body">
                        <h3>On Time, Every Journey</h3>
                        <p>Dependable coordination and guaranteed vehicle availability for corporate needs.</p>
                    </div>
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-clock"></i>
                    </div>
                </div>

                <!-- 2. Safety (Bottom) -->
                <div class="flow-node-item pos-bottom">
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>
                    <div class="flow-node-body">
                        <h3>People First, Always</h3>
                        <p>Verified chauffeurs, GPS tracking, and rigorously maintained fleet vehicles.</p>
                    </div>
                </div>

                <!-- 3. Corporate-Ready (Top) -->
                <div class="flow-node-item pos-top">
                    <div class="flow-node-body">
                        <h3>Built for Business</h3>
                        <p>GST-compliant billing, trip-wise logs, and consolidated monthly invoicing.</p>
                    </div>
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-file-invoice-dollar"></i>
                    </div>
                </div>

                <!-- 4. Always Available (Bottom) -->
                <div class="flow-node-item pos-bottom">
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-headset"></i>
                    </div>
                    <div class="flow-node-body">
                        <h3>24×7×365 Support</h3>
                        <p>Dedicated desk assistance whenever your team travels or needs urgent dispatch.</p>
                    </div>
                </div>

                <!-- 5. Flexible Fleet (Top) -->
                <div class="flow-node-item pos-top">
                    <div class="flow-node-body">
                        <h3>Right Fleet Fit</h3>
                        <p>From Sedans, SUVs, and Crystas to Urbania, Tempo Travellers, and Luxury Buses.</p>
                    </div>
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-car-side"></i>
                    </div>
                </div>

                <!-- 6. One Trusted Partner (Bottom) -->
                <div class="flow-node-item pos-bottom">
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-layer-group"></i>
                    </div>
                    <div class="flow-node-body">
                        <h3>One Trusted Partner</h3>
                        <p>Rentals, airport transfers, and outstation managed via one reliable partner.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA -->
        <div style="text-align:center; margin-top:3rem; padding:2rem; background:#fff; border-radius:var(--r-xl); border:1.5px solid var(--border-card); box-shadow:var(--shadow-card);">
            <p style="font-size:1rem; font-weight:700; color:var(--text-heading); margin-bottom:1rem;">Looking for a reliable transportation partner?</p>
            <a href="contact.html#enquiry" class="btn btn-gold"><i class="fa-solid fa-arrow-right"></i> Let's Work Together</a>
        </div>
    </div>
</section>`;

// About Us S-Flow HTML (5 Steps)
const aboutFlowHtml = `<!-- ═══════════════════════════════════════════════
     5. WHY CHOOSE MITHRA (About Us S-Pattern Road Map)
════════════════════════════════════════════════ -->
<section class="section section-light why-flow-section" id="why-choose-mithra">
    <div class="container">
        <div class="section-header center">
            <span class="section-label center">Why Mithra</span>
            <h2 class="section-title center">More Than a Journey. A Promise We Keep.</h2>
            <p class="section-desc center">At Mithra, we believe great travel is built on <strong>trust, care and consistency</strong>.</p>
        </div>

        <div class="why-flow-wrapper">
            <!-- Dynamic S-Curve Road SVG -->
            <svg class="flow-road-svg"></svg>

            <!-- 5 Flow Step Nodes -->
            <div class="flow-steps-grid cols-5">
                <!-- 1. Safety (Top) -->
                <div class="flow-node-item pos-top">
                    <div class="flow-node-body">
                        <h3>Safety First</h3>
                        <p>Every journey begins with the safety, background checks, and comfort of our travellers.</p>
                    </div>
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>
                </div>

                <!-- 2. Consistency (Bottom) -->
                <div class="flow-node-item pos-bottom">
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-check-double"></i>
                    </div>
                    <div class="flow-node-body">
                        <h3>Same Standard Always</h3>
                        <p>We deliver a dependable, verified experience across every vehicle and journey.</p>
                    </div>
                </div>

                <!-- 3. Service (Top) -->
                <div class="flow-node-item pos-top">
                    <div class="flow-node-body">
                        <h3>Thoughtful Service</h3>
                        <p>From prompt dispatch to caring guest relations, every single detail matters.</p>
                    </div>
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-star"></i>
                    </div>
                </div>

                <!-- 4. Integrity (Bottom) -->
                <div class="flow-node-item pos-bottom">
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-handshake"></i>
                    </div>
                    <div class="flow-node-body">
                        <h3>Integrity & Trust</h3>
                        <p>Lasting client relationships built on clear, transparent, and honest business practices.</p>
                    </div>
                </div>

                <!-- 5. Partnership (Top) -->
                <div class="flow-node-item pos-top">
                    <div class="flow-node-body">
                        <h3>Long-Term Partnership</h3>
                        <p>Relationships that flourish through dependability, collaboration, and mutual growth.</p>
                    </div>
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-users"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;

// Dynamic JS Script for all pages (supports any number of flow nodes)
const dynamicFlowScript = `
<script>
// Pixel-Perfect Dynamic S-Curve Road Line Generator for Flow Maps
function updateAllFlowRoads() {
    const wrappers = document.querySelectorAll('.why-flow-wrapper');
    wrappers.forEach(wrapper => {
        const svg = wrapper.querySelector('.flow-road-svg');
        const icons = wrapper.querySelectorAll('.flow-squircle-icon');
        if (!svg || icons.length < 2) return;

        if (window.innerWidth <= 1024) {
            svg.innerHTML = '';
            return;
        }

        const wRect = wrapper.getBoundingClientRect();
        const pts = Array.from(icons).map(icon => {
            const iRect = icon.getBoundingClientRect();
            return {
                x: Math.round(iRect.left - wRect.left + iRect.width / 2),
                y: Math.round(iRect.top - wRect.top + iRect.height / 2)
            };
        });

        // Build smooth cubic Bezier S-curve directly through icon centers
        let d = \`M \${pts[0].x} \${pts[0].y}\`;
        for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[i];
            const p1 = pts[i + 1];
            const dx = (p1.x - p0.x) * 0.5;
            d += \` C \${p0.x + dx} \${p0.y}, \${p1.x - dx} \${p1.y}, \${p1.x} \${p1.y}\`;
        }

        // Add glowing node rings on each icon
        const nodes = pts.map(p => 
            \`<circle cx="\${p.x}" cy="\${p.y}" r="8" fill="#FFFFFF" stroke="#F59E0B" stroke-width="3" opacity="0.9" />\`
        ).join('');

        svg.setAttribute('viewBox', \`0 0 \${Math.round(wRect.width)} \${Math.round(wRect.height)}\`);
        svg.innerHTML = \`
            <!-- Soft Glow Track Underlay -->
            <path d="\${d}" fill="none" stroke="#FDE68A" stroke-width="7" stroke-linecap="round" opacity="0.30" />
            <!-- Dashed S-Road Line -->
            <path d="\${d}" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="6 8" opacity="0.40" stroke-linecap="round" />
            \${nodes}
        \`;
    });
}

window.addEventListener('DOMContentLoaded', () => {
    updateAllFlowRoads();
    setTimeout(updateAllFlowRoads, 250);
});
window.addEventListener('resize', updateAllFlowRoads);
window.addEventListener('load', updateAllFlowRoads);
</script>
`;

// 1. Update CSS
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*MITHRA — S-PATTERN FLOW[\s\S]*?(?=$)/;
    if (regex.test(css)) {
        css = css.replace(regex, flowMapGlobalCss.trim());
    } else {
        const oldRegex = /\/\* ═+\r?\n\s*WHY MITHRA — [\s\S]*?(?=$)/;
        if (oldRegex.test(css)) {
            css = css.replace(oldRegex, flowMapGlobalCss.trim());
        } else {
            css += '\n\n' + flowMapGlobalCss.trim() + '\n';
        }
    }
    fs.writeFileSync(file, css, 'utf8');
});

// 2. Update corporate.html
['v2/corporate.html', 'corporate.html', 'deploy_ready/corporate.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const regex = /<!--\s*3\.\s*WHY CHOOSE US[\s\S]*?<\/section>/;
    if (regex.test(html)) {
        html = html.replace(regex, corporateFlowHtml);
    }

    html = html.replace(/<script>\s*\/\/\s*Pixel-Perfect Dynamic S-Curve[\s\S]*?<\/script>/, '');
    html = html.replace('</body>', `${dynamicFlowScript}\n</body>`);

    fs.writeFileSync(file, html, 'utf8');
    console.log('Updated corporate.html with S-flow map:', file);
});

// 3. Update about.html
['v2/about.html', 'about.html', 'deploy_ready/about.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const regex = /<!--\s*5\.\s*WHY CHOOSE MITHRA[\s\S]*?<\/section>/;
    if (regex.test(html)) {
        html = html.replace(regex, aboutFlowHtml);
    }

    html = html.replace(/<script>\s*\/\/\s*Pixel-Perfect Dynamic S-Curve[\s\S]*?<\/script>/, '');
    html = html.replace('</body>', `${dynamicFlowScript}\n</body>`);

    fs.writeFileSync(file, html, 'utf8');
    console.log('Updated about.html with S-flow map:', file);
});

// 4. Update index.html script tag
['v2/index.html', 'index.html', 'deploy_ready/index.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    html = html.replace(/<script>\s*\/\/\s*Pixel-Perfect Dynamic S-Curve[\s\S]*?<\/script>/, '');
    html = html.replace('</body>', `${dynamicFlowScript}\n</body>`);

    fs.writeFileSync(file, html, 'utf8');
});

console.log('Applied S-flow map across corporate.html and about.html!');
