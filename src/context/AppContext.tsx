import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  FinancialAccount,
  Transaction,
  DepositRequest,
  WithdrawalRequest,
  SavingsGoal,
  PersonalExpense,
  SharedGroup,
  GroupExpenseItem,
  CryptoAsset,
  CryptoHolding,
  ReferralRecord,
  UserConnection,
  PlatformActivity,
  AppNotification,
  SupportTicket,
  KYCSubmission,
  AuditLog,
  SystemConfig,
  SettlementDebt,
  UserGift,
} from '../types';
import {
  INITIAL_CONFIG,
  INITIAL_USERS,
  INITIAL_ACCOUNTS,
  INITIAL_TRANSACTIONS,
  INITIAL_SAVINGS_GOALS,
  INITIAL_PERSONAL_EXPENSES,
  INITIAL_GROUPS,
  INITIAL_GROUP_EXPENSES,
  INITIAL_CRYPTO_ASSETS,
  INITIAL_CRYPTO_HOLDINGS,
  INITIAL_REFERRALS,
  INITIAL_CONNECTIONS,
  INITIAL_PLATFORM_ACTIVITIES,
  INITIAL_NOTIFICATIONS,
  INITIAL_SUPPORT_TICKETS,
  INITIAL_KYC_SUBMISSION,
  INITIAL_AUDIT_LOGS,
  INITIAL_GIFTS,
  GIFT_PRESETS,
  CURRENCY_RATES,
} from '../data/initialData';

interface AppContextType {
  // Navigation & Routing
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  publicSubPage: string;
  setPublicSubPage: (page: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Authentication & Profile
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  users: User[];
  login: (emailOrUsername: string, pass: string) => boolean;
  register: (userData: Partial<User>) => User | null;
  checkAvailability: (type: 'email' | 'username' | 'phone', value: string) => { available: boolean; error?: string };
  logout: () => void;
  switchUser: (userId: string) => void;
  updateProfile: (updates: Partial<User>) => void;
  toggle2FA: () => void;

  // System Configuration & Demo Mode
  config: SystemConfig;
  updateConfig: (newConfig: Partial<SystemConfig>) => void;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  formatMoney: (amountInUSD: number, customCurrency?: string) => string;
  convertFromUSD: (amountInUSD: number, targetCurrency?: string) => number;
  convertToUSD: (amountInCurrency: number, sourceCurrency: string) => number;

  // Financial Accounts
  accounts: FinancialAccount[];
  createAccount: (name: string, type: FinancialAccount['type'], initialDeposit: number) => FinancialAccount;
  transferFunds: (fromAccountId: string, toAccountId: string, amount: number, description: string) => boolean;
  transferInternal: (fromAccountId: string, toAccountId: string, amount: number | string, description?: string) => boolean;
  sendP2PFunds: (toUsernameOrId: string, amount: number, note?: string, sourceAccountId?: string) => boolean;

  // Gifts System
  gifts: UserGift[];
  giftPresets: typeof GIFT_PRESETS;
  sendGift: (toUserId: string, giftPresetId: string, customMessage?: string, sourceAccountId?: string) => boolean;

  // 24-Hour 2% Daily Bonus Claim System
  lastBonusClaimDate: string | null;
  canClaimDailyBonus: boolean;
  timeUntilNextBonus: string;
  claimDailyBonus: () => boolean;

  // Transactions & Ledger
  transactions: Transaction[];
  exportTransactionsCSV: () => void;

  // Deposits & Withdrawals
  deposits: DepositRequest[];
  withdrawals: WithdrawalRequest[];
  requestDeposit: (accountId: string, method: DepositRequest['method'], amount: number, details: any) => DepositRequest;
  requestWithdrawal: (accountId: string, method: WithdrawalRequest['method'], amount: number, destinationDetails: any) => WithdrawalRequest;
  adminApproveDeposit: (depositId: string) => void;
  adminApproveWithdrawal: (withdrawalId: string) => void;
  adminRejectWithdrawal: (withdrawalId: string, reason: string) => void;
  adminApproveAllPendingWithdrawals: () => void;
  approveWithdrawal: (withdrawalId: string) => void;
  rejectWithdrawal: (withdrawalId: string, reason?: string) => void;

  // Admin Financial Management & User Balances (Full Control)
  adminAddFunds: (userId: string, accountId: string, amount: number, category?: string, notes?: string) => boolean;
  adminDeductFunds: (userId: string, accountId: string, amount: number, category?: string, notes?: string) => boolean;
  adminSetAccountBalance: (userId: string, accountId: string, newBalance: number, notes?: string) => boolean;
  adminApproveBonus: (referralId: string) => void;
  adminRejectBonus: (referralId: string, reason: string) => void;
  adminIssueCustomBonus: (userId: string, amount: number, bonusType: string, reason: string) => void;
  adminBatchApproveBonuses: () => void;
  adminDistributeDailyBonusToAllUsers: (percentage?: number) => { totalUsersRewarded: number; totalDistributedUSD: number };
  adminToggleAccountStatus: (accountId: string) => void;
  adminUpdateUserKYC: (userId: string, status: 'not_started' | 'pending' | 'verified' | 'rejected') => void;
  adminDeleteUser: (userId: string) => void;

  // Savings Goals
  savingsGoals: SavingsGoal[];
  createSavingsGoal: (name: string, category: SavingsGoal['category'] | string, targetAmount?: number, targetDate?: string, monthlyContribution?: number) => void;
  contributeToGoal: (goalId: string, fromAccountId: string, amount: number) => boolean;
  withdrawFromGoal: (goalId: string, toAccountId: string, amount: number) => boolean;

  // Expenses & Shared Groups
  personalExpenses: PersonalExpense[];
  expenses: PersonalExpense[];
  addPersonalExpense: (expense: Omit<PersonalExpense, 'id' | 'userId' | 'createdAt'>) => void;
  addExpense: (expense: any) => void;
  sharedGroups: SharedGroup[];
  groupExpenses: GroupExpenseItem[];
  createSharedGroup: (name: string, type: SharedGroup['type'] | string, memberIds: string[]) => void;
  addGroupExpense: (groupId: string, title: string, amount: number, splitBetweenUserIds: string[], category: string) => void;
  calculateGroupSettlements: (groupId: string) => SettlementDebt[];

  // Earnings
  earnings: { today: number; thisWeek: number; thisMonth: number; totalEarned: number };

  // Crypto Market & Portfolio
  cryptoAssets: CryptoAsset[];
  cryptoHoldings: CryptoHolding[];
  addCryptoHolding: (symbol: string, quantity: number, avgBuyPrice: number) => void;

  // Referrals
  referrals: ReferralRecord[];

  // Connections & Community
  connections: UserConnection[];
  platformActivities: PlatformActivity[];
  platformFeed: PlatformActivity[];
  sendConnectionRequest: (targetUserId: string) => void;
  acceptConnectionRequest: (connectionId: string) => void;
  removeConnection: (connectionId: string) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Support Tickets
  supportTickets: SupportTicket[];
  createSupportTicket: (subject: string, category: SupportTicket['category'] | string, priorityOrMessage: any, message?: string) => void;
  replySupportTicket: (ticketId: string, message: string) => void;
  addTicketReply: (ticketId: string, message: string) => void;

  // KYC
  kycSubmissions: KYCSubmission[];
  submitKYC: (data: Partial<KYCSubmission>) => void;
  adminApproveKYC: (submissionId: string) => void;
  adminRejectKYC: (submissionId: string, reason: string) => void;
  approveKYC: (submissionId: string) => void;
  rejectKYC: (submissionId: string, reason?: string) => void;

  // Audit Logs
  auditLogs: AuditLog[];
  addAuditLog: (action: string, category: AuditLog['category'], details: string) => void;

  // State Resets & Utilities
  resetAllDemoData: () => void;
  triggerCelebration: () => void;
  activeToast: { title: string; message: string; type: 'success' | 'info' | 'warning' | 'error' } | null;
  showToast: (
    titleOrObj: string | { title: string; message: string; type?: 'success' | 'info' | 'warning' | 'error' },
    message?: string,
    type?: 'success' | 'info' | 'warning' | 'error'
  ) => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'tethra_fintech_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [publicSubPage, setPublicSubPage] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  // State Entities
  const [config, setConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_config`);
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_users`);
    let parsed: User[] = saved ? JSON.parse(saved) : INITIAL_USERS;
    if (!parsed || parsed.length === 0 || !parsed.some((u) => u.role === 'admin')) {
      parsed = INITIAL_USERS;
    }
    return parsed;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedId = localStorage.getItem(`${STORAGE_KEY}_current_user_id`);
    if (savedId) {
      const found = users.find((u) => u.id === savedId);
      if (found) return found;
    }
    return users.find((u) => u.role === 'admin') || users[0] || INITIAL_USERS[0];
  });

  const [accounts, setAccounts] = useState<FinancialAccount[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_accounts`);
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_transactions`);
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [deposits, setDeposits] = useState<DepositRequest[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_deposits`);
    return saved ? JSON.parse(saved) : [];
  });

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_withdrawals`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'wd_init_01',
        referenceNumber: 'THR-WD-000102',
        userId: 'usr_001',
        accountId: 'acc_01',
        method: 'us_bank_transfer',
        amount: 750.0,
        currency: 'USD',
        fee: 3.75,
        netAmount: 746.25,
        destinationDetails: {
          bankName: 'JPMorgan Chase Bank, N.A.',
          accountHolder: 'Alexander Vance',
          accountNumber: '****4821',
          routingNumber: '021000021',
        },
        status: 'completed',
        estimatedCompletion: '1-3 Business Days',
        createdAt: '2026-02-26T14:30:00Z',
        processedAt: '2026-02-28T09:00:00Z',
      },
    ];
  });

  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_savings`);
    return saved ? JSON.parse(saved) : INITIAL_SAVINGS_GOALS;
  });

  const [personalExpenses, setPersonalExpenses] = useState<PersonalExpense[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_expenses`);
    return saved ? JSON.parse(saved) : INITIAL_PERSONAL_EXPENSES;
  });

  const [sharedGroups, setSharedGroups] = useState<SharedGroup[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_groups`);
    return saved ? JSON.parse(saved) : INITIAL_GROUPS;
  });

  const [groupExpenses, setGroupExpenses] = useState<GroupExpenseItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_group_expenses`);
    return saved ? JSON.parse(saved) : INITIAL_GROUP_EXPENSES;
  });

  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_crypto_assets`);
    return saved ? JSON.parse(saved) : INITIAL_CRYPTO_ASSETS;
  });

  const [cryptoHoldings, setCryptoHoldings] = useState<CryptoHolding[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_crypto_holdings`);
    return saved ? JSON.parse(saved) : INITIAL_CRYPTO_HOLDINGS;
  });

  const [referrals, setReferrals] = useState<ReferralRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_referrals`);
    return saved ? JSON.parse(saved) : INITIAL_REFERRALS;
  });

  const [connections, setConnections] = useState<UserConnection[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_connections`);
    return saved ? JSON.parse(saved) : INITIAL_CONNECTIONS;
  });

  const [platformActivities, setPlatformActivities] = useState<PlatformActivity[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_activities`);
    return saved ? JSON.parse(saved) : INITIAL_PLATFORM_ACTIVITIES;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_support`);
    return saved ? JSON.parse(saved) : INITIAL_SUPPORT_TICKETS;
  });

  const [kycSubmissions, setKycSubmissions] = useState<KYCSubmission[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_kyc`);
    return saved ? JSON.parse(saved) : [INITIAL_KYC_SUBMISSION];
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_audit`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [gifts, setGifts] = useState<UserGift[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_gifts`);
    return saved ? JSON.parse(saved) : INITIAL_GIFTS;
  });

  const [lastBonusClaimDate, setLastBonusClaimDate] = useState<string | null>(() => {
    return localStorage.getItem(`${STORAGE_KEY}_last_bonus_claim_${currentUser?.id || 'guest'}`);
  });

  const [activeToast, setActiveToast] = useState<{
    title: string;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
  } | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_config`, JSON.stringify(config));
      localStorage.setItem(`${STORAGE_KEY}_users`, JSON.stringify(users));
      if (currentUser) {
        localStorage.setItem(`${STORAGE_KEY}_current_user_id`, currentUser.id);
      }
      localStorage.setItem(`${STORAGE_KEY}_accounts`, JSON.stringify(accounts));
      localStorage.setItem(`${STORAGE_KEY}_transactions`, JSON.stringify(transactions));
      localStorage.setItem(`${STORAGE_KEY}_deposits`, JSON.stringify(deposits));
      localStorage.setItem(`${STORAGE_KEY}_withdrawals`, JSON.stringify(withdrawals));
      localStorage.setItem(`${STORAGE_KEY}_savings`, JSON.stringify(savingsGoals));
      localStorage.setItem(`${STORAGE_KEY}_expenses`, JSON.stringify(personalExpenses));
      localStorage.setItem(`${STORAGE_KEY}_groups`, JSON.stringify(sharedGroups));
      localStorage.setItem(`${STORAGE_KEY}_group_expenses`, JSON.stringify(groupExpenses));
      localStorage.setItem(`${STORAGE_KEY}_crypto_assets`, JSON.stringify(cryptoAssets));
      localStorage.setItem(`${STORAGE_KEY}_crypto_holdings`, JSON.stringify(cryptoHoldings));
      localStorage.setItem(`${STORAGE_KEY}_referrals`, JSON.stringify(referrals));
      localStorage.setItem(`${STORAGE_KEY}_connections`, JSON.stringify(connections));
      localStorage.setItem(`${STORAGE_KEY}_activities`, JSON.stringify(platformActivities));
      localStorage.setItem(`${STORAGE_KEY}_notifications`, JSON.stringify(notifications));
      localStorage.setItem(`${STORAGE_KEY}_support`, JSON.stringify(supportTickets));
      localStorage.setItem(`${STORAGE_KEY}_kyc`, JSON.stringify(kycSubmissions));
      localStorage.setItem(`${STORAGE_KEY}_audit`, JSON.stringify(auditLogs));
      localStorage.setItem(`${STORAGE_KEY}_gifts`, JSON.stringify(gifts));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [
    config,
    users,
    currentUser,
    accounts,
    transactions,
    deposits,
    withdrawals,
    savingsGoals,
    personalExpenses,
    sharedGroups,
    groupExpenses,
    cryptoAssets,
    cryptoHoldings,
    referrals,
    connections,
    platformActivities,
    notifications,
    supportTickets,
    kycSubmissions,
    auditLogs,
    gifts,
  ]);

  // Live Crypto Price Jitter (Simulating real-time WebSocket tick updates without breaking state)
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoAssets((prev) =>
        prev.map((asset) => {
          if (asset.symbol === 'USDT') return asset;
          const deltaPct = (Math.random() - 0.49) * 0.4; // subtle jitter
          const newPrice = Number((asset.price * (1 + deltaPct / 100)).toFixed(2));
          const newChange = Number((asset.change24h + (deltaPct > 0 ? 0.05 : -0.05)).toFixed(2));
          const updatedSpark = [...asset.sparkline.slice(1), newPrice];
          return {
            ...asset,
            price: newPrice,
            change24h: newChange,
            sparkline: updatedSpark,
          };
        })
      );
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (
    titleOrObj: string | { title: string; message: string; type?: 'success' | 'info' | 'warning' | 'error' },
    message?: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    let toastTitle = '';
    let toastMsg = '';
    let toastType: 'success' | 'info' | 'warning' | 'error' = type;

    if (typeof titleOrObj === 'object' && titleOrObj !== null) {
      toastTitle = titleOrObj.title;
      toastMsg = titleOrObj.message;
      toastType = titleOrObj.type || 'success';
    } else {
      toastTitle = String(titleOrObj || '');
      toastMsg = String(message || '');
    }

    setActiveToast({ title: toastTitle, message: toastMsg, type: toastType });
    setTimeout(() => {
      setActiveToast((curr) => (curr?.title === toastTitle ? null : curr));
    }, 4500);
  };

  const hideToast = () => setActiveToast(null);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f3c64f', '#10b981', '#ffffff'],
      });
    } catch (err) {
      // safe fallback
    }
  };

  const addAuditLog = (action: string, category: AuditLog['category'], details: string) => {
    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      userId: currentUser?.id,
      userName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'System Guest',
      action,
      ipAddress: '198.51.100.' + (Math.floor(Math.random() * 200) + 10),
      userAgent: navigator.userAgent.substring(0, 50),
      details,
      category,
      timestamp: new Date().toISOString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Currency Helpers
  const convertFromUSD = (amountInUSD: number, targetCurrency: string = selectedCurrency): number => {
    const rateInfo = CURRENCY_RATES[targetCurrency] || CURRENCY_RATES.USD;
    return amountInUSD * rateInfo.rateAgainstUSD;
  };

  const convertToUSD = (amountInCurrency: number, sourceCurrency: string): number => {
    const rateInfo = CURRENCY_RATES[sourceCurrency] || CURRENCY_RATES.USD;
    return amountInCurrency / rateInfo.rateAgainstUSD;
  };

  const formatMoney = (amountInUSD: number, customCurrency?: string): string => {
    const cur = customCurrency || selectedCurrency;
    const rateInfo = CURRENCY_RATES[cur] || CURRENCY_RATES.USD;
    const converted = amountInUSD * rateInfo.rateAgainstUSD;
    return `${rateInfo.symbol}${converted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ${cur !== 'USD' ? cur : ''}`.trim();
  };

  // Auth Operations
  const login = (emailOrUsername: string, pass: string): boolean => {
    const clean = (emailOrUsername || '').trim().toLowerCase();
    
    // Check if matching Admin
    let found = users.find(
      (u) =>
        u.email.toLowerCase() === clean ||
        u.username.toLowerCase() === clean ||
        u.uniqueUserId.toLowerCase() === clean ||
        (clean === 'admin' && u.role === 'admin')
    );

    // If not found in current users list, fallback check in INITIAL_USERS
    if (!found) {
      found = INITIAL_USERS.find(
        (u) =>
          u.email.toLowerCase() === clean ||
          u.username.toLowerCase() === clean ||
          u.uniqueUserId.toLowerCase() === clean ||
          (clean === 'admin' && u.role === 'admin')
      );
      if (found) {
        setUsers((prev) => (prev.some((p) => p.id === found!.id) ? prev : [...prev, found!]));
      }
    }

    if (found) {
      setCurrentUser(found);
      addAuditLog('USER_LOGIN_SUCCESS', 'auth', `User ${found.email} authenticated successfully.`);
      showToast('Welcome Back', `Logged in as ${found.firstName} ${found.lastName} (${found.role.toUpperCase()})`);
      setCurrentRoute(found.role === 'admin' ? 'admin-dashboard' : 'dashboard');
      return true;
    }
    showToast('Login Failed', 'Invalid credentials. Use admin / 889900 or register a new client account.', 'error');
    return false;
  };

  const checkAvailability = (type: 'email' | 'username' | 'phone', value: string): { available: boolean; error?: string } => {
    if (!value || !value.trim()) return { available: true };
    const clean = value.trim().toLowerCase();

    if (type === 'email') {
      const exists = users.some((u) => u.email.toLowerCase() === clean);
      return {
        available: !exists,
        error: exists ? 'This email address is already registered. Please sign in or choose another.' : undefined,
      };
    }

    if (type === 'username') {
      const cleanUser = clean.replace(/[^a-z0-9_]/g, '');
      const exists = users.some((u) => u.username.toLowerCase() === cleanUser);
      return {
        available: !exists,
        error: exists ? 'This username is already taken. Please choose a different username.' : undefined,
      };
    }

    if (type === 'phone') {
      const digits = value.replace(/\D/g, '');
      const exists = digits.length >= 7 && users.some((u) => u.phone && u.phone.replace(/\D/g, '') === digits);
      return {
        available: !exists,
        error: exists ? 'This phone number is already linked to another account.' : undefined,
      };
    }

    return { available: true };
  };

  const register = (userData: Partial<User>): User | null => {
    const cleanEmail = (userData.email || '').trim().toLowerCase();
    const cleanUsername = (userData.username || '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    const cleanPhoneDigits = userData.phone ? userData.phone.replace(/\D/g, '') : '';

    // 1. Strict Duplicate Email Check
    if (cleanEmail && users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      showToast('Registration Error', 'This email address is already registered. Please sign in or use another email.', 'error');
      return null;
    }

    // 2. Strict Duplicate Username Check
    if (cleanUsername && users.some((u) => u.username.toLowerCase() === cleanUsername)) {
      showToast('Registration Error', 'This username is already taken. Please choose a different username.', 'error');
      return null;
    }

    // 3. Strict Duplicate Phone Check
    if (cleanPhoneDigits.length >= 7 && users.some((u) => u.phone && u.phone.replace(/\D/g, '') === cleanPhoneDigits)) {
      showToast('Registration Error', 'This phone number is already registered with an existing account.', 'error');
      return null;
    }

    const newIdNum = 100000 + users.length + 1;
    const uniqueUserId = `TETHRA-${newIdNum}`;
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const referralCode = `TETHRA-${randomHex}`;

    const newUser: User = {
      id: `usr_${Date.now()}`,
      uniqueUserId,
      firstName: userData.firstName || 'New',
      lastName: userData.lastName || 'Member',
      username: cleanUsername || `user_${newIdNum}`,
      email: cleanEmail || `user${newIdNum}@tethra.net`,
      phone: userData.phone || '+1 555 000 0000',
      country: userData.country || 'United States',
      city: userData.city || 'New York, NY',
      dateOfBirth: userData.dateOfBirth || '1995-01-01',
      referralCode,
      referredByCode: userData.referredByCode || undefined,
      role: 'user',
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80`,
      privacy: 'public',
      emailVerified: true,
      phoneVerified: false,
      kycStatus: 'not_started',
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      isDemoUser: false,
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);

    // Create Default Accounts for new user strictly with ZERO balance ($0.00)
    const checkingAcc: FinancialAccount = {
      id: `acc_${Date.now()}_1`,
      userId: newUser.id,
      name: 'Primary Checking Account',
      type: 'checking',
      currency: 'USD',
      balance: 0.0,
      accountNumber: `TR-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'active',
      createdAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
    };

    const savingsAcc: FinancialAccount = {
      id: `acc_${Date.now()}_2`,
      userId: newUser.id,
      name: 'High-Yield Savings Vault',
      type: 'savings',
      currency: 'USD',
      balance: 0.0,
      accountNumber: `TR-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'active',
      createdAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
    };

    setAccounts((prev) => [...prev, checkingAcc, savingsAcc]);

    // Track Referral if referred
    if (userData.referredByCode) {
      const referrer = users.find((u) => u.referralCode === userData.referredByCode);
      if (referrer) {
        const newRef: ReferralRecord = {
          id: `ref_${Date.now()}`,
          referrerUserId: referrer.id,
          referredUserId: newUser.id,
          referredName: `${newUser.firstName} ${newUser.lastName}`,
          referredEmail: newUser.email,
          joinedDate: new Date().toISOString().split('T')[0],
          status: 'pending',
          qualificationCriteria: 'Pending KYC and initial deposit',
          rewardAmount: config.referralRewardAmount,
          currency: config.referralRewardCurrency,
        };
        setReferrals((prev) => [newRef, ...prev]);
      }
    }

    addAuditLog('USER_REGISTRATION', 'auth', `New user registered: ${newUser.uniqueUserId} (${newUser.email})`);
    showToast('Welcome to Tethra', 'Account created successfully with $0.00 initial balance.');
    triggerCelebration();
    setCurrentRoute('dashboard');
    return newUser;
  };

  const logout = () => {
    addAuditLog('USER_LOGOUT', 'auth', `User ${currentUser?.email} signed out.`);
    setCurrentUser(null);
    setCurrentRoute('home');
    showToast('Signed Out', 'You have been safely signed out.');
  };

  const switchUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setCurrentUser(target);
      showToast('Switched Profile', `Now previewing as ${target.firstName} ${target.lastName} (${target.role.toUpperCase()})`);
      if (target.role === 'admin') {
        setCurrentRoute('admin-dashboard');
      }
    }
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    addAuditLog('PROFILE_UPDATED', 'auth', `User updated profile settings.`);
    showToast('Profile Updated', 'Your profile information has been saved.');
  };

  const toggle2FA = () => {
    if (!currentUser) return;
    const nextState = !currentUser.twoFactorEnabled;
    updateProfile({ twoFactorEnabled: nextState });
    showToast(
      nextState ? '2FA Enabled' : '2FA Disabled',
      nextState ? 'Two-Factor Authentication is now active on your account.' : '2FA has been disabled.'
    );
  };

  // Financial Operations
  const createAccount = (name: string, type: FinancialAccount['type'], initialDeposit: number): FinancialAccount => {
    if (!currentUser) throw new Error('No user logged in');
    const newAcc: FinancialAccount = {
      id: `acc_${Date.now()}`,
      userId: currentUser.id,
      name,
      type,
      currency: 'USD',
      balance: initialDeposit,
      accountNumber: `TR-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'active',
      createdAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
    };

    setAccounts((prev) => [...prev, newAcc]);

    if (initialDeposit > 0) {
      const initialTx: Transaction = {
        id: `tx_${Date.now()}`,
        referenceNumber: `THR-TX-${Math.floor(100000 + Math.random() * 900000)}`,
        userId: currentUser.id,
        accountId: newAcc.id,
        accountName: newAcc.name,
        type: 'deposit',
        amount: initialDeposit,
        currency: 'USD',
        fee: 0,
        description: `Initial Opening Deposit for ${name}`,
        status: 'completed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTransactions((prev) => [initialTx, ...prev]);
    }

    addAuditLog('ACCOUNT_CREATED', 'financial', `Created new ${type} account: "${name}" with initial $${initialDeposit}`);
    showToast('Account Created', `"${name}" is ready for transactions.`);
    return newAcc;
  };

  const transferFunds = (fromAccountId: string, toAccountId: string, amount: number, description: string): boolean => {
    if (!currentUser) return false;
    const fromAcc = accounts.find((a) => a.id === fromAccountId);
    const toAcc = accounts.find((a) => a.id === toAccountId);

    if (!fromAcc || !toAcc) {
      showToast('Transfer Failed', 'Selected account not found.', 'error');
      return false;
    }

    if (fromAcc.balance < amount) {
      showToast('Insufficient Balance', `Available balance: ${formatMoney(fromAcc.balance)}`, 'error');
      return false;
    }

    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === fromAccountId) {
          return { ...acc, balance: acc.balance - amount, lastActivityAt: new Date().toISOString() };
        }
        if (acc.id === toAccountId) {
          return { ...acc, balance: acc.balance + amount, lastActivityAt: new Date().toISOString() };
        }
        return acc;
      })
    );

    const refNum = `THR-TX-${Math.floor(100000 + Math.random() * 900000)}`;
    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      referenceNumber: refNum,
      userId: currentUser.id,
      accountId: fromAccountId,
      accountName: fromAcc.name,
      type: 'transfer',
      amount: amount,
      currency: 'USD',
      fee: 0,
      description: description || `Transfer to ${toAcc.name}`,
      status: 'completed',
      recipientAccount: toAcc.name,
      senderAccount: fromAcc.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTransactions((prev) => [tx, ...prev]);
    addAuditLog('FUNDS_TRANSFERRED', 'financial', `Transferred $${amount} from ${fromAcc.name} to ${toAcc.name} (Ref: ${refNum})`);
    showToast('Transfer Successful', `Transferred ${formatMoney(amount)} to ${toAcc.name}`);
    return true;
  };

  // P2P Money Transfer (User to User)
  const sendP2PFunds = (toUsernameOrId: string, amount: number, note: string = '', sourceAccountId?: string): boolean => {
    if (!currentUser) return false;
    if (amount <= 0) {
      showToast('Invalid Amount', 'Transfer amount must be greater than 0.', 'error');
      return false;
    }

    const cleanQuery = toUsernameOrId.trim().toLowerCase();
    const recipient = users.find(
      (u) =>
        u.id.toLowerCase() === cleanQuery ||
        u.username.toLowerCase() === cleanQuery ||
        u.email.toLowerCase() === cleanQuery ||
        u.uniqueUserId.toLowerCase() === cleanQuery
    );

    if (!recipient) {
      showToast('Recipient Not Found', 'Could not locate any member with that username or ID.', 'error');
      return false;
    }

    if (recipient.id === currentUser.id) {
      showToast('Invalid Transfer', 'Cannot perform peer-to-peer transfer to your own account. Use internal transfer instead.', 'warning');
      return false;
    }

    // Find sender source account
    const senderAccount = sourceAccountId
      ? accounts.find((a) => a.id === sourceAccountId && a.userId === currentUser.id)
      : accounts.find((a) => a.userId === currentUser.id && a.type === 'checking') ||
        accounts.find((a) => a.userId === currentUser.id && a.balance >= amount);

    if (!senderAccount) {
      showToast('Account Not Found', 'No active sender account found.', 'error');
      return false;
    }

    if (senderAccount.balance < amount) {
      showToast('Insufficient Balance', `Available balance: ${formatMoney(senderAccount.balance)}. Needed: ${formatMoney(amount)}`, 'error');
      return false;
    }

    // Find recipient target account
    let recipientAccount = accounts.find((a) => a.userId === recipient.id && a.type === 'checking');
    if (!recipientAccount) {
      recipientAccount = accounts.find((a) => a.userId === recipient.id);
    }

    // Debit sender account
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === senderAccount.id) {
          return { ...acc, balance: acc.balance - amount, lastActivityAt: new Date().toISOString() };
        }
        if (recipientAccount && acc.id === recipientAccount.id) {
          return { ...acc, balance: acc.balance + amount, lastActivityAt: new Date().toISOString() };
        }
        return acc;
      })
    );

    const refNum = `THR-P2P-${Math.floor(100000 + Math.random() * 900000)}`;

    // Transaction for sender (Debit)
    const senderTx: Transaction = {
      id: `tx_${Date.now()}_send`,
      referenceNumber: refNum,
      userId: currentUser.id,
      accountId: senderAccount.id,
      accountName: senderAccount.name,
      type: 'p2p_transfer',
      amount: amount,
      currency: 'USD',
      fee: 0,
      description: `Sent P2P to @${recipient.username} (${recipient.firstName} ${recipient.lastName})${note ? ` - "${note}"` : ''}`,
      status: 'completed',
      recipientAccount: `@${recipient.username}`,
      senderAccount: senderAccount.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Transaction for recipient (Credit)
    const recipientTx: Transaction = {
      id: `tx_${Date.now()}_recv`,
      referenceNumber: refNum,
      userId: recipient.id,
      accountId: recipientAccount ? recipientAccount.id : `acc_rec_${recipient.id}`,
      accountName: recipientAccount ? recipientAccount.name : 'Primary Checking',
      type: 'p2p_transfer',
      amount: amount,
      currency: 'USD',
      fee: 0,
      description: `Received P2P from @${currentUser.username} (${currentUser.firstName} ${currentUser.lastName})${note ? ` - "${note}"` : ''}`,
      status: 'completed',
      recipientAccount: recipientAccount ? recipientAccount.name : 'Primary Checking',
      senderAccount: `@${currentUser.username}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTransactions((prev) => [senderTx, recipientTx, ...prev]);

    // Live public activity feed milestone
    const activityItem: PlatformActivity = {
      id: `act_${Date.now()}`,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName.charAt(0)}.`,
      userAvatar: currentUser.avatarUrl,
      actionText: `sent a instant zero-fee P2P transfer to @${recipient.username}`,
      timestamp: new Date().toISOString(),
    };
    setPlatformActivities((prev) => [activityItem, ...prev.slice(0, 24)]);

    // Notification to recipient
    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: recipient.id,
      type: 'transaction',
      title: 'Money Received 💸',
      message: `You received ${formatMoney(amount)} USD from @${currentUser.username} (${currentUser.firstName} ${currentUser.lastName}).${note ? ` Note: "${note}"` : ''}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    addAuditLog('P2P_TRANSFER_SUCCESS', 'financial', `P2P transfer $${amount} from @${currentUser.username} to @${recipient.username} (Ref: ${refNum})`);
    triggerCelebration();
    showToast('Money Sent Successfully', `Transferred ${formatMoney(amount)} to @${recipient.username}`);
    return true;
  };

  // Gift Sending
  const sendGift = (toUserId: string, giftPresetId: string, customMessage: string = '', sourceAccountId?: string): boolean => {
    if (!currentUser) return false;
    const giftPreset = GIFT_PRESETS.find((g) => g.id === giftPresetId);
    if (!giftPreset) {
      showToast('Invalid Gift', 'Selected gift tier is not available.', 'error');
      return false;
    }

    const recipient = users.find((u) => u.id === toUserId || u.username.toLowerCase() === toUserId.toLowerCase());
    if (!recipient) {
      showToast('User Not Found', 'Could not locate the recipient for this gift.', 'error');
      return false;
    }

    if (recipient.id === currentUser.id) {
      showToast('Cannot Gift Yourself', 'Please select another member to send a gift.', 'warning');
      return false;
    }

    const amount = giftPreset.amount;
    const senderAccount = sourceAccountId
      ? accounts.find((a) => a.id === sourceAccountId && a.userId === currentUser.id)
      : accounts.find((a) => a.userId === currentUser.id && a.balance >= amount) ||
        accounts.find((a) => a.userId === currentUser.id);

    if (!senderAccount || senderAccount.balance < amount) {
      showToast('Insufficient Balance', `You need at least ${formatMoney(amount)} to send the ${giftPreset.emoji} ${giftPreset.name}.`, 'error');
      return false;
    }

    let recipientAccount = accounts.find((a) => a.userId === recipient.id && a.type === 'checking') ||
      accounts.find((a) => a.userId === recipient.id);

    // Debit sender, credit recipient
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === senderAccount.id) {
          return { ...acc, balance: acc.balance - amount, lastActivityAt: new Date().toISOString() };
        }
        if (recipientAccount && acc.id === recipientAccount.id) {
          return { ...acc, balance: acc.balance + amount, lastActivityAt: new Date().toISOString() };
        }
        return acc;
      })
    );

    const refNum = `THR-GIFT-${Math.floor(100000 + Math.random() * 900000)}`;

    const newGift: UserGift = {
      id: `gift_${Date.now()}`,
      fromUserId: currentUser.id,
      fromUserName: `${currentUser.firstName} ${currentUser.lastName}`,
      fromUserAvatar: currentUser.avatarUrl,
      toUserId: recipient.id,
      toUserName: `${recipient.firstName} ${recipient.lastName}`,
      toUserAvatar: recipient.avatarUrl,
      giftName: giftPreset.name,
      giftEmoji: giftPreset.emoji,
      amount: giftPreset.amount,
      currency: 'USD',
      message: customMessage || `Sent you a ${giftPreset.emoji} ${giftPreset.name}!`,
      createdAt: new Date().toISOString(),
    };

    setGifts((prev) => [newGift, ...prev]);

    // Ledger for sender
    const senderTx: Transaction = {
      id: `tx_${Date.now()}_giftsend`,
      referenceNumber: refNum,
      userId: currentUser.id,
      accountId: senderAccount.id,
      accountName: senderAccount.name,
      type: 'gift_sent',
      amount: amount,
      currency: 'USD',
      fee: 0,
      description: `Sent ${giftPreset.emoji} ${giftPreset.name} ($${amount}) to @${recipient.username}`,
      status: 'completed',
      recipientAccount: `@${recipient.username}`,
      senderAccount: senderAccount.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Ledger for recipient
    const recipientTx: Transaction = {
      id: `tx_${Date.now()}_giftrecv`,
      referenceNumber: refNum,
      userId: recipient.id,
      accountId: recipientAccount ? recipientAccount.id : `acc_${recipient.id}`,
      accountName: recipientAccount ? recipientAccount.name : 'Checking',
      type: 'gift_received',
      amount: amount,
      currency: 'USD',
      fee: 0,
      description: `Received ${giftPreset.emoji} ${giftPreset.name} ($${amount}) from @${currentUser.username}`,
      status: 'completed',
      recipientAccount: recipientAccount ? recipientAccount.name : 'Checking',
      senderAccount: `@${currentUser.username}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTransactions((prev) => [senderTx, recipientTx, ...prev]);

    // Activity feed item
    const activityItem: PlatformActivity = {
      id: `act_${Date.now()}`,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName.charAt(0)}.`,
      userAvatar: currentUser.avatarUrl,
      actionText: `sent ${giftPreset.emoji} ${giftPreset.name} to @${recipient.username}`,
      timestamp: new Date().toISOString(),
    };
    setPlatformActivities((prev) => [activityItem, ...prev.slice(0, 24)]);

    // Notification to recipient
    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: recipient.id,
      type: 'reward',
      title: `New Gift Received: ${giftPreset.emoji} ${giftPreset.name}`,
      message: `@${currentUser.username} sent you a ${giftPreset.emoji} ${giftPreset.name} worth ${formatMoney(amount)}! "${customMessage || 'Enjoy your gift!'}"`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    addAuditLog('GIFT_SENT', 'financial', `Gift ${giftPreset.name} ($${amount}) sent from @${currentUser.username} to @${recipient.username}`);
    triggerCelebration();
    showToast('Gift Sent! 🎁', `Successfully delivered ${giftPreset.emoji} ${giftPreset.name} to @${recipient.username}`);
    return true;
  };

  // 2% 24h Daily Bonus Claiming Engine
  const totalUserBalance = accounts
    .filter((a) => a.userId === currentUser?.id)
    .reduce((sum, a) => sum + a.balance, 0);

  const calculateCanClaimBonus = () => {
    if (!currentUser) return false;
    if (!lastBonusClaimDate) return true; // never claimed yet
    const lastClaim = new Date(lastBonusClaimDate).getTime();
    const now = Date.now();
    const hoursElapsed = (now - lastClaim) / (1000 * 60 * 60);
    return hoursElapsed >= 24;
  };

  const canClaimDailyBonus = calculateCanClaimBonus();

  const getTimeUntilNextBonus = (): string => {
    if (!lastBonusClaimDate || canClaimDailyBonus) return 'Ready to claim now!';
    const nextClaimTime = new Date(lastBonusClaimDate).getTime() + 24 * 60 * 60 * 1000;
    const diffMs = nextClaimTime - Date.now();
    if (diffMs <= 0) return 'Ready to claim now!';
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diffMs % (1000 * 60)) / 1000);
    return `${hours}h ${mins}m ${secs}s`;
  };

  const timeUntilNextBonus = getTimeUntilNextBonus();

  const claimDailyBonus = (): boolean => {
    if (!currentUser) return false;
    if (!canClaimDailyBonus) {
      showToast('Bonus In Cooldown', `Next 2% 24-hour bonus available in ${timeUntilNextBonus}.`, 'warning');
      return false;
    }

    // Minimum baseline calculation: 2% of total portfolio balance, or at least $10 baseline if new account
    const bonusBase = totalUserBalance > 0 ? totalUserBalance : 500;
    const bonusAmount = Number((bonusBase * 0.02).toFixed(2));

    // Credit to savings vault or primary checking
    let targetAcc = accounts.find((a) => a.userId === currentUser.id && a.type === 'savings') ||
      accounts.find((a) => a.userId === currentUser.id && a.type === 'checking') ||
      accounts.find((a) => a.userId === currentUser.id);

    if (!targetAcc) {
      showToast('Error', 'No account found to credit bonus.', 'error');
      return false;
    }

    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === targetAcc.id
          ? { ...acc, balance: acc.balance + bonusAmount, lastActivityAt: new Date().toISOString() }
          : acc
      )
    );

    const nowIso = new Date().toISOString();
    setLastBonusClaimDate(nowIso);
    localStorage.setItem(`${STORAGE_KEY}_last_bonus_claim_${currentUser.id}`, nowIso);

    const refNum = `THR-YIELD-${Math.floor(100000 + Math.random() * 900000)}`;
    const tx: Transaction = {
      id: `tx_${Date.now()}_bonus`,
      referenceNumber: refNum,
      userId: currentUser.id,
      accountId: targetAcc.id,
      accountName: targetAcc.name,
      type: 'daily_bonus',
      amount: bonusAmount,
      currency: 'USD',
      fee: 0,
      description: `24-Hour 2% Compounding Bonus (2% of ${formatMoney(bonusBase)})`,
      status: 'completed',
      recipientAccount: targetAcc.name,
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    setTransactions((prev) => [tx, ...prev]);

    // Add to live platform activity feed
    const activityItem: PlatformActivity = {
      id: `act_${Date.now()}`,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName.charAt(0)}.`,
      userAvatar: currentUser.avatarUrl,
      actionText: `collected their 2% 24-hour daily portfolio yield bonus`,
      timestamp: nowIso,
    };
    setPlatformActivities((prev) => [activityItem, ...prev.slice(0, 24)]);

    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      type: 'reward',
      title: '2% 24-Hour Bonus Collected! 💵✨',
      message: `Successfully claimed ${formatMoney(bonusAmount)} (2% on ${formatMoney(bonusBase)}). Next payout unlocks in 24 hours.`,
      read: false,
      createdAt: nowIso,
    };
    setNotifications((prev) => [notif, ...prev]);

    addAuditLog('DAILY_2PCT_BONUS_CLAIMED', 'financial', `User ${currentUser.email} claimed 2% 24h bonus of $${bonusAmount} (Ref: ${refNum})`);
    triggerCelebration();
    showToast('Bonus Collected! 💵', `Added ${formatMoney(bonusAmount)} (2% daily bonus) to ${targetAcc.name}!`);
    return true;
  };

  const requestDeposit = (
    accountId: string,
    method: DepositRequest['method'],
    amount: number,
    details: any
  ): DepositRequest => {
    if (!currentUser) throw new Error('Not logged in');
    const acc = accounts.find((a) => a.id === accountId);
    const refNum = `THR-DP-${Math.floor(100000 + Math.random() * 900000)}`;
    const fee = amount * (config.depositFeePercentage / 100);
    const netAmount = amount - fee;

    const newDeposit: DepositRequest = {
      id: `dp_${Date.now()}`,
      referenceNumber: refNum,
      userId: currentUser.id,
      accountId,
      method,
      amount,
      currency: 'USD',
      fee,
      netAmount,
      status: 'under_review',
      txHash: details.txHash || undefined,
      bankReference: details.bankReference || undefined,
      senderBankName: details.senderBankName || undefined,
      senderAccountName: details.senderAccountName || undefined,
      depositAddress: details.depositAddress || undefined,
      proofUrl: details.proofUrl || undefined,
      notes: details.notes || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setDeposits((prev) => [newDeposit, ...prev]);

    // Create pending ledger transaction
    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      referenceNumber: refNum,
      userId: currentUser.id,
      accountId,
      accountName: acc?.name || 'Account',
      type: 'deposit',
      amount,
      currency: 'USD',
      fee,
      description: `Deposit Request (${method.replace('_', ' ').toUpperCase()}) - Reference: ${refNum}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTransactions((prev) => [tx, ...prev]);

    addAuditLog('DEPOSIT_SUBMITTED', 'financial', `Deposit request for $${amount} submitted (Ref: ${refNum})`);
    showToast('Deposit Submitted', `Ref: ${refNum} — Under compliance review.`);
    return newDeposit;
  };

  const requestWithdrawal = (
    accountId: string,
    method: WithdrawalRequest['method'],
    amount: number,
    destinationDetails: any
  ): WithdrawalRequest => {
    if (!currentUser) throw new Error('Not logged in');
    const acc = accounts.find((a) => a.id === accountId);

    if (!acc || acc.balance < amount) {
      throw new Error('Insufficient account balance');
    }

    // Deduct immediately from available balance to prevent double spending
    setAccounts((prev) =>
      prev.map((a) => (a.id === accountId ? { ...a, balance: a.balance - amount, lastActivityAt: new Date().toISOString() } : a))
    );

    const refNum = `THR-WD-${Math.floor(100000 + Math.random() * 900000)}`;
    const fee = amount * (config.withdrawalFeePercentage / 100);
    const netAmount = amount - fee;

    const newWithdrawal: WithdrawalRequest = {
      id: `wd_${Date.now()}`,
      referenceNumber: refNum,
      userId: currentUser.id,
      accountId,
      method,
      amount,
      currency: 'USD',
      fee,
      netAmount,
      destinationDetails,
      status: 'pending',
      estimatedCompletion: config.usBankEstimatedProcessingDays,
      createdAt: new Date().toISOString(),
    };

    setWithdrawals((prev) => [newWithdrawal, ...prev]);

    // Create ledger record
    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      referenceNumber: refNum,
      userId: currentUser.id,
      accountId,
      accountName: acc.name,
      type: 'withdrawal',
      amount,
      currency: 'USD',
      fee,
      description: `Withdrawal Request to ${destinationDetails.bankName || destinationDetails.cryptoNetwork || 'Payout Method'} (Ref: ${refNum})`,
      status: 'processing',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTransactions((prev) => [tx, ...prev]);

    addAuditLog('WITHDRAWAL_SUBMITTED', 'financial', `Withdrawal of $${amount} submitted (Ref: ${refNum})`);
    showToast('Withdrawal Requested', `Ref: ${refNum} — Expected in ${config.usBankEstimatedProcessingDays}`);
    return newWithdrawal;
  };

  const adminApproveDeposit = (depositId: string) => {
    const deposit = deposits.find((d) => d.id === depositId);
    if (!deposit) return;

    setDeposits((prev) =>
      prev.map((d) => (d.id === depositId ? { ...d, status: 'approved', approvedAt: new Date().toISOString() } : d))
    );

    // Credit destination account
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === deposit.accountId ? { ...acc, balance: acc.balance + deposit.netAmount } : acc))
    );

    // Update transaction to completed
    setTransactions((prev) =>
      prev.map((tx) => (tx.referenceNumber === deposit.referenceNumber ? { ...tx, status: 'completed' } : tx))
    );

    // Notify user
    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: deposit.userId,
      type: 'deposit',
      title: 'Deposit Approved & Credited',
      message: `Your deposit of $${deposit.netAmount.toFixed(2)} USD (Ref: ${deposit.referenceNumber}) has been approved and credited.`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    addAuditLog('ADMIN_APPROVED_DEPOSIT', 'admin', `Admin approved deposit ${deposit.referenceNumber} for $${deposit.amount}`);
    showToast('Deposit Approved', `Credited $${deposit.netAmount} to user.`);
  };

  const adminApproveWithdrawal = (withdrawalId: string) => {
    const wd = withdrawals.find((w) => w.id === withdrawalId);
    if (!wd) return;

    setWithdrawals((prev) =>
      prev.map((w) => (w.id === withdrawalId ? { ...w, status: 'completed', processedAt: new Date().toISOString() } : w))
    );

    setTransactions((prev) =>
      prev.map((tx) => (tx.referenceNumber === wd.referenceNumber ? { ...tx, status: 'completed' } : tx))
    );

    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: wd.userId,
      type: 'withdrawal',
      title: 'Payout Dispatched',
      message: `Your withdrawal of $${wd.netAmount.toFixed(2)} USD (Ref: ${wd.referenceNumber}) has completed and been dispatched.`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    addAuditLog('ADMIN_APPROVED_WITHDRAWAL', 'admin', `Admin marked withdrawal ${wd.referenceNumber} as completed.`);
    showToast('Withdrawal Dispatched', `Marked ${wd.referenceNumber} as completed.`);
  };

  const adminRejectWithdrawal = (withdrawalId: string, reason: string) => {
    const wd = withdrawals.find((w) => w.id === withdrawalId);
    if (!wd) return;

    // Refund funds back to account
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === wd.accountId ? { ...acc, balance: acc.balance + wd.amount } : acc))
    );

    setWithdrawals((prev) =>
      prev.map((w) => (w.id === withdrawalId ? { ...w, status: 'rejected', rejectionReason: reason } : w))
    );

    setTransactions((prev) =>
      prev.map((tx) => (tx.referenceNumber === wd.referenceNumber ? { ...tx, status: 'rejected' } : tx))
    );

    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: wd.userId,
      type: 'withdrawal',
      title: 'Withdrawal Request Rejected',
      message: `Your withdrawal of $${wd.amount} (Ref: ${wd.referenceNumber}) was rejected: "${reason}". Funds refunded.`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    addAuditLog('ADMIN_REJECTED_WITHDRAWAL', 'admin', `Admin rejected withdrawal ${wd.referenceNumber}. Reason: ${reason}`);
    showToast('Withdrawal Rejected', 'Funds returned to user account.', 'warning');
  };

  const adminApproveAllPendingWithdrawals = () => {
    const pendingWds = withdrawals.filter((w) => w.status === 'pending' || w.status === 'processing');
    if (pendingWds.length === 0) {
      showToast('No Pending Withdrawals', 'All withdrawal payouts are already processed.');
      return;
    }

    setWithdrawals((prev) =>
      prev.map((w) => (w.status === 'pending' || w.status === 'processing' ? { ...w, status: 'completed', processedAt: new Date().toISOString() } : w))
    );

    setTransactions((prev) =>
      prev.map((tx) => (tx.type === 'withdrawal' && (tx.status === 'pending' || tx.status === 'processing') ? { ...tx, status: 'completed', updatedAt: new Date().toISOString() } : tx))
    );

    addAuditLog('ADMIN_BATCH_APPROVED_WITHDRAWALS', 'admin', `Batch processed and dispatched ${pendingWds.length} pending bank withdrawals.`);
    triggerCelebration();
    showToast('Batch Dispatch Executed', `Approved & dispatched ${pendingWds.length} bank withdrawals.`);
  };

  // =========================================================================
  // FULL ADMINISTRATIVE CONTROL: USER MONEY ADJUSTMENTS & BONUSES
  // =========================================================================
  const adminAddFunds = (
    userId: string,
    accountId: string,
    amount: number,
    category: string = 'Administrative Credit',
    notes: string = 'Manual platform balance adjustment'
  ): boolean => {
    if (amount <= 0) {
      showToast('Invalid Amount', 'Amount must be greater than $0.', 'error');
      return false;
    }

    const targetUser = users.find((u) => u.id === userId);
    const targetAccount = accounts.find((a) => a.id === accountId);

    if (!targetUser || !targetAccount) {
      showToast('Adjustment Failed', 'Target user or account not found.', 'error');
      return false;
    }

    // Update account balance
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId
          ? { ...acc, balance: acc.balance + amount, lastActivityAt: new Date().toISOString() }
          : acc
      )
    );

    // Record verified ledger transaction
    const refNum = `THR-ADM-CR-${Math.floor(100000 + Math.random() * 900000)}`;
    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      referenceNumber: refNum,
      userId: targetUser.id,
      accountId: targetAccount.id,
      accountName: targetAccount.name,
      type: 'deposit',
      amount,
      currency: 'USD',
      fee: 0,
      description: `[ADMIN CREDIT] ${category}: ${notes} (Ref: ${refNum})`,
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTransactions((prev) => [tx, ...prev]);

    // Send notification to user
    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: targetUser.id,
      type: 'deposit',
      title: 'Account Credited by Administration 💵',
      message: `Your ${targetAccount.name} has been credited with ${formatMoney(amount)} USD (${category}).`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    addAuditLog(
      'ADMIN_CREDITED_USER',
      'financial',
      `Admin credited $${amount} to ${targetUser.email} (${targetAccount.name}). Reason: ${category} - ${notes}`
    );

    triggerCelebration();
    showToast(
      'Funds Added Successfully',
      `Credited ${formatMoney(amount)} to ${targetUser.firstName} ${targetUser.lastName}'s account.`
    );
    return true;
  };

  const adminDeductFunds = (
    userId: string,
    accountId: string,
    amount: number,
    category: string = 'Administrative Debit',
    notes: string = 'Manual platform balance correction'
  ): boolean => {
    if (amount <= 0) {
      showToast('Invalid Amount', 'Amount must be greater than $0.', 'error');
      return false;
    }

    const targetUser = users.find((u) => u.id === userId);
    const targetAccount = accounts.find((a) => a.id === accountId);

    if (!targetUser || !targetAccount) {
      showToast('Adjustment Failed', 'Target user or account not found.', 'error');
      return false;
    }

    // Deduct balance (floor at 0 or allow overdraft if needed, default safe to 0)
    const newBal = Math.max(0, targetAccount.balance - amount);

    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId
          ? { ...acc, balance: newBal, lastActivityAt: new Date().toISOString() }
          : acc
      )
    );

    // Record ledger transaction
    const refNum = `THR-ADM-DB-${Math.floor(100000 + Math.random() * 900000)}`;
    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      referenceNumber: refNum,
      userId: targetUser.id,
      accountId: targetAccount.id,
      accountName: targetAccount.name,
      type: 'withdrawal',
      amount,
      currency: 'USD',
      fee: 0,
      description: `[ADMIN DEBIT] ${category}: ${notes} (Ref: ${refNum})`,
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTransactions((prev) => [tx, ...prev]);

    // Send notification
    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: targetUser.id,
      type: 'security',
      title: 'Administrative Account Adjustment',
      message: `Your ${targetAccount.name} balance was debited by ${formatMoney(amount)} USD (${category}: ${notes}).`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    addAuditLog(
      'ADMIN_DEBITED_USER',
      'financial',
      `Admin debited $${amount} from ${targetUser.email} (${targetAccount.name}). Reason: ${category} - ${notes}`
    );

    showToast(
      'Funds Debited Successfully',
      `Deducted ${formatMoney(amount)} from ${targetUser.firstName} ${targetUser.lastName}'s account.`,
      'warning'
    );
    return true;
  };

  const adminSetAccountBalance = (
    userId: string,
    accountId: string,
    newBalance: number,
    notes: string = 'Executive balance reset'
  ): boolean => {
    if (newBalance < 0) {
      showToast('Invalid Balance', 'Balance cannot be negative.', 'error');
      return false;
    }

    const targetUser = users.find((u) => u.id === userId);
    const targetAccount = accounts.find((a) => a.id === accountId);

    if (!targetUser || !targetAccount) return false;

    const diff = newBalance - targetAccount.balance;

    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId
          ? { ...acc, balance: newBalance, lastActivityAt: new Date().toISOString() }
          : acc
      )
    );

    const refNum = `THR-ADM-SET-${Math.floor(100000 + Math.random() * 900000)}`;
    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      referenceNumber: refNum,
      userId: targetUser.id,
      accountId: targetAccount.id,
      accountName: targetAccount.name,
      type: diff >= 0 ? 'deposit' : 'withdrawal',
      amount: Math.abs(diff),
      currency: 'USD',
      fee: 0,
      description: `[ADMIN SET BALANCE] Reset from $${targetAccount.balance.toFixed(2)} to $${newBalance.toFixed(2)}: ${notes}`,
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTransactions((prev) => [tx, ...prev]);

    addAuditLog(
      'ADMIN_SET_USER_BALANCE',
      'financial',
      `Admin set balance for ${targetUser.email} (${targetAccount.name}) to $${newBalance}. Note: ${notes}`
    );

    showToast('Balance Updated', `${targetAccount.name} balance set to ${formatMoney(newBalance)}.`);
    return true;
  };

  const adminApproveBonus = (referralId: string) => {
    const ref = referrals.find((r) => r.id === referralId);
    if (!ref) return;

    const rewardAmt = ref.rewardAmount || config.referralRewardAmount || 25.0;

    // Mark referral as rewarded
    setReferrals((prev) =>
      prev.map((r) =>
        r.id === referralId
          ? { ...r, status: 'rewarded', paidAt: new Date().toISOString() }
          : r
      )
    );

    // Credit referrer primary checking account
    const referrerAccounts = accounts.filter((a) => a.userId === ref.referrerUserId);
    const targetAcc = referrerAccounts[0];

    if (targetAcc) {
      setAccounts((prev) =>
        prev.map((a) =>
          a.id === targetAcc.id
            ? { ...a, balance: a.balance + rewardAmt, lastActivityAt: new Date().toISOString() }
            : a
        )
      );

      // Add transaction
      const refNum = `THR-REF-BN-${Math.floor(100000 + Math.random() * 900000)}`;
      const tx: Transaction = {
        id: `tx_${Date.now()}`,
        referenceNumber: refNum,
        userId: ref.referrerUserId,
        accountId: targetAcc.id,
        accountName: targetAcc.name,
        type: 'referral_reward',
        amount: rewardAmt,
        currency: 'USD',
        fee: 0,
        description: `Referral Bonus ($${rewardAmt}) Approved for inviting ${ref.referredName} (${ref.referredEmail})`,
        status: 'completed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTransactions((prev) => [tx, ...prev]);

      // Notify user
      const notif: AppNotification = {
        id: `notif_${Date.now()}`,
        userId: ref.referrerUserId,
        type: 'reward',
        title: 'Referral Bonus Approved! 🎉',
        message: `Your $${rewardAmt} referral bonus for inviting ${ref.referredName} has been approved and deposited!`,
        read: false,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [notif, ...prev]);
    }

    addAuditLog(
      'ADMIN_APPROVED_BONUS',
      'financial',
      `Admin approved $${rewardAmt} referral bonus for referrer ${ref.referrerUserId} (Referred: ${ref.referredEmail})`
    );

    triggerCelebration();
    showToast('Bonus Approved & Paid', `Credited $${rewardAmt} referral bonus to member.`);
  };

  const adminRejectBonus = (referralId: string, reason: string) => {
    const ref = referrals.find((r) => r.id === referralId);
    if (!ref) return;

    setReferrals((prev) =>
      prev.map((r) =>
        r.id === referralId ? { ...r, status: 'pending', qualificationCriteria: `Rejected: ${reason}` } : r
      )
    );

    addAuditLog('ADMIN_REJECTED_BONUS', 'financial', `Admin declined referral bonus ${referralId}: ${reason}`);
    showToast('Bonus Rejected', `Status updated with reason: ${reason}`, 'warning');
  };

  const adminIssueCustomBonus = (
    userId: string,
    amount: number,
    bonusType: string = 'Promotional Grant',
    reason: string = 'Executive VIP bonus award'
  ) => {
    const userAccs = accounts.filter((a) => a.userId === userId);
    const targetAcc = userAccs[0];
    if (!targetAcc) {
      showToast('No Account Found', 'User has no active financial account.', 'error');
      return;
    }

    adminAddFunds(userId, targetAcc.id, amount, `Bonus: ${bonusType}`, reason);
  };

  const adminBatchApproveBonuses = () => {
    const pendingBonuses = referrals.filter((r) => r.status === 'pending' || r.status === 'qualified');
    if (pendingBonuses.length === 0) {
      showToast('No Pending Bonuses', 'All referral claims are currently rewarded.');
      return;
    }

    pendingBonuses.forEach((b) => {
      adminApproveBonus(b.id);
    });

    showToast('Batch Bonuses Approved', `Approved and credited ${pendingBonuses.length} referral rewards.`);
  };

  // Executive trigger: Distribute 2% daily bonus earning to EVERY user across the platform
  const adminDistributeDailyBonusToAllUsers = (percentage: number = 2.0) => {
    const rateMultiplier = (percentage || 2.0) / 100;
    const nowIso = new Date().toISOString();
    let rewardedCount = 0;
    let totalDistributed = 0;
    const newTransactions: Transaction[] = [];
    const newNotifications: AppNotification[] = [];

    // Map updated accounts
    setAccounts((prevAccounts) => {
      const updatedAccounts = [...prevAccounts];

      users.forEach((u) => {
        const userAccs = updatedAccounts.filter((a) => a.userId === u.id);
        const userTotalBalance = userAccs.reduce((sum, a) => sum + (a.balance || 0), 0);
        const bonusBase = userTotalBalance > 0 ? userTotalBalance : 500;
        const bonusAmount = Number((bonusBase * rateMultiplier).toFixed(2));

        // Find primary target account (savings vault preferred, then checking)
        let targetAccIndex = updatedAccounts.findIndex((a) => a.userId === u.id && a.type === 'savings');
        if (targetAccIndex === -1) {
          targetAccIndex = updatedAccounts.findIndex((a) => a.userId === u.id && a.type === 'checking');
        }
        if (targetAccIndex === -1) {
          targetAccIndex = updatedAccounts.findIndex((a) => a.userId === u.id);
        }

        if (targetAccIndex !== -1 && bonusAmount > 0) {
          const targetAcc = updatedAccounts[targetAccIndex];
          updatedAccounts[targetAccIndex] = {
            ...targetAcc,
            balance: targetAcc.balance + bonusAmount,
            lastActivityAt: nowIso,
          };

          rewardedCount += 1;
          totalDistributed += bonusAmount;

          const refNum = `THR-ADM-2PCT-${Math.floor(100000 + Math.random() * 900000)}`;
          const tx: Transaction = {
            id: `tx_${Date.now()}_admbn_${u.id}`,
            referenceNumber: refNum,
            userId: u.id,
            accountId: targetAcc.id,
            accountName: targetAcc.name,
            type: 'daily_bonus',
            amount: bonusAmount,
            currency: 'USD',
            fee: 0,
            description: `[ADMIN EXEC] Global ${percentage}% Daily Yield Bonus Distribution (on ${formatMoney(bonusBase)})`,
            status: 'completed',
            recipientAccount: targetAcc.name,
            createdAt: nowIso,
            updatedAt: nowIso,
          };
          newTransactions.push(tx);

          const notif: AppNotification = {
            id: `notif_${Date.now()}_admbn_${u.id}`,
            userId: u.id,
            type: 'reward',
            title: `Global ${percentage}% Daily Bonus Credited! 💵✨`,
            message: `Executive Yield Distribution: +${formatMoney(bonusAmount)} USD (${percentage}% earning on your ${formatMoney(bonusBase)} portfolio) credited to ${targetAcc.name}.`,
            read: false,
            createdAt: nowIso,
          };
          newNotifications.push(notif);
        }
      });

      return updatedAccounts;
    });

    if (newTransactions.length > 0) {
      setTransactions((prev) => [...newTransactions, ...prev]);
    }
    if (newNotifications.length > 0) {
      setNotifications((prev) => [...newNotifications, ...prev]);
    }

    // Activity feed
    const activityItem: PlatformActivity = {
      id: `act_${Date.now()}_global_bonus`,
      userId: currentUser?.id || 'admin',
      userName: 'Administration',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      actionText: `dispatched global ${percentage}% daily yield bonus to all ${rewardedCount} active members`,
      timestamp: nowIso,
    };
    setPlatformActivities((prev) => [activityItem, ...prev.slice(0, 24)]);

    addAuditLog(
      'ADMIN_GLOBAL_DAILY_BONUS_DISPATCHED',
      'financial',
      `Admin distributed ${percentage}% daily bonus across ${rewardedCount} members. Total USD credited: $${totalDistributed.toFixed(2)}`
    );

    triggerCelebration();
    showToast(
      'Global 2% Bonus Dispatched',
      `Credited ${formatMoney(totalDistributed)} across all ${rewardedCount} user accounts!`
    );

    return { totalUsersRewarded: rewardedCount, totalDistributedUSD: totalDistributed };
  };

  const adminToggleAccountStatus = (accountId: string) => {
    const targetAcc = accounts.find((a) => a.id === accountId);
    if (!targetAcc) return;

    const nextStatus = targetAcc.status === 'active' ? 'frozen' : 'active';
    setAccounts((prev) =>
      prev.map((a) => (a.id === accountId ? { ...a, status: nextStatus, lastActivityAt: new Date().toISOString() } : a))
    );

    addAuditLog(
      'ADMIN_TOGGLED_ACCOUNT_STATUS',
      'security',
      `Admin toggled status of ${targetAcc.name} (${targetAcc.accountNumber}) to ${nextStatus.toUpperCase()}`
    );

    showToast(
      nextStatus === 'frozen' ? 'Account Frozen ❄️' : 'Account Re-Activated 🟢',
      `${targetAcc.name} is now ${nextStatus}.`
    );
  };

  const adminUpdateUserKYC = (
    userId: string,
    status: 'not_started' | 'pending' | 'verified' | 'rejected'
  ) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, kycStatus: status } : u)));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, kycStatus: status });
    }

    addAuditLog('ADMIN_OVERRIDE_KYC', 'kyc', `Admin forced KYC status for user ${userId} to ${status.toUpperCase()}`);
    showToast('KYC Status Updated', `User KYC status is now ${status.toUpperCase()}.`);
  };

  const adminDeleteUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (!target) return;
    if (target.role === 'admin') {
      showToast('Cannot Delete Admin', 'Primary administrator accounts cannot be deleted.', 'error');
      return;
    }

    setUsers((prev) => prev.filter((u) => u.id !== userId));
    setAccounts((prev) => prev.filter((a) => a.userId !== userId));
    setTransactions((prev) => prev.filter((t) => t.userId !== userId));

    addAuditLog('ADMIN_DELETED_USER', 'admin', `Admin removed user account: ${target.email} (${target.uniqueUserId})`);
    showToast('User Deleted', `User ${target.firstName} ${target.lastName} was removed.`);
  };

  // Savings Goals Operations
  const createSavingsGoal = (
    name: string,
    arg2?: any,
    arg3?: any,
    arg4?: any,
    arg5?: any
  ) => {
    if (!currentUser) return;

    let category: SavingsGoal['category'] = 'Emergency Fund';
    let targetAmount = 10000;
    let targetDate = '2026-12-31';
    let monthlyContribution = 250;

    if (typeof arg2 === 'number') {
      targetAmount = arg2;
      targetDate = String(arg3 || '2026-12-31');
      category = (arg4 as SavingsGoal['category']) || 'Emergency Fund';
      monthlyContribution = Number(arg5 || 0);
    } else {
      category = (arg2 as SavingsGoal['category']) || 'Emergency Fund';
      targetAmount = Number(arg3 || 10000);
      targetDate = String(arg4 || '2026-12-31');
      monthlyContribution = Number(arg5 || 0);
    }

    const newGoal: SavingsGoal = {
      id: `sg_${Date.now()}`,
      userId: currentUser.id,
      name,
      category,
      targetAmount,
      currentAmount: 0,
      currency: 'USD',
      targetDate,
      monthlyContribution,
      isAutoContribute: monthlyContribution > 0,
      createdAt: new Date().toISOString(),
    };

    setSavingsGoals((prev) => [...prev, newGoal]);

    const activity: PlatformActivity = {
      id: `act_${Date.now()}`,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      userAvatar: currentUser.avatarUrl,
      actionText: `created a new "${name}" savings goal`,
      timestamp: 'Just now',
    };
    setPlatformActivities((prev) => [activity, ...prev]);

    addAuditLog('SAVINGS_GOAL_CREATED', 'financial', `Created savings goal: "${name}" (Target: $${targetAmount})`);
    showToast('Goal Created', `Savings goal "${name}" initialized.`);
  };

  const contributeToGoal = (goalId: string, arg2: string | number, arg3: string | number): boolean => {
    if (!currentUser) return false;
    const fromAccountId = typeof arg2 === 'string' ? arg2 : String(arg3 || accounts[0]?.id || 'acc_01');
    const amount = typeof arg2 === 'number' ? arg2 : Number(arg3 || 0);

    const fromAcc = accounts.find((a) => a.id === fromAccountId) || accounts[0];
    const goal = savingsGoals.find((g) => g.id === goalId);

    if (!fromAcc || !goal) return false;
    if (fromAcc.balance < amount) {
      showToast('Insufficient Funds', 'Account does not have enough balance.', 'error');
      return false;
    }

    setAccounts((prev) =>
      prev.map((a) => (a.id === fromAcc.id ? { ...a, balance: a.balance - amount } : a))
    );

    setSavingsGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, currentAmount: g.currentAmount + amount } : g))
    );

    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      referenceNumber: `THR-SV-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUser.id,
      accountId: fromAcc.id,
      accountName: fromAcc.name,
      type: 'savings_deposit',
      amount,
      currency: 'USD',
      fee: 0,
      description: `Contribution to Goal: ${goal.name}`,
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTransactions((prev) => [tx, ...prev]);

    showToast('Contribution Added', `Added ${formatMoney(amount)} to "${goal.name}".`);
    if (goal.currentAmount + amount >= goal.targetAmount) {
      triggerCelebration();
      showToast('Goal Completed! 🎉', `Congratulations! You reached your target for "${goal.name}".`);
    }
    return true;
  };

  const withdrawFromGoal = (goalId: string, arg2: string | number, arg3: string | number): boolean => {
    if (!currentUser) return false;
    const toAccountId = typeof arg2 === 'string' ? arg2 : String(arg3 || accounts[0]?.id || 'acc_01');
    const amount = typeof arg2 === 'number' ? arg2 : Number(arg3 || 0);

    const toAcc = accounts.find((a) => a.id === toAccountId) || accounts[0];
    const goal = savingsGoals.find((g) => g.id === goalId);

    if (!toAcc || !goal) return false;
    if (goal.currentAmount < amount) {
      showToast('Amount Exceeds Goal Balance', 'Cannot withdraw more than current goal amount.', 'error');
      return false;
    }

    setSavingsGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, currentAmount: g.currentAmount - amount } : g))
    );

    setAccounts((prev) =>
      prev.map((a) => (a.id === toAcc.id ? { ...a, balance: a.balance + amount } : a))
    );

    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      referenceNumber: `THR-SV-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUser.id,
      accountId: toAcc.id,
      accountName: toAcc.name,
      type: 'savings_withdrawal',
      amount,
      currency: 'USD',
      fee: 0,
      description: `Withdrawal from Goal: ${goal.name}`,
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTransactions((prev) => [tx, ...prev]);

    showToast('Withdrawal Complete', `Moved ${formatMoney(amount)} back to ${toAcc.name}.`);
    return true;
  };

  // Personal Expenses
  const addPersonalExpense = (expense: Omit<PersonalExpense, 'id' | 'userId' | 'createdAt'>) => {
    if (!currentUser) return;
    const newExp: PersonalExpense = {
      ...expense,
      id: `exp_${Date.now()}`,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
    };
    setPersonalExpenses((prev) => [newExp, ...prev]);

    // Also record in transaction history if it was an active transaction
    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      referenceNumber: `THR-EX-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUser.id,
      accountId: accounts[0]?.id || 'acc_01',
      accountName: accounts[0]?.name || 'Primary Checking',
      type: 'expense',
      amount: expense.amount,
      currency: expense.currency || 'USD',
      fee: 0,
      category: expense.category,
      merchant: expense.merchant,
      description: `Expense: ${expense.merchant} (${expense.category})`,
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTransactions((prev) => [tx, ...prev]);

    addAuditLog('EXPENSE_LOGGED', 'financial', `Logged personal expense: $${expense.amount} at ${expense.merchant}`);
    showToast('Expense Tracked', `Recorded ${formatMoney(expense.amount)} for ${expense.merchant}`);
  };

  // Group Sharing & Settlement Algorithm
  const createSharedGroup = (name: string, type: SharedGroup['type'], memberIds: string[]) => {
    if (!currentUser) return;
    const newGrp: SharedGroup = {
      id: `grp_${Date.now()}`,
      name,
      type,
      memberUserIds: Array.from(new Set([currentUser.id, ...memberIds])),
      createdBy: currentUser.id,
      currency: 'USD',
      createdAt: new Date().toISOString(),
    };
    setSharedGroups((prev) => [...prev, newGrp]);
    showToast('Group Created', `"${name}" shared expense group is ready.`);
  };

  const addGroupExpense = (
    groupId: string,
    title: string,
    amount: number,
    splitBetweenUserIds: string[],
    category: string
  ) => {
    if (!currentUser) return;
    const newGExp: GroupExpenseItem = {
      id: `gexp_${Date.now()}`,
      groupId,
      title,
      paidByUserId: currentUser.id,
      amount,
      currency: 'USD',
      splitBetweenUserIds,
      category,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };
    setGroupExpenses((prev) => [...prev, newGExp]);
    showToast('Group Expense Added', `Added $${amount.toFixed(2)} for "${title}".`);
  };

  // Minimum Cash Flow Settlement Algorithm
  const calculateGroupSettlements = (groupId: string): SettlementDebt[] => {
    const expenses = groupExpenses.filter((e) => e.groupId === groupId);
    const balances: Record<string, number> = {};

    expenses.forEach((exp) => {
      const payer = exp.paidByUserId;
      const splitCount = exp.splitBetweenUserIds.length;
      if (splitCount === 0) return;
      const splitShare = exp.amount / splitCount;

      balances[payer] = (balances[payer] || 0) + exp.amount;

      exp.splitBetweenUserIds.forEach((uid) => {
        balances[uid] = (balances[uid] || 0) - splitShare;
      });
    });

    // Separate debtors and creditors
    const debtors: Array<{ userId: string; amount: number }> = [];
    const creditors: Array<{ userId: string; amount: number }> = [];

    Object.entries(balances).forEach(([uid, bal]) => {
      const rounded = Math.round(bal * 100) / 100;
      if (rounded < -0.01) {
        debtors.push({ userId: uid, amount: -rounded });
      } else if (rounded > 0.01) {
        creditors.push({ userId: uid, amount: rounded });
      }
    });

    // Greedy matching algorithm
    const settlements: SettlementDebt[] = [];
    let d = 0;
    let c = 0;

    while (d < debtors.length && c < creditors.length) {
      const debtor = debtors[d];
      const creditor = creditors[c];
      const minAmount = Math.min(debtor.amount, creditor.amount);

      const dUser = users.find((u) => u.id === debtor.userId);
      const cUser = users.find((u) => u.id === creditor.userId);

      settlements.push({
        fromUserId: debtor.userId,
        fromUserName: dUser ? `${dUser.firstName} ${dUser.lastName}` : debtor.userId,
        toUserId: creditor.userId,
        toUserName: cUser ? `${cUser.firstName} ${cUser.lastName}` : creditor.userId,
        amount: Math.round(minAmount * 100) / 100,
        currency: 'USD',
      });

      debtor.amount -= minAmount;
      creditor.amount -= minAmount;

      if (debtor.amount <= 0.01) d++;
      if (creditor.amount <= 0.01) c++;
    }

    return settlements;
  };

  // Crypto Portfolio
  const addCryptoHolding = (symbol: string, quantity: number, avgBuyPrice: number) => {
    if (!currentUser) return;
    const existing = cryptoHoldings.find((h) => h.userId === currentUser.id && h.assetSymbol === symbol);
    if (existing) {
      const totalQty = existing.quantity + quantity;
      const weightedAvg = (existing.quantity * existing.avgBuyPrice + quantity * avgBuyPrice) / totalQty;
      setCryptoHoldings((prev) =>
        prev.map((h) =>
          h.id === existing.id ? { ...h, quantity: totalQty, avgBuyPrice: Number(weightedAvg.toFixed(2)) } : h
        )
      );
    } else {
      const newHold: CryptoHolding = {
        id: `hld_${Date.now()}`,
        userId: currentUser.id,
        assetSymbol: symbol,
        quantity,
        avgBuyPrice,
      };
      setCryptoHoldings((prev) => [...prev, newHold]);
    }
    showToast('Portfolio Updated', `Added ${quantity} ${symbol} to your portfolio tracking.`);
  };

  // Connections
  const sendConnectionRequest = (targetUserId: string) => {
    if (!currentUser) return;
    const targetUser = users.find((u) => u.id === targetUserId);
    const newConn: UserConnection = {
      id: `conn_${Date.now()}`,
      requesterId: currentUser.id,
      targetId: targetUserId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setConnections((prev) => [...prev, newConn]);

    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: targetUserId,
      type: 'connection',
      title: 'New Connection Request',
      message: `${currentUser.firstName} ${currentUser.lastName} sent you a connection request.`,
      read: false,
      link: '/connections',
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast('Request Sent', `Connection request sent to ${targetUser?.firstName || 'user'}.`);
  };

  const acceptConnectionRequest = (connectionId: string) => {
    setConnections((prev) =>
      prev.map((c) => (c.id === connectionId ? { ...c, status: 'accepted', updatedAt: new Date().toISOString() } : c))
    );
    showToast('Connected', 'Connection request accepted.');
  };

  const removeConnection = (connectionId: string) => {
    setConnections((prev) => prev.filter((c) => c.id !== connectionId));
    showToast('Connection Removed', 'Connection has been removed.');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Notifications Cleared', 'All notifications marked as read.');
  };

  // Support
  const createSupportTicket = (
    subject: string,
    category: SupportTicket['category'] | string,
    priorityOrMessage: any,
    messageArg?: string
  ) => {
    if (!currentUser) return;
    const ticketNumber = `TETH-SUP-${Math.floor(1000 + Math.random() * 9000)}`;

    let priority: SupportTicket['priority'] = 'medium';
    let message = '';

    if (messageArg !== undefined) {
      priority = (priorityOrMessage as SupportTicket['priority']) || 'medium';
      message = messageArg;
    } else {
      message = String(priorityOrMessage || '');
      priority = 'medium';
    }

    const newTicket: SupportTicket = {
      id: `tkt_${Date.now()}`,
      ticketNumber,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      userEmail: currentUser.email,
      subject,
      category: (category as SupportTicket['category']) || 'General',
      priority,
      status: 'open',
      replies: [
        {
          id: `rep_${Date.now()}`,
          sender: 'user',
          senderName: `${currentUser.firstName} ${currentUser.lastName}`,
          message,
          createdAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    showToast('Ticket Created', `Support ticket ${ticketNumber} opened. Our 24/7 team will respond shortly.`);
  };

  const replySupportTicket = (ticketId: string, message: string) => {
    if (!currentUser) return;
    const senderRole = currentUser.role === 'admin' ? 'admin' : 'user';
    const newReply = {
      id: `rep_${Date.now()}`,
      sender: senderRole as any,
      senderName: `${currentUser.firstName} ${currentUser.lastName}${currentUser.role === 'admin' ? ' (Support Admin)' : ''}`,
      message,
      createdAt: new Date().toISOString(),
    };

    setSupportTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: currentUser.role === 'admin' ? 'waiting_user' : 'in_progress',
              updatedAt: new Date().toISOString(),
              replies: [...t.replies, newReply],
            }
          : t
      )
    );
    showToast('Reply Sent', 'Your message has been added to the ticket.');
  };

  // KYC Verification
  const submitKYC = (data: Partial<KYCSubmission>) => {
    if (!currentUser) return;
    const newSubmission: KYCSubmission = {
      id: `kyc_${Date.now()}`,
      userId: currentUser.id,
      legalFirstName: data.legalFirstName || currentUser.firstName,
      legalLastName: data.legalLastName || currentUser.lastName,
      dateOfBirth: data.dateOfBirth || currentUser.dateOfBirth,
      nationality: data.nationality || currentUser.country,
      idType: data.idType || 'passport',
      idNumber: data.idNumber || 'P12345678',
      residentialAddress: data.residentialAddress || '100 Broadway',
      city: data.city || currentUser.city,
      country: data.country || currentUser.country,
      postalCode: data.postalCode || '10001',
      idFrontDocName: data.idFrontDocName || 'identity_document_front.jpg',
      proofOfAddressDocName: data.proofOfAddressDocName || 'proof_of_address.pdf',
      selfieDocName: data.selfieDocName || 'biometric_verification_selfie.jpg',
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    setKycSubmissions((prev) => [newSubmission, ...prev.filter((k) => k.userId !== currentUser.id)]);
    updateProfile({ kycStatus: 'pending' });
    addAuditLog('KYC_SUBMITTED', 'kyc', `User submitted Tier 2 KYC Identity verification documents.`);
    showToast('KYC Submitted', 'Documents uploaded. Compliance review in progress.');
  };

  const adminApproveKYC = (submissionId: string) => {
    const sub = kycSubmissions.find((k) => k.id === submissionId);
    if (!sub) return;

    setKycSubmissions((prev) =>
      prev.map((k) => (k.id === submissionId ? { ...k, status: 'verified', reviewedAt: new Date().toISOString() } : k))
    );

    // Update user status
    setUsers((prev) => prev.map((u) => (u.id === sub.userId ? { ...u, kycStatus: 'verified' } : u)));
    if (currentUser && currentUser.id === sub.userId) {
      setCurrentUser({ ...currentUser, kycStatus: 'verified' });
    }

    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: sub.userId,
      type: 'security',
      title: 'KYC Verification Approved ✅',
      message: 'Your identity documents have been verified. Full banking limits unlocked.',
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    addAuditLog('ADMIN_APPROVED_KYC', 'admin', `Admin approved KYC for user ${sub.userId}`);
    showToast('KYC Approved', 'User identity status set to VERIFIED.');
  };

  const adminRejectKYC = (submissionId: string, reason: string) => {
    const sub = kycSubmissions.find((k) => k.id === submissionId);
    if (!sub) return;

    setKycSubmissions((prev) =>
      prev.map((k) => (k.id === submissionId ? { ...k, status: 'rejected', rejectionReason: reason, reviewedAt: new Date().toISOString() } : k))
    );

    setUsers((prev) => prev.map((u) => (u.id === sub.userId ? { ...u, kycStatus: 'rejected' } : u)));
    if (currentUser && currentUser.id === sub.userId) {
      setCurrentUser({ ...currentUser, kycStatus: 'rejected' });
    }

    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: sub.userId,
      type: 'security',
      title: 'KYC Verification Update',
      message: `KYC document review returned with note: "${reason}". Please resubmit clear documentation.`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    addAuditLog('ADMIN_REJECTED_KYC', 'admin', `Admin rejected KYC for user ${sub.userId}: ${reason}`);
    showToast('KYC Rejected', 'User notified to resubmit.', 'warning');
  };

  // CSV Export for Ledger
  const exportTransactionsCSV = () => {
    const headers = ['Transaction ID', 'Date', 'Type', 'Description', 'Account', 'Amount USD', 'Fee USD', 'Status'];
    const rows = transactions.map((t) => [
      t.referenceNumber,
      new Date(t.createdAt).toLocaleDateString(),
      t.type.toUpperCase(),
      `"${t.description.replace(/"/g, '""')}"`,
      `"${(t.accountName || '').replace(/"/g, '""')}"`,
      t.amount.toFixed(2),
      t.fee.toFixed(2),
      t.status.toUpperCase(),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tethra_transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV Exported', 'Transaction statement downloaded successfully.');
  };

  // Reset Data
  const resetAllDemoData = () => {
    localStorage.clear();
    setConfig(INITIAL_CONFIG);
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[0]);
    setAccounts(INITIAL_ACCOUNTS);
    setTransactions(INITIAL_TRANSACTIONS);
    setDeposits([]);
    setWithdrawals([
      {
        id: 'wd_init_01',
        referenceNumber: 'THR-WD-000102',
        userId: 'usr_001',
        accountId: 'acc_01',
        method: 'us_bank_transfer',
        amount: 750.0,
        currency: 'USD',
        fee: 3.75,
        netAmount: 746.25,
        destinationDetails: {
          bankName: 'JPMorgan Chase Bank, N.A.',
          accountHolder: 'Alexander Vance',
          accountNumber: '****4821',
          routingNumber: '021000021',
        },
        status: 'completed',
        estimatedCompletion: '1-3 Business Days',
        createdAt: '2026-02-26T14:30:00Z',
        processedAt: '2026-02-28T09:00:00Z',
      },
    ]);
    setSavingsGoals(INITIAL_SAVINGS_GOALS);
    setPersonalExpenses(INITIAL_PERSONAL_EXPENSES);
    setSharedGroups(INITIAL_GROUPS);
    setGroupExpenses(INITIAL_GROUP_EXPENSES);
    setCryptoAssets(INITIAL_CRYPTO_ASSETS);
    setCryptoHoldings(INITIAL_CRYPTO_HOLDINGS);
    setReferrals(INITIAL_REFERRALS);
    setConnections(INITIAL_CONNECTIONS);
    setPlatformActivities(INITIAL_PLATFORM_ACTIVITIES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSupportTickets(INITIAL_SUPPORT_TICKETS);
    setKycSubmissions([INITIAL_KYC_SUBMISSION]);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    showToast('Demo Data Reset', 'All records restored to baseline production state.');
  };

  const updateConfig = (newConfig: Partial<SystemConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig, lastUpdated: new Date().toISOString() }));
    showToast('System Settings Saved', 'Global platform parameters updated.');
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        publicSubPage,
        setPublicSubPage,
        searchQuery,
        setSearchQuery,
        currentUser,
        setCurrentUser,
        users,
        login,
        register,
        checkAvailability,
        logout,
        switchUser,
        updateProfile,
        toggle2FA,
        config,
        updateConfig,
        selectedCurrency,
        setSelectedCurrency,
        formatMoney,
        convertFromUSD,
        convertToUSD,
        accounts,
        createAccount,
        transferFunds,
        transferInternal: (fromId: string, toId: string, amt: number | string, desc?: string) =>
          transferFunds(fromId, toId, Number(amt), desc || 'Internal Transfer'),
        sendP2PFunds,
        gifts,
        giftPresets: GIFT_PRESETS,
        sendGift,
        lastBonusClaimDate,
        canClaimDailyBonus,
        timeUntilNextBonus,
        claimDailyBonus,
        transactions,
        exportTransactionsCSV,
        deposits,
        withdrawals,
        requestDeposit,
        requestWithdrawal,
        adminApproveDeposit,
        adminApproveWithdrawal,
        adminRejectWithdrawal,
        adminApproveAllPendingWithdrawals,
        approveWithdrawal: adminApproveWithdrawal,
        rejectWithdrawal: adminRejectWithdrawal,
        adminAddFunds,
        adminDeductFunds,
        adminSetAccountBalance,
        adminApproveBonus,
        adminRejectBonus,
        adminIssueCustomBonus,
        adminBatchApproveBonuses,
        adminDistributeDailyBonusToAllUsers,
        adminToggleAccountStatus,
        adminUpdateUserKYC,
        adminDeleteUser,
        savingsGoals,
        createSavingsGoal,
        contributeToGoal,
        withdrawFromGoal,
        personalExpenses,
        expenses: personalExpenses,
        addPersonalExpense,
        addExpense: (exp: any) => addPersonalExpense(exp),
        sharedGroups,
        groupExpenses,
        createSharedGroup,
        addGroupExpense,
        calculateGroupSettlements,
        earnings: {
          today: 18.42,
          thisWeek: 124.6,
          thisMonth: 532.18,
          totalEarned: 3490.0,
        },
        cryptoAssets,
        cryptoHoldings,
        addCryptoHolding,
        referrals,
        connections,
        platformActivities,
        platformFeed: platformActivities,
        sendConnectionRequest,
        acceptConnectionRequest,
        removeConnection,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        supportTickets,
        createSupportTicket,
        replySupportTicket,
        addTicketReply: replySupportTicket,
        kycSubmissions,
        submitKYC,
        adminApproveKYC,
        adminRejectKYC,
        approveKYC: adminApproveKYC,
        rejectKYC: adminRejectKYC,
        auditLogs,
        addAuditLog,
        resetAllDemoData,
        triggerCelebration,
        activeToast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
