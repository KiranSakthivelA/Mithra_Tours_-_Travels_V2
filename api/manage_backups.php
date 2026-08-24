<?php
// api/manage_backups.php
// Manages timestamped backups of website content data

require_once 'config.php';
handle_cors();

$action = isset($_GET['action']) ? $_GET['action'] : (isset($_POST['action']) ? $_POST['action'] : 'list');

$backup_dir = __DIR__ . '/../data/backups';
if (!file_exists($backup_dir)) {
    @mkdir($backup_dir, 0755, true);
}

$content_file = __DIR__ . '/../data/content.json';

switch ($action) {
    case 'list':
        $files = glob($backup_dir . '/content_*.json');
        $backups = [];
        if ($files) {
            rsort($files); // Newest first
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
        if (!file_exists($content_file)) {
            echo json_encode(['success' => false, 'message' => 'content.json not found']);
            exit;
        }
        $backup_filename = 'content_' . date('Y-m-d_H-i-s') . '.json';
        $target = $backup_dir . '/' . $backup_filename;
        if (@copy($content_file, $target)) {
            echo json_encode([
                'success' => true,
                'message' => 'Backup created successfully!',
                'filename' => $backup_filename,
                'created_at' => date('d M Y, h:i A')
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to create backup file']);
        }
        break;

    case 'download':
        $filename = isset($_GET['file']) ? basename($_GET['file']) : '';
        $filepath = $backup_dir . '/' . $filename;
        if (empty($filename) || !file_exists($filepath)) {
            // Fallback to current content.json
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
        $input = json_decode(file_get_contents('php://input'), true);
        $filename = isset($input['filename']) ? basename($input['filename']) : '';
        $filepath = $backup_dir . '/' . $filename;
        if (!file_exists($filepath)) {
            echo json_encode(['success' => false, 'message' => 'Backup file does not exist']);
            exit;
        }
        $content = file_get_contents($filepath);
        if (@file_put_contents($content_file, $content)) {
            // Also sync to v2 and deploy_ready
            @file_put_contents(__DIR__ . '/../v2/data/content.json', $content);
            @file_put_contents(__DIR__ . '/../deploy_ready/data/content.json', $content);
            echo json_encode(['success' => true, 'message' => 'Website content restored from backup ' . $filename]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to write restored content']);
        }
        break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
        break;
}
