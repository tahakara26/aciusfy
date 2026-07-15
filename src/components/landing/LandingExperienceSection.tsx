"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Headphones, Radio, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LandingSection } from "@/components/landing/section-shell";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { cn } from "@/lib/utils";

const STEPS: { icon: LucideIcon; titleKey: "landingFlow0Title" | "landingFlow1Title" | "landingFlow2Title"; descKey: "landingFlow0Desc" | "landingFlow1Desc" | "landingFlow2Desc" }[] = [
  { icon: Headphones, titleKey: "landingFlow0Title", descKey: "landingFlow0Desc" },
  { icon: Radio, titleKey: "landingFlow1Title", descKey: "landingFlow1Desc" },
  { icon: Users, titleKey: "landingFlow2Title", descKey: "landingFlow2Desc" },
];

function FlowCard({
  index,
  icon: Icon,
  title,
  description,
}: {
  index: number;
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  const reduceMotion = useReducedMotion();
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      data-reveal
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-blue-500/12 bg-[#0a101c]/70 p-6 sm:p-8",
        "transition-colors hover:border-blue-400/25 hover:bg-[#0c1424]/90",
      )}
    >
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-opacity group-hover:opacity-100"
        aria-hidden
      />
      <p className="font-mono text-xs tabular-nums text-blue-300/40">( {num} )</p>
      <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
        <Icon className="h-5 w-5 text-blue-300" strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
    </motion.article>
  );
}

export function LandingExperienceSection() {
  const { t } = useTranslation();
  const sectionRef = useGsapReveal<HTMLDivElement>({ y: 40, stagger: 0.12 });

  return (
    <LandingSection
      id="experience"
      align="center"
      eyebrow={t("landingFlowEyebrow")}
      title={
        <>
          {t("landingFlowTitleBefore")}
          <span className="bg-gradient-to-r from-blue-200 via-sky-100 to-blue-300 bg-clip-text text-transparent">
            {t("landingFlowTitleAccent")}
          </span>
        </>
      }
      description={t("landingFlowLead")}
    >
      <div ref={sectionRef} className="grid gap-4 md:grid-cols-3 md:gap-5">
        {STEPS.map((step, i) => (
          <FlowCard
            key={step.titleKey}
            index={i}
            icon={step.icon}
            title={t(step.titleKey)}
            description={t(step.descKey)}
          />
        ))}
      </div>
    </LandingSection>
  );
}
