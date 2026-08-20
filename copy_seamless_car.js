const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\kiran\\.gemini\\antigravity-ide\\brain\\2224d00e-0026-4df7-9dd8-66b3fb3bd6b9\\hero_seamless_car_1787255042948.jpg';

const destinations = [
    'Assets/hero_car_seamless.jpg',
    'v2/Assets/hero_car_seamless.jpg',
    'deploy_ready/Assets/hero_car_seamless.jpg'
];

destinations.forEach(dst => {
    const target = path.resolve(__dirname, dst);
    fs.copyFileSync(src, target);
    console.log('Copied seamless car image to:', target);
});
