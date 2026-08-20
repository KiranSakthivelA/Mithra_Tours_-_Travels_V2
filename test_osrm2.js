const https = require('https');
https.get('https://router.project-osrm.org/route/v1/driving/76.9628425,11.0018115;78.1140983,9.9261153?overview=false', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(data));
});
