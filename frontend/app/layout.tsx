import "./globals.css";

import type { Metadata } from "next";
import Providers from "./providers";

import { client } from "./lib/sanity/client";
import { siteSettingsQuery } from "./lib/sanity/queries";
import { buildMetadata } from "./lib/seo";

/**
 * ROOT METADATA
 * --------------------------------------------------------------
 * Fetches Site Settings once and turns it into the default
 * <head> for every page (title, description, OG, Twitter,
 * favicon, canonical URL, robots).
 *
 * Per-page `generateMetadata` overrides individual fields where
 * needed (e.g. blog post titles).
 */
export async function generateMetadata(): Promise<Metadata> {
  const site = await client.fetch(siteSettingsQuery);
  return buildMetadata(site);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
