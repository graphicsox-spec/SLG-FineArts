<?php
/* SLG.art — Stripe config.
   COPY this file to  config.php  on the server and fill in the real keys.
   config.php must NEVER be committed / shared (it holds the SECRET key).

   Get keys from Stripe Dashboard → Developers → API keys.
   Use TEST keys first (sk_test_… / pk_test_…) to test safely,
   then switch to LIVE keys (sk_live_… / pk_live_…) to go live. */

define('STRIPE_SECRET_KEY', 'sk_test_XXXXXXXXXXXXXXXXXXXXXXXX');   // <-- server only, keep secret

// Publishable key (safe/public) — provided by Raj:
define('STRIPE_PUBLISHABLE_KEY', 'pk_live_51TpwQOA8My8XjgKRoqHny059i4B6JP60JI2Tg9Iv9AaqHg1wdfKgksnDKJAieuy32v3X3WdDqKvPaXq3ziosCSvs00iIGMyPB8');

// Live site URL (no trailing slash) — update once domain is connected:
define('SITE_URL', 'https://slg.art');
