const https = require('https');
https.get('https://maps.googleapis.com/maps/api/directions/json?origin=Coimbatore&destination=Madurai&key=AIzaSyDeF5ib931_KlS1IxrmVaVhGxR3xdg5tJs', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(data));
});
