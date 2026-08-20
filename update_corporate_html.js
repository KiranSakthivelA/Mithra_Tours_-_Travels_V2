const fs = require('fs');
const path = require('path');

// 1. Clean Corporate White HTML Cards
const cardsHtml = `                    <!-- 1. Sedan -->
                    <div class="coverflow-card active" data-index="0" data-category="sedan" data-vehicle="sedan">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=85&w=900" alt="Maruthi Dzire, Amaze & Aura" loading="eager">
                            <span class="card-type-tag">Sedan</span>
                        </div>
                        <div class="card-content-overlay">
                            <div class="card-header-block">
                                <span class="card-cat-name">Executive Mobility</span>
                                <h3 class="card-main-title">Maruthi Dzire, Amaze & Aura</h3>
                                <p class="card-tagline">City duties, airport transfers & corporate travel</p>
                            </div>
                            <div class="card-specs-row">
                                <span class="card-spec-badge"><i class="fa-solid fa-user"></i> 4+1 Seats</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-snowflake"></i> AC</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-suitcase"></i> 2 Bags</span>
                            </div>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Sedan#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Sedan%20(Dzire%20/%20Amaze)" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="sedan" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Premium Sedan -->
                    <div class="coverflow-card" data-index="1" data-category="sedan" data-vehicle="premium-sedan">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=85&w=900" alt="Toyota Corolla Altis, City & Verna" loading="lazy">
                            <span class="card-type-tag">Premium Sedan</span>
                        </div>
                        <div class="card-content-overlay">
                            <div class="card-header-block">
                                <span class="card-cat-name">Corporate Standard</span>
                                <h3 class="card-main-title">Corolla Altis, City & Verna</h3>
                                <p class="card-tagline">Client reception & senior leadership transport</p>
                            </div>
                            <div class="card-specs-row">
                                <span class="card-spec-badge"><i class="fa-solid fa-user"></i> 4+1 Seats</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-wind"></i> Dual AC</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-star"></i> Executive</span>
                            </div>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Premium%20Sedan#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Premium%20Sedan" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="premium-sedan" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 3. SUV -->
                    <div class="coverflow-card" data-index="2" data-category="suv" data-vehicle="suv">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=85&w=900" alt="Innova, Ertiga & Carens" loading="lazy">
                            <span class="card-type-tag">SUV & MUV</span>
                        </div>
                        <div class="card-content-overlay">
                            <div class="card-header-block">
                                <span class="card-cat-name">Spacious Utility</span>
                                <h3 class="card-main-title">Innova, Ertiga & Carens</h3>
                                <p class="card-tagline">Multi-member field visits & outstation transit</p>
                            </div>
                            <div class="card-specs-row">
                                <span class="card-spec-badge"><i class="fa-solid fa-users"></i> 6/7 Seats</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-snowflake"></i> Rear AC</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-suitcase"></i> 3 Bags</span>
                            </div>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=SUV#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20SUV" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="suv" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 4. Toyota Crysta -->
                    <div class="coverflow-card" data-index="3" data-category="suv" data-vehicle="muv-crysta">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=85&w=900" alt="Toyota Innova Crysta" loading="lazy">
                            <span class="card-type-tag">Executive MUV</span>
                        </div>
                        <div class="card-content-overlay">
                            <div class="card-header-block">
                                <span class="card-cat-name">Corporate Benchmark</span>
                                <h3 class="card-main-title">Toyota Innova Crysta</h3>
                                <p class="card-tagline">Gold standard luxury comfort for VIP transfers</p>
                            </div>
                            <div class="card-specs-row">
                                <span class="card-spec-badge"><i class="fa-solid fa-chair"></i> 7 Seater</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-wind"></i> Dual Climate</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-crown"></i> VIP Level</span>
                            </div>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Toyota%20Crysta#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Innova%20Crysta" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="muv-crysta" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 5. Premium MUV: Fortuner & Hycross -->
                    <div class="coverflow-card" data-index="4" data-category="suv" data-vehicle="premium-muv">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=85&w=900" alt="Toyota Fortuner & Innova Hycross" loading="lazy">
                            <span class="card-type-tag">Premium MUV</span>
                        </div>
                        <div class="card-content-overlay">
                            <div class="card-header-block">
                                <span class="card-cat-name">High Stature Luxury</span>
                                <h3 class="card-main-title">Fortuner & Innova Hycross</h3>
                                <p class="card-tagline">Executive hybrid SUV with ottoman recliners</p>
                            </div>
                            <div class="card-specs-row">
                                <span class="card-spec-badge"><i class="fa-solid fa-couch"></i> Ottoman Seats</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-leaf"></i> Hybrid / 4x4</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-briefcase"></i> CEO Visits</span>
                            </div>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Fortuner%20Hycross#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Fortuner%20Hycross" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="premium-muv" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 6. Luxury Vehicles -->
                    <div class="coverflow-card" data-index="5" data-category="luxury" data-vehicle="luxury">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=85&w=900" alt="Mercedes Benz, BMW & Audi" loading="lazy">
                            <span class="card-type-tag">Luxury Class</span>
                        </div>
                        <div class="card-content-overlay">
                            <div class="card-header-block">
                                <span class="card-cat-name">Ultra Luxury Class</span>
                                <h3 class="card-main-title">Mercedes, BMW & Audi</h3>
                                <p class="card-tagline">High-profile delegates, VIPs & executive board</p>
                            </div>
                            <div class="card-specs-row">
                                <span class="card-spec-badge"><i class="fa-solid fa-user-tie"></i> Chauffeur</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-shield-halved"></i> Protocol</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-gem"></i> Ultra Luxury</span>
                            </div>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Luxury%20Mercedes%20BMW#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Luxury%20Mercedes" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="luxury" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 7. Force Urbania -->
                    <div class="coverflow-card" data-index="6" data-category="van" data-vehicle="urbania">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=85&w=900" alt="Force Urbania Luxury Van" loading="lazy">
                            <span class="card-type-tag">Monocoque Van</span>
                        </div>
                        <div class="card-content-overlay">
                            <div class="card-header-block">
                                <span class="card-cat-name">Next-Gen Luxury Van</span>
                                <h3 class="card-main-title">Force Urbania (12-17 Seats)</h3>
                                <p class="card-tagline">Individual USB ports & pushback luxury recliners</p>
                            </div>
                            <div class="card-specs-row">
                                <span class="card-spec-badge"><i class="fa-solid fa-users"></i> 12-17 Seats</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-plug"></i> USB Ports</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-wind"></i> Ducted AC</span>
                            </div>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Force%20Urbania#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Force%20Urbania" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="urbania" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 8. Tempo Traveller -->
                    <div class="coverflow-card" data-index="7" data-category="van" data-vehicle="tempo">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=85&w=900" alt="Force Tempo Traveller" loading="lazy">
                            <span class="card-type-tag">Touring Van</span>
                        </div>
                        <div class="card-content-overlay">
                            <div class="card-header-block">
                                <span class="card-cat-name">Group Excursions</span>
                                <h3 class="card-main-title">Force Tempo Traveller</h3>
                                <p class="card-tagline">Team offsites, event shuttles & outstation tours</p>
                            </div>
                            <div class="card-specs-row">
                                <span class="card-spec-badge"><i class="fa-solid fa-users"></i> 12-18 Seats</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-snowflake"></i> AC Option</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-suitcase"></i> Big Boot</span>
                            </div>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Tempo%20Traveller#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Tempo%20Traveller" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="tempo" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 9. Tourist Van -->
                    <div class="coverflow-card" data-index="8" data-category="van" data-vehicle="van">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=85&w=900" alt="Tourist Van SML & Volvo" loading="lazy">
                            <span class="card-type-tag">Tourist Coach</span>
                        </div>
                        <div class="card-content-overlay">
                            <div class="card-header-block">
                                <span class="card-cat-name">Mid-Sized Groups</span>
                                <h3 class="card-main-title">Tourist Van (25 Seater)</h3>
                                <p class="card-tagline">Corporate delegation & convention group movement</p>
                            </div>
                            <div class="card-specs-row">
                                <span class="card-spec-badge"><i class="fa-solid fa-users"></i> 25 Seater</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-wind"></i> High AC</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-microphone"></i> Guide Mic</span>
                            </div>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Tourist%20Van%2025%20Seater#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Tourist%20Van" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="van" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 10. Minibus -->
                    <div class="coverflow-card" data-index="9" data-category="bus" data-vehicle="minibus">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=85&w=900" alt="Minibus 32-36 Seater" loading="lazy">
                            <span class="card-type-tag">Mini Bus</span>
                        </div>
                        <div class="card-content-overlay">
                            <div class="card-header-block">
                                <span class="card-cat-name">Staff & Shuttles</span>
                                <h3 class="card-main-title">Minibus (32-36 Seater)</h3>
                                <p class="card-tagline">Daily employee commute & conference logistics</p>
                            </div>
                            <div class="card-specs-row">
                                <span class="card-spec-badge"><i class="fa-solid fa-users"></i> 32-36 Seats</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-building"></i> Monthly Contract</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-video"></i> CCTV Monitored</span>
                            </div>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Minibus%2036%20Seater#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Minibus" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="minibus" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 11. Large Coach Bus -->
                    <div class="coverflow-card" data-index="10" data-category="bus" data-vehicle="bus">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=85&w=900" alt="Luxury Coach (48-55 Seater)" loading="lazy">
                            <span class="card-type-tag">Luxury Coach</span>
                        </div>
                        <div class="card-content-overlay">
                            <div class="card-header-block">
                                <span class="card-cat-name">Mass Transport</span>
                                <h3 class="card-main-title">Luxury Coach (48-55 Seater)</h3>
                                <p class="card-tagline">Annual days, conventions & long-distance group tours</p>
                            </div>
                            <div class="card-specs-row">
                                <span class="card-spec-badge"><i class="fa-solid fa-users"></i> 48-55 Seats</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-wind"></i> Air Suspension</span>
                                <span class="card-spec-badge"><i class="fa-solid fa-box"></i> Huge Cargo</span>
                            </div>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Luxury%20Coach%20Bus#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Luxury%20Coach" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="bus" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>`;

// Update HTML files
['v2/our-fleet.html', 'our-fleet.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');
    const startIdx = html.indexOf('<div class="fleet-stage" id="fleet-stage">');
    const endPattern = '<!-- Bottom Controls: Dots, Counter, and Drag Hint -->';
    const endIdx = html.indexOf(endPattern);
    if (startIdx !== -1 && endIdx !== -1) {
        html = html.slice(0, startIdx + '<div class="fleet-stage" id="fleet-stage">\n'.length) + cardsHtml + '\n                </div>\n            </div>\n\n            ' + html.slice(endIdx);
        fs.writeFileSync(file, html, 'utf8');
        console.log('Successfully updated corporate HTML cards in:', file);
    }
});
