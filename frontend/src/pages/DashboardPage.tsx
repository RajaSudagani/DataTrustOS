import React from 'react';
import {
  Database,
  ShieldCheck,
  ShieldAlert,
  GitFork,
  Activity,
  ArrowUpRight,
  Sparkles,
  Search,
  Users,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_DATASETS, MOCK_QUALITY_ISSUES, MOCK_AUDIT_LOGS } from '../mock';

const qualityTrendData = [
  { date: 'Sep 06', avgScore: 89.2, piiDetected: 12, qualityIncidents: 4 },
  { date: 'Sep 07', avgScore: 91.0, piiDetected: 14, qualityIncidents: 3 },
  { date: 'Sep 08', avgScore: 90.5, piiDetected: 14, qualityIncidents: 5 },
  { date: 'Sep 09', avgScore: 93.4, piiDetected: 18, qualityIncidents: 2 },
  { date: 'Sep 10', avgScore: 92.8, piiDetected: 22, qualityIncidents: 1 },
  { date: 'Sep 11', avgScore: 94.1, piiDetected: 25, qualityIncidents: 1 },
  { date: 'Sep 12', avgScore: 94.8, piiDetected: 28, qualityIncidents: 0 },
];

const riskDistributionData = [
  { name: 'Low Risk', value: 45, color: '#10b981' },
  { name: 'Medium Risk', value: 30, color: '#f59e0b' },
  { name: 'High Risk', value: 18, color: '#f97316' },
  { name: 'Critical PII', value: 7, color: '#f43f5e' },
];

interface DashboardPageProps {
  onNavigate: (pageId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto p-8 md:p-10 space-y-8 md:space-y-10 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-brand-500/20 bg-gradient-to-r from-brand-950/60 via-slate-900 to-indigo-950/50 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
        <div className="space-y-3 max-w-2xl z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Local AI & Rule Engine Active</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
            DataTrustOS Enterprise Governance Dashboard
          </h1>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Continuous metadata discovery, PII classification, data quality profiling, and automated policy enforcement across enterprise data assets.
          </p>
        </div>

        <div className="flex items-center space-x-3.5 z-10 flex-shrink-0">
          <button
            onClick={() => onNavigate('catalog')}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-glow-brand transition-all flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Explore Catalog</span>
          </button>
          <button
            onClick={() => onNavigate('risk')}
            className="px-5 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold rounded-xl transition-all flex items-center space-x-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Risk Center</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Registered Datasets</span>
            <div className="p-2.5 bg-brand-500/10 rounded-xl text-brand-400">
              <Database className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-white">4</div>
            <div className="flex items-center text-xs text-emerald-400 font-bold">
              <ArrowUpRight className="w-4 h-4 mr-0.5" /> +12.5%
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">350.1M Records Profiled</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Average Quality Score</span>
            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-emerald-400">92.8%</div>
            <div className="flex items-center text-xs text-emerald-400 font-bold">
              <ArrowUpRight className="w-4 h-4 mr-0.5" /> +1.4%
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">3 Active Rule Assertions</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Critical PII Fields</span>
            <div className="p-2.5 bg-rose-500/10 rounded-xl text-rose-400">
              <ShieldAlert className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-rose-400">3</div>
            <div className="flex items-center text-xs text-rose-400 font-bold">
              <span>High Sensitivity</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">SSN, Email, Financial Telemetry</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Lineage Nodes Mapped</span>
            <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400">
              <GitFork className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-indigo-300">6</div>
            <div className="flex items-center text-xs text-indigo-400 font-bold">
              <span>Full Graph</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">5 Lineage Dependency Edges</div>
        </div>

      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quality Trend Chart */}
        <div className="lg:col-span-2 glass-panel p-7 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2.5">
                <Activity className="w-5 h-5 text-brand-400" />
                <span>Enterprise Data Quality Trend (7-Day SLA)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">Average accuracy and completeness score across all data assets</p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-slate-800/90 text-xs font-mono text-slate-300 border border-slate-700">Real-time SLA</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={qualityTrendData}>
                <defs>
                  <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} domain={[80, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="avgScore" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorQuality)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Donut */}
        <div className="glass-panel p-7 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between shadow-xl">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2.5">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>Dataset Risk Classification</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Risk profiles based on sensitivity and quality</p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={6}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            {riskDistributionData.map(r => (
              <div key={r.name} className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
                <span className="text-slate-300 text-xs font-medium">{r.name} ({r.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Datasets & Open Incidents Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Top Datasets Preview */}
        <div className="glass-panel p-7 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2.5">
              <Database className="w-5 h-5 text-brand-400" />
              <span>Registered Enterprise Datasets</span>
            </h3>
            <button onClick={() => onNavigate('catalog')} className="text-xs text-brand-400 hover:underline font-bold">View All →</button>
          </div>

          <div className="divide-y divide-slate-800/80">
            {MOCK_DATASETS.slice(0, 3).map(ds => (
              <div key={ds.id} className="py-4 flex items-center justify-between hover:bg-slate-900/50 px-3 rounded-xl transition-colors">
                <div>
                  <div className="text-xs font-bold text-slate-100 flex items-center space-x-2">
                    <span>{ds.name}</span>
                    {ds.isCertified && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{ds.dataSource} • {ds.domain} • {(ds.rowCount / 1e6).toFixed(1)}M rows</div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-emerald-400">{ds.qualityScore}% Quality</div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md mt-1 inline-block ${
                    ds.riskLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {ds.riskLevel} RISK
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log Preview */}
        <div className="glass-panel p-7 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2.5">
              <Users className="w-5 h-5 text-indigo-400" />
              <span>Recent Governance Audit Stream</span>
            </h3>
            <button onClick={() => onNavigate('compliance')} className="text-xs text-brand-400 hover:underline font-bold">Full Audit Trail →</button>
          </div>

          <div className="divide-y divide-slate-800/80">
            {MOCK_AUDIT_LOGS.map(log => (
              <div key={log.id} className="py-4 flex items-start justify-between px-3">
                <div>
                  <div className="text-xs font-bold text-slate-200">{log.action}</div>
                  <div className="text-xs text-slate-400 mt-1">{log.actorName} ({log.actorEmail}) • Target: {log.targetResource}</div>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
