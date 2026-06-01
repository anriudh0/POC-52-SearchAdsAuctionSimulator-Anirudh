from __future__ import annotations

import math

import pandas as pd

from .data import base_advertisers
from .models import AuctionResponse, AuctionRow, ScenarioMetrics, SidebarCopy


def _round(value: float, digits: int = 2) -> float:
    return round(float(value), digits)


def simulate_auction(
    bid_multiplier: float = 1.0,
    quality_weight: float = 1.0,
    budget_pressure: float = 1.0,
    keyword: str = "small business payroll",
    market: str = "United States",
) -> AuctionResponse:
    if bid_multiplier <= 0 or quality_weight <= 0 or budget_pressure <= 0:
        raise ValueError("Simulation parameters must be positive.")

    records = [item.model_dump() for item in base_advertisers() if item.keyword == keyword]
    if not records:
        raise ValueError(f"No synthetic auction data is available for keyword: {keyword}")

    df = pd.DataFrame(records)
    df["max_bid"] = df["max_bid"] * bid_multiplier
    df["ad_rank"] = df["max_bid"] * (df["quality_score"] ** quality_weight)
    df = df.sort_values("ad_rank", ascending=False).reset_index(drop=True)
    df["position"] = df.index + 1

    next_ranks = df["ad_rank"].shift(-1).fillna(df["ad_rank"].min() * 0.62)
    df["cpc"] = (next_ranks / (df["quality_score"] ** quality_weight)) + 0.01
    df["cpc"] = df[["cpc", "max_bid"]].min(axis=1)

    impression_base = 8200 * budget_pressure
    position_decay = df["position"].map(lambda pos: math.pow(0.68, pos - 1))
    df["estimated_clicks"] = (impression_base * df["expected_ctr"] * position_decay).round().astype(int)
    df["estimated_spend"] = df["estimated_clicks"] * df["cpc"]
    df["estimated_revenue"] = df["estimated_clicks"] * df["conversion_rate"] * df["revenue_per_conversion"]
    df["margin"] = df["estimated_revenue"] - df["estimated_spend"]
    df["margin_rate"] = df["margin"] / df["estimated_revenue"].replace(0, pd.NA)
    df["margin_rate"] = df["margin_rate"].fillna(0)

    avg_cpc = float(df["cpc"].mean())
    avg_margin_rate = float(df["margin_rate"].mean())
    top_ad_rank = float(df["ad_rank"].max())
    df["insight"] = df.apply(
        lambda row: (
            f"{row['advertiser']} pays {((row['cpc'] / avg_cpc) - 1) * 100:+.0f}% vs average CPC "
            f"and holds rank #{int(row['position'])} through a {row['quality_score']:.1f}/10 quality score."
        ),
        axis=1,
    )

    rows = [
        AuctionRow(
            advertiser=row.advertiser,
            keyword=row.keyword,
            max_bid=_round(row.max_bid),
            quality_score=_round(row.quality_score, 1),
            expected_ctr=_round(row.expected_ctr, 3),
            conversion_rate=_round(row.conversion_rate, 3),
            revenue_per_conversion=_round(row.revenue_per_conversion),
            daily_budget=_round(row.daily_budget),
            sector=row.sector,
            ad_rank=_round(row.ad_rank),
            position=int(row.position),
            cpc=_round(row.cpc),
            estimated_clicks=int(row.estimated_clicks),
            estimated_spend=_round(row.estimated_spend),
            estimated_revenue=_round(row.estimated_revenue),
            margin=_round(row.margin),
            margin_rate=_round(row.margin_rate, 3),
            insight=row.insight,
        )
        for row in df.itertuples(index=False)
    ]

    total_spend = float(df["estimated_spend"].sum())
    total_revenue = float(df["estimated_revenue"].sum())
    total_margin = float(df["margin"].sum())
    margin_rate = total_margin / total_revenue if total_revenue else 0
    demand_capture_score = min(100, (top_ad_rank / 75) * 100)

    metrics = ScenarioMetrics(
        top_advertiser=str(df.iloc[0]["advertiser"]),
        average_cpc=_round(avg_cpc),
        total_spend=_round(total_spend),
        total_revenue=_round(total_revenue),
        total_margin=_round(total_margin),
        margin_rate=_round(margin_rate, 3),
        demand_capture_score=_round(demand_capture_score, 1),
        source="simulation",
    )

    sidebar = SidebarCopy(
        title="Search Ads Auction Simulator",
        rail_category="Distribution & Demand",
        why_this_matters="Demand capture has hidden rails: a search result is not just a list, it is an auction shaped by bid prices, quality scores, platform rules, and advertiser economics.",
        who_controls="The platform algorithm controls rank and price, forcing advertisers to compete through both spend and quality signals before they can reach demand.",
        high_level_metric_label="Demand Capture Score",
        high_level_metric_value=f"{metrics.demand_capture_score:.1f}/100",
    )

    return AuctionResponse(
        scenario="Synthetic auction replay",
        keyword=keyword,
        market=market,
        budget_pressure=_round(budget_pressure, 2),
        quality_weight=_round(quality_weight, 2),
        metrics=metrics,
        sidebar=sidebar,
        rows=rows,
        cpc_curve=[
            {"position": int(row.position), "advertiser": row.advertiser, "cpc": _round(row.cpc)}
            for row in df.itertuples(index=False)
        ],
        margin_impact=[
            {
                "advertiser": row.advertiser,
                "margin": _round(row.margin),
                "margin_rate": _round(row.margin_rate, 3),
            }
            for row in df.itertuples(index=False)
        ],
        notes=[
            "All advertiser records are synthetic and labeled for demonstration.",
            "CPC uses the standard generalized second-price intuition: next advertiser rank divided by current quality score, plus a small increment.",
            f"Average margin rate is {avg_margin_rate:.1%}, showing whether paid demand is compounding or eroding unit economics.",
        ],
    )

