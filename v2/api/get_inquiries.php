<?php
// api/get_inquiries.php
// Returns categorized inquiries for the Admin Panel with filtering and search

require_once 'config.php';
handle_cors();

// If database connection failed, return error
if (!$conn || mysqli_connect_errno()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed",
        "records" => [],
        "counts" => [
            "total" => 0,
            "today" => 0,
            "new" => 0,
            "contacted" => 0,
            "confirmed" => 0
        ]
    ]);
    exit();
}

// Extract filter parameters
$status_filter = isset($_GET['status']) ? trim($conn->real_escape_string($_GET['status'])) : '';
$type_filter = isset($_GET['form_type']) ? trim($conn->real_escape_string($_GET['form_type'])) : '';
$search_query = isset($_GET['search']) ? trim($conn->real_escape_string($_GET['search'])) : '';
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

// Build WHERE clause
$where_clauses = [];

if ($id) {
    $where_clauses[] = "id = $id";
} else {
    if (!empty($status_filter) && $status_filter !== 'all') {
        $where_clauses[] = "status = '$status_filter'";
    }
    if (!empty($type_filter) && $type_filter !== 'all') {
        $where_clauses[] = "form_type LIKE '%$type_filter%'";
    }
    if (!empty($search_query)) {
        $where_clauses[] = "(name LIKE '%$search_query%' OR phone LIKE '%$search_query%' OR email LIKE '%$search_query%' OR pickup LIKE '%$search_query%' OR drop_city LIKE '%$search_query%' OR package_name LIKE '%$search_query%' OR service LIKE '%$search_query%')";
    }
}

$where_sql = count($where_clauses) > 0 ? "WHERE " . implode(" AND ", $where_clauses) : "";

// Query records with total customer booking count
$sql = "SELECT i.*, 
    (SELECT COUNT(*) FROM inquiries i2 WHERE i2.phone = i.phone AND i2.phone != '') as customer_inquiry_count 
    FROM inquiries i 
    $where_sql 
    ORDER BY i.created_at DESC LIMIT 200";

$result = $conn->query($sql);

$records = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }
}

// Compute dynamic counts for admin badges
$counts = [
    "total" => 0,
    "today" => 0,
    "new" => 0,
    "contacted" => 0,
    "confirmed" => 0
];

$count_res = $conn->query("SELECT 
    COUNT(*) as total,
    SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) as today,
    SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) as new_leads,
    SUM(CASE WHEN status = 'Contacted' THEN 1 ELSE 0 END) as contacted,
    SUM(CASE WHEN status IN ('Confirmed', 'Booked') THEN 1 ELSE 0 END) as confirmed
    FROM inquiries");

if ($count_res && $row = $count_res->fetch_assoc()) {
    $counts['total'] = intval($row['total']);
    $counts['today'] = intval($row['today'] ?? 0);
    $counts['new'] = intval($row['new_leads'] ?? 0);
    $counts['contacted'] = intval($row['contacted'] ?? 0);
    $counts['confirmed'] = intval($row['confirmed'] ?? 0);
}

http_response_code(200);
echo json_encode([
    "success" => true,
    "records" => $records,
    "counts" => $counts
]);

$conn->close();
?>
