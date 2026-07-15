"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import {
  HeroDeviceShowcase,
  type HeroDeviceShowcaseProps,
} from "@/components/landing/HeroDeviceShowcase";
import { HeroAnimatedBadge } from "@/components/landing/HeroAnimatedBadge";
import { AnimatedButton } from "@/components/landing/animated-button";
import type { HeroDeviceLayout } from "@/lib/hero-device-layout";
import { useGsapEntrance } from "@/hooks/useGsapReveal";
import { useLenis, scrollWithLenis } from "@/components/providers/LenisProvider";

const ease = [0.16, 1, 0.3, 1] as const;

const heroStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

export type HeroSectionProps = {
  heroLiveLayout?: HeroDeviceLayout;
  heroLiveUsePlaceholders?: boolean;
  heroLivePhonePath?: string;
  heroLiveLaptopPath?: string;
  heroOrbitPreview?: HeroDeviceShowcaseProps["orbitPreview"];
};

export function HeroSection({
  heroLiveLayout,
  heroLiveUsePlaceholders,
  heroLivePhonePath,
  heroLiveLaptopPath,
  heroOrbitPreview,
}: HeroSectionProps = {}) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const heroRef = useGsapEntrance<HTMLDivElement>(0.12);
  const lenis = useLenis();

  const scrollToDemo = () => {
    const el = document.getElementById("demo");
    if (el) scrollWithLenis(lenis, el);
  };

  const stats = [
    { value: t("landingStatSongs"), label: t("landingStatSongsLabel") },
    { value: t("landingStatArtists"), label: t("landingStatArtistsLabel") },
    { value: t("landingStatPlaylists"), label: t("landingStatPlaylistsLabel") },
  ];

  const showcase = (
    <HeroDeviceShowcase
      reduceMotion={!!reduceMotion}
      liveLayout={heroLiveLayout}
      liveUsePlaceholders={heroLiveUsePlaceholders}
      livePhonePath={heroLivePhonePath}
      liveLaptopPath={heroLiveLaptopPath}
      orbitPreview={heroOrbitPreview}
    />
  );

  return (
    <div id="top" ref={heroRef} className="relative min-h-[100dvh] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-50"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(180deg, black 0%, black 70%, transparent 100%)",
        }}
      />

      {!isMobile ? (
        <div
          className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
          aria-hidden
        >
          <motion.div
            className="absolute right-[-10%] top-[8%] h-[min(85vh,780px)] w-[min(75vw,920px)] rounded-[48%] bg-gradient-to-tr from-blue-500/15 via-sky-400/8 to-transparent blur-[100px]"
            animate={reduceMotion ? undefined : { scale: [1, 1.05, 1], opacity: [0.4, 0.65, 0.4] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-4 pb-28 pt-28 sm:px-6 sm:pb-32 sm:pt-32 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-8 lg:pb-36 lg:pt-24">
        <motion.div
          data-landing-parallax
          className="relative max-w-2xl text-center lg:max-w-xl lg:text-left"
          variants={reduceMotion ? undefined : heroStagger}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
        >
          <motion.div variants={reduceMotion ? undefined : heroItem}>
            <HeroAnimatedBadge className="mb-6 lg:mb-8" />
          </motion.div>

          <motion.h1
            variants={reduceMotion ? undefined : heroItem}
            className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-foreground"
          >
            {t("landingHeroTitleLine1")}
            <span className="mt-1 block bg-gradient-to-r from-blue-200 via-sky-100 to-blue-300 bg-clip-text text-transparent">
              {t("landingHeroTitleLine2")}
            </span>
          </motion.h1>

          <motion.p
            variants={reduceMotion ? undefined : heroItem}
            className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg lg:mx-0 lg:max-w-md"
          >
            {t("landingHeroLead")}
          </motion.p>

          <motion.div
            variants={reduceMotion ? undefined : heroItem}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <AnimatedButton href="/register" size="lg" variant="primary">
              {t("landingHeroCtaStart")}
            </AnimatedButton>
            <AnimatedButton size="lg" variant="secondary" onClick={scrollToDemo}>
              {t("landingHeroCtaDemo")}
            </AnimatedButton>
          </motion.div>

          <motion.div
            variants={reduceMotion ? undefined : heroItem}
            className="mt-10 grid grid-cols-3 gap-4 border-t border-blue-500/10 pt-8 sm:gap-6 lg:justify-start"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-blue-300/45 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {!isMobile ? (
          <div
            className={cn(
              "relative hidden min-h-[min(72vh,640px)] lg:block",
              !heroOrbitPreview && "pointer-events-none",
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {showcase}
            </div>
          </div>
        ) : null}
      </div>

      {isMobile ? (
        <div className="relative z-10 mx-auto -mt-8 max-w-lg px-4 pb-16 sm:px-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-blue-500/15 bg-[#0a101c]/50">
            {showcase}
          </div>
        </div>
      ) : null}

      <motion.button
        type="button"
        onClick={scrollToDemo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: isMobile ? 0.35 : 0.85, duration: 0.45 }}
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 cursor-pointer border-0 bg-transparent"
        aria-label={t("landingHeroScrollHint")}
      >
        <div className="flex flex-col items-center gap-2 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-blue-300/50 transition hover:text-blue-200/80">
          <span>{t("landingHeroScrollHint")}</span>
          {!isMobile && !reduceMotion ? (
            <motion.svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          ) : (
            <svg className="h-5 w-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
        </div>
      </motion.button>
    </div>
  );
}
