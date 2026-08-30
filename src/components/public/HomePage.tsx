import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Building2,
  Lock,
  PiggyBank,
  Receipt,
  Users,
  Coins,
  CreditCard,
  CheckCircle2,
  Clock,
  Smartphone,
  Laptop,
  Headphones,
  Globe,
  ChevronRight,
  ChevronDown,
  Percent,
  Check,
  DollarSign,
  ArrowUpRight,
  Wallet,
  Landmark,
} from 'lucide-react';
import { CURRENCY_RATES } from '../../data/initialData';

export const HomePage: React.FC = () => {
  const {
    setCurrentRoute,
    setPublicSubPage,
    formatMoney,
    selectedCurrency,
    cryptoAssets,
    convertFromUSD,
  } = useApp();

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [calcDeposit, setCalcDeposit] = useState<number>(5000);
  const [calcMonths, setCalcMonths] = useState<number>(12);

  const illustrativeAPY = 5.4; // 5.4% APY illustrative rate
  const calculatedSavings = calcDeposit * Math.pow(1 + illustrativeAPY / 100 / 12, calcMonths);
  const earnedInterest = calculatedSavings - calcDeposit;

  const faqs = [
    {
      q: 'How does the Tethra financial management platform work?',
      a: 'Tethra provides a single unified dashboard connecting multi-currency checking accounts, high-yield savings vaults, expense management, group split ledgers, and digital asset market tracking with institutional-grade security.',
    },
    {
      q: 'How are US Bank withdrawals processed and what is the timeline?',
      a: 'Withdrawal requests to eligible US Bank accounts (via ACH/Wire routing) undergo compliance verification and are dispatched to the partner banking network. Processing is typically completed within 1 to 3 business days (within 72 hours of approval).',
    },
    {
      q: 'How does account verification and Tier 2 KYC work?',
      a: 'Tethra enforces real Tier 2 KYC/AML compliance. Submissions are processed through encrypted channels with identity document verification and automated sanctions screening before accounts receive institutional withdrawal privileges.',
    },
    {
      q: 'How does the $25 Referral Program operate?',
      a: 'Every registered member receives a unique referral code and tracking link. When an invited member completes Tier 2 KYC verification and activates their first account, the referral reward is automatically credited subject to program terms.',
    },
    {
      q: 'What security standards protect my data and accounts?',
      a: 'Tethra utilizes 256-bit SSL encryption, mandatory Two-Factor Authentication (2FA), immutable double-entry ledger logging, and biometric identity verification powered by global AML screening.',
    },
  ];

  return (
    <div className="bg-[#031510] text-[#eafaf4] overflow-hidden" id="tethra-homepage-root">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Inspired by Tethra Emerald & Gold Ads) */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#0a4635]/40 via-[#0d5943]/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#10b981]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#063124] border border-[#d4af37]/50 shadow-[0_0_20px_rgba(212,175,55,0.2)] animate-in fade-in duration-500">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              <span className="text-xs font-mono font-bold tracking-wider text-[#fae188] uppercase">
                SMARTER MONEY MANAGEMENT • NEXT-GEN FINTECH
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08]">
              SMARTER MONEY <br />
              <span className="gold-gradient-text">MANAGEMENT.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-[#a8d3c4] leading-relaxed max-w-2xl mx-auto">
              Manage your accounts, track spending, monitor savings and explore your financial activity from one secure, institutional-grade dashboard.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setCurrentRoute('register')}
                className="flex items-center gap-2 px-8 py-4 rounded-xl gold-gradient-bg text-[#031d16] font-display font-bold text-base shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:scale-105 transition-all cursor-pointer"
                id="hero-cta-get-started"
              >
                <span>GET STARTED NOW</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentRoute('login')}
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#08382b] hover:bg-[#0e4e3c] text-white border border-[#d4af37]/40 font-semibold text-base transition-all hover:scale-105"
                id="hero-cta-login"
              >
                <span>LOGIN TO DASHBOARD</span>
              </button>
            </div>

            {/* US Manager / Badges Bar (Direct from ad imagery) */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#a2cbbe]">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#062c20] border border-[#14533e]">
                <Headphones className="w-4 h-4 text-[#d4af37]" />
                <span className="font-medium text-white">24/7 Dedicated US Manager Support</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#062c20] border border-[#14533e]">
                <Clock className="w-4 h-4 text-[#10b981]" />
                <span className="font-medium text-white">1-3 Business Day US Bank Payouts</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#062c20] border border-[#14533e]">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span className="font-medium text-white">Tier 2 KYC &amp; AML Verified</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* HERO VISUAL MOCKUP (Laptop + Smartphone display from Ads) */}
          {/* ========================================================================= */}
          <div className="mt-14 relative max-w-5xl mx-auto">
            {/* Outer Gold Glowing Frame */}
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#f3c64f]/60 via-[#0a4635] to-[#041a13] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.2)]">
              <div className="bg-[#041d16] rounded-[22px] p-4 sm:p-8 overflow-hidden relative">
                {/* Mockup Top Header */}
                <div className="flex items-center justify-between pb-6 border-b border-[#d4af37]/20">
                  <div className="flex items-center gap-3">
                    <div className="flex space-x-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                    </div>
                    <span className="text-xs font-mono text-[#8cb8a8] hidden sm:inline">
                      https://tethra.net/dashboard
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40 font-mono font-bold">
                      ● LIVE LEDGER
                    </span>
                  </div>
                </div>

                {/* Grid with Interactive Preview & Phone Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
                  {/* Left (Laptop Dashboard Canvas - 7 cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {/* KPI Card 1 */}
                      <div className="p-4 rounded-xl bg-[#062a20] border border-[#d4af37]/30">
                        <div className="text-xs text-[#87b3a3]">Total Portfolio Balance</div>
                        <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                          $40,671.25
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#10b981] mt-1 font-semibold">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>+14.8% this month</span>
                        </div>
                      </div>

                      {/* KPI Card 2 */}
                      <div className="p-4 rounded-xl bg-[#062a20] border border-[#10b981]/30">
                        <div className="text-xs text-[#87b3a3]">High-Yield Savings Vault</div>
                        <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#f5ebd2] mt-1">
                          $15,600.00
                        </div>
                        <div className="text-xs text-[#a2cdbf] mt-1 font-mono">
                          5.4% Illustrative APY
                        </div>
                      </div>
                    </div>

                    {/* Chart Simulation */}
                    <div className="p-4 rounded-xl bg-[#05231a] border border-[#144f3d]">
                      <div className="flex items-center justify-between text-xs text-[#87b3a3] mb-3">
                        <span className="font-semibold text-white">Portfolio Growth Velocity</span>
                        <div className="flex gap-1.5">
                          {['7D', '1M', '3M', '1Y'].map((t, idx) => (
                            <span
                              key={t}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                idx === 1 ? 'bg-[#d4af37] text-black font-bold' : 'text-[#87b3a3] bg-[#073327]'
                              }`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Sparkline Canvas Vector */}
                      <div className="h-28 flex items-end justify-between gap-1 pt-4">
                        {[40, 48, 45, 55, 62, 58, 68, 74, 71, 82, 88, 95].map((val, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              style={{ height: `${val}%` }}
                              className="w-full rounded-t bg-gradient-to-t from-[#0a4635] via-[#10b981] to-[#d4af37] opacity-85 hover:opacity-100 transition-all"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action pill bar */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => setCurrentRoute('deposit')}
                        className="flex-1 py-2.5 px-3 rounded-lg bg-[#0e503e] hover:bg-[#146b54] text-white font-semibold text-xs text-center border border-[#208468] transition-colors"
                      >
                        + Deposit Funds (ACH/USDT)
                      </button>
                      <button
                        onClick={() => setCurrentRoute('withdraw')}
                        className="flex-1 py-2.5 px-3 rounded-lg gold-gradient-bg text-[#031d16] font-bold text-xs text-center transition-transform hover:scale-[1.02]"
                      >
                        ⚡ Withdraw to US Bank
                      </button>
                    </div>
                  </div>

                  {/* Right (Realistic Phone Showcase - 5 cols, matching the ads) */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="w-full max-w-[290px] rounded-[38px] p-3 bg-gradient-to-b from-[#fae084] via-[#094132] to-[#041a13] shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.3)]">
                      <div className="bg-[#041e17] rounded-[30px] p-4 text-center space-y-4 border border-[#d4af37]/30">
                        {/* Phone Camera Notch */}
                        <div className="w-20 h-3.5 bg-black rounded-full mx-auto" />

                        {/* App header */}
                        <div className="flex items-center justify-between text-[11px] text-[#8cb8a8] border-b border-[#0f4435] pb-2">
                          <span className="font-bold text-white">tethra.net</span>
                          <span className="text-[#10b981] font-mono">● 5G Encrypted</span>
                        </div>

                        {/* Balance Circle Widget from Ads */}
                        <div className="p-4 rounded-2xl bg-radial from-[#0e4d3b] to-[#052219] border border-[#d4af37]/40 shadow-inner">
                          <div className="text-[10px] uppercase font-mono tracking-widest text-[#fae188]">
                            MY INVESTMENT WALLET
                          </div>
                          <div className="text-3xl font-display font-extrabold text-white mt-1">
                            $12,450.75
                          </div>
                          <div className="inline-flex items-center gap-1 mt-1 text-[11px] font-bold text-[#34d399] bg-[#063325] px-2.5 py-0.5 rounded-full border border-[#10b981]/40">
                            <TrendingUp className="w-3 h-3" />
                            <span>Profit: +$245.30 Today</span>
                          </div>
                        </div>

                        {/* US Bank Transfer Completed Simulation Card */}
                        <div className="p-3 rounded-xl bg-[#062c21] border border-[#21775f] text-left space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                              <Building2 className="w-4 h-4 text-[#d4af37]" />
                              <span>US Bank Payout</span>
                            </div>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#6ee7b7] font-mono">
                              COMPLETED
                            </span>
                          </div>
                          <div className="text-sm font-extrabold text-white">$750.00 USD</div>
                          <div className="text-[9px] text-[#7eb3a1] font-mono">
                            Ref: THR-WD-000102 • Chase Bank (****4821)
                          </div>
                        </div>

                        {/* Bottom Phone Action */}
                        <button
                          onClick={() => setCurrentRoute('register')}
                          className="w-full py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-display font-extrabold text-xs tracking-wider shadow-lg hover:brightness-110"
                        >
                          START INVESTING TODAY &gt;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION: 3-STEP US BANK WITHDRAWAL TIMELINE (From the Ad Visuals) */}
      {/* ========================================================================= */}
      <section className="py-20 bg-gradient-to-b from-[#031510] via-[#052119] to-[#031510] border-y border-[#d4af37]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-mono font-bold tracking-widest text-[#d4af37] uppercase">
              SEAMLESS BANKING PROTOCOL
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              3-Day US Bank Withdrawal Timeline
            </h2>
            <p className="text-sm text-[#8cb8a8]">
              Automated compliance checks, instant ledger settlement, and reliable ACH/Wire dispatch directly to your verified bank account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="emerald-card rounded-2xl p-6 relative border border-[#d4af37]/30 hover:border-[#d4af37] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#094635] text-[#d4af37] flex items-center justify-center text-xl font-extrabold border border-[#d4af37]/50 mb-5 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Step 1: Grow &amp; Allocate Capital</h3>
              <p className="text-xs text-[#8ab8a7] leading-relaxed mb-4">
                Deposit via ACH, wire, or USDT digital currency. Allocate funds to High-Yield Vaults or Investment portfolios with transparent returns.
              </p>
              <div className="p-3 rounded-lg bg-[#041f17] border border-[#144f3d] flex items-center gap-2">
                <Percent className="w-4 h-4 text-[#10b981]" />
                <span className="text-xs font-mono text-[#76e5ba]">Configured Yield Allocation</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="emerald-card rounded-2xl p-6 relative border border-[#d4af37]/30 hover:border-[#d4af37] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#094635] text-[#d4af37] flex items-center justify-center text-xl font-extrabold border border-[#d4af37]/50 mb-5 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                2
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Step 2: Request Payout 24/7</h3>
              <p className="text-xs text-[#8ab8a7] leading-relaxed mb-4">
                Submit withdrawal request through your encrypted dashboard to any eligible US Bank (Chase, Bank of America, Wells Fargo, etc.) or USDT wallet.
              </p>
              <div className="p-3 rounded-lg bg-[#041f17] border border-[#144f3d] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                <span className="text-xs font-mono text-[#fae188]">24/7 Automated Queue</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="emerald-card rounded-2xl p-6 relative border border-[#d4af37]/30 hover:border-[#d4af37] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#094635] text-[#d4af37] flex items-center justify-center text-xl font-extrabold border border-[#d4af37]/50 mb-5 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                3
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Step 3: Receive Payout in 1-3 Days</h3>
              <p className="text-xs text-[#8ab8a7] leading-relaxed mb-4">
                Your funds arrive in your US Bank account within 72 hours of approval. Receive instant SMS &amp; email confirmation with reference numbers.
              </p>
              <div className="p-3 rounded-lg bg-[#041f17] border border-[#144f3d] flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#10b981]" />
                <span className="text-xs font-mono text-[#76e5ba]">ACH / Wire Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION: ALL YOUR ACCOUNTS IN ONE PLACE */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-[#d4af37] uppercase">
              CENTRALIZED WEALTH REPOSITORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
              All Your Accounts, <br />
              <span className="gold-gradient-text">Unified in One Platform.</span>
            </h2>
            <p className="text-sm text-[#8cb8a8] leading-relaxed">
              Eliminate account fragmentation. Create multiple checking, high-yield savings, investment, and crypto wallets under a unified compliance and double-entry ledger umbrella.
            </p>

            <ul className="space-y-3 text-sm text-[#d4eee4]">
              <li className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-[#0a4635] text-[#d4af37]">
                  <Check className="w-4 h-4" />
                </div>
                <span>Unlimited sub-accounts with custom account numbers</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-[#0a4635] text-[#d4af37]">
                  <Check className="w-4 h-4" />
                </div>
                <span>Zero-latency internal transfers between wallets</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-[#0a4635] text-[#d4af37]">
                  <Check className="w-4 h-4" />
                </div>
                <span>Multi-currency balance evaluation in real time</span>
              </li>
            </ul>

            <button
              onClick={() => {
                setPublicSubPage('personal-finance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#d4af37] hover:text-[#fde68a] transition-colors"
            >
              <span>Explore Personal Finance Modules</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Account Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Primary Checking</span>
                <CreditCard className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="text-2xl font-extrabold text-white">$8,420.50</div>
              <div className="text-[11px] font-mono text-[#80b09f]">TR-8940-2391-4401</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#05261d] border border-[#10b981]/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">High-Yield Savings</span>
                <PiggyBank className="w-5 h-5 text-[#10b981]" />
              </div>
              <div className="text-2xl font-extrabold text-[#fae188]">$15,600.00</div>
              <div className="text-[11px] font-mono text-[#80b09f]">5.4% APY Vault</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#05261d] border border-[#38bdf8]/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Investment Portfolio</span>
                <TrendingUp className="w-5 h-5 text-[#38bdf8]" />
              </div>
              <div className="text-2xl font-extrabold text-white">$12,450.75</div>
              <div className="text-[11px] font-mono text-[#80b09f]">TR-8940-4491-0182</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">USDT Digital Custody</span>
                <Coins className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="text-2xl font-extrabold text-white">$4,200.00</div>
              <div className="text-[11px] font-mono text-[#80b09f]">TRC-20 / ERC-20 Address</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION: SAVINGS GOALS & CALCULATOR */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#02130e] border-y border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#d4af37] uppercase">
              COMPOUND ACCELERATOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Targeted Savings Goals &amp; Vaults
            </h2>
            <p className="text-sm text-[#8cb8a8]">
              Automate monthly transfers toward specific life goals: Emergency Funds, Luxury Travel, Real Estate, and Retirement.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Calculator */}
            <div className="lg:col-span-6 emerald-card rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-[#d4af37]/20 pb-3 flex items-center justify-between">
                <span>Illustrative Savings Estimator</span>
                <span className="text-xs font-mono text-[#d4af37]">{illustrativeAPY}% Configured APY</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-[#a2cbbe] mb-1">
                    <span>Initial Deposit:</span>
                    <span className="font-mono font-bold text-white">${calcDeposit.toLocaleString()} USD</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={calcDeposit}
                    onChange={(e) => setCalcDeposit(Number(e.target.value))}
                    className="w-full accent-[#d4af37] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#a2cbbe] mb-1">
                    <span>Duration:</span>
                    <span className="font-mono font-bold text-white">{calcMonths} Months</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="60"
                    step="3"
                    value={calcMonths}
                    onChange={(e) => setCalcMonths(Number(e.target.value))}
                    className="w-full accent-[#d4af37] cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#041a13] border border-[#165a46] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#87b3a3]">Projected Future Value</div>
                  <div className="text-2xl font-display font-extrabold text-[#fae188]">
                    ${calculatedSavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#87b3a3]">Est. Growth Gain</div>
                  <div className="text-sm font-mono font-bold text-[#10b981]">
                    +${earnedInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-[#71998c] leading-relaxed italic">
                *Illustrative configured rate — subject to applicable terms. Investments involve risk. Returns are not guaranteed.
              </p>
            </div>

            {/* Savings Goal Cards Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-xl bg-[#05261d] border border-[#d4af37]/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">6-Month Emergency Reserve</span>
                  <span className="text-[#10b981] font-mono font-bold">62.4% Complete</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#031510] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#10b981] to-[#d4af37] w-[62.4%]" />
                </div>
                <div className="flex justify-between text-[11px] text-[#80b09f] font-mono">
                  <span>Current: $15,600.00</span>
                  <span>Target: $25,000.00</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#05261d] border border-[#d4af37]/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Swiss Alps &amp; Zurich Vacation</span>
                  <span className="text-[#10b981] font-mono font-bold">61.1% Complete</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#031510] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#10b981] to-[#d4af37] w-[61.1%]" />
                </div>
                <div className="flex justify-between text-[11px] text-[#80b09f] font-mono">
                  <span>Current: $5,200.00</span>
                  <span>Target: $8,500.00</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#05261d] border border-[#d4af37]/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Real Estate Downpayment Vault</span>
                  <span className="text-[#10b981] font-mono font-bold">37.3% Complete</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#031510] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#10b981] to-[#d4af37] w-[37.3%]" />
                </div>
                <div className="flex justify-between text-[11px] text-[#80b09f] font-mono">
                  <span>Current: $22,400.00</span>
                  <span>Target: $60,000.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION: MULTI-CURRENCY & REAL-TIME CRYPTO MARKET */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-[#d4af37] uppercase">
            GLOBAL MARKET TICKER
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Multi-Currency &amp; Crypto Markets
          </h2>
          <p className="text-sm text-[#8cb8a8]">
            Track leading global fiat currencies and digital assets in real time with automated portfolio calculations.
          </p>
        </div>

        {/* Live Crypto Table Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cryptoAssets.slice(0, 6).map((asset) => (
            <div
              key={asset.id}
              className="p-5 rounded-2xl bg-[#05261d] border border-[#d4af37]/30 hover:border-[#d4af37] transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#094635] flex items-center justify-center font-bold text-xs text-[#fae188] border border-[#d4af37]/40">
                    {asset.symbol}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white">{asset.name}</div>
                    <div className="text-[10px] text-[#8cb8a8] font-mono">{asset.symbol}/USD</div>
                  </div>
                </div>

                <div
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    asset.change24h >= 0
                      ? 'bg-[#10b981]/20 text-[#6ee7b7]'
                      : 'bg-red-900/40 text-red-300'
                  }`}
                >
                  {asset.change24h >= 0 ? '+' : ''}
                  {asset.change24h}%
                </div>
              </div>

              <div className="text-2xl font-display font-extrabold text-white">
                ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: asset.price < 10 ? 4 : 2 })}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#7da797] pt-2 border-t border-[#0f4435] mt-2 font-mono">
                <span>Cap: ${(asset.marketCap / 1e9).toFixed(1)}B</span>
                <span>24h Vol: ${(asset.volume24h / 1e9).toFixed(1)}B</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION: $25 REFERRAL PROGRAM */}
      {/* ========================================================================= */}
      <section className="py-20 bg-gradient-to-r from-[#031d16] via-[#083b2d] to-[#031d16] border-y border-[#d4af37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/60 text-[#fced96] font-mono text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>COMMUNITY REWARD PROGRAM</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
                Invite Members. <br />
                <span className="gold-gradient-text">Earn $25 Per Qualified User.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#a2cbbe] leading-relaxed max-w-xl">
                Share your personalized Tethra link. When your invited connection passes Tier 2 KYC identity verification and funds their vault, receive a direct $25 bonus into your Primary Checking Account.
              </p>

              <div className="p-4 rounded-xl bg-[#041d16] border border-[#14533e] text-xs text-[#87b3a3] space-y-2">
                <div className="font-semibold text-white">Program Guidelines &amp; Anti-Fraud:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div>✓ Strict anti-duplicate registration filters</div>
                  <div>✓ Tier 2 KYC verification requirement</div>
                  <div>✓ Automated ledger credit upon qualification</div>
                  <div>✓ Subject to published referral terms</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentRoute('register')}
                  className="px-8 py-4 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-sm shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:scale-105 transition-all"
                >
                  Join &amp; Get Your Referral Code
                </button>
              </div>
            </div>

            {/* Right Referral Card Mock */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md emerald-card rounded-3xl p-6 sm:p-8 space-y-5 border border-[#d4af37]/50 shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4">
                  <div>
                    <div className="text-xs text-[#87b3a3]">Demo Referral Link</div>
                    <div className="text-sm font-mono font-bold text-white mt-0.5">
                      https://tethra.net/signup/?ref=TETHRA-A8F29K
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0b4635] text-[#d4af37]">
                    <Users className="w-6 h-6" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#042018] border border-[#14533e]">
                    <div className="text-[10px] text-[#87b3a3]">Total Qualified</div>
                    <div className="text-2xl font-bold text-white mt-0.5">2 Members</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#042018] border border-[#10b981]/40">
                    <div className="text-[10px] text-[#87b3a3]">Rewards Earned</div>
                    <div className="text-2xl font-bold text-[#34d399] mt-0.5">$50.00</div>
                  </div>
                </div>

                <div className="text-xs text-[#87b3a3] font-mono text-center">
                  $25 referral reward — subject to eligibility and program terms.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SECTION: FAQ ACCORDION */}
      {/* ========================================================================= */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-[#d4af37] uppercase">
            CLEAR ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-[#05261d] border border-[#d4af37]/25 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-semibold text-white text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#d4af37] shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-[#a2cbbe] leading-relaxed border-t border-[#0e4636] pt-3 animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#031510] to-[#020e0b]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="emerald-card-highlight rounded-3xl p-10 sm:p-16 border border-[#d4af37]/60 shadow-[0_0_50px_rgba(212,175,55,0.2)] space-y-6">
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
              Ready to Upgrade Your <br />
              <span className="gold-gradient-text">Financial Infrastructure?</span>
            </h2>

            <p className="text-base text-[#a2cbbe] max-w-xl mx-auto">
              Join thousands of professionals managing multi-currency accounts, high-yield vaults, and group expenses from one pristine dashboard.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setCurrentRoute('register')}
                className="px-10 py-4 rounded-xl gold-gradient-bg text-[#031d16] font-display font-bold text-base shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-all"
              >
                CREATE YOUR ACCOUNT NOW
              </button>
              <button
                onClick={() => setCurrentRoute('login')}
                className="px-8 py-4 rounded-xl bg-[#08382b] hover:bg-[#0e4e3c] text-white border border-[#d4af37]/40 font-semibold text-base"
              >
                EXPLORE DEMO SANDBOX
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
