import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Copy,
  Check,
  Sparkles,
  Share2,
  Gift,
  X,
  MessageCircle,
  Send,
  Twitter,
  Mail,
  Smartphone,
  QrCode,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteFriendsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentUser, showToast } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen || !currentUser) return null;

  const referralLink = `https://tethra.finance/register?ref=${currentUser.referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    showToast({
      title: 'Link Copied!',
      message: 'Your $25 reference invite link is copied to your clipboard.',
      type: 'info',
    });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentUser.referralCode);
    setCopiedCode(true);
    showToast({
      title: 'Referral Code Copied!',
      message: `Code ${currentUser.referralCode} copied.`,
      type: 'info',
    });
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Hey! I'm using Tethra for high-yield banking & 2% daily Tether earnings. Join using my referral link and we BOTH get an instant $25 bonus: ${referralLink}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareTelegram = () => {
    const text = encodeURIComponent(
      `Join Tethra Finance with my invite link to get your $25 welcome reward: ${referralLink}`
    );
    window.open(`https://t.me/share/url?url=${referralLink}&text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(
      `Sign up for @TethraFinance using my invite code ${currentUser.referralCode} to claim your $25 welcome bonus + 2% daily yield: ${referralLink}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleShareSMS = () => {
    const text = encodeURIComponent(
      `Join me on Tethra Finance and claim your $25 welcome bonus: ${referralLink}`
    );
    window.open(`sms:?&body=${text}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(`You're invited to Tethra Finance ($25 Welcome Bonus)`);
    const body = encodeURIComponent(
      `Hi,\n\nI wanted to invite you to Tethra Financial Infrastructure. When you create your account using my personal invitation link, we both receive a $25 deposit reward.\n\nClaim your $25 bonus here:\n${referralLink}\n\nReferral Code: ${currentUser.referralCode}\n\nBest regards,\n${currentUser.firstName} ${currentUser.lastName}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="max-w-xl w-full emerald-card rounded-3xl border border-[#d4af37]/60 shadow-[0_0_50px_rgba(212,175,55,0.25)] overflow-hidden my-8 relative">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#031d16] via-[#083e30] to-[#042018] border-b border-[#d4af37]/30 flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center text-[#031d16] font-bold text-xl shadow-lg shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#fae188] font-mono text-[10px] font-bold mb-1">
                <Sparkles className="w-3 h-3 text-[#d4af37]" />
                <span>$25 BOUNTY PROGRAM</span>
              </div>
              <h2 className="text-xl font-display font-extrabold text-white">
                Invite Friends &amp; Both Get $25
              </h2>
              <p className="text-xs text-[#a2cbbe]">
                Share your invite link with your contacts, family, and network.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#041d16] text-[#8cb8a8] hover:text-white hover:bg-[#073024] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* How it works 3-step pill */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#02130e] border border-[#0d3f32] text-center text-xs">
            <div className="space-y-1">
              <div className="w-6 h-6 rounded-full bg-[#083a2d] text-[#fae188] font-bold mx-auto flex items-center justify-center text-xs">1</div>
              <div className="font-bold text-white text-[11px]">Share Link</div>
              <div className="text-[10px] text-[#78a494]">Send your ref link</div>
            </div>
            <div className="space-y-1 border-x border-[#0d3f32]">
              <div className="w-6 h-6 rounded-full bg-[#083a2d] text-[#fae188] font-bold mx-auto flex items-center justify-center text-xs">2</div>
              <div className="font-bold text-white text-[11px]">Friend Joins</div>
              <div className="text-[10px] text-[#78a494]">Registers &amp; deposits</div>
            </div>
            <div className="space-y-1">
              <div className="w-6 h-6 rounded-full bg-[#10b981]/20 text-[#6ee7b7] font-bold mx-auto flex items-center justify-center text-xs">3</div>
              <div className="font-bold text-[#6ee7b7] text-[11px]">Both Get $25</div>
              <div className="text-[10px] text-[#78a494]">Direct to checking</div>
            </div>
          </div>

          {/* Copyable Link & Code */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#a2cbbe] mb-1.5 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Your Personal Reference Invite Link</span>
              </label>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#031711] border border-[#144f3d]">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="bg-transparent text-xs font-mono text-white flex-1 focus:outline-none truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-lg gold-gradient-bg text-[#031d16] font-bold text-xs shrink-0 flex items-center gap-1.5 shadow"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#031711] border border-[#144f3d] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#8cb8a8] uppercase font-mono">Your Referral Code</div>
                  <div className="text-base font-mono font-extrabold text-[#fae188] mt-0.5">{currentUser.referralCode}</div>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="p-2 rounded-lg bg-[#073024] hover:bg-[#0c4736] text-white border border-[#1e6a54]"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4 text-[#8cb8a8]" />}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#031711] border border-[#144f3d] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#8cb8a8] uppercase font-mono">Bounty Per Friend</div>
                  <div className="text-base font-mono font-extrabold text-[#10b981] mt-0.5">+$25.00 USD</div>
                </div>
                <DollarSign className="w-5 h-5 text-[#10b981]" />
              </div>
            </div>
          </div>

          {/* Social Channels 1-Click Buttons */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-[#a2cbbe] uppercase tracking-wider block">
              1-Click Instant Social Invite:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <button
                onClick={handleShareWhatsApp}
                className="py-2.5 px-3 rounded-xl bg-[#128c7e]/20 hover:bg-[#128c7e]/40 text-[#25d366] border border-[#128c7e]/40 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleShareTelegram}
                className="py-2.5 px-3 rounded-xl bg-[#229ed9]/20 hover:bg-[#229ed9]/40 text-[#38bdf8] border border-[#229ed9]/40 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </button>

              <button
                onClick={handleShareTwitter}
                className="py-2.5 px-3 rounded-xl bg-[#1da1f2]/20 hover:bg-[#1da1f2]/40 text-sky-400 border border-[#1da1f2]/40 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Twitter className="w-4 h-4" />
                <span>X (Twitter)</span>
              </button>

              <button
                onClick={handleShareSMS}
                className="py-2.5 px-3 rounded-xl bg-[#094635] hover:bg-[#0c5943] text-[#6ee7b7] border border-[#1d6b54] font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Smartphone className="w-4 h-4 text-[#fae188]" />
                <span>Direct SMS</span>
              </button>

              <button
                onClick={handleShareEmail}
                className="py-2.5 px-3 rounded-xl bg-[#041d16] hover:bg-[#082a20] text-white border border-[#144f3d] font-bold text-xs flex items-center justify-center gap-2 transition-all col-span-2 sm:col-span-2"
              >
                <Mail className="w-4 h-4 text-[#fae188]" />
                <span>Send Formal Email Invitation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
