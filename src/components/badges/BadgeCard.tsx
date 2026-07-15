"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { BadgeMedal } from "./BadgeMedal";
import type { BadgeRarity } from "@/lib/badge-rarity";

export interface BadgeData {
  id: string;
  name: string;
  description?: string | null;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  animation: string;
  category?: string;
  earnedAt?: string | Date;
  /** nadirlik türetme (opsiyonel; yoksa animation'dan türetilir) */
  threshold?: number | null;
  rarity?: BadgeRarity | null;
}

const NAME_WIDTH = { sm: 46, md: 62, lg: 88 } as const;
const NAME_TEXT = { sm: "text-[10px]", md: "text-xs", lg: "text-sm" } as const;

function BadgeCardInner({
  badge,
  size = "md",
  showName = true,
  className,
  locked = false,
}: {
  badge: BadgeData;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
  locked?: boolean;
}) {
  const medal = (
    <BadgeMedal
      icon={badge.icon}
      color={badge.color}
      animation={badge.animation}
      threshold={badge.threshold}
      rarity={badge.rarity}
      size={size}
      title={badge.description || badge.name}
      className={className}
      locked={locked}
    />
  );

  if (!showName) return medal;

  return (
    <div className="flex flex-col items-center gap-1.5" style={{ width: NAME_WIDTH[size] }}>
      {medal}
      <span className={cn("w-full truncate text-center font-medium text-foreground", NAME_TEXT[size])}>
        {badge.name}
      </span>
    </div>
  );
}

export const BadgeCard = memo(BadgeCardInner);
