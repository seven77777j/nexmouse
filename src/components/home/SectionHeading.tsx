export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div data-reveal className="max-w-2xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">{eyebrow}</p>
      <h2 className="mt-5 font-display text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-white md:text-6xl">{title}</h2>
      {children && <p className="mt-6 text-base leading-relaxed text-white/50">{children}</p>}
    </div>
  );
}
