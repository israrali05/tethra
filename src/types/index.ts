export type UserRole = 'user' | 'admin' | 'compliance_manager';

export type KYCStatus = 'not_started' | 'pending' | 'verified' | 'rejected';

export type ProfilePrivacy = 'public' | 'connections_only' | 'private';

export interface User {
  id: string;
  uniqueUserId: string; // e.g. TETHRA-100001
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  dateOfBirth: string;
  referralCode: string; // e.g. TETHRA-A8F29K
  referredByCode?: string;
  role: UserRole;
  avatarUrl: string;
  privacy: ProfilePrivacy;
  emailVerified: boolean;
  phoneVerified: boolean;
  kycStatus: KYCStatus;
  twoFactorEnabled: boolean;
  createdAt: string;
  lastLoginAt?: string;
  isDemoUser?: boolean;
}

export type AccountType = 'checking' | 'savings' | 'investment' | 'crypto' | 'cash' | 'custom';

export interface FinancialAccount {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  currency: string;
  balance: number;
  accountNumber: string; // e.g. TR-8940-2391-4401
  status: 'active' | 'frozen' | 'closed';
  createdAt: string;
  lastActivityAt: string;
}

export type TransactionType =
  | 'deposit'
  | 'withdrawal'
  | 'transfer'
  | 'p2p_transfer'
  | 'gift_sent'
  | 'gift_received'
  | 'daily_bonus'
  | 'income'
  | 'expense'
  | 'investment'
  | 'referral_reward'
  | 'savings_deposit'
  | 'savings_withdrawal'
  | 'yield_earning';

export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'rejected' | 'cancelled';

export interface Transaction {
  id: string;
  referenceNumber: string; // e.g. THR-TX-984021
  userId: string;
  accountId: string;
  accountName?: string;
  type: TransactionType;
  amount: number;
  currency: string;
  fee: number;
  description: string;
  status: TransactionStatus;
  category?: string;
  merchant?: string;
  recipientAccount?: string;
  senderAccount?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type DepositMethod = 'bank_transfer' | 'usdt_trc20' | 'usdt_erc20' | 'payment_provider';

export interface DepositRequest {
  id: string;
  referenceNumber: string; // e.g. THR-DP-002491
  userId: string;
  accountId: string;
  method: DepositMethod;
  amount: number;
  currency: string;
  fee: number;
  netAmount: number;
  status: 'pending' | 'under_review' | 'approved' | 'completed' | 'rejected';
  txHash?: string;
  bankReference?: string;
  senderBankName?: string;
  senderAccountName?: string;
  depositAddress?: string;
  proofUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
}

export type WithdrawalMethod = 'us_bank_transfer' | 'crypto_wallet' | 'payment_provider';

export interface WithdrawalRequest {
  id: string;
  referenceNumber: string; // e.g. THR-WD-000102
  userId: string;
  accountId: string;
  method: WithdrawalMethod;
  amount: number;
  currency: string;
  fee: number;
  netAmount: number;
  destinationDetails: {
    bankName?: string;
    accountHolder?: string;
    accountNumber?: string;
    routingNumber?: string;
    walletAddress?: string;
    cryptoNetwork?: string;
    providerEmail?: string;
  };
  status: 'pending' | 'processing' | 'completed' | 'rejected' | 'cancelled';
  notes?: string;
  rejectionReason?: string;
  estimatedCompletion: string;
  createdAt: string;
  processedAt?: string;
}

export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  category: 'Emergency Fund' | 'Travel' | 'Education' | 'Retirement' | 'Home' | 'Car' | 'Custom';
  targetAmount: number;
  currentAmount: number;
  currency: string;
  targetDate: string;
  monthlyContribution: number;
  isAutoContribute: boolean;
  createdAt: string;
}

export interface PersonalExpense {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  category:
    | 'Food & Dining'
    | 'Housing & Rent'
    | 'Transport & Fuel'
    | 'Shopping'
    | 'Healthcare'
    | 'Education'
    | 'Entertainment'
    | 'Travel'
    | 'Bills & Utilities'
    | 'Subscriptions'
    | 'Other';
  merchant: string;
  date: string;
  notes?: string;
  receiptName?: string;
  receiptUrl?: string;
  isRecurring: boolean;
  createdAt: string;
}

export interface SharedGroup {
  id: string;
  name: string;
  type: 'Travel' | 'Roommates' | 'Family' | 'Friends' | 'Team' | 'Project';
  memberUserIds: string[];
  createdBy: string;
  currency: string;
  createdAt: string;
}

export type SharedExpenseGroup = SharedGroup;

export interface GroupExpenseItem {
  id: string;
  groupId: string;
  title: string;
  paidByUserId: string;
  amount: number;
  currency: string;
  splitBetweenUserIds: string[];
  date: string;
  receiptUrl?: string;
  category: string;
  createdAt: string;
}

export interface SettlementDebt {
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  amount: number;
  currency: string;
}

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  sparkline: number[];
  iconUrl?: string;
}

export interface CryptoHolding {
  id: string;
  userId: string;
  assetSymbol: string;
  quantity: number;
  avgBuyPrice: number;
}

export interface ReferralRecord {
  id: string;
  referrerUserId: string;
  referredUserId: string;
  referredName: string;
  referredEmail: string;
  joinedDate: string;
  status: 'pending' | 'qualified' | 'rewarded';
  qualificationCriteria: string;
  rewardAmount: number;
  currency: string;
  paidAt?: string;
}

export interface UserConnection {
  id: string;
  requesterId: string;
  targetId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'blocked';
  createdAt: string;
  updatedAt: string;
}

export interface PlatformActivity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  actionText: string; // e.g. "created an Emergency Savings Goal" (no financial balances!)
  timestamp: string;
}

export type NotificationType =
  | 'deposit'
  | 'withdrawal'
  | 'transaction'
  | 'referral'
  | 'connection'
  | 'security'
  | 'system'
  | 'support'
  | 'reward';

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface SupportTicketReply {
  id: string;
  sender: 'user' | 'support_specialist' | 'admin';
  senderName: string;
  message: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string; // e.g. TETH-SUP-1092
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  category:
    | 'Account & Profile'
    | 'Deposit Inquiry'
    | 'Withdrawal Status'
    | 'Transaction Query'
    | 'Security & 2FA'
    | 'KYC Verification'
    | 'Referral Reward'
    | 'Technical Issue'
    | 'Banking & Payouts'
    | 'General'
    | string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_user' | 'resolved' | 'closed';
  replies: SupportTicketReply[];
  createdAt: string;
  updatedAt: string;
}

export interface KYCSubmission {
  id: string;
  userId: string;
  legalFirstName: string;
  legalLastName: string;
  dateOfBirth: string;
  nationality: string;
  idType: 'passport' | 'national_id' | 'drivers_license';
  idNumber: string;
  residentialAddress: string;
  city: string;
  country: string;
  postalCode: string;
  idFrontDocName?: string;
  idBackDocName?: string;
  proofOfAddressDocName?: string;
  selfieDocName?: string;
  status: KYCStatus;
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
}

export interface AuditLog {
  id: string;
  userId?: string;
  userName?: string;
  action: string;
  ipAddress: string;
  userAgent: string;
  details: string;
  category: 'auth' | 'financial' | 'security' | 'admin' | 'kyc';
  timestamp: string;
}

export interface SystemConfig {
  siteName: string;
  siteUrl: string;
  demoMode: boolean;
  referralRewardAmount: number;
  referralRewardCurrency: string;
  referralQualificationRequirement: string;
  illustrativeSavingsRateAPY: number; // e.g. 5.4% configured
  savingsApyRate?: number;
  supportedCurrencies: string[];
  depositFeePercentage: number;
  withdrawalFeePercentage: number;
  minWithdrawalUSD: number;
  maxWithdrawalUSD: number;
  dailyWithdrawalCap?: number;
  kycEnforced?: boolean;
  usBankEstimatedProcessingDays: string; // e.g. "1-3 Business Days"
  riskDisclosureText: string;
  lastUpdated: string;
}

export interface GiftPreset {
  id: string;
  name: string;
  emoji: string;
  amount: number; // in USD
  color: string;
  description: string;
}

export interface UserGift {
  id: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar?: string;
  toUserId: string;
  toUserName: string;
  toUserAvatar?: string;
  giftName: string;
  giftEmoji: string;
  amount: number;
  currency: string;
  message?: string;
  createdAt: string;
}

export type AppRoute =
  | 'home'
  | 'about'
  | 'security-policy'
  | 'press'
  | 'faq'
  | 'terms'
  | 'privacy'
  | 'contact'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'accounts'
  | 'deposit'
  | 'withdraw'
  | 'p2p-transfer'
  | 'gifts'
  | 'daily-bonus'
  | 'transactions'
  | 'earnings'
  | 'savings'
  | 'expenses'
  | 'groups'
  | 'crypto'
  | 'referrals'
  | 'connections'
  | 'kyc'
  | 'security'
  | 'support'
  | 'profile'
  | 'backend-console'
  | 'admin-dashboard';

export type ExpenseCategory =
  | 'Dining'
  | 'Housing'
  | 'Travel'
  | 'Utilities'
  | 'Subscriptions'
  | 'Shopping'
  | 'Healthcare'
  | 'Other';

export interface BankPreset {
  id: string;
  name: string;
  region: 'USA' | 'Europe' | 'UK' | 'Global';
  country: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'SGD' | 'AED' | 'CHF' | 'USDT';
  codeType: 'Routing' | 'SortCode' | 'IBAN_BIC' | 'SWIFT' | 'Crypto';
  sampleCode?: string;
  settlementSpeed: string;
  supportedMethods: ('ACH' | 'FedWire' | 'SEPA' | 'SEPA_Instant' | 'FasterPayments' | 'BACS' | 'SWIFT' | 'Crypto')[];
  icon?: string;
}

export interface AdminAdjustmentRecord {
  id: string;
  targetUserId: string;
  targetUserName: string;
  targetAccountId: string;
  accountName: string;
  action: 'credit' | 'debit' | 'set_balance';
  amount: number;
  previousBalance: number;
  newBalance: number;
  category: string;
  notes: string;
  adminId: string;
  adminName: string;
  referenceNumber: string;
  createdAt: string;
}

