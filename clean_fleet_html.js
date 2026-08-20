const fs = require('fs');
const path = require('path');

const targetFiles = [
    path.resolve(__dirname, 'v2/our-fleet.html'),
    path.resolve(__dirname, 'our-fleet.html')
];

targetFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove ambient container
    content = content.replace(/<div class="fleet-ambient-container">[\s\S]*?<!-- Dynamic Ambient[\s\S]*?<\/div>\s*<\/div>/gi, '');
    content = content.replace(/<div class="fleet-ambient-container">[\s\S]*?<div class="ambient-overlay"><\/div>\s*<\/div>/gi, '');

    // 2. Remove any remaining card-top-tag spans
    content = content.replace(/<span class="card-top-tag">[\s\S]*?<\/span>/gi, '');

    fs.writeFileSync(file, content, 'utf8');
    console.log('Cleaned HTML file:', file);
});
