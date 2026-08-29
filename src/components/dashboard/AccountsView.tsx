import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CreditCard,
  Plus,
  ArrowRightLeft,
  ArrowDownLeft,
  ArrowUpRight,
  PiggyBank,
  TrendingUp,
  Coins,
  Copy,
  Check,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { AccountType } from '../../types';

export const AccountsView: React.FC = () => {
  const {
    accounts,
    createAccount,
    transferInternal,
    formatMoney,
    setCurrentRoute,
    showToast,
  } = useApp();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);

  // New account form
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState<AccountType>('checking');
  const [accountCurrency, setAccountCurrency] = useState('USD');

  // Transfer form
  const [sourceAccountId, setSourceAccountId] = useState(accounts[0]?.id || '');
  const [targetAccountId, setTargetAccountId] = useState(accounts[1]?.id || '');
  const [transferAmount, setTransferAmount] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    showToast({
      title: 'Copied to Clipboard',
      message: `Account number ${text} copied.`,
      type: 'info',
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName) return;
    createAccount(accountName, accountType, accountCurrency);
    setCreateModalOpen(false);
    setAccountName('');
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(transferAmount);
    if (!amount || amount <= 0) return;
    transferInternal(sourceAccountId, targetAccountId, amount);
    setTransferModalOpen(false);
    setTransferAmount('');
  };

  const getAccountIcon = (type: AccountType) => {
    switch (type) {
      case 'checking':
        return <CreditCard className="w-6 h-6 text-[#d4af37]" />;
      case 'savings':
        return <PiggyBank className="w-6 h-6 text-[#10b981]" />;
      case 'investment':
        return <TrendingUp className="w-6 h-6 text-[#38bdf8]" />;
      case 'crypto':
        return <Coins className="w-6 h-6 text-[#fae188]" />;
    }
  };

  return (
    <div className="space-y-6" id="tethra-accounts-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d4af37]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            My Accounts &amp; Ledger
          </h1>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Manage segregated checking, savings, investment, and crypto custody accounts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setTransferModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0b4737] hover:bg-[#12644f] text-white border border-[#227f67] text-xs font-semibold"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Internal Transfer</span>
          </button>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl gold-gradient-bg text-[#031d16] text-xs font-bold shadow-md hover:scale-105 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Account</span>
          </button>
        </div>
      </div>

      {/* Account Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="emerald-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-4 hover:border-[#d4af37] transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-[#05261d] border border-[#14533e]">
                {getAccountIcon(acc.type)}
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#fae188] font-bold">
                {acc.type}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white group-hover:text-[#fae188] transition-colors">
                {acc.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-mono text-[#8cb8a8]">{acc.accountNumber}</span>
                <button
                  onClick={() => handleCopy(acc.accountNumber)}
                  className="text-[#8cb8a8] hover:text-white p-0.5"
                  title="Copy Account Number"
                >
                  {copiedId === acc.accountNumber ? (
                    <Check className="w-3 h-3 text-[#10b981]" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-[#0d3f32]">
              <div className="text-xs text-[#8cb8a8]">Current Balance</div>
              <div className="text-2xl font-display font-extrabold text-white mt-0.5">
                {formatMoney(acc.balance)}
              </div>
              <div className="text-[10px] text-[#71998b] font-mono mt-0.5">
                Currency: {acc.currency} • Status: {acc.status}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setCurrentRoute('deposit')}
                className="flex-1 py-1.5 rounded-lg bg-[#073024] hover:bg-[#0c4434] text-white text-[11px] font-semibold border border-[#1a5b4a]"
              >
                + Deposit
              </button>
              <button
                onClick={() => setCurrentRoute('withdraw')}
                className="flex-1 py-1.5 rounded-lg bg-[#073024] hover:bg-[#0c4434] text-[#fae188] text-[11px] font-semibold border border-[#1a5b4a]"
              >
                Withdraw
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE ACCOUNT MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="emerald-card-highlight w-full max-w-md rounded-2xl p-6 border border-[#d4af37]/50 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/20">
              <h3 className="text-base font-bold text-white">Create New Sub-Account</h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Account Name / Label
                </label>
                <input
                  type="text"
                  required
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="e.g. Tax Vault, Real Estate Fund"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Account Type
                </label>
                <select
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value as AccountType)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="checking">Checking (Liquid operational)</option>
                  <option value="savings">High-Yield Savings (5.4% APY Vault)</option>
                  <option value="investment">Investment Portfolio</option>
                  <option value="crypto">USDT Digital Custody</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Currency</label>
                <select
                  value={accountCurrency}
                  onChange={(e) => setAccountCurrency(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="PKR">PKR (₨)</option>
                  <option value="AED">AED (د.إ)</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-[#062c20] text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs shadow-md"
                >
                  Generate Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INTERNAL TRANSFER MODAL */}
      {transferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="emerald-card-highlight w-full max-w-md rounded-2xl p-6 border border-[#d4af37]/50 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/20">
              <h3 className="text-base font-bold text-white">Zero-Fee Internal Transfer</h3>
              <button
                onClick={() => setTransferModalOpen(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleTransferSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Source Account (From)
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
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Target Account (To)
                </label>
                <select
                  value={targetAccountId}
                  onChange={(e) => setTargetAccountId(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                >
                  {accounts
                    .filter((acc) => acc.id !== sourceAccountId)
                    .map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.name} ({formatMoney(acc.balance)})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Transfer Amount (USD)
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  required
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="e.g. 500.00"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTransferModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-[#062c20] text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs shadow-md"
                >
                  Execute Instant Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
