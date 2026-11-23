import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label={`${siteConfig.name} — inicio`}>
      <svg width="18" height="24" viewBox="0 0 18 24" fill="none" aria-hidden>
        <rect x="0.75" y="0.75" width="16.5" height="22.5" rx="8.25" stroke="currentColor" strokeWidth="1.5" />
        <line x1="9" y1="4" x2="9" y2="9" stroke="#a42c42" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="font-display text-[15px] font-semibold tracking-[0.28em] uppercase">{siteConfig.name}</span>
    </Link>
  );
}
