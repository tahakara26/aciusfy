"use client";

import { useReducedMotion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";

export function LandingMarqueeStrip() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const items = [
    t("landingMarquee0"),
    t("landingMarquee1"),
    t("landingMarquee2"),
    t("landingMarquee3"),
    t("landingMarquee4"),
  ];
  const loop = [...items, ...items];

  return (
    <section
      className="relative overflow-hidden border-y border-blue-500/10 bg-[#060a14]/80 py-4"
      aria-label={t("landingMarqueeAria")}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#050810] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#050810] to-transparent"
        aria-hidden
      />
      <div
        className={cn(
          "flex w-max gap-12 whitespace-nowrap px-6",
          !reduceMotion && "animate-landing-marquee hover:[animation-play-state:paused]",
        )}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-12 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-200/35"
          >
            <span>{item}</span>
            <span className="h-1 w-1 rounded-full bg-blue-400/40" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );

}
