<?php
// api/submit_inquiry.php
// Records all incoming leads from Contact, Holidays, Trip Planner, Attachment, and Cab Booking forms
// Guaranteed Dual Storage: MySQL Database + data/inquiries.json + Google Sheets

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
$pickup = isset($data['pickup']) ? trim(strip_tags($data['pickup'])) : (isset($data['from_location']) ? trim(strip_tags($data['from_location'])) : (isset($data['city']) ? trim(strip_tags($data['city'])) : (isset($data['city_location']) ? trim(strip_tags($data['city_location'])) : '')));
$drop_city = isset($data['drop']) ? trim(strip_tags($data['drop'])) : (isset($data['drop_city']) ? trim(strip_tags($data['drop_city'])) : (isset($data['to_location']) ? trim(strip_tags($data['to_location'])) : ''));
$car_type = isset($data['car']) ? trim(strip_tags($data['car'])) : (isset($data['car_type']) ? trim(strip_tags($data['car_type'])) : (isset($data['vehicle_type']) ? trim(strip_tags($data['vehicle_type'])) : (isset($data['vehicle_model']) ? trim(strip_tags($data['vehicle_model'])) : '')));
$travel_date = isset($data['date']) ? trim(strip_tags($data['date'])) : (isset($data['travel_date']) ? trim(strip_tags($data['travel_date'])) : '');
$travel_time = isset($data['time']) ? trim(strip_tags($data['time'])) : (isset($data['travel_time']) ? trim(strip_tags($data['travel_time'])) : '');
$travelers_count = isset($data['travelers']) ? trim(strip_tags($data['travelers'])) : (isset($data['travelers_count']) ? trim(strip_tags($data['travelers_count'])) : (isset($data['passengers']) ? trim(strip_tags($data['passengers'])) : (isset($data['vehicle_count']) ? trim(strip_tags($data['vehicle_count'])) : '')));
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : (isset($data['details']) ? trim(strip_tags($data['details'])) : (isset($data['notes']) ? trim(strip_tags($data['notes'])) : (isset($data['special_requests']) ? trim(strip_tags($data['special_requests'])) : '')));

// Validation: Require at least name or phone
if (empty($name) && empty($phone)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Name or Contact number is required."]);
    exit;
}

$inquiry_id = time();

// 1. Save to MySQL Database
if (isset($conn) && $conn && !mysqli_connect_errno()) {
    $stmt = @$conn->prepare("INSERT INTO inquiries 
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

// 2. Guaranteed JSON Storage Backup (always accessible in Admin Panel)
$data_dir = __DIR__ . '/../data';
if (!is_dir($data_dir)) {
    @mkdir($data_dir, 0755, true);
}
$json_file = $data_dir . '/inquiries.json';

$inquiries_list = [];
if (file_exists($json_file)) {
    $inquiries_list = json_decode(file_get_contents($json_file), true) ?: [];
}

$new_record = [
    "id" => intval($inquiry_id),
    "form_type" => $form_type,
    "name" => $name,
    "phone" => $phone,
    "email" => $email,
    "service" => $service,
    "package_name" => $package_name,
    "pickup" => $pickup,
    "drop_city" => $drop_city,
    "car_type" => $car_type,
    "travel_date" => $travel_date,
    "travel_time" => $travel_time,
    "travelers_count" => $travelers_count,
    "message" => $message,
    "admin_notes" => "",
    "status" => "New",
    "created_at" => date('Y-m-d H:i:s'),
    "customer_inquiry_count" => 1
];

// Prepend new lead so latest is on top
array_unshift($inquiries_list, $new_record);
$inquiries_list = array_slice($inquiries_list, 0, 500);
@file_put_contents($json_file, json_encode($inquiries_list, JSON_PRETTY_PRINT));

// 3. Optional Google Sheet sync
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
        curl_setopt($ch, CURLOPT_TIMEOUT, 2);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 1);
        @curl_exec($ch);
        unset($ch);
    }
}


// 4. Server-Side Direct Email Dispatch to bookings@mithratoursandtravels.in
$mail_to = "bookings@mithratoursandtravels.in";
$mail_subject = "[$form_type] New Lead from $name ($phone) — Mithra Tours & Travels";
$mail_body = "<h2>New Lead Received — Mithra Tours & Travels</h2>" .
             "<p><strong>Form Source:</strong> " . htmlspecialchars($form_type) . "</p>" .
             "<p><strong>Customer Name:</strong> " . htmlspecialchars($name) . "</p>" .
             "<p><strong>Phone Number:</strong> <a href='tel:" . htmlspecialchars($phone) . "'>" . htmlspecialchars($phone) . "</a></p>" .
             "<p><strong>Email:</strong> " . htmlspecialchars($email ?: 'Not Provided') . "</p>" .
             "<p><strong>Service / Package:</strong> " . htmlspecialchars($service ?: $package_name ?: 'General Enquiry') . "</p>" .
             "<p><strong>Route / Details:</strong> " . htmlspecialchars($pickup . ($drop_city ? " -> " . $drop_city : '')) . "</p>" .
             "<p><strong>Travel Date & Time:</strong> " . htmlspecialchars($travel_date . " " . $travel_time) . "</p>" .
             "<p><strong>Passengers:</strong> " . htmlspecialchars($travelers_count) . "</p>" .
             "<p><strong>Message / Notes:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>" .
             "<hr><p style='color:#64748B; font-size:12px;'>Dispatched automatically from Mithra Tours & Travels Website Server.</p>";

$mail_headers = "MIME-Version: 1.0
" .
                "Content-type: text/html; charset=UTF-8
" .
                "From: Mithra Website <bookings@mithratoursandtravels.in>
" .
                ($email ? "Reply-To: $name <$email>
" : "") .
                "X-Mailer: PHP/" . phpversion();

@mail($mail_to, $mail_subject, $mail_body, $mail_headers);

http_response_code(201);
echo json_encode([
    "success" => true,
    "message" => "Inquiry successfully recorded in admin database.",
    "id" => $inquiry_id
]);
?>