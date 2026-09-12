import React from 'react';
import { Workflow, Layers, CheckCircle2, Clock, Plus, Play } from 'lucide-react';

export const WorkflowsPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-300">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <Workflow className="w-6 h-6 text-brand-400" />
            <span>Workflow Engine & Retention Automations</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Design multi-stage data approval chains, automated data quality remediation workflows, and archival jobs.
          </p>
        </div>

        <button className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg shadow-glow-brand transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Visual Workflow</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Dataset Access Approval Chain</h3>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">ACTIVE</span>
          </div>
          <p className="text-xs text-slate-400">Triggers Steward review when access request involves CRITICAL_PII datasets.</p>
          <div className="flex items-center space-x-2 text-xs text-slate-300 font-mono">
            <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">1. Request</span>
            <span>→</span>
            <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">2. Security Audit</span>
            <span>→</span>
            <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">3. Grant Token</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">SOX 7-Year Cold Archival Job</h3>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">SCHEDULED</span>
          </div>
          <p className="text-xs text-slate-400">Automatically compresses and archives general ledger records older than 90 days to local object store.</p>
          <div className="flex items-center space-x-2 text-xs text-slate-300 font-mono">
            <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">1. Extract</span>
            <span>→</span>
            <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">2. Parquet Compress</span>
            <span>→</span>
            <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">3. Verify SHA256</span>
          </div>
        </div>

      </div>

    </div>
  );
};
