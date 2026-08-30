import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Receipt,
  Search,
  Filter,
  Download,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowRightLeft,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';
import { TransactionType } from '../../types';

export const TransactionsView: React.FC = () => {
  const { currentUser, transactions, formatMoney, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Strictly filter transactions to current user's account ledger
  const userTransactions = transactions.filter((t) => t.userId === currentUser?.id);

  const filtered = userTransactions.filter((t) => {
    const ref = t.referenceNumber || t.reference || t.id || '';
    const matchSearch =
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      ref.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || t.type === typeFilter;
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const exportCSV = () => {
    const headers = 'ID,Date,Type,Description,Account,Amount,Currency,Status,Reference\n';
    const rows = filtered
      .map(
        (t) =>
          `"${t.id}","${t.createdAt}","${t.type}","${t.description.replace(/"/g, '""')}","${t.accountName || ''}","${t.amount}","${t.currency}","${t.status}","${t.referenceNumber || t.reference || t.id}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tethra-ledger-${currentUser?.username || 'user'}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('CSV Export Generated', 'Your personalized account ledger downloaded successfully.');
  };

  return (
    <div className="space-y-6" id="tethra-transactions-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d4af37]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Ledger &amp; Transaction History
          </h1>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Auditable double-entry accounting records for deposits, bank transfers, savings, and expense splits.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0b4737] hover:bg-[#12644f] text-white border border-[#227f67] text-xs font-semibold self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-[#d4af37]" />
          <span>Export CSV Ledger</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 rounded-2xl bg-[#05261d] border border-[#d4af37]/25">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-[#8cb8a8] absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by description or reference ID..."
            className="w-full bg-[#031812] border border-[#144f3d] rounded-xl py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#d4af37]"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-[#031812] border border-[#144f3d] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
          >
            <option value="all">All Transaction Types</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
            <option value="transfer">Internal Transfers</option>
            <option value="yield">Yield / Profit</option>
            <option value="referral_bonus">Referral Rewards</option>
            <option value="expense">Expenses</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#031812] border border-[#144f3d] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="emerald-card rounded-2xl border border-[#d4af37]/25 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#02130e] text-[#8cb8a8] uppercase font-mono text-[10px] tracking-wider border-b border-[#0f4637]">
              <tr>
                <th className="py-3 px-4">Date &amp; Ref</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0c392c]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#7ea999] space-y-2">
                    <Receipt className="w-8 h-8 text-[#8cb8a8]/40 mx-auto" />
                    <div className="font-semibold text-white">No Transactions in Your Account Ledger</div>
                    <p className="text-[11px] text-[#8cb8a8] max-w-sm mx-auto">
                      All new user accounts start with zero balance and a clean ledger. Once you deposit or receive funds, transactions will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((t) => {
                  const isPositive =
                    t.type === 'deposit' ||
                    t.type === 'yield' ||
                    t.type === 'referral_bonus' ||
                    t.type === 'referral_reward' ||
                    t.type === 'yield_earning' ||
                    t.type === 'daily_bonus' ||
                    t.type === 'goal_withdraw';

                  return (
                    <tr key={t.id} className="hover:bg-[#062c21] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">
                          {new Date(t.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-[10px] font-mono text-[#7ea999]">{t.referenceNumber || t.reference || t.id}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="capitalize px-2 py-0.5 rounded font-mono text-[10px] bg-[#041f17] border border-[#144f3d] text-[#fae188]">
                          {t.type.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-white max-w-xs truncate">
                        {t.description}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold">
                        <span className={isPositive ? 'text-[#6ee7b7]' : 'text-white'}>
                          {isPositive ? '+' : '-'}
                          {formatMoney(t.amount)}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold ${
                            t.status === 'completed'
                              ? 'bg-[#10b981]/20 text-[#6ee7b7]'
                              : t.status === 'pending'
                              ? 'bg-yellow-900/40 text-yellow-300'
                              : 'bg-red-900/40 text-red-300'
                          }`}
                        >
                          {t.status === 'completed' ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          <span>{t.status}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
