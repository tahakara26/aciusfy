"use client";

import { memo } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getRarityMeta, type BadgeRarity } from "@/lib/badge-rarity";
import { getBadgeEffect, isBackEffect, type BadgeEmblem } from "./badge-effects";

function getIcon(name: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[name] ?? LucideIcons.Award;
}

const SIZE_MAP = {
  sm: { px: 46, icon: 18 },
  md: { px: 62, icon: 24 },
  lg: { px: 88, icon: 34 },
};

export interface BadgeMedalProps {
  icon: string;
  color: string;
  animation?: string | null;
  /** nadirlik türetme için */
  rarity?: BadgeRarity | null;
  threshold?: number | null;
  size?: "sm" | "md" | "lg";
  title?: string;
  className?: string;
  /** kilitli / kazanılmamış görünüm (soluk, gri) */
  locked?: boolean;
}

function Emblem({ kind }: { kind: BadgeEmblem }) {
  switch (kind) {
    case "bolt":
      return (
        <svg className="bm-bolt" viewBox="0 0 76 76" aria-hidden>
          <path d="M42 8 L26 40 L37 40 L32 68 L52 34 L40 34 Z" fill="#bae6fd" />
        </svg>
      );
    case "bolt2":
      return (
        <>
          <svg className="bm-bolt" viewBox="0 0 76 76" aria-hidden>
            <path d="M42 8 L26 40 L37 40 L32 68 L52 34 L40 34 Z" fill="#c7d2fe" />
          </svg>
          <svg className="bm-bolt bm-b2" viewBox="0 0 76 76" aria-hidden>
            <path d="M42 8 L26 40 L37 40 L32 68 L52 34 L40 34 Z" fill="#a5b4fc" />
          </svg>
        </>
      );
    case "wings":
      return (
        <>
          <i className="bm-wg bm-l" aria-hidden />
          <i className="bm-wg bm-r" aria-hidden />
        </>
      );
    case "crystal":
      return (
        <span className="bm-emb bm-emb-crystal" aria-hidden>
          <svg viewBox="0 0 100 100">
            <polygon points="50,4 82,34 68,96 32,96 18,34" fill="none" stroke="#7dd3fc" strokeWidth="3" />
            <path
              d="M18 34 L82 34 M50 4 L50 96 M18 34 L50 60 L82 34 M32 96 L50 60 L68 96"
              stroke="#38bdf8"
              strokeWidth="1.5"
              fill="none"
              opacity="0.7"
            />
          </svg>
        </span>
      );
    case "sword":
      return (
        <>
          <i className="bm-emb bm-emb-sword" aria-hidden />
          <i className="bm-emb bm-emb-sword bm-s2" aria-hidden />
        </>
      );
    case "crown":
      return <i className="bm-emb bm-emb-crown" aria-hidden />;
    case "skull":
      return <i className="bm-emb bm-emb-skull" aria-hidden />;
    case "clover":
      return <i className="bm-emb bm-emb-clover" aria-hidden />;
    default:
      return null;
  }
}

function BadgeMedalInner({
  icon,
  color,
  animation,
  rarity,
  threshold,
  size = "md",
  title,
  className,
  locked = false,
}: BadgeMedalProps) {
  const Icon = getIcon(icon);
  const s = SIZE_MAP[size];
  const meta = getRarityMeta({ rarity, threshold, animation });
  const cfg = getBadgeEffect(animation);

  const dots = cfg.dots ? Array.from({ length: cfg.dots }) : [];
  const rings = cfg.rings ? Array.from({ length: cfg.rings }) : [];

  return (
    <div
      className={cn("bm", locked && "bm-locked", className)}
      data-shape={meta.shape}
      data-rarity={meta.rarity}
      title={title}
      style={
        {
          width: s.px,
          height: s.px,
          "--bm-c": meta.color,
          "--bm-glow": meta.glow,
          "--bm-icon": color,
        } as React.CSSProperties
      }
    >
      <span className="bm-body">
        <span className="bm-facet" aria-hidden />
      </span>

      {cfg.fx ? (
        <span
          className={cn("bm-fx", `bm-fx-${cfg.fx}`)}
          data-clip={cfg.clip ? "" : undefined}
          data-layer={isBackEffect(cfg.fx) ? "back" : "front"}
          aria-hidden
        >
          {dots.map((_, i) => (
            <i key={`d${i}`} className="bm-dot" />
          ))}
          {rings.map((_, i) => (
            <span key={`r${i}`} className={cn("bm-ring", i === 1 && "bm-ring2")}>
              <i className="bm-dot" />
            </span>
          ))}
          {cfg.svg ? <Emblem kind={cfg.svg} /> : null}
        </span>
      ) : null}

      <Icon size={s.icon} className="bm-ico" />
    </div>
  );
}

export const BadgeMedal = memo(BadgeMedalInner);
