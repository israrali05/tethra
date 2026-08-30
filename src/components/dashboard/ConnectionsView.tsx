import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Search,
  UserPlus,
  Check,
  ShieldCheck,
  MapPin,
  Sparkles,
  Send,
  Gift,
  Eye,
  X,
  Mail,
  Calendar,
} from 'lucide-react';

export const ConnectionsView: React.FC = () => {
  const { users, currentUser, showToast, setCurrentRoute, formatMoney } = useApp();

  const [search, setSearch] = useState('');
  const [connectedIds, setConnectedIds] = useState<string[]>(
    currentUser?.connections || []
  );
  const [inspectedUser, setInspectedUser] = useState<any | null>(null);

  const toggleConnection = (targetUserId: string, name: string) => {
    if (connectedIds.includes(targetUserId)) {
      setConnectedIds(connectedIds.filter((id) => id !== targetUserId));
      showToast({
        title: 'Connection Removed',
        message: `Removed ${name} from your trusted network.`,
        type: 'info',
      });
    } else {
      setConnectedIds([...connectedIds, targetUserId]);
      showToast({
        title: 'Connection Established',
        message: `Added ${name} to your trusted network for zero-fee transfers and expense sharing.`,
        type: 'success',
      });
    }
  };

  const filteredUsers = users
    .filter((u) => u.id !== currentUser?.id)
    .filter(
      (u) =>
        u.firstName.toLowerCase().includes(search.toLowerCase()) ||
        u.lastName.toLowerCase().includes(search.toLowerCase()) ||
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.city.toLowerCase().includes(search.toLowerCase()) ||
        u.country.toLowerCase().includes(search.toLowerCase()) ||
        u.uniqueUserId.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-6" id="tethra-connections-view">
      {/* Header */}
      <div className="pb-4 border-b border-[#d4af37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Find Members &amp; Public Profiles
          </h1>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Search users by @username or name, inspect verified profile images, send instant P2P money, and deliver cash gifts.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentRoute('p2p-transfer')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#0d4738] text-white border border-[#d4af37]/40 hover:bg-[#125846] flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5 text-[#10b981]" /> Send Money
          </button>
          <button
            onClick={() => setCurrentRoute('gifts')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold gold-gradient-bg text-[#031d16] flex items-center gap-1.5"
          >
            <Gift className="w-3.5 h-3.5" /> Send Gift
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#8cb8a8] absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by @username, member name, unique ID, city, or country..."
          className="w-full bg-[#041e17] border border-[#144f3d] rounded-2xl py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#d4af37]"
        />
      </div>

      {/* Profile Inspection Modal */}
      {inspectedUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="emerald-card rounded-3xl p-6 border-2 border-[#d4af37] max-w-md w-full space-y-5 bg-[#032118] relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setInspectedUser(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#041e17] text-[#8cb8a8] hover:text-white border border-[#144f3d]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-3">
              <div className="relative inline-block">
                <img
                  src={inspectedUser.avatarUrl}
                  alt={inspectedUser.firstName}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-[#d4af37] shadow-xl mx-auto"
                />
                <span className="absolute -bottom-2 -right-2 p-1.5 bg-[#10b981] rounded-full text-black border-2 border-[#032118]">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  {inspectedUser.firstName} {inspectedUser.lastName}
                </h3>
                <div className="text-xs font-mono text-[#fae188]">
                  @{inspectedUser.username}
                </div>
                <div className="text-[11px] font-mono text-[#659281] mt-0.5">
                  Member ID: {inspectedUser.uniqueUserId}
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-[#021812] rounded-2xl border border-[#144f3d] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#8cb8a8]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> Location:
                </span>
                <span className="text-white font-medium">
                  {inspectedUser.city}, {inspectedUser.country}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#8cb8a8]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" /> Verification:
                </span>
                <span className="text-[#10b981] font-mono font-bold">
                  Tier-2 AML Verified
                </span>
              </div>
              <div className="flex items-center justify-between text-[#8cb8a8]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> Joined Network:
                </span>
                <span className="text-white font-mono">
                  {new Date(inspectedUser.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  setInspectedUser(null);
                  setCurrentRoute('p2p-transfer');
                }}
                className="py-2.5 rounded-xl font-bold text-xs gold-gradient-bg text-[#031d16] flex items-center justify-center gap-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" /> Send Money
              </button>
              <button
                onClick={() => {
                  setInspectedUser(null);
                  setCurrentRoute('gifts');
                }}
                className="py-2.5 rounded-xl font-bold text-xs bg-[#0b4737] text-[#6ee7b7] border border-[#238268] hover:bg-[#125846] flex items-center justify-center gap-1.5"
              >
                <Gift className="w-3.5 h-3.5 text-[#fae188]" /> Send Gift
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Directory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((u) => {
          const isConnected = connectedIds.includes(u.id);

          return (
            <div
              key={u.id}
              className="emerald-card rounded-2xl p-5 border border-[#d4af37]/25 space-y-4 hover:border-[#d4af37] transition-all flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => setInspectedUser(u)}
                  className="relative group shrink-0 focus:outline-none"
                  title="View full user profile"
                >
                  <img
                    src={u.avatarUrl}
                    alt={u.firstName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#d4af37]/50 group-hover:border-[#fae188] transition-all"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                    <Eye className="w-4 h-4 text-[#fae188]" />
                  </div>
                </button>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-white truncate">
                      {u.firstName} {u.lastName}
                    </h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                  </div>
                  <div className="text-xs font-mono text-[#fae188] truncate">
                    @{u.username}
                  </div>
                  <div className="text-[11px] text-[#8cb8a8] flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 text-[#d4af37] shrink-0" />
                    <span>
                      {u.city}, {u.country}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-[#71998b]">
                    ID: {u.uniqueUserId}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-3 border-t border-[#0d3f32] flex items-center justify-between gap-2">
                <button
                  onClick={() => setInspectedUser(u)}
                  className="p-2 rounded-xl bg-[#041d16] text-[#8cb8a8] hover:text-white border border-[#144f3d] text-xs font-mono"
                  title="Inspect Profile"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleConnection(u.id, `${u.firstName} ${u.lastName}`)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isConnected
                        ? 'bg-[#0b4737] text-[#6ee7b7] border border-[#238268]'
                        : 'gold-gradient-bg text-[#031d16] hover:scale-105'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

