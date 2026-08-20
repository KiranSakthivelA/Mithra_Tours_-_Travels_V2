const fs = require('fs');
let js = fs.readFileSync('js/booking.js', 'utf8');

const logic = `
// --- Dynamic Local Package Modal Logic ---

function openLocalModal(carType) {
    const modal = document.getElementById('local-package-modal');
    if (modal) {
        document.getElementById('lp-car').value = carType;
        document.getElementById('lp-hours').value = 5;
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
            const drop = document.getElementById('lp-drop').value.trim();
            const car = document.getElementById('lp-car').value;
            const hours = parseInt(document.getElementById('lp-hours').value) || 5;
            const errorEl = document.getElementById('lp-error');

            if (!name || !phone || !date || !time || !pickup || !drop || hours < 5) {
                if (errorEl) {
                    errorEl.textContent = 'Please fill in all fields correctly (Minimum 5 hours).';
                    errorEl.style.display = 'block';
                }
                return;
            }
            if (errorEl) errorEl.style.display = 'none';

            let base = 1500, extra = 300;
            if (car === 'SUV') { base = 1800; extra = 400; }
            if (car === 'Innova Crysta') { base = 2500; extra = 500; }
            const total = base + (Math.max(0, hours - 5) * extra);

            // Time formatting
            let [h, m] = time.split(':');
            let ampm = h >= 12 ? 'PM' : 'AM';
            h = h % 12 || 12;
            let time12 = h + ':' + m + ' ' + ampm;

            const msg = encodeURIComponent(
                '*New Local Package Booking!*\\n\\n' +
                '*Name:* ' + name + '\\n' +
                '*Mobile:* ' + phone + '\\n' +
                '*Travel Date:* ' + date + '   *Time:* ' + time12 + '\\n' +
                '*Pick Up:* ' + pickup + '\\n' +
                '*Drop:* ' + drop + '\\n' +
                '*Car Type:* ' + car + '\\n' +
                '*Hours:* ' + hours + ' hours\\n' +
                '*Estimated Price:* Rs. ' + total + '\\n' +
                '\\n_Please confirm availability._'
            );

            // Sync with backend
            fetch('api/submit_inquiry.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                    pickup: pickup,
                    drop: drop,
                    car: car,
                    date: date,
                    message: 'Local Custom Package | ' + hours + ' Hrs | Rs. ' + total
                })
            }).catch(e => console.error(e));

            window.open('https://wa.me/919629245533?text=' + msg, '_blank');
            lpModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset fields
            ['lp-name', 'lp-phone', 'lp-date', 'lp-time', 'lp-pickup', 'lp-drop'].forEach(id => {
                document.getElementById(id).value = '';
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
    if (hours < 5 && hoursInput.value !== "") {
        // We let them type, but for calc we use 5
        hours = 5;
    }

    let base = 1500, extra = 300;
    if (car === 'SUV') {
        base = 1800; extra = 400;
    } else if (car === 'Innova Crysta') {
        base = 2500; extra = 500;
    }

    const total = base + (Math.max(0, hours - 5) * extra);
    const totalEl = document.getElementById('lp-total');
    if (totalEl) {
        totalEl.textContent = '₹' + total;
    }
};
`;

if (!js.includes('function openLocalModal')) {
    js += '\n\n' + logic;
    fs.writeFileSync('js/booking.js', js);
}
console.log('booking.js updated with Local Package logic');
