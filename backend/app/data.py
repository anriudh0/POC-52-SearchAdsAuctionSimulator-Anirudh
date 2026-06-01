from __future__ import annotations

import json
from pathlib import Path

from .models import Advertiser

MOCK_DATA_PATH = Path(__file__).resolve().parent.parent / "mock_data.json"


def base_advertisers() -> list[Advertiser]:
    return [
        Advertiser(
            advertiser="Northstar Retail",
            keyword="small business payroll",
            max_bid=7.8,
            quality_score=8.6,
            expected_ctr=0.083,
            conversion_rate=0.062,
            revenue_per_conversion=420,
            daily_budget=4800,
            sector="SMB software",
        ),
        Advertiser(
            advertiser="LedgerLane",
            keyword="small business payroll",
            max_bid=6.4,
            quality_score=9.2,
            expected_ctr=0.091,
            conversion_rate=0.054,
            revenue_per_conversion=390,
            daily_budget=3600,
            sector="Fintech",
        ),
        Advertiser(
            advertiser="ScaleWorks HR",
            keyword="small business payroll",
            max_bid=8.5,
            quality_score=6.7,
            expected_ctr=0.071,
            conversion_rate=0.049,
            revenue_per_conversion=450,
            daily_budget=5200,
            sector="HR platform",
        ),
        Advertiser(
            advertiser="Foundry Bank",
            keyword="small business payroll",
            max_bid=5.9,
            quality_score=7.8,
            expected_ctr=0.064,
            conversion_rate=0.044,
            revenue_per_conversion=510,
            daily_budget=2900,
            sector="Banking",
        ),
        Advertiser(
            advertiser="Orbit Benefits",
            keyword="small business payroll",
            max_bid=4.6,
            quality_score=8.1,
            expected_ctr=0.058,
            conversion_rate=0.038,
            revenue_per_conversion=330,
            daily_budget=2100,
            sector="Benefits",
        ),
    ]


def load_fallback_payload() -> dict:
    with MOCK_DATA_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)

