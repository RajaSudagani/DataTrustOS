import React from 'react';
import {
  LayoutDashboard,
  Database,
  ShieldCheck,
  Tag,
  GitFork,
  Scale,
  ShieldAlert,
  Brain,
  FileCheck2,
  Workflow,
  BarChart3,
  Settings,
  BookOpen,
  ChevronRight,
  Layers
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const navGroups: NavGroup[] = [
    {
      title: 'CORE PLATFORM',
      items: [
        { id: 'dashboard', label: 'Executive Overview', icon: LayoutDashboard },
        { id: 'catalog', label: 'Data Catalog', icon: Database, badge: '4' },
        { id: 'quality', label: 'Data Quality Hub', icon: ShieldCheck, badge: '94%' },
        { id: 'classification', label: 'PII & Classification', icon: Tag },
        { id: 'lineage', label: 'Data Lineage Studio', icon: GitFork },
      ]
    },
    {
      title: 'GOVERNANCE & RISK',
      items: [
        { id: 'governance', label: 'Governance & Policies', icon: Scale },
        { id: 'risk', label: 'Unified Data Risk Center', icon: ShieldAlert, badge: 'CRITICAL' },
        { id: 'intelligence', label: 'Local AI Intelligence', icon: Brain, badge: 'ML' },
        { id: 'compliance', label: 'Compliance & Audit', icon: FileCheck2 },
      ]
    },
    {
      title: 'OPERATIONS & INSIGHTS',
      items: [
        { id: 'workflows', label: 'Workflows & Approvals', icon: Workflow },
        { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
        { id: 'lifecycle', label: 'Lifecycle & Retention', icon: Layers },
      ]
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { id: 'admin', label: 'Platform Control & RBAC', icon: Settings },
        { id: 'docs', label: 'Developer & CLI Docs', icon: BookOpen },
      ]
    }
  ];

  return (
    <aside className="w-64 lg:w-72 glass-panel border-r border-slate-800/80 flex flex-col h-screen sticky top-0 select-none flex-shrink-0">
      
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800/80 space-x-3.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-glow-brand flex-shrink-0">
          <Database className="w-5.5 h-5.5 text-white" />
        </div>
        <div>
          <div className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-brand-400 bg-clip-text text-transparent">
            DataTrust<span className="text-brand-400">OS</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">v1.0 • Enterprise Core</div>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              {group.title}
            </div>
            {group.items.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30 shadow-glow-brand font-semibold'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full flex-shrink-0 ${
                      item.badge === 'CRITICAL'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : item.badge === 'ML'
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* System Status Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 text-xs">
        <div className="flex items-center justify-between text-slate-400 text-[11px]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-300">Local Engine Active</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        </div>
        <div className="mt-1.5 text-[10px] text-slate-500">100% Offline Capable • Zero External Keys</div>
      </div>

    </aside>
  );
};
