import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { TenantProvider } from './context/TenantContext';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CommandPalette } from './components/common/CommandPalette';

import { DashboardPage } from './pages/DashboardPage';
import { CatalogPage } from './pages/CatalogPage';
import { QualityPage } from './pages/QualityPage';
import { ClassificationPage } from './pages/ClassificationPage';
import { LineagePage } from './pages/LineagePage';
import { GovernancePage } from './pages/GovernancePage';
import { RiskPage } from './pages/RiskPage';
import { IntelligencePage } from './pages/IntelligencePage';
import { CompliancePage } from './pages/CompliancePage';
import { WorkflowsPage } from './pages/WorkflowsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AdminPage } from './pages/AdminPage';
import { DocsPage } from './pages/DocsPage';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentPage} />;
      case 'catalog':
        return <CatalogPage />;
      case 'quality':
        return <QualityPage />;
      case 'classification':
        return <ClassificationPage />;
      case 'lineage':
        return <LineagePage />;
      case 'governance':
        return <GovernancePage />;
      case 'risk':
        return <RiskPage />;
      case 'intelligence':
        return <IntelligencePage />;
      case 'compliance':
        return <CompliancePage />;
      case 'workflows':
      case 'lifecycle':
        return <WorkflowsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'admin':
        return <AdminPage />;
      case 'docs':
        return <DocsPage />;
      default:
        return <DashboardPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TenantProvider>
            <div className="flex min-h-screen bg-slate-950 text-slate-100">
              
              {/* Sidebar Navigation */}
              <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col min-w-0">
                <Header
                  onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
                  onNavigate={setCurrentPage}
                />
                
                <main className="flex-1 overflow-y-auto">
                  {renderPage()}
                </main>
              </div>

              {/* Global Command Palette */}
              <CommandPalette
                isOpen={isCommandPaletteOpen}
                onClose={() => setIsCommandPaletteOpen(false)}
                onNavigate={setCurrentPage}
              />

            </div>
          </TenantProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
