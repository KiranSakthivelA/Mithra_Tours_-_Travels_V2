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
