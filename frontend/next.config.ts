/**
 * NEXT.JS CONFIG
 * --------------------------------------------------------------
 * - `images.remotePatterns` allow-lists the hosts <Image> can load.
 *   We accept **any** HTTPS and HTTP host (wildcard `**`) so editors
 *   in Sanity Studio can paste an image URL from any site — Unsplash,
 *   a brand's website, Google Drive direct links, anywhere — without
 *   the developer adding domains to a list.
 *
 *   Security note: a fully-open allowlist means Vercel will spend
 *   image-optimization quota on whatever host the editor pastes.
 *   That's fine for a CMS-driven site like this where editors are
 *   trusted; switch to an explicit list later if the threat model
 *   changes.
 *
 * - `experimental.staleTimes` tunes the App Router's in-memory
 *   client cache. `dynamic: 0` re-fetches dynamic pages on every
 *   navigation (so framer-motion components remount and Sanity edits
 *   show up). `static` has a Next.js-enforced minimum of 30 seconds.
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Any HTTPS host — covers 99% of editor-pasted URLs.
      { protocol: "https", hostname: "**" },
      // Any HTTP host — used by a few legacy partner sites.
      { protocol: "http", hostname: "**" },
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
