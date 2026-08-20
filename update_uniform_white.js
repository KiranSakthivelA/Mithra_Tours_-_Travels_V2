const fs = require('fs');
const path = require('path');

const imageMap = [
    { old: /Assets\/car_sedan\.(?:png|jpg)(?:\?[^"]*)?/g, new: 'Assets/car_sedan.jpg?v=3' },
    { old: /Assets\/car_premium_sedan\.(?:png|jpg)(?:\?[^"]*)?/g, new: 'Assets/car_premium_sedan.jpg?v=3' },
    { old: /Assets\/car_suv\.(?:png|jpg)(?:\?[^"]*)?/g, new: 'Assets/car_suv.jpg?v=3' },
    { old: /Assets\/car_innova\.(?:png|jpg)(?:\?[^"]*)?/g, new: 'Assets/car_innova.jpg?v=3' },
    { old: /Assets\/car_fortuner\.(?:png|jpg)(?:\?[^"]*)?/g, new: 'Assets/car_fortuner.jpg?v=3' },
    { old: /Assets\/car_luxury\.(?:png|jpg)(?:\?[^"]*)?/g, new: 'Assets/car_luxury.jpg?v=3' },
    { old: /Assets\/van_urbania\.(?:png|jpg)(?:\?[^"]*)?/g, new: 'Assets/van_urbania.jpg?v=3' },
    { old: /Assets\/van_tempo\.(?:png|jpg)(?:\?[^"]*)?/g, new: 'Assets/van_tempo.jpg?v=3' },
    { old: /Assets\/van_tourist\.(?:png|jpg)(?:\?[^"]*)?/g, new: 'Assets/van_tourist.jpg?v=3' },
    { old: /Assets\/bus_minibus\.(?:png|jpg)(?:\?[^"]*)?/g, new: 'Assets/bus_minibus.jpg?v=3' },
    { old: /Assets\/bus_coach\.(?:png|jpg)(?:\?[^"]*)?/g, new: 'Assets/bus_coach.jpg?v=3' }
];

['v2/our-fleet.html', 'our-fleet.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    imageMap.forEach(item => {
        html = html.replace(item.old, item.new);
    });

    fs.writeFileSync(file, html, 'utf8');
    console.log('Successfully updated uniform pure white images with cache busting in:', file);
});
