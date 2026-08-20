const https = require('https');
https.get('https://nominatim.openstreetmap.org/search?format=json&q=Madurai&limit=1', { headers: { 'User-Agent': 'test' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(data));
});
