import type { AuctionResponse } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export type SimulationParams = {
  bidMultiplier: number;
  qualityWeight: number;
  budgetPressure: number;
};

export async function fetchAuction(params: SimulationParams): Promise<AuctionResponse> {
  const query = new URLSearchParams({
    bid_multiplier: String(params.bidMultiplier),
    quality_weight: String(params.qualityWeight),
    budget_pressure: String(params.budgetPressure)
  });

  try {
    const response = await fetch(`${API_BASE}/auction/simulate?${query.toString()}`, {
      cache: "no-store"
    });
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    return (await response.json()) as AuctionResponse;
  } catch {
    const fallback = await fetch("/mock_data.json", { cache: "no-store" });
    return (await fallback.json()) as AuctionResponse;
  }
}
