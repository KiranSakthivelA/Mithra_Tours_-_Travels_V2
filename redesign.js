const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('<!-- Transparent Pricing & Coverage -->');
const end = html.indexOf('<!-- Journey Planner / Contact Section -->');

if (start !== -1 && end !== -1) {
    const newDesign = `
    <!-- Why Choose Us / Pricing & Features -->
    <section id="why-us" style="padding: 5rem 5%; background-color: #fdfaf6;">
        <div style="max-width: 1200px; margin: 0 auto;">
            <div class="section-header reveal" style="margin-bottom: 4rem;">
                <h2>Premium Travel, Fair Prices.</h2>
                <div class="header-line"></div>
                <p>No hidden charges. Just comfortable, reliable journeys across South India.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 3rem; align-items: stretch;">
                
                <!-- Pricing Card -->
                <div class="reveal" style="background: #ffffff; border-radius: 24px; padding: 3rem 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.04); border: 1px solid rgba(232, 160, 32, 0.1); position: relative; overflow: hidden;">
                    <div style="position: absolute; top: 0; right: 0; width: 150px; height: 150px; background: radial-gradient(circle, rgba(232,160,32,0.1) 0%, transparent 70%); border-radius: 50%; transform: translate(50%, -50%);"></div>
                    
                    <h3 style="font-size: 1.5rem; color: #1f2937; margin-bottom: 2rem; display: flex; align-items: center; gap: 10px;">
                        <div style="background: #E8A020; color: #fff; width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                            <i class="fa-solid fa-tags"></i>
                        </div>
                        Pricing at a Glance
                    </h3>

                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1.5rem;">
                        <li style="display: flex; flex-direction: column; gap: 0.5rem; padding-bottom: 1.5rem; border-bottom: 1px dashed #e5e7eb;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <strong style="color: #374151; font-size: 1.1rem;">Starting Rate</strong>
                                <span style="background: #fffbeb; color: #b45309; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.95rem; border: 1px solid #fde68a;">₹14 / km</span>
                            </div>
                            <span style="color: #6b7280; font-size: 0.9rem; line-height: 1.5;">Per-km rate for Sedan (one-way). Standard routes with zero hidden charges.</span>
                        </li>
                        <li style="display: flex; flex-direction: column; gap: 0.5rem; padding-bottom: 1.5rem; border-bottom: 1px dashed #e5e7eb;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <strong style="color: #374151; font-size: 1.1rem;">One-Way Journeys</strong>
                                <span style="background: #f3f4f6; color: #4b5563; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.95rem;">Min. 130 km</span>
                            </div>
                            <span style="color: #6b7280; font-size: 0.9rem; line-height: 1.5;">Pay only for the distance you travel. No return fare charged for one-way trips.</span>
                        </li>
                        <li style="display: flex; flex-direction: column; gap: 0.5rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <strong style="color: #374151; font-size: 1.1rem;">Round Trips</strong>
                                <span style="background: #f3f4f6; color: #4b5563; padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.95rem;">Min. 250 km/day</span>
                            </div>
                            <span style="color: #6b7280; font-size: 0.9rem; line-height: 1.5;">Economical daily rates for multi-day round trip journeys.</span>
                        </li>
                    </ul>
                </div>

                <!-- Features Card -->
                <div class="reveal delay-1" style="background: linear-gradient(145deg, #1f1a17 0%, #0d0a08 100%); border-radius: 24px; padding: 3rem 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.2); color: #fff; position: relative; overflow: hidden;">
                    <div style="position: absolute; bottom: 0; left: 0; width: 200px; height: 200px; background: radial-gradient(circle, rgba(232,160,32,0.15) 0%, transparent 70%); border-radius: 50%; transform: translate(-30%, 30%);"></div>

                    <h3 style="font-size: 1.5rem; color: #fff; margin-bottom: 2.5rem; display: flex; align-items: center; gap: 10px;">
                        <div style="background: rgba(232,160,32,0.2); color: #E8A020; width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                            <i class="fa-solid fa-map-location-dot"></i>
                        </div>
                        Built for South India
                    </h3>

                    <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2rem;">
                        <li style="display: flex; gap: 1rem; align-items: flex-start;">
                            <i class="fa-solid fa-circle-check" style="color: #E8A020; font-size: 1.2rem; margin-top: 3px;"></i>
                            <div>
                                <strong style="display: block; font-size: 1.1rem; margin-bottom: 0.3rem; color: #f3f4f6;">Deep Tamil Nadu Coverage</strong>
                                <span style="color: #9ca3af; font-size: 0.95rem; line-height: 1.6;">All major cities, districts and tourist spots — Coimbatore, Madurai, Chennai, Ooty, Kodaikanal and beyond.</span>
                            </div>
                        </li>
                        <li style="display: flex; gap: 1rem; align-items: flex-start;">
                            <i class="fa-solid fa-circle-check" style="color: #E8A020; font-size: 1.2rem; margin-top: 3px;"></i>
                            <div>
                                <strong style="display: block; font-size: 1.1rem; margin-bottom: 0.3rem; color: #f3f4f6;">Seamless Inter-State Travel</strong>
                                <span style="color: #9ca3af; font-size: 0.95rem; line-height: 1.6;">One-way, round trip, airport transfers and complete tour packages across Tamil Nadu, Kerala, Karnataka, Andhra and Telangana.</span>
                            </div>
                        </li>
                        <li style="display: flex; gap: 1rem; align-items: flex-start;">
                            <i class="fa-solid fa-circle-check" style="color: #E8A020; font-size: 1.2rem; margin-top: 3px;"></i>
                            <div>
                                <strong style="display: block; font-size: 1.1rem; margin-bottom: 0.3rem; color: #f3f4f6;">100+ Active Routes</strong>
                                <span style="color: #9ca3af; font-size: 0.95rem; line-height: 1.6;">Frequently travelled outstation routes available with upfront pricing — no negotiation needed.</span>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </section>

    `;
    
    // Add pagination to routes slider if missing
    let finalHtml = html.substring(0, start) + newDesign + html.substring(end);
    
    if (finalHtml.includes('<!-- Navigation -->\n            <div class="swiper-button-next"></div>\n            <div class="swiper-button-prev"></div>\n        </div>')) {
        finalHtml = finalHtml.replace('<!-- Navigation -->\n            <div class="swiper-button-next"></div>\n            <div class="swiper-button-prev"></div>\n        </div>', '<!-- Navigation -->\n            <div class="swiper-button-next"></div>\n            <div class="swiper-button-prev"></div>\n            <div class="swiper-pagination"></div>\n        </div>');
    } else {
        // Fallback replacement for routes pagination
        finalHtml = finalHtml.replace(/<div class="swiper-button-prev"><\/div>\s*<\/div>/g, '<div class="swiper-button-prev"></div>\n            <div class="swiper-pagination"></div>\n        </div>');
    }

    fs.writeFileSync('index.html', finalHtml);
    console.log('Successfully redesigned section');
}

// Also fix main.js to add pagination to routesSwiper
let js = fs.readFileSync('js/main.js', 'utf8');
if (js.includes('navigation: { nextEl: \'.routesSwiper .swiper-button-next\', prevEl: \'.routesSwiper .swiper-button-prev\' },') && !js.includes('pagination: { el: \'.routesSwiper .swiper-pagination\'')) {
    js = js.replace('navigation: { nextEl: \'.routesSwiper .swiper-button-next\', prevEl: \'.routesSwiper .swiper-button-prev\' },', 'navigation: { nextEl: \'.routesSwiper .swiper-button-next\', prevEl: \'.routesSwiper .swiper-button-prev\' },\n                pagination: { el: \'.routesSwiper .swiper-pagination\', clickable: true },');
    fs.writeFileSync('js/main.js', js);
}
