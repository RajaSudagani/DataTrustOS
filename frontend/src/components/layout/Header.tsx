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
    <header className="sticky top-0 z-30 h-16 glass-panel border-b border-slate-800 px-6 flex items-center justify-between">
      
      {/* Search Trigger */}
      <div className="flex items-center space-x-4 flex-1 max-w-xl">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-1.5 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          <div className="flex items-center space-x-2.5">
            <Search className="w-4 h-4 text-brand-400" />
            <span>Search datasets, lineage, rules, policies...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-xs bg-slate-800 border border-slate-700 rounded text-slate-400">Ctrl + K</kbd>
        </button>
      </div>

      {/* Right Action Icons & Controls */}
      <div className="flex items-center space-x-4">
        
        {/* Tenant Selector Dropdown */}
        <div className="relative group">
          <button className="flex items-center space-x-2 px-3 py-1.5 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-lg text-xs font-medium text-slate-200 transition-colors">
            <Building2 className="w-3.5 h-3.5 text-brand-400" />
            <span>{activeTenant.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          
          <div className="absolute right-0 mt-1 w-64 glass-panel rounded-xl shadow-xl border border-slate-800 hidden group-hover:block p-1.5 z-40">
            <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Select Organization Tenant</div>
            {tenants.map(t => (
              <button
                key={t.id}
                onClick={() => switchTenant(t.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between ${
                  t.id === activeTenant.id ? 'bg-brand-500/20 text-brand-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div>
                  <div>{t.name}</div>
                  <div className="text-[10px] text-slate-500">{t.code} • {t.region}</div>
                </div>
                {t.id === activeTenant.id && <span className="w-2 h-2 rounded-full bg-brand-400 shadow-glow-brand" />}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Button */}
        <button 
          onClick={() => onNavigate('notifications')}
          className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        <div className="h-4 w-px bg-slate-800" />

        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 p-0.5 shadow-md">
            <img src={user?.avatarUrl} alt={user?.name} className="w-full h-full rounded-md object-cover" />
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-slate-200 leading-tight">{user?.name}</div>
            <div className="text-[10px] text-slate-400 flex items-center space-x-1">
              <Shield className="w-3 h-3 text-emerald-400 inline" />
              <span>{user?.role}</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
