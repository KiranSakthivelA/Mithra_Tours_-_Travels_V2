<?php
// admin/index.php
session_start();
require_once '../api/config.php';

// Redirect to trailing slash to fix relative CSS/JS paths
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($path === '/admin') {
    $query = isset($_SERVER['QUERY_STRING']) && $_SERVER['QUERY_STRING'] ? '?' . $_SERVER['QUERY_STRING'] : '';
    header("Location: /admin/$query");
    exit();
}

// Handle login via Google OAuth
if (isset($_POST['credential'])) {
    $jwt = $_POST['credential'];
    $url = "https://oauth2.googleapis.com/tokeninfo?id_token=" . $jwt;
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Fix for local Windows environments
    $response = curl_exec($ch);
    $curl_error = curl_error($ch);
    curl_close($ch);
    
    if ($response) {
        $data = json_decode($response, true);
        if (isset($data['email_verified']) && $data['email_verified'] && isset($data['email'])) {
            $email = $data['email'];
            if (in_array($email, AUTHORIZED_ADMIN_EMAILS)) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['role'] = 'admin';
                $_SESSION['display_name'] = $data['name'] ?? 'Administrator';
                header("Location: index.php?login=success");
                exit();
            } else {
                $error = "Access denied: Unauthorized email address ($email).";
            }
        } else {
            $error = "Google authentication failed. Invalid token.";
        }
    } else {
        $error = "Failed to connect to Google authentication service. Error: " . ($curl_error ? $curl_error : 'Unknown');
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit();
}

// Check if logged in
$logged_in = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;

// Auto-logout: Inactivity Timeout (30 minutes)
$timeout_duration = 1800; 
if ($logged_in && isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > $timeout_duration)) {
    session_unset();
    session_destroy();
    header("Location: index.php?timeout=true");
    exit();
}
$_SESSION['last_activity'] = time();

$role = isset($_SESSION['role']) ? $_SESSION['role'] : '';
$display_name = isset($_SESSION['display_name']) ? $_SESSION['display_name'] : ucfirst($role);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" type="image/png" href="../Assets/Fav_Icon.png">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MTT Tours & Travels - Admin Dashboard</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Admin CSS -->
    <link rel="stylesheet" href="css/admin.css?v=6">
    <!-- Google Identity Services -->
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</head>
<body>

<?php if (!$logged_in): ?>
    <!-- Login Screen -->
    <div class="login-wrapper">
        <div class="login-box">
            <div class="brand-header">
                <img src="../Assets/Site_Logo.png" alt="MTT Tours & Travels">
            </div>
            <div class="login-form-area">
                <h2>Admin Control Panel</h2>
                <p class="login-subtitle">Please log in to manage your bookings</p>
                
                <?php if (isset($error)): ?>
                    <div class="error-msg"><i class="fa-solid fa-triangle-exclamation"></i> <?php echo $error; ?></div>
                <?php endif; ?>
                <?php if (isset($_GET['timeout'])): ?>
                    <div class="error-msg info"><i class="fa-solid fa-clock"></i> Session expired. Please log in again.</div>
                <?php endif; ?>

                <div id="g_id_onload"
                     data-client_id="<?php echo OAUTH_CLIENT_ID; ?>"
                     data-context="signin"
                     data-ux_mode="popup"
                     data-login_uri="<?php echo 'http' . (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 's' : '') . '://' . $_SERVER['HTTP_HOST'] . explode('?', $_SERVER['REQUEST_URI'])[0]; ?>"
                     data-auto_prompt="false">
                </div>
                
                <div class="g_id_signin"
                     data-type="standard"
                     data-shape="pill"
                     data-theme="outline"
                     data-text="signin_with"
                     data-size="large"
                     data-logo_alignment="left"
                     style="display: flex; justify-content: center; margin-top: 2rem; margin-bottom: 2rem;">
                </div>
            </div>
            <div class="login-footer">
                &copy; <?php echo date('Y'); ?> Mithra Tours & Travels. All rights reserved.
            </div>
        </div>
    </div>
<?php else: ?>
    <!-- Dashboard Screen -->
    <div class="dashboard-container">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <img src="../Assets/Site_Logo.png" alt="Mithra Tours & Travels" class="sidebar-logo">
                <p><?php echo ucfirst($role); ?> Panel</p>
            </div>
            <ul class="nav-menu">
                <li class="active" id="nav-inquiries"><a href="#" onclick="switchTab('inquiries')"><i class="fa-solid fa-inbox"></i> Inquiries</a></li>
                <li id="nav-history"><a href="#" onclick="switchTab('history')"><i class="fa-solid fa-clock-rotate-left"></i> Booking History</a></li>
                <li id="nav-feedbacks"><a href="#" onclick="switchTab('feedbacks')"><i class="fa-solid fa-comments"></i> Feedbacks</a></li>
                <li><a href="?logout=true" class="logout-btn"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></li>
            </ul>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <div class="topbar">
                <h1 id="page-title">Booking Inquiries</h1>
                <div class="admin-profile">
                    <i class="fa-solid fa-user-shield"></i> <?php echo htmlspecialchars($display_name); ?>
                </div>
            </div>

            <div class="content-area">
                <!-- Sales Stats Section (Hidden by default) -->
                <div id="stats-section" class="stats-grid" style="display: none;">
                    <div class="stat-card">
                        <div class="stat-icon sales"><i class="fa-solid fa-indian-rupee-sign"></i></div>
                        <div class="stat-details">
                            <h3 id="monthly-sales">₹0</h3>
                            <p>Monthly Sales (<span id="current-month">-</span>)</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon trips"><i class="fa-solid fa-car"></i></div>
                        <div class="stat-details">
                            <h3 id="monthly-trips">0</h3>
                            <p>Completed Trips</p>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 id="card-title">Recent Requests</h3>
                        <div class="header-actions" style="display: flex; gap: 10px;">
                            <button class="btn-secondary" id="export-btn" style="display: none; background: #e0f2fe; color: #0369a1; border-color: #bae6fd;"><i class="fa-solid fa-file-export"></i> Export CSV</button>
                            <button class="btn-secondary" id="refresh-btn"><i class="fa-solid fa-rotate-right"></i> Refresh</button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table id="inquiries-table">
                            <thead id="table-head">
                                <tr>
                                    <th>Date Received</th>
                                    <th>Customer</th>
                                    <th>Phone</th>
                                    <th>Journey</th>
                                    <th>Trip Type</th>
                                    <th>Car Type</th>
                                    <th>Travel Date</th>
                                    <th>Status</th>
                                    <th class="actions-col">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="inquiries-body">
                                <tr>
                                    <td colspan="8" class="text-center">Loading inquiries...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </main>
    </div>

    <!-- View Details Modal -->
    <div id="details-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Inquiry Details</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body" id="modal-body-content">
                <!-- Content injected via JS -->
            </div>
        </div>
    </div>

    <!-- Complete Booking (Amount) Modal -->
    <div id="amount-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Close Trip & Save Amount</h2>
                <span class="close-amount-modal">&times;</span>
            </div>
            <div class="modal-body">
                <p style="margin-bottom: 1.5rem; color: #64748b; font-size: 0.9rem;">Please enter the final total amount for this trip to mark it as completed.</p>
                <div class="form-group">
                    <label for="final-amount">Final Amount (₹)</label>
                    <div class="input-with-icon">
                        <i class="fa-solid fa-indian-rupee-sign"></i>
                        <input type="number" id="final-amount" placeholder="e.g. 2500" min="1" step="any" required autofocus>
                    </div>
                </div>
                <button id="save-amount-btn" class="btn-primary" style="margin-top: 1rem;">Confirm & Complete <i class="fa-solid fa-check"></i></button>
            </div>
        </div>
    </div>

<?php endif; ?>

    <script>
        // --- Password Toggle Login Helper ---
        document.addEventListener('DOMContentLoaded', () => {
            const togglePw = document.getElementById('toggle-pw');
            const pwInput = document.getElementById('password');
            
            if (togglePw && pwInput) {
                togglePw.onclick = function() {
                    const type = pwInput.getAttribute('type') === 'password' ? 'text' : 'password';
                    pwInput.setAttribute('type', type);
                    
                    if (type === 'text') {
                        togglePw.classList.remove('fa-eye');
                        togglePw.classList.add('fa-eye-slash');
                    } else {
                        togglePw.classList.remove('fa-eye-slash');
                        togglePw.classList.add('fa-eye');
                    }
                };
            }
        });

        <?php if ($logged_in): ?>
        window.ADMIN_ROLE = "<?php echo $role; ?>";
        window.LOGGED_IN = true;
        
        // --- Tab Session Helper ---
        const urlParams = new URLSearchParams(window.location.search);
        const isFreshLogin = urlParams.has('login');
        if (isFreshLogin) {
            sessionStorage.setItem('admin_session_active', 'true');
            // Remove the login=success from URL for a cleaner look
            window.history.replaceState({}, document.title, window.location.pathname);
        }


        <?php else: ?>
        window.LOGGED_IN = false;
        <?php endif; ?>
    </script>
    <?php if ($logged_in): ?>
    <script src="js/admin.js?v=5"></script>
<?php endif; ?>
</body>
</html>


