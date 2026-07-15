"use client";

import { AciusfyLandingWordmark } from "@/components/branding/AciusfyLandingWordmark";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    [t("landingFooterPlatform")]: [
      { label: t("landingNavPlatform"), href: "#demo" },
      { label: t("landingNavExperience"), href: "#experience" },
      { label: t("landingNavCapabilities"), href: "#features" },
      { label: t("landingNavDownload"), href: "/download" },
      { label: t("landingDiscordBotNav"), href: "/discord-bot" },
    ],
    [t("landingFooterSupport")]: [
      { label: t("landingFooterContact"), href: "#" },
      { label: t("landingFooterFeedback"), href: "#" },
      { label: t("landingNavDownload"), href: "/download" },
    ],
    [t("landingFooterLegal")]: [
      { label: t("landingFooterPrivacy"), href: "#" },
      { label: t("landingFooterTerms"), href: "#" },
      { label: t("landingFooterCookies"), href: "#" },
    ],
  };

  return (
    <footer className="border-t border-blue-500/10 bg-[#050810]/90 px-4 py-16 backdrop-blur-md sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-4 md:gap-8">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex rounded-md outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400/40"
              aria-label="Aciusfy"
            >
              <AciusfyLandingWordmark variant="navbar" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{t("landingFooterTagline")}</p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-blue-300/45">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-blue-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-blue-500/10 pt-8 text-center text-xs text-muted sm:text-sm">
          &copy; {new Date().getFullYear()} Aciusfy. {t("landingFooterRights")}
        </div>
      </div>
    </footer>
  );
}
