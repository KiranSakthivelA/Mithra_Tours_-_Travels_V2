const fs = require('fs');
const path = require('path');

const sFlowMapCss = `/* ═══════════════════════════════════════════════════════════
   WHY MITHRA — S-PATTERN FLOW / ROAD MAP (INSPIRATION MATCH)
   ═══════════════════════════════════════════════════════════ */

.why-flow-section {
    position: relative;
    padding: 3.5rem 0 5rem;
    background: #FFFFFF;
    overflow: hidden;
}

.why-flow-wrapper {
    position: relative;
    max-width: 1220px;
    margin: 3.5rem auto 1rem;
    height: 380px;
}

/* Background S-Curve Road SVG (Continuous Flow Between Icons) */
.flow-road-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

/* 4 Step Nodes along the Flow Map */
.flow-steps-grid {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    height: 100%;
}

/* Individual Flow Node: Horizontal Flex (Icon on Left, Text on Right) */
.flow-node-item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 1.1rem;
    position: relative;
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
}

.flow-node-item:hover {
    transform: translateY(-4px);
}

/* Alternating Vertical Positions (S-Wave Flow) */
.flow-node-item.pos-top {
    align-self: flex-start;
    padding-top: 1.5rem;
}

.flow-node-item.pos-bottom {
    align-self: flex-end;
    padding-bottom: 1.5rem;
}

/* Squircle Icon (Elevated Neumorphic Apple-Style Button) */
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

/* Text Content Container (On the Right of Icon) */
.flow-node-body {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding-top: 0.2rem;
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

    .flow-node-item {
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

const sFlowMapHtml = `<!-- ═══════════════════════════════════════════════
     4. WHY MITHRA (S-Pattern Flow / Road Map)
════════════════════════════════════════════════ -->
<section class="section why-flow-section" id="why-mithra">
    <div class="container">
        <div class="section-header center">
            <span class="section-label center">Why Choose Us</span>
            <h2 class="section-title center">Why Mithra Tours & Travels</h2>
            <p class="section-desc center">One Vendor, Every Need · Consistency You Can Verify · Safety First · On-Time, Every Time.</p>
        </div>

        <div class="why-flow-wrapper">
            <!-- Smooth S-Pattern Road SVG (Connecting the Squircle Icons Directly) -->
            <svg class="flow-road-svg" viewBox="0 0 1200 380" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Outer Soft Glow Flow Path -->
                <path d="M 30 55 C 180 55, 180 325, 335 325 C 490 325, 490 55, 645 55 C 800 55, 800 325, 955 325" 
                      stroke="#FDE68A" stroke-width="7" stroke-linecap="round" opacity="0.22" />
                <!-- Dashed S-Road Line -->
                <path d="M 30 55 C 180 55, 180 325, 335 325 C 490 325, 490 55, 645 55 C 800 55, 800 325, 955 325" 
                      stroke="#F59E0B" stroke-width="2.2" stroke-dasharray="6 8" opacity="0.28" stroke-linecap="round" />
                
                <!-- 4 Flow Node Points on Icons -->
                <circle cx="30" cy="55" r="5" fill="#F59E0B" opacity="0.35" />
                <circle cx="335" cy="325" r="5" fill="#F59E0B" opacity="0.35" />
                <circle cx="645" cy="55" r="5" fill="#F59E0B" opacity="0.35" />
                <circle cx="955" cy="325" r="5" fill="#F59E0B" opacity="0.35" />
            </svg>

            <!-- 4 Flow Step Nodes -->
            <div class="flow-steps-grid">
                <!-- 1. One Vendor, Every Need (Top) -->
                <div class="flow-node-item pos-top">
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-layer-group"></i>
                    </div>
                    <div class="flow-node-body">
                        <h3>One Vendor, Every Need</h3>
                        <p>From daily cabs to flights, hotels, and visas — complete travel coverage without managing multiple vendors.</p>
                    </div>
                </div>

                <!-- 2. Consistency You Can Verify (Bottom) -->
                <div class="flow-node-item pos-bottom">
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>
                    <div class="flow-node-body">
                        <h3>Consistency You Can Verify</h3>
                        <p>Every vehicle in our network operates under the same documented standard: verified drivers & uniform hygiene.</p>
                    </div>
                </div>

                <!-- 3. Safety First (Top) -->
                <div class="flow-node-item pos-top">
                    <div class="flow-squircle-icon">
                        <i class="fa-solid fa-lock"></i>
                    </div>
                    <div class="flow-node-body">
                        <h3>Safety First</h3>
                        <p>Verified drivers, GPS tracking, and rigorously maintained vehicles enforced across our entire fleet.</p>
                    </div>
                </div>

                <!-- 4. On-Time, Every Time (Bottom) -->
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

// 1. Update CSS
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*WHY MITHRA — [\s\S]*?(?=$)/;
    if (regex.test(css)) {
        css = css.replace(regex, sFlowMapCss.trim());
        fs.writeFileSync(file, css, 'utf8');
    } else {
        css += '\n\n' + sFlowMapCss.trim() + '\n';
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
        html = html.replace(regex, sFlowMapHtml);
        fs.writeFileSync(file, html, 'utf8');
    }
});

console.log('Applied genuine S-pattern Flow / Road Map!');
