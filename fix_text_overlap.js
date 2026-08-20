const fs = require('fs');
const path = require('path');

const perfectedClearBandCss = `/* ═══════════════════════════════════════════════════════════
   WHY MITHRA — SNAKE / S-SHAPE ROADMAP (ZERO TEXT OVERLAP)
   ═══════════════════════════════════════════════════════════ */

.why-snake-section {
    position: relative;
    padding: 3.5rem 0 4.5rem;
    background: #FFFFFF;
    overflow: hidden;
}

.why-snake-container {
    position: relative;
    max-width: 1200px;
    margin: 3.5rem auto 0;
    height: 430px;
}

/* Background S-Curve SVG Track (Clear Middle Corridor) */
.snake-road-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

/* 4 Floating Steps along the S-Curve */
.snake-steps-layer {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    height: 100%;
}

/* Individual Snake Step */
.snake-step-item {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    position: relative;
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
    z-index: 2;
}

.snake-step-item:hover {
    transform: translateY(-4px);
}

/* Top Steps: Confined to Top Zone */
.snake-step-item.pos-top {
    align-self: flex-start;
    padding-bottom: 0;
}

/* Bottom Steps: Confined to Bottom Zone */
.snake-step-item.pos-bottom {
    align-self: flex-end;
    padding-top: 0;
}

/* Squircle Icon */
.snake-squircle-icon {
    width: 54px;
    height: 54px;
    border-radius: 17px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.35rem;
    flex-shrink: 0;
    position: relative;
    z-index: 3;
    background: #FFFFFF;
    color: #D97706;
    border: 1.5px solid #FDE68A;
    box-shadow: 0 6px 20px rgba(217, 119, 6, 0.10), 0 2px 6px rgba(0, 0, 0, 0.02);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover Effect on Icon */
.snake-step-item:hover .snake-squircle-icon {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    border-color: transparent;
    transform: scale(1.12) rotate(3deg);
    box-shadow: 0 10px 26px rgba(217, 119, 6, 0.38);
}

/* Content Text */
.snake-content {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    position: relative;
    z-index: 3;
}

.snake-content h3 {
    font-size: 1.1rem;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.3;
    margin: 0;
    letter-spacing: -0.01em;
    transition: color 0.2s ease;
}

.snake-step-item:hover .snake-content h3 {
    color: #D97706;
}

.snake-content p {
    font-size: 0.83rem;
    color: #64748B;
    line-height: 1.55;
    margin: 0;
}

/* ═══════════════════════════════════════════════════════════
   MOBILE RESPONSIVE S-ROADMAP (≤ 992px & ≤ 768px)
   ═══════════════════════════════════════════════════════════ */
@media (max-width: 992px) {
    .why-snake-section {
        padding: 2rem 0 3rem;
    }

    .snake-road-svg {
        display: none;
    }

    .why-snake-container {
        margin-top: 1.5rem;
        padding-left: 2rem;
        height: auto;
    }

    /* Vertical Dotted Road on Mobile Margin */
    .why-snake-container::before {
        content: '';
        position: absolute;
        top: 1.5rem;
        bottom: 1.5rem;
        left: 28px;
        width: 2px;
        background: repeating-linear-gradient(
            180deg,
            #F59E0B 0px,
            #F59E0B 7px,
            transparent 7px,
            transparent 14px
        );
        opacity: 0.20;
        z-index: 1;
    }

    .snake-steps-layer {
        display: flex;
        flex-direction: column;
        gap: 1.85rem;
        height: auto;
    }

    .snake-step-item {
        margin: 0 !important;
        padding: 0 !important;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 1.25rem;
    }

    .snake-squircle-icon {
        width: 48px;
        height: 48px;
        font-size: 1.2rem;
        border-radius: 15px;
    }

    .snake-content {
        padding-top: 0.25rem;
    }

    .snake-content h3 {
        font-size: 1.05rem;
        margin-bottom: 0.2rem;
    }

    .snake-content p {
        font-size: 0.84rem;
    }
}
`;

const perfectedClearBandHtml = `<!-- ═══════════════════════════════════════════════
     4. WHY MITHRA (Snake / S-Curve Zero-Overlap Roadmap)
════════════════════════════════════════════════ -->
<section class="section why-snake-section" id="why-mithra">
    <div class="container">
        <div class="section-header center">
            <span class="section-label center">Why Choose Us</span>
            <h2 class="section-title center">Why Mithra Tours & Travels</h2>
            <p class="section-desc center">One Vendor, Every Need · Consistency You Can Verify · Safety First · On-Time, Every Time.</p>
        </div>

        <div class="why-snake-container">
            <!-- Smooth S-Curve Snake Road SVG (Clear Open Buffer Corridor) -->
            <svg class="snake-road-svg" viewBox="0 0 1150 430" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Soft Glow Track Underlay -->
                <path d="M 40 185 C 200 185, 200 245, 380 245 C 560 245, 560 185, 740 185 C 920 185, 920 245, 1100 245" 
                      stroke="#FDE68A" stroke-width="6" stroke-linecap="round" opacity="0.16" />
                <!-- Dashed S-Road Line -->
                <path d="M 40 185 C 200 185, 200 245, 380 245 C 560 245, 560 185, 740 185 C 920 185, 920 245, 1100 245" 
                      stroke="#F59E0B" stroke-width="2" stroke-dasharray="6 8" opacity="0.20" stroke-linecap="round" />
                
                <!-- 4 Milestone Markers in Corridor -->
                <circle cx="68" cy="185" r="4" fill="#F59E0B" opacity="0.25" />
                <circle cx="380" cy="245" r="4" fill="#F59E0B" opacity="0.25" />
                <circle cx="740" cy="185" r="4" fill="#F59E0B" opacity="0.25" />
                <circle cx="1060" cy="245" r="4" fill="#F59E0B" opacity="0.25" />
            </svg>

            <!-- 4 Floating Steps -->
            <div class="snake-steps-layer">
                <!-- Step 01: Top -->
                <div class="snake-step-item pos-top">
                    <div class="snake-squircle-icon">
                        <i class="fa-solid fa-layer-group"></i>
                    </div>
                    <div class="snake-content">
                        <h3>One Vendor, Every Need</h3>
                        <p>From daily corporate cabs to flights, hotels, and visas — complete travel coverage without managing multiple vendors.</p>
                    </div>
                </div>

                <!-- Step 02: Bottom -->
                <div class="snake-step-item pos-bottom">
                    <div class="snake-squircle-icon">
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>
                    <div class="snake-content">
                        <h3>Consistency You Can Verify</h3>
                        <p>Every vehicle in our network operates under the same documented standard: verified drivers, hygiene, and guest satisfaction.</p>
                    </div>
                </div>

                <!-- Step 03: Top -->
                <div class="snake-step-item pos-top">
                    <div class="snake-squircle-icon">
                        <i class="fa-solid fa-lock"></i>
                    </div>
                    <div class="snake-content">
                        <h3>Safety First</h3>
                        <p>Verified drivers, speed governance, and strictly maintained vehicles aren't a claim — they're an enforced standard across our fleet.</p>
                    </div>
                </div>

                <!-- Step 04: Bottom -->
                <div class="snake-step-item pos-bottom">
                    <div class="snake-squircle-icon">
                        <i class="fa-solid fa-clock"></i>
                    </div>
                    <div class="snake-content">
                        <h3>On-Time, Every Time</h3>
                        <p>We arrange vehicles punctually without exception — because a late pickup compromises every other part of the travel experience.</p>
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

    const regex = /\/\* ═+\r?\n\s*WHY MITHRA — (?:ZIG-ZAG|SNAKE)[\s\S]*?(?=$)/;
    if (regex.test(css)) {
        css = css.replace(regex, perfectedClearBandCss.trim());
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
        html = html.replace(regex, perfectedClearBandHtml);
        fs.writeFileSync(file, html, 'utf8');
    }
});

console.log('Applied perfected clear band roadmap!');
