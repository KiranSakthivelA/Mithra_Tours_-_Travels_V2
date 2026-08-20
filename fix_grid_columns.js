const fs = require('fs');
const path = require('path');

// 1. Fix CSS so .flow-steps-grid has default grid-template-columns: repeat(4, 1fr)
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    css = css.replace(
        /\.flow-steps-grid\s*\{\s*position:\s*relative;\s*z-index:\s*2;\s*display:\s*grid;\s*gap:\s*1\.5rem;\s*height:\s*100%;\s*\}/,
        `.flow-steps-grid {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    height: 100%;
}`
    );

    fs.writeFileSync(file, css, 'utf8');
    console.log('Fixed flow-steps-grid default columns in:', file);
});

// 2. Fix index.html to have cols-4
['v2/index.html', 'index.html', 'deploy_ready/index.html'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    html = html.replace('<div class="flow-steps-grid">', '<div class="flow-steps-grid cols-4">');

    fs.writeFileSync(file, html, 'utf8');
    console.log('Added cols-4 to:', file);
});
