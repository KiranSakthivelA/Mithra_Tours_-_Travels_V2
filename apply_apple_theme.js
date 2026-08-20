const fs = require('fs');
const path = require('path');

const cssFleetReplacement = `/* ═══════════════════════════════════════════════════════════
   3D CIRCULAR FLEET CAROUSEL (APPLE-GRADE CLEAN WHITE & GOLD)
   ═══════════════════════════════════════════════════════════ */

.fleet-showcase-section {
    position: relative;
    background: #FFFFFF;
    color: var(--text-heading);
    padding: 2.75rem 0 4rem;
    overflow: hidden;
}

/* Ambient container disabled */
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

/* Apple-Style Segmented Filter Tabs */
.fleet-category-nav {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    margin: 0 auto 2.2rem;
    padding: 0.35rem;
    background: #F1F5F9;
    border-radius: 9999px;
    border: 1px solid #E2E8F0;
    max-width: 100%;
    flex-wrap: wrap;
}

.fleet-filter-btn {
    background: transparent;
    border: none;
    color: #64748B;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 0.5rem 1.25rem;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.fleet-filter-btn:hover {
    color: #0F172A;
    background: rgba(255, 255, 255, 0.7);
}
.fleet-filter-btn.active {
    background: #FFFFFF;
    color: #0F172A;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
}

/* 3D Circular Stage */
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
    height: 520px;
    perspective: 1200px;
    perspective-origin: 50% 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    user-select: none;
    touch-action: pan-y;
}

/* Apple-Grade Clean White Card */
.coverflow-card {
    position: absolute;
    width: 310px;
    height: 475px;
    border-radius: 22px;
    overflow: hidden;
    cursor: pointer;
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    box-shadow: 0 12px 30px -8px rgba(15, 23, 42, 0.08), 0 4px 10px rgba(0, 0, 0, 0.03);
    transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                box-shadow 0.65s ease,
                border-color 0.65s ease;
    transform-origin: center center;
    will-change: transform;
    display: flex;
    flex-direction: column;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}

.coverflow-card.active {
    border-color: rgba(217, 119, 6, 0.35);
    box-shadow: 0 25px 60px -12px rgba(15, 23, 42, 0.14), 0 8px 24px rgba(217, 119, 6, 0.07);
}

/* Upper Vehicle Hero Image */
.card-image-layer {
    position: relative;
    width: 100%;
    height: 195px;
    overflow: hidden;
    background: #F8FAFC;
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
    transform: scale(1.04);
}

/* Subtle border line between image and content */
.card-gradient-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(255,255,255,0.2) 100%);
    pointer-events: none;
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
    font-size: 1.12rem;
    font-weight: 800;
    color: var(--text-heading);
    line-height: 1.22;
    margin-bottom: 0.25rem;
    letter-spacing: -0.02em;
}
.card-tagline {
    font-size: 0.74rem;
    color: var(--text-body);
    line-height: 1.35;
    margin-bottom: 0.45rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: opacity 0.3s ease;
}

.card-specs-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-bottom: 0.65rem;
    transition: opacity 0.3s ease;
}
.card-spec-badge {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    color: #334155;
    font-size: 0.66rem;
    font-weight: 600;
    padding: 0.2rem 0.5rem;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    gap: 0.28rem;
}
.card-spec-badge i {
    color: var(--gold-3);
    font-size: 0.63rem;
}

/* Flanking Card Minimalist State */
.coverflow-card:not(.active) .card-tagline,
.coverflow-card:not(.active) .card-specs-row,
.coverflow-card:not(.active) .card-actions-row {
    opacity: 0;
    pointer-events: none;
}

.coverflow-card.active .card-tagline,
.coverflow-card.active .card-specs-row,
.coverflow-card.active .card-actions-row {
    opacity: 1;
    pointer-events: auto;
    transition: opacity 0.35s ease 0.1s;
}

/* Action Buttons (Brand Palette) */
.card-actions-row {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    width: 100%;
}
.card-btn-book {
    flex: 1;
    background: var(--grad-gold);
    color: #FFFFFF;
    font-size: 0.76rem;
    font-weight: 700;
    padding: 0.48rem 0.65rem;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    transition: all 0.2s ease;
    box-shadow: 0 4px 10px rgba(217, 119, 6, 0.30);
}
.card-btn-book:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 15px rgba(217, 119, 6, 0.45);
    color: #FFFFFF;
}

.card-btn-wa {
    background: #25D366;
    color: #FFFFFF;
    font-size: 0.76rem;
    font-weight: 700;
    padding: 0.48rem 0.65rem;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    transition: all 0.2s ease;
    box-shadow: 0 4px 10px rgba(37, 211, 102, 0.20);
}
.card-btn-wa:hover {
    background: #20BA5C;
    transform: translateY(-1px);
    color: #FFFFFF;
    box-shadow: 0 6px 15px rgba(37, 211, 102, 0.32);
}

.card-btn-info {
    width: 32px;
    height: 32px;
    border-radius: 50%;
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
    const regex = /\/\* ═+\r?\n\s*3D CIRCULAR FLEET CAROUSEL[\s\S]*?(?=\/\* Quick Specs & Booking Modal|\/\* ═+)/i;
    if (regex.test(css)) {
        css = css.replace(regex, cssFleetReplacement + '\n\n');
        fs.writeFileSync(file, css, 'utf8');
        console.log('Successfully updated CSS in:', file);
    } else {
        console.log('Regex did not match in:', file);
    }
});
