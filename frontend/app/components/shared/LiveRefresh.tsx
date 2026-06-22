"use client";

/**
 * LIVE REFRESH PING
 * --------------------------------------------------------------
 * Tiny client island that calls `router.refresh()` on a timer.
 *
 * - Refreshes the current route's React Server Component tree
 *   without reloading the whole page (no flash, no scroll loss).
 * - Skipped while the tab is hidden — saves bandwidth / Sanity
 *   API hits when nobody is looking.
 * - Always re-runs when the user comes back to the tab so they
 *   see the latest content within seconds of returning.
 *
 * Combined with `export const dynamic = "force-dynamic"` on the
 * server pages, this gives near-real-time CMS updates: editor
 * saves → tab refreshes within ~30 s → new content appears.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  /** How often to ping for new content (default 30 seconds). */
  intervalMs?: number;
};

export default function LiveRefresh({ intervalMs = 30_000 }: Props) {
  const router = useRouter();

  useEffect(() => {
    // Refresh helper — only fires when the tab is visible.
    const tick = () => {
      if (
        typeof document !== "undefined" &&
        document.visibilityState === "visible"
      ) {
        router.refresh();
      }
    };

    // Periodic refresh while the tab is open.
    const interval = window.setInterval(tick, intervalMs);

    // Also refresh the moment the user comes back to the tab
    // (e.g. after switching apps). Catches "I just saw an edit"
    // scenarios without waiting for the next tick.
    const onVisibility = () => {
      if (document.visibilityState === "visible") router.refresh();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [intervalMs, router]);

  // This component renders nothing — it's a side-effect-only hook.
  return null;
}
