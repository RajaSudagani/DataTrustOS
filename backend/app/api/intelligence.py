from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from pydantic import BaseModel
from ..engine.ml_models import LocalMLIntelligenceEngine

router = APIRouter(prefix="/intelligence", tags=["Local AI/ML Intelligence"])

class AnomalyRequest(BaseModel):
    values: List[float]
    contamination: float = 0.05

class SimilarityRequest(BaseModel):
    columnsDatasetA: List[str]
    columnsDatasetB: List[str]

@router.post("/detect-anomalies")
def detect_anomalies(request: AnomalyRequest):
    """Run local Scikit-Learn IsolationForest anomaly detection on numeric telemetry."""
    res = LocalMLIntelligenceEngine.detect_anomalies(request.values, request.contamination)
    return res

@router.post("/dataset-similarity")
def dataset_similarity(request: SimilarityRequest):
    """Calculate column-similarity between two datasets to detect duplicates."""
    score = LocalMLIntelligenceEngine.calculate_dataset_similarity(request.columnsDatasetA, request.columnsDatasetB)
    return {"similarityScore": score, "isDuplicateCandidate": score > 85.0}
