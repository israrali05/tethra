import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Smartphone,
  Key,
  Laptop,
  CheckCircle2,
  Lock,
  Clock,
  AlertTriangle,
} from 'lucide-react';

export const SecurityView: React.FC = () => {
  const { currentUser, toggle2FA, auditLogs } = useApp();

  if (!currentUser) return null;

  return (
    <div className="space-y-8 max-w-4xl mx-auto" id="tethra-security-view">
      {/* Header */}
      <div className="pb-4 border-b border-[#d4af37]/20">
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          Security &amp; Authentication Controls
        </h1>
        <p className="text-xs text-[#8cb8a8] mt-1">
          Manage hardware-grade 2FA, biometric authentication, session revocation, and security audit logs.
        </p>
      </div>

      {/* 2FA Card */}
      <div className="emerald-card rounded-2xl p-6 border border-[#d4af37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#073024] text-[#d4af37] border border-[#14533e]">
            <Smartphone className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Two-Factor Authentication (2FA)</h3>
            <p className="text-xs text-[#8cb8a8] max-w-md">
              Requires a 6-digit TOTP code from Google Authenticator or hardware YubiKey on every payout and login attempt.
            </p>
            <div className="text-[11px] font-mono text-[#fae188] pt-1">
              Status: {currentUser.twoFactorEnabled ? 'ENFORCED & ACTIVE' : 'DISABLED'}
            </div>
          </div>
        </div>

        <button
          onClick={toggle2FA}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            currentUser.twoFactorEnabled
              ? 'bg-red-900/60 hover:bg-red-800 text-red-200 border border-red-500/40'
              : 'gold-gradient-bg text-[#031d16] shadow-md'
          }`}
        >
          {currentUser.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA Protection'}
        </button>
      </div>

      {/* Active Sessions */}
      <div className="emerald-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-4">
        <h3 className="text-base font-bold text-white pb-2 border-b border-[#0f4637] flex items-center justify-between">
          <span>Active Device Sessions</span>
          <span className="text-[11px] font-mono text-[#10b981]">1 Current Session</span>
        </h3>

        <div className="p-4 rounded-xl bg-[#041d16] border border-[#144f3d] flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <Laptop className="w-5 h-5 text-[#d4af37]" />
            <div>
              <div className="font-bold text-white">Chrome on macOS (Current Device)</div>
              <div className="text-[10px] text-[#8cb8a8] font-mono">
                IP: 198.51.100.42 • New York, United States
              </div>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded bg-[#10b981]/20 text-[#6ee7b7] text-[10px] font-mono font-bold">
            ACTIVE NOW
          </span>
        </div>
      </div>

      {/* Security Audit Logs */}
      <div className="emerald-card rounded-2xl p-6 border border-[#d4af37]/30 space-y-4">
        <h3 className="text-base font-bold text-white pb-2 border-b border-[#0f4637]">
          Recent Security Audit Logs
        </h3>

        <div className="space-y-2">
          {auditLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-[#041d16] border border-[#0d3f32] flex items-center justify-between text-xs font-mono"
            >
              <div className="space-y-0.5">
                <div className="text-white font-bold">{log.action}</div>
                <div className="text-[10px] text-[#71998b]">
                  Actor: {log.userEmail} • IP: {log.ipAddress}
                </div>
              </div>
              <div className="text-[10px] text-[#8cb8a8]">
                {new Date(log.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
