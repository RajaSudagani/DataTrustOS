import pandas as pd
import numpy as np
from typing import Dict, Any, List

class LocalDataIngestionEngine:
    """Local engine to profile CSV / JSON datasets and infer column types, completeness, and distinct values."""

    @staticmethod
    def profile_dataframe(df: pd.DataFrame) -> Dict[str, Any]:
        total_rows = len(df)
        columns_profile = []

        for col in df.columns:
            series = df[col]
            null_count = int(series.isnull().sum())
            distinct_count = int(series.nunique())
            completeness = round(((total_rows - null_count) / max(total_rows, 1)) * 100, 2)
            
            # Infer data type
            if pd.api.types.is_numeric_dtype(series):
                dtype_str = "FLOAT" if pd.api.types.is_float_dtype(series) else "INTEGER"
            elif pd.api.types.is_datetime64_any_dtype(series):
                dtype_str = "TIMESTAMP"
            elif pd.api.types.is_bool_dtype(series):
                dtype_str = "BOOLEAN"
            else:
                dtype_str = "VARCHAR(255)"

            # Infer PII sensitivity level based on column name heuristic
            col_lower = col.lower()
            sensitivity = "INTERNAL"
            pii_cat = None
            if "ssn" in col_lower or "social" in col_lower:
                sensitivity = "CRITICAL_PII"
                pii_cat = "SSN"
            elif "email" in col_lower or "mail" in col_lower:
                sensitivity = "CRITICAL_PII"
                pii_cat = "EMAIL"
            elif "card" in col_lower or "credit" in col_lower or "pan" in col_lower:
                sensitivity = "RESTRICTED"
                pii_cat = "FINANCIAL"
            elif "phone" in col_lower or "mobile" in col_lower:
                sensitivity = "CONFIDENTIAL"
                pii_cat = "PHONE"

            sample_vals = series.dropna().astype(str).head(3).tolist()

            columns_profile.append({
                "name": str(col),
                "dataType": dtype_str,
                "nullCount": null_count,
                "distinctCount": distinct_count,
                "completenessScore": completeness,
                "sensitivityLevel": sensitivity,
                "piiCategory": pii_cat,
                "sampleValues": sample_vals
            })

        overall_quality = round(np.mean([c["completenessScore"] for c in columns_profile]), 2) if columns_profile else 100.0

        return {
            "rowCount": total_rows,
            "columnCount": len(df.columns),
            "qualityScore": overall_quality,
            "columns": columns_profile
        }
