import React from 'react';
import { Search, Bell, Shield, Moon, Sun, ChevronDown, User as UserIcon, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useTenant } from '../../context/TenantContext';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onNavigate: (pageId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette, onNavigate }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { activeTenant, tenants, switchTenant } = useTenant();

  return (
    <header className="sticky top-0 z-30 h-20 bg-black border-b border-zinc-800/90 px-8 flex items-center justify-between">
      
      {/* Search Trigger */}
      <div className="flex items-center space-x-4 flex-1 max-w-2xl">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 hover:bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-300 hover:text-white transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Search className="w-4 h-4 text-zinc-400" />
            <span className="text-sm">Search datasets, lineage nodes, quality rules, PII tags...</span>
          </div>
          <kbd className="px-2 py-0.5 text-xs bg-zinc-800 border border-zinc-700 rounded text-zinc-300 font-mono font-bold">Ctrl + K</kbd>
        </button>
      </div>

      {/* Right Action Icons & Controls */}
      <div className="flex items-center space-x-4">
        
        {/* Backend API Connection Status Badge */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-xs text-zinc-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold">API: FastAPI :8000</span>
        </div>

        {/* Tenant Selector Dropdown */}
        <div className="relative group">
          <button className="flex items-center space-x-2 px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-semibold text-zinc-200 hover:bg-zinc-800 transition-colors">
            <Building2 className="w-4 h-4 text-zinc-400" />
            <span>{activeTenant.name}</span>
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          </button>
          
          <div className="absolute right-0 mt-1 w-64 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl hidden group-hover:block p-1.5 z-40">
            <div className="px-3 py-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wider">Organization Tenant</div>
            {tenants.map(t => (
              <button
                key={t.id}
                onClick={() => switchTenant(t.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between ${
                  t.id === activeTenant.id ? 'bg-white text-black font-bold' : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className={`text-xs ${t.id === activeTenant.id ? 'text-zinc-700' : 'text-zinc-500'}`}>{t.code} • {t.region}</div>
                </div>
                {t.id === activeTenant.id && <span className="w-2 h-2 rounded-full bg-black" />}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Button */}
        <button 
          onClick={() => onNavigate('notifications')}
          className="relative p-2.5 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors border border-zinc-800"
          title="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2.5 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors border border-zinc-800"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun className="w-4.5 h-4.5 text-zinc-200" /> : <Moon className="w-4.5 h-4.5 text-zinc-400" />}
        </button>

        <div className="h-5 w-px bg-zinc-800" />

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-8.5 h-8.5 rounded-xl bg-zinc-800 p-0.5 border border-zinc-700">
            <img src={user?.avatarUrl} alt={user?.name} className="w-full h-full rounded-lg object-cover" />
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-sm font-bold text-white leading-tight">{user?.name}</div>
            <div className="text-xs text-zinc-400 flex items-center space-x-1 mt-0.5 font-medium">
              <Shield className="w-3.5 h-3.5 text-zinc-300 inline" />
              <span>{user?.role}</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
