import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Percent,
  Sparkles,
  Calendar,
  AlertTriangle,
  ArrowUpRight,
  Wallet,
  PiggyBank,
} from 'lucide-react';

export const EarningsView: React.FC = () => {
  const { earnings: contextEarnings, formatMoney, accounts, config } = useApp();

  const earnings = contextEarnings || {
    today: 18.42,
    thisWeek: 124.6,
    thisMonth: 532.18,
    totalEarned: 3490.0,
  };

  const apyRate = config?.savingsApyRate ?? config?.illustrativeSavingsRateAPY ?? 5.4;

  const totalVaultBalance = (accounts || [])
    .filter((a) => a.type === 'savings' || a.type === 'investment')
    .reduce((acc, a) => acc + a.balance, 0);

  return (
    <div className="space-y-8" id="tethra-earnings-view">
      {/* Header */}
      <div className="pb-4 border-b border-[#d4af37]/20">
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          Earnings &amp; Yield Intelligence
        </h1>
        <p className="text-xs text-[#8cb8a8] mt-1">
          Detailed metrics across automated savings compound, investment yield, and referral rewards.
        </p>
      </div>

      {/* Compliance banner */}
      <div className="p-4 rounded-2xl bg-[#062c20] border border-[#d4af37]/40 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
        <div className="text-xs text-[#a2cbbe] leading-relaxed">
          <strong className="text-white">Regulatory Notice: </strong>
          Configured APY ({apyRate}%) is an illustrative configured rate applied to verified savings and investment vaults. Returns are not guaranteed and are subject to market conditions and administrative policy.
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="emerald-card rounded-2xl p-5 border border-[#10b981]/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span className="font-semibold uppercase tracking-wider">Today's Earnings</span>
            <Sparkles className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="text-3xl font-display font-extrabold text-[#6ee7b7]">
            +{formatMoney(earnings.today)}
          </div>
          <div className="text-[11px] text-[#7da797] font-mono">Calculated daily accrual</div>
        </div>

        <div className="emerald-card rounded-2xl p-5 border border-[#d4af37]/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span className="font-semibold uppercase tracking-wider">This Week</span>
            <Calendar className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white">
            +{formatMoney(earnings.thisWeek)}
          </div>
          <div className="text-[11px] text-[#7da797] font-mono">Rolling 7-day total</div>
        </div>

        <div className="emerald-card rounded-2xl p-5 border border-[#38bdf8]/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span className="font-semibold uppercase tracking-wider">This Month</span>
            <TrendingUp className="w-4 h-4 text-[#38bdf8]" />
          </div>
          <div className="text-3xl font-display font-extrabold text-white">
            +{formatMoney(earnings.thisMonth)}
          </div>
          <div className="text-[11px] text-[#7da797] font-mono">Monthly compound cycle</div>
        </div>

        <div className="emerald-card-highlight rounded-2xl p-5 border border-[#d4af37]/50 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span className="font-semibold uppercase tracking-wider">Total Cumulative</span>
            <Percent className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div className="text-3xl font-display font-extrabold text-[#fae188]">
            +{formatMoney(earnings.totalEarned)}
          </div>
          <div className="text-[11px] text-[#7da797] font-mono">All-time realized yield</div>
        </div>
      </div>

      {/* Yield Allocation Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="emerald-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-4">
          <h3 className="text-base font-bold text-white pb-3 border-b border-[#0f4637]">
            Active Vault Configuration
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#041d16] border border-[#144f3d]">
              <div className="flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-[#10b981]" />
                <span className="text-white font-semibold">High-Yield Savings Vault</span>
              </div>
              <span className="font-mono font-bold text-[#fae188]">
                {apyRate}% APY
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#041d16] border border-[#144f3d]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span className="text-white font-semibold">Referral Bounty Per Qualified User</span>
              </div>
              <span className="font-mono font-bold text-[#6ee7b7]">$25.00 USD</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#041d16] border border-[#144f3d]">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-[#38bdf8]" />
                <span className="text-white font-semibold">Total Qualifying Capital</span>
              </div>
              <span className="font-mono font-bold text-white">
                {formatMoney(totalVaultBalance)}
              </span>
            </div>
          </div>
        </div>

        <div className="emerald-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-4">
          <h3 className="text-base font-bold text-white pb-3 border-b border-[#0f4637]">
            Earnings Composition
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-[#a2cbbe] mb-1">
                <span>Savings Vault Yield (82%)</span>
                <span className="font-mono text-white font-bold">$2,860.00</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#031510] overflow-hidden">
                <div className="h-full bg-[#10b981] w-[82%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#a2cbbe] mb-1">
                <span>Community Referral Rewards (14%)</span>
                <span className="font-mono text-white font-bold">$490.00</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#031510] overflow-hidden">
                <div className="h-full bg-[#d4af37] w-[14%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#a2cbbe] mb-1">
                <span>Promotional Welcome Bonus (4%)</span>
                <span className="font-mono text-white font-bold">$140.00</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#031510] overflow-hidden">
                <div className="h-full bg-[#38bdf8] w-[4%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
