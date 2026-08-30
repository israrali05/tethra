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
  Zap,
  Gift,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { DepositMethod } from '../../types';

export const DepositView: React.FC = () => {
  const { accounts, requestDeposit, transactions, formatMoney, showToast, currentUser } = useApp();

  const [selectedMethod, setSelectedMethod] = useState<DepositMethod>('crypto_usdt');
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id || '');
  const [depositAmount, setDepositAmount] = useState('100');
  const [txHash, setTxHash] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Addresses from uploaded deposit cards
  const USDT_TRC20_ADDRESS = 'TCq7WEcmNeT51ePEHbyUF4PNkxBu6nZqqT';
  const BTC_BEP20_ADDRESS = '0xa65c699249865b137f5eaa40c463e809301e8d86';

  const handleCopy = (val: string, key: string, name: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    showToast({
      title: `${name} Address Copied`,
      message: `${val.slice(0, 10)}...${val.slice(-6)} copied to clipboard.`,
      type: 'info',
    });
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmitDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(depositAmount);
    if (!amt || amt <= 0) return;

    requestDeposit(
      selectedAccountId,
      selectedMethod,
      amt,
      {
        txHash: txHash || undefined,
        depositAddress:
          selectedMethod === 'crypto_usdt' || selectedMethod === 'usdt_trc20'
            ? USDT_TRC20_ADDRESS
            : selectedMethod === 'crypto_btc' || selectedMethod === 'btc_bep20'
            ? BTC_BEP20_ADDRESS
            : undefined,
      }
    );

    setDepositAmount('100');
    setTxHash('');
  };

  const depositTxs = transactions.filter((t) => t.type === 'deposit');

  return (
    <div className="space-y-8" id="tethra-deposit-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d4af37]/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/20 border border-[#10b981]/50 text-[#6ee7b7] font-mono text-xs font-bold mb-2">
            <Zap className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span>DAILY 2% INCOME ON USDT &amp; BTC DEPOSITS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Deposit &amp; Fund Accounts
          </h1>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Add capital via USDT (TRC-20), BTC (BEP-20), or Domestic Bank Wire. Deposits $\ge$ $50 unlock the $25 referral reward!
          </p>
        </div>

        {/* Promo summary badge */}
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#062c20] border border-[#d4af37]/40 shadow">
          <Gift className="w-5 h-5 text-[#fae188] shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-[#fae188]">$25 Referral Bonus Active</div>
            <div className="text-[11px] text-[#a2cbbe]">Min $50 deposit qualifies inviter</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Deposit Method Selector & Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Method Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* USDT TRC20 */}
            <button
              type="button"
              onClick={() => setSelectedMethod('crypto_usdt')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedMethod === 'crypto_usdt' || selectedMethod === 'usdt_trc20'
                  ? 'bg-[#093e30] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'bg-[#041e17] border-[#144f3d] hover:bg-[#062c21]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#26a17b] flex items-center justify-center text-white font-bold text-xs">
                    ₮
                  </div>
                  <span className="font-bold text-sm text-white">USDT</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#10b981]/30 text-[#6ee7b7] font-mono font-bold">
                  2% Daily
                </span>
              </div>
              <span className="text-[11px] text-[#8cb8a8] block font-mono">Tron (TRC20)</span>
            </button>

            {/* BTC BEP20 */}
            <button
              type="button"
              onClick={() => setSelectedMethod('crypto_btc')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedMethod === 'crypto_btc' || selectedMethod === 'btc_bep20'
                  ? 'bg-[#093e30] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'bg-[#041e17] border-[#144f3d] hover:bg-[#062c21]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#f7931a] flex items-center justify-center text-white font-bold text-xs">
                    ₿
                  </div>
                  <span className="font-bold text-sm text-white">BTC</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#10b981]/30 text-[#6ee7b7] font-mono font-bold">
                  2% Daily
                </span>
              </div>
              <span className="text-[11px] text-[#8cb8a8] block font-mono">BSC (BEP20)</span>
            </button>

            {/* US Bank Wire */}
            <button
              type="button"
              onClick={() => setSelectedMethod('bank_wire')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedMethod === 'bank_wire' || selectedMethod === 'bank_transfer'
                  ? 'bg-[#093e30] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'bg-[#041e17] border-[#144f3d] hover:bg-[#062c21]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Building2 className="w-5 h-5 text-[#10b981]" />
                <span className="font-bold text-sm text-white">Bank Wire</span>
              </div>
              <span className="text-[11px] text-[#8cb8a8] block">ACH / FedNow</span>
            </button>
          </div>

          {/* Deposit Details Card */}
          <div className="emerald-card rounded-3xl p-6 border border-[#d4af37]/30 space-y-6">
            {/* USDT TRC20 View */}
            {(selectedMethod === 'crypto_usdt' || selectedMethod === 'usdt_trc20') && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#031912] border border-[#14533e] flex flex-col sm:flex-row items-center gap-4">
                  {/* QR Code */}
                  <div className="w-32 h-32 rounded-2xl bg-white p-2.5 shrink-0 flex items-center justify-center shadow-lg relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
                      {/* Outer corner squares */}
                      <rect x="8" y="8" width="26" height="26" fill="#042018" />
                      <rect x="13" y="13" width="16" height="16" fill="#ffffff" />
                      <rect x="17" y="17" width="8" height="8" fill="#042018" />

                      <rect x="66" y="8" width="26" height="26" fill="#042018" />
                      <rect x="71" y="13" width="16" height="16" fill="#ffffff" />
                      <rect x="75" y="17" width="8" height="8" fill="#042018" />

                      <rect x="8" y="66" width="26" height="26" fill="#042018" />
                      <rect x="13" y="71" width="16" height="16" fill="#ffffff" />
                      <rect x="17" y="75" width="8" height="8" fill="#042018" />

                      {/* Random Matrix Dots for USDT */}
                      <rect x="40" y="10" width="6" height="6" fill="#042018" />
                      <rect x="52" y="14" width="6" height="6" fill="#042018" />
                      <rect x="42" y="24" width="6" height="6" fill="#042018" />
                      <rect x="52" y="32" width="6" height="6" fill="#042018" />
                      <rect x="12" y="44" width="8" height="8" fill="#042018" />
                      <rect x="26" y="48" width="6" height="6" fill="#042018" />
                      <rect x="72" y="44" width="8" height="8" fill="#042018" />
                      <rect x="84" y="52" width="6" height="6" fill="#042018" />
                      <rect x="42" y="68" width="8" height="8" fill="#042018" />
                      <rect x="54" y="76" width="6" height="6" fill="#042018" />
                      <rect x="74" y="70" width="8" height="8" fill="#042018" />
                      <rect x="84" y="82" width="6" height="6" fill="#042018" />

                      {/* Center Tether Logo */}
                      <circle cx="50" cy="50" r="13" fill="#26a17b" />
                      <text
                        x="50"
                        y="55"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="13"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        ₮
                      </text>
                    </svg>
                  </div>

                  <div className="space-y-2 flex-1 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#d4af37]">Deposit Address</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#26a17b]/20 text-[#26a17b] font-bold border border-[#26a17b]/40">
                        Tron (TRC20)
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#02130e] border border-[#0d3f32] font-mono text-xs text-white break-all">
                      <span className="font-semibold text-[#6ee7b7]">{USDT_TRC20_ADDRESS}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(USDT_TRC20_ADDRESS, 'usdt', 'USDT TRC20')}
                        className="text-[#d4af37] hover:text-white shrink-0 p-1.5 rounded-lg bg-[#062c20] hover:bg-[#093e30] transition-colors"
                      >
                        {copiedKey === 'usdt' ? (
                          <Check className="w-4 h-4 text-[#10b981]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="space-y-1 text-[11px] text-[#7ca898]">
                      <div className="flex items-center gap-1.5 text-white font-semibold">
                        <Info className="w-3.5 h-3.5 text-[#fae188]" />
                        <span>Minimum Deposit: $50 USD equivalent (USDT)</span>
                      </div>
                      <p className="text-[10px] text-[#71998b] leading-tight">
                        Don't send NFTs to this address. Smart contract deposits are not supported with the exception of ETH via ERC20, BSC via BEP20, Arbitrum and Optimism networks. Binance Custody Direct.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BTC BEP20 View */}
            {(selectedMethod === 'crypto_btc' || selectedMethod === 'btc_bep20') && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#031912] border border-[#14533e] flex flex-col sm:flex-row items-center gap-4">
                  {/* QR Code */}
                  <div className="w-32 h-32 rounded-2xl bg-white p-2.5 shrink-0 flex items-center justify-center shadow-lg relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
                      {/* Outer corner squares */}
                      <rect x="8" y="8" width="26" height="26" fill="#042018" />
                      <rect x="13" y="13" width="16" height="16" fill="#ffffff" />
                      <rect x="17" y="17" width="8" height="8" fill="#042018" />

                      <rect x="66" y="8" width="26" height="26" fill="#042018" />
                      <rect x="71" y="13" width="16" height="16" fill="#ffffff" />
                      <rect x="75" y="17" width="8" height="8" fill="#042018" />

                      <rect x="8" y="66" width="26" height="26" fill="#042018" />
                      <rect x="13" y="71" width="16" height="16" fill="#ffffff" />
                      <rect x="17" y="75" width="8" height="8" fill="#042018" />

                      {/* Random Matrix Dots for BTC */}
                      <rect x="38" y="12" width="6" height="6" fill="#042018" />
                      <rect x="50" y="18" width="6" height="6" fill="#042018" />
                      <rect x="44" y="26" width="6" height="6" fill="#042018" />
                      <rect x="14" y="42" width="8" height="8" fill="#042018" />
                      <rect x="24" y="50" width="6" height="6" fill="#042018" />
                      <rect x="76" y="46" width="8" height="8" fill="#042018" />
                      <rect x="84" y="56" width="6" height="6" fill="#042018" />
                      <rect x="40" y="70" width="8" height="8" fill="#042018" />
                      <rect x="52" y="80" width="6" height="6" fill="#042018" />
                      <rect x="72" y="74" width="8" height="8" fill="#042018" />

                      {/* Center Bitcoin Logo */}
                      <circle cx="50" cy="50" r="13" fill="#f7931a" />
                      <text
                        x="50"
                        y="55"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="13"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        ₿
                      </text>
                    </svg>
                  </div>

                  <div className="space-y-2 flex-1 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#d4af37]">Deposit Address</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f7931a]/20 text-[#f7931a] font-bold border border-[#f7931a]/40">
                        BSC BNB Smart Chain (BEP20)
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#02130e] border border-[#0d3f32] font-mono text-xs text-white break-all">
                      <span className="font-semibold text-[#fae188]">{BTC_BEP20_ADDRESS}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(BTC_BEP20_ADDRESS, 'btc', 'BTC BEP20')}
                        className="text-[#d4af37] hover:text-white shrink-0 p-1.5 rounded-lg bg-[#062c20] hover:bg-[#093e30] transition-colors"
                      >
                        {copiedKey === 'btc' ? (
                          <Check className="w-4 h-4 text-[#10b981]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="space-y-1 text-[11px] text-[#7ca898]">
                      <div className="flex items-center gap-1.5 text-white font-semibold">
                        <Info className="w-3.5 h-3.5 text-[#fae188]" />
                        <span>Contract Address: ***ead9c</span>
                      </div>
                      <p className="text-[10px] text-[#71998b] leading-tight">
                        Please make sure the BTC token you are depositing via BSC network ends with the contract address ead9c. Minimum deposit: $50 USD equivalent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Wire Details */}
            {(selectedMethod === 'bank_wire' || selectedMethod === 'bank_transfer') && (
              <div className="p-4 rounded-2xl bg-[#031912] border border-[#14533e] space-y-3 text-xs">
                <div className="font-bold text-[#d4af37] text-sm flex items-center justify-between">
                  <span>US Domestic ACH &amp; Wire Details</span>
                  <span className="text-[10px] font-mono text-[#6ee7b7]">Same-Day Settlement</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#b8e2d4] font-mono pt-1">
                  <div className="p-2 rounded-lg bg-[#02130e] border border-[#0d3f32]">
                    <span className="text-[10px] text-[#7ca898] block">Bank Name:</span>
                    <span className="text-white font-bold">JPMorgan Chase N.A.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#02130e] border border-[#0d3f32]">
                    <span className="text-[10px] text-[#7ca898] block">Routing (ABA):</span>
                    <span className="text-white font-bold">021000021</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#02130e] border border-[#0d3f32]">
                    <span className="text-[10px] text-[#7ca898] block">Account Name:</span>
                    <span className="text-white font-bold">Tethra Custody LLC</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#02130e] border border-[#0d3f32]">
                    <span className="text-[10px] text-[#7ca898] block">Account Number:</span>
                    <span className="text-white font-bold">894028194401</span>
                  </div>
                </div>
                <div className="text-[11px] text-[#7ca898]">
                  *Include your User ID (<strong className="text-white">{currentUser?.uniqueUserId || 'THR-USER'}</strong>) in the wire memo.
                </div>
              </div>
            )}

            {/* Deposit Submission Form */}
            <form onSubmit={handleSubmitDeposit} className="space-y-4 pt-2 border-t border-[#0f4637]">
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
                      {acc.name} — Balance: {formatMoney(acc.balance)} ({acc.currency})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#a2cbbe]">
                    Deposit Amount (USD Equivalent)
                  </label>
                  <span className="text-[11px] text-[#fae188] font-bold">
                    Min $50 for $25 Referral Bonus &amp; 2% Daily Yield
                  </span>
                </div>
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

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Transaction Hash / Reference (Optional)
                </label>
                <input
                  type="text"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="e.g. 0x7f4a8b92c10d3e5f..."
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#031d16] font-display font-extrabold text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <ArrowDownLeft className="w-4 h-4" />
                <span>Confirm &amp; Credit Deposit</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Info & Recent Deposits Table (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 2% Daily Yield & Referral Program Banner */}
          <div className="p-5 rounded-3xl bg-[#041e17] border border-[#14533e] space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              <span>Program Benefits &amp; Yield Terms</span>
            </div>
            <ul className="text-xs text-[#8cb8a8] space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Daily 2% Income: </strong>
                  All USDT and BTC balances earn daily 2% income compound accrual credited directly to your digital asset treasury.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Referral $25 Bonus: </strong>
                  When a referred friend signs up and adds at least <strong>$50.00</strong>, the referrer instantly receives a <strong>$25.00 cash bonus</strong>!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-1.5 shrink-0" />
                <span>
                  <strong className="text-white">Zero Account Setup Fees: </strong>
                  New accounts start at $0.00 zero balance with zero maintenance fees.
                </span>
              </li>
            </ul>
          </div>

          {/* Recent Deposits List */}
          <div className="emerald-card rounded-3xl p-5 border border-[#d4af37]/25 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#0f4637]">
              <h3 className="text-sm font-bold text-white">Deposit History</h3>
              <span className="text-[10px] font-mono text-[#8cb8a8]">{depositTxs.length} Total</span>
            </div>

            <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
              {depositTxs.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#02130e] border border-[#0d3f32] text-center text-xs text-[#71998c]">
                  No deposits yet. Add at least $50 to earn 2% daily yield and unlock your referral rewards!
                </div>
              ) : (
                depositTxs.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl bg-[#041f17] border border-[#0d3f32] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white truncate max-w-[180px]">{t.description}</div>
                      <div className="text-[10px] text-[#7ca898] font-mono">
                        {new Date(t.createdAt).toLocaleDateString()} &bull; {t.referenceNumber}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-[#6ee7b7] font-mono">
                        +{formatMoney(t.amount)}
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#6ee7b7] uppercase font-mono font-bold">
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
