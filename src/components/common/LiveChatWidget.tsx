import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  Clock,
  Sparkles,
  Download,
  Minimize2,
  Maximize2,
  CheckCircle2,
  Globe,
  Headphones,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'agent';
  text: string;
  time: string;
  isAction?: boolean;
}

export const LiveChatWidget: React.FC = () => {
  const { showToast, setCurrentRoute } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SUPPORT_PHONE = '+1 870-382-9652';
  const CLEAN_PHONE = '18703829652';
  const WHATSAPP_URL = `https://wa.me/${CLEAN_PHONE}?text=Hello%20Tethra%20Support%2C%20I%20need%20assistance%20with%20my%20account%20and%20banking%20services`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'bot',
      text: `Welcome to Tethra Financial Concierge! 🏛️ We provide 24/7 institutional banking support. How can we assist you today? You can also chat directly on WhatsApp at ${SUPPORT_PHONE}.`,
      time: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Dynamic AI / Concierge Responses
    setTimeout(() => {
      setIsTyping(false);
      let responseText = '';
      const lower = query.toLowerCase();

      if (lower.includes('api') || lower.includes('backend') || lower.includes('rest')) {
        responseText = `⚡ The Node.js/Express full-stack banking engine is active on port 3000 with live endpoints for account balances, 2.0% 24-hour yield compounding, P2P ledger transfers, and crypto deposits.`;
      } else if (lower.includes('payout') || lower.includes('withdraw') || lower.includes('bank') || lower.includes('3 day')) {
        responseText = `🏛️ US Bank ACH Payouts are processed within 1–3 business days (within 72 hours of AML/KYC approval). Disbursements are sent with verified ABA routing & zero hidden charges.`;
      } else if (lower.includes('deposit') || lower.includes('crypto') || lower.includes('usdt')) {
        responseText = `💳 We support instant USDT (TRC-20 / ERC-20) custody deposits, domestic ACH transfers, and Wire disbursements. All funds are segregated in FDIC-insured partner vaults.`;
      } else if (lower.includes('phone') || lower.includes('whatsapp') || lower.includes('call') || lower.includes('number') || lower.includes('contact')) {
        responseText = `📞 Our direct private support hotline and WhatsApp line is ${SUPPORT_PHONE}. You can tap the green WhatsApp button above to chat immediately!`;
      } else if (lower.includes('kyc') || lower.includes('verify') || lower.includes('passport')) {
        responseText = `🛡️ KYC Tier 2 requires a valid government photo ID (Passport / Driver's License) and a biometric selfie. Verifications are reviewed automatically in under 15 minutes.`;
      } else {
        responseText = `Thank you for your message. A dedicated Tethra Private Banking specialist is reviewing your inquiry. For immediate real-time human assistance, please connect on WhatsApp at ${SUPPORT_PHONE}.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg_${Date.now() + 1}`,
          sender: 'agent',
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 900);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <aside
      className="fixed bottom-5 right-5 z-50 font-sans"
      id="tethra-live-chat-floating-root"
      aria-label="Live Support & WhatsApp Concierge"
    >
      {/* Expanded Chat Window */}
      {isOpen && (
        <div
          id="tethra-chat-expanded-card"
          className="w-[92vw] sm:w-[380px] h-[520px] max-h-[82vh] bg-[#031913] border border-[#d4af37]/40 rounded-3xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden mb-3.5 animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0a3a2c] via-[#05261d] to-[#031913] border-b border-[#d4af37]/30 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full gold-gradient-bg text-[#031d16] font-bold flex items-center justify-center text-sm shadow-md font-mono">
                  T
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#10b981] border-2 border-[#031913] rounded-full"></span>
              </div>
              <div>
                <div className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Tethra Priority Concierge</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 font-mono">
                    24/7
                  </span>
                </div>
                <div className="text-[11px] text-[#8cb8a8] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block animate-pulse"></span>
                  <span>Direct Hotline: {SUPPORT_PHONE}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-[#0f4637] text-[#8cb8a8] hover:text-white transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Contact Bar (WhatsApp & Direct Call) */}
          <div className="p-2.5 bg-[#02100c] border-b border-[#0d3f32] grid grid-cols-2 gap-2 text-xs">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs transition-transform active:scale-95 shadow-sm"
              id="chat-whatsapp-direct-btn"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href={`tel:${CLEAN_PHONE}`}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl gold-gradient-bg hover:brightness-110 text-[#031d16] font-bold text-xs transition-transform active:scale-95 shadow-sm"
              id="chat-phone-call-btn"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Hotline</span>
            </a>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs bg-[#03140f]/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'gold-gradient-bg text-[#031d16] font-medium rounded-br-none shadow-md'
                      : 'bg-[#062920] border border-[#144f3d] text-[#e0f2eb] rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[#5e8c7c] mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#062920] border border-[#144f3d] w-fit">
                <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[10px] text-[#8cb8a8] ml-1">Concierge typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="p-2 bg-[#02100c] border-t border-[#0d3f32] overflow-x-auto flex gap-1.5 scrollbar-none">
            <button
              onClick={() => handleQuickPrompt('How does the automated 2% 24h yield engine work?')}
              className="px-2.5 py-1 rounded-lg bg-[#062920] hover:bg-[#0a3a2c] text-[#d4af37] border border-[#d4af37]/30 text-[11px] whitespace-nowrap transition-colors"
            >
              💰 2.0% Daily Yield
            </button>
            <button
              onClick={() => handleQuickPrompt('Tell me about the US Bank 3-Day Payout process')}
              className="px-2.5 py-1 rounded-lg bg-[#062920] hover:bg-[#0a3a2c] text-[#8cb8a8] hover:text-white border border-[#144f3d] text-[11px] whitespace-nowrap transition-colors"
            >
              🏛️ 3-Day Payout
            </button>
            <button
              onClick={() => handleQuickPrompt('What is the direct support phone number?')}
              className="px-2.5 py-1 rounded-lg bg-[#062920] hover:bg-[#0a3a2c] text-[#8cb8a8] hover:text-white border border-[#144f3d] text-[11px] whitespace-nowrap transition-colors"
            >
              📞 {SUPPORT_PHONE}
            </button>
          </div>

          {/* Message Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#031913] border-t border-[#0f4637] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything or request support..."
              className="flex-1 bg-[#02100c] border border-[#144f3d] focus:border-[#d4af37] rounded-xl px-3 py-2 text-xs text-white placeholder-[#5e8c7c] outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-xl gold-gradient-bg text-[#031d16] disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <div className="flex items-center gap-3">
        {/* Helper Pill Callout */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#042018]/95 border border-[#d4af37]/50 shadow-lg cursor-pointer hover:border-[#d4af37] transition-all group"
          >
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></div>
            <div className="text-xs">
              <span className="text-white font-bold block">Support &amp; WhatsApp</span>
              <span className="text-[10px] text-[#d4af37]">{SUPPORT_PHONE}</span>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          id="tethra-chat-widget-toggle"
          aria-label="Open Live Chat Support & WhatsApp"
          className="relative w-14 h-14 rounded-full gold-gradient-bg text-[#031d16] shadow-2xl shadow-[#d4af37]/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-2 border-white/80"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6 h-6 fill-[#031d16]" />
          )}

          {/* Active Notification Badge */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#10b981] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#02100c] animate-bounce">
              1
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
