"use client";

/**
 * BIOM SECTION
 * --------------------------------------------------------------
 * BioMANS product/innovation highlights. All copy, feature
 * bullets and raw-material cards now come from the Sanity
 * `biom` document, with sensible fallbacks.
 */

import Image from "next/image";
import { motion } from "framer-motion";
import CheckIcon from "@mui/icons-material/Check";

import { BiomData } from "@/app/lib/sanity/types";
import { biomFallback, withFallback } from "@/app/lib/sanity/fallbacks";
import { resolveImage } from "@/app/lib/sanity/image";
import { splitTitle } from "@/app/lib/util";

type Props = { data?: BiomData | null };

export default function Biom({ data }: Props) {
  const biom = withFallback(data, biomFallback);
  const [b1, b2, b3] = splitTitle(biom.title);

  return (
    <section
      id="biom"
      className="relative overflow-hidden py-20 lg:py-28 bg-white"
    >
      {/* GRID + GLOW + boxes */}
      <div className="biom-grid-lines" />
      <div className="biom-glow" />
      <div className="biom-box box-1" />
      <div className="biom-box box-2" />
      <div className="biom-box box-3" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-6 lg:px-20">
        {/* TOP grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT — copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false, amount: 0.05 }}
          >
            {/* EYEBROW */}
            <div className="inline-flex items-center gap-3 rounded-full border border-[#dfd4f5] bg-[#f3effe] px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[#4E2F8E]">
              <div className="w-2 h-2 rounded-full bg-[#6040a8]" />
              {biom.eyebrow}
            </div>

            {/* TITLE (CMS, pipe-split) */}
            <h2 className="mt-8 text-[36px] sm:text-[48px] leading-[0.95] tracking-[-0.05em] text-[#1a0f30] lg:text-[82px] font-black">
              {b1}
              <span className="italic text-[#6040a8]">{b2}</span>
              {b3}
            </h2>

            {/* PARAGRAPHS */}
            <p className="mt-8 text-base sm:text-lg leading-[1.95] text-[#1a0f30]/65 max-w-[620px]">
              {biom.paragraph1}
            </p>
            <p className="mt-6 text-base sm:text-lg leading-[1.95] text-[#1a0f30]/65 max-w-[620px]">
              {biom.paragraph2}
            </p>
          </motion.div>

          {/* RIGHT — features grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: false, amount: 0.05 }}
            className="grid sm:grid-cols-2 gap-4 sm:gap-5"
          >
            {(biom.features ?? []).map((item, index, arr) => (
              <div
                key={item + index}
                // Final item gets a full-width row when count is odd.
                className={`biom-feature-card ${
                  index === arr.length - 1 && arr.length % 2 === 1
                    ? "sm:col-span-2"
                    : ""
                }`}
              >
                <div className="biom-check">
                  <CheckIcon sx={{ fontSize: 16 }} />
                </div>
                <span className="biom-feature-text">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RAW MATERIALS */}
        <div className="mt-20 lg:mt-28">
          <h3 className="biom-subtitle">{biom.rawMaterialsTitle}</h3>

          {/*
           * RAW MATERIAL CARDS
           * --------------------------------------------------------
           * Visual language matches the Products section card —
           *   image hero (320px) → "BioMANS" tag chip → body with
           *   title + description.
           * No emoji badge: the photograph of the actual material
           * carries the visual weight.
           */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-8 lg:mt-10">
            {(biom.rawMaterials ?? []).map((item, index) => {
              // Resolve a usable image URL with a brand placeholder fallback.
              const imgSrc = resolveImage(
                item.image,
                "/images/blog-fallback.jpg"
              );

              return (
                <motion.div
                  key={`${item.title}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  viewport={{ once: false, amount: 0.05 }}
                  // Reuse the product-card classes so the design
                  // is pixel-identical to the Products section.
                  className="product-card group"
                >
                  {/* IMAGE HERO */}
                  <div className="product-image-wrap">
                    <Image
                      fill
                      src={imgSrc}
                      alt={item.image?.alt ?? item.title ?? "Raw material"}
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="product-image-overlay" />
                    <div className="product-tag">BioMANS</div>
                  </div>

                  {/* BODY — title + description */}
                  <div className="product-body">
                    <h4 className="product-title">{item.title}</h4>
                    <p className="product-subtitle">{item.desc}</p>
                  </div>

                  {/* HOVER glow — same affordance as the Products grid */}
                  <div className="product-hover-glow" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
