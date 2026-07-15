"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Music, Users, Bot, Monitor } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LandingSection } from "@/components/landing/section-shell";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = [
  { icon: Music, titleKey: "landingHighlight0Title" as const, descKey: "landingHighlight0Desc" as const, span: "lg:col-span-2" },
  { icon: Users, titleKey: "landingHighlight1Title" as const, descKey: "landingHighlight1Desc" as const },
  { icon: Bot, titleKey: "landingHighlight2Title" as const, descKey: "landingHighlight2Desc" as const },
  { icon: Monitor, titleKey: "landingHighlight3Title" as const, descKey: "landingHighlight3Desc" as const, span: "lg:col-span-2" },
];

function HighlightCard({
  icon: Icon,
  title,
  description,
  index,
  span,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  span?: string;
}) {
  const reduceMotion = useReducedMotion();
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      data-reveal
      whileHover={reduceMotion ? undefined : { y: -8, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-blue-500/12 bg-[#0a101c]/70 p-6 sm:p-8",
        "transition-colors hover:border-blue-400/25 hover:bg-[#0c1424]/90",
        span,
      )}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden
      />
      <p className="font-mono text-xs tabular-nums text-blue-300/40">( {num} )</p>
      <div className="mb-4 mt-4 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
        <Icon className="h-5 w-5 text-blue-300" strokeWidth={1.75} />
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
    </motion.div>
  );
}

export function LandingHighlightsSection() {
  const { t } = useTranslation();
  const sectionRef = useGsapReveal<HTMLDivElement>({ y: 36, stagger: 0.1 });

  return (
    <LandingSection
      id="features"
      align="center"
      eyebrow={t("landingHighlightsEyebrow")}
      title={
        <>
          {t("landingHighlightsTitleBefore")}
          <span className="bg-gradient-to-r from-blue-200 to-sky-300 bg-clip-text text-transparent">
            {t("landingHighlightsTitleAccent")}
          </span>
        </>
      }
      description={t("landingHighlightsLead")}
    >
      <div ref={sectionRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {HIGHLIGHTS.map((item, i) => (
          <HighlightCard
            key={item.titleKey}
            icon={item.icon}
            title={t(item.titleKey)}
            description={t(item.descKey)}
            index={i}
            span={item.span}
          />
        ))}
      </div>
    </LandingSection>
  );
}
