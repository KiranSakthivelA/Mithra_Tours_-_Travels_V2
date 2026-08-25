<?php
// api/save_cms_content.php
// Validates and saves updated CMS data to content.json with multi-path sync and auto-backup

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

$formatted_json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

// Target candidate directories to synchronize content across main domain and subdomain
$doc_root = isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] : '';
$data_dirs = array_unique(array_filter([
    __DIR__ . '/../data',
    __DIR__ . '/../../public_html/data',
    __DIR__ . '/../../data',
    __DIR__ . '/../v2/data',
    __DIR__ . '/../deploy_ready/data',
    $doc_root ? $doc_root . '/data' : null,
    $doc_root ? $doc_root . '/../public_html/data' : null
]));

$saved_any = false;

foreach ($data_dirs as $dir) {
    if (!file_exists($dir)) {
        @mkdir($dir, 0777, true);
    }
    
    $backup_dir = $dir . '/backups';
    if (!file_exists($backup_dir)) {
        @mkdir($backup_dir, 0777, true);
    }
    
    $target_file = $dir . '/content.json';
    
    if (file_exists($target_file)) {
        $backup_file = $backup_dir . '/content_' . date('Y-m-d_H-i-s') . '.json';
        @copy($target_file, $backup_file);
    }
    
    if (@file_put_contents($target_file, $formatted_json)) {
        $saved_any = true;
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
    echo json_encode(["success" => false, "message" => "Failed to write content file. Please verify folder permissions."]);
}
?>