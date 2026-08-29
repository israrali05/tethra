import React, { useState, useEffect } from 'react';
import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Globe,
  Coins,
  CheckCircle2,
  Zap,
} from 'lucide-react';

export interface GlobalActivityItem {
  id: string;
  country: string;
  flag: string;
  userName: string;
  type: 'deposit' | 'withdrawal' | 'yield' | 'referral' | 'kyc';
  amountText: string;
  method: string;
  timeAgo: string;
  status: string;
}

const INITIAL_STREAM: GlobalActivityItem[] = [
  {
    id: 'act-1',
    country: 'United States',
    flag: '🇺🇸',
    userName: 'Alexander M.',
    type: 'deposit',
    amountText: '+$12,500.00 USD',
    method: 'Chase Bank ACH Routing',
    timeAgo: 'Just now',
    status: 'Settled',
  },
  {
    id: 'act-2',
    country: 'United Kingdom',
    flag: '🇬🇧',
    userName: 'Oliver W.',
    type: 'withdrawal',
    amountText: '-£4,200.00 GBP',
    method: 'Barclays Faster Payments',
    timeAgo: '18s ago',
    status: 'Dispatched',
  },
  {
    id: 'act-3',
    country: 'Germany',
    flag: '🇩🇪',
    userName: 'Maximilian K.',
    type: 'yield',
    amountText: '+84.00 USDT (2% Daily Yield)',
    method: '24h Tether Automated Cron',
    timeAgo: '42s ago',
    status: 'Compounded',
  },
  {
    id: 'act-4',
    country: 'Switzerland',
    flag: '🇨🇭',
    userName: 'Elena B.',
    type: 'deposit',
    amountText: '+$45,000.00 USD',
    method: 'Credit Suisse SEPA Direct',
    timeAgo: '1m ago',
    status: 'Settled',
  },
  {
    id: 'act-5',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    userName: 'Tariq Al-Mansoor',
    type: 'yield',
    amountText: '+150.00 USDT (2% Daily Yield)',
    method: '24h Tether Smart Contract',
    timeAgo: '2m ago',
    status: 'Compounded',
  },
  {
    id: 'act-6',
    country: 'France',
    flag: '🇫🇷',
    userName: 'Élodie Laurent',
    type: 'referral',
    amountText: '+$25.00 Referral Bonus',
    method: 'Tier 2 Referral Bounty',
    timeAgo: '3m ago',
    status: 'Credited',
  },
  {
    id: 'act-7',
    country: 'Singapore',
    flag: '🇸🇬',
    userName: 'Wei Long C.',
    type: 'withdrawal',
    amountText: '-$5,800.00 USDT',
    method: 'TRC-20 Fast Payout Rail',
    timeAgo: '4m ago',
    status: 'Confirmed',
  },
  {
    id: 'act-8',
    country: 'Canada',
    flag: '🇨🇦',
    userName: 'Liam Campbell',
    type: 'kyc',
    amountText: 'Tier 2 KYC Verified',
    method: 'Unlocked $100K Daily Limit',
    timeAgo: '6m ago',
    status: 'Approved',
  },
];

export const LiveGlobalActivityTicker: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [stream, setStream] = useState<GlobalActivityItem[]>(INITIAL_STREAM);
  const [isLive, setIsLive] = useState(true);

  // Live simulation tick
  useEffect(() => {
    if (!isLive) return;

    const names = [
      { name: 'Lucas H.', country: 'United States', flag: '🇺🇸', method: 'FedWire USD' },
      { name: 'Charlotte D.', country: 'United Kingdom', flag: '🇬🇧', method: 'Faster Payments' },
      { name: 'Lars N.', country: 'Germany', flag: '🇩🇪', method: 'SEPA Instant' },
      { name: 'Amira S.', country: 'UAE', flag: '🇦🇪', method: '24h 2% USDT Yield' },
      { name: 'Antoine M.', country: 'France', flag: '🇫🇷', method: '$25 Referral Bonus' },
      { name: 'Kenji T.', country: 'Japan', flag: '🇯🇵', method: 'USDT TRC-20' },
      { name: 'Mateo R.', country: 'Spain', flag: '🇪🇸', method: 'SEPA Euro' },
      { name: 'Sarah J.', country: 'Australia', flag: '🇦🇺', method: 'Bank Wire' },
    ];

    const types: Array<{ type: GlobalActivityItem['type']; amount: string; status: string; methodPrefix: string }> = [
      { type: 'deposit', amount: `+$${(Math.floor(Math.random() * 200) * 100 + 500).toLocaleString()}.00 USD`, status: 'Settled', methodPrefix: 'Bank Inflow' },
      { type: 'yield', amount: `+${(Math.floor(Math.random() * 80) + 10)}.00 USDT (2% Yield)`, status: 'Compounded', methodPrefix: '24h Payout' },
      { type: 'withdrawal', amount: `-$${(Math.floor(Math.random() * 80) * 50 + 200).toLocaleString()}.00 USD`, status: 'Dispatched', methodPrefix: 'Bank Payout' },
      { type: 'referral', amount: '+$25.00 Referral Bounty', status: 'Credited', methodPrefix: 'Ref Bonus' },
    ];

    const interval = setInterval(() => {
      const pickName = names[Math.floor(Math.random() * names.length)];
      const pickType = types[Math.floor(Math.random() * types.length)];

      const newItem: GlobalActivityItem = {
        id: 'act-' + Date.now(),
        country: pickName.country,
        flag: pickName.flag,
        userName: pickName.name,
        type: pickType.type,
        amountText: pickType.amount,
        method: `${pickName.method}`,
        timeAgo: 'Just now',
        status: pickType.status,
      };

      setStream((prev) => [newItem, ...prev.slice(0, 14)]);
    }, 6500);

    return () => clearInterval(interval);
  }, [isLive]);

  if (compact) {
    return (
      <div className="bg-[#02130e] border border-[#d4af37]/30 rounded-2xl p-3 overflow-hidden shadow-inner">
        <div className="flex items-center justify-between pb-2 border-b border-[#0f4637] mb-2 px-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
            </span>
            <span className="text-[11px] font-bold text-white font-mono uppercase tracking-wider">
              Real-Time Global Settlement Stream
            </span>
          </div>
          <span className="text-[10px] text-[#fae188] font-mono font-bold">24H Live</span>
        </div>

        <div className="space-y-1.5 max-h-48 overflow-y-auto scrollbar-none pr-1">
          {stream.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 rounded-xl bg-[#041d16] border border-[#0d3f32] text-xs transition-all hover:border-[#d4af37]/40"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base">{item.flag}</span>
                <div className="truncate">
                  <div className="text-white font-bold text-[11px] truncate">{item.userName}</div>
                  <div className="text-[10px] text-[#8cb8a8]">{item.method}</div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div
                  className={`font-mono font-bold text-[11px] ${
                    item.type === 'deposit' || item.type === 'yield' || item.type === 'referral'
                      ? 'text-[#10b981]'
                      : 'text-[#fae188]'
                  }`}
                >
                  {item.amountText}
                </div>
                <div className="text-[9px] text-[#71998b] font-mono">{item.timeAgo}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="emerald-card rounded-3xl p-6 sm:p-8 border border-[#d4af37]/40 space-y-6 shadow-xl" id="global-live-activity-stream">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#0f4637]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/20 border border-[#10b981]/50 text-[#6ee7b7] font-mono text-xs font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
            </span>
            <span>REAL-TIME MULTI-COUNTRY SETTLEMENT RADAR</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
            Live Global User Deposits, Payouts &amp; 2% Yield Feed
          </h2>
          <p className="text-xs text-[#8cb8a8]">
            Real-time auditable stream of bank deposits, 24-hour Tether yield disbursements, referral rewards, and international wire disbursements.
          </p>
        </div>

        {/* Status indicator toggle */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all ${
              isLive
                ? 'bg-[#062c20] text-[#10b981] border-[#10b981]/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-[#201010] text-[#ff8a80] border-[#ff8a80]/40'
            }`}
          >
            <Activity className={`w-3.5 h-3.5 ${isLive ? 'animate-pulse' : ''}`} />
            <span>{isLive ? 'Live Streaming: ON' : 'Stream Paused'}</span>
          </button>
        </div>
      </div>

      {/* Real-time KPI summary banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#02130e] border border-[#0d3f32]">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#8cb8a8]">24H Global Inflow</span>
          <div className="text-base sm:text-lg font-mono font-extrabold text-white">$48,924,500</div>
          <span className="text-[9px] text-[#10b981] font-semibold">↑ +18.4% vs prev day</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-[#8cb8a8]">2% Tether Yield Paid</span>
          <div className="text-base sm:text-lg font-mono font-extrabold text-[#fae188]">$1,940,280 USDT</div>
          <span className="text-[9px] text-[#10b981] font-semibold">⚡ Auto-Compounding</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-[#8cb8a8]">$25 Referrals Claimed</span>
          <div className="text-base sm:text-lg font-mono font-extrabold text-[#38bdf8]">2,840 Rewards</div>
          <span className="text-[9px] text-[#8cb8a8] font-semibold">Active Bounty</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-[#8cb8a8]">Avg Settlement Time</span>
          <div className="text-base sm:text-lg font-mono font-extrabold text-[#6ee7b7]">1.2 Minutes</div>
          <span className="text-[9px] text-[#8cb8a8] font-semibold">UK/EU/USA/Crypto</span>
        </div>
      </div>

      {/* Feed Stream Table */}
      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        {stream.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-[#041d16] hover:bg-[#072a20] border border-[#0d3f32] hover:border-[#d4af37]/40 transition-all gap-2"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#02110c] border border-[#144f3d] flex items-center justify-center text-xl shrink-0">
                {item.flag}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-white text-xs sm:text-sm">{item.userName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#02110c] text-[#8cb8a8] border border-[#0d3f32]">
                    {item.country}
                  </span>
                </div>
                <div className="text-[11px] text-[#8cb8a8] flex items-center gap-2 mt-0.5">
                  <span>{item.method}</span>
                  <span>&bull;</span>
                  <span className="text-[#fae188] font-medium">{item.timeAgo}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center">
              <div className="text-right">
                <div
                  className={`font-mono font-bold text-xs sm:text-sm ${
                    item.type === 'deposit' || item.type === 'yield' || item.type === 'referral'
                      ? 'text-[#10b981]'
                      : 'text-[#fae188]'
                  }`}
                >
                  {item.amountText}
                </div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                  item.status === 'Settled' || item.status === 'Compounded' || item.status === 'Approved'
                    ? 'bg-[#10b981]/20 text-[#6ee7b7] border-[#10b981]/40'
                    : 'bg-[#d4af37]/20 text-[#fae188] border-[#d4af37]/40'
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
