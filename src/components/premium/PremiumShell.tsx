"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { CinematicGrain } from "@/components/cinematic";

const SpaceBackground = dynamic(
  () => import("@/components/premium/SpaceBackground").then((m) => m.SpaceBackground),
  { ssr: false },
);

type PremiumShellProps = {
  children?: React.ReactNode;
  className?: string;
  three?: boolean;
  threeIntensity?: "subtle" | "normal" | "landing";
  variant?: "landing" | "app" | "marketing";
};

export function PremiumShell({
  children,
  className,
  three = true,
  threeIntensity = "normal",
  variant = "app",
}: PremiumShellProps) {
  const isLanding = variant === "landing" || threeIntensity === "landing";
  const isMarketing = variant === "marketing";
  const useSpace = (isLanding || isMarketing) && three;

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden font-sans",
        isLanding && !three ? "bg-[#050810]" : "bg-[#09090b]",
        className,
      )}
    >
      {three && useSpace ? <SpaceBackground intensity={isLanding || isMarketing ? "landing" : "subtle"} /> : null}
      {three && !useSpace && !isLanding ? (
        <SpaceBackground intensity="subtle" className="opacity-50" />
      ) : null}
      {isLanding && !three ? (
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 bg-[#050810]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 55% at 50% -15%, rgba(37,99,235,0.18) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 100% 30%, rgba(14,165,233,0.08) 0%, transparent 50%), radial-gradient(ellipse 40% 35% at 0% 70%, rgba(59,130,246,0.06) 0%, transparent 45%)",
            }}
          />
        </div>
      ) : (
        <div className="fixed inset-0 -z-10 bg-[#09090b]" aria-hidden />
      )}
      <CinematicGrain className={isLanding ? "opacity-[0.04]" : useSpace ? "opacity-[0.05]" : "opacity-[0.03]"} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
