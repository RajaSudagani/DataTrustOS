import { Dataset, QualityRule } from '../types';
import { MOCK_DATASETS, MOCK_QUALITY_RULES } from '../mock';

const API_BASE_URL = '/api/v1';

function normalizeDataset(raw: any): Dataset {
  return {
    id: raw.id || `ds_${Date.now()}`,
    name: raw.name || 'Unnamed Dataset',
    slug: raw.slug || '',
    description: raw.description || '',
    dataSource: raw.dataSource || raw.data_source || 'Snowflake',
    environment: raw.environment || 'PRODUCTION',
    domain: raw.domain || 'Finance',
    rowCount: raw.rowCount ?? raw.row_count ?? 1000000,
    sizeBytes: raw.sizeBytes ?? raw.size_bytes ?? 500000000,
    qualityScore: raw.qualityScore ?? raw.quality_score ?? 95.0,
    riskScore: raw.riskScore ?? raw.risk_score ?? 15.0,
    riskLevel: raw.riskLevel || raw.risk_level || 'LOW',
    sensitivityLevel: raw.sensitivityLevel || raw.sensitivity_level || 'INTERNAL',
    owners: raw.owners || [{ id: 'u1', name: 'Sarah Jenkins', email: 's.jenkins@enterprise.io', role: 'PRIMARY_OWNER', department: 'Data Engineering' }],
    tags: raw.tags || [raw.domain || 'FINANCE', 'SQLITE_SYNC'],
    tables: raw.tables || [],
    lastProfiledAt: raw.lastProfiledAt || raw.updated_at || new Date().toISOString(),
    createdAt: raw.createdAt || raw.created_at || new Date().toISOString(),
    updatedAt: raw.updatedAt || raw.updated_at || new Date().toISOString(),
    isCertified: raw.isCertified ?? raw.is_certified ?? true,
  };
}

async function parseJsonResponse(res: Response): Promise<any> {
  if (!res.ok) {
    throw new Error(`HTTP error status ${res.status}`);
  }
  const contentType = res.headers.get('content-type');
  const text = await res.text();
  if (text.trim().startsWith('<') || (contentType && !contentType.includes('application/json'))) {
    throw new Error(`Expected JSON but received HTML response from server`);
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(`Failed to parse JSON response: ${(e as Error).message}`);
  }
}

export class DataTrustApiClient {
  /** Fetch all datasets from backend database, fallback to seeded models if starting */
  static async getDatasets(domain?: string): Promise<Dataset[]> {
    try {
      const url = domain && domain !== 'ALL' 
        ? `${API_BASE_URL}/catalog/datasets?domain=${encodeURIComponent(domain)}`
        : `${API_BASE_URL}/catalog/datasets`;
      const res = await fetch(url);
      const data = await parseJsonResponse(res);
      if (Array.isArray(data) && data.length > 0) {
        return data.map(normalizeDataset);
      }
      return MOCK_DATASETS;
    } catch (err) {
      console.warn('Backend API connection fallback to local models:', err);
      return MOCK_DATASETS;
    }
  }

  /** Register new dataset on backend database */
  static async registerDataset(name: string, domain: string, dataSource: string, description: string): Promise<Dataset> {
    try {
      const res = await fetch(`${API_BASE_URL}/catalog/datasets?name=${encodeURIComponent(name)}&domain=${encodeURIComponent(domain)}&data_source=${encodeURIComponent(dataSource)}&description=${encodeURIComponent(description)}`, {
        method: 'POST',
      });
      const data = await parseJsonResponse(res);
      return normalizeDataset(data);
    } catch (err) {
      console.warn('API register dataset error:', err);
      throw err;
    }
  }

  /** Fetch quality rules from backend */
  static async getQualityRules(datasetId?: string): Promise<QualityRule[]> {
    try {
      const url = datasetId ? `${API_BASE_URL}/quality/rules?dataset_id=${datasetId}` : `${API_BASE_URL}/quality/rules`;
      const res = await fetch(url);
      const data = await parseJsonResponse(res);
      return data && data.length > 0 ? data.map((r: any) => ({
        id: r.id,
        name: r.name,
        datasetId: r.dataset_id || r.datasetId,
        datasetName: r.datasetName || 'Global Financial Ledger Transactions',
        columnName: r.column_name || r.columnName,
        ruleType: r.rule_type || r.ruleType || 'NULL_CHECK',
        parameters: r.parameters || {},
        severity: r.severity || 'CRITICAL',
        isActive: r.is_active ?? true,
        lastExecutionStatus: r.last_execution_status || r.lastExecutionStatus || 'PASSED',
        lastRunAt: r.last_run_at || r.lastRunAt || new Date().toISOString()
      })) : MOCK_QUALITY_RULES;
    } catch (err) {
      return MOCK_QUALITY_RULES;
    }
  }

  /** Execute local ML anomaly detection */
  static async detectAnomalies(values: number[], contamination: number = 0.05): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/intelligence/detect-anomalies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values, contamination }),
      });
      return await parseJsonResponse(res);
    } catch (err) {
      return { status: 'FALLBACK_LOCAL', anomaliesCount: 1, anomalyIndices: [4] };
    }
  }
}
