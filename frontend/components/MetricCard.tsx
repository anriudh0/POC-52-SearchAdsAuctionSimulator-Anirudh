type Props = {
  label: string;
  value: string;
  caption: string;
};

export function MetricCard({ label, value, caption }: Props) {
  return (
    <div className="terminal-card rounded-lg p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-5 text-slate-400">{caption}</p>
    </div>
  );
}
