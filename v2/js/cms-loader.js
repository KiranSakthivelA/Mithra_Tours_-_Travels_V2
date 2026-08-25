/**
 * Mithra Tours & Travels — Comprehensive Universal Dynamic CMS Loader
 * Seamlessly hydrates ALL pages (Home, Corporate, Fleet, Holidays catalog, Individual holiday detail pages)
 * from data/content.json with multi-origin fallback to Admin API.
 */

(function () {
    'use strict';

    const isSubfolder = window.location.pathname.includes('/holidays/');
    const contentPath = isSubfolder ? '../data/content.json' : 'data/content.json';

    async function hydrateCMSContent() {
        try {
            let data = null;
            // 1. Try local data/content.json with cache buster
            try {
                const response = await fetch(contentPath + '?v=' + Date.now());
                if (response.ok) {
                    const json = await response.json();
                    data = json.data || json.content || json;
                }
            } catch(e) {}

            // 2. Cross-Subdomain Fallback: Admin API endpoint
            if (!data || !data.home) {
                try {
                    const apiEndpoint = window.location.origin.includes('admin.') 
                        ? 'api/get_cms_content.php' 
                        : 'https://admin.mithratoursandtravels.in/api/get_cms_content.php';
                    const res = await fetch(apiEndpoint + '?v=' + Date.now());
                    if (res.ok) {
                        const json = await res.json();
                        data = json.data || json.content || json;
                    }
                } catch(e) {}
            }

            // 3. Fallback: Static data/content.json on Admin Subdomain
            if (!data || !data.home) {
                try {
                    const res = await fetch('https://admin.mithratoursandtravels.in/data/content.json?v=' + Date.now());
                    if (res.ok) {
                        const json = await res.json();
                        data = json.data || json.content || json;
                    }
                } catch(e) {}
            }

            if (!data) return;

            // ══════════════════════════════════════════════════════════════════
            // 1. HYDRATE HOME PAGE (DOM-TARGETED, ZERO BRITTLE PATH CHECKS)
            // ══════════════════════════════════════════════════════════════════
            if (data.home) {
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

                // ── Hero Action Buttons ──
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

                // ── Trust Strip / Ticker ──
                if (h.trustTicker && Array.isArray(h.trustTicker) && h.trustTicker.length > 0) {
                    const trackEl = document.querySelector('.trust-track');
                    if (trackEl) {
                        const tickerHTML = h.trustTicker.map(t => `<div class="trust-item"><i class="fa-solid ${t.icon || 'fa-check-circle'}"></i> ${t.text}</div><div class="trust-dot"></div>`).join('');
                        trackEl.innerHTML = tickerHTML + tickerHTML;
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

                // ── Holidays Preview Section & Showcase Cards on Home Page ──
                if (h.holidaysSection) {
                    const hs = h.holidaysSection;
                    const secLabel = document.querySelector('#holidays .section-label, .holidays-preview-section .section-label');
                    if (secLabel && hs.sectionLabel) secLabel.innerText = hs.sectionLabel;
                    const secTitle = document.querySelector('#holidays .section-title, .holidays-preview-section .section-title');
                    if (secTitle && hs.sectionTitle) secTitle.innerText = hs.sectionTitle;
                    const secDesc = document.querySelector('#holidays .section-desc, .holidays-preview-section .section-desc');
                    if (secDesc && hs.sectionDesc) secDesc.innerText = hs.sectionDesc;

                    const pkgCards = document.querySelectorAll('#holidays .cards-grid-3 > a, .holidays-preview-section .cards-grid-3 > a, #holidays-preview .cards-grid-3 > a');
                    if (pkgCards.length >= 3) {
                        // 1. Domestic Showcase Card
                        if (hs.domesticCard) {
                            const img = pkgCards[0].querySelector('img');
                            if (img && hs.domesticCard.image) img.src = hs.domesticCard.image;
                            const t = pkgCards[0].querySelector('h4, .mithra-card-title');
                            if (t && hs.domesticCard.title) t.innerText = hs.domesticCard.title;
                            const p = pkgCards[0].querySelector('p, .mithra-card-desc');
                            if (p && hs.domesticCard.desc) p.innerText = hs.domesticCard.desc;
                            const b = pkgCards[0].querySelector('.btn');
                            if (b && hs.domesticCard.btnText) b.innerText = hs.domesticCard.btnText;
                            if (hs.domesticCard.linkUrl) pkgCards[0].href = hs.domesticCard.linkUrl;
                        }
                        // 2. International Showcase Card
                        if (hs.intlCard) {
                            const img = pkgCards[1].querySelector('img');
                            if (img && hs.intlCard.image) img.src = hs.intlCard.image;
                            const t = pkgCards[1].querySelector('h4, .mithra-card-title');
                            if (t && hs.intlCard.title) t.innerText = hs.intlCard.title;
                            const p = pkgCards[1].querySelector('p, .mithra-card-desc');
                            if (p && hs.intlCard.desc) p.innerText = hs.intlCard.desc;
                            const b = pkgCards[1].querySelector('.btn');
                            if (b && hs.intlCard.btnText) b.innerText = hs.intlCard.btnText;
                            if (hs.intlCard.linkUrl) pkgCards[1].href = hs.intlCard.linkUrl;
                        }
                        // 3. Visa / Travel Desk Card
                        if (hs.visaCard) {
                            const img = pkgCards[2].querySelector('img');
                            if (img && hs.visaCard.image) img.src = hs.visaCard.image;
                            const t = pkgCards[2].querySelector('.mithra-card-title');
                            if (t && hs.visaCard.title) t.innerText = hs.visaCard.title;
                            const p = pkgCards[2].querySelector('.mithra-card-desc');
                            if (p && hs.visaCard.desc) p.innerText = hs.visaCard.desc;
                            if (hs.visaCard.linkUrl) pkgCards[2].href = hs.visaCard.linkUrl;
                        }
                    }

                    // ── Featured Special Holiday Offer Banner ──
                    const offerBannerEl = document.getElementById('holidays-offer-banner');
                    if (offerBannerEl && hs.offerBanner) {
                        const ob = hs.offerBanner;
                        if (ob.enabled === false) {
                            offerBannerEl.style.display = 'none';
                        } else {
                            offerBannerEl.style.display = '';
                            
                            const tagBadge = document.getElementById('offer-tag-badge');
                            if (tagBadge && ob.tag) tagBadge.innerHTML = '<i class="fa-solid fa-fire"></i> ' + ob.tag + (ob.discountBadge ? ' &bull; ' + ob.discountBadge : '');
                            
                            const saveBadge = document.getElementById('offer-save-badge');
                            if (saveBadge && ob.saveTag) saveBadge.innerHTML = '<i class="fa-solid fa-tag"></i> ' + ob.saveTag;
                            
                            const mainTitle = document.getElementById('offer-main-title');
                            if (mainTitle && ob.title) mainTitle.innerText = ob.title;
                            
                            const chipDuration = document.getElementById('offer-chip-duration');
                            if (chipDuration && ob.duration) chipDuration.innerText = ob.duration;
                            
                            const mainDesc = document.getElementById('offer-main-desc');
                            if (mainDesc && ob.desc) {
                                mainDesc.innerHTML = `<span id="offer-chip-duration">${ob.duration || '3 Nights / 4 Days'}</span> &bull; <span id="offer-chip-cab">Dedicated Private Cab</span> &bull; <span id="offer-chip-stay">Luxury Resort Stay</span> &bull; Breakfast Included`;
                            }
                            
                            const origPrice = document.getElementById('offer-price-orig');
                            if (origPrice && ob.originalPrice) origPrice.innerText = ob.originalPrice;
                            
                            const dealPrice = document.getElementById('offer-price-deal');
                            if (dealPrice && ob.offerPrice) dealPrice.innerText = ob.offerPrice;
                            
                            const priceUnit = document.getElementById('offer-price-unit');
                            if (priceUnit && ob.pricePer) priceUnit.innerText = '/ ' + ob.pricePer.replace(/^\/\s*/, '');
                            
                            const visualImg = document.getElementById('offer-visual-img');
                            if (visualImg && ob.image) visualImg.src = ob.image;

                            const btn1 = document.getElementById('offer-btn-primary');
                            if (btn1) {
                                if (ob.btn1Text) btn1.innerHTML = '<i class="fa-solid fa-calendar-check"></i> <span>' + ob.btn1Text + '</span>';
                                if (ob.btn1Link) btn1.href = ob.btn1Link;
                            }
                            const btn2 = document.getElementById('offer-btn-secondary');
                            if (btn2) {
                                if (ob.btn2Text) btn2.innerHTML = '<i class="fa-brands fa-whatsapp"></i> <span>' + ob.btn2Text + '</span>';
                                if (ob.btn2Link) btn2.href = ob.btn2Link;
                            }
                        }
                    }
                }

                // ── Why Choose Us S-Road Flow ──
                if (h.whyMithraSection) {
                    const ws = h.whyMithraSection;
                    const wLabel = document.querySelector('#why-mithra .section-label');
                    if (wLabel && ws.sectionLabel) wLabel.innerText = ws.sectionLabel;
                    const wTitle = document.querySelector('#why-mithra .section-title');
                    if (wTitle && ws.sectionTitle) wTitle.innerText = ws.sectionTitle;
                    const wDesc = document.querySelector('#why-mithra .section-desc');
                    if (wDesc && ws.sectionDesc) wDesc.innerText = ws.sectionDesc;

                    if (ws.roadMapSteps && Array.isArray(ws.roadMapSteps)) {
                        const stepBodies = document.querySelectorAll('#why-mithra .flow-node-body');
                        stepBodies.forEach((body, idx) => {
                            if (ws.roadMapSteps[idx]) {
                                const st = ws.roadMapSteps[idx];
                                const h3 = body.querySelector('h3');
                                if (h3 && st.title) h3.innerText = st.title;
                                const p = body.querySelector('p');
                                if (p && st.desc) p.innerText = st.desc;
                            }
                        });
                    }
                }
            }

            // ══════════════════════════════════════════════════════════════════
            // 2. HYDRATE HOLIDAYS CATALOG PAGE (holidays.html)
            // ══════════════════════════════════════════════════════════════════
            if (document.getElementById('domestic-packages') || document.getElementById('international-packages')) {
                const hp = data.holidays_page || {};

                // 1. Holidays Page Main Hero Banner
                const heroTitle = document.querySelector('#banner .inner-hero-title, .inner-hero-title');
                if (heroTitle && hp.heroTitle) heroTitle.innerText = hp.heroTitle;
                const heroDesc = document.querySelector('#banner .section-desc, .inner-hero .section-desc');
                if (heroDesc && hp.heroSubtitle) heroDesc.innerText = hp.heroSubtitle;

                // 2. Travel Solutions 6-Cards Section Header
                if (hp.servicesSection) {
                    const svLabel = document.querySelector('#travel-cards .section-label');
                    if (svLabel && hp.servicesSection.sectionLabel) svLabel.innerText = hp.servicesSection.sectionLabel;
                    const svTitle = document.querySelector('#travel-cards .section-title');
                    if (svTitle && hp.servicesSection.sectionTitle) svTitle.innerText = hp.servicesSection.sectionTitle;
                    const svDesc = document.querySelector('#travel-cards .section-desc');
                    if (svDesc && hp.servicesSection.sectionDesc) svDesc.innerText = hp.servicesSection.sectionDesc;
                }

                // 3. Domestic Packages Section Header
                if (hp.domesticSection) {
                    const domLabel = document.querySelector('#domestic-packages .section-label');
                    if (domLabel && hp.domesticSection.sectionLabel) domLabel.innerText = hp.domesticSection.sectionLabel;
                    const domTitle = document.querySelector('#domestic-packages .section-title');
                    if (domTitle && hp.domesticSection.sectionTitle) domTitle.innerText = hp.domesticSection.sectionTitle;
                    const domDesc = document.querySelector('#domestic-packages .section-desc');
                    if (domDesc && hp.domesticSection.sectionDesc) domDesc.innerText = hp.domesticSection.sectionDesc;
                }

                // 4. International Packages Section Header
                if (hp.internationalSection) {
                    const intlLabel = document.querySelector('#international-packages .section-label');
                    if (intlLabel && hp.internationalSection.sectionLabel) intlLabel.innerText = hp.internationalSection.sectionLabel;
                    const intlTitle = document.querySelector('#international-packages .section-title');
                    if (intlTitle && hp.internationalSection.sectionTitle) intlTitle.innerText = hp.internationalSection.sectionTitle;
                    const intlDesc = document.querySelector('#international-packages .section-desc');
                    if (intlDesc && hp.internationalSection.sectionDesc) intlDesc.innerText = hp.internationalSection.sectionDesc;
                }

                                // Helper to hydrate a package card element
                function applyPackageToCard(card, pkg) {
                    if (!card || !pkg) return;
                    const img = card.querySelector('.pkg-img-wrap img, img');
                    if (img && pkg.image) {
                        img.src = pkg.image;
                    }
                                        const tag = card.querySelector('.pkg-tag-badge');
                    if (tag) tag.innerText = pkg.tagBadge || pkg.tag || (card.classList.contains('pkg-card-white') ? tag.innerText : 'Featured Tour');
                    const dur = card.querySelector('.pkg-duration-badge');
                    if (dur) dur.innerText = pkg.durationBadge || pkg.duration || '3N / 4D';
                    const reg = card.querySelector('.pkg-region');
                    if (reg && pkg.region) reg.innerText = pkg.region;
                    const title = card.querySelector('.pkg-title, h3, h4');
                    if (title && pkg.title) title.innerText = pkg.title;
                    const sub = card.querySelector('.pkg-subtitle-text');
                    if (sub && pkg.subtitle) sub.innerText = pkg.subtitle;
                    const bf = card.querySelector('.pkg-bestfor-pill');
                    if (bf && pkg.bestFor) {
                        bf.innerHTML = '<i class="fa-solid fa-users" style="color:var(--gold-3);"></i> Best For: ' + pkg.bestFor.replace(/^Best For:\s*/i, '');
                    }
                    if (pkg.highlights && Array.isArray(pkg.highlights) && pkg.highlights.length > 0) {
                        const hlBox = card.querySelector('.pkg-highlights');
                        if (hlBox) {
                            hlBox.innerHTML = pkg.highlights.map(h => '<span class="pkg-hl-pill">' + h + '</span>').join('\n');
                        }
                    }
                    const desc = card.querySelector('.pkg-desc-text, p');
                    if (desc && pkg.overview) desc.innerText = pkg.overview;
                    const priceVal = card.querySelector('.pkg-price-val, .pkg-price-tag');
                    if (priceVal && pkg.price) priceVal.innerText = pkg.price;
                    const priceUnit = card.querySelector('.pkg-price-unit');
                    if (priceUnit && pkg.pricePer) priceUnit.innerText = '/ ' + pkg.pricePer.replace(/^\/\s*/, '');
                }

                // Domestic Package Cards on holidays.html
                const domCards = document.querySelectorAll('#domestic-packages .pkg-card-white, #domestic-packages .pkg-preview-card');
                const domPkgs = data.domestic_packages || {};
                domCards.forEach((card, i) => {
                    const href = (card.getAttribute('href') || '').toLowerCase();
                    let matchedPkg = null;
                    for (let key in domPkgs) {
                        if (href.includes(key.toLowerCase()) || (domPkgs[key].id && href.includes(domPkgs[key].id.toLowerCase()))) {
                            matchedPkg = domPkgs[key];
                            break;
                        }
                    }
                    if (!matchedPkg) {
                        const pkgArray = Object.values(domPkgs);
                        matchedPkg = pkgArray[i];
                    }
                    applyPackageToCard(card, matchedPkg);
                });

                // International Package Cards on holidays.html
                const intlCards = document.querySelectorAll('#international-packages .pkg-card-white, #international-packages .pkg-preview-card');
                const intlPkgs = data.international_packages || {};
                intlCards.forEach((card, i) => {
                    const href = (card.getAttribute('href') || '').toLowerCase();
                    let matchedPkg = null;
                    for (let key in intlPkgs) {
                        if (href.includes(key.toLowerCase()) || (intlPkgs[key].id && href.includes(intlPkgs[key].id.toLowerCase()))) {
                            matchedPkg = intlPkgs[key];
                            break;
                        }
                    }
                    if (!matchedPkg) {
                        const pkgArray = Object.values(intlPkgs);
                        matchedPkg = pkgArray[i];
                    }
                    applyPackageToCard(card, matchedPkg);
                });
            }

            // ══════════════════════════════════════════════════════════════════
            // 3. HYDRATE INDIVIDUAL HOLIDAY DETAIL PAGES (holidays/*.html)
            // ══════════════════════════════════════════════════════════════════
            const allPackages = Object.assign({}, data.domestic_packages || {}, data.international_packages || {});
            const currentFileName = window.location.pathname.split('/').pop().replace('.html', '').toLowerCase();

            // Find matching package by key (domestic_package_1) OR id (kodaikanal)
            let pkg = allPackages[currentFileName];
            if (!pkg) {
                for (let k in allPackages) {
                    if (allPackages[k].id === currentFileName || k === currentFileName) {
                        pkg = allPackages[k];
                        break;
                    }
                }
            }

            if (pkg) {
                // Page Header Title & Subtitle
                const heroTitle = document.querySelector('.inner-hero-title, [data-cms="title"]');
                if (heroTitle && pkg.title) heroTitle.innerText = pkg.title;

                const heroSub = document.querySelector('.section-desc.center, [data-cms="subtitle"]');
                if (heroSub && pkg.subtitle) heroSub.innerText = pkg.subtitle;

                // Meta Bar Duration, Destination, Best For, Price
                const metaDuration = document.querySelector('.pkg-quick-meta-bar .meta-box:nth-child(1) .meta-box-val, [data-cms="duration"]');
                if (metaDuration && pkg.duration) metaDuration.innerText = pkg.duration;

                const metaDest = document.querySelector('.pkg-quick-meta-bar .meta-box:nth-child(2) .meta-box-val, [data-cms="region"]');
                if (metaDest && pkg.region) metaDest.innerText = pkg.region;

                const metaIdeal = document.querySelector('.pkg-quick-meta-bar .meta-box:nth-child(3) .meta-box-val, [data-cms="bestFor"]');
                if (metaIdeal && pkg.bestFor) metaIdeal.innerText = pkg.bestFor;

                const metaPrice = document.querySelector('.pkg-quick-meta-bar .meta-box:nth-child(4) .meta-box-val, .sidebar-From, .sidebar-price, .pkg-sidebar-price, [data-cms="price"]');
                if (metaPrice && pkg.price) {
                    metaPrice.innerHTML = `${pkg.price} <span style="font-size:0.75rem; font-weight:600; color:#64748B;">/ ${pkg.pricePer || 'person'}</span>`;
                }

                // Overview photo & text
                const overviewImg = document.querySelector('#overview img, .pkg-overview-img');
                if (overviewImg && pkg.image) {
                    overviewImg.src = isSubfolder ? '../' + pkg.image.replace(/^\.\.\//, '') : pkg.image;
                }

                const overviewText = document.querySelector('#overview > p, .pkg-overview-text, [data-cms="overview"]');
                if (overviewText && pkg.overview) overviewText.innerText = pkg.overview;

                // Highlights pills
                if (pkg.highlights && Array.isArray(pkg.highlights) && pkg.highlights.length > 0) {
                    const hlContainer = document.querySelector('#overview .pkg-highlights');
                    if (hlContainer) {
                        hlContainer.innerHTML = pkg.highlights.map(h => `<span class="pkg-hl-pill"><i class="fa-solid fa-location-dot" style="color:var(--gold-4); font-size:0.75rem;"></i> ${h}</span>`).join('\n');
                    }
                }

                // Inclusions & Exclusions
                if (pkg.inclusions && Array.isArray(pkg.inclusions) && pkg.inclusions.length > 0) {
                    const incList = document.querySelector('#inclusions .inclusions-list, #inclusions ul');
                    if (incList) {
                        incList.innerHTML = pkg.inclusions.map(inc => `<li><i class="fa-solid fa-circle-check" style="color:#10B981; margin-right:8px;"></i> ${inc}</li>`).join('\n');
                    }
                }
                if (pkg.exclusions && Array.isArray(pkg.exclusions) && pkg.exclusions.length > 0) {
                    const excList = document.querySelector('#inclusions .exclusions-list, #exclusions ul');
                    if (excList) {
                        excList.innerHTML = pkg.exclusions.map(exc => `<li><i class="fa-solid fa-circle-xmark" style="color:#EF4444; margin-right:8px;"></i> ${exc}</li>`).join('\n');
                    }
                }
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
