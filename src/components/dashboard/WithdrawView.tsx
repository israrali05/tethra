import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Coins,
  ShieldCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Lock,
  Download,
  Filter,
  FileText,
  BadgeCheck,
  UserCheck,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { WithdrawalMethod } from '../../types';

export const WithdrawView: React.FC = () => {
  const {
    accounts,
    requestWithdrawal,
    withdrawals,
    formatMoney,
    currentUser,
    setCurrentRoute,
    showToast,
  } = useApp();

  const [method, setMethod] = useState<'us_bank' | 'sepa_eu' | 'uk_faster' | 'crypto_usdt'>('us_bank');
  const [sourceAccountId, setSourceAccountId] = useState(accounts[0]?.id || '');
  const [amount, setAmount] = useState('500');

  // Bank Form State
  const [bankName, setBankName] = useState('JPMorgan Chase Bank');
  const [accountHolder, setAccountHolder] = useState(
    currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Alexander Morgan'
  );
  const [routingNumber, setRoutingNumber] = useState('021000021');
  const [accountNumber, setAccountNumber] = useState('482190381029');
  const [iban, setIban] = useState('GB29NWBK60161331926819');
  const [swiftBic, setSwiftBic] = useState('CHASUS33');

  // Crypto Form State
  const [cryptoAddress, setCryptoAddress] = useState('');
  const [cryptoNetwork, setCryptoNetwork] = useState<'TRC20' | 'ERC20'>('TRC20');

  // Modal & Security State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [twoFACode, setTwoFACode] = useState('');
  const [historyFilter, setHistoryFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const kycTier = currentUser?.kycStatus === 'verified' || currentUser?.kycStatus === 'approved' ? 2 : 1;
  const dailyLimit = kycTier === 2 ? 100000 : 5000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!amt || amt <= 0) return;

    if (amt > dailyLimit) {
      showToast({
        title: 'Withdrawal Limit Exceeded',
        message: `Your current Tier ${kycTier} limit is ${formatMoney(dailyLimit)}. Complete Tier 2 KYC to withdraw up to $100,000/day.`,
        type: 'error',
      });
      return;
    }

    setShowConfirmModal(true);
  };

  const handleFinalConfirm = () => {
    const amt = Number(amount);
    let destination = '';

    if (method === 'us_bank') {
      destination = `${bankName} (Acct: ...${accountNumber.slice(-4)})`;
    } else if (method === 'sepa_eu') {
      destination = `SEPA: ${iban.slice(0, 4)}...${iban.slice(-4)}`;
    } else if (method === 'uk_faster') {
      destination = `Faster Payments: ...${accountNumber.slice(-4)}`;
    } else {
      destination = `USDT (${cryptoNetwork}): ${cryptoAddress.slice(0, 6)}...${cryptoAddress.slice(-4)}`;
    }

    const bankDetails =
      method === 'us_bank' || method === 'sepa_eu' || method === 'uk_faster'
        ? {
            bankName,
            accountHolder,
            routingNumber,
            accountNumber,
            iban,
            swiftBic,
          }
        : undefined;

    requestWithdrawal(sourceAccountId, amt, method as any, destination, bankDetails);
    setShowConfirmModal(false);
    setAmount('500');
    setTwoFACode('');

    showToast({
      title: 'Withdrawal Submitted',
      message: `${formatMoney(amt)} withdrawal dispatched for compliance processing.`,
      type: 'success',
    });
  };

  const handleDownloadReceipt = (reference: string, amt: number) => {
    showToast({
      title: 'Receipt Downloaded',
      message: `Audit transaction receipt for ${reference} ($${amt}) saved.`,
      type: 'info',
    });
  };

  // Mock withdrawal history data with realistic records
  const allWithdrawalRecords = [
    {
      id: 'wd-hist-1',
      reference: 'THR-WD-984012',
      amount: 4200,
      method: 'US Bank ACH (Chase)',
      destination: 'Chase Bank (...1029)',
      date: '2026-08-28 14:32',
      status: 'completed',
      step: 4,
      kycVerified: true,
      timeline: 'Settled in 24h via ACH Network',
    },
    {
      id: 'wd-hist-2',
      reference: 'THR-WD-982190',
      amount: 1500,
      method: 'USDT (TRC-20)',
      destination: 'TYp9...4Xmq',
      date: '2026-08-26 09:15',
      status: 'completed',
      step: 4,
      kycVerified: true,
      timeline: 'Confirmed on TRON Blockchain',
    },
    {
      id: 'wd-hist-3',
      reference: 'THR-WD-979924',
      amount: 12500,
      method: 'FedWire Transfer',
      destination: 'Bank of America (...4410)',
      date: '2026-08-24 16:40',
      status: 'completed',
      step: 4,
      kycVerified: true,
      timeline: 'FedWire Same-Day Settlement',
    },
    ...withdrawals.map((w: any, idx: number) => ({
      id: w.id || `wd-${idx}`,
      reference: w.reference || `THR-WD-88${idx}10`,
      amount: w.amount,
      method: w.method === 'us_bank' ? 'US Bank Payout' : 'USDT Payout',
      destination: w.destination,
      date: 'Today, Just now',
      status: w.status || 'processing',
      step: w.status === 'completed' ? 4 : 2,
      kycVerified: true,
      timeline: 'Under 1-3 Day Settlement Protocol',
    })),
  ];

  const filteredHistory = allWithdrawalRecords.filter((rec) => {
    if (historyFilter === 'all') return true;
    if (historyFilter === 'pending') return rec.status === 'pending' || rec.status === 'processing';
    if (historyFilter === 'completed') return rec.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-8" id="tethra-withdraw-view">
      {/* Header */}
      <div className="pb-4 border-b border-[#d4af37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Withdraw Funds &amp; Bank Settlement
          </h1>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Direct institutional payouts to verified US Bank accounts (ACH/FedWire), SEPA, UK Faster Payments, or USDT wallets.
          </p>
        </div>

        {/* KYC Status Pill */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#02130e] border border-[#0d3f32] flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#063124] border border-[#10b981]/40 flex items-center justify-center text-[#10b981]">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Withdrawal KYC Tier {kycTier}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#6ee7b7] font-mono">
                  ACTIVE
                </span>
              </div>
              <div className="text-[10px] text-[#8cb8a8] font-mono">
                Limit: {formatMoney(dailyLimit)} / 24h
              </div>
            </div>
          </div>

          {kycTier === 1 && (
            <button
              onClick={() => setCurrentRoute('kyc')}
              className="px-3.5 py-2 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs shadow hover:scale-105 transition-all"
            >
              Upgrade to Tier 2 ($100K)
            </button>
          )}
        </div>
      </div>

      {/* 3-Day Timeline Compliance Notification Banner */}
      <div className="p-4 rounded-2xl bg-[#062c20] border border-[#d4af37]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#0b4737] text-[#d4af37] shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <span>US &amp; International 1-3 Business Day Settlement Protocol</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#6ee7b7] font-mono">
                ACH / FedWire / SEPA
              </span>
            </div>
            <p className="text-xs text-[#8cb8a8] mt-0.5">
              Payouts to verified financial institutions arrive within 24 to 72 hours of AML &amp; compliance verification.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentRoute('kyc')}
          className="px-3.5 py-1.5 rounded-xl bg-[#031d16] hover:bg-[#072e23] text-[#fae188] border border-[#d4af37]/50 text-xs font-semibold shrink-0"
        >
          View KYC Limits &amp; Identity →
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Method Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setMethod('us_bank')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                method === 'us_bank'
                  ? 'bg-[#093e30] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'bg-[#041e17] border-[#144f3d] hover:bg-[#062c21]'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#d4af37] mb-1" />
              <div className="font-bold text-xs text-white">US Bank (ACH)</div>
              <span className="text-[10px] text-[#8cb8a8]">1-3 Business Days</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('sepa_eu')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                method === 'sepa_eu'
                  ? 'bg-[#093e30] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'bg-[#041e17] border-[#144f3d] hover:bg-[#062c21]'
              }`}
            >
              <Globe className="w-4 h-4 text-[#38bdf8] mb-1" />
              <div className="font-bold text-xs text-white">Euro SEPA</div>
              <span className="text-[10px] text-[#8cb8a8]">SEPA Instant / Wire</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('uk_faster')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                method === 'uk_faster'
                  ? 'bg-[#093e30] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'bg-[#041e17] border-[#144f3d] hover:bg-[#062c21]'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#fae188] mb-1" />
              <div className="font-bold text-xs text-white">UK Faster Pay</div>
              <span className="text-[10px] text-[#8cb8a8]">Same-Day GBP</span>
            </button>

            <button
              type="button"
              onClick={() => setMethod('crypto_usdt')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                method === 'crypto_usdt'
                  ? 'bg-[#093e30] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'bg-[#041e17] border-[#144f3d] hover:bg-[#062c21]'
              }`}
            >
              <Coins className="w-4 h-4 text-[#10b981] mb-1" />
              <div className="font-bold text-xs text-white">USDT Payout</div>
              <span className="text-[10px] text-[#8cb8a8]">TRC20 / ERC20</span>
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="emerald-card rounded-3xl p-6 sm:p-7 border border-[#d4af37]/30 space-y-4 shadow-xl"
          >
            <div>
              <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                Source Account (Debit)
              </label>
              <select
                value={sourceAccountId}
                onChange={(e) => setSourceAccountId(e.target.value)}
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
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-[#a2cbbe]">
                  Withdrawal Amount (USD)
                </label>
                <span className="text-[11px] text-[#fae188] font-mono">
                  Daily Limit: {formatMoney(dailyLimit)}
                </span>
              </div>
              <input
                type="number"
                min="10"
                max={dailyLimit}
                step="1"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* US Bank Specific Inputs */}
            {method === 'us_bank' && (
              <div className="space-y-4 pt-2 border-t border-[#0d3f32]">
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                    Destination US Bank Name
                  </label>
                  <input
                    type="text"
                    required
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g. JPMorgan Chase, Bank of America, Wells Fargo"
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                    Account Holder Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={accountHolder}
                    onChange={(e) => setAccountHolder(e.target.value)}
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                      Routing Number (9 Digits ABA)
                    </label>
                    <input
                      type="text"
                      required
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value)}
                      placeholder="021000021"
                      className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      required
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SEPA / EU Specific */}
            {method === 'sepa_eu' && (
              <div className="space-y-4 pt-2 border-t border-[#0d3f32]">
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                    IBAN (International Bank Account Number)
                  </label>
                  <input
                    type="text"
                    required
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                    placeholder="DE89 3704 0044 0532 0130 00"
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                    SWIFT / BIC Code
                  </label>
                  <input
                    type="text"
                    required
                    value={swiftBic}
                    onChange={(e) => setSwiftBic(e.target.value)}
                    placeholder="DEUTDEDDFXX"
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>
            )}

            {/* UK Faster Payments */}
            {method === 'uk_faster' && (
              <div className="space-y-4 pt-2 border-t border-[#0d3f32]">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                      UK Sort Code (6 Digits)
                    </label>
                    <input
                      type="text"
                      required
                      defaultValue="60-16-13"
                      className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                      UK Account Number (8 Digits)
                    </label>
                    <input
                      type="text"
                      required
                      defaultValue="31926819"
                      className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* USDT Crypto Payout */}
            {method === 'crypto_usdt' && (
              <div className="space-y-3 pt-2 border-t border-[#0d3f32]">
                <div className="flex items-center gap-3 mb-2">
                  {(['TRC20', 'ERC20'] as const).map((net) => (
                    <button
                      key={net}
                      type="button"
                      onClick={() => setCryptoNetwork(net)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        cryptoNetwork === net
                          ? 'bg-[#10b981] text-black font-extrabold'
                          : 'bg-[#041d16] text-[#8cb8a8] border border-[#0d3f32]'
                      }`}
                    >
                      {net} {net === 'TRC20' ? '(Lowest Fee - $0.50)' : '(Ethereum)'}
                    </button>
                  ))}
                </div>

                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Destination USDT ({cryptoNetwork}) Address
                </label>
                <input
                  type="text"
                  required
                  value={cryptoAddress}
                  onChange={(e) => setCryptoAddress(e.target.value)}
                  placeholder={cryptoNetwork === 'TRC20' ? 'T...' : '0x...'}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#031d16] font-display font-extrabold text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Review &amp; Request Payout</span>
            </button>
          </form>
        </div>

        {/* Right: Withdrawal KYC & Settlement Ledger (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Withdrawal KYC Compliance Card */}
          <div className="emerald-card rounded-3xl p-6 border border-[#d4af37]/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#0f4637]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#10b981]" />
                <h3 className="text-sm font-bold text-white">Withdrawal KYC Compliance</h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#6ee7b7] bg-[#10b981]/20 px-2 py-0.5 rounded-full">
                VERIFIED TIER {kycTier}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#02130e] border border-[#0d3f32]">
                <span className="text-[#8cb8a8]">Government ID Status:</span>
                <span className="text-[#6ee7b7] font-bold">✓ Approved (Passport / DL)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#02130e] border border-[#0d3f32]">
                <span className="text-[#8cb8a8]">AML Screening:</span>
                <span className="text-[#6ee7b7] font-bold">✓ Clear / No Sanctions</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#02130e] border border-[#0d3f32]">
                <span className="text-[#8cb8a8]">Bank Account Ownership:</span>
                <span className="text-[#6ee7b7] font-bold">✓ Matched to Legal Name</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#8cb8a8]">
              Need to withdraw more than $100,000 in a single wire? Contact institutional compliance for VIP settlement.
            </div>
          </div>

          {/* Quick Active Requests summary */}
          <div className="p-4 rounded-2xl bg-[#02130e] border border-[#0d3f32] space-y-3">
            <div className="text-xs font-bold text-white flex items-center justify-between">
              <span>Next Settlement Cycle</span>
              <span className="text-[10px] font-mono text-[#fae188]">ACH In-Flight: 24-72h</span>
            </div>
            <div className="w-full bg-[#073024] h-2 rounded-full overflow-hidden">
              <div className="bg-[#10b981] h-full rounded-full w-3/4 animate-pulse" />
            </div>
            <div className="flex justify-between text-[10px] text-[#71998b] font-mono">
              <span>Federal Reserve Rail: Active</span>
              <span>FedWire Cutoff: 17:00 EST</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* COMPREHENSIVE WITHDRAWAL HISTORY & AUDIT SETTLEMENT TABLE */}
      {/* ========================================================================= */}
      <div className="emerald-card rounded-3xl border border-[#d4af37]/30 overflow-hidden shadow-2xl space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#0f4637]">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#d4af37]" />
              <span>Withdrawal History &amp; Auditable Payout Ledger</span>
            </h3>
            <p className="text-xs text-[#8cb8a8] mt-0.5">
              Historical record of all ACH, Wire, SEPA, and USDT withdrawals with full cryptographic timestamps and receipts.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-[#02130e] border border-[#0d3f32] rounded-xl">
            {(['all', 'pending', 'completed'] as const).map((fil) => (
              <button
                key={fil}
                onClick={() => setHistoryFilter(fil)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold capitalize transition-all ${
                  historyFilter === fil
                    ? 'bg-[#d4af37] text-[#031d16] shadow-sm'
                    : 'text-[#8cb8a8] hover:text-white'
                }`}
              >
                {fil}
              </button>
            ))}
          </div>
        </div>

        {/* History Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#0d3f32] text-[11px] font-mono uppercase text-[#8cb8a8]">
                <th className="pb-3 pl-2">Reference ID</th>
                <th className="pb-3">Payout Method &amp; Destination</th>
                <th className="pb-3 text-right">Amount (USD)</th>
                <th className="pb-3 text-center">KYC &amp; AML Check</th>
                <th className="pb-3 text-center">Settlement Status</th>
                <th className="pb-3 text-right pr-2">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0d3f32]/60 text-xs">
              {filteredHistory.map((w) => (
                <tr key={w.id} className="hover:bg-[#072a20]/60 transition-colors">
                  {/* Reference & Date */}
                  <td className="py-4 pl-2">
                    <div className="font-mono font-bold text-white">{w.reference}</div>
                    <div className="text-[10px] text-[#8cb8a8] font-mono">{w.date}</div>
                  </td>

                  {/* Method & Destination */}
                  <td className="py-4">
                    <div className="font-bold text-white">{w.method}</div>
                    <div className="text-[11px] text-[#8cb8a8] font-mono">{w.destination}</div>
                  </td>

                  {/* Amount */}
                  <td className="py-4 text-right font-mono font-extrabold text-[#fae188] text-sm">
                    {formatMoney(w.amount)}
                  </td>

                  {/* KYC Verified */}
                  <td className="py-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40 font-mono text-[10px]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>KYC Passed</span>
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                        w.status === 'completed'
                          ? 'bg-[#10b981]/20 text-[#6ee7b7] border-[#10b981]/50'
                          : 'bg-[#d4af37]/20 text-[#fae188] border-[#d4af37]/50'
                      }`}
                    >
                      ● {w.status}
                    </span>
                  </td>

                  {/* Receipt Download */}
                  <td className="py-4 text-right pr-2">
                    <button
                      onClick={() => handleDownloadReceipt(w.reference, w.amount)}
                      className="p-2 rounded-xl bg-[#041d16] hover:bg-[#073024] text-[#fae188] border border-[#0d3f32] transition-colors"
                      title="Download Official Audit Receipt"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIRMATION & 2FA MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="emerald-card-highlight w-full max-w-md rounded-3xl p-6 sm:p-7 border border-[#d4af37]/50 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/20">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#d4af37]" />
                <span>Confirm Bank Withdrawal Authorization</span>
              </h3>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#041d16] border border-[#144f3d] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8cb8a8]">Payout Amount:</span>
                <span className="font-bold text-white font-mono">{formatMoney(Number(amount))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8cb8a8]">Method Rail:</span>
                <span className="font-bold text-white uppercase">{method.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8cb8a8]">KYC Tier Status:</span>
                <span className="font-bold text-[#6ee7b7]">Tier {kycTier} Verified</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#a2cbbe]">
                Enter 6-Digit Security 2FA / PIN
              </label>
              <input
                type="text"
                maxLength={6}
                value={twoFACode}
                onChange={(e) => setTwoFACode(e.target.value)}
                placeholder="123456"
                className="w-full text-center tracking-widest text-lg font-mono py-2.5 rounded-xl bg-[#041d16] border border-[#d4af37] text-white focus:outline-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="w-1/3 py-2.5 rounded-xl bg-[#062c20] text-white text-xs font-semibold hover:bg-[#093e30]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFinalConfirm}
                className="w-2/3 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs shadow-md hover:scale-105 transition-all"
              >
                Confirm &amp; Dispatch Payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
