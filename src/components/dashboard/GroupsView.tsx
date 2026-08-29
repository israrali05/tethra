import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Plus,
  Receipt,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  Coins,
  CreditCard,
} from 'lucide-react';
import { SharedExpenseGroup, User } from '../../types';

export const GroupsView: React.FC = () => {
  const {
    sharedGroups,
    createSharedGroup,
    addGroupExpense,
    calculateGroupSettlements,
    formatMoney,
    currentUser,
    users,
  } = useApp();

  const [selectedGroupId, setSelectedGroupId] = useState(sharedGroups[0]?.id || '');
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const [addExpenseModal, setAddExpenseModal] = useState(false);

  // New Group State
  const [groupName, setGroupName] = useState('');
  const [groupCurrency, setGroupCurrency] = useState('USD');
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([currentUser?.id || '']);

  // New Group Expense State
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('150');
  const [paidByUserId, setPaidByUserId] = useState(currentUser?.id || '');

  const activeGroup = sharedGroups.find((g) => g.id === selectedGroupId) || sharedGroups[0];
  const settlements = activeGroup ? calculateGroupSettlements(activeGroup.id) : [];

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName) return;
    createSharedGroup(groupName, groupCurrency, selectedMemberIds);
    setCreateGroupModal(false);
    setGroupName('');
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGroup) return;
    const amt = Number(expenseAmount);
    if (!expenseTitle || !amt || amt <= 0) return;

    // Default split equally among all members
    const perMember = amt / activeGroup.memberIds.length;
    const splitDetails = activeGroup.memberIds.map((mId) => ({
      userId: mId,
      amount: perMember,
    }));

    addGroupExpense(activeGroup.id, {
      title: expenseTitle,
      amount: amt,
      paidByUserId,
      splitDetails,
    });

    setAddExpenseModal(false);
    setExpenseTitle('');
  };

  const getUserName = (id: string) => {
    const u = users.find((x) => x.id === id);
    return u ? `${u.firstName} ${u.lastName}` : id;
  };

  const getUserAvatar = (id: string) => {
    const u = users.find((x) => x.id === id);
    return (
      u?.avatarUrl ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    );
  };

  return (
    <div className="space-y-8" id="tethra-groups-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d4af37]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Shared Expense Groups &amp; Settlements
          </h1>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Split travel, roommate, and project bills with minimum cashflow optimization.
          </p>
        </div>

        <button
          onClick={() => setCreateGroupModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl gold-gradient-bg text-[#031d16] text-xs font-bold shadow-md hover:scale-105 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Group</span>
        </button>
      </div>

      {/* Group Selector Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {sharedGroups.map((g) => (
          <button
            key={g.id}
            onClick={() => setSelectedGroupId(g.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              activeGroup?.id === g.id
                ? 'bg-[#0b4737] text-white border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                : 'bg-[#041e17] text-[#8cb8a8] border-[#144f3d] hover:bg-[#062a20]'
            }`}
          >
            👥 {g.name} ({g.memberIds.length} Members)
          </button>
        ))}
      </div>

      {activeGroup && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Group Overview & Expenses List (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="emerald-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#0f4637]">
                <div>
                  <h3 className="text-lg font-bold text-white">{activeGroup.name}</h3>
                  <div className="text-xs text-[#8cb8a8]">
                    Currency: {activeGroup.currency} • Total Group Spend: {formatMoney(activeGroup.totalSpent)}
                  </div>
                </div>

                <button
                  onClick={() => setAddExpenseModal(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0e5240] hover:bg-[#157158] text-white text-xs font-semibold border border-[#238b6d]"
                >
                  + Add Bill / Expense
                </button>
              </div>

              {/* Members Row */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#a2cbbe]">Active Members:</span>
                <div className="flex flex-wrap gap-2">
                  {activeGroup.memberIds.map((mId) => (
                    <div
                      key={mId}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#041f17] border border-[#144f3d] text-xs text-white"
                    >
                      <img
                        src={getUserAvatar(mId)}
                        alt={getUserName(mId)}
                        className="w-5 h-5 rounded-full object-cover border border-[#d4af37]/40"
                      />
                      <span>{getUserName(mId)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expenses List */}
              <div className="pt-3 border-t border-[#0f4637] space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Group Expense History
                </h4>

                <div className="space-y-2">
                  {activeGroup.expenses.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-3.5 rounded-xl bg-[#041e17] border border-[#0d3f32] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#073024] text-[#d4af37]">
                          <Receipt className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white">{exp.title}</div>
                          <div className="text-[10px] text-[#7ca898] font-mono">
                            Paid by {getUserName(exp.paidByUserId)} • {new Date(exp.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="text-right font-mono font-bold text-white">
                        {formatMoney(exp.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Minimum Payment Settlement Algorithm (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="emerald-card-highlight rounded-2xl p-6 border border-[#d4af37]/40 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#0f4637]">
                <Sparkles className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-base font-bold text-white">Minimum Debt Settlement</h3>
              </div>

              <p className="text-xs text-[#8cb8a8] leading-relaxed">
                Graph optimization algorithm calculates the absolute minimum transactions needed to settle all debts in this group.
              </p>

              <div className="space-y-3 pt-2">
                {settlements.length === 0 ? (
                  <div className="p-4 rounded-xl bg-[#041f17] border border-[#144f3d] text-xs text-[#6ee7b7] text-center font-semibold">
                    ✓ All group balances are fully settled!
                  </div>
                ) : (
                  settlements.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#041d16] border border-[#165643] space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-white font-medium">
                          <span>{getUserName(s.fromUserId)}</span>
                          <ArrowRight className="w-4 h-4 text-[#d4af37]" />
                          <span className="text-[#fae188] font-bold">{getUserName(s.toUserId)}</span>
                        </div>
                        <span className="font-mono font-bold text-[#6ee7b7] text-sm">
                          {formatMoney(s.amount)}
                        </span>
                      </div>

                      <div className="text-[10px] text-[#71998b] font-mono">
                        Net minimum settlement transaction #{idx + 1}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE GROUP MODAL */}
      {createGroupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="emerald-card-highlight w-full max-w-md rounded-2xl p-6 border border-[#d4af37]/50 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/20">
              <h3 className="text-base font-bold text-white">Create Shared Expense Group</h3>
              <button
                onClick={() => setCreateGroupModal(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Group Name</label>
                <input
                  type="text"
                  required
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g. Miami Trip 2026, Apartment 4B Bills"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Currency</label>
                <select
                  value={groupCurrency}
                  onChange={(e) => setGroupCurrency(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Select Members to Include
                </label>
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                  {users.map((u) => (
                    <label
                      key={u.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#041d16] border border-[#0d3f32] text-xs text-white cursor-pointer hover:bg-[#072c21]"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={u.avatarUrl}
                          alt={u.firstName}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span>
                          {u.firstName} {u.lastName}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedMemberIds.includes(u.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedMemberIds([...selectedMemberIds, u.id]);
                          } else {
                            setSelectedMemberIds(selectedMemberIds.filter((id) => id !== u.id));
                          }
                        }}
                        className="accent-[#d4af37]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateGroupModal(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-[#062c20] text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs shadow-md"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD BILL MODAL */}
      {addExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="emerald-card-highlight w-full max-w-md rounded-2xl p-6 border border-[#d4af37]/50 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/20">
              <h3 className="text-base font-bold text-white">Add Group Expense</h3>
              <button
                onClick={() => setAddExpenseModal(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Description / Item
                </label>
                <input
                  type="text"
                  required
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  placeholder="e.g. Airbnb Booking, Grocery run"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                    Amount ({activeGroup?.currency})
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Paid By</label>
                  <select
                    value={paidByUserId}
                    onChange={(e) => setPaidByUserId(e.target.value)}
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {activeGroup?.memberIds.map((mId) => (
                      <option key={mId} value={mId}>
                        {getUserName(mId)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-[11px] text-[#7ca898]">
                *Cost will be divided equally across all {activeGroup?.memberIds.length} members.
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddExpenseModal(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-[#062c20] text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs shadow-md"
                >
                  Split Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
