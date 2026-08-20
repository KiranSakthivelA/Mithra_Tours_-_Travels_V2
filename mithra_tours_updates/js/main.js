// System notifications
const notify = (msg, success = true) => {
    const existing = document.getElementById('mtt-alert');
    if (existing) existing.remove();

    const alert = document.createElement('div');
    alert.id = 'mtt-alert';
    alert.style.cssText = `
        position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
        background: ${success ? '#2ecc71' : '#e74c3c'}; color: white;
        padding: 1rem 2rem; border-radius: 8px; font-size: 1rem;
        font-family: 'Outfit', sans-serif; font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2); z-index: 10000;
        animation: fadeInUp 0.4s ease;
    `;
    alert.textContent = msg;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 4000);
};

// Alias used by feedback form
const showToast = (msg, success = true) => notify(msg, success);


const submitInquiry = async (data, button) => {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    button.disabled = true;

    try {
        const response = await fetch('api/submit_inquiry.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            notify('✅ Enquiry sent successfully!');
            return true;
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        console.error("Submission error:", error);
        notify('❌ Connection error. Please try calling us.', false);
        return false;
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
    }
};


// Initialization and Event Listeners

document.addEventListener('DOMContentLoaded', () => {

    // Set default travel date to today

    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    const timeStr = `${hh}:${min}`;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tyyyy = tomorrow.getFullYear();
    const tmm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const tdd = String(tomorrow.getDate()).padStart(2, '0');
    const tomorrowStr = `${tyyyy}-${tmm}-${tdd}`;

    // Auto-fill time and dates
    ['qb-time', 'mb-time'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = timeStr;
    });

    ['qb-date', 'mb-date', 'mb-end-date'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.value = todayStr;
            el.setAttribute('value', todayStr);
        }
    });

    // Navigation handling

    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const updateActiveLink = () => {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        const scrollPos = window.scrollY;

        // On index.html, use scrollspy
        if (path === 'index.html' || path === '') {
            let current = 'home';
            sections.forEach(section => {
                if (scrollPos >= (section.offsetTop - 250)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(a => {
                const href = a.getAttribute('href');
                a.classList.remove('active');
                if (href === `index.html#${current}` || href === `#${current}` || (current === 'home' && href === 'index.html')) {
                    a.classList.add('active');
                }
            });
        } else {
            // On sub-pages, highlight based on filename
            navLinks.forEach(a => {
                const href = a.getAttribute('href');
                a.classList.remove('active');
                if (href === path) {
                    a.classList.add('active');
                }
            });
        }
    };

    // --- High Performance Scroll Reveals (Intersection Observer) ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Stop watching once revealed
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- Performance-Optimized Navigation updates ---
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            window.requestAnimationFrame(() => {
                if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
                updateActiveLink();
                scrollTimeout = false;
            });
            scrollTimeout = true;
        }
    }, { passive: true });
    updateActiveLink();

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksList = document.getElementById('nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinksList.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksList && navLinksList.classList.contains('active')) {
                navLinksList.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
                }
            }
        });
    });

    // Legacy Smart Pre-selection removed: Native <a> href attributes now securely handle navigation to #home across pages.


    // --- ESTIMATE LOGIC (NOMINATIM + OSRM) ---
    const CAR_RATES = {
        'Sedan': {
            oneWay: 15,
            roundTrip: 14,
            minOneWay: 130,
            minRoundTrip: 250,
            driverAllowance: 400
        },
        'SUV': {
            oneWay: 20,
            roundTrip: 19,
            minOneWay: 130,
            minRoundTrip: 250,
            driverAllowance: 400
        },
        'MUV': {
            oneWay: 22,
            roundTrip: 21,
            minOneWay: 130,
            minRoundTrip: 250,
            driverAllowance: 400
        }
    };

    const getCoordinates = async (cityName) => {
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`);
            const data = await res.json();
            if (data && data.length > 0) {
                return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
            }
            return null;
        } catch (e) {
            console.error("Geocoding error:", e);
            return null;
        }
    };

    const getDrivingDistance = async (lat1, lon1, lat2, lon2) => {
        try {
            const url = `https://router.project-osrm.org/route/v1/driving/${lon1.toFixed(6)},${lat1.toFixed(6)};${lon2.toFixed(6)},${lat2.toFixed(6)}?overview=false`;
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                if (data && data.routes && data.routes.length > 0) {
                    return (data.routes[0].distance / 1000) * 1.05;
                }
            }
        } catch (e) {
            console.error("Routing error from OSRM:", e);
        }

        // Fallback
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c * 1.35;
    };

    // Calculate Distance and Fare
    const calculateEstimate = async (pickup, drop, carType, tripType, elements) => {
        if (!pickup || !drop || !carType) {
            elements.error.textContent = "Please fill in all details to get an estimate.";
            elements.error.style.display = 'block';
            return;
        }

        elements.btnEstimate.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculating...';
        elements.btnEstimate.disabled = true;
        elements.error.style.display = 'none';

        const pickupCoords = await getCoordinates(pickup);
        await new Promise(r => setTimeout(r, 600)); // Nominatim: 1 req/sec
        const dropCoords = await getCoordinates(drop);

        if (!pickupCoords || !dropCoords) {
            elements.btnEstimate.innerHTML = 'Get Estimate <i class="fa-solid fa-calculator"></i>';
            elements.btnEstimate.disabled = false;
            elements.error.textContent = "Could not locate one or both cities. Check spelling.";
            elements.error.style.display = 'block';
            return;
        }

        let distanceValue = await getDrivingDistance(pickupCoords.lat, pickupCoords.lon, dropCoords.lat, dropCoords.lon);

        // If it's a round trip, driving distance is technically double
        if (tripType === 'Round Trip') {
            distanceValue *= 2;
        }

        elements.btnEstimate.innerHTML = 'Get Estimate <i class="fa-solid fa-calculator"></i>';
        elements.btnEstimate.disabled = false;

        const rateProfile = CAR_RATES[carType];

        const daysGroup = document.getElementById('qb-days-group');
        let numDays = 1;
        if (daysGroup && daysGroup.style.display !== 'none') {
            const daysVal = document.getElementById('qb-days').value;
            numDays = parseInt(daysVal) || 1;
        }

        let fare = 0;
        let billableDistance = distanceValue;

        if (tripType === 'One Way') {
            billableDistance = Math.max(distanceValue, rateProfile.minOneWay);
            fare = (billableDistance * rateProfile.oneWay) + rateProfile.driverAllowance;
        } else {
            // Round Trip usually mandates min km per day
            billableDistance = Math.max(distanceValue, rateProfile.minRoundTrip * numDays);
            fare = (billableDistance * rateProfile.roundTrip) + (rateProfile.driverAllowance * numDays);
        }

        fare = Math.round(fare);

        elements.distance.textContent = Math.round(distanceValue) + ' km (' + tripType + ')';
        elements.fare.textContent = '₹' + fare.toLocaleString('en-IN');
        elements.box.style.display = 'block';

        elements.btnEstimate.style.display = 'none';
        elements.btnConfirm.style.display = 'block';
    };

    // --- Quick Quote Form (Hero Section) ---
    const quickForm = document.getElementById('quick-booking-form');
    if (quickForm) {
        const els = {
            box: document.getElementById('qb-estimate-box'),
            distance: document.getElementById('qb-distance'),
            fare: document.getElementById('qb-fare'),
            error: document.getElementById('qb-error'),
            btnEstimate: document.getElementById('qb-btn-estimate'),
            btnConfirm: document.getElementById('qb-btn-confirm')
        };

        // Cache last computed raw distance (one-way km) for instant recalc
        let qbCachedRawKm = null;

        const qbRecalcFare = () => {
            if (qbCachedRawKm === null) return;
            const car = document.getElementById('qb-car').value;
            const tripType = document.querySelector('input[name="qb-trip-type"]:checked').value;
            if (!car) return;
            const rateProfile = CAR_RATES[car];
            let distanceValue = qbCachedRawKm;
            if (tripType === 'Round Trip') distanceValue *= 2;

            const daysGroup = document.getElementById('qb-days-group');
            let numDays = 1;
            if (daysGroup && daysGroup.style.display !== 'none') {
                const daysVal = document.getElementById('qb-days').value;
                numDays = parseInt(daysVal) || 1;
            }

            let billableDistance;
            let fare;

            if (tripType === 'One Way') {
                billableDistance = Math.max(distanceValue, rateProfile.minOneWay);
                fare = (billableDistance * rateProfile.oneWay) + rateProfile.driverAllowance;
            } else {
                billableDistance = Math.max(distanceValue, rateProfile.minRoundTrip * numDays);
                fare = (billableDistance * rateProfile.roundTrip) + (rateProfile.driverAllowance * numDays);
            }

            fare = Math.round(fare);
            els.distance.textContent = Math.round(distanceValue) + ' km (' + tripType + ')';
            els.fare.textContent = '₹' + fare.toLocaleString('en-IN');
        };

        els.btnEstimate.addEventListener('click', async () => {
            const pickup = document.getElementById('qb-pickup').value.trim();
            const drop = document.getElementById('qb-drop').value.trim();
            const car = document.getElementById('qb-car').value;
            const tripType = document.querySelector('input[name="qb-trip-type"]:checked').value;

            await calculateEstimate(pickup, drop, car, tripType, els);
            // Parse the displayed km back to store as raw one-way distance
            const kmText = els.distance.textContent;
            const km = parseInt(kmText);
            if (!isNaN(km)) {
                qbCachedRawKm = tripType === 'Round Trip' ? km / 2 : km;
            }
        });

        // Reset if city/date/time inputs change (need to re-fetch route)
        ['qb-pickup', 'qb-drop', 'qb-date', 'qb-end-date', 'qb-time'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', () => {
                    qbCachedRawKm = null;
                    els.box.style.display = 'none';
                    els.btnConfirm.style.display = 'none';
                    els.btnEstimate.style.display = 'block';
                    els.error.style.display = 'none';
                });
            }
        });

        // Car type change: instantly recalc fare if we already have a distance
        document.getElementById('qb-car').addEventListener('change', () => {
            if (qbCachedRawKm !== null && els.box.style.display !== 'none') {
                qbRecalcFare();
            } else {
                els.box.style.display = 'none';
                els.btnConfirm.style.display = 'none';
                els.btnEstimate.style.display = 'block';
                els.error.style.display = 'none';
            }
        });

        // Trip type change: instantly recalc fare if we already have a distance
        document.querySelectorAll('input[name="qb-trip-type"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const isRound = e.target.value === 'Round Trip';
                const daysGroup = document.getElementById('qb-days-group');
                const endDateInput = document.getElementById('qb-end-date');
                if (daysGroup) daysGroup.style.display = isRound ? 'block' : 'none';
                if (endDateInput) {
                    endDateInput.disabled = !isRound;
                    if (!isRound) {
                        endDateInput.value = '';
                        endDateInput.type = 'text';
                    }
                }

                if (qbCachedRawKm !== null && els.box.style.display !== 'none') {
                    qbRecalcFare();
                } else {
                    els.box.style.display = 'none';
                    els.btnConfirm.style.display = 'none';
                    els.btnEstimate.style.display = 'block';
                    els.error.style.display = 'none';
                }
            });
        });

        // Days input change: instantly recalc fare
        document.getElementById('qb-days').addEventListener('input', () => {
            if (qbCachedRawKm !== null && els.box.style.display !== 'none') {
                qbRecalcFare();
            }
        });

        quickForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const tripType = document.querySelector('input[name="qb-trip-type"]:checked').value;
            let finalCar = document.getElementById('qb-car').value;
            let daysText = '';
            let dateText = `Date: ${document.getElementById('qb-date').value} ${document.getElementById('qb-time').value}`;
            
            if (tripType === 'Round Trip') {
                const days = parseInt(document.getElementById('qb-days').value) || 1;
                finalCar += ` (Round - ${days} Days)`;
                daysText = `*No of Days:* ${days}`;
                dateText = `Start: ${document.getElementById('qb-date').value}\nEnd: ${document.getElementById('qb-end-date').value}\nTime: ${document.getElementById('qb-time').value}`;
            } else {
                finalCar += ` (One Way)`;
            }

            const data = {
                name: document.getElementById('qb-name').value.trim(),
                phone: document.getElementById('qb-phone').value.trim(),
                pickup: document.getElementById('qb-pickup').value.trim(),
                drop: document.getElementById('qb-drop').value.trim(),
                car: finalCar,
                date: document.getElementById('qb-date').value + " " + document.getElementById('qb-time').value,
                endDate: tripType === 'Round Trip' ? document.getElementById('qb-end-date').value : '',
                message: `Trip: ${tripType}, Estimated distance: ${els.distance.textContent}, Fare: ${els.fare.textContent}`,
                formType: 'Quick Quote'
            };
            const success = await submitInquiry(data, els.btnConfirm);
            if (success) {
                // Formatting WhatsApp message
                const waText = encodeURIComponent(`*New Cab Booking — Mithra Tours & Travels*\n\n*Name:* ${data.name}\n*Mobile:* ${data.phone}\n\n*From:* ${data.pickup}\n*To:* ${data.drop}\n${dateText}\n${daysText ? daysText + '\n' : ''}*Trip Type:* ${tripType}\n*Vehicle:* ${data.car}\n*Distance:* ${els.distance.textContent}\n*Estimated Fare:* Rs. ${els.fare.textContent.replace('₹', '')}\n\n*Actual bill may vary based on distance, waiting time, night charges, hill charges, permits & tolls.\n\n_Please confirm availability. Thank you!_`);
                window.open(`https://wa.me/919629245533?text=${waText}`, '_blank');
                quickForm.reset();
                els.box.style.display = 'none';
                els.btnConfirm.style.display = 'none';
                els.btnEstimate.style.display = 'block';
            }
        });
    }

    // --- Main Booking Form (Contact Section) ---
    const mainForm = document.getElementById('main-booking-form');
    if (mainForm) {
        // --- Clear & Swap Logic for Main Form ---
        document.getElementById('mb-clear-pickup')?.addEventListener('click', () => {
            const inp = document.getElementById('mb-pickup');
            if (inp) { inp.value = ''; inp.focus(); }
        });
        document.getElementById('mb-clear-drop')?.addEventListener('click', () => {
            const inp = document.getElementById('mb-drop');
            if (inp) { inp.value = ''; inp.focus(); }
        });
        document.getElementById('mb-swap-btn')?.addEventListener('click', () => {
            const pkp = document.getElementById('mb-pickup');
            const drp = document.getElementById('mb-drop');
            if (pkp && drp) {
                const temp = pkp.value;
                pkp.value = drp.value;
                drp.value = temp;
            }
        });
        // ----------------------------------------
    }

    // Helper functions for feedback rendering
    const escapeHTML = (str) => {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    };

    const renderStars = (rating) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    // --- Feedback System ---
    const feedbackForm = document.getElementById('feedback-form');
    const feedbacksContainer = document.getElementById('feedbacks-container');

    const loadFeedbacks = async () => {
        if (!feedbacksContainer) return;
        feedbacksContainer.innerHTML = '<div style="text-align:center;padding:2rem;color:#94a3b8;"><i class="fa-solid fa-spinner fa-spin"></i> Loading reviews...</div>';
        try {
            const res = await fetch('api/get_feedbacks.php?t=' + Date.now()); // cache-bust
            const data = await res.json();

            if (!data || data.error || !Array.isArray(data) || data.length === 0) {
                feedbacksContainer.innerHTML = '<div style="text-align:center;padding:2rem;color:#94a3b8;">No reviews yet. Be the first to review!</div>';
                return;
            }

            feedbacksContainer.innerHTML = data.map(fb => `
                <div class="feedback-card">
                    <div class="feedback-header">
                        <div class="feedback-user"><i class="fa-solid fa-user-circle"></i> ${escapeHTML(fb.user_name)}</div>
                        <div class="feedback-rating">${renderStars(parseInt(fb.rating))}</div>
                    </div>
                    <div class="feedback-message">"${escapeHTML(fb.message)}"</div>
                    <div class="feedback-date">${new Date(fb.created_at).toLocaleDateString('en-IN', {day:'numeric',month:'short',year:'numeric'})}</div>
                </div>
            `).join('');

        } catch (e) {
            console.error('Error loading feedbacks', e);
            feedbacksContainer.innerHTML = '<div style="text-align:center;padding:2rem;color:#e74c3c;">Could not load reviews. Please refresh.</div>';
        }
    };

    if (feedbacksContainer) {
        loadFeedbacks();
    }

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('fb-btn-submit');
            const origText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
            btn.disabled = true;

            const name = document.getElementById('fb-name').value.trim();
            const rating = document.getElementById('fb-rating').value;
            const message = document.getElementById('fb-message').value.trim();

            try {
                const res = await fetch('api/submit_feedback.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, rating, message })
                });

                const contentType = res.headers.get("content-type");
                if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
                    const data = await res.json();
                    if (data.success) {
                        showToast('✅ Feedback submitted successfully!');
                        feedbackForm.reset();
                        loadFeedbacks();
                    } else {
                        throw new Error(data.error || 'Server reported failure');
                    }
                } else {
                    const text = await res.text();
                    console.error("Non-JSON response:", text);
                    throw new Error('Invalid server response');
                }
            } catch (err) {
                console.error(err);
                showToast('❌ Failed to submit feedback', false);
            } finally {
                btn.innerHTML = origText;
                btn.disabled = false;
            }
        });
    }
    // --- SWIPER CAROUSELS ---
    const GMAP_KEY = 'AIzaSyDeF5ib931_KlS1IxrmVaVhGxR3xdg5tJs';

    const citiesData = [
    {
        name: 'Chennai',
        icon: 'fa-building',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Marina_Beach_Lighthouse_Chennai.jpg/800px-Marina_Beach_Lighthouse_Chennai.jpg',
        desc: 'The cultural capital of South India, famous for Marina Beach — the world\'s second longest urban beach.',
        spots: ['Marina Beach', 'Kapaleeshwarar Temple', 'Fort St. George']
    },
    {
        name: 'Madurai',
        icon: 'fa-place-of-worship',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Meenakshi_Amman_Temple_Madurai.jpg/800px-Meenakshi_Amman_Temple_Madurai.jpg',
        desc: 'The Athens of the East — home to the magnificent Meenakshi Amman Temple, one of India\'s greatest masterpieces.',
        spots: ['Meenakshi Temple', 'Thirumalai Nayakkar', 'Gandhi Museum']
    },
    {
        name: 'Ooty',
        icon: 'fa-mountain',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Ooty_Lake.jpg/800px-Ooty_Lake.jpg',
        desc: 'The Queen of Hill Stations — lush green Nilgiri valleys, fragrant tea gardens and cool mountain air.',
        spots: ['Botanical Garden', 'Ooty Lake', 'Doddabetta Peak']
    },
    {
        name: 'Kodaikanal',
        icon: 'fa-tree',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Kodaikanal_Lake.jpg/800px-Kodaikanal_Lake.jpg',
        desc: 'The Princess of Hill Stations — a misty retreat with its iconic star-shaped lake and breathtaking views.',
        spots: ['Kodai Lake', 'Coaker\'s Walk', 'Pillar Rocks']
    },
    {
        name: 'Rameshwaram',
        icon: 'fa-om',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ramanathaswamy_temple_Rameswaram.jpg/800px-Ramanathaswamy_temple_Rameswaram.jpg',
        desc: 'A sacred island pilgrimage center at the southernmost tip — Ramanathaswamy Temple has the longest corridor in India.',
        spots: ['Ramanathaswamy', 'Dhanushkodi', 'Agni Theertham']
    },
    {
        name: 'Coimbatore',
        icon: 'fa-industry',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Marudhamalai_Temple.jpg/800px-Marudhamalai_Temple.jpg',
        desc: 'The Manchester of South India — a thriving industrial city at the foothills of the Nilgiris.',
        spots: ['Marudhamalai Temple', 'Isha Yoga Center', 'VOC Park']
    },
    {
        name: 'Kanyakumari',
        icon: 'fa-water',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Vivekananda_Rock_Memorial.jpg/800px-Vivekananda_Rock_Memorial.jpg',
        desc: 'The southernmost tip of India where three seas meet — witness stunning sunrise and sunset over the ocean.',
        spots: ['Vivekananda Rock', 'Thiruvalluvar Statue', 'Kumari Amman Temple']
    },
    {
        name: 'Tirupati',
        icon: 'fa-place-of-worship',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Sri_Venkateswara_Swami_temple_Tirupati.jpg/800px-Sri_Venkateswara_Swami_temple_Tirupati.jpg',
        desc: 'One of the holiest Hindu pilgrimage sites — the Tirumala Venkateswara Temple draws millions of devotees annually.',
        spots: ['Tirumala Temple', 'Sri Padmavathi Temple', 'ISKCON Temple']
    },
    {
        name: 'Mysuru',
        icon: 'fa-chess-rook',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Mysore_Palace_Evening.jpg/800px-Mysore_Palace_Evening.jpg',
        desc: 'The City of Palaces — Mysore Palace illuminated with 100,000 bulbs is a breathtaking spectacle.',
        spots: ['Mysore Palace', 'Chamundi Hills', 'Brindavan Gardens']
    },
    {
        name: 'Bengaluru',
        icon: 'fa-laptop-code',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Bangalore_Palace.jpg/800px-Bangalore_Palace.jpg',
        desc: 'India\'s Silicon Valley — a cosmopolitan tech hub with green parks, vibrant nightlife and historic landmarks.',
        spots: ['Bangalore Palace', 'Cubbon Park', 'Lalbagh Gardens']
    },
    {
        name: 'Hyderabad',
        icon: 'fa-gem',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Charminar_at_night.jpg/800px-Charminar_at_night.jpg',
        desc: 'City of Pearls — the iconic Charminar, Golconda Fort and legendary biryani define this royal city.',
        spots: ['Charminar', 'Golconda Fort', 'Hussain Sagar']
    },
    {
        name: 'Kochi',
        icon: 'fa-anchor',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Chinese_fishing_nets_kochi.jpg/800px-Chinese_fishing_nets_kochi.jpg',
        desc: 'The Queen of the Arabian Sea — a vibrant port city with ancient Chinese fishing nets, spice trade legacy and backwaters.',
        spots: ['Chinese Fishing Nets', 'Fort Kochi', 'Jew Town']
    },
    {
        name: 'Munnar',
        icon: 'fa-leaf',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Munnar_TeaGardens.jpg/800px-Munnar_TeaGardens.jpg',
        desc: 'Kerala\'s crown jewel — endless rolling tea estates, misty mountains and breathtaking vistas at every turn.',
        spots: ['Tea Estates', 'Eravikulam NP', 'Mattupetty Dam']
    },
    {
        name: 'Thiruvananthapuram',
        icon: 'fa-place-of-worship',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Padmanabhaswamy_temple_Thiruvananthapuram.jpg/800px-Padmanabhaswamy_temple_Thiruvananthapuram.jpg',
        desc: 'Kerala\'s capital — home to Padmanabhaswamy Temple, one of the world\'s wealthiest temples, and beautiful beaches.',
        spots: ['Padmanabhaswamy Temple', 'Kovalam Beach', 'Napier Museum']
    },
    {
        name: 'Thanjavur',
        icon: 'fa-gopuram',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg/800px-Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg',
        desc: 'The Rice Bowl of Tamil Nadu — the UNESCO-listed Brihadeeswarar Temple is a marvel of Chola architecture.',
        spots: ['Brihadeeswarar Temple', 'Thanjavur Palace', 'Art Gallery']
    },
    {
        name: 'Tiruchirappalli',
        icon: 'fa-place-of-worship',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Rock_Fort_Temple_Tiruchirappalli.jpg/800px-Rock_Fort_Temple_Tiruchirappalli.jpg',
        desc: 'Home to the majestic Rock Fort Temple perched 83 metres high — a landmark of Tamil heritage and history.',
        spots: ['Rock Fort Temple', 'Sri Ranganathaswamy', 'Jambukeswarar']
    },
    {
        name: 'Mahabalipuram',
        icon: 'fa-monument',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Shore_Temple_Mahabalipuram.jpg/800px-Shore_Temple_Mahabalipuram.jpg',
        desc: 'A UNESCO World Heritage Site — ancient rock-cut temples and the iconic Shore Temple by the Bay of Bengal.',
        spots: ['Shore Temple', 'Five Rathas', 'Arjuna\'s Penance']
    },
    {
        name: 'Kancheepuram',
        icon: 'fa-place-of-worship',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Ekambareswarar_temple_Kanchipuram.jpg/800px-Ekambareswarar_temple_Kanchipuram.jpg',
        desc: 'The City of a Thousand Temples — world-famous for Kanjivaram silk sarees and ancient Pallava-era temples.',
        spots: ['Ekambareswarar Temple', 'Kailasanathar Temple', 'Varadaraja Perumal']
    },
    {
        name: 'Alappuzha',
        icon: 'fa-ship',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Alleppey_Backwaters.jpg/800px-Alleppey_Backwaters.jpg',
        desc: 'The Venice of the East — Kerala\'s famous backwaters, houseboat cruises and enchanting canals.',
        spots: ['Backwater Cruise', 'Vembanad Lake', 'Alappuzha Beach']
    },
    {
        name: 'Kozhikode',
        icon: 'fa-ship',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Kappad_Beach_Kozhikode.jpg/800px-Kappad_Beach_Kozhikode.jpg',
        desc: 'The City of Spices — Vasco da Gama first landed here; a historic port city with rich culture and cuisine.',
        spots: ['Kappad Beach', 'Kozhikode Beach', 'Mananchira Square']
    },
    {
        name: 'Visakhapatnam',
        icon: 'fa-water',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/RK_Beach_Visakhapatnam.jpg/800px-RK_Beach_Visakhapatnam.jpg',
        desc: 'The Jewel of the East Coast — pristine beaches, submarine museum and the scenic Araku Valley nearby.',
        spots: ['RK Beach', 'INS Kursura', 'Kailasagiri']
    },
    {
        name: 'Warangal',
        icon: 'fa-chess-rook',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Warangal_Fort.jpg/800px-Warangal_Fort.jpg',
        desc: 'The ancient Kakatiya capital — stunning Warangal Fort and the intricately carved Thousand Pillar Temple.',
        spots: ['Warangal Fort', 'Thousand Pillar Temple', 'Ramappa Temple']
    },
    {
        name: 'Pondicherry',
        icon: 'fa-umbrella-beach',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pondicherry_Promenade.jpg/800px-Pondicherry_Promenade.jpg',
        desc: 'The French Riviera of the East — charming colonial streets, Auroville township and serene beaches.',
        spots: ['Promenade Beach', 'Auroville', 'Sri Aurobindo Ashram']
    },
    {
        name: 'Vellore',
        icon: 'fa-chess-rook',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Vellore_Fort.jpg/800px-Vellore_Fort.jpg',
        desc: 'Home to the magnificent 16th-century Vellore Fort with its stunning moat and the golden Sripuram temple.',
        spots: ['Vellore Fort', 'Sripuram Temple', 'CMC Hospital']
    }
];

const routesData = [
    { from: 'Chennai', to: 'Bengaluru',  dist: '360 km', desc: 'A comfortable interstate highway journey connecting Chennai to India\'s Silicon Valley.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Bangalore_Palace.jpg/800px-Bangalore_Palace.jpg' },
    { from: 'Chennai', to: 'Coimbatore', dist: '500 km', desc: 'A premium journey across Tamil Nadu connecting two of the state\'s major industrial hubs.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Marudhamalai_Temple.jpg/800px-Marudhamalai_Temple.jpg' },
    { from: 'Chennai', to: 'Ooty',       dist: '545 km', desc: 'A beautiful scenic drive through the Nilgiri mountains to the Queen of Hill Stations.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Ooty_Lake.jpg/800px-Ooty_Lake.jpg' },
    { from: 'Chennai', to: 'Kochi',      dist: '700 km', desc: 'A grand cross-state journey from Tamil Nadu to the Queen of the Arabian Sea.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Chinese_fishing_nets_kochi.jpg/800px-Chinese_fishing_nets_kochi.jpg' },
    { from: 'Coimbatore', to: 'Kodaikanal', dist: '175 km', desc: 'Through mist-covered mountains to the soul-soothing Princess of Hill Stations.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Kodaikanal_Lake.jpg/800px-Kodaikanal_Lake.jpg' },
    { from: 'Chennai', to: 'Tirupati',   dist: '140 km', desc: 'A popular pilgrimage drive to the abode of Lord Venkateswara on Tirumala Hills.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Sri_Venkateswara_Swami_temple_Tirupati.jpg/800px-Sri_Venkateswara_Swami_temple_Tirupati.jpg' },
    { from: 'Coimbatore', to: 'Munnar',  dist: '155 km', desc: 'A scenic cross-state drive through the ghats to Kerala\'s famous tea estate haven.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Munnar_TeaGardens.jpg/800px-Munnar_TeaGardens.jpg' },
    { from: 'Madurai', to: 'Rameshwaram', dist: '170 km', desc: 'A serene pilgrimage route connecting two of South India\'s most sacred cities.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ramanathaswamy_temple_Rameswaram.jpg/800px-Ramanathaswamy_temple_Rameswaram.jpg' },
    { from: 'Chennai', to: 'Pondicherry', dist: '160 km', desc: 'A breezy coastal drive along the East Coast Road to the French Riviera of India.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pondicherry_Promenade.jpg/800px-Pondicherry_Promenade.jpg' },
    { from: 'Hyderabad', to: 'Tirupati', dist: '570 km', desc: 'A classic pilgrimage route from the City of Pearls to the richest temple in the world.', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Charminar_at_night.jpg/800px-Charminar_at_night.jpg' }
];

    const renderSliders = () => {
        const cityWrapper = document.getElementById('cities-swiper-wrapper');
        const routeWrapper = document.getElementById('routes-swiper-wrapper');

        if (cityWrapper) {
            cityWrapper.innerHTML = citiesData.map(city => `
                <div class="swiper-slide" style="height:auto;">
                    <div class="city-slide-card" style="height:100%; display:flex; flex-direction:column; overflow:hidden; border-radius:16px; background:#fff; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                        <div style="position:relative; height:200px; flex-shrink:0; overflow:hidden; background:linear-gradient(135deg,#92400E,#D97706);">
                            <img src="${city.image}" alt="${city.name}" data-wiki="${city.name}" onerror="wikiImgFallback(this)" style="width:100%; height:100%; object-fit:cover; display:block; opacity:1; transition:transform 0.4s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            <div style="position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.45) 0%,transparent 55%);"></div>
                            <div style="position:absolute; bottom:12px; left:14px; color:#fff; font-weight:800; font-size:1.1rem; text-shadow:0 2px 6px rgba(0,0,0,0.7);">${city.name}</div>
                            <div style="position:absolute; top:10px; right:10px; background:rgba(217,119,6,0.9); color:#fff; font-size:0.65rem; font-weight:700; padding:4px 10px; border-radius:20px; text-transform:uppercase; letter-spacing:0.5px; backdrop-filter:blur(4px);">
                                <i class="fa-solid ${city.icon}"></i>
                            </div>
                        </div>
                        <div class="city-card-body" style="flex-grow:1; display:flex; flex-direction:column;">
                            <p style="flex-grow:1;">${city.desc}</p>
                            <div class="popular-spots-title">Popular Spots</div>
                            <div class="spots-container">
                                ${city.spots.map(spot => `<span class="spot-tag">${spot}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }


        if (routeWrapper) {
            routeWrapper.innerHTML = routesData.map(route => `
                <div class="swiper-slide" style="height:auto;">
                    <div class="route-slide-card" style="height:100%; display:flex; flex-direction:column; overflow:hidden; border-radius:16px; background:#fff; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
                        <div style="position:relative; height:190px; flex-shrink:0; overflow:hidden; background:linear-gradient(135deg,#92400E,#D97706);">
                            <img src="${route.image}" alt="${route.from} to ${route.to}" data-wiki="${route.to}" onerror="wikiImgFallback(this)" style="width:100%; height:100%; object-fit:cover; display:block; opacity:1; transition:transform 0.4s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            <div style="position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.45) 0%,transparent 55%);"></div>
                            <div style="position:absolute; bottom:12px; left:14px; color:#fff; font-weight:800; font-size:0.95rem; text-shadow:0 2px 6px rgba(0,0,0,0.7);">${route.from} <i class="fa-solid fa-arrow-right-long" style="margin:0 6px; font-size:0.8em; opacity:0.85;"></i> ${route.to}</div>
                            <div style="position:absolute; top:10px; right:10px; background:rgba(217,119,6,0.9); backdrop-filter:blur(4px); color:#fff; font-size:0.72rem; font-weight:700; padding:4px 11px; border-radius:20px; border:1px solid rgba(252,211,77,0.4);">${route.dist}</div>
                        </div>
                        <div class="route-card-body" style="flex-grow:1; display:flex; flex-direction:column; justify-content:space-between;">
                            <div class="route-title" style="display:none;"></div>
                            <a href="index.html#home" onclick="sessionStorage.setItem('prefillPickup', '${route.from}'); sessionStorage.setItem('prefillDrop', '${route.to}');" class="route-btn" data-from="${route.from}" data-to="${route.to}">Book Route</a>
                            <p class="route-desc" style="margin-top:0.5rem;">${route.desc}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    };

    renderSliders();

    setTimeout(() => {
        if(typeof Swiper !== 'undefined') {
            new Swiper('.citiesSwiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                autoplay: { delay: 3000, disableOnInteraction: false },
                navigation: { nextEl: '.citiesSwiper .swiper-button-next', prevEl: '.citiesSwiper .swiper-button-prev' },
                pagination: { el: '.citiesSwiper .swiper-pagination', clickable: true, dynamicBullets: true },
                breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
            });
            new Swiper('.routesSwiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                autoplay: { delay: 3500, disableOnInteraction: false },
                navigation: { nextEl: '.routesSwiper .swiper-button-next', prevEl: '.routesSwiper .swiper-button-prev' },
                pagination: { el: '.routesSwiper .swiper-pagination', clickable: true, dynamicBullets: true },
                breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
            });
        }
    }, 150);

function loadCityImages() { return; }

// ── Global: City card img onerror → fetch real photo from Wikipedia ──────────
window.wikiImgFallback = function(el) {
    el.onerror = null; // prevent infinite loop
    const wiki = el.getAttribute('data-wiki') || el.alt;
    if (!wiki) { el.style.display = 'none'; return; }
    fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(wiki))
        .then(function(r) { return r.json(); })
        .then(function(d) {
            if (d.thumbnail && d.thumbnail.source) {
                el.src = d.thumbnail.source;
                el.style.display = 'block';
            } else { el.style.display = 'none'; }
        })
        .catch(function() { el.style.display = 'none'; });
};




}
);
