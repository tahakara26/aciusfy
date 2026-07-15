"use client";

import { Suspense } from "react";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { PremiumShell } from "@/components/premium";
import { MarketingRouteReset } from "@/components/premium/MarketingRouteReset";
import { PremiumSiteNav } from "@/components/landing/LandingNavbar";
import { DiscordBotEntranceCurtain } from "@/components/discord-bot/DiscordBotEntranceCurtain";
import { Footer } from "@/components/landing/Footer";

export function DiscordBotPageExperience({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <MarketingRouteReset />
      <DiscordBotEntranceCurtain />
      <PremiumShell variant="landing" three={false} className="text-foreground">
        <PremiumSiteNav variant="discord" />
        <main className="premium-nav-offset">{children}</main>
        <Footer />
      </PremiumShell>
    </LenisProvider>
  );
}

export function DiscordBotPageFallback() {
  return (
    <div className="flex min-h-[50dvh] items-center justify-center text-sm text-blue-200/40">
      …
    </div>
  );
}

export function DiscordBotPageSuspense({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<DiscordBotPageFallback />}>{children}</Suspense>;
}
