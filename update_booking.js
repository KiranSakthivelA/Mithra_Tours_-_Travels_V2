const fs = require('fs');
let js = fs.readFileSync('js/booking.js', 'utf8');

// Add change button text logic
const initJS = `
document.addEventListener('DOMContentLoaded', () => {
    // Quick Booking Form Button
    const qbRadios = document.querySelectorAll('input[name="qb-trip-type"]');
    const qbBtn = document.getElementById('qb-btn-estimate');
    qbRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if(qbBtn) qbBtn.innerHTML = e.target.value === 'Local Trip' ? '<i class="fa-solid fa-check"></i> Confirm Booking' : '<i class="fa-solid fa-calculator"></i> Get Estimate';
        });
    });

    // Main Booking Form Button
    const mbRadios = document.querySelectorAll('input[name="mb-trip-type"]');
    const mbBtn = document.getElementById('mb-btn-estimate');
    mbRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if(mbBtn) mbBtn.innerHTML = e.target.value === 'Local Trip' ? '<i class="fa-solid fa-check"></i> Confirm Booking' : '<i class="fa-solid fa-calculator"></i> Get Estimate';
        });
    });
});
`;

if (!js.includes('Confirm Booking')) {
    js = initJS + '\n' + js;
}

// Add direct submit logic for Quick Booking
const qbStart = js.indexOf("const btn      = document.getElementById('qb-btn-estimate');");
const qbValidateEnd = js.indexOf("showError(errorEl, 'Pick Up and Drop locations cannot be the same city.');\n        return;\n    }", qbStart);

if (qbStart !== -1 && qbValidateEnd !== -1) {
    const injectionPoint1 = qbValidateEnd + 104; // After the closing brace of the validation
    const directSubmitQB = `

    // Direct submit for Local Trip
    if (tripType === 'Local Trip') {
        const localPackage = document.getElementById('qb-local-package')?.value || '8 Hrs / 80 Kms';
        const msg = encodeURIComponent(
            '*New Local Trip Booking!*\\n\\n' +
            '*Name:* ' + name + '\\n' +
            '*Mobile:* ' + phone + '\\n' +
            '*City:* ' + pickup + '\\n' +
            '*Date:* ' + date + '   *Time:* ' + time12 + '\\n' +
            '*Package:* ' + localPackage + '\\n' +
            '\\n_Please confirm availability._'
        );

        fetch('api/submit_inquiry.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                phone: phone,
                pickup: pickup,
                drop: '',
                car: 'Any (Local Package)',
                date: date,
                message: 'Local Trip | Package: ' + localPackage
            })
        }).catch(e => console.error(e));

        window.open('https://wa.me/919629245533?text=' + msg, '_blank');
        ['qb-name','qb-phone','qb-pickup','qb-drop'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
        return;
    }
`;
    if (!js.includes('Direct submit for Local Trip')) {
        js = js.substring(0, injectionPoint1) + directSubmitQB + js.substring(injectionPoint1);
    }
}

// Do the same for Main Booking (mb-form)
const mbStart = js.indexOf("const btn      = document.getElementById('mb-btn-estimate');");
const mbValidateEnd = js.indexOf("showError(errorEl, 'Pick Up and Drop locations cannot be the same city.');\n        return;\n    }", mbStart);

if (mbStart !== -1 && mbValidateEnd !== -1) {
    const injectionPoint2 = mbValidateEnd + 104;
    const directSubmitMB = `

    // Direct submit for Local Trip (Main Form)
    if (tripType === 'Local Trip') {
        const localPackage = document.getElementById('mb-local-package')?.value || '8 Hrs / 80 Kms';
        const msg = encodeURIComponent(
            '*New Local Trip Booking!*\\n\\n' +
            '*Name:* ' + name + '\\n' +
            '*Mobile:* ' + phone + '\\n' +
            '*City:* ' + pickup + '\\n' +
            '*Date:* ' + date + '   *Time:* ' + time12 + '\\n' +
            '*Vehicle Preference:* ' + carType + '\\n' +
            '*Package:* ' + localPackage + '\\n' +
            '\\n_Please confirm availability._'
        );

        fetch('api/submit_inquiry.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                phone: phone,
                pickup: pickup,
                drop: '',
                car: carType,
                date: date,
                message: 'Local Trip | Package: ' + localPackage
            })
        }).catch(e => console.error(e));

        window.open('https://wa.me/919629245533?text=' + msg, '_blank');
        ['mb-name','mb-phone','mb-pickup','mb-drop'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
        return;
    }
`;
    if (!js.includes('Direct submit for Local Trip (Main Form)')) {
        js = js.substring(0, injectionPoint2) + directSubmitMB + js.substring(injectionPoint2);
    }
}

fs.writeFileSync('js/booking.js', js);
console.log('booking.js updated with Local Trip direct confirm');
