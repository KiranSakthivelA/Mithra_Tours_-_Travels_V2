<?php
// api/submit_feedback.php

// --- CORS: Only allow requests from the live site or local dev ---
$allowed_origins = [

    'https://previewsite.page.gd',
    'http://previewsite.page.gd',
    'http://localhost',
    'http://localhost:8080',
    'http://127.0.0.1',
    'https://mithratoursandtravels.in',
    'https://www.mithratoursandtravels.in'
];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? rtrim($_SERVER['HTTP_ORIGIN'], '/') : '';
if ($origin === '' || in_array($origin, $allowed_origins)) {
    if ($origin !== '') {
        header("Access-Control-Allow-Origin: $origin");
    }
} else {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden: Origin not allowed.']);
    exit;
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

require_once 'config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['message']) || !isset($data['rating'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$name = $conn->real_escape_string($data['name']);
$message = $conn->real_escape_string($data['message']);
$rating = (int) $data['rating'];

$sql = "INSERT INTO feedbacks (user_name, rating, message) VALUES ('$name', $rating, '$message')";

if ($conn->query($sql) === TRUE) {
    http_response_code(201);
    echo json_encode(['success' => true, 'id' => $conn->insert_id]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $conn->error]);
}

$conn->close();
?>
