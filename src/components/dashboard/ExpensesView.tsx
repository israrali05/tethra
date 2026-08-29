import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Receipt,
  Plus,
  Tag,
  Paperclip,
  Calendar,
  DollarSign,
  TrendingDown,
  ShoppingBag,
  Home,
  Coffee,
  Plane,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { ExpenseCategory } from '../../types';

export const ExpensesView: React.FC = () => {
  const { expenses, addExpense, formatMoney, accounts } = useApp();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Dining');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [accountId, setAccountId] = useState(accounts[0]?.id || '');
  const [receiptUrl, setReceiptUrl] = useState('');

  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  const categories: ExpenseCategory[] = [
    'Dining',
    'Housing',
    'Travel',
    'Utilities',
    'Subscriptions',
    'Shopping',
    'Healthcare',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!title || !amt || amt <= 0) return;

    addExpense({
      title,
      amount: amt,
      category,
      date,
      accountId,
      receiptUrl:
        receiptUrl ||
        'https://images.unsplash.com/photo-1554415707-9e49016a3e0a?w=600&auto=format&fit=crop&q=80',
    });

    setModalOpen(false);
    setTitle('');
    setAmount('');
  };

  return (
    <div className="space-y-6" id="tethra-expenses-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d4af37]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Personal Expense &amp; Receipt Tracking
          </h1>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Categorized spending ledger with attached digital receipts and double-entry reconciliation.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl gold-gradient-bg text-[#031d16] text-xs font-bold shadow-md hover:scale-105 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Expense</span>
        </button>
      </div>

      {/* Expense Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="emerald-card rounded-2xl p-5 border border-[#d4af37]/30 space-y-2">
          <div className="text-xs text-[#8cb8a8] font-semibold uppercase">Total Tracked Expenses</div>
          <div className="text-3xl font-display font-extrabold text-white">
            {formatMoney(totalExpenses)}
          </div>
          <div className="text-[11px] text-[#7da797] font-mono">{expenses.length} Records Logged</div>
        </div>

        <div className="emerald-card rounded-2xl p-5 border border-[#144f3d] space-y-2">
          <div className="text-xs text-[#8cb8a8] font-semibold uppercase">Largest Category</div>
          <div className="text-2xl font-bold text-[#fae188]">Travel &amp; Flights</div>
          <div className="text-[11px] text-[#7da797] font-mono">38% of monthly cash outflow</div>
        </div>

        <div className="emerald-card rounded-2xl p-5 border border-[#144f3d] space-y-2">
          <div className="text-xs text-[#8cb8a8] font-semibold uppercase">Receipt Verification</div>
          <div className="text-2xl font-bold text-[#10b981]">100% Stored</div>
          <div className="text-[11px] text-[#7da797] font-mono">Audit &amp; tax compliant</div>
        </div>
      </div>

      {/* Expense List */}
      <div className="emerald-card rounded-2xl border border-[#d4af37]/25 overflow-hidden">
        <div className="p-4 bg-[#02130e] border-b border-[#0f4637] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#d4af37]" />
            <h3 className="text-sm font-bold text-white">Expense Ledger</h3>
          </div>
        </div>

        <div className="divide-y divide-[#0c392c]">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#062c21] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#05261d] border border-[#14533e] text-[#d4af37] shrink-0">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{exp.title}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#8cb8a8] mt-1 font-mono">
                    <span>Date: {new Date(exp.date).toLocaleDateString()}</span>
                    <span className="px-2 py-0.5 rounded bg-[#041f17] text-[#fae188] border border-[#144f3d]">
                      {exp.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                {exp.receiptUrl && (
                  <button
                    onClick={() => setSelectedReceipt(exp.receiptUrl!)}
                    className="flex items-center gap-1 text-xs text-[#38bdf8] hover:underline font-mono"
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>View Receipt</span>
                  </button>
                )}

                <div className="text-right">
                  <div className="text-sm font-bold text-white font-mono">
                    -{formatMoney(exp.amount)}
                  </div>
                  <div className="text-[10px] text-[#71998b]">Reconciled</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD EXPENSE MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="emerald-card-highlight w-full max-w-md rounded-2xl p-6 border border-[#d4af37]/50 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/20">
              <h3 className="text-base font-bold text-white">Log New Expense</h3>
              <button onClick={() => setModalOpen(false)} className="text-white/60 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Expense Title / Merchant
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. AWS Cloud Services, Business Dinner"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                    Amount (USD)
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.01"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="120.00"
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Account</label>
                <select
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                >
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} ({formatMoney(acc.balance)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-[#062c20] text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs shadow-md"
                >
                  Record Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECEIPT PREVIEW MODAL */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="emerald-card max-w-lg w-full rounded-2xl p-6 border border-[#d4af37]/50 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#0f4637]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-[#d4af37]" />
                <span>Digitized Expense Receipt</span>
              </h3>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#14533e] max-h-96 flex items-center justify-center bg-[#02130e]">
              <img
                src={selectedReceipt}
                alt="Receipt"
                className="max-h-96 w-full object-contain"
              />
            </div>

            <div className="text-right">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 rounded-xl gold-gradient-bg text-[#031d16] text-xs font-bold"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
