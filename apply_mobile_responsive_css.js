const fs = require('fs');
const path = require('path');

const responsiveMobileCss = `
/* ═══════════════════════════════════════════════════════════
   RESPONSIVE MOBILE STYLING FOR FLEET SHOWCASE
   ═══════════════════════════════════════════════════════════ */

@media (max-width: 768px) {
    .fleet-showcase-section {
        padding: 1.5rem 0 2.5rem;
    }
    
    .fleet-showcase-content {
        padding: 0 0.75rem;
    }

    /* Horizontal scrollable category pill bar on mobile */
    .fleet-category-nav {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        gap: 0.4rem;
        padding: 0.25rem 0.5rem 0.75rem;
        margin-bottom: 1.2rem;
        scrollbar-width: none;
    }
    .fleet-category-nav::-webkit-scrollbar {
        display: none;
    }
    .fleet-filter-btn {
        flex-shrink: 0;
        font-size: 0.78rem;
        padding: 0.38rem 0.95rem;
    }

    /* 3D Stage on Mobile */
    .fleet-stage {
        height: 480px;
        perspective: 900px;
    }

    /* Card on Mobile */
    .coverflow-card {
        width: min(315px, 86vw);
        height: 460px;
        border-radius: 16px;
    }

    .card-image-layer {
        height: 180px;
    }

    .card-content-overlay {
        padding: 0.85rem 1rem 1rem;
    }

    .card-main-title {
        font-size: 1.05rem;
        margin-bottom: 0.2rem;
    }

    .card-tagline {
        font-size: 0.72rem;
        margin-bottom: 0.35rem;
    }

    .card-specs-row {
        gap: 0.25rem;
        margin-bottom: 0.35rem;
    }
    .card-spec-badge {
        font-size: 0.64rem;
        padding: 0.18rem 0.45rem;
    }

    .card-perks-row {
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .card-perk {
        font-size: 0.66rem;
    }

    /* Action buttons: prevent text breaking */
    .card-actions-row {
        gap: 0.3rem;
    }
    .card-btn-book {
        font-size: 0.74rem;
        padding: 0.5rem 0.65rem;
        white-space: nowrap;
    }
    .card-btn-wa {
        font-size: 0.74rem;
        padding: 0.5rem 0.65rem;
        white-space: nowrap;
    }
    .card-btn-info {
        width: 30px;
        height: 30px;
        min-width: 30px;
        font-size: 0.75rem;
    }

    /* Navigation Arrows on Mobile: Tucked to screen edges */
    .fleet-nav-arrow {
        width: 36px;
        height: 36px;
        font-size: 0.85rem;
        z-index: 40;
    }
    .fleet-nav-prev { left: 2px; }
    .fleet-nav-next { right: 2px; }

    .fleet-bottom-controls {
        margin-top: 1rem;
        gap: 0.6rem;
    }
}
`;

// Append responsive styles to brand.css files
['v2/css/brand.css', 'css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');
    if (!css.includes('RESPONSIVE MOBILE STYLING FOR FLEET SHOWCASE')) {
        css += '\n' + responsiveMobileCss + '\n';
        fs.writeFileSync(file, css, 'utf8');
        console.log('Appended mobile responsive styles to:', file);
    } else {
        css = css.replace(/\/\* ═+\r?\n\s*RESPONSIVE MOBILE STYLING FOR FLEET SHOWCASE[\s\S]*?(?=$)/, responsiveMobileCss.trim());
        fs.writeFileSync(file, css, 'utf8');
        console.log('Updated mobile responsive styles in:', file);
    }
});
