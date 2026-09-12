export type SensitivityLevel = 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL' | 'RESTRICTED' | 'CRITICAL_PII';

export type QualityStatus = 'PASSED' | 'FAILED' | 'WARNING' | 'NOT_RUN';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ColumnSchema {
  id: string;
  name: string;
  dataType: string;
  isNullable: boolean;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  description: string;
  sensitivityLevel: SensitivityLevel;
  piiCategory?: string;
  completenessScore: number; // 0 - 100
  distinctCount: number;
  nullCount: number;
  sampleValues: string[];
}

export interface TableSchema {
  id: string;
  tableName: string;
  description: string;
  rowCount: number;
  columnCount: number;
  columns: ColumnSchema[];
}

export interface DatasetOwner {
  id: string;
  name: string;
  email: string;
  role: 'PRIMARY_OWNER' | 'TECHNICAL_STEWARD' | 'BUSINESS_STEWARD' | 'GOVERNANCE_OFFICER';
  department: string;
}

export interface Dataset {
  id: string;
  name: string;
  slug: string;
  description: string;
  dataSource: 'PostgreSQL' | 'Snowflake' | 'BigQuery' | 'S3 Parquet' | 'Kafka' | 'SQLite' | 'CSV';
  environment: 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';
  domain: 'Finance' | 'Healthcare' | 'Customer Success' | 'Core Engineering' | 'Marketing' | 'Supply Chain';
  rowCount: number;
  sizeBytes: number;
  qualityScore: number; // 0 - 100
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  sensitivityLevel: SensitivityLevel;
  owners: DatasetOwner[];
  tags: string[];
  tables: TableSchema[];
  lastProfiledAt: string;
  createdAt: string;
  updatedAt: string;
  isCertified: boolean;
}

export interface LineageNode {
  id: string;
  label: string;
  type: 'SOURCE' | 'TRANSFORMATION' | 'DATASET' | 'REPORT' | 'ML_MODEL';
  domain: string;
  rowCount?: number;
  qualityScore?: number;
}

export interface LineageEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  transformationType?: 'ETL' | 'STREAM' | 'AGGREGATION' | 'VIEW' | 'MODEL_INFERENCE';
}

export interface LineageGraphData {
  nodes: LineageNode[];
  edges: LineageEdge[];
}

export interface QualityRule {
  id: string;
  name: string;
  datasetId: string;
  datasetName: string;
  columnName?: string;
  ruleType: 'NULL_CHECK' | 'RANGE_VALIDATION' | 'REGEX_MATCH' | 'UNIQUE_CHECK' | 'STATISTICAL_OUTLIER' | 'REFERENTIAL_INTEGRITY';
  parameters: Record<string, any>;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  isActive: boolean;
  lastExecutionStatus: QualityStatus;
  lastRunAt: string;
}

export interface QualityIssue {
  id: string;
  ruleId: string;
  ruleName: string;
  datasetId: string;
  datasetName: string;
  columnName?: string;
  issueDescription: string;
  failedCount: number;
  totalEvaluated: number;
  detectedAt: string;
  status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'IGNORED';
  assignee?: string;
}

export interface PIISensitiveField {
  id: string;
  datasetId: string;
  datasetName: string;
  tableName: string;
  columnName: string;
  category: 'SSN' | 'EMAIL' | 'CREDIT_CARD' | 'PHONE' | 'PASSPORT' | 'IP_ADDRESS' | 'HEALTH_RECORD';
  confidenceScore: number; // 0 - 100
  status: 'AUTOMATICALLY_DETECTED' | 'CONFIRMED' | 'FALSE_POSITIVE';
  detectedAt: string;
}

export interface GovernancePolicy {
  id: string;
  title: string;
  code: string;
  description: string;
  category: 'DATA_PRIVACY' | 'SECURITY' | 'RETENTION' | 'ACCESS_CONTROL' | 'QUALITY_SLA';
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  affectedDatasetsCount: number;
  violationsCount: number;
  createdByName: string;
  updatedAt: string;
}

export interface AccessRequest {
  id: string;
  requesterName: string;
  requesterEmail: string;
  datasetId: string;
  datasetName: string;
  reason: string;
  accessType: 'READ' | 'WRITE' | 'ADMIN';
  durationDays: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  requestedAt: string;
  approvedAt?: string;
  approverName?: string;
}

export interface ComplianceControl {
  id: string;
  code: string;
  title: string;
  framework: 'GDPR' | 'SOC2' | 'HIPAA' | 'ISO27001' | 'CCPA';
  description: string;
  status: 'COMPLIANT' | 'NON_COMPLIANT' | 'PARTIAL' | 'NOT_AUDITED';
  evidenceCount: number;
}

export interface AuditLogEvent {
  id: string;
  timestamp: string;
  actorName: string;
  actorEmail: string;
  action: string;
  targetResource: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FAILURE' | 'DENIED';
  metadata: Record<string, any>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'DATA_GOVERNANCE_LEAD' | 'DATA_STEWARD' | 'DATA_ENGINEER' | 'ANALYST';
  avatarUrl: string;
  organization: string;
}
