const fs = require('fs');
const path = require('path');

const correctAboutSectionHtml = `<!-- ═══════════════════════════════════════════════
     5. ABOUT US (2-Column Story Grid)
════════════════════════════════════════════════ -->
<section class="section" id="about-us">
    <div class="container">
        <div class="story-grid">
            <div class="story-visual">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=85&w=800" alt="About Mithra Tours" class="story-main-img">
            </div>

            <div class="story-content">
                <span class="section-label">About Us</span>
                <h2 class="section-title">Travel Built on Trust. Journeys Built Around You.</h2>
                <p class="section-desc">
                    Mithra Tours &amp; Travels, established in 2024 and based in Kilpauk Garden, Chennai, is a travel and mobility solutions company with a strong focus on <strong>corporate vehicle rentals and ground transportation</strong>.
                </p>
                <p style="font-size:0.92rem; color:var(--text-body); line-height:1.75; margin-top:1rem;">
                    What began as a focused corporate cab service has grown into a broader travel partner, offering <strong>corporate mobility, airport transfers, outstation travel, business tours and travel &amp; holiday services</strong>. Our approach is simple — safe vehicles, verified drivers, professional operations and a consistent experience on every journey.
                </p>
                <div style="margin-top:2rem;">
                    <a href="about.html" class="btn btn-gold"><i class="fa-solid fa-circle-info"></i> Learn More About Us</a>
                </div>
            </div>
        </div>
    </div>
</section>`;

['v2/index.html', 'index.html', 'deploy_ready/index.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const regex = /<!--\s*═+\r?\n\s*5\.\s*ABOUT US[\s\S]*?<\/section>/;
    if (regex.test(html)) {
        html = html.replace(regex, correctAboutSectionHtml);
        fs.writeFileSync(file, html, 'utf8');
        console.log('Fixed About Us 2-column story-grid in:', file);
    }
});
