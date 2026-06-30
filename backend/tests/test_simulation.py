import json
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.simulation import simulate_auction


REPO_ROOT = Path(__file__).resolve().parents[2]


def test_simulation_returns_ranked_rows():
    response = simulate_auction()

    assert response.metrics.source == "simulation"
    assert len(response.rows) == 5
    assert [row.position for row in response.rows] == [1, 2, 3, 4, 5]
    assert response.rows[0].ad_rank >= response.rows[1].ad_rank
    assert all(row.insight for row in response.rows)


def test_simulation_parameters_change_outcomes():
    baseline = simulate_auction()
    stressed = simulate_auction(budget_pressure=1.5, quality_weight=1.2)

    assert stressed.metrics.total_spend > baseline.metrics.total_spend
    assert stressed.quality_weight == 1.2


def test_api_root_and_simulate_endpoint():
    client = TestClient(app)

    root = client.get("/")
    assert root.status_code == 200
    assert root.json()["rail"] == "Distribution & Demand"

    simulated = client.get("/auction/simulate", params={"bid_multiplier": 1.1})
    assert simulated.status_code == 200
    payload = simulated.json()
    assert payload["metrics"]["source"] == "simulation"
    assert payload["rows"][0]["position"] == 1


def test_fallback_payload_matches_generated_shape_and_metrics():
    payload = json.loads((REPO_ROOT / "backend" / "mock_data.json").read_text(encoding="utf-8"))
    rows = payload["rows"]
    metrics = payload["metrics"]

    assert metrics["source"] == "mock_fallback"
    assert len(rows) == 5
    assert [row["position"] for row in rows] == [1, 2, 3, 4, 5]
    assert len(payload["cpc_curve"]) == len(rows)
    assert len(payload["margin_impact"]) == len(rows)
    assert metrics["top_advertiser"] == rows[0]["advertiser"]
    assert metrics["average_cpc"] == pytest.approx(sum(row["cpc"] for row in rows) / len(rows), abs=0.01)
    assert metrics["total_spend"] == pytest.approx(sum(row["estimated_spend"] for row in rows), abs=0.05)
    assert metrics["total_revenue"] == pytest.approx(sum(row["estimated_revenue"] for row in rows), abs=0.05)
    assert metrics["total_margin"] == pytest.approx(sum(row["margin"] for row in rows), abs=0.05)
    assert metrics["margin_rate"] == pytest.approx(metrics["total_margin"] / metrics["total_revenue"], abs=0.001)


def test_frontend_and_backend_fallback_payloads_are_identical():
    backend_payload = (REPO_ROOT / "backend" / "mock_data.json").read_text(encoding="utf-8")
    frontend_payload = (REPO_ROOT / "frontend" / "public" / "mock_data.json").read_text(encoding="utf-8")

    assert frontend_payload == backend_payload


def test_sample_endpoint_returns_fallback_payload():
    client = TestClient(app)

    response = client.get("/auction/sample")
    assert response.status_code == 200
    payload = response.json()
    assert payload["metrics"]["source"] == "mock_fallback"
    assert len(payload["rows"]) == 5
