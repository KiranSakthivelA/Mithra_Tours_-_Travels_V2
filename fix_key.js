const fs = require('fs');

const oldKey = 'AIzaSyDjVfB0v9WlUtOzuifbE1LztOoWqrzyeJg';
const newKey = 'AIzaSyASNUEksQK5biOinMXKh9rqfWZp9DYbroU';

const files = [
    'index.html',
    'services.html',
    'js/main.js',
    'js/booking.js'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes(oldKey)) {
            content = content.split(oldKey).join(newKey);
            fs.writeFileSync(file, content);
            console.log(`Updated ${file}`);
        }
    }
}
