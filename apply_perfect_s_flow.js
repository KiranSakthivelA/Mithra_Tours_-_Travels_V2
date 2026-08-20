const fs = require('fs');
const path = require('path');

const perfectSFlowCss = `/* ═══════════════════════════════════════════════════════════
   WHY MITHRA — TRUE S-PATTERN ROADMAP (ICONS ON ROAD LINE)
   ═══════════════════════════════════════════════════════════ */

.why-flow-section {
    position: relative;
    padding: 3.5rem 0 5rem;
    background: #FFFFFF;
    overflow: hidden;
}

.why-flow-wrapper {
    position: relative;
    max-width: 1200px;
    margin: 3.5rem auto 1rem;
    height: 380px;
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

/* 4 Step Columns */
.flow-steps-grid {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    height: 100%;
}

/* Individual Flow Step */
.flow-node-item {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    position: relative;
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
}

.flow-node-item:hover {
    transform: translateY(-4px);
}

/* Top Steps (Step 1 & Step 3): Text on Top, Icon on Bottom (Touches Road) */
.flow-node-item.pos-top {
    align-self: flex-start;
    flex-direction: column;
    justify-content: flex-end;
    height: 220px;
}

/* Bottom Steps (Step 2 & Step 4): Icon on Top (Touches Road), Text on Bottom */
.flow-node-item.pos-bottom {
    align-self: flex-end;
    flex-direction: column;
    justify-content: flex-start;
    height: 220px;
}

/* Squircle Icon */
.flow-squircle-icon {
    width: 60px;
    height: 60px;
    border-radius: 19px;
    background: #FFFFFF;
    color: #D97706;
    border: 1.5px solid #FDE68A;
    box-shadow: 0 10px 25px -4px rgba(217, 119, 6, 0.14), 0 2px 6px rgba(0, 0, 0, 0.02);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.45rem;
    flex-shrink: 0;
    position: relative;
    z-index: 3;
    transition: all 0.32s cubic-bezier(0.4, 0, 0.2, 1);
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
    gap: 0.35rem;
}

.flow-node-body h3 {
    font-size: 1.12rem;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.3;
    margin: 0;
    letter-spacing: -0.01em;
    transition: color 0.2s ease;
}

.flow-node-item:hover .flow-node-body h3 {
    color: #D97706;
}

.flow-node-body p {
    font-size: 0.83rem;
    color: #64748B;
    line-height: 1.55;
    margin: 0;
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
        display: flex;
        flex-direction: column;
        gap: 2.25rem;
        height: auto;
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

    .flow-squircle-icon {
        width: 52px;
        height: 52px;
        font-size: 1.3rem;
        border-radius: 16px;
    }

    .flow-node-body h3 {
        font-size: 1.06rem;
    }

    .flow-node-body p {
        font-size: 0.84rem;
    }
}
`;

const perfectSFlowHtml = `<!-- ═══════════════════════════════════════════════
     4. WHY MITHRA (True S-Pattern Road Map)
════════════════════════════════════════════════ -->
<section class="section why-flow-section" id="why-mithra">
    <div class="container">
        <div class="section-header center">
            <span class="section-label center">Why Choose Us</span>
            <h2 class="section-title center">Why Mithra Tours & Travels</h2>
            <p class="section-desc center">One Vendor, Every Need · Consistency You Can Verify · Safety First · On-Time, Every Time.</p>
        </div>

        <div class="why-flow-wrapper">
            <!-- Dynamic S-Curve Road SVG (Line Connects Directly Between All 4 Icons) -->
            <svg class="flow-road-svg"></svg>

            <!-- 4 Flow Step Nodes -->
            <div class="flow-steps-grid">
                <!-- 1. One Vendor, Every Need (Top: Text on Top, Icon on Road) -->
                <div class="flow-node-item pos-top">
                    <div class="flow-node-body">
                        <h3>One Vendor, Every Need</h3>
                        <p>From daily cabs to flights, hotels, and visas — complete travel coverage without managing multiple vendors.</p>
                    </div>
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-layer-group"></i>
                    </div>
                </div>

                <!-- 2. Consistency You Can Verify (Bottom: Icon on Road, Text Below) -->
                <div class="flow-node-item pos-bottom">
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>
                    <div class="flow-node-body">
                        <h3>Consistency You Can Verify</h3>
                        <p>Every vehicle in our network operates under the same documented standard: verified drivers & uniform hygiene.</p>
                    </div>
                </div>

                <!-- 3. Safety First (Top: Text on Top, Icon on Road) -->
                <div class="flow-node-item pos-top">
                    <div class="flow-node-body">
                        <h3>Safety First</h3>
                        <p>Verified drivers, GPS tracking, and rigorously maintained vehicles enforced across our entire fleet.</p>
                    </div>
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-lock"></i>
                    </div>
                </div>

                <!-- 4. On-Time, Every Time (Bottom: Icon on Road, Text Below) -->
                <div class="flow-node-item pos-bottom">
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-clock"></i>
                    </div>
                    <div class="flow-node-body">
                        <h3>On-Time, Every Time</h3>
                        <p>We arrange vehicles punctually without exception — because a late pickup compromises every journey.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;

const perfectDynamicScript = `
<script>
// Pixel-Perfect Dynamic S-Curve Road Line Connecting Each Icon
function updateFlowRoad() {
    const wrapper = document.querySelector('.why-flow-wrapper');
    const svg = document.querySelector('.flow-road-svg');
    const icons = document.querySelectorAll('.flow-squircle-icon');
    if (!wrapper || !svg || icons.length < 4) return;

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

    // Build smooth cubic Bezier S-curve directly between icons
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
        <!-- Soft Glow Track Underlay (fill=none) -->
        <path d="\${d}" fill="none" stroke="#FDE68A" stroke-width="7" stroke-linecap="round" opacity="0.30" />
        <!-- Dashed S-Road Line (fill=none) -->
        <path d="\${d}" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="6 8" opacity="0.40" stroke-linecap="round" />
        \${nodes}
    \`;
}

window.addEventListener('DOMContentLoaded', () => {
    updateFlowRoad();
    setTimeout(updateFlowRoad, 250);
});
window.addEventListener('resize', updateFlowRoad);
window.addEventListener('load', updateFlowRoad);
</script>
`;

// 1. Update CSS
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*WHY MITHRA — [\s\S]*?(?=$)/;
    if (regex.test(css)) {
        css = css.replace(regex, perfectSFlowCss.trim());
        fs.writeFileSync(file, css, 'utf8');
    }
});

// 2. Update HTML
['v2/index.html', 'index.html', 'deploy_ready/index.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const regex = /<!--\s*═+\r?\n\s*4\.\s*WHY MITHRA[\s\S]*?<\/section>/;
    if (regex.test(html)) {
        html = html.replace(regex, perfectSFlowHtml);
    }

    // Replace script
    html = html.replace(/<script>\s*\/\/\s*Pixel-Perfect Dynamic S-Curve[\s\S]*?<\/script>/, '');
    html = html.replace('</body>', `${perfectDynamicScript}\n</body>`);

    fs.writeFileSync(file, html, 'utf8');
});

console.log('Applied perfected S-flow with icons positioned directly on the road line!');
