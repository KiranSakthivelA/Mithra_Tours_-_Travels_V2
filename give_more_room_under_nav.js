const fs = require('fs');
const path = require('path');

['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    // Update section padding to 118px 0 80px
    css = css.replace(/padding:\s*92px\s*0\s*80px;/, 'padding: 118px 0 80px;');
    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated room between navbar and badge in:', file);
});
