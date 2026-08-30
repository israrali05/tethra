import React, { useState, useEffect } from 'react';
import {
  Server,
  Terminal,
  Activity,
  CheckCircle2,
  Play,
  RefreshCw,
  Clock,
  ShieldCheck,
  TrendingUp,
  Database,
  ArrowRight,
  Layers,
  Sparkles,
  Zap,
  Lock,
  Cpu,
  Globe,
  Coins,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BackendConsoleView: React.FC = () => {
  const { showToast, currentUser } = useApp();
  const [healthData, setHealthData] = useState<any>(null);
  const [healthLoading, setHealthLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'endpoints' | 'yield-cron' | 'ai-advisor' | 'server-logs'>('endpoints');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/api/health');
  const [apiResponse, setApiResponse] = useState<string>('');
  const [apiStatus, setApiStatus] = useState<number | null>(null);
  const [apiTiming, setApiTiming] = useState<number | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [cronRunning, setCronRunning] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string>('What is the optimal allocation between liquid checking and 2% daily USDT compound staking?');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  const fetchHealth = async () => {
    try {
      setHealthLoading(true);
      const start = performance.now();
      const res = await fetch('/api/health');
      const data = await res.json();
      const timeMs = Math.round(performance.now() - start);
      setHealthData(data);
      setApiTiming(timeMs);
    } catch (err) {
      console.error('Error pinging /api/health:', err);
    } finally {
      setHealthLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const executeEndpoint = async (endpoint: string, method: string = 'GET', body?: any) => {
    try {
      setIsExecuting(true);
      setSelectedEndpoint(endpoint);
      const start = performance.now();

      const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (body) {
        options.body = JSON.stringify(body);
      }

      const res = await fetch(endpoint, options);
      const duration = Math.round(performance.now() - start);
      setApiStatus(res.status);
      setApiTiming(duration);

      const json = await res.json();
      setApiResponse(JSON.stringify(json, null, 2));

      showToast({
        title: `${method} ${endpoint} (Status ${res.status})`,
        message: `Response returned in ${duration}ms`,
        type: res.ok ? 'success' : 'error',
      });
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message || 'Request failed' }, null, 2));
      setApiStatus(500);
    } finally {
      setIsExecuting(false);
    }
  };

  const triggerYieldCron = async () => {
    try {
      setCronRunning(true);
      const start = performance.now();
      const res = await fetch('/api/investments/execute-yield-cron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      const duration = Math.round(performance.now() - start);
      setApiResponse(JSON.stringify(data, null, 2));
      setApiStatus(res.status);
      setApiTiming(duration);

      showToast({
        title: '2.0% Compound Yield Cron Executed! 📈',
        message: data.message || 'Daily dividends distributed successfully.',
        type: 'success',
      });
      fetchHealth();
    } catch (err: any) {
      showToast({
        title: 'Cron Execution Failed',
        message: err.message || 'Network error',
        type: 'error',
      });
    } finally {
      setCronRunning(false);
    }
  };

  const executeAiAdvisor = async () => {
    try {
      setAiLoading(true);
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          userPortfolio: { totalBalance: '148,500' },
        }),
      });
      const data = await res.json();
      setAiResponse(data.advice || 'No response generated.');
    } catch (err: any) {
      setAiResponse('Error reaching AI Advisor API.');
    } finally {
      setAiLoading(false);
    }
  };

  const endpointsList = [
    { method: 'GET', url: '/api/health', desc: 'System telemetry, active uptime & memory stats' },
    { method: 'GET', url: `/api/wallets/${currentUser?.id || 'usr_001'}`, desc: 'User multi-currency balances & yield metrics' },
    { method: 'GET', url: `/api/investments/${currentUser?.id || 'usr_001'}`, desc: 'Active 24h 2.0% Tether compounding contracts' },
    { method: 'GET', url: `/api/transactions/${currentUser?.id || 'usr_001'}`, desc: 'Real-time ledger audit log' },
    { method: 'GET', url: '/api/admin/overview', desc: 'Executive treasury liquidity & global balances' },
    {
      method: 'POST',
      url: '/api/investments/create',
      desc: 'Allocate $5,000 USDT to 2.0% Daily Staking',
      body: { userId: currentUser?.id || 'usr_001', amount: 5000 },
    },
    {
      method: 'POST',
      url: '/api/deposits/request',
      desc: 'Submit $10,000 USDT Deposit Slip',
      body: { userId: currentUser?.id || 'usr_001', amount: 10000, currency: 'USDT', method: 'usdt_trc20' },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#042018] via-[#072e23] to-[#042018] border border-[#d4af37]/40 rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 text-xs font-bold text-[#10b981]">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              EXPRESS + NODE.JS BACKEND ENGINE LIVE
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#fae188] tracking-tight">
              Full-Stack React &amp; Express API Console
            </h1>
            <p className="text-sm text-[#8cb8a8] max-w-2xl">
              100% native Full-Stack React frontend backed by a high-throughput Node.js Express server on port 3000. Real-time REST endpoints, multi-currency wallets, 24-hour 2% compound yield cron, and Gemini AI advisory.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchHealth}
              disabled={healthLoading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#062d22] border border-[#d4af37]/40 text-xs font-mono text-[#fae188] hover:bg-[#0b4a37] transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${healthLoading ? 'animate-spin' : ''}`} />
              <span>Ping Server ({apiTiming || 4}ms)</span>
            </button>

            <button
              onClick={triggerYieldCron}
              disabled={cronRunning}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#fae188] text-[#02110c] font-black text-xs shadow-lg hover:brightness-110 transition-all active:scale-95"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{cronRunning ? 'Compounding...' : 'Run 2% Daily Cron'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Server Telemetry Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#042018] border border-[#d4af37]/30 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span>Server Status</span>
            <Server className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>200 OK</span>
          </div>
          <div className="text-[11px] text-[#8cb8a8] font-mono">Host: 0.0.0.0:3000</div>
        </div>

        <div className="bg-[#042018] border border-[#d4af37]/30 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span>Server Uptime</span>
            <Clock className="w-4 h-4 text-[#fae188]" />
          </div>
          <div className="text-lg font-bold text-[#fae188] font-mono">
            {healthData?.serverUptimeSeconds ? `${healthData.serverUptimeSeconds}s` : 'Active'}
          </div>
          <div className="text-[11px] text-[#8cb8a8]">High Availability SLA</div>
        </div>

        <div className="bg-[#042018] border border-[#d4af37]/30 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span>Active Staking Rate</span>
            <TrendingUp className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="text-lg font-bold text-[#10b981] font-mono">2.0% / 24h</div>
          <div className="text-[11px] text-[#8cb8a8]">Automated Compound Cron</div>
        </div>

        <div className="bg-[#042018] border border-[#d4af37]/30 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
            <span>Support Line</span>
            <Globe className="w-4 h-4 text-[#38bdf8]" />
          </div>
          <div className="text-sm font-bold text-white font-mono">+1 870-382-9652</div>
          <div className="text-[11px] text-[#38bdf8]">WhatsApp Live 24/7</div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('endpoints')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'endpoints'
              ? 'bg-[#d4af37] text-[#02110c] shadow-lg'
              : 'text-[#8cb8a8] hover:text-white hover:bg-white/5'
          }`}
        >
          ⚡ REST API Endpoints Explorer
        </button>

        <button
          onClick={() => setActiveTab('yield-cron')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'yield-cron'
              ? 'bg-[#d4af37] text-[#02110c] shadow-lg'
              : 'text-[#8cb8a8] hover:text-white hover:bg-white/5'
          }`}
        >
          📈 24h 2.0% Compound Engine
        </button>

        <button
          onClick={() => setActiveTab('ai-advisor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'ai-advisor'
              ? 'bg-[#d4af37] text-[#02110c] shadow-lg'
              : 'text-[#8cb8a8] hover:text-white hover:bg-white/5'
          }`}
        >
          🤖 Gemini AI Financial Advisor
        </button>
      </div>

      {/* TAB 1: REST API Explorer */}
      {activeTab === 'endpoints' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Endpoints List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#fae188]">Available Backend Routes</h3>
            <div className="space-y-2">
              {endpointsList.map((ep, idx) => (
                <div
                  key={idx}
                  onClick={() => executeEndpoint(ep.url, ep.method, ep.body)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedEndpoint === ep.url
                      ? 'bg-[#0a382c] border-[#d4af37] shadow-lg'
                      : 'bg-[#02110c] border-white/10 hover:border-[#d4af37]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          ep.method === 'POST' ? 'bg-[#38bdf8]/20 text-[#38bdf8]' : 'bg-[#10b981]/20 text-[#10b981]'
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span className="font-mono text-xs font-bold text-white">{ep.url}</span>
                    </div>
                    <Play className="w-3.5 h-3.5 text-[#d4af37]" />
                  </div>
                  <p className="text-[11px] text-[#8cb8a8] mt-1">{ep.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Live Response Panel */}
          <div className="lg:col-span-7 bg-[#02110c] border border-[#d4af37]/30 rounded-2xl p-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#fae188]" />
                <span className="text-xs font-mono text-[#fae188] font-bold">
                  {selectedEndpoint || '/api/health'}
                </span>
              </div>
              {apiStatus !== null && (
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] text-[11px] font-mono font-bold">
                    HTTP {apiStatus}
                  </span>
                  <span className="text-[11px] text-[#8cb8a8] font-mono">{apiTiming}ms</span>
                </div>
              )}
            </div>

            <div className="flex-1 bg-[#010a07] rounded-xl p-3 overflow-x-auto max-h-[380px]">
              <pre className="text-xs font-mono text-[#8cb8a8] leading-relaxed">
                {isExecuting ? 'Sending request to Express server...' : apiResponse || JSON.stringify(healthData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Yield Engine */}
      {activeTab === 'yield-cron' && (
        <div className="bg-[#042018] border border-[#d4af37]/30 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#fae188]">Automated 24-Hour 2.0% Yield Compounding Desk</h3>
              <p className="text-xs text-[#8cb8a8] max-w-xl">
                Calculates daily 2.0% dividend accruals on all active USDT staking contracts and auto-credits earnings directly to member wallets.
              </p>
            </div>

            <button
              onClick={triggerYieldCron}
              disabled={cronRunning}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#fae188] text-[#02110c] font-black text-sm shadow-lg hover:brightness-110 active:scale-95"
            >
              <Zap className="w-4 h-4" />
              <span>{cronRunning ? 'Running Compounding Batch...' : 'Trigger Instant 2% Payout'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#02110c] border border-white/10 rounded-xl p-4 space-y-1">
              <div className="text-xs text-[#8cb8a8]">Base Daily Dividend</div>
              <div className="text-xl font-bold text-[#10b981]">2.00% Net</div>
              <div className="text-[11px] text-[#8cb8a8]">Calculated every 24 hours</div>
            </div>

            <div className="bg-[#02110c] border border-white/10 rounded-xl p-4 space-y-1">
              <div className="text-xs text-[#8cb8a8]">Supported Asset</div>
              <div className="text-xl font-bold text-[#fae188]">Tether (USDT)</div>
              <div className="text-[11px] text-[#8cb8a8]">TRC-20 &amp; ERC-20 Rails</div>
            </div>

            <div className="bg-[#02110c] border border-white/10 rounded-xl p-4 space-y-1">
              <div className="text-xs text-[#8cb8a8]">Payout Settlement</div>
              <div className="text-xl font-bold text-[#38bdf8]">Instant Auto-Credit</div>
              <div className="text-[11px] text-[#8cb8a8]">Zero withdrawal lockup penalty</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI Advisor */}
      {activeTab === 'ai-advisor' && (
        <div className="bg-[#042018] border border-[#d4af37]/30 rounded-2xl p-6 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-[#fae188]">Tethra AI Financial Intelligence (Gemini 2.5)</h3>
            <p className="text-xs text-[#8cb8a8]">
              Server-side intelligence via Google Gemini API to analyze treasury risk, optimal multi-currency liquidity, and yield allocation.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask financial advisor..."
                className="flex-1 bg-[#02110c] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
              />
              <button
                onClick={executeAiAdvisor}
                disabled={aiLoading}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#fae188] text-[#02110c] font-bold text-xs flex items-center gap-2 hover:brightness-110"
              >
                <Sparkles className="w-4 h-4" />
                <span>{aiLoading ? 'Thinking...' : 'Ask AI'}</span>
              </button>
            </div>

            {aiResponse && (
              <div className="bg-[#02110c] border border-[#10b981]/30 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#10b981]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Executive AI Analysis</span>
                </div>
                <p className="text-xs text-[#eafaf4] leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
