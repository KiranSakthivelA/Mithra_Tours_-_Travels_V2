<?php
$webhookUrl = 'https://script.google.com/macros/s/AKfycbzha4mUTcewu_h6yjQzDRRvbzYoa67lH4fqxSh-9NE7YrvzhtkaeGnh4ma74TaUxm2z/exec';

$sheet_data = json_encode([
    "secret_token" => "KPS_SECURE_AUTH_8842",
    "action" => "new_inquiry",
    "id" => 9999,
    "name" => "PHP Test",
    "phone" => "0000000000",
    "pickup" => "Test",
    "drop" => "Test",
    "car" => "Test",
    "date" => "Test",
    "message" => "Test",
    "status" => "New"
]);

$ch = curl_init($webhookUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $sheet_data);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$res = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Code: " . $httpcode . "\n";
echo "Response: " . substr($res, 0, 500) . "\n";
?>
