const fs = require('fs');
const path = require('path');

const dynamicRoadScript = `
<script>
// Pixel-Perfect Dynamic S-Curve Road Line Generator
function updateFlowRoad() {
    const wrapper = document.querySelector('.why-flow-wrapper');
    const svg = document.querySelector('.flow-road-svg');
    const icons = document.querySelectorAll('.flow-squircle-icon');
    if (!wrapper || !svg || icons.length < 4) return;

    if (window.innerWidth <= 1024) {
        svg.innerHTML = '';
        return;
    }

    const wRect = wrapper.getBoundingClientRect();
    const pts = Array.from(icons).map(icon => {
        const iRect = icon.getBoundingClientRect();
        return {
            x: Math.round(iRect.left - wRect.left + iRect.width / 2),
            y: Math.round(iRect.top - wRect.top + iRect.height / 2)
        };
    });

    // Build smooth cubic Bezier S-curve
    let d = \`M \${pts[0].x} \${pts[0].y}\`;
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const dx = (p1.x - p0.x) * 0.5;
        d += \` C \${p0.x + dx} \${p0.y}, \${p1.x - dx} \${p1.y}, \${p1.x} \${p1.y}\`;
    }

    // Add glowing node circles exactly on icon centers
    const circles = pts.map(p => 
        \`<circle cx="\${p.x}" cy="\${p.y}" r="6" fill="#F59E0B" opacity="0.45" />\`
    ).join('');

    svg.setAttribute('viewBox', \`0 0 \${Math.round(wRect.width)} \${Math.round(wRect.height)}\`);
    svg.innerHTML = \`
        <!-- Soft Glow Track Underlay -->
        <path d="\${d}" stroke="#FDE68A" stroke-width="7" stroke-linecap="round" opacity="0.28" />
        <!-- Dashed S-Road Line (Connected Center-to-Center) -->
        <path d="\${d}" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="6 8" opacity="0.35" stroke-linecap="round" />
        \${circles}
    \`;
}

window.addEventListener('DOMContentLoaded', () => {
    updateFlowRoad();
    setTimeout(updateFlowRoad, 200);
});
window.addEventListener('resize', updateFlowRoad);
window.addEventListener('load', updateFlowRoad);
</script>
`;

const files = ['v2/index.html', 'index.html', 'deploy_ready/index.html'];

files.forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // Remove old script if exists
    html = html.replace(/<script>\s*\/\/\s*Pixel-Perfect Dynamic S-Curve[\s\S]*?<\/script>/, '');

    // Insert before </body>
    html = html.replace('</body>', `${dynamicRoadScript}\n</body>`);

    // Ensure .flow-road-svg has no fixed viewBox that could stretch
    html = html.replace(/<svg class="flow-road-svg"[\s\S]*?<\/svg>/, '<svg class="flow-road-svg"></svg>');

    fs.writeFileSync(file, html, 'utf8');
    console.log('Injected dynamic S-curve road generator in:', file);
});
