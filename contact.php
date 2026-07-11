<?php
/* SLG.art — Contact form handler. Emails leads to the studio inbox.
   Called by contact.html via fetch (POST). Returns JSON. */
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

/* Honeypot: real users never fill "company". Bots do — silently accept. */
if (!empty($_POST['company'])) { echo json_encode(['ok' => true]); exit; }

$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$subject = trim($_POST['subject'] ?? 'General Question');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'Please enter your name, a valid email, and a message.']);
  exit;
}

/* strip newlines so they can't be used for header injection */
$clean = fn($s) => str_replace(["\r", "\n"], ' ', $s);

/* Leads go to these inboxes. To remove the test address later,
   just delete the 'graphicsox@gmail.com' line below. */
$recipients = [
  'hello@slg.art',                    // Sarah (studio)
  'Picturegroovephotography@gmail.com', // Sarah (Gmail)
  'graphicsox@gmail.com',             // TEST — remove after testing
];
$to = implode(', ', $recipients);
$mailSubject = 'SLG.art Inquiry (' . $clean($subject) . ') — ' . $clean($name);

$body  = "New inquiry from the SLG.art contact form\n";
$body .= "----------------------------------------\n\n";
$body .= "Name:    $name\n";
$body .= "Email:   $email\n";
$body .= "Type:    $subject\n\n";
$body .= "Message:\n$message\n";

$from = 'hello@slg.art';   // MUST be a real mailbox on the domain (GoDaddy) for delivery

$headers  = 'From: SLG.art Website <' . $from . '>' . "\r\n";
$headers .= 'Reply-To: ' . $clean($name) . ' <' . $email . '>' . "\r\n";
$headers .= 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();

if (@mail($to, $mailSubject, $body, $headers, '-f' . $from)) {
  echo json_encode(['ok' => true]);
} else {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Message could not be sent. Please email hello@slg.art directly.']);
}
