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
    <div className="w-full p-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2.5">
            <Scale className="w-5 h-5 text-white" />
            <span>Governance Policies & Approval Center</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Maintain executable data governance policies, process fine-grained dataset access requests, and review steward approval chains.
          </p>
        </div>

        <button className="px-4 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold rounded-lg transition-all flex items-center space-x-2 shadow">
          <Plus className="w-4 h-4" />
          <span>Define Governance Policy</span>
        </button>
      </div>

      {/* Access Requests Queue */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden space-y-4">
        <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Pending Dataset Access Requests</span>
          </h3>
          <span className="text-xs text-zinc-400">{requests.filter(r => r.status === 'PENDING').length} pending approval</span>
        </div>

        <div className="divide-y divide-zinc-800">
          {requests.map(req => (
            <div key={req.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-zinc-800/40 transition-colors">
              <div className="space-y-1">
                <div className="text-xs font-bold text-white flex items-center space-x-2">
                  <span>{req.requesterName}</span>
                  <span className="text-[11px] text-zinc-400 font-normal">({req.requesterEmail})</span>
                </div>
                <div className="text-xs text-zinc-300">
                  Requesting <span className="font-bold text-white">{req.accessType}</span> access for dataset: <span className="font-mono text-zinc-200">{req.datasetName}</span>
                </div>
                <div className="text-[11px] text-zinc-400 italic">"Reason: {req.reason}" ({req.durationDays} Days)</div>
              </div>

              <div className="flex items-center space-x-3">
                {req.status === 'PENDING' ? (
                  <>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-rose-950/80 text-rose-300 border border-zinc-700 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(req.id)}
                      className="px-3.5 py-1.5 bg-white hover:bg-zinc-200 text-black rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Grant Access</span>
                    </button>
                  </>
                ) : (
                  <span className={`px-3 py-1 rounded text-xs font-bold ${
                    req.status === 'APPROVED' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' : 'bg-rose-950/80 text-rose-300 border border-rose-800'
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
          <Award className="w-4 h-4 text-white" />
          <span>Active Organizational Policies</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MOCK_POLICIES.map(pol => (
            <div key={pol.id} className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 space-y-3 hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800 font-mono text-[10px] font-bold">
                  {pol.code}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                  {pol.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{pol.title}</h4>
              <p className="text-xs text-zinc-400">{pol.description}</p>
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
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
