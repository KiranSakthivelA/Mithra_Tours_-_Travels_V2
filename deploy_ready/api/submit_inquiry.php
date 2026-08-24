<?php
// api/submit_inquiry.php
// Records all incoming leads from Contact, Holidays, Trip Planner, Attachment, and Cab Booking forms

require_once 'config.php';
handle_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed. Use POST."]);
    exit;
}

// Get posted data (supports JSON and regular POST)
$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true);
if (!$data || !is_array($data)) {
    $data = $_POST;
}

// Extract fields with fallbacks
$form_type = isset($data['form_type']) ? trim(strip_tags($data['form_type'])) : 'Website Enquiry';
$name = isset($data['name']) ? trim(strip_tags($data['name'])) : (isset($data['owner_name']) ? trim(strip_tags($data['owner_name'])) : '');
$phone = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$email = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$service = isset($data['service']) ? trim(strip_tags($data['service'])) : (isset($data['vehicle_category']) ? trim(strip_tags($data['vehicle_category'])) : '');
$package_name = isset($data['package_name']) ? trim(strip_tags($data['package_name'])) : (isset($data['package']) ? trim(strip_tags($data['package'])) : '');
$pickup = isset($data['pickup']) ? trim(strip_tags($data['pickup'])) : (isset($data['from_location']) ? trim(strip_tags($data['from_location'])) : (isset($data['city']) ? trim(strip_tags($data['city'])) : ''));
$drop_city = isset($data['drop']) ? trim(strip_tags($data['drop'])) : (isset($data['drop_city']) ? trim(strip_tags($data['drop_city'])) : (isset($data['to_location']) ? trim(strip_tags($data['to_location'])) : ''));
$car_type = isset($data['car']) ? trim(strip_tags($data['car'])) : (isset($data['car_type']) ? trim(strip_tags($data['car_type'])) : (isset($data['vehicle_type']) ? trim(strip_tags($data['vehicle_type'])) : (isset($data['vehicle_model']) ? trim(strip_tags($data['vehicle_model'])) : '')));
$travel_date = isset($data['date']) ? trim(strip_tags($data['date'])) : (isset($data['travel_date']) ? trim(strip_tags($data['travel_date'])) : '');
$travel_time = isset($data['time']) ? trim(strip_tags($data['time'])) : (isset($data['travel_time']) ? trim(strip_tags($data['travel_time'])) : '');
$travelers_count = isset($data['travelers']) ? trim(strip_tags($data['travelers'])) : (isset($data['travelers_count']) ? trim(strip_tags($data['travelers_count'])) : (isset($data['passengers']) ? trim(strip_tags($data['passengers'])) : ''));
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : (isset($data['details']) ? trim(strip_tags($data['details'])) : (isset($data['notes']) ? trim(strip_tags($data['notes'])) : (isset($data['special_requests']) ? trim(strip_tags($data['special_requests'])) : '')));

// Validation: Require at least name or phone
if (empty($name) && empty($phone)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Name or Contact number is required."]);
    exit;
}

$inquiry_id = time(); // Fallback ID if DB is not active

if ($conn && !mysqli_connect_errno()) {
    $stmt = $conn->prepare("INSERT INTO inquiries 
        (form_type, name, phone, email, service, package_name, pickup, drop_city, car_type, travel_date, travel_time, travelers_count, message, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New')");
    
    if ($stmt) {
        $stmt->bind_param("sssssssssssss", 
            $form_type, $name, $phone, $email, $service, $package_name, 
            $pickup, $drop_city, $car_type, $travel_date, $travel_time, $travelers_count, $message
        );
        if ($stmt->execute()) {
            $inquiry_id = $stmt->insert_id;
        }
        $stmt->close();
    }
}

// Optional Google Sheet sync
if (defined('GOOGLE_SHEET_WEBHOOK') && GOOGLE_SHEET_WEBHOOK !== "") {
    $sheet_payload = json_encode([
        "secret_token" => "MITHRA_SECURE_AUTH_8842",
        "action" => "new_inquiry",
        "id" => $inquiry_id,
        "form_type" => $form_type,
        "name" => $name,
        "phone" => $phone,
        "email" => $email,
        "service" => $service,
        "package" => $package_name,
        "pickup" => $pickup,
        "drop" => $drop_city,
        "car" => $car_type,
        "date" => $travel_date,
        "time" => $travel_time,
        "travelers" => $travelers_count,
        "message" => $message,
        "status" => "New"
    ]);
    
    if (function_exists('curl_init')) {
        $ch = curl_init(GOOGLE_SHEET_WEBHOOK);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $sheet_payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_TIMEOUT, 4);
        @curl_exec($ch);
        unset($ch);
    }
}

http_response_code(201);
echo json_encode([
    "success" => true,
    "message" => "Inquiry successfully recorded in admin database.",
    "id" => $inquiry_id
]);
?>
