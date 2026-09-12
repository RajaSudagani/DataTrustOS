from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from ..models.quality import QualityRuleModel, QualityIssueModel

class QualityDomainService:
    """Service layer managing data quality rules, execution runs, and quality issue resolutions."""

    def __init__(self, db: Session):
        self.db = db

    def get_active_rules(self, dataset_id: Optional[str] = None) -> List[QualityRuleModel]:
        query = self.db.query(QualityRuleModel).filter(QualityRuleModel.is_active == True)
        if dataset_id:
            query = query.filter(QualityRuleModel.dataset_id == dataset_id)
        return query.all()

    def create_rule(self, name: str, dataset_id: str, rule_type: str, column_name: Optional[str] = None, severity: str = "CRITICAL") -> QualityRuleModel:
        rule = QualityRuleModel(
            name=name,
            dataset_id=dataset_id,
            column_name=column_name,
            rule_type=rule_type,
            severity=severity,
            is_active=True
        )
        self.db.add(rule)
        self.db.commit()
        self.db.refresh(rule)
        return rule

    def log_quality_issue(self, rule_id: str, dataset_id: str, description: str, failed_count: int, total_evaluated: int) -> QualityIssueModel:
        issue = QualityIssueModel(
            rule_id=rule_id,
            dataset_id=dataset_id,
            issue_description=description,
            failed_count=failed_count,
            total_evaluated=total_evaluated,
            status="OPEN"
        )
        self.db.add(issue)
        self.db.commit()
        self.db.refresh(issue)
        return issue
