const fs = require('fs');
const path = require('path');

const roadmapHtml = `<!-- ═══════════════════════════════════════════════
     4. WHY MITHRA (Zig-Zag Roadmap Timeline)
════════════════════════════════════════════════ -->
<section class="section section-light why-roadmap-section" id="why-mithra">
    <div class="container">
        <div class="section-header center">
            <span class="section-label center">Why Choose Us</span>
            <h2 class="section-title center">Why Mithra Tours & Travels</h2>
            <p class="section-desc center">One Vendor, Every Need · Consistency You Can Verify · Safety First · On-Time, Every Time.</p>
        </div>

        <div class="why-roadmap-wrapper">
            <!-- Central Horizontal Road Track -->
            <div class="roadmap-track-line"></div>

            <div class="roadmap-grid">
                <!-- Step 01: Top (Light Squircle) -->
                <div class="roadmap-item pos-top">
                    <div class="roadmap-card">
                        <div class="roadmap-card-header">
                            <div class="roadmap-icon-squircle style-light">
                                <i class="fa-solid fa-layer-group"></i>
                            </div>
                            <span class="roadmap-step-badge">Step 01</span>
                        </div>
                        <h3>One Vendor, Every Need</h3>
                        <p>From daily corporate cabs to flights, hotels, or visas — we cover the full travel requirement so clients avoid managing multiple vendors.</p>
                    </div>
                    <div class="roadmap-stem"></div>
                    <div class="roadmap-node-point"></div>
                </div>

                <!-- Step 02: Bottom (Vivid Gold Squircle) -->
                <div class="roadmap-item pos-bottom">
                    <div class="roadmap-node-point"></div>
                    <div class="roadmap-stem"></div>
                    <div class="roadmap-card">
                        <div class="roadmap-card-header">
                            <div class="roadmap-icon-squircle style-vivid">
                                <i class="fa-solid fa-shield-halved"></i>
                            </div>
                            <span class="roadmap-step-badge">Step 02</span>
                        </div>
                        <h3>Consistency You Can Verify</h3>
                        <p>Every vehicle in our network operates under the same documented standard: verified drivers, vehicle hygiene, and guest satisfaction.</p>
                    </div>
                </div>

                <!-- Step 03: Top (Light Squircle) -->
                <div class="roadmap-item pos-top">
                    <div class="roadmap-card">
                        <div class="roadmap-card-header">
                            <div class="roadmap-icon-squircle style-light">
                                <i class="fa-solid fa-lock"></i>
                            </div>
                            <span class="roadmap-step-badge">Step 03</span>
                        </div>
                        <h3>Safety First</h3>
                        <p>Verified drivers, speed governance, and strictly maintained vehicles aren't a claim — they're an enforced standard across our entire fleet.</p>
                    </div>
                    <div class="roadmap-stem"></div>
                    <div class="roadmap-node-point"></div>
                </div>

                <!-- Step 04: Bottom (Vivid Gold Squircle) -->
                <div class="roadmap-item pos-bottom">
                    <div class="roadmap-node-point"></div>
                    <div class="roadmap-stem"></div>
                    <div class="roadmap-card">
                        <div class="roadmap-card-header">
                            <div class="roadmap-icon-squircle style-vivid">
                                <i class="fa-solid fa-clock"></i>
                            </div>
                            <span class="roadmap-step-badge">Step 04</span>
                        </div>
                        <h3>On-Time, Every Time</h3>
                        <p>We arrange vehicles punctually without exception — because a late pickup compromises every other part of the corporate travel experience.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;

const files = ['v2/index.html', 'index.html', 'deploy_ready/index.html'];

files.forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const regex = /<!--\s*═+\r?\n\s*4\.\s*WHY MITHRA[\s\S]*?<\/section>/;
    if (regex.test(html)) {
        html = html.replace(regex, roadmapHtml);
        fs.writeFileSync(file, html, 'utf8');
        console.log('Updated Why Choose Us section with Zig-Zag Roadmap in:', file);
    } else {
        console.log('Could not find Why Mithra section regex in:', file);
    }
});
