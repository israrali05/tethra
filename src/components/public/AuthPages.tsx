import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TethraLogo } from '../common/TethraLogo';
import {
  Lock,
  Mail,
  User,
  Phone,
  Globe,
  MapPin,
  Calendar,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

export const AuthPages: React.FC = () => {
  const { currentRoute, setCurrentRoute, login, register, users } = useApp();

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [is2FAStage, setIs2FAStage] = useState(false);
  const [twoFACode, setTwoFACode] = useState('');

  // Register Multi-Step State
  const [regStep, setRegStep] = useState(1);
  const [regData, setRegData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    country: 'United States',
    city: 'New York, NY',
    dateOfBirth: '1995-05-15',
    password: '',
    confirmPassword: '',
    referredByCode: '',
    termsAccepted: false,
    privacyAccepted: false,
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPass) return;

    // Check if target user has 2FA enabled
    const target = users.find(
      (u) =>
        u.email.toLowerCase() === loginEmail.toLowerCase() ||
        u.username.toLowerCase() === loginEmail.toLowerCase()
    );

    if (target && target.twoFactorEnabled && !is2FAStage) {
      setIs2FAStage(true);
      return;
    }

    login(loginEmail, loginPass);
  };

  const handleRegisterSubmit = () => {
    if (!regData.termsAccepted || !regData.privacyAccepted) return;
    register(regData);
  };

  const quickLoginAs = (email: string) => {
    login(email, 'password123');
  };

  // =========================================================================
  // LOGIN VIEW
  // =========================================================================
  if (currentRoute === 'login') {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden bg-[#031510]">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#10b981]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full emerald-card-highlight rounded-3xl p-8 border border-[#d4af37]/50 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <TethraLogo size="lg" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Sign In to Tethra</h2>
            <p className="text-xs text-[#8cb8a8]">
              Your financial dashboard, secured with 256-bit encryption.
            </p>
          </div>

          {/* Quick Demo Login Preset Buttons */}
          <div className="p-3.5 rounded-xl bg-[#041f17] border border-[#14533e] space-y-2">
            <div className="text-[11px] font-mono font-bold text-[#d4af37] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ONE-CLICK DEMO AUTHENTICATION:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => quickLoginAs('alexander.vance@tethra.net')}
                className="py-1.5 px-2 rounded-lg bg-[#073024] hover:bg-[#0c4736] text-[11px] text-white border border-[#21775f] font-medium transition-colors text-left"
              >
                👤 Alexander (User)
              </button>
              <button
                type="button"
                onClick={() => quickLoginAs('admin@tethra.net')}
                className="py-1.5 px-2 rounded-lg bg-[#2e1065]/60 hover:bg-[#3b0764] text-[11px] text-purple-200 border border-purple-400/40 font-medium transition-colors text-left"
              >
                👑 Elena (Admin)
              </button>
            </div>
          </div>

          {!is2FAStage ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Email or Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8cb8a8] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@tethra.net or username"
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#d4af37] placeholder:text-[#5e8275]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-[#a2cbbe]">Password</label>
                  <button
                    type="button"
                    onClick={() => setCurrentRoute('forgot-password')}
                    className="text-[11px] text-[#d4af37] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8cb8a8] absolute left-3.5 top-3" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:border-[#d4af37] placeholder:text-[#5e8275]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-3 text-[#8cb8a8] hover:text-white"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#a2cbbe]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#d4af37] rounded"
                  />
                  <span>Remember this device</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#031d16] font-display font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Sign In
              </button>
            </form>
          ) : (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3 rounded-xl bg-[#094635] text-xs text-[#a2cbbe] space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-[#d4af37]" />
                  <span>Two-Factor Authentication (2FA)</span>
                </div>
                <p>Enter the 6-digit verification code from your authenticator app.</p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value)}
                  className="w-full text-center tracking-widest text-2xl font-mono py-3 rounded-xl bg-[#041d16] border border-[#d4af37] text-white focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => login(loginEmail, loginPass)}
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-sm shadow-md"
              >
                Verify &amp; Enter Dashboard
              </button>
            </div>
          )}

          <div className="pt-4 text-center border-t border-[#0e4636] text-xs text-[#8cb8a8]">
            Don't have an account yet?{' '}
            <button
              onClick={() => setCurrentRoute('register')}
              className="text-[#d4af37] font-bold hover:underline"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // REGISTER MULTI-STEP VIEW
  // =========================================================================
  if (currentRoute === 'register') {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden bg-[#031510]">
        <div className="max-w-lg w-full emerald-card-highlight rounded-3xl p-8 border border-[#d4af37]/50 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <TethraLogo size="md" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Create Your Tethra Account</h2>
            <p className="text-xs text-[#8cb8a8]">
              Step {regStep} of 4 • Multi-currency ledger &amp; private banking vault
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between gap-2 px-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full h-1.5 rounded-full transition-all ${
                    regStep >= step ? 'bg-[#d4af37]' : 'bg-[#062c20]'
                  }`}
                />
                <span className="text-[10px] font-mono text-[#8cb8a8]">
                  {step === 1 ? 'Personal' : step === 2 ? 'Security' : step === 3 ? 'Referral' : 'Consent'}
                </span>
              </div>
            ))}
          </div>

          {/* STEP 1: Personal Information */}
          {regStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={regData.firstName}
                    onChange={(e) => setRegData({ ...regData, firstName: e.target.value })}
                    placeholder="Alexander"
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={regData.lastName}
                    onChange={(e) => setRegData({ ...regData, lastName: e.target.value })}
                    placeholder="Vance"
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={regData.email}
                  onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                  placeholder="alexander@tethra.net"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Country</label>
                  <input
                    type="text"
                    value={regData.country}
                    onChange={(e) => setRegData({ ...regData, country: e.target.value })}
                    placeholder="United States"
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">City / Region</label>
                  <input
                    type="text"
                    value={regData.city}
                    onChange={(e) => setRegData({ ...regData, city: e.target.value })}
                    placeholder="New York, NY"
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <button
                type="button"
                disabled={!regData.firstName || !regData.email}
                onClick={() => setRegStep(2)}
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#031d16] font-display font-bold text-sm shadow-md hover:scale-[1.02] transition-transform disabled:opacity-50"
              >
                Continue to Account Security &gt;
              </button>
            </div>
          )}

          {/* STEP 2: Security & Credentials */}
          {regStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Choose Username</label>
                <input
                  type="text"
                  value={regData.username}
                  onChange={(e) => setRegData({ ...regData, username: e.target.value.toLowerCase().replace(/\s+/g, '') })}
                  placeholder="alexvance"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Password</label>
                <input
                  type="password"
                  value={regData.password}
                  onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={regData.confirmPassword}
                  onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRegStep(1)}
                  className="w-1/3 py-3 rounded-xl bg-[#062c20] text-white text-xs font-semibold"
                >
                  &lt; Back
                </button>
                <button
                  type="button"
                  disabled={!regData.password || regData.password !== regData.confirmPassword}
                  onClick={() => setRegStep(3)}
                  className="w-2/3 py-3 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs disabled:opacity-50"
                >
                  Continue &gt;
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Referral Code */}
          {regStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-xl bg-[#05261d] border border-[#d4af37]/30 space-y-2">
                <div className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span>Have an Invitation Code?</span>
                </div>
                <p className="text-[11px] text-[#8cb8a8] leading-relaxed">
                  Enter your referrer's unique code to link your account to their network and unlock the $25 qualification eligibility.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Referral Code (Optional)</label>
                <input
                  type="text"
                  value={regData.referredByCode}
                  onChange={(e) => setRegData({ ...regData, referredByCode: e.target.value.toUpperCase() })}
                  placeholder="e.g. TETHRA-A8F29K"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRegStep(2)}
                  className="w-1/3 py-3 rounded-xl bg-[#062c20] text-white text-xs font-semibold"
                >
                  &lt; Back
                </button>
                <button
                  type="button"
                  onClick={() => setRegStep(4)}
                  className="w-2/3 py-3 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs"
                >
                  Next: Consent &gt;
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Legal Consent & Completion */}
          {regStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-xl bg-[#041d16] border border-[#144f3d] space-y-3 text-xs text-[#a2cbbe]">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={regData.termsAccepted}
                    onChange={(e) => setRegData({ ...regData, termsAccepted: e.target.checked })}
                    className="accent-[#d4af37] mt-0.5"
                  />
                  <span>
                    I accept the <strong className="text-white">Terms &amp; Conditions</strong>, <strong className="text-white">Risk Disclosure</strong>, and understand returns are not guaranteed.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={regData.privacyAccepted}
                    onChange={(e) => setRegData({ ...regData, privacyAccepted: e.target.checked })}
                    className="accent-[#d4af37] mt-0.5"
                  />
                  <span>
                    I agree to the <strong className="text-white">Privacy Policy</strong> and acknowledge Tier 2 KYC verification will be required for external banking payouts.
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRegStep(3)}
                  className="w-1/3 py-3 rounded-xl bg-[#062c20] text-white text-xs font-semibold"
                >
                  &lt; Back
                </button>
                <button
                  type="button"
                  disabled={!regData.termsAccepted || !regData.privacyAccepted}
                  onClick={handleRegisterSubmit}
                  className="w-2/3 py-3 rounded-xl gold-gradient-bg text-[#031d16] font-display font-extrabold text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50"
                >
                  Complete Registration 🎉
                </button>
              </div>
            </div>
          )}

          <div className="pt-2 text-center border-t border-[#0e4636] text-xs text-[#8cb8a8]">
            Already have an account?{' '}
            <button
              onClick={() => setCurrentRoute('login')}
              className="text-[#d4af37] font-bold hover:underline"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // FORGOT PASSWORD VIEW
  // =========================================================================
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[#031510]">
      <div className="max-w-md w-full emerald-card rounded-3xl p-8 border border-[#d4af37]/40 space-y-6">
        <div className="text-center space-y-2">
          <TethraLogo size="md" />
          <h2 className="text-xl font-bold text-white mt-3">Reset Password</h2>
          <p className="text-xs text-[#8cb8a8]">
            Enter your account email to receive an instant verification reset link.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Password reset link sent to demo email address.');
            setCurrentRoute('login');
          }}
          className="space-y-4"
        >
          <input
            type="email"
            required
            placeholder="alexander@tethra.net"
            className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs shadow-md"
          >
            Send Reset Instructions
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setCurrentRoute('login')}
            className="text-xs text-[#d4af37] hover:underline"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};
