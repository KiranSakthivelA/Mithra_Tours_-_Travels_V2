<?php
// admin/index.php — Mithra Tours & Travels Admin Control Panel & CMS (V26)
// Google OAuth & Password Authentication, Cab Attachments Tab & Safety Backups
session_start();
if (file_exists(__DIR__ . '/api/config.php')) {
    require_once __DIR__ . '/api/config.php';
} else {
    require_once __DIR__ . '/../api/config.php';
}

$auth_error = '';

// Handle Logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    unset($_SESSION['mtt_admin_authenticated']);
    unset($_SESSION['mtt_admin_user']);
    unset($_SESSION['mtt_admin_name']);
    unset($_SESSION['mtt_admin_picture']);
    session_destroy();
    header("Location: index.php");
    exit();
}

// 1. Handle Google OAuth JWT Callback
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['credential'])) {
    $credential = $_POST['credential'];
    $jwt_parts = explode('.', $credential);
    if (count($jwt_parts) === 3) {
        $payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $jwt_parts[1])), true);
        $google_email = isset($payload['email']) ? strtolower(trim($payload['email'])) : '';
        $email_verified = !empty($payload['email_verified']);

        $auth_emails = array_map('strtolower', AUTHORIZED_ADMIN_EMAILS);

        if ($google_email && $email_verified && (in_array($google_email, $auth_emails) || strpos($google_email, 'mithratoursandtravels.in') !== false || $google_email === strtolower(ADMIN_USER))) {
            $_SESSION['mtt_admin_authenticated'] = true;
            $_SESSION['mtt_admin_user'] = $google_email;
            $_SESSION['mtt_admin_name'] = $payload['name'] ?? 'Admin';
            $_SESSION['mtt_admin_picture'] = $payload['picture'] ?? '';
            header("Location: index.php");
            exit();
        } else {
            $auth_error = 'Unauthorized Google Account (' . htmlspecialchars($google_email) . '). Please use an authorized Mithra Tours administrator email.';
        }
    } else {
        $auth_error = 'Google authentication verification failed. Please try again.';
    }
}

// 2. Handle Direct Password Login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login_submit'])) {
    $email = isset($_POST['admin_email']) ? trim($_POST['admin_email']) : '';
    $pass = isset($_POST['admin_password']) ? trim($_POST['admin_password']) : '';

    if ($email === ADMIN_USER && $pass === ADMIN_PASS) {
        $_SESSION['mtt_admin_authenticated'] = true;
        $_SESSION['mtt_admin_user'] = $email;
        $_SESSION['mtt_admin_name'] = 'Super Administrator';
        header("Location: index.php");
        exit();
    } else {
        $auth_error = 'Invalid Administrator Email or Password. Please try again.';
    }
}

$is_logged_in = !empty($_SESSION['mtt_admin_authenticated']);
$user_display_name = $_SESSION['mtt_admin_name'] ?? 'Admin';
$user_email = $_SESSION['mtt_admin_user'] ?? 'admin@mithratoursandtravels.in';
$user_picture = $_SESSION['mtt_admin_picture'] ?? '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mithra Tours & Travels — Admin Control Panel &amp; CMS</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/admin.css?v=26">
    <link rel="icon" type="image/png" href="Assets/Fav_Icon.png">
    
    <!-- Google Identity Services for OAuth -->
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</head>
<body>

<?php if (!$is_logged_in): ?>
    <!-- ══════════════ LOGIN SCREEN (GOOGLE OAUTH ONLY) ══════════════ -->
    <div class="login-wrapper">
        <div class="login-card" style="text-align:center;">
            <div class="login-brand" style="margin-bottom:2rem;">
                <img src="Assets/Site_Logo.png" onerror="this.src='https://mithratoursandtravels.in/Assets/Site_Logo.png'" alt="Mithra Tours & Travels" class="login-logo" style="height:44px; margin-bottom:1rem;">
                <h2>Admin Control Center</h2>
                <p style="margin-top:0.4rem; color:#64748B;">Sign in securely using your authorized Google Workspace administrator account</p>
            </div>

            <?php if ($auth_error): ?>
                <div class="auth-alert error" style="text-align:left;">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <span><?= htmlspecialchars($auth_error) ?></span>
                </div>
            <?php endif; ?>

            <!-- Google OAuth Sign-In Button -->
            <div class="google-signin-wrapper" style="margin:1.5rem 0 1rem;">
                <div id="g_id_onload"
                     data-client_id="<?= OAUTH_CLIENT_ID ?>"
                     data-context="signin"
                     data-ux_mode="popup"
                     data-callback="handleGoogleLoginCallback"
                     data-auto_prompt="false">
                </div>
                <div class="g_id_signin"
                     data-type="standard"
                     data-shape="rectangular"
                     data-theme="outline"
                     data-text="signin_with"
                     data-size="large"
                     data-logo_alignment="left"
                     data-width="320">
                </div>
            </div>

            <div style="font-size:0.75rem; color:#94A3B8; margin-top:1.5rem; line-height:1.4;">
                <i class="fa-solid fa-shield-halved" style="color:#10B981; margin-right:4px;"></i> Protected by Mithra Tours OAuth Security &middot; Super Admin Only
                <div style="margin-top:0.6rem; font-size:0.72rem;">Built by <a href="https://codevibex.in" target="_blank" rel="noopener" style="color:#D97706; font-weight:700; text-decoration:none;">CodeVibeX</a></div>
            </div>
        </div>
    </div>

    <script>
    function handleGoogleLoginCallback(response) {
        if (!response || !response.credential) return;
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'index.php';
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'credential';
        input.value = response.credential;
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    }
    </script>

<?php else: ?>

    <!-- ══════════════ DASHBOARD INTERFACE ══════════════ -->
    <div class="dashboard-layout">
        
        <!-- SIDEBAR -->
        <aside class="sidebar">
            <div class="sidebar-top">
                <div class="sidebar-brand">
                    <img src="Assets/Site_Logo.png" onerror="this.src='https://mithratoursandtravels.in/Assets/Site_Logo.png'" alt="Mithra Tours & Travels" class="sidebar-logo">
                    <span class="portal-tag">Admin</span>
                </div>
                <div class="user-chip">
                    <?php if ($user_picture): ?>
                        <img src="<?= htmlspecialchars($user_picture) ?>" alt="Avatar" style="width:32px; height:32px; border-radius:50%; object-fit:cover; border:1.5px solid #F59E0B;">
                    <?php else: ?>
                        <div class="user-avatar"><i class="fa-solid fa-user-shield"></i></div>
                    <?php endif; ?>
                    <div>
                        <div class="user-name"><?= htmlspecialchars($user_display_name) ?></div>
                        <div class="user-role"><?= htmlspecialchars($user_email) ?></div>
                    </div>
                </div>
            </div>

            <nav class="nav-menu">
                <div class="nav-section-title">Leads &amp; Inquiries</div>
                
                <a href="#inquiries" class="nav-item active" id="nav-inquiries" onclick="switchNav('inquiries')">
                    <i class="fa-solid fa-inbox"></i>
                    <span>Enquiries Inbox</span>
                    <span class="badge-count" id="inbox-new-badge" style="display:none;">0</span>
                </a>

                <a href="#attachments" class="nav-item" id="nav-attachments" onclick="switchNav('attachments')">
                    <i class="fa-solid fa-car-side"></i>
                    <span>Cab Attachments</span>
                    <span class="badge-count" id="badge-attachments" style="background:#7C3AED; display:none;">0</span>
                </a>

                <a href="#history" class="nav-item" id="nav-history" onclick="switchNav('history')">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                    <span>Booking History</span>
                </a>

                <div class="nav-section-title">Content Management (CMS)</div>

                <a href="#cms-home" class="nav-item" id="nav-cms-home" onclick="switchNav('cms-home')">
                    <i class="fa-solid fa-house-chimney"></i>
                    <span>Home Page CMS</span>
                </a>

                <a href="#cms-domestic" class="nav-item" id="nav-cms-domestic" onclick="switchNav('cms-domestic')">
                    <i class="fa-solid fa-mountain-sun"></i>
                    <span>Domestic Packages</span>
                </a>

                <a href="#cms-intl" class="nav-item" id="nav-cms-intl" onclick="switchNav('cms-intl')">
                    <i class="fa-solid fa-plane-departure"></i>
                    <span>International Packages</span>
                </a>

                <a href="#backups" class="nav-item" id="nav-backups" onclick="switchNav('backups')">
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>Safety Backups</span>
                </a>

                <div class="nav-section-title">System</div>

                <a href="https://mithratoursandtravels.in/" target="_blank" rel="noopener" class="nav-item">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    <span>View Live Site</span>
                </a>

                <a href="index.php?action=logout" class="nav-item" style="color:#EF4444;">
                    <i class="fa-solid fa-right-from-bracket" style="color:#EF4444;"></i>
                    <span>Sign Out</span>
                </a>
            </nav>
            
            <div style="padding: 1.2rem 1.25rem; font-size: 0.72rem; color: #94A3B8; text-align: center; border-top: 1px solid rgba(226,232,240,0.6); margin-top: auto;">
                Built by <a href="https://codevibex.in" target="_blank" rel="noopener" style="color: #D97706; font-weight: 700; text-decoration: none;">CodeVibeX</a>
            </div>
        </aside>

        <!-- MAIN VIEWPORT -->
        <main class="main-content">
            
            <!-- Topbar -->
            <header class="topbar">
                <div class="topbar-left">
                    <h1 id="page-title">Enquiries Inbox</h1>
                    <p id="page-subtitle">Customer leads from Trip Planner, Holiday Inquiries, and Contact forms</p>
                </div>
                <div class="topbar-right">
                    <div class="live-status-pill">
                        <span class="pulse-dot"></span>
                        <span>Live Sync Connected</span>
                    </div>
                    <button class="btn-refresh" onclick="refreshActiveView()" title="Sync Fresh Data">
                        <i class="fa-solid fa-rotate"></i>
                    </button>
                    <a href="index.php?action=logout" class="btn-logout-icon" title="Sign Out">
                        <i class="fa-solid fa-power-off"></i>
                    </a>
                </div>
            </header>

            <!-- ══════════════ TAB 1: ENQUIRIES INBOX (Images 2, 3, 4) ══════════════ -->
            <section id="panel-inquiries" class="tab-panel active">
                <!-- Metrics -->
                <div class="stats-grid">
                    <div class="stat-card" onclick="filterInquiriesByStat('all')">
                        <div class="stat-icon total"><i class="fa-solid fa-folder-open"></i></div>
                        <div>
                            <div class="stat-label">Total Leads</div>
                            <div class="stat-val" id="stat-total">0</div>
                        </div>
                    </div>
                    <div class="stat-card" onclick="filterInquiriesByStat('New')">
                        <div class="stat-icon new"><i class="fa-solid fa-bolt"></i></div>
                        <div>
                            <div class="stat-label">New / Unhandled</div>
                            <div class="stat-val" id="stat-new">0</div>
                        </div>
                    </div>
                    <div class="stat-card" onclick="filterInquiriesByStat('Contacted')">
                        <div class="stat-icon contacted"><i class="fa-solid fa-headset"></i></div>
                        <div>
                            <div class="stat-label">In Progress</div>
                            <div class="stat-val" id="stat-contacted">0</div>
                        </div>
                    </div>
                    <div class="stat-card" onclick="filterInquiriesByStat('Confirmed')">
                        <div class="stat-icon confirmed"><i class="fa-solid fa-calendar-check"></i></div>
                        <div>
                            <div class="stat-label">Confirmed</div>
                            <div class="stat-val" id="stat-confirmed">0</div>
                        </div>
                    </div>
                </div>

                <!-- Filter Toolbar -->
                <div class="toolbar-card">
                    <div class="search-box">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="inquiries-search" placeholder="Search by customer name, phone, email, package or route..." oninput="filterInquiries()">
                    </div>

                    <div class="filter-group">
                        <label>Form Source:</label>
                        <select id="filter-source" class="filter-select" onchange="filterInquiries()">
                            <option value="all">All Form Sources</option>
                            <option value="hero">Hero Quick Trip</option>
                            <option value="holiday">Custom Holiday Enquiry</option>
                            <option value="package">Package Booking</option>
                            <option value="contact">Contact Message</option>
                        </select>

                        <label>Status:</label>
                        <select id="filter-status" class="filter-select" onchange="filterInquiries()">
                            <option value="all">All Statuses</option>
                            <option value="New">✨ New</option>
                            <option value="Contacted">📞 Contacted</option>
                            <option value="In Progress">⏳ In Progress</option>
                            <option value="Confirmed">✅ Confirmed</option>
                            <option value="Completed">🏁 Completed</option>
                            <option value="Cancelled">❌ Cancelled</option>
                        </select>

                        <button class="btn-export" onclick="exportInquiriesCSV()">
                            <i class="fa-solid fa-file-excel"></i> Export CSV
                        </button>
                    </div>
                </div>

                <!-- Leads Table -->
                <div class="table-container">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th style="width:12%;">Date &amp; ID</th>
                                <th style="width:13%;">Form Source</th>
                                <th style="width:18%;">Customer Details</th>
                                <th style="width:18%;">Service / Package / Destination</th>
                                <th style="width:13%;">Travel Date &amp; Pax</th>
                                <th style="width:14%;">Requirement / Notes</th>
                                <th style="width:6%;">Status</th>
                                <th style="width:6%; text-align:right;">Quick Actions</th>
                            </tr>
                        </thead>
                        <tbody id="inquiries-tbody">
                            <!-- Injected by JS -->
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- ══════════════ TAB 2: CAB ATTACHMENTS (Image 5) ══════════════ -->
            <section id="panel-attachments" class="tab-panel">
                <!-- Attachment Metrics -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon" style="background:#F3E8FF; color:#7C3AED;"><i class="fa-solid fa-car-side"></i></div>
                        <div>
                            <div class="stat-label">Total Applications</div>
                            <div class="stat-val" id="stat-attach-total">0</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon new"><i class="fa-solid fa-bolt"></i></div>
                        <div>
                            <div class="stat-label">New Applications</div>
                            <div class="stat-val" id="stat-attach-new">0</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon confirmed"><i class="fa-solid fa-circle-check"></i></div>
                        <div>
                            <div class="stat-label">Approved Cabs</div>
                            <div class="stat-val" id="stat-attach-approved">0</div>
                        </div>
                    </div>
                </div>

                <!-- Attachment Toolbar -->
                <div class="toolbar-card">
                    <div class="search-box">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="attachments-search" placeholder="Search by partner name, phone, car model, reg year, or location..." oninput="filterAttachments()">
                    </div>

                    <div class="filter-group">
                        <label>Category:</label>
                        <select id="filter-attach-category" class="filter-select" onchange="filterAttachments()">
                            <option value="all">All Categories</option>
                            <option value="Sedan">Sedan (Dzire / Amaze / Aura / Etios)</option>
                            <option value="Premium Sedan">Premium Sedan (City / Ciaz / Verna)</option>
                            <option value="SUV">SUV (Ertiga / Carens)</option>
                            <option value="Toyota Innova Crysta">Toyota Innova Crysta</option>
                            <option value="Toyota Fortuner">Toyota Fortuner</option>
                            <option value="Tempo">Force Tempo Traveller / Urbania</option>
                            <option value="Coach">Coach / Bus</option>
                        </select>

                        <label>Status:</label>
                        <select id="filter-attach-status" class="filter-select" onchange="filterAttachments()">
                            <option value="all">All Statuses</option>
                            <option value="New">✨ New</option>
                            <option value="Contacted">📞 Contacted</option>
                            <option value="Approved">✅ Approved</option>
                            <option value="Rejected">❌ Rejected</option>
                        </select>

                        <button class="btn-export" onclick="exportInquiriesCSV()">
                            <i class="fa-solid fa-file-excel"></i> Export CSV
                        </button>
                    </div>
                </div>

                <!-- Attachments Table -->
                <div class="table-container">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th style="width:14%;">Date &amp; ID</th>
                                <th style="width:20%;">Owner / Driver Name</th>
                                <th style="width:20%;">Vehicle Model &amp; Reg Year</th>
                                <th style="width:18%;">Vehicle Category</th>
                                <th style="width:14%;">Location in Chennai</th>
                                <th style="width:8%;">Status</th>
                                <th style="width:6%; text-align:right;">Quick Actions</th>
                            </tr>
                        </thead>
                        <tbody id="attachments-tbody">
                            <!-- Injected by JS -->
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- ══════════════ TAB 3: BOOKING HISTORY ══════════════ -->
            <section id="panel-history" class="tab-panel">
                <div class="table-container">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Trip Date &amp; Time</th>
                                <th>Customer Info</th>
                                <th>Service / Package</th>
                                <th>Route / Destination</th>
                                <th>Status</th>
                                <th class="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="history-tbody">
                            <!-- Injected dynamically -->
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- ══════════════ TAB 4: HOME PAGE CMS ══════════════ -->
            <section id="panel-cms-home" class="tab-panel">
                
                <div class="panel-header-row">
                    <div>
                        <h2>Home Page CMS &mdash; Holiday Showcase Section</h2>
                        <p>Configure section copy, badges, and card photos with instant live preview</p>
                    </div>
                    <div class="cms-actions-group">
                        <button class="btn-draft-cms" onclick="saveDraftCMS('home')">
                            <i class="fa-solid fa-floppy-disk"></i> Save Draft
                        </button>
                        <button class="btn-publish-cms" onclick="publishLiveCMS('home')">
                            <i class="fa-solid fa-paper-plane"></i> Publish Live
                        </button>
                    </div>
                </div>

                <!-- Frosted Glass Subtabs -->
                <div class="home-cms-nav">
                    <button class="home-subtab-btn disabled-feature" title="Section locked"><i class="fa-solid fa-lock"></i> 1. Hero &amp; Top Banner</button>
                    <button class="home-subtab-btn disabled-feature" title="Section locked"><i class="fa-solid fa-lock"></i> 2. Services Grid</button>
                    <button class="home-subtab-btn disabled-feature" title="Section locked"><i class="fa-solid fa-lock"></i> 3. Fleet &amp; Pricing</button>
                    <button class="home-subtab-btn active"><i class="fa-solid fa-umbrella-beach"></i> 4. Holidays Preview Cards</button>
                    <button class="home-subtab-btn disabled-feature" title="Section locked"><i class="fa-solid fa-lock"></i> 5. Why Choose Us</button>
                </div>

                <div class="section-indicator-banner">
                    <i class="fa-solid fa-location-crosshairs"></i> <strong>Editing Section:</strong> Holiday Showcase (Domestic &amp; International Cards)
                </div>

                <!-- Live Visual Mockup Preview Card -->
                <div class="cms-card" style="background:rgba(255,255,255,0.85); border:1.5px solid rgba(226,232,240,0.9); padding:1.4rem;">
                    <div style="font-size:0.82rem; font-weight:800; color:#B45309; text-transform:uppercase; margin-bottom:1rem; display:flex; align-items:center; gap:0.45rem;">
                        <i class="fa-solid fa-eye"></i> Live Visual Mockup Preview
                    </div>
                    <div class="cms-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                        <!-- Domestic Mockup Card -->
                        <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                            <img id="mock-dom-img" src="Assets/holiday_kodaikanal.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_kodaikanal.jpg'" alt="Domestic" style="width:100%; height:160px; object-fit:cover; display:block;">
                            <div style="padding:1.1rem;">
                                <span style="font-size:0.72rem; font-weight:800; background:#FEF3C7; color:#92400E; border:1px solid #FDE68A; padding:2px 8px; border-radius:10px;">Domestic</span>
                                <h4 id="mock-dom-title" style="font-size:1.05rem; margin:0.4rem 0 0.2rem; color:#0F172A;">Kodaikanal, Rajasthan, Tawang &amp; More</h4>
                                <p id="mock-dom-desc" style="font-size:0.8rem; color:#64748B;">Curated holiday experiences for families, couples, and groups...</p>
                            </div>
                        </div>

                        <!-- International Mockup Card -->
                        <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                            <img id="mock-intl-img" src="Assets/holiday_singapore.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_singapore.jpg'" alt="International" style="width:100%; height:160px; object-fit:cover; display:block;">
                            <div style="padding:1.1rem;">
                                <span style="font-size:0.72rem; font-weight:800; background:#EFF6FF; color:#1D4ED8; border:1px solid #BFDBFE; padding:2px 8px; border-radius:10px;">International</span>
                                <h4 id="mock-intl-title" style="font-size:1.05rem; margin:0.4rem 0 0.2rem; color:#0F172A;">Singapore, Vietnam, Dubai &amp; Beyond</h4>
                                <p id="mock-intl-desc" style="font-size:0.8rem; color:#64748B;">Well-planned international holidays with customised itineraries...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="cms-card">
                    <h3><i class="fa-solid fa-pen-to-square"></i> Section Header Copy</h3>
                    <div class="cms-form-row">
                        <div class="cms-form-group">
                            <label>Section Label</label>
                            <input type="text" id="cms-hols-label" class="cms-input" oninput="updateHolidaysPreview()">
                        </div>
                        <div class="cms-form-group">
                            <label>Section Title (H2)</label>
                            <input type="text" id="cms-hols-title" class="cms-input" oninput="updateHolidaysPreview()">
                        </div>
                    </div>
                    <div class="cms-form-group">
                        <label>Section Description Subtitle</label>
                        <input type="text" id="cms-hols-desc" class="cms-input" oninput="updateHolidaysPreview()">
                    </div>

                    <h3 style="margin-top:1.6rem;"><i class="fa-solid fa-map-marked-alt"></i> Holiday Showcase Cards</h3>
                    <div class="cms-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                        
                        <!-- Card 1: Domestic Packages -->
                        <div class="cms-card" style="background:#FFFFFF; border:1px solid #E2E8F0;">
                            <h4>1. Domestic Holiday Packages Card</h4>
                            
                            <div class="upload-dropzone" 
                                 ondragover="event.preventDefault(); this.classList.add('dragover');" 
                                 ondragleave="this.classList.remove('dragover');" 
                                 ondrop="handleHomeCardImageDrop(event, 'domestic')" 
                                 onclick="triggerHomeCardFileInput('domestic')">
                                <input type="file" id="file-upload-dom-card" style="display:none;" accept="image/*" onchange="handleHomeCardImageDrop(event, 'domestic')">
                                <div class="dropzone-icon"><i class="fa-solid fa-cloud-arrow-up"></i></div>
                                <div class="dropzone-title">Drag &amp; drop card photo or <span style="color:#0F172A; text-decoration:underline; font-weight:700;">browse files</span></div>
                                <div class="dropzone-dimensions-badge">
                                    <i class="fa-solid fa-ruler-combined"></i> Exact Dimensions: <strong>1200 x 800 px</strong> (3:2 Ratio) &middot; WEBP / JPG &middot; Max 5 MB
                                </div>
                            </div>

                            <div class="preset-picker-row">
                                <span style="font-size:0.76rem; font-weight:800; color:#64748B; text-transform:uppercase;">Presets:</span>
                                <button type="button" class="preset-thumb-btn" onclick="selectHomeCardPreset('domestic', 'Assets/holiday_kodaikanal.jpg')">
                                    <img src="Assets/holiday_kodaikanal.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_kodaikanal.jpg'" alt="Kodai"> <span>Kodaikanal</span>
                                </button>
                                <button type="button" class="preset-thumb-btn" onclick="selectHomeCardPreset('domestic', 'Assets/holiday_rajasthan.jpg')">
                                    <img src="Assets/holiday_rajasthan.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_rajasthan.jpg'" alt="Rajasthan"> <span>Rajasthan</span>
                                </button>
                                <button type="button" class="preset-thumb-btn" onclick="selectHomeCardPreset('domestic', 'Assets/holiday_tawang.jpg')">
                                    <img src="Assets/holiday_tawang.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_tawang.jpg'" alt="Tawang"> <span>Tawang</span>
                                </button>
                            </div>

                            <div class="cms-form-row" style="align-items:center; margin: 1rem 0;">
                                <div style="width:85px; height:56px; border-radius:8px; overflow:hidden; border:1px solid #E2E8F0; flex-shrink:0;">
                                    <img id="cms-hols-dom-thumb" src="Assets/holiday_kodaikanal.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_kodaikanal.jpg'" alt="Preview" style="width:100%; height:100%; object-fit:cover;">
                                </div>
                                <div class="cms-form-group" style="flex:1; margin-bottom:0;">
                                    <label>Image File Path</label>
                                    <input type="text" id="cms-hols-dom-image" class="cms-input" oninput="updateHolidaysPreview()" placeholder="Assets/holiday_kodaikanal.jpg">
                                </div>
                            </div>

                            <div class="cms-form-group">
                                <label>Card Title</label>
                                <input type="text" id="cms-hols-dom-title" class="cms-input" oninput="updateHolidaysPreview()">
                            </div>
                            <div class="cms-form-group">
                                <label>Card Description</label>
                                <textarea id="cms-hols-dom-desc" class="cms-textarea" rows="2" oninput="updateHolidaysPreview()"></textarea>
                            </div>
                        </div>

                        <!-- Card 2: International Packages -->
                        <div class="cms-card" style="background:#FFFFFF; border:1px solid #E2E8F0;">
                            <h4>2. International Holidays Card</h4>
                            
                            <div class="upload-dropzone" 
                                 ondragover="event.preventDefault(); this.classList.add('dragover');" 
                                 ondragleave="this.classList.remove('dragover');" 
                                 ondrop="handleHomeCardImageDrop(event, 'international')" 
                                 onclick="triggerHomeCardFileInput('international')">
                                <input type="file" id="file-upload-intl-card" style="display:none;" accept="image/*" onchange="handleHomeCardImageDrop(event, 'international')">
                                <div class="dropzone-icon"><i class="fa-solid fa-cloud-arrow-up"></i></div>
                                <div class="dropzone-title">Drag &amp; drop card photo or <span style="color:#0F172A; text-decoration:underline; font-weight:700;">browse files</span></div>
                                <div class="dropzone-dimensions-badge">
                                    <i class="fa-solid fa-ruler-combined"></i> Exact Dimensions: <strong>1200 x 800 px</strong> (3:2 Ratio) &middot; WEBP / JPG &middot; Max 5 MB
                                </div>
                            </div>

                            <div class="preset-picker-row">
                                <span style="font-size:0.76rem; font-weight:800; color:#64748B; text-transform:uppercase;">Presets:</span>
                                <button type="button" class="preset-thumb-btn" onclick="selectHomeCardPreset('international', 'Assets/holiday_singapore.jpg')">
                                    <img src="Assets/holiday_singapore.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_singapore.jpg'" alt="Singapore"> <span>Singapore</span>
                                </button>
                                <button type="button" class="preset-thumb-btn" onclick="selectHomeCardPreset('international', 'Assets/holiday_vietnam.jpg')">
                                    <img src="Assets/holiday_vietnam.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_vietnam.jpg'" alt="Vietnam"> <span>Vietnam</span>
                                </button>
                                <button type="button" class="preset-thumb-btn" onclick="selectHomeCardPreset('international', 'Assets/holiday_dubai.jpg')">
                                    <img src="Assets/holiday_dubai.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_dubai.jpg'" alt="Dubai"> <span>Dubai</span>
                                </button>
                            </div>

                            <div class="cms-form-row" style="align-items:center; margin: 1rem 0;">
                                <div style="width:85px; height:56px; border-radius:8px; overflow:hidden; border:1px solid #E2E8F0; flex-shrink:0;">
                                    <img id="cms-hols-intl-thumb" src="Assets/holiday_singapore.jpg" onerror="this.src='https://mithratoursandtravels.in/Assets/holiday_singapore.jpg'" alt="Preview" style="width:100%; height:100%; object-fit:cover;">
                                </div>
                                <div class="cms-form-group" style="flex:1; margin-bottom:0;">
                                    <label>Image File Path</label>
                                    <input type="text" id="cms-hols-intl-image" class="cms-input" oninput="updateHolidaysPreview()" placeholder="Assets/holiday_singapore.jpg">
                                </div>
                            </div>

                            <div class="cms-form-group">
                                <label>Card Title</label>
                                <input type="text" id="cms-hols-intl-title" class="cms-input" oninput="updateHolidaysPreview()">
                            </div>
                            <div class="cms-form-group">
                                <label>Card Description</label>
                                <textarea id="cms-hols-intl-desc" class="cms-textarea" rows="2" oninput="updateHolidaysPreview()"></textarea>
                            </div>
                        </div>

                    </div>
                </div>

            </section>

            <!-- ══════════════ TAB 5: DOMESTIC PACKAGES CMS ══════════════ -->
            <section id="panel-cms-domestic" class="tab-panel">
                <div class="panel-header-row">
                    <div>
                        <h2>Domestic Holiday Packages CMS</h2>
                        <p>Edit prices, durations, day-by-day itineraries, inclusions, exclusions, and booking notes for all 3 domestic packages</p>
                    </div>
                    <div class="cms-actions-group">
                        <button class="btn-draft-cms" onclick="saveDraftCMS('domestic')">
                            <i class="fa-solid fa-floppy-disk"></i> Save Draft
                        </button>
                        <button class="btn-publish-cms" onclick="publishLiveCMS('domestic')">
                            <i class="fa-solid fa-paper-plane"></i> Publish Live
                        </button>
                    </div>
                </div>

                <div class="section-indicator-banner">
                    <i class="fa-solid fa-location-crosshairs"></i> <strong>Editing Section:</strong> Domestic Packages &middot; Package <span id="domestic-pkg-indicator">1: Kodaikanal</span>
                </div>

                <div class="package-cms-wrapper">
                    <!-- Package Selection Sidebar -->
                    <div class="package-selector-pills" id="domestic-pkg-pills">
                        <!-- Injected by JS -->
                    </div>

                    <!-- Package Detail Editor with Live Mockup Preview -->
                    <div class="package-editor-card" id="domestic-editor-card">
                        <!-- Live Package Preview Card -->
                        <div class="live-mockup-card" id="domestic-live-mockup" style="background:rgba(255,255,255,0.75); border:1px solid #E2E8F0; padding:1.2rem; border-radius:12px; margin-bottom:1.2rem;">
                            <!-- Injected dynamically by JS -->
                        </div>

                        <!-- Full-Page Form Fields Container -->
                        <div id="domestic-editor-content">
                            <!-- Injected dynamically by JS -->
                        </div>
                    </div>
                </div>
            </section>

            <!-- ══════════════ TAB 6: INTERNATIONAL PACKAGES CMS ══════════════ -->
            <section id="panel-cms-intl" class="tab-panel">
                <div class="panel-header-row">
                    <div>
                        <h2>International Holiday Packages CMS</h2>
                        <p>Edit prices, durations, day-by-day itineraries, inclusions, exclusions, and booking notes for all 3 international packages</p>
                    </div>
                    <div class="cms-actions-group">
                        <button class="btn-draft-cms" onclick="saveDraftCMS('international')">
                            <i class="fa-solid fa-floppy-disk"></i> Save Draft
                        </button>
                        <button class="btn-publish-cms" onclick="publishLiveCMS('international')">
                            <i class="fa-solid fa-paper-plane"></i> Publish Live
                        </button>
                    </div>
                </div>

                <div class="section-indicator-banner">
                    <i class="fa-solid fa-location-crosshairs"></i> <strong>Editing Section:</strong> International Packages &middot; Package <span id="intl-pkg-indicator">1: Singapore</span>
                </div>

                <div class="package-cms-wrapper">
                    <!-- Package Selection Sidebar -->
                    <div class="package-selector-pills" id="intl-pkg-pills">
                        <!-- Injected by JS -->
                    </div>

                    <!-- Package Detail Editor with Live Mockup Preview -->
                    <div class="package-editor-card" id="intl-editor-card">
                        <!-- Live Package Preview Card -->
                        <div class="live-mockup-card" id="intl-live-mockup" style="background:rgba(255,255,255,0.75); border:1px solid #E2E8F0; padding:1.2rem; border-radius:12px; margin-bottom:1.2rem;">
                            <!-- Injected dynamically by JS -->
                        </div>

                        <!-- Full-Page Form Fields Container -->
                        <div id="intl-editor-content">
                            <!-- Injected dynamically by JS -->
                        </div>
                    </div>
                </div>
            </section>

            <!-- ══════════════ TAB 7: AUTOMATED SAFETY BACKUPS (NO RAW JSON) ══════════════ -->
            <section id="panel-backups" class="tab-panel">
                <div class="panel-header-row">
                    <div>
                        <h2>Automated Safety Backups</h2>
                        <p>1-click system backup &amp; snapshot management. Zero coding required.</p>
                    </div>
                    <div class="cms-actions-group">
                        <button class="btn-draft-cms" onclick="downloadLatestBackup()">
                            <i class="fa-solid fa-download"></i> Download Latest Backup
                        </button>
                        <button class="btn-publish-cms" onclick="createManualBackup()">
                            <i class="fa-solid fa-cloud-arrow-down"></i> Create Safety Backup Now
                        </button>
                    </div>
                </div>

                <!-- Backup Metric Cards -->
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1.1rem; margin-bottom:1.3rem;">
                    <div class="stat-card" style="margin-bottom:0; background:#FFFFFF; border:1px solid #E2E8F0; border-radius:14px; padding:1.2rem 1.4rem; display:flex; align-items:center; gap:1.1rem; box-shadow:0 1px 4px rgba(0,0,0,0.02);">
                        <div class="stat-icon" style="background:#ECFDF5; color:#059669; width:46px; height:46px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.3rem; flex-shrink:0;">
                            <i class="fa-solid fa-database"></i>
                        </div>
                        <div>
                            <span style="font-size:0.76rem; font-weight:800; color:#64748B; text-transform:uppercase; display:block;">Total Safety Backups</span>
                            <div style="font-size:1.55rem; font-weight:800; color:#0F172A;" id="backup-total-count">0</div>
                        </div>
                    </div>

                    <div class="stat-card" style="margin-bottom:0; background:#FFFFFF; border:1px solid #E2E8F0; border-radius:14px; padding:1.2rem 1.4rem; display:flex; align-items:center; gap:1.1rem; box-shadow:0 1px 4px rgba(0,0,0,0.02);">
                        <div class="stat-icon" style="background:#EFF6FF; color:#2563EB; width:46px; height:46px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.3rem; flex-shrink:0;">
                            <i class="fa-solid fa-clock-rotate-left"></i>
                        </div>
                        <div>
                            <span style="font-size:0.76rem; font-weight:800; color:#64748B; text-transform:uppercase; display:block;">Latest Backup Created</span>
                            <div style="font-size:1rem; font-weight:800; color:#0F172A;" id="backup-latest-time">Loading...</div>
                        </div>
                    </div>
                </div>

                <!-- Backups History Table -->
                <div class="cms-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.1rem;">
                        <h3><i class="fa-solid fa-history"></i> Available Snapshot Backups</h3>
                        <span style="font-size:0.8rem; color:#64748B;">Restoring a snapshot will immediately reload all prices, itineraries, and page content.</span>
                    </div>

                    <div class="table-container">
                        <table class="admin-table" style="width:100%;">
                            <thead>
                                <tr>
                                    <th style="width:38%;">Backup Snapshot File</th>
                                    <th style="width:28%;">Snapshot Timestamp</th>
                                    <th style="width:14%;">File Size</th>
                                    <th style="width:20%; text-align:right;">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="backups-tbody">
                                <tr>
                                    <td colspan="4" style="text-align:center; padding:1.8rem; color:#94A3B8;">
                                        <i class="fa-solid fa-spinner fa-spin"></i> Loading backups...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </main>
    </div>

    <!-- Lead Details Modal (Full Payload Viewer) -->
    <div id="lead-modal" class="admin-modal">
        <div class="modal-overlay" onclick="closeLeadModal()"></div>
        <div class="modal-card">
            <div class="modal-header">
                <div>
                    <span class="modal-badge" id="modal-lead-badge">Website Lead</span>
                    <h3 id="modal-lead-name">Customer Details</h3>
                </div>
                <button class="modal-close" onclick="closeLeadModal()">&times;</button>
            </div>
            
            <div class="modal-body" id="modal-lead-body">
                <!-- Dynamically injected -->
            </div>

            <div class="modal-footer" id="modal-lead-footer">
                <!-- Injected by JS -->
            </div>
        </div>
    </div>

<?php endif; ?>

<!-- Toast Notifications -->
<div id="admin-toast" class="admin-toast">
    <i class="fa-solid fa-circle-check" style="font-size:1.1rem; color:#10B981;"></i>
    <span id="admin-toast-text">Changes saved</span>
</div>

<!-- Admin Dashboard Controller -->
<script src="js/admin.js?v=25"></script>
</body>
</html>
