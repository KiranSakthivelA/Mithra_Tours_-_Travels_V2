const fs = require('fs');
const path = require('path');

const files = ['v2/holidays.html', 'holidays.html', 'deploy_ready/holidays.html'];

files.forEach(f => {
    const file = path.resolve(__dirname, f);
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // Replace Rajasthan unsplash URL with Assets/holiday_rajasthan.jpg
    html = html.replace(
        /<img src="https:\/\/images\.unsplash\.com\/photo-1477587458883-47145ed94245[^"]*" alt="Rajasthan">/,
        '<img src="Assets/holiday_rajasthan.jpg" alt="Rajasthan">'
    );

    // Replace Ooty unsplash URL with Assets/holiday_ooty.jpg
    html = html.replace(
        /<img src="https:\/\/images\.unsplash\.com\/photo-1590077428593-a55bb07c4665[^"]*" alt="Ooty">/,
        '<img src="Assets/holiday_ooty.jpg" alt="Ooty">'
    );

    // Replace Singapore unsplash URL with Assets/holiday_singapore.jpg
    html = html.replace(
        /<img src="https:\/\/images\.unsplash\.com\/photo-1565967511849-76a60a516170[^"]*" alt="Singapore">/,
        '<img src="Assets/holiday_singapore.jpg" alt="Singapore">'
    );

    fs.writeFileSync(file, html, 'utf8');
    console.log('Updated local holiday images in:', file);
});
