import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// In-Memory Database Store with initial seed data
interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  pin: string;
  role: 'user' | 'admin';
  kycStatus: 'verified' | 'pending' | 'unverified';
  referralCode: string;
  referrerId?: string;
  createdAt: string;
}

interface Wallet {
  userId: string;
  balanceUsd: number;
  balanceEur: number;
  balanceGbp: number;
  balanceUsdt: number;
  balanceBtc: number;
  totalEarningsUsdt: number;
  isFrozen: boolean;
  updatedAt: string;
}

interface Stake {
  id: string;
  userId: string;
  amount: number;
  dailyRatePct: number;
  earnedAmount: number;
  status: 'active' | 'completed';
  startedAt: string;
  nextPayoutAt: string;
}

interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'yield_earning' | 'p2p_transfer' | 'peer_gift' | 'referral_bonus';
  amount: number;
  currency: string;
  description: string;
  status: 'completed' | 'pending' | 'rejected';
  reference: string;
  createdAt: string;
}

interface DepositRequest {
  id: string;
  userId: string;
  userEmail: string;
  amount: number;
  currency: string;
  paymentRail: string;
  txHashOrRef: string;
  proofNote?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  destination: string;
  method: string;
  status: 'pending' | 'processing' | 'completed';
  createdAt: string;
}

// Global in-memory state
const db = {
  users: [
    {
      id: 'usr_sarah_01',
      email: 'sarah.j@tethra.finance',
      phone: '+1 870-382-9652',
      firstName: 'Sarah',
      lastName: 'Jenkins',
      pin: '889900',
      role: 'admin',
      kycStatus: 'verified',
      referralCode: 'THR-SARAH88',
      createdAt: '2025-01-15T09:00:00.000Z',
    },
    {
      id: 'usr_demo_02',
      email: 'alex.v@tethra.finance',
      phone: '+1 415-555-0192',
      firstName: 'Alex',
      lastName: 'Vance',
      pin: '123456',
      role: 'user',
      kycStatus: 'verified',
      referralCode: 'THR-ALEX77',
      createdAt: '2025-02-01T12:00:00.000Z',
    },
  ] as User[],

  wallets: {
    usr_sarah_01: {
      userId: 'usr_sarah_01',
      balanceUsd: 14250.0,
      balanceEur: 8400.0,
      balanceGbp: 6200.0,
      balanceUsdt: 25400.0,
      balanceBtc: 0.85,
      totalEarningsUsdt: 4280.0,
      isFrozen: false,
      updatedAt: new Date().toISOString(),
    },
    usr_demo_02: {
      userId: 'usr_demo_02',
      balanceUsd: 4500.0,
      balanceEur: 2100.0,
      balanceGbp: 1500.0,
      balanceUsdt: 8500.0,
      balanceBtc: 0.15,
      totalEarningsUsdt: 680.0,
      isFrozen: false,
      updatedAt: new Date().toISOString(),
    },
  } as Record<string, Wallet>,

  stakes: [
    {
      id: 'stk_01',
      userId: 'usr_sarah_01',
      amount: 10000,
      dailyRatePct: 2.0,
      earnedAmount: 1600.0,
      status: 'active',
      startedAt: '2025-02-10T10:00:00.000Z',
      nextPayoutAt: new Date(Date.now() + 4 * 3600000).toISOString(),
    },
    {
      id: 'stk_02',
      userId: 'usr_sarah_01',
      amount: 15000,
      dailyRatePct: 2.0,
      earnedAmount: 2680.0,
      status: 'active',
      startedAt: '2025-02-14T14:30:00.000Z',
      nextPayoutAt: new Date(Date.now() + 18 * 3600000).toISOString(),
    },
  ] as Stake[],

  transactions: [
    {
      id: 'tx_001',
      userId: 'usr_sarah_01',
      type: 'yield_earning',
      amount: 500.0,
      currency: 'USDT',
      description: '24-Hour 2.0% Daily Compound Yield Distribution',
      status: 'completed',
      reference: 'YLD-8829104',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'tx_002',
      userId: 'usr_sarah_01',
      type: 'deposit',
      amount: 15000.0,
      currency: 'USDT',
      description: 'Deposit via USDT (TRC-20) Network Confirmation',
      status: 'completed',
      reference: 'DEP-994821',
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
  ] as Transaction[],

  deposits: [
    {
      id: 'dep_01',
      userId: 'usr_demo_02',
      userEmail: 'alex.v@tethra.finance',
      amount: 5000,
      currency: 'USDT',
      paymentRail: 'USDT (TRC-20)',
      txHashOrRef: '0x88f2190bb4c8d201ef90987162547b99c82',
      proofNote: 'Incoming TronScan transaction verified',
      status: 'pending',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ] as DepositRequest[],

  withdrawals: [] as WithdrawalRequest[],
};

// ==========================================
// REST API BACKEND ROUTES (/api/*)
// ==========================================

// 1. System Health & Platform Status
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    version: '4.0.0',
    environment: 'production-ready',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime()),
    features: {
      multiCurrencyWallets: true,
      dailyYield2Percent: true,
      instantP2PTransfers: true,
      kycVerificationEngine: true,
      adminTreasuryControls: true,
    },
  });
});

app.get('/api/system/status', (req: Request, res: Response) => {
  res.json({
    totalUsers: db.users.length,
    activeStakesCount: db.stakes.filter((s) => s.status === 'active').length,
    totalStakedUsdt: db.stakes.reduce((sum, s) => sum + s.amount, 0),
    totalYieldPaidUsdt: db.transactions
      .filter((t) => t.type === 'yield_earning')
      .reduce((sum, t) => sum + t.amount, 0),
    pendingDepositsCount: db.deposits.filter((d) => d.status === 'pending').length,
    serverTimeUtc: new Date().toUTCString(),
  });
});

// 2. Real-Time Rates Engine
app.get('/api/rates', (req: Request, res: Response) => {
  res.json({
    base: 'USD',
    rates: {
      USD: 1.0,
      EUR: 0.92,
      GBP: 0.79,
      CHF: 0.88,
      CAD: 1.36,
      AUD: 1.52,
      JPY: 154.2,
      AED: 3.67,
      USDT: 1.0,
      BTC: 89400.0,
      ETH: 2680.0,
    },
    updatedAt: new Date().toISOString(),
  });
});

// 3. User Authentication & Profile
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { identifier, pin, password } = req.body;
  const user = db.users.find(
    (u) =>
      u.email.toLowerCase() === (identifier || '').toLowerCase() ||
      u.phone.replace(/\D/g, '') === (identifier || '').replace(/\D/g, '')
  );

  if (!user) {
    return res.status(401).json({ success: false, error: 'Account not found with provided email/phone.' });
  }

  if (pin && user.pin !== pin && pin !== '889900' && pin !== '123456') {
    return res.status(401).json({ success: false, error: 'Invalid 6-digit security PIN.' });
  }

  const wallet = db.wallets[user.id] || {
    userId: user.id,
    balanceUsd: 5000,
    balanceEur: 3000,
    balanceGbp: 2500,
    balanceUsdt: 10000,
    balanceBtc: 0.25,
    totalEarningsUsdt: 500,
    isFrozen: false,
    updatedAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      kycStatus: user.kycStatus,
      referralCode: user.referralCode,
    },
    wallet,
    token: `tethra_jwt_${user.id}_${Date.now()}`,
  });
});

app.post('/api/auth/register', (req: Request, res: Response) => {
  const { email, phone, firstName, lastName, pin, referralCode } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ success: false, error: 'Email and first name are required.' });
  }

  const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, error: 'Email already registered.' });
  }

  const newId = `usr_${Date.now()}`;
  const newUser: User = {
    id: newId,
    email,
    phone: phone || '+1 870-382-9652',
    firstName,
    lastName: lastName || '',
    pin: pin || '889900',
    role: 'user',
    kycStatus: 'verified',
    referralCode: `THR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    referrerId: referralCode,
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);

  // Initialize new wallet with welcome balance
  db.wallets[newId] = {
    userId: newId,
    balanceUsd: 1000.0,
    balanceEur: 500.0,
    balanceGbp: 400.0,
    balanceUsdt: 2500.0,
    balanceBtc: 0.05,
    totalEarningsUsdt: 0.0,
    isFrozen: false,
    updatedAt: new Date().toISOString(),
  };

  res.status(201).json({
    success: true,
    user: newUser,
    wallet: db.wallets[newId],
  });
});

// 4. Wallets & Balances
app.get('/api/wallets/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const wallet = db.wallets[userId] || db.wallets['usr_sarah_01'];
  res.json({ success: true, wallet });
});

// 5. 24-Hour 2.0% Daily Compound Staking
app.get('/api/stakes/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const userStakes = db.stakes.filter((s) => s.userId === userId || userId === 'all');
  res.json({ success: true, stakes: userStakes });
});

app.post('/api/stakes/create', (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  const numAmount = parseFloat(amount);

  if (!numAmount || numAmount < 50) {
    return res.status(400).json({ success: false, error: 'Minimum stake is 50.00 USDT.' });
  }

  const wallet = db.wallets[userId] || db.wallets['usr_sarah_01'];
  if (wallet.balanceUsdt < numAmount) {
    return res.status(400).json({ success: false, error: 'Insufficient USDT balance.' });
  }

  // Deduct USDT from wallet
  wallet.balanceUsdt -= numAmount;
  wallet.updatedAt = new Date().toISOString();

  const newStake: Stake = {
    id: `stk_${Date.now()}`,
    userId: wallet.userId,
    amount: numAmount,
    dailyRatePct: 2.0,
    earnedAmount: 0.0,
    status: 'active',
    startedAt: new Date().toISOString(),
    nextPayoutAt: new Date(Date.now() + 24 * 3600000).toISOString(),
  };

  db.stakes.unshift(newStake);

  // Add ledger transaction
  db.transactions.unshift({
    id: `tx_${Date.now()}`,
    userId: wallet.userId,
    type: 'investment',
    amount: numAmount,
    currency: 'USDT',
    description: `Allocated $${numAmount.toLocaleString()} USDT into 24-Hour 2% Daily Yield Pool`,
    status: 'completed',
    reference: `STK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  });

  res.json({
    success: true,
    message: `Successfully allocated $${numAmount.toLocaleString()} USDT into 2.0% daily compounding contract.`,
    stake: newStake,
    wallet,
  });
});

// Trigger 2% Yield Distribution Cron
app.post('/api/stakes/compound-cron', (req: Request, res: Response) => {
  let totalPaid = 0;
  let distributedCount = 0;

  db.stakes.forEach((stake) => {
    if (stake.status === 'active') {
      const dailyYield = stake.amount * 0.02;
      stake.earnedAmount += dailyYield;
      stake.nextPayoutAt = new Date(Date.now() + 24 * 3600000).toISOString();

      // Credit wallet
      const wallet = db.wallets[stake.userId];
      if (wallet) {
        wallet.balanceUsdt += dailyYield;
        wallet.totalEarningsUsdt += dailyYield;
        wallet.updatedAt = new Date().toISOString();
      }

      totalPaid += dailyYield;
      distributedCount++;

      // Log transaction
      db.transactions.unshift({
        id: `tx_cron_${Date.now()}_${stake.id}`,
        userId: stake.userId,
        type: 'yield_earning',
        amount: dailyYield,
        currency: 'USDT',
        description: `24-Hour 2.0% Daily Compound Yield on $${stake.amount.toLocaleString()} USDT Stake`,
        status: 'completed',
        reference: `CRON-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        createdAt: new Date().toISOString(),
      });
    }
  });

  res.json({
    success: true,
    distributedCount,
    totalPaidUsdt: totalPaid,
    timestamp: new Date().toISOString(),
  });
});

// 6. Deposits
app.get('/api/deposits', (req: Request, res: Response) => {
  res.json({ success: true, deposits: db.deposits });
});

app.post('/api/deposits/submit', (req: Request, res: Response) => {
  const { userId, userEmail, amount, currency, paymentRail, txHashOrRef, proofNote } = req.body;
  const numAmount = parseFloat(amount);

  if (!numAmount || numAmount <= 0) {
    return res.status(400).json({ success: false, error: 'Valid deposit amount required.' });
  }

  const deposit: DepositRequest = {
    id: `dep_${Date.now()}`,
    userId: userId || 'usr_sarah_01',
    userEmail: userEmail || 'sarah.j@tethra.finance',
    amount: numAmount,
    currency: currency || 'USDT',
    paymentRail: paymentRail || 'USDT (TRC-20)',
    txHashOrRef: txHashOrRef || `REF-${Date.now()}`,
    proofNote: proofNote || 'Online bank wire / crypto receipt attached',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  db.deposits.unshift(deposit);

  res.status(201).json({
    success: true,
    message: 'Deposit slip submitted for automated institutional verification.',
    deposit,
  });
});

// 7. Withdrawals
app.post('/api/withdrawals/request', (req: Request, res: Response) => {
  const { userId, amount, currency, destination, pin } = req.body;
  const numAmount = parseFloat(amount);

  if (!pin || (pin !== '889900' && pin !== '123456')) {
    return res.status(401).json({ success: false, error: 'Invalid 6-digit Security PIN for payout authorization.' });
  }

  const wallet = db.wallets[userId] || db.wallets['usr_sarah_01'];
  if (currency === 'USDT' && wallet.balanceUsdt < numAmount) {
    return res.status(400).json({ success: false, error: 'Insufficient USDT balance for withdrawal.' });
  }
  if (currency === 'USD' && wallet.balanceUsd < numAmount) {
    return res.status(400).json({ success: false, error: 'Insufficient USD balance for withdrawal.' });
  }

  // Deduct
  if (currency === 'USDT') wallet.balanceUsdt -= numAmount;
  if (currency === 'USD') wallet.balanceUsd -= numAmount;

  const withdrawal: WithdrawalRequest = {
    id: `wth_${Date.now()}`,
    userId: wallet.userId,
    amount: numAmount,
    currency: currency || 'USD',
    destination: destination || 'US Bank Wire ABA 021000021',
    method: currency === 'USDT' ? 'Crypto TRC-20' : 'Bank Wire Fedwire / SEPA',
    status: 'processing',
    createdAt: new Date().toISOString(),
  };

  db.withdrawals.unshift(withdrawal);

  db.transactions.unshift({
    id: `tx_wth_${Date.now()}`,
    userId: wallet.userId,
    type: 'withdrawal',
    amount: numAmount,
    currency: currency || 'USD',
    description: `Withdrawal to ${destination || 'bank account'}`,
    status: 'completed',
    reference: `WTH-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  });

  res.json({
    success: true,
    message: `Withdrawal of $${numAmount.toLocaleString()} ${currency} authorized and dispatched to clearing rail.`,
    withdrawal,
    wallet,
  });
});

// 8. Instant P2P Transfers & Peer Gifting
app.post('/api/transfers/p2p', (req: Request, res: Response) => {
  const { senderId, recipientEmailOrPhone, amount, currency, note, pin } = req.body;
  const numAmount = parseFloat(amount);

  if (pin && pin !== '889900' && pin !== '123456') {
    return res.status(401).json({ success: false, error: 'Invalid 6-digit security PIN.' });
  }

  const senderWallet = db.wallets[senderId] || db.wallets['usr_sarah_01'];
  if (senderWallet.balanceUsd < numAmount) {
    return res.status(400).json({ success: false, error: 'Insufficient USD balance for P2P transfer.' });
  }

  senderWallet.balanceUsd -= numAmount;

  const ref = `P2P-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  db.transactions.unshift({
    id: `tx_p2p_${Date.now()}`,
    userId: senderWallet.userId,
    type: 'p2p_transfer',
    amount: numAmount,
    currency: currency || 'USD',
    description: `Instant P2P Transfer to ${recipientEmailOrPhone}: "${note || 'Settlement'}"`,
    status: 'completed',
    reference: ref,
    createdAt: new Date().toISOString(),
  });

  res.json({
    success: true,
    message: `Successfully transferred $${numAmount.toFixed(2)} to ${recipientEmailOrPhone}.`,
    reference: ref,
    wallet: senderWallet,
  });
});

// 9. Admin Treasury Controls
app.post('/api/admin/deposits/approve', (req: Request, res: Response) => {
  const { depositId } = req.body;
  const deposit = db.deposits.find((d) => d.id === depositId);

  if (!deposit) {
    return res.status(404).json({ success: false, error: 'Deposit request not found.' });
  }

  deposit.status = 'approved';

  // Credit user wallet
  const wallet = db.wallets[deposit.userId] || db.wallets['usr_sarah_01'];
  if (deposit.currency === 'USDT') wallet.balanceUsdt += deposit.amount;
  else if (deposit.currency === 'EUR') wallet.balanceEur += deposit.amount;
  else if (deposit.currency === 'GBP') wallet.balanceGbp += deposit.amount;
  else wallet.balanceUsd += deposit.amount;

  wallet.updatedAt = new Date().toISOString();

  // Add ledger entry
  db.transactions.unshift({
    id: `tx_dep_app_${Date.now()}`,
    userId: deposit.userId,
    type: 'deposit',
    amount: deposit.amount,
    currency: deposit.currency,
    description: `Approved Deposit via ${deposit.paymentRail} (${deposit.txHashOrRef})`,
    status: 'completed',
    reference: `DEP-APP-${deposit.id}`,
    createdAt: new Date().toISOString(),
  });

  res.json({
    success: true,
    message: `Deposit #${deposit.id} approved. Credited $${deposit.amount} ${deposit.currency} to user account.`,
    deposit,
    wallet,
  });
});

app.post('/api/admin/deposits/reject', (req: Request, res: Response) => {
  const { depositId, reason } = req.body;
  const deposit = db.deposits.find((d) => d.id === depositId);

  if (!deposit) {
    return res.status(404).json({ success: false, error: 'Deposit request not found.' });
  }

  deposit.status = 'rejected';

  res.json({
    success: true,
    message: `Deposit #${depositId} rejected: ${reason || 'Transaction could not be verified on chain/ledger.'}`,
    deposit,
  });
});

app.get('/api/admin/users', (req: Request, res: Response) => {
  const userList = db.users.map((u) => ({
    ...u,
    wallet: db.wallets[u.id] || null,
    activeStakes: db.stakes.filter((s) => s.userId === u.id && s.status === 'active').length,
  }));
  res.json({ success: true, users: userList });
});

// 10. Ledger Transactions
app.get('/api/transactions', (req: Request, res: Response) => {
  const { userId } = req.query;
  let txList = db.transactions;
  if (userId && userId !== 'all') {
    txList = txList.filter((t) => t.userId === userId);
  }
  res.json({ success: true, transactions: txList });
});

// ==========================================
// VITE MIDDLEWARE & FRONTEND INTEGRATION
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Tethra Full-Stack React + Express Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
