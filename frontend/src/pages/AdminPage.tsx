import React from 'react';
import { Settings, Shield, Users, Building2, HardDrive, Cpu, Activity, Lock } from 'lucide-react';
import { useTenant } from '../context/TenantContext';

export const AdminPage: React.FC = () => {
  const { activeTenant, tenants } = useTenant();

  return (
    <div className="w-full p-6 space-y-6 animate-in fade-in duration-300">
      
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2.5">
          <Settings className="w-5 h-5 text-white" />
          <span>Platform Control Center & Multi-Tenant Administration</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manage organization tenants, configure fine-grained Role-Based Access Control (RBAC), monitor storage capacity, and inspect system health.
        </p>
      </div>

      {/* System Health Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Local Database Engine</span>
            <HardDrive className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-white mt-2">PostgreSQL 16.4</div>
          <div className="text-[11px] text-zinc-500 mt-1">12.4 GB / 500 GB Storage</div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Local Task Processor</span>
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <div className="text-lg font-bold text-white mt-2">Celery / Redis</div>
          <div className="text-[11px] text-zinc-500 mt-1">4 Worker Threads Active</div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Active Tenant Isolation</span>
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div className="text-lg font-bold text-white mt-2">{activeTenant.code}</div>
          <div className="text-[11px] text-zinc-500 mt-1">{activeTenant.plan}</div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Security & RBAC SLA</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-emerald-400 mt-2">Enforced</div>
          <div className="text-[11px] text-zinc-500 mt-1">Zero Security Breaches</div>
        </div>
      </div>

      {/* RBAC Matrix */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden space-y-4">
        <div className="p-4 border-b border-zinc-800 bg-zinc-950 font-bold text-sm text-white flex items-center space-x-2">
          <Shield className="w-4 h-4 text-white" />
          <span>Role-Based Access Control (RBAC) Permissions Matrix</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-800 text-[10px] text-zinc-400 bg-zinc-950 uppercase">
              <th className="p-4">Platform Permission Scope</th>
              <th className="p-4">ADMIN</th>
              <th className="p-4">GOVERNANCE_LEAD</th>
              <th className="p-4">DATA_STEWARD</th>
              <th className="p-4">DATA_ENGINEER</th>
              <th className="p-4">ANALYST</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 font-mono">
            <tr className="hover:bg-zinc-800/40">
              <td className="p-4 font-sans font-bold text-zinc-200">Register New Datasets</td>
              <td className="p-4 text-emerald-400">ALLOW</td>
              <td className="p-4 text-emerald-400">ALLOW</td>
              <td className="p-4 text-emerald-400">ALLOW</td>
              <td className="p-4 text-emerald-400">ALLOW</td>
              <td className="p-4 text-rose-400">DENY</td>
            </tr>
            <tr className="hover:bg-zinc-800/40">
              <td className="p-4 font-sans font-bold text-zinc-200">Approve Dataset Access Requests</td>
              <td className="p-4 text-emerald-400">ALLOW</td>
              <td className="p-4 text-emerald-400">ALLOW</td>
              <td className="p-4 text-emerald-400">ALLOW</td>
              <td className="p-4 text-rose-400">DENY</td>
              <td className="p-4 text-rose-400">DENY</td>
            </tr>
            <tr className="hover:bg-zinc-800/40">
              <td className="p-4 font-sans font-bold text-zinc-200">Inspect Unmasked Critical PII</td>
              <td className="p-4 text-emerald-400">ALLOW</td>
              <td className="p-4 text-rose-400">DENY</td>
              <td className="p-4 text-rose-400">DENY</td>
              <td className="p-4 text-rose-400">DENY</td>
              <td className="p-4 text-rose-400">DENY</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};
