<?php
// api/get_cms_content.php
// Returns the current CMS content from data/content.json

require_once 'config.php';
handle_cors();

$content_file = __DIR__ . '/../data/content.json';
$v2_content_file = __DIR__ . '/../v2/data/content.json';

$file_to_read = file_exists($content_file) ? $content_file : (file_exists($v2_content_file) ? $v2_content_file : null);

if ($file_to_read && file_exists($file_to_read)) {
    $json = file_get_contents($file_to_read);
    $decoded = json_decode($json, true);
    if ($decoded) {
        echo json_encode(["success" => true, "data" => $decoded]);
        exit;
    }
}

// Fallback if file not found
http_response_code(404);
echo json_encode(["success" => false, "message" => "Content file not found."]);
?>
