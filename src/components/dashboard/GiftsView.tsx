import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Gift,
  Sparkles,
  Heart,
  Send,
  Users,
  CheckCircle2,
  Trophy,
  History,
  Coins,
  Smile,
  ShieldCheck,
} from 'lucide-react';

export const GiftsView: React.FC = () => {
  const {
    currentUser,
    users,
    accounts,
    gifts,
    giftPresets,
    sendGift,
    formatMoney,
  } = useApp();

  const [selectedGiftId, setSelectedGiftId] = useState(giftPresets[0]?.id || 'gift_coffee');
  const [selectedRecipientId, setSelectedRecipientId] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [sourceAccountId, setSourceAccountId] = useState(
    accounts.find((a) => a.userId === currentUser?.id)?.id || ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'catalog' | 'received' | 'sent'>('catalog');

  const availableUsers = users.filter((u) => u.id !== currentUser?.id);
  const selectedGiftPreset = giftPresets.find((g) => g.id === selectedGiftId);
  const selectedRecipient = users.find((u) => u.id === selectedRecipientId);
  const selectedAccount = accounts.find((a) => a.id === sourceAccountId);

  // Gifts received by currentUser
  const receivedGifts = gifts.filter((g) => g.toUserId === currentUser?.id);
  // Gifts sent by currentUser
  const sentGifts = gifts.filter((g) => g.fromUserId === currentUser?.id);

  const handleSendGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecipient || !selectedGiftPreset) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ok = sendGift(selectedRecipient.id, selectedGiftPreset.id, customNote, sourceAccountId);
      setIsSubmitting(false);
      if (ok) {
        setCustomNote('');
        setActiveTab('sent');
      }
    }, 400);
  };

  const totalGiftDollarsReceived = receivedGifts.reduce((sum, g) => sum + g.amount, 0);

  return (
    <div className="space-y-6" id="tethra-gifts-view">
      {/* Header */}
      <div className="pb-4 border-b border-[#d4af37]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Social Gifts &amp; Collect Dollars
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#d4af37]/20 text-[#fae188] border border-[#d4af37]/40 flex items-center gap-1">
              <Gift className="w-3 h-3 text-[#d4af37]" /> Send &amp; Receive Gifts
            </span>
          </div>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Reward connections, celebrate achievements, and collect real cash dollar credits from friends.
          </p>
        </div>

        {/* Total Gift Dollars Stat Badge */}
        <div className="flex items-center gap-3 bg-[#04241b] border border-[#d4af37]/40 px-4 py-2.5 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-xl">
            🎁
          </div>
          <div>
            <div className="text-[10px] text-[#8cb8a8] uppercase font-mono tracking-wider">
              Total Gift Dollars Received
            </div>
            <div className="text-lg font-mono font-bold text-[#fae188]">
              {formatMoney(totalGiftDollarsReceived)}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#144f3d] pb-2">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'catalog'
              ? 'bg-[#0d4738] text-white border border-[#d4af37]/50 shadow-md'
              : 'text-[#8cb8a8] hover:text-white'
          }`}
        >
          <Gift className="w-4 h-4 text-[#d4af37]" /> Send a Gift
        </button>
        <button
          onClick={() => setActiveTab('received')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'received'
              ? 'bg-[#0d4738] text-white border border-[#d4af37]/50 shadow-md'
              : 'text-[#8cb8a8] hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#fae188]" /> Received ({receivedGifts.length})
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'sent'
              ? 'bg-[#0d4738] text-white border border-[#d4af37]/50 shadow-md'
              : 'text-[#8cb8a8] hover:text-white'
          }`}
        >
          <History className="w-4 h-4 text-[#6ee7b7]" /> Sent ({sentGifts.length})
        </button>
      </div>

      {/* Tab: Catalog & Sending */}
      {activeTab === 'catalog' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Gift Tiers Catalog */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-sm font-bold text-[#fae188] flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#d4af37]" /> 1. Select Gift Tier
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {giftPresets.map((preset) => {
                const isSelected = selectedGiftId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedGiftId(preset.id)}
                    className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#0c4737] to-[#04241b] border-[#d4af37] shadow-lg ring-2 ring-[#d4af37]/60'
                        : 'bg-[#041e17] border-[#144f3d] hover:border-[#238268]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="text-3xl mb-2">{preset.emoji}</div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#d4af37]/20 text-[#fae188] border border-[#d4af37]/40">
                        {formatMoney(preset.amount)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{preset.name}</h3>
                      <p className="text-xs text-[#8cb8a8] mt-0.5">{preset.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recipient & Checkout */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-sm font-bold text-[#fae188] flex items-center gap-2">
              <Send className="w-4 h-4 text-[#d4af37]" /> 2. Delivery Details
            </h2>

            <form
              onSubmit={handleSendGift}
              className="emerald-card p-5 rounded-2xl border border-[#d4af37]/25 space-y-4"
            >
              {/* Selected Gift Preview */}
              {selectedGiftPreset && (
                <div className="p-3.5 rounded-xl bg-[#03231a] border border-[#d4af37]/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedGiftPreset.emoji}</span>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {selectedGiftPreset.name}
                      </div>
                      <div className="text-[11px] text-[#fae188] font-mono">
                        Cash Value: {formatMoney(selectedGiftPreset.amount)}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#6ee7b7]">Direct Dollar Transfer</span>
                </div>
              )}

              {/* Recipient Selector */}
              <div>
                <label className="block text-xs font-medium text-[#c4e3d5] mb-1.5">
                  Send Gift To:
                </label>
                <select
                  value={selectedRecipientId}
                  onChange={(e) => setSelectedRecipientId(e.target.value)}
                  required
                  className="w-full bg-[#041e17] border border-[#144f3d] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="">Select a member...</option>
                  {availableUsers.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.firstName} {u.lastName} (@{u.username})
                    </option>
                  ))}
                </select>
              </div>

              {/* Funding Account */}
              <div>
                <label className="block text-xs font-medium text-[#c4e3d5] mb-1.5">
                  Charge Account:
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
                        {acc.name} — Balance: {formatMoney(acc.balance)}
                      </option>
                    ))}
                </select>
              </div>

              {/* Note / Message */}
              <div>
                <label className="block text-xs font-medium text-[#c4e3d5] mb-1.5">
                  Gift Message / Note:
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Add a greeting or congratulations message..."
                  className="w-full bg-[#041e17] border border-[#144f3d] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedRecipientId || isSubmitting}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                  !selectedRecipientId || isSubmitting
                    ? 'bg-[#06291f] text-[#527d6d] cursor-not-allowed border border-[#144f3d]'
                    : 'gold-gradient-bg text-[#031d16] hover:scale-[1.01] shadow-lg font-extrabold cursor-pointer'
                }`}
              >
                {isSubmitting ? (
                  <span>Delivering Gift...</span>
                ) : (
                  <>
                    <Gift className="w-4 h-4" />
                    <span>
                      Deliver {selectedGiftPreset?.emoji} {selectedGiftPreset?.name} (
                      {selectedGiftPreset ? formatMoney(selectedGiftPreset.amount) : '$0'})
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab: Received Gifts */}
      {activeTab === 'received' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" /> Gifts &amp; Cash Collected from Members
            </h2>
            <span className="text-xs font-mono text-[#fae188]">
              {receivedGifts.length} Gifts In Your Trophy Vault
            </span>
          </div>

          {receivedGifts.length === 0 ? (
            <div className="emerald-card p-12 text-center rounded-2xl border border-[#d4af37]/20 text-xs text-[#8cb8a8]">
              No gifts received yet. Connect with members and share your referral link to receive reward gifts!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {receivedGifts.map((gift) => (
                <div
                  key={gift.id}
                  className="emerald-card p-4 rounded-2xl border border-[#d4af37]/30 space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {gift.fromUserAvatar ? (
                        <img
                          src={gift.fromUserAvatar}
                          alt={gift.fromUserName}
                          className="w-10 h-10 rounded-xl object-cover border border-[#d4af37]/50 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-[#072a1f] flex items-center justify-center text-lg">
                          👤
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-bold text-white">
                          {gift.fromUserName}
                        </div>
                        <div className="text-[10px] text-[#8cb8a8] font-mono">
                          {new Date(gift.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl">{gift.giftEmoji}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#03231a] border border-[#144f3d] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#fae188]">{gift.giftName}</span>
                    <span className="text-xs font-mono font-bold text-[#10b981]">
                      +{formatMoney(gift.amount)}
                    </span>
                  </div>

                  {gift.message && (
                    <p className="text-xs italic text-[#a3cbbe] bg-[#021812] p-2.5 rounded-lg border border-[#0b3327]">
                      "{gift.message}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Sent Gifts */}
      {activeTab === 'sent' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-[#d4af37]" /> Gifts You Delivered
          </h2>

          {sentGifts.length === 0 ? (
            <div className="emerald-card p-12 text-center rounded-2xl border border-[#d4af37]/20 text-xs text-[#8cb8a8]">
              You haven't sent any gifts yet. Visit the catalog to surprise a friend!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sentGifts.map((gift) => (
                <div
                  key={gift.id}
                  className="emerald-card p-4 rounded-2xl border border-[#144f3d] space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {gift.toUserAvatar ? (
                        <img
                          src={gift.toUserAvatar}
                          alt={gift.toUserName}
                          className="w-10 h-10 rounded-xl object-cover border border-[#d4af37]/50 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-[#072a1f] flex items-center justify-center text-lg">
                          👤
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-bold text-white">
                          To: {gift.toUserName}
                        </div>
                        <div className="text-[10px] text-[#8cb8a8] font-mono">
                          {new Date(gift.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl">{gift.giftEmoji}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#03231a] border border-[#144f3d] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#fae188]">{gift.giftName}</span>
                    <span className="text-xs font-mono font-bold text-[#fae188]">
                      -{formatMoney(gift.amount)}
                    </span>
                  </div>

                  {gift.message && (
                    <p className="text-xs italic text-[#a3cbbe] bg-[#021812] p-2.5 rounded-lg border border-[#0b3327]">
                      "{gift.message}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
