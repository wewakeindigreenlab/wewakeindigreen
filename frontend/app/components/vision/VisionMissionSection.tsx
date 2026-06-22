"use client";

/**
 * VISION / MISSION SECTION
 * --------------------------------------------------------------
 * Two side-by-side dark panels with a background image, large
 * letter, quote, and action line. Panels are CMS-driven so the
 * marketing team can rename/reorder them or add a third.
 */

import Image from "next/image";
import { motion } from "framer-motion";
import { VisionMissionData } from "@/app/lib/sanity/types";
import {
  visionMissionFallback,
  withFallback,
} from "@/app/lib/sanity/fallbacks";
import { resolveImage } from "@/app/lib/sanity/image";

type Props = { data?: VisionMissionData | null };

export default function VisionMissionSection({ data }: Props) {
  const vm = withFallback(data, visionMissionFallback);
  const panels = vm.panels ?? [];

  return (
    <section
      id="vision"
      className="relative overflow-hidden bg-[#12091f]"
    >
      {/* GRID + GLOW decorations */}
      <div className="vm-grid-lines" />
      <div className="vm-glow-1" />
      <div className="vm-glow-2" />

      <div className="relative z-10 grid lg:grid-cols-2">
        {panels.map((item, index) => (
          <motion.div
            key={item.key ?? index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.12 }}
            viewport={{ once: false, amount: 0.05 }}
            className="vm-panel group"
          >
            {/* BACKGROUND image */}
            <div className="vm-image-wrap">
              <Image
                fill
                src={resolveImage(item.image, "/images/farmer.jpg")}
                alt={item.eyebrow ?? "Vision/Mission"}
                className="object-cover transition-transform duration-[1400ms] group-hover:scale-105"
              />
              {/* Coloured gradient overlay (CMS-controlled classes) */}
              <div
                className={`vm-overlay bg-gradient-to-br ${
                  item.gradient ?? "from-[#4E2F8E]/85 to-[#1a0f30]/95"
                }`}
              />
              <div className="vm-dark-overlay" />
            </div>

            {/* Floating decorative boxes */}
            <div className="vm-box box-1" />
            <div className="vm-box box-2" />

            {/* CONTENT */}
            <div className="vm-content">
              <div className="vm-letter">{item.letter}</div>
              <div className="vm-eyebrow">
                <span className="vm-line" />
                {item.eyebrow}
              </div>
              <p className="vm-quote">“{item.quote}”</p>
              <div className="vm-action">{item.action}</div>
            </div>

            {/* HOVER glow */}
            <div className="vm-hover-glow" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
