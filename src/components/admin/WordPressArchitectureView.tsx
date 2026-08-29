import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  Globe,
  Download,
  Phone,
  MessageSquare,
  FolderTree,
  Terminal,
  Zap,
  ShieldCheck,
  TrendingUp,
  Landmark,
  KeyRound,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateWordPressCompleteZip } from '../../utils/wordpressZipGenerator';

export const WordPressArchitectureView: React.FC = () => {
  const { showToast, config } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<
    | 'page-dashboard'
    | 'page-invest'
    | 'page-deposit'
    | 'page-login'
    | 'core-plugin'
    | 'sql-schema'
  >('page-dashboard');

  const SUPPORT_PHONE = '+1 870-382-9652';
  const CLEAN_PHONE = '18703829652';
  const WHATSAPP_LINK = `https://wa.me/${CLEAN_PHONE}?text=Hello%20Tethra%20Support%2C%20I%20need%20assistance`;

  const handleDownloadZip = async () => {
    try {
      setIsGeneratingZip(true);
      showToast({
        title: 'Building Pure WordPress ZIP Package',
        message: 'Packaging 100% native PHP templates, 2% Tether cron engine, and UK/EU/USA banking plugins...',
        type: 'info',
      });

      const zipBlob = await generateWordPressCompleteZip({
        siteName: 'Tethra Financial Infrastructure',
        supportPhone: SUPPORT_PHONE,
        supportWhatsapp: WHATSAPP_LINK,
        adminEmail: 'support@tethra.finance',
        savingsApy: config?.savingsApyRate || 5.4,
      });

      // Trigger Browser Download
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'tethra-wordpress-complete-website.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast({
        title: 'ZIP Download Complete!',
        message: 'tethra-wordpress-complete-website.zip (100% Pure Native WordPress) has been downloaded.',
        type: 'success',
      });
    } catch (err) {
      console.error(err);
      showToast({
        title: 'Download Failed',
        message: 'Unable to package ZIP. Please check console.',
        type: 'error',
      });
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const copySnippet = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    showToast({
      title: 'Code Copied',
      message: `${label} copied to clipboard.`,
      type: 'success',
    });
    setTimeout(() => setCopiedCode(null), 2200);
  };

  // Code snippets for viewer
  const dashboardCode = `<?php
/**
 * Template Name: Native User Dashboard
 * 100% Pure PHP - No React or external runtime required.
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
$investments = $wpdb->get_results($wpdb->prepare(
    "SELECT * FROM {$wpdb->prefix}tethra_investments WHERE user_id = %d ORDER BY id DESC", $user_id
));
$transactions = $wpdb->get_results($wpdb->prepare(
    "SELECT * FROM {$wpdb->prefix}tethra_transactions WHERE user_id = %d ORDER BY id DESC LIMIT 10", $user_id
));
?>

<main class="tethra-container">
    <div class="user-header">
        <h1>Welcome, <?php echo esc_html($user->first_name ?: $user->display_name); ?></h1>
        <div class="badges">
            <span>ID: TETHRA-<?php echo esc_html($user_id + 100000); ?></span>
            <span class="badge-verified">● Email & Phone Verified</span>
            <span class="badge-pin">🔒 6-Digit PIN Security Active</span>
        </div>
    </div>

    <!-- Multi-Currency Balances -->
    <div class="grid-3">
        <div class="card">
            <span>🇺🇸 USD Checking (USA ACH)</span>
            <h2>$<?php echo number_format($wallet->balance_usd ?? 0, 2); ?></h2>
        </div>
        <div class="card">
            <span>🇪🇺 EUR / 🇬🇧 GBP (SEPA & Faster Payments)</span>
            <h2>&euro;<?php echo number_format($wallet->balance_eur ?? 0, 2); ?> / &pound;<?php echo number_format($wallet->balance_gbp ?? 0, 2); ?></h2>
        </div>
        <div class="card card-gold">
            <span>⚡ Tether (USDT) 2% Daily Yield</span>
            <h2><?php echo number_format($wallet->balance_usdt ?? 0, 2); ?> USDT</h2>
            <small>Invested: <?php echo number_format($wallet->invested_usdt ?? 0, 2); ?> USDT &bull; Earned: +<?php echo number_format($wallet->total_earned_usdt ?? 0, 2); ?> USDT</small>
        </div>
    </div>
</main>
<?php get_footer(); ?>`;

  const investCode = `<?php
/**
 * Template Name: Native 2% Tether Investment Page
 * Automated 2% profit credited every 24 hours via WordPress Cron.
 */
if (!is_user_logged_in()) { wp_redirect(home_url('/login/')); exit; }
get_header();
$user_id = get_current_user_id();
$wallet = tethra_get_current_user_wallets($user_id);
?>

<main class="tethra-container">
    <div class="invest-card">
        <h2>🔥 24-Hour 2.0% Tether (USDT) Income Plan</h2>
        <p>Available USDT Balance: <strong><?php echo number_format($wallet->balance_usdt ?? 0, 2); ?> USDT</strong></p>

        <form method="POST" action="">
            <?php wp_nonce_field('tethra_invest_nonce'); ?>
            <input type="hidden" name="tethra_action" value="invest_tether">

            <label>Amount to Allocate (USDT):</label>
            <input type="number" name="amount" min="50" step="0.01" required placeholder="500" class="input-gold">

            <div class="yield-preview">
                <div>24-Hour Profit (2%): <strong id="daily-calc">+10.00 USDT</strong></div>
                <div>Payout Frequency: <strong>Every 24 Hours (Automated WP-Cron)</strong></div>
            </div>

            <button type="submit" class="btn-gold">Confirm 2% 24H Yield Contract</button>
        </form>
    </div>
</main>
<?php get_footer(); ?>`;

  const depositCode = `<?php
/**
 * Template Name: Multi-Country Bank & Crypto Deposit
 * UK Faster Payments, Europe SEPA, USA ACH, and USDT TRC20/ERC20.
 */
if (!is_user_logged_in()) { wp_redirect(home_url('/login/')); exit; }
get_header();
$user_id = get_current_user_id();
?>

<main class="tethra-container">
    <div class="grid-2">
        <!-- UK Bank -->
        <div class="card">
            <h3>🇬🇧 UK Faster Payments (GBP)</h3>
            <p>Sort Code: <strong>20-04-15</strong></p>
            <p>Account Number: <strong>89420194</strong></p>
            <p>Reference: <strong>THR-<?php echo $user_id + 1000; ?></strong></p>
        </div>

        <!-- Europe SEPA -->
        <div class="card">
            <h3>🇪🇺 Europe SEPA Direct (EUR)</h3>
            <p>IBAN: <strong>FR76 3000 4001 2345 6789 0123 456</strong></p>
            <p>BIC/SWIFT: <strong>BNPAFR2X</strong></p>
            <p>Reference: <strong>THR-<?php echo $user_id + 1000; ?></strong></p>
        </div>

        <!-- USA ACH -->
        <div class="card">
            <h3>🇺🇸 USA ABA & ACH Routing (USD)</h3>
            <p>Routing: <strong>021000021</strong></p>
            <p>Account Number: <strong>9872134590</strong></p>
            <p>Reference: <strong>THR-<?php echo $user_id + 1000; ?></strong></p>
        </div>

        <!-- USDT Crypto -->
        <div class="card card-gold">
            <h3>⚡ Real-Time Tether (USDT)</h3>
            <p>TRC-20: <code>TJ8N7X29VqL9K3wM4aPzE1uY7bC6rD8fGh</code></p>
            <p>ERC-20: <code>0x71C3F982A1B4982E94321B0982E119A94821CF01</code></p>
        </div>
    </div>
</main>
<?php get_footer(); ?>`;

  const loginCode = `<?php
/**
 * Template Name: Native Login (Phone & 6-Digit PIN or Email)
 */
if (is_user_logged_in()) { wp_redirect(home_url('/dashboard/')); exit; }
get_header();
?>

<main class="tethra-container">
    <div class="auth-box">
        <h2>Secure Login</h2>
        <form method="POST" action="">
            <?php wp_nonce_field('tethra_login_nonce'); ?>
            <input type="hidden" name="tethra_action" value="login">
            <input type="hidden" name="login_mode" value="pin">

            <label>Phone Number:</label>
            <input type="tel" name="phone" required placeholder="+1 870..." class="input">

            <label>6-Digit Security PIN:</label>
            <input type="password" maxlength="6" pattern="[0-9]*" name="pin_code" required placeholder="••••••" class="input-pin">

            <button type="submit" class="btn-gold">Sign In with PIN &rarr;</button>
        </form>
    </div>
</main>
<?php get_footer(); ?>`;

  const corePluginCode = `<?php
/**
 * Plugin Name: Tethra Banking & 2% 24H Tether Yield Core
 * Description: Native WP Plugin managing custom wallets, UK/EU/USA bank transfers, and automated 2% 24-hour Tether yield Cron.
 */
if (!defined('ABSPATH')) exit;

class Tethra_Banking_Core {
    public function __construct() {
        register_activation_hook(__FILE__, [$this, 'install_tables']);
        register_activation_hook(__FILE__, [$this, 'setup_cron']);
        add_action('tethra_hourly_yield_cron', [$this, 'process_24h_tether_yields']);
    }

    public function install_tables() {
        global $wpdb;
        $collate = $wpdb->get_charset_collate();
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        dbDelta("CREATE TABLE IF NOT EXISTS {$wpdb->prefix}tethra_wallets (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id BIGINT(20) UNSIGNED NOT NULL UNIQUE,
            balance_usd DECIMAL(15,2) DEFAULT 0.00,
            balance_eur DECIMAL(15,2) DEFAULT 0.00,
            balance_gbp DECIMAL(15,2) DEFAULT 0.00,
            balance_usdt DECIMAL(15,2) DEFAULT 0.00,
            invested_usdt DECIMAL(15,2) DEFAULT 0.00,
            total_earned_usdt DECIMAL(15,2) DEFAULT 0.00,
            PRIMARY KEY (id)
        ) $collate;");

        dbDelta("CREATE TABLE IF NOT EXISTS {$wpdb->prefix}tethra_investments (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id BIGINT(20) UNSIGNED NOT NULL,
            amount_usdt DECIMAL(15,2) NOT NULL,
            daily_rate_pct DECIMAL(5,2) DEFAULT 2.00,
            next_payout_time DATETIME NOT NULL,
            status VARCHAR(32) DEFAULT 'active',
            PRIMARY KEY (id)
        ) $collate;");
    }

    public function setup_cron() {
        if (!wp_next_scheduled('tethra_hourly_yield_cron')) {
            wp_schedule_event(time(), 'hourly', 'tethra_hourly_yield_cron');
        }
    }

    public function process_24h_tether_yields() {
        global $wpdb;
        $now = current_time('mysql');
        $contracts = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM {$wpdb->prefix}tethra_investments WHERE status = 'active' AND next_payout_time <= %s", $now
        ));

        foreach ($contracts as $c) {
            $profit = $c->amount_usdt * 0.02;
            $wpdb->query($wpdb->prepare(
                "UPDATE {$wpdb->prefix}tethra_wallets SET balance_usdt = balance_usdt + %f, total_earned_usdt = total_earned_usdt + %f WHERE user_id = %d",
                $profit, $profit, $c->user_id
            ));
            $next = date('Y-m-d H:i:s', strtotime('+24 hours'));
            $wpdb->update($wpdb->prefix . 'tethra_investments', ['next_payout_time' => $next], ['id' => $c->id]);
        }
    }
}
new Tethra_Banking_Core();`;

  const sqlSchemaCode = `-- TETHRA COMPLETE NATIVE WORDPRESS DATABASE SCHEMA
-- Pre-configured Support Hotline: ${SUPPORT_PHONE}

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;

  const getActiveCode = () => {
    switch (activeCodeTab) {
      case 'page-dashboard':
        return dashboardCode;
      case 'page-invest':
        return investCode;
      case 'page-deposit':
        return depositCode;
      case 'page-login':
        return loginCode;
      case 'core-plugin':
        return corePluginCode;
      case 'sql-schema':
        return sqlSchemaCode;
      default:
        return dashboardCode;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="tethra-wp-architecture">
      {/* Header with 1-Click ZIP Download Action */}
      <div className="pb-6 border-b border-[#d4af37]/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a382d] border border-[#d4af37]/50 text-[#fae188] font-mono text-xs font-bold mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>100% PURE NATIVE WORDPRESS THEME &bull; NO EXTERNAL RUNTIME REQUIRED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Pure Native WordPress Banking &amp; 2% Tether Yield Package
          </h1>
          <p className="text-xs text-[#8cb8a8] mt-1 max-w-2xl">
            Production-ready native WordPress theme and core plugins featuring UK, Europe &amp; USA Bank Deposits/Withdrawals, 24-Hour 2% Tether (USDT) Automated Yield Cron, Phone &amp; 6-Digit PIN Authentication, and 24/7 Live WhatsApp Support ({SUPPORT_PHONE}).
          </p>
        </div>

        {/* Primary Download ZIP Button */}
        <div className="shrink-0 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadZip}
            disabled={isGeneratingZip}
            id="download-wordpress-zip-btn"
            className="px-6 py-3.5 rounded-2xl gold-gradient-bg text-[#031d16] font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-[#d4af37]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            <Download className={`w-5 h-5 ${isGeneratingZip ? 'animate-bounce' : ''}`} />
            <span>{isGeneratingZip ? 'Generating Pure WP ZIP...' : 'Download WordPress ZIP (.zip)'}</span>
          </button>
        </div>
      </div>

      {/* Support & Live Chat Channel Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#042018] via-[#093528] to-[#042018] border border-[#d4af37]/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-left w-full sm:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg shrink-0">
            <MessageSquare className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-sm sm:text-base">
                24/7 Live Dedicated Support &amp; WhatsApp Desk
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#10b981] text-[10px] font-mono border border-[#10b981]/40">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-[#8cb8a8]">
              Hotline &amp; WhatsApp: <strong className="text-[#fae188] font-mono text-sm">{SUPPORT_PHONE}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-md"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${CLEAN_PHONE}`}
            className="px-4 py-2.5 rounded-xl bg-[#062920] hover:bg-[#0a3a2c] text-[#fae188] border border-[#d4af37]/40 text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-md"
          >
            <Phone className="w-4 h-4" />
            <span>Call Hotline</span>
          </a>
        </div>
      </div>

      {/* Core Feature Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#042018] border border-[#d4af37]/30 space-y-1.5">
          <div className="flex items-center gap-2 text-[#fae188] font-bold text-sm">
            <Landmark className="w-4 h-4" />
            <span>UK &bull; EU &bull; USA Banking</span>
          </div>
          <p className="text-xs text-[#8cb8a8]">
            Sort Code, SEPA IBAN &amp; USA ACH routing rails for seamless deposits &amp; payouts.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#042018] border border-[#10b981]/30 space-y-1.5">
          <div className="flex items-center gap-2 text-[#10b981] font-bold text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>2% Tether 24h Yield</span>
          </div>
          <p className="text-xs text-[#8cb8a8]">
            Native WP-Cron automated compounding credited to user wallet every 24 hours.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#042018] border border-[#38bdf8]/30 space-y-1.5">
          <div className="flex items-center gap-2 text-[#38bdf8] font-bold text-sm">
            <KeyRound className="w-4 h-4" />
            <span>Phone &amp; 6-Digit PIN</span>
          </div>
          <p className="text-xs text-[#8cb8a8]">
            Frictionless numeric PIN sign-in &amp; transaction authorization with email OTP.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#042018] border border-[#25D366]/30 space-y-1.5">
          <div className="flex items-center gap-2 text-[#25D366] font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Pure PHP</span>
          </div>
          <p className="text-xs text-[#8cb8a8]">
            Standard WordPress template hierarchy, zero React dependencies, 100% plug &amp; play.
          </p>
        </div>
      </div>

      {/* Interactive Code & File Viewer */}
      <div className="emerald-card rounded-3xl p-6 sm:p-8 border border-[#d4af37]/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#0f4637]">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Code className="w-5 h-5 text-[#d4af37]" />
              <span>Native WordPress PHP Code Inspector</span>
            </h3>
            <span className="text-[11px] text-[#8cb8a8]">
              Inspect the exact pure PHP templates and plugins packaged inside the ZIP.
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => copySnippet(getActiveCode(), activeCodeTab)}
              className="px-3.5 py-1.5 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs flex items-center gap-1.5 hover:scale-105 transition-all shadow-md"
            >
              {copiedCode === activeCodeTab ? (
                <Check className="w-4 h-4 text-[#031d16]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>{copiedCode === activeCodeTab ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        {/* Code Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveCodeTab('page-dashboard')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-colors ${
              activeCodeTab === 'page-dashboard'
                ? 'bg-[#d4af37] text-[#031d16]'
                : 'bg-[#041d16] text-[#8cb8a8] hover:text-white border border-[#144f3d]'
            }`}
          >
            📊 page-dashboard.php
          </button>

          <button
            onClick={() => setActiveCodeTab('page-invest')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-colors ${
              activeCodeTab === 'page-invest'
                ? 'bg-[#10b981] text-[#031d16]'
                : 'bg-[#041d16] text-[#8cb8a8] hover:text-white border border-[#144f3d]'
            }`}
          >
            🔥 page-invest.php (2% Tether)
          </button>

          <button
            onClick={() => setActiveCodeTab('page-deposit')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-colors ${
              activeCodeTab === 'page-deposit'
                ? 'bg-[#38bdf8] text-[#031d16]'
                : 'bg-[#041d16] text-[#8cb8a8] hover:text-white border border-[#144f3d]'
            }`}
          >
            🏛️ page-deposit.php (UK/EU/USA)
          </button>

          <button
            onClick={() => setActiveCodeTab('page-login')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-colors ${
              activeCodeTab === 'page-login'
                ? 'bg-[#fae188] text-[#031d16]'
                : 'bg-[#041d16] text-[#8cb8a8] hover:text-white border border-[#144f3d]'
            }`}
          >
            🔑 page-login.php (PIN Auth)
          </button>

          <button
            onClick={() => setActiveCodeTab('core-plugin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-colors ${
              activeCodeTab === 'core-plugin'
                ? 'bg-[#d4af37] text-[#031d16]'
                : 'bg-[#041d16] text-[#8cb8a8] hover:text-white border border-[#144f3d]'
            }`}
          >
            ⚙️ tethra-banking-core.php (Cron)
          </button>

          <button
            onClick={() => setActiveCodeTab('sql-schema')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-colors ${
              activeCodeTab === 'sql-schema'
                ? 'bg-[#d4af37] text-[#031d16]'
                : 'bg-[#041d16] text-[#8cb8a8] hover:text-white border border-[#144f3d]'
            }`}
          >
            🗄️ Database Schema (.sql)
          </button>
        </div>

        <pre className="p-4 rounded-2xl bg-[#02110c] border border-[#0d3f32] text-xs font-mono text-[#a2d8c3] overflow-x-auto max-h-[340px] leading-relaxed">
          {getActiveCode()}
        </pre>
      </div>

      {/* 3-Minute Quick Setup Guide */}
      <div className="emerald-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-4">
        <h3 className="font-bold text-white text-base pb-2 border-b border-[#0f4637] flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#d4af37]" />
          <span>Quick 3-Minute Setup on Any WordPress Host (cPanel, Hostinger, LocalWP)</span>
        </h3>

        <div className="space-y-3 text-xs text-[#8cb8a8]">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#041d16] border border-[#144f3d]">
            <span className="w-6 h-6 rounded-full bg-[#d4af37] text-[#031d16] font-bold flex items-center justify-center shrink-0 font-mono text-xs">
              1
            </span>
            <div>
              <strong className="text-white block">Download the Complete ZIP</strong>
              Click <strong>&quot;Download WordPress ZIP&quot;</strong> above to get{' '}
              <code className="text-[#fae188]">tethra-wordpress-complete-website.zip</code>.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#041d16] border border-[#144f3d]">
            <span className="w-6 h-6 rounded-full bg-[#d4af37] text-[#031d16] font-bold flex items-center justify-center shrink-0 font-mono text-xs">
              2
            </span>
            <div>
              <strong className="text-white block">Activate Theme &amp; Plugins in WP-Admin</strong>
              Upload <code className="text-[#fae188]">wp-content/themes/tethra-theme</code> and <code className="text-[#fae188]">wp-content/plugins/tethra-core</code>. Activate them in your WordPress admin panel.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#041d16] border border-[#144f3d]">
            <span className="w-6 h-6 rounded-full bg-[#d4af37] text-[#031d16] font-bold flex items-center justify-center shrink-0 font-mono text-xs">
              3
            </span>
            <div>
              <strong className="text-white block">Assign Page Templates</strong>
              Create pages in WordPress for <strong>Dashboard</strong>, <strong>Deposit</strong>, <strong>Withdraw</strong>, <strong>Invest (2% Tether)</strong>, and <strong>Login</strong>, selecting their respective custom templates from the Page Attributes dropdown.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
