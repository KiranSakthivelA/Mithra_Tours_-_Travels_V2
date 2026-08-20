const fs = require('fs');
const path = require('path');

const spaciousSideCarHeroCss = `
/* ═══════════════════════════════════════════════════════════
   HOME PAGE HERO — SPACIOUS SEAMLESS BLENDED CAR & STATS
   ═══════════════════════════════════════════════════════════ */
.hero-sidecar-section {
    position: relative;
    padding: 120px 0 85px;
    background: radial-gradient(circle at 80% 40%, rgba(245, 158, 11, 0.05) 0%, rgba(255, 255, 255, 0) 65%), #FFFFFF;
    overflow: hidden;
}

.hero-sidecar-container {
    max-width: 1360px;
    margin: 0 auto;
    padding: 0 2rem;
    position: relative;
}

.hero-sidecar-grid {
    display: grid;
    grid-template-columns: 1.22fr 1fr;
    gap: 3.5rem;
    align-items: center;
    position: relative;
}

/* Left Column */
.hero-sidecar-left {
    z-index: 2;
    text-align: left;
}

.hero-sidecar-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 1.15rem;
    background: #FFFBEB;
    border: 1px solid #FDE68A;
    border-radius: 30px;
    font-size: 0.82rem;
    font-weight: 700;
    color: #B45309;
    margin-bottom: 1.4rem;
    box-shadow: 0 2px 8px rgba(217, 119, 6, 0.08);
}

.hero-sidecar-badge i {
    color: #D97706;
}

/* Punchy Bold Title */
.hero-sidecar-title {
    font-family: 'Plus Jakarta Sans', 'DM Sans', sans-serif;
    font-size: clamp(2.6rem, 3.8vw, 3.5rem);
    font-weight: 900;
    color: #0F172A;
    line-height: 1.14;
    letter-spacing: -0.03em;
    margin-bottom: 1.25rem;
}

.hero-sidecar-title .gold-highlight {
    color: #D97706;
}

.hero-sidecar-desc {
    font-size: 0.96rem;
    color: #64748B;
    line-height: 1.65;
    margin-bottom: 2.2rem;
    max-width: 580px;
}

/* Floating Dock Bar */
.hero-dock-bar {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 20px;
    box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.08), 0 2px 10px rgba(0,0,0,0.02);
    padding: 0.70rem 0.85rem 0.70rem 1.15rem;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 680px;
    position: relative;
    z-index: 10;
    margin-bottom: 2rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-dock-bar:hover,
.hero-dock-bar:focus-within {
    border-color: #CBD5E1;
    box-shadow: 0 25px 60px -12px rgba(217, 119, 6, 0.12);
}

.dock-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0.15rem 0.60rem;
    min-width: 0;
}

.dock-bar-divider {
    width: 1px;
    height: 36px;
    background: #E2E8F0;
    flex-shrink: 0;
}

.dock-bar-item label {
    font-size: 0.66rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #64748B;
    margin-bottom: 0.2rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    white-space: nowrap;
}

.dock-bar-item label i {
    color: #D97706;
    font-size: 0.70rem;
}

.dock-bar-item input,
.dock-bar-item select {
    border: none;
    background: transparent;
    font-size: 0.88rem;
    font-weight: 700;
    color: #0F172A;
    outline: none;
    font-family: inherit;
    cursor: pointer;
    width: 100%;
    padding: 0;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dock-bar-item input::placeholder {
    color: #94A3B8;
    font-weight: 500;
}

.dock-bar-item select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23D97706' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.1rem center;
    padding-right: 1.15rem;
}

/* Send Symbol Only Button */
.dock-bar-send-btn {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    border-radius: 14px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.15rem;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(217, 119, 6, 0.32);
    flex-shrink: 0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dock-bar-send-btn:hover {
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 10px 24px rgba(217, 119, 6, 0.42);
}

/* Action Buttons Row */
.hero-action-row {
    display: flex;
    align-items: center;
    gap: 0.95rem;
    margin-bottom: 2.2rem;
    flex-wrap: wrap;
}

/* Stats Strip */
.hero-stats-strip {
    display: flex;
    align-items: flex-start;
    gap: 2.5rem;
    padding-top: 1.85rem;
    border-top: 1px solid #F1F5F9;
    max-width: 650px;
}

.stat-box {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.stat-num {
    font-size: 1.55rem;
    font-weight: 900;
    color: #0F172A;
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-family: 'Plus Jakarta Sans', sans-serif;
}

.stat-num span {
    color: #D97706;
}

.stat-lbl {
    font-size: 0.68rem;
    font-weight: 800;
    color: #64748B;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-top: 0.3rem;
}

/* Right Column: Seamless Blended Car (NO BOX, NO BADGES) */
.hero-sidecar-right {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-car-seamless-wrap {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 660px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-car-seamless-img {
    width: 100%;
    height: auto;
    display: block;
    mix-blend-mode: multiply;
    transition: transform 0.4s ease;
}

.hero-car-seamless-wrap:hover .hero-car-seamless-img {
    transform: translateY(-4px) scale(1.02);
}

@media (max-width: 1024px) {
    .hero-sidecar-section {
        padding: 100px 0 50px;
    }
    .hero-sidecar-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
    }
    .hero-sidecar-left {
        text-align: center;
    }
    .hero-sidecar-desc {
        margin-left: auto;
        margin-right: auto;
    }
    .hero-dock-bar {
        margin-left: auto;
        margin-right: auto;
    }
    .hero-action-row {
        justify-content: center;
    }
    .hero-stats-strip {
        margin: 0 auto;
        justify-content: center;
    }
}

@media (max-width: 768px) {
    .hero-dock-bar {
        flex-direction: column;
        gap: 0.75rem;
        padding: 1.25rem;
        border-radius: 18px;
    }
    .dock-bar-divider {
        display: none;
    }
    .dock-bar-item {
        width: 100%;
        border-bottom: 1px solid #F1F5F9;
        padding-bottom: 0.5rem;
    }
    .dock-bar-send-btn {
        width: 100%;
        border-radius: 12px;
        height: 48px;
    }
    .hero-stats-strip {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.25rem;
    }
}
`;

// Update CSS
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*HOME PAGE HERO[\s\S]*?(?=\/\* ═|$)/;
    if (regex.test(css)) {
        css = css.replace(regex, spaciousSideCarHeroCss.trim() + '\n\n');
    } else {
        css += '\n\n' + spaciousSideCarHeroCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated spacious sidecar hero CSS in:', file);
});
