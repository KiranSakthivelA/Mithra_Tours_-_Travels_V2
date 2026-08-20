const https = require('https');
https.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=Coimbatore&destinations=Madurai&key=AIzaSyDeF5ib931_KlS1IxrmVaVhGxR3xdg5tJs', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(data));
});
