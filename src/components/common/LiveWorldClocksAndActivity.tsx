import React, { useState, useEffect } from 'react';
import {
  Globe,
  Clock,
  Activity,
  Zap,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
} from 'lucide-react';

interface WorldHub {
  city: string;
  country: string;
  flag: string;
  timeZone: string;
  marketName: string;
  marketOpenUtcHour: number; // UTC hour opening
  marketCloseUtcHour: number; // UTC hour closing
}

const HUBS: WorldHub[] = [
  {
    city: 'New York',
    country: 'USA',
    flag: '🇺🇸',
    timeZone: 'America/New_York',
    marketName: 'NYSE / Fedwire',
    marketOpenUtcHour: 13,
    marketCloseUtcHour: 21,
  },
  {
    city: 'London',
    country: 'UK',
    flag: '🇬🇧',
    timeZone: 'Europe/London',
    marketName: 'LSE / Faster Pay',
    marketOpenUtcHour: 8,
    marketCloseUtcHour: 16,
  },
  {
    city: 'Frankfurt',
    country: 'Germany',
    flag: '🇩🇪',
    timeZone: 'Europe/Berlin',
    marketName: 'Deutsche Börse / SEPA',
    marketOpenUtcHour: 7,
    marketCloseUtcHour: 16,
  },
  {
    city: 'Dubai',
    country: 'UAE',
    flag: '🇦🇪',
    timeZone: 'Asia/Dubai',
    marketName: 'DFM / Crypto Hub',
    marketOpenUtcHour: 6,
    marketCloseUtcHour: 14,
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    timeZone: 'Asia/Singapore',
    marketName: 'SGX / FAST Clearing',
    marketOpenUtcHour: 1,
    marketCloseUtcHour: 9,
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    timeZone: 'Asia/Tokyo',
    marketName: 'TSE / Zengin',
    marketOpenUtcHour: 0,
    marketCloseUtcHour: 6,
  },
  {
    city: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    timeZone: 'Australia/Sydney',
    marketName: 'ASX / NPP Rail',
    marketOpenUtcHour: 23,
    marketCloseUtcHour: 6,
  },
];

interface LiveActivityFeed {
  id: string;
  country: string;
  city: string;
  flag: string;
  user: string;
  action: string;
  amount: string;
  timeAgo: string;
  type: 'bonus' | 'yield' | 'deposit' | 'referral' | 'transfer';
}

const GLOBAL_EVENTS_SAMPLE: LiveActivityFeed[] = [
  {
    id: 'e1',
    country: 'United States',
    city: 'New York',
    flag: '🇺🇸',
    user: 'Jonathan D.',
    action: 'Claimed 24-Hour 2% Daily Bonus',
    amount: '+$42.80 USD',
    timeAgo: 'Just now',
    type: 'bonus',
  },
  {
    id: 'e2',
    country: 'United Kingdom',
    city: 'London',
    flag: '🇬🇧',
    user: 'Charlotte H.',
    action: 'Faster Payments Bank Settlement',
    amount: '+£3,500.00 GBP',
    timeAgo: '12s ago',
    type: 'deposit',
  },
  {
    id: 'e3',
    country: 'United Arab Emirates',
    city: 'Dubai',
    flag: '🇦🇪',
    user: 'Rashid Al-Falasi',
    action: 'Staked into 2% Tether Yield Engine',
    amount: '10,000 USDT',
    timeAgo: '28s ago',
    type: 'yield',
  },
  {
    id: 'e4',
    country: 'Germany',
    city: 'Munich',
    flag: '🇩🇪',
    user: 'Klaus Schmidt',
    action: 'Earned Referral Bounty Bonus',
    amount: '+$25.00 USD',
    timeAgo: '45s ago',
    type: 'referral',
  },
  {
    id: 'e5',
    country: 'Singapore',
    city: 'Marina Bay',
    flag: '🇸🇬',
    user: 'Marcus Tan',
    action: 'P2P Instant Ledger Transfer',
    amount: '$1,200.00 USD',
    timeAgo: '1m ago',
    type: 'transfer',
  },
  {
    id: 'e6',
    country: 'Japan',
    city: 'Tokyo',
    flag: '🇯🇵',
    user: 'Yuki Takahashi',
    action: 'Auto-Compounded Daily Earnings',
    amount: '+68.40 USDT',
    timeAgo: '2m ago',
    type: 'yield',
  },
  {
    id: 'e7',
    country: 'France',
    city: 'Paris',
    flag: '🇫🇷',
    user: 'Amélie Dupont',
    action: 'SEPA Direct Bank Liquidity',
    amount: '+€2,800.00 EUR',
    timeAgo: '3m ago',
    type: 'deposit',
  },
  {
    id: 'e8',
    country: 'Australia',
    city: 'Sydney',
    flag: '🇦🇺',
    user: 'Liam O’Connor',
    action: 'Claimed 24-Hour 2% Daily Bonus',
    amount: '+$31.50 USD',
    timeAgo: '4m ago',
    type: 'bonus',
  },
];

export const LiveWorldClocksAndActivity: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotate through live country activity items
  useEffect(() => {
    const eventInterval = setInterval(() => {
      setActiveEventIndex((prev) => (prev + 1) % GLOBAL_EVENTS_SAMPLE.length);
    }, 4500);
    return () => clearInterval(eventInterval);
  }, []);

  const formatHubTime = (tz: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(time);
    } catch {
      return time.toLocaleTimeString();
    }
  };

  const currentEvent = GLOBAL_EVENTS_SAMPLE[activeEventIndex];

  return (
    <div className="emerald-card rounded-3xl p-5 sm:p-6 border border-[#d4af37]/35 shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-5" id="live-world-clocks">
      {/* Top Bar: Title & Live Activity Flash Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#0f4939]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#094635] text-[#fae188] flex items-center justify-center border border-[#1e6e56]">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-display font-extrabold text-white flex items-center gap-2">
              <span>Real-Time Global Settlement Clocks &amp; Member Activity</span>
              <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                <span>LIVE 24/7</span>
              </span>
            </h3>
            <p className="text-[11px] text-[#8cb8a8]">
              Continuous multi-currency clearing across major international financial centers.
            </p>
          </div>
        </div>

        {/* Live Animated Event Flash Pill */}
        <div className="p-2 px-3.5 rounded-xl bg-[#031d16] border border-[#d4af37]/50 shadow-[0_0_15px_rgba(212,175,55,0.15)] flex items-center gap-2.5 transition-all animate-in fade-in">
          <span className="text-base">{currentEvent.flag}</span>
          <div className="text-left leading-tight">
            <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
              <span>{currentEvent.user} ({currentEvent.city})</span>
              <span className="text-[10px] text-[#fae188] font-mono font-extrabold">
                {currentEvent.amount}
              </span>
            </div>
            <div className="text-[9px] text-[#8cb8a8] font-mono">
              {currentEvent.action} • <span className="text-[#10b981]">{currentEvent.timeAgo}</span>
            </div>
          </div>
        </div>
      </div>

      {/* World Time Zones Scrolling Hub Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {HUBS.map((hub) => {
          const hubTimeString = formatHubTime(hub.timeZone);
          const currentUtcHour = time.getUTCHours();
          const isMarketOpen =
            hub.marketOpenUtcHour < hub.marketCloseUtcHour
              ? currentUtcHour >= hub.marketOpenUtcHour && currentUtcHour < hub.marketCloseUtcHour
              : currentUtcHour >= hub.marketOpenUtcHour || currentUtcHour < hub.marketCloseUtcHour;

          return (
            <div
              key={hub.city}
              className="p-3 rounded-2xl bg-[#031912] hover:bg-[#072c21] border border-[#0d3f32] hover:border-[#d4af37]/40 transition-all space-y-1.5 text-center group"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-base">{hub.flag}</span>
                <span
                  className={`text-[8px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    isMarketOpen
                      ? 'bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {isMarketOpen ? 'OPEN' : 'AFTER-HOURS'}
                </span>
              </div>

              <div className="text-xs font-bold text-white group-hover:text-[#fae188] transition-colors truncate">
                {hub.city}
              </div>

              <div className="text-xs font-mono font-extrabold text-[#fae188] tracking-tight">
                {hubTimeString}
              </div>

              <div className="text-[9px] font-mono text-[#78a494] truncate">
                {hub.marketName}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
