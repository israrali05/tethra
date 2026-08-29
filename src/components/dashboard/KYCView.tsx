import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  FileText,
  Camera,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Lock,
  UserCheck,
} from 'lucide-react';

export const KYCView: React.FC = () => {
  const { currentUser, submitKYC } = useApp();

  const [documentType, setDocumentType] = useState<'passport' | 'drivers_license' | 'national_id'>('passport');
  const [docNumber, setDocNumber] = useState('N90284192');
  const [frontUploaded, setFrontUploaded] = useState(true);
  const [backUploaded, setBackUploaded] = useState(true);
  const [selfieUploaded, setSelfieUploaded] = useState(true);
  const [addressUploaded, setAddressUploaded] = useState(true);

  if (!currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitKYC({
      documentType,
      documentNumber: docNumber,
      frontImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      backImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
      selfieUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      proofOfAddressUrl: 'https://images.unsplash.com/photo-1554415707-9e49016a3e0a?w=600&auto=format&fit=crop&q=80',
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto" id="tethra-kyc-view">
      {/* Header */}
      <div className="pb-4 border-b border-[#d4af37]/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/20 border border-[#10b981]/50 text-[#6ee7b7] font-mono text-xs font-bold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>TIER 2 VERIFICATION PROTOCOL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          Identity Verification &amp; KYC Center
        </h1>
        <p className="text-xs text-[#8cb8a8] mt-1">
          Government-grade AML compliance unlocking unrestricted US Bank withdrawals and $25 referral qualification.
        </p>
      </div>

      {/* Current Status Pill Card */}
      <div className="emerald-card-highlight rounded-2xl p-6 border border-[#d4af37]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#084232] text-[#d4af37]">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs text-[#8cb8a8]">Current Compliance Status</div>
            <div className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
              <span>Tier 2 Status:</span>
              <span
                className={`uppercase font-mono text-sm px-2.5 py-0.5 rounded-full ${
                  currentUser.kycStatus === 'approved'
                    ? 'bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40'
                    : 'bg-yellow-900/40 text-yellow-300 border border-yellow-500/40'
                }`}
              >
                ● {currentUser.kycStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="text-xs text-[#8cb8a8] font-mono">
          Last Reviewed: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Verification Submission Form */}
      <form
        onSubmit={handleSubmit}
        className="emerald-card rounded-2xl p-6 sm:p-8 border border-[#d4af37]/30 space-y-6"
      >
        <h3 className="text-base font-bold text-white pb-3 border-b border-[#0f4637]">
          Document Verification Form
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
              Government Document Type
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value as any)}
              className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            >
              <option value="passport">International Passport</option>
              <option value="drivers_license">Driver's License (State / National)</option>
              <option value="national_id">National Identity Card / SSN Card</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
              Document Number
            </label>
            <input
              type="text"
              required
              value={docNumber}
              onChange={(e) => setDocNumber(e.target.value)}
              className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        {/* Upload Slots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Front ID */}
          <div className="p-4 rounded-xl bg-[#041d16] border border-[#144f3d] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">ID Front Side</span>
              <span className="text-[10px] text-[#10b981] font-mono">✓ Ready</span>
            </div>
            <div className="h-24 rounded-lg border-2 border-dashed border-[#1a5b4a] flex flex-col items-center justify-center text-xs text-[#8cb8a8] gap-1 cursor-pointer hover:border-[#d4af37]">
              <Upload className="w-5 h-5 text-[#d4af37]" />
              <span>Click or Drop ID Front (JPG/PNG/PDF)</span>
            </div>
          </div>

          {/* Back ID */}
          <div className="p-4 rounded-xl bg-[#041d16] border border-[#144f3d] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">ID Back Side</span>
              <span className="text-[10px] text-[#10b981] font-mono">✓ Ready</span>
            </div>
            <div className="h-24 rounded-lg border-2 border-dashed border-[#1a5b4a] flex flex-col items-center justify-center text-xs text-[#8cb8a8] gap-1 cursor-pointer hover:border-[#d4af37]">
              <Upload className="w-5 h-5 text-[#d4af37]" />
              <span>Click or Drop ID Back</span>
            </div>
          </div>

          {/* Biometric Selfie */}
          <div className="p-4 rounded-xl bg-[#041d16] border border-[#144f3d] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Live Selfie Verification</span>
              <span className="text-[10px] text-[#10b981] font-mono">✓ Ready</span>
            </div>
            <div className="h-24 rounded-lg border-2 border-dashed border-[#1a5b4a] flex flex-col items-center justify-center text-xs text-[#8cb8a8] gap-1 cursor-pointer hover:border-[#d4af37]">
              <Camera className="w-5 h-5 text-[#10b981]" />
              <span>Biometric Facial Photo Attached</span>
            </div>
          </div>

          {/* Proof of Address */}
          <div className="p-4 rounded-xl bg-[#041d16] border border-[#144f3d] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Proof of Address (Utility/Bank)</span>
              <span className="text-[10px] text-[#10b981] font-mono">✓ Ready</span>
            </div>
            <div className="h-24 rounded-lg border-2 border-dashed border-[#1a5b4a] flex flex-col items-center justify-center text-xs text-[#8cb8a8] gap-1 cursor-pointer hover:border-[#d4af37]">
              <FileText className="w-5 h-5 text-[#38bdf8]" />
              <span>Utility Bill / Statement Attached</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#031d16] font-display font-extrabold text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02] transition-transform"
        >
          Submit Documents for Compliance Review
        </button>
      </form>
    </div>
  );
};
