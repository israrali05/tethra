import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  PiggyBank,
  Receipt,
  Users,
  ShieldCheck,
  Sparkles,
  Building2,
  Clock,
  ExternalLink,
  ChevronRight,
  Plus,
  Coins,
  CheckCircle2,
  AlertCircle,
  Percent,
  Globe,
  Activity,
  LineChart,
  Zap,
} from 'lucide-react';
import { LiveGlobalActivityTicker } from '../common/LiveGlobalActivityTicker';
import { GlobalCountryLeaderboard } from '../common/GlobalCountryLeaderboard';

export const DashboardHome: React.FC = () => {
  const {
    currentUser,
    accounts,
    transactions,
    savingsGoals,
    platformFeed,
    formatMoney,
    setCurrentRoute,
  } = useApp();

  const [timeRange, setTimeRange] = useState<'7D' | '1M' | '3M' | '1Y'>('1M');

  if (!currentUser) return null;

  const totalBalance = accounts.reduce((acc, a) => acc + a.balance, 0);
  const checkingBalance = accounts.find((a) => a.type === 'checking')?.balance || 0;
  const savingsBalance = accounts.find((a) => a.type === 'savings')?.balance || 0;
  const investmentBalance = accounts.find((a) => a.type === 'investment')?.balance || 0;
  const cryptoBalance = accounts.find((a) => a.type === 'crypto')?.balance || 0;

  // Chart data simulation
  const chartDataMap = {
    '7D': [36200, 36800, 37100, 38400, 39100, 39900, totalBalance],
    '1M': [31000, 32500, 34200, 35100, 36900, 38800, totalBalance],
    '3M': [24000, 27500, 29000, 32000, 35000, 37800, totalBalance],
    '1Y': [15000, 19200, 24000, 28500, 33000, 37500, totalBalance],
  };

  const currentChartData = chartDataMap[timeRange];
  const maxVal = Math.max(...currentChartData);
  const minVal = Math.min(...currentChartData);

  return (
    <div className="space-y-8" id="tethra-dashboard-home">
      {/* 1. TOP WELCOME & COMPLIANCE BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d4af37]/20">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Welcome, {currentUser.firstName}
            </h1>
            <span
              className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase ${
                currentUser.kycStatus === 'approved' || currentUser.kycStatus === 'verified'
                  ? 'bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40'
                  : 'bg-yellow-900/40 text-yellow-300 border border-yellow-500/40'
              }`}
            >
              KYC: {currentUser.kycStatus} (Tier 2)
            </span>
          </div>
          <p className="text-xs text-[#8cb8a8] mt-1 font-mono">
            Unique Ledger ID: {currentUser.uniqueUserId} • {currentUser.city}, {currentUser.country}
          </p>
        </div>

        {/* Quick Action Pill Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setCurrentRoute('crypto')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#062c20] hover:bg-[#093e30] text-[#fae188] border border-[#d4af37]/40 text-xs font-bold transition-all shadow"
          >
            <Activity className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Live Markets &amp; Crypto</span>
          </button>

          <button
            onClick={() => setCurrentRoute('deposit')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0b4737] hover:bg-[#12644f] text-white border border-[#227f67] text-xs font-bold transition-all"
          >
            <ArrowDownLeft className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Deposit</span>
          </button>

          <button
            onClick={() => setCurrentRoute('withdraw')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl gold-gradient-bg text-[#031d16] text-xs font-bold shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:scale-105 transition-all"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Withdraw (US Bank)</span>
          </button>
        </div>
      </div>

      {/* 2. KPI CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Portfolio */}
        <div className="emerald-card-highlight rounded-2xl p-5 border border-[#d4af37]/40 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span className="font-semibold uppercase tracking-wider">Total Portfolio Balance</span>
            <Wallet className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white">
            {formatMoney(totalBalance)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#10b981] font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.8% (All Accounts)</span>
          </div>
        </div>

        {/* Card 2: Primary Checking */}
        <div className="emerald-card rounded-2xl p-5 border border-[#d4af37]/25 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span className="font-semibold uppercase tracking-wider">Available Checking</span>
            <span className="text-[10px] font-mono text-[#d4af37]">Liquid</span>
          </div>
          <div className="text-3xl font-display font-extrabold text-white">
            {formatMoney(checkingBalance)}
          </div>
          <div className="text-[11px] text-[#7ea999] font-mono">
            Instant settlement eligible
          </div>
        </div>

        {/* Card 3: High-Yield Savings */}
        <div className="emerald-card rounded-2xl p-5 border border-[#10b981]/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span className="font-semibold uppercase tracking-wider">High-Yield Savings</span>
            <PiggyBank className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="text-3xl font-display font-extrabold text-[#fae188]">
            {formatMoney(savingsBalance)}
          </div>
          <div className="text-[11px] text-[#7ea999] font-mono flex items-center gap-1">
            <Percent className="w-3 h-3 text-[#10b981]" />
            <span>5.4% Illustrative APY</span>
          </div>
        </div>

        {/* Card 4: Investments & 2% Tether Yield */}
        <div className="emerald-card rounded-2xl p-5 border border-[#38bdf8]/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span className="font-semibold uppercase tracking-wider">2% Daily USDT Staking</span>
            <Coins className="w-4 h-4 text-[#38bdf8]" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white">
            {formatMoney(investmentBalance + cryptoBalance)}
          </div>
          <div className="text-[11px] text-[#7ea999] font-mono flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#fae188]" />
            <span>+2.00% 24h Payout Active</span>
          </div>
        </div>
      </div>

      {/* 3. CHART & ASSET ALLOCATION ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Growth Chart (8 cols) */}
        <div className="lg:col-span-8 emerald-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white">Portfolio Valuation Trajectory</h3>
              <p className="text-xs text-[#8cb8a8]">Cumulative performance across multi-currency accounts</p>
            </div>

            <div className="flex items-center bg-[#041d16] border border-[#144f3d] rounded-lg p-1 gap-1">
              {(['7D', '1M', '3M', '1Y'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors ${
                    timeRange === r
                      ? 'bg-[#d4af37] text-black shadow-sm'
                      : 'text-[#8cb8a8] hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="pt-4 h-48 sm:h-56 relative flex items-end">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area polygon */}
              {(() => {
                const points = currentChartData.map((val, i) => {
                  const x = (i / (currentChartData.length - 1)) * 680 + 10;
                  const y = 180 - ((val - minVal) / (maxVal - minVal || 1)) * 140;
                  return `${x},${y}`;
                });
                const dArea = `M 10,190 L ${points.join(' L ')} L 690,190 Z`;
                const dLine = `M ${points.join(' L ')}`;
                return (
                  <>
                    <path d={dArea} fill="url(#chartGrad)" />
                    <path
                      d={dLine}
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    {currentChartData.map((val, i) => {
                      const cx = (i / (currentChartData.length - 1)) * 680 + 10;
                      const cy = 180 - ((val - minVal) / (maxVal - minVal || 1)) * 140;
                      return (
                        <circle
                          key={i}
                          cx={cx}
                          cy={cy}
                          r="4.5"
                          fill="#ffffff"
                          stroke="#d4af37"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          </div>

          <div className="flex justify-between text-[11px] text-[#71998b] font-mono pt-2 border-t border-[#0d3f32]">
            <span>Initial: {formatMoney(minVal)}</span>
            <span className="text-[#fae188]">Current: {formatMoney(totalBalance)}</span>
          </div>
        </div>

        {/* Right: US Bank Payout & $25 Referral (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* US Bank 3-Day Notice Card */}
          <div className="p-5 rounded-2xl bg-[#062c20] border border-[#d4af37]/40 space-y-3 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#0b4737] text-[#d4af37]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">US Bank Payout Rail</h4>
                <span className="text-[10px] text-[#76e5ba] font-mono">1-3 Business Days Delivery</span>
              </div>
            </div>

            <p className="text-xs text-[#8cb8a8] leading-relaxed">
              Withdraw to eligible US Bank accounts via ACH/Wire routing. Requests processed 24/7 with 72h delivery guarantee upon approval.
            </p>

            <button
              onClick={() => setCurrentRoute('withdraw')}
              className="w-full py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs shadow-md hover:scale-[1.02] transition-transform"
            >
              Initiate Bank Transfer
            </button>
          </div>

          {/* $25 Referral Quick Box */}
          <div className="p-5 rounded-2xl bg-[#041f17] border border-[#14533e] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>$25 Referral Reward</span>
              </span>
              <span className="text-[11px] font-mono text-[#fae188] font-bold">
                {currentUser.referralCode}
              </span>
            </div>
            <p className="text-[11px] text-[#8cb8a8]">
              Earn $25 for every member you introduce who completes Tier 2 KYC.
            </p>
            <button
              onClick={() => setCurrentRoute('referrals')}
              className="w-full py-2 rounded-lg bg-[#073024] hover:bg-[#0d4737] text-xs font-semibold text-white border border-[#1c5d4b]"
            >
              View Referrals &amp; Links
            </button>
          </div>
        </div>
      </div>

      {/* 4. REAL-TIME GLOBAL ACTIVITY TICKER & STREAM */}
      <LiveGlobalActivityTicker />

      {/* 5. HIGH-RANK LOCATIONS & COUNTRY-WISE REAL-TIME DATA */}
      <GlobalCountryLeaderboard />

      {/* 6. RECENT TRANSACTIONS & PRIVACY PLATFORM FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Ledger Records (7 cols) */}
        <div className="lg:col-span-7 emerald-card rounded-2xl p-6 border border-[#d4af37]/25 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#0f4637]">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#d4af37]" />
              <h3 className="text-sm font-bold text-white">Recent Ledger Transactions</h3>
            </div>
            <button
              onClick={() => setCurrentRoute('transactions')}
              className="text-xs text-[#d4af37] font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All Ledger</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {transactions.slice(0, 5).map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#041e17] border border-[#0d3f32] hover:bg-[#072c21] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg font-bold text-xs ${
                      tx.type === 'deposit' || tx.type === 'referral_bonus' || tx.type === 'yield'
                        ? 'bg-[#10b981]/20 text-[#10b981]'
                        : 'bg-red-900/20 text-red-400'
                    }`}
                  >
                    {tx.type === 'deposit' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : tx.type === 'withdrawal' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{tx.description}</div>
                    <div className="text-[10px] text-[#7da797] font-mono">
                      {new Date(tx.createdAt).toLocaleDateString()} • Ref: {tx.reference}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-xs font-bold font-mono ${
                      tx.type === 'deposit' || tx.type === 'referral_bonus' || tx.type === 'yield'
                        ? 'text-[#6ee7b7]'
                        : 'text-white'
                    }`}
                  >
                    {tx.type === 'deposit' || tx.type === 'referral_bonus' || tx.type === 'yield'
                      ? '+'
                      : '-'}
                    {formatMoney(tx.amount)}
                  </div>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase font-semibold ${
                      tx.status === 'completed'
                        ? 'bg-[#10b981]/20 text-[#6ee7b7]'
                        : tx.status === 'pending'
                        ? 'bg-yellow-900/40 text-yellow-300'
                        : 'bg-red-900/40 text-red-300'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Privacy-Safe Platform Community Feed (5 cols) */}
        <div className="lg:col-span-5 emerald-card rounded-2xl p-6 border border-[#d4af37]/25 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#0f4637]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#10b981]" />
              <h3 className="text-sm font-bold text-white">Community Activity</h3>
            </div>
            <span className="text-[10px] font-mono text-[#7ea999]">Privacy Protected</span>
          </div>

          <p className="text-[11px] text-[#7ea999] leading-relaxed">
            Safe milestones from verified members. Personal balances and financial amounts remain strictly confidential.
          </p>

          <div className="space-y-2.5">
            {platformFeed.slice(0, 4).map((feed) => (
              <div
                key={feed.id}
                className="p-3 rounded-xl bg-[#041e17] border border-[#0d3f32] flex items-center gap-3 text-xs"
              >
                <img
                  src={feed.userAvatar}
                  alt={feed.userName}
                  className="w-8 h-8 rounded-full object-cover border border-[#d4af37]/40"
                />
                <div className="flex-1">
                  <div className="font-semibold text-white">
                    {feed.userName} <span className="text-[#a4cebf] font-normal">{feed.action}</span>
                  </div>
                  <div className="text-[10px] text-[#6d9687] font-mono">
                    {new Date(feed.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Verified Member
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
