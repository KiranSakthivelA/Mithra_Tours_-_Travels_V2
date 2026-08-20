const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\kiran\\.gemini\\antigravity-ide\\brain\\2224d00e-0026-4df7-9dd8-66b3fb3bd6b9\\hero_fleet_lineup_1787252997225.jpg';

['Assets/hero_fleet_lineup.jpg', 'v2/Assets/hero_fleet_lineup.jpg', 'deploy_ready/Assets/hero_fleet_lineup.jpg'].forEach(dest => {
    fs.copyFileSync(src, path.resolve(__dirname, dest));
    console.log('Copied hero lineup to:', dest);
});
