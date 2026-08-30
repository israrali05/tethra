import React, { useState } from 'react';
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
  Zap,
  Coins,
  DollarSign,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Gift,
} from 'lucide-react';

export const EarningsView: React.FC = () => {
  const {
    earnings: contextEarnings,
    formatMoney,
    accounts,
    config,
    currentUser,
    claimCryptoDailyYield,
    setCurrentRoute,
  } = useApp();

  const [claiming, setClaiming] = useState(false);

  const earnings = contextEarnings || {
    today: 18.42,
    thisWeek: 124.6,
    thisMonth: 532.18,
    totalEarned: 3490.0,
  };

  const apyRate = config?.savingsApyRate ?? config?.illustrativeSavingsRateAPY ?? 5.4;

  const userAccounts = (accounts || []).filter((a) => a.userId === currentUser?.id);
  const usdtAccount = userAccounts.find((a) => a.currency === 'USDT' || a.name.includes('USDT'));
  const btcAccount = userAccounts.find((a) => a.currency === 'BTC' || a.name.includes('BTC'));
  const savingsAccount = userAccounts.find((a) => a.type === 'savings');

  const usdtBalance = usdtAccount?.balance || 0;
  const btcBalance = btcAccount?.balance || 0;
  const btcUSDValue = btcBalance * 89450;

  const dailyUSDTYield = usdtBalance * 0.02;
  const dailyBTCYield = btcBalance * 0.02;
  const totalCryptoUSD = usdtBalance + btcUSDValue;
  const dailyCryptoUSDYield = dailyUSDTYield + (dailyBTCYield * 89450);

  const handleClaimYield = (asset: 'USDT' | 'BTC' | 'ALL') => {
    setClaiming(true);
    setTimeout(() => {
      claimCryptoDailyYield(asset);
      setClaiming(false);
    }, 600);
  };

  return (
    <div className="space-y-8" id="tethra-earnings-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d4af37]/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/20 border border-[#10b981]/50 text-[#6ee7b7] font-mono text-xs font-bold mb-2">
            <Zap className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span>DAILY 2% YIELD ACCRUAL ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Earnings &amp; Daily 2% Income
          </h1>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Automated daily 2% income on USDT &amp; BTC digital asset holdings plus $25 referral cash bounty tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentRoute('deposit')}
            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] text-xs font-bold shadow hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Coins className="w-4 h-4" />
            <span>Deposit USDT &amp; BTC</span>
          </button>
        </div>
      </div>

      {/* 2% Daily Income Card Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#06382b] via-[#094c39] to-[#04241b] border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#fae188] text-[#031d16] font-mono font-extrabold text-xs">
                DAILY 2% INCOME
              </span>
              <span className="text-xs text-[#6ee7b7] font-mono font-bold">24-Hour Automated Compound</span>
            </div>
            <h2 className="text-2xl font-display font-extrabold text-white">
              USDT &amp; BTC Daily 2% Income Yield Vault
            </h2>
            <p className="text-xs text-[#a2cbbe] max-w-2xl leading-relaxed">
              Every USDT and BTC holding in your Digital Asset Treasury earns a fixed <strong>2% daily yield</strong>. Keep funds in your wallet to compound daily income automatically.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#02130e] border border-[#0d3f32] space-y-2 shrink-0 lg:min-w-[280px]">
            <div className="text-[11px] text-[#8cb8a8] uppercase font-bold tracking-wider">
              Est. Daily 2% Accrual:
            </div>
            <div className="text-2xl font-display font-extrabold text-[#6ee7b7] font-mono">
              +${dailyCryptoUSDYield.toFixed(2)} USD / Day
            </div>
            <div className="text-[10px] text-[#7da797] font-mono flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Calculated on {formatMoney(totalCryptoUSD)} total crypto</span>
            </div>
            <button
              type="button"
              onClick={() => handleClaimYield('ALL')}
              disabled={claiming || totalCryptoUSD <= 0}
              className="w-full mt-2 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-extrabold text-xs shadow hover:scale-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              {claiming ? (
                <span>Accruing Yield...</span>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Claim Daily 2% Yield</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2 Dedicated Asset Yield Cards: USDT & BTC */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#125843]">
          {/* USDT Yield Box */}
          <div className="p-4 rounded-2xl bg-[#031d16] border border-[#14533e] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#26a17b] flex items-center justify-center text-white font-bold text-sm">
                  ₮
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Digital Asset Treasury (USDT)</div>
                  <div className="text-[10px] text-[#8cb8a8] font-mono">Tron (TRC20) Vault</div>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-[#10b981]/30 text-[#6ee7b7] font-mono font-bold">
                2% / Day
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
              <div className="p-2.5 rounded-xl bg-[#02130e] border border-[#0d3f32]">
                <span className="text-[10px] text-[#7ca898] block">Current Balance:</span>
                <span className="text-white font-bold">{usdtBalance.toFixed(2)} USDT</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#02130e] border border-[#0d3f32]">
                <span className="text-[10px] text-[#7ca898] block">24h 2% Income:</span>
                <span className="text-[#6ee7b7] font-bold">+{dailyUSDTYield.toFixed(4)} USDT</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleClaimYield('USDT')}
              disabled={claiming || usdtBalance <= 0}
              className="w-full py-2 rounded-lg bg-[#062c20] hover:bg-[#0a4232] border border-[#10b981]/50 text-[#6ee7b7] text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-[#fae188]" />
              <span>Collect USDT 2% Accrual</span>
            </button>
          </div>

          {/* BTC Yield Box */}
          <div className="p-4 rounded-2xl bg-[#031d16] border border-[#14533e] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#f7931a] flex items-center justify-center text-white font-bold text-sm">
                  ₿
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Digital Asset Treasury (BTC)</div>
                  <div className="text-[10px] text-[#8cb8a8] font-mono">BSC (BEP20) Vault</div>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-[#10b981]/30 text-[#6ee7b7] font-mono font-bold">
                2% / Day
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
              <div className="p-2.5 rounded-xl bg-[#02130e] border border-[#0d3f32]">
                <span className="text-[10px] text-[#7ca898] block">Current Balance:</span>
                <span className="text-white font-bold">{btcBalance.toFixed(6)} BTC</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#02130e] border border-[#0d3f32]">
                <span className="text-[10px] text-[#7ca898] block">24h 2% Income:</span>
                <span className="text-[#fae188] font-bold">+{dailyBTCYield.toFixed(6)} BTC</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleClaimYield('BTC')}
              disabled={claiming || btcBalance <= 0}
              className="w-full py-2 rounded-lg bg-[#062c20] hover:bg-[#0a4232] border border-[#f7931a]/50 text-[#fae188] text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-[#fae188]" />
              <span>Collect BTC 2% Accrual</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="emerald-card rounded-2xl p-5 border border-[#10b981]/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span className="font-semibold uppercase tracking-wider">Today's Total Yield</span>
            <Sparkles className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="text-3xl font-display font-extrabold text-[#6ee7b7]">
            +{formatMoney(earnings.today + dailyCryptoUSDYield)}
          </div>
          <div className="text-[11px] text-[#7da797] font-mono">Vault compound + Crypto 2%</div>
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

      {/* Program Terms & Vault Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="emerald-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-4">
          <h3 className="text-base font-bold text-white pb-3 border-b border-[#0f4637] flex items-center justify-between">
            <span>Active Vault Configuration</span>
            <ShieldCheck className="w-4 h-4 text-[#10b981]" />
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#041d16] border border-[#144f3d]">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#26a17b]" />
                <span className="text-white font-semibold">USDT TRC-20 Daily Yield</span>
              </div>
              <span className="font-mono font-bold text-[#6ee7b7]">2.00% / 24 Hours</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#041d16] border border-[#144f3d]">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#f7931a]" />
                <span className="text-white font-semibold">BTC BEP-20 Daily Yield</span>
              </div>
              <span className="font-mono font-bold text-[#fae188]">2.00% / 24 Hours</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#041d16] border border-[#144f3d]">
              <div className="flex items-center gap-2">
                <PiggyBank className="w-4 h-4 text-[#10b981]" />
                <span className="text-white font-semibold">High-Yield Savings Vault</span>
              </div>
              <span className="font-mono font-bold text-[#fae188]">{apyRate}% APY</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#041d16] border border-[#144f3d]">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#d4af37]" />
                <span className="text-white font-semibold">Referral Bonus (Deposit $\ge$ $50)</span>
              </div>
              <span className="font-mono font-bold text-[#6ee7b7]">$25.00 USD Cash</span>
            </div>
          </div>
        </div>

        <div className="emerald-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-4">
          <h3 className="text-base font-bold text-white pb-3 border-b border-[#0f4637]">
            Earnings Distribution Breakdown
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-[#a2cbbe] mb-1">
                <span>Crypto Daily 2% Yield (USDT &amp; BTC)</span>
                <span className="font-mono text-[#6ee7b7] font-bold">2.0% Daily</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#031510] overflow-hidden">
                <div className="h-full bg-[#10b981] w-[65%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#a2cbbe] mb-1">
                <span>Savings Vault APY ({apyRate}%)</span>
                <span className="font-mono text-white font-bold">{formatMoney(savingsAccount?.balance || 0)}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#031510] overflow-hidden">
                <div className="h-full bg-[#d4af37] w-[25%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-[#a2cbbe] mb-1">
                <span>Referral Cash Bounty ($25 / qualified)</span>
                <span className="font-mono text-white font-bold">$25.00 / user</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#031510] overflow-hidden">
                <div className="h-full bg-[#38bdf8] w-[10%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
