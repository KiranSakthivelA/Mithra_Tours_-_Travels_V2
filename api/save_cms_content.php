<?php
// api/save_cms_content.php
// Validates and saves updated CMS data to content.json with auto-backup

require_once 'config.php';
handle_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed. Use POST."]);
    exit;
}

$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid JSON payload provided."]);
    exit;
}

// Ensure data directory and backups directory exist
$data_dirs = [
    __DIR__ . '/../data',
    __DIR__ . '/../v2/data',
    __DIR__ . '/../deploy_ready/data'
];

$saved_any = false;
$formatted_json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

foreach ($data_dirs as $dir) {
    if (file_exists(dirname($dir))) {
        if (!file_exists($dir)) {
            @mkdir($dir, 0755, true);
        }
        
        $backup_dir = $dir . '/backups';
        if (!file_exists($backup_dir)) {
            @mkdir($backup_dir, 0755, true);
        }
        
        $target_file = $dir . '/content.json';
        
        // Create backup of existing file if it exists
        if (file_exists($target_file)) {
            $backup_file = $backup_dir . '/content_' . date('Y-m-d_H-i-s') . '.json';
            @copy($target_file, $backup_file);
        }
        
        // Write new content
        if (@file_put_contents($target_file, $formatted_json)) {
            $saved_any = true;
        }
    }
}

if ($saved_any) {
    echo json_encode([
        "success" => true,
        "message" => "Content saved and published successfully! Live website updated.",
        "timestamp" => date('Y-m-d H:i:s')
    ]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to write content file. Please check folder permissions."]);
}
?>
