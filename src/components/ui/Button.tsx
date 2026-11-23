import Link from "next/link";
import { cn } from "@/lib/format";

type Variant = "primary" | "ghost" | "outline";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 h-12 text-sm font-medium tracking-wide transition-all duration-500 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary: "bg-[#f2ede4] text-ink hover:bg-accent hover:text-white",
  outline: "border border-white/15 text-white hover:border-white/40 hover:bg-white/[0.04]",
  ghost: "text-white/70 hover:text-white",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={buttonClass(variant, className)} {...props} />;
}
