import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Camera,
  CheckCircle2,
  Lock,
  Award,
  Download,
  Printer,
  Sparkles,
  Share2,
  FileCheck,
} from 'lucide-react';
import { AccountCertificateModal } from './AccountCertificateModal';
import { InviteFriendsModal } from './InviteFriendsModal';

export const ProfileSettingsView: React.FC = () => {
  const { currentUser, updateProfile, showToast } = useApp();

  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [city, setCity] = useState(currentUser?.city || '');
  const [country, setCountry] = useState(currentUser?.country || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || '');
  const [showCertModal, setShowCertModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  if (!currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      firstName,
      lastName,
      phone,
      city,
      country,
      avatarUrl,
    });
    showToast({
      title: 'Profile Updated',
      message: 'Your personal information and contact details were updated.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto" id="tethra-profile-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d4af37]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Account Profile &amp; Verification
          </h1>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Manage your verified contact credentials and download official institutional certifications.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#094635] hover:bg-[#0c5943] text-white border border-[#21775f] text-xs font-bold transition-all shadow"
          >
            <Share2 className="w-3.5 h-3.5 text-[#fae188]" />
            <span>Invite Friends ($25)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCertModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl gold-gradient-bg text-[#031d16] text-xs font-extrabold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 transition-all cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Download Official PDF Certificate</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Download Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#031d16] via-[#083c2e] to-[#04241b] border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl gold-gradient-bg flex items-center justify-center text-[#031d16] font-bold text-2xl shadow-lg shrink-0">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-extrabold text-base sm:text-lg">
                Official Account Ownership &amp; Tier 2 KYC Certificate
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10b981]/30 text-[#6ee7b7] border border-[#10b981]/50 font-mono">
                ACTIVE &bull; VERIFIED
              </span>
            </div>
            <p className="text-xs text-[#a2cbbe] mt-1 max-w-xl leading-relaxed">
              Official institutional certificate stamped with the gold crest seal, member registration hash, and verified banking limits for proof of ownership.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowCertModal(true)}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl gold-gradient-bg text-[#031d16] font-extrabold text-xs shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>View &amp; Save PDF Certificate</span>
        </button>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="emerald-card rounded-3xl p-6 sm:p-8 border border-[#d4af37]/30 space-y-6">
        {/* Avatar & Badges section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#0f4637]">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={firstName}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#d4af37] shadow-md"
              />
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-white text-lg">
                {currentUser.firstName} {currentUser.lastName}
              </h3>
              <div className="text-xs text-[#8cb8a8] font-mono">
                Unique Ledger ID: <span className="text-[#fae188] font-bold">{currentUser.uniqueUserId}</span>
              </div>
              <div className="text-[11px] text-[#10b981] font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Tier 2 KYC Fully Verified</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-[#02130e] border border-[#0d3f32] text-xs font-mono text-[#6ee7b7] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Email Verified</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#02130e] border border-[#0d3f32] text-xs font-mono text-[#fae188] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Phone Verified</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">First Name</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Last Name</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a2cbbe] mb-1 flex items-center justify-between">
              <span>Email Address</span>
              <span className="text-[#10b981] font-mono text-[10px]">Verified ✓</span>
            </label>
            <input
              type="email"
              disabled
              value={currentUser.email}
              className="w-full bg-[#02130e] border border-[#0d3f32] rounded-xl py-2.5 px-3 text-sm font-mono text-[#8cb8a8] cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a2cbbe] mb-1 flex items-center justify-between">
              <span>Real Mobile Phone Number</span>
              <span className="text-[#fae188] font-mono text-[10px]">SMS Verified ✓</span>
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 839-2041"
              className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">City / Region</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#031d16] font-display font-extrabold text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02] transition-transform cursor-pointer"
        >
          Save Profile Updates
        </button>
      </form>

      {/* Certificate Modal */}
      <AccountCertificateModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
      />

      {/* Invite Friends Modal */}
      <InviteFriendsModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
      />
    </div>
  );
};
