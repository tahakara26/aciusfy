"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  Library,
  Play,
  SkipBack,
  SkipForward,
  Heart,
  ListMusic,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LandingSection } from "@/components/landing/section-shell";
import { AnimatedButton } from "@/components/landing/animated-button";
import { CollageCover, EditorialHeroCover } from "@/components/covers/PlaylistCovers";
import { cn } from "@/lib/utils";

type DemoSong = {
  coverImage?: string | null;
  title?: string;
  artist?: { name?: string | null; profileImage?: string | null };
};

type DemoSection = {
  id: string;
  title: string;
  genreLabel?: string;
  songs: DemoSong[];
  sectionType?: "artist" | "genre" | "popular";
  genreTitle?: string;
};

const DEMO_QUICK = [
  { title: "Günün Karışımı", color: "from-blue-600/40 to-indigo-900/60" },
  { title: "Beğenilenler", color: "from-sky-600/30 to-blue-900/50" },
  { title: "Haftalık Keşif", color: "from-cyan-600/25 to-blue-950/55" },
];

function DemoMixCard({ section, index }: { section: DemoSection; index: number }) {
  const covers = section.songs.map((s) => s.coverImage).filter(Boolean) as string[];
  const label =
    section.sectionType === "genre" && section.genreTitle
      ? `${section.genreTitle} Mix`
      : section.genreLabel ?? section.title;
  const subtitle = section.songs
    .slice(0, 2)
    .map((s) => s.artist?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="w-[108px] shrink-0">
      <div className="relative aspect-square overflow-hidden rounded-lg ring-1 ring-white/[0.06]">
        {covers.length >= 4 ? (
          <CollageCover coverImages={covers.slice(0, 4)} accentIndex={index} label={label} className="rounded-lg" />
        ) : (
          <EditorialHeroCover
            coverImage={covers[0]}
            title={label}
            subtitle={subtitle}
            accentIndex={index}
            className="rounded-lg"
          />
        )}
      </div>
      <p className="mt-1.5 truncate text-[10px] font-semibold text-white">{label}</p>
      <p className="truncate text-[9px] text-white/40">{subtitle || "Aciusfy"}</p>
    </div>
  );
}

function DemoQuickChip({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex h-9 shrink-0 items-center gap-2 overflow-hidden rounded-lg bg-white/[0.04] pr-3 ring-1 ring-white/[0.05]">
      <div className={cn("flex h-9 w-9 items-center justify-center bg-gradient-to-br", color)}>
        <ListMusic className="h-3.5 w-3.5 text-white/70" />
      </div>
      <span className="truncate text-[10px] font-semibold text-white/90">{title}</span>
    </div>
  );
}

function DemoPlayerBar() {
  return (
    <div className="flex items-center gap-3 border-t border-white/[0.06] bg-[#0a101c]/95 px-3 py-2">
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md bg-white/10">
        <div className="flex h-full w-full items-center justify-center">
          <ListMusic className="h-4 w-4 text-blue-300/60" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] font-semibold text-white">Demo Parça</p>
        <p className="truncate text-[9px] text-white/40">Sanatçı</p>
      </div>
      <div className="flex items-center gap-1.5 text-white/50">
        <SkipBack className="h-3.5 w-3.5" />
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#050810]">
          <Play className="h-3.5 w-3.5 fill-current" />
        </div>
        <SkipForward className="h-3.5 w-3.5" />
        <Heart className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

export function LandingHomePreview() {
  const { t } = useTranslation();
  const [sections, setSections] = useState<DemoSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/home-sections")
      .then((r) => r.json())
      .then((data) => setSections(Array.isArray(data) ? data.slice(0, 8) : []))
      .catch(() => setSections([]))
      .finally(() => setLoading(false));
  }, []);

  const featured = sections.slice(0, 5);

  return (
    <LandingSection
      id="demo"
      align="center"
      eyebrow={t("landingDemoEyebrow")}
      title={
        <>
          {t("landingDemoTitleBefore")}
          <span className="bg-gradient-to-r from-blue-200 to-sky-300 bg-clip-text text-transparent">
            {t("landingDemoTitleAccent")}
          </span>
        </>
      }
      description={t("landingDemoLead")}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-5xl"
      >
        <div
          className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-blue-500/10 blur-3xl"
          aria-hidden
        />

        <div className="relative overflow-hidden rounded-[1.25rem] border border-blue-500/15 bg-[#070b14]/90 shadow-[0_40px_100px_rgba(0,0,0,0.55),0_0_0_1px_rgba(59,130,246,0.08)_inset]">
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0a101c]/90 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <div className="mx-auto flex min-w-0 max-w-sm flex-1 items-center justify-center rounded-md bg-white/[0.04] px-3 py-1.5">
              <span className="truncate font-mono text-[10px] text-blue-200/50">{t("landingDemoBrowserUrl")}</span>
            </div>
          </div>

          <div className="flex min-h-[420px] sm:min-h-[480px]">
            <aside className="hidden w-14 shrink-0 flex-col items-center gap-4 border-r border-white/[0.06] bg-[#060a12] py-5 sm:flex">
              <Home className="h-4 w-4 text-blue-300" />
              <Search className="h-4 w-4 text-white/25" />
              <Library className="h-4 w-4 text-white/25" />
              <Heart className="h-4 w-4 text-white/25" />
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex-1 overflow-hidden p-4 sm:p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-300/40">
                  {t("mainMenu")}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {t("landingDemoGreeting")}
                  <span className="text-white/45">, {t("landingDemoUserName")}</span>
                </h3>

                <div className="mt-4 flex gap-2">
                  {["Tümü", "Müzik"].map((pill, i) => (
                    <span
                      key={pill}
                      className={cn(
                        "rounded-full px-3 py-1 text-[9px] font-medium uppercase tracking-[0.1em]",
                        i === 0
                          ? "bg-white text-[#050810]"
                          : "border border-white/10 text-white/40",
                      )}
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-2 overflow-hidden">
                  {DEMO_QUICK.map((q) => (
                    <DemoQuickChip key={q.title} title={q.title} color={q.color} />
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-white">{t("landingDemoSectionTitle")}</p>
                  <span className="flex items-center gap-0.5 text-[10px] text-white/35">
                    {t("showAll")} <ChevronRight className="h-3 w-3" />
                  </span>
                </div>

                <div className="mt-3 flex gap-3 overflow-hidden">
                  {loading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-[108px] w-[108px] shrink-0 animate-pulse rounded-lg bg-white/5" />
                      ))
                    : featured.length > 0
                      ? featured.map((section, i) => (
                          <DemoMixCard key={section.id} section={section} index={i} />
                        ))
                      : Array.from({ length: 4 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex h-[108px] w-[108px] shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-900/30 to-[#0a101c] ring-1 ring-white/[0.06]"
                          >
                            <ListMusic className="h-6 w-6 text-blue-400/40" />
                          </div>
                        ))}
                </div>

                {!loading && sections.length > 5 ? (
                  <div className="mt-5 flex gap-3 overflow-hidden opacity-70">
                    {sections.slice(5, 9).map((section, i) => (
                      <DemoMixCard key={section.id} section={section} index={i + 5} />
                    ))}
                  </div>
                ) : null}
              </div>

              <DemoPlayerBar />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <AnimatedButton href="/register" size="lg">
            {t("landingDemoCta")}
          </AnimatedButton>
          <AnimatedButton href="/home" variant="secondary" size="lg">
            {t("landingDemoCtaExplore")}
          </AnimatedButton>
        </div>
      </motion.div>
    </LandingSection>
  );
}
