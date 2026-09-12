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
    <div className="w-full p-6 space-y-6 animate-in fade-in duration-300">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2.5">
            <BarChart3 className="w-5 h-5 text-white" />
            <span>Executive Analytics & Custom Report Generator</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Generate printable PDF/CSV data governance posture reports, domain growth metrics, and quality SLA compliance breakdowns.
          </p>
        </div>

        <button className="px-4 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold rounded-lg transition-all flex items-center space-x-2 shadow">
          <Download className="w-4 h-4" />
          <span>Export Governance Report</span>
        </button>
      </div>

      {/* Domain Growth Chart */}
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Registered Data Volumes & Record Counts by Organizational Domain</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={domainAnalyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="domain" stroke="#71717a" fontSize={11} />
              <YAxis stroke="#71717a" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }} />
              <Bar dataKey="rowCountM" fill="#ffffff" radius={[4, 4, 0, 0]} name="Record Volume (Millions)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
