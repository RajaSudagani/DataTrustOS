import React, { useState } from 'react';
import { Tag, ShieldAlert, CheckCircle2, Lock, Sparkles, Filter, Search } from 'lucide-react';
import { MOCK_PII_FIELDS } from '../mock';
import { PIISensitiveField } from '../types';

export const ClassificationPage: React.FC = () => {
  const [piiFields, setPiiFields] = useState<PIISensitiveField[]>(MOCK_PII_FIELDS);

  const toggleConfirm = (id: string) => {
    setPiiFields(prev =>
      prev.map(f => {
        if (f.id === id) {
          return {
            ...f,
            status: f.status === 'CONFIRMED' ? 'AUTOMATICALLY_DETECTED' : 'CONFIRMED'
          };
        }
        return f;
      })
    );
  };

  return (
    <div className="w-full p-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2.5">
            <Tag className="w-5 h-5 text-white" />
            <span>Sensitive Data Classification & PII Radar</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Deterministic pattern matching and local NLP models continuously detect sensitive attributes (SSN, Email, Financial, PHI) across all datasets.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-lg text-xs font-semibold flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Local NLP Model Active</span>
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <div className="text-xs font-medium text-zinc-400">Total Classified Fields</div>
          <div className="text-2xl font-bold text-white mt-2">182</div>
          <div className="text-[11px] text-zinc-500 mt-1">Across 4 Enterprise Sources</div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <div className="text-xs font-medium text-zinc-400">Critical PII Confirmed</div>
          <div className="text-2xl font-bold text-rose-400 mt-2">3</div>
          <div className="text-[11px] text-rose-400/80 mt-1">SSN, Credit Cards, PHI</div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <div className="text-xs font-medium text-zinc-400">Classification Confidence</div>
          <div className="text-2xl font-bold text-emerald-400 mt-2">98.2%</div>
          <div className="text-[11px] text-zinc-500 mt-1">Local spaCy / Regex Engine</div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <div className="text-xs font-medium text-zinc-400">Masking Policy Coverage</div>
          <div className="text-2xl font-bold text-white mt-2">100%</div>
          <div className="text-[11px] text-zinc-500 mt-1">Enforced at Database Layer</div>
        </div>
      </div>

      {/* PII Detection Table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden space-y-4">
        <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Lock className="w-4 h-4 text-rose-400" />
            <span>Detected Sensitive & PII Field Directory</span>
          </h3>
          <span className="text-xs text-zinc-400">Showing {piiFields.length} critical findings</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-800 text-[10px] text-zinc-400 bg-zinc-950 uppercase">
              <th className="p-4">Dataset Name</th>
              <th className="p-4">Table & Column</th>
              <th className="p-4">Detected PII Category</th>
              <th className="p-4">Model Confidence</th>
              <th className="p-4">Verification Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {piiFields.map(f => (
              <tr key={f.id} className="hover:bg-zinc-800/40">
                <td className="p-4 font-bold text-white">{f.datasetName}</td>
                <td className="p-4 font-mono">
                  <div className="text-zinc-300">{f.tableName}</div>
                  <div className="text-[11px] text-white font-bold">{f.columnName}</div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded bg-rose-950/80 text-rose-300 border border-rose-800 text-[10px] font-bold">
                    {f.category}
                  </span>
                </td>
                <td className="p-4 font-mono font-bold text-emerald-400">
                  {f.confidenceScore}%
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    f.status === 'CONFIRMED' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                  }`}>
                    {f.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => toggleConfirm(f.id)}
                    className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded border border-zinc-700 text-[11px] font-semibold transition-colors"
                  >
                    {f.status === 'CONFIRMED' ? 'Unconfirm' : 'Confirm PII'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
