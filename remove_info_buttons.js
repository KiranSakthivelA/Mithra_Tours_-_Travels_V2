const fs = require('fs');
const path = require('path');

const targetFiles = [
    'v2/our-fleet.html',
    'our-fleet.html',
    'deploy_ready/our-fleet.html',
    'v2/index.html',
    'index.html',
    'deploy_ready/index.html'
];

targetFiles.forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // Remove all card-btn-info elements
    html = html.replace(/\s*<button class="card-btn-info open-spec-modal"[^>]*>[\s\S]*?<\/button>/g, '');
    fs.writeFileSync(file, html, 'utf8');
    console.log('Removed info buttons from:', file);
});

// Also update CSS so card-actions is a clean 1fr 1fr 2-column grid
['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    css = css.replace(/\.card-actions\s*\{[\s\S]*?\}/, `.card-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.60rem;
    margin-top: 1rem;
    width: 100%;
}`);

    // Hide or clean card-btn-info if any left
    css += `\n.card-btn-info { display: none !important; }\n`;

    fs.writeFileSync(file, css, 'utf8');
    console.log('Updated card-actions CSS in:', file);
});
