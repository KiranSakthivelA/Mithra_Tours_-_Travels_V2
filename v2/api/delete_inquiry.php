<?php
// api/delete_inquiry.php
// Deletes an inquiry from the database

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

if (!$conn || mysqli_connect_errno()) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection error."]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM inquiries WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Inquiry record deleted successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to delete inquiry. Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
