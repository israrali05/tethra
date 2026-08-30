import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  Users,
  ArrowDownLeft,
  ArrowUpRight,
  UserCheck,
  Settings,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Percent,
  Sparkles,
  Building2,
  Coins,
  Search,
  Filter,
  PlusCircle,
  MinusCircle,
  Lock,
  Unlock,
  Eye,
  Gift,
  RefreshCw,
  AlertTriangle,
  Globe,
  Landmark,
  Check,
  Sliders,
  Send,
  Zap,
} from 'lucide-react';
import { ALL_BANK_PRESETS } from '../../data/banksData';
import { User, FinancialAccount, WithdrawalRequest, ReferralRecord } from '../../types';
import { BackendConsoleView } from '../dashboard/BackendConsoleView';

export const AdminPortal: React.FC = () => {
  const {
    users,
    currentUser,
    accounts,
    withdrawals,
    transactions,
    referrals,
    config,
    updateConfig,
    approveWithdrawal,
    rejectWithdrawal,
    adminApproveAllPendingWithdrawals,
    adminAddFunds,
    adminDeductFunds,
    adminSetAccountBalance,
    adminApproveBonus,
    adminRejectBonus,
    adminIssueCustomBonus,
    adminBatchApproveBonuses,
    adminDistributeDailyBonusToAllUsers,
    adminToggleAccountStatus,
    adminUpdateUserKYC,
    adminDeleteUser,
    approveKYC,
    rejectKYC,
    switchUser,
    formatMoney,
    auditLogs,
    showToast,
    triggerCelebration,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'withdrawals' | 'users' | 'bonuses' | 'kyc' | 'rates' | 'logs' | 'backend-api'
  >('users');

  // Search & Filter States
  const [userSearch, setUserSearch] = useState('');
  const [userFilterRole, setUserFilterRole] = useState<'all' | 'user' | 'admin'>('all');
  const [withdrawalRegionFilter, setWithdrawalRegionFilter] = useState<'all' | 'us' | 'eu' | 'uk' | 'crypto'>('all');
  const [withdrawalStatusFilter, setWithdrawalStatusFilter] = useState<'all' | 'pending' | 'completed' | 'rejected'>('all');
  const [bonusFilter, setBonusFilter] = useState<'all' | 'pending' | 'rewarded'>('all');

  // Money Adjustment Modal State
  const [selectedUserForMoney, setSelectedUserForMoney] = useState<User | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [moneyActionType, setMoneyActionType] = useState<'credit' | 'debit' | 'set_balance'>('credit');
  const [moneyAmount, setMoneyAmount] = useState<string>('500');
  const [moneyCategory, setMoneyCategory] = useState<string>('Administrative Credit');
  const [moneyNotes, setMoneyNotes] = useState<string>('Direct executive ledger allocation');
  const [showMoneyModal, setShowMoneyModal] = useState(false);

  // Custom Bonus Grant Modal State
  const [showCustomBonusModal, setShowCustomBonusModal] = useState(false);
  const [bonusTargetUserId, setBonusTargetUserId] = useState<string>(users[0]?.id || '');
  const [bonusAmount, setBonusAmount] = useState<string>('25');
  const [bonusType, setBonusType] = useState<string>('Welcome Bonus Grant');
  const [bonusReason, setBonusReason] = useState<string>('VIP referral & promotional incentive');

  // Rejection Modal State for Withdrawals
  const [rejectWithdrawalId, setRejectWithdrawalId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('Compliance & identity mismatch');
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Global Daily Bonus Modal State
  const [showGlobalBonusModal, setShowGlobalBonusModal] = useState(false);
  const [globalBonusPercentage, setGlobalBonusPercentage] = useState<string>('2.0');
  const [globalBonusExecuting, setGlobalBonusExecuting] = useState(false);

  // Rate config form state
  const [savingsRate, setSavingsRate] = useState(
    (config?.savingsApyRate ?? config?.illustrativeSavingsRateAPY ?? 5.4).toString()
  );
  const [dailyCap, setDailyCap] = useState(
    (config?.dailyWithdrawalCap ?? config?.maxWithdrawalUSD ?? 50000).toString()
  );
  const [referralBonusAmt, setReferralBonusAmt] = useState(
    (config?.referralRewardAmount ?? 25).toString()
  );
  const [kycEnforced, setKycEnforced] = useState(config?.kycEnforced ?? true);

  // Calculate platform totals
  const totalPlatformBalances = accounts.reduce((sum, a) => sum + (a.balance || 0), 0);
  const pendingWithdrawals = withdrawals.filter(
    (w) => w.status === 'pending' || w.status === 'processing'
  );
  const pendingBonuses = referrals.filter(
    (r) => r.status === 'pending' || r.status === 'qualified'
  );
  const pendingKYCUsers = users.filter((u) => u.kycStatus === 'pending' || u.kycStatus === 'not_started');

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      illustrativeSavingsRateAPY: Number(savingsRate) || 5.4,
      savingsApyRate: Number(savingsRate) || 5.4,
      maxWithdrawalUSD: Number(dailyCap) || 50000,
      dailyWithdrawalCap: Number(dailyCap) || 50000,
      referralRewardAmount: Number(referralBonusAmt) || 25,
      kycEnforced,
    });
  };

  const handleExecuteMoneyAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForMoney || !selectedAccountId) return;
    const amt = parseFloat(moneyAmount);
    if (isNaN(amt) || amt <= 0) {
      showToast('Invalid Amount', 'Please enter a positive numeric value.', 'error');
      return;
    }

    if (moneyActionType === 'credit') {
      adminAddFunds(selectedUserForMoney.id, selectedAccountId, amt, moneyCategory, moneyNotes);
    } else if (moneyActionType === 'debit') {
      adminDeductFunds(selectedUserForMoney.id, selectedAccountId, amt, moneyCategory, moneyNotes);
    } else {
      adminSetAccountBalance(selectedUserForMoney.id, selectedAccountId, amt, moneyNotes);
    }

    setShowMoneyModal(false);
  };

  const handleExecuteCustomBonus = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(bonusAmount);
    if (isNaN(amt) || amt <= 0) {
      showToast('Invalid Amount', 'Please enter a valid bonus amount.', 'error');
      return;
    }

    adminIssueCustomBonus(bonusTargetUserId, amt, bonusType, bonusReason);
    setShowCustomBonusModal(false);
  };

  const handleConfirmRejectWithdrawal = () => {
    if (rejectWithdrawalId) {
      rejectWithdrawal(rejectWithdrawalId, rejectionReason);
      setShowRejectModal(false);
      setRejectWithdrawalId(null);
    }
  };

  // Filtered users
  const filteredUsers = users.filter((u) => {
    if (userFilterRole !== 'all' && u.role !== userFilterRole) return false;
    if (userSearch.trim()) {
      const q = userSearch.toLowerCase();
      return (
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.uniqueUserId.toLowerCase().includes(q) ||
        u.country.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered withdrawals
  const filteredWithdrawals = withdrawals.filter((w) => {
    if (withdrawalStatusFilter !== 'all') {
      if (withdrawalStatusFilter === 'pending' && w.status !== 'pending' && w.status !== 'processing') return false;
      if (withdrawalStatusFilter === 'completed' && w.status !== 'completed') return false;
      if (withdrawalStatusFilter === 'rejected' && w.status !== 'rejected') return false;
    }

    if (withdrawalRegionFilter !== 'all') {
      const m = (w.method || '').toLowerCase();
      const dest = JSON.stringify(w.destinationDetails || {}).toLowerCase();
      if (withdrawalRegionFilter === 'us' && !m.includes('us') && !m.includes('ach') && !dest.includes('united states') && !dest.includes('routing')) return false;
      if (withdrawalRegionFilter === 'eu' && !m.includes('sepa') && !m.includes('eur') && !dest.includes('iban')) return false;
      if (withdrawalRegionFilter === 'uk' && !m.includes('uk') && !m.includes('faster') && !dest.includes('sort')) return false;
      if (withdrawalRegionFilter === 'crypto' && !m.includes('usdt') && !m.includes('crypto')) return false;
    }

    return true;
  });

  // Filtered referrals / bonuses
  const filteredReferrals = referrals.filter((r) => {
    if (bonusFilter === 'pending') return r.status === 'pending' || r.status === 'qualified';
    if (bonusFilter === 'rewarded') return r.status === 'rewarded';
    return true;
  });

  return (
    <div className="space-y-8" id="tethra-admin-portal">
      {/* Header */}
      <div className="pb-4 border-b border-[#d4af37]/20 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-950/90 via-purple-950/80 to-red-950/90 border border-[#d4af37]/50 text-[#fae188] font-mono text-xs font-bold mb-2 shadow-lg">
            <ShieldAlert className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span>FULL EXECUTIVE GOD-MODE &amp; CUSTODIAL LEDGER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Executive Admin Control Center
          </h1>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Complete administrative power over user balances, $25 referral bonuses, global bank dispatches (USA, Europe, UK), and compliance security.
          </p>
        </div>

        {/* Executive Stats Summary Badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="px-3.5 py-2 rounded-2xl bg-[#031d16] border border-[#d4af37]/40 text-xs font-mono shadow-md">
            <span className="text-[#8cb8a8]">Total Custody Assets: </span>
            <span className="font-extrabold text-[#fae188] ml-1">{formatMoney(totalPlatformBalances)}</span>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-[#031d16] border border-amber-500/40 text-xs font-mono shadow-md">
            <span className="text-[#8cb8a8]">Pending Payouts: </span>
            <span className="font-bold text-amber-300 ml-1">{pendingWithdrawals.length}</span>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-[#031d16] border border-[#10b981]/40 text-xs font-mono shadow-md">
            <span className="text-[#8cb8a8]">Pending Bonuses: </span>
            <span className="font-bold text-[#6ee7b7] ml-1">{pendingBonuses.length}</span>
          </div>
        </div>
      </div>

      {/* Quick Action Bar for Admin */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#041d16] via-[#093e30] to-[#041d16] border border-[#d4af37]/40 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#fae188]">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Quick Executive Operations</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#10b981]/20 text-[#6ee7b7] font-mono">
                LIVE LEDGER
              </span>
            </div>
            <p className="text-[11px] text-[#a0c5b9]">
              Instantly adjust user balances, batch approve referral rewards, or dispatch bank settlements.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowGlobalBonusModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow hover:scale-105"
            title="Add 2% daily bonus earning to every active user simultaneously"
          >
            <Percent className="w-3.5 h-3.5" />
            <span>+ 2% Daily Bonus to All Users</span>
          </button>

          <button
            onClick={() => setShowCustomBonusModal(true)}
            className="px-3 py-1.5 rounded-xl bg-[#031d16] hover:bg-[#073024] border border-[#d4af37]/50 text-[#fae188] font-bold text-xs flex items-center gap-1.5 transition-all shadow"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Grant Bonus</span>
          </button>

          {pendingBonuses.length > 0 && (
            <button
              onClick={adminBatchApproveBonuses}
              className="px-3 py-1.5 rounded-xl gold-gradient-bg text-[#031d16] font-extrabold text-xs flex items-center gap-1.5 transition-all shadow hover:scale-105"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Approve All Bonuses ({pendingBonuses.length})</span>
            </button>
          )}

          {pendingWithdrawals.length > 0 && (
            <button
              onClick={adminApproveAllPendingWithdrawals}
              className="px-3 py-1.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-extrabold text-xs flex items-center gap-1.5 transition-all shadow hover:scale-105"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Batch Dispatch Payouts ({pendingWithdrawals.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <div className="flex gap-2 border-b border-[#0f4637] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'users'
              ? 'bg-[#093e30] text-white border border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'text-[#8cb8a8] hover:text-white hover:bg-[#042018]'
          }`}
        >
          <Users className="w-4 h-4 text-[#fae188]" />
          <span>User Balances &amp; Money Control ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bonuses')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'bonuses'
              ? 'bg-[#093e30] text-white border border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'text-[#8cb8a8] hover:text-white hover:bg-[#042018]'
          }`}
        >
          <Gift className="w-4 h-4 text-[#10b981]" />
          <span>Bonus Approvals &amp; $25 Rewards ({pendingBonuses.length} Pending)</span>
        </button>

        <button
          onClick={() => setActiveTab('withdrawals')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'withdrawals'
              ? 'bg-[#093e30] text-white border border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'text-[#8cb8a8] hover:text-white hover:bg-[#042018]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#38bdf8]" />
          <span>Bank Payout Queue ({pendingWithdrawals.length} Pending)</span>
        </button>

        <button
          onClick={() => setActiveTab('kyc')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'kyc'
              ? 'bg-[#093e30] text-white border border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'text-[#8cb8a8] hover:text-white hover:bg-[#042018]'
          }`}
        >
          <UserCheck className="w-4 h-4 text-[#d4af37]" />
          <span>KYC Compliance Dossiers</span>
        </button>

        <button
          onClick={() => setActiveTab('rates')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'rates'
              ? 'bg-[#093e30] text-white border border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'text-[#8cb8a8] hover:text-white hover:bg-[#042018]'
          }`}
        >
          <Sliders className="w-4 h-4 text-[#fae188]" />
          <span>Yield Rates &amp; Parameters</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'logs'
              ? 'bg-[#093e30] text-white border border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'text-[#8cb8a8] hover:text-white hover:bg-[#042018]'
          }`}
        >
          <FileText className="w-4 h-4 text-[#a0c5b9]" />
          <span>Audit Trail ({auditLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('backend-api')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'backend-api'
              ? 'bg-[#093e30] text-white border border-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'text-[#10b981] hover:text-white hover:bg-[#042018] border border-[#10b981]/30'
          }`}
        >
          <Zap className="w-4 h-4 text-[#10b981]" />
          <span>Express Backend API &amp; Yield Cron</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: USER BALANCES & MONEY CONTROL (GOD MODE)                           */}
      {/* ========================================================================= */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Search & Filter Toolbar */}
          <div className="emerald-card rounded-2xl p-4 border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-[#8cb8a8] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search user by name, email, ID, or country..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full bg-[#031711] border border-[#144f3d] rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <span className="text-xs text-[#8cb8a8]">Role Filter:</span>
              <div className="flex rounded-xl bg-[#031711] p-1 border border-[#144f3d]">
                {(['all', 'user', 'admin'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setUserFilterRole(r)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                      userFilterRole === r
                        ? 'bg-[#093e30] text-[#fae188] font-bold shadow'
                        : 'text-[#8cb8a8] hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User Financial Dossier Table */}
          <div className="emerald-card rounded-2xl border border-[#d4af37]/30 overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#02130e] border-b border-[#0f4637] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">All Platform User Accounts &amp; Financial Holdings</h3>
                <p className="text-[11px] text-[#8cb8a8]">
                  Click "⚡ Modify Balances" on any user to add or deduct money, grant custom grants, or adjust vaults.
                </p>
              </div>
              <span className="text-xs font-mono text-[#fae188]">
                Showing {filteredUsers.length} of {users.length} Users
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#02130e] text-[#8cb8a8] uppercase font-mono text-[10px] tracking-wider border-b border-[#0f4637]">
                  <tr>
                    <th className="py-3.5 px-4">Member / ID</th>
                    <th className="py-3.5 px-4">Location / KYC</th>
                    <th className="py-3.5 px-4">Total Portfolio</th>
                    <th className="py-3.5 px-4">Accounts Breakdown</th>
                    <th className="py-3.5 px-4">Account Status</th>
                    <th className="py-3.5 px-4 text-right">Administrative Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0c392c]">
                  {filteredUsers.map((u) => {
                    const userAccs = accounts.filter((a) => a.userId === u.id);
                    const userTotal = userAccs.reduce((sum, a) => sum + (a.balance || 0), 0);
                    const checkingAcc = userAccs.find((a) => a.type === 'checking') || userAccs[0];
                    const savingsAcc = userAccs.find((a) => a.type === 'savings');
                    const isFrozen = userAccs.some((a) => a.status === 'frozen');

                    return (
                      <tr key={u.id} className="hover:bg-[#062c21] transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={u.avatarUrl}
                              alt={u.firstName}
                              className="w-10 h-10 rounded-xl object-cover border border-[#d4af37]/30"
                            />
                            <div>
                              <div className="font-bold text-white text-sm flex items-center gap-1.5">
                                <span>{u.firstName} {u.lastName}</span>
                                {u.role === 'admin' && (
                                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 font-mono border border-purple-500/30">
                                    ADMIN
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-[#8cb8a8] font-mono">{u.email}</div>
                              <div className="text-[10px] text-[#5c8b7c] font-mono">{u.uniqueUserId}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="space-y-1">
                            <div className="text-white font-medium flex items-center gap-1">
                              <Globe className="w-3 h-3 text-[#38bdf8]" />
                              <span>{u.country}</span>
                            </div>
                            <div>
                              <span
                                className={`text-[9px] px-2 py-0.5 rounded font-mono uppercase font-bold ${
                                  u.kycStatus === 'verified'
                                    ? 'bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/30'
                                    : u.kycStatus === 'pending'
                                    ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-500/30'
                                    : 'bg-red-900/30 text-red-300'
                                }`}
                              >
                                ● KYC: {u.kycStatus}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono">
                          <div className="text-base font-extrabold text-[#fae188]">
                            {formatMoney(userTotal)}
                          </div>
                          <div className="text-[10px] text-[#71998b]">
                            {userAccs.length} Active Ledger Vaults
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[11px]">
                          <div className="space-y-1 text-[#8cb8a8]">
                            {checkingAcc && (
                              <div>
                                <span className="text-white">Checking: </span>
                                <span className="text-[#6ee7b7] font-bold">{formatMoney(checkingAcc.balance)}</span>
                              </div>
                            )}
                            {savingsAcc && (
                              <div>
                                <span className="text-white">Savings: </span>
                                <span className="text-[#fae188] font-bold">{formatMoney(savingsAcc.balance)}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`text-[10px] px-2 py-1 rounded-full font-mono font-bold uppercase inline-flex items-center gap-1 ${
                              isFrozen
                                ? 'bg-red-950 text-red-300 border border-red-500/40'
                                : 'bg-[#063124] text-[#10b981] border border-[#10b981]/40'
                            }`}
                          >
                            {isFrozen ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                            <span>{isFrozen ? 'Frozen' : 'Active'}</span>
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedUserForMoney(u);
                                setSelectedAccountId(checkingAcc?.id || userAccs[0]?.id || '');
                                setShowMoneyModal(true);
                              }}
                              className="px-3 py-1.5 rounded-xl gold-gradient-bg text-[#031d16] font-extrabold text-xs shadow hover:scale-105 transition-all flex items-center gap-1"
                              title="Add or Remove Money from this User"
                            >
                              <DollarSign className="w-3.5 h-3.5" />
                              <span>Modify Money</span>
                            </button>

                            <button
                              onClick={() => {
                                if (checkingAcc) {
                                  adminToggleAccountStatus(checkingAcc.id);
                                }
                              }}
                              className={`p-1.5 rounded-xl border text-xs transition-all ${
                                isFrozen
                                  ? 'bg-[#063124] text-[#10b981] border-[#10b981]'
                                  : 'bg-red-950 hover:bg-red-900 text-red-200 border-red-500/40'
                              }`}
                              title={isFrozen ? 'Unfreeze Accounts' : 'Freeze Accounts'}
                            >
                              {isFrozen ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                            </button>

                            <button
                              onClick={() => switchUser(u.id)}
                              className="p-1.5 rounded-xl bg-[#041f17] hover:bg-[#073024] text-[#8cb8a8] hover:text-white border border-[#144f3d] transition-all"
                              title="Preview Live Dashboard as this User"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: BONUS APPROVALS & $25 REFERRAL REWARDS HUB                         */}
      {/* ========================================================================= */}
      {activeTab === 'bonuses' && (
        <div className="space-y-6">
          {/* Header & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="emerald-card rounded-2xl p-5 border border-[#d4af37]/30">
              <div className="text-xs text-[#8cb8a8] font-mono">Standard Referral Reward</div>
              <div className="text-2xl font-display font-extrabold text-[#fae188] mt-1">$25.00 USD</div>
              <div className="text-[11px] text-[#71998b] mt-1">Credited to referrer upon compliance approval</div>
            </div>

            <div className="emerald-card rounded-2xl p-5 border border-[#10b981]/30">
              <div className="text-xs text-[#8cb8a8] font-mono">Pending Bonus Claims</div>
              <div className="text-2xl font-display font-extrabold text-[#6ee7b7] mt-1">{pendingBonuses.length}</div>
              <div className="text-[11px] text-[#71998b] mt-1">Awaiting admin one-click verification</div>
            </div>

            <div className="emerald-card rounded-2xl p-5 border border-[#38bdf8]/30">
              <div className="text-xs text-[#8cb8a8] font-mono">Total Rewarded to Date</div>
              <div className="text-2xl font-display font-extrabold text-[#38bdf8] mt-1">
                {formatMoney(referrals.filter((r) => r.status === 'rewarded').length * 25)}
              </div>
              <div className="text-[11px] text-[#71998b] mt-1">Paid directly into user checking accounts</div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="emerald-card rounded-2xl p-4 border border-[#d4af37]/30 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8cb8a8]">Filter Status:</span>
              {(['all', 'pending', 'rewarded'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setBonusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                    bonusFilter === st
                      ? 'bg-[#093e30] text-[#fae188] font-bold border border-[#d4af37]/40'
                      : 'text-[#8cb8a8] hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowGlobalBonusModal(true)}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs flex items-center gap-1.5 shadow transition-all hover:scale-105"
              >
                <Percent className="w-4 h-4" />
                <span>Distribute 2% Daily Bonus to All Users</span>
              </button>

              <button
                onClick={() => setShowCustomBonusModal(true)}
                className="px-3.5 py-2 rounded-xl bg-[#031d16] hover:bg-[#073024] text-[#fae188] border border-[#d4af37]/50 text-xs font-bold flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Issue Custom Bonus to Any User</span>
              </button>

              {pendingBonuses.length > 0 && (
                <button
                  onClick={adminBatchApproveBonuses}
                  className="px-4 py-2 rounded-xl gold-gradient-bg text-[#031d16] font-extrabold text-xs flex items-center gap-1.5 shadow hover:scale-105 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Batch Approve All ({pendingBonuses.length})</span>
                </button>
              )}
            </div>
          </div>

          {/* Bonus Approvals Table */}
          <div className="emerald-card rounded-2xl border border-[#d4af37]/30 overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#02130e] border-b border-[#0f4637] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Referral Reward Claims &amp; Qualification Ledger</h3>
              <span className="text-xs font-mono text-[#8cb8a8]">
                {filteredReferrals.length} Bonus Records
              </span>
            </div>

            <div className="divide-y divide-[#0c392c]">
              {filteredReferrals.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#71998b]">
                  No referral bonus records found matching filter.
                </div>
              ) : (
                filteredReferrals.map((ref) => {
                  const referrerUser = users.find((u) => u.id === ref.referrerUserId);
                  const isRewarded = ref.status === 'rewarded';

                  return (
                    <div
                      key={ref.id}
                      className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#062c21] transition-colors"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <span className="text-base font-extrabold text-[#fae188]">
                            ${ref.rewardAmount || 25}.00 USD
                          </span>
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded font-mono uppercase font-bold ${
                              isRewarded
                                ? 'bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/30'
                                : 'bg-yellow-900/40 text-yellow-300 border border-yellow-500/30'
                            }`}
                          >
                            ● {ref.status}
                          </span>
                          <span className="text-[10px] text-[#8cb8a8] font-mono">
                            Joined: {ref.joinedDate}
                          </span>
                        </div>

                        <div className="text-xs text-white">
                          <strong className="text-[#a0c5b9]">Referrer (Reward Recipient):</strong>{' '}
                          {referrerUser ? `${referrerUser.firstName} ${referrerUser.lastName} (${referrerUser.email})` : ref.referrerUserId}
                        </div>

                        <div className="text-xs text-[#8cb8a8]">
                          <strong className="text-[#a0c5b9]">Referred Member:</strong> {ref.referredName} ({ref.referredEmail})
                        </div>

                        <div className="text-[11px] text-[#638e7f] font-mono">
                          Criteria: {ref.qualificationCriteria}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {!isRewarded ? (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => adminRejectBonus(ref.id, 'Disqualified - Incomplete KYC or duplicate')}
                            className="px-3 py-2 rounded-xl bg-red-950 hover:bg-red-900 text-red-200 border border-red-500/40 text-xs font-bold"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => adminApproveBonus(ref.id)}
                            className="px-4 py-2 rounded-xl gold-gradient-bg text-[#031d16] text-xs font-extrabold shadow hover:scale-105 transition-transform flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Approve &amp; Deposit $25</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-[#6ee7b7] font-mono bg-[#052b1f] px-3 py-1.5 rounded-xl border border-[#10b981]/30">
                          <Check className="w-4 h-4" />
                          <span>Paid &amp; Credited to Checking Vault</span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: BANK PAYOUT QUEUE (ALL USA, EUROPE & UK BANKS)                     */}
      {/* ========================================================================= */}
      {activeTab === 'withdrawals' && (
        <div className="space-y-6">
          {/* Region and Status Filters */}
          <div className="emerald-card rounded-2xl p-4 border border-[#d4af37]/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#8cb8a8]">Filter Region / Bank Type:</span>
              {[
                { key: 'all', label: 'All Global Payouts' },
                { key: 'us', label: 'USA Banks (ACH / FedWire)' },
                { key: 'eu', label: 'Euro SEPA / Instant' },
                { key: 'uk', label: 'UK Faster Payments' },
                { key: 'crypto', label: 'USDT Crypto' },
              ].map((r) => (
                <button
                  key={r.key}
                  onClick={() => setWithdrawalRegionFilter(r.key as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    withdrawalRegionFilter === r.key
                      ? 'bg-[#093e30] text-[#fae188] font-bold border border-[#d4af37]/40'
                      : 'text-[#8cb8a8] hover:text-white hover:bg-[#042018]'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8cb8a8]">Status:</span>
              {(['all', 'pending', 'completed', 'rejected'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setWithdrawalStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                    withdrawalStatusFilter === st
                      ? 'bg-[#093e30] text-[#fae188] font-bold'
                      : 'text-[#8cb8a8] hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Payout Queue Records */}
          <div className="emerald-card rounded-2xl border border-[#d4af37]/30 overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#02130e] border-b border-[#0f4637] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Multi-Region Institutional Bank Payout Queue
                </h3>
                <p className="text-[11px] text-[#8cb8a8]">
                  Verified dispatches for all USA Banks (JPMorgan, BoA, Wells Fargo, Citi), European Banks (BNP, Deutsche Bank, Santander), UK Banks (Barclays, HSBC, Lloyds, NatWest), and USDT.
                </p>
              </div>

              {pendingWithdrawals.length > 0 && (
                <button
                  onClick={adminApproveAllPendingWithdrawals}
                  className="px-3.5 py-1.5 rounded-xl gold-gradient-bg text-[#031d16] font-extrabold text-xs flex items-center gap-1.5 shadow hover:scale-105 transition-all"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Batch Dispatch All ({pendingWithdrawals.length})</span>
                </button>
              )}
            </div>

            <div className="divide-y divide-[#0c392c]">
              {filteredWithdrawals.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#71998b]">
                  No withdrawal requests found matching selected filter criteria.
                </div>
              ) : (
                filteredWithdrawals.map((w) => {
                  const targetUser = users.find((u) => u.id === w.userId);
                  const isPending = w.status === 'pending' || w.status === 'processing';
                  const details = w.destinationDetails || {};

                  return (
                    <div
                      key={w.id}
                      className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:bg-[#062c21] transition-colors"
                    >
                      <div className="space-y-2.5 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-extrabold text-white text-lg">
                            {formatMoney(w.amount)}
                          </span>
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#041f17] border border-[#144f3d] text-[#fae188] uppercase font-bold">
                            {w.method.replace(/_/g, ' ')}
                          </span>
                          <span
                            className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono uppercase font-bold ${
                              w.status === 'completed'
                                ? 'bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40'
                                : isPending
                                ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-500/40'
                                : 'bg-red-900/40 text-red-300'
                            }`}
                          >
                            ● {w.status}
                          </span>
                          <span className="text-[10px] text-[#71998b] font-mono">
                            Ref: {w.referenceNumber}
                          </span>
                        </div>

                        {/* User Identity Info */}
                        <div className="text-xs text-white flex items-center gap-2">
                          <span className="text-[#a0c5b9]">Account Owner:</span>
                          <span className="font-bold">{targetUser ? `${targetUser.firstName} ${targetUser.lastName}` : w.userId}</span>
                          <span className="text-[#8cb8a8] font-mono">({targetUser?.email})</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#0b382c] text-[#a0c5b9] font-mono">
                            KYC: {targetUser?.kycStatus?.toUpperCase() || 'VERIFIED'}
                          </span>
                        </div>

                        {/* Detailed Banking Routing Specs */}
                        <div className="p-3.5 rounded-xl bg-[#02140e] border border-[#0d3f32] text-xs font-mono grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-[#8cb8a8]">
                          {details.bankName && (
                            <div>
                              <span className="text-[#71998b] block text-[10px] uppercase">Bank Institution:</span>
                              <span className="text-white font-bold">{details.bankName}</span>
                            </div>
                          )}
                          {details.accountHolder && (
                            <div>
                              <span className="text-[#71998b] block text-[10px] uppercase">Account Holder:</span>
                              <span className="text-white">{details.accountHolder}</span>
                            </div>
                          )}
                          {details.routingNumber && (
                            <div>
                              <span className="text-[#71998b] block text-[10px] uppercase">US ABA Routing:</span>
                              <span className="text-[#fae188]">{details.routingNumber}</span>
                            </div>
                          )}
                          {details.accountNumber && (
                            <div>
                              <span className="text-[#71998b] block text-[10px] uppercase">Account Number:</span>
                              <span className="text-white">{details.accountNumber}</span>
                            </div>
                          )}
                          {details.iban && (
                            <div>
                              <span className="text-[#71998b] block text-[10px] uppercase">Euro IBAN:</span>
                              <span className="text-[#fae188]">{details.iban}</span>
                            </div>
                          )}
                          {details.swiftBic && (
                            <div>
                              <span className="text-[#71998b] block text-[10px] uppercase">SWIFT / BIC:</span>
                              <span className="text-white">{details.swiftBic}</span>
                            </div>
                          )}
                          {details.sortCode && (
                            <div>
                              <span className="text-[#71998b] block text-[10px] uppercase">UK Sort Code:</span>
                              <span className="text-[#fae188]">{details.sortCode}</span>
                            </div>
                          )}
                          {details.walletAddress && (
                            <div className="sm:col-span-2">
                              <span className="text-[#71998b] block text-[10px] uppercase">USDT Wallet Address ({details.cryptoNetwork || 'TRC20'}):</span>
                              <span className="text-[#6ee7b7] break-all">{details.walletAddress}</span>
                            </div>
                          )}
                        </div>

                        <div className="text-[10px] text-[#71998b] font-mono flex items-center gap-3">
                          <span>Created: {new Date(w.createdAt).toLocaleString()}</span>
                          <span>•</span>
                          <span>Net Dispatched: {formatMoney(w.netAmount || w.amount)}</span>
                          <span>•</span>
                          <span>Settlement: {w.estimatedCompletion || '1-3 Business Days'}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      {isPending && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              setRejectWithdrawalId(w.id);
                              setShowRejectModal(true);
                            }}
                            className="px-3.5 py-2.5 rounded-xl bg-red-950 hover:bg-red-900 text-red-200 border border-red-500/40 text-xs font-bold transition-colors"
                          >
                            Reject &amp; Refund
                          </button>

                          <button
                            onClick={() => approveWithdrawal(w.id)}
                            className="px-4 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] text-xs font-extrabold shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Approve &amp; Dispatch Settlement</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: KYC REVIEWS                                                        */}
      {/* ========================================================================= */}
      {activeTab === 'kyc' && (
        <div className="space-y-4">
          <div className="emerald-card rounded-2xl border border-[#d4af37]/30 overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#02130e] border-b border-[#0f4637]">
              <h3 className="text-sm font-bold text-white">
                Member KYC &amp; AML Identity Verification Dossiers
              </h3>
            </div>

            <div className="divide-y divide-[#0c392c]">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#062c21] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={u.avatarUrl}
                      alt={u.firstName}
                      className="w-12 h-12 rounded-xl object-cover border border-[#d4af37]/40"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">
                          {u.firstName} {u.lastName}
                        </h4>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded font-mono uppercase font-bold ${
                            u.kycStatus === 'verified'
                              ? 'bg-[#10b981]/20 text-[#6ee7b7]'
                              : u.kycStatus === 'pending'
                              ? 'bg-yellow-900/40 text-yellow-300'
                              : 'bg-red-900/40 text-red-300'
                          }`}
                        >
                          ● {u.kycStatus}
                        </span>
                      </div>
                      <div className="text-xs text-[#8cb8a8] font-mono">
                        {u.email} • {u.city}, {u.country}
                      </div>
                      <div className="text-[10px] text-[#71998b] font-mono">
                        Tier 2 Verification • User ID: {u.uniqueUserId}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => adminUpdateUserKYC(u.id, 'rejected')}
                      className="px-3 py-1.5 rounded-xl bg-red-950 hover:bg-red-900 text-red-200 border border-red-500/40 text-xs font-bold"
                    >
                      Decline KYC
                    </button>
                    <button
                      onClick={() => adminUpdateUserKYC(u.id, 'verified')}
                      className="px-4 py-1.5 rounded-xl gold-gradient-bg text-[#031d16] text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Verify &amp; Unlock Tier 2</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: SYSTEM CONFIG & APY                                                */}
      {/* ========================================================================= */}
      {activeTab === 'rates' && (
        <div className="max-w-2xl">
          <form
            onSubmit={handleSaveConfig}
            className="emerald-card rounded-3xl p-6 sm:p-8 border border-[#d4af37]/30 space-y-6 shadow-2xl"
          >
            <h3 className="text-base font-bold text-white pb-3 border-b border-[#0f4637]">
              Platform Interest Rates &amp; Risk Parameters
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                Savings Vault APY Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={savingsRate}
                onChange={(e) => setSavingsRate(e.target.value)}
                className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
              />
              <span className="text-[11px] text-[#71998b] mt-1 block">
                Directly influences automated daily yield calculations across all active savings vaults.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                Referral Bonus Reward Amount (USD)
              </label>
              <input
                type="number"
                step="1"
                required
                value={referralBonusAmt}
                onChange={(e) => setReferralBonusAmt(e.target.value)}
                className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
              />
              <span className="text-[11px] text-[#71998b] mt-1 block">
                Standard reward paid to members for verified KYC referrals (Default $25.00).
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                Daily Withdrawal Hard Cap (USD)
              </label>
              <input
                type="number"
                required
                value={dailyCap}
                onChange={(e) => setDailyCap(e.target.value)}
                className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#041d16] border border-[#144f3d] flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-xs">Mandatory Tier 2 KYC Enforcement</div>
                <div className="text-[10px] text-[#8cb8a8]">
                  Require verified photo ID before releasing bank withdrawals.
                </div>
              </div>
              <input
                type="checkbox"
                checked={kycEnforced}
                onChange={(e) => setKycEnforced(e.target.checked)}
                className="w-5 h-5 accent-[#d4af37] cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#031d16] font-display font-extrabold text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02] transition-transform"
            >
              Update Global Parameters
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: AUDIT LOGS                                                         */}
      {/* ========================================================================= */}
      {activeTab === 'logs' && (
        <div className="emerald-card rounded-2xl border border-[#d4af37]/30 overflow-hidden shadow-2xl">
          <div className="p-4 bg-[#02130e] border-b border-[#0f4637] flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Immutable Security Audit Trail</h3>
            <span className="text-xs text-[#8cb8a8] font-mono">{auditLogs.length} Logged Actions</span>
          </div>

          <div className="divide-y divide-[#0c392c] max-h-[600px] overflow-y-auto">
            {auditLogs.map((l) => (
              <div
                key={l.id}
                className="p-3.5 flex items-center justify-between text-xs font-mono hover:bg-[#062c21]"
              >
                <div>
                  <div className="text-white font-semibold flex items-center gap-2">
                    <span className="text-[#fae188]">[{l.category?.toUpperCase() || 'SYS'}]</span>
                    <span>{l.action}</span>
                  </div>
                  <div className="text-[11px] text-[#a0c5b9] mt-0.5">{l.details}</div>
                  <div className="text-[10px] text-[#71998b]">
                    Actor: {l.userEmail || 'System Admin'} • {l.ipAddress || '127.0.0.1'}
                  </div>
                </div>
                <div className="text-[#8cb8a8] text-[10px] text-right shrink-0">
                  {new Date(l.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: EXPRESS BACKEND API & 24H 2% COMPOUND YIELD CRON                   */}
      {/* ========================================================================= */}
      {activeTab === 'backend-api' && (
        <div className="pt-2">
          <BackendConsoleView />
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: MONEY ADJUSTMENT (ADD / REMOVE MONEY / SET BALANCE)                 */}
      {/* ========================================================================= */}
      {showMoneyModal && selectedUserForMoney && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="emerald-card-highlight w-full max-w-lg rounded-3xl p-6 sm:p-7 border border-[#d4af37]/60 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/20">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl gold-gradient-bg text-[#031d16]">
                  <DollarSign className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Adjust User Financial Balance
                  </h3>
                  <p className="text-[11px] text-[#a0c5b9]">
                    Member: {selectedUserForMoney.firstName} {selectedUserForMoney.lastName} ({selectedUserForMoney.email})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowMoneyModal(false)}
                className="text-white/60 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteMoneyAction} className="space-y-4 mt-4">
              {/* Select Action */}
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1.5">
                  Select Financial Operation
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMoneyActionType('credit')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                      moneyActionType === 'credit'
                        ? 'bg-[#10b981] text-black font-extrabold shadow'
                        : 'bg-[#041d16] text-[#8cb8a8] border-[#144f3d]'
                    }`}
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>+ Add Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMoneyActionType('debit')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                      moneyActionType === 'debit'
                        ? 'bg-red-600 text-white font-extrabold shadow'
                        : 'bg-[#041d16] text-[#8cb8a8] border-[#144f3d]'
                    }`}
                  >
                    <MinusCircle className="w-3.5 h-3.5" />
                    <span>- Remove Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMoneyActionType('set_balance')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                      moneyActionType === 'set_balance'
                        ? 'bg-[#fae188] text-black font-extrabold shadow'
                        : 'bg-[#041d16] text-[#8cb8a8] border-[#144f3d]'
                    }`}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Set Exact Bal</span>
                  </button>
                </div>
              </div>

              {/* Target Account */}
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Target Financial Vault
                </label>
                <select
                  value={selectedAccountId}
                  onChange={(e) => setSelectedAccountId(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  {accounts
                    .filter((a) => a.userId === selectedUserForMoney.id)
                    .map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.name} ({acc.accountNumber}) — Current Bal: {formatMoney(acc.balance)}
                      </option>
                    ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  {moneyActionType === 'set_balance' ? 'New Exact Balance (USD)' : 'Amount to Adjust (USD)'}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-white font-mono">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    value={moneyAmount}
                    onChange={(e) => setMoneyAmount(e.target.value)}
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 pl-8 pr-4 text-sm font-mono font-bold text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Transaction Ledger Classification
                </label>
                <select
                  value={moneyCategory}
                  onChange={(e) => setMoneyCategory(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Administrative Credit">Administrative Credit / Grant</option>
                  <option value="Deposit Match Promotion">Deposit Match Promotion</option>
                  <option value="Executive Bonus Award">Executive Bonus Award</option>
                  <option value="Manual Balance Correction">Manual Balance Correction</option>
                  <option value="Institutional Yield Credit">Institutional Yield Credit</option>
                  <option value="Dispute Settlement">Dispute Settlement</option>
                  <option value="Compliance Fee Deduction">Compliance Fee Deduction</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Audit Notes / Reason
                </label>
                <input
                  type="text"
                  required
                  value={moneyNotes}
                  onChange={(e) => setMoneyNotes(e.target.value)}
                  placeholder="e.g. VIP onboarding credit approved by management"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowMoneyModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-[#041f17] text-[#8cb8a8] border border-[#144f3d] font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-display font-extrabold text-xs shadow hover:scale-105 transition-all"
                >
                  Confirm &amp; Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CUSTOM BONUS GRANT                                                 */}
      {/* ========================================================================= */}
      {showCustomBonusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="emerald-card-highlight w-full max-w-lg rounded-3xl p-6 sm:p-7 border border-[#d4af37]/60 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/20">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl gold-gradient-bg text-[#031d16]">
                  <Gift className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Grant Custom Promotional Bonus</h3>
                  <p className="text-[11px] text-[#a0c5b9]">Instant deposit into recipient's checking vault</p>
                </div>
              </div>
              <button
                onClick={() => setShowCustomBonusModal(false)}
                className="text-white/60 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteCustomBonus} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Recipient User
                </label>
                <select
                  value={bonusTargetUserId}
                  onChange={(e) => setBonusTargetUserId(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.firstName} {u.lastName} ({u.email}) — {u.uniqueUserId}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Bonus Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-white font-mono">$</span>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    required
                    value={bonusAmount}
                    onChange={(e) => setBonusAmount(e.target.value)}
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 pl-8 pr-4 text-sm font-mono font-bold text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Bonus Classification
                </label>
                <input
                  type="text"
                  required
                  value={bonusType}
                  onChange={(e) => setBonusType(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Reason / Promotional Campaign
                </label>
                <input
                  type="text"
                  required
                  value={bonusReason}
                  onChange={(e) => setBonusReason(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCustomBonusModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-[#041f17] text-[#8cb8a8] border border-[#144f3d] font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-display font-extrabold text-xs shadow hover:scale-105 transition-all"
                >
                  Deposit Bonus Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: REJECT WITHDRAWAL WITH REASON                                      */}
      {/* ========================================================================= */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="emerald-card-highlight w-full max-w-md rounded-3xl p-6 border border-red-500/50 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 pb-3 border-b border-red-500/20 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Decline Withdrawal &amp; Refund</h3>
            </div>

            <p className="text-xs text-[#a0c5b9] my-3">
              Funds will be returned immediately to the member's source account, and a compliance notification will be dispatched.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Rejection Reason
                </label>
                <textarea
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-[#041f17] text-[#8cb8a8] border border-[#144f3d] font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRejectWithdrawal}
                  className="w-1/2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow transition-all"
                >
                  Confirm Rejection &amp; Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: GLOBAL DAILY BONUS TO EVERY USER (2% YIELD DISTRIBUTION)           */}
      {/* ========================================================================= */}
      {showGlobalBonusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="emerald-card-highlight w-full max-w-lg rounded-3xl p-6 sm:p-7 border border-[#10b981]/60 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#10b981]/20">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#10b981] text-black font-extrabold">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Execute Global Daily Bonus Distribution
                  </h3>
                  <p className="text-[11px] text-[#a0c5b9]">
                    Distribute 2% daily earning bonus simultaneously to all {users.length} registered members
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGlobalBonusModal(false)}
                className="text-white/60 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="p-4 rounded-2xl bg-[#021811] border border-[#0d4f3b] text-xs space-y-2">
                <div className="flex justify-between items-center text-white">
                  <span className="text-[#a0c5b9]">Total Eligible Active Users:</span>
                  <span className="font-mono font-bold text-[#fae188]">{users.length} Accounts</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span className="text-[#a0c5b9]">Total Platform Custody Assets:</span>
                  <span className="font-mono font-bold text-white">{formatMoney(totalPlatformBalances)}</span>
                </div>
                <div className="flex justify-between items-center text-white">
                  <span className="text-[#a0c5b9]">Estimated 2% Yield Distribution:</span>
                  <span className="font-mono font-bold text-[#6ee7b7]">
                    ~{formatMoney(totalPlatformBalances * (parseFloat(globalBonusPercentage) || 2) / 100)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1.5">
                  Daily Bonus Earning Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="100"
                    value={globalBonusPercentage}
                    onChange={(e) => setGlobalBonusPercentage(e.target.value)}
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 pl-4 pr-10 text-sm font-mono font-bold text-white focus:outline-none focus:border-[#10b981]"
                  />
                  <span className="absolute right-3.5 top-2.5 text-[#10b981] font-mono font-bold">%</span>
                </div>
                <p className="text-[10px] text-[#71998b] mt-1">
                  Default rate is 2.0% daily earnings calculated against each user's total portfolio balance.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  Executing this will credit the 2% daily bonus directly into each user's primary savings vault or checking account, create verifiable ledger records, dispatch in-app notifications, and update live activity logs.
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowGlobalBonusModal(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-[#041f17] text-[#8cb8a8] border border-[#144f3d] font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={globalBonusExecuting}
                  onClick={() => {
                    setGlobalBonusExecuting(true);
                    const rate = parseFloat(globalBonusPercentage) || 2.0;
                    adminDistributeDailyBonusToAllUsers(rate);
                    setGlobalBonusExecuting(false);
                    setShowGlobalBonusModal(false);
                  }}
                  className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-display font-extrabold text-xs shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1.5"
                >
                  <Percent className="w-4 h-4" />
                  <span>{globalBonusExecuting ? 'Distributing...' : 'Confirm & Distribute to All'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
