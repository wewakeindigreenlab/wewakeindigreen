"use client";

/**
 * BLOG SECTION (homepage)
 * --------------------------------------------------------------
 * Lists the latest blog posts in a 1-large + 2-small layout.
 *
 * Two data inputs:
 *   - `blogs` : the actual posts from `blog` documents
 *   - `section` : editorial copy (eyebrow, title, all-articles CTA)
 *
 * If there are no blogs at all (clean studio) the section is
 * hidden — letting the editor stage content before publishing.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { format } from "date-fns";

import { urlFor } from "@/app/lib/sanity/image";
import { BlogSectionData } from "@/app/lib/sanity/types";
import { blogSectionFallback, withFallback } from "@/app/lib/sanity/fallbacks";
import { splitTitle } from "@/app/lib/util";

type Blog = {
  _id: string;
  title: string;
  excerpt: string;
  coverImage?: any;
  externalCoverImage?: string;
  tag: string;
  featured: boolean;
  readTime: string;
  publishedAt: string;
  slug: { current: string };
};

type BlogSectionProps = {
  blogs: Blog[];
  section?: BlogSectionData | null;
};

export default function BlogSection({ blogs, section }: BlogSectionProps) {
  const sec = withFallback(section, blogSectionFallback);
  const [t1, t2, t3] = splitTitle(sec.title);

  // Filter posts that lack a slug — those can't be linked to.
  const validBlogs = (blogs ?? []).filter((b) => b?.slug?.current);

  // No content? Render nothing rather than an empty grid.
  if (!validBlogs.length) return null;

  // The first featured post (or the newest) becomes the big card.
  const featured =
    validBlogs.find((b) => b.featured) ?? validBlogs[0];

  // The remaining 2 newest become side cards.
  const articles = validBlogs.filter((b) => b._id !== featured._id);

  // Get a usable URL for the cover image, falling back when needed.
  const getImageSrc = (blog: Blog) => {
    if (blog?.coverImage) {
      try {
        return urlFor(blog.coverImage).url();
      } catch {
        // ignore
      }
    }
    if (blog?.externalCoverImage) return blog.externalCoverImage;
    return "/images/blog-fallback.jpg";
  };

  // Safe date formatter — bad dates shouldn't crash the page.
  const fmtDate = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return format(d, "MMMM dd, yyyy");
  };

  return (
    <section
      id="blog"
      className="relative overflow-hidden py-20 lg:py-28 bg-[#faf8fd]"
    >
      {/* GRID + decoration */}
      <div className="blog-grid-lines" />
      <div className="blog-glow" />
      <div className="blog-box box-1" />
      <div className="blog-box box-2" />
      <div className="blog-box box-3" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-20">
        {/* TOP — eyebrow + title + CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false, amount: 0.05 }}
          >
            {/* EYEBROW (CMS) */}
            <div className="inline-flex items-center gap-3 rounded-full border border-[#dfd4f5] bg-[#f3effe] px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[#4E2F8E]">
              <div className="w-2 h-2 rounded-full bg-[#6040a8]" />
              {sec.eyebrow}
            </div>

            {/* TITLE (CMS, pipe-split) */}
            <h2 className="mt-8 text-[36px] sm:text-[48px] leading-[0.95] tracking-[-0.05em] text-[#1a0f30] lg:text-[84px] font-black">
              {t1}
              <span className="italic text-[#6040a8]">{t2}</span>
              {t3}
            </h2>
          </motion.div>

          {/* CTA — All Articles */}
          <Link href={sec.ctaHref ?? "/blog"} className="blog-see-all">
            {sec.ctaLabel}
            <ArrowOutwardIcon sx={{ fontSize: 16 }} />
          </Link>
        </div>

        {/* GRID — 1 featured + side cards */}
        <div className="grid xl:grid-cols-[1.3fr_0.7fr] gap-6 sm:gap-8 mt-12 lg:mt-20">
          {/* FEATURED card */}
          <Link href={`/blog/${featured.slug.current}`}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: false, amount: 0.05 }}
              className="blog-featured-card group"
            >
              <div className="blog-featured-image">
                <Image
                  fill
                  alt={featured.title}
                  src={getImageSrc(featured)}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="blog-image-overlay" />
                <div className="blog-tag">{featured.tag}</div>
              </div>

              <div className="blog-body">
                <div className="blog-date">
                  {fmtDate(featured.publishedAt)} · {featured.readTime}
                </div>
                <h3 className="blog-featured-title">{featured.title}</h3>
                <p className="blog-excerpt">{featured.excerpt}</p>
                <button className="blog-read-btn" type="button">
                  Read full story
                  <ArrowOutwardIcon sx={{ fontSize: 16 }} />
                </button>
              </div>

              <div className="blog-hover-glow" />
            </motion.div>
          </Link>

          {/* SIDE cards (max 2) */}
          <div className="grid gap-6 sm:gap-8">
            {articles.slice(0, 2).map((item, index) => (
              <Link key={item._id} href={`/blog/${item.slug.current}`}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: false, amount: 0.05 }}
                  className="blog-card group"
                >
                  <div className="blog-card-image">
                    <Image
                      fill
                      alt={item.title}
                      src={getImageSrc(item)}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="blog-image-overlay" />
                    <div className="blog-tag">{item.tag}</div>
                  </div>

                  <div className="blog-body">
                    <div className="blog-date">
                      {fmtDate(item.publishedAt)} · {item.readTime}
                    </div>
                    <h3 className="blog-title">{item.title}</h3>
                    <p className="blog-excerpt-small">{item.excerpt}</p>
                    <button className="blog-read-btn" type="button">
                      Read
                    </button>
                  </div>

                  <div className="blog-hover-glow" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
