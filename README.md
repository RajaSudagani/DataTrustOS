# DataTrustOS — Enterprise Data Governance & AI Intelligence Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/RajaSudagani/DataTrustOS)
[![Version](https://img.shields.io/badge/version-1.0.0--enterprise-white.svg)](https://github.com/RajaSudagani/DataTrustOS)
[![License](https://img.shields.io/badge/license-Enterprise--MIT-zinc.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.13+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-emerald.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3+-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4+-38bdf8.svg)](https://tailwindcss.com/)
[![Local ML](https://img.shields.io/badge/ML%20Engine-Scikit--Learn%20IsolationForest-orange.svg)](https://scikit-learn.org/)

**DataTrustOS** is a state-of-the-art, full-stack enterprise data governance, data quality, data lineage, risk management, compliance auditing, and local AI intelligence platform. 

It provides automated metadata discovery, PII classification, declarative quality assertion profiling, schema drift prediction, and interactive DAG lineage visualization for enterprise data pipelines handling over **600,000+ data pipeline records and multi-region database tables**.

---

## 🌟 Key Platform Highlights

- **100% Local Execution (Zero External Paid API Keys)**:
  Embedded Scikit-Learn `IsolationForest` numeric anomaly detection and Jaccard dataset similarity engine running 100% offline without external paid API keys (OpenAI, Anthropic, GCP).
- **Full-Stack Synchronized Architecture**:
  React 18 + TypeScript + Vite + Tailwind CSS Frontend SPA synchronized via React Query to a modular FastAPI Python backend with SQLite / PostgreSQL persistence.
- **Unified Minimalist Dark Theme**:
  Sleek obsidian black (`bg-black`) and zinc aesthetics with high-contrast white action buttons (`bg-white text-black font-extrabold`) and comfortable layout proportions (`w-full p-8` container, `w-80` sidebar).
- **Interactive Visual Lineage Studio**:
  Node-based pipeline DAG graph visualization built with `@xyflow/react` for inspecting transformation dependencies across ETL streams, Snowflake data warehouses, and Kafka clusters.
- **Enterprise DevSecOps**:
  Containerized with Docker and Docker Compose orchestrating Backend API, PostgreSQL 16 DB, and Redis 7 cache.

---

## 🏛️ Platform Architecture & 13 Specialized Domain Modules

DataTrustOS organizes enterprise data governance into **13 dedicated domain modules**:

```
DataTrustOS Platform Core
 ├── 📊 01. Executive Overview Dashboard      (Global KPI scorecards, SLA trends, risk donuts)
 ├── 🗂️ 02. Enterprise Data Catalog          (Dataset discovery, SQLite sync, schema inspection)
 ├── 🔎 03. Schema Inspector Drawer            (Column types, PKs, null counts, completeness)
 ├── 🛡️ 04. Data Quality Engine & Hub         (Declarative rules, statistical assertions)
 ├── 🏷️ 05. PII & Classification Radar         (Automated PII detection, SSN/Email regex)
 ├── 🔀 06. Visual Data Lineage Studio         (React Flow DAG nodes, transformation edges)
 ├── ⚖️ 07. Governance & Policy Studio         (Access policies, retention rules, owner approvals)
 ├── ⚠️ 08. Data Risk Center                   (Sensitivity matrices, threat mitigation logs)
 ├── 🧠 09. Local AI/ML Intelligence Center    (Scikit-Learn IsolationForest anomaly runner)
 ├── 🔒 10. Compliance & Audit Lockers        (GDPR, SOC2, HIPAA, ISO27001 evidence trails)
 ├── 🔄 11. Workflows & Approvals               (Data steward access requests, SLA escalation)
 ├── 📈 12. Analytics & Reporting Hub         (Custom chart builder, quality trend exports)
 └── ⚙️ 13. Platform Control & RBAC Admin       (Role-based access control, tenant switcher)
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: v3.10 or higher
- **Git**: Installed

### 1. Clone Repository
```bash
git clone https://github.com/RajaSudagani/DataTrustOS.git
cd DataTrustOS
```

### 2. Launch FastAPI Backend Service
```bash
cd backend
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
*Backend API Swagger documentation will be available at **[http://localhost:8000/docs](http://localhost:8000/docs)**.*

### 3. Launch React Frontend SPA
```bash
cd ../frontend
npm install
npm run dev
```
*Frontend application will be running at **[http://localhost:3000/](http://localhost:3000/)**.*

---

## 🧪 Automated Testing & Verification Suite

### Run Backend Pytest Suite
```bash
cd backend
python -m pytest
```
*Executes unit and integration tests across FastAPI routers, database models, and local ML anomaly engines (`3/3 passed`).*

### Run Frontend Static Type Check & Build
```bash
cd frontend
npx tsc --noEmit
npm run build
```
*Validates zero TypeScript errors and compiles the production Vite bundle.*

---

## 🐳 Docker Deployment

To launch the complete enterprise environment with PostgreSQL 16 and Redis 7:

```bash
docker-compose up --build -d
```

---

## 📜 Repository Information & Author

- **Repository**: [`https://github.com/RajaSudagani/DataTrustOS`](https://github.com/RajaSudagani/DataTrustOS)
- **Maintainer**: Sudagani Raja (`raja.sudagani@datatrustos.internal`)
- **License**: MIT Enterprise License
