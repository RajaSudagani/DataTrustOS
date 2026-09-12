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
    <aside className="w-64 bg-black border-r border-zinc-800/90 flex flex-col h-screen sticky top-0 select-none flex-shrink-0">
      
      {/* Brand Header */}
      <div className="h-16 flex items-center px-5 border-b border-zinc-800/90 space-x-3">
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black flex-shrink-0">
          <Database className="w-4.5 h-4.5 text-black" />
        </div>
        <div>
          <div className="text-base font-extrabold tracking-tight text-white">
            DataTrust<span className="text-zinc-400">OS</span>
          </div>
          <div className="text-[10px] text-zinc-500 font-mono">v1.0 • Enterprise Core</div>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
              {group.title}
            </div>
            {group.items.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-white text-black font-bold shadow'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-black' : 'text-zinc-500 group-hover:text-zinc-300'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded flex-shrink-0 ${
                      isActive
                        ? 'bg-black text-white'
                        : item.badge === 'CRITICAL'
                        ? 'bg-rose-950/80 text-rose-400 border border-rose-800/80'
                        : 'bg-zinc-850 text-zinc-400 border border-zinc-800'
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
      <div className="p-3.5 border-t border-zinc-800/90 bg-zinc-950 text-xs">
        <div className="flex items-center justify-between text-zinc-400 text-[11px]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-zinc-300">Local Engine</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
        </div>
        <div className="mt-1 text-[10px] text-zinc-500">100% Offline • Zero Keys</div>
      </div>

    </aside>
  );
};
