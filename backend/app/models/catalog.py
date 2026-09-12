from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
import uuid
from ..database import Base

def generate_uuid():
    return str(uuid.uuid4())

class DatasetModel(Base):
    __tablename__ = "datasets"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), nullable=False, unique=True, index=True)
    description = Column(Text, nullable=True)
    data_source = Column(String(100), nullable=False)
    environment = Column(String(50), default="PRODUCTION")
    domain = Column(String(100), nullable=False, index=True)
    row_count = Column(Integer, default=0)
    size_bytes = Column(Integer, default=0)
    quality_score = Column(Float, default=100.0)
    risk_score = Column(Float, default=0.0)
    risk_level = Column(String(20), default="LOW")
    sensitivity_level = Column(String(50), default="INTERNAL")
    is_certified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    tables = relationship("TableModel", back_populates="dataset", cascade="all, delete-orphan")

class TableModel(Base):
    __tablename__ = "tables"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    dataset_id = Column(String(36), ForeignKey("datasets.id"), nullable=False)
    table_name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    row_count = Column(Integer, default=0)

    dataset = relationship("DatasetModel", back_populates="tables")
    columns = relationship("ColumnModel", back_populates="table", cascade="all, delete-orphan")

class ColumnModel(Base):
    __tablename__ = "columns"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    table_id = Column(String(36), ForeignKey("tables.id"), nullable=False)
    name = Column(String(255), nullable=False)
    data_type = Column(String(100), nullable=False)
    is_nullable = Column(Boolean, default=True)
    is_primary_key = Column(Boolean, default=False)
    description = Column(Text, nullable=True)
    sensitivity_level = Column(String(50), default="INTERNAL")
    pii_category = Column(String(100), nullable=True)
    completeness_score = Column(Float, default=100.0)

    table = relationship("TableModel", back_populates="columns")
