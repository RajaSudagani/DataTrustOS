import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, TrendingUp, Lock } from 'lucide-react';
import { MOCK_DATASETS } from '../mock';

export const RiskPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <ShieldAlert className="w-6 h-6 text-rose-400" />
          <span>Unified Enterprise Data Risk Center</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Aggregated risk scores derived from dataset sensitivity, missing stewards, quality SLA failures, schema instability, and unencrypted PII exposure.
        </p>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-xl border border-rose-500/30 bg-rose-950/20">
          <div className="text-xs font-medium text-rose-300">Critical Risk Score Assets</div>
          <div className="text-3xl font-extrabold text-rose-400 mt-2">1 Dataset</div>
          <div className="text-[11px] text-rose-300/70 mt-1">Patient Telemetry (Risk Score: 89.0)</div>
        </div>

        <div className="glass-card p-5 rounded-xl border border-amber-500/30 bg-amber-950/20">
          <div className="text-xs font-medium text-amber-300">High PII Exposure Warning</div>
          <div className="text-3xl font-extrabold text-amber-400 mt-2">2 Datasets</div>
          <div className="text-[11px] text-amber-300/70 mt-1">Unencrypted SSN & Financial Telemetry</div>
        </div>

        <div className="glass-card p-5 rounded-xl border border-slate-800">
          <div className="text-xs font-medium text-slate-400">Governance Remediation SLA</div>
          <div className="text-3xl font-extrabold text-emerald-400 mt-2">24 Hours</div>
          <div className="text-[11px] text-slate-500 mt-1">Automated escalation enabled</div>
        </div>
      </div>

      {/* Dataset Risk Radar Table */}
      <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 font-bold text-sm text-white">
          Asset Risk Assessment Matrix
        </div>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] text-slate-400 bg-slate-950/40 uppercase">
              <th className="p-4">Dataset Name</th>
              <th className="p-4">Domain & Source</th>
              <th className="p-4">Sensitivity</th>
              <th className="p-4">Risk Score</th>
              <th className="p-4">Primary Risk Factors</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {MOCK_DATASETS.map(ds => (
              <tr key={ds.id} className="hover:bg-slate-900/40">
                <td className="p-4 font-bold text-slate-100">{ds.name}</td>
                <td className="p-4 text-slate-300">{ds.domain} • {ds.dataSource}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    ds.sensitivityLevel === 'CRITICAL_PII' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {ds.sensitivityLevel}
                  </span>
                </td>
                <td className="p-4 font-mono font-extrabold">
                  <span className={ds.riskScore > 70 ? 'text-rose-400' : ds.riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'}>
                    {ds.riskScore} / 100
                  </span>
                </td>
                <td className="p-4 text-slate-400 text-[11px]">
                  {ds.riskScore > 70 ? 'Direct PHI telemetry without masking' : 'Quarterly close audit dependency'}
                </td>
                <td className="p-4 text-right">
                  <button className="px-3 py-1 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded text-[11px] font-semibold transition-colors">
                    Mitigate Risk
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
