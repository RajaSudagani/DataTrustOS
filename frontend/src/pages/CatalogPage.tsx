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
    <div className="w-full p-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2.5">
            <Database className="w-5 h-5 text-white" />
            <span>Enterprise Data Catalog</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Search, discover, and inspect schema structures, ownership metadata, and privacy tags across registered organizational datasets.
          </p>
        </div>

        <button className="px-4 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold rounded-lg transition-all flex items-center space-x-2 self-start md:self-auto">
          <Plus className="w-4 h-4" />
          <span>Register New Dataset</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filter datasets by name, tag, or description..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-zinc-400" />
          <span className="text-xs text-zinc-400 font-semibold">Domain:</span>
          <div className="flex space-x-1 overflow-x-auto">
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  selectedDomain === d ? 'bg-white text-black font-bold' : 'bg-zinc-950 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Datasets Table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              <th className="p-4">Dataset Name & Domain</th>
              <th className="p-4">Data Source</th>
              <th className="p-4">Row Count & Size</th>
              <th className="p-4">Quality Score</th>
              <th className="p-4">Sensitivity / Risk</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 text-xs">
            {filteredDatasets.map(ds => (
              <tr key={ds.id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white flex items-center space-x-2">
                    <span>{ds.name}</span>
                    {ds.isCertified && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{ds.description}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {ds.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 bg-zinc-950 text-zinc-300 text-[10px] font-mono rounded border border-zinc-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded bg-zinc-950 text-zinc-200 border border-zinc-800 font-mono text-[11px]">
                    {ds.dataSource}
                  </span>
                  <div className="text-[10px] text-zinc-500 mt-1 font-semibold">{ds.environment}</div>
                </td>
                <td className="p-4 font-mono text-zinc-300">
                  <div className="font-semibold">{(ds.rowCount / 1e6).toFixed(2)}M rows</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">{(ds.sizeBytes / (1024 * 1024 * 1024)).toFixed(2)} GB</div>
                </td>
                <td className="p-4 font-mono font-bold">
                  <span className={`text-xs ${ds.qualityScore > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {ds.qualityScore}%
                  </span>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${
                      ds.sensitivityLevel === 'CRITICAL_PII' ? 'bg-rose-950/80 text-rose-300 border border-rose-800' : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
                    }`}>
                      {ds.sensitivityLevel}
                    </span>
                    <div className="text-[10px] text-zinc-500 font-semibold">Risk: {ds.riskLevel}</div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedDataset(ds)}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center space-x-1.5 border border-zinc-700"
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
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-zinc-950 h-full border-l border-zinc-800 p-6 overflow-y-auto space-y-6">
            
            {/* Drawer Top Bar */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-bold text-white">{selectedDataset.name}</h2>
                  {selectedDataset.isCertified && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div className="text-xs text-zinc-400 mt-1">{selectedDataset.dataSource} • {selectedDataset.domain} • {selectedDataset.environment}</div>
              </div>
              <button
                onClick={() => setSelectedDataset(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <div className="text-xs text-zinc-400">Quality Score</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">{selectedDataset.qualityScore}%</div>
              </div>
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <div className="text-xs text-zinc-400">Sensitivity Level</div>
                <div className="text-xs font-bold text-rose-400 mt-2">{selectedDataset.sensitivityLevel}</div>
              </div>
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                <div className="text-xs text-zinc-400">Data Owners</div>
                <div className="text-xs font-semibold text-zinc-200 mt-2">{selectedDataset.owners.map(o => o.name).join(', ')}</div>
              </div>
            </div>

            {/* Schema Columns Table */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Table className="w-4 h-4 text-white" />
                <span>Column Schema Inspection</span>
              </h3>

              {selectedDataset.tables.length === 0 ? (
                <div className="p-6 text-center text-xs text-zinc-500 bg-zinc-900 rounded-xl border border-zinc-800">
                  Schema metadata available upon connecting real database driver.
                </div>
              ) : (
                selectedDataset.tables.map(tbl => (
                  <div key={tbl.id} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                    <div className="p-3 bg-zinc-950 text-xs font-bold text-zinc-300 border-b border-zinc-800">
                      Table: <span className="font-mono text-white">{tbl.tableName}</span> ({tbl.rowCount.toLocaleString()} rows)
                    </div>
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-zinc-800 text-[10px] text-zinc-500 bg-zinc-950 uppercase">
                          <th className="p-3">Column Name</th>
                          <th className="p-3">Data Type</th>
                          <th className="p-3">Sensitivity</th>
                          <th className="p-3">Completeness</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800 font-mono">
                        {tbl.columns.map(col => (
                          <tr key={col.id} className="hover:bg-zinc-800/40">
                            <td className="p-3 text-zinc-200 font-semibold">
                              {col.name}
                              {col.isPrimaryKey && <span className="ml-1 text-[9px] text-amber-400 font-sans">[PK]</span>}
                            </td>
                            <td className="p-3 text-zinc-400">{col.dataType}</td>
                            <td className="p-3 font-sans">
                              <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                                col.sensitivityLevel === 'CRITICAL_PII' ? 'bg-rose-950/80 text-rose-300' : 'bg-zinc-800 text-zinc-400'
                              }`}>
                                {col.sensitivityLevel}
                              </span>
                            </td>
                            <td className="p-3 text-emerald-400">{col.completenessScore}%</td>
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
