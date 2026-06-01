"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import type { AuctionRow } from "@/lib/types";

const columnHelper = createColumnHelper<AuctionRow>();

const columns = [
  columnHelper.accessor("position", {
    header: "Rank",
    cell: (info) => `#${info.getValue()}`
  }),
  columnHelper.accessor("advertiser", {
    header: "Advertiser"
  }),
  columnHelper.accessor("max_bid", {
    header: "Bid",
    cell: (info) => `$${info.getValue().toFixed(2)}`
  }),
  columnHelper.accessor("quality_score", {
    header: "Quality"
  }),
  columnHelper.accessor("ad_rank", {
    header: "Ad Rank",
    cell: (info) => info.getValue().toFixed(2)
  }),
  columnHelper.accessor("cpc", {
    header: "CPC",
    cell: (info) => `$${info.getValue().toFixed(2)}`
  }),
  columnHelper.accessor("margin_rate", {
    header: "Margin",
    cell: (info) => `${(info.getValue() * 100).toFixed(1)}%`
  })
];

export function AuctionTable({ rows }: { rows: AuctionRow[] }) {
  // TanStack Table intentionally returns table helpers that React Compiler cannot memoize.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="overflow-hidden rounded-lg border border-rails-border">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-slate-950/60 text-xs uppercase tracking-[0.14em] text-slate-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border-b border-rails-border px-3 py-3 font-medium">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-white/[0.015] hover:bg-cyan-400/5">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-b border-rails-border px-3 py-3 text-slate-200">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
