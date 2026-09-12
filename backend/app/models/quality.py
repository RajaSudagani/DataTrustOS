from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text, JSON
from datetime import datetime, timezone
import uuid
from ..database import Base

def generate_uuid():
    return str(uuid.uuid4())

class QualityRuleModel(Base):
    __tablename__ = "quality_rules"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    dataset_id = Column(String(36), nullable=False, index=True)
    column_name = Column(String(255), nullable=True)
    rule_type = Column(String(100), nullable=False)  # NULL_CHECK, REGEX_MATCH, RANGE_VALIDATION, STATISTICAL_OUTLIER
    parameters = Column(JSON, default=dict)
    severity = Column(String(20), default="CRITICAL")
    is_active = Column(Boolean, default=True)
    last_execution_status = Column(String(50), default="NOT_RUN")
    last_run_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class QualityIssueModel(Base):
    __tablename__ = "quality_issues"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    rule_id = Column(String(36), nullable=False)
    dataset_id = Column(String(36), nullable=False)
    issue_description = Column(Text, nullable=False)
    failed_count = Column(Integer, default=0)
    total_evaluated = Column(Integer, default=0)
    status = Column(String(50), default="OPEN")
    assignee = Column(String(255), nullable=True)
    detected_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
