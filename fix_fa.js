const fs = require('fs');
const path = require('path');

const files = [
    'index.html',
    'services.html',
    'routes.html',
    'our-fleet.html',
    'feedback.html'
];

const folders = ['.', 'deploy'];

for (const folder of folders) {
    for (const file of files) {
        const filePath = path.join(__dirname, folder, file);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            // Replace CSS CDN with JS CDN
            content = content.replace(
                /<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.4\.0\/css\/all\.min\.css">/g,
                '<script defer src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>'
            );
            fs.writeFileSync(filePath, content);
            console.log(`Updated ${filePath} to JS`);
        }
    }
}
