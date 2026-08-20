const fs = require('fs');
const path = require('path');

const jsFiles = [
    path.resolve(__dirname, 'v2/js/fleet-showcase.js'),
    path.resolve(__dirname, 'js/fleet-showcase.js')
];

jsFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let js = fs.readFileSync(file, 'utf8');

    // Replace updateCoverflow logic with explicit const total = visibleCards.length;
    const startIdx = js.indexOf('function updateCoverflow() {');
    const endIdx = js.indexOf('// Update Dots & Counter', startIdx);
    if (startIdx !== -1 && endIdx !== -1) {
        const replacement = `function updateCoverflow() {
        const total = visibleCards.length;
        if (!total) return;

        currentIndex = (currentIndex % total + total) % total;

        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

        const spacingX = isMobile ? 180 : (isTablet ? 230 : 295);
        const rotateStep = isMobile ? 20 : 22;

        visibleCards.forEach((card, i) => {
            let diff = (i - currentIndex) % total;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            card.classList.remove('active', 'prev-1', 'next-1', 'prev-2', 'next-2', 'hidden-card');
            card.style.filter = 'none';

            if (diff === 0) {
                // 1. Center Active Card (100% Native Resolution, Zero Blur)
                card.classList.add('active');
                card.style.transform = 'translate3d(0, 0, 0)';
                card.style.zIndex = '30';
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.pointerEvents = 'auto';
            } else if (diff === -1) {
                // 2. Left Flanking Card
                card.classList.add('prev-1');
                card.style.transform = \`translate3d(-\${spacingX}px, 0, -40px) rotateY(\${rotateStep}deg) scale(0.88)\`;
                card.style.zIndex = '20';
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.pointerEvents = 'auto';
            } else if (diff === 1) {
                // 3. Right Flanking Card
                card.classList.add('next-1');
                card.style.transform = \`translate3d(\${spacingX}px, 0, -40px) rotateY(-\${rotateStep}deg) scale(0.88)\`;
                card.style.zIndex = '20';
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.pointerEvents = 'auto';
            } else if (diff === -2) {
                // 4. Far Left Card
                card.classList.add('prev-2');
                card.style.transform = \`translate3d(-\${spacingX * 1.75}px, 0, -100px) rotateY(\${rotateStep * 1.3}deg) scale(0.76)\`;
                card.style.zIndex = '10';
                card.style.opacity = isMobile ? '0' : '1';
                card.style.visibility = isMobile ? 'hidden' : 'visible';
                card.style.pointerEvents = isMobile ? 'none' : 'auto';
            } else if (diff === 2) {
                // 5. Far Right Card
                card.classList.add('next-2');
                card.style.transform = \`translate3d(\${spacingX * 1.75}px, 0, -100px) rotateY(-\${rotateStep * 1.3}deg) scale(0.76)\`;
                card.style.zIndex = '10';
                card.style.opacity = isMobile ? '0' : '1';
                card.style.visibility = isMobile ? 'hidden' : 'visible';
                card.style.pointerEvents = isMobile ? 'none' : 'auto';
            } else {
                // Rear / Offscreen Cards
                card.classList.add('hidden-card');
                const sign = diff > 0 ? 1 : -1;
                card.style.transform = \`translate3d(\${sign * spacingX * 2.4}px, 0, -220px) rotateY(\${-sign * 40}deg) scale(0.6)\`;
                card.style.zIndex = '1';
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
                card.style.pointerEvents = 'none';
            }
        });

        `;
        js = js.slice(0, startIdx) + replacement + js.slice(endIdx);
        fs.writeFileSync(file, js, 'utf8');
        console.log('Successfully fixed total in updateCoverflow in:', file);
    }
});
