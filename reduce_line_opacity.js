const fs = require('fs');
const path = require('path');

const subtleSvg = `<svg class="snake-road-svg" viewBox="0 0 1150 370" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Ultra-subtle dashed S-Road Line (Low Opacity) -->
                <path d="M 28 28 C 170 28, 170 190, 315 190 C 460 190, 460 28, 605 28 C 750 28, 750 190, 920 190" 
                      stroke="#D97706" stroke-width="1.75" stroke-dasharray="5 8" opacity="0.14" stroke-linecap="round" />
                
                <!-- Subtle Milestone Markers -->
                <circle cx="28" cy="28" r="4" fill="#D97706" opacity="0.18" />
                <circle cx="315" cy="190" r="4" fill="#D97706" opacity="0.18" />
                <circle cx="605" cy="28" r="4" fill="#D97706" opacity="0.18" />
                <circle cx="920" cy="190" r="4" fill="#D97706" opacity="0.18" />
            </svg>`;

// Update HTML files
['v2/index.html', 'index.html', 'deploy_ready/index.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    const svgRegex = /<svg class="snake-road-svg"[\s\S]*?<\/svg>/;
    if (svgRegex.test(html)) {
        html = html.replace(svgRegex, subtleSvg);
        fs.writeFileSync(file, html, 'utf8');
        console.log('Updated subtle S-curve SVG in:', file);
    }
});

// Update CSS files for mobile opacity
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    css = css.replace(/opacity:\s*0\.32;/g, 'opacity: 0.14;');
    css = css.replace(/opacity:\s*0\.35;/g, 'opacity: 0.14;');
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated mobile line opacity in:', file);
});
