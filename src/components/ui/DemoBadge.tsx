export function DemoBadge({ children = "Datos de demostración" }: { children?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-amber-200/80">
      <span className="h-1 w-1 rounded-full bg-amber-300/80" />
      {children}
    </span>
  );
}
