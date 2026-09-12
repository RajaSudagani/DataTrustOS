import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, TrendingUp, Lock } from 'lucide-react';
import { MOCK_DATASETS } from '../mock';

export const RiskPage: React.FC = () => {
  return (
    <div className="w-full p-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2.5">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          <span>Unified Enterprise Data Risk Center</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Aggregated risk scores derived from dataset sensitivity, missing stewards, quality SLA failures, schema instability, and unencrypted PII exposure.
        </p>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 p-5 rounded-xl border border-rose-950">
          <div className="text-xs font-medium text-rose-300">Critical Risk Score Assets</div>
          <div className="text-3xl font-bold text-rose-400 mt-2">1 Dataset</div>
          <div className="text-[11px] text-rose-400/80 mt-1">Patient Telemetry (Risk Score: 89.0)</div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl border border-amber-950">
          <div className="text-xs font-medium text-amber-300">High PII Exposure Warning</div>
          <div className="text-3xl font-bold text-amber-400 mt-2">2 Datasets</div>
          <div className="text-[11px] text-amber-400/80 mt-1">Unencrypted SSN & Financial Telemetry</div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <div className="text-xs font-medium text-zinc-400">Governance Remediation SLA</div>
          <div className="text-3xl font-bold text-emerald-400 mt-2">24 Hours</div>
          <div className="text-[11px] text-zinc-500 mt-1">Automated escalation enabled</div>
        </div>
      </div>

      {/* Dataset Risk Radar Table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-4 border-b border-zinc-800 bg-zinc-950 font-bold text-sm text-white">
          Asset Risk Assessment Matrix
        </div>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-800 text-[10px] text-zinc-400 bg-zinc-950 uppercase">
              <th className="p-4">Dataset Name</th>
              <th className="p-4">Domain & Source</th>
              <th className="p-4">Sensitivity</th>
              <th className="p-4">Risk Score</th>
              <th className="p-4">Primary Risk Factors</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {MOCK_DATASETS.map(ds => (
              <tr key={ds.id} className="hover:bg-zinc-800/40">
                <td className="p-4 font-bold text-white">{ds.name}</td>
                <td className="p-4 text-zinc-300">{ds.domain} • {ds.dataSource}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    ds.sensitivityLevel === 'CRITICAL_PII' ? 'bg-rose-950/80 text-rose-300 border border-rose-800' : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
                  }`}>
                    {ds.sensitivityLevel}
                  </span>
                </td>
                <td className="p-4 font-mono font-bold">
                  <span className={ds.riskScore > 70 ? 'text-rose-400' : ds.riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'}>
                    {ds.riskScore} / 100
                  </span>
                </td>
                <td className="p-4 text-zinc-400 text-[11px]">
                  {ds.riskScore > 70 ? 'Direct PHI telemetry without masking' : 'Quarterly close audit dependency'}
                </td>
                <td className="p-4 text-right">
                  <button className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 rounded text-xs font-semibold transition-colors">
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
