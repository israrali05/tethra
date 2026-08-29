import React from 'react';
import { useApp } from '../../context/AppContext';
import { TethraLogo } from '../common/TethraLogo';
import { ShieldCheck, Lock, AlertTriangle, ExternalLink, HelpCircle, Mail, Phone, MapPin } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  const { setPublicSubPage, setCurrentRoute } = useApp();

  const navigateTo = (page: string) => {
    setPublicSubPage(page);
    setCurrentRoute('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020e0b] border-t border-[#d4af37]/20 text-[#a2cabb] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#0d3d2f]">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <TethraLogo size="lg" />
            <p className="text-[#87b3a3] text-sm leading-relaxed max-w-sm">
              Tethra is an enterprise-grade fintech and personal money management architecture designed for multi-currency accounts, high-yield savings vaults, group expense sharing, and digital wealth tracking.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#05261d] border border-[#14533e] text-[#e0f5ee] font-mono text-xs">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>Tier 2 KYC &amp; AML Ready</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#05261d] border border-[#14533e] text-[#e0f5ee] font-mono text-xs">
                <Lock className="w-4 h-4 text-[#10b981]" />
                <span>256-Bit SSL Ledger</span>
              </div>
            </div>

            <div className="text-[11px] text-[#71998b] space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Financial District, New York, NY 10005, USA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>concierge@tethra.net • 24/7 Dedicated Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                <a
                  href="tel:18703829652"
                  className="text-[#fae188] hover:underline font-mono font-semibold"
                >
                  +1 870-382-9652 (24/7 Call &amp; WhatsApp Desk)
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Products & Platform */}
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4 border-l-2 border-[#d4af37] pl-2.5">
              Products
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => navigateTo('personal-finance')}
                  className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left"
                >
                  Personal Finance Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('savings')}
                  className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left"
                >
                  High-Yield Savings Vaults
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('expenses')}
                  className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left"
                >
                  Group Expense Sharing
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('crypto')}
                  className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left"
                >
                  Crypto Market Ticker
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('referrals')}
                  className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left"
                >
                  $25 Referral Program
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Resources */}
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4 border-l-2 border-[#d4af37] pl-2.5">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left"
                >
                  About Tethra
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('how-it-works')}
                  className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('security')}
                  className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left"
                >
                  Security Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left"
                >
                  FAQ &amp; Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left"
                >
                  Contact &amp; 24/7 Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentRoute('wp-architecture');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#fae188] hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left font-mono font-semibold"
                >
                  📦 WordPress ZIP &amp; Live Chat
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance */}
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4 border-l-2 border-[#d4af37] pl-2.5">
              Compliance &amp; Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => navigateTo('terms')}
                  className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('risk-disclosure')}
                  className="hover:text-[#d4af37] transition-colors hover:translate-x-1 duration-150 inline-block text-left font-medium"
                >
                  Risk Disclosure
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('kyc-policy')}
                  className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left"
                >
                  KYC &amp; AML Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('referral-terms')}
                  className="hover:text-white transition-colors hover:translate-x-1 duration-150 inline-block text-left"
                >
                  Referral Program Terms
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Risk Disclaimer */}
        <div className="pt-8 space-y-4">
          <div className="p-4 rounded-xl bg-[#041a13] border border-[#144738] text-[11px] text-[#7da797] leading-relaxed">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-medium">Important Regulatory Disclosures: </strong>
                Investments and digital assets involve significant market risk. Returns and configured yield APYs are illustrative / configured rates and are not guaranteed. Banking services, US bank payouts, and payment processing are routed through eligible, verified banking partners and custody providers. Process completed within estimated timeline upon compliance and AML approval.
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5e8275] pt-2">
            <div>
              © 2026 Tethra Financial Technologies (tethra.net). All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span>https://tethra.net</span>
              <span>v2.8.4 Enterprise Release</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
