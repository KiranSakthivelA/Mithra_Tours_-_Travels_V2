<?php
// api/get_cms_content.php
// Returns the current CMS content from data/content.json

require_once 'config.php';
handle_cors();

$doc_root = isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] : '';
$candidates = array_unique(array_filter([
    __DIR__ . '/../data/content.json',
    __DIR__ . '/../../public_html/data/content.json',
    __DIR__ . '/../../data/content.json',
    __DIR__ . '/../v2/data/content.json',
    $doc_root ? $doc_root . '/data/content.json' : null,
    $doc_root ? $doc_root . '/../public_html/data/content.json' : null
]));

foreach ($candidates as $file) {
    if (file_exists($file)) {
        $json = @file_get_contents($file);
        $decoded = @json_decode($json, true);
        if ($decoded) {
            echo json_encode([
                "success" => true,
                "data" => $decoded,
                "content" => $decoded
            ]);
            exit;
        }
    }
}

http_response_code(404);
echo json_encode(["success" => false, "message" => "Content file not found."]);
?>