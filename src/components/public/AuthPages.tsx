import React, { useState, useEffect } from 'react';
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
  Copy,
  Check,
  RefreshCw,
  Gift,
} from 'lucide-react';

const COUNTRY_DIAL_CODES = [
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬' },
  { name: 'Japan', code: '+81', flag: '🇯🇵' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
];

export const AuthPages: React.FC = () => {
  const { currentRoute, setCurrentRoute, login, register, users, showToast } = useApp();

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [is2FAStage, setIs2FAStage] = useState(false);
  const [twoFACode, setTwoFACode] = useState('');

  // Register Multi-Step State
  const [regStep, setRegStep] = useState(1);
  const [countryCode, setCountryCode] = useState('+1');
  const [rawPhone, setRawPhone] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('739204');
  const [userOtpInput, setUserOtpInput] = useState('');
  const [otpSentToast, setOtpSentToast] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [pinCode, setPinCode] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');

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
    pin: '',
    referredByCode: '',
    termsAccepted: false,
    privacyAccepted: false,
    emailVerified: false,
  });

  // Countdown timer for OTP
  useEffect(() => {
    let interval: any = null;
    if (regStep === 3 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [regStep, resendTimer]);

  const handleSendOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setResendTimer(60);
    setOtpSentToast(true);
    showToast({
      title: '📧 Verification Code Dispatched!',
      message: `Security PIN code [${code}] sent to ${regData.email}`,
      type: 'info',
    });
  };

  const handleVerifyOtp = () => {
    if (userOtpInput.trim() === generatedOtp || userOtpInput.trim() === '739204') {
      setRegData((prev) => ({ ...prev, emailVerified: true }));
      showToast({
        title: '✅ Email Address Verified',
        message: 'Your email has been authenticated. Please establish your 6-digit transaction PIN.',
        type: 'success',
      });
      setRegStep(4);
    } else {
      showToast({
        title: 'Invalid Code',
        message: 'The 6-digit verification code entered is incorrect. Check your email or use the demo code provided.',
        type: 'error',
      });
    }
  };

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
    const finalPhone = `${countryCode} ${rawPhone}`;
    register({
      ...regData,
      phone: finalPhone,
      pin: pinCode || '123456',
    });
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
              Your multi-currency financial vault, secured with 256-bit encryption.
            </p>
          </div>

          {/* Security Notice */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#8cb8a8] bg-[#002018] border border-[#004D38] py-2 px-3 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-[#10b981]" />
            <span>256-Bit Encrypted Institutional Banking Gateway</span>
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
  // REGISTER MULTI-STEP VIEW WITH EMAIL OTP & PHONE VERIFICATION
  // =========================================================================
  if (currentRoute === 'register') {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden bg-[#031510]">
        <div className="max-w-lg w-full emerald-card-highlight rounded-3xl p-6 sm:p-8 border border-[#d4af37]/50 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <TethraLogo size="md" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Open Verified Tethra Account</h2>
            <p className="text-xs text-[#8cb8a8]">
              Step {regStep} of 5 • Multi-currency ledger, 2% daily yield &amp; institutional security
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between gap-1.5 px-1">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full h-1.5 rounded-full transition-all ${
                    regStep >= step ? 'bg-[#d4af37]' : 'bg-[#062c20]'
                  }`}
                />
                <span className="text-[9px] font-mono text-[#8cb8a8] truncate">
                  {step === 1 ? 'Personal' : step === 2 ? 'Phone' : step === 3 ? 'Email OTP' : step === 4 ? 'PIN / Security' : 'Referral'}
                </span>
              </div>
            ))}
          </div>

          {/* STEP 1: Personal Information & Email */}
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
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Email Address <span className="text-[#fae188] font-normal">(6-digit OTP code sent here)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8cb8a8] absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    placeholder="alexander@tethra.net"
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Country</label>
                  <select
                    value={regData.country}
                    onChange={(e) => {
                      const selected = e.target.value;
                      setRegData({ ...regData, country: selected });
                      const match = COUNTRY_DIAL_CODES.find((c) => c.name === selected);
                      if (match) setCountryCode(match.code);
                    }}
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {COUNTRY_DIAL_CODES.map((c) => (
                      <option key={c.name} value={c.name} className="bg-[#031510] text-white">
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">City / State</label>
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
                Next: Phone Number &gt;
              </button>
            </div>
          )}

          {/* STEP 2: Real Phone Number with International Country Code */}
          {regStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3.5 rounded-xl bg-[#05261d] border border-[#144f3d] space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                  <span>Real Mobile Phone Number Verification</span>
                </div>
                <p className="text-[11px] text-[#8cb8a8]">
                  Used for SMS notifications, high-value transfer verifications, and VIP support hotline.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1.5">
                  Select Country Dial Code &amp; Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-32 bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-2 text-xs font-mono text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {COUNTRY_DIAL_CODES.map((c) => (
                      <option key={c.name} value={c.code} className="bg-[#031510] text-white">
                        {c.flag} {c.code} ({c.name})
                      </option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    required
                    value={rawPhone}
                    onChange={(e) => setRawPhone(e.target.value.replace(/[^0-9\s-]/g, ''))}
                    placeholder="e.g. 555-839-2041"
                    className="flex-1 bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <p className="text-[10px] font-mono text-[#78a494] mt-1.5">
                  Full Format: <span className="text-[#fae188]">{countryCode} {rawPhone || 'XXXX-XXXXXX'}</span>
                </p>
              </div>

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
                  disabled={!rawPhone}
                  onClick={() => {
                    handleSendOtp();
                    setRegStep(3);
                  }}
                  className="w-2/3 py-3 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs disabled:opacity-50"
                >
                  Send 6-Digit Email Code &gt;
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Mandatory Email OTP Verification */}
          {regStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-xl bg-[#05261d] border border-[#d4af37]/40 space-y-2">
                <div className="font-bold text-white text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-[#d4af37]" />
                    <span>Email Verification Security Code (OTP)</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40 font-mono">
                    SENT
                  </span>
                </div>
                <p className="text-[11px] text-[#8cb8a8] leading-relaxed">
                  A 6-digit confirmation security PIN was dispatched to <strong className="text-white">{regData.email}</strong>.
                </p>

                {/* Demo live OTP helper pill */}
                <div className="p-2.5 rounded-lg bg-[#02130e] border border-[#0d3f32] flex items-center justify-between">
                  <div className="text-[10px] text-[#a0c5b9]">
                    <span>Demo Instant Code: </span>
                    <strong className="text-[#fae188] font-mono text-sm tracking-widest">{generatedOtp}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUserOtpInput(generatedOtp)}
                    className="text-[10px] font-bold text-[#10b981] hover:underline px-2 py-1 bg-[#073024] rounded border border-[#15533f]"
                  >
                    Auto-Fill
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1.5 text-center">
                  Enter 6-Digit Email Verification PIN:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={userOtpInput}
                  onChange={(e) => setUserOtpInput(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="000000"
                  className="w-full text-center tracking-[0.4em] text-2xl font-mono py-3 rounded-xl bg-[#041d16] border-2 border-[#d4af37] text-white focus:outline-none shadow-inner"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-[#8cb8a8]">
                <span>Didn't receive code?</span>
                <button
                  type="button"
                  disabled={resendTimer > 0}
                  onClick={handleSendOtp}
                  className="text-[#fae188] hover:underline disabled:opacity-50 flex items-center gap-1 font-mono text-[11px]"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code Now'}</span>
                </button>
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
                  disabled={userOtpInput.length !== 6}
                  onClick={handleVerifyOtp}
                  className="w-2/3 py-3 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs disabled:opacity-50"
                >
                  Verify Email &amp; Continue &gt;
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Password & 6-Digit Transaction PIN */}
          {regStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3.5 rounded-xl bg-[#041f17] border border-[#144f3d] space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                  <span>Email Verified! Set Account Password &amp; 6-Digit PIN</span>
                </div>
                <p className="text-[11px] text-[#8cb8a8]">
                  The 6-digit PIN authorizes high-value transfers, deposits, and withdrawal orders.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Login Password</label>
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">6-Digit Transfer PIN</label>
                  <input
                    type="password"
                    maxLength={6}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="e.g. 123456"
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-center text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Confirm 6-Digit PIN</label>
                  <input
                    type="password"
                    maxLength={6}
                    value={pinConfirm}
                    onChange={(e) => setPinConfirm(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="e.g. 123456"
                    className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-center text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
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
                  disabled={!regData.password || regData.password !== regData.confirmPassword || pinCode.length !== 6 || pinCode !== pinConfirm}
                  onClick={() => setRegStep(5)}
                  className="w-2/3 py-3 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs disabled:opacity-50"
                >
                  Next: $25 Referral Bounty &gt;
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Referral / Reference ID (Optional $25 Reward) & Consent */}
          {regStep === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-xl bg-[#05261d] border-2 border-[#d4af37]/40 space-y-2">
                <div className="font-bold text-white text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-[#d4af37]" />
                    <span>$25 Reference Reward Code (Optional)</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40 font-mono">
                    +$25.00 REWARD
                  </span>
                </div>
                <p className="text-[11px] text-[#8cb8a8] leading-relaxed">
                  If you were invited by a friend or colleague, enter their unique reference code. <strong className="text-white">Both you and your referrer receive an instant $25 credit</strong> upon initial verified deposit!
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Referral / Reference ID <span className="text-[#8cb8a8] font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={regData.referredByCode}
                  onChange={(e) => setRegData({ ...regData, referredByCode: e.target.value.toUpperCase() })}
                  placeholder="e.g. TETHRA-A8F29K or leave empty"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#041d16] border border-[#144f3d] space-y-2.5 text-xs text-[#a2cbbe]">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={regData.termsAccepted}
                    onChange={(e) => setRegData({ ...regData, termsAccepted: e.target.checked })}
                    className="accent-[#d4af37] mt-0.5"
                  />
                  <span>
                    I agree to the <strong className="text-white">Terms of Banking &amp; 2% Daily Yield Staking</strong>.
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
                    I agree to the <strong className="text-white">Privacy Policy</strong> and certify my phone and email details are accurate.
                  </span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRegStep(4)}
                  className="w-1/3 py-3 rounded-xl bg-[#062c20] text-white text-xs font-semibold"
                >
                  &lt; Back
                </button>
                <button
                  type="button"
                  disabled={!regData.termsAccepted || !regData.privacyAccepted}
                  onClick={handleRegisterSubmit}
                  className="w-2/3 py-3.5 rounded-xl gold-gradient-bg text-[#031d16] font-display font-extrabold text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50"
                >
                  Activate Account 🎉
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
