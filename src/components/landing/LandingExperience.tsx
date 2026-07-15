"use client";

import { LenisProvider } from "@/components/providers/LenisProvider";
import { PremiumShell } from "@/components/premium";
import { MarketingRouteReset } from "@/components/premium/MarketingRouteReset";
import { LandingEntranceCurtain } from "@/components/landing/LandingEntranceCurtain";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { LandingMarqueeStrip } from "@/components/landing/LandingMarqueeStrip";
import { LandingExperienceSection } from "@/components/landing/LandingExperienceSection";
import { LandingHomePreview } from "@/components/landing/LandingHomePreview";
import { LandingHighlightsSection } from "@/components/landing/LandingHighlightsSection";
import { LandingFinalCta } from "@/components/landing/LandingFinalCta";
import { Footer } from "@/components/landing/Footer";
import { LandingScrollProvider } from "@/components/landing/LandingScrollContext";
import { LandingScrollDriver } from "@/components/landing/LandingScrollDriver";
import { useMarketingRemountKey } from "@/hooks/useMarketingRemountKey";

export function LandingExperience() {
  const remountKey = useMarketingRemountKey("/");

  return (
    <LenisProvider key={`landing-lenis-${remountKey}`}>
      <LandingScrollProvider>
        <MarketingRouteReset />
        <LandingEntranceCurtain />
        <LandingScrollDriver />
        <PremiumShell variant="landing" three={false} className="text-foreground">
          <div key={`landing-shell-${remountKey}`}>
            <LandingNavbar />
            <main>
              <HeroSection />
              <LandingMarqueeStrip />
              <LandingExperienceSection />
              <LandingHomePreview />
              <LandingHighlightsSection />
              <LandingFinalCta />
            </main>
            <Footer />
          </div>
        </PremiumShell>
      </LandingScrollProvider>
    </LenisProvider>
  );
}
