from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from ..models.catalog import DatasetModel, TableModel, ColumnModel

class CatalogDomainService:
    """Service layer executing business logic for enterprise dataset discovery and catalog management."""

    def __init__(self, db: Session):
        self.db = db

    def get_datasets(self, domain: Optional[str] = None, environment: Optional[str] = None) -> List[DatasetModel]:
        query = self.db.query(DatasetModel)
        if domain and domain != "ALL":
            query = query.filter(DatasetModel.domain == domain)
        if environment:
            query = query.filter(DatasetModel.environment == environment)
        return query.all()

    def register_new_dataset(self, name: str, domain: str, data_source: str, description: str = "") -> DatasetModel:
        slug = name.lower().replace(" ", "-")
        existing = self.db.query(DatasetModel).filter(DatasetModel.slug == slug).first()
        if existing:
            return existing

        dataset = DatasetModel(
            name=name,
            slug=slug,
            domain=domain,
            data_source=data_source,
            description=description,
            quality_score=95.0,
            risk_score=15.0,
            risk_level="LOW",
            sensitivity_level="INTERNAL"
        )
        self.db.add(dataset)
        self.db.commit()
        self.db.refresh(dataset)
        return dataset

    def update_quality_score(self, dataset_id: str, new_score: float) -> Optional[DatasetModel]:
        dataset = self.db.query(DatasetModel).filter(DatasetModel.id == dataset_id).first()
        if dataset:
            dataset.quality_score = new_score
            self.db.commit()
            self.db.refresh(dataset)
        return dataset
