import React, { useState } from 'react';
import {
  Database,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Tag,
  Users,
  Eye,
  X,
  FileText,
  ShieldCheck,
  Table,
  Plus
} from 'lucide-react';
import { MOCK_DATASETS } from '../mock';
import { Dataset } from '../types';

export const CatalogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  const domains = ['ALL', 'Finance', 'Healthcare', 'Customer Success', 'Supply Chain'];

  const filteredDatasets = MOCK_DATASETS.filter(ds => {
    const matchesSearch = ds.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ds.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ds.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDomain = selectedDomain === 'ALL' || ds.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <Database className="w-6 h-6 text-brand-400" />
            <span>Enterprise Data Catalog</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Search, discover, and inspect schema structures, ownership metadata, and privacy tags across registered organizational datasets.
          </p>
        </div>

        <button className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg shadow-glow-brand transition-all flex items-center space-x-2 self-start md:self-auto">
          <Plus className="w-4 h-4" />
          <span>Register New Dataset</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filter datasets by name, tag, or description..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Domain:</span>
          <div className="flex space-x-1">
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedDomain === d ? 'bg-brand-600 text-white font-semibold' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Datasets Table */}
      <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="p-4">Dataset Name & Domain</th>
              <th className="p-4">Data Source</th>
              <th className="p-4">Row Count & Size</th>
              <th className="p-4">Quality Score</th>
              <th className="p-4">Sensitivity / Risk</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-xs">
            {filteredDatasets.map(ds => (
              <tr key={ds.id} className="hover:bg-slate-900/50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-slate-100 flex items-center space-x-2">
                    <span>{ds.name}</span>
                    {ds.isCertified && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{ds.description}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {ds.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-200 border border-slate-800 font-mono text-[11px]">
                    {ds.dataSource}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">{ds.environment}</div>
                </td>
                <td className="p-4 font-mono text-slate-300">
                  <div>{(ds.rowCount / 1e6).toFixed(2)}M rows</div>
                  <div className="text-[10px] text-slate-500">{(ds.sizeBytes / (1024 * 1024 * 1024)).toFixed(2)} GB</div>
                </td>
                <td className="p-4 font-mono font-bold">
                  <span className={`text-xs ${ds.qualityScore > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {ds.qualityScore}%
                  </span>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${
                      ds.sensitivityLevel === 'CRITICAL_PII' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {ds.sensitivityLevel}
                    </span>
                    <div className="text-[10px] text-slate-400 font-medium">Risk: {ds.riskLevel}</div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedDataset(ds)}
                    className="px-3 py-1.5 bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 border border-brand-500/30 rounded-lg text-xs font-semibold transition-colors inline-flex items-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Schema</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dataset Schema Slide-Over Drawer */}
      {selectedDataset && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-3xl glass-panel h-full border-l border-slate-800 p-6 overflow-y-auto space-y-6">
            
            {/* Drawer Top Bar */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-extrabold text-white">{selectedDataset.name}</h2>
                  {selectedDataset.isCertified && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div className="text-xs text-slate-400 mt-1">{selectedDataset.dataSource} • {selectedDataset.domain} • {selectedDataset.environment}</div>
              </div>
              <button
                onClick={() => setSelectedDataset(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400">Quality Score</div>
                <div className="text-lg font-extrabold text-emerald-400 mt-1">{selectedDataset.qualityScore}%</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400">Sensitivity Level</div>
                <div className="text-xs font-extrabold text-rose-400 mt-2">{selectedDataset.sensitivityLevel}</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400">Data Owners</div>
                <div className="text-xs font-semibold text-slate-200 mt-2">{selectedDataset.owners.map(o => o.name).join(', ')}</div>
              </div>
            </div>

            {/* Schema Columns Table */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Table className="w-4 h-4 text-brand-400" />
                <span>Column Schema Inspection & PII Badges</span>
              </h3>

              {selectedDataset.tables.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800">
                  Schema metadata available upon connecting real database driver.
                </div>
              ) : (
                selectedDataset.tables.map(tbl => (
                  <div key={tbl.id} className="glass-card rounded-xl overflow-hidden border border-slate-800">
                    <div className="p-3 bg-slate-900/90 text-xs font-bold text-slate-300 border-b border-slate-800">
                      Table: <span className="font-mono text-brand-400">{tbl.tableName}</span> ({tbl.rowCount.toLocaleString()} rows)
                    </div>
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-[10px] text-slate-400 bg-slate-950/60 uppercase">
                          <th className="p-2.5">Column Name</th>
                          <th className="p-2.5">Data Type</th>
                          <th className="p-2.5">Sensitivity</th>
                          <th className="p-2.5">Completeness</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono">
                        {tbl.columns.map(col => (
                          <tr key={col.id} className="hover:bg-slate-800/40">
                            <td className="p-2.5 text-slate-200 font-semibold">
                              {col.name}
                              {col.isPrimaryKey && <span className="ml-1 text-[9px] text-amber-400 font-sans">[PK]</span>}
                            </td>
                            <td className="p-2.5 text-slate-400">{col.dataType}</td>
                            <td className="p-2.5 font-sans">
                              <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                                col.sensitivityLevel === 'CRITICAL_PII' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-400'
                              }`}>
                                {col.sensitivityLevel}
                              </span>
                            </td>
                            <td className="p-2.5 text-emerald-400">{col.completenessScore}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
