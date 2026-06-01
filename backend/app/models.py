from typing import Literal

from pydantic import BaseModel, Field


class Advertiser(BaseModel):
    advertiser: str
    keyword: str
    max_bid: float = Field(ge=0)
    quality_score: float = Field(ge=1, le=10)
    expected_ctr: float = Field(ge=0, le=1)
    conversion_rate: float = Field(ge=0, le=1)
    revenue_per_conversion: float = Field(ge=0)
    daily_budget: float = Field(ge=0)
    sector: str


class AuctionRow(Advertiser):
    ad_rank: float
    position: int
    cpc: float
    estimated_clicks: int
    estimated_spend: float
    estimated_revenue: float
    margin: float
    margin_rate: float
    insight: str


class ScenarioMetrics(BaseModel):
    top_advertiser: str
    average_cpc: float
    total_spend: float
    total_revenue: float
    total_margin: float
    margin_rate: float
    demand_capture_score: float
    source: Literal["simulation", "mock_fallback"]


class SidebarCopy(BaseModel):
    title: str
    rail_category: str
    why_this_matters: str
    who_controls: str
    high_level_metric_label: str
    high_level_metric_value: str


class AuctionResponse(BaseModel):
    scenario: str
    keyword: str
    market: str
    budget_pressure: float
    quality_weight: float
    metrics: ScenarioMetrics
    sidebar: SidebarCopy
    rows: list[AuctionRow]
    cpc_curve: list[dict[str, float | int | str]]
    margin_impact: list[dict[str, float | str]]
    notes: list[str]

