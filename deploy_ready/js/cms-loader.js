/**
 * Mithra Tours & Travels — Dynamic Content Hydration Loader
 * Syncs Home Page & Holiday Packages with data/content.json managed via Admin CMS
 */

(function () {
    'use strict';

    // Determine path to content.json based on directory depth
    const contentPath = window.location.pathname.includes('/holidays/') ? '../data/content.json' : 'data/content.json';

    async function hydrateCMSContent() {
        try {
            const response = await fetch(contentPath + '?v=' + Date.now());
            if (!response.ok) return;
            const data = await response.json();

            const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/v2/') || window.location.pathname.endsWith('/deploy_ready/');

            // ════════════════ 1. HYDRATE ENTIRE HOME PAGE ════════════════
            if (data.home && isHomePage) {
                const h = data.home;

                // ── Hero Section ──
                const badgeEl = document.querySelector('.hero-sidecar-badge');
                if (badgeEl && h.heroBadge) {
                    badgeEl.innerHTML = `<i class="fa-solid fa-crown"></i> ${h.heroBadge.replace(/^[👑\s]+/, '')}`;
                }

                const titleEl = document.querySelector('.hero-sidecar-title');
                if (titleEl && (h.heroTitleLine1 || h.heroTitleHighlight)) {
                    titleEl.innerHTML = `${h.heroTitleLine1 || 'Journeys That Connect,'}<br><span class="gold-highlight">${h.heroTitleHighlight || 'Safe & Comfortable.'}</span>`;
                }

                const descEl = document.querySelector('.hero-sidecar-desc');
                if (descEl && h.heroSubtitle) {
                    descEl.innerHTML = h.heroSubtitle;
                }

                // ── Hero Buttons ──
                const actionButtons = document.querySelectorAll('.hero-action-row .btn');
                if (actionButtons.length >= 3) {
                    if (h.heroBtn1Text) {
                        actionButtons[0].innerHTML = `<i class="fa-solid fa-calendar-check"></i> ${h.heroBtn1Text}`;
                        if (h.heroBtn1Link) actionButtons[0].href = h.heroBtn1Link;
                    }
                    if (h.heroBtn2Text) {
                        actionButtons[1].innerHTML = `<i class="fa-solid fa-briefcase"></i> ${h.heroBtn2Text}`;
                        if (h.heroBtn2Link) actionButtons[1].href = h.heroBtn2Link;
                    }
                    if (h.heroBtn3Text) {
                        actionButtons[2].innerHTML = `<i class="fa-brands fa-whatsapp"></i> ${h.heroBtn3Text}`;
                        if (h.heroBtn3Link) actionButtons[2].href = h.heroBtn3Link;
                    }
                }

                // ── Trust Ticker Track ──
                if (h.trustTicker && Array.isArray(h.trustTicker) && h.trustTicker.length > 0) {
                    const trackEl = document.querySelector('.trust-track');
                    if (trackEl) {
                        const tickerHTML = h.trustTicker.map(t => `<div class="trust-item"><i class="fa-solid ${t.icon || 'fa-check-circle'}"></i> ${t.text}</div><div class="trust-dot"></div>`).join('');
                        trackEl.innerHTML = tickerHTML + tickerHTML; // duplicate for seamless infinite loop
                    }
                }

                // ── Corporate Mobility Section ──
                if (h.corporateSection) {
                    const cs = h.corporateSection;
                    const secLabel = document.querySelector('#corporate .section-label');
                    if (secLabel && cs.sectionLabel) secLabel.innerText = cs.sectionLabel;
                    const secTitle = document.querySelector('#corporate .section-title');
                    if (secTitle && cs.sectionTitle) secTitle.innerText = cs.sectionTitle;
                    const secDesc = document.querySelector('#corporate .section-desc');
                    if (secDesc && cs.sectionDesc) secDesc.innerText = cs.sectionDesc;

                    if (cs.cards && Array.isArray(cs.cards)) {
                        const cardEls = document.querySelectorAll('#corporate .mithra-service-card');
                        cardEls.forEach((cardEl, idx) => {
                            if (cs.cards[idx]) {
                                const cData = cs.cards[idx];
                                const t = cardEl.querySelector('.mithra-card-title');
                                if (t && cData.title) t.innerText = cData.title;
                                const d = cardEl.querySelector('.mithra-card-desc');
                                if (d && cData.desc) d.innerText = cData.desc;
                                const l = cardEl.querySelector('.mithra-link-text');
                                if (l && cData.linkText) l.innerHTML = `${cData.linkText} <i class="fa-solid fa-arrow-right"></i>`;
                                if (cData.linkUrl) cardEl.href = cData.linkUrl;
                            }
                        });
                    }
                }

                // ── Holidays Preview Section ──
                if (h.holidaysSection) {
                    const hs = h.holidaysSection;
                    const secLabel = document.querySelector('#holidays .section-label');
                    if (secLabel && hs.sectionLabel) secLabel.innerText = hs.sectionLabel;
                    const secTitle = document.querySelector('#holidays .section-title');
                    if (secTitle && hs.sectionTitle) secTitle.innerText = hs.sectionTitle;
                    const secDesc = document.querySelector('#holidays .section-desc');
                    if (secDesc && hs.sectionDesc) secDesc.innerText = hs.sectionDesc;

                    const pkgCards = document.querySelectorAll('#holidays .cards-grid-3 > a');
                    if (pkgCards.length >= 3) {
                        // Domestic
                        if (hs.domesticCard) {
                            const t = pkgCards[0].querySelector('h4');
                            if (t && hs.domesticCard.title) t.innerText = hs.domesticCard.title;
                            const p = pkgCards[0].querySelector('p');
                            if (p && hs.domesticCard.desc) p.innerText = hs.domesticCard.desc;
                            const b = pkgCards[0].querySelector('.btn');
                            if (b && hs.domesticCard.btnText) b.innerText = hs.domesticCard.btnText;
                        }
                        // International
                        if (hs.intlCard) {
                            const t = pkgCards[1].querySelector('h4');
                            if (t && hs.intlCard.title) t.innerText = hs.intlCard.title;
                            const p = pkgCards[1].querySelector('p');
                            if (p && hs.intlCard.desc) p.innerText = hs.intlCard.desc;
                            const b = pkgCards[1].querySelector('.btn');
                            if (b && hs.intlCard.btnText) b.innerText = hs.intlCard.btnText;
                        }
                        // Visa / Travel Desk
                        if (hs.visaCard) {
                            const t = pkgCards[2].querySelector('.mithra-card-title');
                            if (t && hs.visaCard.title) t.innerText = hs.visaCard.title;
                            const p = pkgCards[2].querySelector('.mithra-card-desc');
                            if (p && hs.visaCard.desc) p.innerText = hs.visaCard.desc;
                        }
                    }
                }

                // ── Why Mithra Section ──
                if (h.whyMithraSection) {
                    const ws = h.whyMithraSection;
                    const secTitle = document.querySelector('#why-mithra .section-title');
                    if (secTitle && ws.sectionTitle) secTitle.innerText = ws.sectionTitle;
                    const secDesc = document.querySelector('#why-mithra .section-desc');
                    if (secDesc && ws.sectionDesc) secDesc.innerText = ws.sectionDesc;

                    if (ws.roadMapSteps && Array.isArray(ws.roadMapSteps)) {
                        const nodes = document.querySelectorAll('#why-mithra .flow-node-body');
                        nodes.forEach((node, idx) => {
                            if (ws.roadMapSteps[idx]) {
                                const step = ws.roadMapSteps[idx];
                                const t = node.querySelector('h3');
                                if (t && step.title) t.innerText = step.title;
                                const p = node.querySelector('p');
                                if (p && step.desc) p.innerText = step.desc;
                            }
                        });
                    }
                }
            }

            // ════════════════ 2. HYDRATE HOLIDAYS DIRECTORY PAGE ════════════════
            if (data.holidays_main && window.location.pathname.includes('holidays.html')) {
                const mainTitle = document.querySelector('.holidays-hero-title, .page-hero h1');
                if (mainTitle && data.holidays_main.pageTitle) {
                    mainTitle.innerText = data.holidays_main.pageTitle;
                }
                const mainSubtitle = document.querySelector('.holidays-hero-desc, .page-hero p');
                if (mainSubtitle && data.holidays_main.pageSubtitle) {
                    mainSubtitle.innerText = data.holidays_main.pageSubtitle;
                }
            }

            // ════════════════ 3. HYDRATE HOLIDAY SUBPAGES ════════════════
            const allPackages = Object.assign({}, data.domestic_packages || {}, data.international_packages || {});
            const currentFileName = window.location.pathname.split('/').pop().replace('.html', '').toLowerCase();

            if (allPackages[currentFileName]) {
                const pkg = allPackages[currentFileName];

                const priceTags = document.querySelectorAll('.pkg-price-tag, .sidebar-From, .sidebar-price, .pkg-sidebar-price, [data-cms="price"]');
                priceTags.forEach(el => {
                    if (pkg.price) {
                        el.innerHTML = `${pkg.price} <span style="font-size:0.8rem; font-weight:600; color:#7C5C35;">/ ${pkg.pricePer || 'person'}</span>`;
                    }
                });

                const overviewEl = document.querySelector('.pkg-overview-text, [data-cms="overview"]');
                if (overviewEl && pkg.overview) {
                    overviewEl.innerText = pkg.overview;
                }

                const durationBadges = document.querySelectorAll('.pkg-duration-badge, .sidebar-duration, [data-cms="duration"]');
                durationBadges.forEach(el => {
                    if (pkg.duration) el.innerText = pkg.duration;
                });
            }

        } catch (e) {
            console.debug('CMS Hydration note:', e);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hydrateCMSContent);
    } else {
        hydrateCMSContent();
    }
})();
