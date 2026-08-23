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
            const drawer = document.getElementById('mobile-drawer');
            const isActive = drawer && drawer.classList.contains('active');
            toggleMobileDrawer(!isActive);
        });
    }
}

/* ── Full-Screen Mobile Drawer Toggle (Global Window Scope) ── */
window.toggleMobileDrawer = function(open) {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    if (!drawer || !overlay) return;

    if (open) {
        drawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        }
    } else {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    }
};

// Close drawer on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMobileDrawer(false);
});
