/**
 * NEXT.JS CONFIG
 * --------------------------------------------------------------
 * - `images.remotePatterns` allow-lists the CDNs we load from.
 *
 * - `experimental.staleTimes` tunes the App Router's in-memory
 *   client cache. Setting `dynamic: 0` means dynamic pages are
 *   re-fetched from the server on every navigation (so framer-
 *   motion components remount and Sanity edits show up).
 *   `static` has a Next.js-enforced minimum of 30 seconds — using
 *   anything lower triggers a build warning. 30 is the safest
 *   valid floor; static routes (robots.txt, sitemap.xml, /_not-found)
 *   are rebuilt at most every 30s after navigation.
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com" },
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 30,
    },
  },
};

export default nextConfig;
