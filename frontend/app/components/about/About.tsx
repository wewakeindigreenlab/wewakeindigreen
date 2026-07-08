"use client";

/**
 * ABOUT SECTION
 * --------------------------------------------------------------
 * "Who We Are" panel. Everything visible — title, chips, stat
 * bars, both images, the floating SDG card — is CMS-driven via
 * the Sanity `about` document. Falls back to sensible defaults.
 */

import Image from "next/image";
import { motion } from "framer-motion";

import { AboutData } from "@/app/lib/sanity/types";
import { aboutFallback, withFallback } from "@/app/lib/sanity/fallbacks";
import { resolveImage } from "@/app/lib/sanity/image";
import { splitTitle, scrollToHash } from "@/app/lib/util";

type Props = { data?: AboutData | null };

export default function AboutSection({ data }: Props) {
  const about = withFallback(data, aboutFallback);
  const [t1, t2, t3] = splitTitle(about.title);

  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 lg:py-28 bg-[#faf8fd]"
    >
      {/* GRID + GLOW decorations */}
      <div className="about-grid-lines" />
      <div className="about-glow" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT — copy + chips + stats */}
          <div>
            {/* EYEBROW (CMS) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false, amount: 0.05 }}
              className="inline-flex items-center gap-3 rounded-full border border-[#dfd4f5] bg-[#f3effe] px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[#4E2F8E]"
            >
              <div className="w-2 h-2 rounded-full bg-[#6040a8]" />
              {about.eyebrow}
            </motion.div>

            {/* TITLE (CMS, pipe-split) */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.05 }}
              className="mt-8 text-[36px] sm:text-[44px] leading-[0.98] tracking-[-0.05em] text-[#1a0f30] lg:text-[72px] font-black"
            >
              {t1}{" "}
              <span className="italic text-[#6040a8]">{t2}</span>
              <br />
              {t3}
            </motion.h2>

            {/* BODY paragraphs (CMS) */}
            <div className="mt-8 space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, amount: 0.05 }}
                className="text-base sm:text-lg leading-[1.9] text-[#1a0f30]/65"
              >
                {about.paragraph1}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: false, amount: 0.05 }}
                className="text-base sm:text-lg leading-[1.9] text-[#1a0f30]/65"
              >
                {about.paragraph2}
              </motion.p>
            </div>

            {/* CAPABILITY CHIPS (CMS array) */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-10">
              {(about.chips ?? []).map((chip, index) => (
                <motion.div
                  key={chip}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: false, amount: 0.05 }}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-[#dfd4f5] bg-white text-[#4E2F8E] text-xs sm:text-sm font-semibold shadow-[0_8px_30px_rgba(96,64,168,0.05)]"
                >
                  {chip}
                </motion.div>
              ))}
            </div>

            {/* STAT BARS (CMS array) */}
            {/* <div className="mt-12 lg:mt-14 space-y-8">
              {(about.stats ?? []).map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: false, amount: 0.05 }}
                > */}
                  {/* Bar label + value */}
                  {/* <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-[#1a0f30]/70">
                      {item.label}
                    </span>
                    <span className="text-sm font-black text-[#6040a8]">
                      {item.value}
                    </span>
                  </div> */}

                  {/* Bar track */}
                  {/* <div className="h-[12px] rounded-full bg-[#ede7fb] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#6040a8] to-[#40916c]"
                      style={{ width: item.width ?? "0%" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div> */}
          </div>

          {/*
           * RIGHT — 2×2 tile grid.
           * The three SDG badge PNGs take up three of the four tiles;
           * the "3 UN SDGs Addressed" counter fills the fourth. Every
           * square is used, no huge empty purple backgrounds, and the
           * decorative floating boxes are gone so nothing can overlap
           * the SDG 9 icon.
           */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false, amount: 0.05 }}
            className="grid grid-cols-2 gap-4 sm:gap-5"
          >
            {/* SDG 6 */}
            <a
              href="#sdg"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#sdg");
              }}
              aria-label="Jump to SDG section"
              className="relative aspect-square rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white border border-[#dfd4f5] shadow-[0_18px_50px_rgba(96,64,168,0.10)] transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                fill
                src={resolveImage(about.image1, "/images/sdg1.png")}
                alt={about.image1?.alt ?? "SDG badge"}
                className="object-contain p-3 sm:p-4"
                sizes="(max-width: 1024px) 50vw, 220px"
              />
            </a>

            {/* SDG 9 */}
            <a
              href="#sdg"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#sdg");
              }}
              aria-label="Jump to SDG section"
              className="relative aspect-square rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white border border-[#dfd4f5] shadow-[0_18px_50px_rgba(96,64,168,0.10)] transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                fill
                src={resolveImage(about.image2, "/images/sdg9.png")}
                alt={about.image2?.alt ?? "SDG badge"}
                className="object-contain p-3 sm:p-4"
                sizes="(max-width: 1024px) 50vw, 220px"
              />
            </a>

            {/* SDG 12 */}
            <a
              href="#sdg"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#sdg");
              }}
              aria-label="Jump to SDG section"
              className="relative aspect-square rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white border border-[#dfd4f5] shadow-[0_18px_50px_rgba(96,64,168,0.10)] transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                fill
                src={resolveImage(about.image3, "/images/sdg12.png")}
                alt={about.image3?.alt ?? "SDG badge"}
                className="object-contain p-3 sm:p-4"
                sizes="(max-width: 1024px) 50vw, 220px"
              />
            </a>

            {/* "3 UN SDGs Addressed" count tile — fills the fourth slot */}
            <div className="relative aspect-square rounded-[24px] sm:rounded-[28px] overflow-hidden bg-gradient-to-br from-[#f3effe] to-[#dfd4f5] border border-[#dfd4f5] shadow-[0_18px_50px_rgba(96,64,168,0.10)] flex flex-col items-center justify-center text-center px-4">
              <div className="text-[68px] sm:text-[92px] leading-none font-black tracking-[-0.06em] text-[#6040a8]">
                {about.sdgCardNumber}
              </div>
              <div className="mt-3 text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#1a0f30]/60 leading-[1.7] font-bold">
                {about.sdgCardLabel}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
