"use client";

/**
 * CONTRIBUTORS SECTION
 * --------------------------------------------------------------
 * Sits between Products and SDG. A clean editorial header above
 * a continuously-running marquee of partner brands.
 *
 * Design notes:
 *   - Section background uses the brand dark shade `#12091f` so it
 *     pairs visually with Story / Vision / Mission. Sitting between
 *     Team (light) and Vision (dark), it serves as a clean transition.
 *   - The marquee strip itself is *light* (cream / white) — inverting
 *     the surrounding dark surface so the partner names read crisply
 *     and the bar feels like a deliberate slice of light.
 *   - The section ends at the marquee bar with no bottom padding,
 *     so the next (Vision) section starts immediately.
 */

import Image from "next/image";

import { Contributor, ContributorsSectionData } from "@/app/lib/sanity/types";
import {
  contributorsFallback,
  contributorsSectionFallback,
  withFallback,
} from "@/app/lib/sanity/fallbacks";
import { resolveImage } from "@/app/lib/sanity/image";

type Props = {
  section?: ContributorsSectionData | null;
  contributors?: Contributor[] | null;
};

/* Build initials when no logo is supplied. */
function initialsOf(name?: string): string {
  if (!name) return "•";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Contributors({ section, contributors }: Props) {
  const sec = withFallback(section, contributorsSectionFallback);
  const list =
    contributors && contributors.length > 0
      ? contributors
      : contributorsFallback;

  if (!list || list.length === 0) return null;

  // Duplicate the list enough times that the marquee loop looks
  // populated even with only a handful of CMS entries.
  const RAIL_MIN = 16;
  const repeats = Math.max(2, Math.ceil(RAIL_MIN / list.length));
  const rail: Contributor[] = [];
  for (let i = 0; i < repeats; i++) {
    rail.push(...list);
  }

  return (
    <section
      id="contributors"
      // Dark surface — same shade as Story / Vision so the page
      // breathes between light + dark sections. Top padding only so
      // the light marquee bar meets the next section flush.
      className="relative overflow-hidden pt-14 lg:pt-20 bg-[#12091f]"
    >
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-20">
        {/* Editorial header — colours flipped for the dark surface */}
        <div className="max-w-[720px] mx-auto text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#6040a8]/25 bg-[#6040a8]/10 px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[#c0a8e8]">
            <div className="w-2 h-2 rounded-full bg-[#95d5b2] animate-pulse" />
            {sec.eyebrow}
          </div>

          <h2 className="mt-6 text-[26px] sm:text-[32px] lg:text-[40px] leading-[1.15] tracking-[-0.03em] text-white font-black">
            {sec.title}
          </h2>

          {sec.message && (
            <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-[1.8] text-white/65">
              {sec.message}
            </p>
          )}
        </div>

        {/*
         * STATS row — gives the section visual weight so it
         * doesn't read as a thin divider between bigger blocks.
         * Centered, max 3 stats, hidden gracefully when CMS empty.
         */}
        {sec.stats && sec.stats.length > 0 && (
          <div className="contributors-stats">
            {sec.stats.slice(0, 3).map((s, i) => (
              <div key={i} className="contributors-stat">
                <div className="contributors-stat-value">{s.value}</div>
                <div className="contributors-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MARQUEE — slim gradient strip, sits flush at the bottom */}
      <div className="contributors-ticker mt-10 sm:mt-12">
        <div className="contributors-ticker-fade left" />
        <div className="contributors-ticker-fade right" />

        <div className="contributors-track">
          {rail.map((c, i) => {
            const imgSrc = resolveImage(c.logo, "");
            const inner = (
              <span className="contributor-item">
                <span className="contributor-logo">
                  {imgSrc ? (
                    <Image
                      fill
                      src={imgSrc}
                      alt={c.logo?.alt ?? c.name ?? "Contributor logo"}
                      sizes="40px"
                      className="object-contain"
                    />
                  ) : (
                    <span className="contributor-initials">
                      {initialsOf(c.name)}
                    </span>
                  )}
                </span>
                <span className="contributor-name">{c.name}</span>
              </span>
            );

            return c.url ? (
              <a
                key={`c-${i}`}
                href={c.url}
                target="_blank"
                rel="noreferrer noopener"
                className="contributor-link"
                aria-label={`Visit ${c.name ?? "contributor"}'s website`}
              >
                {inner}
              </a>
            ) : (
              <span
                key={`c-${i}`}
                className="contributor-link"
                aria-hidden={i >= list.length}
              >
                {inner}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
