<?php
// api/update_status.php
// Updates the status and internal staff notes of an inquiry

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
$status = isset($data['status']) ? trim(strip_tags($data['status'])) : '';
$admin_notes = isset($data['admin_notes']) ? trim(strip_tags($data['admin_notes'])) : null;

if ($id <= 0 || empty($status)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Valid Inquiry ID and Status are required."]);
    exit;
}

if (!$conn || mysqli_connect_errno()) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection error."]);
    exit;
}

if ($admin_notes !== null) {
    $stmt = $conn->prepare("UPDATE inquiries SET status = ?, admin_notes = ? WHERE id = ?");
    $stmt->bind_param("ssi", $status, $admin_notes, $id);
} else {
    $stmt = $conn->prepare("UPDATE inquiries SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $status, $id);
}

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Inquiry status updated successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to update status. Error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
