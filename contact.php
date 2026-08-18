<?php
/**
 * Bivetica contact form handler.
 * Sends enquiries to hello@bivetica.com (which forwards on to the business inbox).
 * Progressive enhancement: returns JSON to fetch requests, redirects otherwise.
 */

$TO = 'hello@bivetica.com';

$wantsJson = (
  (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'fetch') ||
  (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false)
);

function respond($ok, $error = '') {
    global $wantsJson;
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($error ? ['ok' => $ok, 'error' => $error] : ['ok' => $ok]);
    } else {
        header('Location: /' . ($ok ? '?sent=1' : '?error=1') . '#contact');
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(false, 'method');

// Honeypot — bots fill hidden fields. Pretend success, send nothing.
if (!empty($_POST['company_url'])) respond(true);

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'invalid');
}

// Strip anything that could inject extra mail headers.
$name      = preg_replace('/[\r\n]+/', ' ', $name);
$safeEmail = preg_replace('/[\r\n]+/', '', $email);

$subject = 'New enquiry from bivetica.com';
$body  = "New message from the Bivetica website\n\n";
$body .= "Name:  $name\n";
$body .= "Email: $safeEmail\n\n";
$body .= "Message:\n$message\n\n";
$body .= '— sent ' . date('Y-m-d H:i') . ' from ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

$headers  = "From: Bivetica Website <noreply@bivetica.com>\r\n";
$headers .= "Reply-To: $name <$safeEmail>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/Bivetica";

$sent = @mail($TO, $subject, $body, $headers);

respond($sent ? true : false, $sent ? '' : 'send');
