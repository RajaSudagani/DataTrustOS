import React, { useState } from 'react';
import { Scale, CheckCircle2, XCircle, Clock, Shield, Plus, Award } from 'lucide-react';
import { MOCK_POLICIES, MOCK_ACCESS_REQUESTS } from '../mock';
import { AccessRequest } from '../types';

export const GovernancePage: React.FC = () => {
  const [requests, setRequests] = useState<AccessRequest[]>(MOCK_ACCESS_REQUESTS);

  const handleApprove = (id: string) => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'APPROVED', approverName: 'Sudagani Raja' } : r))
    );
  };

  const handleReject = (id: string) => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'REJECTED' } : r))
    );
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <Scale className="w-6 h-6 text-brand-400" />
            <span>Governance Policies & Approval Center</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain executable data governance policies, process fine-grained dataset access requests, and review steward approval chains.
          </p>
        </div>

        <button className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-lg shadow-glow-brand transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Define Governance Policy</span>
        </button>
      </div>

      {/* Access Requests Queue */}
      <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden space-y-4">
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Pending Dataset Access Requests</span>
          </h3>
          <span className="text-xs text-slate-400">{requests.filter(r => r.status === 'PENDING').length} pending approval</span>
        </div>

        <div className="divide-y divide-slate-800">
          {requests.map(req => (
            <div key={req.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors">
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-100 flex items-center space-x-2">
                  <span>{req.requesterName}</span>
                  <span className="text-[11px] text-slate-400 font-normal">({req.requesterEmail})</span>
                </div>
                <div className="text-xs text-slate-300">
                  Requesting <span className="font-semibold text-brand-300">{req.accessType}</span> access for dataset: <span className="font-mono text-slate-200">{req.datasetName}</span>
                </div>
                <div className="text-[11px] text-slate-400 italic">"Reason: {req.reason}" ({req.durationDays} Days)</div>
              </div>

              <div className="flex items-center space-x-3">
                {req.status === 'PENDING' ? (
                  <>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-glow-emerald transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Grant Access</span>
                    </button>
                  </>
                ) : (
                  <span className={`px-3 py-1 rounded text-xs font-bold ${
                    req.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {req.status} {req.approverName && `by ${req.approverName}`}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Governance Policies Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Award className="w-4 h-4 text-brand-400" />
          <span>Active Organizational Policies</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MOCK_POLICIES.map(pol => (
            <div key={pol.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30 font-mono text-[10px] font-bold">
                  {pol.code}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  {pol.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-100">{pol.title}</h4>
              <p className="text-xs text-slate-400">{pol.description}</p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>{pol.affectedDatasetsCount} Affected Datasets</span>
                <span>Created by {pol.createdByName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
