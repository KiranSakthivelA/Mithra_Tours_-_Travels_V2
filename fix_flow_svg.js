const fs = require('fs');
const path = require('path');

// Adjusted SVG Path to drop cleanly from icons without entering text zones
const perfectedFlowSvg = `<svg class="flow-road-svg" viewBox="0 0 1200 380" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Soft Glow Flow Path -->
                <path d="M 60 85 C 60 220, 290 325, 335 325 C 375 325, 610 220, 675 85 C 685 220, 910 325, 955 325" 
                      stroke="#FDE68A" stroke-width="7" stroke-linecap="round" opacity="0.22" />
                <!-- Dashed S-Road Line -->
                <path d="M 60 85 C 60 220, 290 325, 335 325 C 375 325, 610 220, 675 85 C 685 220, 910 325, 955 325" 
                      stroke="#F59E0B" stroke-width="2.2" stroke-dasharray="6 8" opacity="0.28" stroke-linecap="round" />
                
                <!-- 4 Flow Node Points on Icons -->
                <circle cx="60" cy="85" r="5" fill="#F59E0B" opacity="0.35" />
                <circle cx="335" cy="325" r="5" fill="#F59E0B" opacity="0.35" />
                <circle cx="675" cy="85" r="5" fill="#F59E0B" opacity="0.35" />
                <circle cx="955" cy="325" r="5" fill="#F59E0B" opacity="0.35" />
            </svg>`;

['v2/index.html', 'index.html', 'deploy_ready/index.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const svgRegex = /<svg class="flow-road-svg"[\s\S]*?<\/svg>/;
    if (svgRegex.test(html)) {
        html = html.replace(svgRegex, perfectedFlowSvg);
        fs.writeFileSync(file, html, 'utf8');
        console.log('Updated flow SVG in:', file);
    }
});
