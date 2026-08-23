/**
 * Mithra Tours & Travels — Scroll Reveal Animations
 * Pure IntersectionObserver approach — 100% additive, zero side effects.
 * Existing elements, classes, styles, and functionality are untouched.
 */
(function () {
    'use strict';

    /* ── 1. Respect prefers-reduced-motion ─────────────────── */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    /* ── 2. Inject animation CSS once ──────────────────────── */
    const style = document.createElement('style');
    style.id = 'mtt-scroll-anim-css';
    style.textContent = `
        /* Base hidden state — applied by JS only */
        .mtt-reveal {
            opacity: 0;
            transform: translateY(28px);
            transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: opacity, transform;
        }
        .mtt-reveal-left {
            opacity: 0;
            transform: translateX(-30px);
            transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: opacity, transform;
        }
        .mtt-reveal-right {
            opacity: 0;
            transform: translateX(30px);
            transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: opacity, transform;
        }
        .mtt-reveal-scale {
            opacity: 0;
            transform: scale(0.94) translateY(16px);
            transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: opacity, transform;
        }

        /* Visible state — always wins */
        .mtt-reveal.mtt-visible,
        .mtt-reveal-left.mtt-visible,
        .mtt-reveal-right.mtt-visible,
        .mtt-reveal-scale.mtt-visible {
            opacity: 1 !important;
            transform: none !important;
        }

        /* Card stagger — applied DIRECTLY to each card via JS inline delay */
        .mtt-card {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
            transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: opacity, transform;
        }
        .mtt-card.mtt-visible {
            opacity: 1 !important;
            transform: none !important;
        }

        /* Ensure hero section elements are ALWAYS visible — safety net */
        .hero-sidecar-section .mtt-reveal,
        .hero-sidecar-section .mtt-reveal-left,
        .hero-sidecar-section .mtt-reveal-right,
        .hero-sidecar-section .mtt-reveal-scale,
        .hero-sidecar-section .mtt-card,
        #banner .mtt-reveal,
        #banner .mtt-reveal-left,
        #banner .mtt-reveal-right,
        #banner .mtt-reveal-scale,
        #banner .mtt-card,
        .pkg-clean-hero .mtt-reveal,
        .pkg-clean-hero .mtt-card,
        .inner-hero .mtt-reveal,
        .inner-hero .mtt-card,
        .navbar .mtt-reveal,
        .mobile-drawer .mtt-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);

    /* ── 3. Helper: is element in the always-visible zones ─── */
    function isAlwaysVisible(el) {
        return el.closest(
            '.hero-sidecar-section, #banner, .pkg-clean-hero, .inner-hero, .navbar, .mobile-drawer, .mobile-drawer-overlay'
        ) !== null;
    }

    /* ── 4. Tag section-level elements (fade-up) ────────────── */
    function tagSections() {
        // Section labels, titles, descriptions
        document.querySelectorAll('.section-label, .section-title, .section-desc, .section-header').forEach(el => {
            if (!isAlwaysVisible(el) && !el.dataset.mttTagged) {
                el.classList.add('mtt-reveal');
                el.dataset.mttTagged = '1';
            }
        });

        // Entire steps/features block as one unit (NOT its children — avoids horizontal stagger bugs)
        document.querySelectorAll('.steps-map-wrap').forEach(el => {
            if (!isAlwaysVisible(el) && !el.dataset.mttTagged) {
                el.classList.add('mtt-reveal');
                el.dataset.mttTagged = '1';
            }
        });

        // Package meta bar, nav pills on detail pages
        document.querySelectorAll('.pkg-quick-meta-bar, .pkg-nav-pills').forEach(el => {
            if (!isAlwaysVisible(el) && !el.dataset.mttTagged) {
                el.classList.add('mtt-reveal');
                el.dataset.mttTagged = '1';
            }
        });

        // Trust strip, hero stats (only if below the fold)
        document.querySelectorAll('.hero-stats-strip, .trust-strip').forEach(el => {
            if (!isAlwaysVisible(el) && !el.dataset.mttTagged) {
                el.classList.add('mtt-reveal');
                el.dataset.mttTagged = '1';
            }
        });

        // Package content cards (detail page itinerary blocks)
        document.querySelectorAll('.pkg-content-card').forEach(el => {
            if (!isAlwaysVisible(el) && !el.dataset.mttTagged) {
                el.classList.add('mtt-reveal');
                el.dataset.mttTagged = '1';
            }
        });

        // Timeline items — stagger via JS delay on each individually
        document.querySelectorAll('.pkg-timeline-item').forEach((el, i) => {
            if (!isAlwaysVisible(el) && !el.dataset.mttTagged) {
                el.classList.add('mtt-card');
                el.style.transitionDelay = `${i * 0.08}s`;
                el.dataset.mttTagged = '1';
            }
        });

        // Footer columns
        document.querySelectorAll('.footer-brand, .footer-links-col, .footer-contact-col').forEach((el, i) => {
            if (!el.dataset.mttTagged) {
                el.classList.add('mtt-reveal');
                el.style.transitionDelay = `${i * 0.10}s`;
                el.dataset.mttTagged = '1';
            }
        });
    }

    /* ── 5. Tag cards individually (JS delay, no CSS child stagger) ── */
    function tagCards() {
        // Service cards (homepage 3D grid)
        const serviceCards = document.querySelectorAll('.mithra-service-card');
        tagCardGroup(serviceCards);

        // Fleet cards
        const fleetCards = document.querySelectorAll('.fleet-card');
        tagCardGroup(fleetCards);

        // Holiday package cards (holidays.html listing)
        const pkgCards = document.querySelectorAll('.pkg-card-white');
        tagCardGroup(pkgCards);

        // Generic white cards
        const whiteCards = document.querySelectorAll('.white-card');
        tagCardGroup(whiteCards);
    }

    function tagCardGroup(cards) {
        // Group cards by their parent to reset stagger index per grid
        const groups = new Map();
        cards.forEach(card => {
            if (isAlwaysVisible(card) || card.dataset.mttTagged) return;
            const parent = card.parentElement;
            if (!groups.has(parent)) groups.set(parent, []);
            groups.get(parent).push(card);
        });

        groups.forEach(group => {
            group.forEach((card, i) => {
                card.classList.add('mtt-card');
                card.style.transitionDelay = `${i * 0.10}s`;
                card.dataset.mttTagged = '1';
            });
        });
    }

    /* ── 6. IntersectionObserver — simple, reliable ─────────── */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mtt-visible');
                observer.unobserve(entry.target); // fire-once
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    function observeAll() {
        const targets = document.querySelectorAll(
            '.mtt-reveal, .mtt-reveal-left, .mtt-reveal-right, .mtt-reveal-scale, .mtt-card'
        );
        targets.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Already in viewport at load time → make visible immediately (no animation delay)
            if (rect.top < window.innerHeight - 20 && rect.bottom > 0) {
                el.style.transitionDelay = '0s';
                el.classList.add('mtt-visible');
            } else {
                observer.observe(el);
            }
        });
    }

    /* ── 7. Init ─────────────────────────────────────────────── */
    function init() {
        tagSections();
        tagCards();
        observeAll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
