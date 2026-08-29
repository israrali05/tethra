import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Camera,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const ProfileSettingsView: React.FC = () => {
  const { currentUser, updateProfile } = useApp();

  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [city, setCity] = useState(currentUser?.city || '');
  const [country, setCountry] = useState(currentUser?.country || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatarUrl || '');

  if (!currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      firstName,
      lastName,
      phone,
      city,
      country,
      avatarUrl,
    });
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto" id="tethra-profile-view">
      {/* Header */}
      <div className="pb-4 border-b border-[#d4af37]/20">
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          Account Profile &amp; Settings
        </h1>
        <p className="text-xs text-[#8cb8a8] mt-1">
          Manage your personal verification details and contact credentials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="emerald-card rounded-3xl p-6 sm:p-8 border border-[#d4af37]/30 space-y-6">
        {/* Avatar section */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#0f4637]">
          <div className="relative">
            <img
              src={avatarUrl}
              alt={firstName}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#d4af37]"
            />
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-white text-base">
              {currentUser.firstName} {currentUser.lastName}
            </h3>
            <div className="text-xs text-[#8cb8a8] font-mono">
              Unique ID: {currentUser.uniqueUserId}
            </div>
            <div className="text-[11px] text-[#10b981] font-mono">
              Role: {currentUser.role.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">First Name</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Last Name</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
              Email Address (Fixed)
            </label>
            <input
              type="email"
              disabled
              value={currentUser.email}
              className="w-full bg-[#02130e] border border-[#0d3f32] rounded-xl py-2.5 px-3 text-sm font-mono text-[#8cb8a8] cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm font-mono text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#031d16] font-display font-extrabold text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02] transition-transform"
        >
          Save Profile Updates
        </button>
      </form>
    </div>
  );
};
