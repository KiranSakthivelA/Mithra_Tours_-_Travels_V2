const fs = require('fs');
const path = require('path');

const mobileDrawerHtml = `
<!-- ═══════════════════════════════════════════════
     FULL-SCREEN MOBILE NAVIGATION DRAWER
════════════════════════════════════════════════ -->
<div class="mobile-drawer-overlay" id="mobile-drawer-overlay" onclick="toggleMobileDrawer(false)"></div>
<div class="mobile-drawer" id="mobile-drawer">
    <div class="drawer-header">
        <a href="index.html" class="drawer-logo" onclick="toggleMobileDrawer(false)">
            <img src="Assets/Site_Logo.png" alt="Mithra Tours & Travels">
        </a>
        <button class="drawer-close-btn" onclick="toggleMobileDrawer(false)" aria-label="Close Menu">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    
    <div class="drawer-links">
        <a href="index.html" class="drawer-link" data-page="index"><i class="fa-solid fa-house"></i> <span>Home</span> <i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="corporate.html" class="drawer-link" data-page="corporate"><i class="fa-solid fa-briefcase"></i> <span>Corporate Mobility</span> <i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="our-fleet.html" class="drawer-link" data-page="our-fleet"><i class="fa-solid fa-car-side"></i> <span>Our Fleet</span> <i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="holidays.html" class="drawer-link" data-page="holidays"><i class="fa-solid fa-plane-departure"></i> <span>Holiday Packages</span> <i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="about.html" class="drawer-link" data-page="about"><i class="fa-solid fa-circle-info"></i> <span>About Us</span> <i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="cab-attachment.html" class="drawer-link" data-page="cab-attachment"><i class="fa-solid fa-handshake"></i> <span>Cab Attachment</span> <i class="fa-solid fa-chevron-right arrow-icon"></i></a>
        <a href="contact.html" class="drawer-link" data-page="contact"><i class="fa-solid fa-phone"></i> <span>Contact Us</span> <i class="fa-solid fa-chevron-right arrow-icon"></i></a>
    </div>

    <div class="drawer-footer">
        <a href="tel:+919629245533" class="drawer-btn-call">
            <i class="fa-solid fa-phone-volume"></i> Call +91 96292 45533
        </a>
        <a href="https://wa.me/919629245533?text=Hello%20Mithra%20Tours%2C%20I%20need%20a%20travel%20quote" class="drawer-btn-whatsapp" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
        </a>
    </div>
</div>
`;

const mobileSystemCss = `
/* ═══════════════════════════════════════════════════════════
   FULL-SCREEN MOBILE DRAWER & RESPONSIVE PERFECTION
   ═══════════════════════════════════════════════════════════ */
.mobile-drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.50);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 99998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-drawer-overlay.active {
    opacity: 1;
    pointer-events: auto;
}

.mobile-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    height: 100dvh;
    background: #FFFFFF;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.25rem 1.5rem 2rem;
    transform: translateX(100%);
    transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
    overflow-y: auto;
    box-sizing: border-box;
}

.mobile-drawer.active {
    transform: translateX(0);
}

.drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid #F1F5F9;
    flex-shrink: 0;
}

.drawer-logo img {
    height: 38px;
    width: auto;
    object-fit: contain;
}

.drawer-close-btn {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: #F8FAFC;
    border: 1.5px solid #E2E8F0;
    color: #0F172A;
    font-size: 1.25rem;
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
    gap: 0.40rem;
    margin: 1.25rem 0;
    flex: 1;
    overflow-y: auto;
}

.drawer-link {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.85rem 1rem;
    border-radius: 14px;
    text-decoration: none;
    font-size: 1.02rem;
    font-weight: 700;
    color: #334155;
    transition: all 0.2s ease;
}

.drawer-link > i:first-child {
    font-size: 1.05rem;
    color: #D97706;
    width: 24px;
    text-align: center;
}

.drawer-link span {
    flex: 1;
}

.drawer-link .arrow-icon {
    font-size: 0.80rem;
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
    gap: 0.75rem;
    padding-top: 1.25rem;
    border-top: 1px solid #F1F5F9;
    flex-shrink: 0;
}

.drawer-btn-call {
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    font-weight: 800;
    font-size: 0.95rem;
    padding: 0.85rem 1.25rem;
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
    padding: 0.85rem 1.25rem;
    border-radius: 14px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    box-shadow: 0 6px 18px rgba(37, 211, 102, 0.25);
}

/* ── RESPONSIVE MOBILE TWEAKS (Under 900px) ── */
@media (max-width: 900px) {
    .menu-toggle {
        display: flex !important;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: #F8FAFC;
        border: 1.5px solid #E2E8F0;
        color: #0F172A;
        font-size: 1.15rem;
        cursor: pointer;
    }

    .nav-links,
    .nav-actions {
        display: none !important;
    }

    .nav-container {
        height: 64px;
        padding: 0 1.25rem;
    }

    .logo img {
        height: 38px;
    }

    /* Hero Mobile Overhaul */
    .hero-sidecar-section {
        padding: 85px 0 45px;
        text-align: center;
    }

    .hero-sidecar-container {
        padding: 0 1.25rem;
    }

    .hero-sidecar-grid {
        grid-template-columns: 1fr;
        gap: 1.75rem;
    }

    .hero-sidecar-left {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .hero-sidecar-badge {
        margin-bottom: 0.85rem;
        font-size: 0.72rem;
    }

    .hero-sidecar-title {
        font-size: clamp(2rem, 7.8vw, 2.5rem);
        line-height: 1.16;
        margin-bottom: 0.85rem;
    }

    .hero-sidecar-desc {
        font-size: 0.88rem;
        line-height: 1.55;
        margin-bottom: 1.4rem;
        max-width: 460px;
    }

    /* Move Car Right Column to sit seamlessly between Headline and Form */
    .hero-sidecar-right {
        order: -1;
        width: 100%;
        max-width: 330px;
        margin: 0 auto;
    }

    .hero-car-seamless-wrap {
        max-width: 100%;
    }

    /* Floating Dock Mobile */
    .hero-dock-bar {
        flex-direction: column;
        gap: 0.75rem;
        padding: 1.15rem;
        border-radius: 18px;
        max-width: 100%;
        margin-bottom: 1.4rem;
        box-shadow: 0 12px 35px -5px rgba(0, 0, 0, 0.08);
    }

    .dock-bar-divider {
        display: none;
    }

    .dock-bar-item {
        width: 100%;
        border-bottom: 1px solid #F1F5F9;
        padding-bottom: 0.50rem;
    }

    .dock-bar-item:nth-last-child(2) {
        border-bottom: none;
        padding-bottom: 0;
    }

    .dock-bar-send-btn {
        width: 100%;
        height: 48px;
        border-radius: 12px;
        justify-content: center;
        font-size: 0.94rem;
    }

    .dock-bar-send-btn::after {
        content: '  Send Instant Request';
        font-family: inherit;
        font-weight: 800;
        margin-left: 0.45rem;
    }

    /* Action Buttons Mobile Grid */
    .hero-action-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.65rem;
        width: 100%;
        max-width: 420px;
        margin-bottom: 1.5rem;
    }

    .hero-action-row .btn {
        padding: 0.70rem 0.5rem;
        font-size: 0.84rem;
        justify-content: center;
        border-radius: 12px;
    }

    .hero-action-row .btn:nth-child(3) {
        grid-column: span 2;
    }

    /* Stats Strip 2x2 Mobile Grid */
    .hero-stats-strip {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.15rem 1.5rem;
        padding-top: 1.35rem;
        width: 100%;
        max-width: 360px;
        margin: 0 auto;
    }

    .stat-box {
        text-align: center;
        align-items: center;
    }

    .stat-num {
        font-size: 1.45rem;
    }
}
`;

// 1. Update CSS
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*FULL-SCREEN MOBILE DRAWER[\s\S]*?(?=\/\* ═|$)/;
    if (regex.test(css)) {
        css = css.replace(regex, mobileSystemCss.trim() + '\n\n');
    } else {
        css += '\n\n' + mobileSystemCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Applied mobile drawer and responsive system CSS to:', file);
});

// 2. Update all HTML files to include the drawer markup and active link highlighting
const htmlFiles = [
    'v2/index.html', 'index.html', 'deploy_ready/index.html',
    'v2/our-fleet.html', 'our-fleet.html', 'deploy_ready/our-fleet.html',
    'v2/corporate.html', 'corporate.html', 'deploy_ready/corporate.html',
    'v2/holidays.html', 'holidays.html', 'deploy_ready/holidays.html',
    'v2/about.html', 'about.html', 'deploy_ready/about.html',
    'v2/cab-attachment.html', 'cab-attachment.html', 'deploy_ready/cab-attachment.html',
    'v2/contact.html', 'contact.html', 'deploy_ready/contact.html'
];

htmlFiles.forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // Remove old drawer markup if present
    html = html.replace(/<!-- ═+\s*FULL-SCREEN MOBILE NAVIGATION DRAWER[\s\S]*?<\/div>\s*<\/div>/g, '');

    // Insert new drawer markup right before </nav> or after <nav>
    const navEnd = '</nav>';
    const navIndex = html.indexOf(navEnd);
    if (navIndex !== -1) {
        html = html.substring(0, navIndex + navEnd.length) + '\n' + mobileDrawerHtml.trim() + '\n' + html.substring(navIndex + navEnd.length);
    }

    // Set active link in mobile drawer based on current page
    const pageName = path.basename(f, '.html');
    html = html.replace(/class="drawer-link active"/g, 'class="drawer-link"');
    html = html.replace(new RegExp(`class="drawer-link" data-page="${pageName}"`), `class="drawer-link active" data-page="${pageName}"`);

    // Ensure menu-toggle calls toggleMobileDrawer(true)
    html = html.replace(/<button class="menu-toggle"[^>]*>/g, '<button class="menu-toggle" id="mobile-menu" onclick="toggleMobileDrawer(true)" aria-label="Toggle Menu">');

    fs.writeFileSync(file, html, 'utf8');
    console.log('Inserted mobile drawer into:', file);
});

// 3. Update main.js to handle toggleMobileDrawer smoothly
const mainJsContent = `
/**
 * Mithra Tours & Travels V2 - Main JavaScript Core
 * Handles navigation, full-screen mobile drawer, dynamic CMS content rendering, and enquiry forms
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
});

/* ── Navbar Scroll Listener ── */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 30);
        });
    }
}

/* ── Full-Screen Mobile Drawer Toggle ── */
function toggleMobileDrawer(open) {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    if (!drawer || !overlay) return;

    if (open) {
        drawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close drawer on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMobileDrawer(false);
});
`;

['v2/js/main.js', 'js/main.js', 'deploy_ready/js/main.js'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    fs.writeFileSync(file, mainJsContent.trim() + '\n', 'utf8');
    console.log('Updated main.js with mobile drawer logic in:', file);
});
