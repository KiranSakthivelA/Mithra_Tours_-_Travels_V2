<?php
// api/get_inquiries.php
// Returns categorized inquiries for the Admin Panel with filtering, search, and JSON fallback

require_once 'config.php';
handle_cors();

// Extract filter parameters
$status_filter = isset($_GET['status']) ? trim($_GET['status']) : '';
$type_filter = isset($_GET['form_type']) ? trim($_GET['form_type']) : '';
$search_query = isset($_GET['search']) ? trim($_GET['search']) : '';
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

$records = [];
$counts = [
    "total" => 0,
    "today" => 0,
    "new" => 0,
    "contacted" => 0,
    "confirmed" => 0
];

// Attempt Database Query if available
$db_available = isset($conn) && $conn && !mysqli_connect_errno();

if ($db_available) {
    $where_clauses = [];
    if ($id) {
        $where_clauses[] = "id = " . intval($id);
    } else {
        if (!empty($status_filter) && $status_filter !== 'all') {
            $where_clauses[] = "status = '" . $conn->real_escape_string($status_filter) . "'";
        }
        if (!empty($type_filter) && $type_filter !== 'all') {
            $where_clauses[] = "form_type LIKE '%" . $conn->real_escape_string($type_filter) . "%'";
        }
        if (!empty($search_query)) {
            $sq = $conn->real_escape_string($search_query);
            $where_clauses[] = "(name LIKE '%$sq%' OR phone LIKE '%$sq%' OR email LIKE '%$sq%' OR pickup LIKE '%$sq%' OR drop_city LIKE '%$sq%' OR package_name LIKE '%$sq%' OR service LIKE '%$sq%')";
        }
    }

    $where_sql = count($where_clauses) > 0 ? "WHERE " . implode(" AND ", $where_clauses) : "";

    $sql = "SELECT i.*, 
        (SELECT COUNT(*) FROM inquiries i2 WHERE i2.phone = i.phone AND i2.phone != '') as customer_inquiry_count 
        FROM inquiries i 
        $where_sql 
        ORDER BY i.created_at DESC LIMIT 200";

    $result = @$conn->query($sql);
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $records[] = $row;
        }
    }

    $count_res = @$conn->query("SELECT 
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
}

// If DB has no records or DB is not active, load guaranteed JSON backup
if (empty($records)) {
    $json_file = __DIR__ . '/../data/inquiries.json';
    if (file_exists($json_file)) {
        $json_records = json_decode(file_get_contents($json_file), true) ?: [];
        $today_str = date('Y-m-d');
        
        foreach ($json_records as $rec) {
            $counts['total']++;
            if (isset($rec['created_at']) && strpos($rec['created_at'], $today_str) === 0) {
                $counts['today']++;
            }
            $st = strtolower($rec['status'] ?? 'new');
            if ($st === 'new') $counts['new']++;
            else if ($st === 'contacted') $counts['contacted']++;
            else if ($st === 'confirmed' || $st === 'booked') $counts['confirmed']++;

            // Apply filters
            $match = true;
            if ($id && intval($rec['id']) !== $id) {
                $match = false;
            }
            if (!empty($status_filter) && $status_filter !== 'all' && strtolower($rec['status']) !== strtolower($status_filter)) {
                $match = false;
            }
            if (!empty($type_filter) && $type_filter !== 'all' && stripos($rec['form_type'], $type_filter) === false) {
                $match = false;
            }
            if (!empty($search_query)) {
                $searchable = strtolower(($rec['name']??'') . ' ' . ($rec['phone']??'') . ' ' . ($rec['email']??'') . ' ' . ($rec['pickup']??'') . ' ' . ($rec['drop_city']??'') . ' ' . ($rec['package_name']??'') . ' ' . ($rec['service']??''));
                if (stripos($searchable, $search_query) === false) {
                    $match = false;
                }
            }
            if ($match) {
                $records[] = $rec;
            }
        }
    }
}

http_response_code(200);
echo json_encode([
    "success" => true,
    "records" => $records,
    "counts" => $counts
]);

if ($db_available && isset($conn)) {
    @$conn->close();
}
?>