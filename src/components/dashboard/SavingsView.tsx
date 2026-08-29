import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  PiggyBank,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  Lock,
  Percent,
} from 'lucide-react';
import { SavingsGoal } from '../../types';

export const SavingsView: React.FC = () => {
  const {
    savingsGoals,
    createSavingsGoal,
    contributeToGoal,
    withdrawFromGoal,
    formatMoney,
    accounts,
  } = useApp();

  const [createModal, setCreateModal] = useState(false);
  const [actionModal, setActionModal] = useState<{
    goal: SavingsGoal;
    action: 'deposit' | 'withdraw';
  } | null>(null);

  // New goal state
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('10000');
  const [targetDate, setTargetDate] = useState('2026-12-31');
  const [category, setCategory] = useState('Emergency Fund');
  const [autoDepositAmount, setAutoDepositAmount] = useState('250');

  // Action amount
  const [actionAmount, setActionAmount] = useState('100');
  const [sourceAccountId, setSourceAccountId] = useState(accounts[0]?.id || '');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !targetAmount) return;
    createSavingsGoal(
      name,
      Number(targetAmount),
      targetDate,
      category,
      Number(autoDepositAmount)
    );
    setCreateModal(false);
    setName('');
  };

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionModal) return;
    const amt = Number(actionAmount);
    if (!amt || amt <= 0) return;

    if (actionModal.action === 'deposit') {
      contributeToGoal(actionModal.goal.id, amt, sourceAccountId);
    } else {
      withdrawFromGoal(actionModal.goal.id, amt, sourceAccountId);
    }
    setActionModal(null);
    setActionAmount('100');
  };

  return (
    <div className="space-y-6" id="tethra-savings-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d4af37]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Targeted Savings Goals &amp; Vaults
          </h1>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Automate monthly contributions toward custom milestones with 5.4% illustrative APY compound interest.
          </p>
        </div>

        <button
          onClick={() => setCreateModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl gold-gradient-bg text-[#031d16] text-xs font-bold shadow-md hover:scale-105 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Goal</span>
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingsGoals.map((goal) => {
          const progress = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);

          return (
            <div
              key={goal.id}
              className="emerald-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-4 hover:border-[#d4af37] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#094635] text-[#fae188] font-bold border border-[#d4af37]/40">
                    {goal.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#10b981]">
                    {progress.toFixed(1)}%
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{goal.name}</h3>
                  <div className="text-xs text-[#8cb8a8] flex items-center gap-1 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full h-2.5 rounded-full bg-[#02130e] overflow-hidden">
                    <div
                      style={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-[#10b981] to-[#d4af37] transition-all duration-500"
                    />
                  </div>
                  <div className="flex justify-between text-xs font-mono pt-1">
                    <span className="text-white font-bold">{formatMoney(goal.currentAmount)}</span>
                    <span className="text-[#8cb8a8]">Goal: {formatMoney(goal.targetAmount)}</span>
                  </div>
                </div>

                {goal.autoDeposit && (
                  <div className="p-2.5 rounded-xl bg-[#041d16] border border-[#144f3d] text-[11px] text-[#7ca898] flex items-center justify-between">
                    <span>Monthly Auto-Deposit:</span>
                    <span className="font-mono font-bold text-[#fae188]">
                      {formatMoney(goal.autoDeposit.amount)}/mo
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2 border-t border-[#0d3f32]">
                <button
                  onClick={() => setActionModal({ goal, action: 'deposit' })}
                  className="flex-1 py-2 rounded-lg bg-[#073024] hover:bg-[#0c4434] text-white text-xs font-semibold border border-[#1a5b4a]"
                >
                  + Add Funds
                </button>
                <button
                  onClick={() => setActionModal({ goal, action: 'withdraw' })}
                  className="flex-1 py-2 rounded-lg bg-[#073024] hover:bg-[#0c4434] text-[#fae188] text-xs font-semibold border border-[#1a5b4a]"
                >
                  Withdraw
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE GOAL MODAL */}
      {createModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="emerald-card-highlight w-full max-w-md rounded-2xl p-6 border border-[#d4af37]/50 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/20">
              <h3 className="text-base font-bold text-white">Create Savings Goal Vault</h3>
              <button
                onClick={() => setCreateModal(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Goal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Home Downpayment, Dream Vacation"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                    Target Goal (USD)
                  </label>
                  <input
                    type="number"
                    min="50"
                    required
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    required
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Emergency Fund">Emergency Fund</option>
                  <option value="Travel & Leisure">Travel &amp; Leisure</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Retirement">Retirement Vault</option>
                  <option value="Education">Education &amp; Tuition</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Monthly Auto-Deposit (Optional)
                </label>
                <input
                  type="number"
                  min="0"
                  value={autoDepositAmount}
                  onChange={(e) => setAutoDepositAmount(e.target.value)}
                  placeholder="250"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModal(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-[#062c20] text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs shadow-md"
                >
                  Save Goal Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONTRIBUTE / WITHDRAW ACTION MODAL */}
      {actionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="emerald-card-highlight w-full max-w-md rounded-2xl p-6 border border-[#d4af37]/50 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/20">
              <h3 className="text-base font-bold text-white capitalize">
                {actionModal.action} Goal Funds — {actionModal.goal.name}
              </h3>
              <button
                onClick={() => setActionModal(null)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleActionSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  {actionModal.action === 'deposit' ? 'Transfer From Account' : 'Transfer To Account'}
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
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Amount (USD)</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={actionAmount}
                  onChange={(e) => setActionAmount(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActionModal(null)}
                  className="w-1/3 py-2.5 rounded-xl bg-[#062c20] text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs shadow-md"
                >
                  Confirm {actionModal.action}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
