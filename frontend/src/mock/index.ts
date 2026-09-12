import {
  Dataset,
  LineageGraphData,
  QualityRule,
  QualityIssue,
  PIISensitiveField,
  GovernancePolicy,
  AccessRequest,
  ComplianceControl,
  AuditLogEvent,
  User
} from '../types';

export const MOCK_USER: User = {
  id: 'usr_1092',
  name: 'Sudagani Raja',
  email: 'raja.sudagani@datatrustos.internal',
  role: 'ADMIN',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  organization: 'DataTrust Enterprise Systems',
};

export const MOCK_DATASETS: Dataset[] = [
  {
    id: 'ds_cust_prod_01',
    name: 'Customer Global Master Directory',
    slug: 'customer-global-master',
    description: 'Central customer identity, profile data, billing preferences, and KYC verification statuses across regional branches.',
    dataSource: 'PostgreSQL',
    environment: 'PRODUCTION',
    domain: 'Customer Success',
    rowCount: 14250900,
    sizeBytes: 8420912400,
    qualityScore: 94.8,
    riskScore: 78.5,
    riskLevel: 'HIGH',
    sensitivityLevel: 'CRITICAL_PII',
    owners: [
      { id: 'o1', name: 'Eleanor Vance', email: 'eleanor.vance@datatrust.io', role: 'PRIMARY_OWNER', department: 'Customer Ops' },
      { id: 'o2', name: 'Marcus Chen', email: 'marcus.chen@datatrust.io', role: 'TECHNICAL_STEWARD', department: 'Data Engineering' }
    ],
    tags: ['Core-Master', 'GDPR-Regulated', 'KYC', 'PII-Restricted'],
    lastProfiledAt: '2026-09-12T08:30:00Z',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2026-09-12T09:15:00Z',
    isCertified: true,
    tables: [
      {
        id: 'tbl_cust_core',
        tableName: 'customer_profiles',
        description: 'Core demographic and account metadata table.',
        rowCount: 14250900,
        columnCount: 8,
        columns: [
          { id: 'c1', name: 'customer_id', dataType: 'UUID', isNullable: false, isPrimaryKey: true, isForeignKey: false, description: 'Surrogate primary key', sensitivityLevel: 'PUBLIC', completenessScore: 100, distinctCount: 14250900, nullCount: 0, sampleValues: ['550e8400-e29b-41d4-a716-446655440000', 'a3b8c9d0-1234-5678-90ab-cdef12345678'] },
          { id: 'c2', name: 'full_name', dataType: 'VARCHAR(255)', isNullable: false, isPrimaryKey: false, isForeignKey: false, description: 'Customer legal full name', sensitivityLevel: 'CONFIDENTIAL', piiCategory: 'NAME', completenessScore: 99.8, distinctCount: 12109400, nullCount: 28500, sampleValues: ['Sarah Jenkins', 'David Kim'] },
          { id: 'c3', name: 'email_address', dataType: 'VARCHAR(320)', isNullable: false, isPrimaryKey: false, isForeignKey: false, description: 'Primary contact email', sensitivityLevel: 'CRITICAL_PII', piiCategory: 'EMAIL', completenessScore: 100, distinctCount: 14250900, nullCount: 0, sampleValues: ['s.jenkins@corp.com', 'dkim99@gmail.com'] },
          { id: 'c4', name: 'ssn_hash', dataType: 'CHAR(64)', isNullable: true, isPrimaryKey: false, isForeignKey: false, description: 'Hashed social security number for tax verification', sensitivityLevel: 'CRITICAL_PII', piiCategory: 'SSN', completenessScore: 94.2, distinctCount: 13420000, nullCount: 830900, sampleValues: ['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'] },
          { id: 'c5', name: 'credit_card_last4', dataType: 'VARCHAR(4)', isNullable: true, isPrimaryKey: false, isForeignKey: false, description: 'Last 4 digits of active card', sensitivityLevel: 'RESTRICTED', piiCategory: 'FINANCIAL', completenessScore: 88.5, distinctCount: 9999, nullCount: 1638853, sampleValues: ['4492', '1092'] },
          { id: 'c6', name: 'created_at', dataType: 'TIMESTAMP', isNullable: false, isPrimaryKey: false, isForeignKey: false, description: 'Account creation timestamp', sensitivityLevel: 'INTERNAL', completenessScore: 100, distinctCount: 14250900, nullCount: 0, sampleValues: ['2026-01-01 12:00:00'] },
        ]
      }
    ]
  },
  {
    id: 'ds_fin_ledger_02',
    name: 'General Ledger Transactions (Q3-2026)',
    slug: 'general-ledger-transactions',
    description: 'Audited financial journal entries, balance reconciliations, and inter-company transfers.',
    dataSource: 'Snowflake',
    environment: 'PRODUCTION',
    domain: 'Finance',
    rowCount: 89400200,
    sizeBytes: 34102910000,
    qualityScore: 99.2,
    riskScore: 42.0,
    riskLevel: 'MEDIUM',
    sensitivityLevel: 'RESTRICTED',
    owners: [
      { id: 'o3', name: 'Julian Hayes', email: 'julian.hayes@datatrust.io', role: 'PRIMARY_OWNER', department: 'Global Finance' }
    ],
    tags: ['SOX-Compliant', 'Finance', 'Audited', 'Quarterly-Close'],
    lastProfiledAt: '2026-09-12T06:00:00Z',
    createdAt: '2024-11-01T00:00:00Z',
    updatedAt: '2026-09-12T07:45:00Z',
    isCertified: true,
    tables: []
  },
  {
    id: 'ds_hc_records_03',
    name: 'Patient Telemetry & Health Metrics',
    slug: 'patient-telemetry-health',
    description: 'Anonymized clinical vital signs, diagnostic sensor telemetry, and patient monitoring streams.',
    dataSource: 'BigQuery',
    environment: 'PRODUCTION',
    domain: 'Healthcare',
    rowCount: 250490100,
    sizeBytes: 120491029000,
    qualityScore: 91.4,
    riskScore: 89.0,
    riskLevel: 'CRITICAL',
    sensitivityLevel: 'CRITICAL_PII',
    owners: [
      { id: 'o4', name: 'Dr. Aris Thorne', email: 'aris.thorne@datatrust.io', role: 'PRIMARY_OWNER', department: 'Clinical Research' }
    ],
    tags: ['HIPAA-Regulated', 'PHI', 'Telemetry', 'Clinical'],
    lastProfiledAt: '2026-09-11T22:15:00Z',
    createdAt: '2025-04-10T14:30:00Z',
    updatedAt: '2026-09-12T04:20:00Z',
    isCertified: false,
    tables: []
  },
  {
    id: 'ds_supply_inv_04',
    name: 'Global Inventory & Fulfillment Stream',
    slug: 'inventory-fulfillment-stream',
    description: 'Real-time warehouse stocking levels, shipping manifest queues, and logistics route tracking.',
    dataSource: 'Kafka',
    environment: 'STAGING',
    domain: 'Supply Chain',
    rowCount: 5490200,
    sizeBytes: 1024910200,
    qualityScore: 86.1,
    riskScore: 18.2,
    riskLevel: 'LOW',
    sensitivityLevel: 'INTERNAL',
    owners: [
      { id: 'o5', name: 'Samantha Wu', email: 'samantha.wu@datatrust.io', role: 'PRIMARY_OWNER', department: 'Logistics' }
    ],
    tags: ['Real-Time', 'Kafka-Stream', 'Inventory'],
    lastProfiledAt: '2026-09-12T10:00:00Z',
    createdAt: '2026-02-18T09:00:00Z',
    updatedAt: '2026-09-12T10:30:00Z',
    isCertified: true,
    tables: []
  }
];

export const MOCK_LINEAGE: LineageGraphData = {
  nodes: [
    { id: 'n1', label: 'raw_cust_pg_dump', type: 'SOURCE', domain: 'Ingestion Layer', rowCount: 15200000, qualityScore: 82.0 },
    { id: 'n2', label: 'customer_profiles (Master)', type: 'DATASET', domain: 'Customer Success', rowCount: 14250900, qualityScore: 94.8 },
    { id: 'n3', label: 'dbt_anonymize_pii_transform', type: 'TRANSFORMATION', domain: 'Data Engineering' },
    { id: 'n4', label: 'anon_cust_analytics_view', type: 'DATASET', domain: 'Analytics Layer', rowCount: 14250900, qualityScore: 98.5 },
    { id: 'n5', label: 'executive_churn_propensity_model', type: 'ML_MODEL', domain: 'AI & Data Science' },
    { id: 'n6', label: 'Q3_Global_Customer_Health_Report', type: 'REPORT', domain: 'Executive Reporting' },
  ],
  edges: [
    { id: 'e1-2', source: 'n1', target: 'n2', label: 'PostgreSQL Sync', transformationType: 'ETL' },
    { id: 'e2-3', source: 'n2', target: 'n3', label: 'dbt Model Pipeline', transformationType: 'ETL' },
    { id: 'e3-4', source: 'n3', target: 'n4', label: 'Materialized View', transformationType: 'VIEW' },
    { id: 'e4-5', source: 'n4', target: 'n5', label: 'Feature Store Feed', transformationType: 'MODEL_INFERENCE' },
    { id: 'e4-6', source: 'n4', target: 'n6', label: 'PowerBI Refresh', transformationType: 'AGGREGATION' },
  ]
};

export const MOCK_QUALITY_RULES: QualityRule[] = [
  {
    id: 'qr_101',
    name: 'Customer Email Syntax & Null Check',
    datasetId: 'ds_cust_prod_01',
    datasetName: 'Customer Global Master Directory',
    columnName: 'email_address',
    ruleType: 'REGEX_MATCH',
    parameters: { pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' },
    severity: 'CRITICAL',
    isActive: true,
    lastExecutionStatus: 'PASSED',
    lastRunAt: '2026-09-12T08:30:00Z'
  },
  {
    id: 'qr_102',
    name: 'Primary Key Uniqueness Assertion',
    datasetId: 'ds_cust_prod_01',
    datasetName: 'Customer Global Master Directory',
    columnName: 'customer_id',
    ruleType: 'UNIQUE_CHECK',
    parameters: {},
    severity: 'CRITICAL',
    isActive: true,
    lastExecutionStatus: 'PASSED',
    lastRunAt: '2026-09-12T08:30:00Z'
  },
  {
    id: 'qr_103',
    name: 'Financial Ledger Transaction Outlier Detection',
    datasetId: 'ds_fin_ledger_02',
    datasetName: 'General Ledger Transactions (Q3-2026)',
    columnName: 'amount_usd',
    ruleType: 'STATISTICAL_OUTLIER',
    parameters: { zScoreThreshold: 3.5 },
    severity: 'WARNING',
    isActive: true,
    lastExecutionStatus: 'WARNING',
    lastRunAt: '2026-09-12T06:00:00Z'
  }
];

export const MOCK_QUALITY_ISSUES: QualityIssue[] = [
  {
    id: 'iss_901',
    ruleId: 'qr_103',
    ruleName: 'Financial Ledger Transaction Outlier Detection',
    datasetId: 'ds_fin_ledger_02',
    datasetName: 'General Ledger Transactions (Q3-2026)',
    columnName: 'amount_usd',
    issueDescription: 'Detected 42 journal entries exceeding 3.5 standard deviations ($5.2M single transaction).',
    failedCount: 42,
    totalEvaluated: 89400200,
    detectedAt: '2026-09-12T06:05:00Z',
    status: 'OPEN',
    assignee: 'Julian Hayes'
  }
];

export const MOCK_PII_FIELDS: PIISensitiveField[] = [
  {
    id: 'pii_01',
    datasetId: 'ds_cust_prod_01',
    datasetName: 'Customer Global Master Directory',
    tableName: 'customer_profiles',
    columnName: 'ssn_hash',
    category: 'SSN',
    confidenceScore: 99.4,
    status: 'CONFIRMED',
    detectedAt: '2026-09-10T11:00:00Z'
  },
  {
    id: 'pii_02',
    datasetId: 'ds_cust_prod_01',
    datasetName: 'Customer Global Master Directory',
    tableName: 'customer_profiles',
    columnName: 'email_address',
    category: 'EMAIL',
    confidenceScore: 98.9,
    status: 'CONFIRMED',
    detectedAt: '2026-09-10T11:00:00Z'
  },
  {
    id: 'pii_03',
    datasetId: 'ds_hc_records_03',
    datasetName: 'Patient Telemetry & Health Metrics',
    tableName: 'patient_vitals',
    columnName: 'patient_ssn',
    category: 'SSN',
    confidenceScore: 96.5,
    status: 'AUTOMATICALLY_DETECTED',
    detectedAt: '2026-09-11T22:15:00Z'
  }
];

export const MOCK_POLICIES: GovernancePolicy[] = [
  {
    id: 'pol_gdpr_01',
    title: 'GDPR Article 17 Right to Erasure & Masking SLA',
    code: 'POL-PRIVACY-001',
    description: 'Mandates automatic hashing of direct identifiers within 72 hours of ingestion for all European customer datasets.',
    category: 'DATA_PRIVACY',
    status: 'ACTIVE',
    affectedDatasetsCount: 14,
    violationsCount: 0,
    createdByName: 'Eleanor Vance',
    updatedAt: '2026-08-15T10:00:00Z'
  },
  {
    id: 'pol_ret_02',
    title: 'Financial Journal Retention & Immutable Archival Policy',
    code: 'POL-FIN-007',
    description: 'Requires 7-year immutable cold storage retention for all quarterly balance records under SOX Section 802.',
    category: 'RETENTION',
    status: 'ACTIVE',
    affectedDatasetsCount: 6,
    violationsCount: 1,
    createdByName: 'Julian Hayes',
    updatedAt: '2026-07-20T14:00:00Z'
  }
];

export const MOCK_ACCESS_REQUESTS: AccessRequest[] = [
  {
    id: 'req_881',
    requesterName: 'Dr. Michael Chang',
    requesterEmail: 'm.chang@datatrust.io',
    datasetId: 'ds_cust_prod_01',
    datasetName: 'Customer Global Master Directory',
    reason: 'Quarterly churn analysis and predictive ML model retraining.',
    accessType: 'READ',
    durationDays: 30,
    status: 'PENDING',
    requestedAt: '2026-09-12T09:30:00Z'
  }
];

export const MOCK_COMPLIANCE_CONTROLS: ComplianceControl[] = [
  { id: 'cc_1', code: 'GDPR-ART-25', title: 'Data Protection by Design & Default', framework: 'GDPR', description: 'Technical & organizational measures for privacy enforcement.', status: 'COMPLIANT', evidenceCount: 12 },
  { id: 'cc_2', code: 'SOC2-CC6.1', title: 'Logical Access Security & Boundaries', framework: 'SOC2', description: 'Restricts access to data infrastructure via RBAC & MFA.', status: 'COMPLIANT', evidenceCount: 8 },
  { id: 'cc_3', code: 'HIPAA-164.312', title: 'Technical Safeguards & Audit Controls', framework: 'HIPAA', description: 'Requires hardware and software mechanisms to record audit activity.', status: 'PARTIAL', evidenceCount: 5 }
];

export const MOCK_AUDIT_LOGS: AuditLogEvent[] = [
  {
    id: 'aud_1001',
    timestamp: '2026-09-12T11:20:45Z',
    actorName: 'Sudagani Raja',
    actorEmail: 'raja.sudagani@datatrustos.internal',
    action: 'POLICY_UPDATE',
    targetResource: 'POL-PRIVACY-001',
    ipAddress: '192.168.1.104',
    status: 'SUCCESS',
    metadata: { changeType: 'Severity Threshold Adjusted' }
  },
  {
    id: 'aud_1002',
    timestamp: '2026-09-12T10:45:12Z',
    actorName: 'Dr. Michael Chang',
    actorEmail: 'm.chang@datatrust.io',
    action: 'ACCESS_REQUEST_SUBMITTED',
    targetResource: 'ds_cust_prod_01',
    ipAddress: '10.0.4.88',
    status: 'SUCCESS',
    metadata: { accessType: 'READ', duration: 30 }
  }
];
