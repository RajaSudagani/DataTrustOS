import re
import numpy as np
import pandas as pd
from typing import Dict, Any, List

class LocalQualityEngine:
    """Declarative execution engine for data quality rules."""

    @staticmethod
    def execute_rule(df: pd.DataFrame, rule_type: str, column_name: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
        if column_name not in df.columns:
            return {"status": "FAILED", "failedCount": len(df), "totalEvaluated": len(df), "description": f"Column '{column_name}' not found."}

        series = df[column_name]
        total = len(series)
        failed_count = 0

        if rule_type == "NULL_CHECK":
            failed_count = int(series.isnull().sum())
        elif rule_type == "UNIQUE_CHECK":
            failed_count = int(series.duplicated().sum())
        elif rule_type == "REGEX_MATCH":
            pattern = parameters.get("pattern", r".*")
            regex = re.compile(pattern)
            failed_count = sum(1 for val in series.dropna().astype(str) if not regex.match(val))
        elif rule_type == "STATISTICAL_OUTLIER":
            if pd.api.types.is_numeric_dtype(series):
                clean = series.dropna()
                mean = clean.mean()
                std = clean.std()
                threshold = parameters.get("zScoreThreshold", 3.0)
                if std > 0:
                    z_scores = np.abs((clean - mean) / std)
                    failed_count = int((z_scores > threshold).sum())
        elif rule_type == "RANGE_VALIDATION":
            min_val = parameters.get("min")
            max_val = parameters.get("max")
            clean = series.dropna()
            if min_val is not None:
                failed_count += int((clean < min_val).sum())
            if max_val is not None:
                failed_count += int((clean > max_val).sum())

        status = "PASSED" if failed_count == 0 else "WARNING" if failed_count < (total * 0.05) else "FAILED"

        return {
            "status": status,
            "failedCount": failed_count,
            "totalEvaluated": total,
            "description": f"Evaluated {total} rows. Detected {failed_count} failed assertions."
        }
