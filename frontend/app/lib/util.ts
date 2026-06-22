/**
 * SHARED FRONTEND UTILITIES
 * --------------------------------------------------------------
 * Tiny helpers used across components. Kept in one file so they
 * have a single import path and obvious docstrings.
 */

/**
 * splitTitle()
 * Splits a CMS title like `"We build|tomorrow's|materials"` into
 * three parts. The middle part is rendered as the italic / accent
 * line in every section's heading.
 *
 * If the editor doesn't include any pipes, the entire string lands
 * in the first slot and the others are empty strings.
 */
export function splitTitle(title?: string): [string, string, string] {
  if (!title) return ["", "", ""];
  const parts = title.split("|");
  return [parts[0] ?? "", parts[1] ?? "", parts[2] ?? ""];
}

/**
 * scrollToHash()
 * Smoothly scrolls an in-page link target into view. Falls back to
 * default navigation behavior when no element with that id exists
 * (e.g. for external links or /blog paths).
 *
 * NOTE: `html { scroll-behavior: smooth }` already exists in
 * globals.css, but on click we still want a JS hook so we can
 * additionally close mobile drawers.
 */
export function scrollToHash(href: string | undefined): boolean {
  if (!href || !href.startsWith("#") || typeof document === "undefined") {
    return false;
  }
  const el = document.querySelector(href);
  if (!el) return false;
  (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}
