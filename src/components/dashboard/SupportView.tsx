import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LifeBuoy,
  MessageSquare,
  Send,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Headphones,
  Sparkles,
  Phone,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { SupportTicket } from '../../types';

export const SupportView: React.FC = () => {
  const { supportTickets, createSupportTicket, addTicketReply } = useApp();

  const SUPPORT_PHONE = '+1 870-382-9652';
  const CLEAN_PHONE = '18703829652';
  const WHATSAPP_URL = `https://wa.me/${CLEAN_PHONE}?text=Hello%20Tethra%20Support%2C%20I%20need%20assistance%20with%20my%20account`;

  const [activeTicketId, setActiveTicketId] = useState<string>(
    supportTickets[0]?.id || ''
  );
  const [newTicketModal, setNewTicketModal] = useState(false);
  const [replyText, setReplyText] = useState('');

  // New ticket state
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Banking & Payouts');
  const [message, setMessage] = useState('');

  const activeTicket = supportTickets.find((t) => t.id === activeTicketId) || supportTickets[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText || !activeTicket) return;
    addTicketReply(activeTicket.id, replyText);
    setReplyText('');
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    createSupportTicket(subject, category, message);
    setNewTicketModal(false);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="space-y-6" id="tethra-support-view">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d4af37]/20">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            24/7 Private Banking Concierge
          </h1>
          <p className="text-xs text-[#8cb8a8] mt-1">
            Direct secure communication with dedicated institutional account officers and compliance specialists.
          </p>
        </div>

        <button
          onClick={() => setNewTicketModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl gold-gradient-bg text-[#031d16] text-xs font-bold shadow-md hover:scale-105 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Open New Ticket</span>
        </button>
      </div>

      {/* Direct WhatsApp & Phone Hotline Banner (+1 870-382-9652) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#042018] via-[#093528] to-[#042018] border border-[#d4af37]/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-md shrink-0">
            <MessageSquare className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">Instant Live Support &amp; WhatsApp Hotline</span>
              <span className="px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#10b981] text-[10px] font-mono border border-[#10b981]/40">
                24/7 ACTIVE
              </span>
            </div>
            <div className="text-xs text-[#8cb8a8] mt-0.5">
              Direct Phone &amp; WhatsApp: <strong className="text-[#fae188] font-mono">{SUPPORT_PHONE}</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${CLEAN_PHONE}`}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#062920] hover:bg-[#0a3a2c] text-[#fae188] border border-[#d4af37]/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Hotline</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Tickets List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-white uppercase tracking-wider">
            Your Support Inquiries ({supportTickets.length})
          </div>

          <div className="space-y-2">
            {supportTickets.map((t) => (
              <div
                key={t.id}
                onClick={() => setActiveTicketId(t.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  activeTicket?.id === t.id
                    ? 'bg-[#093e30] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                    : 'bg-[#041e17] border-[#144f3d] hover:bg-[#062c21]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-bold text-xs text-white line-clamp-1">{t.subject}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase font-bold ${
                      t.status === 'resolved'
                        ? 'bg-[#10b981]/20 text-[#6ee7b7]'
                        : 'bg-[#38bdf8]/20 text-[#38bdf8]'
                    }`}
                  >
                    {t.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#8cb8a8] font-mono mt-2">
                  <span>{t.category}</span>
                  <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Ticket Thread (8 cols) */}
        <div className="lg:col-span-8">
          {activeTicket ? (
            <div className="emerald-card rounded-2xl border border-[#d4af37]/30 flex flex-col h-[520px]">
              {/* Ticket Top Header */}
              <div className="p-4 border-b border-[#0f4637] flex items-center justify-between bg-[#02130e]">
                <div>
                  <h3 className="font-bold text-sm text-white">{activeTicket.subject}</h3>
                  <div className="text-[11px] text-[#8cb8a8] font-mono">
                    Category: {activeTicket.category} • Priority: {activeTicket.priority}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#10b981] font-mono">
                  <Headphones className="w-4 h-4" />
                  <span>Agent Online</span>
                </div>
              </div>

              {/* Messages scroll area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#031a14]/60">
                {activeTicket.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${
                      m.senderRole === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                        m.senderRole === 'user'
                          ? 'gold-gradient-bg text-[#031d16] font-medium'
                          : 'bg-[#062c20] text-white border border-[#14533e]'
                      }`}
                    >
                      <div className="font-bold text-[10px] opacity-80">{m.senderName}</div>
                      <p className="leading-relaxed">{m.text}</p>
                      <div className="text-[9px] opacity-70 font-mono text-right">
                        {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Form */}
              <form
                onSubmit={handleSendReply}
                className="p-3 border-t border-[#0f4637] bg-[#02130e] flex items-center gap-2"
              >
                <input
                  type="text"
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your message to the support officer..."
                  className="flex-1 bg-[#041e17] border border-[#144f3d] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-bold shrink-0 hover:scale-105 transition-transform"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="emerald-card rounded-2xl p-12 text-center text-xs text-[#71998b]">
              Select or create a ticket to view conversation thread.
            </div>
          )}
        </div>
      </div>

      {/* CREATE TICKET MODAL */}
      {newTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="emerald-card-highlight w-full max-w-md rounded-2xl p-6 border border-[#d4af37]/50 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/20">
              <h3 className="text-base font-bold text-white">Create Support Inquiry</h3>
              <button
                onClick={() => setNewTicketModal(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Wire Confirmation, AML Verification"
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Banking & Payouts">Banking &amp; US Payouts</option>
                  <option value="KYC & Compliance">KYC &amp; Verification</option>
                  <option value="Savings & Yield">Savings &amp; Yield</option>
                  <option value="Group Accounting">Group Expense Settlement</option>
                  <option value="Security">Security &amp; 2FA</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a2cbbe] mb-1">
                  Inquiry Message
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your question or issue in detail..."
                  className="w-full bg-[#041d16] border border-[#144f3d] rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewTicketModal(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-[#062c20] text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl gold-gradient-bg text-[#031d16] font-bold text-xs shadow-md"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
