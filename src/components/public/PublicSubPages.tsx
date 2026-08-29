import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Building2,
  Lock,
  PiggyBank,
  Receipt,
  Users,
  Coins,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  FileText,
  KeyRound,
  Check,
} from 'lucide-react';

export const PublicSubPages: React.FC = () => {
  const { publicSubPage, setCurrentRoute, setPublicSubPage } = useApp();

  const renderPage = () => {
    switch (publicSubPage) {
      case 'about':
        return (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold text-[#d4af37] tracking-widest uppercase">
                ABOUT TETHRA FINANCIAL
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                Engineered for Clarity, Security &amp; Growth
              </h1>
              <p className="text-base text-[#a2cbbe] leading-relaxed">
                Tethra was founded in 2025 to bridge the gap between traditional private banking precision and the speed of digital financial ledgers. We empower individuals, entrepreneurs, and global groups to command their personal finances from a single, institutional-grade cockpit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="emerald-card rounded-2xl p-6 space-y-3">
                <div className="p-3 rounded-xl bg-[#094635] text-[#d4af37] w-fit">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Institutional Custody</h3>
                <p className="text-xs text-[#8ab8a7] leading-relaxed">
                  Every account balance is backed by auditable double-entry ledger technology and routed through verified partner institutions with strict AML/KYC guardrails.
                </p>
              </div>

              <div className="emerald-card rounded-2xl p-6 space-y-3">
                <div className="p-3 rounded-xl bg-[#094635] text-[#10b981] w-fit">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Tier 2 Compliance</h3>
                <p className="text-xs text-[#8ab8a7] leading-relaxed">
                  Strict adherence to global financial regulations, anti-fraud screening, and privacy-first activity tracking with zero public disclosure of personal balances.
                </p>
              </div>

              <div className="emerald-card rounded-2xl p-6 space-y-3">
                <div className="p-3 rounded-xl bg-[#094635] text-[#d4af37] w-fit">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Community &amp; Sharing</h3>
                <p className="text-xs text-[#8ab8a7] leading-relaxed">
                  Seamlessly split real-world expenses, organize travel finances, and reward your trusted circle through our transparent $25 referral qualification model.
                </p>
              </div>
            </div>
          </div>
        );

      case 'personal-finance':
        return (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold text-[#d4af37] tracking-widest uppercase">
                PRODUCT ARCHITECTURE
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                Personal Finance &amp; Account Ledger
              </h1>
              <p className="text-base text-[#a2cbbe]">
                Command checking, savings, investment, and crypto portfolios with full transactional auditability and multi-currency conversion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 space-y-4">
                <h3 className="text-xl font-bold text-white">Multi-Account Hierarchy</h3>
                <p className="text-xs text-[#8cb8a8] leading-relaxed">
                  Create isolated sub-accounts for specific obligations: operational checking, tax reserves, emergency vaults, and crypto custody.
                </p>
                <ul className="space-y-2 text-xs text-[#b8e2d4]">
                  <li className="flex items-center gap-2">✓ Unique IBAN/Account Number generation</li>
                  <li className="flex items-center gap-2">✓ Automated internal transfers with zero fees</li>
                  <li className="flex items-center gap-2">✓ Real-time multi-currency valuation</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 space-y-4">
                <h3 className="text-xl font-bold text-white">Auditable Transaction Ledger</h3>
                <p className="text-xs text-[#8cb8a8] leading-relaxed">
                  Every deposit, withdrawal, fee, and expense generates an immutable double-entry reference number for complete accounting transparency.
                </p>
                <ul className="space-y-2 text-xs text-[#b8e2d4]">
                  <li className="flex items-center gap-2">✓ CSV export for external tax software</li>
                  <li className="flex items-center gap-2">✓ Categorized spending intelligence</li>
                  <li className="flex items-center gap-2">✓ Payout status lifecycle tracking</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'savings':
        return (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold text-[#d4af37] tracking-widest uppercase">
                SAVINGS VAULTS
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                High-Yield Savings &amp; Goals
              </h1>
              <p className="text-base text-[#a2cbbe]">
                Establish automated deposit habits with configurable annual percentage yields (illustrative configured rates) and goal milestones.
              </p>
            </div>

            <div className="emerald-card rounded-3xl p-8 border border-[#d4af37]/40 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4 rounded-xl bg-[#041d16] border border-[#144f3d]">
                  <div className="text-xs text-[#8cb8a8]">Configured Rate</div>
                  <div className="text-3xl font-bold text-[#fae188] mt-1">5.4% APY</div>
                  <div className="text-[10px] text-[#71998b] mt-1 font-mono">Illustrative / Configured</div>
                </div>
                <div className="p-4 rounded-xl bg-[#041d16] border border-[#144f3d]">
                  <div className="text-xs text-[#8cb8a8]">Deposit Flexibility</div>
                  <div className="text-3xl font-bold text-white mt-1">24/7 Access</div>
                  <div className="text-[10px] text-[#71998b] mt-1 font-mono">Zero Lock-in Penalties</div>
                </div>
                <div className="p-4 rounded-xl bg-[#041d16] border border-[#144f3d]">
                  <div className="text-xs text-[#8cb8a8]">Goal Progress</div>
                  <div className="text-3xl font-bold text-[#10b981] mt-1">Automated</div>
                  <div className="text-[10px] text-[#71998b] mt-1 font-mono">Monthly Rule Execution</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#031510] border border-[#16503f] text-xs text-[#87b3a3] leading-relaxed">
                <strong className="text-white">Compliance Disclosure: </strong>
                Configured savings rates are subject to administrative adjustments and applicable terms. Never hard-coded as guaranteed. Investments involve risk.
              </div>
            </div>
          </div>
        );

      case 'expenses':
        return (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold text-[#d4af37] tracking-widest uppercase">
                SHARED LEDGER
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                Expense Tracking &amp; Group Sharing
              </h1>
              <p className="text-base text-[#a2cbbe]">
                Log personal receipts with OCR metadata or split travel and roommate bills with automated minimum cash-flow debt settlement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 space-y-4">
                <div className="p-3 rounded-xl bg-[#094635] text-[#d4af37] w-fit">
                  <Receipt className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Personal Receipt Vault</h3>
                <p className="text-xs text-[#8cb8a8] leading-relaxed">
                  Store PDF, PNG, and JPG receipts securely linked to individual expense records. Track categorization across Food, Housing, Transport, Subscriptions, and Travel.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 space-y-4">
                <div className="p-3 rounded-xl bg-[#094635] text-[#10b981] w-fit">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Minimum Payment Settlement</h3>
                <p className="text-xs text-[#8cb8a8] leading-relaxed">
                  Our graph optimization algorithm computes the minimum number of transactions required to settle balances among friends, roomates, or travel companions.
                </p>
              </div>
            </div>
          </div>
        );

      case 'crypto':
        return (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold text-[#d4af37] tracking-widest uppercase">
                MARKET INTELLIGENCE
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                Live Crypto Market &amp; Portfolio Tracker
              </h1>
              <p className="text-base text-[#a2cbbe]">
                Real-time price feeds for BTC, ETH, USDT, SOL, BNB, XRP, and ADA with integrated portfolio profit &amp; loss analysis.
              </p>
            </div>

            <div className="emerald-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-4">
              <h3 className="text-lg font-bold text-white">Portfolio Tracking &amp; Custodial Deposits</h3>
              <p className="text-xs text-[#8cb8a8] leading-relaxed">
                Connect your digital assets to track weighted average buy prices, unrealized profit &amp; loss, and execute USDT TRC20/ERC20 simulated funding directly into your investment account.
              </p>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold text-[#d4af37] tracking-widest uppercase">
                SECURITY STANDARDS
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                Institutional Security &amp; KYC
              </h1>
              <p className="text-base text-[#a2cbbe]">
                Bank-level encryption, multi-factor authentication, and strict compliance protocols protect your capital at every touchpoint.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Lock className="w-5 h-5 text-[#d4af37]" />
                  <span>256-Bit SSL &amp; 2FA Protection</span>
                </div>
                <p className="text-xs text-[#8cb8a8] leading-relaxed">
                  Time-based One-Time Password (TOTP) two-factor authentication, secure cookie handling, rate-limiting, and session token rotation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <ShieldCheck className="w-5 h-5 text-[#10b981]" />
                  <span>Tier 2 KYC &amp; AML Screening</span>
                </div>
                <p className="text-xs text-[#8cb8a8] leading-relaxed">
                  Biometric matching and automated screening against global watchlists prevent fraud and guarantee authorized account access.
                </p>
              </div>
            </div>
          </div>
        );

      case 'referrals':
        return (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold text-[#d4af37] tracking-widest uppercase">
                COMMUNITY PROGRAM
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                The Tethra $25 Referral Program
              </h1>
              <p className="text-base text-[#a2cbbe]">
                Earn $25 for every qualified member you introduce to the platform upon completion of their identity verification.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#05261d] border border-[#d4af37]/40 space-y-6">
              <h3 className="text-xl font-bold text-white">How Qualification Works:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-[#041d16] border border-[#144f3d] space-y-2">
                  <div className="text-xs font-bold text-[#d4af37]">Step 1: Invite</div>
                  <p className="text-xs text-[#8cb8a8]">Share your personal link: tethra.net/signup/?ref=CODE</p>
                </div>
                <div className="p-4 rounded-xl bg-[#041d16] border border-[#144f3d] space-y-2">
                  <div className="text-xs font-bold text-[#d4af37]">Step 2: Verify</div>
                  <p className="text-xs text-[#8cb8a8]">Invited member registers and completes Tier 2 KYC</p>
                </div>
                <div className="p-4 rounded-xl bg-[#041d16] border border-[#144f3d] space-y-2">
                  <div className="text-xs font-bold text-[#d4af37]">Step 3: Receive $25</div>
                  <p className="text-xs text-[#8cb8a8]">Bonus automatically credited to your Primary Checking</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'how-it-works':
        return (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold text-[#d4af37] tracking-widest uppercase">
                SYSTEM WORKFLOW
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                How Tethra Operates
              </h1>
              <p className="text-base text-[#a2cbbe]">
                A simple, 4-phase journey from registration to daily financial mastery.
              </p>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="p-6 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#094635] text-[#d4af37] flex items-center justify-center font-bold shrink-0">
                  01
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Create &amp; Verify Profile</h3>
                  <p className="text-xs text-[#8cb8a8] mt-1 leading-relaxed">
                    Sign up with your basic contact details. Upload government ID for instant Tier 2 KYC approval.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#094635] text-[#d4af37] flex items-center justify-center font-bold shrink-0">
                  02
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Fund Your Accounts</h3>
                  <p className="text-xs text-[#8cb8a8] mt-1 leading-relaxed">
                    Deposit via ACH, US Bank Wire, or USDT. Balances reflect instantly in your sandbox or verified live ledger.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#094635] text-[#d4af37] flex items-center justify-center font-bold shrink-0">
                  03
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Automate Savings &amp; Track Expenses</h3>
                  <p className="text-xs text-[#8cb8a8] mt-1 leading-relaxed">
                    Configure high-yield savings goals, upload receipts, and manage shared group splits seamlessly.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#094635] text-[#d4af37] flex items-center justify-center font-bold shrink-0">
                  04
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Withdraw with 72h Settlement</h3>
                  <p className="text-xs text-[#8cb8a8] mt-1 leading-relaxed">
                    Request US Bank or crypto withdrawals 24/7. Funds arrive in your bank in 1-3 business days upon approval.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold text-[#d4af37] tracking-widest uppercase">
                HELP CENTER
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                Frequently Asked Questions
              </h1>
              <p className="text-base text-[#a2cbbe]">
                Detailed answers regarding security, deposits, withdrawals, and account policies.
              </p>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="p-5 rounded-xl bg-[#05261d] border border-[#d4af37]/30 space-y-2">
                <h4 className="font-bold text-white">How long do US Bank withdrawals take?</h4>
                <p className="text-xs text-[#8cb8a8] leading-relaxed">
                  Withdrawal requests are processed through compliant banking rails and typically settle within 1 to 3 business days (within 72 hours of approval).
                </p>
              </div>
              <div className="p-5 rounded-xl bg-[#05261d] border border-[#d4af37]/30 space-y-2">
                <h4 className="font-bold text-white">Is my data shared with other members?</h4>
                <p className="text-xs text-[#8cb8a8] leading-relaxed">
                  Never. Your account balances, transaction amounts, and financial logs are strictly confidential. Platform community feeds only show privacy-safe milestones (e.g. joined Tethra or created a goal) without any numbers.
                </p>
              </div>
              <div className="p-5 rounded-xl bg-[#05261d] border border-[#d4af37]/30 space-y-2">
                <h4 className="font-bold text-white">What currencies are supported?</h4>
                <p className="text-xs text-[#8cb8a8] leading-relaxed">
                  Tethra supports USD, EUR, GBP, PKR, AED, CAD, and AUD with live currency conversion rates.
                </p>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-mono font-bold text-[#d4af37] tracking-widest uppercase">
                24/7 DEDICATED DESK
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                Contact Tethra Support
              </h1>
              <p className="text-base text-[#a2cbbe]">
                Our dedicated US account management team is standing by 24 hours a day, 7 days a week.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 text-center space-y-3">
                <Mail className="w-8 h-8 text-[#d4af37] mx-auto" />
                <h4 className="font-bold text-white">Email Concierge</h4>
                <p className="text-xs text-[#8cb8a8]">concierge@tethra.net</p>
                <div className="text-[10px] text-[#10b981] font-mono">Response within 15 mins</div>
              </div>

              <div className="p-6 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 text-center space-y-3">
                <Phone className="w-8 h-8 text-[#d4af37] mx-auto" />
                <h4 className="font-bold text-white">Phone &amp; Wire Desk</h4>
                <p className="text-xs text-[#8cb8a8]">+1 (800) 555-TETHRA</p>
                <div className="text-[10px] text-[#10b981] font-mono">Toll-Free USA &amp; Canada</div>
              </div>

              <div className="p-6 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 text-center space-y-3">
                <MapPin className="w-8 h-8 text-[#d4af37] mx-auto" />
                <h4 className="font-bold text-white">Headquarters</h4>
                <p className="text-xs text-[#8cb8a8]">Financial District, NY 10005</p>
                <div className="text-[10px] text-[#8cb8a8] font-mono">New York, USA</div>
              </div>
            </div>
          </div>
        );

      // Legal & Compliance Pages
      case 'terms':
      case 'privacy':
      case 'risk-disclosure':
      case 'kyc-policy':
      case 'referral-terms':
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-b border-[#d4af37]/20 pb-4">
              <span className="text-xs font-mono font-bold text-[#d4af37] tracking-widest uppercase">
                LEGAL &amp; REGULATORY FRAMEWORK
              </span>
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-2 capitalize">
                {publicSubPage.replace('-', ' ')}
              </h1>
              <div className="text-xs text-[#78a494] font-mono mt-1">
                Version 2.8.4 • Effective Date: January 1, 2026 • Governing Law: State of New York, USA
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 space-y-6 text-sm text-[#b8e2d4] leading-relaxed">
              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">1. Scope of Service &amp; Sandbox Execution</h3>
                <p className="text-xs text-[#8cb8a8] leading-relaxed">
                  Tethra Financial Technologies ("Tethra", "tethra.net", "we") provides personal finance tracking, multi-currency ledger management, goal planning, and digital asset analytics. By default, accounts operate in a secure simulated sandbox environment. Live banking integrations and custody operations are routed exclusively through eligible, licensed third-party banking partners and financial institutions.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">2. Risk Disclosure &amp; Non-Guaranteed Returns</h3>
                <div className="p-4 rounded-xl bg-[#031510] border border-[#f59e0b]/40 text-xs text-[#fde68a] space-y-1">
                  <div className="font-bold flex items-center gap-2 text-white">
                    <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />
                    <span>Important Financial Notice</span>
                  </div>
                  <p>
                    Investments involve significant financial risk. Past performance does not guarantee future results. Any return rate or APY configured in the platform represents an illustrative rate subject to prevailing market conditions, platform configurations, and applicable terms. Tethra does not promise guaranteed daily or fixed returns.
                  </p>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">3. KYC / Anti-Money Laundering (AML) Compliance</h3>
                <p className="text-xs text-[#8cb8a8] leading-relaxed">
                  All accounts seeking withdrawal privileges to external US Bank accounts or third-party payment rails must satisfy Tier 2 KYC verification, including verification of government-issued photo identification and proof of residential address.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">4. Payout Timeframes</h3>
                <p className="text-xs text-[#8cb8a8] leading-relaxed">
                  Withdrawal requests submitted to eligible US Bank accounts typically settle within 1 to 3 business days (within 72 hours of approval), dependent on domestic clearinghouse operating schedules and partner banking hours.
                </p>
              </section>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-[70vh] py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => {
          setPublicSubPage('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-[#d4af37] hover:text-[#fae188] transition-colors"
      >
        ← Back to Homepage
      </button>

      {renderPage()}

      {/* Call to action at bottom of every subpage */}
      <div className="mt-16 text-center pt-10 border-t border-[#0e4636]">
        <button
          onClick={() => setCurrentRoute('register')}
          className="px-8 py-3.5 rounded-xl gold-gradient-bg text-[#031d16] font-display font-bold text-sm shadow-lg hover:scale-105 transition-all"
        >
          Open Free Tethra Account
        </button>
      </div>
    </div>
  );
};
