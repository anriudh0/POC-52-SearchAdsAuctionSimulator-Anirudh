"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import type { AuctionResponse } from "@/lib/types";

type Props = {
  data: AuctionResponse;
};

export function AuctionChart({ data }: Props) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current, "dark");
    chart.setOption({
      backgroundColor: "transparent",
      color: ["#38BDF8", "#818CF8"],
      tooltip: {
        trigger: "axis",
        backgroundColor: "#0B1117",
        borderColor: "#1F2937",
        textStyle: { color: "#E5E7EB" }
      },
      legend: {
        top: 0,
        textStyle: { color: "#94A3B8" }
      },
      grid: {
        left: 52,
        right: 28,
        top: 48,
        bottom: 46
      },
      xAxis: {
        type: "category",
        data: data.rows.map((row) => `#${row.position} ${row.advertiser}`),
        axisLabel: { color: "#94A3B8", interval: 0, rotate: 18 },
        axisLine: { lineStyle: { color: "#1F2937" } }
      },
      yAxis: [
        {
          type: "value",
          name: "CPC",
          axisLabel: { color: "#94A3B8", formatter: "${value}" },
          splitLine: { lineStyle: { color: "#1F2937" } }
        },
        {
          type: "value",
          name: "Margin",
          axisLabel: { color: "#94A3B8", formatter: "${value}" },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: "CPC",
          type: "bar",
          data: data.rows.map((row) => row.cpc),
          barMaxWidth: 34,
          itemStyle: {
            borderRadius: [6, 6, 0, 0]
          }
        },
        {
          name: "Margin",
          type: "line",
          yAxisIndex: 1,
          smooth: true,
          data: data.rows.map((row) => row.margin),
          symbolSize: 9,
          lineStyle: { width: 3 }
        }
      ]
    });

    const onResize = () => chart.resize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} className="h-[320px] w-full" aria-label="CPC and margin chart" />;
}
