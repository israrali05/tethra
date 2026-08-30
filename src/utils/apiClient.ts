/**
 * Tethra Enterprise Banking & Ledger API Client
 * Interfaces React frontend with Express /api/v1/* REST endpoints.
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  [key: string]: any;
}

export const apiClient = {
  // Check backend server health
  async checkHealth(): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/v1/health');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Get Live FX Rates
  async getRates(): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/v1/rates');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Get Live Crypto Market Rates
  async getCryptoMarket(): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/v1/crypto/market');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // User Login
  async login(identifier: string, pin?: string, twoFactorCode?: string): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, pin, twoFactorCode }),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // User Registration
  async register(data: {
    email: string;
    phone?: string;
    firstName: string;
    lastName: string;
    username?: string;
    pin?: string;
    country?: string;
    city?: string;
    referralCode?: string;
  }): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Get User Balance & Accounts
  async getUserBalance(userId: string): Promise<ApiResponse> {
    try {
      const res = await fetch(`/api/v1/user/balance/${userId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Get User Accounts
  async getAccounts(userId: string): Promise<ApiResponse> {
    try {
      const res = await fetch(`/api/v1/accounts/${userId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Create Financial Account
  async createAccount(data: {
    userId: string;
    name: string;
    type: string;
    currency: string;
    initialDeposit?: number;
  }): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/v1/accounts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Get Transactions
  async getTransactions(userId: string): Promise<ApiResponse> {
    try {
      const res = await fetch(`/api/v1/transactions/${userId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Submit P2P or Internal Transfer
  async submitTransfer(data: {
    fromUserId: string;
    fromAccountId: string;
    toRecipient: string;
    amount: number;
    description?: string;
  }): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/v1/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Submit Deposit
  async submitDeposit(data: {
    userId: string;
    accountId: string;
    method: string;
    amount: number;
    currency: string;
    txHash?: string;
    bankReference?: string;
    senderBankName?: string;
    proofUrl?: string;
    notes?: string;
  }): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/v1/deposit/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Submit Withdrawal
  async submitWithdrawal(data: {
    userId: string;
    accountId: string;
    method: string;
    amount: number;
    destinationDetails: any;
    notes?: string;
  }): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/v1/withdraw/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Submit Tier 2 KYC
  async submitKYC(data: {
    userId: string;
    fullName: string;
    dateOfBirth: string;
    nationality: string;
    idType: string;
    idNumber: string;
    addressLine1: string;
    city: string;
    postalCode: string;
    country: string;
    ssnOrTaxId?: string;
    idFrontUrl?: string;
    idBackUrl?: string;
    selfieUrl?: string;
    proofOfAddressUrl?: string;
  }): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/v1/kyc/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Get KYC Status
  async getKYC(userId: string): Promise<ApiResponse> {
    try {
      const res = await fetch(`/api/v1/kyc/${userId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Claim Daily 2% Yield Bonus
  async claimDailyBonus(userId: string): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/v1/daily-bonus/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Update Profile
  async updateProfile(data: {
    userId: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    country?: string;
    city?: string;
    address?: string;
  }): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/v1/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Get Admin Dashboard Stats
  async getAdminDashboard(): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/v1/admin/dashboard');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};
