"use client";

/**
 * ALL ARTICLES GRID — client component
 * --------------------------------------------------------------
 * Receives the (already-validated) list of posts from the server
 * shell and renders:
 *   - Search input  (title + excerpt)
 *   - Tag chips     (auto-built from unique post tags)
 *   - Responsive card grid (matches homepage BlogSection style)
 *   - Empty state when a filter excludes everything
 *
 * It is a "use client" island so the page's main shell can still
 * be statically rendered for SEO / LCP, while still allowing the
 * user to filter without a round-trip.
 */

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { format } from "date-fns";

import { urlFor } from "../lib/sanity/image";

export type AllArticlesBlog = {
  _id: string;
  title?: string;
  excerpt?: string;
  coverImage?: any;
  externalCoverImage?: string;
  tag?: string;
  featured?: boolean;
  readTime?: string;
  publishedAt?: string;
  slug?: { current?: string };
};

type Props = {
  blogs: AllArticlesBlog[];
};

/* Hard fallback image — used when neither Sanity nor URL is set. */
const FALLBACK_IMG = "/images/blog-fallback.jpg";

/* Safely turn whatever cover image shape the post carries into a URL. */
function getImageSrc(blog: AllArticlesBlog): string {
  if (blog?.coverImage) {
    try {
      return urlFor(blog.coverImage).url();
    } catch {
      // ignore — fall through
    }
  }
  if (blog?.externalCoverImage) return blog.externalCoverImage;
  return FALLBACK_IMG;
}

/* Safe date formatter — never throws on malformed ISO. */
function safeDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  try {
    return format(d, "MMMM dd, yyyy");
  } catch {
    return "";
  }
}

export default function AllArticlesGrid({ blogs }: Props) {
  // Local state for the two filter dimensions.
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");

  // Build the list of unique tags. "All" is always first.
  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const b of blogs) {
      if (b.tag && b.tag.trim()) set.add(b.tag.trim());
    }
    return ["All", ...Array.from(set).sort()];
  }, [blogs]);

  /**
   * Apply both filters to the post list.
   * - Tag filter is exact-match (case-insensitive trim).
   * - Search matches against title + excerpt + tag.
   * Both are recomputed only when an input changes — useMemo.
   */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blogs.filter((b) => {
      // Tag filter
      if (activeTag !== "All") {
        const tag = (b.tag ?? "").trim().toLowerCase();
        if (tag !== activeTag.toLowerCase()) return false;
      }
      // Search filter
      if (q) {
        const haystack = [
          b.title ?? "",
          b.excerpt ?? "",
          b.tag ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [blogs, search, activeTag]);

  /* ----- EMPTY STATES ----- */

  // Case A: no posts in the CMS at all.
  if (blogs.length === 0) {
    return (
      <section className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-20 pb-24 sm:pb-32">
        <div className="mt-6 sm:mt-10 rounded-[24px] sm:rounded-[32px] border border-[#dfd4f5] bg-white/70 backdrop-blur-sm p-10 sm:p-14 text-center shadow-[0_20px_60px_rgba(96,64,168,0.06)]">
          <div className="text-[44px] sm:text-[64px] leading-none">📝</div>
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-black tracking-[-0.03em] text-[#1a0f30]">
            No stories yet
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-[1.7] text-[#1a0f30]/60 max-w-[480px] mx-auto">
            We&apos;re still drafting our first articles. Please check back soon — exciting things are on the way.
          </p>
          <Link
            href="/"
            className="inline-flex mt-8 items-center gap-2 rounded-full bg-[#4E2F8E] hover:bg-[#6040a8] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors"
          >
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-20 pb-24 sm:pb-32">
      {/* FILTER BAR — search + tag chips */}
      <div className="flex flex-col gap-4 sm:gap-6 mb-10 sm:mb-14">
        {/* SEARCH input */}
        <div className="relative max-w-[520px] w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stories..."
            aria-label="Search stories"
            className="w-full rounded-full border border-[#dfd4f5] bg-white px-5 sm:px-6 py-3 sm:py-3.5 pr-12 text-sm sm:text-base text-[#1a0f30] placeholder:text-[#1a0f30]/40 outline-none focus:border-[#6040a8] focus:ring-2 focus:ring-[#6040a8]/15 transition-all"
          />
          {/* Clear button — appears when there's text */}
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#f3effe] text-[#6040a8] hover:bg-[#dfd4f5] text-base flex items-center justify-center"
            >
              ✕
            </button>
          )}
        </div>

        {/* TAG chips — only shown if there is more than just "All" */}
        {tags.length > 1 && (
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {tags.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#4E2F8E] text-white border border-[#4E2F8E] shadow-[0_8px_24px_rgba(78,47,142,0.20)]"
                      : "bg-white text-[#4E2F8E] border border-[#dfd4f5] hover:bg-[#f3effe]"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}

        {/* Result counter — only when filtering actually narrowed the list */}
        {(search || activeTag !== "All") && (
          <div className="text-xs sm:text-sm text-[#1a0f30]/55">
            Showing <strong>{filtered.length}</strong> of{" "}
            <strong>{blogs.length}</strong> stories
            {activeTag !== "All" && (
              <>
                {" "}
                tagged <strong>{activeTag}</strong>
              </>
            )}
            {search && (
              <>
                {" "}
                matching <strong>“{search}”</strong>
              </>
            )}
            .
          </div>
        )}
      </div>

      {/* Case B: filters returned nothing */}
      {filtered.length === 0 ? (
        <div className="rounded-[24px] sm:rounded-[32px] border border-[#dfd4f5] bg-white/70 backdrop-blur-sm p-10 sm:p-14 text-center shadow-[0_20px_60px_rgba(96,64,168,0.06)]">
          <div className="text-[44px] sm:text-[64px] leading-none">🔍</div>
          <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-black tracking-[-0.02em] text-[#1a0f30]">
            No stories match your filters
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#1a0f30]/60 max-w-[480px] mx-auto">
            Try adjusting your search or clearing the tag filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setActiveTag("All");
            }}
            className="inline-flex mt-6 items-center gap-2 rounded-full border border-[#dfd4f5] bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#4E2F8E] hover:bg-[#f3effe] transition-colors"
          >
            Reset filters
          </button>
        </div>
      ) : (
        /*
         * GRID — same visual language as the homepage blog cards.
         * 1 col on phones, 2 cols on tablets, 3 cols on desktop.
         */
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((item, index) => (
            <Link
              key={item._id}
              href={`/blog/${item.slug?.current ?? ""}`}
              className="block"
            >
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(index * 0.05, 0.4),
                }}
                viewport={{ once: true }}
                className="blog-card group h-full flex flex-col"
              >
                {/* IMAGE */}
                <div className="blog-card-image">
                  <Image
                    fill
                    alt={item.title ?? "Story"}
                    src={getImageSrc(item)}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="blog-image-overlay" />
                  {/* Tag chip — only if a tag exists */}
                  {item.tag && <div className="blog-tag">{item.tag}</div>}
                  {/* Featured ribbon — only if the post is flagged */}
                  {item.featured && (
                    <div className="absolute top-4 right-4 rounded-full bg-[#4E2F8E] text-white text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 shadow-[0_8px_24px_rgba(78,47,142,0.30)]">
                      Featured
                    </div>
                  )}
                </div>

                {/* BODY */}
                <div className="blog-body flex-1 flex flex-col">
                  {/* META row — only render if at least one piece is set */}
                  {(item.publishedAt || item.readTime) && (
                    <div className="blog-date">
                      {safeDate(item.publishedAt)}
                      {item.publishedAt && item.readTime ? " · " : ""}
                      {item.readTime}
                    </div>
                  )}

                  {/* TITLE — line-clamp to keep cards aligned */}
                  <h3 className="blog-title line-clamp-2">
                    {item.title ?? "Untitled story"}
                  </h3>

                  {/* EXCERPT — fallback string keeps card height even */}
                  <p className="blog-excerpt-small line-clamp-3">
                    {item.excerpt ?? "Tap to read the full story."}
                  </p>

                  {/* Spacer pushes the read button to the bottom */}
                  <div className="mt-auto pt-4">
                    <span className="blog-read-btn">
                      Read
                      <ArrowOutwardIcon sx={{ fontSize: 16 }} />
                    </span>
                  </div>
                </div>

                <div className="blog-hover-glow" />
              </motion.article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
