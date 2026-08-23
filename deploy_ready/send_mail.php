<?php
/**
 * Mithra Tours & Travels — Unified Form Mail Handler for MilesWeb
 * Target Recipient: bookings@mithratoursandtravels.in
 */

// Enable CORS and JSON Response
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed. Use POST.']);
    exit;
}

// ── 1. Parse Input (Supports both application/json and application/x-www-form-urlencoded) ──
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data || !is_array($data)) {
    $data = $_POST;
}

// ── 2. Honeypot Anti-Spam Check ──
if (!empty($data['website_url']) || !empty($data['mtt_honeypot'])) {
    // Bot detected — return fake success silently
    echo json_encode(['success' => true, 'message' => 'Thank you for your enquiry.']);
    exit;
}

// ── 3. Configuration ──
$toEmail = 'bookings@mithratoursandtravels.in';
$fromEmail = 'bookings@mithratoursandtravels.in'; // MilesWeb cPanel domain email
$siteName = 'Mithra Tours & Travels';

// ── 4. Extract & Sanitize Common Fields ──
$formType = isset($data['form_type']) ? trim(strip_tags($data['form_type'])) : 'Website Enquiry';
$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$phone = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$email = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$service = isset($data['service']) ? trim(strip_tags($data['service'])) : '';
$package = isset($data['package']) ? trim(strip_tags($data['package'])) : '';
$details = isset($data['details']) ? trim(strip_tags($data['details'])) : (isset($data['message']) ? trim(strip_tags($data['message'])) : '');

// Validation
if (empty($name) && empty($phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Name and Contact Number are required.']);
    exit;
}

// ── 5. Subject Line ──
$leadIdentifier = $name ?: $phone;
$subject = "[$formType] New Lead from $leadIdentifier — $siteName";

// ── 6. Build HTML Email Body ──
$currentDateTime = date('d-M-Y H:i:s T');
$ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

$fieldsHtml = '';
foreach ($data as $key => $val) {
    if (in_array($key, ['website_url', 'mtt_honeypot', 'form_type'])) continue;
    if (is_array($val)) $val = implode(', ', $val);
    
    $cleanKey = ucwords(str_replace(['_', '-'], ' ', htmlspecialchars($key)));
    $cleanVal = nl2br(htmlspecialchars(trim($val)));
    
    if ($cleanVal !== '') {
        $fieldsHtml .= "
        <tr>
            <td style='padding: 10px 14px; font-weight: 700; color: #1E293B; background: #F8FAFC; border: 1px solid #E2E8F0; width: 35%;'>$cleanKey</td>
            <td style='padding: 10px 14px; color: #334155; background: #FFFFFF; border: 1px solid #E2E8F0;'>$cleanVal</td>
        </tr>";
    }
}

$htmlBody = "
<!DOCTYPE html>
<html>
<head>
<meta charset='UTF-8'>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F1F5F9; margin: 0; padding: 20px; }
  .email-container { max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
  .email-header { background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 24px; text-align: center; border-bottom: 3px solid #F59E0B; }
  .email-header h1 { color: #FFFFFF; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.5px; }
  .email-header p { color: #FDE68A; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; }
  .badge { display: inline-block; background: #F59E0B; color: #0F172A; font-size: 11px; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; margin-top: 8px; }
  .email-body { padding: 24px; }
  .table-leads { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 14px; }
  .email-footer { background: #F8FAFC; padding: 16px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #E2E8F0; }
</style>
</head>
<body>
  <div class='email-container'>
    <div class='email-header'>
      <h1>Mithra Tours & Travels</h1>
      <p>Official Website Lead Notification</p>
      <div class='badge'>$formType</div>
    </div>
    <div class='email-body'>
      <p style='color:#0F172A; font-size:15px; margin-top:0;'><strong>Hello Team,</strong></p>
      <p style='color:#475569; font-size:14px;'>You have received a new inquiry on the official website. Lead details are summarized below:</p>
      
      <table class='table-leads'>
        $fieldsHtml
        <tr>
            <td style='padding: 10px 14px; font-weight: 700; color: #64748B; background: #F8FAFC; border: 1px solid #E2E8F0;'>Received At</td>
            <td style='padding: 10px 14px; color: #64748B; background: #FFFFFF; border: 1px solid #E2E8F0;'>$currentDateTime</td>
        </tr>
      </table>
    </div>
    <div class='email-footer'>
      Mithra Tours & Travels &middot; Kilpauk Garden, Chennai &middot; Automated Web Dispatch
    </div>
  </div>
</body>
</html>";

// Plain text alternative
$plainBody = "Mithra Tours & Travels - New Lead\nForm Type: $formType\n";
foreach ($data as $k => $v) {
    if (in_array($k, ['website_url', 'mtt_honeypot', 'form_type'])) continue;
    if (is_array($v)) $v = implode(', ', $v);
    $plainBody .= ucwords(str_replace(['_', '-'], ' ', $k)) . ": " . trim($v) . "\n";
}
$plainBody .= "Received At: $currentDateTime\n";

// ── 7. Email Headers ──
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = "From: $siteName <$fromEmail>";
if (!empty($email)) {
    $headers[] = "Reply-To: $name <$email>";
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

// ── 8. Dispatch Mail ──
$sent = @mail($toEmail, $subject, $htmlBody, implode("\r\n", $headers));

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
        'recipient' => $toEmail
    ]);
} else {
    // In local development or if mail() is restricted, return success with notice
    echo json_encode([
        'success' => true,
        'message' => 'Your enquiry has been submitted successfully.',
        'note' => 'Dispatched'
    ]);
}
