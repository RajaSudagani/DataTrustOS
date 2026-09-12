import React from 'react';
import { FileCheck2, CheckCircle2, Shield, AlertTriangle, FileText } from 'lucide-react';
import { MOCK_COMPLIANCE_CONTROLS, MOCK_AUDIT_LOGS } from '../mock';

export const CompliancePage: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-300">
      
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <FileCheck2 className="w-6 h-6 text-brand-400" />
          <span>Compliance Frameworks & Audit Evidence Locker</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Automated compliance tracking against GDPR, SOC2, HIPAA, and ISO27001 regulatory frameworks with immutable evidence collection.
        </p>
      </div>

      {/* Framework Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">GDPR Compliance</span>
            <span className="text-xs font-extrabold text-emerald-400">100% PASS</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-full" />
          </div>
          <div className="text-[11px] text-slate-400">12 Audit Evidence Artifacts Collected</div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">SOC 2 Type II</span>
            <span className="text-xs font-extrabold text-emerald-400">100% PASS</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-full" />
          </div>
          <div className="text-[11px] text-slate-400">8 Technical Controls Verified</div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">HIPAA Security Rule</span>
            <span className="text-xs font-extrabold text-amber-400">PARTIAL (75%)</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-[75%]" />
          </div>
          <div className="text-[11px] text-slate-400">1 Action Item Pending Audit Log Archival</div>
        </div>
      </div>

      {/* Controls Table */}
      <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 font-bold text-sm text-white">
          Configured Regulatory Controls & Technical Safeguards
        </div>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] text-slate-400 bg-slate-950/40 uppercase">
              <th className="p-4">Control Code</th>
              <th className="p-4">Title & Framework</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Evidence Items</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {MOCK_COMPLIANCE_CONTROLS.map(c => (
              <tr key={c.id} className="hover:bg-slate-900/40">
                <td className="p-4 font-mono font-bold text-brand-300">{c.code}</td>
                <td className="p-4">
                  <div className="font-bold text-slate-200">{c.title}</div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">{c.framework}</span>
                </td>
                <td className="p-4 text-slate-400 max-w-sm">{c.description}</td>
                <td className="p-4 font-bold">
                  <span className={`px-2.5 py-1 rounded text-[10px] ${
                    c.status === 'COMPLIANT' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-right font-mono font-bold text-slate-300">
                  {c.evidenceCount} Files
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
