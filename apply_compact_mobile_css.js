const fs = require('fs');
const path = require('path');

const responsiveMobileCss = `/* ═══════════════════════════════════════════════════════════
   RESPONSIVE MOBILE STYLING FOR FLEET SHOWCASE
   ═══════════════════════════════════════════════════════════ */

@media (max-width: 768px) {
    .fleet-showcase-section {
        padding: 1.2rem 0 2rem;
    }
    
    .fleet-showcase-content {
        padding: 0 0.5rem;
    }

    /* Horizontal scrollable category pill bar on mobile */
    .fleet-category-nav {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        gap: 0.4rem;
        padding: 0.2rem 0.5rem 0.6rem;
        margin-bottom: 0.8rem;
        scrollbar-width: none;
    }
    .fleet-category-nav::-webkit-scrollbar {
        display: none;
    }
    .fleet-filter-btn {
        flex-shrink: 0;
        font-size: 0.76rem;
        padding: 0.35rem 0.85rem;
    }

    /* Compact 3D Stage on Mobile */
    .fleet-stage {
        height: 405px;
        perspective: 900px;
    }

    /* Compact Snug Card on Mobile (No Empty Space) */
    .coverflow-card {
        width: min(290px, 80vw);
        height: 380px;
        border-radius: 16px;
        opacity: 1 !important;
    }

    .card-image-layer {
        height: 145px;
    }

    .card-type-tag {
        top: 8px;
        right: 8px;
        font-size: 0.60rem;
        padding: 0.18rem 0.55rem;
    }

    .card-content-overlay {
        padding: 0.65rem 0.85rem 0.85rem;
    }

    .card-cat-name {
        font-size: 0.60rem;
        letter-spacing: 1.2px;
        margin-bottom: 0.1rem;
    }

    .card-main-title {
        font-size: 0.96rem;
        line-height: 1.2;
        margin-bottom: 0.15rem;
    }

    .card-tagline {
        font-size: 0.68rem;
        line-height: 1.3;
        margin-bottom: 0.3rem;
    }

    .card-specs-row {
        display: flex !important;
        gap: 0.2rem;
        margin-bottom: 0.3rem;
    }
    .card-spec-badge {
        font-size: 0.60rem;
        padding: 0.15rem 0.4rem;
        border-radius: 5px;
    }
    .card-spec-badge i {
        font-size: 0.58rem;
    }

    .card-perks-row {
        display: flex !important;
        gap: 0.45rem;
        margin-bottom: 0.4rem;
    }
    .card-perk {
        font-size: 0.62rem;
    }

    /* Action buttons on single line */
    .card-actions-row {
        gap: 0.25rem;
        margin-top: auto;
    }
    .card-btn-book {
        font-size: 0.70rem;
        padding: 0.45rem 0.55rem;
        white-space: nowrap;
        border-radius: 6px;
    }
    .card-btn-wa {
        font-size: 0.70rem;
        padding: 0.45rem 0.55rem;
        white-space: nowrap;
        border-radius: 6px;
    }
    .card-btn-info {
        width: 28px;
        height: 28px;
        min-width: 28px;
        font-size: 0.70rem;
        border-radius: 6px;
    }

    /* Navigation Arrows on Mobile */
    .fleet-nav-arrow {
        width: 34px;
        height: 34px;
        font-size: 0.80rem;
        z-index: 40;
    }
    .fleet-nav-prev { left: 4px; }
    .fleet-nav-next { right: 4px; }

    .fleet-bottom-controls {
        margin-top: 0.75rem;
        gap: 0.5rem;
    }
}
`;

// Update brand.css files
['v2/css/brand.css', 'css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');
    const regex = /\/\* ═+\r?\n\s*RESPONSIVE MOBILE STYLING FOR FLEET SHOWCASE[\s\S]*?(?=$)/;
    if (regex.test(css)) {
        css = css.replace(regex, responsiveMobileCss.trim());
        fs.writeFileSync(file, css, 'utf8');
        console.log('Successfully updated mobile responsive CSS in:', file);
    } else {
        css += '\n\n' + responsiveMobileCss.trim() + '\n';
        fs.writeFileSync(file, css, 'utf8');
        console.log('Appended mobile responsive CSS to:', file);
    }
});
