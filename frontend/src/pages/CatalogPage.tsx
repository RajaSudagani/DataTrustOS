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
  Plus,
  Activity,
  RefreshCw
} from 'lucide-react';
import { useDatasets, useRegisterDatasetMutation } from '../hooks/useDataTrustApi';
import { Dataset } from '../types';

export const CatalogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  // Register Modal State
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [regName, setRegName] = useState('');
  const [regDomain, setRegDomain] = useState('FINANCE');
  const [regDataSource, setRegDataSource] = useState('Snowflake DW');
  const [regDescription, setRegDescription] = useState('');

  // Fetch live datasets from FastAPI Backend via React Query hook
  const { data: datasets = [], isLoading, isError, refetch } = useDatasets(selectedDomain);
  const registerMutation = useRegisterDatasetMutation();

  const domains = ['ALL', 'FINANCE', 'CUSTOMER', 'ENGINEERING', 'HEALTHCARE'];

  const filteredDatasets = datasets.filter(ds => {
    const matchesSearch = ds.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (ds.description && ds.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (ds.tags && ds.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesDomain = selectedDomain === 'ALL' || ds.domain.toUpperCase() === selectedDomain.toUpperCase();
    return matchesSearch && matchesDomain;
  });

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) return;
    try {
      await registerMutation.mutateAsync({
        name: regName,
        domain: regDomain,
        dataSource: regDataSource,
        description: regDescription
      });
      setIsRegisterOpen(false);
      setRegName('');
      setRegDescription('');
    } catch (err) {
      alert('Error registering dataset to FastAPI backend database.');
    }
  };

  return (
    <div className="w-full p-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center space-x-3">
            <Database className="w-6 h-6 text-white" />
            <span>Enterprise Data Catalog</span>
            <span className="ml-3 px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>FastAPI Backend Live</span>
            </span>
          </h1>
          <p className="text-sm text-zinc-300 mt-1.5">
            Search, discover, and inspect schema structures, ownership metadata, and privacy tags across registered database tables.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => refetch()}
            className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-xl border border-zinc-800 transition-colors"
            title="Refresh DB State"
          >
            <RefreshCw className={`w-4.5 h-4.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsRegisterOpen(true)}
            className="px-5 py-2.5 bg-white hover:bg-zinc-200 text-black text-sm font-extrabold rounded-xl transition-all flex items-center space-x-2.5 shadow-lg"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Register New Dataset</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="relative flex-1 w-full">
          <Search className="w-4.5 h-4.5 text-zinc-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Filter live backend datasets by name, tag, or description..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-11 pr-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-zinc-400" />
          <span className="text-sm text-zinc-300 font-bold">Domain:</span>
          <div className="flex space-x-1.5 overflow-x-auto">
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedDomain === d ? 'bg-white text-black font-extrabold' : 'bg-zinc-950 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Datasets Table */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
        {isLoading ? (
          <div className="p-16 text-center text-sm text-zinc-300 flex items-center justify-center space-x-3">
            <RefreshCw className="w-5 h-5 animate-spin text-white" />
            <span>Fetching live database catalog records from FastAPI backend...</span>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950 text-xs font-extrabold text-zinc-400 uppercase tracking-wider">
                <th className="p-5">Dataset Name & Domain</th>
                <th className="p-5">Data Source</th>
                <th className="p-5">Row Count & Size</th>
                <th className="p-5">Quality Score</th>
                <th className="p-5">Sensitivity / Risk</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-sm">
              {filteredDatasets.map(ds => (
                <tr key={ds.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-5">
                    <div className="font-bold text-white text-base flex items-center space-x-2">
                      <span>{ds.name}</span>
                      {ds.isCertified && <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1 line-clamp-1">{ds.description || 'No description provided'}</div>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {(ds.tags || [ds.domain, 'SQLITE_SYNC']).map(t => (
                        <span key={t} className="px-2.5 py-1 bg-zinc-950 text-zinc-300 text-xs font-mono rounded-lg border border-zinc-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-950 text-zinc-200 border border-zinc-800 font-mono text-xs font-semibold">
                      {ds.dataSource}
                    </span>
                    <div className="text-xs text-zinc-400 mt-1.5 font-bold">{ds.environment}</div>
                  </td>
                  <td className="p-5 font-mono text-zinc-200 text-xs">
                    <div className="font-bold text-sm">{(ds.rowCount / 1e6).toFixed(2)}M rows</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{(ds.sizeBytes / (1024 * 1024 * 1024)).toFixed(2)} GB</div>
                  </td>
                  <td className="p-5 font-mono font-bold">
                    <span className={`text-sm ${ds.qualityScore > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {ds.qualityScore}%
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="space-y-1.5">
                      <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-lg ${
                        ds.sensitivityLevel === 'RESTRICTED' ? 'bg-rose-950/80 text-rose-300 border border-rose-800' : 'bg-zinc-950 text-zinc-300 border border-zinc-800'
                      }`}>
                        {ds.sensitivityLevel}
                      </span>
                      <div className="text-xs text-zinc-400 font-bold">Risk: {ds.riskLevel}</div>
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <button
                      onClick={() => setSelectedDataset(ds)}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center space-x-2 border border-zinc-700 shadow-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Inspect Schema</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Register Dataset Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Database className="w-4 h-4 text-white" />
                <span>Register Dataset to FastAPI DB</span>
              </h3>
              <button onClick={() => setIsRegisterOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Dataset Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sales Pipeline Records"
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1">Domain</label>
                  <select
                    value={regDomain}
                    onChange={e => setRegDomain(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="FINANCE">FINANCE</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="ENGINEERING">ENGINEERING</option>
                    <option value="HEALTHCARE">HEALTHCARE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-400 mb-1">Data Source</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Snowflake / Postgres"
                    value={regDataSource}
                    onChange={e => setRegDataSource(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe dataset lineage and contents..."
                  value={regDescription}
                  onChange={e => setRegDescription(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(false)}
                  className="px-4 py-2 bg-zinc-900 text-zinc-400 rounded-lg text-xs font-bold hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={registerMutation.isPending}
                  className="px-4 py-2 bg-white text-black rounded-lg text-xs font-bold hover:bg-zinc-200 flex items-center space-x-2"
                >
                  {registerMutation.isPending && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save to SQLite DB</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                <div className="text-xs text-zinc-400 mt-1">
                  {selectedDataset.dataSource} • {selectedDataset.domain} • {selectedDataset.environment}
                </div>
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
                <div className="text-xs text-zinc-400">DB Persistence</div>
                <div className="text-xs font-semibold text-emerald-400 mt-2">Active SQLite Record</div>
              </div>
            </div>

            {/* Schema Columns Table */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Table className="w-4 h-4 text-white" />
                <span>Column Schema Inspection</span>
              </h3>

              {(!selectedDataset.tables || selectedDataset.tables.length === 0) ? (
                <div className="p-6 text-center text-xs text-zinc-500 bg-zinc-900 rounded-xl border border-zinc-800">
                  Registered dataset metadata synchronized with FastAPI SQL database backend.
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
                                col.sensitivityLevel === 'RESTRICTED' ? 'bg-rose-950/80 text-rose-300' : 'bg-zinc-800 text-zinc-400'
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

