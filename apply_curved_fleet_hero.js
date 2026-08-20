const fs = require('fs');
const path = require('path');

const curvedFleetHeroCss = `
/* ═══════════════════════════════════════════════════════════
   HOME PAGE HERO — CURVED FLEET STAGE & DOCK
   ═══════════════════════════════════════════════════════════ */
.hero-curved-section {
    position: relative;
    padding: 135px 0 70px;
    background: radial-gradient(circle at 50% 15%, rgba(245, 158, 11, 0.08) 0%, rgba(255, 255, 255, 0) 65%), #FFFFFF;
    overflow: hidden;
    text-align: center;
}

.hero-curved-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hero-curved-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 1.15rem;
    background: #FFFBEB;
    border: 1px solid #FDE68A;
    border-radius: 30px;
    font-size: 0.82rem;
    font-weight: 700;
    color: #B45309;
    margin-bottom: 1.25rem;
    box-shadow: 0 2px 8px rgba(217, 119, 6, 0.08);
}

.hero-curved-badge i {
    color: #D97706;
}

.hero-curved-title {
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    font-weight: 800;
    color: #0F172A;
    line-height: 1.18;
    letter-spacing: -0.02em;
    margin-bottom: 1.75rem;
    max-width: 900px;
}

.hero-curved-title .gold-highlight {
    color: #D97706;
}

/* ── 5-VEHICLE CURVED ARC STAGE ── */
.curved-fleet-stage {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
    max-width: 1100px;
    width: 100%;
    margin: 0 auto 2.5rem;
    height: 250px;
}

.fleet-curve-item {
    position: absolute;
    bottom: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.fleet-curve-item img {
    width: 100%;
    height: 155px;
    object-fit: cover;
    border-radius: 18px;
    box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(0,0,0,0.04);
    border: 3px solid #FFFFFF;
    background: #FFFFFF;
}

.fleet-curve-tag {
    margin-top: 6px;
    font-size: 0.74rem;
    font-weight: 800;
    color: #0F172A;
    background: #FFFFFF;
    padding: 0.25rem 0.65rem;
    border-radius: 20px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    border: 1px solid #E2E8F0;
    white-space: nowrap;
}

.fleet-curve-item.item-left-2 {
    left: 2%;
    bottom: 20px;
    transform: rotate(-10deg) scale(0.80);
    z-index: 1;
    width: 210px;
}

.fleet-curve-item.item-left-1 {
    left: 21%;
    bottom: 8px;
    transform: rotate(-4deg) scale(0.92);
    z-index: 2;
    width: 235px;
}

.fleet-curve-item.item-center {
    left: 50%;
    transform: translateX(-50%) scale(1.08);
    bottom: 0px;
    z-index: 4;
    width: 270px;
}

.fleet-curve-item.item-center .fleet-curve-tag {
    background: #D97706;
    color: #FFFFFF;
    border-color: #D97706;
}

.fleet-curve-item.item-right-1 {
    right: 21%;
    bottom: 8px;
    transform: rotate(4deg) scale(0.92);
    z-index: 2;
    width: 235px;
}

.fleet-curve-item.item-right-2 {
    right: 2%;
    bottom: 20px;
    transform: rotate(10deg) scale(0.80);
    z-index: 1;
    width: 210px;
}

.fleet-curve-item:hover {
    transform: translateY(-8px) scale(1.12) !important;
    z-index: 10 !important;
}

/* ── FLOATING TRAVEL DOCK CARD ── */
.hero-dock-card {
    background: #FFFFFF;
    border: 1.5px solid #E2E8F0;
    border-radius: 24px;
    box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0,0,0,0.02);
    padding: 1.35rem 1.6rem;
    max-width: 1050px;
    width: 100%;
    margin: 0 auto;
    text-align: left;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-dock-card:hover {
    border-color: #CBD5E1;
    box-shadow: 0 25px 60px -12px rgba(217, 119, 6, 0.12);
}

.dock-pills {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.15rem;
    flex-wrap: wrap;
}

.dock-pill {
    background: #F1F5F9;
    border: 1px solid #E2E8F0;
    padding: 0.45rem 1.1rem;
    border-radius: 20px;
    font-size: 0.80rem;
    font-weight: 700;
    color: #64748B;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
}

.dock-pill:hover {
    background: #E2E8F0;
    color: #0F172A;
}

.dock-pill.active {
    background: #D97706;
    border-color: #D97706;
    color: #FFFFFF;
    box-shadow: 0 4px 12px rgba(217, 119, 6, 0.28);
}

.dock-grid {
    display: grid;
    grid-template-columns: 1.1fr 1.1fr 1.2fr 1fr auto;
    gap: 0.75rem;
    align-items: center;
}

.dock-box {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 0.6rem 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    transition: all 0.2s ease;
}

.dock-box:focus-within,
.dock-box:hover {
    background: #FFFFFF;
    border-color: #D97706;
    box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
}

.dock-box label {
    font-size: 0.68rem;
    font-weight: 800;
    color: #64748B;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin: 0;
}

.dock-box label i {
    color: #D97706;
    font-size: 0.72rem;
}

.dock-box input,
.dock-box select {
    border: none;
    background: transparent;
    font-weight: 700;
    font-size: 0.88rem;
    color: #0F172A;
    width: 100%;
    outline: none;
    font-family: inherit;
    padding: 0;
    cursor: pointer;
    line-height: 1.3;
}

.dock-box input::placeholder {
    color: #94A3B8;
    font-weight: 500;
}

.dock-box select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23D97706' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.2rem center;
    padding-right: 1.25rem;
}

.dock-btn {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    color: #FFFFFF;
    border: none;
    font-size: 1.15rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(217, 119, 6, 0.3);
    transition: all 0.25s ease;
    flex-shrink: 0;
}

.dock-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(217, 119, 6, 0.4);
}

@media (max-width: 990px) {
    .curved-fleet-stage {
        height: auto;
        flex-wrap: wrap;
        gap: 0.75rem;
        position: static;
    }
    .fleet-curve-item {
        position: static;
        transform: none !important;
        width: calc(50% - 0.5rem) !important;
    }
    .fleet-curve-item.item-center {
        width: 100% !important;
    }
    .dock-grid {
        grid-template-columns: 1fr 1fr;
    }
    .dock-btn {
        grid-column: span 2;
        width: 100%;
        border-radius: 12px;
        height: 48px;
    }
}

@media (max-width: 600px) {
    .fleet-curve-item {
        width: 100% !important;
    }
    .dock-grid {
        grid-template-columns: 1fr;
    }
    .dock-btn {
        grid-column: 1;
    }
}
`;

const heroCurvedHtml = `<!-- ═══════════════════════════════════════════════
     1. BANNER (Home Page Hero — Curved Fleet Stage & Dock)
════════════════════════════════════════════════ -->
<section class="hero-curved-section" id="banner">
    <div class="hero-curved-container">
        <!-- Top Badge -->
        <div class="hero-curved-badge">
            <i class="fa-solid fa-crown"></i> Chennai&rsquo;s Most Trusted Travel Partner
        </div>

        <!-- Main Headline -->
        <h1 class="hero-curved-title">
            Journeys That Connect,<br>
            <span class="gold-highlight">Safe &amp; Comfortable.</span>
        </h1>

        <!-- Curved Vehicle Stage -->
        <div class="curved-fleet-stage">
            <div class="fleet-curve-item item-left-2">
                <img src="Assets/car_sedan.jpg" alt="Swift Dzire Sedan">
                <span class="fleet-curve-tag">Sedan (Dzire)</span>
            </div>
            <div class="fleet-curve-item item-left-1">
                <img src="Assets/car_suv.jpg" alt="Ertiga MUV">
                <span class="fleet-curve-tag">Ertiga MUV</span>
            </div>
            <div class="fleet-curve-item item-center">
                <img src="Assets/car_innova.jpg" alt="Toyota Innova Crysta">
                <span class="fleet-curve-tag">Innova Crysta</span>
            </div>
            <div class="fleet-curve-item item-right-1">
                <img src="Assets/car_fortuner.jpg" alt="Toyota Fortuner SUV">
                <span class="fleet-curve-tag">Fortuner SUV</span>
            </div>
            <div class="fleet-curve-item item-right-2">
                <img src="Assets/van_urbania.jpg" alt="Force Urbania Luxury Coach">
                <span class="fleet-curve-tag">Luxury Urbania</span>
            </div>
        </div>

        <!-- Floating Travel Dock Card -->
        <div class="hero-dock-card">
            <!-- Top Category Tabs -->
            <div class="dock-pills">
                <button type="button" class="dock-pill active" onclick="selectDockCategory(this, 'Corporate Mobility')">
                    <i class="fa-solid fa-briefcase"></i> Corporate Mobility
                </button>
                <button type="button" class="dock-pill" onclick="selectDockCategory(this, 'Airport Transfers')">
                    <i class="fa-solid fa-plane-departure"></i> Airport Transfers
                </button>
                <button type="button" class="dock-pill" onclick="selectDockCategory(this, 'Outstation Cabs')">
                    <i class="fa-solid fa-route"></i> Outstation Cabs
                </button>
                <button type="button" class="dock-pill" onclick="selectDockCategory(this, 'Holiday Packages')">
                    <i class="fa-solid fa-umbrella-beach"></i> Holiday Packages
                </button>
            </div>

            <!-- Form Fields Row -->
            <form id="hero-dock-form" onsubmit="handleHeroDockSend(event)">
                <div class="dock-grid">
                    <div class="dock-box">
                        <label for="dock-name"><i class="fa-solid fa-user"></i> Name</label>
                        <input type="text" id="dock-name" placeholder="Your Full Name" required autocomplete="name">
                    </div>

                    <div class="dock-box">
                        <label for="dock-phone"><i class="fa-solid fa-phone"></i> Contact Number</label>
                        <input type="tel" id="dock-phone" placeholder="+91 Phone Number" required autocomplete="tel">
                    </div>

                    <div class="dock-box">
                        <label for="dock-service"><i class="fa-solid fa-car-side"></i> Service Required</label>
                        <select id="dock-service" required>
                            <option value="Corporate Mobility" selected>Corporate Mobility</option>
                            <option value="Airport Transfers">Airport Transfers</option>
                            <option value="Outstation Cabs">Outstation Cabs</option>
                            <option value="Holiday Packages">Holiday Packages</option>
                            <option value="Flight / Train Tickets">Flight / Train Tickets</option>
                            <option value="Visa & Cruise Booking">Visa &amp; Cruise Booking</option>
                        </select>
                    </div>

                    <div class="dock-box">
                        <label for="dock-date"><i class="fa-solid fa-calendar-days"></i> Travel Date</label>
                        <input type="date" id="dock-date" required>
                    </div>

                    <button type="submit" class="dock-btn" title="Send Instant Enquiry" aria-label="Send Instant Enquiry">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>

<script>
function selectDockCategory(btn, category) {
    document.querySelectorAll('.dock-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const serviceSelect = document.getElementById('dock-service');
    if (serviceSelect) {
        serviceSelect.value = category;
    }
}

function handleHeroDockSend(e) {
    e.preventDefault();
    const name = document.getElementById('dock-name')?.value || '';
    const phone = document.getElementById('dock-phone')?.value || '';
    const service = document.getElementById('dock-service')?.value || '';
    const date = document.getElementById('dock-date')?.value || '';
    
    const text = encodeURIComponent(
        'Hello Mithra Tours & Travels,\n\n' +
        'I would like to request an instant quote:\n' +
        '• Name: ' + name + '\n' +
        '• Contact Number: ' + phone + '\n' +
        '• Service Required: ' + service + '\n' +
        '• Travel Date: ' + date
    );
    
    window.open('https://wa.me/919629245533?text=' + text, '_blank');
}
</script>`;

// Update CSS
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    const regex = /\/\* ═+\r?\n\s*HOME PAGE HERO[\s\S]*?(?=\/\* ═|$)/;
    if (regex.test(css)) {
        css = css.replace(regex, curvedFleetHeroCss.trim() + '\n\n');
    } else {
        css += '\n\n' + curvedFleetHeroCss.trim() + '\n';
    }
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated curved fleet CSS in:', file);
});

// Update HTML
['v2/index.html', 'index.html', 'deploy_ready/index.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const startMarker = '<!-- ═══════════════════════════════════════════════\n     1. BANNER';
    const endMarker = '</section>';
    const startIndex = html.indexOf(startMarker);
    if (startIndex !== -1) {
        const endIndex = html.indexOf(endMarker, startIndex);
        if (endIndex !== -1) {
            html = html.replace(/<script>\s*function (?:handleHeroQuickSend|selectDockCategory|handleHeroDockSend)[\s\S]*?<\/script>\s*/g, '');
            html = html.substring(0, startIndex) + heroCurvedHtml.trim() + '\n' + html.substring(endIndex + endMarker.length);
            fs.writeFileSync(file, html, 'utf8');
            console.log('Applied curved fleet Hero HTML in:', file);
        }
    }
});
