const fs = require('fs');
const path = require('path');

const cleanCardsCss = `/* ═══════════════════════════════════════════════════════════
   WHY MITHRA — CLEAN PREMIUM PILLARS GRID (NO DISTURBING LINES)
   ═══════════════════════════════════════════════════════════ */

.why-pillars-section {
    position: relative;
    padding: 3.5rem 0 4.5rem;
    background: #FAFAFA;
}

.why-pillars-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-top: 2.75rem;
}

.why-pillar-card {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 22px;
    padding: 2rem 1.6rem;
    box-shadow: 0 8px 24px -4px rgba(15, 23, 42, 0.05), 0 2px 6px rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: default;
}

.why-pillar-card:hover {
    transform: translateY(-6px);
    border-color: #F59E0B;
    box-shadow: 0 20px 36px -8px rgba(217, 119, 6, 0.16), 0 4px 12px rgba(0, 0, 0, 0.03);
}

/* Squircle Icon Container */
.why-pillar-icon {
    width: 56px;
    height: 56px;
    border-radius: 17px;
    background: #FFFBEB;
    color: #D97706;
    border: 1.5px solid #FDE68A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    box-shadow: 0 4px 14px rgba(217, 119, 6, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.why-pillar-card:hover .why-pillar-icon {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    border-color: transparent;
    transform: scale(1.1) rotate(3deg);
    box-shadow: 0 10px 24px rgba(217, 119, 6, 0.35);
}

/* Pillar Content */
.why-pillar-card h3 {
    font-size: 1.15rem;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.35;
    margin: 0;
    letter-spacing: -0.01em;
    transition: color 0.2s ease;
}

.why-pillar-card:hover h3 {
    color: #D97706;
}

.why-pillar-card p {
    font-size: 0.86rem;
    color: #64748B;
    line-height: 1.65;
    margin: 0;
}

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE PILLARS GRID (TABLET & MOBILE)
   ═══════════════════════════════════════════════════════════ */
@media (max-width: 1100px) {
    .why-pillars-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
    }
}

@media (max-width: 640px) {
    .why-pillars-section {
        padding: 2.25rem 0 3.25rem;
    }

    .why-pillars-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
        margin-top: 1.75rem;
    }

    .why-pillar-card {
        padding: 1.5rem 1.35rem;
        border-radius: 18px;
        gap: 0.9rem;
    }

    .why-pillar-icon {
        width: 50px;
        height: 50px;
        font-size: 1.25rem;
        border-radius: 15px;
    }

    .why-pillar-card h3 {
        font-size: 1.08rem;
    }

    .why-pillar-card p {
        font-size: 0.85rem;
    }
}
`;

const cleanCardsHtml = `<!-- ═══════════════════════════════════════════════
     4. WHY MITHRA (Clean Premium Pillars Grid - No Lines)
════════════════════════════════════════════════ -->
<section class="section section-light why-pillars-section" id="why-mithra">
    <div class="container">
        <div class="section-header center">
            <span class="section-label center">Why Choose Us</span>
            <h2 class="section-title center">Why Mithra Tours & Travels</h2>
            <p class="section-desc center">One Vendor, Every Need · Consistency You Can Verify · Safety First · On-Time, Every Time.</p>
        </div>

        <div class="why-pillars-grid">
            <!-- 1. One Vendor, Every Need -->
            <div class="why-pillar-card">
                <div class="why-pillar-icon"><i class="fa-solid fa-layer-group"></i></div>
                <h3>One Vendor, Every Need</h3>
                <p>From daily corporate cabs to flights, hotels, and visas — we cover the full travel requirement so you never have to juggle multiple vendors.</p>
            </div>

            <!-- 2. Consistency You Can Verify -->
            <div class="why-pillar-card">
                <div class="why-pillar-icon"><i class="fa-solid fa-shield-halved"></i></div>
                <h3>Consistency You Can Verify</h3>
                <p>Every vehicle in our network operates under the same documented standard: verified drivers, pristine hygiene, and uniform guest experience.</p>
            </div>

            <!-- 3. Safety First -->
            <div class="why-pillar-card">
                <div class="why-pillar-icon"><i class="fa-solid fa-lock"></i></div>
                <h3>Safety First</h3>
                <p>Verified drivers, GPS tracking, speed governance, and rigorously maintained vehicles aren't a claim — they're an enforced standard across our fleet.</p>
            </div>

            <!-- 4. On-Time, Every Time -->
            <div class="why-pillar-card">
                <div class="why-pillar-icon"><i class="fa-solid fa-clock"></i></div>
                <h3>On-Time, Every Time</h3>
                <p>We arrange vehicles punctually without exception — because a late pickup compromises every other part of the corporate travel experience.</p>
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
        css = css.replace(regex, cleanCardsCss.trim());
        fs.writeFileSync(file, css, 'utf8');
    } else {
        css += '\n\n' + cleanCardsCss.trim() + '\n';
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
        html = html.replace(regex, cleanCardsHtml);
        fs.writeFileSync(file, html, 'utf8');
    }
});

console.log('Restored clean, line-free pillars grid!');
