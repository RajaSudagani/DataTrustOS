import React from 'react';
import { Workflow, Layers, CheckCircle2, Clock, Plus, Play } from 'lucide-react';

export const WorkflowsPage: React.FC = () => {
  return (
    <div className="w-full p-6 space-y-6 animate-in fade-in duration-300">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2.5">
            <Workflow className="w-5 h-5 text-white" />
            <span>Workflow Engine & Retention Automations</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Design multi-stage data approval chains, automated data quality remediation workflows, and archival jobs.
          </p>
        </div>

        <button className="px-4 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold rounded-lg transition-all flex items-center space-x-2 shadow">
          <Plus className="w-4 h-4" />
          <span>New Visual Workflow</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Dataset Access Approval Chain</h3>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-bold">ACTIVE</span>
          </div>
          <p className="text-xs text-zinc-400">Triggers Steward review when access request involves CRITICAL_PII datasets.</p>
          <div className="flex items-center space-x-2 text-xs text-zinc-300 font-mono">
            <span className="px-2.5 py-1 bg-zinc-950 rounded border border-zinc-800">1. Request</span>
            <span>→</span>
            <span className="px-2.5 py-1 bg-zinc-950 rounded border border-zinc-800">2. Audit</span>
            <span>→</span>
            <span className="px-2.5 py-1 bg-zinc-950 rounded border border-zinc-800">3. Grant Token</span>
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">SOX 7-Year Cold Archival Job</h3>
            <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 text-[10px] font-bold">SCHEDULED</span>
          </div>
          <p className="text-xs text-zinc-400">Automatically compresses and archives general ledger records older than 90 days to local object store.</p>
          <div className="flex items-center space-x-2 text-xs text-zinc-300 font-mono">
            <span className="px-2.5 py-1 bg-zinc-950 rounded border border-zinc-800">1. Extract</span>
            <span>→</span>
            <span className="px-2.5 py-1 bg-zinc-950 rounded border border-zinc-800">2. Compress</span>
            <span>→</span>
            <span className="px-2.5 py-1 bg-zinc-950 rounded border border-zinc-800">3. SHA256</span>
          </div>
        </div>

      </div>

    </div>
  );
};
