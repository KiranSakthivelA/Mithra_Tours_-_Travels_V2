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

$updated = false;

// 1. Update in MySQL Database if available
if (isset($conn) && $conn && !mysqli_connect_errno()) {
    if ($admin_notes !== null) {
        $stmt = @$conn->prepare("UPDATE inquiries SET status = ?, admin_notes = ? WHERE id = ?");
        if ($stmt) {
            $stmt->bind_param("ssi", $status, $admin_notes, $id);
            $updated = $stmt->execute();
            $stmt->close();
        }
    } else {
        $stmt = @$conn->prepare("UPDATE inquiries SET status = ? WHERE id = ?");
        if ($stmt) {
            $stmt->bind_param("si", $status, $id);
            $updated = $stmt->execute();
            $stmt->close();
        }
    }
}

// 2. Update in JSON Backup
$json_file = __DIR__ . '/../data/inquiries.json';
if (file_exists($json_file)) {
    $inquiries = json_decode(file_get_contents($json_file), true) ?: [];
    foreach ($inquiries as &$inq) {
        if (intval($inq['id']) === $id) {
            $inq['status'] = $status;
            if ($admin_notes !== null) {
                $inq['admin_notes'] = $admin_notes;
            }
            $updated = true;
            break;
        }
    }
    @file_put_contents($json_file, json_encode($inquiries, JSON_PRETTY_PRINT));
}

echo json_encode(["success" => true, "message" => "Inquiry status updated successfully."]);
?>