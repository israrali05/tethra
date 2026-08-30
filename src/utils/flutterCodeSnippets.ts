/**
 * Complete Flutter + GoRouter + Provider + Firebase Codebase Templates
 * Multi-Platform: iOS, Android, macOS, Flutter Web
 */

export const FLUTTER_PUBSPEC_YAML = `name: tethra_banking_flutter
description: "Tethra Financial Infrastructure - Multi-Currency Banking, 2% Daily Yield Staking & Firebase Suite"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  
  # State Management & Routing
  provider: ^6.1.2
  go_router: ^14.2.0
  
  # Firebase Core & Products
  firebase_core: ^3.1.0
  firebase_auth: ^5.1.0
  cloud_firestore: ^5.0.1
  firebase_storage: ^12.0.1
  
  # UI & Utilities
  intl: ^0.19.0
  google_fonts: ^6.2.1
  lucide_icons: ^0.252.0
  fl_chart: ^0.68.0
  qr_flutter: ^4.1.0
  url_launcher: ^6.3.0
  cached_network_image: ^3.3.1
  flutter_animate: ^4.5.0
  shared_preferences: ^2.2.3

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
`;

export const FLUTTER_MAIN_DART = `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:firebase_core/firebase_core.dart';
import 'router/app_router.dart';
import 'providers/auth_provider.dart';
import 'providers/wallet_provider.dart';
import 'providers/investment_provider.dart';
import 'providers/transaction_provider.dart';
import 'providers/theme_provider.dart';
import 'utils/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Firebase (Requires google-services.json on Android / GoogleService-Info.plist on iOS)
  try {
    await Firebase.initializeApp();
  } catch (e) {
    debugPrint('Firebase init running in mock/demo mode: \$e');
  }

  runApp(const TethraApp());
}

class TethraApp extends StatelessWidget {
  const TethraApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProxyProvider<AuthProvider, WalletProvider>(
          create: (ctx) => WalletProvider(ctx.read<AuthProvider>()),
          update: (ctx, auth, previous) => previous ?? WalletProvider(auth),
        ),
        ChangeNotifierProxyProvider<AuthProvider, InvestmentProvider>(
          create: (ctx) => InvestmentProvider(ctx.read<AuthProvider>()),
          update: (ctx, auth, previous) => previous ?? InvestmentProvider(auth),
        ),
        ChangeNotifierProxyProvider<AuthProvider, TransactionProvider>(
          create: (ctx) => TransactionProvider(ctx.read<AuthProvider>()),
          update: (ctx, auth, previous) => previous ?? TransactionProvider(auth),
        ),
      ],
      child: Consumer<ThemeProvider>(
        builder: (context, themeProv, _) {
          return MaterialApp.router(
            title: 'Tethra Banking & Yield Suite',
            debugShowCheckedModeBanner: false,
            theme: AppTheme.darkTheme,
            routerConfig: AppRouter.router,
          );
        },
      ),
    );
  }
}
`;

export const FLUTTER_APP_ROUTER_DART = `import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../views/public/landing_view.dart';
import '../views/public/login_view.dart';
import '../views/public/register_view.dart';
import '../views/dashboard/dashboard_home_view.dart';
import '../views/dashboard/invest_yield_view.dart';
import '../views/dashboard/deposit_view.dart';
import '../views/dashboard/withdraw_view.dart';
import '../views/dashboard/savings_vaults_view.dart';
import '../views/dashboard/p2p_transfer_view.dart';
import '../views/dashboard/accounts_cards_view.dart';
import '../views/dashboard/referrals_view.dart';
import '../views/dashboard/kyc_verification_view.dart';
import '../views/dashboard/security_settings_view.dart';
import '../views/admin/admin_portal_view.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const LandingView(),
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginView(),
      ),
      GoRoute(
        path: '/register',
        builder: (context, state) => const RegisterView(),
      ),
      GoRoute(
        path: '/dashboard',
        builder: (context, state) => const DashboardHomeView(),
      ),
      GoRoute(
        path: '/invest',
        builder: (context, state) => const InvestYieldView(),
      ),
      GoRoute(
        path: '/deposit',
        builder: (context, state) => const DepositView(),
      ),
      GoRoute(
        path: '/withdraw',
        builder: (context, state) => const WithdrawView(),
      ),
      GoRoute(
        path: '/savings',
        builder: (context, state) => const SavingsVaultsView(),
      ),
      GoRoute(
        path: '/transfer',
        builder: (context, state) => const P2PTransferView(),
      ),
      GoRoute(
        path: '/accounts',
        builder: (context, state) => const AccountsCardsView(),
      ),
      GoRoute(
        path: '/referrals',
        builder: (context, state) => const ReferralsView(),
      ),
      GoRoute(
        path: '/kyc',
        builder: (context, state) => const KYCVerificationView(),
      ),
      GoRoute(
        path: '/security',
        builder: (context, state) => const SecuritySettingsView(),
      ),
      GoRoute(
        path: '/admin',
        builder: (context, state) => const AdminPortalView(),
      ),
    ],
  );
}
`;

export const FLUTTER_THEME_DART = `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const Color bgPrimary = Color(0xFF02110C);
  static const Color bgCard = Color(0xFF042018);
  static const Color bgCardHover = Color(0xFF072E23);
  static const Color borderGold = Color(0x59D4AF37);
  static const Color goldPrimary = Color(0xFFD4AF37);
  static const Color goldLight = Color(0xFFFAE188);
  static const Color emeraldAccent = Color(0xFF10B981);
  static const Color textMain = Color(0xFFEAFAF4);
  static const Color textMuted = Color(0xFF8CB8A8);
  static const Color danger = Color(0xFFEF4444);

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: bgPrimary,
      primaryColor: goldPrimary,
      cardColor: bgCard,
      textTheme: GoogleFonts.plusJakartaSansTextTheme(
        ThemeData.dark().textTheme.apply(
          bodyColor: textMain,
          displayColor: textMain,
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: bgPrimary,
        elevation: 0,
        centerTitle: false,
        iconTheme: IconThemeData(color: goldPrimary),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: goldPrimary,
          foregroundColor: const Color(0xFF02110C),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          textStyle: const TextStyle(fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
`;

export const FIREBASE_FIRESTORE_RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        (request.auth.token.role == 'admin' || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }

    // Users Collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
    }

    // Multi-Currency Wallets Collection
    match /wallets/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow write: if isAdmin(); // Wallet balances modified via serverless Cloud Functions or Admin
    }

    // 2% Daily Yield Staking Stakes Collection
    match /investments/{investmentId} {
      allow read: if isAuthenticated() && (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      allow update, delete: if isAdmin();
    }

    // Transactions Collection
    match /transactions/{txId} {
      allow read: if isAuthenticated() && (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      allow update, delete: if isAdmin();
    }

    // Deposit Requests Collection
    match /deposits/{depositId} {
      allow read: if isAuthenticated() && (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      allow update, delete: if isAdmin();
    }

    // Withdrawal Requests Collection
    match /withdrawals/{withdrawId} {
      allow read: if isAuthenticated() && (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      allow update, delete: if isAdmin();
    }

    // Referrals ($25 Bonus) Collection
    match /referrals/{refId} {
      allow read: if isAuthenticated() && (resource.data.referrerId == request.auth.uid || resource.data.referredUserId == request.auth.uid || isAdmin());
      allow create: if isAuthenticated();
      allow update, delete: if isAdmin();
    }

    // Notifications Collection
    match /notifications/{notifId} {
      allow read, update, delete: if isAuthenticated() && (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if isAuthenticated();
    }

    // Savings Goals Collection
    match /savings_goals/{goalId} {
      allow read, write: if isAuthenticated() && (resource.data.userId == request.auth.uid || request.resource.data.userId == request.auth.uid || isAdmin());
    }
  }
}
`;

export const FIREBASE_FUNCTIONS_JS = `const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

/**
 * 1. AUTOMATED 24-HOUR 2.0% YIELD COMPOUNDING CRON
 * Runs every hour via Google Cloud Scheduler to check for matured 24-hour stakes
 */
exports.hourlyDailyYieldCron = functions.pubsub.schedule('every 60 minutes').onRun(async (context) => {
  const now = admin.firestore.Timestamp.now();
  const snapshot = await db.collection('investments')
    .where('status', '==', 'active')
    .where('nextPayoutAt', '<=', now)
    .get();

  if (snapshot.empty) {
    console.log('No matured 24-hour yield stakes to process.');
    return null;
  }

  const batch = db.batch();

  for (const doc of snapshot.docs) {
    const inv = doc.data();
    const userId = inv.userId;
    const amount = Number(inv.amount || 0);
    const dailyProfit = Number((amount * 0.02).toFixed(4)); // 2.0% Daily Yield

    // 1. Credit User USDT Wallet
    const walletRef = db.collection('wallets').doc(userId);
    batch.set(walletRef, {
      balanceUsdt: admin.firestore.FieldValue.increment(dailyProfit),
      totalEarningsUsdt: admin.firestore.FieldValue.increment(dailyProfit),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    // 2. Schedule next 24-hour payout or mark completed
    const next24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    batch.update(doc.ref, {
      earnedAmount: admin.firestore.FieldValue.increment(dailyProfit),
      lastPayoutAt: now,
      nextPayoutAt: admin.firestore.Timestamp.fromDate(next24Hours),
      payoutCount: admin.firestore.FieldValue.increment(1),
      updatedAt: now
    });

    // 3. Log Yield Transaction Record
    const txRef = db.collection('transactions').doc();
    batch.set(txRef, {
      userId: userId,
      type: 'yield_earning',
      amount: dailyProfit,
      currency: 'USDT',
      status: 'completed',
      description: '2.0% Daily 24H Yield Bonus (Stake #' + doc.id.substring(0, 6) + ')',
      createdAt: now
    });

    // 4. Send In-App Notification
    const notifRef = db.collection('notifications').doc();
    batch.set(notifRef, {
      userId: userId,
      title: 'Daily Yield Paid! ⚡',
      message: '+$' + dailyProfit.toFixed(2) + ' USDT (2.0% Daily Yield) credited to your wallet.',
      type: 'reward',
      read: false,
      createdAt: now
    });
  }

  await batch.commit();
  console.log(\`Successfully credited \${snapshot.docs.length} matured yield stakes.\`);
  return null;
});

/**
 * 2. ADMIN DEPOSIT APPROVAL & $25 REFERRAL BONUS TRIGGER
 */
exports.onDepositStatusChanged = functions.firestore
  .document('deposits/{depositId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // Triggered when admin marks deposit as approved
    if (before.status !== 'approved' && after.status === 'approved') {
      const userId = after.userId;
      const amount = Number(after.amount || 0);
      const currency = (after.currency || 'USD').toUpperCase();
      const depositId = context.params.depositId;

      const batch = db.batch();

      // 1. Credit User Wallet
      const walletRef = db.collection('wallets').doc(userId);
      const fieldMap = {
        'USD': 'balanceUsd',
        'EUR': 'balanceEur',
        'GBP': 'balanceGbp',
        'USDT': 'balanceUsdt'
      };
      const walletField = fieldMap[currency] || 'balanceUsd';

      batch.set(walletRef, {
        [walletField]: admin.firestore.FieldValue.increment(amount),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      // 2. Mark Transaction Completed
      const txRef = db.collection('transactions').doc();
      batch.set(txRef, {
        userId: userId,
        type: 'deposit',
        amount: amount,
        currency: currency,
        status: 'completed',
        referenceId: after.referenceNumber || depositId,
        description: \`Institutional Deposit Verified & Credited (\${currency})\`,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // 3. Award Pending $25 Referral Bounty if First Deposit
      const refSnapshot = await db.collection('referrals')
        .where('referredUserId', '==', userId)
        .where('status', '==', 'pending')
        .limit(1)
        .get();

      if (!refSnapshot.empty) {
        const refDoc = refSnapshot.docs[0];
        const referrerId = refDoc.data().referrerId;
        const bonus = Number(refDoc.data().bonusAmount || 25.0);

        // Credit Referrer $25
        const refWalletRef = db.collection('wallets').doc(referrerId);
        batch.set(refWalletRef, {
          balanceUsd: admin.firestore.FieldValue.increment(bonus),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        batch.update(refDoc.ref, {
          status: 'paid',
          paidAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // Notify Referrer
        const notifRef = db.collection('notifications').doc();
        batch.set(notifRef, {
          userId: referrerId,
          title: 'Referral Bounty Paid! 🎁',
          message: 'Your invited member deposited! +$' + bonus.toFixed(2) + ' USD credited to your account.',
          type: 'reward',
          read: false,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }

      await batch.commit();
      console.log(\`Deposit \${depositId} successfully credited with wallet updates.\`);
    }
  });
`;
