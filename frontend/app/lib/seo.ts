/**
 * SEO HELPERS
 * --------------------------------------------------------------
 * Tiny utilities that turn Sanity `SiteSettings` (plus optional
 * per-page overrides) into a Next.js `Metadata` object covering:
 *   - <title>, <meta description>, keywords
 *   - canonical URL
 *   - OpenGraph (Facebook/LinkedIn) tags
 *   - Twitter card tags
 *   - icons (favicon + apple-touch-icon)
 *
 * Per-page metadata overrides each field individually.
 */
import type { Metadata } from "next";
import { SiteSettings } from "./sanity/types";
import { resolveImage } from "./sanity/image";
import { siteSettingsFallback, withFallback } from "./sanity/fallbacks";

type Overrides = {
  title?: string;
  description?: string;
  path?: string;            // canonical path (e.g. "/blog")
  imageUrl?: string;        // override the OG image
};

/**
 * Build a full Metadata object for the App Router.
 * Pass the result of `client.fetch(siteSettingsQuery)` as `site`.
 */
export function buildMetadata(
  site: SiteSettings | null | undefined,
  overrides: Overrides = {}
): Metadata {
  // Merge CMS with sensible fallback so nothing is undefined.
  const s = withFallback(site, siteSettingsFallback);

  // Resolve canonical site origin and full URL for this page.
  const origin =
    (s.siteUrl ?? "https://www.wewakeindigreen.com").replace(/\/$/, "");
  const path = (overrides.path ?? "/").startsWith("/")
    ? overrides.path ?? "/"
    : `/${overrides.path ?? ""}`;
  const url = `${origin}${path}`;

  // Title + description with per-page override fallback chain.
  const title =
    overrides.title ?? s.metaTitle ?? s.title ?? "WeWake IndiGreen";
  const description =
    overrides.description ??
    s.metaDescription ??
    s.tagline ??
    "Biobased, biodegradable materials made entirely from agricultural waste.";

  // OG/Twitter image — prefer per-page override, then CMS ogImage,
  // then the logo, then nothing.
  const ogImage =
    overrides.imageUrl ??
    resolveImage(s.ogImage, "") ??
    "/images/logo.PNG";

  return {
    metadataBase: new URL(origin),
    title,
    description,
    keywords: s.metaKeywords,
    alternates: { canonical: url },

    // App-Router auto-discovered icons. Browsers + Apple home-screen.
    icons: {
      icon: [
        { url: "/images/logo.PNG", sizes: "any" },
      ],
      shortcut: "/images/logo.PNG",
      apple: "/images/logo.PNG",
    },

    // Open Graph (Facebook, LinkedIn, Slack, WhatsApp previews)
    openGraph: {
      title,
      description,
      url,
      siteName: s.title ?? "WeWake IndiGreen",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      locale: "en_IN",
      type: "website",
    },

    // Twitter / X card
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },

    // Crawler hints
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}
