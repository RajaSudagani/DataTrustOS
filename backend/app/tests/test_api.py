import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "UP"

def test_list_datasets():
    response = client.get("/api/v1/catalog/datasets")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_anomaly_detection_ml():
    payload = {
        "values": [10.0, 10.2, 9.8, 10.1, 105.4, 9.9, 10.0, 10.1],
        "contamination": 0.1
    }
    response = client.post("/api/v1/intelligence/detect-anomalies", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "COMPLETED"
    assert data["anomaliesCount"] >= 1
