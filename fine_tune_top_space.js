const fs = require('fs');
const path = require('path');

['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    // Update section padding from 118px to 106px
    css = css.replace(/padding:\s*118px\s*0\s*80px;/, 'padding: 106px 0 80px;');
    fs.writeFileSync(file, css, 'utf8');
    console.log('Fine-tuned sweet spot top padding in:', file);
});
