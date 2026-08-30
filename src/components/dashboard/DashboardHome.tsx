import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  PiggyBank,
  Receipt,
  Building2,
  ChevronRight,
  Coins,
  Percent,
  Zap,
  Award,
  Share2,
  ShieldCheck,
  CreditCard,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { InviteFriendsModal } from './InviteFriendsModal';
import { AccountCertificateModal } from './AccountCertificateModal';

export const DashboardHome: React.FC = () => {
  const {
    currentUser,
    accounts,
    transactions,
    savingsGoals,
    formatMoney,
    setCurrentRoute,
  } = useApp();

  const [timeRange, setTimeRange] = useState<'7D' | '1M' | '3M' | '1Y'>('1M');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);

  if (!currentUser) return null;

  const totalBalance = accounts.reduce((acc, a) => acc + a.balance, 0);
  const checkingBalance = accounts.find((a) => a.type === 'checking')?.balance || 0;
  const savingsBalance = accounts.find((a) => a.type === 'savings')?.balance || 0;
  const investmentBalance = accounts.find((a) => a.type === 'investment')?.balance || 0;
  const cryptoBalance = accounts.find((a) => a.type === 'crypto')?.balance || 0;

  // Dynamic Portfolio Growth Chart calculated strictly from real user transaction history & balance timestamps
  const chartData = useMemo(() => {
    const days = timeRange === '7D' ? 7 : timeRange === '1M' ? 30 : timeRange === '3M' ? 90 : 365;
    const now = new Date();
    const result = [];

    // Sort transactions chronologically
    const sortedTx = [...transactions]
      .filter((t) => t.userId === currentUser.id)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    // Compute balance progression
    const totalTxDelta = sortedTx.reduce((sum, tx) => {
      const amount = tx.amount || 0;
      return sum + (tx.type === 'withdrawal' || tx.type === 'expense' ? -Math.abs(amount) : Math.abs(amount));
    }, 0);

    const baseVal = totalBalance === 0 ? 0 : Math.max(0, totalBalance - totalTxDelta);

    const step = Math.max(1, Math.floor(days / 7));
    for (let i = days; i >= 0; i -= step) {
      const targetDate = new Date(now.getTime() - i * 86400000);
      const dateLabel = targetDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      // Sum transactions up to this date
      const txUpToDate = sortedTx.filter((t) => new Date(t.createdAt) <= targetDate);
      const delta = txUpToDate.reduce((sum, tx) => {
        const amount = tx.amount || 0;
        return sum + (tx.type === 'withdrawal' || tx.type === 'expense' ? -Math.abs(amount) : Math.abs(amount));
      }, 0);

      const estimatedBalance = i === 0 ? totalBalance : (totalBalance === 0 && sortedTx.length === 0 ? 0 : Math.max(0, baseVal + delta));

      result.push({
        date: dateLabel,
        balance: Math.round(estimatedBalance),
      });
    }

    if (result[result.length - 1]?.balance !== Math.round(totalBalance)) {
      result[result.length - 1].balance = Math.round(totalBalance);
    }

    return result;
  }, [timeRange, totalBalance, transactions, currentUser.id]);

  const minVal = chartData.length > 0 ? Math.min(...chartData.map((d) => d.balance)) : 0;
  const maxVal = chartData.length > 0 ? Math.max(...chartData.map((d) => d.balance)) : 0;

  return (
    <div className="space-y-8" id="tethra-dashboard-home">
      {/* 1. TOP WELCOME & COMPLIANCE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5C158]/20">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Welcome, {currentUser.firstName}
            </h1>
            <span
              className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider ${
                currentUser.kycStatus === 'verified' || currentUser.kycStatus === 'approved'
                  ? 'bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40'
                  : 'bg-yellow-900/40 text-yellow-300 border border-yellow-500/40'
              }`}
            >
              Tier 2 KYC: {currentUser.kycStatus}
            </span>
          </div>
          <p className="text-xs text-[#8cb8a8] mt-1 font-mono">
            Ledger Identity: <span className="text-[#E5C158] font-semibold">{currentUser.uniqueUserId}</span> • {currentUser.city}, {currentUser.country}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#004D38] hover:bg-[#006046] text-[#E5C158] border border-[#E5C158]/50 text-xs font-extrabold transition-all shadow cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Invite ($25)</span>
          </button>

          <button
            onClick={() => setShowCertModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#003125] hover:bg-[#004434] text-[#6ee7b7] border border-[#10b981]/50 text-xs font-bold transition-all shadow cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Certificate</span>
          </button>

          <button
            onClick={() => setCurrentRoute('p2p-transfer')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#004D38] hover:bg-[#006046] text-white border border-[#10b981]/40 text-xs font-bold transition-all shadow cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Send (P2P)</span>
          </button>

          <button
            onClick={() => setCurrentRoute('daily-bonus')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#004D38] to-[#003125] hover:border-[#E5C158] text-[#6ee7b7] border border-[#10b981]/50 text-xs font-bold transition-all shadow cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>2% Daily Yield</span>
          </button>

          <button
            onClick={() => setCurrentRoute('deposit')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#003125] hover:bg-[#004434] text-white border border-[#10b981]/50 text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowDownLeft className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Deposit</span>
          </button>

          <button
            onClick={() => setCurrentRoute('withdraw')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl gold-gradient-bg text-[#002018] text-xs font-bold shadow-[0_0_15px_rgba(229,193,88,0.25)] hover:scale-105 transition-all cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Withdraw</span>
          </button>
        </div>
      </div>

      {/* 2. KPI METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Ledger Valuation */}
        <div className="rounded-2xl p-5 bg-[#004D38] border border-[#E5C158]/50 shadow-xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span className="font-semibold uppercase tracking-wider">Total Portfolio Balance</span>
            <Wallet className="w-4 h-4 text-[#E5C158]" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white">
            {formatMoney(totalBalance)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#10b981] font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Multi-Currency Synchronized</span>
          </div>
        </div>

        {/* Card 2: Primary Checking */}
        <div className="rounded-2xl p-5 bg-[#003125] border border-[#E5C158]/25 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span className="font-semibold uppercase tracking-wider">Available Checking</span>
            <span className="text-[10px] font-mono text-[#E5C158] font-bold">Liquid</span>
          </div>
          <div className="text-3xl font-display font-extrabold text-white">
            {formatMoney(checkingBalance)}
          </div>
          <div className="text-[11px] text-[#7ea999] font-mono">
            Instant settlement & P2P eligible
          </div>
        </div>

        {/* Card 3: High-Yield Savings */}
        <div className="rounded-2xl p-5 bg-[#003125] border border-[#10b981]/30 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span className="font-semibold uppercase tracking-wider">High-Yield Savings</span>
            <PiggyBank className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="text-3xl font-display font-extrabold text-[#E5C158]">
            {formatMoney(savingsBalance)}
          </div>
          <div className="text-[11px] text-[#7ea999] font-mono flex items-center gap-1">
            <Percent className="w-3 h-3 text-[#10b981]" />
            <span>5.40% Annual APY Vault</span>
          </div>
        </div>

        {/* Card 4: Digital Asset Treasury */}
        <div className="rounded-2xl p-5 bg-[#003125] border border-[#E5C158]/30 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span className="font-semibold uppercase tracking-wider">Digital Asset Treasury</span>
            <Coins className="w-4 h-4 text-[#E5C158]" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white">
            {formatMoney(investmentBalance + cryptoBalance)}
          </div>
          <div className="text-[11px] text-[#7ea999] font-mono flex items-center gap-1">
            <Zap className="w-3 h-3 text-[#E5C158]" />
            <span>USDT TRC-20 / ERC-20 Ledger</span>
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC RECHARTS PORTFOLIO VALUATION TRAJECTORY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Dynamic Recharts Area Chart (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl p-6 bg-[#003125] border border-[#E5C158]/30 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#E5C158]" />
                <span>Portfolio Valuation Trajectory</span>
              </h3>
              <p className="text-xs text-[#8cb8a8]">
                Real-time dynamic balance progression across all multi-currency accounts
              </p>
            </div>

            <div className="flex items-center bg-[#002018] border border-[#004D38] rounded-lg p-1 gap-1">
              {(['7D', '1M', '3M', '1Y'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                    timeRange === r
                      ? 'bg-[#E5C158] text-[#002018] shadow-sm'
                      : 'text-[#8cb8a8] hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="pt-2 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tethraGoldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E5C158" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#004D38" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#004D38" vertical={false} opacity={0.6} />
                <XAxis
                  dataKey="date"
                  stroke="#8cb8a8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#004D38' }}
                />
                <YAxis
                  stroke="#8cb8a8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#004D38' }}
                  tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#002018] border border-[#E5C158]/50 p-3 rounded-xl shadow-2xl">
                          <p className="text-[10px] font-mono text-[#8cb8a8]">{payload[0].payload.date}</p>
                          <p className="text-sm font-display font-extrabold text-[#E5C158]">
                            ${Number(payload[0].value).toLocaleString()} USD
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#E5C158"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#tethraGoldGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between text-[11px] text-[#71998b] font-mono pt-2 border-t border-[#004D38]">
            <span>Period Base: {formatMoney(minVal)}</span>
            <span className="text-[#E5C158] font-bold">Current Total: {formatMoney(totalBalance)}</span>
          </div>
        </div>

        {/* Right: US Bank Payout Rail & Referral Program (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* US Bank Rail */}
          <div className="p-5 rounded-2xl bg-[#003125] border border-[#E5C158]/40 space-y-3 shadow-lg">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#004D38] text-[#E5C158]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">US Bank Payout Rail</h4>
                <span className="text-[10px] text-[#76e5ba] font-mono">1-3 Business Days Delivery</span>
              </div>
            </div>

            <p className="text-xs text-[#8cb8a8] leading-relaxed">
              Direct ACH &amp; Fedwire routing connected to partner depository institutions with 256-bit encryption.
            </p>

            <button
              onClick={() => setCurrentRoute('withdraw')}
              className="w-full py-2.5 rounded-xl gold-gradient-bg text-[#002018] font-bold text-xs shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Initiate Bank Transfer
            </button>
          </div>

          {/* Referral Reward */}
          <div className="p-5 rounded-2xl bg-[#003125] border border-[#004D38] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>$25 Referral Reward</span>
              </span>
              <span className="text-[11px] font-mono text-[#E5C158] font-bold">
                {currentUser.referralCode}
              </span>
            </div>
            <p className="text-[11px] text-[#8cb8a8]">
              Earn $25 credited to your primary checking when an invited user completes Tier 2 KYC verification.
            </p>
            <button
              onClick={() => setCurrentRoute('referrals')}
              className="w-full py-2 rounded-lg bg-[#004D38] hover:bg-[#006046] text-xs font-semibold text-white border border-[#E5C158]/30 transition-colors cursor-pointer"
            >
              View Referral Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* 4. REAL RECENT TRANSACTIONS & MULTI-ACCOUNT SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Ledger Records (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl p-6 bg-[#003125] border border-[#E5C158]/25 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#004D38]">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#E5C158]" />
              <h3 className="text-sm font-bold text-white">Recent Ledger Transactions</h3>
            </div>
            <button
              onClick={() => setCurrentRoute('transactions')}
              className="text-xs text-[#E5C158] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Ledger</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {transactions.slice(0, 5).map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#002018] border border-[#004D38] hover:border-[#E5C158]/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg font-bold text-xs ${
                      tx.type === 'deposit' || tx.type === 'referral_reward' || tx.type === 'yield_earning' || tx.type === 'daily_bonus'
                        ? 'bg-[#10b981]/20 text-[#10b981]'
                        : 'bg-red-900/20 text-red-400'
                    }`}
                  >
                    {tx.type === 'deposit' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : tx.type === 'withdrawal' ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <TrendingUp className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{tx.description}</div>
                    <div className="text-[10px] text-[#7da797] font-mono">
                      {new Date(tx.createdAt).toLocaleDateString()} • Ref: {tx.referenceNumber || tx.id}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-xs font-bold font-mono ${
                      tx.amount > 0 ? 'text-[#6ee7b7]' : 'text-white'
                    }`}
                  >
                    {tx.amount > 0 ? '+' : ''}
                    {formatMoney(Math.abs(tx.amount), tx.currency)}
                  </div>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase font-semibold ${
                      tx.status === 'completed'
                        ? 'bg-[#10b981]/20 text-[#6ee7b7]'
                        : tx.status === 'pending' || tx.status === 'processing'
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

        {/* Multi-Account Ledger Breakdown (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl p-6 bg-[#003125] border border-[#E5C158]/25 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#004D38]">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#10b981]" />
              <h3 className="text-sm font-bold text-white">Accounts &amp; Vaults</h3>
            </div>
            <button
              onClick={() => setCurrentRoute('accounts')}
              className="text-xs text-[#E5C158] hover:underline"
            >
              Manage
            </button>
          </div>

          <div className="space-y-3">
            {accounts.map((acc) => (
              <div
                key={acc.id}
                className="p-3.5 rounded-xl bg-[#002018] border border-[#004D38] flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#004D38] text-[#E5C158]">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{acc.name}</h5>
                    <p className="text-[10px] text-[#7ea999] font-mono">{acc.accountNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold font-mono text-[#E5C158]">
                    {formatMoney(acc.balance, acc.currency)}
                  </div>
                  <span className="text-[9px] text-[#6ee7b7] font-mono uppercase">{acc.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Savings Vault Summary */}
          {savingsGoals.length > 0 && (
            <div className="pt-2 border-t border-[#004D38]">
              <div className="flex items-center justify-between text-xs text-[#8cb8a8] mb-1">
                <span>{savingsGoals[0].name}</span>
                <span className="text-[#E5C158] font-mono font-bold">
                  {Math.round((savingsGoals[0].currentAmount / savingsGoals[0].targetAmount) * 100)}%
                </span>
              </div>
              <div className="w-full bg-[#002018] rounded-full h-2 overflow-hidden border border-[#004D38]">
                <div
                  className="gold-gradient-bg h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (savingsGoals[0].currentAmount / savingsGoals[0].targetAmount) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <InviteFriendsModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
      />

      <AccountCertificateModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
      />
    </div>
  );
};
