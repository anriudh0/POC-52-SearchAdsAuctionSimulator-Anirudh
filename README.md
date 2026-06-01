# PoC 52: Search Ads Auction Simulator

Search Ads Auction Simulator is a Real Rails Intelligence Library proof of concept for the **Distribution & Demand** rail. It shows how keyword auctions turn attention into priced access through bids, quality scores, ranking logic, CPC outcomes, and margin impact.

The current implementation is backend-first, following the Real Rails execution protocol. The FastAPI service generates clearly labeled synthetic advertiser data and returns structured JSON for the future Next.js dashboard.

## Current Status

- FastAPI backend scaffolded.
- Synthetic auction data generation added.
- Rank, CPC, click, revenue, and margin simulation implemented.
- Local `mock_data.json` fallback added for demo resilience.
- Backend tests added for simulation and API behavior.
- Dependency pins are compatible with the local Python 3.14.5 environment.

## Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API endpoints:

- `GET /` returns project status.
- `GET /auction/simulate` returns the simulated auction table, sidebar copy, CPC curve, margin impact, and high-level metrics.
- `GET /auction/sample` returns the checked-in fallback payload.

Run backend tests:

```bash
cd backend
pytest
```

## Real Rails Constraints

- Visual target for the frontend: `#030712` dashboard with a 70% main stage and 30% intelligence sidebar.
- Sidebar content must include why demand capture matters, who controls the rail, filters, tooltips, and sample data download.
- All private search ad records are synthetic and must remain clearly labeled in public demos.
