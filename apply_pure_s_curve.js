const fs = require('fs');
const path = require('path');

// Pure mathematical Serpentine S-Curve with dy/dx = 0 horizontal tangents at crests and troughs
const pureSCurveSvg = `<svg class="flow-road-svg" viewBox="0 0 1200 380" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Soft Glow S-Curve Underlay -->
                <path d="M 20 70 C 180 70, 180 290, 350 290 C 520 290, 520 70, 660 70 C 830 70, 830 290, 970 290 C 1050 290, 1100 290, 1180 290" 
                      stroke="#FDE68A" stroke-width="7" stroke-linecap="round" opacity="0.25" />
                <!-- Pure Dashed S-Road Line -->
                <path d="M 20 70 C 180 70, 180 290, 350 290 C 520 290, 520 70, 660 70 C 830 70, 830 290, 970 290 C 1050 290, 1100 290, 1180 290" 
                      stroke="#F59E0B" stroke-width="2.4" stroke-dasharray="7 9" opacity="0.30" stroke-linecap="round" />
                
                <!-- S-Curve Milestone Nodes -->
                <circle cx="50" cy="70" r="5" fill="#F59E0B" opacity="0.35" />
                <circle cx="350" cy="290" r="5" fill="#F59E0B" opacity="0.35" />
                <circle cx="660" cy="70" r="5" fill="#F59E0B" opacity="0.35" />
                <circle cx="970" cy="290" r="5" fill="#F59E0B" opacity="0.35" />
            </svg>`;

// Update HTML
['v2/index.html', 'index.html', 'deploy_ready/index.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const svgRegex = /<svg class="flow-road-svg"[\s\S]*?<\/svg>/;
    if (svgRegex.test(html)) {
        html = html.replace(svgRegex, pureSCurveSvg);
        fs.writeFileSync(file, html, 'utf8');
        console.log('Updated pure S-curve SVG in:', file);
    }
});
