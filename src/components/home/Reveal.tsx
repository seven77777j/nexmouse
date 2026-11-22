"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Aparición sutil de los hijos marcados con [data-reveal] al entrar en pantalla. */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]", ref.current).forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 40,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
