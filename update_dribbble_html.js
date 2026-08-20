const fs = require('fs');
const path = require('path');

const cardsHtml = `                    <!-- 1. Sedan -->
                    <div class="coverflow-card active" data-index="0" data-category="sedan" data-vehicle="sedan">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=85&w=1000" alt="Maruthi Dzire, Amaze & Aura" loading="eager">
                        </div>
                        <div class="card-gradient-overlay"></div>
                        <div class="card-top-pill">Sedan</div>
                        <div class="card-content-overlay">
                            <span class="card-cat-name">City & Outstation</span>
                            <h3 class="card-main-title">Maruthi Dzire <br>— & Amaze</h3>
                            <div class="card-accent-line"></div>
                            <p class="card-tagline">4+1 Seats • Climate AC • 2 Bags • Airport & Corporate</p>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Sedan#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Sedan%20(Dzire%20/%20Amaze)" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="sedan" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Premium Sedan -->
                    <div class="coverflow-card" data-index="1" data-category="sedan" data-vehicle="premium-sedan">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=85&w=1000" alt="Toyota Corolla Altis, City & Verna" loading="lazy">
                        </div>
                        <div class="card-gradient-overlay"></div>
                        <div class="card-top-pill">Premium Sedan</div>
                        <div class="card-content-overlay">
                            <span class="card-cat-name">Executive Standard</span>
                            <h3 class="card-main-title">Corolla Altis <br>— City & Verna</h3>
                            <div class="card-accent-line"></div>
                            <p class="card-tagline">4+1 Seats • Leather Interior • Executive Chauffeur</p>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Premium%20Sedan#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Premium%20Sedan" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="premium-sedan" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 3. SUV -->
                    <div class="coverflow-card" data-index="2" data-category="suv" data-vehicle="suv">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=85&w=1000" alt="Toyota Innova, Ertiga & Carens" loading="lazy">
                        </div>
                        <div class="card-gradient-overlay"></div>
                        <div class="card-top-pill">SUV & MUV</div>
                        <div class="card-content-overlay">
                            <span class="card-cat-name">Family & Corporate</span>
                            <h3 class="card-main-title">Innova, Ertiga <br>— & Carens</h3>
                            <div class="card-accent-line"></div>
                            <p class="card-tagline">6/7+1 Seats • Dual Rear AC • 3 Bags • Outstation Trips</p>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=SUV#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20SUV" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="suv" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 4. Toyota Crysta -->
                    <div class="coverflow-card" data-index="3" data-category="suv" data-vehicle="muv-crysta">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=85&w=1000" alt="Toyota Innova Crysta" loading="lazy">
                        </div>
                        <div class="card-gradient-overlay"></div>
                        <div class="card-top-pill">Executive MUV</div>
                        <div class="card-content-overlay">
                            <span class="card-cat-name">VIP Benchmark</span>
                            <h3 class="card-main-title">Toyota Innova <br>— Crysta</h3>
                            <div class="card-accent-line"></div>
                            <p class="card-tagline">7 Seater • Captain Recliner Seats • Dual Climate AC • VIP</p>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Toyota%20Crysta#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Innova%20Crysta" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="muv-crysta" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 5. Premium MUV: Fortuner & Hycross -->
                    <div class="coverflow-card" data-index="4" data-category="suv" data-vehicle="premium-muv">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=85&w=1000" alt="Toyota Fortuner & Innova Hycross" loading="lazy">
                        </div>
                        <div class="card-gradient-overlay"></div>
                        <div class="card-top-pill">Premium MUV</div>
                        <div class="card-content-overlay">
                            <span class="card-cat-name">High Stature Luxury</span>
                            <h3 class="card-main-title">Fortuner & <br>— Hycross</h3>
                            <div class="card-accent-line"></div>
                            <p class="card-tagline">6/7 Seats • Ottoman Recliners • 4x4 / Hybrid • CEO Visits</p>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Fortuner%20Hycross#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Fortuner%20Hycross" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="premium-muv" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 6. Luxury Vehicles -->
                    <div class="coverflow-card" data-index="5" data-category="luxury" data-vehicle="luxury">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=85&w=1000" alt="Mercedes Benz, BMW & Audi" loading="lazy">
                        </div>
                        <div class="card-gradient-overlay"></div>
                        <div class="card-top-pill">Luxury Class</div>
                        <div class="card-content-overlay">
                            <span class="card-cat-name">Ultra Luxury Mobility</span>
                            <h3 class="card-main-title">Mercedes, BMW <br>— & Audi</h3>
                            <div class="card-accent-line"></div>
                            <p class="card-tagline">Elite Chauffeur • White Glove Protocol • VIP Delegations</p>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Luxury%20Mercedes%20BMW#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Luxury%20Mercedes" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="luxury" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 7. Force Urbania -->
                    <div class="coverflow-card" data-index="6" data-category="van" data-vehicle="urbania">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=85&w=1000" alt="Force Urbania Luxury Van" loading="lazy">
                        </div>
                        <div class="card-gradient-overlay"></div>
                        <div class="card-top-pill">Monocoque Van</div>
                        <div class="card-content-overlay">
                            <span class="card-cat-name">Next Gen Group Luxury</span>
                            <h3 class="card-main-title">Force Urbania <br>— (12-17 Seats)</h3>
                            <div class="card-accent-line"></div>
                            <p class="card-tagline">Pushback Recliners • Individual USB • Overhead Ducted AC</p>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Force%20Urbania#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Force%20Urbania" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="urbania" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 8. Tempo Traveller -->
                    <div class="coverflow-card" data-index="7" data-category="van" data-vehicle="tempo">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=85&w=1000" alt="Force Tempo Traveller" loading="lazy">
                        </div>
                        <div class="card-gradient-overlay"></div>
                        <div class="card-top-pill">Touring Van</div>
                        <div class="card-content-overlay">
                            <span class="card-cat-name">Group Excursions</span>
                            <h3 class="card-main-title">Tempo Traveller <br>— (12-18 Seats)</h3>
                            <div class="card-accent-line"></div>
                            <p class="card-tagline">12-18 Seater • AC / Non-AC • Luggage Boot • Tour Circuits</p>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Tempo%20Traveller#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Tempo%20Traveller" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="tempo" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 9. Tourist Van -->
                    <div class="coverflow-card" data-index="8" data-category="van" data-vehicle="van">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=85&w=1000" alt="SML & Volvo Tourist Van" loading="lazy">
                        </div>
                        <div class="card-gradient-overlay"></div>
                        <div class="card-top-pill">Tourist Coach</div>
                        <div class="card-content-overlay">
                            <span class="card-cat-name">Medium Group Tours</span>
                            <h3 class="card-main-title">Tourist Van <br>— (25 Seater)</h3>
                            <div class="card-accent-line"></div>
                            <p class="card-tagline">25 Seater • Ducted High Power AC • High Headroom • Guide Mic</p>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Tourist%20Van%2025%20Seater#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Tourist%20Van" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="van" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 10. Minibus -->
                    <div class="coverflow-card" data-index="9" data-category="bus" data-vehicle="minibus">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=85&w=1000" alt="Minibus 32-36 Seater" loading="lazy">
                        </div>
                        <div class="card-gradient-overlay"></div>
                        <div class="card-top-pill">Mini Bus</div>
                        <div class="card-content-overlay">
                            <span class="card-cat-name">Staff & Conventions</span>
                            <h3 class="card-main-title">Minibus Coach <br>— (32-36 Seats)</h3>
                            <div class="card-accent-line"></div>
                            <p class="card-tagline">32-36 Seats • Staff Contracts • CCTV Monitored • Sanitized</p>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Minibus%2036%20Seater#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Minibus" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>
                                <button class="card-btn-info open-spec-modal" data-vehicle="minibus" title="Specs" aria-label="Specs"><i class="fa-solid fa-info"></i></button>
                            </div>
                        </div>
                    </div>

                    <!-- 11. Large Coach Bus -->
                    <div class="coverflow-card" data-index="10" data-category="bus" data-vehicle="bus">
                        <div class="card-image-layer">
                            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=85&w=1000" alt="Luxury Coach Bus (48-55 Seater)" loading="lazy">
                        </div>
                        <div class="card-gradient-overlay"></div>
                        <div class="card-top-pill">Luxury Coach</div>
                        <div class="card-content-overlay">
                            <span class="card-cat-name">Mega Group Movement</span>
                            <h3 class="card-main-title">Luxury Coach <br>— (48-55 Seats)</h3>
                            <div class="card-accent-line"></div>
                            <p class="card-tagline">Air Suspension • Reclining Semi-Sleepers • Huge Cargo Bays</p>
                            <div class="card-actions-row">
                                <a href="contact.html?vehicle=Luxury%20Coach%20Bus#enquiry" class="card-btn-book"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
                                <a href="https://wa.me/919629245533?text=Hi%20Mithra%20Tours%2C%20I%20want%20a%20quote%20for%20Luxury%20Coach" class="card-btn-wa" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i></a>
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
        // Find the last </div> before endPattern
        const beforeEnd = html.lastIndexOf('</div>', endIdx);
        const stageClose = html.lastIndexOf('</div>', beforeEnd - 1);
        html = html.slice(0, startIdx + '<div class="fleet-stage" id="fleet-stage">\n'.length) + cardsHtml + '\n                </div>\n            </div>\n\n            ' + html.slice(endIdx);
        fs.writeFileSync(file, html, 'utf8');
        console.log('Successfully updated cards HTML in:', file);
    } else {
        console.log('Start or end index not found in:', file);
    }
});
