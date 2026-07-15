"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { AnimatedButton } from "@/components/landing/animated-button";

export function LandingFinalCta() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  return (
    <section id="cta" className="landing-section">
      <div className="landing-section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[1.75rem] border border-blue-500/15 bg-gradient-to-br from-[#0c1424] via-[#070b14] to-[#050810] px-6 py-14 text-center sm:px-12 sm:py-20"
        >
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(37,99,235,0.22) 0%, transparent 65%)",
            }}
          />
          {!reduceMotion ? (
            <motion.div
              className="pointer-events-none absolute -left-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl"
              animate={{ x: [0, 24, 0], opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          ) : null}

          <p className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300/50">
            {t("landingFinalEyebrow")}
          </p>
          <h2 className="relative mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-foreground">
            {t("landingFinalTitle")}
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted">
            {t("landingFinalLead")}
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <AnimatedButton href="/register" size="lg">
              {t("landingCtaButton")}
            </AnimatedButton>
            <AnimatedButton href="/download" variant="secondary" size="lg">
              {t("landingNavDownload")}
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
