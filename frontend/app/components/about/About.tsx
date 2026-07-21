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
import { splitTitle } from "@/app/lib/util";

type Props = { data?: AboutData | null };

/* Placement/rotation for the floating SDG icon boxes — a design concern,
   kept in code. The image + alt for each slot comes from CMS (about.sdgIcons),
   falling back to the local SDG PNGs when the CMS array is empty/shorter. */
const SDG_BOX_LAYOUT = [
  { position: "right-[18%] top-[2%]", rotate: -10 },
  { position: "right-[1%] top-[15%]", rotate: 14 },
  { position: "right-[15%] top-[30%]", rotate: -16 },
] as const;

const SDG_ICON_FALLBACKS = ["/images/sdg1.png", "/images/sdg9.png", "/images/sdg12.png"];

export default function AboutSection({ data }: Props) {
  const about = withFallback(data, aboutFallback);
  const [t1, t2, t3] = splitTitle(about.title);

  const sdgBoxes = SDG_BOX_LAYOUT.map((layout, index) => {
    const icon = about.sdgIcons?.[index];
    return {
      ...layout,
      src: resolveImage(icon, SDG_ICON_FALLBACKS[index]),
      alt: icon?.alt ?? `SDG icon ${index + 1}`,
    };
  });

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

          {/* RIGHT — image collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false, amount: 0.05 }}
            className="relative h-[480px] sm:h-[600px] lg:h-[760px]"
          >
            {/* IMAGE 1 — main large picture (CMS) */}
            <div className="absolute left-0 top-0 w-[68%] h-[60%] sm:h-[520px] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_30px_80px_rgba(96,64,168,0.14)]">
              <Image
                fill
                src={resolveImage(about.image1, "/images/farmer.jpg")}
                alt={about.image1?.alt ?? "About image 1"}
                className="object-cover"
              />
            </div>

            {/* IMAGE 2 — overlap card (CMS) */}
            <div className="absolute right-0 bottom-0 w-[48%] h-[44%] sm:h-[360px] rounded-[24px] sm:rounded-[32px] overflow-hidden border-[10px] border-[#faf8fd] shadow-[0_20px_60px_rgba(96,64,168,0.12)]">
              <Image
                fill
                src={resolveImage(about.image2, "/images/about2.jpeg")}
                alt={about.image2?.alt ?? "About image 2"}
                className="object-cover"
              />
            </div>

            {/* SDG floating card (CMS number + label) */}
            <div className="absolute left-[8%] bottom-[10%] w-[180px] sm:w-[220px] rounded-[28px] bg-white/85 backdrop-blur-xl border border-[#dfd4f5] p-6 sm:p-8 shadow-[0_20px_60px_rgba(96,64,168,0.10)]">
              <div className="text-[56px] sm:text-[72px] leading-none font-black tracking-[-0.06em] text-[#6040a8]">
                {about.sdgCardNumber}
              </div>
              <div className="mt-3 text-xs sm:text-sm uppercase tracking-[0.22em] text-[#1a0f30]/55 leading-[1.8]">
                {about.sdgCardLabel}
              </div>
            </div>

            {/* Floating decorative boxes (CSS) */}
            <div className="about-mini-box mini-1" />
            <div className="about-mini-box mini-2" />
            <div className="about-mini-box mini-3" />

            {/* SDG floating square boxes */}
            {sdgBoxes.map((sdg, index) => (
              <div key={`${sdg.src}-${index}`} className={`absolute z-20 ${sdg.position}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: sdg.rotate }}
                  whileInView={{ opacity: 1, scale: 1, rotate: sdg.rotate }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
                  viewport={{ once: false, amount: 0.05 }}
                >
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      duration: 4 + index,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.4,
                    }}
                    className="relative h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
                  >
                    <Image
                      fill
                      src={sdg.src}
                      alt={sdg.alt}
                      className="object-contain drop-shadow-[0_14px_28px_rgba(96,64,168,0.25)]"
                    />
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
