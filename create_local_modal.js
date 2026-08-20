const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const modalHTML = `
    <!-- Local Package Modal -->
    <div id="local-package-modal" class="modal" style="display:none; position:fixed; z-index:2000; left:0; top:0; width:100%; height:100%; overflow:auto; background-color:rgba(0,0,0,0.6);">
        <div class="modal-content" style="background:#fff; margin:5% auto; padding:2rem; width:90%; max-width:600px; border-radius:24px; position:relative;">
            <span class="close-local-modal" style="position:absolute; right:20px; top:20px; font-size:1.5rem; cursor:pointer; color:#6b7280;">&times;</span>
            <h2 style="font-size:1.8rem; margin-bottom:0.5rem; color:var(--mtt-dark);"><i class="fa-solid fa-map-location-dot" style="color:var(--mtt-amber);"></i> Book Local Package</h2>
            <p style="color:#6b7280; margin-bottom:1.5rem;">Custom hour-based rentals for city exploration.</p>
            
            <div id="lp-error" class="error-msg" style="display:none; background:#fee2e2; color:#b91c1c; padding:10px; border-radius:8px; margin-bottom:1rem;"></div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
                <div class="form-group">
                    <label class="booking-field-label">Full Name</label>
                    <input type="text" id="lp-name" class="booking-field-input" placeholder="E.g. John Doe" required>
                </div>
                <div class="form-group">
                    <label class="booking-field-label">Mobile Number</label>
                    <input type="tel" id="lp-phone" class="booking-field-input" placeholder="10-digit number" required>
                </div>
                <div class="form-group">
                    <label class="booking-field-label">Travel Date</label>
                    <input type="date" id="lp-date" class="booking-field-input" required>
                </div>
                <div class="form-group">
                    <label class="booking-field-label">Pick Up Time</label>
                    <input type="time" id="lp-time" class="booking-field-input" required>
                </div>
                <div class="form-group">
                    <label class="booking-field-label">Pick Up Location</label>
                    <input type="text" id="lp-pickup" class="booking-field-input" placeholder="Area or Hotel" required>
                </div>
                <div class="form-group">
                    <label class="booking-field-label">Drop Location</label>
                    <input type="text" id="lp-drop" class="booking-field-input" placeholder="End location" required>
                </div>
                
                <div class="form-group">
                    <label class="booking-field-label">Car Type</label>
                    <select id="lp-car" class="booking-field-input" required>
                        <option value="Sedan">Sedan (₹1500 for 5 hrs)</option>
                        <option value="SUV">SUV (₹1800 for 5 hrs)</option>
                        <option value="Innova Crysta">Innova Crysta (₹2500 for 5 hrs)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="booking-field-label">Number of Hours</label>
                    <input type="number" id="lp-hours" class="booking-field-input" min="5" value="5" required>
                </div>
            </div>
            
            <div style="background:#f9fafb; padding:1.5rem; border-radius:12px; margin-bottom:1.5rem; text-align:center; border:1px solid rgba(196,123,15,0.2);">
                <span style="display:block; color:#6b7280; font-size:0.9rem; margin-bottom:0.5rem;">Estimated Package Cost</span>
                <strong id="lp-total" style="font-size:2rem; color:var(--mtt-amber-dark);">₹1500</strong>
                <p style="font-size:0.8rem; color:#9ca3af; margin-top:0.5rem; line-height:1.4;">Base 5 hrs. Extra KM charges may apply if distance exceeds package limit.</p>
            </div>
            
            <button type="button" id="lp-btn-confirm" class="btn-primary" style="width:100%;"><i class="fa-brands fa-whatsapp"></i> Confirm Booking</button>
        </div>
    </div>
`;

if (!html.includes('local-package-modal')) {
    html = html.replace('</body>', modalHTML + '\n</body>');
}

// Global regex to replace all three buttons with placeholders first
let counter = 0;
html = html.replace(/onclick="document\.querySelector\('\.tab-btn\[data-tab=\\'local\\'\]'\)\?\.click\(\);\s*document\.getElementById\('home'\)\.scrollIntoView\(\{behavior:'smooth'\}\);"/g, () => {
    counter++;
    if (counter === 1) return `onclick="openLocalModal('Sedan')"`;
    if (counter === 2) return `onclick="openLocalModal('SUV')"`;
    if (counter === 3) return `onclick="openLocalModal('Innova Crysta')"`;
    return `onclick="openLocalModal('Sedan')"`;
});

fs.writeFileSync('index.html', html);
console.log('index.html updated with Local Modal');
