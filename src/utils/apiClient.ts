/**
 * Tethra Full-Stack Banking API Client
 * Seamlessly interfaces React frontend with Express backend endpoints.
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
      const res = await fetch('/api/health');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err: any) {
      console.warn('API Health check failed:', err.message);
      return { success: false, error: err.message };
    }
  },

  // Get live platform status & reserve metrics
  async getSystemStatus(): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/system/status');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // User Login
  async login(identifier: string, pin?: string): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, pin }),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // User Registration
  async register(data: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    pin?: string;
    referralCode?: string;
  }): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Get Wallet
  async getWallet(userId: string): Promise<ApiResponse> {
    try {
      const res = await fetch(`/api/wallet/${userId}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Submit Deposit
  async submitDeposit(data: {
    userId: string;
    amount: number;
    currency: string;
    method: string;
    proofUrl?: string;
  }): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/wallet/deposit', {
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
    amount: number;
    currency: string;
    method: string;
    destination: string;
    pin: string;
  }): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Create 24-Hour 2% USDT Staking Position
  async createInvestment(userId: string, amount: number): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/investments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount }),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // List User Investments
  async getUserInvestments(userId: string): Promise<ApiResponse> {
    try {
      const res = await fetch(`/api/investments/${userId}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Trigger manual 2% yield compound tick
  async triggerYieldCompoundTick(): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/investments/compound-tick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Get Referrals Stats
  async getReferrals(userId: string): Promise<ApiResponse> {
    try {
      const res = await fetch(`/api/referrals/${userId}`);
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Admin Overview
  async getAdminOverview(): Promise<ApiResponse> {
    try {
      const res = await fetch('/api/admin/overview');
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  // Admin Approve Deposit
  async approveDeposit(depositId: string): Promise<ApiResponse> {
    try {
      const res = await fetch(`/api/admin/deposits/${depositId}/approve`, {
        method: 'POST',
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};
