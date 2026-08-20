const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace old phone number (no spaces)
    content = content.replace(/9629245533/g, '9629245533');
    
    // Replace old phone number (with spaces)
    content = content.replace(/96292 45533/g, '96292 45533');
    
    // Replace old address
    content = content.replace(/<p>Coimbatore, Tamil Nadu, India\.<\/p>/g, '<p>Mithra Tours & Travels<br>No.28, Srinivasanagar 2nd Street, Poonamallee, Chennai-600056.</p>');
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
}

function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (!fullPath.includes('.git') && !fullPath.includes('node_modules')) {
                walk(fullPath);
            }
        } else {
            if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.php')) {
                replaceInFile(fullPath);
            }
        }
    });
}

walk('.');
