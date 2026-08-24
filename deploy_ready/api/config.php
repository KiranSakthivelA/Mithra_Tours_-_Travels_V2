<?php
// api/config.php
// Mithra Tours & Travels — Global Configuration & Database Connector

// Environment Detection
$server_name = isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'localhost');
$is_localhost = (php_sapi_name() === 'cli' || $server_name == 'localhost' || $server_name == '127.0.0.1' || strpos($server_name, '127.0.0.1') !== false || strpos($server_name, 'localhost') !== false);

if ($is_localhost) {
    // Local XAMPP / Dev Configuration
    $db_host = '127.0.0.1';
    $db_user = 'root';
    $db_pass = '';
    $db_name = 'mtt_travels_db';
} else {
    // LIVE MilesWeb Configuration
    $db_host = 'localhost'; 
    $db_user = 'mithrato1_dbadmin'; 
    $db_pass = 'MTT@dm!ndb@2026';   
    $db_name = 'mithrato1_mithradb'; 
}

// Create connection
mysqli_report(MYSQLI_REPORT_OFF);
$conn = mysqli_init();
if ($conn) {
    mysqli_options($conn, MYSQLI_OPT_CONNECT_TIMEOUT, 3);
    
    // Connect without DB first to ensure DB exists on localhost
    if ($is_localhost) {
        $temp_conn = @mysqli_connect($db_host, $db_user, $db_pass);
        if ($temp_conn) {
            @mysqli_query($temp_conn, "CREATE DATABASE IF NOT EXISTS `$db_name` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci");
            @mysqli_close($temp_conn);
        }
    }

    @mysqli_real_connect($conn, $db_host, $db_user, $db_pass, $db_name);
    if (!mysqli_connect_errno()) {
        $conn->set_charset("utf8mb4");
        
        // Auto-create / migrate inquiries table schema if needed
        @$conn->query("CREATE TABLE IF NOT EXISTS `inquiries` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `form_type` varchar(60) NOT NULL DEFAULT 'Website Enquiry',
            `name` varchar(150) NOT NULL,
            `phone` varchar(50) NOT NULL,
            `email` varchar(150) DEFAULT NULL,
            `service` varchar(150) DEFAULT NULL,
            `package_name` varchar(150) DEFAULT NULL,
            `pickup` varchar(255) DEFAULT NULL,
            `drop_city` varchar(255) DEFAULT NULL,
            `car_type` varchar(100) DEFAULT NULL,
            `travel_date` varchar(60) DEFAULT NULL,
            `travel_time` varchar(60) DEFAULT NULL,
            `travelers_count` varchar(50) DEFAULT NULL,
            `message` text DEFAULT NULL,
            `admin_notes` text DEFAULT NULL,
            `status` varchar(30) NOT NULL DEFAULT 'New',
            `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;");

        // Ensure missing columns exist in existing table
        $columns_needed = [
            'form_type' => "VARCHAR(60) NOT NULL DEFAULT 'Website Enquiry' AFTER id",
            'email' => "VARCHAR(150) DEFAULT NULL AFTER phone",
            'service' => "VARCHAR(150) DEFAULT NULL AFTER email",
            'package_name' => "VARCHAR(150) DEFAULT NULL AFTER service",
            'travel_time' => "VARCHAR(60) DEFAULT NULL AFTER travel_date",
            'travelers_count' => "VARCHAR(50) DEFAULT NULL AFTER travel_time",
            'admin_notes' => "TEXT DEFAULT NULL AFTER message"
        ];
        foreach ($columns_needed as $col => $def) {
            $check = @$conn->query("SHOW COLUMNS FROM `inquiries` LIKE '$col'");
            if ($check && $check->num_rows == 0) {
                @$conn->query("ALTER TABLE `inquiries` ADD COLUMN $col $def");
            }
        }
    } else {
        error_log("Database connection notice: " . mysqli_connect_error());
    }
}

// --- Admin Credentials (for Password Login) ---
define('ADMIN_USER', 'admin@mithratoursandtravels.in');
define('ADMIN_PASS', 'Mithra@2026!'); // Secure password for admin panel

// --- Google OAuth Configuration ---
define('OAUTH_CLIENT_ID', '633532151851-nkuc7ts3uj2th23ftjnfvmhptmoatsi2.apps.googleusercontent.com');
define('AUTHORIZED_ADMIN_EMAILS', [
    'contact@mithratoursandtravels.in',
    'bookings@mithratoursandtravels.in'
]);

// --- Google Sheets Automation URL ---
define('GOOGLE_SHEET_WEBHOOK', 'https://script.google.com/macros/s/AKfycbyUgIeuH-gOSVE3whpbG8l6zCHteY2-Vp5541nNnIxdoDcWBTgDUdtmQgLx6jF_zkqyaw/exec');

// --- Helper: CORS Header Management ---
function handle_cors() {
    $allowed_origins = [
        'https://admin.mithratoursandtravels.in',
        'http://admin.mithratoursandtravels.in',
        'https://mithratoursandtravels.in',
        'https://www.mithratoursandtravels.in',
        'http://localhost',
        'http://localhost:8080',
        'http://127.0.0.1',
        'http://127.0.0.1:5500',
        'http://127.0.0.1:8000',
        'https://previewsite.page.gd',
        'http://previewsite.page.gd'
    ];
    $origin = isset($_SERVER['HTTP_ORIGIN']) ? rtrim($_SERVER['HTTP_ORIGIN'], '/') : '';
    if ($origin === '' || in_array($origin, $allowed_origins) || strpos($origin, 'mithratoursandtravels.in') !== false) {
        if ($origin !== '') {
            header("Access-Control-Allow-Origin: $origin");
            header("Access-Control-Allow-Credentials: true");
        } else {
            header("Access-Control-Allow-Origin: *");
        }
    }
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}
?>
