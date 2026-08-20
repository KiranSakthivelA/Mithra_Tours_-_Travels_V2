/**
 * MTT Travels - Fare Estimation Modal
 * Distance: Google Maps Distance Matrix API (accurate road distances)
 * Places: Google Maps Autocomplete on pickup/drop inputs
 * On estimate: shows all 3 vehicle fares in a popup modal.
 * Each card → Confirm Booking → pre-filled WhatsApp message.
 */

'use strict';

const VEHICLES = [
    {
        id: 'Sedan',
        label: 'Sedan',
        icon: 'fa-car',
        image: 'Assets/car_sedan.png',
        desc: 'Ideal for couples & small families',
        seats: '4 Seats',
        bags: '2 Bags',
        color: '#0A1128',
        oneWayRate: 14,
        roundTripRate: 13,
        batta: 400,
        minOneWay: 130,
        minRoundTrip: 250
    },
    {
        id: 'SUV',
        label: 'SUV',
        icon: 'fa-truck-pickup',
        image: 'Assets/car_suv.png',
        desc: 'Spacious comfort for groups & families',
        seats: '7 Seats',
        bags: '4 Bags',
        color: '#92400E',
        oneWayRate: 19,
        roundTripRate: 18,
        batta: 400,
        minOneWay: 130,
        minRoundTrip: 250
    },
    {
        id: 'MUV',
        label: 'Innova Crysta',
        icon: 'fa-shuttle-van',
        image: 'Assets/car_innova.png',
        desc: 'Premium luxury for long journeys',
        seats: '7 Seats',
        bags: '4 Bags',
        color: '#D97706',
        oneWayRate: 21,
        roundTripRate: 20,
        batta: 400,
            cardsEl.style.justifyContent = 'flex-start';
        }

        if (modal) modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

    } catch (err) {
        console.error('Estimate error:', err);
        showError(errorEl, 'Could not calculate distance. Please check the city names and try again.');
    } finally {
        btn.innerHTML = origHTML;
        btn.disabled = false;
    }
}

function showError(el, msg) {
    if (el) { el.textContent = msg; el.style.display = 'block'; }
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
