"use client";

/**
 * FOOTER
 * --------------------------------------------------------------
 * Brand block + link columns + bottom bar. Every column, link,
 * line of copy comes from Sanity (`footer` doc).
 *
 * Anchor links smooth-scroll to in-page sections.
 */

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { FooterData } from "@/app/lib/sanity/types";
import { footerFallback, withFallback } from "@/app/lib/sanity/fallbacks";
import { resolveImage } from "@/app/lib/sanity/image";
import { scrollToHash } from "@/app/lib/util";

type Props = { data?: FooterData | null };

export default function Footer({ data }: Props) {
  const footer = withFallback(data, footerFallback);

  // Smooth-scroll for `#anchor` links.
  const onLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href?: string
  ) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      scrollToHash(href);
    }
  };

  return (
    <>
      <footer className="footer-section">
        {/* GRID + decoration */}
        <div className="footer-grid-lines" />
        <div className="footer-glow-1" />
        <div className="footer-glow-2" />
        <div className="footer-box box-1" />
        <div className="footer-box box-2" />

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-20">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
            {/* LEFT — brand block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.05 }}
            >
              {/* Logo + brand name — uses the real WeWake IndiGreen mark */}
              <Link
                href="/"
                className="footer-logo"
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <div className="footer-logo-img">
                  <Image
                    src="/images/logo.PNG"
                    alt={`${footer.brandName ?? "WeWake IndiGreen"} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <span>{footer.brandName}</span>
              </Link>

              {/* Tagline (CMS) */}
              <p className="footer-tagline">{footer.tagline}</p>

              {/* Copyright (CMS) */}
              <div className="footer-copy">{footer.copyright}</div>
            </motion.div>

            {/* LINK columns (CMS) */}
            {(footer.columns ?? []).map((column, index) => (
              <motion.div
                key={column.title ?? index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: false, amount: 0.05 }}
              >
                <div className="footer-column-title">{column.title}</div>
                <ul className="footer-links">
                  {(column.links ?? []).map((item) => (
                    <li key={`${item.label}-${item.href}`}>
                      <a
                        href={item.href ?? "#"}
                        onClick={(e) => onLinkClick(e, item.href)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </footer>

      {/* BOTTOM BAR */}
      <div className="footer-bottom-bar">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="footer-bottom-text">{footer.bottomText}</div>

          {/* "Proudly Make in India" badge — icon (CMS) + text. */}
          <div className="footer-india-badge">
            {(() => {
              const iconSrc = resolveImage(footer.bottomBadgeImage, "");
              return iconSrc ? (
                <Image
                  src={iconSrc}
                  alt={footer.bottomBadgeImage?.alt ?? "Make in India"}
                  width={44}
                  height={30}
                  className="footer-india-badge-icon"
                />
              ) : null;
            })()}
            <span>{footer.bottomBadge}</span>
          </div>
        </div>
      </div>
    </>
  );
}
