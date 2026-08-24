/**
 * MTT Travels - Fare Estimation Modal
 * Distance: Google Maps Distance Matrix API (accurate road distances)
 * Places: Google Maps Autocomplete on pickup/drop inputs
 * On estimate: shows all 3 vehicle fares in a popup modal.
 * Each card → Confirm Booking → pre-filled WhatsApp message.
 */

'use strict';

const WEB3FORMS_ACCESS_KEY = '6a0fbdb6-4667-49f7-8bee-f1bf8eae8e96';

function dispatchWeb3FormsBooking(inquiry) {
    try {
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: `[Cab Booking Lead] ${inquiry.name || 'Customer'} - ${inquiry.car || 'Vehicle'} (${inquiry.pickup || 'Pickup'}${inquiry.drop ? ' to ' + inquiry.drop : ''})`,
                from_name: 'Mithra Tours & Travels',
                botcheck: '',
                ...inquiry
            })
        }).catch(err => console.warn('Web3Forms dispatch notice:', err));
    } catch(e) {}
}

const VEHICLES = [
    {
        id: 'Sedan',
        label: 'Sedan',
        icon: 'fa-car',
        image: 'Assets/car_sedan.png',
        desc: 'Ideal for couples & small families',
        seats: '4 Seats',
        bags: '2 Bags',
        color: '#1c1008',
        oneWayRate: 15,
        roundTripRate: 15,
        batta: 500,
        minOneWay: 130,
        minRoundTrip: 250,
        localPackages: {
            '4 Hrs / 40 Kms': 1200,
            '8 Hrs / 80 Kms': 2200,
            '12 Hrs / 120 Kms': 3200
        }
    },
    {
        id: 'SUV',
        label: 'SUV',
        icon: 'fa-truck-pickup',
        image: 'Assets/car_suv.png',
        desc: 'Spacious comfort for groups & families',
        seats: '7 Seats',
        bags: '4 Bags',
        color: '#1c1008',
        oneWayRate: 20,
        roundTripRate: 20,
        batta: 500,
        minOneWay: 130,
        minRoundTrip: 250,
        localPackages: {
            '4 Hrs / 40 Kms': 1400,
            '8 Hrs / 80 Kms': 2500,
            '12 Hrs / 120 Kms': 3600
        }
    },
    {
        id: 'MUV',
        label: 'Innova Crysta',
        icon: 'fa-shuttle-van',
        image: 'Assets/car_innova.png',
        desc: 'Premium luxury for long journeys',
        seats: '7 Seats',
        bags: '4 Bags',
        color: '#1c1008',
        oneWayRate: 22,
        roundTripRate: 22,
        batta: 600,
        minOneWay: 130,
        minRoundTrip: 250,
        localPackages: {
            '4 Hrs / 40 Kms': 1800,
            '8 Hrs / 80 Kms': 3200,
            '12 Hrs / 120 Kms': 4500
        }
    }
];

// ── Fare calculator ────────────────────────────────────────────────────
function calcFare(vehicle, rawKm, tripType, numDays, localPackage) {
    if (tripType === 'Local Trip') {
        const fare = vehicle.localPackages[localPackage];
        const kmStr = localPackage.match(/(\d+) Kms/);
        const actualKm = kmStr ? parseInt(kmStr[1]) : 80;
        return {
            fare: fare,
            billableKm: actualKm,
            actualKm: actualKm,
            rate: 0,
            batta: 0,
            totalBatta: 0,
            baseCharge: fare,
            numDays: 1,
            localPackage
        };
    }
    const isRound   = tripType === 'Round Trip';
    const rate      = isRound ? vehicle.roundTripRate : vehicle.oneWayRate;
    const km        = isRound ? 250 * numDays : rawKm;
    const minKm     = isRound ? 250 * numDays : vehicle.minOneWay;
    const billable  = Math.max(km, minKm);
    const totalBatta = vehicle.batta * numDays;
    return {
        fare:        Math.round(billable * rate + totalBatta),
        billableKm:  Math.round(billable),
        actualKm:    Math.round(km),
        rate,
        batta:       vehicle.batta,
        totalBatta,
        baseCharge:  Math.round(billable * rate),
        numDays
    };
}

// ── Build one vehicle card ─────────────────────────────────────────────
function buildVehicleCard(vehicle, rawKm, tripType, pickup, drop, date, time, numDays, localPackage) {
    const { fare, billableKm, actualKm, rate, batta, totalBatta, baseCharge } = calcFare(vehicle, rawKm, tripType, numDays, localPackage);
    const battaLabel = numDays > 1 ? `₹${batta} × ${numDays} days = ₹${totalBatta}` : `₹${totalBatta}`;
    const distLabel  = tripType === 'Local Trip' ? localPackage : (numDays > 1 ? `${billableKm} km (${numDays} days)` : `${billableKm} km`);
    const rateLabel  = tripType === 'Round Trip' ? `Extra Rate / km` : (tripType === 'Local Trip' ? `Extra Kms Rate` : `Rate / km`);

    const sPickup = (pickup||'').replace(/'/g, "\\'");
    const sDrop = (drop||'').replace(/'/g, "\\'");
    const sDate = (date||'').replace(/'/g, "\\'");
    const sTime = (time||'').replace(/'/g, "\\'");
    const sLabel = (vehicle.label||'').replace(/'/g, "\\'");
    const sTripType = (tripType||'').replace(/'/g, "\\'");
    const sBattaLabel = (battaLabel||'').replace(/'/g, "\\'");
    const sPkg = (localPackage||'').replace(/'/g, "\\'");

    const waMsg = encodeURIComponent(
        `*New Cab Booking — Mithra Tours & Travels*\n\n` +
        `*From:* ${pickup}\n` +
        `*To:* ${drop}\n` +
        `*Date:* ${date}   *Time:* ${time}\n` +
        (tripType === 'Round Trip' ? `*No of Days:* ${numDays}\n` : '') +
        `*Trip Type:* ${tripType}\n` +
        `*Vehicle:* ${vehicle.label}\n` +
        `*Distance:* ${billableKm} km\n` +
        `*Estimated Fare:* Rs. ${fare.toLocaleString('en-IN')}\n\n` +
        `*Actual bill may vary based on distance, waiting time, night charges, hill charges, permits & tolls.\n` +
        `_Please confirm availability. Thank you!_`
    );

    return `
    <div class="fm-vehicle-card" style="
        background:#fff; border-radius:18px; border:2px solid #ede8e0;
        overflow:hidden; display:flex; flex-direction:column;
        box-shadow:0 4px 16px rgba(26,10,0,0.07);
        transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);"
        onmouseover="this.style.transform='translateY(-6px)';this.style.borderColor='#92400E';this.style.boxShadow='0 18px 40px rgba(146,64,14,0.18)'"
        onmouseout="this.style.transform='';this.style.borderColor='#ede8e0';this.style.boxShadow='0 4px 16px rgba(26,10,0,0.07)'">

        <!-- Car Image Banner -->
        <div style="position:relative; height:165px; overflow:hidden; background:${vehicle.color};">
            <img src="${vehicle.image}" alt="${vehicle.label}"
                style="width:100%; height:100%; object-fit:cover; object-position:center;${vehicle.id === 'Sedan' ? ' transform:scaleX(-1);' : ''}"
                onerror="this.style.display='none'">
            <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(26,10,0,0.65) 0%, transparent 55%);"></div>
            <span style="position:absolute; top:10px; right:12px; background:linear-gradient(135deg,#92400E,#C47B0F); color:#fff;
                font-size:0.68rem; font-weight:800; padding:3px 11px; border-radius:20px;
                text-transform:uppercase; letter-spacing:1px; box-shadow:0 2px 8px rgba(0,0,0,0.25);">${vehicle.label}</span>
            <div style="position:absolute; bottom:10px; left:14px; display:flex; gap:0.6rem;">
                <span style="background:rgba(255,255,255,0.15); backdrop-filter:blur(6px); color:#fff; font-size:0.72rem; font-weight:600; padding:3px 9px; border-radius:20px; border:1px solid rgba(255,255,255,0.2);">
                    <i class="fa-solid fa-user" style="margin-right:3px;"></i>${vehicle.seats}
                </span>
                <span style="background:rgba(255,255,255,0.15); backdrop-filter:blur(6px); color:#fff; font-size:0.72rem; font-weight:600; padding:3px 9px; border-radius:20px; border:1px solid rgba(255,255,255,0.2);">
                    <i class="fa-solid fa-suitcase" style="margin-right:3px;"></i>${vehicle.bags}
                </span>
            </div>
        </div>

        <!-- Fare Info -->
        <div style="padding:1.3rem 1.4rem; flex:1; display:flex; flex-direction:column; gap:0.5rem;">
            <div style="text-align:center; margin-bottom:0.4rem;">
                <div style="font-size:2rem; font-weight:900; color:#1A0A00; letter-spacing:-1px;">
                    ₹${fare.toLocaleString('en-IN')}
                </div>
                <div style="font-size:0.78rem; color:#78523A; margin-top:3px;">${vehicle.desc}</div>
            </div>

            <hr style="border:none; border-top:1px solid #f0e8dd; margin:0.2rem 0;">

            <div style="display:flex; justify-content:space-between; font-size:0.83rem; color:#5c4033; padding:2px 0;">
                <span>${tripType === 'Local Trip' ? 'Package' : 'Distance'}</span><strong style="color:#1A0A00;">${distLabel}</strong>
            </div>
            ${tripType !== 'Local Trip' ? `
            <div style="display:flex; justify-content:space-between; font-size:0.83rem; color:#5c4033; padding:2px 0;">
                <span>${rateLabel}</span><strong style="color:#92400E;">₹${rate} / km</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.83rem; color:#5c4033; padding:2px 0;">
                <span>Base Charge</span><strong style="color:#1A0A00;">₹${baseCharge}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.83rem; color:#5c4033; padding:2px 0;">
                <span>Driver Allowance</span><strong style="color:#1A0A00;">${battaLabel}</strong>
            </div>
            ` : ''}

            <div style="display:flex; gap:1rem; margin-top:0.2rem; font-size:0.77rem; color:#a08060;">
                <span><i class="fa-solid fa-user" style="color:#92400E; margin-right:3px;"></i>${vehicle.seats}</span>
                <span><i class="fa-solid fa-suitcase" style="color:#92400E; margin-right:3px;"></i>${vehicle.bags}</span>
            </div>
        </div>

        <!-- Disclaimer -->
        <div style="margin:0 1.4rem 0.8rem; background:#fdf6ee; border-left:3px solid #C47B0F; border-radius:6px; padding:0.6rem 0.8rem;">
            <p style="font-size:0.72rem; color:#78523A; margin:0; line-height:1.45;">
                * Actual bill may vary based on distance, waiting time, night charges, hill charges, permits &amp; tolls.
            </p>
        </div>

        <!-- Confirm Booking Button -->
        <div style="padding:0 1.4rem 1.4rem;">
            <button
               onclick="openBookingForm('${sLabel}','${sPickup}','${sDrop}','${sDate}','${sTime}','${sTripType}',${fare},${billableKm},'${sBattaLabel}', ${parseInt(vehicle.seats)}, ${parseInt(vehicle.bags)}, ${numDays}, '${sPkg}')"
               style="width:100%; display:flex; align-items:center; justify-content:center; gap:0.5rem;
                      background:linear-gradient(135deg,#78320A,#C47B0F); color:#fff;
                      font-weight:800; font-size:0.92rem; padding:0.85rem;
                      border-radius:50px; border:none; cursor:pointer; transition:all 0.25s ease;
                      box-shadow:0 4px 14px rgba(146,64,14,0.3);"
               onmouseover="this.style.transform='scale(1.02)';this.style.boxShadow='0 8px 24px rgba(146,64,14,0.45)'"
               onmouseout="this.style.transform='';this.style.boxShadow='0 4px 14px rgba(146,64,14,0.3)'">
                <i class="fa-solid fa-check-circle"></i>
                Confirm Booking
            </button>
        </div>
    </div>`;
}

// ── Booking Confirmation Form ─────────────────────────────────────────
window.openBookingForm = function(vehicleLabel, pickup, drop, date, time, tripType, fare, km, batta, maxPax, maxBags, numDaysArg, localPackageArg) {
    const modal = document.getElementById('fare-modal');
    const body  = modal.querySelector('.fm-modal-body');
    if (!body) return;

    const sPickup = (pickup||'').replace(/'/g, "\\'");
    const sDrop = (drop||'').replace(/'/g, "\\'");
    const sDate = (date||'').replace(/'/g, "\\'");
    const sTime = (time||'').replace(/'/g, "\\'");
    const sLabel = (vehicleLabel||'').replace(/'/g, "\\'");
    const sTripType = (tripType||'').replace(/'/g, "\\'");
    const sBattaLabel = (batta||'').replace(/'/g, "\\'");
    const sPkg = (localPackageArg||'').replace(/'/g, "\\'");

    const prefillName = document.getElementById('qb-name')?.value || document.getElementById('mb-name')?.value || '';
    const prefillPhone = document.getElementById('qb-phone')?.value || document.getElementById('mb-phone')?.value || '';
    const prefillAdults = document.getElementById('mb-adults')?.value || '1';
    const prefillChildren = document.getElementById('mb-children')?.value || '0';
    const prefillLuggage = document.getElementById('mb-luggage')?.value || '1';

    body.innerHTML = `
    <div style="max-width:540px; margin:0 auto; padding:2rem 1.5rem;">

        <!-- Back button -->
        <button onclick="window.closeFareModal()" style="background:none; border:none; color:#64748b; font-size:0.88rem; cursor:pointer; margin-bottom:1.5rem; display:flex; align-items:center; gap:0.4rem;">
            <i class="fa-solid fa-arrow-left"></i> Back to estimates
        </button>

        <!-- Header -->
        <div style="text-align:center; margin-bottom:2rem;">
            <div style="width:56px; height:56px; background:linear-gradient(135deg,#D97706,#F59E0B); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1rem;">
                <i class="fa-solid fa-car" style="color:#fff; font-size:1.4rem;"></i>
            </div>
            <h2 style="font-size:1.5rem; font-weight:900; color:#1A0A00; margin:0 0 0.3rem;">Confirm Your Booking</h2>
            <p style="color:#64748b; font-size:0.9rem; margin:0;">Selected vehicle: <strong>${vehicleLabel}</strong> &nbsp;|&nbsp; Fare: <strong style="color:#D97706;">₹${fare.toLocaleString('en-IN')}</strong></p>
        </div>

        <!-- Journey Summary -->
        <div style="background:#FEF9C3; border-radius:14px; padding:1rem 1.2rem; margin-bottom:1.5rem; border:1px solid #FDE68A; font-size:0.88rem; color:#92400E;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.35rem;">
                <span>📍 From</span><strong>${pickup}</strong>
            </div>
            ${tripType !== 'Local Trip' ? `
            <div style="display:flex; justify-content:space-between; margin-bottom:0.35rem;">
                <span>🏁 To</span><strong>${drop}</strong>
            </div>
            ` : ''}
            <div style="display:flex; justify-content:space-between; margin-bottom:0.35rem;">
                <span>📅 Date & Time</span><strong>${date} at ${time}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
                <span>🔄 Trip Type</span><strong>${tripType}</strong>
            </div>
        </div>

        <!-- Booking Form -->
        <div style="display:flex; flex-direction:column; gap:1rem;">

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
                <div>
                    <label style="display:block; font-size:0.78rem; font-weight:700; color:#475569; text-transform:uppercase; margin-bottom:0.4rem;">Full Name *</label>
                    <input id="bk-name" type="text" placeholder="Your full name" required value="${prefillName}"
                        style="width:100%; padding:0.75rem 1rem; border:1.5px solid #e2e8f0; border-radius:10px; font-size:0.9rem; outline:none; font-family:inherit; box-sizing:border-box;"
                        onfocus="this.style.borderColor='#0077B6'" onblur="this.style.borderColor='#e2e8f0'">
                </div>
                <div>
                    <label style="display:block; font-size:0.78rem; font-weight:700; color:#475569; text-transform:uppercase; margin-bottom:0.4rem;">Mobile Number *</label>
                    <input id="bk-phone" type="tel" placeholder="10-digit number" required value="${prefillPhone}"
                        style="width:100%; padding:0.75rem 1rem; border:1.5px solid #e2e8f0; border-radius:10px; font-size:0.9rem; outline:none; font-family:inherit; box-sizing:border-box;"
                        onfocus="this.style.borderColor='#0077B6'" onblur="this.style.borderColor='#e2e8f0'">
                </div>
            </div>

            <div class="bk-pax-grid">
                <div class="bk-pax-item">
                    <label class="bk-label">Adults</label>
                    <select id="bk-adults" class="bk-select"></select>
                </div>
                <div class="bk-pax-item">
                    <label class="bk-label">Children</label>
                    <select id="bk-children" class="bk-select"></select>
                </div>
                <div class="bk-pax-item">
                    <label class="bk-label">Luggage</label>
                    <select id="bk-luggage" class="bk-select"></select>
                </div>
            </div>

            <div>
                <label style="display:block; font-size:0.78rem; font-weight:700; color:#475569; text-transform:uppercase; margin-bottom:0.4rem;">Special Requirements (Optional)</label>
                <textarea id="bk-notes" placeholder="E.g., baby seat, early morning pickup, AC preference..."
                    style="width:100%; padding:0.75rem 1rem; border:1.5px solid #e2e8f0; border-radius:10px; font-size:0.9rem; outline:none; font-family:inherit; resize:none; height:80px; box-sizing:border-box;"
                    onfocus="this.style.borderColor='#0077B6'" onblur="this.style.borderColor='#e2e8f0'"></textarea>
            </div>
            <div style="background:#FFF3CD; border-left:3px solid #F59E0B; border-radius:6px; padding:0.6rem 0.8rem;">
                <p style="font-size:0.73rem; color:#92400E; margin:0; line-height:1.45;">
                    * Actual bill may vary based on distance, waiting time, night charges, hill charges, permits & tolls.
                </p>
            </div>

            <!-- WhatsApp Send Button -->
            <button
                onclick="sendWhatsAppBooking('${sLabel}','${sPickup}','${sDrop}','${sDate}','${sTime}','${sTripType}',${fare},${km},'${sBattaLabel}',${numDaysArg || 1}, '${sPkg}')"
                style="width:100%; display:flex; align-items:center; justify-content:center; gap:0.6rem;
                       background:linear-gradient(135deg,#25D366,#128C7E); color:#fff;
                       font-weight:800; font-size:1rem; padding:1rem;
                       border-radius:50px; border:none; cursor:pointer;
                       transition:all 0.25s ease; margin-top:0.5rem;"
                onmouseover="this.style.transform='scale(1.02)';this.style.boxShadow='0 8px 28px rgba(37,211,102,0.45)'"
                onmouseout="this.style.transform='';this.style.boxShadow=''">
                <i class="fa-brands fa-whatsapp" style="font-size:1.3rem;"></i>
                Send via WhatsApp
            </button>
        </div>
    </div>`;

    // ── Dynamic Options Initialization ──────────────────────────────
    const adultSel = document.getElementById('bk-adults');
    const childSel = document.getElementById('bk-children');
    const luggSel  = document.getElementById('bk-luggage');

    function updateOptions() {
        const currentAdults = parseInt(adultSel.value) || 1;
        const currentChildren = parseInt(childSel.value) || 0;

        // Update Adults (always 1 min)
        const prevA = adultSel.value;
        adultSel.innerHTML = '';
        for(let i=1; i <= maxPax; i++){
            const opt = document.createElement('option');
            opt.value = i; opt.textContent = i;
            if(i === parseInt(prevA)) opt.selected = true;
            // Disable if it exceeds max total pax given current children
            if(i + currentChildren > maxPax) opt.disabled = true;
            adultSel.appendChild(opt);
        }

        // Update Children
        const prevC = childSel.value;
        childSel.innerHTML = '';
        const limitC = maxPax - currentAdults;
        for(let i=0; i <= limitC; i++){
            const opt = document.createElement('option');
            opt.value = i; opt.textContent = i;
            if(i === parseInt(prevC)) opt.selected = true;
            childSel.appendChild(opt);
        }
    }

    // Initial fill for adults
    for(let i=1; i <= maxPax; i++){
        const opt = document.createElement('option');
        opt.value = i; opt.textContent = i;
        adultSel.appendChild(opt);
    }
    // Initial fill for children
    for(let i=0; i <= maxPax-1; i++){
        const opt = document.createElement('option');
        opt.value = i; opt.textContent = i;
        childSel.appendChild(opt);
    }
    // Initial fill for luggage
    for(let i=1; i <= maxBags; i++){
        const opt = document.createElement('option');
        opt.value = i; opt.textContent = i;
        luggSel.appendChild(opt);
    }
    // Add extra bag option if applicable
    const extraOpt = document.createElement('option');
    extraOpt.value = maxBags + "+"; extraOpt.textContent = maxBags + "+ Bags";
    luggSel.appendChild(extraOpt);

    adultSel.addEventListener('change', updateOptions);
    childSel.addEventListener('change', updateOptions);

    // Initial pre-fill from main form if available
    if(prefillAdults) adultSel.value = prefillAdults;
    if(prefillChildren) childSel.value = prefillChildren;
    if(prefillLuggage) luggSel.value = prefillLuggage;

    updateOptions();
};


// ── Main Home Form Dynamic Options ─────────────────────────────
function initMainPagePaxLimits() {
    const carSel   = document.getElementById('mb-car');
    const adultSel = document.getElementById('mb-adults');
    const childSel = document.getElementById('mb-children');
    const luggSel  = document.getElementById('mb-luggage');
    if(!carSel || !adultSel) return;

    function refreshMainPax() {
        const selCar = carSel.value;
        const v = VEHICLES.find(x => x.id === selCar || x.label === selCar);
        const maxP = v ? parseInt(v.seats) : 4;
        const maxB = v ? parseInt(v.bags) : 2;

        const curA = parseInt(adultSel.value) || 1;
        const curC = parseInt(childSel.value) || 0;

        // Adults
        const prevA = adultSel.value;
        adultSel.innerHTML = '';
        for(let i=1; i <= maxP; i++) {
            const opt = document.createElement('option');
            opt.value = i; opt.textContent = i;
            if(i === parseInt(prevA)) opt.selected = true;
            if(i + curC > maxP) opt.disabled = true;
            adultSel.appendChild(opt);
        }

        // Children
        const prevC = childSel.value;
        childSel.innerHTML = '';
        for(let i=0; i <= (maxP - curA); i++) {
            const opt = document.createElement('option');
            opt.value = i; opt.textContent = i;
            if(i === parseInt(prevC)) opt.selected = true;
            childSel.appendChild(opt);
        }

        // Luggage
        const prevL = luggSel.value;
        luggSel.innerHTML = '';
        for(let i=1; i <= maxB; i++) {
            luggSel.innerHTML += `<option value="${i}" ${prevL == i ? 'selected' : ''}>${i}</option>`;
        }
        luggSel.innerHTML += `<option value="${maxB}+" ${prevL == (maxB+"+") ? 'selected' : ''}>${maxB}+ Bags</option>`;
    }

    carSel.addEventListener('change', refreshMainPax);
    adultSel.addEventListener('change', refreshMainPax);
    childSel.addEventListener('change', refreshMainPax);
    refreshMainPax();
}

// ── WhatsApp Message Builder ──────────────────────────────────────────
window.sendWhatsAppBooking = function(vehicleLabel, pickup, drop, date, time, tripType, fare, km, batta, numDaysParam, localPackage) {
    const name     = document.getElementById('bk-name')?.value.trim()    || '';
    const phone    = document.getElementById('bk-phone')?.value.trim()   || '';
    const adults   = document.getElementById('bk-adults')?.value         || '1';
    const children = document.getElementById('bk-children')?.value       || '0';
    const luggage  = document.getElementById('bk-luggage')?.value        || '1';
    const notes    = document.getElementById('bk-notes')?.value.trim()   || '';
    let numDays = 1;
    if (tripType === 'Round Trip') {
        if (numDaysParam) {
            numDays = numDaysParam;
        } else {
            const qb = parseInt(document.getElementById('qb-days')?.value);
            const mb = parseInt(document.getElementById('mb-days')?.value);
            numDays = (!isNaN(mb) ? mb : (!isNaN(qb) ? qb : 1));
        }
    }


    if (!name || !phone) {
        alert('Please fill in your Name and Mobile Number.');
        return;
    }

    // Helper to format time into 12-hour style
    const format12H = (tStr) => {
        if (!tStr) return '';
        try {
            const [h, m] = tStr.split(':');
            let hr = parseInt(h);
            const ampm = hr >= 12 ? 'PM' : 'AM';
            hr = hr % 12 || 12;
            return `${hr}:${m} ${ampm}`;
        } catch(e) {
            return tStr;
        }
    };
    const time12 = format12H(time);
    
    const tripDetails = tripType === 'Round Trip' ? `*No of Days:* ${numDays}\n` : (tripType === 'Local Trip' ? `*Package:* ${localPackage || 'N/A'}\n` : '');

    // Using plain text only to guarantee 100% readability across all devices/browsers
    const msg = encodeURIComponent(
        `*New Cab Booking — Mithra Tours & Travels*\n\n` +
        `*Name:* ${name}\n` +
        `*Mobile:* ${phone}\n\n` +
        `*From:* ${pickup}\n` +
        (tripType !== 'Local Trip' ? `*To:* ${drop}\n` : '') +
        `*Date:* ${date}   *Time:* ${time12}\n` +
        tripDetails +
        `*Trip Type:* ${tripType}\n` +
        `*Vehicle:* ${vehicleLabel}\n` +
        `*Distance:* ${km} km\n` +
        `*Estimated Fare:* Rs. ${fare.toLocaleString('en-IN')}\n\n` +
        `*Adults:* ${adults}  |  *Children:* ${children}  |  *Luggage:* ${luggage}\n` +
        (notes ? `*Notes:* ${notes}\n` : '') +
        `\n*Actual bill may vary based on distance, waiting time, night charges, hill charges, permits & tolls.\n` +
        `\n_Please confirm availability. Thank you!_`
    );

    // Save to database & spreadsheet automatically
    const inquiryPayload = {
        name: name,
        phone: phone,
        pickup: pickup,
        drop: drop,
        car: vehicleLabel,
        date: date,
        message: `Pax: ${adults}A, ${children}C | Luggage: ${luggage} | Trip: ${tripType} | ${notes}`,
        estimated_fare: fare,
        distance_km: km
    };
    fetch('api/submit_inquiry.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryPayload)
    }).catch(err => console.error("Sync error:", err));
    dispatchWeb3FormsBooking(inquiryPayload);

    window.open(`https://wa.me/919629245533?text=${msg}`, '_blank');

    // Reset both forms
    ['qb-name','qb-phone','qb-pickup','qb-drop','mb-name','mb-phone','mb-pickup','mb-drop','bk-name','bk-phone'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    // Reset car defaults
    const qbCar = document.getElementById('qb-car'); if(qbCar) qbCar.value = 'Sedan';
    const mbCar = document.getElementById('mb-car'); if(mbCar) mbCar.value = 'Sedan';

    // Show success state in modal before closing
    const modalBody = document.querySelector('.fm-modal-body');
    if (modalBody) {
        modalBody.innerHTML = `
            <div style="text-align:center; padding:3rem 2rem; animation:fadeUp 0.4s ease;">
                <div style="width:80px; height:80px; background:#25D366; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem; box-shadow:0 10px 30px rgba(37,211,102,0.3);">
                    <i class="fa-solid fa-check" style="color:#fff; font-size:2.5rem;"></i>
                </div>
                <h2 style="color:#1A0A00; font-size:1.8rem; font-weight:900; margin-bottom:1rem;">Booking Successful!</h2>
                <p style="color:#64748b; font-size:1.1rem; line-height:1.6; margin-bottom:2rem;">Thank you, <strong>${name}</strong>. We have successfully received your inquiry on our dashboard. Our team will contact you shortly to confirm availability.</p>
                <button onclick="window.closeFareModal(); window.scrollTo({top:0, behavior:'smooth'});" class="btn-primary" style="padding:1rem 2rem; font-size:1rem; border-radius:12px;">Back to Home</button>
            </div>
        `;
    }

    // Auto-close and return home after a short delay if they don't click anything
    setTimeout(() => {
        window.closeFareModal();
        window.scrollTo({top:0, behavior:'smooth'});
    }, 8000);
};

// ── Get distance via Google Maps API (Modern Routes API) ────────────────────────
function getGoogleDistance(origin, destination) {
    return new Promise((resolve, reject) => {
        const API_KEY = 'AIzaSyDeF5ib931_KlS1IxrmVaVhGxR3xdg5tJs';
        
        fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': API_KEY,
                'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters'
            },
            body: JSON.stringify({
                origin: { address: origin },
                destination: { address: destination },
                travelMode: 'DRIVE'
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                reject(new Error(data.error.message || 'Google Maps API Error'));
            } else if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                const meters = route.distanceMeters;
                const durationSeconds = parseInt(route.duration.replace('s', ''));
                
                const km = meters / 1000;
                const hh = Math.floor(durationSeconds / 3600);
                const mm = Math.round((durationSeconds % 3600) / 60);
                
                resolve({
                    km: km,
                    text: Math.round(km) + ' km',
                    duration: hh > 0 ? `${hh} hours ${mm} mins` : `${mm} mins`
                });
            } else {
                reject(new Error('Google Maps could not find a route between these locations.'));
            }
        })
        .catch(err => {
            reject(new Error('Network error connecting to Google Maps API.'));
        });
    });
}

// ── Init Google Places Autocomplete ────────────────────────────────────
let _mttAutocompleteDone = false;
function initAutocomplete() {
    if (_mttAutocompleteDone) return; // guard: only run once
    _mttAutocompleteDone = true;

    const options = {
        componentRestrictions: { country: 'in' },
        fields: ['formatted_address', 'geometry', 'name'],
        types: ['geocode', 'establishment']
    };

    // ── Hero quick-estimate form (qb-pickup / qb-drop) ──
    const pickupInput = document.getElementById('qb-pickup');
    const dropInput   = document.getElementById('qb-drop');
    if (pickupInput && dropInput) {
        pickupInput.setAttribute('autocomplete', 'new-password');
        dropInput.setAttribute('autocomplete', 'new-password');
        new google.maps.places.Autocomplete(pickupInput, options);
        new google.maps.places.Autocomplete(dropInput, options);
    }

    // ── "Plan Your Journey" contact form (mb-pickup / mb-drop) ──
    const mbPickup = document.getElementById('mb-pickup');
    const mbDrop   = document.getElementById('mb-drop');
    if (mbPickup && mbDrop) {
        mbPickup.setAttribute('autocomplete', 'new-password');
        mbDrop.setAttribute('autocomplete', 'new-password');
        new google.maps.places.Autocomplete(mbPickup, options);
        new google.maps.places.Autocomplete(mbDrop, options);
    }

    // ── Local Package form (lp-pickup) ──
    const lpPickup = document.getElementById('lp-pickup');
    if (lpPickup) {
        lpPickup.setAttribute('autocomplete', 'new-password');
        new google.maps.places.Autocomplete(lpPickup, options);
    }
    const GMAP_KEY = 'AIzaSyDeF5ib931_KlS1IxrmVaVhGxR3xdg5tJs';
    const gmap = (loc, zoom=13, type='satellite') =>
        `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(loc)}&zoom=${zoom}&size=500x280&maptype=${type}&key=${GMAP_KEY}`;

    const citiesData = [
           { name: "Coimbatore",     icon: "fa-city",          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Coimbatore_city_skyline.jpg/500px-Coimbatore_city_skyline.jpg",     spots: ["Marudhamalai","Isha Yoga","Vydehi Falls"] },
           { name: "Ooty",           icon: "fa-mountain",      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Ooty_Town_from_Dodabetta_peak.jpg/500px-Ooty_Town_from_Dodabetta_peak.jpg",     spots: ["Botanical Garden","Ooty Lake","Doddabetta"] },
           { name: "Rameshwaram",    icon: "fa-gopuram",       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Pamban_Bridge_view_from_Boat.jpg/500px-Pamban_Bridge_view_from_Boat.jpg",spots: ["Ramanathaswamy","Dhanushkodi","Agni Theertham"] },
           { name: "Kodaikanal",     icon: "fa-tree",          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Kodaikanal_Lake_view.jpg/500px-Kodaikanal_Lake_view.jpg",    spots: ["Kodai Lake","Coker's Walk","Pillar Rocks"] },
           { name: "Madurai",        icon: "fa-om",            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Meenakshi_Amman_West_Tower.jpg/500px-Meenakshi_Amman_West_Tower.jpg",   spots: ["Meenakshi Temple","Thirumalai Nayak","Gandhi Museum"] },
           { name: "Alleppey",       icon: "fa-ship",          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Alappuzha_Houseboat.jpg/500px-Alappuzha_Houseboat.jpg",    spots: ["Alappuzha Beach","Backwaters","Marari Beach"] },
           { name: "Varkala",        icon: "fa-umbrella-beach",image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Varkala_beach.jpg/500px-Varkala_beach.jpg",    spots: ["Varkala Cliff","Janardhana Temple","Kappil Lake"] },
           { name: "Kochi",          icon: "fa-anchor",        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Chinese_fishing_nets_at_Kochi.jpg/500px-Chinese_fishing_nets_at_Kochi.jpg",                spots: ["Fort Kochi","Marine Drive","Jewish Synagogue"] },
           { name: "Munnar",         icon: "fa-leaf",          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Munnar_hillstation_kerala.jpg/500px-Munnar_hillstation_kerala.jpg",     spots: ["Eravikulam","Periyar Lake","Tea Museum"] },
           { name: "Wayanad",        icon: "fa-water",         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Banasura_sagar_dam_Wayanad.jpg/500px-Banasura_sagar_dam_Wayanad.jpg",    spots: ["Banasura Sagar","Edakkal Caves","Soochipara Falls"] },
           { name: "Calicut",        icon: "fa-utensils",      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Kozhikode_Beach_sunset.jpg/500px-Kozhikode_Beach_sunset.jpg",  spots: ["Kozhikode Beach","Beypore Port","Kappad Beach"] },
           { name: "Vagamon",        icon: "fa-cloud-sun",     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Vagamon_pine_forest.jpg/500px-Vagamon_pine_forest.jpg",        spots: ["Pine Forests","Marmala Waterfalls","Meadows"] },
           { name: "Tirupati",       icon: "fa-hands-praying", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Tirumala_Venkateswara_Temple.jpg/500px-Tirumala_Venkateswara_Temple.jpg", spots: ["Tirumala Temple","Silathoranam","Talakona Falls"] },
           { name: "Tirumala",       icon: "fa-sun",           image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Tirumala_Venkateswara_Temple.jpg/500px-Tirumala_Venkateswara_Temple.jpg",  spots: ["Venkateswara Temple","Akasa Ganga","Srivari Padalu"] },
           { name: "Kalahasti",      icon: "fa-dharmachakra",  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Srikalahasti_temple_gopuram.jpg/500px-Srikalahasti_temple_gopuram.jpg", spots: ["Vayu Lingam","Pathala Vinayaka","Bharadwaja"] },
           { name: "Coorg",          icon: "fa-coffee",        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Madikeri_from_Raja%27s_Seat.jpg/500px-Madikeri_from_Raja%27s_Seat.jpg", spots: ["Abbey Falls","Raja's Seat","Talakaveri"] },
           { name: "Mysore",         icon: "fa-fort-awesome",  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Mysore_Palace_Morning.jpg/500px-Mysore_Palace_Morning.jpg",          spots: ["Mysore Palace","Chamundi Hill","Brindavan Gardens"] },
           { name: "Bangalore",      icon: "fa-laptop-code",   image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Vidhana_Soudha%2C_Bangalore.jpg/500px-Vidhana_Soudha%2C_Bangalore.jpg", spots: ["Lalbagh","Cubbon Park","Bangalore Palace"] }
    ];

    const routesData = [
           { from: "Chennai", to: "Bangalore",  dist: "360 km", price: "By Quote",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Vidhana_Soudha%2C_Bangalore.jpg/500px-Vidhana_Soudha%2C_Bangalore.jpg",
          desc: "A comfortable interstate journey connecting the textile city to the IT capital." },
           { from: "Chennai", to: "Coimbatore",    dist: "500 km", price: "By Quote",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Coimbatore_city_skyline.jpg/500px-Coimbatore_city_skyline.jpg",
          desc: "A premium journey across Tamil Nadu connecting two major industrial hubs." },
           { from: "Chennai", to: "Ooty",       dist: "90 km",  price: "By Quote",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Ooty_Town_from_Dodabetta_peak.jpg/500px-Ooty_Town_from_Dodabetta_peak.jpg",
          desc: "A beautiful uphill scenic drive through the Nilgiri mountains." },
           { from: "Chennai", to: "Kochi",      dist: "190 km", price: "By Quote",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Chinese_fishing_nets_at_Kochi.jpg/500px-Chinese_fishing_nets_at_Kochi.jpg",
          desc: "A pleasant cross-state journey from Tamil Nadu to the backwaters of Kerala." },
           { from: "Coimbatore", to: "Kodaikanal", dist: "175 km", price: "By Quote",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Kodaikanal_Lake_view.jpg/500px-Kodaikanal_Lake_view.jpg",
          desc: "Through mist-covered mountains to the soul-soothing 'Princess of Hill Stations'." }
    ];



    // ── CRITICAL FIX: Move .pac-container to <body> ──────────────────
    // The hero form has backdrop-filter:blur() which creates a new CSS
    // stacking context, trapping fixed-position children inside it.
    // Google Places .pac-container uses position:fixed and gets clipped.
    // Solution: Watch for pac-container and reparent it to document.body.
    const pacObserver = new MutationObserver(() => {
        document.querySelectorAll('.pac-container').forEach(pac => {
            if (pac.parentElement !== document.body) {
                document.body.appendChild(pac);
            }
        });
    });
    pacObserver.observe(document.body, { childList: true, subtree: true });
}

// ── Main: handle Get Estimate ─────────────────────────────────────────
async function handleQuickEstimate() {
    const name     = (document.getElementById('qb-name')?.value || '').trim();
    const phone    = (document.getElementById('qb-phone')?.value || '').trim();
    const pickup   = (document.getElementById('qb-pickup')?.value || '').trim();
    const drop     = (document.getElementById('qb-drop')?.value   || '').trim();
    const date     = document.getElementById('qb-date')?.value   || '';
    const time     = document.getElementById('qb-time')?.value   || '';
    const tripType = document.querySelector('input[name="qb-trip-type"]:checked')?.value || 'One Way';
    const numDays  = tripType === 'Round Trip' ? (parseInt(document.getElementById('qb-days')?.value) || 1) : 1;
    const errorEl  = document.getElementById('qb-error');
    const btn      = document.getElementById('qb-btn-estimate');

    // Validate
    if (!name || !phone) {
        showError(errorEl, 'Please enter your Full Name and Mobile Number.');
        return;
    }
    const isLocal = tripType === 'Pick Up/Drop';
    if (!pickup || !drop) {
        showError(errorEl, 'Please enter both Pick Up and Drop locations.');
        return;
    }
    const basePickup = pickup.split(',')[0].trim().toLowerCase();
    const baseDrop   = drop ? drop.split(',')[0].trim().toLowerCase() : '';
    if (!isLocal && basePickup === baseDrop && basePickup !== '') {
        showError(errorEl, 'Pick Up and Drop locations cannot be the same city.');
        return;
    }
    // 

    // Direct submit for Local Trip
    if (tripType === 'Local Trip') {
        const localPackage = document.getElementById('qb-local-package')?.value || '8 Hrs / 80 Kms';
        const msg = encodeURIComponent(
            '*New Local Trip Booking!*\n\n' +
            '*Name:* ' + name + '\n' +
            '*Mobile:* ' + phone + '\n' +
            '*City:* ' + pickup + '\n' +
            '*Date:* ' + date + '   *Time:* ' + time12 + '\n' +
            '*Package:* ' + localPackage + '\n' +
            '\n_Please confirm availability._'
        );

        const localInquiry = {
            name: name,
            phone: phone,
            pickup: pickup,
            drop: '',
            car: 'Any (Local Package)',
            date: date,
            message: 'Local Trip | Package: ' + localPackage
        };
        fetch('api/submit_inquiry.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(localInquiry)
        }).catch(e => console.error(e));
        dispatchWeb3FormsBooking(localInquiry);

        window.open('https://wa.me/919629245533?text=' + msg, '_blank');
        ['qb-name','qb-phone','qb-pickup','qb-drop'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
        return;
    }
    // Direct submit for Pick Up/Drop
    if (tripType === 'Pick Up/Drop') {
        const carType = document.getElementById('qb-car')?.value || 'Any';
        const msg = encodeURIComponent(
            '*New Pick Up/Drop Booking!*\n\n' +
            '*Name:* ' + name + '\n' +
            '*Mobile:* ' + phone + '\n' +
            '*Pick Up:* ' + pickup + '\n' +
            '*Drop:* ' + drop + '\n' +
            '*Date:* ' + date + '   *Time:* ' + time + '\n' +
            '*Vehicle Preference:* ' + carType + '\n' +
            '\n_Please confirm availability._'
        );

        const pndInquiry = {
            name: name,
            phone: phone,
            pickup: pickup,
            drop: drop,
            car: carType,
            date: date,
            message: 'Pick Up/Drop'
        };
        fetch('api/submit_inquiry.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pndInquiry)
        }).catch(e => console.error(e));
        dispatchWeb3FormsBooking(pndInquiry);

        window.open('https://wa.me/919629245533?text=' + msg, '_blank');
        ['qb-name','qb-phone','qb-pickup','qb-drop'].forEach(id => {
            let el = document.getElementById(id);
            if(el) el.value = '';
        });
        return;
    }
    if (!date || !time)    {
        showError(errorEl, 'Please select a travel date and time.');
        return;
    }
    hideError(errorEl);

    // Loading
    const origHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculating...';
    btn.disabled = true;

    try {
        // ── Restore original modal body (in case user previously confirmed a booking) ──
        const modalBody = document.querySelector('#fare-modal .fm-modal-body');
        if (modalBody && _originalModalBodyHTML) {
            modalBody.innerHTML = _originalModalBodyHTML;
        }

        // ── Round Trip: Fixed 250km/day — no Google Maps needed ──
        let km, text, duration, localPackage;
        if (tripType === 'Round Trip') {
            km       = 250 * numDays;
            text     = `${km} km`;
            duration = `${numDays} day${numDays > 1 ? 's' : ''}`;
        } else if (tripType === 'Local Trip') {
            localPackage = document.getElementById('qb-local-package')?.value || '8 Hrs / 80 Kms';
            const kmMatch = localPackage.match(/(\d+) Kms/);
            km       = kmMatch ? parseInt(kmMatch[1]) : 80;
            text     = localPackage;
            duration = localPackage.split(' / ')[0];
        } else {
            // ── One Way: real road distance from Google Maps ──
            const result = await getGoogleDistance(pickup, drop);
            km       = result.km;
            text     = result.text;
            duration = result.duration;
        }

        // Populate modal
        const modal      = document.getElementById('fare-modal');
        const routeLabel = document.getElementById('fm-route-label');
        const distEl     = document.getElementById('fm-distance');
        const tripEl     = document.getElementById('fm-trip-type');
        const cardsEl    = document.getElementById('fm-cards');
        const durationEl = document.getElementById('fm-duration');
        const cityWrapper = document.getElementById('city-wrapper');
        const routeWrapper = document.getElementById('route-wrapper');

        if (cityWrapper) {
            cityWrapper.innerHTML = citiesData.map(city => `
                <div class="swiper-slide">
                    <div class="city-slide-card">
                        <div class="city-card-header" style="position:relative; height:170px; overflow:hidden; background:#0A1128;">
                            <img src="${city.image}" alt="${city.name}"
                                style="width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease;"
                                onerror="this.parentElement.style.background='linear-gradient(135deg,#0077B6,#03045E)'">
                            <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(120,53,15,0.65) 0%, transparent 55%);"></div>
                            <div style="position:absolute; bottom:10px; left:14px; color:#fff; font-weight:700; font-size:1.05rem; text-shadow:0 1px 4px rgba(0,0,0,0.5);">${city.name}</div>
                            <div style="position:absolute; top:10px; right:10px; background:rgba(217,119,6,0.85); color:#fff; font-size:0.65rem; font-weight:700; padding:2px 8px; border-radius:20px; text-transform:uppercase; letter-spacing:0.5px;"><i class="fa-solid ${city.icon}"></i></div>
                        </div>
                        <div class="city-card-body">
                            <p>${city.desc}</p>
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
                <div class="swiper-slide">
                    <div class="route-slide-card">
                        <div class="route-card-header" style="position:relative; height:150px; overflow:hidden; background:#0A1128;">
                            <img src="${route.image}" alt="${route.from} to ${route.to}"
                                style="width:100%; height:100%; object-fit:cover;"
                                onerror="this.parentElement.style.background='linear-gradient(135deg,#0077B6,#03045E)'">
                            <div style="position:absolute; inset:0; background:linear-gradient(to top, rgba(3,4,94,0.7) 0%, transparent 50%);"></div>
                            <div style="position:absolute; bottom:10px; left:14px; color:#fff; font-weight:800; font-size:1rem; text-shadow:0 1px 4px rgba(0,0,0,0.6);">${route.from} → ${route.to}</div>
                            <div style="position:absolute; top:10px; right:10px; background:rgba(217,119,6,0.85); backdrop-filter:blur(4px); color:#fff; font-size:0.7rem; font-weight:700; padding:3px 9px; border-radius:20px; border:1px solid rgba(252,211,77,0.5);">${route.dist}</div>
                        </div>
                        <div class="route-card-body">
                            <a href="index.html#home" onclick="sessionStorage.setItem('prefillPickup', '${route.from}'); sessionStorage.setItem('prefillDrop', '${route.to}');" class="route-btn" data-from="${route.from}" data-to="${route.to}">Book Now</a>
                            <p class="route-desc">${route.desc}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        if (routeLabel) routeLabel.textContent = tripType === 'Local Trip' ? `${pickup} (Local)` : `${pickup}  →  ${drop}`;
        if (tripType === 'Round Trip') {
            if (distEl)     distEl.textContent = `${250 * numDays} km (250 km × ${numDays} ${numDays > 1 ? 'days' : 'day'})`;
            if (durationEl) durationEl.textContent = `${numDays} day${numDays > 1 ? 's' : ''}`;
        } else {
            if (distEl)     distEl.textContent = text;
            if (durationEl) durationEl.textContent = duration;
        }
        if (tripEl)     tripEl.textContent  = tripType + (numDays > 1 ? ` — ${numDays} days` : '');

        if (cardsEl) {
            cardsEl.innerHTML = VEHICLES.map(v =>
                buildVehicleCard(v, km, tripType, pickup, drop, date, time, numDays, localPackage)
            ).join('');
            
            // Reset grid layout for all cards
            cardsEl.style.gridTemplateColumns = 'repeat(auto-fit,minmax(240px,1fr))';
            cardsEl.style.justifyContent = 'flex-start';
        }

        if (modal) modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

    } catch (err) {
        console.error('Estimate error:', err);
        showError(errorEl, err.message || 'Could not calculate distance.');
    } finally {
        btn.innerHTML = origHTML;
        btn.disabled = false;
    }
}

function showError(el, msg) {
    if (el) {
        el.textContent = msg;
        el.style.display = 'block';
    }
}
function hideError(el) {
    if (el) el.style.display = 'none';
}

// ── Main Booking Form: handle Get Estimate ─────────────────────────────
async function handleMainEstimate() {
    const name     = (document.getElementById('mb-name')?.value || '').trim();
    const phone    = (document.getElementById('mb-phone')?.value || '').trim();
    const pickup   = (document.getElementById('mb-pickup')?.value || '').trim();
    const drop     = (document.getElementById('mb-drop')?.value   || '').trim();
    const date     = document.getElementById('mb-date')?.value   || '';
    const time     = document.getElementById('mb-time')?.value   || '';
    const tripType = document.querySelector('input[name="mb-trip-type"]:checked')?.value || 'One Way';
    const numDays  = tripType === 'Round Trip' ? (parseInt(document.getElementById('mb-days')?.value) || 1) : 1;
    const carType  = document.getElementById('mb-car')?.value || 'Sedan';
    const errorEl  = document.getElementById('mb-error');
    const btn      = document.getElementById('mb-btn-estimate');

    // Validate
    if (!name || !phone) {
        showError(errorEl, 'Please enter your Full Name and Mobile Number.');
        return;
    }
    const isLocal = tripType === 'Pick Up/Drop';
    if (!pickup || !drop) {
        showError(errorEl, 'Please enter both Pick Up and Drop locations.');
        return;
    }
    const basePickupMain = pickup.split(',')[0].trim().toLowerCase();
    const baseDropMain   = drop ? drop.split(',')[0].trim().toLowerCase() : '';
    if (!isLocal && basePickupMain === baseDropMain && basePickupMain !== '') {
        showError(errorEl, 'Pick Up and Drop locations cannot be the same city.');
        return;
    }
    // 

    // Direct submit for Local Trip (Main Form)
    if (tripType === 'Local Trip') {
        const localPackage = document.getElementById('mb-local-package')?.value || '8 Hrs / 80 Kms';
        const msg = encodeURIComponent(
            '*New Local Trip Booking!*\n\n' +
            '*Name:* ' + name + '\n' +
            '*Mobile:* ' + phone + '\n' +
            '*City:* ' + pickup + '\n' +
            '*Date:* ' + date + '   *Time:* ' + time12 + '\n' +
            '*Vehicle Preference:* ' + carType + '\n' +
            '*Package:* ' + localPackage + '\n' +
            '\n_Please confirm availability._'
        );

        const mainLocalInquiry = {
            name: name,
            phone: phone,
            pickup: pickup,
            drop: '',
            car: carType,
            date: date,
            message: 'Local Trip | Package: ' + localPackage
        };
        fetch('api/submit_inquiry.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mainLocalInquiry)
        }).catch(e => console.error(e));
        dispatchWeb3FormsBooking(mainLocalInquiry);

        window.open('https://wa.me/919629245533?text=' + msg, '_blank');
        ['mb-name','mb-phone','mb-pickup','mb-drop'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
        return;
    }
    // Direct submit for Pick Up/Drop (Main Form)
    if (tripType === 'Pick Up/Drop') {
        const msg = encodeURIComponent(
            '*New Pick Up/Drop Booking!*\n\n' +
            '*Name:* ' + name + '\n' +
            '*Mobile:* ' + phone + '\n' +
            '*Pick Up:* ' + pickup + '\n' +
            '*Drop:* ' + drop + '\n' +
            '*Date:* ' + date + '   *Time:* ' + time + '\n' +
            '*Vehicle Preference:* ' + carType + '\n' +
            '\n_Please confirm availability._'
        );

        const mainPndInquiry = {
            name: name,
            phone: phone,
            pickup: pickup,
            drop: drop,
            car: carType,
            date: date,
            message: 'Pick Up/Drop'
        };
        fetch('api/submit_inquiry.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mainPndInquiry)
        }).catch(e => console.error(e));
        dispatchWeb3FormsBooking(mainPndInquiry);

        window.open('https://wa.me/919629245533?text=' + msg, '_blank');
        ['mb-name','mb-phone','mb-pickup','mb-drop'].forEach(id => {
            let el = document.getElementById(id); if(el) el.value='';
        });
        return;
    }
    if (!date || !time) {
        showError(errorEl, 'Please select a travel date and time.');
        return;
    }
    hideError(errorEl);

    // Loading
    const origHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculating...';
    btn.disabled = true;

    try {
        // ── Restore original modal body ──
        const modalBody = document.querySelector('#fare-modal .fm-modal-body');
        if (modalBody && _originalModalBodyHTML) {
            modalBody.innerHTML = _originalModalBodyHTML;
        }

        let km, text, duration, localPackage;
        if (tripType === 'Round Trip') {
            km       = 250 * numDays;
            text     = `${km} km`;
            duration = `${numDays} day${numDays > 1 ? 's' : ''}`;
        } else if (tripType === 'Local Trip') {
            localPackage = document.getElementById('mb-local-package')?.value || '8 Hrs / 80 Kms';
            const kmMatch = localPackage.match(/(\d+) Kms/);
            km       = kmMatch ? parseInt(kmMatch[1]) : 80;
            text     = localPackage;
            duration = localPackage.split(' / ')[0];
        } else {
            const result = await getGoogleDistance(pickup, drop);
            km       = result.km;
            text     = result.text;
            duration = result.duration;
        }

        // Populate modal
        const modal      = document.getElementById('fare-modal');
        const routeLabel = document.getElementById('fm-route-label');
        const distEl     = document.getElementById('fm-distance');
        const tripEl     = document.getElementById('fm-trip-type');
        const cardsEl    = document.getElementById('fm-cards');
        const durationEl = document.getElementById('fm-duration');

        if (routeLabel) routeLabel.textContent = tripType === 'Local Trip' ? `${pickup} (Local)` : `${pickup}  →  ${drop}`;
        if (tripType === 'Round Trip') {
            if (distEl)     distEl.textContent = `${250 * numDays} km (250 km × ${numDays} ${numDays > 1 ? 'days' : 'day'})`;
            if (durationEl) durationEl.textContent = `${numDays} day${numDays > 1 ? 's' : ''}`;
        } else {
            if (distEl)     distEl.textContent = text;
            if (durationEl) durationEl.textContent = duration;
        }
        if (tripEl)     tripEl.textContent  = tripType + (numDays > 1 ? ` — ${numDays} days` : '');

        if (cardsEl) {
            // ONLY map the selected car!
            cardsEl.innerHTML = VEHICLES.filter(v => {
                if (carType === 'MUV') return v.id === 'MUV';
                return v.id === carType;
            }).map(v =>
                buildVehicleCard(v, km, tripType, pickup, drop, date, time, numDays, localPackage)
            ).join('');
            
            // Adjust grid layout since it's only one card
            cardsEl.style.gridTemplateColumns = 'minmax(280px, 400px)';
            cardsEl.style.justifyContent = 'center';
        }

        if (modal) modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

    } catch (err) {
        console.error('Estimate error:', err);
        showError(errorEl, err.message || 'Could not calculate distance.');
    } finally {
        btn.innerHTML = origHTML;
        btn.disabled = false;
    }
}

// ── Cache original modal body so it can be restored each estimate ─────
let _originalModalBodyHTML = null;

// ── Wire up after DOM ready ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Save original modal body HTML (before any openBookingForm call replaces it)
    const _initModal = document.querySelector('#fare-modal .fm-modal-body');
    if (_initModal) _originalModalBodyHTML = _initModal.innerHTML;

    // Block past dates on all date inputs across the site
    const today = new Date();
    // Format to YYYY-MM-DD
    const todayStr = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(el => {
        el.setAttribute('min', todayStr);
    });

    // --- Pre-fill Quick Estimate / Main Forms from sessionStorage OR URL params ---
    const urlParams = new URLSearchParams(window.location.search);

    const prefillPickup = sessionStorage.getItem('prefillPickup') || urlParams.get('pickup') || '';
    const prefillDrop   = sessionStorage.getItem('prefillDrop')   || urlParams.get('drop')   || '';
    const prefillCar    = sessionStorage.getItem('prefillCar')    || urlParams.get('car')    || '';

    // Clear sessionStorage keys after reading
    sessionStorage.removeItem('prefillPickup');
    sessionStorage.removeItem('prefillDrop');
    sessionStorage.removeItem('prefillCar');

    if (prefillPickup || prefillDrop || prefillCar) {
        // Hero form (qb-)
        const qbPickup = document.getElementById('qb-pickup');
        const qbDrop   = document.getElementById('qb-drop');
        const qbCar    = document.getElementById('qb-car');
        if (qbPickup && prefillPickup) qbPickup.value = prefillPickup;
        if (qbDrop   && prefillDrop)   qbDrop.value   = prefillDrop;
        if (qbCar    && prefillCar)    qbCar.value    = prefillCar;

        // Main booking form (mb-)
        const mbPickup = document.getElementById('mb-pickup');
        const mbDrop   = document.getElementById('mb-drop');
        const mbCar    = document.getElementById('mb-car');
        if (mbPickup && prefillPickup) mbPickup.value = prefillPickup;
        if (mbDrop   && prefillDrop)   mbDrop.value   = prefillDrop;
        if (mbCar    && prefillCar)    mbCar.value    = prefillCar;

        // Scroll to appropriate section
        if (prefillCar && !prefillPickup) {
            // Car selected from fleet → scroll to contact/plan journey form
            const contactEl = document.getElementById('contact');
            if (contactEl) setTimeout(() => contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350);
        } else if (prefillPickup) {
            // Route prefill → scroll to hero
            const homeEl = document.getElementById('home');
            if (homeEl) setTimeout(() => homeEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350);
        }
    }

    // Estimate buttons
    const qbBtn = document.getElementById('qb-btn-estimate');
    if (qbBtn) qbBtn.addEventListener('click', handleQuickEstimate);

    const mbBtn = document.getElementById('mb-btn-estimate');
    if (mbBtn) mbBtn.addEventListener('click', handleMainEstimate);

    // Dynamic PAX Limits for main form on page
    initMainPagePaxLimits();

    // Enter key in inputs
    ['qb-name', 'qb-phone', 'qb-pickup', 'qb-drop', 'qb-date', 'qb-days'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('keydown', e => {
            if (e.key === 'Enter') handleQuickEstimate();
        });
    });
    ['mb-name', 'mb-phone', 'mb-pickup', 'mb-drop', 'mb-date', 'mb-days'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('keydown', e => {
            if (e.key === 'Enter') handleMainEstimate();
        });
    });

    // Swap button
    const swapBtn = document.getElementById('qb-swap-btn');
    if (swapBtn) {
        swapBtn.addEventListener('click', () => {
            const pickupEl = document.getElementById('qb-pickup');
            const dropEl = document.getElementById('qb-drop');
            if (pickupEl && dropEl) {
                const temp = pickupEl.value;
                pickupEl.value = dropEl.value;
                dropEl.value = temp;
            }
        });
    }

    // Clear input content — Hero form
    document.getElementById('clear-pickup')?.addEventListener('click', () => {
        const el = document.getElementById('qb-pickup');
        if (el) { el.value = ''; el.focus(); }
    });
    document.getElementById('clear-drop')?.addEventListener('click', () => {
        const el = document.getElementById('qb-drop');
        if (el) { el.value = ''; el.focus(); }
    });

    // Clear input content — Main booking form
    document.getElementById('mb-clear-pickup')?.addEventListener('click', () => {
        const el = document.getElementById('mb-pickup');
        if (el) { el.value = ''; el.focus(); }
    });
    document.getElementById('mb-clear-drop')?.addEventListener('click', () => {
        const el = document.getElementById('mb-drop');
        if (el) { el.value = ''; el.focus(); }
    });

    // Swap button — Main booking form
    const mbSwapBtn = document.getElementById('mb-swap-btn');
    if (mbSwapBtn) {
        mbSwapBtn.addEventListener('click', () => {
            const pickupEl = document.getElementById('mb-pickup');
            const dropEl   = document.getElementById('mb-drop');
            if (pickupEl && dropEl) {
                const temp = pickupEl.value;
                pickupEl.value = dropEl.value;
                dropEl.value = temp;
            }
        });
    }

    // Close modal on backdrop click
    const modal = document.getElementById('fare-modal');
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                window.closeFareModal();
            }
        });
    }

    // Trip toggle → show/hide return date
    document.querySelectorAll('input[name="qb-trip-type"]').forEach(radio => {
        radio.addEventListener('change', e => {
            const endGroup = document.getElementById('qb-end-date-group');
            if (endGroup) endGroup.style.display = e.target.value === 'Round Trip' ? 'block' : 'none';
        });
    });

    // Init Places Autocomplete once Google Maps is ready.
    // Handles two cases:
    //   (A) Maps already loaded before this script ran → __mttMapsLoaded flag is true
    //   (B) Maps loads after → our callback __mttMapsReady() in index.html calls initAutocomplete()
    // A 15-second polling fallback catches phones where Maps loads slowly or silently fails.
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
        // Maps already available (e.g. cached on repeat visit)
        initAutocomplete();
    } else if (window.__mttMapsLoaded) {
        // Callback fired before booking.js was parsed — Maps is ready now
        initAutocomplete();
    } else {
        // Maps not ready yet — poll with a hard timeout
        let pollCount = 0;
        const MAX_POLLS = 75; // 75 × 200ms = 15 seconds max
        const poll = setInterval(() => {
            pollCount++;
            if (typeof google !== 'undefined' && google.maps && google.maps.places) {
                clearInterval(poll);
                initAutocomplete();
            } else if (pollCount >= MAX_POLLS) {
                // Maps failed to load — update placeholders so users know to type freely
                clearInterval(poll);
                ['qb-pickup', 'qb-drop', 'mb-pickup', 'mb-drop', 'lp-pickup'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.placeholder = 'Type city name (e.g. Coimbatore)';
                });
                console.warn('MTT: Google Maps Places API unavailable — autocomplete disabled.');
            }
        }, 200);
    }
});

// Close modal button (global, used by inline onclick)
window.closeFareModal = () => {
    const modal = document.getElementById('fare-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};





// --- Dynamic Local Package Modal Logic ---

function openLocalModal(carType) {
    const modal = document.getElementById('local-package-modal');
    if (modal) {
        document.getElementById('lp-car').value = carType;
        document.getElementById('lp-hours').value = 5;

        // Set current date and time
        const now = new Date();
        const lpDate = document.getElementById('lp-date');
        const lpTime = document.getElementById('lp-time');
        
        if (lpDate) {
            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const dd = String(now.getDate()).padStart(2, '0');
            lpDate.value = `${yyyy}-${mm}-${dd}`;
        }
        
        if (lpTime) {
            const hrs = String(now.getHours()).padStart(2, '0');
            const mins = String(now.getMinutes()).padStart(2, '0');
            lpTime.value = `${hrs}:${mins}`;
        }

        updateLocalModalPrice();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const lpModal = document.getElementById('local-package-modal');
    const lpClose = document.querySelector('.close-local-modal');
    const lpCar = document.getElementById('lp-car');
    const lpHours = document.getElementById('lp-hours');
    const lpBtn = document.getElementById('lp-btn-confirm');

    if (lpModal && lpClose) {
        lpClose.addEventListener('click', () => {
            lpModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === lpModal) {
                lpModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    if (lpCar && lpHours) {
        lpCar.addEventListener('change', updateLocalModalPrice);
        lpHours.addEventListener('input', updateLocalModalPrice);
    }

    if (lpBtn) {
        lpBtn.addEventListener('click', () => {
            const name = document.getElementById('lp-name').value.trim();
            const phone = document.getElementById('lp-phone').value.trim();
            const date = document.getElementById('lp-date').value;
            const time = document.getElementById('lp-time').value;
            const pickup = document.getElementById('lp-pickup').value.trim();
            const drop = ''; // local trips don't need a separate drop location
            const car = document.getElementById('lp-car').value;
            const hours = parseInt(document.getElementById('lp-hours').value) || 5;
            const errorEl = document.getElementById('lp-error');

            if (!name || !phone || !date || !time || !pickup || hours < 5) {
                if (errorEl) {
                    errorEl.textContent = 'Please fill in all fields correctly (Minimum 5 hours).';
                    errorEl.style.display = 'block';
                }
                return;
            }
            if (errorEl) errorEl.style.display = 'none';

            let base = 1750, extra = 350;
            if (car === 'SUV') { base = 2250; extra = 450; }
            if (car === 'Innova Crysta') { base = 2750; extra = 550; }
            const total = base + (Math.max(0, hours - 5) * extra);

            // Time formatting
            let [h, m] = time.split(':');
            let ampm = h >= 12 ? 'PM' : 'AM';
            h = h % 12 || 12;
            let time12 = h + ':' + m + ' ' + ampm;

            const msg = encodeURIComponent(
                '*New Local Package Booking!*\n\n' +
                '*Name:* ' + name + '\n' +
                '*Mobile:* ' + phone + '\n' +
                '*Travel Date:* ' + date + '   *Time:* ' + time12 + '\n' +
                '*Pick Up:* ' + pickup + '\n' +
                '*Car Type:* ' + car + '\n' +
                '*Hours:* ' + hours + ' hours\n' +
                '*Estimated Price:* Rs. ' + total + '\n' +
                '\n_Extra hours: ₹' + extra + '/hr | Extra KM charges apply beyond package limit._\n' +
                '_Toll and Parking charges are extra as applicable._\n' +
                '\n_Please confirm availability._'
            );

            // Sync with backend
            const customPackageInquiry = {
                name: name,
                phone: phone,
                pickup: pickup,
                drop: drop,
                car: car,
                date: date,
                message: 'Local Custom Package | ' + hours + ' Hrs | Rs. ' + total
            };
            fetch('api/submit_inquiry.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customPackageInquiry)
            }).catch(e => console.error(e));
            dispatchWeb3FormsBooking(customPackageInquiry);

            window.open('https://wa.me/919629245533?text=' + msg, '_blank');
            lpModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset fields
            ['lp-name', 'lp-phone', 'lp-date', 'lp-time', 'lp-pickup'].forEach(id => {
                let el = document.getElementById(id);
                if (el) el.value = '';
            });
            document.getElementById('lp-hours').value = 5;
        });
    }
});

window.updateLocalModalPrice = function() {
    const car = document.getElementById('lp-car')?.value || 'Sedan';
    const hoursInput = document.getElementById('lp-hours');
    let hours = parseInt(hoursInput?.value) || 5;

    // Enforce minimum 5
    if (hours < 5 && hoursInput.value !== "") hours = 5;

    let base = 1750, extraHr = 350, extraKm = 30;
    if (car === 'SUV') {
        base = 2250; extraHr = 450; extraKm = 40;
    } else if (car === 'Innova Crysta') {
        base = 2750; extraHr = 550; extraKm = 50;
    }

    const total = base + (Math.max(0, hours - 5) * extraHr);

    const totalEl = document.getElementById('lp-total');
    if (totalEl) totalEl.textContent = '₹' + total;

    const rateEl = document.getElementById('lp-extra-rates');
    if (rateEl) {
        rateEl.innerHTML =
            '₹' + extraHr + '/extra hr &bull; ₹' + extraKm + '/extra km<br>' +
            'Toll &amp; Parking charges extra';
    }
};
