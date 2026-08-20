/**
 * Mithra Tours & Travels V2 - Main JavaScript Core
 * Handles navigation, mobile drawer, dynamic CMS content rendering, and enquiry forms
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    loadCmsData();
});

/* ── Navbar & Mobile Drawer ── */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            mobileMenu.innerHTML = navLinks.classList.contains('open')
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                mobileMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }
}

/* ── CMS Data Fetcher & Dynamic Render ── */
async function loadCmsData() {
    try {
        const response = await fetch('data/content.json');
        if (!response.ok) return;
        const data = await response.json();

        // Render Home Hero if elements exist
        if (data.home) {
            const headlineEl = document.getElementById('hero-headline');
            const subtitleEl = document.getElementById('hero-subtitle');
            if (headlineEl && data.home.heroHeadline) {
                headlineEl.innerHTML = data.home.heroHeadline.replace('Transportation', '<span class="gold">Transportation</span>');
            }
            if (subtitleEl && data.home.heroSubtitle) {
                subtitleEl.textContent = data.home.heroSubtitle;
            }
        }
    } catch (e) {
        console.log('CMS data fallback active');
    }
}

/* ── General WhatsApp Helper ── */
function sendWhatsAppMessage(text) {
    const phone = '919629245533';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}
