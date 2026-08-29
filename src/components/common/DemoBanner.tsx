import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Sparkles, UserCheck, RefreshCw, AlertCircle, ChevronDown, Check } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const {
    config,
    currentUser,
    users,
    switchUser,
    resetAllDemoData,
    setCurrentRoute,
  } = useApp();

  const [showSwitchModal, setShowSwitchModal] = useState(false);

  return (
    <>
      <div
        id="tethra-sandbox-compliance-banner"
        className="bg-gradient-to-r from-[#031d16] via-[#08382b] to-[#031d16] border-b border-[#d4af37]/30 text-xs py-2 px-4 shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Demo indicator & Regulatory Compliance */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/60 text-[#fced96] font-mono font-semibold tracking-wider text-[11px]">
              <Sparkles className="w-3 h-3 text-[#d4af37] animate-pulse" />
              DEMO / SANDBOX DATA
            </span>
            <span className="text-[#a4ccc0] hidden sm:inline">
              Simulated Financial Ledger Active • Investments involve risk • Returns not guaranteed
            </span>
          </div>

          {/* Right: User Switcher & Demo Tools */}
          <div className="flex items-center gap-3">
            {currentUser && (
              <button
                onClick={() => setShowSwitchModal(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0b4233] hover:bg-[#115e49] text-white border border-[#217c62] transition-colors"
                title="Switch between test users or Admin"
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.firstName}
                  className="w-4 h-4 rounded-full object-cover border border-[#d4af37]"
                />
                <span className="font-medium text-[11px]">
                  {currentUser.firstName} ({currentUser.role === 'admin' ? 'Admin' : 'User'})
                </span>
                <ChevronDown className="w-3 h-3 text-[#a4ccc0]" />
              </button>
            )}

            <button
              onClick={() => {
                if (confirm('Reset all demo balances, transactions, and goals to baseline?')) {
                  resetAllDemoData();
                }
              }}
              className="inline-flex items-center gap-1 text-[#a4ccc0] hover:text-[#d4af37] transition-colors py-1 px-2 text-[11px]"
              title="Restore default test balances & accounts"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden md:inline">Reset Sandbox</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile / Account Role Switcher Modal */}
      {showSwitchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="emerald-card-highlight w-full max-w-lg rounded-2xl p-6 border border-[#d4af37]/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#d4af37]/20">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#d4af37]" />
                <h3 className="text-base font-bold text-white">Select Sandbox Test Persona</h3>
              </div>
              <button
                onClick={() => setShowSwitchModal(false)}
                className="text-white/60 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#a0c5b9] my-3">
              Switch between the Primary Verified Banking Member, Platform Compliance Administrator, or 20 Community Demo Profiles to inspect roles, permissions, and workflows.
            </p>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {users.slice(0, 10).map((u) => {
                const isSelected = currentUser?.id === u.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      setShowSwitchModal(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                      isSelected
                        ? 'bg-[#0f4b3a] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                        : 'bg-[#062920]/80 border-[#1c5545] hover:bg-[#0b382c]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatarUrl}
                        alt={u.firstName}
                        className="w-9 h-9 rounded-full object-cover border border-[#d4af37]/50"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">
                            {u.firstName} {u.lastName}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase font-bold ${
                              u.role === 'admin'
                                ? 'bg-purple-900/60 text-purple-200 border border-purple-400/40'
                                : 'bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/30'
                            }`}
                          >
                            {u.role}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#8cb6a9] font-mono">
                          {u.uniqueUserId} • {u.city}, {u.country}
                        </div>
                      </div>
                    </div>

                    {isSelected && <Check className="w-5 h-5 text-[#d4af37]" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-[#d4af37]/20 flex justify-end">
              <button
                onClick={() => setShowSwitchModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#0b3b2d] text-white border border-[#23725b] hover:bg-[#115441]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
