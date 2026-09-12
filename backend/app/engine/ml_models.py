import numpy as np
from sklearn.ensemble import IsolationForest
from typing import Dict, Any, List

class LocalMLIntelligenceEngine:
    """Local Scikit-Learn machine learning engine for statistical anomaly detection and similarity scoring."""

    @staticmethod
    def detect_anomalies(data: List[float], contamination: float = 0.05) -> Dict[str, Any]:
        """Detect numeric vector anomalies using Isolation Forest."""
        if len(data) < 5:
            return {"anomaliesCount": 0, "anomalyIndices": [], "status": "INSUFFICIENT_SAMPLES"}

        X = np.array(data).reshape(-1, 1)
        clf = IsolationForest(contamination=contamination, random_state=42)
        preds = clf.fit_predict(X)
        
        anomaly_indices = np.where(preds == -1)[0].tolist()

        return {
            "totalEvaluated": len(data),
            "anomaliesCount": len(anomaly_indices),
            "anomalyIndices": anomaly_indices,
            "status": "COMPLETED"
        }

    @staticmethod
    def calculate_dataset_similarity(columns1: List[str], columns2: List[str]) -> float:
        """Jaccard / Cosine similarity estimate for duplicate dataset detection."""
        set1 = set(c.lower() for c in columns1)
        set2 = set(c.lower() for c in columns2)

        if not set1 or not set2:
            return 0.0

        intersection = len(set1.intersection(set2))
        union = len(set1.union(set2))
        return round((intersection / union) * 100, 2)
