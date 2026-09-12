import React from 'react';
import { FileCheck2, CheckCircle2, Shield, AlertTriangle, FileText } from 'lucide-react';
import { MOCK_COMPLIANCE_CONTROLS, MOCK_AUDIT_LOGS } from '../mock';

export const CompliancePage: React.FC = () => {
  return (
    <div className="w-full p-6 space-y-6 animate-in fade-in duration-300">
      
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2.5">
          <FileCheck2 className="w-5 h-5 text-white" />
          <span>Compliance Frameworks & Audit Evidence Locker</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Automated compliance tracking against GDPR, SOC2, HIPAA, and ISO27001 regulatory frameworks with immutable evidence collection.
        </p>
      </div>

      {/* Framework Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">GDPR Compliance</span>
            <span className="text-xs font-extrabold text-emerald-400">100% PASS</span>
          </div>
          <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
            <div className="bg-white h-full w-full" />
          </div>
          <div className="text-[11px] text-zinc-400">12 Audit Evidence Artifacts Collected</div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">SOC 2 Type II</span>
            <span className="text-xs font-extrabold text-emerald-400">100% PASS</span>
          </div>
          <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
            <div className="bg-white h-full w-full" />
          </div>
          <div className="text-[11px] text-zinc-400">8 Technical Controls Verified</div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">HIPAA Security Rule</span>
            <span className="text-xs font-extrabold text-amber-400">PARTIAL (75%)</span>
          </div>
          <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
            <div className="bg-amber-400 h-full w-[75%]" />
          </div>
          <div className="text-[11px] text-zinc-400">1 Action Item Pending Audit Log Archival</div>
        </div>
      </div>

      {/* Controls Table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-4 border-b border-zinc-800 bg-zinc-950 font-bold text-sm text-white">
          Configured Regulatory Controls & Technical Safeguards
        </div>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-800 text-[10px] text-zinc-400 bg-zinc-950 uppercase">
              <th className="p-4">Control Code</th>
              <th className="p-4">Title & Framework</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Evidence Items</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {MOCK_COMPLIANCE_CONTROLS.map(c => (
              <tr key={c.id} className="hover:bg-zinc-800/40">
                <td className="p-4 font-mono font-bold text-white">{c.code}</td>
                <td className="p-4">
                  <div className="font-bold text-zinc-200">{c.title}</div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 font-mono border border-zinc-800">{c.framework}</span>
                </td>
                <td className="p-4 text-zinc-400 max-w-sm">{c.description}</td>
                <td className="p-4 font-bold">
                  <span className={`px-2.5 py-1 rounded text-[10px] ${
                    c.status === 'COMPLIANT' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-right font-mono font-bold text-zinc-300">
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
