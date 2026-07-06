<?php
/* SLG.art — Stripe Checkout Session creator (server-side, secure)
   Called by checkout.html on "Place Order". Creates a Stripe-hosted
   Checkout Session and returns its URL. Uses the SECRET key (server only).
   No Composer needed — talks to Stripe's API directly via cURL. */

require __DIR__ . '/config.php';           // defines STRIPE_SECRET_KEY, SITE_URL
header('Content-Type: application/json');

/* read order payload posted from the browser */
$body     = json_decode(file_get_contents('php://input'), true);
$items    = $body['items']    ?? [];
$email    = $body['email']    ?? null;
$tax      = (float)($body['tax'] ?? 0);           // dollars, estimated sales tax
$shipping = (float)($body['shipping'] ?? 0);      // dollars, shipping cost (usually 0)
$cust     = $body['customer'] ?? [];              // name/phone/address for Sarah's records
$coupon   = $body['coupon']   ?? null;            // coupon code string (record only)

if (!$items) { http_response_code(400); echo json_encode(['error'=>'No items']); exit; }

$post = [
  'mode'        => 'payment',
  'success_url' => SITE_URL . '/checkout-success.html?session_id={CHECKOUT_SESSION_ID}',
  'cancel_url'  => SITE_URL . '/checkout.html',
];
if ($email) { $post['customer_email'] = $email; }

/* ---- Line items: each artwork, priced dynamically ---- */
$i = 0;
foreach ($items as $it) {
  $cents = (int) round(((float)$it['price']) * 100);
  if ($cents <= 0) continue;
  $post["line_items[$i][price_data][currency]"]           = 'usd';
  $post["line_items[$i][price_data][product_data][name]"] = substr((string)$it['name'], 0, 250);
  if (!empty($it['desc'])) {
    $post["line_items[$i][price_data][product_data][description]"] = substr((string)$it['desc'], 0, 250);
  }
  $post["line_items[$i][price_data][unit_amount]"]        = $cents;
  $post["line_items[$i][quantity]"]                       = max(1, (int)($it['qty'] ?? 1));
  $i++;
}

/* ---- Estimated sales tax as its own line (keeps Stripe total == site total) ---- */
if ($tax > 0) {
  $post["line_items[$i][price_data][currency]"]           = 'usd';
  $post["line_items[$i][price_data][product_data][name]"] = 'Estimated Sales Tax';
  $post["line_items[$i][price_data][unit_amount]"]        = (int) round($tax * 100);
  $post["line_items[$i][quantity]"]                       = 1;
  $i++;
}

/* ---- Shipping as a line item only if charged (Standard = Free) ---- */
if ($shipping > 0) {
  $post["line_items[$i][price_data][currency]"]           = 'usd';
  $post["line_items[$i][price_data][product_data][name]"] = 'Shipping';
  $post["line_items[$i][price_data][unit_amount]"]        = (int) round($shipping * 100);
  $post["line_items[$i][quantity]"]                       = 1;
  $i++;
}

/* ---- Shipping/contact details saved to the order metadata for Sarah ---- */
$fullName = trim(($cust['first'] ?? '') . ' ' . ($cust['last'] ?? ''));
$addr = trim(
  ($cust['address'] ?? '') .
  (!empty($cust['address2']) ? ', ' . $cust['address2'] : '') . ', ' .
  ($cust['city'] ?? '') . ', ' . ($cust['state'] ?? '') . ' ' .
  ($cust['zip'] ?? '') . ', ' . ($cust['country'] ?? '')
);
if ($fullName)          $post['metadata[ship_name]']    = substr($fullName, 0, 200);
if (!empty($cust['phone'])) $post['metadata[ship_phone]'] = substr($cust['phone'], 0, 50);
if ($addr)              $post['metadata[ship_address]'] = substr($addr, 0, 480);
if ($coupon)            $post['metadata[coupon]']       = substr($coupon, 0, 50);
/* also surface the shipping address in Stripe's own field (nice structured copy) */
if ($fullName)          $post['payment_intent_data[shipping][name]'] = substr($fullName, 0, 200);
if (!empty($cust['phone'])) $post['payment_intent_data[shipping][phone]'] = substr($cust['phone'], 0, 50);
if (!empty($cust['address'])) {
  $post['payment_intent_data[shipping][address][line1]']       = substr($cust['address'], 0, 200);
  if (!empty($cust['address2'])) $post['payment_intent_data[shipping][address][line2]'] = substr($cust['address2'], 0, 200);
  $post['payment_intent_data[shipping][address][city]']        = substr($cust['city'] ?? '', 0, 100);
  $post['payment_intent_data[shipping][address][state]']       = substr($cust['state'] ?? '', 0, 60);
  $post['payment_intent_data[shipping][address][postal_code]'] = substr($cust['zip'] ?? '', 0, 20);
  $post['payment_intent_data[shipping][address][country]']     = substr($cust['country'] ?? 'US', 0, 2);
}

/* NOTE: payment method types are NOT hard-coded — Stripe auto-shows every
   method enabled in the Dashboard (Cards, Apple Pay, Google Pay, Link,
   Klarna, Affirm). */

$ch = curl_init('https://api.stripe.com/v1/checkout/sessions');
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_USERPWD        => STRIPE_SECRET_KEY . ':',
  CURLOPT_POSTFIELDS     => http_build_query($post),
  CURLOPT_TIMEOUT        => 30,
]);
$res  = curl_exec($ch);
$err  = curl_error($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($err) { http_response_code(500); echo json_encode(['error' => 'Network error: ' . $err]); exit; }

$data = json_decode($res, true);
if ($code >= 200 && $code < 300 && !empty($data['url'])) {
  echo json_encode(['url' => $data['url']]);
} else {
  http_response_code(500);
  echo json_encode(['error' => $data['error']['message'] ?? 'Stripe error']);
}
