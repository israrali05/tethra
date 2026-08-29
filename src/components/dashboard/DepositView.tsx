import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowDownLeft,
  Coins,
  Building2,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  Sparkles,
  Info,
  Clock,
} from 'lucide-react';
import { DepositMethod } from '../../types';

export const DepositView: React.FC = () => {
  const { accounts, requestDeposit, transactions, formatMoney, showToast } = useApp();

  const [selectedMethod, setSelectedMethod] = useState<DepositMethod>('crypto_usdt');
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id || '');
  const [depositAmount, setDepositAmount] = useState('1000');
  const [txHash, setTxHash] = useState('');
  const [copied, setCopied] = useState(false);

  const usdtAddress = 'TJ8Qx9vK2P8mN3ZcW1bF5aD4yR7gH6eL9s';

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    showToast({
      title: 'Address Copied',
      message: 'USDT deposit address copied to clipboard.',
      type: 'info',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(depositAmount);
    if (!amt || amt <= 0) return;

    requestDeposit(
      selectedAccountId,
      amt,
      selectedMethod,
      txHash ? `TX Hash: ${txHash}` : undefined
    );

    setDepositAmount('1000');
    setTxHash('');
  };

  const depositTxs = transactions.filter((t) => t.type === 'deposit');

  return (
    <div className="space-y-8" id="tethra-deposit-view">
      {/* Header */}
      <div className="pb-4 border-b border-[#d4af37]/20">
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          Deposit &amp; Fund Accounts
        </h1>
        <p className="text-xs text-[#8cb8a8] mt-1">
          Add capital via ACH Bank Wire, FedNow, or USDT (TRC-20 / ERC-20) institutional digital custody.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Deposit Method Selector & Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Method Tabs */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedMethod('crypto_usdt')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedMethod === 'crypto_usdt'
                  ? 'bg-[#093e30] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'bg-[#041e17] border-[#144f3d] hover:bg-[#062c21]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Coins className="w-5 h-5 text-[#d4af37]" />
                <span className="font-bold text-sm text-white">USDT (TRC20 / ERC20)</span>
              </div>
              <span className="text-[11px] text-[#8cb8a8]">Instant blockchain custody</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('bank_wire')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedMethod === 'bank_wire'
                  ? 'bg-[#093e30] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'bg-[#041e17] border-[#144f3d] hover:bg-[#062c21]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-5 h-5 text-[#10b981]" />
                <span className="font-bold text-sm text-white">US Bank Wire / ACH</span>
              </div>
              <span className="text-[11px] text-[#8cb8a8]">Same-day domestic clearing</span>
            </button>
          </div>

          {/* Form Content */}
          <div className="emerald-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-6">
            {selectedMethod === 'crypto_usdt' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#041d16] border border-[#14533e] flex flex-col sm:flex-row items-center gap-4">
                  {/* QR SVG Simulation */}
                  <div className="w-28 h-28 rounded-xl bg-white p-2 shrink-0 flex items-center justify-center shadow-inner">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
                      {/* Outer corner squares */}
                      <rect x="10" y="10" width="25" height="25" fill="#042018" />
                      <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
                      <rect x="19" y="19" width="7" height="7" fill="#042018" />

                      <rect x="65" y="10" width="25" height="25" fill="#042018" />
                      <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
                      <rect x="74" y="19" width="7" height="7" fill="#042018" />

                      <rect x="10" y="65" width="25" height="25" fill="#042018" />
                      <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
                      <rect x="19" y="74" width="7" height="7" fill="#042018" />

                      {/* Random Matrix Dots */}
                      <rect x="42" y="12" width="6" height="6" fill="#042018" />
                      <rect x="52" y="24" width="6" height="6" fill="#042018" />
                      <rect x="42" y="38" width="8" height="8" fill="#d4af37" />
                      <rect x="60" y="45" width="6" height="6" fill="#042018" />
                      <rect x="75" y="60" width="8" height="8" fill="#042018" />
                      <rect x="45" y="75" width="8" height="8" fill="#042018" />
                      <rect x="60" y="80" width="6" height="6" fill="#042018" />
                    </svg>
                  </div>

                  <div className="space-y-2 flex-1">
                    <span className="text-xs font-bold text-[#d4af37]">USDT (TRC-20) Deposit Address:</span>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-[#02130e] border border-[#0d3f32] font-mono text-xs text-white break-all">
                      <span>{usdtAddress}</span>
                      <button
                        onClick={() => handleCopy(usdtAddress)}
                        className="text-[#d4af37] hover:text-white shrink-0 p-1"
                      >
                        {copied ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <span className="text-[10px] text-[#769e90] block">
                      Send only Tether (USDT TRC20) to this address. Minimum deposit: $50 USD.
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-[#041d16] border border-[#14533e] space-y-2 text-xs">
                <div className="font-bold text-[#d4af37] text-sm">US Domestic ACH &amp; Wire Details</div>
                <div className="grid grid-cols-2 gap-2 text-[#b8e2d4] font-mono pt-1">
                  <div>Bank Name: <span className="text-white">JPMorgan Chase N.A.</span></div>
                  <div>Routing (ABA): <span className="text-white">021000021</span></div>
                  <div>Account Name: <span className="text-white">Tethra Financial Custody</span></div>
                  <div>Account No: <span className="text-white">894028194401</span></div>
                </div>
                <div className="text-[11px] text-[#7ca898] pt-1">
                  *Include your Unique Ledger ID in the wire memo for automatic same-day matching.
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitDeposit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Target Account to Credit
                </label>
                <select
                  value={selectedAccountId}
                  onChange={(e) => setSelectedAccountId(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                >
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} ({formatMoney(acc.balance)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Deposit Amount (USD)
                </label>
                <input
                  type="number"
                  min="10"
                  step="1"
                  required
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {selectedMethod === 'crypto_usdt' && (
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                    Transaction Hash / TXID (Optional in Demo)
                  </label>
                  <input
                    type="text"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    placeholder="e.g. 7f4a8b92c10d3e5f..."
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#031d16] font-display font-extrabold text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02] transition-transform"
              >
                Submit Deposit Confirmation
              </button>
            </form>
          </div>
        </div>

        {/* Right Info & Recent Deposits Table (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 rounded-2xl bg-[#041e17] border border-[#14533e] space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
              <span>Sandbox Ledger Policy</span>
            </div>
            <p className="text-xs text-[#8cb8a8] leading-relaxed">
              In this environment, submitted deposits instantly credit your selected account balance or create an auditable pending request for compliance verification.
            </p>
          </div>

          {/* Recent Deposits List */}
          <div className="emerald-card rounded-2xl p-5 border border-[#d4af37]/25 space-y-3">
            <h3 className="text-sm font-bold text-white pb-2 border-b border-[#0f4637]">
              Deposit Logs
            </h3>

            <div className="space-y-2">
              {depositTxs.length === 0 ? (
                <p className="text-xs text-[#71998c]">No deposit transactions recorded yet.</p>
              ) : (
                depositTxs.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl bg-[#041f17] border border-[#0d3f32] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{t.description}</div>
                      <div className="text-[10px] text-[#7ca898] font-mono">
                        {new Date(t.createdAt).toLocaleDateString()} • Ref: {t.reference}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#6ee7b7] font-mono">
                        +{formatMoney(t.amount)}
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#6ee7b7] uppercase font-mono">
                        {t.status}
                      </span>
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
