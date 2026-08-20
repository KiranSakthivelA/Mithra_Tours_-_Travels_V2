const fs = require('fs');
const path = require('path');

const snakeRoadmapCss = `/* ═══════════════════════════════════════════════════════════
   WHY MITHRA — SNAKE / S-SHAPE ROADMAP (LIGHTWEIGHT & MINIMAL)
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
    min-height: 380px;
}

/* Background S-Curve SVG Track (Low Opacity) */
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
    gap: 1.8rem;
    min-height: 370px;
}

/* Individual Snake Step (No Big Card) */
.snake-step-item {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    position: relative;
    transition: transform 0.25s ease;
}

.snake-step-item:hover {
    transform: translateY(-3px);
}

/* Alternating Position on Desktop (Snake Wave) */
.snake-step-item.pos-top {
    margin-bottom: auto;
    padding-top: 0;
}

.snake-step-item.pos-bottom {
    margin-top: auto;
    padding-bottom: 0;
}

/* Header Row: Squircle Icon + Step Tag */
.snake-header-row {
    display: flex;
    align-items: center;
    gap: 0.85rem;
}

/* Squircle Icon (Tactile Elevation, Soft Gold / Vivid Gold) */
.snake-squircle-icon {
    width: 56px;
    height: 56px;
    border-radius: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.35rem;
    flex-shrink: 0;
    position: relative;
    z-index: 3;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
}

.snake-step-item:hover .snake-squircle-icon {
    transform: scale(1.1) rotate(2deg);
}

/* Style A: Soft White / Gold Minimal Squircle */
.snake-squircle-icon.style-soft {
    background: #FFFFFF;
    color: #D97706;
    border: 1.5px solid #FDE68A;
    box-shadow: 0 8px 24px rgba(217, 119, 6, 0.12), 0 2px 6px rgba(0, 0, 0, 0.03);
}

/* Style B: Vivid Amber Gold Squircle */
.snake-squircle-icon.style-vivid {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    box-shadow: 0 10px 24px rgba(217, 119, 6, 0.32);
}

/* Step Pill Tag */
.snake-step-tag {
    font-size: 0.70rem;
    font-weight: 800;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #92400E;
    background: #FEF3C7;
    padding: 0.22rem 0.65rem;
    border-radius: 9999px;
    display: inline-block;
    width: fit-content;
}

/* Content Text (Airy, Clean & Minimal) */
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
}

.snake-content p {
    font-size: 0.83rem;
    color: #64748B;
    line-height: 1.6;
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
        min-height: auto;
    }

    /* Vertical Curved Dotted Road on Mobile (Low Opacity) */
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
            #F59E0B 6px,
            transparent 6px,
            transparent 12px
        );
        opacity: 0.32;
        z-index: 1;
    }

    .snake-steps-layer {
        display: flex;
        flex-direction: column;
        gap: 1.85rem;
        min-height: auto;
    }

    .snake-step-item {
        margin: 0 !important;
        padding: 0 !important;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 1.15rem;
    }

    .snake-header-row {
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;
        flex-shrink: 0;
        z-index: 2;
    }

    .snake-squircle-icon {
        width: 48px;
        height: 48px;
        font-size: 1.2rem;
        border-radius: 15px;
    }

    .snake-content {
        padding-top: 0.2rem;
    }

    .snake-content h3 {
        font-size: 1.02rem;
        margin-bottom: 0.2rem;
    }

    .snake-content p {
        font-size: 0.82rem;
    }
}
`;

const snakeRoadmapHtml = `<!-- ═══════════════════════════════════════════════
     4. WHY MITHRA (Snake / S-Curve Lightweight Roadmap)
════════════════════════════════════════════════ -->
<section class="section why-snake-section" id="why-mithra">
    <div class="container">
        <div class="section-header center">
            <span class="section-label center">Why Choose Us</span>
            <h2 class="section-title center">Why Mithra Tours & Travels</h2>
            <p class="section-desc center">One Vendor, Every Need · Consistency You Can Verify · Safety First · On-Time, Every Time.</p>
        </div>

        <div class="why-snake-container">
            <!-- Smooth S-Curve Snake Road SVG (Low Opacity Track) -->
            <svg class="snake-road-svg" viewBox="0 0 1150 370" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Soft Glow Path -->
                <path d="M 28 28 C 170 28, 170 190, 315 190 C 460 190, 460 28, 605 28 C 750 28, 750 190, 920 190" 
                      stroke="#FDE68A" stroke-width="8" stroke-linecap="round" opacity="0.25" />
                <!-- Dashed S-Road Line (Subtle Low Opacity) -->
                <path d="M 28 28 C 170 28, 170 190, 315 190 C 460 190, 460 28, 605 28 C 750 28, 750 190, 920 190" 
                      stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="6 9" opacity="0.32" stroke-linecap="round" />
                
                <!-- 4 Soft Milestone Markers behind icons -->
                <circle cx="28" cy="28" r="6" fill="#F59E0B" opacity="0.4" />
                <circle cx="315" cy="190" r="6" fill="#F59E0B" opacity="0.4" />
                <circle cx="605" cy="28" r="6" fill="#F59E0B" opacity="0.4" />
                <circle cx="920" cy="190" r="6" fill="#F59E0B" opacity="0.4" />
            </svg>

            <!-- 4 Clean, Borderless Floating Steps -->
            <div class="snake-steps-layer">
                <!-- Step 01: Top (Soft Gold Squircle) -->
                <div class="snake-step-item pos-top">
                    <div class="snake-header-row">
                        <div class="snake-squircle-icon style-soft">
                            <i class="fa-solid fa-layer-group"></i>
                        </div>
                        <span class="snake-step-tag">Step 01</span>
                    </div>
                    <div class="snake-content">
                        <h3>One Vendor, Every Need</h3>
                        <p>From daily corporate cabs to flights, hotels, and visas — complete travel coverage without managing multiple vendors.</p>
                    </div>
                </div>

                <!-- Step 02: Bottom (Vivid Gold Squircle) -->
                <div class="snake-step-item pos-bottom">
                    <div class="snake-header-row">
                        <div class="snake-squircle-icon style-vivid">
                            <i class="fa-solid fa-shield-halved"></i>
                        </div>
                        <span class="snake-step-tag">Step 02</span>
                    </div>
                    <div class="snake-content">
                        <h3>Consistency You Can Verify</h3>
                        <p>Every vehicle in our network operates under the same documented standard: verified drivers, hygiene, and guest satisfaction.</p>
                    </div>
                </div>

                <!-- Step 03: Top (Soft Gold Squircle) -->
                <div class="snake-step-item pos-top">
                    <div class="snake-header-row">
                        <div class="snake-squircle-icon style-soft">
                            <i class="fa-solid fa-lock"></i>
                        </div>
                        <span class="snake-step-tag">Step 03</span>
                    </div>
                    <div class="snake-content">
                        <h3>Safety First</h3>
                        <p>Verified drivers, speed governance, and strictly maintained vehicles aren't a claim — they're an enforced standard across our fleet.</p>
                    </div>
                </div>

                <!-- Step 04: Bottom (Vivid Gold Squircle) -->
                <div class="snake-step-item pos-bottom">
                    <div class="snake-header-row">
                        <div class="snake-squircle-icon style-vivid">
                            <i class="fa-solid fa-clock"></i>
                        </div>
                        <span class="snake-step-tag">Step 04</span>
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
['v2/css/brand.css', 'css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*WHY MITHRA — (?:ZIG-ZAG|SNAKE)[\s\S]*?(?=$)/;
    if (regex.test(css)) {
        css = css.replace(regex, snakeRoadmapCss.trim());
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
        html = html.replace(regex, snakeRoadmapHtml);
        fs.writeFileSync(file, html, 'utf8');
    }
});
console.log('Applied perfected snake roadmap!');
