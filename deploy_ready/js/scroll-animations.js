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
            transition: opacity 0.62s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.62s cubic-bezier(0.22, 1, 0.36, 1);
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
            transform: scale(0.93) translateY(18px);
            transition: opacity 0.70s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.70s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: opacity, transform;
        }

        /* Visible state */
        .mtt-reveal.mtt-visible,
        .mtt-reveal-left.mtt-visible,
        .mtt-reveal-right.mtt-visible,
        .mtt-reveal-scale.mtt-visible {
            opacity: 1;
            transform: none;
        }

        /* Stagger delays for child sequences */
        .mtt-stagger > * {
            opacity: 0;
            transform: translateY(22px);
            transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: opacity, transform;
        }
        .mtt-stagger.mtt-visible > *:nth-child(1) { transition-delay: 0.00s; opacity:1; transform:none; }
        .mtt-stagger.mtt-visible > *:nth-child(2) { transition-delay: 0.10s; opacity:1; transform:none; }
        .mtt-stagger.mtt-visible > *:nth-child(3) { transition-delay: 0.20s; opacity:1; transform:none; }
        .mtt-stagger.mtt-visible > *:nth-child(4) { transition-delay: 0.30s; opacity:1; transform:none; }
        .mtt-stagger.mtt-visible > *:nth-child(5) { transition-delay: 0.40s; opacity:1; transform:none; }
        .mtt-stagger.mtt-visible > *:nth-child(6) { transition-delay: 0.50s; opacity:1; transform:none; }
        .mtt-stagger.mtt-visible > *:nth-child(7) { transition-delay: 0.60s; opacity:1; transform:none; }
        .mtt-stagger.mtt-visible > *:nth-child(8) { transition-delay: 0.70s; opacity:1; transform:none; }

        /* Fine stagger for cards in a grid */
        .mtt-card-stagger > * {
            opacity: 0;
            transform: translateY(26px) scale(0.97);
            transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                        transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: opacity, transform;
        }
        .mtt-card-stagger.mtt-visible > *:nth-child(1) { transition-delay: 0.00s; opacity:1; transform:none; }
        .mtt-card-stagger.mtt-visible > *:nth-child(2) { transition-delay: 0.12s; opacity:1; transform:none; }
        .mtt-card-stagger.mtt-visible > *:nth-child(3) { transition-delay: 0.24s; opacity:1; transform:none; }
        .mtt-card-stagger.mtt-visible > *:nth-child(4) { transition-delay: 0.36s; opacity:1; transform:none; }
        .mtt-card-stagger.mtt-visible > *:nth-child(5) { transition-delay: 0.48s; opacity:1; transform:none; }
        .mtt-card-stagger.mtt-visible > *:nth-child(6) { transition-delay: 0.60s; opacity:1; transform:none; }
        .mtt-card-stagger.mtt-visible > *:nth-child(7) { transition-delay: 0.72s; opacity:1; transform:none; }
        .mtt-card-stagger.mtt-visible > *:nth-child(8) { transition-delay: 0.84s; opacity:1; transform:none; }
        .mtt-card-stagger.mtt-visible > *:nth-child(9) { transition-delay: 0.96s; opacity:1; transform:none; }

        /* Ensure the hero section elements are never hidden */
        .hero-sidecar-section .mtt-reveal,
        .hero-sidecar-section .mtt-reveal-left,
        .hero-sidecar-section .mtt-reveal-right,
        .hero-sidecar-section .mtt-reveal-scale,
        .hero-sidecar-section .mtt-stagger,
        .hero-sidecar-section .mtt-card-stagger,
        #banner .mtt-reveal,
        #banner .mtt-reveal-left,
        #banner .mtt-reveal-right,
        #banner .mtt-reveal-scale {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);

    /* ── 3. Tag elements for animation ─────────────────────── */
    function tagElements() {
        // Skip elements inside the hero/banner (already visible on load)
        function isInHero(el) {
            return el.closest('.hero-sidecar-section, #banner, .pkg-clean-hero, .inner-hero') !== null;
        }

        // Section labels & titles → slide up
        document.querySelectorAll('.section-label, .section-title, .section-desc').forEach(el => {
            if (!isInHero(el) && !el.classList.contains('mtt-reveal')) {
                el.classList.add('mtt-reveal');
            }
        });

        // Cards & white-card grids → staggered scale reveal
        document.querySelectorAll(
            '.mithra-service-grid, .cards-grid-3, .fleet-grid-3, .pkg-cards-grid, .holiday-cards-grid, ' +
            '.steps-grid, .about-grid, .features-grid, .values-grid, .team-grid, ' +
            '.fleet-cards-grid, .corp-features-grid, .package-grid'
        ).forEach(el => {
            if (!isInHero(el) && !el.classList.contains('mtt-card-stagger')) {
                el.classList.add('mtt-card-stagger');
            }
        });

        // Individual white cards when not inside a stagger parent
        document.querySelectorAll('.white-card, .fleet-card, .pkg-card-white, .step-item, .pkg-help-card').forEach(el => {
            const parent = el.parentElement;
            const parentHasStagger = parent && (parent.classList.contains('mtt-card-stagger') || parent.classList.contains('mtt-stagger'));
            if (!parentHasStagger && !isInHero(el) && !el.classList.contains('mtt-reveal-scale')) {
                el.classList.add('mtt-reveal-scale');
            }
        });

        // Trust/badge strip items → stagger
        document.querySelectorAll('.trust-strip, .hero-stats-strip').forEach(el => {
            if (!isInHero(el) && !el.classList.contains('mtt-stagger')) {
                el.classList.add('mtt-stagger');
            }
        });

        // Stat boxes → stagger
        document.querySelectorAll('.stat-box').forEach(el => {
            if (!isInHero(el) && !el.classList.contains('mtt-reveal')) {
                el.classList.add('mtt-reveal');
            }
        });

        // Generic section headers and content blocks
        document.querySelectorAll('.section-header, .pkg-quick-meta-bar, .pkg-nav-pills').forEach(el => {
            if (!isInHero(el) && !el.classList.contains('mtt-reveal')) {
                el.classList.add('mtt-reveal');
            }
        });

        // Left/Right split content
        document.querySelectorAll('.about-content-left, .corp-content-left, .feature-left, .content-left').forEach(el => {
            if (!isInHero(el) && !el.classList.contains('mtt-reveal-left')) {
                el.classList.add('mtt-reveal-left');
            }
        });
        document.querySelectorAll('.about-content-right, .corp-content-right, .feature-right, .content-right').forEach(el => {
            if (!isInHero(el) && !el.classList.contains('mtt-reveal-right')) {
                el.classList.add('mtt-reveal-right');
            }
        });

        // Package content cards on detail pages
        document.querySelectorAll('.pkg-content-card, .pkg-timeline-item').forEach(el => {
            if (!isInHero(el) && !el.classList.contains('mtt-reveal')) {
                el.classList.add('mtt-reveal');
            }
        });

        // Footer sections
        document.querySelectorAll('.footer-brand, .footer-links, .footer-contact, .footer-social').forEach(el => {
            if (!el.classList.contains('mtt-reveal')) {
                el.classList.add('mtt-reveal');
            }
        });
    }

    /* ── 4. IntersectionObserver — trigger .mtt-visible ────── */
    const observerConfig = {
        threshold: 0.10,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mtt-visible');
                // Once triggered, stop watching (fire-once)
                observer.unobserve(entry.target);
            }
        });
    }, observerConfig);

    function observeAll() {
        document.querySelectorAll('.mtt-reveal, .mtt-reveal-left, .mtt-reveal-right, .mtt-reveal-scale, .mtt-stagger, .mtt-card-stagger').forEach(el => {
            // If already in viewport on page load, mark visible immediately
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('mtt-visible');
            } else {
                observer.observe(el);
            }
        });
    }

    /* ── 5. Init on DOMContentLoaded ───────────────────────── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            tagElements();
            observeAll();
        });
    } else {
        tagElements();
        observeAll();
    }
})();
