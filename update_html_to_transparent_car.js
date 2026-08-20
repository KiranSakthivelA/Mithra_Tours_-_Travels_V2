const fs = require('fs');
const path = require('path');

['v2/index.html', 'index.html', 'deploy_ready/index.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    html = html.replace(/Assets\/hero_car_seamless\.jpg/g, 'Assets/hero_car_transparent.png');
    fs.writeFileSync(file, html, 'utf8');
    console.log('Updated to transparent car PNG in:', file);
});
