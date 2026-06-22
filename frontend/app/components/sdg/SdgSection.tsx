"use client";

/**
 * SDG SECTION
 * --------------------------------------------------------------
 * "Sustainable Development Goals" card grid. Card list, copy, and
 * intro text come from Sanity (`sdgSection`).
 */

import Image from "next/image";
import { motion } from "framer-motion";

import { SdgData } from "@/app/lib/sanity/types";
import { sdgFallback, withFallback } from "@/app/lib/sanity/fallbacks";
import { resolveImage } from "@/app/lib/sanity/image";
import { splitTitle } from "@/app/lib/util";

type Props = { data?: SdgData | null };

export default function SdgSection({ data }: Props) {
  const sdg = withFallback(data, sdgFallback);
  const [t1, t2, t3] = splitTitle(sdg.title);

  return (
    <section id="sdg" className="relative overflow-hidden py-20 lg:py-28">
      {/* BACKGROUND decoration */}
      <div className="sdg-bg-gradient" />
      <div className="sdg-grid-lines" />
      <div className="sdg-glow-1" />
      <div className="sdg-glow-2" />
      <div className="sdg-orbit orbit-1" />
      <div className="sdg-orbit orbit-2" />
      <div className="sdg-box box-1" />
      <div className="sdg-box box-2" />
      <div className="sdg-box box-3" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-20">
        {/* TOP copy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.05 }}
          className="max-w-[760px]"
        >
          {/* EYEBROW */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[#c0a8e8] backdrop-blur-xl">
            <div className="w-2 h-2 rounded-full bg-[#95d5b2] animate-pulse" />
            {sdg.eyebrow}
          </div>

          {/* TITLE */}
          <h2 className="mt-8 text-[40px] sm:text-[52px] leading-[0.95] tracking-[-0.05em] text-white lg:text-[92px] font-black">
            {t1}
            <span className="italic text-[#95d5b2]">{t2}</span>
            {t3}
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-8 text-base sm:text-lg leading-[1.95] text-white/68 max-w-[620px]">
            {sdg.description}
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 mt-12 lg:mt-20">
          {(sdg.items ?? []).map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.05 }}
              className="sdg-card group"
            >
              {/* IMAGE */}
              <div className="sdg-image-wrap">
                <Image
                  fill
                  src={resolveImage(item.image, "/images/farmer.jpg")}
                  alt={item.title ?? "SDG image"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="sdg-image-overlay" />
                <div className="sdg-badge">{item.number}</div>
              </div>

              {/* BODY */}
              <div className="sdg-body">
                <h3 className="sdg-title">{item.title}</h3>
                <p className="sdg-description">{item.description}</p>

                {/* PROGRESS */}
                <div className="sdg-progress-wrap">
                  <div className="sdg-progress-top">
                    <span>SDG Alignment</span>
                    <span>{item.progress}</span>
                  </div>
                  <div className="sdg-track">
                    <div
                      className="sdg-fill"
                      style={{ width: item.progress ?? "0%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="sdg-hover-glow" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
