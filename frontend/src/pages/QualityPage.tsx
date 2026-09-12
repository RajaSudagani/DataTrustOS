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
  X,
  RefreshCw,
  Activity
} from 'lucide-react';
import { useQualityRules } from '../hooks/useDataTrustApi';
import { MOCK_QUALITY_ISSUES } from '../mock';
import { QualityRule } from '../types';

export const QualityPage: React.FC = () => {
  const { data: backendRules = [], isLoading, refetch } = useQualityRules();
  const [localRules, setLocalRules] = useState<QualityRule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rules = [...backendRules, ...localRules];

  const [ruleName, setRuleName] = useState('');
  const [datasetName, setDatasetName] = useState('Global Financial Ledger Transactions');
  const [columnName, setColumnName] = useState('');
  const [ruleType, setRuleType] = useState<QualityRule['ruleType']>('NULL_CHECK');
  const [severity, setSeverity] = useState<QualityRule['severity']>('CRITICAL');

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleName) return;

    const newRule: QualityRule = {
      id: `qr_${Date.now()}`,
      name: ruleName,
      datasetId: 'ds-fin-001',
      datasetName,
      columnName: columnName || 'amount',
      ruleType,
      parameters: {},
      severity,
      isActive: true,
      lastExecutionStatus: 'PASSED',
      lastRunAt: new Date().toISOString()
    };

    setLocalRules([newRule, ...localRules]);
    setIsModalOpen(false);
    setRuleName('');
    setColumnName('');
  };

  return (
    <div className="w-full p-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Data Quality Engine & Assertion Hub</span>
            <span className="ml-2 px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-[10px] font-mono flex items-center space-x-1">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>FastAPI Quality Engine</span>
            </span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure declarative data quality rules, execute statistical assertions, and monitor automated health scorecards.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => refetch()}
            className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg border border-zinc-800 transition-colors"
            title="Refresh Quality Rules"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold rounded-lg transition-all flex items-center space-x-2 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Build Quality Rule</span>
          </button>
        </div>
      </div>

      {/* Scorecard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <div className="text-xs font-medium text-zinc-400">Quality Health Score</div>
          <div className="text-3xl font-bold text-emerald-400 mt-2">99.4%</div>
          <div className="text-[11px] text-zinc-500 mt-1">Target SLA: 95.0% Passed</div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <div className="text-xs font-medium text-zinc-400">Active Configured Rules</div>
          <div className="text-3xl font-bold text-white mt-2">{rules.length}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Synchronized with FastAPI DB</div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <div className="text-xs font-medium text-zinc-400">Open Quality Incidents</div>
          <div className="text-3xl font-bold text-amber-400 mt-2">{MOCK_QUALITY_ISSUES.length}</div>
          <div className="text-[11px] text-zinc-500 mt-1">Requires Steward Review</div>
        </div>
      </div>

      {/* Rules Table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden space-y-4">
        <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Layers className="w-4 h-4 text-white" />
            <span>Configured Quality Rules & Assertions</span>
          </h3>
          <span className="text-xs text-zinc-400">{rules.length} rules active</span>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-xs text-zinc-400 flex items-center justify-center space-x-2">
            <RefreshCw className="w-4 h-4 animate-spin text-white" />
            <span>Fetching quality assertion rules from backend API...</span>
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-[10px] text-zinc-400 bg-zinc-950 uppercase">
                <th className="p-4">Rule Name</th>
                <th className="p-4">Dataset & Column</th>
                <th className="p-4">Type</th>
                <th className="p-4">Severity</th>
                <th className="p-4">Last Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {rules.map(rule => (
                <tr key={rule.id} className="hover:bg-zinc-800/40">
                  <td className="p-4 font-bold text-white">{rule.name}</td>
                  <td className="p-4">
                    <div className="text-zinc-300">{rule.datasetName || 'Global Financial Ledger'}</div>
                    <div className="text-[10px] font-mono text-zinc-400">{rule.columnName || 'All Columns'}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800 font-mono text-[10px]">
                      {rule.ruleType}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rule.severity === 'CRITICAL' ? 'bg-rose-950/80 text-rose-300 border border-rose-800' : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                    }`}>
                      {rule.severity}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center space-x-1 text-emerald-400 font-semibold text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{rule.lastExecutionStatus || 'PASSED'}</span>
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 rounded text-xs font-semibold transition-colors">
                      Run Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Rule Builder Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span>Create Data Quality Assertion Rule</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Rule Name</label>
                <input
                  type="text"
                  placeholder="e.g. Email Syntax Validation Assertion"
                  value={ruleName}
                  onChange={e => setRuleName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-zinc-500"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Target Column Name</label>
                <input
                  type="text"
                  placeholder="e.g. email_address"
                  value={columnName}
                  onChange={e => setColumnName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Assertion Type</label>
                  <select
                    value={ruleType}
                    onChange={e => setRuleType(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-zinc-500"
                  >
                    <option value="NULL_CHECK">Null Check</option>
                    <option value="REGEX_MATCH">Regex Pattern Match</option>
                    <option value="UNIQUE_CHECK">Unique Assertion</option>
                    <option value="RANGE_VALIDATION">Range Validation</option>
                    <option value="STATISTICAL_OUTLIER">Statistical Outlier</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Severity Level</label>
                  <select
                    value={severity}
                    onChange={e => setSeverity(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-zinc-500"
                  >
                    <option value="CRITICAL">Critical</option>
                    <option value="WARNING">Warning</option>
                    <option value="INFO">Info</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-lg font-semibold border border-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-white hover:bg-zinc-200 text-black rounded-lg font-bold shadow"
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

