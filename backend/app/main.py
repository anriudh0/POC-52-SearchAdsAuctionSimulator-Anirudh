from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from .data import load_fallback_payload
from .simulation import simulate_auction

app = FastAPI(
    title="Search Ads Auction Simulator API",
    version="0.1.0",
    description="Synthetic search ads auction simulation for Real Rails PoC 52.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root() -> dict[str, str]:
    return {
        "project": "PoC 52 - Search Ads Auction Simulator",
        "status": "backend ready",
        "rail": "Distribution & Demand",
    }


@app.get("/auction/simulate")
def get_auction_simulation(
    bid_multiplier: float = Query(1.0, ge=0.2, le=2.5),
    quality_weight: float = Query(1.0, ge=0.5, le=1.8),
    budget_pressure: float = Query(1.0, ge=0.5, le=2.0),
    keyword: str = "small business payroll",
    market: str = "United States",
):
    try:
        return simulate_auction(
            bid_multiplier=bid_multiplier,
            quality_weight=quality_weight,
            budget_pressure=budget_pressure,
            keyword=keyword,
            market=market,
        )
    except Exception:
        payload = load_fallback_payload()
        payload["metrics"]["source"] = "mock_fallback"
        return payload


@app.get("/auction/sample")
def get_sample_data():
    return load_fallback_payload()

