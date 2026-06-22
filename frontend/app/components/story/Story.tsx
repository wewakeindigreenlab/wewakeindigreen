"use client";

/**
 * STORY ("The Problem We Solve") SECTION
 * --------------------------------------------------------------
 * Wraps the canvas-powered <StoryOrbit/> widget with editorial
 * copy from Sanity (`story` document).
 */

import { motion } from "framer-motion";
import StoryOrbit from "./StoryOrbit";
import { StoryData } from "@/app/lib/sanity/types";
import { storyFallback, withFallback } from "@/app/lib/sanity/fallbacks";
import { splitTitle } from "@/app/lib/util";

type Props = { data?: StoryData | null };

export default function Story({ data }: Props) {
  const story = withFallback(data, storyFallback);
  const [s1, s2, s3] = splitTitle(story.title);

  return (
    <section
      id="story"
      className="relative overflow-hidden py-20 lg:py-28 bg-[#12091f]"
    >
      {/* GRID + GLOWS + ORBIT decorations */}
      <div className="story-grid-lines" />
      <div className="story-glow-1" />
      <div className="story-glow-2" />
      <div className="story-orbit orbit-1" />
      <div className="story-orbit orbit-2" />
      <div className="story-box box-1" />
      <div className="story-box box-2" />
      <div className="story-box box-3" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-20">
        {/* TOP COPY */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.05 }}
          className="max-w-[860px]"
        >
          {/* EYEBROW (CMS) */}
          <div className="inline-flex items-center gap-3 rounded-full border border-[#6040a8]/20 bg-[#6040a8]/10 px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[#c0a8e8]">
            <div className="w-2 h-2 rounded-full bg-[#95d5b2] animate-pulse" />
            {story.eyebrow}
          </div>

          {/* TITLE (CMS) */}
          <h2 className="mt-8 text-[36px] sm:text-[48px] leading-[0.95] tracking-[-0.05em] text-white lg:text-[84px] font-black">
            {s1}{" "}
            <span className="italic text-[#95d5b2]">{s2}</span> {s3}
          </h2>

          {/* LEAD QUOTE (CMS) */}
          <p className="mt-8 text-[18px] sm:text-[22px] leading-[1.8] text-white/65 max-w-[760px]">
            {story.lead}
          </p>
        </motion.div>

        {/* ORBIT canvas — receives the orbit items from CMS */}
        <div className="mt-16 lg:mt-20 flex justify-center items-center">
          <StoryOrbit items={story.orbitItems ?? []} />
        </div>
      </div>
    </section>
  );
}
