import React, { createContext, useContext, useState } from 'react';

export interface Tenant {
  id: string;
  name: string;
  code: string;
  region: string;
  plan: 'ENTERPRISE_PREMIER' | 'GOVERNMENT_CLOUD' | 'FINSERV_SHIELD';
}

const MOCK_TENANTS: Tenant[] = [
  { id: 't1', name: 'Global Finance Corp', code: 'GFC-PROD', region: 'us-east-1', plan: 'ENTERPRISE_PREMIER' },
  { id: 't2', name: 'Aegis Healthcare Systems', code: 'AEGIS-HEALTH', region: 'us-west-2', plan: 'FINSERV_SHIELD' },
  { id: 't3', name: 'DataTrust Sandbox Org', code: 'DT-SANDBOX', region: 'eu-central-1', plan: 'GOVERNMENT_CLOUD' }
];

interface TenantContextType {
  activeTenant: Tenant;
  tenants: Tenant[];
  switchTenant: (tenantId: string) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenants] = useState<Tenant[]>(MOCK_TENANTS);
  const [activeTenant, setActiveTenant] = useState<Tenant>(MOCK_TENANTS[0]);

  const switchTenant = (tenantId: string) => {
    const found = tenants.find(t => t.id === tenantId);
    if (found) {
      setActiveTenant(found);
    }
  };

  return (
    <TenantContext.Provider value={{ activeTenant, tenants, switchTenant }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) throw new Error('useTenant must be used within TenantProvider');
  return context;
};
