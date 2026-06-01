"use client";

import { useEffect, useMemo, useState } from "react";
import { AuctionChart } from "@/components/AuctionChart";
import { AuctionTable } from "@/components/AuctionTable";
import { MetricCard } from "@/components/MetricCard";
import { fetchAuction, type SimulationParams } from "@/lib/api";
import type { AuctionResponse } from "@/lib/types";

const initialParams: SimulationParams = {
  bidMultiplier: 1,
  qualityWeight: 1,
  budgetPressure: 1
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export default function Home() {
  const [params, setParams] = useState<SimulationParams>(initialParams);
  const [sector, setSector] = useState("All");
  const [data, setData] = useState<AuctionResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchAuction(params)
      .then((payload) => {
        if (active) setData(payload);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [params]);

  const filteredRows = useMemo(() => {
    if (!data) return [];
    if (sector === "All") return data.rows;
    return data.rows.filter((row) => row.sector === sector);
  }, [data, sector]);

  const sectors = useMemo(() => {
    if (!data) return ["All"];
    return ["All", ...Array.from(new Set(data.rows.map((row) => row.sector)))];
  }, [data]);

  const visibleData = useMemo(() => {
    if (!data) return null;
    return { ...data, rows: filteredRows };
  }, [data, filteredRows]);

  const downloadSample = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "search-ads-auction-sample.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (!data || !visibleData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-rails-bg text-slate-300">
        Loading auction intelligence...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-rails-bg text-slate-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <section className="w-full border-r border-rails-border p-5 lg:w-[70%]">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-rails-cyan">Real Rails PoC 52</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">Search Ads Auction Simulator</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                A synthetic replay of how bids, quality scores, and platform rank logic price the rail
                between buyer intent and advertiser visibility.
              </p>
            </div>
            <span className="rounded-full border border-rails-border bg-rails-surface px-3 py-2 text-xs text-slate-300">
              {data.metrics.source === "simulation" ? "FastAPI simulation" : "Mock fallback"}
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <MetricCard
              label="Top rail access"
              value={data.metrics.top_advertiser}
              caption="Highest ad rank after bid and quality score are combined."
            />
            <MetricCard
              label="Avg CPC"
              value={`$${data.metrics.average_cpc.toFixed(2)}`}
              caption="The price of one click after the auction clears."
            />
            <MetricCard
              label="Total margin"
              value={money.format(data.metrics.total_margin)}
              caption="Estimated revenue after synthetic media spend."
            />
            <MetricCard
              label="Capture score"
              value={`${data.metrics.demand_capture_score.toFixed(1)}/100`}
              caption="A compact read on how strongly the leader controls demand access."
            />
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="terminal-card rounded-lg p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">CPC Outcomes and Margin Impact</h2>
                  <p className="text-sm text-slate-400">Bars show CPC. Line shows advertiser margin.</p>
                </div>
                {loading && <span className="text-xs text-rails-cyan">Loading...</span>}
              </div>
              <AuctionChart data={visibleData} />
            </div>

            <div className="terminal-card rounded-lg p-4">
              <h2 className="text-lg font-semibold text-white">Rank Logic</h2>
              <div className="mt-4 space-y-3">
                {filteredRows.map((row) => (
                  <div key={row.advertiser} className="rounded-lg border border-rails-border bg-black/20 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-white">#{row.position} {row.advertiser}</p>
                      <p className="text-sm text-rails-cyan">{row.ad_rank.toFixed(2)} rank</p>
                    </div>
                    <p className="mt-2 text-sm leading-5 text-slate-400">{row.insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="terminal-card mt-5 rounded-lg p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-white">Auction Table</h2>
                <p className="text-sm text-slate-400">Synthetic keyword bidders ranked by ad rank.</p>
              </div>
              <select
                value={sector}
                onChange={(event) => setSector(event.target.value)}
                className="rounded-md border border-rails-border bg-rails-surface px-3 py-2 text-sm text-white shadow-glow outline-none"
              >
                {sectors.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <AuctionTable rows={filteredRows} />
          </div>
        </section>

        <aside className="w-full bg-rails-surface/55 p-5 lg:w-[30%]">
          <div className="sticky top-5 space-y-5">
            <section className="terminal-card rounded-lg p-5 shadow-glow">
              <p className="text-xs uppercase tracking-[0.18em] text-rails-indigo">{data.sidebar.rail_category}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{data.sidebar.title}</h2>
              <div className="mt-5 rounded-lg border border-rails-border bg-cyan-400/5 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  {data.sidebar.high_level_metric_label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-rails-cyan">
                  {data.sidebar.high_level_metric_value}
                </p>
              </div>
            </section>

            <section className="terminal-card rounded-lg p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-rails-cyan">
                Why This Matters
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{data.sidebar.why_this_matters}</p>
            </section>

            <section className="terminal-card rounded-lg p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-rails-indigo">
                Who Controls the Rail
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{data.sidebar.who_controls}</p>
            </section>

            <section className="terminal-card rounded-lg p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">
                Filters and Levers
              </h3>
              <Slider
                label="Bid multiplier"
                value={params.bidMultiplier}
                min={0.2}
                max={2.5}
                step={0.1}
                suffix="x"
                onChange={(bidMultiplier) => setParams((current) => ({ ...current, bidMultiplier }))}
              />
              <Slider
                label="Quality weight"
                value={params.qualityWeight}
                min={0.5}
                max={1.8}
                step={0.1}
                suffix="x"
                onChange={(qualityWeight) => setParams((current) => ({ ...current, qualityWeight }))}
              />
              <Slider
                label="Budget pressure"
                value={params.budgetPressure}
                min={0.5}
                max={2}
                step={0.1}
                suffix="x"
                onChange={(budgetPressure) => setParams((current) => ({ ...current, budgetPressure }))}
              />
              <p className="mt-4 rounded-md border border-rails-border bg-black/20 p-3 text-xs leading-5 text-slate-400">
                Tooltip: CPC means cost per click. Quality score acts like a platform-controlled multiplier
                that can lower price for one advertiser and raise pressure on another.
              </p>
            </section>

            <button
              onClick={downloadSample}
              className="w-full rounded-lg border border-rails-cyan bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-rails-cyan shadow-glow transition hover:bg-cyan-400/15"
            >
              Download Sample Data
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="mt-4 block">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="text-rails-cyan">
          {value.toFixed(1)}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full accent-rails-cyan"
      />
    </label>
  );
}
