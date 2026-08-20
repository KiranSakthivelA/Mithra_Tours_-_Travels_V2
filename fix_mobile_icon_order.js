const fs = require('fs');
const path = require('path');

['v2/css/brand.css', 'css/brand.css', 'deploy_ready/css/brand.css'].forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let css = fs.readFileSync(file, 'utf8');

    // Add order: -1 for mobile icon consistency
    css = css.replace(
        /\.flow-node-item \.flow-squircle-icon\s*\{\s*align-self:\s*flex-start\s*!important;\s*\}/,
        `.flow-node-item .flow-squircle-icon {
        align-self: flex-start !important;
        order: -1 !important;
    }`
    );

    fs.writeFileSync(file, css, 'utf8');
});
