import React, { useState } from 'react';
import {
  Globe,
  TrendingUp,
  Award,
  Users,
  Building2,
  Coins,
  ShieldCheck,
  Search,
  Filter,
  ArrowUpRight,
} from 'lucide-react';

export interface CountryRankData {
  rank: number;
  country: string;
  code: string;
  flag: string;
  region: 'Americas' | 'Europe' | 'Asia-Pacific' | 'Middle East';
  totalDepositedUSD: number;
  yieldDistributedUSD: number;
  activeInvestors: number;
  growth24h: number;
  primaryRails: string;
  tierStatus: 'Tier 1 Prime' | 'Tier 1 Global' | 'Tier 2 Approved';
}

const COUNTRY_RANKINGS: CountryRankData[] = [
  {
    rank: 1,
    country: 'United States',
    code: 'USA',
    flag: '🇺🇸',
    region: 'Americas',
    totalDepositedUSD: 14850000,
    yieldDistributedUSD: 842500,
    activeInvestors: 1420,
    growth24h: 18.5,
    primaryRails: 'ACH & FedWire • USDT',
    tierStatus: 'Tier 1 Prime',
  },
  {
    rank: 2,
    country: 'United Kingdom',
    code: 'GBR',
    flag: '🇬🇧',
    region: 'Europe',
    totalDepositedUSD: 9420000,
    yieldDistributedUSD: 518000,
    activeInvestors: 980,
    growth24h: 14.2,
    primaryRails: 'Faster Payments • CHAPS',
    tierStatus: 'Tier 1 Prime',
  },
  {
    rank: 3,
    country: 'Germany',
    code: 'DEU',
    flag: '🇩🇪',
    region: 'Europe',
    totalDepositedUSD: 8150000,
    yieldDistributedUSD: 440200,
    activeInvestors: 760,
    growth24h: 12.8,
    primaryRails: 'SEPA Instant • Deutsche Bank',
    tierStatus: 'Tier 1 Prime',
  },
  {
    rank: 4,
    country: 'Switzerland',
    code: 'CHE',
    flag: '🇨🇭',
    region: 'Europe',
    totalDepositedUSD: 6540000,
    yieldDistributedUSD: 390000,
    activeInvestors: 510,
    growth24h: 16.4,
    primaryRails: 'Swiss SIC • Multi-Currency',
    tierStatus: 'Tier 1 Prime',
  },
  {
    rank: 5,
    country: 'United Arab Emirates',
    code: 'UAE',
    flag: '🇦🇪',
    region: 'Middle East',
    totalDepositedUSD: 5920000,
    yieldDistributedUSD: 320000,
    activeInvestors: 430,
    growth24h: 22.1,
    primaryRails: 'ADGM Wire • USDT TRC-20',
    tierStatus: 'Tier 1 Prime',
  },
  {
    rank: 6,
    country: 'France',
    code: 'FRA',
    flag: '🇫🇷',
    region: 'Europe',
    totalDepositedUSD: 4800000,
    yieldDistributedUSD: 280000,
    activeInvestors: 390,
    growth24h: 10.5,
    primaryRails: 'SEPA Direct • BNP Paribas',
    tierStatus: 'Tier 1 Global',
  },
  {
    rank: 7,
    country: 'Singapore',
    code: 'SGP',
    flag: '🇸🇬',
    region: 'Asia-Pacific',
    totalDepositedUSD: 4250000,
    yieldDistributedUSD: 240000,
    activeInvestors: 350,
    growth24h: 19.8,
    primaryRails: 'FAST • PayNow • Crypto',
    tierStatus: 'Tier 1 Global',
  },
  {
    rank: 8,
    country: 'Canada',
    code: 'CAN',
    flag: '🇨🇦',
    region: 'Americas',
    totalDepositedUSD: 3680000,
    yieldDistributedUSD: 190000,
    activeInvestors: 310,
    growth24h: 11.2,
    primaryRails: 'Interac • Wire Transfer',
    tierStatus: 'Tier 1 Global',
  },
  {
    rank: 9,
    country: 'Australia',
    code: 'AUS',
    flag: '🇦🇺',
    region: 'Asia-Pacific',
    totalDepositedUSD: 3120000,
    yieldDistributedUSD: 165000,
    activeInvestors: 280,
    growth24h: 9.6,
    primaryRails: 'NPP / Osko • Wire',
    tierStatus: 'Tier 2 Approved',
  },
  {
    rank: 10,
    country: 'Japan',
    code: 'JPN',
    flag: '🇯🇵',
    region: 'Asia-Pacific',
    totalDepositedUSD: 2780000,
    yieldDistributedUSD: 145000,
    activeInvestors: 220,
    growth24h: 13.5,
    primaryRails: 'Zengin System • USDT',
    tierStatus: 'Tier 2 Approved',
  },
];

export const GlobalCountryLeaderboard: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = COUNTRY_RANKINGS.filter((c) => {
    const matchRegion = selectedRegion === 'All' || c.region === selectedRegion;
    const matchSearch =
      c.country.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchSearch;
  });

  const totalVolume = COUNTRY_RANKINGS.reduce((sum, c) => sum + c.totalDepositedUSD, 0);
  const totalYield = COUNTRY_RANKINGS.reduce((sum, c) => sum + c.yieldDistributedUSD, 0);
  const totalInvestors = COUNTRY_RANKINGS.reduce((sum, c) => sum + c.activeInvestors, 0);

  return (
    <div className="emerald-card rounded-3xl p-6 sm:p-8 border border-[#d4af37]/40 space-y-6 shadow-xl" id="global-country-leaderboard">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#0f4637]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#fae188] font-mono text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>GLOBAL JURISDICTION RANKINGS &amp; VOLUME</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white">
            High-Rank Locations &amp; Country-Wise Real-Time Data
          </h2>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Real-time auditable breakdown of multi-national capital inflow, active investor clusters, and 24-hour Tether yield distributions.
          </p>
        </div>

        {/* Global Aggregate Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-[#02130e] border border-[#0d3f32] text-xs">
            <span className="text-[#8cb8a8] block text-[10px] uppercase font-bold">Total Network Deposits</span>
            <span className="text-white font-mono font-extrabold text-sm sm:text-base">
              ${(totalVolume / 1000000).toFixed(2)}M USD
            </span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-[#02130e] border border-[#d4af37]/30 text-xs">
            <span className="text-[#fae188] block text-[10px] uppercase font-bold">2% Yield Distributed</span>
            <span className="text-[#fae188] font-mono font-extrabold text-sm sm:text-base">
              ${(totalYield / 1000).toFixed(1)}K USDT
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Region Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#02130e] border border-[#0d3f32] rounded-xl overflow-x-auto w-full sm:w-auto">
          {['All', 'Americas', 'Europe', 'Asia-Pacific', 'Middle East'].map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all ${
                selectedRegion === reg
                  ? 'bg-[#d4af37] text-[#031d16] shadow-sm'
                  : 'text-[#8cb8a8] hover:text-white'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#8cb8a8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search country or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#02130e] border border-[#0d3f32] text-xs text-white placeholder-[#8cb8a8] focus:outline-none focus:border-[#d4af37]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#0d3f32] text-[11px] font-mono uppercase text-[#8cb8a8]">
              <th className="pb-3 pl-2">Rank &amp; Jurisdiction</th>
              <th className="pb-3">Region</th>
              <th className="pb-3 text-right">Total Deposited</th>
              <th className="pb-3 text-right">24H 2% Yield Paid</th>
              <th className="pb-3 text-center">Verified Members</th>
              <th className="pb-3">Primary Banking Rail</th>
              <th className="pb-3 text-right pr-2">24H Growth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0d3f32]/60 text-xs">
            {filtered.map((c) => (
              <tr
                key={c.code}
                className="hover:bg-[#072a20]/60 transition-colors group"
              >
                {/* Rank & Flag & Country */}
                <td className="py-3.5 pl-2 font-bold text-white">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs ${
                        c.rank === 1
                          ? 'bg-[#d4af37] text-black font-extrabold'
                          : c.rank === 2
                          ? 'bg-slate-300 text-black font-extrabold'
                          : c.rank === 3
                          ? 'bg-amber-700 text-white font-extrabold'
                          : 'bg-[#041d16] text-[#8cb8a8] border border-[#0d3f32]'
                      }`}
                    >
                      {c.rank}
                    </span>
                    <span className="text-xl">{c.flag}</span>
                    <div>
                      <span className="text-white font-bold group-hover:text-[#fae188] transition-colors">
                        {c.country}
                      </span>
                      <span className="text-[10px] text-[#8cb8a8] font-mono ml-1.5">
                        ({c.code})
                      </span>
                    </div>
                  </div>
                </td>

                {/* Region */}
                <td className="py-3.5 text-[#8cb8a8] font-medium">{c.region}</td>

                {/* Total Deposited */}
                <td className="py-3.5 text-right font-mono font-bold text-white">
                  ${c.totalDepositedUSD.toLocaleString()}
                </td>

                {/* Yield Paid */}
                <td className="py-3.5 text-right font-mono font-bold text-[#fae188]">
                  +${c.yieldDistributedUSD.toLocaleString()} USDT
                </td>

                {/* Verified Members */}
                <td className="py-3.5 text-center">
                  <span className="px-2.5 py-1 rounded-full bg-[#02130e] text-[#6ee7b7] font-mono text-[11px] border border-[#0d3f32]">
                    {c.activeInvestors.toLocaleString()}
                  </span>
                </td>

                {/* Primary Rails */}
                <td className="py-3.5 text-[#8cb8a8] font-mono text-[11px]">
                  {c.primaryRails}
                </td>

                {/* 24h Growth */}
                <td className="py-3.5 text-right pr-2">
                  <span className="inline-flex items-center gap-0.5 text-[#10b981] font-mono font-bold text-xs">
                    <TrendingUp className="w-3 h-3" />
                    +{c.growth24h}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
