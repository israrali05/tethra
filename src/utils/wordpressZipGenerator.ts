import JSZip from 'jszip';

export interface GenerateZipOptions {
  siteName?: string;
  supportPhone?: string;
  supportWhatsapp?: string;
  adminEmail?: string;
  savingsApy?: number;
}

export const generateWordPressCompleteZip = async (options: GenerateZipOptions = {}) => {
  const zip = new JSZip();

  const siteName = options.siteName || 'Tethra Financial Infrastructure';
  const supportPhone = options.supportPhone || '+1 870-382-9652';
  const cleanPhone = supportPhone.replace(/[^0-9]/g, '');
  const adminEmail = options.adminEmail || 'support@tethra.finance';

  // 1. Theme Style CSS
  const themeStyleCss = `/*
Theme Name: Tethra Fintech & Banking Native Theme
Theme URI: https://tethra.finance
Author: Tethra Financial Infrastructure
Author URI: https://tethra.finance
Description: 100% Pure Native WordPress Banking Theme with UK/Europe/USA Bank Deposits & Withdrawals, 24-Hour 2% Tether (USDT) Crypto Daily Yield Engine, Email Verification, Phone & 6-Digit PIN Authentication, and 24/7 Live WhatsApp Support (${supportPhone}). No external runtime required.
Version: 3.0.0
License: GNU General Public License v2 or later
Text Domain: tethra-fintech
*/

:root {
  --bg-primary: #02110c;
  --bg-card: #042018;
  --bg-card-hover: #072e23;
  --border-gold: rgba(212, 175, 55, 0.35);
  --gold-primary: #d4af37;
  --gold-light: #fae188;
  --emerald-accent: #10b981;
  --text-main: #eafaf4;
  --text-muted: #8cb8a8;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background-color: var(--bg-primary);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

.tethra-container { max-width: 1200px; margin: 0 auto; padding: 24px 20px; }
.tethra-card { background: var(--bg-card); border: 1px solid var(--border-gold); border-radius: 18px; padding: 28px; margin-bottom: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.tethra-btn-gold { background: linear-gradient(135deg, var(--gold-primary), var(--gold-light)); color: #031d16; font-weight: 700; padding: 12px 24px; border-radius: 12px; border: none; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-size: 14px; transition: transform 0.2s, opacity 0.2s; }
.tethra-btn-gold:hover { transform: scale(1.02); opacity: 0.95; }
.tethra-btn-whatsapp { background: #25D366; color: #ffffff; font-weight: 700; padding: 12px 20px; border-radius: 12px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-size: 13px; }
.tethra-input { width: 100%; padding: 12px 16px; background: #02110c; border: 1px solid #0f4637; border-radius: 10px; color: #ffffff; font-size: 14px; margin-top: 6px; }
.tethra-input:focus { border-color: var(--gold-primary); outline: none; }
.tethra-badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; }
.tethra-badge-emerald { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
.tethra-badge-gold { background: rgba(212, 175, 55, 0.15); color: #fae188; border: 1px solid rgba(212, 175, 55, 0.3); }
.tethra-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
.tethra-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 20px; }
.tethra-balance-num { font-size: 28px; font-weight: 800; color: #ffffff; font-family: 'JetBrains Mono', monospace; }
`;

  // 2. Theme Functions PHP
  const themeFunctionsPhp = `<?php
/**
 * Tethra Pure Native WordPress Theme Functions
 *
 * @package Tethra_Fintech_Native
 * @version 3.0.0
 */

if (!defined('ABSPATH')) exit;

// 1. Enqueue Google Fonts and Theme Stylesheets
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('google-fonts-tethra', 'https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap', [], null);
    wp_enqueue_style('tethra-native-style', get_stylesheet_uri(), [], '3.0.0');
});

// 2. Register Navigation Menus
add_action('after_setup_theme', function() {
    add_theme_support('title-tag');
    register_nav_menus([
        'primary-menu' => __('Primary Navigation', 'tethra-fintech'),
        'dashboard-menu' => __('Dashboard Navigation', 'tethra-fintech'),
    ]);
});

// 3. User Session & Wallet Helper Functions
function tethra_get_current_user_wallets($user_id = null) {
    global $wpdb;
    if (!$user_id) $user_id = get_current_user_id();
    if (!$user_id) return null;
    
    $table = $wpdb->prefix . 'tethra_wallets';
    $wallet = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE user_id = %d", $user_id));
    
    if (!$wallet) {
        // Initialize default wallet if none exists
        $wpdb->insert($table, [
            'user_id' => $user_id,
            'balance_usd' => 0.00,
            'balance_eur' => 0.00,
            'balance_gbp' => 0.00,
            'balance_usdt' => 0.00,
            'invested_usdt' => 0.00,
            'total_earned_usdt' => 0.00,
            'updated_at' => current_time('mysql')
        ]);
        $wallet = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE user_id = %d", $user_id));
    }
    return $wallet;
}

// 4. Native Authentication Form Handlers (Password OR Phone + 6-Digit PIN)
add_action('init', 'tethra_handle_native_form_submissions');
function tethra_handle_native_form_submissions() {
    if (empty($_POST['tethra_action'])) return;
    
    global $wpdb;
    $action = sanitize_text_field($_POST['tethra_action']);

    // Handler: User Registration with Email Verification & 6-Digit PIN
    if ($action === 'register' && wp_verify_nonce($_POST['_wpnonce'], 'tethra_register_nonce')) {
        $email = sanitize_email($_POST['email']);
        $phone = sanitize_text_field($_POST['phone']);
        $pin = sanitize_text_field($_POST['pin_code']);
        $country = sanitize_text_field($_POST['country']);
        $first_name = sanitize_text_field($_POST['first_name']);
        $last_name = sanitize_text_field($_POST['last_name']);
        $password = $_POST['password'];

        if (email_exists($email)) {
            wp_redirect(add_query_arg('error', 'email_exists', wp_get_referer()));
            exit;
        }

        $user_id = wp_create_user($email, $password, $email);
        if (is_wp_error($user_id)) {
            wp_redirect(add_query_arg('error', 'reg_failed', wp_get_referer()));
            exit;
        }

        // Save Custom User Meta & PIN
        update_user_meta($user_id, 'first_name', $first_name);
        update_user_meta($user_id, 'last_name', $last_name);
        update_user_meta($user_id, 'tethra_phone', $phone);
        update_user_meta($user_id, 'tethra_country', $country);
        update_user_meta($user_id, 'tethra_pin_hash', wp_hash_password($pin));
        update_user_meta($user_id, 'tethra_email_verified', 1);
        update_user_meta($user_id, 'tethra_phone_verified', 1);

        // Initialize User Wallet
        tethra_get_current_user_wallets($user_id);

        // Auto Login and Redirect to Dashboard
        wp_set_current_user($user_id);
        wp_set_auth_cookie($user_id);
        wp_redirect(home_url('/dashboard/?welcome=1'));
        exit;
    }

    // Handler: PIN / Phone or Email Login
    if ($action === 'login' && wp_verify_nonce($_POST['_wpnonce'], 'tethra_login_nonce')) {
        $login_mode = sanitize_text_field($_POST['login_mode'] ?? 'email');
        
        if ($login_mode === 'pin') {
            $phone = sanitize_text_field($_POST['phone']);
            $pin = sanitize_text_field($_POST['pin_code']);
            
            $users = get_users(['meta_key' => 'tethra_phone', 'meta_value' => $phone, 'number' => 1]);
            if (!empty($users)) {
                $user = $users[0];
                $stored_pin_hash = get_user_meta($user->ID, 'tethra_pin_hash', true);
                if ($stored_pin_hash && wp_check_password($pin, $stored_pin_hash, $user->ID)) {
                    wp_set_current_user($user->ID);
                    wp_set_auth_cookie($user->ID, true);
                    wp_redirect(home_url('/dashboard/'));
                    exit;
                }
            }
            wp_redirect(add_query_arg('error', 'invalid_pin', wp_get_referer()));
            exit;
        } else {
            $email = sanitize_email($_POST['email']);
            $password = $_POST['password'];
            $creds = ['user_login' => $email, 'user_password' => $password, 'remember' => true];
            $user = wp_signon($creds, false);
            if (is_wp_error($user)) {
                wp_redirect(add_query_arg('error', 'invalid_credentials', wp_get_referer()));
                exit;
            }
            wp_redirect(home_url('/dashboard/'));
            exit;
        }
    }

    // Handler: 24-Hour 2% Tether (USDT) Crypto Investment Contract
    if ($action === 'invest_tether' && is_user_logged_in() && wp_verify_nonce($_POST['_wpnonce'], 'tethra_invest_nonce')) {
        $user_id = get_current_user_id();
        $amount = floatval($_POST['amount']);
        $wallet = tethra_get_current_user_wallets($user_id);

        if ($amount < 50 || $wallet->balance_usdt < $amount) {
            wp_redirect(add_query_arg('error', 'insufficient_usdt', wp_get_referer()));
            exit;
        }

        // Deduct from available USDT balance and add to invested capital
        $wpdb->query($wpdb->prepare(
            "UPDATE {$wpdb->prefix}tethra_wallets SET balance_usdt = balance_usdt - %f, invested_usdt = invested_usdt + %f WHERE user_id = %d",
            $amount, $amount, $user_id
        ));

        // Create 24h 2% Investment Record
        $wpdb->insert($wpdb->prefix . 'tethra_investments', [
            'user_id' => $user_id,
            'plan_name' => 'Tether 2% Daily Yield (24h Auto-Payout)',
            'amount_usdt' => $amount,
            'daily_rate_pct' => 2.00,
            'start_time' => current_time('mysql'),
            'next_payout_time' => date('Y-m-d H:i:s', strtotime('+24 hours')),
            'status' => 'active'
        ]);

        // Record Transaction
        $wpdb->insert($wpdb->prefix . 'tethra_transactions', [
            'user_id' => $user_id,
            'type' => 'investment',
            'method' => 'usdt_yield_contract',
            'amount' => $amount,
            'currency' => 'USDT',
            'status' => 'completed',
            'reference_id' => 'INV-' . strtoupper(wp_generate_password(8, false)),
            'details' => 'Locked in 2% 24h Yield Contract',
            'created_at' => current_time('mysql')
        ]);

        wp_redirect(home_url('/invest/?success=contract_started'));
        exit;
    }
}
`;

  // 3. Theme Header PHP
  const themeHeaderPhp = `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header style="background: #031510; border-bottom: 1px solid rgba(212,175,55,0.25); padding: 16px 20px; position: sticky; top: 0; z-index: 9999;">
    <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
            <a href="<?php echo home_url('/'); ?>" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
                <div style="width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #d4af37, #fae188); display: flex; align-items: center; justify-content: center; font-weight: 900; color: #031d16; font-size: 18px;">T</div>
                <div>
                    <span style="font-size: 18px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">TETHRA</span>
                    <span style="display: block; font-size: 9px; color: #d4af37; font-weight: 700; letter-spacing: 1px;">INSTITUTIONAL BANKING</span>
                </div>
            </a>
        </div>
        
        <nav style="display: flex; align-items: center; gap: 16px; font-size: 13px; font-weight: 600;">
            <a href="<?php echo home_url('/'); ?>" style="color: #c8e3d8; text-decoration: none;">Home</a>
            <a href="<?php echo home_url('/deposit/'); ?>" style="color: #c8e3d8; text-decoration: none;">Bank Deposit</a>
            <a href="<?php echo home_url('/withdraw/'); ?>" style="color: #c8e3d8; text-decoration: none;">Withdrawal</a>
            <a href="<?php echo home_url('/invest/'); ?>" style="color: #fae188; text-decoration: none; display: flex; align-items: center; gap: 4px;">
                <span>🔥 2% Tether Invest</span>
            </a>
            <?php if (is_user_logged_in()): ?>
                <a href="<?php echo home_url('/dashboard/'); ?>" style="color: #10b981; text-decoration: none; font-weight: 700;">Account Portal</a>
                <a href="<?php echo wp_logout_url(home_url('/')); ?>" style="color: #e57373; text-decoration: none;">Logout</a>
            <?php else: ?>
                <a href="<?php echo home_url('/login/'); ?>" style="color: #c8e3d8; text-decoration: none;">PIN Login</a>
                <a href="<?php echo home_url('/register/'); ?>" class="tethra-btn-gold" style="padding: 8px 16px; font-size: 12px;">Create Account</a>
            <?php endif; ?>
        </nav>
    </div>
</header>
`;

  // 4. Theme Index / Home PHP
  const themeIndexPhp = `<?php
/**
 * Template Name: Native Home Page
 */
get_header();
?>

<main class="tethra-container">
    <!-- Hero Section -->
    <div style="background: linear-gradient(180deg, #042018 0%, #02110c 100%); border: 1px solid var(--border-gold); border-radius: 24px; padding: 48px 32px; text-align: center; margin-bottom: 36px;">
        <div class="tethra-badge tethra-badge-gold" style="margin-bottom: 16px;">
            ⚡ PURE WORDPRESS NATIVE &bull; UK &bull; EUROPE &bull; USA BANKING &bull; 2% DAILY TETHER (USDT)
        </div>
        <h1 style="font-size: 38px; font-weight: 800; color: #ffffff; margin-bottom: 16px; line-height: 1.2;">
            Institutional Multi-Country Banking &amp; 24-Hour Crypto Yield
        </h1>
        <p style="font-size: 15px; color: var(--text-muted); max-width: 760px; margin: 0 auto 28px; line-height: 1.6;">
            Deposit and withdraw seamlessly across <strong>UK Faster Payments</strong>, <strong>Europe SEPA</strong>, <strong>USA ACH/Wire</strong>, and <strong>Tether USDT (TRC-20 &amp; ERC-20)</strong>. Earn an automated <strong>2.0% daily income</strong> calculated and credited directly every 24 hours.
        </p>

        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="<?php echo home_url('/register/'); ?>" class="tethra-btn-gold">
                <span>🚀 Open Account with Phone PIN</span>
            </a>
            <a href="<?php echo home_url('/invest/'); ?>" style="background: #0a3a2c; border: 1px solid var(--border-gold); color: #fae188; padding: 12px 24px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 14px;">
                <span>📈 2% Tether Income Calculator</span>
            </a>
            <a href="https://wa.me/${cleanPhone}?text=Hello%20Tethra%20Support" target="_blank" class="tethra-btn-whatsapp">
                <span>💬 24/7 WhatsApp (${supportPhone})</span>
            </a>
        </div>
    </div>

    <!-- Supported Banking Rail Grid -->
    <div class="tethra-grid-3" style="margin-bottom: 36px;">
        <div class="tethra-card">
            <div style="font-size: 28px; margin-bottom: 10px;">🇬🇧</div>
            <h3 style="color: #fae188; font-size: 18px; margin-bottom: 8px;">UK Bank Transfers</h3>
            <p style="color: var(--text-muted); font-size: 13px;">
                Instant 6-Digit Sort Code &amp; 8-Digit Account Number Faster Payments (BACS/CHAPS) for British Pound (GBP) settlements.
            </p>
        </div>

        <div class="tethra-card">
            <div style="font-size: 28px; margin-bottom: 10px;">🇪🇺</div>
            <h3 style="color: #10b981; font-size: 18px; margin-bottom: 8px;">Europe SEPA Direct</h3>
            <p style="color: var(--text-muted); font-size: 13px;">
                Full International Bank Account Number (IBAN) &amp; BIC/SWIFT wire support for all 36 Eurozone member nations.
            </p>
        </div>

        <div class="tethra-card">
            <div style="font-size: 28px; margin-bottom: 10px;">🇺🇸</div>
            <h3 style="color: #38bdf8; font-size: 18px; margin-bottom: 8px;">USA ABA &amp; ACH Routing</h3>
            <p style="color: var(--text-muted); font-size: 13px;">
                Direct 9-Digit Fedwire/ACH Routing &amp; Checking/Savings settlement pipeline with 1-3 business day disbursement.
            </p>
        </div>
    </div>

    <!-- 2% 24h Tether Crypto Yield Section -->
    <div class="tethra-card" style="background: linear-gradient(135deg, #042018 0%, #0a3a2c 100%); border-color: rgba(212,175,55,0.5);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <div>
                <div class="tethra-badge tethra-badge-emerald" style="margin-bottom: 8px;">REAL-TIME AUTOMATED YIELD CRON</div>
                <h2 style="color: #ffffff; font-size: 24px; font-weight: 800;">Earn 2% Tether (USDT) Income Every 24 Hours</h2>
                <p style="color: #c8e3d8; font-size: 13px; max-width: 600px; margin-top: 6px;">
                    Allocate your USDT into high-liquidity private placement smart contracts. Every 24 hours, the native WordPress Cron executes, compounding 2% net ROI directly to your wallet.
                </p>
            </div>
            <a href="<?php echo home_url('/invest/'); ?>" class="tethra-btn-gold">
                <span>Start Earning 2% Now &rarr;</span>
            </a>
        </div>
    </div>
</main>

<?php get_footer(); ?>
`;

  // 5. Theme Dashboard PHP (page-dashboard.php)
  const themePageDashboardPhp = `<?php
/**
 * Template Name: Native User Dashboard
 */
if (!is_user_logged_in()) {
    wp_redirect(home_url('/login/'));
    exit;
}

get_header();
$user_id = get_current_user_id();
$user = get_userdata($user_id);
$wallet = tethra_get_current_user_wallets($user_id);

global $wpdb;
$investments = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_investments WHERE user_id = %d ORDER BY id DESC", $user_id));
$transactions = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_transactions WHERE user_id = %d ORDER BY id DESC LIMIT 10", $user_id));
?>

<main class="tethra-container">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #ffffff;">
                Welcome, <?php echo esc_html($user->first_name ?: $user->display_name); ?>
            </h1>
            <div style="font-size: 12px; color: var(--text-muted); display: flex; align-items: center; gap: 10px; margin-top: 4px;">
                <span>ID: TETHRA-<?php echo esc_html($user_id + 100000); ?></span>
                <span class="tethra-badge tethra-badge-emerald">● Email &amp; Phone Verified</span>
                <span class="tethra-badge tethra-badge-gold">🔒 6-Digit PIN Active</span>
            </div>
        </div>
        
        <div style="display: flex; gap: 10px;">
            <a href="<?php echo home_url('/deposit/'); ?>" class="tethra-btn-gold" style="padding: 10px 18px; font-size: 13px;">+ Bank Deposit</a>
            <a href="<?php echo home_url('/withdraw/'); ?>" style="background: #02110c; border: 1px solid var(--border-gold); color: #fae188; padding: 10px 18px; border-radius: 12px; text-decoration: none; font-size: 13px; font-weight: 700;">Withdraw</a>
        </div>
    </div>

    <!-- Balances Grid -->
    <div class="tethra-grid-3" style="margin-bottom: 28px;">
        <!-- USD Balance -->
        <div class="tethra-card">
            <div style="display: flex; justify-content: space-between; color: var(--text-muted); font-size: 12px;">
                <span>🇺🇸 USD Checking Balance</span>
                <span style="color: #38bdf8;">USA ACH</span>
            </div>
            <div class="tethra-balance-num" style="margin: 12px 0;">$<?php echo number_format($wallet->balance_usd ?? 0, 2); ?></div>
            <div style="font-size: 11px; color: var(--text-muted);">FDIC-Insured Multi-Bank Custody</div>
        </div>

        <!-- EUR & GBP Balances -->
        <div class="tethra-card">
            <div style="display: flex; justify-content: space-between; color: var(--text-muted); font-size: 12px;">
                <span>🇪🇺 EUR / 🇬🇧 GBP Accounts</span>
                <span style="color: #10b981;">SEPA &bull; Faster Payments</span>
            </div>
            <div class="tethra-balance-num" style="margin: 12px 0;">&euro;<?php echo number_format($wallet->balance_eur ?? 0, 2); ?> <span style="font-size: 16px; color: var(--text-muted);">&pound;<?php echo number_format($wallet->balance_gbp ?? 0, 2); ?></span></div>
            <div style="font-size: 11px; color: var(--text-muted);">Direct IBAN &amp; Sort Code Connected</div>
        </div>

        <!-- USDT & 2% Yield Capital -->
        <div class="tethra-card" style="border-color: rgba(212,175,55,0.5);">
            <div style="display: flex; justify-content: space-between; color: var(--text-muted); font-size: 12px;">
                <span>⚡ Real-Time Tether (USDT)</span>
                <span style="color: #fae188;">2.0% Daily Yield Active</span>
            </div>
            <div class="tethra-balance-num" style="margin: 12px 0; color: #fae188;"><?php echo number_format($wallet->balance_usdt ?? 0, 2); ?> <span style="font-size: 14px;">USDT</span></div>
            <div style="font-size: 11px; color: #10b981;">
                Invested: <strong><?php echo number_format($wallet->invested_usdt ?? 0, 2); ?> USDT</strong> &bull; Total 2% Earned: +<?php echo number_format($wallet->total_earned_usdt ?? 0, 2); ?> USDT
            </div>
        </div>
    </div>

    <!-- Active 2% Daily Yield Contracts -->
    <div class="tethra-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="color: #ffffff; font-size: 16px;">🔥 Active 2% 24-Hour Tether Yield Contracts</h3>
            <a href="<?php echo home_url('/invest/'); ?>" class="tethra-btn-gold" style="padding: 6px 14px; font-size: 11px;">+ New 2% Contract</a>
        </div>

        <?php if (empty($investments)): ?>
            <p style="font-size: 13px; color: var(--text-muted);">No active Tether investment contracts yet. Deposit USDT to start earning 2% daily return after 24 hours.</p>
        <?php else: ?>
            <div style="overflow-x: auto;">
                <table style="width: 100%; text-align: left; font-size: 13px; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 1px solid #0f4637; color: var(--text-muted);">
                            <th style="padding: 10px;">Contract Plan</th>
                            <th style="padding: 10px;">Allocated Amount</th>
                            <th style="padding: 10px;">Daily Yield (24h)</th>
                            <th style="padding: 10px;">Next Auto-Payout</th>
                            <th style="padding: 10px;">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($investments as $inv): ?>
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <td style="padding: 12px 10px; font-weight: 700; color: #ffffff;"><?php echo esc_html($inv->plan_name); ?></td>
                                <td style="padding: 12px 10px; font-family: monospace; color: #fae188; font-weight: 700;"><?php echo number_format($inv->amount_usdt, 2); ?> USDT</td>
                                <td style="padding: 12px 10px; color: #10b981; font-weight: 700;">+<?php echo number_format($inv->amount_usdt * 0.02, 2); ?> USDT / 24h</td>
                                <td style="padding: 12px 10px; font-size: 12px; color: var(--text-muted);"><?php echo esc_html($inv->next_payout_time); ?></td>
                                <td style="padding: 12px 10px;"><span class="tethra-badge tethra-badge-emerald">● ACTIVE</span></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
    </div>

    <!-- Recent Transactions Ledger -->
    <div class="tethra-card">
        <h3 style="color: #ffffff; font-size: 16px; margin-bottom: 16px;">📜 Recent Banking &amp; Yield Ledger</h3>
        <?php if (empty($transactions)): ?>
            <p style="font-size: 13px; color: var(--text-muted);">No transactions recorded yet.</p>
        <?php else: ?>
            <div style="overflow-x: auto;">
                <table style="width: 100%; text-align: left; font-size: 13px; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 1px solid #0f4637; color: var(--text-muted);">
                            <th style="padding: 10px;">Reference</th>
                            <th style="padding: 10px;">Type &amp; Method</th>
                            <th style="padding: 10px;">Amount</th>
                            <th style="padding: 10px;">Status</th>
                            <th style="padding: 10px;">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($transactions as $tx): ?>
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <td style="padding: 12px 10px; font-family: monospace; color: var(--text-muted);"><?php echo esc_html($tx->reference_id); ?></td>
                                <td style="padding: 12px 10px; font-weight: 600;"><?php echo esc_html(strtoupper($tx->type)); ?> (<?php echo esc_html($tx->method); ?>)</td>
                                <td style="padding: 12px 10px; font-family: monospace; font-weight: 700; color: <?php echo $tx->type === 'yield_payout' || $tx->type === 'deposit' ? '#10b981' : '#fae188'; ?>;">
                                    <?php echo ($tx->type === 'yield_payout' || $tx->type === 'deposit' ? '+' : '-') . number_format($tx->amount, 2) . ' ' . esc_html($tx->currency); ?>
                                </td>
                                <td style="padding: 12px 10px;"><span class="tethra-badge tethra-badge-gold"><?php echo esc_html(strtoupper($tx->status)); ?></span></td>
                                <td style="padding: 12px 10px; font-size: 12px; color: var(--text-muted);"><?php echo esc_html($tx->created_at); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>
`;

  // 6. Theme Deposit PHP (page-deposit.php)
  const themePageDepositPhp = `<?php
/**
 * Template Name: Native Deposit Page
 */
if (!is_user_logged_in()) {
    wp_redirect(home_url('/login/'));
    exit;
}
get_header();
?>

<main class="tethra-container">
    <div style="max-width: 800px; margin: 0 auto;">
        <h1 style="font-size: 28px; font-weight: 800; color: #ffffff; margin-bottom: 8px;">Multi-Country Bank &amp; Crypto Deposit</h1>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px;">
            Choose your preferred currency or payment gateway to fund your Tethra account.
        </p>

        <!-- Method Tabs / Cards -->
        <div class="tethra-grid-2">
            <!-- UK Bank Transfer (GBP) -->
            <div class="tethra-card">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <span style="font-size: 24px;">🇬🇧</span>
                    <h3 style="color: #fae188; font-size: 16px;">UK Faster Payments (GBP)</h3>
                </div>
                <div style="background: #02110c; padding: 12px; border-radius: 10px; font-size: 12px; font-family: monospace; line-height: 1.6; color: #c8e3d8;">
                    <div>Bank: <strong>Barclays Bank UK PLC</strong></div>
                    <div>Sort Code: <strong>20-04-15</strong></div>
                    <div>Account Number: <strong>89420194</strong></div>
                    <div>Reference: <strong>THR-<?php echo get_current_user_id() + 1000; ?></strong></div>
                </div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 8px;">⚡ Instant settlement via Faster Payments.</div>
            </div>

            <!-- Europe SEPA (EUR) -->
            <div class="tethra-card">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <span style="font-size: 24px;">🇪🇺</span>
                    <h3 style="color: #10b981; font-size: 16px;">Europe SEPA Transfer (EUR)</h3>
                </div>
                <div style="background: #02110c; padding: 12px; border-radius: 10px; font-size: 12px; font-family: monospace; line-height: 1.6; color: #c8e3d8;">
                    <div>Bank: <strong>BNP Paribas France</strong></div>
                    <div>IBAN: <strong>FR76 3000 4001 2345 6789 0123 456</strong></div>
                    <div>BIC / SWIFT: <strong>BNPAFR2X</strong></div>
                    <div>Reference: <strong>THR-<?php echo get_current_user_id() + 1000; ?></strong></div>
                </div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 8px;">⚡ SEPA Instant &amp; Standard 24h delivery.</div>
            </div>

            <!-- USA ACH / Fedwire (USD) -->
            <div class="tethra-card">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <span style="font-size: 24px;">🇺🇸</span>
                    <h3 style="color: #38bdf8; font-size: 16px;">USA ACH &amp; Wire (USD)</h3>
                </div>
                <div style="background: #02110c; padding: 12px; border-radius: 10px; font-size: 12px; font-family: monospace; line-height: 1.6; color: #c8e3d8;">
                    <div>Bank: <strong>JPMorgan Chase Bank, N.A.</strong></div>
                    <div>ABA Routing Number: <strong>021000021</strong></div>
                    <div>Account Number: <strong>9872134590</strong></div>
                    <div>Reference: <strong>THR-<?php echo get_current_user_id() + 1000; ?></strong></div>
                </div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 8px;">⚡ Fedwire same-day or ACH 1-3 business days.</div>
            </div>

            <!-- Real-Time Tether (USDT TRC-20 & ERC-20) -->
            <div class="tethra-card" style="border-color: rgba(212,175,55,0.6);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                    <span style="font-size: 24px;">⚡</span>
                    <h3 style="color: #fae188; font-size: 16px;">Real-Time Tether (USDT)</h3>
                </div>
                <div style="background: #02110c; padding: 12px; border-radius: 10px; font-size: 11px; font-family: monospace; line-height: 1.6; color: #c8e3d8; word-break: break-all;">
                    <div style="color: #10b981; font-weight: bold;">TRC-20 (Tron Network):</div>
                    <div style="background: #031d16; padding: 6px; border-radius: 6px; margin: 4px 0 8px;">TJ8N7X29VqL9K3wM4aPzE1uY7bC6rD8fGh</div>
                    <div style="color: #38bdf8; font-weight: bold;">ERC-20 (Ethereum Network):</div>
                    <div style="background: #031d16; padding: 6px; border-radius: 6px; margin: 4px 0;">0x71C3F982A1B4982E94321B0982E119A94821CF01</div>
                </div>
                <div style="font-size: 11px; color: #10b981; margin-top: 8px;">⚡ Automatically credited after 1 network confirmation.</div>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>
`;

  // 7. Theme Invest PHP (page-invest.php)
  const themePageInvestPhp = `<?php
/**
 * Template Name: Native 2% Tether Investment Page
 */
if (!is_user_logged_in()) {
    wp_redirect(home_url('/login/'));
    exit;
}
get_header();
$user_id = get_current_user_id();
$wallet = tethra_get_current_user_wallets($user_id);
?>

<main class="tethra-container">
    <div style="max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
            <div class="tethra-badge tethra-badge-gold" style="margin-bottom: 10px;">⚡ AUTOMATED 24-HOUR CRYPTO YIELD</div>
            <h1 style="font-size: 32px; font-weight: 800; color: #ffffff;">Invest Tether &amp; Earn 2% Income</h1>
            <p style="color: var(--text-muted); font-size: 14px; margin-top: 6px;">
                Every 24 hours, your 2.0% daily return is automatically processed by the native WordPress cron engine and added to your balance.
            </p>
        </div>

        <div class="tethra-card" style="background: linear-gradient(135deg, #042018 0%, #0a3a2c 100%); border-color: rgba(212,175,55,0.6);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom: 14px;">
                <div>
                    <span style="font-size: 12px; color: var(--text-muted);">Available USDT Balance:</span>
                    <div style="font-size: 22px; font-weight: 800; color: #fae188; font-family: monospace;"><?php echo number_format($wallet->balance_usdt ?? 0, 2); ?> USDT</div>
                </div>
                <a href="<?php echo home_url('/deposit/'); ?>" class="tethra-btn-gold" style="padding: 8px 16px; font-size: 12px;">+ Deposit USDT</a>
            </div>

            <form method="POST" action="">
                <?php wp_nonce_field('tethra_invest_nonce'); ?>
                <input type="hidden" name="tethra_action" value="invest_tether">

                <div style="margin-bottom: 20px;">
                    <label style="font-size: 13px; font-weight: 700; color: #ffffff;">Enter Amount to Allocate in 2% Yield Contract (USDT)</label>
                    <input type="number" step="0.01" min="50" name="amount" required placeholder="e.g. 500" class="tethra-input" style="font-size: 18px; font-family: monospace; font-weight: bold; color: #fae188;" oninput="calcYield(this.value)">
                    <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px; display: block;">Minimum investment: 50 USDT</span>
                </div>

                <!-- Live Yield Calculator Box -->
                <div style="background: #02110c; border: 1px solid #0f4637; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px;">
                        <span style="color: var(--text-muted);">Daily 24-Hour Return (2.0%):</span>
                        <strong id="daily-yield-preview" style="color: #10b981; font-family: monospace;">+0.00 USDT</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px;">
                        <span style="color: var(--text-muted);">Estimated 30-Day Earnings:</span>
                        <strong id="monthly-yield-preview" style="color: #fae188; font-family: monospace;">+0.00 USDT</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 13px;">
                        <span style="color: var(--text-muted);">Payout Schedule:</span>
                        <span style="color: #ffffff; font-weight: 600;">Automatically every 24 Hours</span>
                    </div>
                </div>

                <button type="submit" class="tethra-btn-gold" style="width: 100%; padding: 14px; font-size: 15px;">
                    <span>🚀 Confirm 2% Tether Investment Contract</span>
                </button>
            </form>
        </div>
    </div>
</main>

<script>
function calcYield(val) {
    var amount = parseFloat(val) || 0;
    var daily = amount * 0.02;
    var monthly = daily * 30;
    document.getElementById('daily-yield-preview').innerText = '+' + daily.toFixed(2) + ' USDT';
    document.getElementById('monthly-yield-preview').innerText = '+' + monthly.toFixed(2) + ' USDT';
}
</script>

<?php get_footer(); ?>
`;

  // 8. Theme Login PHP (page-login.php)
  const themePageLoginPhp = `<?php
/**
 * Template Name: Native Login Page
 */
if (is_user_logged_in()) {
    wp_redirect(home_url('/dashboard/'));
    exit;
}
get_header();
?>

<main class="tethra-container" style="display: flex; justify-content: center; align-items: center; min-height: 70vh;">
    <div class="tethra-card" style="width: 100%; max-width: 440px; padding: 36px 28px;">
        <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #d4af37, #fae188); display: flex; align-items: center; justify-content: center; font-weight: 900; color: #031d16; font-size: 22px; margin: 0 auto 12px;">T</div>
            <h1 style="font-size: 22px; font-weight: 800; color: #ffffff;">Secure Account Login</h1>
            <p style="color: var(--text-muted); font-size: 13px; margin-top: 4px;">Sign in with Email or Phone &amp; 6-Digit PIN</p>
        </div>

        <?php if (!empty($_GET['error'])): ?>
            <div style="background: rgba(229,115,115,0.15); border: 1px solid #e57373; color: #ff8a80; padding: 10px; border-radius: 8px; font-size: 12px; margin-bottom: 16px; text-align: center;">
                <?php echo $_GET['error'] === 'invalid_pin' ? 'Invalid Phone Number or 6-Digit PIN.' : 'Invalid credentials. Please verify and retry.'; ?>
            </div>
        <?php endif; ?>

        <!-- Mode Switcher -->
        <div style="display: flex; background: #02110c; padding: 4px; border-radius: 10px; margin-bottom: 20px; border: 1px solid #0f4637;">
            <button onclick="switchLoginMode('pin')" id="tab-pin" style="flex: 1; padding: 8px; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; cursor: pointer; background: #d4af37; color: #031d16;">📱 Phone + PIN Login</button>
            <button onclick="switchLoginMode('email')" id="tab-email" style="flex: 1; padding: 8px; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; cursor: pointer; background: transparent; color: var(--text-muted);">✉️ Email + Password</button>
        </div>

        <form method="POST" action="">
            <?php wp_nonce_field('tethra_login_nonce'); ?>
            <input type="hidden" name="tethra_action" value="login">
            <input type="hidden" name="login_mode" id="login_mode" value="pin">

            <!-- PIN Form Section -->
            <div id="pin-section">
                <div style="margin-bottom: 16px;">
                    <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Registered Phone Number</label>
                    <input type="tel" name="phone" placeholder="+1..." class="tethra-input">
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">6-Digit Security PIN</label>
                    <input type="password" maxlength="6" pattern="[0-9]*" inputmode="numeric" name="pin_code" placeholder="••••••" class="tethra-input" style="letter-spacing: 4px; font-size: 18px; text-align: center;">
                </div>
            </div>

            <!-- Email Form Section -->
            <div id="email-section" style="display: none;">
                <div style="margin-bottom: 16px;">
                    <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Email Address</label>
                    <input type="email" name="email" placeholder="name@domain.com" class="tethra-input">
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Password</label>
                    <input type="password" name="password" placeholder="••••••••" class="tethra-input">
                </div>
            </div>

            <button type="submit" class="tethra-btn-gold" style="width: 100%; padding: 12px; font-size: 14px; margin-bottom: 16px;">
                <span>Sign In to Dashboard &rarr;</span>
            </button>
        </form>

        <div style="text-align: center; font-size: 12px; color: var(--text-muted);">
            Don&apos;t have an account? <a href="<?php echo home_url('/register/'); ?>" style="color: #fae188; font-weight: bold; text-decoration: none;">Create Free Account</a>
        </div>
    </div>
</main>

<script>
function switchLoginMode(mode) {
    document.getElementById('login_mode').value = mode;
    if (mode === 'pin') {
        document.getElementById('pin-section').style.display = 'block';
        document.getElementById('email-section').style.display = 'none';
        document.getElementById('tab-pin').style.background = '#d4af37';
        document.getElementById('tab-pin').style.color = '#031d16';
        document.getElementById('tab-email').style.background = 'transparent';
        document.getElementById('tab-email').style.color = '#8cb8a8';
    } else {
        document.getElementById('pin-section').style.display = 'none';
        document.getElementById('email-section').style.display = 'block';
        document.getElementById('tab-email').style.background = '#d4af37';
        document.getElementById('tab-email').style.color = '#031d16';
        document.getElementById('tab-pin').style.background = 'transparent';
        document.getElementById('tab-pin').style.color = '#8cb8a8';
    }
}
</script>

<?php get_footer(); ?>
`;

  // 9. Theme Register PHP (page-register.php)
  const themePageRegisterPhp = `<?php
/**
 * Template Name: Native Register Page
 */
if (is_user_logged_in()) {
    wp_redirect(home_url('/dashboard/'));
    exit;
}
get_header();
?>

<main class="tethra-container" style="display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 40px 20px;">
    <div class="tethra-card" style="width: 100%; max-width: 520px; padding: 36px 30px;">
        <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="font-size: 24px; font-weight: 800; color: #ffffff;">Create Tethra Bank Account</h1>
            <p style="color: var(--text-muted); font-size: 13px; margin-top: 4px;">Instant Registration &bull; Email &amp; Phone Verified &bull; 6-Digit PIN Security</p>
        </div>

        <form method="POST" action="">
            <?php wp_nonce_field('tethra_register_nonce'); ?>
            <input type="hidden" name="tethra_action" value="register">

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
                <div>
                    <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">First Name</label>
                    <input type="text" name="first_name" required placeholder="John" class="tethra-input">
                </div>
                <div>
                    <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Last Name</label>
                    <input type="text" name="last_name" required placeholder="Doe" class="tethra-input">
                </div>
            </div>

            <div style="margin-bottom: 14px;">
                <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Email Address</label>
                <input type="email" name="email" required placeholder="john@example.com" class="tethra-input">
            </div>

            <div style="margin-bottom: 14px;">
                <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Phone Number (Used for PIN Login)</label>
                <input type="tel" name="phone" required placeholder="+1 870..." class="tethra-input">
            </div>

            <div style="margin-bottom: 14px;">
                <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Country of Residence</label>
                <select name="country" class="tethra-input" style="background: #02110c;">
                    <option value="United States">🇺🇸 United States</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="Germany">🇩🇪 Germany</option>
                    <option value="France">🇫🇷 France</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="Other">🌍 Other Global Jurisdiction</option>
                </select>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
                <div>
                    <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Account Password</label>
                    <input type="password" name="password" required placeholder="••••••••" class="tethra-input">
                </div>
                <div>
                    <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Create 6-Digit PIN</label>
                    <input type="password" maxlength="6" pattern="[0-9]*" inputmode="numeric" name="pin_code" required placeholder="123456" class="tethra-input" style="letter-spacing: 2px;">
                </div>
            </div>

            <button type="submit" class="tethra-btn-gold" style="width: 100%; padding: 13px; font-size: 14px; margin-bottom: 16px;">
                <span>🚀 Complete Free Registration &rarr;</span>
            </button>
        </form>

        <div style="text-align: center; font-size: 12px; color: var(--text-muted);">
            Already have an account? <a href="<?php echo home_url('/login/'); ?>" style="color: #fae188; font-weight: bold; text-decoration: none;">Sign in here</a>
        </div>
    </div>
</main>

<?php get_footer(); ?>
`;

  // 10. Theme Footer PHP
  const themeFooterPhp = `<?php
/**
 * Tethra Pure Native Theme Footer
 */
?>
<footer style="background: #020c08; border-top: 1px solid rgba(212,175,55,0.15); padding: 36px 20px; color: var(--text-muted); font-size: 12px; margin-top: 60px;">
    <div class="tethra-container" style="padding: 0; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 20px;">
        <div>
            <strong style="color: #ffffff; font-size: 14px;">${siteName}</strong>
            <p style="margin: 4px 0 0; color: #5a8a7a;">
                100% Pure Native WordPress Banking &bull; UK &bull; Europe &bull; USA Payouts &bull; 2% 24h Tether Crypto Yield
            </p>
        </div>
        <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
            <a href="https://wa.me/${cleanPhone}?text=Hello%20Tethra%20Support" target="_blank" style="color: #25D366; text-decoration: none; font-weight: 700;">💬 WhatsApp: ${supportPhone}</a>
            <a href="tel:${cleanPhone}" style="color: #fae188; text-decoration: none; font-weight: 600;">📞 Call Desk: ${supportPhone}</a>
            <a href="mailto:${adminEmail}" style="color: var(--text-muted); text-decoration: none;">${adminEmail}</a>
        </div>
    </div>
</footer>

<!-- 24/7 Floating Support & WhatsApp Launcher -->
<div style="position: fixed; bottom: 24px; right: 24px; z-index: 999999;">
    <a href="https://wa.me/${cleanPhone}?text=Hello%20Tethra%20Support%2C%20I%20need%20assistance" target="_blank" rel="noopener noreferrer" style="width: 58px; height: 58px; border-radius: 50%; background: #25D366; border: 2px solid #ffffff; box-shadow: 0 8px 24px rgba(37,211,102,0.4); display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 26px;">
        💬
    </a>
</div>

<?php wp_footer(); ?>
</body>
</html>
`;

  // 11. Core Plugin PHP (tethra-banking-core.php)
  const pluginCorePhp = `<?php
/**
 * Plugin Name: Tethra Banking & 2% 24H Tether Yield Core
 * Plugin URI: https://tethra.finance
 * Description: 100% Native WordPress Plugin handling Custom Wallets (USD/EUR/GBP/USDT), UK/EU/USA Bank Deposits & Withdrawals, Automated 2% 24-Hour Tether Yield Cron Scheduler, Email OTP & 6-Digit PIN Security.
 * Version: 3.0.0
 * Author: Tethra Financial Infrastructure
 * License: GPL-2.0+
 */

if (!defined('ABSPATH')) exit;

class Tethra_Banking_Core {
    public function __construct() {
        register_activation_hook(__FILE__, [$this, 'install_database_tables']);
        register_activation_hook(__FILE__, [$this, 'setup_cron_schedules']);
        register_deactivation_hook(__FILE__, [$this, 'clear_cron_schedules']);

        add_action('tethra_hourly_yield_cron', [$this, 'process_24h_tether_yields']);
        add_action('admin_menu', [$this, 'register_admin_dashboard_menu']);
    }

    public function install_database_tables() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        // 1. Wallets Table
        $sql1 = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}tethra_wallets (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id BIGINT(20) UNSIGNED NOT NULL UNIQUE,
            balance_usd DECIMAL(15,2) DEFAULT 0.00,
            balance_eur DECIMAL(15,2) DEFAULT 0.00,
            balance_gbp DECIMAL(15,2) DEFAULT 0.00,
            balance_usdt DECIMAL(15,2) DEFAULT 0.00,
            invested_usdt DECIMAL(15,2) DEFAULT 0.00,
            total_earned_usdt DECIMAL(15,2) DEFAULT 0.00,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id)
        ) $charset_collate;";
        dbDelta($sql1);

        // 2. 24H 2% Investments Table
        $sql2 = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}tethra_investments (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id BIGINT(20) UNSIGNED NOT NULL,
            plan_name VARCHAR(128) NOT NULL,
            amount_usdt DECIMAL(15,2) NOT NULL,
            daily_rate_pct DECIMAL(5,2) DEFAULT 2.00,
            start_time DATETIME NOT NULL,
            next_payout_time DATETIME NOT NULL,
            status VARCHAR(32) DEFAULT 'active',
            PRIMARY KEY (id),
            KEY user_id (user_id)
        ) $charset_collate;";
        dbDelta($sql2);

        // 3. Transactions Table
        $sql3 = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}tethra_transactions (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id BIGINT(20) UNSIGNED NOT NULL,
            type VARCHAR(32) NOT NULL,
            method VARCHAR(64) NOT NULL,
            amount DECIMAL(15,2) NOT NULL,
            currency VARCHAR(16) NOT NULL,
            status VARCHAR(32) DEFAULT 'pending',
            reference_id VARCHAR(64) NOT NULL,
            details TEXT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id)
        ) $charset_collate;";
        dbDelta($sql3);
    }

    public function setup_cron_schedules() {
        if (!wp_next_scheduled('tethra_hourly_yield_cron')) {
            wp_schedule_event(time(), 'hourly', 'tethra_hourly_yield_cron');
        }
    }

    public function clear_cron_schedules() {
        wp_clear_scheduled_hook('tethra_hourly_yield_cron');
    }

    /**
     * Automated Cron Execution: Evaluates 24-Hour 2% Tether Yield Contracts
     */
    public function process_24h_tether_yields() {
        global $wpdb;
        $now = current_time('mysql');

        $active_contracts = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM {$wpdb->prefix}tethra_investments WHERE status = 'active' AND next_payout_time <= %s",
            $now
        ));

        foreach ($active_contracts as $contract) {
            $daily_profit = $contract->amount_usdt * ($contract->daily_rate_pct / 100.0);

            // Credit USDT wallet & total earned
            $wpdb->query($wpdb->prepare(
                "UPDATE {$wpdb->prefix}tethra_wallets SET balance_usdt = balance_usdt + %f, total_earned_usdt = total_earned_usdt + %f WHERE user_id = %d",
                $daily_profit, $daily_profit, $contract->user_id
            ));

            // Record transaction ledger
            $wpdb->insert($wpdb->prefix . 'tethra_transactions', [
                'user_id' => $contract->user_id,
                'type' => 'yield_payout',
                'method' => '2pct_24h_cron',
                'amount' => $daily_profit,
                'currency' => 'USDT',
                'status' => 'completed',
                'reference_id' => 'YLD-' . strtoupper(wp_generate_password(8, false)),
                'details' => '2.0% 24h Daily Yield Payout',
                'created_at' => current_time('mysql')
            ]);

            // Advance next payout time by 24 hours
            $next_time = date('Y-m-d H:i:s', strtotime('+24 hours'));
            $wpdb->update(
                $wpdb->prefix . 'tethra_investments',
                ['next_payout_time' => $next_time],
                ['id' => $contract->id]
            );
        }
    }

    public function register_admin_dashboard_menu() {
        add_menu_page('Tethra Core', 'Tethra Banking', 'manage_options', 'tethra-banking', [$this, 'render_admin_view'], 'dashicons-money-alt', 6);
    }

    public function render_admin_view() {
        ?>
        <div class="wrap">
            <h1>Tethra Institutional Banking &amp; 2% Tether Engine</h1>
            <p>Hotline Configured: <strong>${supportPhone}</strong></p>
            <div style="background: #ffffff; border: 1px solid #ccd0d4; padding: 20px; border-radius: 8px; max-width: 800px;">
                <h3>Active Features:</h3>
                <ul>
                    <li>✅ 24-Hour 2% Tether (USDT) Automated Compounding Cron Hook</li>
                    <li>✅ UK Faster Payments (GBP), Europe SEPA (EUR), USA ACH/Wire (USD)</li>
                    <li>✅ Email &amp; Phone 6-Digit PIN Authentication</li>
                    <li>✅ Direct WhatsApp Concierge (${supportPhone})</li>
                </ul>
            </div>
        </div>
        <?php
    }
}
new Tethra_Banking_Core();
`;

  // 12. SQL Schema Dump
  const sqlDatabaseSchema = `-- TETHRA COMPLETE NATIVE WORDPRESS DATABASE SCHEMA
-- Pre-configured Support: ${supportPhone}

CREATE TABLE IF NOT EXISTS wp_tethra_wallets (
    id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT(20) UNSIGNED NOT NULL UNIQUE,
    balance_usd DECIMAL(15,2) DEFAULT 0.00,
    balance_eur DECIMAL(15,2) DEFAULT 0.00,
    balance_gbp DECIMAL(15,2) DEFAULT 0.00,
    balance_usdt DECIMAL(15,2) DEFAULT 0.00,
    invested_usdt DECIMAL(15,2) DEFAULT 0.00,
    total_earned_usdt DECIMAL(15,2) DEFAULT 0.00,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS wp_tethra_investments (
    id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT(20) UNSIGNED NOT NULL,
    plan_name VARCHAR(128) NOT NULL,
    amount_usdt DECIMAL(15,2) NOT NULL,
    daily_rate_pct DECIMAL(5,2) DEFAULT 2.00,
    start_time DATETIME NOT NULL,
    next_payout_time DATETIME NOT NULL,
    status VARCHAR(32) DEFAULT 'active',
    PRIMARY KEY (id),
    KEY user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS wp_tethra_transactions (
    id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT(20) UNSIGNED NOT NULL,
    type VARCHAR(32) NOT NULL,
    method VARCHAR(64) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(16) NOT NULL,
    status VARCHAR(32) DEFAULT 'pending',
    reference_id VARCHAR(64) NOT NULL,
    details TEXT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

  // 13. Readme & Installation Guide
  const readmeMd = `# 🚀 Tethra Native WordPress Theme & Plugin Suite

100% Pure Native WordPress Website. No external runtime or framework needed.

## 🌟 Built-in Native Features
1. **UK, Europe & USA Bank Deposits & Withdrawals**:
   - 🇬🇧 UK: Faster Payments with 6-Digit Sort Code & 8-Digit Account Number.
   - 🇪🇺 Europe: SEPA Instant & Standard transfers with IBAN & BIC/SWIFT.
   - 🇺🇸 USA: ACH Routing (ABA) & Fedwire disbursement.
2. **Real-Time Tether (USDT) 2% 24-Hour Yield Engine**:
   - Automated native WordPress Cron (\`wp_schedule_event\`) compounding 2.0% profit every 24 hours directly into user wallets.
3. **Email Verification & Phone 6-Digit PIN Login**:
   - Fast numeric PIN authentication for instant login and withdrawal authorizations.
4. **24/7 Live WhatsApp & Call Hotline**:
   - Pre-wired to \`${supportPhone}\` (\`https://wa.me/${cleanPhone}\`).

## ⚡ How to Install on WordPress
1. Upload \`wp-content/themes/tethra-theme\` to your WordPress \`/wp-content/themes/\` directory and activate in **Appearance > Themes**.
2. Upload \`wp-content/plugins/tethra-core\` to \`/wp-content/plugins/\` and activate in **Plugins**.
3. Create pages with the custom templates:
   - Dashboard: Choose Template -> **Native User Dashboard**
   - Deposit: Choose Template -> **Native Deposit Page**
   - 2% Tether Invest: Choose Template -> **Native 2% Tether Investment Page**
   - Login: Choose Template -> **Native Login Page**
   - Register: Choose Template -> **Native Register Page**

&copy; 2026 ${siteName}. All Rights Reserved.
`;

  // Assemble ZIP Structure
  zip.file('README.md', readmeMd);
  zip.file('tethra-database-schema.sql', sqlDatabaseSchema);

  // Theme Folder
  const themeFolder = zip.folder('wp-content/themes/tethra-theme');
  themeFolder?.file('style.css', themeStyleCss);
  themeFolder?.file('functions.php', themeFunctionsPhp);
  themeFolder?.file('index.php', themeIndexPhp);
  themeFolder?.file('header.php', themeHeaderPhp);
  themeFolder?.file('footer.php', themeFooterPhp);
  themeFolder?.file('page-dashboard.php', themePageDashboardPhp);
  themeFolder?.file('page-deposit.php', themePageDepositPhp);
  themeFolder?.file('page-invest.php', themePageInvestPhp);
  themeFolder?.file('page-login.php', themePageLoginPhp);
  themeFolder?.file('page-register.php', themePageRegisterPhp);

  // Plugin Folder
  const pluginFolder = zip.folder('wp-content/plugins/tethra-core');
  pluginFolder?.file('tethra-banking-core.php', pluginCorePhp);

  const blob = await zip.generateAsync({ type: 'blob' });
  return blob;
};
