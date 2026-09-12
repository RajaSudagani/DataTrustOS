import React, { useState, useEffect } from 'react';
import { Search, Database, ShieldAlert, GitFork, Award, FileText, X, ArrowRight } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (pageId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { id: 'catalog', title: 'Customer Global Master Directory', type: 'Dataset', icon: Database, category: 'Data Catalog' },
    { id: 'quality', title: 'Customer Email Syntax & Null Check', type: 'Quality Rule', icon: ShieldAlert, category: 'Data Quality' },
    { id: 'lineage', title: 'customer_profiles → dbt_anonymize_pii', type: 'Lineage Edge', icon: GitFork, category: 'Data Lineage' },
    { id: 'governance', title: 'GDPR Article 17 Erasure Policy', type: 'Policy', icon: Award, category: 'Governance' },
    { id: 'compliance', title: 'SOC2-CC6.1 Logical Access Controls', type: 'Compliance', icon: FileText, category: 'Compliance' },
  ];

  const filteredActions = query
    ? quickActions.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase()))
    : quickActions;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl glass-panel rounded-xl shadow-2xl border border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            placeholder="Search datasets, schema fields, quality rules, PII tags, policies... (Press Esc to close)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-200 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-800/50">
          {filteredActions.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-sm">
              No matching datasets, policies or rules found for "{query}"
            </div>
          ) : (
            filteredActions.map(action => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    onNavigate(action.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 hover:bg-slate-800/70 rounded-lg group transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-200 group-hover:text-white">{action.title}</div>
                      <div className="text-xs text-slate-400">{action.category} • <span className="text-brand-400">{action.type}</span></div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-brand-400 transition-colors" />
                </button>
              );
            })
          )}
        </div>

        {/* Keyboard shortcut footer */}
        <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Tip: Navigate using <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">↑</kbd> <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">↓</kbd></span>
          <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-300">Ctrl + K</kbd> to toggle</span>
        </div>
      </div>
    </div>
  );
};
