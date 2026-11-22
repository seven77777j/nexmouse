export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-10 md:pt-40" aria-busy="true" aria-label="Cargando productos">
      <div className="h-3 w-32 animate-pulse rounded-full bg-white/[0.06]" />
      <div className="mt-6 h-12 w-2/3 max-w-lg animate-pulse rounded-2xl bg-white/[0.06]" />
      <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[4/5] animate-pulse rounded-[28px] bg-white/[0.04]" />
            <div className="mt-6 h-3 w-20 animate-pulse rounded-full bg-white/[0.06]" />
            <div className="mt-3 h-5 w-40 animate-pulse rounded-full bg-white/[0.06]" />
          </div>
        ))}
      </div>
    </div>
  );
}
