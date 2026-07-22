"use client";

/**
 * HERO SECTION
 * --------------------------------------------------------------
 * Top-of-page hero. Every piece of text + the two CTAs come from
 * Sanity (`hero` document). Falls back to sensible defaults.
 *
 * The title uses the `|` convention so a CMS editor can pick which
 * portion of the headline is rendered in italic + brand colour.
 */

import { motion } from "framer-motion";
import { HeroData } from "@/app/lib/sanity/types";
import { heroFallback, withFallback } from "@/app/lib/sanity/fallbacks";
import { resolveImage } from "@/app/lib/sanity/image";
import { splitTitle, scrollToHash } from "@/app/lib/util";

type HeroProps = { data?: HeroData | null };

export default function Hero({ data }: HeroProps) {
  // Merge CMS data with fallback so the section always renders
  // something polished, even with no Sanity content yet.
  const hero = withFallback(data, heroFallback);

  // CMS background image (uploaded asset or pasted URL), falling
  // back to the original static image when Sanity has nothing set.
  const bgImageUrl = resolveImage(hero.backgroundImage, "/images/farmer.jpg");

  // Three-part title: [intro, italic accent, outro]
  const [p1, p2, p3] = splitTitle(hero.title);

  /**
   * Click handler used by both CTAs: smooth-scroll for anchor
   * links, regular nav for external/page links.
   */
  const onCtaClick = (e: React.MouseEvent, href?: string) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      scrollToHash(href);
    }
  };

  return (
    <section
      id="home"
      className="hero-section relative min-h-screen overflow-hidden bg-white flex items-center"
    >
      {/* BACKGROUND IMAGE (CMS, falls back to static asset) */}
      <div
        className="hero-bg-image"
        style={{ "--hero-bg-image": `url(${bgImageUrl})` } as React.CSSProperties}
      />

      {/* IMAGE OVERLAY */}
      <div className="hero-bg-overlay" />

      {/* GRID lines decoration */}
      <div className="hero-grid-lines" />

      {/* DECORATIVE CIRCLES */}
      <div className="hero-bg-circles">
        <div className="c1" />
        <div className="c2" />
        <div className="c3" />
        <div className="c4" />
      </div>

      {/* FLOATING BOXES */}
      <div className="hero-box b1" />
      <div className="hero-box b2" />
      <div className="hero-box b3" />
      <div className="hero-box b4" />

      {/* CONTENT */}
      <div className="relative z-20 max-w-[1240px] mx-auto px-6 lg:px-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-[760px]"
        >
          {/* BADGE / EYEBROW (CMS) */}
          <div className="inline-flex items-center gap-3 rounded-full border border-[#dfd4f5] bg-[#f3effe] px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[#4E2F8E]">
            <div className="w-2 h-2 rounded-full bg-[#6040a8] animate-pulse" />
            {hero.eyebrow}
          </div>

          {/* TITLE (CMS, pipe-split for italic part) */}
          <h1 className="mt-10 text-[42px] sm:text-[58px] leading-[0.92] tracking-[-0.05em] text-[#1a0f30] lg:text-[110px] font-black">
            {p1}
            <span className="block italic text-[#6040a8]">{p2}</span>
            {p3}
          </h1>

          {/* DESCRIPTION (CMS) */}
          <p className="mt-8 max-w-[620px] text-base sm:text-lg leading-[1.9] text-[#1a0f30]/60">
            {hero.subtitle}
          </p>

          {/* CTA BUTTONS (CMS labels + hrefs) */}
          <div className="flex flex-wrap gap-4 sm:gap-5 mt-10 sm:mt-12">
            {/* Primary CTA */}
            <a
              href={hero.primaryCtaHref ?? "#"}
              onClick={(e) => onCtaClick(e, hero.primaryCtaHref)}
              className="rounded-full bg-[#4E2F8E] hover:bg-[#6040a8] px-6 sm:px-8 py-3 sm:py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(78,47,142,0.18)] inline-flex items-center"
            >
              {hero.primaryCtaLabel}
            </a>

            {/* Secondary CTA */}
            <a
              href={hero.secondaryCtaHref ?? "#"}
              onClick={(e) => onCtaClick(e, hero.secondaryCtaHref)}
              className="rounded-full border border-[#dfd4f5] bg-white/80 px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#4E2F8E] transition-all duration-300 hover:border-[#c0a8e8] hover:bg-[#f3effe] inline-flex items-center"
            >
              {hero.secondaryCtaLabel}
            </a>
          </div>

          {/* HERO STATS (CMS array) */}
          <div className="hero-stats-row">
            {(hero.stats ?? []).map((s, i) => (
              <div className="hero-stat-item" key={`stat-${i}`}>
                <div className="hstat-val">{s.value}</div>
                <div className="hstat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
