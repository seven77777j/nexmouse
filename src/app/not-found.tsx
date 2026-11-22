import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl text-white">Página no encontrada.</h1>
      <ButtonLink href="/products" variant="outline" className="mt-8">Volver a la colección</ButtonLink>
    </div>
  );
}
