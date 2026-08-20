const fs = require('fs');
const path = require('path');

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

    const mobileMenuBtn = document.getElementById('mobile-menu');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMobileDrawer(true);
        });
    }
}

/* ── Full-Screen Mobile Drawer Toggle (Global Window Scope) ── */
window.toggleMobileDrawer = function(open) {
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
};

// Close drawer on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMobileDrawer(false);
});
`;

['v2/js/main.js', 'js/main.js', 'deploy_ready/js/main.js'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    fs.writeFileSync(file, mainJsContent.trim() + '\n', 'utf8');
    console.log('Updated main.js in:', file);
});

// Update mobile hero order in CSS so Badge -> Title -> Subtitle -> Car -> Dock -> Buttons -> Stats
const mobileOrderCss = `
    /* Move Car Right Column to sit seamlessly between Subtitle and Form */
    .hero-sidecar-right {
        order: 0;
        width: 100%;
        max-width: 320px;
        margin: 0.5rem auto 1.4rem;
    }
`;

['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    css = css.replace(/\.hero-sidecar-right\s*\{\s*order:\s*-1;[\s\S]*?\}/, mobileOrderCss.trim());
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated mobile hero order in:', file);
});
