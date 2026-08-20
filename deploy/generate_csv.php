<?php
require_once 'api/config.php';

$sql = "SELECT id, created_at, name, phone, pickup, drop_city, car_type, travel_date, message, status, price FROM inquiries ORDER BY id ASC";
$result = $conn->query($sql);

$fp = fopen('existing_bookings.csv', 'w');
// Header matching the Google Sheet columns
fputcsv($fp, ['ID', 'Submitted At', 'Name', 'Phone', 'Pickup', 'Drop', 'Car Type', 'Travel Date', 'Message', 'Status', 'Price']);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        fputcsv($fp, $row);
    }
}
fclose($fp);
$conn->close();
echo "CSV created successfully!";
?>
