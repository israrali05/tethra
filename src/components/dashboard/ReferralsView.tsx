import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Copy,
  Check,
  Sparkles,
  Share2,
  Gift,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  DollarSign,
  Send,
  MessageCircle,
  Twitter,
  Mail,
  ArrowRight,
  TrendingUp,
  UserPlus,
} from 'lucide-react';

export const ReferralsView: React.FC = () => {
  const { currentUser, referrals, formatMoney, showToast, users, accounts } = useApp();

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!currentUser) return null;

  const referralLink = `https://tethra.finance/signup/?ref=${currentUser.referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    showToast({
      title: 'Referral Link Copied',
      message: 'Your personal $25 reference bonus link has been copied.',
      type: 'info',
    });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentUser.referralCode);
    setCopiedCode(true);
    showToast({
      title: 'Referral Code Copied',
      message: `Referral code ${currentUser.referralCode} copied to clipboard.`,
      type: 'info',
    });
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Join me on Tethra Smart Money & Banking. Use my reference link: ${referralLink} - When you add $50 or more, unlock $25 cash reward + 2% daily income on USDT & BTC!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(
      `Manage your money smarter with @TethraFinance. Sign up with my link and get daily 2% income on USDT & BTC + $25 bonus: ${referralLink}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleShareTelegram = () => {
    const text = encodeURIComponent(
      `Join Tethra Finance & earn 2% daily yield: ${referralLink}`
    );
    window.open(`https://t.me/share/url?url=${referralLink}&text=${text}`, '_blank');
  };

  // Filter referrals where current user is the referrer
  const myReferrals = referrals?.filter((r) => r.referrerUserId === currentUser.id) || [];
  const creditedReferrals = myReferrals.filter((r) => r.status === 'credited');
  const totalRewards = creditedReferrals.reduce((acc, r) => acc + (r.rewardAmount || 25), 0);
  const qualifiedCount = creditedReferrals.length;

  return (
    <div className="space-y-8" id="tethra-referrals-view">
      {/* Header */}
      <div className="pb-4 border-b border-[#d4af37]/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#fae188] font-mono text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>$25 REFERENCE BONUS PROGRAM</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          Refer Friends &amp; Earn $25 Cash Bonus
        </h1>
        <p className="text-xs text-[#8cb8a8] mt-1">
          Share your personal reference link. When your invited friend registers and deposits $50 or more, you immediately receive an instant $25.00 cash bonus!
        </p>
      </div>

      {/* Bonus Rule Highlight Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-[#063b2c] via-[#094c39] to-[#04241b] border-2 border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.25)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center text-[#031d16] font-bold text-xl shadow-lg shrink-0">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <div className="text-white font-extrabold text-base flex items-center gap-2">
              <span>Program Rule: Add $50 &rarr; Receive $25 Bonus</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10b981]/30 text-[#6ee7b7] border border-[#10b981]/50 font-mono">
                INSTANT CASH
              </span>
            </div>
            <p className="text-xs text-[#a2cbbe] mt-0.5">
              Whenever a person you invited deposits $50.00 or more in their account, you receive a direct $25.00 cash payment.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-5 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-extrabold text-xs shadow hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Invite Link</span>
          </button>
        </div>
      </div>

      {/* Share Box Card */}
      <div className="emerald-card-highlight rounded-3xl p-6 sm:p-8 border border-[#d4af37]/50 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Reference Link */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#a2cbbe] flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Your Unique Reference Link ($25 Bonus):</span>
            </span>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#02130e] border border-[#0d3f32]">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="bg-transparent text-xs font-mono text-white flex-1 focus:outline-none truncate"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-lg gold-gradient-bg text-[#031d16] font-extrabold text-xs shrink-0 flex items-center gap-1.5 shadow"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Reference Code */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#a2cbbe]">
              Your Personal Referral Code:
            </span>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#02130e] border border-[#0d3f32]">
              <span className="text-base font-mono font-extrabold text-[#fae188] flex-1 px-2">
                {currentUser.referralCode}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3.5 py-2 rounded-lg bg-[#073024] hover:bg-[#0c4434] text-white border border-[#1a5b4a] font-bold text-xs shrink-0 flex items-center gap-1.5"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1-Click Social Sharing Buttons */}
        <div className="pt-4 border-t border-[#0d3f32] flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-[#8cb8a8] font-bold uppercase tracking-wider">
            1-Click Social Distribution:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-3.5 py-2 rounded-xl bg-[#128c7e]/20 hover:bg-[#128c7e]/40 text-[#25d366] border border-[#128c7e]/40 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={handleShareTelegram}
              className="px-3.5 py-2 rounded-xl bg-[#229ed9]/20 hover:bg-[#229ed9]/40 text-[#38bdf8] border border-[#229ed9]/40 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Telegram</span>
            </button>
            <button
              type="button"
              onClick={handleShareTwitter}
              className="px-3.5 py-2 rounded-xl bg-[#1da1f2]/20 hover:bg-[#1da1f2]/40 text-sky-400 border border-[#1da1f2]/40 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Twitter className="w-4 h-4" />
              <span>X (Twitter)</span>
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-[#041d16] hover:bg-[#072a20] text-[#eafaf4] border border-[#0d3f32] font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Mail className="w-4 h-4 text-[#fae188]" />
              <span>Email Invite</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="emerald-card rounded-2xl p-5 border border-[#d4af37]/30 space-y-1">
          <div className="text-xs text-[#8cb8a8] font-semibold uppercase">Total Invitations Sent</div>
          <div className="text-3xl font-display font-extrabold text-white">
            {myReferrals.length} Members
          </div>
          <div className="text-[11px] text-[#7da797] font-mono">Referred under your unique code</div>
        </div>

        <div className="emerald-card rounded-2xl p-5 border border-[#10b981]/40 space-y-1">
          <div className="text-xs text-[#8cb8a8] font-semibold uppercase">Qualified Referrals ($50+ Added)</div>
          <div className="text-3xl font-display font-extrabold text-[#6ee7b7]">{qualifiedCount}</div>
          <div className="text-[11px] text-[#7da797] font-mono">Unlocked $25 Bounty Payout</div>
        </div>

        <div className="emerald-card rounded-2xl p-5 border border-[#d4af37]/40 space-y-1">
          <div className="text-xs text-[#8cb8a8] font-semibold uppercase">Total Bounty Rewards Earned</div>
          <div className="text-3xl font-display font-extrabold text-[#fae188]">
            {formatMoney(totalRewards)}
          </div>
          <div className="text-[11px] text-[#7da797] font-mono">Credited to Primary Checking</div>
        </div>
      </div>

      {/* 3-Step Guide */}
      <div className="emerald-card rounded-2xl p-6 border border-[#0d3f32] space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
          <span>How the $25 Reference Bonus Program Works</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#02130e] border border-[#0d3f32] space-y-2">
            <div className="w-6 h-6 rounded-full bg-[#d4af37] text-black font-extrabold flex items-center justify-center font-mono">
              1
            </div>
            <h4 className="font-bold text-white">Share Your Reference Link</h4>
            <p className="text-[#8cb8a8]">
              Send your personal link or code (<strong className="text-white">{currentUser.referralCode}</strong>) to colleagues, investors, or friends.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#02130e] border border-[#0d3f32] space-y-2">
            <div className="w-6 h-6 rounded-full bg-[#10b981] text-black font-extrabold flex items-center justify-center font-mono">
              2
            </div>
            <h4 className="font-bold text-white">Friend Adds $50 or More</h4>
            <p className="text-[#8cb8a8]">
              Your referred connection opens their account (starting at $0.00 zero balance) and deposits at least $50 via USDT, BTC, or Wire.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#02130e] border border-[#0d3f32] space-y-2">
            <div className="w-6 h-6 rounded-full bg-[#38bdf8] text-black font-extrabold flex items-center justify-center font-mono">
              3
            </div>
            <h4 className="font-bold text-white">Instant $25.00 Cash Payout</h4>
            <p className="text-[#8cb8a8]">
              $25.00 USD is instantly credited directly into your Checking Account, with zero lock-in or withdrawal fees.
            </p>
          </div>
        </div>
      </div>

      {/* Referrals List Table */}
      <div className="emerald-card rounded-2xl border border-[#d4af37]/25 overflow-hidden">
        <div className="p-4 bg-[#02130e] border-b border-[#0f4637] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Referred Community Members &amp; Payout Status</h3>
          <span className="text-xs font-mono text-[#7ea999]">{myReferrals.length} Total</span>
        </div>

        {myReferrals.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#041d16] border border-[#144f3d] flex items-center justify-center text-[#d4af37] mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white">No Referred Members Yet</h4>
            <p className="text-xs text-[#8cb8a8] max-w-md mx-auto">
              You haven't referred any members yet. Share your reference link or code (<strong className="text-white">{currentUser.referralCode}</strong>) with friends. When they add $50+, you receive $25 cash!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#0c392c]">
            {myReferrals.map((ref) => (
              <div
                key={ref.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#062c21] transition-colors"
              >
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <span>{ref.referredName || 'Referred Member'}</span>
                  </div>
                  <div className="text-[11px] text-[#8cb8a8] font-mono">
                    {ref.referredEmail} &bull; Joined: {ref.joinedDate}
                  </div>
                  <div className="text-[10px] text-[#7ca898] mt-0.5">
                    {ref.qualificationCriteria || 'Requires $50+ deposit for $25 reward'}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs font-bold text-[#fae188] font-mono">
                      +${ref.rewardAmount || 25}.00 USD
                    </div>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded font-mono uppercase font-bold ${
                        ref.status === 'credited'
                          ? 'bg-[#10b981]/20 text-[#6ee7b7]'
                          : 'bg-yellow-900/40 text-yellow-300'
                      }`}
                    >
                      ● {ref.status === 'credited' ? 'Reward Credited ($25)' : 'Pending $50+ Deposit'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
