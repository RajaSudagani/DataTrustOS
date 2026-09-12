import React from 'react';
import { BookOpen, Terminal, Code, Cpu } from 'lucide-react';

export const DocsPage: React.FC = () => {
  return (
    <div className="w-full p-6 space-y-6 animate-in fade-in duration-300">
      
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2.5">
          <BookOpen className="w-5 h-5 text-white" />
          <span>Developer & CLI Documentation</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Command line utilities (`datatrust-cli`) and REST API endpoints for automating data governance workflows.
        </p>
      </div>

      {/* CLI Documentation Card */}
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-white" />
          <span>DataTrustOS CLI Utility Reference</span>
        </h3>

        <div className="bg-zinc-950 p-4 rounded-xl font-mono text-xs text-zinc-200 border border-zinc-800 space-y-3">
          <div>
            <span className="text-zinc-500"># 1. Discover local CSV/Parquet files and auto-register schema</span>
            <div className="text-white mt-1">$ datatrust catalog discover --path ./data/sales_2026.csv --domain "Finance"</div>
          </div>
          <div>
            <span className="text-zinc-500"># 2. Execute local statistical quality profiling & null assertions</span>
            <div className="text-white mt-1">$ datatrust quality run --dataset-id "ds_cust_prod_01" --output json</div>
          </div>
          <div>
            <span className="text-zinc-500"># 3. Trigger local NLP PII classification scanner</span>
            <div className="text-white mt-1">$ datatrust classify scan --dataset-id "ds_cust_prod_01" --model spacy_en_core</div>
          </div>
        </div>
      </div>

      {/* API Reference Card */}
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Code className="w-4 h-4 text-white" />
          <span>REST API Endpoints Specification</span>
        </h3>

        <div className="space-y-2 font-mono text-xs">
          <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 font-bold">GET</span>
              <span className="text-zinc-200">/api/v1/catalog/datasets</span>
            </div>
            <span className="text-[11px] text-zinc-400 font-sans">List registered datasets with filters</span>
          </div>

          <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-white font-bold">POST</span>
              <span className="text-zinc-200">/api/v1/quality/rules</span>
            </div>
            <span className="text-[11px] text-zinc-400 font-sans">Create declarative quality rule</span>
          </div>

          <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-amber-400 font-bold">POST</span>
              <span className="text-zinc-200">/api/v1/governance/access-requests/{'{id}'}/approve</span>
            </div>
            <span className="text-[11px] text-zinc-400 font-sans">Approve dataset access request</span>
          </div>
        </div>
      </div>

    </div>
  );
};
