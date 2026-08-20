const fs = require('fs');
const path = require('path');

const vehicleImages = {
    'sedan': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=85&w=900',
    'premium-sedan': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=85&w=900',
    'suv': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=85&w=900',
    'muv-crysta': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=85&w=900',
    'premium-muv': 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=85&w=900',
    'luxury': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=85&w=900',
    'urbania': 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=85&w=900',
    'tempo': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=85&w=900',
    'van': 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=85&w=900',
    'minibus': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=85&w=900',
    'bus': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=85&w=900'
};

const htmlFiles = [
    path.resolve(__dirname, 'v2/our-fleet.html'),
    path.resolve(__dirname, 'our-fleet.html')
];

htmlFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    Object.keys(vehicleImages).forEach(key => {
        const img = vehicleImages[key];
        const reg = new RegExp(`(<div class="coverflow-card"[^>]*data-vehicle="${key}"[^>]*>[\\s\\S]*?<img src=")[^"]*(")`, 'i');
        html = html.replace(reg, `$1${img}$2`);
    });

    fs.writeFileSync(file, html, 'utf8');
    console.log('Updated images in HTML:', file);
});
