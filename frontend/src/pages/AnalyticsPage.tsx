import React from 'react';
import { BarChart3, Download, Filter, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const domainAnalyticsData = [
  { domain: 'Finance', totalDatasets: 12, rowCountM: 140, avgQuality: 98.4 },
  { domain: 'Healthcare', totalDatasets: 8, rowCountM: 250, avgQuality: 91.2 },
  { domain: 'Customer', totalDatasets: 18, rowCountM: 85, avgQuality: 94.8 },
  { domain: 'Supply Chain', totalDatasets: 6, rowCountM: 45, avgQuality: 88.5 },
];

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-300">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-brand-400" />
            <span>Executive Analytics & Custom Report Generator</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate printable PDF/CSV data governance posture reports, domain growth metrics, and quality SLA compliance breakdowns.
          </p>
        </div>

        <button className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg shadow-glow-brand transition-all flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Executive Governance Report</span>
        </button>
      </div>

      {/* Domain Growth Chart */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Registered Data Volumes & Row Counts by Organizational Domain</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={domainAnalyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="domain" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
              <Bar dataKey="rowCountM" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Record Volume (Millions)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
