import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Coins,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  Activity,
  LineChart,
  BarChart3,
  DollarSign,
  Globe,
  Zap,
  Repeat,
  Search,
} from 'lucide-react';

interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  marketCap: string;
  volume24h: string;
  category: 'crypto' | 'stock' | 'commodity' | 'forex';
  sparkline: number[];
}

const INITIAL_MARKETS: MarketItem[] = [
  // CRYPTOCURRENCIES
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 96420.50,
    change24h: 3.42,
    high24h: 97800.00,
    low24h: 93800.00,
    marketCap: '$1.89 Trillion',
    volume24h: '$42.8B',
    category: 'crypto',
    sparkline: [40, 45, 42, 60, 75, 70, 85, 80, 92, 98],
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2845.80,
    change24h: 2.15,
    high24h: 2910.00,
    low24h: 2780.00,
    marketCap: '$342.5 Billion',
    volume24h: '$21.4B',
    category: 'crypto',
    sparkline: [50, 52, 48, 65, 70, 68, 79, 82, 88, 90],
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether (2% 24h Yield Eligible)',
    price: 1.0002,
    change24h: 0.02,
    high24h: 1.0008,
    low24h: 0.9998,
    marketCap: '$132.8 Billion',
    volume24h: '$74.1B',
    category: 'crypto',
    sparkline: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    price: 198.60,
    change24h: 5.84,
    high24h: 204.00,
    low24h: 186.50,
    marketCap: '$93.4 Billion',
    volume24h: '$8.2B',
    category: 'crypto',
    sparkline: [30, 38, 45, 52, 68, 74, 82, 89, 94, 98],
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'Binance Coin',
    price: 648.20,
    change24h: 1.85,
    high24h: 658.00,
    low24h: 635.00,
    marketCap: '$94.1 Billion',
    volume24h: '$2.4B',
    category: 'crypto',
    sparkline: [60, 62, 58, 67, 72, 70, 78, 80, 84, 88],
  },
  {
    id: 'xrp',
    symbol: 'XRP',
    name: 'Ripple',
    price: 2.48,
    change24h: 7.92,
    high24h: 2.62,
    low24h: 2.28,
    marketCap: '$141.2 Billion',
    volume24h: '$12.5B',
    category: 'crypto',
    sparkline: [25, 30, 42, 55, 65, 78, 82, 90, 94, 100],
  },
  {
    id: 'ada',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.885,
    change24h: 4.10,
    high24h: 0.920,
    low24h: 0.840,
    marketCap: '$31.6 Billion',
    volume24h: '$1.8B',
    category: 'crypto',
    sparkline: [40, 48, 52, 60, 68, 72, 79, 82, 85, 91],
  },
  {
    id: 'avax',
    symbol: 'AVAX',
    name: 'Avalanche',
    price: 34.75,
    change24h: -1.24,
    high24h: 36.20,
    low24h: 33.90,
    marketCap: '$14.2 Billion',
    volume24h: '$950M',
    category: 'crypto',
    sparkline: [80, 75, 78, 70, 65, 68, 60, 58, 54, 52],
  },

  // GLOBAL STOCKS & INDICES
  {
    id: 'spx',
    symbol: 'S&P 500',
    name: 'S&P 500 Index',
    price: 5984.20,
    change24h: 0.84,
    high24h: 6002.10,
    low24h: 5940.00,
    marketCap: '$46.8 Trillion',
    volume24h: '$142B',
    category: 'stock',
    sparkline: [55, 58, 62, 65, 70, 72, 75, 80, 84, 88],
  },
  {
    id: 'ndx',
    symbol: 'NASDAQ 100',
    name: 'Nasdaq Composite',
    price: 21140.80,
    change24h: 1.42,
    high24h: 21280.00,
    low24h: 20950.00,
    marketCap: '$24.5 Trillion',
    volume24h: '$98B',
    category: 'stock',
    sparkline: [45, 52, 60, 68, 74, 80, 82, 88, 92, 96],
  },
  {
    id: 'nvda',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 138.40,
    change24h: 2.85,
    high24h: 141.20,
    low24h: 134.80,
    marketCap: '$3.38 Trillion',
    volume24h: '$34.2B',
    category: 'stock',
    sparkline: [40, 48, 55, 68, 74, 82, 85, 90, 94, 98],
  },
  {
    id: 'aapl',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 232.50,
    change24h: 0.65,
    high24h: 234.80,
    low24h: 230.10,
    marketCap: '$3.52 Trillion',
    volume24h: '$18.9B',
    category: 'stock',
    sparkline: [65, 68, 70, 72, 75, 78, 80, 82, 84, 86],
  },

  // COMMODITIES
  {
    id: 'xau',
    symbol: 'XAU/USD',
    name: 'Gold Spot Bullion ($/oz)',
    price: 2715.40,
    change24h: 0.92,
    high24h: 2730.00,
    low24h: 2695.00,
    marketCap: '$17.2 Trillion',
    volume24h: '$84B',
    category: 'commodity',
    sparkline: [50, 55, 60, 68, 72, 78, 82, 85, 90, 95],
  },
  {
    id: 'brent',
    symbol: 'BRENT',
    name: 'Brent Crude Oil ($/bbl)',
    price: 74.20,
    change24h: -1.15,
    high24h: 75.80,
    low24h: 73.40,
    marketCap: 'Global Commodity',
    volume24h: '$38B',
    category: 'commodity',
    sparkline: [75, 72, 70, 68, 64, 62, 60, 58, 55, 52],
  },
];

export const CryptoView: React.FC = () => {
  const { formatMoney, setCurrentRoute, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'crypto' | 'stock' | 'commodity' | 'forex'>('all');
  const [marketData, setMarketData] = useState<MarketItem[]>(INITIAL_MARKETS);
  const [search, setSearch] = useState('');
  const [liveTicks, setLiveTicks] = useState(true);

  // Currency converter state
  const [convertAmount, setConvertAmount] = useState('1000');
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('USDT');

  // Real-time simulated price ticks
  useEffect(() => {
    if (!liveTicks) return;

    const interval = setInterval(() => {
      setMarketData((prev) =>
        prev.map((item) => {
          if (item.symbol === 'USDT') return item; // stablecoin stays ~1.00

          const deltaPct = (Math.random() * 0.4 - 0.19) / 100;
          const newPrice = Number((item.price * (1 + deltaPct)).toFixed(item.price < 10 ? 4 : 2));
          const newChange = Number((item.change24h + (deltaPct > 0 ? 0.05 : -0.05)).toFixed(2));

          return {
            ...item,
            price: newPrice,
            change24h: newChange,
          };
        })
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [liveTicks]);

  const filteredMarkets = marketData.filter((m) => {
    const matchCat = activeTab === 'all' || m.category === activeTab;
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.symbol.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Calculate live conversion
  const conversionRates: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    USDT: 1.0,
    BTC: 1 / 96420.5,
    ETH: 1 / 2845.8,
    AED: 3.67,
    CHF: 0.88,
    CAD: 1.39,
  };

  const calculateConverted = () => {
    const amt = Number(convertAmount) || 0;
    const fromRate = conversionRates[fromCurr] || 1;
    const toRate = conversionRates[toCurr] || 1;
    const inUSD = amt / fromRate;
    return (inUSD * toRate).toLocaleString('en-US', {
      maximumFractionDigits: toCurr === 'BTC' || toCurr === 'ETH' ? 6 : 2,
    });
  };

  return (
    <div className="space-y-8" id="tethra-crypto-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d4af37]/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/20 border border-[#10b981]/50 text-[#6ee7b7] font-mono text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>REAL-TIME MULTI-ASSET MARKET DATA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Live Crypto, Global Stocks &amp; Multi-Currency Markets
          </h1>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Real-time streaming tickers for major cryptocurrencies, Wall Street indices, commodities, and 24h Tether yield staking.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => setCurrentRoute('earnings')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#062c20] hover:bg-[#093e30] border border-[#d4af37]/50 text-[#fae188] text-xs font-bold transition-all shadow"
          >
            <Zap className="w-4 h-4 text-[#d4af37]" />
            <span>24H 2% Yield Vault</span>
          </button>

          <button
            onClick={() => setCurrentRoute('deposit')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] text-xs font-bold shadow-md hover:scale-105 transition-all"
          >
            <ArrowDownLeft className="w-4 h-4" />
            <span>Deposit USDT (TRC-20)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* REAL-TIME CURRENCY CONVERTER & MONEY DESK */}
      {/* ========================================================================= */}
      <div className="emerald-card-highlight rounded-3xl p-6 border border-[#d4af37]/50 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#0d3f32]">
          <div className="flex items-center gap-2">
            <Repeat className="w-4 h-4 text-[#d4af37]" />
            <h3 className="font-bold text-sm text-white">Live Multi-Currency &amp; Crypto Converter Desk</h3>
          </div>
          <span className="text-[10px] text-[#fae188] font-mono font-bold">Zero Spread &bull; Instant Settlement</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* From */}
          <div className="md:col-span-5 p-3 rounded-2xl bg-[#02130e] border border-[#0d3f32] space-y-1">
            <span className="text-[10px] font-bold text-[#8cb8a8] uppercase">From Currency / Asset:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={convertAmount}
                onChange={(e) => setConvertAmount(e.target.value)}
                className="bg-transparent text-lg font-mono font-extrabold text-white flex-1 focus:outline-none"
              />
              <select
                value={fromCurr}
                onChange={(e) => setFromCurr(e.target.value)}
                className="bg-[#062c20] border border-[#144f3d] rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-[#fae188] focus:outline-none"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="USDT">USDT (₮)</option>
                <option value="AED">AED (د.إ)</option>
                <option value="CHF">CHF (₣)</option>
              </select>
            </div>
          </div>

          {/* Equal Arrow */}
          <div className="md:col-span-2 flex justify-center">
            <div className="w-10 h-10 rounded-full bg-[#063124] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <Repeat className="w-4 h-4" />
            </div>
          </div>

          {/* To */}
          <div className="md:col-span-5 p-3 rounded-2xl bg-[#02130e] border border-[#0d3f32] space-y-1">
            <span className="text-[10px] font-bold text-[#8cb8a8] uppercase">Converted Live Amount:</span>
            <div className="flex items-center gap-2">
              <div className="text-lg font-mono font-extrabold text-[#6ee7b7] flex-1">
                {calculateConverted()}
              </div>
              <select
                value={toCurr}
                onChange={(e) => setToCurr(e.target.value)}
                className="bg-[#062c20] border border-[#144f3d] rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-[#fae188] focus:outline-none"
              >
                <option value="USDT">USDT (₮ - 2% Yield)</option>
                <option value="BTC">BTC (Bitcoin)</option>
                <option value="ETH">ETH (Ethereum)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="AED">AED (د.إ)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CATEGORY FILTER TABS & SEARCH */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-[#02130e] border border-[#0d3f32] rounded-xl overflow-x-auto w-full sm:w-auto">
          {[
            { key: 'all', label: 'All Markets' },
            { key: 'crypto', label: '⚡ Crypto' },
            { key: 'stock', label: '📈 Global Stocks' },
            { key: 'commodity', label: '🥇 Gold & Commodities' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-[#d4af37] text-[#031d16] shadow-sm'
                  : 'text-[#8cb8a8] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 text-[#8cb8a8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search coin or stock..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#02130e] border border-[#0d3f32] text-xs text-white placeholder-[#8cb8a8] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          {/* Live Ticks Toggle */}
          <button
            onClick={() => setLiveTicks(!liveTicks)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border shrink-0 transition-all ${
              liveTicks
                ? 'bg-[#062c20] text-[#10b981] border-[#10b981]/50'
                : 'bg-[#201010] text-[#ff8a80] border-[#ff8a80]/40'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{liveTicks ? 'Live Feed ON' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MARKETS GRID */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMarkets.map((asset) => (
          <div
            key={asset.id}
            className="emerald-card rounded-3xl p-6 border border-[#d4af37]/30 space-y-4 hover:border-[#d4af37] transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#073024] flex items-center justify-center font-bold text-xs text-[#fae188] border border-[#d4af37]/40 shadow-inner group-hover:scale-105 transition-transform">
                  {asset.symbol.slice(0, 4)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{asset.name}</h3>
                  <div className="text-[11px] text-[#8cb8a8] font-mono">{asset.symbol} / USD</div>
                </div>
              </div>

              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-mono font-bold border ${
                  asset.change24h >= 0
                    ? 'bg-[#10b981]/20 text-[#6ee7b7] border-[#10b981]/40'
                    : 'bg-red-900/40 text-red-300 border-red-500/40'
                }`}
              >
                {asset.change24h >= 0 ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                <span>
                  {asset.change24h >= 0 ? '+' : ''}
                  {asset.change24h}%
                </span>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                ${asset.price.toLocaleString('en-US', {
                  minimumFractionDigits: asset.price < 1 ? 4 : 2,
                  maximumFractionDigits: asset.price < 1 ? 4 : 2,
                })}
              </div>
              <div className="text-[10px] text-[#8cb8a8] font-mono mt-0.5">
                Cap: {asset.marketCap} &bull; Vol: {asset.volume24h}
              </div>
            </div>

            {/* Sparkline Visual Simulation */}
            <div className="h-12 flex items-end gap-1 pt-2 border-t border-[#0d3f32]">
              {asset.sparkline.map((val, i) => (
                <div
                  key={i}
                  style={{ height: `${val}%` }}
                  className={`flex-1 rounded-t transition-all duration-300 ${
                    asset.change24h >= 0 ? 'bg-[#10b981]' : 'bg-red-500'
                  } opacity-75 hover:opacity-100`}
                />
              ))}
            </div>

            <div className="flex justify-between text-[11px] text-[#71998b] font-mono pt-1">
              <span>24h High: ${asset.high24h.toLocaleString()}</span>
              <span>24h Low: ${asset.low24h.toLocaleString()}</span>
            </div>

            {/* Action button */}
            <div className="pt-2">
              {asset.symbol === 'USDT' ? (
                <button
                  onClick={() => setCurrentRoute('earnings')}
                  className="w-full py-2 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Stake in 24h 2% Yield Vault</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    showToast({
                      title: `${asset.symbol} Market Order`,
                      message: `Instant trade route active. Swapping via custodial liquidity pool.`,
                      type: 'info',
                    });
                  }}
                  className="w-full py-2 rounded-xl bg-[#041d16] hover:bg-[#073024] text-white border border-[#0d3f32] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Trade / Allocate {asset.symbol}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#fae188]" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
