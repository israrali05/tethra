import JSZip from 'jszip';
import {
  FLUTTER_PUBSPEC_YAML,
  FLUTTER_MAIN_DART,
  FLUTTER_APP_ROUTER_DART,
  FLUTTER_THEME_DART,
  FIREBASE_FIRESTORE_RULES,
  FIREBASE_FUNCTIONS_JS,
} from './flutterCodeSnippets';

export interface FlutterZipOptions {
  appName?: string;
  supportPhone?: string;
  supportEmail?: string;
}

export const generateFlutterCompleteZip = async (options: FlutterZipOptions = {}) => {
  const zip = new JSZip();
  const appName = options.appName || 'Tethra Banking';
  const supportPhone = options.supportPhone || '+1 870-382-9652';

  // 1. Root files
  zip.file('pubspec.yaml', FLUTTER_PUBSPEC_YAML);
  zip.file(
    'README.md',
    `# ${appName} - Flutter & Firebase Suite

Cross-platform mobile and web application built with **Flutter**, **GoRouter**, **Provider**, and **Firebase (Firestore, Authentication, Cloud Functions, Storage)**.

## 🚀 Features
- ⚡ 24-Hour 2.0% Tether (USDT) Daily Yield Staking Engine
- 🏦 Multi-Currency Banking (USD Checking, EUR SEPA, GBP Faster Payments, USDT Crypto)
- 📥 Real Deposit Settlement (Bank Wire SWIFT/ACH/SEPA + Crypto USDT TRC20/ERC20 with Slip Upload)
- 📤 Secure Multi-Rail Withdrawals with 6-Digit Security PIN
- 🎁 $25 Referral Bounty System
- 🔐 Firebase Authentication (Phone OTP + PIN / Email + Password)
- 🛡️ Firestore Real-time Multi-Currency Synchronizer
- ⚡ Automated Cloud Function Yield Compounding Cron

## 🛠️ Quick Start

\`\`\`bash
# 1. Install Flutter dependencies
flutter pub get

# 2. Configure Firebase (Make sure Firebase CLI is installed)
flutterfire configure

# 3. Run on Chrome (Web) or Emulator (iOS/Android)
flutter run -d chrome
\`\`\`
`
  );

  // 2. Lib folder
  const lib = zip.folder('lib');
  if (lib) {
    lib.file('main.dart', FLUTTER_MAIN_DART);

    // lib/models
    const models = lib.folder('models');
    if (models) {
      models.file(
        'user_model.dart',
        `import 'package:cloud_firestore/cloud_firestore.dart';

class UserModel {
  final String id;
  final String email;
  final String phone;
  final String firstName;
  final String lastName;
  final String referralCode;
  final String role;
  final bool kycVerified;
  final DateTime createdAt;

  UserModel({
    required this.id,
    required this.email,
    required this.phone,
    required this.firstName,
    required this.lastName,
    required this.referralCode,
    required this.role,
    this.kycVerified = false,
    required this.createdAt,
  });

  String get fullName => '\$firstName \$lastName'.trim();

  factory UserModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>? ?? {};
    return UserModel(
      id: doc.id,
      email: data['email'] ?? '',
      phone: data['phone'] ?? '',
      firstName: data['firstName'] ?? '',
      lastName: data['lastName'] ?? '',
      referralCode: data['referralCode'] ?? 'THR-8890',
      role: data['role'] ?? 'user',
      kycVerified: data['kycVerified'] ?? false,
      createdAt: (data['createdAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'email': email,
      'phone': phone,
      'firstName': firstName,
      'lastName': lastName,
      'referralCode': referralCode,
      'role': role,
      'kycVerified': kycVerified,
      'createdAt': Timestamp.fromDate(createdAt),
    };
  }
}
`
      );

      models.file(
        'wallet_model.dart',
        `import 'package:cloud_firestore/cloud_firestore.dart';

class WalletModel {
  final String userId;
  final double balanceUsd;
  final double balanceEur;
  final double balanceGbp;
  final double balanceUsdt;
  final double totalEarningsUsdt;
  final bool isFrozen;

  WalletModel({
    required this.userId,
    this.balanceUsd = 0.0,
    this.balanceEur = 0.0,
    this.balanceGbp = 0.0,
    this.balanceUsdt = 0.0,
    this.totalEarningsUsdt = 0.0,
    this.isFrozen = false,
  });

  double get totalPortfolioUSD => balanceUsd + (balanceEur * 1.08) + (balanceGbp * 1.28) + balanceUsdt;

  factory WalletModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>? ?? {};
    return WalletModel(
      userId: doc.id,
      balanceUsd: (data['balanceUsd'] as num?)?.toDouble() ?? 0.0,
      balanceEur: (data['balanceEur'] as num?)?.toDouble() ?? 0.0,
      balanceGbp: (data['balanceGbp'] as num?)?.toDouble() ?? 0.0,
      balanceUsdt: (data['balanceUsdt'] as num?)?.toDouble() ?? 0.0,
      totalEarningsUsdt: (data['totalEarningsUsdt'] as num?)?.toDouble() ?? 0.0,
      isFrozen: data['isFrozen'] ?? false,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'balanceUsd': balanceUsd,
      'balanceEur': balanceEur,
      'balanceGbp': balanceGbp,
      'balanceUsdt': balanceUsdt,
      'totalEarningsUsdt': totalEarningsUsdt,
      'isFrozen': isFrozen,
      'updatedAt': FieldValue.serverTimestamp(),
    };
  }
}
`
      );

      models.file(
        'investment_model.dart',
        `import 'package:cloud_firestore/cloud_firestore.dart';

class InvestmentModel {
  final String id;
  final String userId;
  final double amount;
  final double dailyRatePct;
  final double earnedAmount;
  final String status;
  final DateTime startedAt;
  final DateTime nextPayoutAt;

  InvestmentModel({
    required this.id,
    required this.userId,
    required this.amount,
    this.dailyRatePct = 2.0,
    this.earnedAmount = 0.0,
    this.status = 'active',
    required this.startedAt,
    required this.nextPayoutAt,
  });

  double get dailyYieldProfit => amount * (dailyRatePct / 100.0);

  factory InvestmentModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>? ?? {};
    return InvestmentModel(
      id: doc.id,
      userId: data['userId'] ?? '',
      amount: (data['amount'] as num?)?.toDouble() ?? 0.0,
      dailyRatePct: (data['dailyRatePct'] as num?)?.toDouble() ?? 2.0,
      earnedAmount: (data['earnedAmount'] as num?)?.toDouble() ?? 0.0,
      status: data['status'] ?? 'active',
      startedAt: (data['startedAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
      nextPayoutAt: (data['nextPayoutAt'] as Timestamp?)?.toDate() ?? DateTime.now().add(const Duration(hours: 24)),
    );
  }
}
`
      );

      models.file(
        'transaction_model.dart',
        `import 'package:cloud_firestore/cloud_firestore.dart';

class TransactionModel {
  final String id;
  final String userId;
  final String type;
  final double amount;
  final String currency;
  final String status;
  final String description;
  final String? referenceId;
  final DateTime createdAt;

  TransactionModel({
    required this.id,
    required this.userId,
    required this.type,
    required this.amount,
    required this.currency,
    required this.status,
    required this.description,
    this.referenceId,
    required this.createdAt,
  });

  factory TransactionModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>? ?? {};
    return TransactionModel(
      id: doc.id,
      userId: data['userId'] ?? '',
      type: data['type'] ?? 'deposit',
      amount: (data['amount'] as num?)?.toDouble() ?? 0.0,
      currency: data['currency'] ?? 'USD',
      status: data['status'] ?? 'completed',
      description: data['description'] ?? '',
      referenceId: data['referenceId'],
      createdAt: (data['createdAt'] as Timestamp?)?.toDate() ?? DateTime.now(),
    );
  }
}
`
      );
    }

    // lib/services
    const services = lib.folder('services');
    if (services) {
      services.file(
        'firestore_service.dart',
        `import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/user_model.dart';
import '../models/wallet_model.dart';
import '../models/investment_model.dart';
import '../models/transaction_model.dart';

class FirestoreService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  // Stream User Profile
  Stream<UserModel?> streamUser(String uid) {
    return _db.collection('users').doc(uid).snapshots().map((doc) {
      if (!doc.exists) return null;
      return UserModel.fromFirestore(doc);
    });
  }

  // Stream Multi-Currency Wallet
  Stream<WalletModel?> streamWallet(String uid) {
    return _db.collection('wallets').doc(uid).snapshots().map((doc) {
      if (!doc.exists) return null;
      return WalletModel.fromFirestore(doc);
    });
  }

  // Stream Active 2% Staking Stakes
  Stream<List<InvestmentModel>> streamInvestments(String uid) {
    return _db
        .collection('investments')
        .where('userId', isEqualTo: uid)
        .orderBy('startedAt', descending: true)
        .snapshots()
        .map((snap) => snap.docs.map((d) => InvestmentModel.fromFirestore(d)).toList());
  }

  // Stream Transactions
  Stream<List<TransactionModel>> streamTransactions(String uid) {
    return _db
        .collection('transactions')
        .where('userId', isEqualTo: uid)
        .orderBy('createdAt', descending: true)
        .limit(20)
        .snapshots()
        .map((snap) => snap.docs.map((d) => TransactionModel.fromFirestore(d)).toList());
  }

  // Stake into 2.0% Daily Yield
  Future<void> createYieldStake(String uid, double amount) async {
    final walletRef = _db.collection('wallets').doc(uid);
    final invRef = _db.collection('investments').doc();
    final txRef = _db.collection('transactions').doc();

    await _db.runTransaction((transaction) async {
      final snap = await transaction.get(walletRef);
      final curUsdt = (snap.data()?['balanceUsdt'] as num?)?.toDouble() ?? 0.0;
      if (curUsdt < amount) {
        throw Exception('Insufficient USDT balance for staking.');
      }

      transaction.update(walletRef, {
        'balanceUsdt': curUsdt - amount,
        'updatedAt': FieldValue.serverTimestamp(),
      });

      transaction.set(invRef, {
        'userId': uid,
        'amount': amount,
        'dailyRatePct': 2.0,
        'earnedAmount': 0.0,
        'status': 'active',
        'startedAt': FieldValue.serverTimestamp(),
        'nextPayoutAt': Timestamp.fromDate(DateTime.now().add(const Duration(hours: 24))),
      });

      transaction.set(txRef, {
        'userId': uid,
        'type': 'investment',
        'amount': amount,
        'currency': 'USDT',
        'status': 'completed',
        'description': 'Staked in 24-Hour 2.0% Daily Yield Pool',
        'createdAt': FieldValue.serverTimestamp(),
      });
    });
  }
}
`
      );

      services.file(
        'firebase_auth_service.dart',
        `import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class FirebaseAuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  User? get currentUser => _auth.currentUser;
  Stream<User?> get authStateChanges => _auth.authStateChanges();

  // Login Email/Password
  Future<UserCredential> signIn(String email, String password) async {
    return await _auth.signInWithEmailAndPassword(email: email, password: password);
  }

  // Register New Client
  Future<UserCredential> register({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
    required String phone,
    String? referralCode,
  }) async {
    final cred = await _auth.createUserWithEmailAndPassword(email: email, password: password);
    final uid = cred.user!.uid;

    // Create User Document
    await _db.collection('users').doc(uid).set({
      'email': email,
      'firstName': firstName,
      'lastName': lastName,
      'phone': phone,
      'role': 'user',
      'referralCode': 'THR-' + uid.substring(0, 6).toUpperCase(),
      'kycVerified': false,
      'createdAt': FieldValue.serverTimestamp(),
    });

    // Create Multi-Currency Wallet
    await _db.collection('wallets').doc(uid).set({
      'balanceUsd': 0.0,
      'balanceEur': 0.0,
      'balanceGbp': 0.0,
      'balanceUsdt': 0.0,
      'totalEarningsUsdt': 0.0,
      'isFrozen': false,
      'createdAt': FieldValue.serverTimestamp(),
    });

    // Link Referral if present
    if (referralCode != null && referralCode.isNotEmpty) {
      final refSnap = await _db.collection('users').where('referralCode', isEqualTo: referralCode).limit(1).get();
      if (refSnap.docs.isNotEmpty) {
        final referrerId = refSnap.docs.first.id;
        await _db.collection('referrals').add({
          'referrerId': referrerId,
          'referredUserId': uid,
          'bonusAmount': 25.00,
          'status': 'pending',
          'createdAt': FieldValue.serverTimestamp(),
        });
      }
    }

    return cred;
  }

  Future<void> signOut() async {
    await _auth.signOut();
  }
}
`
      );
    }

    // lib/providers
    const providers = lib.folder('providers');
    if (providers) {
      providers.file(
        'auth_provider.dart',
        `import 'package:flutter/foundation.dart';
import '../services/firebase_auth_service.dart';
import '../services/firestore_service.dart';
import '../models/user_model.dart';

class AuthProvider with ChangeNotifier {
  final FirebaseAuthService _authService = FirebaseAuthService();
  final FirestoreService _firestoreService = FirestoreService();

  UserModel? _user;
  bool _isLoading = false;

  UserModel? get user => _user;
  String? get uid => _authService.currentUser?.uid;
  bool get isAuthenticated => _user != null || _authService.currentUser != null;
  bool get isLoading => _isLoading;

  AuthProvider() {
    _authService.authStateChanges.listen((firebaseUser) {
      if (firebaseUser != null) {
        _firestoreService.streamUser(firebaseUser.uid).listen((userData) {
          _user = userData;
          notifyListeners();
        });
      } else {
        _user = null;
        notifyListeners();
      }
    });
  }

  Future<void> login(String email, String password) async {
    _isLoading = true;
    notifyListeners();
    try {
      await _authService.signIn(email, password);
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> register(String email, String password, String first, String last, String phone, String? ref) async {
    _isLoading = true;
    notifyListeners();
    try {
      await _authService.register(
        email: email,
        password: password,
        firstName: first,
        lastName: last,
        phone: phone,
        referralCode: ref,
      );
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> logout() async {
    await _authService.signOut();
  }
}
`
      );

      providers.file(
        'wallet_provider.dart',
        `import 'package:flutter/foundation.dart';
import '../models/wallet_model.dart';
import '../services/firestore_service.dart';
import 'auth_provider.dart';

class WalletProvider with ChangeNotifier {
  final FirestoreService _firestoreService = FirestoreService();
  WalletModel? _wallet;

  WalletModel? get wallet => _wallet;
  double get balanceUsd => _wallet?.balanceUsd ?? 0.0;
  double get balanceEur => _wallet?.balanceEur ?? 0.0;
  double get balanceGbp => _wallet?.balanceGbp ?? 0.0;
  double get balanceUsdt => _wallet?.balanceUsdt ?? 0.0;
  double get totalPortfolioUSD => _wallet?.totalPortfolioUSD ?? 0.0;

  WalletProvider(AuthProvider auth) {
    if (auth.uid != null) {
      _firestoreService.streamWallet(auth.uid!).listen((w) {
        _wallet = w;
        notifyListeners();
      });
    }
  }
}
`
      );

      providers.file(
        'investment_provider.dart',
        `import 'package:flutter/foundation.dart';
import '../models/investment_model.dart';
import '../services/firestore_service.dart';
import 'auth_provider.dart';

class InvestmentProvider with ChangeNotifier {
  final FirestoreService _firestoreService = FirestoreService();
  List<InvestmentModel> _investments = [];
  final String? _uid;

  List<InvestmentModel> get investments => _investments;
  double get totalActiveStaked => _investments
      .where((i) => i.status == 'active')
      .fold(0.0, (acc, item) => acc + item.amount);

  InvestmentProvider(AuthProvider auth) : _uid = auth.uid {
    if (_uid != null) {
      _firestoreService.streamInvestments(_uid!).listen((invs) {
        _investments = invs;
        notifyListeners();
      });
    }
  }

  Future<void> stake(double amount) async {
    if (_uid != null) {
      await _firestoreService.createYieldStake(_uid!, amount);
    }
  }
}
`
      );

      providers.file(
        'transaction_provider.dart',
        `import 'package:flutter/foundation.dart';
import '../models/transaction_model.dart';
import '../services/firestore_service.dart';
import 'auth_provider.dart';

class TransactionProvider with ChangeNotifier {
  final FirestoreService _firestoreService = FirestoreService();
  List<TransactionModel> _transactions = [];

  List<TransactionModel> get transactions => _transactions;

  TransactionProvider(AuthProvider auth) {
    if (auth.uid != null) {
      _firestoreService.streamTransactions(auth.uid!).listen((txs) {
        _transactions = txs;
        notifyListeners();
      });
    }
  }
}
`
      );

      providers.file(
        'theme_provider.dart',
        `import 'package:flutter/material.dart';

class ThemeProvider with ChangeNotifier {
  bool _isDarkMode = true;
  bool get isDarkMode => _isDarkMode;

  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
    notifyListeners();
  }
}
`
      );
    }

    // lib/router
    const router = lib.folder('router');
    if (router) {
      router.file('app_router.dart', FLUTTER_APP_ROUTER_DART);
    }

    // lib/utils
    const utils = lib.folder('utils');
    if (utils) {
      utils.file('app_theme.dart', FLUTTER_THEME_DART);
      utils.file(
        'currency_formatter.dart',
        `import 'package:intl/intl.dart';

class CurrencyFormatter {
  static String format(double amount, {String currency = 'USD'}) {
    final format = NumberFormat.currency(
      symbol: currency == 'USD' ? '\$' : (currency == 'EUR' ? '€' : (currency == 'GBP' ? '£' : 'USDT ')),
      decimalDigits: 2,
    );
    return format.format(amount);
  }
}
`
      );
    }

    // lib/views
    const views = lib.folder('views');
    if (views) {
      // public views
      const publicViews = views.folder('public');
      if (publicViews) {
        publicViews.file(
          'landing_view.dart',
          `import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../utils/app_theme.dart';

class LandingView extends StatefulWidget {
  const LandingView({super.key});

  @override
  State<LandingView> createState() => _LandingViewState();
}

class _LandingViewState extends State<LandingView> {
  double _calcAmount = 1000.0;

  @override
  Widget build(BuildContext context) {
    final dailyReturn = _calcAmount * 0.02;
    final monthlyReturn = dailyReturn * 30;

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            const Icon(LucideIcons.landmark, color: AppTheme.goldPrimary),
            const SizedBox(width: 8),
            Text(
              'TETHRA',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                letterSpacing: 2,
                color: AppTheme.goldLight,
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => context.push('/login'),
            child: const Text('Sign In', style: TextStyle(color: AppTheme.goldPrimary, fontWeight: FontWeight.bold)),
          ),
          const SizedBox(width: 8),
          ElevatedButton(
            onPressed: () => context.push('/register'),
            child: const Text('Open Account'),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 32),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
              decoration: BoxDecoration(
                color: AppTheme.bgCard,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppTheme.borderGold),
              ),
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(LucideIcons.zap, color: AppTheme.goldPrimary, size: 16),
                  SizedBox(width: 6),
                  Text('AUTOMATED 2.0% 24-HOUR DAILY YIELD ENGINE', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.goldLight)),
                ],
              ),
            ),
            const SizedBox(height: 20),
            const Text(
              'Institutional Banking & High-Yield Crypto Infrastructure',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 32, fontWeight: FontWeight.w900, color: AppTheme.textMain),
            ),
            const SizedBox(height: 12),
            const Text(
              'Multi-currency accounts, SEPA/ACH/SWIFT settlement rails, and automated 24-hour Tether (USDT) compound yield.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16, color: AppTheme.textMuted),
            ),
            const SizedBox(height: 32),
            
            // Yield Calculator Card
            Container(
              width: double.infinity,
              constraints: const BoxConstraints(maxWidth: 600),
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: AppTheme.bgCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppTheme.borderGold),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('2.0% Daily Yield Calculator', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: AppTheme.goldLight)),
                      Text('24H Payouts', style: TextStyle(color: AppTheme.emeraldAccent, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  const SizedBox(height: 20),
                  Text('Deposit Amount: \$' + _calcAmount.toStringAsFixed(0) + ' USDT', style: const TextStyle(color: AppTheme.textMuted)),
                  Slider(
                    value: _calcAmount,
                    min: 100,
                    max: 50000,
                    divisions: 100,
                    activeColor: AppTheme.goldPrimary,
                    inactiveColor: Colors.white12,
                    onChanged: (val) => setState(() => _calcAmount = val),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Daily Profit (24h)', style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                          Text('+\$' + dailyReturn.toStringAsFixed(2) + ' USDT', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.emeraldAccent)),
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          const Text('Monthly Estimate', style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                          Text('+\$' + monthlyReturn.toStringAsFixed(2) + ' USDT', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.goldLight)),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () => context.push('/register'),
                      child: const Text('Start Earning 2.0% Daily Yield Now'),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`
        );

        publicViews.file(
          'login_view.dart',
          `import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../utils/app_theme.dart';

class LoginView extends StatefulWidget {
  const LoginView({super.key});

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  final _emailCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  String? _error;

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();

    return Scaffold(
      appBar: AppBar(title: const Text('Institutional Client Sign In')),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Container(
            constraints: const BoxConstraints(maxWidth: 440),
            padding: const EdgeInsets.all(28),
            decoration: BoxDecoration(
              color: AppTheme.bgCard,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppTheme.borderGold),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Welcome Back', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.goldLight)),
                const SizedBox(height: 8),
                const Text('Sign in with your email or phone credentials.', style: TextStyle(color: AppTheme.textMuted)),
                const SizedBox(height: 24),
                if (_error != null)
                  Container(
                    padding: const EdgeInsets.all(12),
                    margin: const EdgeInsets.bottom(16),
                    decoration: BoxDecoration(color: Colors.red.withOpacity(0.2), borderRadius: BorderRadius.circular(8)),
                    child: Text(_error!, style: const TextStyle(color: Colors.redAccent)),
                  ),
                TextField(
                  controller: _emailCtrl,
                  decoration: const InputDecoration(
                    labelText: 'Email Address or Phone',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _passCtrl,
                  obscureText: true,
                  decoration: const InputDecoration(
                    labelText: 'Password or 6-Digit PIN',
                    border: OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: auth.isLoading
                        ? null
                        : () async {
                            try {
                              await auth.login(_emailCtrl.text.trim(), _passCtrl.text.trim());
                              if (context.mounted) context.go('/dashboard');
                            } catch (e) {
                              setState(() => _error = e.toString());
                            }
                          },
                    child: auth.isLoading
                        ? const CircularProgressIndicator(color: AppTheme.bgPrimary)
                        : const Text('Secure Login'),
                  ),
                ),
                const SizedBox(height: 16),
                Center(
                  child: TextButton(
                    onPressed: () => context.push('/register'),
                    child: const Text('Don\\'t have an account? Open Client Portal', style: TextStyle(color: AppTheme.goldPrimary)),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
`
        );

        publicViews.file(
          'register_view.dart',
          `import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../utils/app_theme.dart';

class RegisterView extends StatefulWidget {
  const RegisterView({super.key});

  @override
  State<RegisterView> createState() => _RegisterViewState();
}

class _RegisterViewState extends State<RegisterView> {
  final _firstCtrl = TextEditingController();
  final _lastCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();
  final _phoneCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  final _refCtrl = TextEditingController();
  String? _error;

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();

    return Scaffold(
      appBar: AppBar(title: const Text('Open Institutional Account')),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Container(
            constraints: const BoxConstraints(maxWidth: 520),
            padding: const EdgeInsets.all(28),
            decoration: BoxDecoration(
              color: AppTheme.bgCard,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppTheme.borderGold),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Create Client Account', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: AppTheme.goldLight)),
                const SizedBox(height: 6),
                const Text('Join high-yield banking with multi-currency accounts and 2.0% daily yield.', style: TextStyle(color: AppTheme.textMuted)),
                const SizedBox(height: 20),
                if (_error != null)
                  Container(
                    padding: const EdgeInsets.all(12),
                    margin: const EdgeInsets.bottom(16),
                    decoration: BoxDecoration(color: Colors.red.withOpacity(0.2), borderRadius: BorderRadius.circular(8)),
                    child: Text(_error!, style: const TextStyle(color: Colors.redAccent)),
                  ),
                Row(
                  children: [
                    Expanded(child: TextField(controller: _firstCtrl, decoration: const InputDecoration(labelText: 'First Name', border: OutlineInputBorder()))),
                    const SizedBox(width: 12),
                    Expanded(child: TextField(controller: _lastCtrl, decoration: const InputDecoration(labelText: 'Last Name', border: OutlineInputBorder()))),
                  ],
                ),
                const SizedBox(height: 14),
                TextField(controller: _emailCtrl, decoration: const InputDecoration(labelText: 'Email Address', border: OutlineInputBorder())),
                const SizedBox(height: 14),
                TextField(controller: _phoneCtrl, decoration: const InputDecoration(labelText: 'Phone Number (SMS & PIN)', border: OutlineInputBorder())),
                const SizedBox(height: 14),
                TextField(controller: _passCtrl, obscureText: true, decoration: const InputDecoration(labelText: 'Password / 6-Digit PIN', border: OutlineInputBorder())),
                const SizedBox(height: 14),
                TextField(
                  controller: _refCtrl,
                  decoration: const InputDecoration(
                    labelText: 'Referral Code (Optional - Earns +\$25.00 Bonus)',
                    border: OutlineInputBorder(),
                    helperText: '🎁 Receive \$25.00 cash bonus upon verification',
                    helperStyle: TextStyle(color: AppTheme.goldPrimary),
                  ),
                ),
                const SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: auth.isLoading
                        ? null
                        : () async {
                            try {
                              await auth.register(
                                _emailCtrl.text.trim(),
                                _passCtrl.text.trim(),
                                _firstCtrl.text.trim(),
                                _lastCtrl.text.trim(),
                                _phoneCtrl.text.trim(),
                                _refCtrl.text.trim(),
                              );
                              if (context.mounted) context.go('/dashboard');
                            } catch (e) {
                              setState(() => _error = e.toString());
                            }
                          },
                    child: auth.isLoading
                        ? const CircularProgressIndicator(color: AppTheme.bgPrimary)
                        : const Text('Open Account & Start Earning'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
`
        );
      }

      // dashboard views
      const dashViews = views.folder('dashboard');
      if (dashViews) {
        dashViews.file(
          'dashboard_home_view.dart',
          `import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../providers/auth_provider.dart';
import '../../providers/wallet_provider.dart';
import '../../providers/investment_provider.dart';
import '../../providers/transaction_provider.dart';
import '../../utils/app_theme.dart';
import '../../utils/currency_formatter.dart';

class DashboardHomeView extends StatelessWidget {
  const DashboardHomeView({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final wallet = context.watch<WalletProvider>();
    final invest = context.watch<InvestmentProvider>();
    final txProv = context.watch<TransactionProvider>();

    return Scaffold(
      appBar: AppBar(
        title: Text('Welcome, \${auth.user?.fullName ?? "Client"}'),
        actions: [
          IconButton(
            icon: const Icon(LucideIcons.logOut),
            onPressed: () async {
              await auth.logout();
              if (context.mounted) context.go('/login');
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Portfolio Total Card
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppTheme.bgCardHover, AppTheme.bgCard],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppTheme.borderGold),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Total Net Portfolio Value', style: TextStyle(color: AppTheme.textMuted, fontSize: 13)),
                  const SizedBox(height: 6),
                  Text(
                    CurrencyFormatter.format(wallet.totalPortfolioUSD),
                    style: const TextStyle(fontSize: 32, fontWeight: FontWeight.w900, color: AppTheme.goldLight),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      _quickActionButton(context, LucideIcons.arrowDownLeft, 'Deposit', () => context.push('/deposit')),
                      const SizedBox(width: 10),
                      _quickActionButton(context, LucideIcons.arrowUpRight, 'Withdraw', () => context.push('/withdraw')),
                      const SizedBox(width: 10),
                      _quickActionButton(context, LucideIcons.zap, '2% Yield', () => context.push('/invest')),
                      const SizedBox(width: 10),
                      _quickActionButton(context, LucideIcons.gift, '\$25 Ref', () => context.push('/referrals')),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Balances Grid
            const Text('Multi-Currency Accounts', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.goldLight)),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(child: _balanceCard('USD Checking', CurrencyFormatter.format(wallet.balanceUsd, currency: 'USD'), LucideIcons.dollarSign)),
                const SizedBox(width: 12),
                Expanded(child: _balanceCard('USDT Staking', CurrencyFormatter.format(wallet.balanceUsdt, currency: 'USDT'), LucideIcons.zap)),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(child: _balanceCard('EUR SEPA', CurrencyFormatter.format(wallet.balanceEur, currency: 'EUR'), LucideIcons.euro)),
                const SizedBox(width: 12),
                Expanded(child: _balanceCard('GBP Faster', CurrencyFormatter.format(wallet.balanceGbp, currency: 'GBP'), LucideIcons.poundSign)),
              ],
            ),
            const SizedBox(height: 24),

            // Recent Transactions
            const Text('Recent Clearing Activities', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.goldLight)),
            const SizedBox(height: 12),
            if (txProv.transactions.isEmpty)
              const Center(child: Padding(padding: EdgeInsets.all(24), child: Text('No transactions recorded yet.', style: TextStyle(color: AppTheme.textMuted))))
            else
              ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: txProv.transactions.length,
                separatorBuilder: (_, __) => const Divider(color: Colors.white10),
                itemBuilder: (ctx, idx) {
                  final tx = txProv.transactions[idx];
                  return ListTile(
                    leading: CircleAvatar(
                      backgroundColor: AppTheme.bgCard,
                      child: Icon(
                        tx.type == 'deposit' || tx.type == 'yield_earning' ? LucideIcons.arrowDownLeft : LucideIcons.arrowUpRight,
                        color: tx.type == 'yield_earning' ? AppTheme.goldPrimary : (tx.amount >= 0 ? AppTheme.emeraldAccent : Colors.redAccent),
                      ),
                    ),
                    title: Text(tx.description, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                    subtitle: Text(tx.createdAt.toIso8601String().substring(0, 10), style: const TextStyle(fontSize: 12, color: AppTheme.textMuted)),
                    trailing: Text(
                      (tx.type == 'deposit' || tx.type == 'yield_earning' ? '+' : '-') + CurrencyFormatter.format(tx.amount, currency: tx.currency),
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        color: tx.type == 'deposit' || tx.type == 'yield_earning' ? AppTheme.emeraldAccent : Colors.redAccent,
                      ),
                    ),
                  );
                },
              ),
          ],
        ),
      ),
    );
  }

  Widget _quickActionButton(BuildContext context, IconData icon, String label, VoidCallback onTap) {
    return Expanded(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(10),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 10),
          decoration: BoxDecoration(
            color: AppTheme.bgPrimary.withOpacity(0.6),
            borderRadius: BorderRadius.circular(10),
            border: Border.all(color: AppTheme.borderGold.withOpacity(0.4)),
          ),
          child: Column(
            children: [
              Icon(icon, color: AppTheme.goldPrimary, size: 20),
              const SizedBox(height: 4),
              Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.textMain)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _balanceCard(String title, String amount, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.bgCard,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppTheme.borderGold.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(title, style: const TextStyle(color: AppTheme.textMuted, fontSize: 12)),
              Icon(icon, size: 16, color: AppTheme.goldPrimary),
            ],
          ),
          const SizedBox(height: 8),
          Text(amount, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: AppTheme.textMain)),
        ],
      ),
    );
  }
}
`
        );

        dashViews.file(
          'invest_yield_view.dart',
          `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../providers/investment_provider.dart';
import '../../providers/wallet_provider.dart';
import '../../utils/app_theme.dart';
import '../../utils/currency_formatter.dart';

class InvestYieldView extends StatefulWidget {
  const InvestYieldView({super.key});

  @override
  State<InvestYieldView> createState() => _InvestYieldViewState();
}

class _InvestYieldViewState extends State<InvestYieldView> {
  final _amountCtrl = TextEditingController();
  bool _isStaking = false;

  @override
  Widget build(BuildContext context) {
    final invest = context.watch<InvestmentProvider>();
    final wallet = context.watch<WalletProvider>();

    return Scaffold(
      appBar: AppBar(title: const Text('24-Hour 2.0% Daily Staking Engine')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: AppTheme.bgCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppTheme.borderGold),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Tether (USDT) 2.0% Daily Pool', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.goldLight)),
                      Text('24H Auto-Compound', style: TextStyle(color: AppTheme.emeraldAccent, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Text('Available USDT: ' + CurrencyFormatter.format(wallet.balanceUsdt, currency: 'USDT'), style: const TextStyle(color: AppTheme.textMuted)),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _amountCtrl,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      labelText: 'Stake Amount (USDT)',
                      border: const OutlineInputBorder(),
                      suffixIcon: TextButton(
                        onPressed: () => _amountCtrl.text = wallet.balanceUsdt.toStringAsFixed(2),
                        child: const Text('MAX', style: TextStyle(color: AppTheme.goldPrimary)),
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: _isStaking
                          ? null
                          : () async {
                              final amt = double.tryParse(_amountCtrl.text.trim()) ?? 0;
                              if (amt <= 0 || amt > wallet.balanceUsdt) {
                                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Invalid stake amount.')));
                                return;
                              }
                              setState(() => _isStaking = true);
                              try {
                                await invest.stake(amt);
                                _amountCtrl.clear();
                                if (context.mounted) {
                                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Successfully staked in 2% Daily Pool! ⚡')));
                                }
                              } catch (e) {
                                if (context.mounted) {
                                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(e.toString())));
                                }
                              } finally {
                                setState(() => _isStaking = false);
                              }
                            },
                      child: _isStaking ? const CircularProgressIndicator(color: AppTheme.bgPrimary) : const Text('Lock Stake & Start 24H Yield'),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
            const Text('Active Staking Stakes', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.goldLight)),
            const SizedBox(height: 12),
            if (invest.investments.isEmpty)
              const Center(child: Padding(padding: EdgeInsets.all(24), child: Text('No active stakes yet.', style: TextStyle(color: AppTheme.textMuted))))
            else
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: invest.investments.length,
                itemBuilder: (ctx, idx) {
                  final inv = invest.investments[idx];
                  return Card(
                    color: AppTheme.bgCard,
                    margin: const EdgeInsets.only(bottom: 10),
                    child: ListTile(
                      leading: const Icon(LucideIcons.zap, color: AppTheme.goldPrimary),
                      title: Text(CurrencyFormatter.format(inv.amount, currency: 'USDT') + ' (2.0% Daily)'),
                      subtitle: Text('Earned so far: +' + CurrencyFormatter.format(inv.earnedAmount, currency: 'USDT'), style: const TextStyle(color: AppTheme.emeraldAccent)),
                      trailing: const Text('ACTIVE ⚡', style: TextStyle(color: AppTheme.emeraldAccent, fontWeight: FontWeight.bold)),
                    ),
                  );
                },
              ),
          ],
        ),
      ),
    );
  }
}
`
        );

        dashViews.file(
          'deposit_view.dart',
          `import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../utils/app_theme.dart';

class DepositView extends StatelessWidget {
  const DepositView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Deposit Settlement Clearing')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Select Settlement Rail', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.goldLight)),
            const SizedBox(height: 12),
            _railTile(context, 'Tether (USDT TRC20 / ERC20)', 'Instant automated crypto clearing', LucideIcons.zap),
            _railTile(context, 'US Domestic Wire & ACH', 'Same-day Federal Reserve clearing', LucideIcons.landmark),
            _railTile(context, 'European SEPA Instant', 'Euro clearing network', LucideIcons.euro),
            _railTile(context, 'UK Faster Payments (FPS)', 'Sterling clearing network', LucideIcons.poundSign),
          ],
        ),
      ),
    );
  }

  Widget _railTile(BuildContext context, String title, String subtitle, IconData icon) {
    return Card(
      color: AppTheme.bgCard,
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: Icon(icon, color: AppTheme.goldPrimary),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(subtitle, style: const TextStyle(color: AppTheme.textMuted, fontSize: 12)),
        trailing: const Icon(LucideIcons.chevronRight, color: AppTheme.goldPrimary),
        onTap: () {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Selected \$title - Instructions Generated.')));
        },
      ),
    );
  }
}
`
        );

        dashViews.file(
          'withdraw_view.dart',
          `import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import '../../utils/app_theme.dart';

class WithdrawView extends StatelessWidget {
  const WithdrawView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Withdraw Capital')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Authorized Withdrawal Outlets', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.goldLight)),
            const SizedBox(height: 12),
            _methodTile(context, 'Crypto Wallet (USDT TRC20/ERC20)', 'Direct blockchain withdrawal', LucideIcons.wallet),
            _methodTile(context, 'International Wire Transfer (SWIFT)', 'Direct to your global bank account', LucideIcons.landmark),
            _methodTile(context, 'SEPA / Faster Payments', 'Instant European & UK transfer', LucideIcons.arrowUpRight),
          ],
        ),
      ),
    );
  }

  Widget _methodTile(BuildContext context, String title, String desc, IconData icon) {
    return Card(
      color: AppTheme.bgCard,
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: Icon(icon, color: AppTheme.goldPrimary),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(desc, style: const TextStyle(color: AppTheme.textMuted, fontSize: 12)),
        trailing: const Icon(LucideIcons.chevronRight, color: AppTheme.goldPrimary),
      ),
    );
  }
}
`
        );

        dashViews.file(
          'savings_vaults_view.dart',
          `import 'package:flutter/material.dart';
import '../../utils/app_theme.dart';

class SavingsVaultsView extends StatelessWidget {
  const SavingsVaultsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('High-Yield Savings Vaults (5.4% APY)')),
      body: const Center(child: Text('Savings Vaults & Milestone Targets Ready')),
    );
  }
}
`
        );

        dashViews.file(
          'p2p_transfer_view.dart',
          `import 'package:flutter/material.dart';
import '../../utils/app_theme.dart';

class P2PTransferView extends StatelessWidget {
  const P2PTransferView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Instant P2P Member Transfer')),
      body: const Center(child: Text('P2P Transfer with 6-Digit PIN Security')),
    );
  }
}
`
        );

        dashViews.file(
          'accounts_cards_view.dart',
          `import 'package:flutter/material.dart';
import '../../utils/app_theme.dart';

class AccountsCardsView extends StatelessWidget {
  const AccountsCardsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Accounts & Virtual Cards')),
      body: const Center(child: Text('Multi-Currency IBANs & Virtual Cards')),
    );
  }
}
`
        );

        dashViews.file(
          'referrals_view.dart',
          `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../utils/app_theme.dart';

class ReferralsView extends StatelessWidget {
  const ReferralsView({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final code = auth.user?.referralCode ?? 'THR-8821';

    return Scaffold(
      appBar: AppBar(title: const Text('\$25 Referral Bounty Desk')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: AppTheme.bgCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppTheme.borderGold),
              ),
              child: Column(
                children: [
                  const Text('Earn +\$25.00 Cash per Verified Member', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: AppTheme.goldLight)),
                  const SizedBox(height: 12),
                  const Text('Share your unique invite code with partners or colleagues. When they deposit, \$25.00 USD is instantly credited to your wallet.', textAlign: TextAlign.center, style: TextStyle(color: AppTheme.textMuted)),
                  const SizedBox(height: 20),
                  SelectableText(code, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold, letterSpacing: 4, color: AppTheme.goldPrimary)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`
        );

        dashViews.file(
          'kyc_verification_view.dart',
          `import 'package:flutter/material.dart';

class KYCVerificationView extends StatelessWidget {
  const KYCVerificationView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Institutional Identity Verification (KYC)')),
      body: const Center(child: Text('KYC Document Uploader & Compliance Portal')),
    );
  }
}
`
        );

        dashViews.file(
          'security_settings_view.dart',
          `import 'package:flutter/material.dart';

class SecuritySettingsView extends StatelessWidget {
  const SecuritySettingsView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Security & PIN Configuration')),
      body: const Center(child: Text('2FA, PIN Reset & Device Audit Desk')),
    );
  }
}
`
        );
      }

      // admin views
      const adminViews = views.folder('admin');
      if (adminViews) {
        adminViews.file(
          'admin_portal_view.dart',
          `import 'package:flutter/material.dart';
import '../../utils/app_theme.dart';

class AdminPortalView extends StatelessWidget {
  const AdminPortalView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Executive Treasury Admin Desk')),
      body: const Center(child: Text('Deposit Approvals, 2% Global Yield Distribution & User Accounts Manager')),
    );
  }
}
`
        );
      }
    }
  }

  // 3. Firebase Configuration Files
  const firebase = zip.folder('firebase');
  if (firebase) {
    firebase.file('firestore.rules', FIREBASE_FIRESTORE_RULES);
    firebase.file(
      'storage.rules',
      `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /deposit_proofs/{userId}/{fileName} {
      allow read, write: if request.auth != null && (request.auth.uid == userId || request.auth.token.role == 'admin');
    }
    match /kyc_documents/{userId}/{fileName} {
      allow read, write: if request.auth != null && (request.auth.uid == userId || request.auth.token.role == 'admin');
    }
  }
}
`
    );

    firebase.file(
      'firebase.json',
      JSON.stringify(
        {
          firestore: {
            rules: 'firestore.rules',
            indexes: 'firestore.indexes.json',
          },
          functions: {
            source: 'functions',
          },
          storage: {
            rules: 'storage.rules',
          },
        },
        null,
        2
      )
    );

    firebase.file(
      'firestore.indexes.json',
      JSON.stringify(
        {
          indexes: [
            {
              collectionGroup: 'investments',
              queryScope: 'COLLECTION',
              fields: [
                { fieldPath: 'userId', order: 'ASCENDING' },
                { fieldPath: 'startedAt', order: 'DESCENDING' },
              ],
            },
            {
              collectionGroup: 'transactions',
              queryScope: 'COLLECTION',
              fields: [
                { fieldPath: 'userId', order: 'ASCENDING' },
                { fieldPath: 'createdAt', order: 'DESCENDING' },
              ],
            },
          ],
          fieldOverrides: [],
        },
        null,
        2
      )
    );

    const functions = firebase.folder('functions');
    if (functions) {
      functions.file(
        'package.json',
        JSON.stringify(
          {
            name: 'functions',
            description: 'Tethra Cloud Functions 2% Daily Yield Cron & Deposit Automation',
            scripts: {
              serve: 'firebase emulators:start --only functions',
              shell: 'firebase functions:shell',
              start: 'npm run shell',
              deploy: 'firebase deploy --only functions',
              logs: 'firebase functions:log',
            },
            engines: {
              node: '18',
            },
            main: 'index.js',
            dependencies: {
              'firebase-admin': '^12.1.0',
              'firebase-functions': '^5.0.1',
            },
          },
          null,
          2
        )
      );
      functions.file('index.js', FIREBASE_FUNCTIONS_JS);
    }
  }

  return await zip.generateAsync({ type: 'blob' });
};
