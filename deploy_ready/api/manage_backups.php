<?php
// api/manage_backups.php
// Manages timestamped backups of website content data with robust multi-directory fallback

require_once 'config.php';
handle_cors();

function get_data_dir() {
    $doc_root = isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] : '';
    $candidates = array_unique(array_filter([
        __DIR__ . '/../data',
        __DIR__ . '/../../public_html/data',
        __DIR__ . '/../../data',
        $doc_root ? $doc_root . '/data' : null,
        $doc_root ? $doc_root . '/../public_html/data' : null
    ]));
    foreach ($candidates as $dir) {
        if (file_exists($dir)) return $dir;
    }
    $default = __DIR__ . '/../data';
    if (!file_exists($default)) {
        @mkdir($default, 0777, true);
    }
    return $default;
}

function get_backup_dir() {
    $data_dir = get_data_dir();
    $backup_dir = $data_dir . '/backups';
    if (!file_exists($backup_dir)) {
        @mkdir($backup_dir, 0777, true);
    }
    return $backup_dir;
}

function get_content_file() {
    $data_dir = get_data_dir();
    $content_file = $data_dir . '/content.json';
    if (!file_exists($content_file)) {
        $doc_root = isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] : '';
        $alt_files = array_unique(array_filter([
            __DIR__ . '/../../public_html/data/content.json',
            __DIR__ . '/../../data/content.json',
            $doc_root ? $doc_root . '/data/content.json' : null,
            $doc_root ? $doc_root . '/../public_html/data/content.json' : null
        ]));
        foreach ($alt_files as $f) {
            if (file_exists($f)) {
                @copy($f, $content_file);
                return $content_file;
            }
        }
        @file_put_contents($content_file, json_encode(["home" => []], JSON_PRETTY_PRINT));
    }
    return $content_file;
}

$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : 'list');

switch ($action) {
    case 'list':
        $backup_dir = get_backup_dir();
        $files = glob($backup_dir . '/content_*.json');
        $backups = [];
        if ($files) {
            rsort($files);
            foreach ($files as $f) {
                $filename = basename($f);
                $filesize = filesize($f);
                $mtime = filemtime($f);
                $backups[] = [
                    'filename' => $filename,
                    'filesize_kb' => round($filesize / 1024, 1),
                    'created_at' => date('Y-m-d H:i:s', $mtime),
                    'display_date' => date('d M Y, h:i A', $mtime)
                ];
            }
        }
        echo json_encode([
            'success' => true,
            'count' => count($backups),
            'backups' => $backups,
            'latest_file' => count($backups) > 0 ? $backups[0]['filename'] : null
        ]);
        break;

    case 'create':
        $content_file = get_content_file();
        $backup_dir = get_backup_dir();
        $backup_filename = 'content_' . date('Y-m-d_H-i-s') . '.json';
        $target = $backup_dir . '/' . $backup_filename;
        $content_data = @file_get_contents($content_file);
        if ($content_data === false || empty($content_data)) {
            $content_data = json_encode(["home" => []], JSON_PRETTY_PRINT);
        }
        
        $saved = @file_put_contents($target, $content_data);
        if (!$saved) {
            $fallback_dir = __DIR__ . '/../data/backups';
            @mkdir($fallback_dir, 0777, true);
            $target = $fallback_dir . '/' . $backup_filename;
            $saved = @file_put_contents($target, $content_data);
        }

        if ($saved) {
            echo json_encode([
                'success' => true,
                'message' => 'Backup created successfully!',
                'filename' => $backup_filename,
                'created_at' => date('d M Y, h:i A')
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to create backup file. Please verify directory permissions.']);
        }
        break;

    case 'download':
        $backup_dir = get_backup_dir();
        $content_file = get_content_file();
        $filename = isset($_GET['file']) ? basename($_GET['file']) : '';
        $filepath = $backup_dir . '/' . $filename;
        if (empty($filename) || !file_exists($filepath)) {
            $filepath = $content_file;
            $filename = 'MTT_Content_Backup_' . date('Y-m-d') . '.json';
        }
        if (file_exists($filepath)) {
            header('Content-Type: application/json');
            header('Content-Disposition: attachment; filename="' . $filename . '"');
            header('Content-Length: ' . filesize($filepath));
            readfile($filepath);
            exit;
        } else {
            http_response_code(404);
            echo "File not found.";
            exit;
        }
        break;

    case 'restore':
        $backup_dir = get_backup_dir();
        $content_file = get_content_file();
        $input = json_decode(file_get_contents('php://input'), true);
        $filename = isset($input['filename']) ? basename($input['filename']) : (isset($_GET['file']) ? basename($_GET['file']) : '');
        $filepath = $backup_dir . '/' . $filename;
        if (!file_exists($filepath)) {
            echo json_encode(['success' => false, 'message' => 'Backup file does not exist: ' . $filename]);
            exit;
        }
        $content = file_get_contents($filepath);
        if (@file_put_contents($content_file, $content)) {
            $doc_root = isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] : '';
            $alt_files = array_unique(array_filter([
                __DIR__ . '/../v2/data/content.json',
                __DIR__ . '/../deploy_ready/data/content.json',
                __DIR__ . '/../../public_html/data/content.json',
                $doc_root ? $doc_root . '/data/content.json' : null,
                $doc_root ? $doc_root . '/../public_html/data/content.json' : null
            ]));
            foreach ($alt_files as $af) {
                if (file_exists(dirname($af))) {
                    @file_put_contents($af, $content);
                }
            }
            echo json_encode(['success' => true, 'message' => 'Website content restored from backup ' . $filename]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to write restored content']);
        }
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action specified']);
        break;
}
?>