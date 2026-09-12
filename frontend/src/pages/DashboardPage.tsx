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
  { name: 'Low Risk', value: 45, color: '#e4e4e7' },
  { name: 'Medium Risk', value: 30, color: '#a1a1aa' },
  { name: 'High Risk', value: 18, color: '#71717a' },
  { name: 'Critical PII', value: 7, color: '#f43f5e' },
];

interface DashboardPageProps {
  onNavigate: (pageId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full p-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-white" />
            <span>Local AI & Rule Engine Active</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            DataTrustOS Enterprise Governance Dashboard
          </h1>
          <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
            Continuous metadata discovery, PII classification, data quality profiling, and automated policy enforcement across enterprise data assets.
          </p>
        </div>

        <div className="flex items-center space-x-3.5 flex-shrink-0">
          <button
            onClick={() => onNavigate('catalog')}
            className="px-5 py-2.5 bg-white hover:bg-zinc-200 text-black text-sm font-extrabold rounded-xl transition-all flex items-center space-x-2.5 shadow-lg"
          >
            <Search className="w-4 h-4" />
            <span>Explore Catalog</span>
          </button>
          <button
            onClick={() => onNavigate('risk')}
            className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 text-sm font-bold rounded-xl transition-all flex items-center space-x-2.5 shadow-sm"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Risk Center</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-zinc-900/90 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-300">Total Registered Datasets</span>
            <div className="p-2.5 bg-zinc-800 rounded-xl text-white">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold text-white">4</div>
            <div className="flex items-center text-sm text-zinc-300 font-bold">
              <ArrowUpRight className="w-4 h-4 mr-0.5" /> +12.5%
            </div>
          </div>
          <div className="text-xs text-zinc-400">350.1M Records Profiled</div>
        </div>

        <div className="bg-zinc-900/90 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-300">Average Quality Score</span>
            <div className="p-2.5 bg-zinc-800 rounded-xl text-white">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold text-white">92.8%</div>
            <div className="flex items-center text-sm text-emerald-400 font-bold">
              <ArrowUpRight className="w-4 h-4 mr-0.5" /> +1.4%
            </div>
          </div>
          <div className="text-xs text-zinc-400">3 Active Rule Assertions</div>
        </div>

        <div className="bg-zinc-900/90 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-300">Critical PII Fields</span>
            <div className="p-2.5 bg-zinc-800 rounded-xl text-white">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold text-rose-400">3</div>
            <div className="flex items-center text-xs text-rose-300 font-bold bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
              <span>High Sensitivity</span>
            </div>
          </div>
          <div className="text-xs text-zinc-400">SSN, Email, Financial Telemetry</div>
        </div>

        <div className="bg-zinc-900/90 p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-300">Lineage Nodes Mapped</span>
            <div className="p-2.5 bg-zinc-800 rounded-xl text-white">
              <GitFork className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-bold text-white">6</div>
            <div className="flex items-center text-xs text-zinc-300 font-semibold">
              <span>Full Graph</span>
            </div>
          </div>
          <div className="text-xs text-zinc-400">5 Lineage Dependency Edges</div>
        </div>

      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quality Trend Chart */}
        <div className="lg:col-span-2 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2.5">
                <Activity className="w-5 h-5 text-zinc-400" />
                <span>Enterprise Data Quality Trend (7-Day SLA)</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">Average accuracy and completeness score across all data assets</p>
            </div>
            <span className="px-3 py-1 rounded-lg bg-zinc-800 text-xs font-mono text-zinc-200 border border-zinc-700 font-bold">Real-time SLA</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={qualityTrendData}>
                <defs>
                  <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" stroke="#a1a1aa" fontSize={12} />
                <YAxis stroke="#a1a1aa" fontSize={12} domain={[80, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', color: '#f4f4f5', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="avgScore" stroke="#ffffff" strokeWidth={2.5} fillOpacity={1} fill="url(#colorQuality)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution Donut */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2.5">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>Dataset Risk Classification</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">Risk profiles based on sensitivity and quality</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            {riskDistributionData.map(r => (
              <div key={r.name} className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                <span className="text-zinc-200 text-xs font-semibold">{r.name} ({r.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Datasets & Open Incidents Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Datasets Preview */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2.5">
              <Database className="w-5 h-5 text-zinc-400" />
              <span>Registered Enterprise Datasets</span>
            </h3>
            <button onClick={() => onNavigate('catalog')} className="text-xs text-zinc-200 hover:text-white underline font-bold">View All →</button>
          </div>

          <div className="divide-y divide-zinc-800">
            {MOCK_DATASETS.slice(0, 3).map(ds => (
              <div key={ds.id} className="py-3.5 flex items-center justify-between hover:bg-zinc-800/50 px-3 rounded-xl transition-colors">
                <div>
                  <div className="text-sm font-bold text-white flex items-center space-x-2">
                    <span>{ds.name}</span>
                    {ds.isCertified && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">{ds.dataSource} • {ds.domain} • {(ds.rowCount / 1e6).toFixed(1)}M rows</div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-emerald-400">{ds.qualityScore}% Quality</div>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md mt-1 inline-block ${
                    ds.riskLevel === 'CRITICAL' ? 'bg-rose-950/80 text-rose-300 border border-rose-800' : 'bg-zinc-800 text-zinc-200'
                  }`}>
                    {ds.riskLevel} RISK
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log Preview */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2.5">
              <Users className="w-5 h-5 text-zinc-400" />
              <span>Recent Governance Audit Stream</span>
            </h3>
            <button onClick={() => onNavigate('compliance')} className="text-xs text-zinc-200 hover:text-white underline font-bold">Full Audit Trail →</button>
          </div>

          <div className="divide-y divide-zinc-800">
            {MOCK_AUDIT_LOGS.map(log => (
              <div key={log.id} className="py-3.5 flex items-start justify-between px-3">
                <div>
                  <div className="text-sm font-bold text-zinc-100">{log.action}</div>
                  <div className="text-xs text-zinc-400 mt-1">{log.actorName} ({log.actorEmail}) • Target: {log.targetResource}</div>
                </div>
                <div className="text-xs font-mono text-zinc-400 font-semibold">
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
