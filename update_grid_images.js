const fs = require('fs');
const path = require('path');

const gridImages = [
    { cat: 'sedan', img: 'Assets/car_sedan.png' },
    { cat: 'sedan', img: 'Assets/car_premium_sedan.jpg' },
    { cat: 'suv', img: 'Assets/car_suv.png' },
    { cat: 'suv', img: 'Assets/car_innova.png' },
    { cat: 'suv', img: 'Assets/car_fortuner.jpg' },
    { cat: 'luxury', img: 'Assets/car_luxury.jpg' },
    { cat: 'van', img: 'Assets/van_urbania.jpg' },
    { cat: 'van', img: 'Assets/van_tempo.jpg' },
    { cat: 'van', img: 'Assets/van_tourist.jpg' },
    { cat: 'bus', img: 'Assets/bus_minibus.jpg' },
    { cat: 'bus', img: 'Assets/bus_coach.jpg' }
];

['v2/our-fleet.html', 'our-fleet.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // Replace grid images in order
    let matchCount = 0;
    html = html.replace(/<div class="fleet-grid-img-wrap"><img src="[^"]*"/g, (match) => {
        if (matchCount < gridImages.length) {
            const res = `<div class="fleet-grid-img-wrap"><img src="${gridImages[matchCount].img}"`;
            matchCount++;
            return res;
        }
        return match;
    });

    fs.writeFileSync(file, html, 'utf8');
    console.log(`Updated ${matchCount} grid images in:`, file);
});
