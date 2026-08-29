import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Toast } from './components/common/Toast';
import { DemoBanner } from './components/common/DemoBanner';
import { LiveChatWidget } from './components/common/LiveChatWidget';

// Public Views
import { PublicHeader } from './components/public/PublicHeader';
import { PublicFooter } from './components/public/PublicFooter';
import { HomePage } from './components/public/HomePage';
import { PublicSubPages } from './components/public/PublicSubPages';
import { AuthPages } from './components/public/AuthPages';

// Dashboard Views
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { AccountsView } from './components/dashboard/AccountsView';
import { DepositView } from './components/dashboard/DepositView';
import { WithdrawView } from './components/dashboard/WithdrawView';
import { TransactionsView } from './components/dashboard/TransactionsView';
import { EarningsView } from './components/dashboard/EarningsView';
import { SavingsView } from './components/dashboard/SavingsView';
import { ExpensesView } from './components/dashboard/ExpensesView';
import { GroupsView } from './components/dashboard/GroupsView';
import { CryptoView } from './components/dashboard/CryptoView';
import { ReferralsView } from './components/dashboard/ReferralsView';
import { ConnectionsView } from './components/dashboard/ConnectionsView';
import { KYCView } from './components/dashboard/KYCView';
import { SecurityView } from './components/dashboard/SecurityView';
import { SupportView } from './components/dashboard/SupportView';
import { ProfileSettingsView } from './components/dashboard/ProfileSettingsView';

// Admin & WP Architecture Views
import { AdminPortal } from './components/admin/AdminPortal';
import { WordPressArchitectureView } from './components/admin/WordPressArchitectureView';

const MainRouter: React.FC = () => {
  const { currentRoute, isAuthenticated, toast } = useApp();

  // Public Landing / Sub-pages Routes
  if (
    currentRoute === 'home' ||
    currentRoute === 'about' ||
    currentRoute === 'security-policy' ||
    currentRoute === 'press' ||
    currentRoute === 'faq' ||
    currentRoute === 'terms' ||
    currentRoute === 'privacy' ||
    currentRoute === 'contact'
  ) {
    return (
      <div className="min-h-screen bg-[#031510] text-[#eafaf4] flex flex-col font-sans selection:bg-[#d4af37] selection:text-[#031d16]">
        <DemoBanner />
        <PublicHeader />
        <main className="flex-1">
          {currentRoute === 'home' ? <HomePage /> : <PublicSubPages />}
        </main>
        <PublicFooter />
        <LiveChatWidget />
        <Toast toast={toast} />
      </div>
    );
  }

  // Auth Routes (Login / Register)
  if (currentRoute === 'login' || currentRoute === 'register') {
    return (
      <div className="min-h-screen bg-[#031510] text-[#eafaf4] flex flex-col font-sans selection:bg-[#d4af37] selection:text-[#031d16]">
        <DemoBanner />
        <main className="flex-1 flex items-center justify-center">
          <AuthPages />
        </main>
        <LiveChatWidget />
        <Toast toast={toast} />
      </div>
    );
  }

  // Standalone WordPress Architecture Blueprint View
  if (currentRoute === 'wp-architecture') {
    return (
      <div className="min-h-screen bg-[#031510] text-[#eafaf4] flex flex-col font-sans selection:bg-[#d4af37] selection:text-[#031d16]">
        <DemoBanner />
        <PublicHeader />
        <main className="flex-1 p-6 lg:p-12">
          <WordPressArchitectureView />
        </main>
        <PublicFooter />
        <LiveChatWidget />
        <Toast toast={toast} />
      </div>
    );
  }

  // Authenticated Dashboard Views
  const renderDashboardContent = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <DashboardHome />;
      case 'accounts':
        return <AccountsView />;
      case 'deposit':
        return <DepositView />;
      case 'withdraw':
        return <WithdrawView />;
      case 'transactions':
        return <TransactionsView />;
      case 'earnings':
        return <EarningsView />;
      case 'savings':
        return <SavingsView />;
      case 'expenses':
        return <ExpensesView />;
      case 'groups':
        return <GroupsView />;
      case 'crypto':
        return <CryptoView />;
      case 'referrals':
        return <ReferralsView />;
      case 'connections':
        return <ConnectionsView />;
      case 'kyc':
        return <KYCView />;
      case 'security':
        return <SecurityView />;
      case 'support':
        return <SupportView />;
      case 'profile':
        return <ProfileSettingsView />;
      case 'admin-dashboard':
        return <AdminPortal />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-[#031510] text-[#eafaf4] flex flex-col font-sans selection:bg-[#d4af37] selection:text-[#031d16]">
      <DemoBanner />
      <DashboardLayout>{renderDashboardContent()}</DashboardLayout>
      <LiveChatWidget />
      <Toast toast={toast} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
