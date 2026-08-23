/**
 * Mithra Tours & Travels V2 - Main JavaScript Core
 * Handles navigation, 75% mobile drawer, dynamic CMS content rendering, and enquiry forms
 */

// Global window function available immediately for any caller
window.toggleMobileDrawer = function(open) {
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    if (!drawer) return;

    if (open) {
        drawer.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        }
    } else {
        drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
        if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    }
};

/* ── Navbar & Drawer Initialization ── */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    }

    const mobileMenuBtn = document.getElementById('mobile-menu');
    if (mobileMenuBtn) {
        mobileMenuBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            const drawer = document.getElementById('mobile-drawer');
            const isActive = drawer && drawer.classList.contains('active');
            window.toggleMobileDrawer(!isActive);
        };
    }

    const overlay = document.getElementById('mobile-drawer-overlay');
    if (overlay) {
        overlay.onclick = function(e) {
            e.preventDefault();
            window.toggleMobileDrawer(false);
        };
    }

    const closeBtn = document.querySelector('.drawer-close-btn');
    if (closeBtn) {
        closeBtn.onclick = function(e) {
            e.preventDefault();
            window.toggleMobileDrawer(false);
        };
    }

    // Auto-close when clicking any drawer link
    document.querySelectorAll('.drawer-link').forEach(link => {
        link.onclick = function() {
            window.toggleMobileDrawer(false);
        };
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
} else {
    initNavbar();
}

// Close drawer on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.toggleMobileDrawer(false);
});
