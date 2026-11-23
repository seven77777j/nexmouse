import { cn } from "@/lib/format";

/**
 * Luz de estudio color vino que se desplaza lentamente detrás del contenido.
 * Solo usa transform/opacity (GPU) y se detiene con prefers-reduced-motion.
 */
export function AmbientGlow({ className, intensity = 1 }: { className?: string; intensity?: number }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} style={{ opacity: intensity }}>
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
    </div>
  );
}
