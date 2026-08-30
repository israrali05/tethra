import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TethraLogo } from '../common/TethraLogo';
import {
  Globe,
  Menu,
  X,
  ChevronDown,
  Shield,
  ArrowRight,
  User,
  LayoutDashboard,
  Coins,
  PiggyBank,
  Receipt,
  Users,
  Lock,
  MessageSquare,
  FileArchive,
  Smartphone,
} from 'lucide-react';
import { CURRENCY_RATES } from '../../data/initialData';

export const PublicHeader: React.FC = () => {
  const {
    setCurrentRoute,
    publicSubPage,
    setPublicSubPage,
    currentUser,
    selectedCurrency,
    setSelectedCurrency,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  const navigateTo = (page: string) => {
    setPublicSubPage(page);
    setCurrentRoute('home');
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#031510]/90 backdrop-blur-md border-b border-[#d4af37]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => navigateTo('home')}
          className="text-left focus:outline-none"
          id="header-tethra-brand"
        >
          <TethraLogo size="md" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-[#c8e3d8]">
          <button
            onClick={() => navigateTo('home')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              publicSubPage === 'home'
                ? 'text-white bg-[#0a3a2c] border border-[#d4af37]/40'
                : 'hover:text-white hover:bg-[#072c21]'
            }`}
          >
            Home
          </button>

          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
              onMouseEnter={() => setProductsDropdownOpen(true)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-white hover:bg-[#072c21] transition-colors"
            >
              <span>Features &amp; Products</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#d4af37]" />
            </button>

            {productsDropdownOpen && (
              <div
                onMouseLeave={() => setProductsDropdownOpen(false)}
                className="absolute top-full left-0 w-72 rounded-2xl bg-[#042018] border border-[#d4af37]/30 shadow-2xl p-3 grid gap-1 animate-in fade-in zoom-in-95 duration-150"
              >
                <button
                  onClick={() => navigateTo('personal-finance')}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#0a382c] text-left transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#0b4a37] text-[#d4af37]">
                    <LayoutDashboard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Personal Finance</div>
                    <div className="text-xs text-[#8fb9ab]">Multi-account &amp; cash flow ledger</div>
                  </div>
                </button>

                <button
                  onClick={() => navigateTo('savings')}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#0a382c] text-left transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#0b4a37] text-[#d4af37]">
                    <PiggyBank className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">High-Yield Savings</div>
                    <div className="text-xs text-[#8fb9ab]">Goal vaulting with auto-contributions</div>
                  </div>
                </button>

                <button
                  onClick={() => navigateTo('expenses')}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#0a382c] text-left transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#0b4a37] text-[#d4af37]">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Expense Sharing</div>
                    <div className="text-xs text-[#8fb9ab]">Group settlements &amp; receipt uploads</div>
                  </div>
                </button>

                <button
                  onClick={() => navigateTo('crypto')}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#0a382c] text-left transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#0b4a37] text-[#d4af37]">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Crypto Market Ticker</div>
                    <div className="text-xs text-[#8fb9ab]">Live price feeds &amp; portfolio tracker</div>
                  </div>
                </button>

                <button
                  onClick={() => navigateTo('referrals')}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#0a382c] text-left transition-colors"
                >
                  <div className="p-2 rounded-lg bg-[#0b4a37] text-[#d4af37]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Referral Program</div>
                    <div className="text-xs text-[#8fb9ab]">$25 reward qualification system</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => navigateTo('how-it-works')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              publicSubPage === 'how-it-works'
                ? 'text-white bg-[#0a3a2c] border border-[#d4af37]/40'
                : 'hover:text-white hover:bg-[#072c21]'
            }`}
          >
            How It Works
          </button>

          <button
            onClick={() => navigateTo('security')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              publicSubPage === 'security'
                ? 'text-white bg-[#0a3a2c] border border-[#d4af37]/40'
                : 'hover:text-white hover:bg-[#072c21]'
            }`}
          >
            Security &amp; KYC
          </button>

          <button
            onClick={() => navigateTo('faq')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              publicSubPage === 'faq'
                ? 'text-white bg-[#0a3a2c] border border-[#d4af37]/40'
                : 'hover:text-white hover:bg-[#072c21]'
            }`}
          >
            FAQ
          </button>

          <button
            onClick={() => navigateTo('about')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              publicSubPage === 'about'
                ? 'text-white bg-[#0a3a2c] border border-[#d4af37]/40'
                : 'hover:text-white hover:bg-[#072c21]'
            }`}
          >
            About
          </button>

          <button
            onClick={() => navigateTo('contact')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              publicSubPage === 'contact'
                ? 'text-white bg-[#0a3a2c] border border-[#d4af37]/40'
                : 'hover:text-white hover:bg-[#072c21]'
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => {
              setCurrentRoute('flutter-architecture');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#062d22] border border-[#10b981]/50 text-[#10b981] hover:bg-[#0a3f30] transition-colors text-xs font-mono font-semibold"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Flutter App</span>
          </button>

          <button
            onClick={() => {
              setCurrentRoute('wp-architecture');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#062d22] border border-[#d4af37]/50 text-[#fae188] hover:bg-[#0a3f30] transition-colors text-xs font-mono font-semibold"
          >
            <FileArchive className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>WordPress ZIP</span>
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Direct WhatsApp Action */}
          <a
            href="https://wa.me/18703829652?text=Hello%20Tethra%20Support"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30 text-xs font-bold transition-colors"
            title="Chat on WhatsApp (+1 870-382-9652)"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
            <span className="hidden xl:inline">+1 870-382-9652</span>
            <span className="xl:hidden">WhatsApp</span>
          </a>

          {/* Global Currency Selector */}
          <div className="relative flex items-center bg-[#072b20] border border-[#d4af37]/30 rounded-lg px-2 py-1 text-xs text-[#d7eee4]">
            <Globe className="w-3.5 h-3.5 text-[#d4af37] mr-1.5 shrink-0" />
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none cursor-pointer font-mono font-semibold"
              aria-label="Select currency"
            >
              {Object.keys(CURRENCY_RATES).map((cur) => (
                <option key={cur} value={cur} className="bg-[#031d16] text-white">
                  {cur} ({CURRENCY_RATES[cur].symbol})
                </option>
              ))}
            </select>
          </div>

          {/* User Auth CTA */}
          {currentUser ? (
            <button
              onClick={() => setCurrentRoute(currentUser.role === 'admin' ? 'admin-dashboard' : 'dashboard')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-sm shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Go to Dashboard</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setCurrentRoute('login')}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#f5ebd2] hover:text-white hover:bg-[#0a382c] border border-transparent hover:border-[#d4af37]/30 transition-all"
              >
                Log In
              </button>
              <button
                onClick={() => setCurrentRoute('register')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl gold-gradient-bg text-[#042018] font-bold text-sm shadow-[0_0_18px_rgba(212,175,55,0.25)] hover:brightness-110 transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#083327] text-white hover:bg-[#0e4838] border border-[#d4af37]/30"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#041d16] border-b border-[#d4af37]/30 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <button
              onClick={() => navigateTo('home')}
              className="p-2.5 rounded-lg bg-[#072c21] text-left text-white hover:bg-[#0d4534]"
            >
              🏠 Home
            </button>
            <button
              onClick={() => navigateTo('personal-finance')}
              className="p-2.5 rounded-lg bg-[#072c21] text-left text-white hover:bg-[#0d4534]"
            >
              📊 Personal Finance
            </button>
            <button
              onClick={() => navigateTo('savings')}
              className="p-2.5 rounded-lg bg-[#072c21] text-left text-white hover:bg-[#0d4534]"
            >
              💰 High-Yield Savings
            </button>
            <button
              onClick={() => navigateTo('expenses')}
              className="p-2.5 rounded-lg bg-[#072c21] text-left text-white hover:bg-[#0d4534]"
            >
              🧾 Expense Sharing
            </button>
            <button
              onClick={() => navigateTo('crypto')}
              className="p-2.5 rounded-lg bg-[#072c21] text-left text-white hover:bg-[#0d4534]"
            >
              🪙 Crypto Markets
            </button>
            <button
              onClick={() => navigateTo('referrals')}
              className="p-2.5 rounded-lg bg-[#072c21] text-left text-white hover:bg-[#0d4534]"
            >
              🎁 $25 Referral Program
            </button>
            <button
              onClick={() => navigateTo('how-it-works')}
              className="p-2.5 rounded-lg bg-[#072c21] text-left text-white hover:bg-[#0d4534]"
            >
              ⚡ How It Works
            </button>
            <button
              onClick={() => navigateTo('security')}
              className="p-2.5 rounded-lg bg-[#072c21] text-left text-white hover:bg-[#0d4534]"
            >
              🛡️ Security &amp; KYC
            </button>
            <button
              onClick={() => navigateTo('faq')}
              className="p-2.5 rounded-lg bg-[#072c21] text-left text-white hover:bg-[#0d4534]"
            >
              ❓ FAQ
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="p-2.5 rounded-lg bg-[#072c21] text-left text-white hover:bg-[#0d4534]"
            >
              🏛️ About Tethra
            </button>
          </div>

          <div className="pt-3 border-t border-[#d4af37]/20 flex flex-col gap-2">
            <a
              href="https://wa.me/18703829652?text=Hello%20Tethra%20Support"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-[#25D366] text-white flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp (+1 870-382-9652)</span>
            </a>

            <button
              onClick={() => {
                setCurrentRoute('wp-architecture');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl text-center text-xs font-bold bg-[#062d22] border border-[#d4af37]/50 text-[#fae188] flex items-center justify-center gap-2"
            >
              <FileArchive className="w-4 h-4 text-[#d4af37]" />
              <span>Download WordPress ZIP</span>
            </button>

            {!currentUser ? (
              <>
                <button
                  onClick={() => {
                    setCurrentRoute('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl text-center text-sm font-semibold bg-[#0a382c] text-white border border-[#267e65]"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setCurrentRoute('register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl text-center text-sm font-bold gold-gradient-bg text-[#031c15]"
                >
                  Create Free Account
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setCurrentRoute('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl text-center text-sm font-bold gold-gradient-bg text-[#031c15]"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
