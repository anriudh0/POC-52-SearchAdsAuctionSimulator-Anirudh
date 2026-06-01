export type AuctionRow = {
  advertiser: string;
  keyword: string;
  max_bid: number;
  quality_score: number;
  expected_ctr: number;
  conversion_rate: number;
  revenue_per_conversion: number;
  daily_budget: number;
  sector: string;
  ad_rank: number;
  position: number;
  cpc: number;
  estimated_clicks: number;
  estimated_spend: number;
  estimated_revenue: number;
  margin: number;
  margin_rate: number;
  insight: string;
};

export type AuctionResponse = {
  scenario: string;
  keyword: string;
  market: string;
  budget_pressure: number;
  quality_weight: number;
  metrics: {
    top_advertiser: string;
    average_cpc: number;
    total_spend: number;
    total_revenue: number;
    total_margin: number;
    margin_rate: number;
    demand_capture_score: number;
    source: "simulation" | "mock_fallback";
  };
  sidebar: {
    title: string;
    rail_category: string;
    why_this_matters: string;
    who_controls: string;
    high_level_metric_label: string;
    high_level_metric_value: string;
  };
  rows: AuctionRow[];
  cpc_curve: Array<{ position: number; advertiser: string; cpc: number }>;
  margin_impact: Array<{ advertiser: string; margin: number; margin_rate: number }>;
  notes: string[];
};
