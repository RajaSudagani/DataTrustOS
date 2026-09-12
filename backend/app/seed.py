from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from .models.catalog import DatasetModel, TableModel, ColumnModel
from .models.quality import QualityRuleModel

def seed_db():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    try:
        if db.query(DatasetModel).count() == 0:
            ds1 = DatasetModel(
                id="ds-fin-001",
                name="Global Financial Ledger Transactions",
                slug="global-financial-ledger-transactions",
                description="Core double-entry accounting ledger entries with high-frequency monetary transaction records across multi-region nodes.",
                data_source="Snowflake Data Warehouse",
                domain="FINANCE",
                row_count=18450000,
                size_bytes=1420000000,
                quality_score=99.4,
                risk_score=8.5,
                risk_level="LOW",
                sensitivity_level="CONFIDENTIAL",
                is_certified=True
            )
            ds2 = DatasetModel(
                id="ds-cust-002",
                name="Customer Master PII & KYC Registry",
                slug="customer-master-pii-kyc-registry",
                description="Master record of active customer profiles, identities, hashed SSN/Tax IDs, and compliance verification status.",
                data_source="PostgreSQL Core DB",
                domain="CUSTOMER",
                row_count=4200000,
                size_bytes=680000000,
                quality_score=94.1,
                risk_score=72.0,
                risk_level="HIGH",
                sensitivity_level="RESTRICTED",
                is_certified=True
            )
            ds3 = DatasetModel(
                id="ds-tele-003",
                name="Edge IoT Telemetry Stream",
                slug="edge-iot-telemetry-stream",
                description="Real-time sensor logs from distributed edge infrastructure nodes measuring temperature, latency, and CPU load.",
                data_source="Apache Kafka Cluster",
                domain="ENGINEERING",
                row_count=98000000,
                size_bytes=8900000000,
                quality_score=91.8,
                risk_score=24.0,
                risk_level="MEDIUM",
                sensitivity_level="INTERNAL",
                is_certified=False
            )
            db.add_all([ds1, ds2, ds3])
            db.commit()

            # Seed quality rules
            qr1 = QualityRuleModel(
                name="Transaction Amount Non-Null & Positive",
                dataset_id="ds-fin-001",
                column_name="amount",
                rule_type="RANGE_VALIDATION",
                severity="CRITICAL",
                is_active=True,
                last_execution_status="PASSED"
            )
            qr2 = QualityRuleModel(
                name="KYC SSN Hash Format Regex Match",
                dataset_id="ds-cust-002",
                column_name="ssn_hash",
                rule_type="REGEX_MATCH",
                severity="CRITICAL",
                is_active=True,
                last_execution_status="PASSED"
            )
            qr3 = QualityRuleModel(
                name="Edge Telemetry Latency Spike Anomaly",
                dataset_id="ds-tele-003",
                column_name="latency_ms",
                rule_type="STATISTICAL_OUTLIER",
                severity="MEDIUM",
                is_active=True,
                last_execution_status="WARNING"
            )
            db.add_all([qr1, qr2, qr3])
            db.commit()
            print("[DataTrust Seed Engine] Database seeded successfully.")
    except Exception as e:
        db.rollback()
        print("[DataTrust Seed Engine] Error seeding DB:", e)
    finally:
        db.close()
