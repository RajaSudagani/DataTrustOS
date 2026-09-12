import React, { useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Filter,
  Layers,
  Sparkles,
  X
} from 'lucide-react';
import { MOCK_QUALITY_RULES, MOCK_QUALITY_ISSUES } from '../mock';
import { QualityRule } from '../types';

export const QualityPage: React.FC = () => {
  const [rules, setRules] = useState<QualityRule[]>(MOCK_QUALITY_RULES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [ruleName, setRuleName] = useState('');
  const [datasetName, setDatasetName] = useState('Customer Global Master Directory');
  const [columnName, setColumnName] = useState('');
  const [ruleType, setRuleType] = useState<QualityRule['ruleType']>('NULL_CHECK');
  const [severity, setSeverity] = useState<QualityRule['severity']>('CRITICAL');

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleName) return;

    const newRule: QualityRule = {
      id: `qr_${Date.now()}`,
      name: ruleName,
      datasetId: 'ds_cust_prod_01',
      datasetName,
      columnName: columnName || undefined,
      ruleType,
      parameters: {},
      severity,
      isActive: true,
      lastExecutionStatus: 'PASSED',
      lastRunAt: new Date().toISOString()
    };

    setRules([newRule, ...rules]);
    setIsModalOpen(false);
    setRuleName('');
    setColumnName('');
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span>Data Quality Engine & Assertion Hub</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure declarative data quality rules, execute statistical assertions, and monitor automated health scorecards.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold rounded-lg transition-all flex items-center space-x-2">
            <Play className="w-4 h-4" />
            <span>Run All Quality Rules</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg shadow-glow-brand transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Build Quality Rule</span>
          </button>
        </div>
      </div>

      {/* Scorecard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-xl border border-slate-800">
          <div className="text-xs font-medium text-slate-400">Quality Health Score</div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2">94.8%</div>
          <div className="text-[11px] text-slate-500 mt-1">Target SLA: 90.0% Passed</div>
        </div>

        <div className="glass-card p-5 rounded-xl border border-slate-800">
          <div className="text-xs font-medium text-slate-400">Active Configured Rules</div>
          <div className="text-3xl font-extrabold text-white mt-2">{rules.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Across 4 Enterprise Datasets</div>
        </div>

        <div className="glass-card p-5 rounded-xl border border-slate-800">
          <div className="text-xs font-medium text-slate-400">Open Quality Incidents</div>
          <div className="text-3xl font-extrabold text-amber-400 mt-2">{MOCK_QUALITY_ISSUES.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">Requires Steward Review</div>
        </div>
      </div>

      {/* Rules Table */}
      <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden space-y-4">
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Layers className="w-4 h-4 text-brand-400" />
            <span>Configured Quality Rules & Assertions</span>
          </h3>
          <span className="text-xs text-slate-400">{rules.length} rules active</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] text-slate-400 bg-slate-950/40 uppercase">
              <th className="p-4">Rule Name</th>
              <th className="p-4">Dataset & Column</th>
              <th className="p-4">Type</th>
              <th className="p-4">Severity</th>
              <th className="p-4">Last Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rules.map(rule => (
              <tr key={rule.id} className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-slate-100">{rule.name}</td>
                <td className="p-4">
                  <div className="text-slate-300">{rule.datasetName}</div>
                  <div className="text-[10px] font-mono text-brand-400">{rule.columnName || 'All Columns'}</div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                    {rule.ruleType}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    rule.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {rule.severity}
                  </span>
                </td>
                <td className="p-4">
                  <span className="flex items-center space-x-1 text-emerald-400 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{rule.lastExecutionStatus}</span>
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-medium transition-colors">
                    Run Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rule Builder Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg glass-panel p-6 rounded-2xl border border-slate-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-brand-400" />
                <span>Create Data Quality Assertion Rule</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Rule Name</label>
                <input
                  type="text"
                  placeholder="e.g. Email Syntax Validation Assertion"
                  value={ruleName}
                  onChange={e => setRuleName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Column Name</label>
                <input
                  type="text"
                  placeholder="e.g. email_address"
                  value={columnName}
                  onChange={e => setColumnName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Assertion Type</label>
                  <select
                    value={ruleType}
                    onChange={e => setRuleType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-brand-500"
                  >
                    <option value="NULL_CHECK">Null Check</option>
                    <option value="REGEX_MATCH">Regex Pattern Match</option>
                    <option value="UNIQUE_CHECK">Unique Assertion</option>
                    <option value="RANGE_VALIDATION">Range Validation</option>
                    <option value="STATISTICAL_OUTLIER">Statistical Outlier</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Severity Level</label>
                  <select
                    value={severity}
                    onChange={e => setSeverity(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-brand-500"
                  >
                    <option value="CRITICAL">Critical</option>
                    <option value="WARNING">Warning</option>
                    <option value="INFO">Info</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-semibold shadow-glow-brand"
                >
                  Save Quality Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
