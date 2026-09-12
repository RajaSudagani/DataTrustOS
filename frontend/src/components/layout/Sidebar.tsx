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
        { id: 'risk', label: 'Data Risk Center', icon: ShieldAlert, badge: 'CRITICAL' },
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
    <aside className="w-68 md:w-72 bg-black border-r border-zinc-800 flex flex-col h-screen sticky top-0 select-none flex-shrink-0">
      
      {/* Brand Header */}
      <div className="h-18 px-5 border-b border-zinc-800/90 flex items-center space-x-3.5 flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-black flex-shrink-0 shadow">
          <Database className="w-5 h-5 text-black" />
        </div>
        <div>
          <div className="text-lg font-black tracking-tight text-white leading-none">
            DataTrust<span className="text-zinc-400">OS</span>
          </div>
          <div className="text-[11px] text-zinc-500 font-mono mt-1">v1.0 • Enterprise Platform</div>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="px-3 text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
              {group.title}
            </div>
            {group.items.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all group ${
                    isActive
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/90 font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0 pr-2">
                    <Icon className={`w-4.5 h-4.5 flex-shrink-0 transition-colors ${
                      isActive ? 'text-black' : 'text-zinc-500 group-hover:text-zinc-200'
                    }`} />
                    <span className="truncate leading-tight">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-[10px] font-extrabold tracking-wide rounded-md flex-shrink-0 ${
                      isActive
                        ? 'bg-black text-white'
                        : item.badge === 'CRITICAL'
                        ? 'bg-rose-950/90 text-rose-300 border border-rose-800/80'
                        : item.badge === 'ML'
                        ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
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
      <div className="p-4 border-t border-zinc-800/90 bg-zinc-950 text-xs flex-shrink-0">
        <div className="flex items-center justify-between text-zinc-400 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-bold text-zinc-200">Local Engine Active</span>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </div>
        <div className="mt-1.5 text-[11px] text-zinc-500">100% Offline • Zero External Keys</div>
      </div>

    </aside>
  );
};
