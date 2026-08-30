import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  Download,
  FolderTree,
  Terminal,
  Zap,
  ShieldCheck,
  Flame,
  Layers,
  Smartphone,
  Server,
  Database,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateFlutterCompleteZip } from '../../utils/flutterZipGenerator';
import {
  FLUTTER_PUBSPEC_YAML,
  FLUTTER_MAIN_DART,
  FLUTTER_APP_ROUTER_DART,
  FLUTTER_THEME_DART,
  FIREBASE_FIRESTORE_RULES,
  FIREBASE_FUNCTIONS_JS,
} from '../../utils/flutterCodeSnippets';

export const FlutterArchitectureView: React.FC = () => {
  const { showToast } = useApp();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<
    | 'pubspec'
    | 'main'
    | 'router'
    | 'theme'
    | 'firestore-rules'
    | 'functions'
    | 'schema'
  >('pubspec');

  const handleDownloadZip = async () => {
    try {
      setIsGeneratingZip(true);
      showToast({
        title: 'Packaging Flutter & Firebase Project',
        message: 'Bundling Models, Services, Providers, GoRouter, Views & Cloud Functions...',
        type: 'info',
      });

      const zipBlob = await generateFlutterCompleteZip({
        appName: 'Tethra Banking Flutter',
        supportPhone: '+1 870-382-9652',
        supportEmail: 'support@tethra.finance',
      });

      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'tethra-flutter-firebase-complete-project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast({
        title: 'Download Ready! 📱',
        message: 'tethra-flutter-firebase-complete-project.zip has been generated.',
        type: 'success',
      });
    } catch (err) {
      console.error(err);
      showToast({
        title: 'Packaging Failed',
        message: 'Could not generate ZIP archive.',
        type: 'error',
      });
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const copySnippet = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    showToast({
      title: 'Code Copied',
      message: `${label} copied to clipboard.`,
      type: 'success',
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const schemaJson = JSON.stringify(
    {
      collections: {
        users: {
          description: 'Client profile, KYC status, and referral identifiers',
          fields: {
            email: 'string',
            phone: 'string (e.g. +1 870 382 9652)',
            firstName: 'string',
            lastName: 'string',
            referralCode: 'string (e.g. THR-A8F29K)',
            role: '"user" | "admin"',
            kycVerified: 'boolean',
            createdAt: 'timestamp',
          },
        },
        wallets: {
          description: 'Multi-currency balances & yield tracking (Document ID = User ID)',
          fields: {
            balanceUsd: 'number (USD Checking)',
            balanceEur: 'number (EUR SEPA)',
            balanceGbp: 'number (GBP Faster Payments)',
            balanceUsdt: 'number (USDT Crypto Staking)',
            totalEarningsUsdt: 'number',
            isFrozen: 'boolean',
            updatedAt: 'timestamp',
          },
        },
        investments: {
          description: '24-Hour 2.0% Daily Compound Yield Stakes',
          fields: {
            userId: 'string (Foreign Key -> users.id)',
            amount: 'number (USDT amount locked)',
            dailyRatePct: 'number (2.0%)',
            earnedAmount: 'number',
            status: '"active" | "completed"',
            startedAt: 'timestamp',
            nextPayoutAt: 'timestamp (+24h)',
          },
        },
        deposits: {
          description: 'Bank wire, SEPA & USDT deposit requests with proof slip uploads',
          fields: {
            userId: 'string',
            method: '"bank_transfer" | "usdt_trc20" | "usdt_erc20"',
            amount: 'number',
            currency: '"USD" | "EUR" | "GBP" | "USDT"',
            status: '"pending" | "approved" | "rejected"',
            proofUrl: 'string (Firebase Storage URL)',
            referenceNumber: 'string',
            createdAt: 'timestamp',
          },
        },
        withdrawals: {
          description: 'Multi-rail withdrawal requests with 6-digit PIN verification',
          fields: {
            userId: 'string',
            method: '"us_bank_transfer" | "crypto_wallet"',
            amount: 'number',
            currency: 'string',
            status: '"pending" | "processing" | "completed"',
            destinationDetails: 'map',
            createdAt: 'timestamp',
          },
        },
        referrals: {
          description: '$25 referral bonus bounty records',
          fields: {
            referrerId: 'string',
            referredUserId: 'string',
            bonusAmount: 'number ($25.00 USD)',
            status: '"pending" | "paid"',
            createdAt: 'timestamp',
          },
        },
      },
    },
    null,
    2
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#042018] via-[#072e23] to-[#042018] border border-[#d4af37]/40 rounded-2xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs font-bold text-[#fae188]">
              <Flame className="w-4 h-4 text-[#fae188]" />
              FLUTTER + GO_ROUTER + PROVIDER + FIREBASE SUITE
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#fae188] tracking-tight">
              Flutter Mobile, Web & Firebase Architecture
            </h1>
            <p className="text-sm text-[#8cb8a8] max-w-2xl">
              Complete, production-ready codebase converted to Flutter with GoRouter navigation, Provider state management, Firestore multi-currency synchronization, and Firebase Cloud Functions for the automated 2% daily yield cron.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadZip}
              disabled={isGeneratingZip}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#fae188] text-[#02110c] font-black text-sm shadow-lg hover:shadow-[#d4af37]/20 transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isGeneratingZip ? 'Generating ZIP...' : 'Download Full Flutter Project (.ZIP)'}
            </button>
          </div>
        </div>
      </div>

      {/* Architecture Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#042018] border border-[#d4af37]/20 rounded-xl p-5 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-[#fae188]">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-[#eafaf4]">Cross-Platform Ready</h3>
          <p className="text-xs text-[#8cb8a8]">
            Native builds for iOS, Android, and responsive Flutter Web with Material 3 theming.
          </p>
        </div>

        <div className="bg-[#042018] border border-[#d4af37]/20 rounded-xl p-5 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-[#10b981]/10 flex items-center justify-center text-[#10b981]">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-[#eafaf4]">2% Yield Staking</h3>
          <p className="text-xs text-[#8cb8a8]">
            Automated 24-hour compounding scheduler and streak tracking powered by Firebase Cloud Functions.
          </p>
        </div>

        <div className="bg-[#042018] border border-[#d4af37]/20 rounded-xl p-5 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6]">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-[#eafaf4]">GoRouter & Provider</h3>
          <p className="text-xs text-[#8cb8a8]">
            Clean separation of concerns with AuthProvider, WalletProvider, InvestmentProvider, and declarative route guards.
          </p>
        </div>

        <div className="bg-[#042018] border border-[#d4af37]/20 rounded-xl p-5 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-[#ef4444]/10 flex items-center justify-center text-[#ef4444]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-[#eafaf4]">Firebase Hardened</h3>
          <p className="text-xs text-[#8cb8a8]">
            Granular Firestore security rules, Storage upload policies, and atomic wallet transactions.
          </p>
        </div>
      </div>

      {/* Directory Structure & Setup Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Directory Tree */}
        <div className="bg-[#042018] border border-[#d4af37]/30 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-[#fae188] font-bold text-sm">
            <FolderTree className="w-4 h-4" />
            Project File & Folder Hierarchy
          </div>
          <div className="bg-[#02110c] border border-white/10 rounded-xl p-4 font-mono text-xs text-[#8cb8a8] space-y-1.5 overflow-x-auto">
            <div className="text-[#fae188] font-bold">tethra_banking_flutter/</div>
            <div className="pl-4 text-[#eafaf4]">├── pubspec.yaml</div>
            <div className="pl-4 text-[#eafaf4]">├── README.md</div>
            <div className="pl-4 text-[#fae188]">├── lib/</div>
            <div className="pl-8 text-[#eafaf4]">├── main.dart</div>
            <div className="pl-8 text-[#10b981]">├── models/</div>
            <div className="pl-12 text-[#8cb8a8]">├── user_model.dart</div>
            <div className="pl-12 text-[#8cb8a8]">├── wallet_model.dart</div>
            <div className="pl-12 text-[#8cb8a8]">├── investment_model.dart</div>
            <div className="pl-12 text-[#8cb8a8]">└── transaction_model.dart</div>
            <div className="pl-8 text-[#10b981]">├── services/</div>
            <div className="pl-12 text-[#8cb8a8]">├── firebase_auth_service.dart</div>
            <div className="pl-12 text-[#8cb8a8]">└── firestore_service.dart</div>
            <div className="pl-8 text-[#10b981]">├── providers/</div>
            <div className="pl-12 text-[#8cb8a8]">├── auth_provider.dart</div>
            <div className="pl-12 text-[#8cb8a8]">├── wallet_provider.dart</div>
            <div className="pl-12 text-[#8cb8a8]">├── investment_provider.dart</div>
            <div className="pl-12 text-[#8cb8a8]">└── transaction_provider.dart</div>
            <div className="pl-8 text-[#10b981]">├── router/</div>
            <div className="pl-12 text-[#8cb8a8]">└── app_router.dart (GoRouter)</div>
            <div className="pl-8 text-[#10b981]">├── views/</div>
            <div className="pl-12 text-[#8cb8a8]">├── public/ (Landing, Login, Register)</div>
            <div className="pl-12 text-[#8cb8a8]">├── dashboard/ (Home, Invest, Deposit, Withdraw)</div>
            <div className="pl-12 text-[#8cb8a8]">└── admin/ (AdminPortalView)</div>
            <div className="pl-8 text-[#10b981]">└── utils/</div>
            <div className="pl-12 text-[#8cb8a8]">├── app_theme.dart</div>
            <div className="pl-12 text-[#8cb8a8]">└── currency_formatter.dart</div>
            <div className="pl-4 text-[#fae188]">└── firebase/</div>
            <div className="pl-8 text-[#eafaf4]">├── firestore.rules</div>
            <div className="pl-8 text-[#eafaf4]">├── storage.rules</div>
            <div className="pl-8 text-[#10b981]">└── functions/</div>
            <div className="pl-12 text-[#8cb8a8]">└── index.js (2% Yield Cron)</div>
          </div>
        </div>

        {/* Quick Start Commands */}
        <div className="lg:col-span-2 bg-[#042018] border border-[#d4af37]/30 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-[#fae188] font-bold text-sm">
            <Terminal className="w-4 h-4" />
            Terminal Commands & Firebase Deployment
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-[#02110c] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-[#fae188]">1. Install Flutter Dependencies</div>
              <pre className="text-[11px] font-mono text-[#8cb8a8] bg-black/40 p-2 rounded">
                flutter pub get
              </pre>
            </div>

            <div className="bg-[#02110c] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-[#fae188]">2. Configure Firebase CLI</div>
              <pre className="text-[11px] font-mono text-[#8cb8a8] bg-black/40 p-2 rounded">
                flutterfire configure
              </pre>
            </div>

            <div className="bg-[#02110c] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-[#fae188]">3. Deploy Firestore Rules & Functions</div>
              <pre className="text-[11px] font-mono text-[#8cb8a8] bg-black/40 p-2 rounded">
                firebase deploy --only firestore,functions
              </pre>
            </div>

            <div className="bg-[#02110c] border border-white/10 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-[#fae188]">4. Run App on Web / Mobile</div>
              <pre className="text-[11px] font-mono text-[#8cb8a8] bg-black/40 p-2 rounded">
                flutter run -d chrome
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Code Viewer */}
      <div className="bg-[#042018] border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-xl">
        {/* Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#02110c] px-4 py-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveCodeTab('pubspec')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'pubspec'
                  ? 'bg-[#d4af37] text-[#02110c]'
                  : 'text-[#8cb8a8] hover:text-[#eafaf4] hover:bg-white/5'
              }`}
            >
              pubspec.yaml
            </button>
            <button
              onClick={() => setActiveCodeTab('main')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'main'
                  ? 'bg-[#d4af37] text-[#02110c]'
                  : 'text-[#8cb8a8] hover:text-[#eafaf4] hover:bg-white/5'
              }`}
            >
              lib/main.dart
            </button>
            <button
              onClick={() => setActiveCodeTab('router')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'router'
                  ? 'bg-[#d4af37] text-[#02110c]'
                  : 'text-[#8cb8a8] hover:text-[#eafaf4] hover:bg-white/5'
              }`}
            >
              lib/router/app_router.dart
            </button>
            <button
              onClick={() => setActiveCodeTab('theme')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'theme'
                  ? 'bg-[#d4af37] text-[#02110c]'
                  : 'text-[#8cb8a8] hover:text-[#eafaf4] hover:bg-white/5'
              }`}
            >
              lib/utils/app_theme.dart
            </button>
            <button
              onClick={() => setActiveCodeTab('firestore-rules')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'firestore-rules'
                  ? 'bg-[#d4af37] text-[#02110c]'
                  : 'text-[#8cb8a8] hover:text-[#eafaf4] hover:bg-white/5'
              }`}
            >
              firestore.rules
            </button>
            <button
              onClick={() => setActiveCodeTab('functions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'functions'
                  ? 'bg-[#d4af37] text-[#02110c]'
                  : 'text-[#8cb8a8] hover:text-[#eafaf4] hover:bg-white/5'
              }`}
            >
              functions/index.js (2% Cron)
            </button>
            <button
              onClick={() => setActiveCodeTab('schema')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCodeTab === 'schema'
                  ? 'bg-[#d4af37] text-[#02110c]'
                  : 'text-[#8cb8a8] hover:text-[#eafaf4] hover:bg-white/5'
              }`}
            >
              database_structure.json
            </button>
          </div>

          <button
            onClick={() => {
              const map: Record<string, { code: string; label: string }> = {
                pubspec: { code: FLUTTER_PUBSPEC_YAML, label: 'pubspec.yaml' },
                main: { code: FLUTTER_MAIN_DART, label: 'lib/main.dart' },
                router: { code: FLUTTER_APP_ROUTER_DART, label: 'lib/router/app_router.dart' },
                theme: { code: FLUTTER_THEME_DART, label: 'lib/utils/app_theme.dart' },
                'firestore-rules': { code: FIREBASE_FIRESTORE_RULES, label: 'firestore.rules' },
                functions: { code: FIREBASE_FUNCTIONS_JS, label: 'functions/index.js' },
                schema: { code: schemaJson, label: 'database_structure.json' },
              };
              const item = map[activeCodeTab];
              copySnippet(item.code, item.label);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#eafaf4] transition-all"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedCode ? 'Copied!' : 'Copy File Content'}
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 bg-[#010a07] overflow-x-auto max-h-[500px]">
          <pre className="font-mono text-xs text-[#8cb8a8] leading-relaxed">
            {activeCodeTab === 'pubspec' && FLUTTER_PUBSPEC_YAML}
            {activeCodeTab === 'main' && FLUTTER_MAIN_DART}
            {activeCodeTab === 'router' && FLUTTER_APP_ROUTER_DART}
            {activeCodeTab === 'theme' && FLUTTER_THEME_DART}
            {activeCodeTab === 'firestore-rules' && FIREBASE_FIRESTORE_RULES}
            {activeCodeTab === 'functions' && FIREBASE_FUNCTIONS_JS}
            {activeCodeTab === 'schema' && schemaJson}
          </pre>
        </div>
      </div>
    </div>
  );
};
