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
    <header className="sticky top-0 z-30 h-16 bg-black border-b border-zinc-800/90 px-6 flex items-center justify-between">
      
      {/* Search Trigger */}
      <div className="flex items-center space-x-4 flex-1 max-w-xl">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-1.5 bg-zinc-900/90 hover:bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <div className="flex items-center space-x-2.5">
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span>Search datasets, lineage nodes, quality rules, PII tags...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-400 font-mono">Ctrl + K</kbd>
        </button>
      </div>

      {/* Right Action Icons & Controls */}
      <div className="flex items-center space-x-3">
        
        {/* Backend API Connection Status Badge */}
        <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 bg-zinc-950 border border-zinc-800 rounded-lg font-mono text-[11px] text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>API: FastAPI :8000</span>
        </div>

        {/* Tenant Selector Dropdown */}
        <div className="relative group">
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-medium text-zinc-200 hover:bg-zinc-800 transition-colors">
            <Building2 className="w-3.5 h-3.5 text-zinc-400" />
            <span>{activeTenant.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>
          
          <div className="absolute right-0 mt-1 w-64 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl hidden group-hover:block p-1.5 z-40">
            <div className="px-3 py-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Organization Tenant</div>
            {tenants.map(t => (
              <button
                key={t.id}
                onClick={() => switchTenant(t.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between ${
                  t.id === activeTenant.id ? 'bg-white text-black font-bold' : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <div>
                  <div>{t.name}</div>
                  <div className={`text-[10px] ${t.id === activeTenant.id ? 'text-zinc-700' : 'text-zinc-500'}`}>{t.code} • {t.region}</div>
                </div>
                {t.id === activeTenant.id && <span className="w-2 h-2 rounded-full bg-black" />}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Button */}
        <button 
          onClick={() => onNavigate('notifications')}
          className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors border border-zinc-800/80"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors border border-zinc-800/80"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-zinc-300" /> : <Moon className="w-4 h-4 text-zinc-400" />}
        </button>

        <div className="h-4 w-px bg-zinc-800" />

        {/* User Profile */}
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-zinc-800 p-0.5 border border-zinc-700">
            <img src={user?.avatarUrl} alt={user?.name} className="w-full h-full rounded object-cover" />
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-white leading-tight">{user?.name}</div>
            <div className="text-[10px] text-zinc-400 flex items-center space-x-1 mt-0.5">
              <Shield className="w-3 h-3 text-zinc-300 inline" />
              <span>{user?.role}</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
