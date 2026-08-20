const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const pStart = html.indexOf('<!-- Transparent Pricing -->');
const cStart = html.indexOf('<!-- Wide Service Coverage -->');
const cEnd = html.indexOf('<!-- Journey Planner / Contact Section -->');

if (pStart !== -1 && cStart !== -1 && cEnd !== -1) {
    const pricingHTML = html.substring(pStart, cStart);
    const coverageHTML = html.substring(cStart, cEnd);

    const combined = `
    <!-- Transparent Pricing & Coverage -->
    <section id="pricing-and-coverage" class="pricing-section" style="padding: 4rem 10%; background-color: var(--site-bg);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 3rem; align-items: start;">
            
            <div id="pricing-wrapper">
                ${pricingHTML.replace('<section id="pricing" class="pricing-section">', '<div id="pricing">').replace('</section>', '</div>')}
            </div>

            <div id="coverage-wrapper" style="margin-top: 2rem;">
                ${coverageHTML.replace('<section id="coverage" class="wide-coverage-section reveal" style="margin-top:0;">', '<div id="coverage" class="reveal">').replace('</section>', '</div>')}
            </div>

        </div>
    </section>
    `;

    html = html.substring(0, pStart) + combined + html.substring(cEnd);
    fs.writeFileSync('index.html', html);
}
