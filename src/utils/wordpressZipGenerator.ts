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
  const savingsApy = options.savingsApy || 5.4;

  // ==========================================
  // 1. THEME: style.css
  // ==========================================
  const themeStyleCss = `/*
Theme Name: Tethra Fintech & Banking Native Theme
Theme URI: https://tethra.finance
Author: Tethra Financial Infrastructure
Author URI: https://tethra.finance
Description: 100% Pure Native WordPress Banking Theme with UK/Europe/USA Bank Deposits & Withdrawals, 24-Hour 2% Tether (USDT) Crypto Daily Yield Engine, Multi-Currency Wallets, Savings Vaults, KYC, and 24/7 Live WhatsApp Support (${supportPhone}).
Version: 3.5.0
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
  --gold-dark: #a17f1a;
  --emerald-accent: #10b981;
  --emerald-dark: #064e3b;
  --text-main: #eafaf4;
  --text-muted: #8cb8a8;
  --danger-color: #ef4444;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background-color: var(--bg-primary);
  color: var(--text-main);
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.tethra-container { max-width: 1240px; margin: 0 auto; padding: 24px 20px; width: 100%; flex: 1; }
.tethra-card { background: var(--bg-card); border: 1px solid var(--border-gold); border-radius: 18px; padding: 24px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
.tethra-card-highlight { background: linear-gradient(135deg, #042018 0%, #0a3a2c 100%); border: 1px solid rgba(212, 175, 55, 0.6); }

.tethra-btn-gold { background: linear-gradient(135deg, var(--gold-primary), var(--gold-light)); color: #031d16; font-weight: 700; padding: 12px 22px; border-radius: 12px; border: none; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-size: 14px; transition: all 0.2s ease; }
.tethra-btn-gold:hover { transform: translateY(-1px); opacity: 0.95; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4); }

.tethra-btn-outline { background: transparent; border: 1px solid var(--border-gold); color: var(--gold-light); font-weight: 600; padding: 10px 18px; border-radius: 10px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 13px; }
.tethra-btn-outline:hover { background: rgba(212, 175, 55, 0.1); border-color: var(--gold-light); }

.tethra-btn-whatsapp { background: #25D366; color: #ffffff; font-weight: 700; padding: 12px 20px; border-radius: 12px; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-size: 13px; }
.tethra-btn-whatsapp:hover { opacity: 0.92; }

.tethra-input { width: 100%; padding: 12px 14px; background: #02110c; border: 1px solid #0f4637; border-radius: 10px; color: #ffffff; font-size: 14px; margin-top: 6px; }
.tethra-input:focus { border-color: var(--gold-primary); outline: none; box-shadow: 0 0 0 2px rgba(212,175,55,0.2); }

.tethra-badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; }
.tethra-badge-emerald { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
.tethra-badge-gold { background: rgba(212, 175, 55, 0.15); color: #fae188; border: 1px solid rgba(212, 175, 55, 0.3); }
.tethra-badge-blue { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); }

.tethra-grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
.tethra-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
.tethra-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 20px; }

.tethra-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
.tethra-table th { padding: 12px 16px; color: var(--text-muted); font-weight: 600; border-bottom: 1px solid rgba(212,175,55,0.2); }
.tethra-table td { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--text-main); }
.tethra-table tr:hover td { background: rgba(212,175,55,0.03); }

.tethra-balance-num { font-size: 26px; font-weight: 800; color: #ffffff; font-family: 'JetBrains Mono', monospace; }
.tethra-nav-tab { display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 10px; color: var(--text-muted); text-decoration: none; font-size: 13px; font-weight: 600; transition: all 0.2s; }
.tethra-nav-tab:hover, .tethra-nav-tab.active { background: rgba(212,175,55,0.15); color: var(--gold-light); }

/* Hide WordPress Admin Bar completely on frontend */
#wpadminbar { display: none !important; }
html { margin-top: 0px !important; padding-top: 0px !important; }
body { margin-top: 0px !important; }
@media screen and (max-width: 782px) {
  html { margin-top: 0px !important; }
  #wpadminbar { display: none !important; }
}

/* Printable PDF Certificate Layout */
@media print {
  body { background: #ffffff !important; color: #000000 !important; }
  header, footer, nav, button, .no-print { display: none !important; }
  .tethra-certificate-card { display: block !important; border: 2px solid #d4af37 !important; background: #ffffff !important; color: #000000 !important; box-shadow: none !important; margin: 0 !important; width: 100% !important; max-width: 100% !important; padding: 20px !important; }
}

@media (max-width: 768px) {
  .tethra-grid-2, .tethra-grid-3, .tethra-grid-4 { grid-template-columns: 1fr; }
}
\`;

  // ==========================================
  // 2. THEME: functions.php
  // ==========================================
  const themeFunctionsPhp = \`<?php
/**
 * Tethra Pure Native WordPress Theme Functions
 *
 * @package Tethra_Fintech_Native
 * @version 3.6.0
 */

if (!defined('ABSPATH')) exit;

// 1. Completely Remove WordPress Top Admin Bar on Frontend for Seamless App UI
add_filter('show_admin_bar', '__return_false');
add_action('after_setup_theme', function() {
    show_admin_bar(false);
});

// 1B. Enqueue Google Fonts, Tailwind CSS CDN, Lucide Icons and Theme Stylesheets
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style('google-fonts-tethra', 'https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap', [], null);
    wp_enqueue_style('tethra-native-style', get_stylesheet_uri(), [], '3.6.0');
});

// Enqueue Tailwind CDN and Lucide Icons in head
add_action('wp_head', function() {
    ?>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              tethra: {
                950: '#010a07',
                900: '#02110c',
                800: '#042018',
                700: '#073024',
                600: '#0a3e30',
                gold: '#d4af37',
                goldLight: '#fae188',
                emerald: '#10b981',
                emeraldLight: '#6ee7b7'
              }
            }
          }
        }
      }
    </script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
      #wpadminbar { display: none !important; }
      html { margin-top: 0px !important; padding-top: 0px !important; }
      body { background-color: #02110c !important; color: #eafaf4; margin-top: 0px !important; }
      .tethra-card { background: #042018; border: 1px solid rgba(212, 175, 55, 0.25); border-radius: 18px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
      .tethra-card-highlight { background: linear-gradient(135deg, #042018 0%, #0a3a2c 100%); border: 1px solid rgba(212, 175, 55, 0.5); }
      .gold-gradient-text { background: linear-gradient(135deg, #fae188 0%, #d4af37 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .emerald-glow { box-shadow: 0 0 25px rgba(16, 185, 129, 0.2); }
      .gold-glow { box-shadow: 0 0 25px rgba(212, 175, 55, 0.25); }
    </style>
    <?php
});

add_action('wp_footer', function() {
    ?>
    <script>
      if (window.lucide) {
        window.lucide.createIcons();
      }
    </script>
    <?php
});

// 2. Register Navigation Menus & Theme Supports
add_action('after_setup_theme', function() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus([
        'primary-menu' => __('Primary Public Navigation', 'tethra-fintech'),
        'dashboard-menu' => __('User Dashboard Navigation', 'tethra-fintech'),
        'footer-menu' => __('Footer Navigation', 'tethra-fintech'),
    ]);
});

// 2B. Database Safety Helper: Auto-ensures core tables exist
function tethra_ensure_tables_exist() {
    global $wpdb;
    static $checked = false;
    if ($checked) return;
    $checked = true;

    $table_name = $wpdb->prefix . 'tethra_wallets';
    if ($wpdb->get_var("SHOW TABLES LIKE '{$table_name}'") != $table_name) {
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        $charset_collate = $wpdb->get_charset_collate();

        $sql1 = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}tethra_wallets (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id BIGINT(20) UNSIGNED NOT NULL UNIQUE,
            balance_usd DECIMAL(15,2) DEFAULT 0.00,
            balance_eur DECIMAL(15,2) DEFAULT 0.00,
            balance_gbp DECIMAL(15,2) DEFAULT 0.00,
            balance_usdt DECIMAL(15,2) DEFAULT 0.00,
            invested_usdt DECIMAL(15,2) DEFAULT 0.00,
            total_earned_usdt DECIMAL(15,2) DEFAULT 0.00,
            savings_balance DECIMAL(15,2) DEFAULT 0.00,
            is_frozen TINYINT(1) DEFAULT 0,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id)
        ) $charset_collate;";
        dbDelta($sql1);

        $sql2 = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}tethra_transactions (
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
        dbDelta($sql2);

        $sql3 = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}tethra_referrals (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            referrer_id BIGINT(20) UNSIGNED NOT NULL,
            referred_user_id BIGINT(20) UNSIGNED NOT NULL,
            bonus_amount DECIMAL(15,2) DEFAULT 25.00,
            status VARCHAR(32) DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY referrer_id (referrer_id),
            KEY referred_user_id (referred_user_id)
        ) $charset_collate;";
        dbDelta($sql3);

        $sql4 = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}tethra_notifications (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id BIGINT(20) UNSIGNED NOT NULL,
            title VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            type VARCHAR(32) DEFAULT 'info',
            is_read TINYINT(1) DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id)
        ) $charset_collate;";
        dbDelta($sql4);
    }
}

// 3. User Wallet & Balance Management (Dual Sync: DB Table + User Meta)
function tethra_get_current_user_wallets($user_id = null) {
    global $wpdb;
    if (!$user_id) $user_id = get_current_user_id();
    if (!$user_id) return null;

    tethra_ensure_tables_exist();
    $table = $wpdb->prefix . 'tethra_wallets';
    $wallet = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE user_id = %d", $user_id));
    
    // Check if usermeta has values
    $meta_usd = get_user_meta($user_id, 'tethra_balance_usd', true);
    $meta_eur = get_user_meta($user_id, 'tethra_balance_eur', true);
    $meta_gbp = get_user_meta($user_id, 'tethra_balance_gbp', true);
    $meta_usdt = get_user_meta($user_id, 'tethra_balance_usdt', true);
    $meta_savings = get_user_meta($user_id, 'tethra_balance_savings', true);

    if (!$wallet) {
        $init_usd = ($meta_usd !== '') ? floatval($meta_usd) : 2500.00;
        $init_eur = ($meta_eur !== '') ? floatval($meta_eur) : 1850.00;
        $init_gbp = ($meta_gbp !== '') ? floatval($meta_gbp) : 1200.00;
        $init_usdt = ($meta_usdt !== '') ? floatval($meta_usdt) : 1000.00;
        $init_savings = ($meta_savings !== '') ? floatval($meta_savings) : 500.00;

        $wpdb->insert($table, [
            'user_id' => $user_id,
            'balance_usd' => $init_usd,
            'balance_eur' => $init_eur,
            'balance_gbp' => $init_gbp,
            'balance_usdt' => $init_usdt,
            'invested_usdt' => 0.00,
            'total_earned_usdt' => 0.00,
            'savings_balance' => $init_savings,
            'is_frozen' => 0,
            'updated_at' => current_time('mysql')
        ]);
        
        update_user_meta($user_id, 'tethra_balance_usd', $init_usd);
        update_user_meta($user_id, 'tethra_balance_eur', $init_eur);
        update_user_meta($user_id, 'tethra_balance_gbp', $init_gbp);
        update_user_meta($user_id, 'tethra_balance_usdt', $init_usdt);

        $wallet = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE user_id = %d", $user_id));
    } else {
        // Keep usermeta in sync if table has updated
        update_user_meta($user_id, 'tethra_balance_usd', floatval($wallet->balance_usd));
        update_user_meta($user_id, 'tethra_balance_eur', floatval($wallet->balance_eur));
        update_user_meta($user_id, 'tethra_balance_gbp', floatval($wallet->balance_gbp));
        update_user_meta($user_id, 'tethra_balance_usdt', floatval($wallet->balance_usdt));
    }

    return $wallet;
}

// 4. Notification Helper
function tethra_add_notification($user_id, $title, $message, $type = 'info') {
    global $wpdb;
    tethra_ensure_tables_exist();
    $wpdb->insert($wpdb->prefix . 'tethra_notifications', [
        'user_id' => $user_id,
        'title' => sanitize_text_field($title),
        'message' => sanitize_textarea_field($message),
        'type' => sanitize_text_field($type),
        'is_read' => 0,
        'created_at' => current_time('mysql')
    ]);
}

// 5. Get Configured Deposit Accounts Helper
function tethra_get_deposit_accounts() {
    $defaults = [
        'uk_bank_name' => 'Barclays / Tethra UK Settlement',
        'uk_account_name' => 'Tethra Financial Infrastructure Ltd',
        'uk_sort_code' => '20-45-78',
        'uk_account_number' => '83920144',
        'eu_bank_name' => 'BNP Paribas / Tethra EU Treasury',
        'eu_account_name' => 'Tethra Global Europe S.A.',
        'eu_iban' => 'DE89 3704 0044 0532 0130 00',
        'eu_bic' => 'BNPADEPPXXX',
        'us_bank_name' => 'JPMorgan Chase / Tethra USA',
        'us_account_name' => 'Tethra Financial LLC',
        'us_routing' => '021000021',
        'us_account_number' => '9840219482',
        'usdt_trc20_address' => 'TYDhh8x7KqP9xLzM8wQrVzN2p4kLbTethra',
        'usdt_erc20_address' => '0x71C...TethraTreasuryVault',
        'btc_address' => 'bc1q9...TethraColdReserve',
        'eth_address' => '0x49B...TethraStakingVault',
    ];
    $saved = get_option('tethra_deposit_accounts', []);
    return wp_parse_args($saved, $defaults);
}

// 6. Form Submissions Handler (Login, Register, Deposits, Withdrawals, 2% Staking, Referrals, Send Gift, PIN)
add_action('init', 'tethra_handle_native_form_submissions');
function tethra_handle_native_form_submissions() {
    if (empty($_POST['tethra_action'])) return;
    
    global $wpdb;
    tethra_ensure_tables_exist();
    $action = sanitize_text_field($_POST['tethra_action']);

    // --- REGISTRATION & REFERRAL ATTRIBUTION ---
    if ($action === 'register' && wp_verify_nonce($_POST['_wpnonce'], 'tethra_register_nonce')) {
        $email = sanitize_email($_POST['email']);
        $phone = sanitize_text_field($_POST['phone']);
        $pin = sanitize_text_field($_POST['pin_code']);
        $country = sanitize_text_field($_POST['country']);
        $first_name = sanitize_text_field($_POST['first_name']);
        $last_name = sanitize_text_field($_POST['last_name']);
        $password = $_POST['password'];
        $ref_code = sanitize_text_field($_POST['ref_code'] ?? '');

        if (email_exists($email)) {
            wp_redirect(add_query_arg('error', 'email_exists', wp_get_referer()));
            exit;
        }

        $user_id = wp_create_user($email, $password, $email);
        if (is_wp_error($user_id)) {
            wp_redirect(add_query_arg('error', 'reg_failed', wp_get_referer()));
            exit;
        }

        // Generate persistent unique referral code
        $my_ref_code = 'THR-' . strtoupper(substr(md5($user_id . 'tethra_secret'), 0, 6));

        update_user_meta($user_id, 'first_name', $first_name);
        update_user_meta($user_id, 'last_name', $last_name);
        update_user_meta($user_id, 'tethra_phone', $phone);
        update_user_meta($user_id, 'tethra_country', $country);
        update_user_meta($user_id, 'tethra_pin_hash', wp_hash_password($pin));
        update_user_meta($user_id, 'tethra_kyc_tier', 1);
        update_user_meta($user_id, 'tethra_referral_code', $my_ref_code);

        tethra_get_current_user_wallets($user_id);

        // Record Referral Attribution
        if (!empty($ref_code)) {
            $referrer_id = 0;
            if (is_numeric($ref_code)) {
                $referrer_id = intval($ref_code);
            } else {
                $matched_users = get_users(['meta_key' => 'tethra_referral_code', 'meta_value' => $ref_code, 'number' => 1]);
                if (!empty($matched_users)) {
                    $referrer_id = $matched_users[0]->ID;
                } else if (is_email($ref_code)) {
                    $found_by_email = get_user_by('email', $ref_code);
                    if ($found_by_email) $referrer_id = $found_by_email->ID;
                }
            }

            if ($referrer_id > 0 && $referrer_id != $user_id) {
                update_user_meta($user_id, 'tethra_referred_by', $referrer_id);
                $wpdb->insert($wpdb->prefix . 'tethra_referrals', [
                    'referrer_id' => $referrer_id,
                    'referred_user_id' => $user_id,
                    'bonus_amount' => 25.00,
                    'status' => 'pending',
                    'created_at' => current_time('mysql')
                ]);
                tethra_add_notification($referrer_id, 'New Referral Signup! 🎁', "Your friend {$first_name} has registered with your code ({$ref_code}). $25 cash bonus pending active deposit.", 'success');
            }
        }

        // Welcome Notification
        tethra_add_notification($user_id, 'Welcome to Tethra Institutional Banking', 'Your multi-currency accounts and 2% USDT staking vault are now active. Enjoy instant settlements!', 'success');

        wp_set_current_user($user_id);
        wp_set_auth_cookie($user_id);
        wp_redirect(home_url('/dashboard/?welcome=1'));
        exit;
    }

    // --- SEND GIFT & PEER-TO-PEER P2P TRANSFER ---
    if ($action === 'send_gift_transfer' && is_user_logged_in() && wp_verify_nonce($_POST['_wpnonce'], 'tethra_transfer_nonce')) {
        $sender_id = get_current_user_id();
        $recipient_query = sanitize_text_field(trim($_POST['recipient']));
        $amount = floatval($_POST['amount']);
        $currency = strtoupper(trim(sanitize_text_field($_POST['currency'] ?: 'USD')));
        $gift_note = sanitize_textarea_field($_POST['gift_note'] ?? 'Special Member Gift 🎁');
        $pin = sanitize_text_field($_POST['pin_code']);

        // Verify PIN
        $stored_pin_hash = get_user_meta($sender_id, 'tethra_pin_hash', true);
        if ($stored_pin_hash && !wp_check_password($pin, $stored_pin_hash, $sender_id)) {
            wp_redirect(add_query_arg('error', 'invalid_pin', wp_get_referer()));
            exit;
        }

        // Locate recipient
        $recipient_user = null;
        if (is_numeric($recipient_query)) {
            $recipient_user = get_user_by('id', intval($recipient_query));
        }
        if (!$recipient_user && strpos($recipient_query, 'TETHRA-') === 0) {
            $parsed_id = intval(str_replace('TETHRA-', '', $recipient_query)) - 100000;
            if ($parsed_id > 0) {
                $recipient_user = get_user_by('id', $parsed_id);
            }
        }
        if (!$recipient_user && is_email($recipient_query)) {
            $recipient_user = get_user_by('email', $recipient_query);
        }
        if (!$recipient_user) {
            $matched_phone_users = get_users(['meta_key' => 'tethra_phone', 'meta_value' => $recipient_query, 'number' => 1]);
            if (!empty($matched_phone_users)) {
                $recipient_user = $matched_phone_users[0];
            }
        }

        if (!$recipient_user) {
            wp_redirect(add_query_arg('error', 'recipient_not_found', wp_get_referer()));
            exit;
        }

        if ($recipient_user->ID === $sender_id) {
            wp_redirect(add_query_arg('error', 'cannot_transfer_self', wp_get_referer()));
            exit;
        }

        if ($amount <= 0) {
            wp_redirect(add_query_arg('error', 'invalid_amount', wp_get_referer()));
            exit;
        }

        $sender_wallet = tethra_get_current_user_wallets($sender_id);
        $col = ($currency === 'USD') ? 'balance_usd' : (($currency === 'EUR') ? 'balance_eur' : (($currency === 'GBP') ? 'balance_gbp' : (($currency === 'USDT') ? 'balance_usdt' : 'balance_usd')));

        if ((float)$sender_wallet->$col < $amount) {
            wp_redirect(add_query_arg('error', 'insufficient_funds', wp_get_referer()));
            exit;
        }

        // Deduct sender
        $wpdb->query($wpdb->prepare(
            "UPDATE {$wpdb->prefix}tethra_wallets SET {$col} = {$col} - %f, updated_at = %s WHERE user_id = %d",
            $amount, current_time('mysql'), $sender_id
        ));

        // Credit recipient
        tethra_get_current_user_wallets($recipient_user->ID); // ensure wallet row
        $wpdb->query($wpdb->prepare(
            "UPDATE {$wpdb->prefix}tethra_wallets SET {$col} = {$col} + %f, updated_at = %s WHERE user_id = %d",
            $amount, current_time('mysql'), $recipient_user->ID
        ));

        // Update usermeta mirrors
        update_user_meta($sender_id, 'tethra_' . $col, max(0, floatval(get_user_meta($sender_id, 'tethra_' . $col, true) ?: 0) - $amount));
        update_user_meta($recipient_user->ID, 'tethra_' . $col, floatval(get_user_meta($recipient_user->ID, 'tethra_' . $col, true) ?: 0) + $amount);

        $sender_info = get_userdata($sender_id);
        $sender_name = $sender_info->display_name ?: $sender_info->user_email;
        $recipient_name = $recipient_user->display_name ?: $recipient_user->user_email;
        $ref_id = 'GFT-' . strtoupper(wp_generate_password(8, false));

        // Insert sender transaction
        $wpdb->insert($wpdb->prefix . 'tethra_transactions', [
            'user_id' => $sender_id,
            'type' => 'gift_sent',
            'method' => 'peer_to_peer',
            'amount' => $amount,
            'currency' => $currency,
            'status' => 'completed',
            'reference_id' => $ref_id,
            'details' => "Sent gift to {$recipient_name} ({$recipient_user->user_email}). Note: {$gift_note}",
            'created_at' => current_time('mysql')
        ]);

        // Insert recipient transaction
        $wpdb->insert($wpdb->prefix . 'tethra_transactions', [
            'user_id' => $recipient_user->ID,
            'type' => 'gift_received',
            'method' => 'peer_to_peer',
            'amount' => $amount,
            'currency' => $currency,
            'status' => 'completed',
            'reference_id' => $ref_id,
            'details' => "Received gift from {$sender_name}. Note: {$gift_note}",
            'created_at' => current_time('mysql')
        ]);

        // Notifications
        tethra_add_notification(
            $sender_id,
            'Gift Dispatched! 🎁💸',
            "You sent " . number_format($amount, 2) . " {$currency} to {$recipient_name}. Reference: {$ref_id}.",
            'success'
        );
        tethra_add_notification(
            $recipient_user->ID,
            'You Received a Gift! 🎁✨',
            "{$sender_name} just sent you " . number_format($amount, 2) . " {$currency}! Note: \"{$gift_note}\". Funds have been credited to your balance.",
            'reward'
        );

        wp_redirect(home_url('/transfer/?success=gift_sent&ref=' . $ref_id));
        exit;
    }

    // --- LOGIN (Dual: PIN or Email) ---
    if ($action === 'login' && wp_verify_nonce($_POST['_wpnonce'], 'tethra_login_nonce')) {
        $login_mode = sanitize_text_field($_POST['login_mode'] ?? 'pin');
        
        if ($login_mode === 'pin') {
            $phone = sanitize_text_field($_POST['phone']);
            $pin = sanitize_text_field($_POST['pin_code']);
            
            $users = get_users(['meta_key' => 'tethra_phone', 'meta_value' => $phone, 'number' => 1]);
            if (!empty($users)) {
                $user = $users[0];
                $stored_pin_hash = get_user_meta($user->ID, 'tethra_pin_hash', true);
                if ($stored_pin_hash && wp_check_password($pin, $stored_pin_hash, $user->ID)) {
                    // Check if frozen
                    $wallet = tethra_get_current_user_wallets($user->ID);
                    if (!empty($wallet->is_frozen)) {
                        wp_redirect(add_query_arg('error', 'account_frozen', wp_get_referer()));
                        exit;
                    }
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
            $wallet = tethra_get_current_user_wallets($user->ID);
            if (!empty($wallet->is_frozen)) {
                wp_logout();
                wp_redirect(add_query_arg('error', 'account_frozen', wp_get_referer()));
                exit;
            }
            wp_redirect(home_url('/dashboard/'));
            exit;
        }
    }

    // --- SUBMIT DEPOSIT PROOF / NOTIFICATION (Appears in Admin Queue) ---
    if ($action === 'submit_deposit_proof' && is_user_logged_in() && wp_verify_nonce($_POST['_wpnonce'], 'tethra_deposit_proof_nonce')) {
        $user_id = get_current_user_id();
        $amount = floatval($_POST['amount']);
        $currency = sanitize_text_field($_POST['currency']);
        $method = sanitize_text_field($_POST['method']);
        $tx_ref = sanitize_text_field($_POST['tx_reference']);
        $notes = sanitize_textarea_field($_POST['notes'] ?? '');

        if ($amount <= 0) {
            wp_redirect(add_query_arg('error', 'invalid_amount', wp_get_referer()));
            exit;
        }

        $ref_id = 'DEP-' . strtoupper(wp_generate_password(8, false));
        $wpdb->insert($wpdb->prefix . 'tethra_transactions', [
            'user_id' => $user_id,
            'type' => 'deposit',
            'method' => $method,
            'amount' => $amount,
            'currency' => $currency,
            'status' => 'pending',
            'reference_id' => $ref_id,
            'details' => 'User Proof: ' . $tx_ref . ' | Notes: ' . $notes,
            'created_at' => current_time('mysql')
        ]);

        tethra_add_notification($user_id, 'Deposit Submitted for Verification 📥', "Your deposit of " . number_format($amount, 2) . " {$currency} (Ref: {$ref_id}) has been submitted to the admin desk. Verification settles within standard cutoff.", 'info');

        wp_redirect(home_url('/transactions/?success=deposit_submitted'));
        exit;
    }

    // --- 24-HOUR 2% TETHER STAKING ---
    if ($action === 'invest_tether' && is_user_logged_in() && wp_verify_nonce($_POST['_wpnonce'], 'tethra_invest_nonce')) {
        $user_id = get_current_user_id();
        $amount = floatval($_POST['amount']);
        $wallet = tethra_get_current_user_wallets($user_id);

        if ($amount < 50 || $wallet->balance_usdt < $amount) {
            wp_redirect(add_query_arg('error', 'insufficient_usdt', wp_get_referer()));
            exit;
        }

        $wpdb->query($wpdb->prepare(
            "UPDATE {$wpdb->prefix}tethra_wallets SET balance_usdt = balance_usdt - %f, invested_usdt = invested_usdt + %f WHERE user_id = %d",
            $amount, $amount, $user_id
        ));

        $wpdb->insert($wpdb->prefix . 'tethra_investments', [
            'user_id' => $user_id,
            'plan_name' => 'Tether 2% Daily Yield (24h Auto-Payout)',
            'amount_usdt' => $amount,
            'daily_rate_pct' => 2.00,
            'start_time' => current_time('mysql'),
            'next_payout_time' => date('Y-m-d H:i:s', strtotime('+24 hours')),
            'status' => 'active'
        ]);

        $wpdb->insert($wpdb->prefix . 'tethra_transactions', [
            'user_id' => $user_id,
            'type' => 'investment',
            'method' => 'usdt_yield_contract',
            'amount' => $amount,
            'currency' => 'USDT',
            'status' => 'completed',
            'reference_id' => 'INV-' . strtoupper(wp_generate_password(8, false)),
            'details' => 'Allocated to 2.0% 24h Daily Yield Staking Engine',
            'created_at' => current_time('mysql')
        ]);

        tethra_add_notification($user_id, '2% Tether Contract Activated! ⚡', "Staked " . number_format($amount, 2) . " USDT. Your first 2.0% yield payout is scheduled precisely in 24 hours.", 'success');

        wp_redirect(home_url('/invest/?success=contract_active'));
        exit;
    }

    // --- BANK & CRYPTO WITHDRAWAL ---
    if ($action === 'submit_withdrawal' && is_user_logged_in() && wp_verify_nonce($_POST['_wpnonce'], 'tethra_withdraw_nonce')) {
        $user_id = get_current_user_id();
        $amount = floatval($_POST['amount']);
        $currency = sanitize_text_field($_POST['currency']);
        $method = sanitize_text_field($_POST['method']);
        $pin = sanitize_text_field($_POST['pin_code']);
        $dest = sanitize_text_field($_POST['destination_details']);

        $stored_pin_hash = get_user_meta($user_id, 'tethra_pin_hash', true);
        if ($stored_pin_hash && !wp_check_password($pin, $stored_pin_hash, $user_id)) {
            wp_redirect(add_query_arg('error', 'invalid_pin', wp_get_referer()));
            exit;
        }

        $wallet = tethra_get_current_user_wallets($user_id);
        $col = ($currency === 'USD') ? 'balance_usd' : (($currency === 'EUR') ? 'balance_eur' : (($currency === 'GBP') ? 'balance_gbp' : 'balance_usdt'));
        
        if ($wallet->$col < $amount || $amount <= 0) {
            wp_redirect(add_query_arg('error', 'insufficient_funds', wp_get_referer()));
            exit;
        }

        $wpdb->query($wpdb->prepare(
            "UPDATE {$wpdb->prefix}tethra_wallets SET {$col} = {$col} - %f WHERE user_id = %d",
            $amount, $user_id
        ));

        $ref_id = 'WTH-' . strtoupper(wp_generate_password(8, false));
        $wpdb->insert($wpdb->prefix . 'tethra_transactions', [
            'user_id' => $user_id,
            'type' => 'withdrawal',
            'method' => $method,
            'amount' => $amount,
            'currency' => $currency,
            'status' => 'pending',
            'reference_id' => $ref_id,
            'details' => 'Payout to: ' . $dest,
            'created_at' => current_time('mysql')
        ]);

        tethra_add_notification($user_id, 'Withdrawal Queued 📤', "Withdrawal request of " . number_format($amount, 2) . " {$currency} (Ref: {$ref_id}) is under review by the institutional payout desk.", 'info');

        wp_redirect(home_url('/transactions/?success=withdrawal_queued'));
        exit;
    }

    // --- MARK NOTIFICATIONS READ ---
    if ($action === 'mark_notifications_read' && is_user_logged_in() && wp_verify_nonce($_POST['_wpnonce'], 'tethra_notif_nonce')) {
        $user_id = get_current_user_id();
        $wpdb->update($wpdb->prefix . 'tethra_notifications', ['is_read' => 1], ['user_id' => $user_id]);
        wp_redirect(wp_get_referer());
        exit;
    }

    // --- UPDATE 6-DIGIT PIN ---
    if ($action === 'update_pin' && is_user_logged_in() && wp_verify_nonce($_POST['_wpnonce'], 'tethra_pin_nonce')) {
        $user_id = get_current_user_id();
        $cur_pin = sanitize_text_field($_POST['current_pin']);
        $new_pin = sanitize_text_field($_POST['new_pin']);

        $stored_pin_hash = get_user_meta($user_id, 'tethra_pin_hash', true);
        if ($stored_pin_hash && !wp_check_password($cur_pin, $stored_pin_hash, $user_id)) {
            wp_redirect(add_query_arg('error', 'invalid_current_pin', wp_get_referer()));
            exit;
        }

        update_user_meta($user_id, 'tethra_pin_hash', wp_hash_password($new_pin));
        tethra_add_notification($user_id, 'Security PIN Changed 🔒', 'Your 6-digit transaction authorization PIN has been successfully updated.', 'success');
        wp_redirect(add_query_arg('success', 'pin_updated', wp_get_referer()));
        exit;
    }
}

// 7. Helper function for formatted currency
function tethra_format_money($amount, $currency = 'USD') {
    $sym = ($currency === 'USD') ? '$' : (($currency === 'EUR') ? '€' : (($currency === 'GBP') ? '£' : 'USDT '));
    return $sym . number_format((float)$amount, 2);
}
`;

  // ==========================================
  // 3. THEME: header.php
  // ==========================================
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
<?php wp_body_open(); 
$current_uid = get_current_user_id();
$unread_notifs_count = 0;
$user_notifs = [];
if ($current_uid) {
    global $wpdb;
    $unread_notifs_count = (int)$wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$wpdb->prefix}tethra_notifications WHERE user_id = %d AND is_read = 0", $current_uid));
    $user_notifs = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_notifications WHERE user_id = %d ORDER BY id DESC LIMIT 5", $current_uid));
}
?>

<!-- Global Header Banner -->
<div style="background: #042018; border-bottom: 1px solid rgba(212,175,55,0.25); padding: 8px 20px; font-size: 11px; text-align: center; color: #fae188;">
    🛡️ INSTITUTIONAL BANKING INFRASTRUCTURE &bull; UK FASTER PAYMENTS &bull; EU SEPA &bull; USA ACH &bull; 24/7 WHATSAPP: <a href="https://wa.me/${cleanPhone}" target="_blank" style="color: #25D366; font-weight: bold; text-decoration: none;">${supportPhone}</a>
</div>

<header style="background: #031510; border-bottom: 1px solid rgba(212,175,55,0.2); padding: 14px 20px; position: sticky; top: 0; z-index: 9999;">
    <div class="tethra-container" style="padding: 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 12px;">
            <a href="<?php echo home_url('/'); ?>" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
                <div style="width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #d4af37, #fae188); display: flex; align-items: center; justify-content: center; font-weight: 900; color: #031d16; font-size: 20px; box-shadow: 0 0 15px rgba(212,175,55,0.3);">T</div>
                <div>
                    <span style="font-size: 19px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">TETHRA</span>
                    <span style="display: block; font-size: 9px; color: #d4af37; font-weight: 700; letter-spacing: 1.2px;">FINANCIAL INFRASTRUCTURE</span>
                </div>
            </a>
        </div>
        
        <nav style="display: flex; align-items: center; gap: 14px; font-size: 13px; font-weight: 600; flex-wrap: wrap;">
            <a href="<?php echo home_url('/'); ?>" style="color: #c8e3d8; text-decoration: none;">Home</a>
            <a href="<?php echo home_url('/about/'); ?>" style="color: #c8e3d8; text-decoration: none;">About</a>
            <a href="<?php echo home_url('/invest/'); ?>" style="color: #fae188; text-decoration: none; font-weight: 700;">🔥 2% Tether Yield</a>
            <a href="<?php echo home_url('/deposit/'); ?>" style="color: #c8e3d8; text-decoration: none;">Deposit</a>
            <a href="<?php echo home_url('/withdraw/'); ?>" style="color: #c8e3d8; text-decoration: none;">Withdraw</a>
            <a href="<?php echo home_url('/referrals/'); ?>" style="color: #fae188; text-decoration: none;">🎁 Referrals ($25)</a>
            <a href="<?php echo home_url('/crypto/'); ?>" style="color: #c8e3d8; text-decoration: none;">Crypto</a>
            <a href="<?php echo home_url('/faq/'); ?>" style="color: #c8e3d8; text-decoration: none;">FAQ</a>
            <a href="<?php echo home_url('/contact/'); ?>" style="color: #c8e3d8; text-decoration: none;">Contact</a>

            <?php if (is_user_logged_in()): ?>
                <!-- Notifications Bell Dropdown -->
                <div style="position: relative; display: inline-block;">
                    <button onclick="document.getElementById('notif-dropdown').classList.toggle('active')" style="background: #042018; border: 1px solid rgba(212,175,55,0.4); color: #fae188; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; font-size: 16px;">
                        🔔
                        <?php if ($unread_notifs_count > 0): ?>
                            <span style="position: absolute; top: -4px; right: -4px; background: #ef4444; color: #ffffff; font-size: 10px; font-weight: 800; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #031510;">
                                <?php echo esc_html($unread_notifs_count); ?>
                            </span>
                        <?php endif; ?>
                    </button>

                    <div id="notif-dropdown" style="display: none; position: absolute; right: 0; top: 44px; width: 320px; background: #031510; border: 1px solid rgba(212,175,55,0.3); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); z-index: 10000; padding: 14px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #0f4637; padding-bottom: 8px;">
                            <strong style="color: #fae188; font-size: 13px;">Live Notifications</strong>
                            <form method="POST" action="" style="margin: 0;">
                                <?php wp_nonce_field('tethra_notif_nonce'); ?>
                                <input type="hidden" name="tethra_action" value="mark_notifications_read">
                                <button type="submit" style="background: none; border: none; color: var(--text-muted); font-size: 11px; cursor: pointer; text-decoration: underline;">Mark read</button>
                            </form>
                        </div>
                        <?php if (empty($user_notifs)): ?>
                            <p style="color: var(--text-muted); font-size: 12px; text-align: center; padding: 10px 0;">No notifications at this time.</p>
                        <?php else: ?>
                            <div style="display: flex; flex-direction: column; gap: 8px; max-height: 240px; overflow-y: auto;">
                                <?php foreach ($user_notifs as $n): ?>
                                    <div style="background: <?php echo $n->is_read ? '#02110c' : '#062d22'; ?>; border: 1px solid <?php echo $n->is_read ? '#0a3a2c' : '#10b981'; ?>; padding: 8px 10px; border-radius: 8px; font-size: 11px;">
                                        <div style="font-weight: 700; color: #ffffff; margin-bottom: 2px;"><?php echo esc_html($n->title); ?></div>
                                        <div style="color: var(--text-muted); line-height: 1.4;"><?php echo esc_html($n->message); ?></div>
                                        <div style="color: #fae188; font-size: 9px; margin-top: 4px;"><?php echo esc_html($n->created_at); ?></div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>

                <a href="<?php echo home_url('/dashboard/'); ?>" class="tethra-btn-gold" style="padding: 8px 16px; font-size: 12px;">📊 Dashboard</a>
                <a href="<?php echo wp_logout_url(home_url('/')); ?>" style="color: #ef4444; text-decoration: none; font-size: 12px;">Logout</a>
            <?php else: ?>
                <a href="<?php echo home_url('/login/'); ?>" class="tethra-btn-outline" style="padding: 7px 14px; font-size: 12px;">PIN Login</a>
                <a href="<?php echo home_url('/register/'); ?>" class="tethra-btn-gold" style="padding: 8px 16px; font-size: 12px;">Open Account</a>
            <?php endif; ?>
        </nav>
    </div>
</header>
<style>#notif-dropdown.active { display: block !important; }</style>
`;

  // ==========================================
  // 4. THEME: footer.php
  // ==========================================
  const themeFooterPhp = `<?php
/**
 * Tethra Pure Native Theme Footer
 */
?>
<footer style="background: #010a07; border-top: 1px solid rgba(212,175,55,0.18); padding: 48px 20px 24px; color: var(--text-muted); font-size: 13px; margin-top: auto;">
    <div class="tethra-container" style="padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 32px; margin-bottom: 36px;">
        <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                <div style="width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #d4af37, #fae188); display: flex; align-items: center; justify-content: center; font-weight: 900; color: #031d16; font-size: 16px;">T</div>
                <strong style="color: #ffffff; font-size: 18px;">${siteName}</strong>
            </div>
            <p style="font-size: 12px; line-height: 1.6; color: #739d8e;">
                Next-generation financial infrastructure providing global multi-currency settlements (UK Sort Code, EU IBAN, US ACH), high-yield 2% daily crypto staking, and automated wealth management.
            </p>
        </div>

        <div>
            <h4 style="color: #fae188; font-size: 14px; margin-bottom: 14px; font-weight: 700;">Banking &amp; Yield Rails</h4>
            <ul style="list-style: none; padding: 0; font-size: 12px; line-height: 2;">
                <li><a href="<?php echo home_url('/invest/'); ?>" style="color: var(--text-muted); text-decoration: none;">⚡ 24h 2.0% Tether Daily Yield</a></li>
                <li><a href="<?php echo home_url('/deposit/'); ?>" style="color: var(--text-muted); text-decoration: none;">🇬🇧 UK Faster Payments (GBP)</a></li>
                <li><a href="<?php echo home_url('/deposit/'); ?>" style="color: var(--text-muted); text-decoration: none;">🇪🇺 Europe SEPA Direct (EUR)</a></li>
                <li><a href="<?php echo home_url('/deposit/'); ?>" style="color: var(--text-muted); text-decoration: none;">🇺🇸 USA Fedwire &amp; ACH (USD)</a></li>
                <li><a href="<?php echo home_url('/savings/'); ?>" style="color: var(--text-muted); text-decoration: none;">🏦 High-Yield Savings (${savingsApy}% APY)</a></li>
            </ul>
        </div>

        <div>
            <h4 style="color: #fae188; font-size: 14px; margin-bottom: 14px; font-weight: 700;">Institutional &amp; Legal</h4>
            <ul style="list-style: none; padding: 0; font-size: 12px; line-height: 2;">
                <li><a href="<?php echo home_url('/about/'); ?>" style="color: var(--text-muted); text-decoration: none;">About Tethra Financial</a></li>
                <li><a href="<?php echo home_url('/security-policy/'); ?>" style="color: var(--text-muted); text-decoration: none;">ISO 27001 &amp; SOC-2 Security</a></li>
                <li><a href="<?php echo home_url('/terms/'); ?>" style="color: var(--text-muted); text-decoration: none;">Master Service Agreement</a></li>
                <li><a href="<?php echo home_url('/privacy/'); ?>" style="color: var(--text-muted); text-decoration: none;">Global Privacy &amp; GDPR</a></li>
                <li><a href="<?php echo home_url('/press/'); ?>" style="color: var(--text-muted); text-decoration: none;">Regulatory Licenses &amp; Press</a></li>
            </ul>
        </div>

        <div>
            <h4 style="color: #fae188; font-size: 14px; margin-bottom: 14px; font-weight: 700;">24/7 Client Desk</h4>
            <p style="font-size: 12px; margin-bottom: 10px;">
                Direct WhatsApp Concierge:<br>
                <a href="https://wa.me/${cleanPhone}" target="_blank" style="color: #25D366; font-weight: bold; text-decoration: none;">💬 ${supportPhone}</a>
            </p>
            <p style="font-size: 12px; margin-bottom: 10px;">
                Telephone Hotline:<br>
                <a href="tel:${cleanPhone}" style="color: #fae188; text-decoration: none; font-weight: 600;">📞 ${supportPhone}</a>
            </p>
            <p style="font-size: 12px;">
                Official Inquiries:<br>
                <a href="mailto:${adminEmail}" style="color: var(--text-muted); text-decoration: none;">${adminEmail}</a>
            </p>
        </div>
    </div>

    <div class="tethra-container" style="padding: 20px 0 0; border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 11px; color: #588072;">
        <div>&copy; <?php echo date('Y'); ?> ${siteName}. All Rights Reserved. Pure WordPress 100% Native Architecture.</div>
        <div>Encrypted 256-bit TLS &bull; Multi-Jurisdictional Segregated Client Vaults</div>
    </div>
</footer>

<!-- 24/7 Floating Support Launcher -->
<div style="position: fixed; bottom: 24px; right: 24px; z-index: 999999;">
    <a href="https://wa.me/${cleanPhone}?text=Hello%20Tethra%20Support%2C%20I%20need%20assistance" target="_blank" rel="noopener noreferrer" style="width: 56px; height: 56px; border-radius: 50%; background: #25D366; border: 2px solid #ffffff; box-shadow: 0 8px 25px rgba(37,211,102,0.45); display: flex; align-items: center; justify-content: center; text-decoration: none; font-size: 26px; transition: transform 0.2s;" title="Chat on WhatsApp">
        💬
    </a>
</div>

<?php wp_footer(); ?>
</body>
</html>
`;

  // ==========================================
  // 5. THEME: front-page.php (Home)
  // ==========================================
  const themeFrontPagePhp = `<?php
/**
 * Template Name: Native Home Page
 */
get_header();
?>

<main class="tethra-container">
    <!-- Hero Banner -->
    <div style="background: radial-gradient(circle at top right, #083c2e 0%, #031510 70%); border: 1px solid var(--border-gold); border-radius: 24px; padding: 48px 32px; text-align: center; margin-bottom: 36px; box-shadow: 0 15px 40px rgba(0,0,0,0.6);">
        <div class="tethra-badge tethra-badge-gold" style="margin-bottom: 16px;">
            ⚡ PURE WORDPRESS NATIVE FINTECH &bull; UK &bull; EUROPE &bull; USA &bull; 2.0% DAILY TETHER ENGINE
        </div>
        <h1 style="font-size: 40px; font-weight: 800; color: #ffffff; margin-bottom: 16px; line-height: 1.2;">
            Institutional Global Banking &amp; 24-Hour Automated Crypto Staking
        </h1>
        <p style="font-size: 15px; color: var(--text-muted); max-width: 780px; margin: 0 auto 28px; line-height: 1.7;">
            Transact effortlessly with real <strong>UK Faster Payments</strong> (Sort Code), <strong>European SEPA</strong> (IBAN), <strong>USA ACH/Fedwire</strong>, and <strong>Tether USDT</strong>. Lock capital in smart contracts to earn a guaranteed <strong>2.0% daily return</strong> compounded every 24 hours.
        </p>

        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="<?php echo home_url('/register/'); ?>" class="tethra-btn-gold" style="padding: 14px 28px; font-size: 15px;">
                <span>🚀 Open Free Account with Phone PIN</span>
            </a>
            <a href="<?php echo home_url('/invest/'); ?>" class="tethra-btn-outline" style="padding: 14px 24px; font-size: 14px;">
                <span>📈 2.0% Tether Daily Yield Calculator</span>
            </a>
            <a href="https://wa.me/${cleanPhone}?text=Hello%20Tethra%20Support" target="_blank" class="tethra-btn-whatsapp" style="padding: 14px 22px;">
                <span>💬 24/7 WhatsApp Hotline</span>
            </a>
        </div>
    </div>

    <!-- Live Multi-Rail Banking Cards -->
    <div class="tethra-grid-3" style="margin-bottom: 36px;">
        <div class="tethra-card">
            <div style="font-size: 32px; margin-bottom: 12px;">🇬🇧</div>
            <h3 style="color: #fae188; font-size: 18px; margin-bottom: 8px;">UK Faster Payments (GBP)</h3>
            <p style="color: var(--text-muted); font-size: 13px; line-height: 1.6;">
                Direct 6-digit sort codes and individual account numbers. Near-instant settlement across all UK clearing banks (BACS &amp; CHAPS).
            </p>
        </div>

        <div class="tethra-card">
            <div style="font-size: 32px; margin-bottom: 12px;">🇪🇺</div>
            <h3 style="color: #10b981; font-size: 18px; margin-bottom: 8px;">Eurozone SEPA Instant (EUR)</h3>
            <p style="color: var(--text-muted); font-size: 13px; line-height: 1.6;">
                Dedicated IBAN generation and SWIFT/BIC clearing for 36 SEPA member states with same-hour euro liquidity.
            </p>
        </div>

        <div class="tethra-card">
            <div style="font-size: 32px; margin-bottom: 12px;">🇺🇸</div>
            <h3 style="color: #38bdf8; font-size: 18px; margin-bottom: 8px;">USA Fedwire &amp; ACH (USD)</h3>
            <p style="color: var(--text-muted); font-size: 13px; line-height: 1.6;">
                9-digit ABA routing numbers, domestic wire disbursement, and next-day ACH debit/credit rails with Tier-1 USA custody.
            </p>
        </div>
    </div>

    <!-- 2% Daily Tether Yield High-Impact Banner -->
    <div class="tethra-card tethra-card-highlight" style="padding: 36px; margin-bottom: 36px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px;">
            <div style="max-width: 680px;">
                <div class="tethra-badge tethra-badge-emerald" style="margin-bottom: 10px;">AUTOMATED NATIVE WORDPRESS CRON YIELD</div>
                <h2 style="color: #ffffff; font-size: 26px; font-weight: 800;">Automated 2% 24-Hour Tether (USDT) Income</h2>
                <p style="color: #c8e3d8; font-size: 14px; margin-top: 8px; line-height: 1.6;">
                    Stake USDT on TRC-20, ERC-20, or BEP-20. The native WordPress background engine computes your 2.0% net return precisely every 24 hours, crediting your withdrawable balance automatically.
                </p>
            </div>
            <div>
                <a href="<?php echo home_url('/invest/'); ?>" class="tethra-btn-gold" style="padding: 14px 28px; font-size: 15px;">
                    <span>Start Earning 2% Now &rarr;</span>
                </a>
            </div>
        </div>
    </div>

    <!-- Quick Navigation to All Platform Modules -->
    <div class="tethra-card">
        <h3 style="color: #fae188; font-size: 18px; margin-bottom: 18px; font-weight: 700;">Explore All Tethra Modules</h3>
        <div class="tethra-grid-4">
            <a href="<?php echo home_url('/accounts/'); ?>" class="tethra-nav-tab" style="background: #02110c; border: 1px solid #0f4637;">
                💳 Multi-Currency Accounts
            </a>
            <a href="<?php echo home_url('/deposit/'); ?>" class="tethra-nav-tab" style="background: #02110c; border: 1px solid #0f4637;">
                📥 Global Bank Deposit
            </a>
            <a href="<?php echo home_url('/withdraw/'); ?>" class="tethra-nav-tab" style="background: #02110c; border: 1px solid #0f4637;">
                📤 Instant Withdrawal
            </a>
            <a href="<?php echo home_url('/savings/'); ?>" class="tethra-nav-tab" style="background: #02110c; border: 1px solid #0f4637;">
                🏦 ${savingsApy}% Savings Vaults
            </a>
            <a href="<?php echo home_url('/crypto/'); ?>" class="tethra-nav-tab" style="background: #02110c; border: 1px solid #0f4637;">
                📊 Live Crypto Ticker
            </a>
            <a href="<?php echo home_url('/referrals/'); ?>" class="tethra-nav-tab" style="background: #02110c; border: 1px solid #0f4637;">
                🎁 Affiliate &amp; Referrals
            </a>
            <a href="<?php echo home_url('/kyc/'); ?>" class="tethra-nav-tab" style="background: #02110c; border: 1px solid #0f4637;">
                🛡️ KYC ID Verification
            </a>
            <a href="<?php echo home_url('/support/'); ?>" class="tethra-nav-tab" style="background: #02110c; border: 1px solid #0f4637;">
                💬 24/7 Client Helpdesk
            </a>
        </div>
    </div>
</main>

<?php get_footer(); ?>
`;

  // ==========================================
  // 6. THEME: page-dashboard.php
  // ==========================================
  const themeDashboardPhp = `<?php
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
    <!-- User Welcome Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <div>
            <h1 style="font-size: 26px; font-weight: 800; color: #ffffff;">
                Welcome, <?php echo esc_html($user->first_name ?: $user->display_name); ?>
            </h1>
            <div style="font-size: 12px; color: var(--text-muted); display: flex; align-items: center; gap: 10px; margin-top: 4px; flex-wrap: wrap;">
                <span>ID: <strong>TETHRA-<?php echo esc_html($user_id + 100000); ?></strong></span>
                <span class="tethra-badge tethra-badge-emerald">● Verified</span>
                <span class="tethra-badge tethra-badge-gold">🔒 6-Digit PIN Protected</span>
            </div>
        </div>

        <div style="display: flex; gap: 10px;">
            <a href="<?php echo home_url('/deposit/'); ?>" class="tethra-btn-gold" style="padding: 10px 18px; font-size: 13px;">+ Deposit</a>
            <a href="<?php echo home_url('/withdraw/'); ?>" class="tethra-btn-outline" style="padding: 10px 18px; font-size: 13px;">&uarr; Withdraw</a>
            <a href="<?php echo home_url('/invest/'); ?>" style="background: #10b981; color: #ffffff; font-weight: 700; padding: 10px 18px; border-radius: 10px; text-decoration: none; font-size: 13px;">⚡ 2% Yield</a>
        </div>
    </div>

    <!-- Multi-Currency Wallet Balances Grid -->
    <div class="tethra-grid-4" style="margin-bottom: 24px;">
        <div class="tethra-card">
            <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">🇺🇸 USD Checking</span>
            <div class="tethra-balance-num" style="margin: 8px 0;">$<?php echo number_format($wallet->balance_usd ?? 0, 2); ?></div>
            <span style="font-size: 11px; color: #10b981;">ACH / Fedwire Active</span>
        </div>

        <div class="tethra-card">
            <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">🇪🇺 EUR &bull; 🇬🇧 GBP</span>
            <div class="tethra-balance-num" style="margin: 8px 0; font-size: 20px;">
                &euro;<?php echo number_format($wallet->balance_eur ?? 0, 2); ?> / &pound;<?php echo number_format($wallet->balance_gbp ?? 0, 2); ?>
            </div>
            <span style="font-size: 11px; color: #38bdf8;">SEPA &bull; Faster Payments</span>
        </div>

        <div class="tethra-card" style="border-color: rgba(212,175,55,0.6); background: linear-gradient(135deg, #042018 0%, #0a3a2c 100%);">
            <span style="font-size: 12px; color: #fae188; font-weight: 700;">⚡ Tether (USDT) Staking</span>
            <div class="tethra-balance-num" style="margin: 8px 0; color: #fae188;"><?php echo number_format($wallet->balance_usdt ?? 0, 2); ?> USDT</div>
            <span style="font-size: 11px; color: #10b981;">2.0% Daily Yield Engine</span>
        </div>

        <div class="tethra-card">
            <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">🏦 High-Yield Savings</span>
            <div class="tethra-balance-num" style="margin: 8px 0;">$<?php echo number_format($wallet->savings_balance ?? 0, 2); ?></div>
            <span style="font-size: 11px; color: #fae188;">${savingsApy}% Fixed Annual APY</span>
        </div>
    </div>

    <!-- Active 24H 2% Yield Contracts -->
    <div class="tethra-card" style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
            <h3 style="color: #ffffff; font-size: 16px; font-weight: 700;">⚡ Active 24-Hour 2% Daily Tether Contracts</h3>
            <a href="<?php echo home_url('/invest/'); ?>" style="color: #fae188; font-size: 12px; text-decoration: none; font-weight: bold;">+ New Contract &rarr;</a>
        </div>

        <?php if (empty($investments)): ?>
            <div style="text-align: center; padding: 24px; background: #02110c; border-radius: 12px; color: var(--text-muted); font-size: 13px;">
                No active 2% staking contracts. Allocate USDT to start earning daily income.
                <div style="margin-top: 12px;">
                    <a href="<?php echo home_url('/invest/'); ?>" class="tethra-btn-gold" style="font-size: 12px; padding: 8px 16px;">Allocate USDT Now</a>
                </div>
            </div>
        <?php else: ?>
            <div style="overflow-x: auto;">
                <table class="tethra-table">
                    <thead>
                        <tr>
                            <th>Contract Plan</th>
                            <th>Principal Locked</th>
                            <th>Daily ROI</th>
                            <th>Next 24h Payout</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($investments as $inv): ?>
                        <tr>
                            <td style="font-weight: 700; color: #fae188;"><?php echo esc_html($inv->plan_name); ?></td>
                            <td style="font-family: monospace; font-weight: 700;"><?php echo number_format($inv->amount_usdt, 2); ?> USDT</td>
                            <td style="color: #10b981; font-weight: 700;">+<?php echo number_format($inv->amount_usdt * 0.02, 2); ?> USDT (2.0%)</td>
                            <td style="color: var(--text-muted);"><?php echo esc_html($inv->next_payout_time); ?></td>
                            <td><span class="tethra-badge tethra-badge-emerald">● Compounding</span></td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
    </div>

    <!-- Recent Transactions Ledger -->
    <div class="tethra-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="color: #ffffff; font-size: 16px; font-weight: 700;">Recent Transactions Ledger</h3>
            <a href="<?php echo home_url('/transactions/'); ?>" style="color: #fae188; font-size: 12px; text-decoration: none; font-weight: bold;">View Full Ledger &rarr;</a>
        </div>

        <?php if (empty($transactions)): ?>
            <p style="color: var(--text-muted); font-size: 13px;">No transaction records found.</p>
        <?php else: ?>
            <div style="overflow-x: auto;">
                <table class="tethra-table">
                    <thead>
                        <tr>
                            <th>Ref ID</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($transactions as $tx): ?>
                        <tr>
                            <td style="font-family: monospace; color: var(--gold-light);"><?php echo esc_html($tx->reference_id); ?></td>
                            <td style="text-transform: capitalize; font-weight: 600;"><?php echo esc_html($tx->type); ?></td>
                            <td style="font-family: monospace; font-weight: 700; color: <?php echo in_array($tx->type, ['deposit', 'yield_payout']) ? '#10b981' : '#ffffff'; ?>;">
                                <?php echo ($tx->currency === 'USDT' ? '' : '$') . number_format($tx->amount, 2) . ' ' . esc_html($tx->currency); ?>
                            </td>
                            <td style="color: var(--text-muted);"><?php echo esc_html($tx->method); ?></td>
                            <td><span class="tethra-badge tethra-badge-emerald"><?php echo esc_html($tx->status); ?></span></td>
                            <td style="color: var(--text-muted); font-size: 12px;"><?php echo esc_html($tx->created_at); ?></td>
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

  // ==========================================
  // 7. THEME: page-invest.php (2% Yield Engine)
  // ==========================================
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
    <div style="max-width: 840px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 28px;">
            <div class="tethra-badge tethra-badge-gold" style="margin-bottom: 10px;">⚡ AUTOMATED 24-HOUR CRYPTO YIELD</div>
            <h1 style="font-size: 32px; font-weight: 800; color: #ffffff;">Invest Tether &amp; Earn 2.0% Daily</h1>
            <p style="color: var(--text-muted); font-size: 14px; margin-top: 6px;">
                Every 24 hours, your 2.0% daily return is automatically processed by the native WordPress cron engine and added to your balance.
            </p>
        </div>

        <?php if (!empty($_GET['success'])): ?>
            <div style="background: rgba(16,185,129,0.15); border: 1px solid #10b981; color: #10b981; padding: 14px; border-radius: 12px; margin-bottom: 20px; text-align: center; font-weight: 600;">
                🎉 2.0% 24-Hour Yield Contract successfully activated! First payout in 24 hours.
            </div>
        <?php endif; ?>

        <?php if (!empty($_GET['error'])): ?>
            <div style="background: rgba(239,68,68,0.15); border: 1px solid #ef4444; color: #ef4444; padding: 14px; border-radius: 12px; margin-bottom: 20px; text-align: center; font-weight: 600;">
                ❌ Insufficient USDT balance. Please deposit USDT into your wallet first.
            </div>
        <?php endif; ?>

        <div class="tethra-card tethra-card-highlight">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid rgba(212,175,55,0.2); padding-bottom: 14px; flex-wrap: wrap; gap: 10px;">
                <div>
                    <span style="font-size: 12px; color: var(--text-muted);">Available USDT Balance:</span>
                    <div style="font-size: 24px; font-weight: 800; color: #fae188; font-family: monospace;"><?php echo number_format($wallet->balance_usdt ?? 0, 2); ?> USDT</div>
                </div>
                <a href="<?php echo home_url('/deposit/'); ?>" class="tethra-btn-gold" style="padding: 8px 16px; font-size: 12px;">+ Deposit USDT</a>
            </div>

            <form method="POST" action="">
                <?php wp_nonce_field('tethra_invest_nonce'); ?>
                <input type="hidden" name="tethra_action" value="invest_tether">

                <div style="margin-bottom: 20px;">
                    <label style="font-size: 13px; font-weight: 700; color: #ffffff;">Enter Amount to Allocate in 2% Yield Contract (USDT)</label>
                    <input type="number" step="0.01" min="50" name="amount" required placeholder="e.g. 500" class="tethra-input" style="font-size: 18px; font-family: monospace; font-weight: bold; color: #fae188;" oninput="calcYield(this.value)">
                    <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px; display: block;">Minimum investment: 50 USDT &bull; Automated 24-hour compounding</span>
                </div>

                <!-- Live Yield Calculator Box -->
                <div style="background: #02110c; border: 1px solid #0f4637; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 10px;">
                        <span style="color: var(--text-muted);">Daily 24-Hour Return (2.0%):</span>
                        <strong id="daily-yield-preview" style="color: #10b981; font-family: monospace; font-size: 15px;">+0.00 USDT</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 10px;">
                        <span style="color: var(--text-muted);">Estimated 30-Day Earnings:</span>
                        <strong id="monthly-yield-preview" style="color: #fae188; font-family: monospace; font-size: 15px;">+0.00 USDT</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 13px;">
                        <span style="color: var(--text-muted);">Payout Schedule:</span>
                        <span style="color: #ffffff; font-weight: 600;">Automatically every 24 Hours via Native WP Cron</span>
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

  // ==========================================
  // 8. THEME: page-deposit.php
  // ==========================================
  const themePageDepositPhp = `<?php
/**
 * Template Name: Native Deposit Page
 */
if (!is_user_logged_in()) {
    wp_redirect(home_url('/login/'));
    exit;
}
get_header();
$user_id = get_current_user_id();
$user = get_userdata($user_id);
$accs = tethra_get_deposit_accounts();
?>

<main class="tethra-container">
    <div style="max-width: 950px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 28px;">
            <div class="tethra-badge tethra-badge-gold" style="margin-bottom: 8px;">GLOBAL BANKING &amp; CRYPTO LIQUIDITY</div>
            <h1 style="font-size: 28px; font-weight: 800; color: #ffffff;">Deposit Funds to Your Tethra Account</h1>
            <p style="color: var(--text-muted); font-size: 13px;">Official designated institutional clearing accounts. Dynamic settlement rails managed directly by treasury desk.</p>
        </div>

        <?php if (!empty($_GET['error'])): ?>
            <div style="background: rgba(239,68,68,0.15); border: 1px solid #ef4444; color: #ef4444; padding: 12px; border-radius: 10px; margin-bottom: 18px; font-size: 13px; text-align: center;">
                ❌ Error submitting deposit notification. Please ensure valid amount.
            </div>
        <?php endif; ?>

        <!-- Configured Deposit Rails Grid (Dynamically editable in WP-Admin) -->
        <div class="tethra-grid-2" style="margin-bottom: 30px;">
            <!-- UK Bank Transfer (GBP) -->
            <div class="tethra-card">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
                    <span style="font-size: 24px;">🇬🇧</span>
                    <div>
                        <strong style="color: #ffffff; font-size: 15px;">UK Faster Payments (GBP)</strong>
                        <div style="font-size: 11px; color: #10b981;">Instant 6-Digit Sort Code Settlement</div>
                    </div>
                </div>
                <div style="background: #02110c; padding: 14px; border-radius: 10px; font-size: 12px; line-height: 1.8;">
                    <div>Bank: <strong><?php echo esc_html($accs['uk_bank_name']); ?></strong></div>
                    <div>Account Name: <strong><?php echo esc_html($accs['uk_account_name']); ?></strong></div>
                    <div>Sort Code: <strong style="color: #fae188; font-family: monospace;"><?php echo esc_html($accs['uk_sort_code']); ?></strong></div>
                    <div>Account Number: <strong style="color: #fae188; font-family: monospace;"><?php echo esc_html($accs['uk_account_number']); ?></strong></div>
                    <div>Payment Reference: <strong style="color: #10b981; font-family: monospace;">TETHRA-<?php echo esc_html($user_id + 100000); ?></strong></div>
                </div>
            </div>

            <!-- Europe SEPA (EUR) -->
            <div class="tethra-card">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
                    <span style="font-size: 24px;">🇪🇺</span>
                    <div>
                        <strong style="color: #ffffff; font-size: 15px;">Europe SEPA Direct (EUR)</strong>
                        <div style="font-size: 11px; color: #10b981;">SEPA Instant &amp; Standard IBAN</div>
                    </div>
                </div>
                <div style="background: #02110c; padding: 14px; border-radius: 10px; font-size: 12px; line-height: 1.8;">
                    <div>Bank: <strong><?php echo esc_html($accs['eu_bank_name']); ?></strong></div>
                    <div>Beneficiary: <strong><?php echo esc_html($accs['eu_account_name']); ?></strong></div>
                    <div>IBAN: <strong style="color: #fae188; font-family: monospace; word-break: break-all;"><?php echo esc_html($accs['eu_iban']); ?></strong></div>
                    <div>BIC / SWIFT: <strong style="color: #fae188; font-family: monospace;"><?php echo esc_html($accs['eu_bic']); ?></strong></div>
                    <div>Reference: <strong style="color: #10b981; font-family: monospace;">TETHRA-<?php echo esc_html($user_id + 100000); ?></strong></div>
                </div>
            </div>

            <!-- USA ACH / Wire (USD) -->
            <div class="tethra-card">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
                    <span style="font-size: 24px;">🇺🇸</span>
                    <div>
                        <strong style="color: #ffffff; font-size: 15px;">USA ACH &amp; Fedwire (USD)</strong>
                        <div style="font-size: 11px; color: #38bdf8;">ABA Routing &amp; Direct Checking</div>
                    </div>
                </div>
                <div style="background: #02110c; padding: 14px; border-radius: 10px; font-size: 12px; line-height: 1.8;">
                    <div>Bank: <strong><?php echo esc_html($accs['us_bank_name']); ?></strong></div>
                    <div>Account Name: <strong><?php echo esc_html($accs['us_account_name']); ?></strong></div>
                    <div>ABA Routing: <strong style="color: #fae188; font-family: monospace;"><?php echo esc_html($accs['us_routing']); ?></strong></div>
                    <div>Account Number: <strong style="color: #fae188; font-family: monospace;"><?php echo esc_html($accs['us_account_number']); ?></strong></div>
                    <div>Memo/Reference: <strong style="color: #10b981; font-family: monospace;">TETHRA-<?php echo esc_html($user_id + 100000); ?></strong></div>
                </div>
            </div>

            <!-- Tether (USDT) Crypto Deposit -->
            <div class="tethra-card" style="border-color: rgba(212,175,55,0.6); background: linear-gradient(135deg, #042018 0%, #0a3a2c 100%);">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
                    <span style="font-size: 24px;">⚡</span>
                    <div>
                        <strong style="color: #fae188; font-size: 15px;">Tether USDT (TRC-20)</strong>
                        <div style="font-size: 11px; color: #10b981;">Instant 2% Daily Yield Staking Rail</div>
                    </div>
                </div>
                <div style="background: #02110c; padding: 14px; border-radius: 10px; font-size: 12px; line-height: 1.8;">
                    <div>Network: <strong>TRON (TRC-20)</strong></div>
                    <div style="word-break: break-all;">Deposit Address:<br><strong style="color: #fae188; font-family: monospace; font-size: 12px;"><?php echo esc_html($accs['usdt_trc20_address']); ?></strong></div>
                    <div style="font-size: 11px; color: #10b981; margin-top: 6px;">⚡ Credited after 1 confirmation &bull; Auto-approval by admin desk.</div>
                </div>
            </div>
        </div>

        <!-- Submit Deposit Confirmation / Proof Form -->
        <div class="tethra-card tethra-card-highlight">
            <h3 style="color: #fae188; font-size: 18px; margin-bottom: 8px; font-weight: 700;">Submit Deposit Notification &amp; Proof of Payment</h3>
            <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 20px;">After completing your wire transfer or crypto deposit, submit the details below. Our admin treasury desk will verify and credit your balance immediately.</p>

            <form method="POST" action="">
                <?php wp_nonce_field('tethra_deposit_proof_nonce'); ?>
                <input type="hidden" name="tethra_action" value="submit_deposit_proof">

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Payment Rail Used</label>
                        <select name="method" class="tethra-input" required>
                            <option value="UK Faster Payments (GBP)">🇬🇧 UK Faster Payments (GBP)</option>
                            <option value="Europe SEPA Direct (EUR)">🇪🇺 Europe SEPA (EUR)</option>
                            <option value="USA ACH / Wire (USD)">🇺🇸 USA ACH / Fedwire (USD)</option>
                            <option value="USDT TRC-20">⚡ Tether USDT (TRC-20)</option>
                            <option value="USDT ERC-20">⚡ Tether USDT (ERC-20)</option>
                            <option value="Bitcoin (BTC)">🪙 Bitcoin (BTC)</option>
                        </select>
                    </div>

                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Currency</label>
                        <select name="currency" class="tethra-input" required>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="USDT">USDT</option>
                        </select>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Deposited Amount</label>
                        <input type="number" step="0.01" min="10" name="amount" required placeholder="5000.00" class="tethra-input" style="font-family: monospace; font-size: 16px; font-weight: bold; color: #fae188;">
                    </div>
                    <div>
                        <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Transfer Reference / Blockchain TxHash</label>
                        <input type="text" name="tx_reference" required placeholder="e.g. BARC84920194 or TxHash" class="tethra-input">
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Sender Name / Notes for Compliance</label>
                    <textarea name="notes" rows="2" placeholder="e.g. Sent from John Doe Barclays account" class="tethra-input"></textarea>
                </div>

                <button type="submit" class="tethra-btn-gold" style="width: 100%; padding: 14px; font-size: 15px;">
                    <span>📥 Submit Deposit Confirmation to Admin Desk &rarr;</span>
                </button>
            </form>
        </div>
    </div>
</main>

<?php get_footer(); ?>
`;

  // ==========================================
  // 9. THEME: page-withdraw.php
  // ==========================================
  const themePageWithdrawPhp = `<?php
/**
 * Template Name: Native Withdrawal Page
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
    <div style="max-width: 680px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 28px;">
            <div class="tethra-badge tethra-badge-gold" style="margin-bottom: 8px;">SECURE PAYOUT PIPELINE</div>
            <h1 style="font-size: 28px; font-weight: 800; color: #ffffff;">Authorize Account Withdrawal</h1>
            <p style="color: var(--text-muted); font-size: 13px;">Withdraw directly to UK, European, or USA bank accounts or instant USDT wallet.</p>
        </div>

        <?php if (!empty($_GET['error'])): ?>
            <div style="background: rgba(239,68,68,0.15); border: 1px solid #ef4444; color: #ef4444; padding: 12px; border-radius: 10px; margin-bottom: 18px; font-size: 13px; text-align: center;">
                <?php echo $_GET['error'] === 'invalid_pin' ? '❌ Invalid 6-Digit PIN. Please verify and retry.' : '❌ Withdrawal failed. Please check your available balance.'; ?>
            </div>
        <?php endif; ?>

        <div class="tethra-card">
            <form method="POST" action="">
                <?php wp_nonce_field('tethra_withdraw_nonce'); ?>
                <input type="hidden" name="tethra_action" value="submit_withdrawal">

                <div style="margin-bottom: 16px;">
                    <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Select Payout Currency</label>
                    <select name="currency" class="tethra-input">
                        <option value="USD">🇺🇸 USD (USA ACH / Wire) - Bal: $<?php echo number_format($wallet->balance_usd ?? 0, 2); ?></option>
                        <option value="EUR">🇪🇺 EUR (SEPA Direct) - Bal: €<?php echo number_format($wallet->balance_eur ?? 0, 2); ?></option>
                        <option value="GBP">🇬🇧 GBP (UK Faster Payments) - Bal: £<?php echo number_format($wallet->balance_gbp ?? 0, 2); ?></option>
                        <option value="USDT">⚡ USDT (TRC-20 / ERC-20) - Bal: <?php echo number_format($wallet->balance_usdt ?? 0, 2); ?> USDT</option>
                    </select>
                </div>

                <div style="margin-bottom: 16px;">
                    <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Withdrawal Rail / Method</label>
                    <select name="method" class="tethra-input">
                        <option value="uk_faster_payments">🇬🇧 UK Sort Code &amp; Account Number</option>
                        <option value="eu_sepa">🇪🇺 Europe SEPA IBAN &amp; BIC</option>
                        <option value="usa_ach">🇺🇸 USA ACH / ABA Routing</option>
                        <option value="crypto_usdt">⚡ Tether USDT (TRC-20)</option>
                    </select>
                </div>

                <div style="margin-bottom: 16px;">
                    <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Amount to Withdraw</label>
                    <input type="number" step="0.01" min="10" name="amount" required placeholder="0.00" class="tethra-input" style="font-family: monospace; font-size: 16px; font-weight: bold; color: #fae188;">
                </div>

                <div style="margin-bottom: 16px;">
                    <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Destination Bank Details or USDT Wallet Address</label>
                    <textarea name="destination_details" rows="3" required placeholder="e.g. IBAN: DE89..., Sort Code: 20-40-50, or TRC-20 Address: TYDhh..." class="tethra-input"></textarea>
                </div>

                <div style="margin-bottom: 24px;">
                    <label style="font-size: 12px; color: #fae188; font-weight: 700;">Enter 6-Digit Security PIN</label>
                    <input type="password" maxlength="6" pattern="[0-9]*" inputmode="numeric" name="pin_code" required placeholder="••••••" class="tethra-input" style="letter-spacing: 4px; text-align: center; font-size: 18px;">
                </div>

                <button type="submit" class="tethra-btn-gold" style="width: 100%; padding: 14px; font-size: 15px;">
                    <span>🔒 Authorize &amp; Process Payout &rarr;</span>
                </button>
            </form>
        </div>
    </div>
</main>

<?php get_footer(); ?>
`;

  // ==========================================
  // 10. THEME: page-login.php & page-register.php
  // ==========================================
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

        <div style="display: flex; background: #02110c; padding: 4px; border-radius: 10px; margin-bottom: 20px; border: 1px solid #0f4637;">
            <button onclick="switchLoginMode('pin')" id="tab-pin" style="flex: 1; padding: 8px; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; cursor: pointer; background: #d4af37; color: #031d16;">📱 Phone + PIN Login</button>
            <button onclick="switchLoginMode('email')" id="tab-email" style="flex: 1; padding: 8px; border-radius: 8px; border: none; font-size: 12px; font-weight: 700; cursor: pointer; background: transparent; color: var(--text-muted);">✉️ Email + Password</button>
        </div>

        <form method="POST" action="">
            <?php wp_nonce_field('tethra_login_nonce'); ?>
            <input type="hidden" name="tethra_action" value="login">
            <input type="hidden" name="login_mode" id="login_mode" value="pin">

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
            Don't have an account? <a href="<?php echo home_url('/register/'); ?>" style="color: #fae188; font-weight: bold; text-decoration: none;">Create Free Account</a>
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
            <p style="color: var(--text-muted); font-size: 13px; margin-top: 4px;">Instant Registration &bull; UK/EU/US Multi-Currency &bull; 6-Digit PIN Security</p>
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
                <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Phone Number (Used for SMS &amp; PIN Verification)</label>
                <div style="display: flex; gap: 8px;">
                    <select name="phone_country" class="tethra-input" style="width: 110px; background: #02110c;">
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+33">🇫🇷 +33</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+971">🇦🇪 +971</option>
                    </select>
                    <input type="tel" name="phone" required placeholder="555 123 4567" class="tethra-input" style="flex: 1;">
                </div>
            </div>

            <div style="margin-bottom: 14px;">
                <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Email Verification OTP / Security PIN</label>
                <div style="display: flex; gap: 8px;">
                    <input type="text" maxlength="6" pattern="[0-9]*" inputmode="numeric" name="email_otp" placeholder="Enter 6-digit Code (e.g. 742918)" value="742918" class="tethra-input" style="letter-spacing: 2px; font-weight: bold; color: #fae188;">
                    <button type="button" class="tethra-btn-outline" style="white-space: nowrap; font-size: 11px; padding: 0 12px;" onclick="alert('Verification OTP code sent to your email address!');">Send OTP</button>
                </div>
                <small style="color: #10b981; font-size: 11px; margin-top: 2px; display: block;">✓ Email verified via automated institutional gateway</small>
            </div>

            <div style="margin-bottom: 14px;">
                <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Referral ID / Reference Code (Optional)</label>
                <input type="text" name="ref_code" placeholder="e.g. REF-88219 (Earns +$25.00 Instant Welcome Bounty)" value="<?php echo esc_attr($_GET['ref'] ?? ''); ?>" class="tethra-input">
                <small style="color: #fae188; font-size: 11px; margin-top: 2px; display: block;">🎁 Receive $25.00 cash bonus credited to your wallet upon verification</small>
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
                    <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
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

  // ==========================================
  // 11. ADDITIONAL SUBPAGES (About, Contact, FAQ, Terms, Privacy, Security, Accounts, Savings, Crypto, Referrals, KYC)
  // ==========================================
  const themePageAboutPhp = `<?php
/**
 * Template Name: Native About Page
 */
get_header();
?>
<main class="tethra-container">
    <div style="max-width: 900px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 36px;">
            <div class="tethra-badge tethra-badge-gold" style="margin-bottom: 10px;">INSTITUTIONAL GRADE</div>
            <h1 style="font-size: 34px; font-weight: 800; color: #ffffff;">About Tethra Financial Infrastructure</h1>
            <p style="color: var(--text-muted); font-size: 15px; margin-top: 8px;">
                Empowering businesses and private clients with multi-currency banking rails, automated crypto yield compounding, and segregated vault custody.
            </p>
        </div>

        <div class="tethra-card" style="margin-bottom: 24px;">
            <h2 style="color: #fae188; font-size: 20px; margin-bottom: 12px;">Our Mission &amp; Standards</h2>
            <p style="color: var(--text-muted); font-size: 14px; line-height: 1.8; margin-bottom: 16px;">
                Tethra was engineered to dissolve the friction between traditional global banking (UK Faster Payments, European SEPA, USA Fedwire) and high-throughput blockchain liquidity. We operate with strict adherence to ISO 27001 data security, SOC-2 Type II audit standards, and real-time ledger immutability.
            </p>
            <div class="tethra-grid-3">
                <div style="background: #02110c; padding: 16px; border-radius: 12px;">
                    <strong style="color: #10b981; font-size: 16px;">$1.2B+</strong>
                    <div style="font-size: 12px; color: var(--text-muted);">Quarterly Volume Processed</div>
                </div>
                <div style="background: #02110c; padding: 16px; border-radius: 12px;">
                    <strong style="color: #fae188; font-size: 16px;">36+</strong>
                    <div style="font-size: 12px; color: var(--text-muted);">Supported Jurisdictions</div>
                </div>
                <div style="background: #02110c; padding: 16px; border-radius: 12px;">
                    <strong style="color: #38bdf8; font-size: 16px;">24/7/365</strong>
                    <div style="font-size: 12px; color: var(--text-muted);">Dedicated Concierge Support</div>
                </div>
            </div>
        </div>
    </div>
</main>
<?php get_footer(); ?>
`;

  const themePageAccountsPhp = `<?php
/**
 * Template Name: Native Accounts & Cards Page
 */
if (!is_user_logged_in()) { wp_redirect(home_url('/login/')); exit; }
get_header();
$user_id = get_current_user_id();
$wallet = tethra_get_current_user_wallets($user_id);
?>
<main class="tethra-container">
    <h1 style="font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 20px;">Multi-Currency Accounts &amp; Cards</h1>
    
    <div class="tethra-grid-3" style="margin-bottom: 24px;">
        <div class="tethra-card">
            <span class="tethra-badge tethra-badge-blue" style="margin-bottom: 10px;">🇺🇸 PRIMARY USD</span>
            <div class="tethra-balance-num">$<?php echo number_format($wallet->balance_usd ?? 0, 2); ?></div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 8px;">
                Routing: 021000021 &bull; Acct: 9840219482
            </div>
        </div>

        <div class="tethra-card">
            <span class="tethra-badge tethra-badge-emerald" style="margin-bottom: 10px;">🇪🇺 EURO SEPA</span>
            <div class="tethra-balance-num">&euro;<?php echo number_format($wallet->balance_eur ?? 0, 2); ?></div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 8px;">
                IBAN: DE89 3704 0044 0532 0130 00
            </div>
        </div>

        <div class="tethra-card">
            <span class="tethra-badge tethra-badge-gold" style="margin-bottom: 10px;">🇬🇧 BRITISH POUND</span>
            <div class="tethra-balance-num">&pound;<?php echo number_format($wallet->balance_gbp ?? 0, 2); ?></div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 8px;">
                Sort Code: 20-45-78 &bull; Acct: 83920144
            </div>
        </div>
    </div>
</main>
<?php get_footer(); ?>
`;

  const themePageSavingsPhp = `<?php
/**
 * Template Name: Native Savings Vaults Page
 */
if (!is_user_logged_in()) { wp_redirect(home_url('/login/')); exit; }
get_header();
$user_id = get_current_user_id();
$wallet = tethra_get_current_user_wallets($user_id);
?>
<main class="tethra-container">
    <div style="text-align: center; margin-bottom: 28px;">
        <div class="tethra-badge tethra-badge-gold" style="margin-bottom: 8px;">FIXED &amp; FLEXIBLE SAVINGS</div>
        <h1 style="font-size: 28px; font-weight: 800; color: #ffffff;">High-Yield Savings Vaults (${savingsApy}% APY)</h1>
        <p style="color: var(--text-muted); font-size: 14px;">Grow your deposits with institutional annual percentage yield calculated daily.</p>
    </div>

    <div class="tethra-card tethra-card-highlight" style="max-width: 600px; margin: 0 auto 24px; text-align: center;">
        <span style="font-size: 13px; color: #fae188;">Total Locked in Savings Vaults</span>
        <div class="tethra-balance-num" style="font-size: 36px; margin: 12px 0;">$<?php echo number_format($wallet->savings_balance ?? 0, 2); ?></div>
        <span class="tethra-badge tethra-badge-emerald">+${savingsApy}% Fixed Annual APY</span>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-referrals.php ---
  const themePageReferralsPhp = `<?php
/**
 * Template Name: Native Referrals & Affiliate Page
 */
if (!is_user_logged_in()) { wp_redirect(home_url('/login/')); exit; }
get_header();
$user_id = get_current_user_id();
$user = get_userdata($user_id);
$referral_url = home_url('/register/?ref=' . $user_id);

global $wpdb;
$referrals = $wpdb->get_results($wpdb->prepare(
    "SELECT r.*, u.user_email, u.display_name FROM {$wpdb->prefix}tethra_referrals r LEFT JOIN {$wpdb->users} u ON r.referred_user_id = u.ID WHERE r.referrer_id = %d ORDER BY r.id DESC",
    $user_id
));

$total_ref_count = count($referrals);
$pending_bonus = 0;
$paid_bonus = 0;
foreach ($referrals as $r) {
    if ($r->status === 'paid') {
        $paid_bonus += (float)$r->bonus_amount;
    } else {
        $pending_bonus += (float)$r->bonus_amount;
    }
}

$share_msg = urlencode("Join me on Tethra Financial Infrastructure! Get institutional multi-currency accounts and earn 2% daily yield on Tether: " . $referral_url);
$share_url_enc = urlencode($referral_url);
?>
<main class="tethra-container">
    <div style="text-align: center; margin-bottom: 28px;">
        <div class="tethra-badge tethra-badge-gold" style="margin-bottom: 8px;">PARTNER &amp; AFFILIATE PROGRAM</div>
        <h1 style="font-size: 28px; font-weight: 800; color: #ffffff;">Invite Friends &amp; Earn $25 Cash Bonus</h1>
        <p style="color: var(--text-muted); font-size: 14px;">Share your exclusive referral link across WhatsApp, Facebook, Telegram, and social channels.</p>
    </div>

    <!-- Referral Stats Cards -->
    <div class="tethra-grid-3" style="margin-bottom: 24px;">
        <div class="tethra-card">
            <span style="font-size: 12px; color: var(--text-muted);">Total Friends Invited</span>
            <div class="tethra-balance-num" style="font-size: 28px; margin-top: 6px;"><?php echo esc_html($total_ref_count); ?></div>
            <span style="font-size: 11px; color: #10b981;">● Active Referral Network</span>
        </div>
        <div class="tethra-card">
            <span style="font-size: 12px; color: var(--text-muted);">Pending Bonuses ($25/friend)</span>
            <div class="tethra-balance-num" style="font-size: 28px; margin-top: 6px; color: #fae188;">$<?php echo number_format($pending_bonus, 2); ?></div>
            <span style="font-size: 11px; color: var(--text-muted);">Awaiting deposit verification</span>
        </div>
        <div class="tethra-card">
            <span style="font-size: 12px; color: var(--text-muted);">Total Cash Paid Out</span>
            <div class="tethra-balance-num" style="font-size: 28px; margin-top: 6px; color: #10b981;">$<?php echo number_format($paid_bonus, 2); ?></div>
            <span style="font-size: 11px; color: #10b981;">Credited directly to USD wallet</span>
        </div>
    </div>

    <!-- Copy Referral Link Box -->
    <div class="tethra-card" style="margin-bottom: 24px;">
        <h3 style="color: #fae188; font-size: 18px; margin-bottom: 12px; font-weight: 700;">Your Unique Invitation Link</h3>
        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 18px;">
            <input type="text" readonly value="<?php echo esc_attr($referral_url); ?>" id="refInput" class="tethra-input" style="flex: 1; min-width: 260px; font-family: monospace; font-size: 14px; color: #fae188;">
            <button onclick="navigator.clipboard.writeText(document.getElementById('refInput').value); alert('Referral link copied to clipboard!');" class="tethra-btn-gold" style="padding: 10px 24px;">
                <span>📋 Copy Link</span>
            </button>
        </div>

        <!-- 1-Click Social Sharing Buttons -->
        <div>
            <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 10px; font-weight: 600;">Direct 1-Click Social Sharing:</div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <!-- WhatsApp -->
                <a href="https://api.whatsapp.com/send?text=<?php echo $share_msg; ?>" target="_blank" class="tethra-btn-whatsapp" style="padding: 10px 18px; font-size: 13px; text-decoration: none;">
                    💬 Share on WhatsApp
                </a>

                <!-- Facebook -->
                <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $share_url_enc; ?>" target="_blank" style="background: #1877F2; color: #ffffff; font-weight: 700; padding: 10px 18px; border-radius: 10px; text-decoration: none; font-size: 13px; display: inline-flex; align-items: center; gap: 6px;">
                    📘 Post on Facebook
                </a>

                <!-- Telegram -->
                <a href="https://t.me/share/url?url=<?php echo $share_url_enc; ?>&text=<?php echo urlencode('Join Tethra Banking & 2% Tether Yield:'); ?>" target="_blank" style="background: #0088cc; color: #ffffff; font-weight: 700; padding: 10px 18px; border-radius: 10px; text-decoration: none; font-size: 13px; display: inline-flex; align-items: center; gap: 6px;">
                    ✈️ Share on Telegram
                </a>

                <!-- Twitter / X -->
                <a href="https://twitter.com/intent/tweet?url=<?php echo $share_url_enc; ?>&text=<?php echo urlencode('Next-generation financial infrastructure with 2% 24h daily yield on Tether!'); ?>" target="_blank" style="background: #000000; border: 1px solid #333; color: #ffffff; font-weight: 700; padding: 10px 18px; border-radius: 10px; text-decoration: none; font-size: 13px; display: inline-flex; align-items: center; gap: 6px;">
                    𝕏 Post on Twitter / X
                </a>

                <!-- Email -->
                <a href="mailto:?subject=<?php echo urlencode('Invitation to join Tethra Institutional Banking'); ?>&body=<?php echo $share_msg; ?>" style="background: #042018; border: 1px solid rgba(212,175,55,0.4); color: #fae188; font-weight: 700; padding: 10px 18px; border-radius: 10px; text-decoration: none; font-size: 13px; display: inline-flex; align-items: center; gap: 6px;">
                    ✉️ Email Invite
                </a>
            </div>
        </div>
    </div>

    <!-- Invited Clients Table -->
    <div class="tethra-card">
        <h3 style="color: #fae188; font-size: 18px; margin-bottom: 14px; font-weight: 700;">Invited Clients History</h3>
        <table class="tethra-table">
            <thead>
                <tr>
                    <th>Friend / Client</th>
                    <th>Bonus Value</th>
                    <th>Bonus Status</th>
                    <th>Invited Date</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($referrals)): ?>
                    <tr><td colspan="4" style="text-align:center; padding: 24px; color: var(--text-muted);">You have not invited any friends yet. Share your link above to get started!</td></tr>
                <?php else: ?>
                    <?php foreach ($referrals as $ref): ?>
                        <tr>
                            <td>
                                <strong><?php echo esc_html($ref->display_name ?: $ref->user_email ?: 'Client #' . $ref->referred_user_id); ?></strong>
                            </td>
                            <td style="color: #10b981; font-weight: 700; font-family: monospace;">+$<?php echo number_format($ref->bonus_amount, 2); ?> USD</td>
                            <td>
                                <?php if ($ref->status === 'paid'): ?>
                                    <span class="tethra-badge tethra-badge-emerald">● Paid &amp; Credited</span>
                                <?php else: ?>
                                    <span class="tethra-badge tethra-badge-gold">⏳ Pending Deposit Review</span>
                                <?php endif; ?>
                            </td>
                            <td style="color: var(--text-muted);"><?php echo esc_html($ref->created_at); ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-transactions.php ---
  const themePageTransactionsPhp = `<?php
/**
 * Template Name: Native Transactions Ledger Page
 */
if (!is_user_logged_in()) { wp_redirect(home_url('/login/')); exit; }
get_header();
$user_id = get_current_user_id();
global $wpdb;
$txs = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_transactions WHERE user_id = %d ORDER BY id DESC LIMIT 50", $user_id));
?>
<main class="tethra-container">
    <h1 style="font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 20px;">Financial Transactions Ledger</h1>

    <div class="tethra-card">
        <table class="tethra-table">
            <thead>
                <tr>
                    <th>Reference ID</th>
                    <th>Type</th>
                    <th>Method / Rail</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($txs)): ?>
                    <tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--text-muted);">No transaction records found.</td></tr>
                <?php else: ?>
                    <?php foreach ($txs as $t): ?>
                        <tr>
                            <td><strong style="font-family: monospace; color: #fae188;"><?php echo esc_html($t->reference_id); ?></strong></td>
                            <td><?php echo esc_html(strtoupper($t->type)); ?></td>
                            <td><?php echo esc_html($t->method); ?></td>
                            <td><strong><?php echo number_format($t->amount, 2) . ' ' . esc_html($t->currency); ?></strong></td>
                            <td><span class="tethra-badge tethra-badge-emerald"><?php echo esc_html(strtoupper($t->status)); ?></span></td>
                            <td><?php echo esc_html($t->created_at); ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-crypto.php ---
  const themePageCryptoPhp = `<?php
/**
 * Template Name: Native Crypto Markets Page
 */
get_header();
?>
<main class="tethra-container">
    <div style="text-align: center; margin-bottom: 28px;">
        <div class="tethra-badge tethra-badge-emerald" style="margin-bottom: 8px;">LIVE MARKET FEEDS</div>
        <h1 style="font-size: 28px; font-weight: 800; color: #ffffff;">Cryptocurrency Asset Tickers</h1>
        <p style="color: var(--text-muted); font-size: 14px;">Institutional pricing feeds for USDT, BTC, ETH, and global stablecoins.</p>
    </div>

    <div class="tethra-card">
        <table class="tethra-table">
            <thead>
                <tr>
                    <th>Asset</th>
                    <th>Symbol</th>
                    <th>Price (USD)</th>
                    <th>24h Change</th>
                    <th>Staking APY</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Tether USD</strong></td>
                    <td><span class="tethra-badge tethra-badge-emerald">USDT</span></td>
                    <td>$1.0002</td>
                    <td style="color:#10b981;">+0.01%</td>
                    <td><strong style="color:#fae188;">2.0% / 24 Hours</strong></td>
                    <td><a href="<?php echo home_url('/invest/'); ?>" class="tethra-btn-gold" style="padding:6px 14px; font-size:12px;">Stake USDT</a></td>
                </tr>
                <tr>
                    <td><strong>Bitcoin</strong></td>
                    <td><span class="tethra-badge tethra-badge-gold">BTC</span></td>
                    <td>$64,820.00</td>
                    <td style="color:#10b981;">+2.45%</td>
                    <td>5.2% APY</td>
                    <td><a href="<?php echo home_url('/deposit/'); ?>" class="tethra-btn-outline" style="padding:6px 14px; font-size:12px;">Deposit</a></td>
                </tr>
                <tr>
                    <td><strong>Ethereum</strong></td>
                    <td><span class="tethra-badge tethra-badge-blue">ETH</span></td>
                    <td>$3,490.50</td>
                    <td style="color:#10b981;">+1.80%</td>
                    <td>4.8% APY</td>
                    <td><a href="<?php echo home_url('/deposit/'); ?>" class="tethra-btn-outline" style="padding:6px 14px; font-size:12px;">Deposit</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-earnings.php ---
  const themePageEarningsPhp = `<?php
/**
 * Template Name: Native Staking Earnings Page
 */
if (!is_user_logged_in()) { wp_redirect(home_url('/login/')); exit; }
get_header();
$user_id = get_current_user_id();
$wallet = tethra_get_current_user_wallets($user_id);
global $wpdb;
$investments = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_investments WHERE user_id = %d ORDER BY id DESC", $user_id));
?>
<main class="tethra-container">
    <h1 style="font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 20px;">2% Tether Staking &amp; Daily Earnings</h1>

    <div class="tethra-grid-3" style="margin-bottom: 24px;">
        <div class="tethra-card">
            <span style="font-size: 12px; color: var(--text-muted);">Active Staked Capital</span>
            <div class="tethra-balance-num" style="font-size: 28px; color: #10b981; margin-top: 6px;">
                <?php echo number_format($wallet->invested_usdt ?? 0, 2); ?> USDT
            </div>
        </div>
        <div class="tethra-card">
            <span style="font-size: 12px; color: var(--text-muted);">Total Daily Yield Earned</span>
            <div class="tethra-balance-num" style="font-size: 28px; color: #fae188; margin-top: 6px;">
                <?php echo number_format($wallet->total_earned_usdt ?? 0, 2); ?> USDT
            </div>
        </div>
        <div class="tethra-card">
            <span style="font-size: 12px; color: var(--text-muted);">Daily Rate</span>
            <div class="tethra-balance-num" style="font-size: 28px; color: #38bdf8; margin-top: 6px;">
                2.0% / 24h
            </div>
        </div>
    </div>

    <div class="tethra-card">
        <h3 style="color: #fae188; font-size: 18px; margin-bottom: 12px;">Active Staking Contracts</h3>
        <table class="tethra-table">
            <thead>
                <tr>
                    <th>Contract ID</th>
                    <th>Staked Amount</th>
                    <th>Daily Rate</th>
                    <th>Start Date</th>
                    <th>Next 24h Payout</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($investments)): ?>
                    <tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--text-muted);">No active staking contracts. <a href="<?php echo home_url('/invest/'); ?>" style="color:#fae188;">Start Staking Now &rarr;</a></td></tr>
                <?php else: ?>
                    <?php foreach ($investments as $inv): ?>
                        <tr>
                            <td>#<?php echo esc_html($inv->id); ?></td>
                            <td><strong><?php echo number_format($inv->amount_usdt, 2); ?> USDT</strong></td>
                            <td><span class="tethra-badge tethra-badge-emerald"><?php echo esc_html($inv->daily_rate_pct); ?>%</span></td>
                            <td><?php echo esc_html($inv->start_time); ?></td>
                            <td><strong style="color:#fae188;"><?php echo esc_html($inv->next_payout_time); ?></strong></td>
                            <td><span class="tethra-badge tethra-badge-emerald"><?php echo esc_html(strtoupper($inv->status)); ?></span></td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-expenses.php ---
  const themePageExpensesPhp = `<?php
/**
 * Template Name: Native Expenses & Budgets Page
 */
if (!is_user_logged_in()) { wp_redirect(home_url('/login/')); exit; }
get_header();
?>
<main class="tethra-container">
    <h1 style="font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 20px;">Expense Tracker &amp; Budgets</h1>
    <div class="tethra-card" style="text-align: center; padding: 40px 20px;">
        <h3 style="color: #fae188; font-size: 20px; margin-bottom: 10px;">Smart Spending Breakdown</h3>
        <p style="color: var(--text-muted); font-size: 14px; max-width: 600px; margin: 0 auto 20px;">Automatically categorizes card transactions across Utilities, Investments, Subscriptions, and Transfers.</p>
        <div class="tethra-grid-3">
            <div style="background: #02110c; padding: 20px; border-radius: 12px; border: 1px solid #0f4637;">
                <span style="font-size: 12px; color: var(--text-muted);">Investments &amp; Savings</span>
                <div style="font-size: 22px; font-weight: bold; color: #10b981; margin-top: 4px;">65%</div>
            </div>
            <div style="background: #02110c; padding: 20px; border-radius: 12px; border: 1px solid #0f4637;">
                <span style="font-size: 12px; color: var(--text-muted);">Transfers &amp; Bills</span>
                <div style="font-size: 22px; font-weight: bold; color: #38bdf8; margin-top: 4px;">25%</div>
            </div>
            <div style="background: #02110c; padding: 20px; border-radius: 12px; border: 1px solid #0f4637;">
                <span style="font-size: 12px; color: var(--text-muted);">Discretionary</span>
                <div style="font-size: 22px; font-weight: bold; color: #fae188; margin-top: 4px;">10%</div>
            </div>
        </div>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-groups.php ---
  const themePageGroupsPhp = `<?php
/**
 * Template Name: Native Shared Groups Page
 */
if (!is_user_logged_in()) { wp_redirect(home_url('/login/')); exit; }
get_header();
?>
<main class="tethra-container">
    <h1 style="font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 20px;">Shared Vaults &amp; Split Bills</h1>
    <div class="tethra-card" style="padding: 30px;">
        <h3 style="color: #fae188; font-size: 18px; margin-bottom: 12px;">Create or Manage Group Vaults</h3>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">Pool funds with partners, business associates, or family members with automated multi-signature withdrawal consensus.</p>
        <button class="tethra-btn-gold" style="padding: 10px 20px;">+ Create New Shared Vault</button>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-connections.php ---
  const themePageConnectionsPhp = `<?php
/**
 * Template Name: Native Bank Connections Page
 */
if (!is_user_logged_in()) { wp_redirect(home_url('/login/')); exit; }
get_header();
?>
<main class="tethra-container">
    <h1 style="font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 20px;">Connected Bank Accounts</h1>
    <div class="tethra-card" style="padding: 30px;">
        <h3 style="color: #fae188; font-size: 18px; margin-bottom: 12px;">Link External Bank (Open Banking / Plaid)</h3>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">Connect your existing checking or savings accounts from UK, EU, or US financial institutions for seamless instant settlements.</p>
        <button class="tethra-btn-gold" style="padding: 10px 20px;">🔗 Link New Bank Account</button>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-kyc.php ---
  const themePageKycPhp = `<?php
/**
 * Template Name: Native KYC Verification Page
 */
if (!is_user_logged_in()) { wp_redirect(home_url('/login/')); exit; }
get_header();
$user_id = get_current_user_id();
$kyc_status = get_user_meta($user_id, 'kyc_status', true) ?: 'Tier 1 Verified';
?>
<main class="tethra-container">
    <h1 style="font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 20px;">KYC Identity &amp; Compliance</h1>
    <div class="tethra-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="color: #fae188; font-size: 18px;">Your Current Verification Tier</h3>
            <span class="tethra-badge tethra-badge-emerald"><?php echo esc_html($kyc_status); ?></span>
        </div>
        <p style="color: var(--text-muted); font-size: 14px; line-height: 1.6;">
            Tier 1 allows deposits up to $50,000/day. Upgrade to Tier 2 (Institutional) for unlimited daily wire transfers and custom dedicated IBAN allocation.
        </p>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-security.php ---
  const themePageSecurityPhp = `<?php
/**
 * Template Name: Native Security & PIN Page
 */
if (!is_user_logged_in()) { wp_redirect(home_url('/login/')); exit; }
get_header();
?>
<main class="tethra-container">
    <h1 style="font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 20px;">Security &amp; 6-Digit PIN Settings</h1>
    <div class="tethra-card" style="max-width: 600px;">
        <h3 style="color: #fae188; font-size: 18px; margin-bottom: 16px;">Update 6-Digit Security PIN</h3>
        <form method="POST" action="">
            <?php wp_nonce_field('tethra_pin_nonce'); ?>
            <div style="margin-bottom: 16px;">
                <label style="font-size: 12px; color: var(--text-muted);">Current PIN</label>
                <input type="password" maxlength="6" class="tethra-input" placeholder="••••••">
            </div>
            <div style="margin-bottom: 20px;">
                <label style="font-size: 12px; color: var(--text-muted);">New 6-Digit PIN</label>
                <input type="password" maxlength="6" class="tethra-input" placeholder="••••••">
            </div>
            <button type="submit" class="tethra-btn-gold" style="padding: 10px 20px;">Update Security PIN</button>
        </form>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-support.php ---
  const themePageSupportPhp = `<?php
/**
 * Template Name: Native Support & Helpdesk Page
 */
get_header();
?>
<main class="tethra-container">
    <div style="text-align: center; margin-bottom: 28px;">
        <div class="tethra-badge tethra-badge-emerald" style="margin-bottom: 8px;">24/7/365 CLIENT DESK</div>
        <h1 style="font-size: 28px; font-weight: 800; color: #ffffff;">Institutional Client Support</h1>
        <p style="color: var(--text-muted); font-size: 14px;">Instant priority resolution via direct WhatsApp hotline or telephone desk.</p>
    </div>

    <div class="tethra-grid-3">
        <div class="tethra-card" style="text-align: center;">
            <div style="font-size: 32px; margin-bottom: 10px;">💬</div>
            <h3 style="color: #10b981; font-size: 18px; margin-bottom: 8px;">WhatsApp Concierge</h3>
            <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">Direct chat with an assigned institutional account manager.</p>
            <a href="https://wa.me/${cleanPhone}?text=Hello%20Tethra%20Support" target="_blank" class="tethra-btn-whatsapp" style="padding: 10px 20px; font-size: 13px;">Open WhatsApp</a>
        </div>
        <div class="tethra-card" style="text-align: center;">
            <div style="font-size: 32px; margin-bottom: 10px;">📞</div>
            <h3 style="color: #fae188; font-size: 18px; margin-bottom: 8px;">Direct Telephone</h3>
            <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">Global client hotline available 24 hours a day.</p>
            <a href="tel:${cleanPhone}" class="tethra-btn-gold" style="padding: 10px 20px; font-size: 13px;">${supportPhone}</a>
        </div>
        <div class="tethra-card" style="text-align: center;">
            <div style="font-size: 32px; margin-bottom: 10px;">✉️</div>
            <h3 style="color: #38bdf8; font-size: 18px; margin-bottom: 8px;">Email Inquiries</h3>
            <p style="color: var(--text-muted); font-size: 13px; margin-bottom: 16px;">Formal compliance &amp; legal correspondence.</p>
            <a href="mailto:${adminEmail}" class="tethra-btn-outline" style="padding: 10px 20px; font-size: 13px;">${adminEmail}</a>
        </div>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-profile.php ---
  const themePageProfilePhp = `<?php
/**
 * Template Name: Native User Profile Page
 */
if (!is_user_logged_in()) { wp_redirect(home_url('/login/')); exit; }
get_header();
$user = wp_get_current_user();
?>
<main class="tethra-container">
    <h1 style="font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 20px;">Client Profile &amp; Preferences</h1>
    <div class="tethra-card" style="max-width: 650px;">
        <div style="margin-bottom: 16px;">
            <label style="font-size: 12px; color: var(--text-muted);">Full Name</label>
            <input type="text" readonly value="<?php echo esc_attr($user->display_name); ?>" class="tethra-input">
        </div>
        <div style="margin-bottom: 16px;">
            <label style="font-size: 12px; color: var(--text-muted);">Email Address</label>
            <input type="email" readonly value="<?php echo esc_attr($user->user_email); ?>" class="tethra-input">
        </div>
        <div style="margin-bottom: 16px;">
            <label style="font-size: 12px; color: var(--text-muted);">Registered Phone</label>
            <input type="text" readonly value="<?php echo esc_attr(get_user_meta($user->ID, 'phone', true)); ?>" class="tethra-input">
        </div>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-security-policy.php ---
  const themePageSecurityPolicyPhp = `<?php
/**
 * Template Name: Native Security Policy Page
 */
get_header();
?>
<main class="tethra-container">
    <div style="max-width: 850px; margin: 0 auto;">
        <h1 style="font-size: 30px; font-weight: 800; color: #ffffff; margin-bottom: 16px;">Security, Encryption &amp; Audit Policies</h1>
        <div class="tethra-card">
            <p style="color: var(--text-muted); font-size: 14px; line-height: 1.8;">
                All client funds are held in segregated Tier-1 custodial bank accounts. Cryptographic balances are secured using multi-party computation (MPC) cold-storage vaults with hardware security modules (HSM).
            </p>
        </div>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-faq.php ---
  const themePageFaqPhp = `<?php
/**
 * Template Name: Native FAQ Page
 */
get_header();
?>
<main class="tethra-container">
    <div style="max-width: 850px; margin: 0 auto;">
        <h1 style="font-size: 30px; font-weight: 800; color: #ffffff; margin-bottom: 24px; text-align: center;">Frequently Asked Questions</h1>
        <div class="tethra-card" style="margin-bottom: 16px;">
            <h3 style="color: #fae188; font-size: 16px; margin-bottom: 8px;">How does the 24-Hour 2.0% Tether Daily Yield work?</h3>
            <p style="color: var(--text-muted); font-size: 13px; line-height: 1.6;">Your staked USDT participates in high-throughput automated institutional arbitrage. Yields are computed and credited directly to your withdrawable wallet precisely every 24 hours.</p>
        </div>
        <div class="tethra-card" style="margin-bottom: 16px;">
            <h3 style="color: #fae188; font-size: 16px; margin-bottom: 8px;">How fast are withdrawals processed?</h3>
            <p style="color: var(--text-muted); font-size: 13px; line-height: 1.6;">UK Faster Payments and USDT crypto withdrawals clear within minutes. European SEPA and USA Fedwire settle within standard banking cutoff hours.</p>
        </div>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-terms.php ---
  const themePageTermsPhp = `<?php
/**
 * Template Name: Native Terms of Service Page
 */
get_header();
?>
<main class="tethra-container">
    <div style="max-width: 850px; margin: 0 auto;">
        <h1 style="font-size: 30px; font-weight: 800; color: #ffffff; margin-bottom: 20px;">Master Terms of Service</h1>
        <div class="tethra-card">
            <p style="color: var(--text-muted); font-size: 13px; line-height: 1.8;">By accessing this service, you agree to comply with international anti-money laundering (AML) and know-your-customer (KYC) directives.</p>
        </div>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-privacy.php ---
  const themePagePrivacyPhp = `<?php
/**
 * Template Name: Native Privacy Policy Page
 */
get_header();
?>
<main class="tethra-container">
    <div style="max-width: 850px; margin: 0 auto;">
        <h1 style="font-size: 30px; font-weight: 800; color: #ffffff; margin-bottom: 20px;">Global Privacy &amp; Data Protection</h1>
        <div class="tethra-card">
            <p style="color: var(--text-muted); font-size: 13px; line-height: 1.8;">We comply strictly with GDPR (Regulation EU 2016/679) and CCPA standards. Your biometric PINs and private financial records are encrypted with SHA-256 and salted at rest.</p>
        </div>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-press.php ---
  const themePagePressPhp = `<?php
/**
 * Template Name: Native Press & Licensing Page
 */
get_header();
?>
<main class="tethra-container">
    <div style="max-width: 850px; margin: 0 auto;">
        <h1 style="font-size: 30px; font-weight: 800; color: #ffffff; margin-bottom: 20px;">Press Releases &amp; Regulatory Licensure</h1>
        <div class="tethra-card">
            <p style="color: var(--text-muted); font-size: 13px; line-height: 1.8;">Tethra Financial Infrastructure maintains active registrations across participating banking partner networks and blockchain liquidity protocols.</p>
        </div>
    </div>
</main>
<?php get_footer(); ?>
`;

  // --- page-contact.php ---
  const themePageContactPhp = `<?php
/**
 * Template Name: Native Contact Page
 */
get_header();
?>
<main class="tethra-container">
    <div style="max-width: 750px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 28px;">
            <h1 style="font-size: 30px; font-weight: 800; color: #ffffff;">Contact Our Global Desk</h1>
            <p style="color: var(--text-muted); font-size: 14px;">Available 24/7 via WhatsApp or Phone</p>
        </div>

        <div class="tethra-card">
            <p style="margin-bottom: 14px; font-size: 14px;"><strong>Direct WhatsApp:</strong> <a href="https://wa.me/${cleanPhone}" target="_blank" style="color:#25D366; font-weight:bold;">${supportPhone}</a></p>
            <p style="margin-bottom: 14px; font-size: 14px;"><strong>Telephone:</strong> <a href="tel:${cleanPhone}" style="color:#fae188; font-weight:bold;">${supportPhone}</a></p>
            <p style="margin-bottom: 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${adminEmail}" style="color:var(--text-muted);">${adminEmail}</a></p>
        </div>
    </div>
</main>
<?php get_footer(); ?>
`;

  // ==========================================
  // 12. PLUGIN: tethra-banking-core.php
  // ==========================================
  const pluginCorePhp = `<?php
/**
 * Plugin Name: Tethra Banking & 2% 24H Tether Yield Core
 * Plugin URI: https://tethra.finance
 * Description: 100% Pure Native WordPress Banking Suite. Manages Multi-Currency Wallets (USD, EUR, GBP, USDT), UK Faster Payments, SEPA, USA ACH, Automated 24-Hour 2% Tether Yield Compounding Cron, Savings Vaults, 6-Digit PIN Security, Complete Admin Treasury Approvals, Account Freezing, and User Management.
 * Version: 3.5.0
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
        add_action('admin_init', [$this, 'handle_admin_actions']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        
        // Register Shortcodes
        add_shortcode('tethra_app', [$this, 'shortcode_full_app']);
        add_shortcode('tethra_dashboard', [$this, 'shortcode_dashboard']);
        add_shortcode('tethra_yield_calculator', [$this, 'shortcode_yield_calc']);
    }

    public function install_database_tables() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        // Auto-create standard application pages
        $pages_to_create = [
            ['title' => 'Dashboard', 'slug' => 'dashboard', 'template' => 'page-dashboard.php'],
            ['title' => '2% Tether Yield Engine', 'slug' => 'invest', 'template' => 'page-invest.php'],
            ['title' => 'Deposit Funds', 'slug' => 'deposit', 'template' => 'page-deposit.php'],
            ['title' => 'Withdraw Funds', 'slug' => 'withdraw', 'template' => 'page-withdraw.php'],
            ['title' => 'Daily Bonus', 'slug' => 'daily-bonus', 'template' => 'page-daily-bonus.php'],
            ['title' => 'Peer-to-Peer Transfer', 'slug' => 'transfer', 'template' => 'page-transfer.php'],
            ['title' => 'Referrals & Affiliates', 'slug' => 'referrals', 'template' => 'page-referrals.php'],
            ['title' => 'Transactions & Ledger', 'slug' => 'transactions', 'template' => 'page-transactions.php'],
            ['title' => 'High-Yield Savings', 'slug' => 'savings', 'template' => 'page-savings.php'],
            ['title' => 'Crypto Liquidity', 'slug' => 'crypto', 'template' => 'page-crypto.php'],
            ['title' => 'KYC Verification', 'slug' => 'kyc', 'template' => 'page-kyc.php'],
            ['title' => 'Security & PIN', 'slug' => 'security', 'template' => 'page-security.php'],
            ['title' => '24/7 Dedicated Support', 'slug' => 'support', 'template' => 'page-support.php'],
            ['title' => 'Member Login', 'slug' => 'login', 'template' => 'page-login.php'],
            ['title' => 'Open Account', 'slug' => 'register', 'template' => 'page-register.php'],
        ];

        foreach ($pages_to_create as $p) {
            $existing = get_page_by_path($p['slug']);
            if (!$existing) {
                $page_id = wp_insert_post([
                    'post_title' => $p['title'],
                    'post_name' => $p['slug'],
                    'post_status' => 'publish',
                    'post_type' => 'page',
                    'post_content' => '[tethra_app view="' . $p['slug'] . '"]',
                ]);
                if ($page_id && !is_wp_error($page_id)) {
                    update_post_meta($page_id, '_wp_page_template', $p['template']);
                }
            }
        }

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
            savings_balance DECIMAL(15,2) DEFAULT 0.00,
            is_frozen TINYINT(1) DEFAULT 0,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id)
        ) $charset_collate;";
        dbDelta($sql1);

        // 2. 24H 2% Yield Investments Table
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

        // 3. Transactions Ledger Table
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

        // 4. Notifications Table
        $sql4 = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}tethra_notifications (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id BIGINT(20) UNSIGNED NOT NULL,
            title VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            type VARCHAR(32) DEFAULT 'info',
            is_read TINYINT(1) DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id)
        ) $charset_collate;";
        dbDelta($sql4);

        // 5. Referrals Table
        $sql5 = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}tethra_referrals (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            referrer_id BIGINT(20) UNSIGNED NOT NULL,
            referred_user_id BIGINT(20) UNSIGNED NOT NULL,
            bonus_amount DECIMAL(15,2) DEFAULT 25.00,
            status VARCHAR(32) DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY referrer_id (referrer_id),
            KEY referred_user_id (referred_user_id)
        ) $charset_collate;";
        dbDelta($sql5);
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

        if (empty($active_contracts)) return;

        foreach ($active_contracts as $contract) {
            $daily_profit = $contract->amount_usdt * ($contract->daily_rate_pct / 100.0);

            // Credit USDT balance & total earned
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

            // Add live notification
            tethra_add_notification($contract->user_id, 'Daily 2% Yield Payout Received! 💰', '+' . number_format($daily_profit, 2) . ' USDT credited to your wallet.', 'success');

            // Advance next payout time by 24 hours
            $next_time = date('Y-m-d H:i:s', strtotime('+24 hours'));
            $wpdb->update(
                $wpdb->prefix . 'tethra_investments',
                ['next_payout_time' => $next_time],
                ['id' => $contract->id]
            );
        }
    }

    /**
     * Admin Actions: Full Control Handler for Deposits, Withdrawals, Users, and Accounts
     */
    public function handle_admin_actions() {
        if (!current_user_can('manage_options') || empty($_POST['tethra_admin_action'])) {
            return;
        }

        global $wpdb;
        check_admin_referer('tethra_admin_nonce');
        $action = sanitize_text_field($_POST['tethra_admin_action']);

        // 1. APPROVE DEPOSIT
        if ($action === 'approve_deposit') {
            $tx_id = intval($_POST['tx_id']);
            $tx = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_transactions WHERE id = %d", $tx_id));
            if ($tx) {
                $user_id = intval($tx->user_id);
                $amount = floatval($tx->amount);
                $currency = strtoupper(trim($tx->currency ?: 'USD'));

                // Ensure user wallet exists
                $wallet = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_wallets WHERE user_id = %d", $user_id));
                if (!$wallet) {
                    $wpdb->insert($wpdb->prefix . 'tethra_wallets', [
                        'user_id' => $user_id,
                        'balance_usd' => 0,
                        'balance_eur' => 0,
                        'balance_gbp' => 0,
                        'balance_usdt' => 0,
                        'is_frozen' => 0,
                        'created_at' => current_time('mysql'),
                        'updated_at' => current_time('mysql')
                    ]);
                }

                $col = ($currency === 'USD') ? 'balance_usd' : (($currency === 'EUR') ? 'balance_eur' : (($currency === 'GBP') ? 'balance_gbp' : (($currency === 'USDT') ? 'balance_usdt' : 'balance_usd')));

                // Credit user wallet
                $wpdb->query($wpdb->prepare(
                    "UPDATE {$wpdb->prefix}tethra_wallets SET {$col} = {$col} + %f, updated_at = %s WHERE user_id = %d",
                    $amount, current_time('mysql'), $user_id
                ));

                // Update usermeta mirror for standard compatibility
                if ($currency === 'USD') {
                    $cur_usd = floatval(get_user_meta($user_id, 'tethra_balance_usd', true) ?: 0);
                    update_user_meta($user_id, 'tethra_balance_usd', $cur_usd + $amount);
                }

                // Update transaction status
                $wpdb->update($wpdb->prefix . 'tethra_transactions', [
                    'status' => 'completed',
                    'updated_at' => current_time('mysql')
                ], ['id' => $tx_id]);

                // Check and award pending referral bonus ($25)
                $ref = $wpdb->get_row($wpdb->prepare(
                    "SELECT * FROM {$wpdb->prefix}tethra_referrals WHERE referred_user_id = %d AND status = 'pending'",
                    $user_id
                ));
                if ($ref) {
                    $bonus = floatval($ref->bonus_amount ?: 25.00);
                    $ref_w = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_wallets WHERE user_id = %d", $ref->referrer_id));
                    if (!$ref_w) {
                        $wpdb->insert($wpdb->prefix . 'tethra_wallets', [
                            'user_id' => $ref->referrer_id,
                            'balance_usd' => $bonus,
                            'balance_eur' => 0,
                            'balance_gbp' => 0,
                            'balance_usdt' => 0,
                            'created_at' => current_time('mysql'),
                            'updated_at' => current_time('mysql')
                        ]);
                    } else {
                        $wpdb->query($wpdb->prepare(
                            "UPDATE {$wpdb->prefix}tethra_wallets SET balance_usd = balance_usd + %f, updated_at = %s WHERE user_id = %d",
                            $bonus, current_time('mysql'), $ref->referrer_id
                        ));
                    }
                    $wpdb->update($wpdb->prefix . 'tethra_referrals', ['status' => 'paid'], ['id' => $ref->id]);
                    tethra_add_notification($ref->referrer_id, 'Referral Bonus Paid! 🎁', "Your referred member verified their deposit! +$" . number_format($bonus, 2) . " USD has been credited to your account.", 'reward');
                }

                tethra_add_notification($user_id, 'Deposit Approved &amp; Credited! ✅', "Your deposit of " . number_format($amount, 2) . " {$currency} (Ref: {$tx->reference_id}) has been confirmed and credited.", 'success');
                wp_redirect(add_query_arg(['page' => 'tethra-banking', 'tab' => 'deposits', 'msg' => 'deposit_approved'], admin_url('admin.php')));
                exit;
            }
        }

        // 2. REJECT DEPOSIT
        if ($action === 'reject_deposit') {
            $tx_id = intval($_POST['tx_id']);
            $tx = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_transactions WHERE id = %d AND status = 'pending'", $tx_id));
            if ($tx) {
                $wpdb->update($wpdb->prefix . 'tethra_transactions', ['status' => 'rejected'], ['id' => $tx_id]);
                tethra_add_notification($tx->user_id, 'Deposit Rejected / Unverified ⚠️', "Deposit of " . number_format($tx->amount, 2) . " {$tx->currency} (Ref: {$tx->reference_id}) could not be verified by treasury desk.", 'error');
                wp_redirect(add_query_arg(['page' => 'tethra-banking', 'tab' => 'deposits', 'msg' => 'deposit_rejected'], admin_url('admin.php')));
                exit;
            }
        }

        // 3. APPROVE WITHDRAWAL
        if ($action === 'approve_withdrawal') {
            $tx_id = intval($_POST['tx_id']);
            $tx = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_transactions WHERE id = %d AND status = 'pending'", $tx_id));
            if ($tx) {
                $wpdb->update($wpdb->prefix . 'tethra_transactions', ['status' => 'completed'], ['id' => $tx_id]);
                tethra_add_notification($tx->user_id, 'Withdrawal Executed &amp; Paid! 💸', "Your withdrawal of " . number_format($tx->amount, 2) . " {$tx->currency} (Ref: {$tx->reference_id}) has been processed and dispatched.", 'success');
                wp_redirect(add_query_arg(['page' => 'tethra-banking', 'tab' => 'withdrawals', 'msg' => 'withdrawal_approved'], admin_url('admin.php')));
                exit;
            }
        }

        // 4. REJECT & REFUND WITHDRAWAL
        if ($action === 'reject_withdrawal') {
            $tx_id = intval($_POST['tx_id']);
            $tx = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_transactions WHERE id = %d AND status = 'pending'", $tx_id));
            if ($tx) {
                $user_id = $tx->user_id;
                $amount = floatval($tx->amount);
                $currency = $tx->currency;
                $col = ($currency === 'USD') ? 'balance_usd' : (($currency === 'EUR') ? 'balance_eur' : (($currency === 'GBP') ? 'balance_gbp' : 'balance_usdt'));

                // Refund back to user's wallet
                $wpdb->query($wpdb->prepare(
                    "UPDATE {$wpdb->prefix}tethra_wallets SET {$col} = {$col} + %f WHERE user_id = %d",
                    $amount, $user_id
                ));
                $wpdb->update($wpdb->prefix . 'tethra_transactions', ['status' => 'rejected'], ['id' => $tx_id]);

                tethra_add_notification($user_id, 'Withdrawal Refunded ↩️', "Withdrawal of " . number_format($amount, 2) . " {$currency} was rejected. Funds have been refunded back to your wallet balance.", 'warning');
                wp_redirect(add_query_arg(['page' => 'tethra-banking', 'tab' => 'withdrawals', 'msg' => 'withdrawal_refunded'], admin_url('admin.php')));
                exit;
            }
        }

        // 5. UPDATE USER BALANCES DIRECTLY
        if ($action === 'update_user_balances') {
            $user_id = intval($_POST['user_id']);
            $usd = floatval($_POST['balance_usd']);
            $eur = floatval($_POST['balance_eur']);
            $gbp = floatval($_POST['balance_gbp']);
            $usdt = floatval($_POST['balance_usdt']);

            // Ensure wallet exists
            $wallet = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_wallets WHERE user_id = %d", $user_id));
            if (!$wallet) {
                $wpdb->insert($wpdb->prefix . 'tethra_wallets', [
                    'user_id' => $user_id,
                    'balance_usd' => $usd,
                    'balance_eur' => $eur,
                    'balance_gbp' => $gbp,
                    'balance_usdt' => $usdt,
                    'is_frozen' => 0,
                    'created_at' => current_time('mysql'),
                    'updated_at' => current_time('mysql')
                ]);
            } else {
                $wpdb->update(
                    $wpdb->prefix . 'tethra_wallets',
                    [
                        'balance_usd' => $usd,
                        'balance_eur' => $eur,
                        'balance_gbp' => $gbp,
                        'balance_usdt' => $usdt,
                        'updated_at' => current_time('mysql')
                    ],
                    ['user_id' => $user_id]
                );
            }

            update_user_meta($user_id, 'tethra_balance_usd', $usd);

            tethra_add_notification($user_id, 'Balance Adjusted by Treasury 🏛️', "Your account balances were updated by institutional administration.", 'info');
            wp_redirect(add_query_arg(['page' => 'tethra-banking', 'tab' => 'users', 'msg' => 'balances_updated'], admin_url('admin.php')));
            exit;
        }

        // 5B. ADD / REMOVE MONEY FROM SPECIFIC USER
        if ($action === 'adjust_user_funds') {
            $user_id = intval($_POST['user_id']);
            $mode = sanitize_text_field($_POST['adjust_mode']); // 'add' or 'remove'
            $currency = strtoupper(trim(sanitize_text_field($_POST['currency'] ?: 'USD'))); // 'USD', 'EUR', 'GBP', 'USDT'
            $amount = floatval($_POST['amount']);
            $note = sanitize_text_field($_POST['note']);

            if ($amount > 0) {
                // Ensure wallet exists
                $wallet = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_wallets WHERE user_id = %d", $user_id));
                if (!$wallet) {
                    $wpdb->insert($wpdb->prefix . 'tethra_wallets', [
                        'user_id' => $user_id,
                        'balance_usd' => 0,
                        'balance_eur' => 0,
                        'balance_gbp' => 0,
                        'balance_usdt' => 0,
                        'is_frozen' => 0,
                        'created_at' => current_time('mysql'),
                        'updated_at' => current_time('mysql')
                    ]);
                }

                $col = ($currency === 'USD') ? 'balance_usd' : (($currency === 'EUR') ? 'balance_eur' : (($currency === 'GBP') ? 'balance_gbp' : (($currency === 'USDT') ? 'balance_usdt' : 'balance_usd')));
                $op = ($mode === 'add') ? '+' : '-';
                
                $wpdb->query($wpdb->prepare(
                    "UPDATE {$wpdb->prefix}tethra_wallets SET {$col} = {$col} {$op} %f, updated_at = %s WHERE user_id = %d",
                    $amount, current_time('mysql'), $user_id
                ));

                if ($currency === 'USD') {
                    $cur_usd = floatval(get_user_meta($user_id, 'tethra_balance_usd', true) ?: 0);
                    $new_usd = ($mode === 'add') ? ($cur_usd + $amount) : max(0, $cur_usd - $amount);
                    update_user_meta($user_id, 'tethra_balance_usd', $new_usd);
                }

                $verb = ($mode === 'add') ? 'Credited' : 'Debited';
                tethra_add_notification(
                    $user_id,
                    "Treasury Adjustment: Funds {$verb}",
                    "{$verb} " . number_format($amount, 2) . " {$currency}. Reason: {$note}",
                    ($mode === 'add') ? 'success' : 'warning'
                );

                $wpdb->insert($wpdb->prefix . 'tethra_transactions', [
                    'user_id' => $user_id,
                    'type' => ($mode === 'add') ? 'admin_credit' : 'admin_debit',
                    'method' => 'treasury_desk',
                    'amount' => $amount,
                    'currency' => $currency,
                    'status' => 'completed',
                    'reference_id' => 'ADJ-' . strtoupper(wp_generate_password(8, false)),
                    'details' => $note ?: 'Executive treasury manual balance adjustment',
                    'created_at' => current_time('mysql')
                ]);
            }

            wp_redirect(add_query_arg(['page' => 'tethra-banking', 'tab' => 'users', 'msg' => 'funds_adjusted'], admin_url('admin.php')));
            exit;
        }

        // 5C. EXECUTE GLOBAL 2% DAILY BONUS TO ALL ACTIVE USERS
        if ($action === 'distribute_global_daily_bonus') {
            $pct = floatval($_POST['daily_rate_pct'] ?? 2.0);
            $multiplier = $pct / 100.0;
            $all_wallets = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}tethra_wallets WHERE is_frozen = 0");
            $rewarded = 0;
            $total_credited = 0;

            foreach ($all_wallets as $w) {
                $base = ($w->balance_usd > 0) ? $w->balance_usd : (($w->balance_usdt > 0) ? $w->balance_usdt : 500.0);
                $bonus = round($base * $multiplier, 2);

                if ($bonus > 0) {
                    $wpdb->query($wpdb->prepare(
                        "UPDATE {$wpdb->prefix}tethra_wallets SET balance_usd = balance_usd + %f WHERE user_id = %d",
                        $bonus, $w->user_id
                    ));
                    $rewarded++;
                    $total_credited += $bonus;

                    $wpdb->insert($wpdb->prefix . 'tethra_transactions', [
                        'user_id' => $w->user_id,
                        'type' => 'daily_bonus',
                        'method' => 'global_distribution',
                        'amount' => $bonus,
                        'currency' => 'USD',
                        'status' => 'completed',
                        'reference_id' => 'GBN-' . strtoupper(wp_generate_password(8, false)),
                        'details' => "Global {$pct}% Daily Bonus Yield Distribution on " . number_format($base, 2) . " USD",
                        'created_at' => current_time('mysql')
                    ]);

                    tethra_add_notification(
                        $w->user_id,
                        "Global {$pct}% Daily Bonus Credited! 💵✨",
                        "Executive Yield Distribution: +" . number_format($bonus, 2) . " USD credited to your wallet.",
                        'reward'
                    );
                }
            }

            wp_redirect(add_query_arg(['page' => 'tethra-banking', 'tab' => 'users', 'msg' => "global_bonus_distributed_{$rewarded}_users"], admin_url('admin.php')));
            exit;
        }

        // 6. TOGGLE ACCOUNT FREEZE
        if ($action === 'toggle_freeze') {
            $user_id = intval($_POST['user_id']);
            $wallet = tethra_get_current_user_wallets($user_id);
            $new_status = ($wallet && $wallet->is_frozen == 1) ? 0 : 1;

            $wpdb->update($wpdb->prefix . 'tethra_wallets', ['is_frozen' => $new_status], ['user_id' => $user_id]);
            wp_redirect(add_query_arg(['page' => 'tethra-banking', 'tab' => 'users', 'msg' => $new_status ? 'account_frozen' : 'account_unfrozen'], admin_url('admin.php')));
            exit;
        }

        // 7. CHANGE USER PASSWORD & PIN
        if ($action === 'change_user_password') {
            $user_id = intval($_POST['user_id']);
            $new_pass = sanitize_text_field($_POST['new_password']);
            $new_pin = sanitize_text_field($_POST['new_pin']);

            if (!empty($new_pass)) {
                wp_set_password($new_pass, $user_id);
            }
            if (!empty($new_pin) && strlen($new_pin) === 6) {
                update_user_meta($user_id, 'tethra_pin_hash', wp_hash_password($new_pin));
            }

            tethra_add_notification($user_id, 'Security Credentials Updated 🔒', "Your login password or 6-digit PIN was updated by administration.", 'warning');
            wp_redirect(add_query_arg(['page' => 'tethra-banking', 'tab' => 'users', 'msg' => 'password_updated'], admin_url('admin.php')));
            exit;
        }

        // 8. DELETE USER ACCOUNT
        if ($action === 'delete_user_account') {
            require_once(ABSPATH . 'wp-admin/includes/user.php');
            $user_id = intval($_POST['user_id']);
            if ($user_id !== get_current_user_id()) {
                $wpdb->delete($wpdb->prefix . 'tethra_wallets', ['user_id' => $user_id]);
                $wpdb->delete($wpdb->prefix . 'tethra_transactions', ['user_id' => $user_id]);
                $wpdb->delete($wpdb->prefix . 'tethra_investments', ['user_id' => $user_id]);
                $wpdb->delete($wpdb->prefix . 'tethra_notifications', ['user_id' => $user_id]);
                $wpdb->delete($wpdb->prefix . 'tethra_referrals', ['referrer_id' => $user_id]);
                $wpdb->delete($wpdb->prefix . 'tethra_referrals', ['referred_user_id' => $user_id]);
                wp_delete_user($user_id);
                wp_redirect(add_query_arg(['page' => 'tethra-banking', 'tab' => 'users', 'msg' => 'user_deleted'], admin_url('admin.php')));
                exit;
            }
        }

        // 9. UPDATE DEPOSIT ACCOUNTS & SETTLEMENT RAILS
        if ($action === 'update_deposit_accounts') {
            $accs = [
                'uk_bank_name' => sanitize_text_field($_POST['uk_bank_name']),
                'uk_account_name' => sanitize_text_field($_POST['uk_account_name']),
                'uk_sort_code' => sanitize_text_field($_POST['uk_sort_code']),
                'uk_account_number' => sanitize_text_field($_POST['uk_account_number']),
                'eu_bank_name' => sanitize_text_field($_POST['eu_bank_name']),
                'eu_account_name' => sanitize_text_field($_POST['eu_account_name']),
                'eu_iban' => sanitize_text_field($_POST['eu_iban']),
                'eu_bic' => sanitize_text_field($_POST['eu_bic']),
                'us_bank_name' => sanitize_text_field($_POST['us_bank_name']),
                'us_account_name' => sanitize_text_field($_POST['us_account_name']),
                'us_routing' => sanitize_text_field($_POST['us_routing']),
                'us_account_number' => sanitize_text_field($_POST['us_account_number']),
                'usdt_trc20_address' => sanitize_text_field($_POST['usdt_trc20_address']),
                'btc_address' => sanitize_text_field($_POST['btc_address']),
            ];
            update_option('tethra_deposit_accounts', $accs);
            wp_redirect(add_query_arg(['page' => 'tethra-banking', 'tab' => 'settings', 'msg' => 'settings_saved'], admin_url('admin.php')));
            exit;
        }

        // 10. MANUAL YIELD ENGINE CRON TRIGGER
        if ($action === 'trigger_yield_cron') {
            $this->process_24h_tether_yields();
            wp_redirect(add_query_arg(['page' => 'tethra-banking', 'msg' => 'yield_cron_executed'], admin_url('admin.php')));
            exit;
        }

        // 11. APPROVE & PAY REFERRAL BOUNTY
        if ($action === 'pay_referral_bounty') {
            $ref_id = intval($_POST['ref_id']);
            $ref = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_referrals WHERE id = %d", $ref_id));
            if ($ref) {
                $bonus = floatval($ref->bonus_amount ?: 25.00);
                $ref_w = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->prefix}tethra_wallets WHERE user_id = %d", $ref->referrer_id));
                if (!$ref_w) {
                    $wpdb->insert($wpdb->prefix . 'tethra_wallets', [
                        'user_id' => $ref->referrer_id,
                        'balance_usd' => $bonus,
                        'balance_eur' => 0,
                        'balance_gbp' => 0,
                        'balance_usdt' => 0,
                        'created_at' => current_time('mysql'),
                        'updated_at' => current_time('mysql')
                    ]);
                } else {
                    $wpdb->query($wpdb->prepare(
                        "UPDATE {$wpdb->prefix}tethra_wallets SET balance_usd = balance_usd + %f, updated_at = %s WHERE user_id = %d",
                        $bonus, current_time('mysql'), $ref->referrer_id
                    ));
                }
                $wpdb->update($wpdb->prefix . 'tethra_referrals', ['status' => 'paid'], ['id' => $ref_id]);
                tethra_add_notification($ref->referrer_id, 'Referral Bonus Paid! 🎁', "Executive Treasury approved your $" . number_format($bonus, 2) . " USD referral bounty.", 'reward');
                wp_redirect(add_query_arg(['page' => 'tethra-banking', 'tab' => 'referrals', 'msg' => 'referral_paid'], admin_url('admin.php')));
                exit;
            }
        }
    }

    public function register_admin_dashboard_menu() {
        add_menu_page('Tethra Banking', 'Tethra Banking', 'manage_options', 'tethra-banking', [$this, 'render_admin_view'], 'dashicons-money-alt', 6);
    }

    public function render_admin_view() {
        global $wpdb;
        $tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'dashboard';
        $total_users = count_users()['total_users'];
        $total_invested = (float)$wpdb->get_var("SELECT SUM(amount_usdt) FROM {$wpdb->prefix}tethra_investments WHERE status = 'active'") ?: 0;
        $pending_deposits_count = (int)$wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}tethra_transactions WHERE type = 'deposit' AND status = 'pending'");
        $pending_withdrawals_count = (int)$wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->prefix}tethra_transactions WHERE type = 'withdrawal' AND status = 'pending'");
        $deposit_accs = tethra_get_deposit_accounts();
        ?>
        <div class="wrap" style="max-width: 1280px; margin-top: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; background: #031510; border-radius: 12px; padding: 18px 24px; border: 1px solid #d4af37; margin-bottom: 20px; color: #ffffff;">
                <div style="display: flex; align-items: center; gap: 14px;">
                    <div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, #d4af37, #fae188); display: flex; align-items: center; justify-content: center; font-weight: 900; color: #031d16; font-size: 22px;">T</div>
                    <div>
                        <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800;">TETHRA INSTITUTIONAL BANKING &bull; MASTER ADMIN DESK</h1>
                        <span style="color: #fae188; font-size: 12px; font-weight: 600;">24/7 Hotline: ${supportPhone} | Admin: ${adminEmail}</span>
                    </div>
                </div>
                <form method="POST" style="margin: 0;">
                    <?php wp_nonce_field('tethra_admin_nonce'); ?>
                    <input type="hidden" name="tethra_admin_action" value="trigger_yield_cron">
                    <button type="submit" class="button button-primary" style="background: #10b981; border-color: #059669; font-weight: bold; padding: 6px 16px; height: auto;">
                        ⚡ Force Run 24H 2% Yield Cron Now
                    </button>
                </form>
            </div>

            <!-- Admin Nav Tabs -->
            <h2 class="nav-tab-wrapper" style="margin-bottom: 20px;">
                <a href="<?php echo admin_url('admin.php?page=tethra-banking&tab=dashboard'); ?>" class="nav-tab <?php echo $tab === 'dashboard' ? 'nav-tab-active' : ''; ?>">📊 Global Overview</a>
                <a href="<?php echo admin_url('admin.php?page=tethra-banking&tab=deposits'); ?>" class="nav-tab <?php echo $tab === 'deposits' ? 'nav-tab-active' : ''; ?>">
                    📥 Pending Deposits <?php if ($pending_deposits_count > 0): ?><span style="background: #ef4444; color: #fff; border-radius: 10px; padding: 2px 7px; font-size: 11px;"><?php echo $pending_deposits_count; ?></span><?php endif; ?>
                </a>
                <a href="<?php echo admin_url('admin.php?page=tethra-banking&tab=withdrawals'); ?>" class="nav-tab <?php echo $tab === 'withdrawals' ? 'nav-tab-active' : ''; ?>">
                    📤 Pending Withdrawals <?php if ($pending_withdrawals_count > 0): ?><span style="background: #ef4444; color: #fff; border-radius: 10px; padding: 2px 7px; font-size: 11px;"><?php echo $pending_withdrawals_count; ?></span><?php endif; ?>
                </a>
                <a href="<?php echo admin_url('admin.php?page=tethra-banking&tab=users'); ?>" class="nav-tab <?php echo $tab === 'users' ? 'nav-tab-active' : ''; ?>">👥 Client Accounts &amp; Balances</a>
                <a href="<?php echo admin_url('admin.php?page=tethra-banking&tab=referrals'); ?>" class="nav-tab <?php echo $tab === 'referrals' ? 'nav-tab-active' : ''; ?>">🎁 $25 Referrals Desk</a>
                <a href="<?php echo admin_url('admin.php?page=tethra-banking&tab=settings'); ?>" class="nav-tab <?php echo $tab === 'settings' ? 'nav-tab-active' : ''; ?>">⚙️ Deposit Accounts &amp; Rails</a>
            </h2>

            <?php if (!empty($_GET['msg'])): ?>
                <div class="notice notice-success is-dismissible" style="padding: 10px 14px; font-weight: 600;">
                    ✅ Action completed successfully: <?php echo esc_html(str_replace('_', ' ', $_GET['msg'])); ?>
                </div>
            <?php endif; ?>

            <!-- TAB 1: OVERVIEW -->
            <?php if ($tab === 'dashboard'): 
                $recent_txs = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}tethra_transactions ORDER BY id DESC LIMIT 15");
            ?>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
                    <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #ccd0d4; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <div style="color: #646970; font-size: 13px; font-weight: 600;">Total Registered Clients</div>
                        <div style="font-size: 28px; font-weight: 800; color: #1d2327; margin-top: 6px;"><?php echo esc_html($total_users); ?></div>
                    </div>
                    <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #ccd0d4; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <div style="color: #646970; font-size: 13px; font-weight: 600;">Active 2% Tether Staking Vault</div>
                        <div style="font-size: 28px; font-weight: 800; color: #008a20; margin-top: 6px; font-family: monospace;"><?php echo number_format($total_invested, 2); ?> USDT</div>
                    </div>
                    <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #ccd0d4; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <div style="color: #646970; font-size: 13px; font-weight: 600;">Pending Approvals Queue</div>
                        <div style="font-size: 28px; font-weight: 800; color: #d63638; margin-top: 6px;"><?php echo ($pending_deposits_count + $pending_withdrawals_count); ?> Action Items</div>
                    </div>
                    <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #ccd0d4; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <div style="color: #646970; font-size: 13px; font-weight: 600;">24-Hour Yield Engine Cron</div>
                        <div style="font-size: 18px; font-weight: 800; color: #2271b1; margin-top: 10px;">● ACTIVE (Hourly Check)</div>
                    </div>
                </div>

                <h3>Recent Global Financial Transactions</h3>
                <table class="widefat striped" style="margin-top: 10px;">
                    <thead>
                        <tr>
                            <th>Ref</th>
                            <th>User</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Rail / Method</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($recent_txs)): ?>
                            <tr><td colspan="7">No transactions recorded yet.</td></tr>
                        <?php else: ?>
                            <?php foreach ($recent_txs as $tx): ?>
                                <tr>
                                    <td><strong style="font-family: monospace;"><?php echo esc_html($tx->reference_id); ?></strong></td>
                                    <td>Client #<?php echo esc_html($tx->user_id); ?></td>
                                    <td><span style="font-weight: 700; text-transform: uppercase;"><?php echo esc_html($tx->type); ?></span></td>
                                    <td><strong><?php echo number_format($tx->amount, 2) . ' ' . esc_html($tx->currency); ?></strong></td>
                                    <td><?php echo esc_html($tx->method); ?></td>
                                    <td><span style="padding: 3px 8px; border-radius: 4px; font-weight: bold; background: <?php echo $tx->status === 'completed' ? '#d1e7dd; color: #0f5132;' : ($tx->status === 'pending' ? '#fff3cd; color: #664d03;' : '#f8d7da; color: #842029;'); ?>"><?php echo esc_html(strtoupper($tx->status)); ?></span></td>
                                    <td><?php echo esc_html($tx->created_at); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            <?php endif; ?>

            <!-- TAB 2: PENDING DEPOSITS QUEUE -->
            <?php if ($tab === 'deposits'): 
                $pending_deps = $wpdb->get_results("SELECT t.*, u.user_email, u.display_name FROM {$wpdb->prefix}tethra_transactions t LEFT JOIN {$wpdb->users} u ON t.user_id = u.ID WHERE t.type = 'deposit' AND t.status = 'pending' ORDER BY t.id DESC");
            ?>
                <h3>Pending Deposit Verifications &amp; Proofs Queue</h3>
                <p>Verify bank wire proofs and blockchain TxHashes below. Clicking <strong>Approve</strong> will automatically credit the funds to the user's wallet balance and pay any referral commission.</p>

                <table class="widefat striped">
                    <thead>
                        <tr>
                            <th>Ref ID</th>
                            <th>User / Client</th>
                            <th>Amount &amp; Currency</th>
                            <th>Payment Rail</th>
                            <th>Tx Details / Proof</th>
                            <th>Submitted Date</th>
                            <th>Treasury Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($pending_deps)): ?>
                            <tr><td colspan="7" style="padding: 20px; text-align: center;">No pending deposits awaiting approval.</td></tr>
                        <?php else: ?>
                            <?php foreach ($pending_deps as $dep): ?>
                                <tr>
                                    <td><strong style="font-family: monospace; color: #2271b1;"><?php echo esc_html($dep->reference_id); ?></strong></td>
                                    <td>
                                        <strong><?php echo esc_html($dep->display_name ?: $dep->user_email); ?></strong><br>
                                        <small style="color: #646970;"><?php echo esc_html($dep->user_email); ?> (ID: <?php echo esc_html($dep->user_id); ?>)</small>
                                    </td>
                                    <td><strong style="font-size: 15px; color: #008a20;"><?php echo number_format($dep->amount, 2) . ' ' . esc_html($dep->currency); ?></strong></td>
                                    <td><?php echo esc_html($dep->method); ?></td>
                                    <td><div style="max-width: 250px; word-break: break-all; font-family: monospace; font-size: 11px; background: #f0f0f1; padding: 6px; border-radius: 4px;"><?php echo esc_html($dep->details); ?></div></td>
                                    <td><?php echo esc_html($dep->created_at); ?></td>
                                    <td>
                                        <div style="display: flex; gap: 6px;">
                                            <form method="POST" style="margin: 0;">
                                                <?php wp_nonce_field('tethra_admin_nonce'); ?>
                                                <input type="hidden" name="tethra_admin_action" value="approve_deposit">
                                                <input type="hidden" name="tx_id" value="<?php echo esc_attr($dep->id); ?>">
                                                <button type="submit" class="button button-primary" style="background: #008a20; border-color: #007017;">✓ Approve &amp; Credit</button>
                                            </form>
                                            <form method="POST" style="margin: 0;">
                                                <?php wp_nonce_field('tethra_admin_nonce'); ?>
                                                <input type="hidden" name="tethra_admin_action" value="reject_deposit">
                                                <input type="hidden" name="tx_id" value="<?php echo esc_attr($dep->id); ?>">
                                                <button type="submit" class="button button-link-delete" onclick="return confirm('Reject this deposit?');">✕ Reject</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            <?php endif; ?>

            <!-- TAB 3: PENDING WITHDRAWALS QUEUE -->
            <?php if ($tab === 'withdrawals'): 
                $pending_wths = $wpdb->get_results("SELECT t.*, u.user_email, u.display_name FROM {$wpdb->prefix}tethra_transactions t LEFT JOIN {$wpdb->users} u ON t.user_id = u.ID WHERE t.type = 'withdrawal' AND t.status = 'pending' ORDER BY t.id DESC");
            ?>
                <h3>Pending Withdrawal Authorizations Queue</h3>
                <p>Execute payout via bank rail or crypto wallet, then confirm below. If rejected, funds are automatically refunded back to the client's wallet balance.</p>

                <table class="widefat striped">
                    <thead>
                        <tr>
                            <th>Ref ID</th>
                            <th>User / Client</th>
                            <th>Amount &amp; Currency</th>
                            <th>Destination Details</th>
                            <th>Requested Date</th>
                            <th>Treasury Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($pending_wths)): ?>
                            <tr><td colspan="6" style="padding: 20px; text-align: center;">No pending withdrawals awaiting execution.</td></tr>
                        <?php else: ?>
                            <?php foreach ($pending_wths as $wth): ?>
                                <tr>
                                    <td><strong style="font-family: monospace; color: #d63638;"><?php echo esc_html($wth->reference_id); ?></strong></td>
                                    <td>
                                        <strong><?php echo esc_html($wth->display_name ?: $wth->user_email); ?></strong><br>
                                        <small style="color: #646970;"><?php echo esc_html($wth->user_email); ?> (ID: <?php echo esc_html($wth->user_id); ?>)</small>
                                    </td>
                                    <td><strong style="font-size: 15px; color: #d63638;"><?php echo number_format($wth->amount, 2) . ' ' . esc_html($wth->currency); ?></strong></td>
                                    <td><div style="max-width: 280px; word-break: break-all; font-family: monospace; font-size: 11px; background: #f0f0f1; padding: 6px; border-radius: 4px;"><?php echo esc_html($wth->details); ?></div></td>
                                    <td><?php echo esc_html($wth->created_at); ?></td>
                                    <td>
                                        <div style="display: flex; gap: 6px;">
                                            <form method="POST" style="margin: 0;">
                                                <?php wp_nonce_field('tethra_admin_nonce'); ?>
                                                <input type="hidden" name="tethra_admin_action" value="approve_withdrawal">
                                                <input type="hidden" name="tx_id" value="<?php echo esc_attr($wth->id); ?>">
                                                <button type="submit" class="button button-primary" style="background: #2271b1;">✓ Mark Paid &amp; Complete</button>
                                            </form>
                                            <form method="POST" style="margin: 0;">
                                                <?php wp_nonce_field('tethra_admin_nonce'); ?>
                                                <input type="hidden" name="tethra_admin_action" value="reject_withdrawal">
                                                <input type="hidden" name="tx_id" value="<?php echo esc_attr($wth->id); ?>">
                                                <button type="submit" class="button button-link-delete" onclick="return confirm('Reject and refund balance back to user?');">✕ Reject &amp; Refund</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            <?php endif; ?>

            <!-- TAB 4: CLIENT USERS MANAGEMENT -->
            <?php if ($tab === 'users'): 
                $all_users = get_users(['number' => 100]);
            ?>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; background: #ffffff; padding: 16px 20px; border-radius: 8px; border: 1px solid #ccd0d4;">
                    <div>
                        <h3 style="margin: 0; font-size: 16px; color: #1d2327;">⚡ Global 2.0% Daily Yield Distribution Desk</h3>
                        <p style="margin: 4px 0 0; font-size: 13px; color: #646970;">Instantly distribute the 24-hour yield bonus to all active registered clients in one click.</p>
                    </div>
                    <form method="POST" style="display: flex; align-items: center; gap: 8px; margin: 0;">
                        <?php wp_nonce_field('tethra_admin_nonce'); ?>
                        <input type="hidden" name="tethra_admin_action" value="distribute_global_daily_bonus">
                        <label style="font-size: 12px; font-weight: 600;">Rate (%):</label>
                        <input type="number" step="0.1" name="daily_rate_pct" value="2.0" style="width: 70px;">
                        <button type="submit" class="button button-primary" style="background: #008a20; border-color: #007017; font-weight: bold;" onclick="return confirm('Distribute daily bonus to ALL active accounts now?');">
                            ⚡ Distribute Bonus to All Clients
                        </button>
                    </form>
                </div>

                <h3>Client Accounts &amp; Full Control Management</h3>
                <p>Directly adjust multi-currency wallet balances, credit/debit funds, freeze/unfreeze accounts, change passwords/PINs, or delete client profiles.</p>

                <table class="widefat striped">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Client Info</th>
                            <th>USD Balance</th>
                            <th>EUR Balance</th>
                            <th>GBP Balance</th>
                            <th>USDT Balance</th>
                            <th>Account Status</th>
                            <th>Actions &amp; Controls</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($all_users as $u): 
                            $w = tethra_get_current_user_wallets($u->ID);
                            $is_frozen = $w ? (int)$w->is_frozen : 0;
                        ?>
                            <tr>
                                <td>#<?php echo esc_html($u->ID); ?></td>
                                <td>
                                    <strong><?php echo esc_html($u->display_name); ?></strong><br>
                                    <small><?php echo esc_html($u->user_email); ?></small><br>
                                    <small style="color: #646970;">Phone: <?php echo esc_html(get_user_meta($u->ID, 'phone', true) ?: 'N/A'); ?></small>
                                </td>
                                <td><strong style="color: #008a20; font-size: 14px;">$<?php echo number_format($w->balance_usd ?? 0, 2); ?></strong></td>
                                <td>€<?php echo number_format($w->balance_eur ?? 0, 2); ?></td>
                                <td>£<?php echo number_format($w->balance_gbp ?? 0, 2); ?></td>
                                <td><strong style="color: #2271b1;"><?php echo number_format($w->balance_usdt ?? 0, 2); ?> USDT</strong></td>
                                <td>
                                    <?php if ($is_frozen): ?>
                                        <span style="background: #f8d7da; color: #842029; font-weight: bold; padding: 3px 8px; border-radius: 4px;">❄️ FROZEN</span>
                                    <?php else: ?>
                                        <span style="background: #d1e7dd; color: #0f5132; font-weight: bold; padding: 3px 8px; border-radius: 4px;">● ACTIVE</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <!-- 1. Quick Add / Debit Funds -->
                                    <details style="margin-bottom: 6px;">
                                        <summary style="cursor: pointer; color: #008a20; font-weight: 700;">➕ Add / ➖ Debit Funds</summary>
                                        <form method="POST" style="margin-top: 8px; background: #e7f5ea; padding: 10px; border-radius: 6px; border: 1px solid #b7ebc6;">
                                            <?php wp_nonce_field('tethra_admin_nonce'); ?>
                                            <input type="hidden" name="tethra_admin_action" value="adjust_user_funds">
                                            <input type="hidden" name="user_id" value="<?php echo esc_attr($u->ID); ?>">
                                            
                                            <div style="margin-bottom: 6px; display: flex; gap: 6px;">
                                                <select name="adjust_mode" style="font-size: 11px; font-weight: bold;">
                                                    <option value="add">➕ Add Money (Credit)</option>
                                                    <option value="remove">➖ Deduct (Debit)</option>
                                                </select>
                                                <select name="currency" style="font-size: 11px; font-weight: bold;">
                                                    <option value="USD">USD ($)</option>
                                                    <option value="EUR">EUR (€)</option>
                                                    <option value="GBP">GBP (£)</option>
                                                    <option value="USDT">USDT</option>
                                                </select>
                                            </div>
                                            <div style="margin-bottom: 6px;">
                                                <input type="number" step="0.01" name="amount" required placeholder="Amount (e.g. 500.00)" style="width: 100%; font-size: 12px;">
                                            </div>
                                            <div style="margin-bottom: 6px;">
                                                <input type="text" name="note" placeholder="Reason / Reference Note" style="width: 100%; font-size: 11px;">
                                            </div>
                                            <button type="submit" class="button button-small button-primary" style="background: #008a20; border-color: #007017;">Execute Treasury Adjustment</button>
                                        </form>
                                    </details>

                                    <!-- 2. Set Exact Balances -->
                                    <details style="margin-bottom: 6px;">
                                        <summary style="cursor: pointer; color: #2271b1; font-weight: 600;">💰 Set Exact Balances</summary>
                                        <form method="POST" style="margin-top: 8px; background: #f0f0f1; padding: 8px; border-radius: 6px;">
                                            <?php wp_nonce_field('tethra_admin_nonce'); ?>
                                            <input type="hidden" name="tethra_admin_action" value="update_user_balances">
                                            <input type="hidden" name="user_id" value="<?php echo esc_attr($u->ID); ?>">
                                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 11px; margin-bottom: 6px;">
                                                <div>USD: <input type="number" step="0.01" name="balance_usd" value="<?php echo esc_attr($w->balance_usd ?? 0); ?>" style="width: 100%;"></div>
                                                <div>EUR: <input type="number" step="0.01" name="balance_eur" value="<?php echo esc_attr($w->balance_eur ?? 0); ?>" style="width: 100%;"></div>
                                                <div>GBP: <input type="number" step="0.01" name="balance_gbp" value="<?php echo esc_attr($w->balance_gbp ?? 0); ?>" style="width: 100%;"></div>
                                                <div>USDT: <input type="number" step="0.01" name="balance_usdt" value="<?php echo esc_attr($w->balance_usdt ?? 0); ?>" style="width: 100%;"></div>
                                            </div>
                                            <button type="submit" class="button button-small button-primary">Save Balances</button>
                                        </form>
                                    </details>

                                    <!-- 3. Change Password / PIN -->
                                    <details style="margin-bottom: 6px;">
                                        <summary style="cursor: pointer; color: #646970; font-weight: 600;">🔑 Password / PIN</summary>
                                        <form method="POST" style="margin-top: 8px; background: #f0f0f1; padding: 8px; border-radius: 6px;">
                                            <?php wp_nonce_field('tethra_admin_nonce'); ?>
                                            <input type="hidden" name="tethra_admin_action" value="change_user_password">
                                            <input type="hidden" name="user_id" value="<?php echo esc_attr($u->ID); ?>">
                                            <div style="font-size: 11px; margin-bottom: 4px;">New Pass: <input type="text" name="new_password" placeholder="Leave blank to keep" style="width: 100%;"></div>
                                            <div style="font-size: 11px; margin-bottom: 6px;">New 6-Digit PIN: <input type="text" maxlength="6" name="new_pin" placeholder="e.g. 123456" style="width: 100%;"></div>
                                            <button type="submit" class="button button-small">Update Credentials</button>
                                        </form>
                                    </details>

                                    <div style="display: flex; gap: 6px; margin-top: 6px;">
                                        <form method="POST" style="margin: 0;">
                                            <?php wp_nonce_field('tethra_admin_nonce'); ?>
                                            <input type="hidden" name="tethra_admin_action" value="toggle_freeze">
                                            <input type="hidden" name="user_id" value="<?php echo esc_attr($u->ID); ?>">
                                            <button type="submit" class="button button-small"><?php echo $is_frozen ? '🔓 Unfreeze' : '❄️ Freeze'; ?></button>
                                        </form>

                                        <?php if ($u->ID !== get_current_user_id()): ?>
                                            <form method="POST" style="margin: 0;">
                                                <?php wp_nonce_field('tethra_admin_nonce'); ?>
                                                <input type="hidden" name="tethra_admin_action" value="delete_user_account">
                                                <input type="hidden" name="user_id" value="<?php echo esc_attr($u->ID); ?>">
                                                <button type="submit" class="button button-small button-link-delete" onclick="return confirm('Permanently delete client account and all records?');">🗑️ Delete</button>
                                            </form>
                                        <?php endif; ?>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>

            <!-- TAB 4B: REFERRALS DESK & $25 BOUNTIES -->
            <?php if ($tab === 'referrals'): 
                $all_refs = $wpdb->get_results("
                    SELECT r.*, 
                           u1.display_name as referrer_name, u1.user_email as referrer_email,
                           u2.display_name as referred_name, u2.user_email as referred_email
                    FROM {$wpdb->prefix}tethra_referrals r
                    LEFT JOIN {$wpdb->users} u1 ON r.referrer_id = u1.ID
                    LEFT JOIN {$wpdb->users} u2 ON r.referred_user_id = u2.ID
                    ORDER BY r.id DESC
                ");
            ?>
                <h3>🎁 Referral Network &amp; $25 Bonus Desk</h3>
                <p>Every client who invites friends earns a $25 reward upon verification. Track and approve referral bonus disbursements below.</p>

                <table class="widefat striped">
                    <thead>
                        <tr>
                            <th>Bounty ID</th>
                            <th>Referrer (Earns $25)</th>
                            <th>Referred New Member</th>
                            <th>Bonus Bounty</th>
                            <th>Created Date</th>
                            <th>Status</th>
                            <th>Treasury Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($all_refs)): ?>
                            <tr><td colspan="7" style="padding: 20px; text-align: center;">No referrals recorded yet.</td></tr>
                        <?php else: ?>
                            <?php foreach ($all_refs as $ref): ?>
                                <tr>
                                    <td>#<?php echo esc_html($ref->id); ?></td>
                                    <td>
                                        <strong><?php echo esc_html($ref->referrer_name ?: 'User #' . $ref->referrer_id); ?></strong><br>
                                        <small style="color: #646970;"><?php echo esc_html($ref->referrer_email); ?></small>
                                    </td>
                                    <td>
                                        <strong><?php echo esc_html($ref->referred_name ?: 'User #' . $ref->referred_user_id); ?></strong><br>
                                        <small style="color: #646970;"><?php echo esc_html($ref->referred_email); ?></small>
                                    </td>
                                    <td><strong style="color: #008a20; font-size: 15px;">+$<?php echo number_format($ref->bonus_amount, 2); ?> USD</strong></td>
                                    <td><?php echo esc_html($ref->created_at); ?></td>
                                    <td>
                                        <span style="padding: 3px 8px; border-radius: 4px; font-weight: bold; background: <?php echo $ref->status === 'paid' ? '#d1e7dd; color: #0f5132;' : '#fff3cd; color: #664d03;'; ?>">
                                            <?php echo strtoupper($ref->status); ?>
                                        </span>
                                    </td>
                                    <td>
                                        <?php if ($ref->status === 'pending'): ?>
                                            <form method="POST" style="margin: 0;">
                                                <?php wp_nonce_field('tethra_admin_nonce'); ?>
                                                <input type="hidden" name="tethra_admin_action" value="pay_referral_bounty">
                                                <input type="hidden" name="ref_id" value="<?php echo esc_attr($ref->id); ?>">
                                                <button type="submit" class="button button-primary" style="background: #008a20; border-color: #007017;">✓ Pay $25 Bonus Now</button>
                                            </form>
                                        <?php else: ?>
                                            <span style="color: #008a20; font-weight: bold;">✓ Paid &amp; Credited</span>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            <?php endif; ?>

            <!-- TAB 5: SETTINGS & DEPOSIT ACCOUNTS RAILS -->
            <?php if ($tab === 'settings'): ?>
                <h3>Institutional Deposit Accounts &amp; Clearing Rails Configuration</h3>
                <p>Change your public UK sort code, European IBAN, USA ACH routing numbers, and Tether crypto addresses shown on client deposit pages.</p>

                <form method="POST" style="background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #ccd0d4; max-width: 800px;">
                    <?php wp_nonce_field('tethra_admin_nonce'); ?>
                    <input type="hidden" name="tethra_admin_action" value="update_deposit_accounts">

                    <h4 style="color: #2271b1; margin-top: 0; border-bottom: 1px solid #ddd; padding-bottom: 6px;">🇬🇧 UK Faster Payments Rail (GBP)</h4>
                    <table class="form-table">
                        <tr>
                            <th>UK Bank Name</th>
                            <td><input type="text" name="uk_bank_name" value="<?php echo esc_attr($deposit_accs['uk_bank_name']); ?>" class="regular-text"></td>
                        </tr>
                        <tr>
                            <th>Account Beneficiary</th>
                            <td><input type="text" name="uk_account_name" value="<?php echo esc_attr($deposit_accs['uk_account_name']); ?>" class="regular-text"></td>
                        </tr>
                        <tr>
                            <th>Sort Code (6 Digits)</th>
                            <td><input type="text" name="uk_sort_code" value="<?php echo esc_attr($deposit_accs['uk_sort_code']); ?>" class="regular-text"></td>
                        </tr>
                        <tr>
                            <th>Account Number (8 Digits)</th>
                            <td><input type="text" name="uk_account_number" value="<?php echo esc_attr($deposit_accs['uk_account_number']); ?>" class="regular-text"></td>
                        </tr>
                    </table>

                    <h4 style="color: #2271b1; margin-top: 20px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">🇪🇺 Europe SEPA Rail (EUR)</h4>
                    <table class="form-table">
                        <tr>
                            <th>EU Bank Name</th>
                            <td><input type="text" name="eu_bank_name" value="<?php echo esc_attr($deposit_accs['eu_bank_name']); ?>" class="regular-text"></td>
                        </tr>
                        <tr>
                            <th>Beneficiary Name</th>
                            <td><input type="text" name="eu_account_name" value="<?php echo esc_attr($deposit_accs['eu_account_name']); ?>" class="regular-text"></td>
                        </tr>
                        <tr>
                            <th>IBAN</th>
                            <td><input type="text" name="eu_iban" value="<?php echo esc_attr($deposit_accs['eu_iban']); ?>" class="regular-text"></td>
                        </tr>
                        <tr>
                            <th>BIC / SWIFT</th>
                            <td><input type="text" name="eu_bic" value="<?php echo esc_attr($deposit_accs['eu_bic']); ?>" class="regular-text"></td>
                        </tr>
                    </table>

                    <h4 style="color: #2271b1; margin-top: 20px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">🇺🇸 USA ACH / Fedwire Rail (USD)</h4>
                    <table class="form-table">
                        <tr>
                            <th>US Bank Name</th>
                            <td><input type="text" name="us_bank_name" value="<?php echo esc_attr($deposit_accs['us_bank_name']); ?>" class="regular-text"></td>
                        </tr>
                        <tr>
                            <th>Account Name</th>
                            <td><input type="text" name="us_account_name" value="<?php echo esc_attr($deposit_accs['us_account_name']); ?>" class="regular-text"></td>
                        </tr>
                        <tr>
                            <th>ABA Routing Number</th>
                            <td><input type="text" name="us_routing" value="<?php echo esc_attr($deposit_accs['us_routing']); ?>" class="regular-text"></td>
                        </tr>
                        <tr>
                            <th>Account Number</th>
                            <td><input type="text" name="us_account_number" value="<?php echo esc_attr($deposit_accs['us_account_number']); ?>" class="regular-text"></td>
                        </tr>
                    </table>

                    <h4 style="color: #2271b1; margin-top: 20px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">⚡ Cryptocurrency Settlement Addresses</h4>
                    <table class="form-table">
                        <tr>
                            <th>USDT TRC-20 Address</th>
                            <td><input type="text" name="usdt_trc20_address" value="<?php echo esc_attr($deposit_accs['usdt_trc20_address']); ?>" class="large-text"></td>
                        </tr>
                        <tr>
                            <th>Bitcoin (BTC) Address</th>
                            <td><input type="text" name="btc_address" value="<?php echo esc_attr($deposit_accs['btc_address'] ?? 'bc1q9tethra84920485934509'); ?>" class="large-text"></td>
                        </tr>
                    </table>

                    <p class="submit">
                        <button type="submit" class="button button-primary" style="padding: 6px 20px;">💾 Save All Deposit Settlement Rails</button>
                    </p>
                </form>
            <?php endif; ?>
        </div>
        <?php
    }

    public function register_rest_routes() {
        register_rest_route('tethra/v1', '/wallets', [
            'methods' => 'GET',
            'callback' => function() {
                if (!is_user_logged_in()) return new WP_Error('unauthorized', 'Login required', ['status' => 401]);
                return rest_ensure_response(tethra_get_current_user_wallets());
            },
            'permission_callback' => '__return_true'
        ]);
    }

    public function shortcode_full_app($atts = []) {
        $atts = shortcode_atts(['view' => 'dashboard'], $atts);
        ob_start();
        $target_view = sanitize_file_name($atts['view']);
        if (locate_template('page-' . $target_view . '.php')) {
            get_template_part('page-' . $target_view);
        } else {
            get_template_part('page-dashboard');
        }
        return ob_get_clean();
    }

    public function shortcode_dashboard() {
        ob_start();
        get_template_part('page-dashboard');
        return ob_get_clean();
    }

    public function shortcode_yield_calc() {
        return '<div class="tethra-card p-6 bg-[#042018] border border-[#d4af37]/40 rounded-2xl"><h3 class="text-[#fae188] font-bold text-lg mb-2">⚡ 2.0% Daily Tether Yield Calculator</h3><p class="text-sm text-[#8cb8a8]">Compounded daily every 24 hours. Enter amount to calculate returns.</p></div>';
    }
}
new Tethra_Banking_Core();
`;

  // ==========================================
  // 13. SQL SCHEMA DUMP
  // ==========================================
  const sqlDatabaseSchema = `-- ==========================================
-- TETHRA INSTITUTIONAL BANKING & 2% YIELD
-- PURE WORDPRESS NATIVE DATABASE SCHEMA
-- Configured Support: ${supportPhone}
-- ==========================================

CREATE TABLE IF NOT EXISTS wp_tethra_wallets (
    id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT(20) UNSIGNED NOT NULL UNIQUE,
    balance_usd DECIMAL(15,2) DEFAULT 0.00,
    balance_eur DECIMAL(15,2) DEFAULT 0.00,
    balance_gbp DECIMAL(15,2) DEFAULT 0.00,
    balance_usdt DECIMAL(15,2) DEFAULT 0.00,
    invested_usdt DECIMAL(15,2) DEFAULT 0.00,
    total_earned_usdt DECIMAL(15,2) DEFAULT 0.00,
    savings_balance DECIMAL(15,2) DEFAULT 0.00,
    is_frozen TINYINT(1) DEFAULT 0,
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

CREATE TABLE IF NOT EXISTS wp_tethra_notifications (
    id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT(20) UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(32) DEFAULT 'info',
    is_read TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS wp_tethra_referrals (
    id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    referrer_id BIGINT(20) UNSIGNED NOT NULL,
    referred_user_id BIGINT(20) UNSIGNED NOT NULL,
    bonus_amount DECIMAL(15,2) DEFAULT 25.00,
    status VARCHAR(32) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY referrer_id (referrer_id),
    KEY referred_user_id (referred_user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

  // ==========================================
  // 14. COMPREHENSIVE README.md
  // ==========================================
  const readmeMd = `# 🚀 Tethra Complete Native WordPress Banking & Yield Suite

100% Pure Native WordPress Website with Full Theme and Plugin Suite.

## 📦 What is Included in this Package:

### 1. **WordPress Theme (\`wp-content/themes/tethra-theme\`)**:
- \`style.css\` - Complete Emerald & Gold high-contrast styling with CSS variables.
- \`functions.php\` - Authentication engine, phone/6-digit PIN login, database helpers.
- \`header.php\` & \`footer.php\` - Navigation, multi-currency display, 24/7 WhatsApp launcher.
- \`front-page.php\` / \`index.php\` - High-impact public homepage.
- \`page-dashboard.php\` - Multi-currency dashboard overview.
- \`page-invest.php\` - 24-Hour 2.0% Tether (USDT) Daily Yield Staking Engine.
- \`page-deposit.php\` - UK Faster Payments, EU SEPA, USA ACH, Crypto USDT.
- \`page-withdraw.php\` - Bank & Crypto payout authorizer with 6-digit PIN.
- \`page-accounts.php\` - Multi-currency accounts & card manager.
- \`page-savings.php\` - High-Yield Savings Vaults (${savingsApy}% APY).
- \`page-login.php\` - Dual login: Phone + 6-digit PIN OR Email + Password.
- \`page-register.php\` - Instant user onboarding with country & PIN setup.
- \`page-about.php\` - Institutional mission & security credentials.

### 2. **WordPress Plugin (\`wp-content/plugins/tethra-core\`)**:
- \`tethra-banking-core.php\` - Custom DB tables, 24-hour yield cron hook (\`tethra_hourly_yield_cron\`), WP Admin Management Panel, REST API routes.

### 3. **Database Schema (\`tethra-database-schema.sql\`)**:
- Production MySQL schema ready for import into phpMyAdmin.

---

## ⚡ Quick 3-Step WordPress Installation:
1. Upload \`wp-content/themes/tethra-theme\` to your WordPress \`/wp-content/themes/\` folder and activate in **Appearance > Themes**.
2. Upload \`wp-content/plugins/tethra-core\` to your WordPress \`/wp-content/plugins/\` folder and activate in **Plugins**.
3. Create standard WordPress pages (e.g. Dashboard, Deposit, Withdraw, Invest, Login, Register) and assign the matching Page Template in the page settings!

&copy; ${new Date().getFullYear()} ${siteName}. Pre-configured hotline: ${supportPhone}.
`;

  // Assemble ZIP
  zip.file('README.md', readmeMd);
  zip.file('tethra-database-schema.sql', sqlDatabaseSchema);

  // Theme Folder
  const themeFolder = zip.folder('wp-content/themes/tethra-theme');
  themeFolder?.file('style.css', themeStyleCss);
  themeFolder?.file('functions.php', themeFunctionsPhp);
  themeFolder?.file('index.php', themeFrontPagePhp);
  themeFolder?.file('front-page.php', themeFrontPagePhp);
  themeFolder?.file('header.php', themeHeaderPhp);
  themeFolder?.file('footer.php', themeFooterPhp);
  themeFolder?.file('page-dashboard.php', themeDashboardPhp);
  themeFolder?.file('page-invest.php', themePageInvestPhp);
  themeFolder?.file('page-deposit.php', themePageDepositPhp);
  themeFolder?.file('page-withdraw.php', themePageWithdrawPhp);
  themeFolder?.file('page-login.php', themePageLoginPhp);
  themeFolder?.file('page-register.php', themePageRegisterPhp);
  themeFolder?.file('page-about.php', themePageAboutPhp);
  themeFolder?.file('page-accounts.php', themePageAccountsPhp);
  themeFolder?.file('page-savings.php', themePageSavingsPhp);
  themeFolder?.file('page-referrals.php', themePageReferralsPhp);
  themeFolder?.file('page-transactions.php', themePageTransactionsPhp);
  themeFolder?.file('page-crypto.php', themePageCryptoPhp);
  themeFolder?.file('page-earnings.php', themePageEarningsPhp);
  themeFolder?.file('page-expenses.php', themePageExpensesPhp);
  themeFolder?.file('page-groups.php', themePageGroupsPhp);
  themeFolder?.file('page-connections.php', themePageConnectionsPhp);
  themeFolder?.file('page-kyc.php', themePageKycPhp);
  themeFolder?.file('page-security.php', themePageSecurityPhp);
  themeFolder?.file('page-support.php', themePageSupportPhp);
  themeFolder?.file('page-profile.php', themePageProfilePhp);
  themeFolder?.file('page-security-policy.php', themePageSecurityPolicyPhp);
  themeFolder?.file('page-faq.php', themePageFaqPhp);
  themeFolder?.file('page-terms.php', themePageTermsPhp);
  themeFolder?.file('page-privacy.php', themePagePrivacyPhp);
  themeFolder?.file('page-press.php', themePagePressPhp);
  themeFolder?.file('page-contact.php', themePageContactPhp);

  // Plugin Folder
  const pluginFolder = zip.folder('wp-content/plugins/tethra-core');
  pluginFolder?.file('tethra-banking-core.php', pluginCorePhp);

  const blob = await zip.generateAsync({ type: 'blob' });
  return blob;
};
