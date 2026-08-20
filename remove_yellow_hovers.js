const fs = require('fs');
const path = require('path');

const cleanHoverCss = `
/* ═══════════════════════════════════════════════════════════
   ABOUT US — CLEAN CRISP HOVER (ZERO YELLOW/CREAM TINTS)
   ═══════════════════════════════════════════════════════════ */

/* ── 1. VISION & MISSION SHOWCASE ── */
.premium-vm-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    align-items: stretch;
}

.premium-vm-card {
    border-radius: 24px;
    padding: 3rem 2.5rem;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.04);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-vm-card:hover {
    transform: translateY(-4px);
    border-color: #CBD5E1;
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08);
}

.vm-badge-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.vm-icon-squircle {
    width: 60px;
    height: 60px;
    border-radius: 18px;
    background: #FFFFFF;
    color: #D97706;
    border: 1.5px solid #FDE68A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    flex-shrink: 0;
}

.vm-card-tag {
    font-size: 0.76rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: #D97706;
}

.vm-card-title {
    font-size: 1.65rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0;
}

.vm-quote-text {
    font-size: 1.05rem;
    font-weight: 600;
    color: #1E293B;
    line-height: 1.75;
    margin-bottom: 2rem;
}

/* Vision Commitments Pills */
.vision-commitments {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 1px solid #F1F5F9;
}

.vision-pill {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    padding: 0.55rem 1.1rem;
    border-radius: 30px;
    font-size: 0.82rem;
    font-weight: 700;
    color: #1E293B;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    transition: all 0.2s ease;
}

.vision-pill:hover {
    background: #FFFFFF;
    border-color: #CBD5E1;
    color: #0F172A;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.vision-pill i {
    color: #D97706;
}

/* Mission 4-Grid Blocks */
.mission-blocks-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: auto;
}

.mission-block {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    padding: 1.1rem;
    transition: all 0.25s ease;
}

.mission-block:hover {
    background: #FFFFFF;
    border-color: #CBD5E1;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.mission-block-icon {
    font-size: 1.2rem;
    color: #D97706;
    margin-bottom: 0.5rem;
}

.mission-block h5 {
    font-size: 0.88rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0 0 0.25rem;
}

.mission-block p {
    font-size: 0.78rem;
    color: #64748B;
    line-height: 1.45;
    margin: 0;
}


/* ── 2. WHAT WE DO SHOWCASE (GRID CARDS) ── */
.premium-wwd-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
}

.premium-wwd-card {
    background: #FFFFFF;
    border-radius: 24px;
    border: 1.5px solid #E2E8F0;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.04);
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.premium-wwd-card:hover {
    transform: translateY(-4px);
    border-color: #CBD5E1;
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.08);
}

.wwd-card-header {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #F1F5F9;
}

.wwd-header-icon {
    width: 60px;
    height: 60px;
    border-radius: 18px;
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 10px 20px rgba(217, 119, 6, 0.25);
    flex-shrink: 0;
}

.wwd-header-title {
    font-size: 1.45rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0 0 0.3rem;
}

.wwd-header-sub {
    font-size: 0.85rem;
    color: #64748B;
    margin: 0;
}

/* 4 Feature Service Blocks per Card */
.wwd-services-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.wwd-service-tile {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: all 0.25s ease;
}

.wwd-service-tile:hover {
    background: #FFFFFF !important;
    border-color: #CBD5E1 !important;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08) !important;
}

.wwd-service-tile:hover .wwd-tile-icon {
    background: #D97706;
    color: #FFFFFF;
    border-color: #D97706;
}

.wwd-tile-icon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: #FFFFFF;
    color: #D97706;
    border: 1px solid #FDE68A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
    transition: all 0.2s ease;
}

.wwd-service-tile h4 {
    font-size: 0.94rem;
    font-weight: 800;
    color: #0F172A;
    margin: 0;
    line-height: 1.35;
}

.wwd-service-tile p {
    font-size: 0.80rem;
    color: #64748B;
    line-height: 1.45;
    margin: 0;
}

@media (max-width: 1024px) {
    .premium-vm-grid,
    .premium-wwd-grid {
        grid-template-columns: 1fr;
        gap: 1.75rem;
    }
    .mission-blocks-grid,
    .wwd-services-grid {
        grid-template-columns: 1fr;
    }
}
`;

['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*ABOUT US (?:REDESIGNED|— PREMIUM|— CLEAN)[\s\S]*?(?=\/\* ═|$)/;
    if (regex.test(css)) {
        css = css.replace(regex, cleanHoverCss.trim() + '\n\n');
    } else {
        css += '\n\n' + cleanHoverCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated clean hover CSS in:', file);
});
