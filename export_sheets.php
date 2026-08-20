<?php
require_once 'api/config.php';

$sql = "SELECT * FROM inquiries ORDER BY id ASC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $sheet_data = json_encode([
            "secret_token" => "MITHRA_SECURE_AUTH_8842",
            "action" => "new_inquiry",
            "id" => $row['id'],
            "name" => $row['name'],
            "phone" => $row['phone'],
            "pickup" => $row['pickup'],
            "drop" => $row['drop_city'],
            "car" => $row['car_type'],
            "date" => $row['travel_date'] ? $row['travel_date'] : "Not Specified",
            "message" => $row['message'] ? $row['message'] : "",
            "status" => $row['status']
        ]);
        
        $ch = curl_init(GOOGLE_SHEET_WEBHOOK);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $sheet_data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $res = curl_exec($ch);
        curl_close($ch);
        echo "Exported ID " . $row['id'] . " - Response: " . $res . "\n";
    }
}
$conn->close();
?>
