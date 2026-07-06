<?php
/* SLG.art — verify a Stripe Checkout Session after redirect.
   checkout-success.html calls this with ?session_id=... to confirm the
   payment actually succeeded before showing the thank-you + clearing cart. */

require __DIR__ . '/config.php';
header('Content-Type: application/json');

$sid = $_GET['session_id'] ?? '';
if (!$sid || strpos($sid, 'cs_') !== 0) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid session']);
  exit;
}

$ch = curl_init('https://api.stripe.com/v1/checkout/sessions/' . urlencode($sid));
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_USERPWD        => STRIPE_SECRET_KEY . ':',
  CURLOPT_TIMEOUT        => 30,
]);
$res  = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$data = json_decode($res, true);
if ($code < 200 || $code >= 300 || empty($data['id'])) {
  http_response_code(500);
  echo json_encode(['error' => $data['error']['message'] ?? 'Could not verify']);
  exit;
}

$paid = ($data['payment_status'] ?? '') === 'paid';
echo json_encode([
  'paid'   => $paid,
  'email'  => $data['customer_details']['email'] ?? ($data['customer_email'] ?? null),
  'amount' => isset($data['amount_total']) ? $data['amount_total'] / 100 : null,
  'name'   => $data['customer_details']['name'] ?? null,
]);
