const fs = require('fs');
const path = require('path');

const solidMobileCss = `
/* ═══════════════════════════════════════════════════════════
   FULL-SCREEN MOBILE DRAWER (GUARANTEED FULL LENGTH)
   ═══════════════════════════════════════════════════════════ */
.mobile-drawer-overlay {
    position: fixed !important;
    inset: 0 !important;
    background: rgba(15, 23, 42, 0.65) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
    z-index: 999998 !important;
    display: none !important;
}

.mobile-drawer-overlay.active {
    display: block !important;
}

.mobile-drawer {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    max-width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    background: #FFFFFF !important;
    z-index: 999999 !important;
    display: none !important;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.25rem 1.5rem 2.25rem !important;
    box-sizing: border-box !important;
    overflow-y: auto;
    transform: none !important;
}

.mobile-drawer.active {
    display: flex !important;
    transform: none !important;
}

.drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid #F1F5F9;
    flex-shrink: 0;
}

.drawer-logo img {
    height: 40px;
    width: auto;
    object-fit: contain;
}

.drawer-close-btn {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    color: #0F172A;
    font-size: 1.35rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.drawer-close-btn:hover {
    background: #FFFBEB;
    border-color: #FDE68A;
    color: #D97706;
}

.drawer-links {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    margin: 1.5rem 0;
    flex: 1;
    overflow-y: auto;
}

.drawer-link {
    display: flex;
    align-items: center;
    gap: 0.95rem;
    padding: 0.95rem 1.15rem;
    border-radius: 14px;
    text-decoration: none;
    font-size: 1.05rem;
    font-weight: 700;
    color: #334155;
    transition: all 0.2s ease;
}

.drawer-link > i:first-child {
    font-size: 1.1rem;
    color: #D97706;
    width: 24px;
    text-align: center;
}

.drawer-link span {
    flex: 1;
}

.drawer-link .arrow-icon {
    font-size: 0.82rem;
    color: #94A3B8;
    transition: transform 0.2s ease;
}

.drawer-link:hover,
.drawer-link.active {
    background: #FFFBEB;
    color: #B45309;
}

.drawer-link:hover .arrow-icon,
.drawer-link.active .arrow-icon {
    color: #D97706;
    transform: translateX(3px);
}

.drawer-footer {
    display: flex;
    flex-direction: column;
    gap: 0.80rem;
    padding-top: 1.25rem;
    border-top: 1px solid #F1F5F9;
    flex-shrink: 0;
}

.drawer-btn-call {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    font-weight: 800;
    font-size: 0.95rem;
    padding: 0.90rem 1.25rem;
    border-radius: 14px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    box-shadow: 0 6px 18px rgba(217, 119, 6, 0.28);
}

.drawer-btn-whatsapp {
    background: #25D366;
    color: #FFFFFF;
    font-weight: 800;
    font-size: 0.95rem;
    padding: 0.90rem 1.25rem;
    border-radius: 14px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    box-shadow: 0 6px 18px rgba(37, 211, 102, 0.25);
}
`;

['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*FULL-SCREEN MOBILE DRAWER[\s\S]*?(?=\/\* ═|$)/;
    if (regex.test(css)) {
        css = css.replace(regex, solidMobileCss.trim() + '\n\n');
    } else {
        css += '\n\n' + solidMobileCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated solid mobile drawer CSS in:', file);
});
