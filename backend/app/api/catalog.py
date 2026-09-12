from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models.catalog import DatasetModel, TableModel, ColumnModel
from ..engine.ingestion import LocalDataIngestionEngine

router = APIRouter(prefix="/catalog", tags=["Data Catalog"])

@router.get("/datasets")
def list_datasets(domain: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(DatasetModel)
    if domain and domain != "ALL":
        query = query.filter(DatasetModel.domain == domain)
    datasets = query.all()
    return datasets

@router.post("/datasets")
def register_dataset(name: str, domain: str, data_source: str, description: str = "", db: Session = Depends(get_db)):
    slug = name.lower().replace(" ", "-")
    existing = db.query(DatasetModel).filter(DatasetModel.slug == slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Dataset with this name already registered.")

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
    db.add(dataset)
    db.commit()
    db.refresh(dataset)
    return dataset

@router.get("/datasets/{dataset_id}")
def get_dataset_details(dataset_id: str, db: Session = Depends(get_db)):
    dataset = db.query(DatasetModel).filter(DatasetModel.id == dataset_id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return dataset
