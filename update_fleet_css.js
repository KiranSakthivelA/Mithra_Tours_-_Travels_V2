const fs = require('fs');
const path = require('path');

const cssFleetReplacement = `/* ═══════════════════════════════════════════════════════════
   3D CIRCULAR FLEET CAROUSEL (EXECUTIVE CORPORATE THEME)
   ═══════════════════════════════════════════════════════════ */

.fleet-showcase-section {
    position: relative;
    background: #FFFFFF;
    color: var(--text-heading);
    padding: 3rem 0 4rem;
    overflow: hidden;
}

/* Ambient container completely disabled - Zero blur, Zero wash */
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

/* Executive Category Filter Tabs */
.fleet-category-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    margin: 0 auto 2.5rem;
    flex-wrap: wrap;
    max-width: 100%;
}

.fleet-filter-btn {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    color: #475569;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: 'Plus Jakarta Sans', sans-serif;
    padding: 0.55rem 1.35rem;
    border-radius: var(--r-pill);
    cursor: pointer;
    transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
}
.fleet-filter-btn:hover {
    color: #0F172A;
    border-color: #CBD5E1;
    background: #FFFFFF;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(15, 23, 42, 0.06);
}
.fleet-filter-btn.active {
    background: #0F172A;
    color: #FFFFFF;
    border-color: #0F172A;
    font-weight: 700;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.22);
    transform: translateY(-1px);
}

/* 3D Circular Stage Container */
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
    max-width: 1200px;
    height: 460px;
    perspective: 1200px;
    perspective-origin: 50% 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    user-select: none;
    touch-action: pan-y;
}

/* 3D Circular Card (Executive Corporate Design — Fully Solid & Crisp) */
.coverflow-card {
    position: absolute;
    width: 300px;
    height: 430px;
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    background: #0F172A;
    border: 1px solid rgba(15, 23, 42, 0.12);
    box-shadow: 0 10px 28px -6px rgba(15, 23, 42, 0.18), 0 4px 10px rgba(0, 0, 0, 0.06);
    transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                filter 0.65s ease,
                box-shadow 0.65s ease;
    transform-origin: center center;
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}

.coverflow-card.active {
    box-shadow: 0 24px 56px -10px rgba(15, 23, 42, 0.32),
                0 10px 24px rgba(0, 0, 0, 0.10);
    border: 1.5px solid rgba(226, 232, 240, 0.95);
}

.card-image-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: #0F172A;
}
.card-image-layer img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.6s ease;
    display: block;
}
.coverflow-card.active:hover .card-image-layer img {
    transform: scale(1.04);
}

/* Card Bottom Gradient — crisp, solid bottom vignette for text contrast */
.card-gradient-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg,
        rgba(15, 23, 42, 0.0) 0%,
        rgba(15, 23, 42, 0.15) 30%,
        rgba(15, 23, 42, 0.75) 60%,
        rgba(15, 23, 42, 0.98) 95%
    );
    pointer-events: none;
}

/* Card Top Tag — REMOVED */
.card-top-tag {
    display: none !important;
}

/* Card Content Body */
.card-content-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.25rem 1.3rem;
    z-index: 3;
}

.card-cat-name {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.4px;
    color: #F59E0B;
    margin-bottom: 0.22rem;
}
.card-main-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.25;
    margin-bottom: 0.35rem;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
}

/* Tagline, Specs & Buttons: Visible only on active card to eliminate chaotic overlap */
.card-tagline {
    font-size: 0.76rem;
    color: rgba(241, 245, 249, 0.88);
    line-height: 1.4;
    margin-bottom: 0.7rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: opacity 0.35s ease, transform 0.35s ease;
}

.card-specs-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 0.9rem;
    transition: opacity 0.35s ease, transform 0.35s ease;
}

.card-actions-row {
    display: flex;
    gap: 0.45rem;
    align-items: center;
    width: 100%;
    transition: opacity 0.35s ease, transform 0.35s ease;
}

.coverflow-card:not(.active) .card-tagline,
.coverflow-card:not(.active) .card-specs-row,
.coverflow-card:not(.active) .card-actions-row {
    opacity: 0;
    pointer-events: none;
    transform: translateY(8px);
}

.coverflow-card.active .card-tagline,
.coverflow-card.active .card-specs-row,
.coverflow-card.active .card-actions-row {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.card-spec-badge {
    background: rgba(255, 255, 255, 0.16);
    border: 1px solid rgba(255, 255, 255, 0.24);
    color: #FFFFFF;
    font-size: 0.67rem;
    font-weight: 600;
    padding: 0.22rem 0.52rem;
    border-radius: var(--r-pill);
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}
.card-spec-badge i {
    color: #FBBF24;
    font-size: 0.65rem;
}

.card-btn-book {
    flex: 1;
    background: linear-gradient(135deg, #D97706 0%, #B45309 100%);
    color: #FFFFFF;
    font-size: 0.76rem;
    font-weight: 700;
    padding: 0.52rem 0.7rem;
    border-radius: var(--r-pill);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(217, 119, 6, 0.32);
}
.card-btn-book:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(217, 119, 6, 0.45);
    color: #FFFFFF;
}

.card-btn-wa {
    background: #25D366;
    color: #FFFFFF;
    font-size: 0.76rem;
    font-weight: 700;
    padding: 0.52rem 0.7rem;
    border-radius: var(--r-pill);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);
}
.card-btn-wa:hover {
    background: #20BA5C;
    transform: translateY(-1px);
    color: #FFFFFF;
    box-shadow: 0 6px 16px rgba(37, 211, 102, 0.35);
}

.card-btn-info {
    width: 33px;
    height: 33px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.16);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #FFFFFF;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}
.card-btn-info:hover {
    background: #FFFFFF;
    color: #0F172A;
    border-color: #FFFFFF;
    transform: scale(1.08);
}

/* Floating Navigation Arrows (Crisp Executive White) */
.fleet-nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    color: #0F172A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
    z-index: 35;
    transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
}
.fleet-nav-arrow:hover {
    background: #0F172A;
    color: #FFFFFF;
    border-color: #0F172A;
    transform: translateY(-50%) scale(1.08);
    box-shadow: 0 8px 22px rgba(15, 23, 42, 0.2);
}
.fleet-nav-prev { left: 16px; }
.fleet-nav-next { right: 16px; }

/* Bottom Showcase Controls (Dots + Counter) */
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
    border-radius: var(--r-pill);
    background: #CBD5E1;
    border: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 0;
}
.fleet-dot.active {
    width: 28px;
    background: #0F172A;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.25);
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
    color: #94A3B8;
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
