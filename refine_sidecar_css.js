const fs = require('fs');
const path = require('path');

const sideCarHeroCss = `
/* ═══════════════════════════════════════════════════════════
   HOME PAGE HERO — SIDE CAR INSPIRATION LAYOUT
   ═══════════════════════════════════════════════════════════ */
.hero-sidecar-section {
    position: relative;
    padding: 135px 0 70px;
    background: radial-gradient(circle at 75% 35%, rgba(245, 158, 11, 0.06) 0%, rgba(255, 255, 255, 0) 65%), #FFFFFF;
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
    grid-template-columns: 1.22fr 0.95fr;
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
    margin-bottom: 1.35rem;
    box-shadow: 0 2px 8px rgba(217, 119, 6, 0.08);
}

.hero-sidecar-badge i {
    color: #D97706;
}

.hero-sidecar-title {
    font-size: clamp(2.6rem, 4.4vw, 4rem);
    font-weight: 800;
    color: #0F172A;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 1.25rem;
}

.hero-sidecar-title .gold-highlight {
    color: #D97706;
}

.hero-sidecar-desc {
    font-size: 0.98rem;
    color: #64748B;
    line-height: 1.65;
    margin-bottom: 2.25rem;
    max-width: 620px;
}

/* Floating Dock Bar */
.hero-dock-bar {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 22px;
    box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.09), 0 2px 10px rgba(0,0,0,0.02);
    padding: 0.75rem 0.85rem 0.75rem 1.1rem;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 760px;
    position: relative;
    z-index: 10;
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
    padding: 0.15rem 0.65rem;
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
    font-size: 0.84rem;
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

.dock-bar-send-btn {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    font-weight: 800;
    font-size: 0.90rem;
    padding: 0.85rem 1.4rem;
    border-radius: 14px;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(217, 119, 6, 0.28);
    flex-shrink: 0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    white-space: nowrap;
}

.dock-bar-send-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(217, 119, 6, 0.38);
}

/* Right Column (Visual + Trajectory + Badges) */
.hero-sidecar-right {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-trajectory-svg {
    position: absolute;
    width: 140%;
    height: 130%;
    top: -15%;
    left: -20%;
    pointer-events: none;
    z-index: 1;
}

.hero-sidecar-img-wrap {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 580px;
    border-radius: 28px;
    overflow: hidden;
    background: #FFFFFF;
    box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.08);
}

.hero-sidecar-img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.4s ease;
}

.hero-sidecar-img-wrap:hover .hero-sidecar-img {
    transform: scale(1.03);
}

/* Floating Badges */
.hero-floating-pill {
    position: absolute;
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    padding: 0.55rem 1.15rem;
    border-radius: 30px;
    box-shadow: 0 12px 28px -5px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    font-weight: 800;
    color: #0F172A;
    z-index: 5;
    animation: floatBadgeAnim 4s ease-in-out infinite alternate;
    white-space: nowrap;
}

.hero-floating-pill i {
    color: #D97706;
    font-size: 0.90rem;
}

.hero-floating-pill.pill-top-right {
    top: -10px;
    right: 15px;
}

.hero-floating-pill.pill-bottom-left {
    bottom: 20px;
    left: -20px;
    animation-delay: 2s;
}

.hero-floating-pill.pill-mid-right {
    top: 40%;
    right: -25px;
    animation-delay: 1s;
}

@keyframes floatBadgeAnim {
    0% { transform: translateY(0px); }
    100% { transform: translateY(-8px); }
}

@media (max-width: 1024px) {
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
        margin: 0 auto;
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
        justify-content: center;
    }
    .hero-floating-pill {
        display: none;
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
        css = css.replace(regex, sideCarHeroCss.trim() + '\n\n');
    } else {
        css += '\n\n' + sideCarHeroCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated refined sidecar hero CSS in:', file);
});
