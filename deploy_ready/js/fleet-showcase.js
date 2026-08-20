/**
 * MITHRA TOURS & TRAVELS — 3D Circular Fleet Carousel Engine
 * Clean, Executive Corporate 3D Showcase (No Ghosting / Zero Blur)
 */

document.addEventListener('DOMContentLoaded', () => {
    initFleetShowcase();
});

function initFleetShowcase() {
    const stage = document.getElementById('fleet-stage');
    if (!stage) return;

    const cards = Array.from(stage.querySelectorAll('.coverflow-card'));
    if (!cards.length) return;

    const prevBtn = document.getElementById('fleet-prev-btn');
    const nextBtn = document.getElementById('fleet-next-btn');
    const dotsContainer = document.getElementById('fleet-dots');
    const counterEl = document.getElementById('fleet-counter');
    const filterTabs = document.querySelectorAll('.fleet-filter-btn');
    const viewButtons = document.querySelectorAll('.fleet-view-btn');
    const gridViewContainer = document.getElementById('fleet-grid-view');
    const matrixViewContainer = document.getElementById('fleet-matrix-view');
    const coverflowViewContainer = document.getElementById('fleet-coverflow-view');
    const stageContainer = document.getElementById('fleet-stage-container');

    let currentFilter = 'all';
    let visibleCards = [...cards];
    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let dragThreshold = 40;
    let autoplayTimer = null;
    let isHovered = false;

    // Vehicle Database for Quick Specs Modal
    const vehicleData = {
        'sedan': {
            title: 'Maruthi Dzire, Honda Amaze, Hyundai Aura',
            category: 'Sedan',
            tag: 'Local & Outstation',
            seats: '4 Seater (4+1)',
            luggage: '2 Large + 2 Small Bags',
            ac: 'Powerful Climate AC',
            fuel: 'Petrol / Diesel (BS6 Compliant)',
            inclusions: ['Verified Professional Chauffeur', 'GPS Live Tracking', 'Sanitized Interior', 'Toll & Fuel Included in Quotes'],
            bestFor: 'Daily city commutes, airport transfers, corporate visits, and cost-effective outstation family trips.',
            rates: 'Starting from ₹12/km • Local 8hr/80km & outstation packages available.',
            image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=900',
            waText: 'Hi Mithra Tours, I want a quote for Sedan (Dzire / Amaze / Aura).'
        },
        'premium-sedan': {
            title: 'Toyota Corolla Altis, Ciaz, Honda City, Hyundai Verna',
            category: 'Premium Sedan',
            tag: 'Executive Sedan',
            seats: '4 Seater (4+1)',
            luggage: '3 Large Bags',
            ac: 'Automatic Climate Control',
            fuel: 'High Efficiency Petrol / Diesel',
            inclusions: ['Executive Chauffeur with Uniform', 'On-board Water & Tissues', 'Express Fastag', 'Plush Leather Seating'],
            bestFor: 'Senior executive mobility, VIP airport reception, leadership business visits, and premium outstation travel.',
            rates: 'Starting from ₹16/km • Corporate day packages and airport express transfers.',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=900',
            waText: 'Hi Mithra Tours, I want a quote for Premium Sedan (Corolla / City / Verna).'
        },
        'suv': {
            title: 'Toyota Innova, Maruthi Ertiga, Kia Carens',
            category: 'SUV',
            tag: 'Family & Corporate',
            seats: '6-7 Seater (6/7+1)',
            luggage: '3-4 Medium Bags',
            ac: 'Dual AC with Rear Air Vents',
            fuel: 'Diesel / Smart Hybrid',
            inclusions: ['Spacious Cabin with Split Folding Seats', 'Experienced Highway Driver', 'Music System with Bluetooth', 'Full Cleanliness Standard'],
            bestFor: 'Family holiday trips, corporate team site visits, industrial plant tours, and weekend getaways.',
            rates: 'Starting from ₹18/km • Custom multi-day tour pricing available.',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=900',
            waText: 'Hi Mithra Tours, I want a quote for SUV (Innova / Ertiga / Carens).'
        },
        'muv-crysta': {
            title: 'Toyota Innova Crysta',
            category: 'Executive MUV',
            tag: 'VIP Executive Standard',
            seats: '7 Seater (6/7+1)',
            luggage: '4 Large Bags',
            ac: 'Dual Zone Automatic Climate Control',
            fuel: 'Powerful Diesel Turbo Engine',
            inclusions: ['Plush Captain Recliner Seats', 'Dedicated USB Charging Ports', 'Top-tier Chauffeur in Uniform', 'Superior Ride Suspension'],
            bestFor: 'The benchmark for corporate client mobility, VIP guests, leadership delegations, and outstation comfort.',
            rates: 'Starting from ₹21/km • Available on daily, weekly, and monthly corporate retainer.',
            image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=900',
            waText: 'Hi Mithra Tours, I want a quote for Toyota Innova Crysta.'
        },
        'premium-muv': {
            title: 'Toyota Fortuner, Toyota Innova Hycross',
            category: 'Premium MUV',
            tag: 'High Stature Luxury',
            seats: '6-7 Seater (6+1)',
            luggage: '4 Large Bags',
            ac: 'Multi-zone Climate Control',
            fuel: 'Self-Charging Hybrid / 4x4 Diesel',
            inclusions: ['Ottoman Lounge Recliners (Hycross)', 'Commanding Road Presence', 'Premium Chauffeur Service', 'Panoramic Sunroof (where applicable)'],
            bestFor: 'CEO delegations, VIP wedding escorts, high-profile state visits, and luxury corporate tours.',
            rates: 'Starting from ₹32/km • Custom VIP event and full-day booking packages.',
            image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=900',
            waText: 'Hi Mithra Tours, I want a quote for Toyota Fortuner / Hycross.'
        },
        'luxury': {
            title: 'Mercedes Benz, BMW Series, AUDI',
            category: 'Luxury Vehicles',
            tag: 'Ultra Luxury Mobility',
            seats: '4-5 Seater (4+1)',
            luggage: '3 Large Bags',
            ac: 'Multi-Zone Whisper Silent AC',
            fuel: 'Premium German Engineering',
            inclusions: ['Elite Chauffeur Service', 'White Glove Protocol', 'Complimentary Luxury Amenities', 'Discreet & Secure Transfers'],
            bestFor: 'Celebrity transport, high-level diplomat movements, board member conferences, and luxury destination weddings.',
            rates: 'Customized bespoke tariffs based on itinerary and protocol requirements.',
            image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=900',
            waText: 'Hi Mithra Tours, I want a quote for Luxury Mercedes / BMW / Audi.'
        },
        'urbania': {
            title: 'Force Urbania (Luxury Monocoque Van)',
            category: 'Luxury Monocoque Van',
            tag: 'Next Gen Group Luxury',
            seats: '12-17 Seater (12/16+1)',
            luggage: 'Generous Dedicated Boot Space',
            ac: 'Aircraft-style Overhead Ducted AC',
            fuel: 'Mercedes-Derived Common Rail Diesel',
            inclusions: ['Ergonomic Individual Recliners', 'Individual USB & Reading Lights', 'Sealed Monocoque Low NVH Body', 'Panoramic High View Windows'],
            bestFor: 'World-class executive group delegations, international tourist groups, wedding family entourages, and high-end offsites.',
            rates: 'Starting from ₹28/km • Premium group travel with unrivaled comfort.',
            image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=900',
            waText: 'Hi Mithra Tours, I want a quote for Force Urbania.'
        },
        'tempo': {
            title: 'Force Tempo Traveller [AC / Non AC]',
            category: 'Light Transport Van',
            tag: 'Group Excursions',
            seats: '12-18 Seater (12/16/18+1)',
            luggage: 'Rear Trunk + Overhead Carrier',
            ac: 'Central Roof Air Conditioning',
            fuel: 'Reliable Heavy-Duty Turbo Diesel',
            inclusions: ['Pushback Seating', 'Hi-Def Audio & Video Entertainment', 'Experienced Long-Distance Driver', 'All-India National Tourist Permit'],
            bestFor: 'Corporate team outings, pilgrimage group tours (Tirupati, Shirdi, Madurai), family functions, and college tours.',
            rates: 'Starting from ₹24/km • Round-trip and multi-day packages.',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=900',
            waText: 'Hi Mithra Tours, I want a quote for Force Tempo Traveller.'
        },
        'van': {
            title: 'Tourist Van [AC / Non AC] (SML & Volvo Coaches)',
            category: 'Tourist Van',
            tag: 'Medium Group Tours',
            seats: 'Up to 25 Seater (25+1)',
            luggage: 'Spacious Dedicated Underbody Boot',
            ac: 'High Capacity Powerful AC',
            fuel: 'Commercial Diesel Engine',
            inclusions: ['Wide 2x2 Seating Layout', 'Curtains & Ambient Lighting', 'PA Microphone for Tour Guide', 'Smooth Air Suspension'],
            bestFor: 'Medium-sized employee transfers, wedding guest shuttles, pilgrimage circuits, and inbound tourist groups.',
            rates: 'Starting from ₹30/km • Competitive corporate day and event rates.',
            image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=900',
            waText: 'Hi Mithra Tours, I want a quote for 25 Seater Tourist Van.'
        },
        'minibus': {
            title: 'Minibus [AC / Non AC] (SML, Ashok Leyland & Tata)',
            category: 'Mini Bus',
            tag: 'Staff & Convention',
            seats: '32-36 Seater (Up to 35+1)',
            luggage: 'Deep Luggage Compartments',
            ac: 'Heavy Duty Roof AC Plant',
            fuel: 'Eco BS6 Clean Diesel',
            inclusions: ['CCTV & Speed Governor Installed', 'Comfortable High Back Seats', 'Licensed Commercial Transport Pilot', 'Daily Sanitization Routine'],
            bestFor: 'Monthly corporate staff pickup/drop contracts, convention transfers, campus events, and educational tours.',
            rates: 'Custom monthly contracts and single-day event quotes available.',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=900',
            waText: 'Hi Mithra Tours, I want a quote for 36 Seater Minibus.'
        },
        'bus': {
            title: 'Luxury Coach Bus [AC / Non AC] (Volvo, BharatBenz)',
            category: 'Large Coach Bus',
            tag: 'Mega Group & Luxury',
            seats: '48-55 Seater (Up to 55+1)',
            luggage: 'Massive Underbelly Luggage Bays',
            ac: 'Multi-Blower Industrial Climate AC',
            fuel: 'High Power Clean Multi-Axle Diesel',
            inclusions: ['Pneumatic Air Suspension System', 'Plush Sleeper / Semi-Sleeper Reclining Seats', 'Emergency Exits & First Aid', 'Dual Drivers for Long Hauls'],
            bestFor: 'Annual corporate conventions, destination weddings, school/university tours, and large corporate offsites across South India.',
            rates: 'Custom tailored convention and tour packages.',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=900',
            waText: 'Hi Mithra Tours, I want a quote for 55 Seater Luxury Coach Bus.'
        }
    };

    // Calculate 3D Circular Arc Placement for Infinite Loop Carousel
    // NOTE: All visible cards have opacity 1.0 (SOLID) to prevent blurry ghosting / bleed-through
    function updateCoverflow() {
        const total = visibleCards.length;
        if (!total) return;

        currentIndex = (currentIndex % total + total) % total;

        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

        const spacingX = isMobile ? Math.min(window.innerWidth * 0.68, 240) : (isTablet ? 230 : 295);
        const rotateStep = isMobile ? 14 : 22;

        visibleCards.forEach((card, i) => {
            let diff = (i - currentIndex) % total;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            card.classList.remove('active', 'prev-1', 'next-1', 'prev-2', 'next-2', 'hidden-card');
            card.style.filter = 'none';

            if (diff === 0) {
                // 1. Center Active Card (Solid 100% Native Sharpness)
                card.classList.add('active');
                card.style.transform = 'translate3d(0, 0, 0)';
                card.style.zIndex = '30';
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.pointerEvents = 'auto';
            } else if (diff === -1) {
                // 2. Left Flanking Card (Solid 100% opacity - NO milky/white overlay)
                card.classList.add('prev-1');
                card.style.transform = `translate3d(-${spacingX}px, 0, -35px) rotateY(${rotateStep}deg) scale(${isMobile ? 0.84 : 0.88})`;
                card.style.zIndex = '20';
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.pointerEvents = 'auto';
            } else if (diff === 1) {
                // 3. Right Flanking Card (Solid 100% opacity - NO milky/white overlay)
                card.classList.add('next-1');
                card.style.transform = `translate3d(${spacingX}px, 0, -35px) rotateY(-${rotateStep}deg) scale(${isMobile ? 0.84 : 0.88})`;
                card.style.zIndex = '20';
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.pointerEvents = 'auto';
            } else if (diff === -2) {
                // 4. Far Left Card
                card.classList.add('prev-2');
                card.style.transform = `translate3d(-${spacingX * 1.7}px, 0, -90px) rotateY(${rotateStep * 1.3}deg) scale(0.76)`;
                card.style.zIndex = '10';
                card.style.opacity = isMobile ? '0' : '1';
                card.style.visibility = isMobile ? 'hidden' : 'visible';
                card.style.pointerEvents = isMobile ? 'none' : 'auto';
            } else if (diff === 2) {
                // 5. Far Right Card
                card.classList.add('next-2');
                card.style.transform = `translate3d(${spacingX * 1.7}px, 0, -90px) rotateY(-${rotateStep * 1.3}deg) scale(0.76)`;
                card.style.zIndex = '10';
                card.style.opacity = isMobile ? '0' : '1';
                card.style.visibility = isMobile ? 'hidden' : 'visible';
                card.style.pointerEvents = isMobile ? 'none' : 'auto';
            } else {
                // Rear / Offscreen Cards
                card.classList.add('hidden-card');
                const sign = diff > 0 ? 1 : -1;
                card.style.transform = `translate3d(${sign * spacingX * 2.3}px, 0, -200px) rotateY(${-sign * 40}deg) scale(0.6)`;
                card.style.zIndex = '1';
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
                card.style.pointerEvents = 'none';
            }
        });

        // Update Dots & Counter
        renderDots();
        if (counterEl) {
            const curNum = (currentIndex + 1).toString().padStart(2, '0');
            const totalNum = total.toString().padStart(2, '0');
            counterEl.innerHTML = `<span>${curNum}</span> <span class="divider">/</span> <span>${totalNum}</span>`;
        }
    }

    // Render Pagination Dots
    function renderDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        visibleCards.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = `fleet-dot ${idx === currentIndex ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to vehicle ${idx + 1}`);
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(idx);
            });
            dotsContainer.appendChild(dot);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCoverflow();
        restartAutoplay();
    }

    function nextSlide() {
        const total = visibleCards.length;
        if (!total) return;
        currentIndex = (currentIndex + 1) % total;
        updateCoverflow();
    }

    function prevSlide() {
        const total = visibleCards.length;
        if (!total) return;
        currentIndex = (currentIndex - 1 + total) % total;
        updateCoverflow();
    }

    // Auto-Swipe Circular Animation
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
            if (!isHovered && (!coverflowViewContainer || !coverflowViewContainer.classList.contains('hidden'))) {
                nextSlide();
            }
        }, 3400);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Pause on Hover
    if (stageContainer) {
        stageContainer.addEventListener('mouseenter', () => { isHovered = true; });
        stageContainer.addEventListener('mouseleave', () => { isHovered = false; });
    }

    // Nav Buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
            restartAutoplay();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
            restartAutoplay();
        });
    }

    // Clicking flanking card navigates directly to it
    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.closest('a') || e.target.closest('button')) return;
            const idx = visibleCards.indexOf(this);
            if (idx !== -1 && idx !== currentIndex) {
                e.preventDefault();
                goToSlide(idx);
            }
        });
    });

    // Touch & Mouse Drag Gestures
    stage.addEventListener('mousedown', dragStart);
    stage.addEventListener('mousemove', dragMove);
    stage.addEventListener('mouseup', dragEnd);
    stage.addEventListener('mouseleave', dragEnd);

    stage.addEventListener('touchstart', dragStart, { passive: true });
    stage.addEventListener('touchmove', dragMove, { passive: true });
    stage.addEventListener('touchend', dragEnd);

    function dragStart(e) {
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.card-btn')) return;
        isDragging = true;
        isHovered = true;
        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        currentTranslate = 0;
    }

    function dragMove(e) {
        if (!isDragging) return;
        const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        currentTranslate = currentX - startX;
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        isHovered = false;
        if (currentTranslate < -dragThreshold) {
            nextSlide();
            restartAutoplay();
        } else if (currentTranslate > dragThreshold) {
            prevSlide();
            restartAutoplay();
        }
        currentTranslate = 0;
    }

    // Keyboard Arrow Navigation
    window.addEventListener('keydown', (e) => {
        const coverflowSection = document.getElementById('fleet-showcase-section');
        if (!coverflowSection) return;
        const rect = coverflowSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInView && coverflowViewContainer && !coverflowViewContainer.classList.contains('hidden')) {
            if (e.key === 'ArrowRight') {
                nextSlide();
                restartAutoplay();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                restartAutoplay();
            }
        }
    });

    // Category Filtering
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (currentFilter === 'all' || category === currentFilter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            if (gridViewContainer) {
                const gridCards = gridViewContainer.querySelectorAll('.fleet-grid-card');
                gridCards.forEach(gc => {
                    const cat = gc.getAttribute('data-category');
                    if (currentFilter === 'all' || cat === currentFilter) {
                        gc.style.display = 'flex';
                    } else {
                        gc.style.display = 'none';
                    }
                });
            }

            visibleCards = cards.filter(card => {
                const cat = card.getAttribute('data-category');
                return currentFilter === 'all' || cat === currentFilter;
            });

            currentIndex = 0;
            updateCoverflow();
            restartAutoplay();
        });
    });

    // View Mode Switcher
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const targetView = this.getAttribute('data-view');

            if (coverflowViewContainer) coverflowViewContainer.classList.toggle('hidden', targetView !== 'coverflow');
            if (gridViewContainer) gridViewContainer.classList.toggle('hidden', targetView !== 'grid');
            if (matrixViewContainer) matrixViewContainer.classList.toggle('hidden', targetView !== 'matrix');

            if (targetView === 'coverflow') {
                updateCoverflow();
                startAutoplay();
            } else {
                stopAutoplay();
            }
        });
    });

    // Quick Specs & Booking Modal Handler
    const modal = document.getElementById('fleet-quick-modal');
    const modalClose = document.getElementById('fleet-modal-close');

    function openVehicleModal(vehicleKey) {
        if (!modal) return;
        const data = vehicleData[vehicleKey];
        if (!data) return;

        document.getElementById('modal-veh-img').src = data.image;
        document.getElementById('modal-veh-tag').textContent = data.tag;
        document.getElementById('modal-veh-cat').textContent = data.category;
        document.getElementById('modal-veh-title').textContent = data.title;
        document.getElementById('modal-veh-seats').textContent = data.seats;
        document.getElementById('modal-veh-luggage').textContent = data.luggage;
        document.getElementById('modal-veh-ac').textContent = data.ac;
        document.getElementById('modal-veh-fuel').textContent = data.fuel;
        document.getElementById('modal-veh-desc').textContent = data.bestFor;
        document.getElementById('modal-veh-rates').textContent = data.rates;

        const incContainer = document.getElementById('modal-veh-inclusions');
        if (incContainer) {
            incContainer.innerHTML = '';
            data.inclusions.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${item}`;
                incContainer.appendChild(li);
            });
        }

        const waBtn = document.getElementById('modal-veh-wa-btn');
        if (waBtn) {
            waBtn.href = `https://wa.me/919629245533?text=${encodeURIComponent(data.waText)}`;
        }

        const bookBtn = document.getElementById('modal-veh-book-btn');
        if (bookBtn) {
            bookBtn.href = `contact.html?vehicle=${encodeURIComponent(data.category)}#enquiry`;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        stopAutoplay();
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            startAutoplay();
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                startAutoplay();
            }
        });
    }

    document.querySelectorAll('.open-spec-modal').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            const key = this.getAttribute('data-vehicle');
            openVehicleModal(key);
        });
    });

    // Resize Handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCoverflow();
        }, 150);
    });

    // Initialize & start circular auto-swipe
    updateCoverflow();
    startAutoplay();
}
