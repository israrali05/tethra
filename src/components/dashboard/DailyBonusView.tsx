import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  Coins,
  ShieldCheck,
  Zap,
  ArrowRight,
  Receipt,
  Calendar,
  Lock,
} from 'lucide-react';

export const DailyBonusView: React.FC = () => {
  const {
    currentUser,
    accounts,
    canClaimDailyBonus,
    lastBonusClaimDate,
    timeUntilNextBonus,
    claimDailyBonus,
    formatMoney,
    transactions,
  } = useApp();

  const [tickerTime, setTickerTime] = useState(timeUntilNextBonus);
  const [isClaiming, setIsClaiming] = useState(false);

  // Live real-time seconds ticker for 24h bonus countdown
  useEffect(() => {
    const interval = setInterval(() => {
      if (!lastBonusClaimDate) {
        setTickerTime('Ready to claim now!');
        return;
      }
      const nextClaimTime = new Date(lastBonusClaimDate).getTime() + 24 * 60 * 60 * 1000;
      const diffMs = nextClaimTime - Date.now();
      if (diffMs <= 0) {
        setTickerTime('Ready to claim now!');
      } else {
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diffMs % (1000 * 60)) / 1000);
        setTickerTime(`${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastBonusClaimDate]);

  const totalUserBalance = accounts
    .filter((a) => a.userId === currentUser?.id)
    .reduce((sum, a) => sum + a.balance, 0);

  const bonusBase = totalUserBalance > 0 ? totalUserBalance : 500;
  const estimatedBonusValue = Number((bonusBase * 0.02).toFixed(2));
  const estimatedMonthlyCompounding = Number((bonusBase * 0.60).toFixed(2)); // ~60% monthly nominal non-compounded

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      claimDailyBonus();
      setIsClaiming(false);
    }, 400);
  };

  // Filter bonus transactions
  const bonusHistory = transactions.filter(
    (tx) => tx.type === 'daily_bonus' && tx.userId === currentUser?.id
  );

  return (
    <div className="space-y-6" id="tethra-daily-bonus-view">
      {/* Header */}
      <div className="pb-4 border-b border-[#d4af37]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              24-Hour 2% Daily Yield Bonus
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40 flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#10b981]" /> 2% Every 24h
            </span>
          </div>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Collect an instant 2% automated yield bonus on your total wallet and account balances once every 24 hours.
          </p>
        </div>
      </div>

      {/* Main Claiming Station */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Hero Claim Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="emerald-card p-6 rounded-3xl border-2 border-[#d4af37]/50 bg-gradient-to-br from-[#063327] via-[#022119] to-[#01140e] relative overflow-hidden shadow-2xl space-y-6">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37] font-bold">
                  Compounding Portfolio Yield
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                  2.0% Daily Dollar Collector
                </h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#8c6d17] p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#031d16] rounded-2xl flex items-center justify-center text-2xl">
                  💵
                </div>
              </div>
            </div>

            {/* Total Balance & Calculated 2% Reward */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#031d16]/80 border border-[#144f3d]">
                <div className="text-[11px] text-[#8cb8a8] font-mono uppercase">
                  Current Total Balance
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {formatMoney(totalUserBalance)}
                </div>
                <div className="text-[10px] text-[#659281] mt-0.5">
                  Across checking, savings, &amp; investment
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#03291e] border border-[#d4af37]/50">
                <div className="text-[11px] text-[#fae188] font-mono uppercase font-bold">
                  2% Bonus Value (per claim)
                </div>
                <div className="text-2xl font-bold font-mono text-[#6ee7b7] mt-1">
                  +{formatMoney(estimatedBonusValue)}
                </div>
                <div className="text-[10px] text-[#10b981] mt-0.5 font-semibold">
                  Instant credit to savings vault
                </div>
              </div>
            </div>

            {/* Countdown / Claim Status */}
            <div className="p-5 rounded-2xl bg-[#021812] border border-[#144f3d] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[11px] text-[#8cb8a8] flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>24-Hour Timer Status</span>
                </div>
                <div className={`text-lg font-mono font-bold ${canClaimDailyBonus ? 'text-[#10b981]' : 'text-[#fae188]'}`}>
                  {tickerTime}
                </div>
                {lastBonusClaimDate && (
                  <div className="text-[10px] text-[#659281]">
                    Last collected: {new Date(lastBonusClaimDate).toLocaleString()}
                  </div>
                )}
              </div>

              {/* Big Action Button */}
              <button
                onClick={handleClaim}
                disabled={!canClaimDailyBonus || isClaiming}
                className={`px-6 py-3.5 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                  canClaimDailyBonus && !isClaiming
                    ? 'gold-gradient-bg text-[#031d16] hover:scale-105 cursor-pointer ring-2 ring-[#fae188]'
                    : 'bg-[#072a1f] text-[#527d6d] border border-[#144f3d] cursor-not-allowed'
                }`}
              >
                {isClaiming ? (
                  <span>Collecting 2% Yield...</span>
                ) : canClaimDailyBonus ? (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Claim +{formatMoney(estimatedBonusValue)} Now</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>In 24h Cooldown</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Info & History */}
        <div className="lg:col-span-5 space-y-6">
          {/* Yield Calculation Transparency */}
          <div className="emerald-card p-5 rounded-2xl border border-[#d4af37]/25 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" /> How the 2% 24h Bonus Works
            </h3>
            <ul className="space-y-2.5 text-xs text-[#a3cbbe]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                <span><strong>24-Hour Timer:</strong> A fresh 2% yield calculation unlocks exactly every 24 hours from your last collection.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                <span><strong>Portfolio Proportional:</strong> The more you deposit and hold in your accounts, the bigger your daily claim amount.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                <span><strong>Instant Liquidity:</strong> Credited directly to your high-yield savings vault with zero withdrawal lockups.</span>
              </li>
            </ul>
          </div>

          {/* Bonus Claim History */}
          <div className="emerald-card p-5 rounded-2xl border border-[#d4af37]/25 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#d4af37]" /> Claim History ({bonusHistory.length})
              </h3>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {bonusHistory.length === 0 ? (
                <div className="text-center py-6 text-xs text-[#8cb8a8]">
                  No 2% bonus claims recorded yet. Click the claim button above once available!
                </div>
              ) : (
                bonusHistory.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 rounded-xl bg-[#031d16] border border-[#0d3f32] flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">
                        2% Daily Yield Payout
                      </div>
                      <div className="text-[10px] text-[#659281] font-mono">
                        {new Date(tx.createdAt).toLocaleString()} • Ref: {tx.referenceNumber}
                      </div>
                    </div>
                    <div className="text-right font-mono font-bold text-xs text-[#10b981]">
                      +{formatMoney(tx.amount)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
