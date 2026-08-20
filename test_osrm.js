const https = require('https');
https.get('https://router.project-osrm.org/route/v1/driving/76.9558,11.0168;78.1198,9.9252?overview=false', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(data));
});
