<?php
// api/delete_inquiry.php
// Deletes an inquiry from the database & JSON storage

require_once 'config.php';
handle_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed. Use POST."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !is_array($data)) {
    $data = $_POST;
}

$id = isset($data['id']) ? intval($data['id']) : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid Inquiry ID."]);
    exit;
}

// 1. Delete from MySQL Database if available
if (isset($conn) && $conn && !mysqli_connect_errno()) {
    $stmt = @$conn->prepare("DELETE FROM inquiries WHERE id = ?");
    if ($stmt) {
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();
    }
}

// 2. Delete from JSON Storage
$json_file = __DIR__ . '/../data/inquiries.json';
if (file_exists($json_file)) {
    $inquiries = json_decode(file_get_contents($json_file), true) ?: [];
    $filtered = array_values(array_filter($inquiries, function($inq) use ($id) {
        return intval($inq['id']) !== $id;
    }));
    @file_put_contents($json_file, json_encode($filtered, JSON_PRETTY_PRINT));
}

echo json_encode(["success" => true, "message" => "Inquiry record deleted successfully."]);
?>