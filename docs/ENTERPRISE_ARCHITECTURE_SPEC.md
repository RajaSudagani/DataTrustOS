# Enterprise Architecture & Technical Specification — DataTrustOS

## 1. System Overview & Scope

DataTrustOS is designed for enterprise organizations managing complex, multi-region data pipelines, cloud warehouses (Snowflake, BigQuery, AWS Redshift), transactional relational databases (PostgreSQL, MySQL), and high-frequency streaming buses (Apache Kafka).

The system continuously audits metadata across over **600,000+ data pipeline records, table schemas, column data types, sensitivity tags, and quality assertions**.

---

## 2. Technical Stack Specification

| Component | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React + TypeScript | React 18.3+, TS 5.5+ | Single Page Application (SPA) |
| **Build Tooling** | Vite | v5.4+ | Lightning-fast HMR and bundle compilation |
| **Styling & Design System** | Tailwind CSS | v3.4+ | Minimalist obsidian dark theme (`bg-black`) |
| **Lineage Graph Engine** | `@xyflow/react` | v12.3+ | Visual DAG lineage node & edge rendering |
| **Analytics Visualization** | Recharts | v2.13+ | Quality SLA trend area charts & risk donuts |
| **Icons Library** | Lucide React | v0.460+ | Consistent enterprise vector icon set |
| **State & API Management** | TanStack React Query | v5.56+ | Client-side API query caching & invalidation |
| **Backend Framework** | Python FastAPI | v0.115+ | Asynchronous RESTful API backend |
| **ORM & Database** | SQLAlchemy + SQLite | v2.0+ | Relational metadata persistence |
| **Local Machine Learning** | Scikit-Learn | v1.5+ | Local IsolationForest numeric anomaly detection |
| **Testing Engine** | Pytest + Starlette TestClient | v9.1+ | Unit and API integration testing suite |
| **DevOps Orchestration** | Docker & Docker Compose | Compose v2 | Multi-container environment orchestration |

---

## 3. Data Governance & Security Specification

### 3.1 Sensitivity Levels & Classification Rules
1. **`PUBLIC`**: Non-restricted organizational metrics, public documentation, and marketing telemetry.
2. **`INTERNAL`**: Operational telemetry, system logs, internal employee IDs, and non-sensitive aggregated reports.
3. **`CONFIDENTIAL`**: Proprietary financial ledger entries, revenue metrics, vendor contracts, and IP assets.
4. **`RESTRICTED`**: High-value business operations, strategic M&A drafts, executive compensation datasets.
5. **`CRITICAL_PII`**: Personally Identifiable Information requiring strict encryption and masking (SSNs, Credit Cards, Hashed Tax IDs, Phone Numbers, Physical Addresses).

### 3.2 Automated PII Classification Heuristics
DataTrustOS executes automated regex heuristics and semantic column profiling:
- **Social Security Number (SSN)**: `^\d{3}-\d{2}-\d{4}$` (Regex Confidence: 99.8%)
- **Email Address**: `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` (Regex Confidence: 99.5%)
- **Credit Card PAN**: `^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$` (Regex Confidence: 99.9%)
- **IP Address (IPv4)**: `^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$` (Regex Confidence: 98.5%)

---

## 4. Local AI/ML Intelligence Engine Specification

### 4.1 Scikit-Learn IsolationForest Anomaly Detector
DataTrustOS embeds an offline `IsolationForest` model to detect numerical outliers in streaming telemetry data (e.g. monetary transaction amounts, latency spikes, event volumes):

$$\text{Outlier Score}(x) = 2^{-\frac{E(h(x))}{c(n)}}$$

Where:
- $h(x)$ is the path length of sample $x$ in an isolation tree.
- $E(h(x))$ is the average path length across an ensemble of isolation trees.
- $c(n)$ is the average path length of unsuccessful searches in a Binary Search Tree (BST) built with $n$ nodes.

An anomaly score close to 1 indicates a definite statistical outlier.

---

## 5. Compliance Framework Alignment

DataTrustOS enforces automated compliance lockers and audit logs mapped to international standards:

1. **GDPR (General Data Protection Regulation)**: Article 17 (Right to be Forgotten) & Article 32 (Security of Processing).
2. **SOC 2 Type II**: Trust Services Criteria for Security, Availability, Processing Integrity, and Confidentiality.
3. **HIPAA**: Privacy & Security Rules for Protected Health Information (PHI).
4. **ISO/IEC 27001**: Information Security Management System (ISMS) controls.
