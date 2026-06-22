"use client";

/**
 * NAVBAR
 * --------------------------------------------------------------
 * Top navigation bar.
 *   - Links and CTA come from Sanity (`navbar` document).
 *   - Falls back to a hard-coded sensible default.
 *   - Mobile drawer + smooth-scroll behaviour preserved.
 *   - Visually identical to the original.
 */

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Drawer } from "@mui/material";
import { Menu, X } from "lucide-react";

import { NavbarData } from "@/app/lib/sanity/types";
import { navbarFallback, withFallback } from "@/app/lib/sanity/fallbacks";
import { scrollToHash } from "@/app/lib/util";

type Props = { data?: NavbarData | null };

export default function Navbar({ data }: Props) {
  // Merge fetched data with the fallback so the editor can leave
  // any field blank without breaking the navbar.
  const nav = withFallback(data, navbarFallback);

  // Whether the page has scrolled past the threshold — toggles
  // the glassy background + shadow.
  const [scrolled, setScrolled] = useState(false);

  // Mobile drawer open/closed state.
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Click handler for nav links. If the link is an in-page
   * `#anchor`, smooth-scroll instead of letting the browser jump.
   * The mobile drawer is closed regardless so the user can see
   * the target section.
   */
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href?: string
  ) => {
    setMobileOpen(false);
    if (href && href.startsWith("#")) {
      e.preventDefault();
      scrollToHash(href);
    }
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl shadow-lg py-4 border-b border-brand-100"
              : "py-6"
          }
        `}
      >
        <div className="container-custom flex items-center justify-between px-4 lg:px-6">
          {/* Logo (clickable — scrolls back to the top). */}
          <Link
            href="/"
            className="flex items-center gap-4 group"
            onClick={(e) => {
              if (typeof window !== "undefined") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <div className="relative w-12 h-12 transition-all duration-500 group-hover:scale-105 ml-4">
              <Image
                src="/images/logo.PNG"
                alt="WeWake Logo"
                width={48}
                height={48}
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Links — rendered from Sanity. */}
          <div className="hidden lg:flex items-center gap-10">
            {(nav.links ?? []).map((item) => (
              <a
                key={`${item.label}-${item.href}`}
                href={item.href ?? "#"}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-sm font-medium text-[#6b5f85] hover:text-brand-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA — also driven by CMS. */}
          <div className="hidden lg:block mr-4">
            <Button
              variant="contained"
              color="primary"
              href={nav.ctaHref}
              // If the CTA is a `#anchor`, prefer smooth-scroll.
              onClick={(e) => {
                if (nav.ctaHref?.startsWith("#")) {
                  e.preventDefault();
                  scrollToHash(nav.ctaHref);
                }
              }}
              sx={{
                borderRadius: "999px",
                px: 3,
                py: 1.2,
                boxShadow: "0 6px 20px rgba(78,47,142,0.28)",
                textTransform: "none",
              }}
            >
              {nav.ctaLabel}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Open menu"
            className="lg:hidden mr-2"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <div className="w-[300px] max-w-[85vw] h-full bg-white p-6 flex flex-col">
          {/* Drawer top: title + close button */}
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-brand-800">
              Menu
            </h2>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <X />
            </button>
          </div>

          {/* Drawer links — same data source as desktop. */}
          <div className="flex flex-col gap-6 mt-12">
            {(nav.links ?? []).map((item) => (
              <a
                key={`mobile-${item.label}-${item.href}`}
                href={item.href ?? "#"}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-lg font-medium text-[#6b5f85] hover:text-brand-600"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Drawer CTA */}
          <Button
            variant="contained"
            color="primary"
            className="!mt-auto"
            href={nav.ctaHref}
            onClick={(e) => {
              setMobileOpen(false);
              if (nav.ctaHref?.startsWith("#")) {
                e.preventDefault();
                scrollToHash(nav.ctaHref);
              }
            }}
            sx={{ borderRadius: "999px", py: 1.5, textTransform: "none" }}
          >
            {nav.ctaLabel}
          </Button>
        </div>
      </Drawer>
    </>
  );
}
