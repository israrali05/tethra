import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Send,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Zap,
  Users,
  Wallet,
  Clock,
  Sparkles,
  ArrowDownLeft,
  ArrowUpRight,
} from 'lucide-react';

export const P2PTransferView: React.FC = () => {
  const {
    currentUser,
    users,
    accounts,
    sendP2PFunds,
    transactions,
    formatMoney,
    selectedCurrency,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipientId, setSelectedRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [sourceAccountId, setSourceAccountId] = useState(
    accounts.find((a) => a.userId === currentUser?.id)?.id || ''
  );
  const [transferNote, setTransferNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<any | null>(null);

  // Available users to send to (excluding self)
  const availableUsers = users.filter((u) => u.id !== currentUser?.id);

  const filteredUsers = availableUsers.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      u.username.toLowerCase().includes(q) ||
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.uniqueUserId.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  });

  const selectedRecipient = users.find((u) => u.id === selectedRecipientId);
  const selectedAccount = accounts.find((a) => a.id === sourceAccountId);

  const handleSendTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecipient) return;
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const ok = sendP2PFunds(selectedRecipient.username, numAmount, transferNote, sourceAccountId);
      setIsProcessing(false);
      if (ok) {
        setSuccessReceipt({
          recipient: selectedRecipient,
          amount: numAmount,
          note: transferNote,
          timestamp: new Date().toISOString(),
          sourceAccountName: selectedAccount?.name || 'Primary Checking',
        });
        setAmount('');
        setTransferNote('');
      }
    }, 400);
  };

  // Recent P2P transactions
  const p2pHistory = transactions.filter(
    (tx) => tx.type === 'p2p_transfer' && tx.userId === currentUser?.id
  );

  return (
    <div className="space-y-6" id="tethra-p2p-transfer-view">
      {/* Header */}
      <div className="pb-4 border-b border-[#d4af37]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Send &amp; Receive Money (P2P)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40 flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#10b981]" /> Zero Fees
            </span>
          </div>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Instant peer-to-peer balance settlement across all registered verified Tethra network members.
          </p>
        </div>
      </div>

      {/* Success Modal / Banner */}
      {successReceipt && (
        <div className="emerald-card p-6 rounded-2xl border-2 border-[#10b981] bg-[#02241b] relative overflow-hidden space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center text-[#10b981]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Transfer Dispatched &amp; Settled!
                </h3>
                <p className="text-xs text-[#8cb8a8]">
                  Sent {formatMoney(successReceipt.amount)} to @{successReceipt.recipient.username}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSuccessReceipt(null)}
              className="text-xs text-[#8cb8a8] hover:text-white px-3 py-1 rounded-lg bg-[#063327]"
            >
              Dismiss
            </button>
          </div>
          <div className="p-3.5 bg-[#031d16] rounded-xl border border-[#144f3d] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div>
              <span className="text-[#659281]">From:</span> {successReceipt.sourceAccountName}
            </div>
            <div>
              <span className="text-[#659281]">To:</span> {successReceipt.recipient.firstName} {successReceipt.recipient.lastName} (@{successReceipt.recipient.username})
            </div>
            <div>
              <span className="text-[#659281]">Status:</span> <span className="text-[#10b981]">Instant Settlement (0s)</span>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recipient Selection & Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Member Search */}
          <div className="emerald-card p-5 rounded-2xl border border-[#d4af37]/25 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#fae188] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#d4af37]" /> 1. Search Member or Select Recipient
              </h2>
              <span className="text-[11px] font-mono text-[#8cb8a8]">
                {filteredUsers.length} Members Available
              </span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-[#8cb8a8] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by @username, full name, or ID..."
                className="w-full bg-[#041e17] border border-[#144f3d] rounded-xl py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* User Badges / Avatar List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
              {filteredUsers.map((u) => {
                const isSelected = selectedRecipientId === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      setSelectedRecipientId(u.id);
                      setSearchQuery(u.username);
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'bg-[#0b4737] border-[#d4af37] shadow-md ring-1 ring-[#d4af37]'
                        : 'bg-[#041e17] border-[#144f3d] hover:border-[#238268]'
                    }`}
                  >
                    <img
                      src={u.avatarUrl}
                      alt={u.firstName}
                      className="w-10 h-10 rounded-lg object-cover border border-[#d4af37]/40 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white truncate">
                          {u.firstName} {u.lastName}
                        </span>
                        <ShieldCheck className="w-3 h-3 text-[#10b981] shrink-0" />
                      </div>
                      <div className="text-[11px] text-[#fae188] font-mono truncate">
                        @{u.username}
                      </div>
                      <div className="text-[10px] text-[#659281] font-mono">
                        {u.uniqueUserId}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Transfer Details */}
          <form onSubmit={handleSendTransfer} className="emerald-card p-5 rounded-2xl border border-[#d4af37]/25 space-y-4">
            <h2 className="text-sm font-bold text-[#fae188] flex items-center gap-2">
              <Send className="w-4 h-4 text-[#d4af37]" /> 2. Transfer Amount &amp; Origin Vault
            </h2>

            {/* Selected Recipient Card */}
            {selectedRecipient ? (
              <div className="p-3.5 rounded-xl bg-[#03231a] border border-[#10b981]/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedRecipient.avatarUrl}
                    alt={selectedRecipient.firstName}
                    className="w-11 h-11 rounded-lg object-cover border border-[#d4af37]"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">
                      Recipient: {selectedRecipient.firstName} {selectedRecipient.lastName}
                    </div>
                    <div className="text-[11px] font-mono text-[#6ee7b7]">
                      @{selectedRecipient.username} • {selectedRecipient.city}, {selectedRecipient.country}
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#10b981]/20 text-[#6ee7b7] text-[10px] font-bold border border-[#10b981]/40">
                  Ready
                </span>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-[#041e17] border border-[#144f3d] text-center text-xs text-[#8cb8a8]">
                Please select a recipient member from the list above.
              </div>
            )}

            {/* Source Account Picker */}
            <div>
              <label className="block text-xs font-medium text-[#c4e3d5] mb-1.5">
                Funding Account:
              </label>
              <select
                value={sourceAccountId}
                onChange={(e) => setSourceAccountId(e.target.value)}
                className="w-full bg-[#041e17] border border-[#144f3d] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              >
                {accounts
                  .filter((a) => a.userId === currentUser?.id)
                  .map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} ({acc.type.toUpperCase()}) — Available: {formatMoney(acc.balance)}
                    </option>
                  ))}
              </select>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-xs font-medium text-[#c4e3d5] mb-1.5">
                Amount (USD):
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-bold text-[#d4af37] font-mono">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={selectedAccount?.balance || 999999}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                  className="w-full bg-[#041e17] border border-[#144f3d] rounded-xl py-2.5 pl-8 pr-4 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              {/* Quick Amount Buttons */}
              <div className="flex gap-2 mt-2">
                {[10, 25, 50, 100, 250, 500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset.toString())}
                    className="px-2.5 py-1 rounded-lg bg-[#072a1f] hover:bg-[#0f4b38] text-[11px] font-mono text-[#fae188] border border-[#144f3d]"
                  >
                    +${preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-medium text-[#c4e3d5] mb-1.5">
                Transfer Note / Reason (Optional):
              </label>
              <input
                type="text"
                value={transferNote}
                onChange={(e) => setTransferNote(e.target.value)}
                placeholder="e.g. Dinner split, travel deposit, project milestone..."
                className="w-full bg-[#041e17] border border-[#144f3d] rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedRecipient || !amount || parseFloat(amount) <= 0 || isProcessing}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                !selectedRecipient || !amount || parseFloat(amount) <= 0 || isProcessing
                  ? 'bg-[#06291f] text-[#527d6d] cursor-not-allowed border border-[#144f3d]'
                  : 'gold-gradient-bg text-[#031d16] hover:scale-[1.01] shadow-lg font-extrabold cursor-pointer'
              }`}
            >
              {isProcessing ? (
                <span>Dispatching Instant Settlement...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>
                    Send {amount ? formatMoney(parseFloat(amount)) : '$0.00'} to @
                    {selectedRecipient ? selectedRecipient.username : 'User'}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Instant Live P2P History & Quick Perks */}
        <div className="lg:col-span-5 space-y-6">
          {/* P2P Perks Card */}
          <div className="emerald-card p-5 rounded-2xl border border-[#d4af37]/25 space-y-3 bg-gradient-to-br from-[#04241b] to-[#01140e]">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" /> Why Send Money via Tethra P2P?
            </h3>
            <ul className="space-y-2 text-xs text-[#a3cbbe]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                <span><strong>Instant ledger settlement:</strong> Zero waiting periods or intermediary delays.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                <span><strong>0% fee guarantee:</strong> Full amount transfers without transaction deductions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0 mt-0.5" />
                <span><strong>Verified security:</strong> All recipients are KYC and AML cleared.</span>
              </li>
            </ul>
          </div>

          {/* User's P2P Activity History */}
          <div className="emerald-card p-5 rounded-2xl border border-[#d4af37]/25 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d4af37]" /> Your P2P Transfers
              </h3>
              <span className="text-[11px] font-mono text-[#8cb8a8]">
                {p2pHistory.length} Recorded
              </span>
            </div>

            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {p2pHistory.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#8cb8a8]">
                  No P2P transfers yet. Try sending your first transfer above!
                </div>
              ) : (
                p2pHistory.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 rounded-xl bg-[#031d16] border border-[#0d3f32] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#072a1f] border border-[#144f3d] flex items-center justify-center text-[#fae188]">
                        <ArrowUpRight className="w-4 h-4 text-[#10b981]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          {tx.description}
                        </div>
                        <div className="text-[10px] font-mono text-[#659281]">
                          {new Date(tx.createdAt).toLocaleString()} • Ref: {tx.referenceNumber}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-[#6ee7b7]">
                        {formatMoney(tx.amount)}
                      </div>
                      <span className="text-[10px] text-[#10b981] font-mono font-semibold">
                        Completed
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
