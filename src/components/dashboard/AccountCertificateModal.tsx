import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Award,
  Download,
  Printer,
  X,
  CheckCircle2,
  Lock,
  Globe,
  Building2,
  QrCode,
  Sparkles,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountCertificateModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { currentUser, accounts, formatMoney } = useApp();
  const certRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !currentUser) return null;

  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const certNumber = `TET-CERT-${currentUser.uniqueUserId.replace(/[^A-Z0-9]/gi, '')}-${new Date().getFullYear()}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="max-w-4xl w-full emerald-card rounded-3xl border-2 border-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.3)] overflow-hidden my-8 relative">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#031510] border-b border-[#d4af37]/30">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#d4af37]" />
            <span className="font-display font-bold text-white text-sm">
              Official Account Ownership &amp; Tier 2 KYC Certificate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-[#094635] hover:bg-[#0c5943] text-white border border-[#21775f] text-xs font-bold flex items-center gap-1.5 transition-all shadow"
            >
              <Printer className="w-4 h-4 text-[#fae188]" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#041d16] text-[#8cb8a8] hover:text-white hover:bg-[#073024] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Printable Area) */}
        <div
          ref={certRef}
          className="p-8 sm:p-12 bg-gradient-to-b from-[#02130e] via-[#042018] to-[#02110c] text-white relative overflow-hidden"
        >
          {/* Ornate Gold Border & Guilloche Watermark */}
          <div className="absolute inset-4 border-2 border-[#d4af37]/50 rounded-2xl pointer-events-none" />
          <div className="absolute inset-6 border border-[#d4af37]/25 rounded-xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center relative z-10 space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gold-gradient-bg text-[#031d16] shadow-[0_0_25px_rgba(212,175,55,0.4)] mb-1">
              <ShieldCheck className="w-9 h-9" />
            </div>

            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-[#fae188]">
              Tethra Institutional Banking Infrastructure
            </h2>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              CERTIFICATE OF ACCOUNT OWNERSHIP
            </h1>

            <p className="text-xs font-mono text-[#8cb8a8]">
              Document Verification Ref: <span className="text-[#fae188] font-bold">{certNumber}</span>
            </p>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 my-8 relative z-10">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          {/* Main Statement */}
          <div className="text-center max-w-2xl mx-auto space-y-4 relative z-10">
            <p className="text-xs sm:text-sm text-[#c2dfd4] leading-relaxed">
              This official document certifies that the individual named below is a verified primary account holder in full legal standing within the Tethra Financial multi-currency network, authorized for institutional high-yield staking and cross-border bank settlement.
            </p>

            <div className="py-4 px-6 rounded-2xl bg-[#031610]/90 border border-[#d4af37]/40 max-w-lg mx-auto shadow-inner">
              <div className="text-xs text-[#8cb8a8] uppercase font-mono tracking-wider">Account Beneficiary</div>
              <div className="text-xl sm:text-2xl font-display font-extrabold gold-gradient-text mt-1">
                {currentUser.firstName} {currentUser.lastName}
              </div>
              <div className="text-xs text-[#a0c5b9] font-mono mt-1">
                Email: {currentUser.email} • Phone: {currentUser.phone || '+1 (555) 839-2041'}
              </div>
              <div className="text-[11px] text-[#78a494] font-mono mt-0.5">
                Jurisdiction: {currentUser.city}, {currentUser.country}
              </div>
            </div>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mt-8 text-xs font-mono relative z-10">
            <div className="p-3 rounded-xl bg-[#041d16] border border-[#0f4939] text-center">
              <div className="text-[#8cb8a8] text-[10px] uppercase">Unique Account ID</div>
              <div className="font-bold text-white mt-1 truncate">{currentUser.uniqueUserId}</div>
            </div>

            <div className="p-3 rounded-xl bg-[#041d16] border border-[#0f4939] text-center">
              <div className="text-[#8cb8a8] text-[10px] uppercase">KYC Tier Status</div>
              <div className="font-bold text-[#10b981] mt-1 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tier 2 Verified</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#041d16] border border-[#0f4939] text-center">
              <div className="text-[#8cb8a8] text-[10px] uppercase">Daily Payout Limit</div>
              <div className="font-bold text-[#fae188] mt-1">$100,000.00 USD</div>
            </div>

            <div className="p-3 rounded-xl bg-[#041d16] border border-[#0f4939] text-center">
              <div className="text-[#8cb8a8] text-[10px] uppercase">Issue Date</div>
              <div className="font-bold text-white mt-1">{issueDate}</div>
            </div>
          </div>

          {/* Signatures & Seal Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end justify-between max-w-3xl mx-auto mt-10 pt-8 border-t border-[#d4af37]/30 relative z-10">
            {/* Signature 1 */}
            <div className="text-center sm:text-left space-y-1">
              <div className="font-serif italic text-lg text-[#fae188]">Elena Vance</div>
              <div className="h-[1px] w-36 bg-[#8cb8a8]/50 mx-auto sm:mx-0" />
              <div className="text-[10px] font-mono text-[#8cb8a8]">Chief Compliance Officer</div>
              <div className="text-[9px] font-mono text-[#5e8b7b]">Tethra Treasury Custody</div>
            </div>

            {/* Official Gold Seal Badge */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full gold-gradient-bg p-1 shadow-[0_0_30px_rgba(212,175,55,0.5)] flex items-center justify-center relative">
                <div className="w-full h-full rounded-full border-2 border-dashed border-[#031d16] flex flex-col items-center justify-center text-[#031d16] font-bold text-[9px] text-center leading-tight">
                  <Award className="w-6 h-6 mb-0.5" />
                  <span>OFFICIAL SEAL</span>
                </div>
              </div>
              <span className="text-[9px] font-mono text-[#d4af37] mt-2 font-bold uppercase tracking-widest">
                VERIFIED CRYPTOGRAPHIC RECORD
              </span>
            </div>

            {/* Signature 2 */}
            <div className="text-center sm:text-right space-y-1">
              <div className="font-serif italic text-lg text-[#fae188]">Marcus Sterling, CFA</div>
              <div className="h-[1px] w-36 bg-[#8cb8a8]/50 mx-auto sm:ml-auto sm:mr-0" />
              <div className="text-[10px] font-mono text-[#8cb8a8]">Managing Director</div>
              <div className="text-[9px] font-mono text-[#5e8b7b]">Global Clearing &amp; Settlement</div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="text-center mt-8 text-[9px] font-mono text-[#5e8b7b] relative z-10">
            This digital certificate is secured by 256-bit SHA encryption. To verify the cryptographic integrity of this credential, scan via any standard validator or query api.tethra.finance/verify/{certNumber}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-[#031510] border-t border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#8cb8a8] flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#10b981]" />
            <span>Guaranteed Tier 2 verified financial identity pass.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download / Save Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
