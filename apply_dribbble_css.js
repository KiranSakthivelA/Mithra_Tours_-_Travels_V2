const fs = require('fs');
const path = require('path');

const dribbbleCss = `/* ═══════════════════════════════════════════════════════════
   DRIBBLE-EXACT 3D CIRCULAR FLEET CAROUSEL (WHITE THEME & GOLD)
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

/* Apple/Dribbble Segmented Filter Tabs */
.fleet-category-nav {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    margin: 0 auto 2rem;
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
    height: 480px;
    perspective: 1200px;
    perspective-origin: 50% 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    user-select: none;
    touch-action: pan-y;
}

/* Dribbble Tall Full-Bleed Image Card */
.coverflow-card {
    position: absolute;
    width: 275px;
    height: 440px;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    background: #0F172A;
    box-shadow: 0 20px 45px -10px rgba(15, 23, 42, 0.22), 0 6px 18px rgba(0, 0, 0, 0.08);
    transition: transform 0.65s cubic-bezier(0.25, 1, 0.5, 1),
                box-shadow 0.65s ease,
                border-color 0.65s ease;
    transform-origin: center center;
    will-change: transform;
    display: flex;
    flex-direction: column;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.15);
}

.coverflow-card.active {
    border-color: rgba(245, 158, 11, 0.6);
    box-shadow: 0 28px 65px -12px rgba(15, 23, 42, 0.35), 0 10px 25px rgba(217, 119, 6, 0.25);
}

/* Full Bleed Image Layer */
.card-image-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #1E293B;
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
    transform: scale(1.05);
}

/* Cinematic Gradient Overlay (Ensures White Text Pops) */
.card-gradient-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, 
        rgba(0, 0, 0, 0.15) 0%, 
        rgba(0, 0, 0, 0.0) 35%, 
        rgba(0, 0, 0, 0.55) 65%, 
        rgba(0, 0, 0, 0.90) 100%
    );
    pointer-events: none;
    z-index: 2;
}

/* Dribbble Top Glass Pill Badge */
.card-top-pill {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 4;
    background: rgba(15, 23, 42, 0.55);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #FFFFFF;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Dribbble Overlay Content */
.card-content-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1.25rem 1.25rem 1.35rem;
    z-index: 3;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

.card-cat-name {
    font-size: 0.66rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--gold-3);
    margin-bottom: 0.25rem;
    display: block;
    text-shadow: 0 2px 4px rgba(0,0,0,0.6);
}

.card-main-title {
    font-size: 1.32rem;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.18;
    margin-bottom: 0.4rem;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.75);
}

.card-accent-line {
    width: 36px;
    height: 3px;
    background: var(--grad-gold);
    border-radius: 2px;
    margin-bottom: 0.55rem;
}

.card-tagline {
    font-size: 0.74rem;
    color: rgba(255, 255, 255, 0.92);
    line-height: 1.35;
    margin-bottom: 0.85rem;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Flanking Cards: Hide Content cleanly so only the visual 3D photo shows */
.coverflow-card:not(.active) .card-content-overlay {
    opacity: 0;
    pointer-events: none;
    transform: translateY(10px);
    transition: all 0.3s ease;
}

.coverflow-card.active .card-content-overlay {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
    transition: all 0.4s cubic-bezier(0.2, 0.9, 0.3, 1) 0.1s;
}

/* Action Buttons */
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
    padding: 0.5rem 0.85rem;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px rgba(217, 119, 6, 0.45);
    text-shadow: none;
}
.card-btn-book:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(217, 119, 6, 0.60);
    color: #FFFFFF;
}

.card-btn-wa {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #25D366;
    color: #FFFFFF;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    box-shadow: 0 4px 10px rgba(37, 211, 102, 0.30);
    flex-shrink: 0;
}
.card-btn-wa:hover {
    background: #20BA5C;
    transform: scale(1.08);
    color: #FFFFFF;
}

.card-btn-info {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.35);
    color: #FFFFFF;
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
        css = css.replace(regex, dribbbleCss + '\n\n');
        fs.writeFileSync(file, css, 'utf8');
        console.log('Successfully updated CSS in:', file);
    } else {
        console.log('Regex did not match in:', file);
    }
});
