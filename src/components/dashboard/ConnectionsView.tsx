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
  Lock,
} from 'lucide-react';

export const ConnectionsView: React.FC = () => {
  const { users, currentUser, showToast } = useApp();

  const [search, setSearch] = useState('');
  const [connectedIds, setConnectedIds] = useState<string[]>(
    currentUser?.connections || []
  );

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
        u.city.toLowerCase().includes(search.toLowerCase()) ||
        u.country.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="space-y-6" id="tethra-connections-view">
      {/* Header */}
      <div className="pb-4 border-b border-[#d4af37]/20">
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          Find People &amp; Trusted Network
        </h1>
        <p className="text-xs text-[#8cb8a8] mt-1">
          Connect with verified members for instant internal transfers, expense splits, and group travel vaults.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#8cb8a8] absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by member name, city, or country..."
          className="w-full bg-[#041e17] border border-[#144f3d] rounded-2xl py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-[#d4af37]"
        />
      </div>

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
                <img
                  src={u.avatarUrl}
                  alt={u.firstName}
                  className="w-12 h-12 rounded-xl object-cover border border-[#d4af37]/40 shrink-0"
                />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-white">
                      {u.firstName} {u.lastName}
                    </h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                  </div>
                  <div className="text-[11px] text-[#8cb8a8] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#d4af37]" />
                    <span>
                      {u.city}, {u.country}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-[#71998b]">
                    ID: {u.uniqueUserId}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#0d3f32] flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#041d16] text-[#7ea999] font-mono">
                  Verified Member
                </span>

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
          );
        })}
      </div>
    </div>
  );
};
