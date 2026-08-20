const fs = require('fs');
const path = require('path');

const sharpCss = `/* ═══════════════════════════════════════════════════════════
   3D CIRCULAR FLEET CAROUSEL (RAZOR SHARP CORPORATE WHITE & GOLD)
   ═══════════════════════════════════════════════════════════ */

.fleet-showcase-section {
    position: relative;
    background: #FFFFFF;
    color: var(--text-heading);
    padding: 2.5rem 0 4rem;
    overflow: hidden;
}

.fleet-ambient-container,
.ambient-layer,
.ambient-overlay {
    display: none !important;
}

.fleet-showcase-content {
    position: relative;
    z-index: 5;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

/* Minimalist Clean Corporate Filter Tabs */
.fleet-category-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 0 auto 2.2rem;
    padding: 0;
    background: transparent;
    border: none;
    max-width: 100%;
    flex-wrap: wrap;
}

.fleet-filter-btn {
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    color: #475569;
    font-size: 0.84rem;
    font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 0.48rem 1.15rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.fleet-filter-btn:hover {
    color: #0F172A;
    border-color: #CBD5E1;
    background: #F8FAFC;
    transform: translateY(-1px);
}
.fleet-filter-btn.active {
    background: var(--grad-gold);
    color: #FFFFFF;
    border-color: transparent;
    font-weight: 700;
    box-shadow: 0 4px 14px rgba(217, 119, 6, 0.35);
    transform: translateY(-1px);
}

/* 3D Stage */
.fleet-stage-container {
    position: relative;
    width: 100%;
    margin: 0.5rem auto 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fleet-stage {
    position: relative;
    width: 100%;
    max-width: 1260px;
    height: 510px;
    perspective: 1200px;
    perspective-origin: 50% 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    user-select: none;
    touch-action: pan-y;
}

/* Corporate Clean White Card - Razor Sharp */
.coverflow-card {
    position: absolute;
    width: 325px;
    height: 465px;
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    box-shadow: 0 10px 28px -6px rgba(15, 23, 42, 0.07), 0 2px 6px rgba(0, 0, 0, 0.03);
    transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                box-shadow 0.65s ease,
                border-color 0.65s ease;
    transform-origin: center center;
    display: flex;
    flex-direction: column;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.coverflow-card.active {
    border: 2px solid #D97706;
    box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.12), 0 6px 18px rgba(217, 119, 6, 0.15);
    z-index: 30 !important;
}

/* Upper Vehicle Hero Image */
.card-image-layer {
    position: relative;
    width: 100%;
    height: 190px;
    overflow: hidden;
    background: #F8FAFC;
    border-bottom: 1px solid #F1F5F9;
    flex-shrink: 0;
}
.card-image-layer img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    display: block;
    image-rendering: -webkit-optimize-contrast;
}
.coverflow-card.active:hover .card-image-layer img {
    transform: scale(1.03);
}

/* Category Badge on Top-Right of Image */
.card-type-tag {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    color: #0F172A;
    font-size: 0.66rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 0.22rem 0.65rem;
    border-radius: 9999px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    z-index: 4;
}

/* Lower Clean White Content Area */
.card-content-overlay {
    position: relative;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.95rem 1.25rem 1.15rem;
    background: #FFFFFF;
    box-sizing: border-box;
    z-index: 3;
}

.card-cat-name {
    font-size: 0.66rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.4px;
    color: var(--gold-3);
    margin-bottom: 0.15rem;
    display: block;
}
.card-main-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.22;
    margin-bottom: 0.25rem;
    letter-spacing: -0.02em;
}
.card-tagline {
    font-size: 0.74rem;
    color: #64748B;
    line-height: 1.35;
    margin-bottom: 0.45rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-specs-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-bottom: 0.45rem;
}
.card-spec-badge {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    color: #334155;
    font-size: 0.68rem;
    font-weight: 600;
    padding: 0.22rem 0.55rem;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
}
.card-spec-badge i {
    color: var(--gold-3);
    font-size: 0.65rem;
}

/* Rich Perks Row (Fills Card Elegantly) */
.card-perks-row {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 0.65rem;
    align-items: center;
}
.card-perk {
    font-size: 0.70rem;
    font-weight: 600;
    color: #059669;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
}
.card-perk i {
    font-size: 0.68rem;
}

/* Flanking Card: Keep Title and Specs, Hide only buttons */
.coverflow-card:not(.active) .card-perks-row,
.coverflow-card:not(.active) .card-actions-row {
    display: none !important;
}

.coverflow-card:not(.active) .card-tagline {
    display: -webkit-box !important;
    opacity: 0.8;
}

.coverflow-card.active .card-perks-row,
.coverflow-card.active .card-actions-row {
    display: flex !important;
}

/* Action Buttons */
.card-actions-row {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    width: 100%;
    margin-top: auto;
}
.card-btn-book {
    flex: 1;
    background: var(--grad-gold);
    color: #FFFFFF;
    font-size: 0.78rem;
    font-weight: 700;
    padding: 0.52rem 0.85rem;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(217, 119, 6, 0.30);
}
.card-btn-book:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(217, 119, 6, 0.45);
    color: #FFFFFF;
}

.card-btn-wa {
    background: #25D366;
    color: #FFFFFF;
    font-size: 0.78rem;
    font-weight: 700;
    padding: 0.52rem 0.85rem;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.20);
}
.card-btn-wa:hover {
    background: #20BA5C;
    transform: translateY(-1px);
    color: #FFFFFF;
    box-shadow: 0 6px 16px rgba(37, 211, 102, 0.32);
}

.card-btn-info {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #F1F5F9;
    border: 1px solid #E2E8F0;
    color: #475569;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.80rem;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
}
.card-btn-info:hover {
    background: var(--gold-3);
    color: #FFFFFF;
    border-color: transparent;
    transform: scale(1.08);
}

/* Floating Navigation Arrows */
.fleet-nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    color: #0F172A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
    z-index: 35;
    transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
}
.fleet-nav-arrow:hover {
    background: var(--grad-gold);
    color: #FFFFFF;
    border-color: transparent;
    transform: translateY(-50%) scale(1.08);
    box-shadow: 0 8px 22px rgba(217, 119, 6, 0.35);
}
.fleet-nav-prev { left: 16px; }
.fleet-nav-next { right: 16px; }

/* Bottom Controls */
.fleet-bottom-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.85rem;
    margin-top: 1.8rem;
}

.fleet-dots-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.fleet-dot {
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background: #CBD5E1;
    border: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0;
}
.fleet-dot.active {
    width: 28px;
    background: var(--grad-gold);
    box-shadow: 0 2px 8px rgba(217, 119, 6, 0.35);
}

.fleet-counter-display {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: #64748B;
}
.fleet-counter-display span {
    color: #0F172A;
}
.fleet-counter-display .divider {
    color: var(--gold-3);
    margin: 0 0.25rem;
}

.fleet-drag-hint {
    font-size: 0.76rem;
    color: #94A3B8;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
}`;

const cssFiles = [
    path.resolve(__dirname, 'v2/css/brand.css'),
    path.resolve(__dirname, 'css/brand.css')
];

cssFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');
    const regex = /\/\* ═+\r?\n\s*3D CIRCULAR[\s\S]*?(?=\/\* Quick Specs & Booking Modal|\/\* ═+)/i;
    if (regex.test(css)) {
        css = css.replace(regex, sharpCss + '\n\n');
        fs.writeFileSync(file, css, 'utf8');
        console.log('Successfully updated sharp corporate CSS in:', file);
    } else {
        console.log('Regex did not match in:', file);
    }
});
