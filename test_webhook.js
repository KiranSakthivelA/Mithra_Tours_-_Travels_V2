const webhookUrl = 'https://script.google.com/macros/s/AKfycbyUgIeuH-gOSVE3whpbG8l6zCHteY2-Vp5541nNnIxdoDcWBTgDUdtmQgLx6jF_zkqyaw/exec';

async function test() {
    const sheetData = {
        "secret_token": "MITHRA_SECURE_AUTH_8842",
        "action": "new_inquiry",
        "id": 9999,
        "name": "API Test",
        "phone": "0000000000",
        "pickup": "Test",
        "drop": "Test",
        "car": "Test",
        "date": "Test",
        "message": "Test",
        "status": "New"
    };
    
    console.log("Sending test POST request...");
    const postRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData),
        redirect: 'follow'
    });
    
    console.log("Status code:", postRes.status);
    console.log("Redirected:", postRes.redirected);
    const text = await postRes.text();
    console.log("Response:", text.substring(0, 500));
}
test();
