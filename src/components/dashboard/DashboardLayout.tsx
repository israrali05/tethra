import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TethraLogo } from '../common/TethraLogo';
import {
  LayoutDashboard,
  CreditCard,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  PiggyBank,
  TrendingUp,
  Coins,
  Users,
  UserPlus,
  ShieldCheck,
  Lock,
  Headphones,
  Settings,
  LogOut,
  Bell,
  Search,
  Globe,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  Layers,
  Sparkles,
  Database,
  Code2,
  Smartphone,
} from 'lucide-react';
import { CURRENCY_RATES } from '../../data/initialData';
import { AppRoute } from '../../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const {
    currentRoute,
    setCurrentRoute,
    currentUser,
    logout,
    notifications,
    markNotificationAsRead,
    selectedCurrency,
    setSelectedCurrency,
  } = useApp();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const navItems: { id: AppRoute; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'accounts', label: 'My Accounts & Ledger', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'p2p-transfer', label: 'Send & Receive (P2P)', icon: <ArrowUpRight className="w-4 h-4 text-[#10b981]" />, badge: 'Instant' },
    { id: 'gifts', label: 'Gifts & Dollars', icon: <Sparkles className="w-4 h-4 text-[#fae188]" />, badge: 'Gifts' },
    { id: 'daily-bonus', label: '2% 24h Daily Bonus', icon: <TrendingUp className="w-4 h-4 text-[#d4af37]" />, badge: '+2%' },
    { id: 'deposit', label: 'Deposit Funds', icon: <ArrowDownLeft className="w-4 h-4 text-[#10b981]" /> },
    { id: 'withdraw', label: 'Withdraw (US Bank)', icon: <ArrowUpRight className="w-4 h-4 text-[#d4af37]" /> },
    { id: 'transactions', label: 'Transaction History', icon: <Receipt className="w-4 h-4" /> },
    { id: 'earnings', label: 'Earnings & Yield', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'savings', label: 'Savings Goals', icon: <PiggyBank className="w-4 h-4" /> },
    { id: 'expenses', label: 'Expense Tracking', icon: <Receipt className="w-4 h-4" /> },
    { id: 'groups', label: 'Shared Groups', icon: <Users className="w-4 h-4" /> },
    { id: 'crypto', label: 'Crypto Markets', icon: <Coins className="w-4 h-4" /> },
    { id: 'referrals', label: '$25 Referral Program', icon: <Sparkles className="w-4 h-4 text-[#fae188]" />, badge: '$25' },
    { id: 'connections', label: 'Find People & Profiles', icon: <UserPlus className="w-4 h-4" /> },
    { id: 'kyc', label: 'Identity & KYC', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'security', label: 'Security & 2FA', icon: <Lock className="w-4 h-4" /> },
    { id: 'support', label: '24/7 Dedicated Support', icon: <Headphones className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'wp-architecture', label: 'WordPress Suite & ZIP', icon: <Globe className="w-4 h-4 text-[#38bdf8]" />, badge: 'WP' },
  ];

  return (
    <div className="min-h-screen bg-[#031510] text-[#eafaf4] flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#02100c]/95 backdrop-blur-md border-b border-[#d4af37]/25 h-16 flex items-center justify-between px-4 sm:px-6">
        {/* Left Brand & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#072a1f] text-white hover:bg-[#0c4030] border border-[#144f3d]"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button onClick={() => setCurrentRoute('home')} className="focus:outline-none text-left">
            <TethraLogo size="sm" showSubtext={false} />
          </button>

          {/* Quick Admin Portal Direct Access Button */}
          <button
            onClick={() => setCurrentRoute('admin-dashboard')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-red-950/80 via-purple-950/90 to-red-950/80 hover:from-red-900/90 hover:to-purple-900/90 border border-[#d4af37]/60 text-xs font-mono text-[#fae188] shadow-md transition-all font-bold"
            title="Open Full Executive Admin Control Center"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span>Admin Portal</span>
          </button>

          {/* Quick Flutter Architecture Inspector Button */}
          <button
            onClick={() => setCurrentRoute('flutter-architecture')}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#062d22] hover:bg-[#0b4a37] border border-[#10b981]/50 text-[11px] font-mono text-[#10b981] transition-colors"
            title="Inspect Flutter, GoRouter, Provider & Firebase Architecture"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Flutter App</span>
          </button>

          {/* Quick WordPress Architecture Inspector Button */}
          <button
            onClick={() => setCurrentRoute('wp-architecture')}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0a382c] hover:bg-[#11503f] border border-[#d4af37]/40 text-[11px] font-mono text-[#fae188] transition-colors"
            title="Inspect WordPress Plugin & Theme Architecture"
          >
            <Code2 className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>WP Stack Spec</span>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="flex items-center bg-[#06291f] border border-[#d4af37]/30 rounded-lg px-2 py-1 text-xs text-[#d7eee4]">
            <Globe className="w-3.5 h-3.5 text-[#d4af37] mr-1.5 shrink-0" />
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none cursor-pointer font-mono font-semibold text-xs"
            >
              {Object.keys(CURRENCY_RATES).map((cur) => (
                <option key={cur} value={cur} className="bg-[#031d16] text-white">
                  {cur}
                </option>
              ))}
            </select>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-xl bg-[#072a1f] hover:bg-[#0c4030] text-white border border-[#144f3d] relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#d4af37] text-black text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#042018] border border-[#d4af37]/40 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/20 mb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#d4af37]" />
                    <span className="font-bold text-sm text-white">Notifications</span>
                  </div>
                  <span className="text-xs text-[#8cb8a8] font-mono">{unreadCount} Unread</span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                        n.isRead
                          ? 'bg-[#031812] border-[#0c392c] text-[#8cb8a8]'
                          : 'bg-[#093e30] border-[#d4af37]/40 text-white font-medium shadow-sm'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-[11px]">{n.title}</span>
                        <span className="text-[9px] text-[#76a192] font-mono">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          {currentUser && (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-[#072a1f] hover:bg-[#0c4030] border border-[#d4af37]/30 transition-colors"
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.firstName}
                  className="w-7 h-7 rounded-lg object-cover border border-[#d4af37]"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-white leading-tight">
                    {currentUser.firstName} {currentUser.lastName}
                  </div>
                  <div className="text-[10px] text-[#d4af37] font-mono uppercase">
                    {currentUser.role}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#8cb8a8]" />
              </button>

              {userMenuOpen && (
                <div
                  onMouseLeave={() => setUserMenuOpen(false)}
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#042018] border border-[#d4af37]/40 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 py-2 border-b border-[#0f4637] mb-1">
                    <div className="text-xs font-bold text-white">
                      {currentUser.firstName} {currentUser.lastName}
                    </div>
                    <div className="text-[10px] font-mono text-[#8cb8a8]">{currentUser.email}</div>
                    <div className="text-[9px] font-mono text-[#d4af37] mt-0.5">
                      ID: {currentUser.uniqueUserId}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentRoute('profile');
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs hover:bg-[#08382b] text-white"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Profile &amp; Privacy</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentRoute('security');
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs hover:bg-[#08382b] text-white"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>Security &amp; 2FA</span>
                  </button>

                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => {
                        setCurrentRoute('admin-dashboard');
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs hover:bg-purple-900/40 text-purple-200"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                      <span>Admin Portal</span>
                    </button>
                  )}

                  <div className="pt-1 border-t border-[#0f4637] mt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-950/40"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Body Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar (Left) */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#02100c] border-r border-[#d4af37]/20 p-4 shrink-0 overflow-y-auto space-y-6">
          {/* Admin Switcher Card if user is Admin */}
          {currentUser?.role === 'admin' && (
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-400/40 text-xs text-purple-200">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Admin Privileges Active</span>
              </div>
              <button
                onClick={() => setCurrentRoute('admin-dashboard')}
                className="mt-2 w-full py-1.5 px-2 rounded-lg bg-purple-800 hover:bg-purple-700 text-white font-semibold text-[11px] text-center"
              >
                Open Admin Portal
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentRoute(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0d4d3c] to-[#08362a] text-white border border-[#d4af37]/50 shadow-md font-bold'
                      : 'text-[#9fc7b8] hover:text-white hover:bg-[#05261d]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-[#d4af37]' : 'text-[#7aa796]'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#fae188] text-[10px] font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Public Web Quick Jump */}
          <div className="pt-4 border-t border-[#0e3b2e] space-y-2">
            <button
              onClick={() => setCurrentRoute('home')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#7fa999] hover:text-white hover:bg-[#05261d]"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>View Public Website</span>
            </button>
          </div>
        </aside>

        {/* Mobile Slide-over Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm">
            <div className="w-72 max-w-[80vw] h-full bg-[#02100c] border-r border-[#d4af37]/30 p-4 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/20">
                <TethraLogo size="sm" />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentRoute(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs ${
                      currentRoute === item.id
                        ? 'bg-[#0b4233] text-white border border-[#d4af37]/40 font-bold'
                        : 'text-[#9fc7b8] hover:bg-[#06261d]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Workspace Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-radial from-[#042018] via-[#031510] to-[#020e0b]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
