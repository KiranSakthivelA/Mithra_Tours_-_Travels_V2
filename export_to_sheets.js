const webhookUrl = 'https://script.google.com/macros/s/AKfycbyUgIeuH-gOSVE3whpbG8l6zCHteY2-Vp5541nNnIxdoDcWBTgDUdtmQgLx6jF_zkqyaw/exec';

async function exportAll() {
    try {
        const res = await fetch('http://localhost:8080/api/get_inquiries.php');
        const data = await res.json();
        
        if (!data || !data.records) {
            console.log("No records found.");
            return;
        }

        const records = data.records;
        // Sort ascending so they appear in chronological order in the sheet
        records.sort((a, b) => a.id - b.id);
        
        console.log(`Found ${records.length} records. Exporting to Google Sheets...`);
        
        for (const req of records) {
            const sheetData = {
                "secret_token": "MITHRA_SECURE_AUTH_8842",
                "action": "new_inquiry",
                "id": req.id,
                "name": req.name,
                "phone": req.phone,
                "pickup": req.pickup,
                "drop": req.drop_city,
                "car": req.car_type,
                "date": req.travel_date ? req.travel_date : "Not Specified",
                "message": req.message ? req.message : "",
                "status": req.status
            };
            
            console.log(`Exporting ID: ${req.id}...`);
            const postRes = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sheetData)
            });
            const text = await postRes.text();
            console.log(`Response for ${req.id}:`, text);
        }
        
        console.log("Finished exporting all records!");
    } catch (e) {
        console.error("Export failed:", e);
    }
}

exportAll();
