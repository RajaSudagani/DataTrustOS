import React from 'react';
import { BookOpen, Terminal, Code, Cpu } from 'lucide-react';

export const DocsPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-300">
      
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-brand-400" />
          <span>Developer & CLI Documentation</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Command line utilities (`datatrust-cli`) and REST API endpoints for automating data governance workflows.
        </p>
      </div>

      {/* CLI Documentation Card */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-brand-400" />
          <span>DataTrustOS CLI Utility Reference</span>
        </h3>

        <div className="bg-slate-900 p-4 rounded-xl font-mono text-xs text-slate-200 border border-slate-800 space-y-3">
          <div>
            <span className="text-slate-500"># 1. Discover local CSV/Parquet files and auto-register schema</span>
            <div className="text-brand-300 mt-1">$ datatrust catalog discover --path ./data/sales_2026.csv --domain "Finance"</div>
          </div>
          <div>
            <span className="text-slate-500"># 2. Execute local statistical quality profiling & null assertions</span>
            <div className="text-brand-300 mt-1">$ datatrust quality run --dataset-id "ds_cust_prod_01" --output json</div>
          </div>
          <div>
            <span className="text-slate-500"># 3. Trigger local NLP PII classification scanner</span>
            <div className="text-brand-300 mt-1">$ datatrust classify scan --dataset-id "ds_cust_prod_01" --model spacy_en_core</div>
          </div>
        </div>
      </div>

      {/* API Reference Card */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Code className="w-4 h-4 text-indigo-400" />
          <span>REST API Endpoints Specification</span>
        </h3>

        <div className="space-y-2 font-mono text-xs">
          <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">GET</span>
              <span className="text-slate-200">/api/v1/catalog/datasets</span>
            </div>
            <span className="text-[11px] text-slate-400 font-sans">List registered datasets with filters</span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-bold">POST</span>
              <span className="text-slate-200">/api/v1/quality/rules</span>
            </div>
            <span className="text-[11px] text-slate-400 font-sans">Create declarative quality rule</span>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">POST</span>
              <span className="text-slate-200">/api/v1/governance/access-requests/{'{id}'}/approve</span>
            </div>
            <span className="text-[11px] text-slate-400 font-sans">Approve dataset access request</span>
          </div>
        </div>
      </div>

    </div>
  );
};
