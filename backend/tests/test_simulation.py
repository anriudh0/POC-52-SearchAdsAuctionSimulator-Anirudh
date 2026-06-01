from fastapi.testclient import TestClient

from app.main import app
from app.simulation import simulate_auction


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
