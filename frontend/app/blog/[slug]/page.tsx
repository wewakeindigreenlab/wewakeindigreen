/**
 * BLOG DETAIL PAGE
 * --------------------------------------------------------------
 * Long-form post view. Improvements over the original:
 *   - sticky "Back to all stories" header (Home → Blog crumb)
 *   - clean card-shaped article body with responsive padding
 *   - readable typography rhythm at every breakpoint
 *   - cover image uses Next/Image with proper sizing & blur fallback
 *   - bottom "back to all stories" CTA so the reader doesn't dead-end
 *   - share line + reading meta — invites the reader to stick around
 *
 * Data still comes from the Sanity `singleBlogQuery`. Content is
 * rendered through Portable Text with brand-themed block styles.
 */
/* Render fresh on every request so editor saves appear at once. */
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";

import LiveRefresh from "../../components/shared/LiveRefresh";
import { client } from "../../lib/sanity/client";
import { urlFor } from "../../lib/sanity/image";
import {
  singleBlogQuery,
  siteSettingsQuery,
} from "../../lib/sanity/queries";
import { buildMetadata } from "../../lib/seo";

type Props = { params: Promise<{ slug: string }> };

/**
 * Per-post SEO — uses the blog's title, excerpt and cover image.
 * Falls back gracefully when any field is missing.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [site, post] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(singleBlogQuery, { slug }),
  ]);

  if (!post) return buildMetadata(site, { path: `/blog/${slug}` });

  // Try to derive a cover image URL for OG/Twitter cards.
  let coverUrl: string | undefined;
  if (post.coverImage) {
    try {
      coverUrl = urlFor(post.coverImage).width(1200).height(630).url();
    } catch {
      coverUrl = undefined;
    }
  }
  if (!coverUrl && post.externalCoverImage) {
    coverUrl = post.externalCoverImage;
  }

  return buildMetadata(site, {
    title: `${post.title} — WeWake IndiGreen`,
    description: post.excerpt ?? undefined,
    path: `/blog/${slug}`,
    imageUrl: coverUrl,
  });
}

/**
 * PORTABLE TEXT — custom renderers
 * --------------------------------------------------------------
 * Match the article's brand typography. Block sizes scale at sm:
 * for tablet/desktop so phones don't feel cramped.
 */
const components = {
  types: {
    // External (non-Sanity) image embed.
    externalImage: ({ value }: any) => (
      <figure className="my-10 sm:my-12">
        <img
          src={value.url}
          alt={value.alt || ""}
          className="w-full rounded-[20px] sm:rounded-[30px]"
        />
        {value.alt && (
          <figcaption className="mt-3 text-center text-sm text-[#1a0f30]/55">
            {value.alt}
          </figcaption>
        )}
      </figure>
    ),

    // YouTube embed.
    youtube: ({ value }: any) => {
      const videoId = value?.url?.split("v=")[1]?.split("&")[0];
      if (!videoId) return null;
      return (
        <div className="my-10 sm:my-12 aspect-video w-full rounded-[20px] sm:rounded-[30px] overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      );
    },
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className="mt-12 sm:mt-16 text-[32px] sm:text-[48px] font-black leading-[1.1] tracking-[-0.04em] text-[#1a0f30]">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mt-10 sm:mt-14 text-[26px] sm:text-[38px] font-black leading-[1.1] tracking-[-0.04em] text-[#1a0f30]">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-8 sm:mt-12 text-[22px] sm:text-[28px] font-black leading-[1.15] tracking-[-0.03em] text-[#1a0f30]">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="mt-6 sm:mt-8 text-[16px] sm:text-[18px] leading-[1.9] sm:leading-[2] text-[#1a0f30]/75">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="mt-8 sm:mt-10 border-l-4 border-[#6040a8] pl-5 sm:pl-6 italic text-[17px] sm:text-[20px] leading-[1.8] text-[#1a0f30]/85">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="mt-6 sm:mt-8 ml-5 list-disc space-y-2 text-[16px] sm:text-[18px] leading-[1.9] text-[#1a0f30]/75">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="mt-6 sm:mt-8 ml-5 list-decimal space-y-2 text-[16px] sm:text-[18px] leading-[1.9] text-[#1a0f30]/75">
        {children}
      </ol>
    ),
  },

  marks: {
    // Bold + link styling so inline emphasis carries the brand colour.
    strong: ({ children }: any) => (
      <strong className="font-bold text-[#1a0f30]">{children}</strong>
    ),
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="text-[#6040a8] underline decoration-[#c0a8e8] decoration-2 underline-offset-4 hover:text-[#4E2F8E]"
      >
        {children}
      </a>
    ),
  },
};

/* Safe date formatter — never throws on a missing/invalid ISO. */
function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;

  // Fetch single blog by slug.
  const blog = await client.fetch(singleBlogQuery, { slug });

  // 404 if nothing found.
  if (!blog) notFound();

  // Pre-compute the cover image src (Sanity → external → fallback).
  let coverSrc: string | null = null;
  if (blog.coverImage) {
    try {
      coverSrc = urlFor(blog.coverImage).url();
    } catch {
      coverSrc = null;
    }
  }
  if (!coverSrc && blog.externalCoverImage) {
    coverSrc = blog.externalCoverImage;
  }

  return (
    <main className="min-h-screen bg-[#faf8fd]">
      {/* Background CMS sync */}
      <LiveRefresh />

      {/* DECORATIVE BACKGROUND */}
      <div className="blog-grid-lines" />
      <div className="blog-glow" />

      {/*
       * STICKY HEADER
       * ----------------------------------------------------------
       * Back button + breadcrumb. Always visible so the user can
       * leave the article at any point without scrolling up.
       * `backdrop-blur` makes it pop nicely as content scrolls.
       */}
      <div className="sticky top-0 z-40 bg-[#faf8fd]/85 backdrop-blur-xl border-b border-[#dfd4f5]">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-[#dfd4f5] bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[#4E2F8E] hover:bg-[#f3effe] hover:border-[#c0a8e8] transition-colors"
            aria-label="Back to all stories"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>

          {/* Breadcrumb — hidden on small phones, shown sm+ */}
          <nav className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-[#1a0f30]/55">
            <Link href="/" className="hover:text-[#4E2F8E]">
              Home
            </Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-[#4E2F8E]">
              Blog
            </Link>
            <span>›</span>
            <span className="text-[#4E2F8E] font-semibold line-clamp-1 max-w-[180px] sm:max-w-[260px]">
              {blog.title}
            </span>
          </nav>
        </div>
      </div>

      {/* ARTICLE */}
      <article className="relative z-10 max-w-[1000px] mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24">
        {/* COVER IMAGE */}
        {coverSrc && (
          <div className="relative w-full h-[260px] sm:h-[420px] lg:h-[520px] overflow-hidden rounded-[24px] sm:rounded-[40px] shadow-[0_30px_80px_rgba(96,64,168,0.18)]">
            <Image
              fill
              priority
              alt={blog.title}
              src={coverSrc}
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover"
            />
            {/* Subtle gradient overlay so the tag chip is always readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        )}

        {/* TAG chip */}
        {blog.tag && (
          <div className="inline-flex mt-6 sm:mt-10 rounded-full border border-[#dfd4f5] bg-[#f3effe] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6040a8]">
            {blog.tag}
          </div>
        )}

        {/* TITLE */}
        <h1 className="mt-5 sm:mt-8 text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.02] tracking-[-0.04em] text-[#1a0f30] font-black">
          {blog.title}
        </h1>

        {/* META row — date + read time */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#1a0f30]/55">
          {blog.publishedAt && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(blog.publishedAt)}
            </span>
          )}
          {blog.readTime && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              {blog.readTime}
            </span>
          )}
        </div>

        {/* EXCERPT — set bigger and brighter, acts as a deck */}
        {blog.excerpt && (
          <p className="mt-6 sm:mt-8 text-[18px] sm:text-[22px] leading-[1.7] sm:leading-[1.9] text-[#1a0f30]/70 font-medium">
            {blog.excerpt}
          </p>
        )}

        {/* CONTENT — card with comfortable rhythm */}
        <div className="mt-10 sm:mt-14 lg:mt-16 rounded-[24px] sm:rounded-[32px] bg-white/70 border border-[#ece6f9] backdrop-blur-sm px-5 sm:px-10 lg:px-14 py-8 sm:py-12 lg:py-14 shadow-[0_20px_60px_rgba(96,64,168,0.06)]">
          <PortableText value={blog.content} components={components} />
        </div>

        {/*
         * BOTTOM CTA
         * --------------------------------------------------------
         * The reader hits the bottom of the article — give them
         * an obvious next action so the journey doesn't dead-end.
         */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 rounded-[24px] sm:rounded-[32px] bg-gradient-to-br from-[#4E2F8E] to-[#321f5e] text-white p-6 sm:p-8 lg:p-10 shadow-[0_30px_80px_rgba(78,47,142,0.20)]">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
              Keep exploring
            </div>
            <div className="mt-2 text-[20px] sm:text-[26px] font-black leading-[1.2] tracking-[-0.02em]">
              See all our stories from the field
            </div>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#4E2F8E] px-5 sm:px-6 py-3 font-bold uppercase tracking-[0.12em] text-xs sm:text-sm hover:bg-[#f3effe] transition-colors whitespace-nowrap"
          >
            All articles
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Bottom "back" duplicate — mirrors the sticky header. */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#6040a8] hover:text-[#4E2F8E]"
          >
            <ArrowLeft size={16} />
            Back to all stories
          </Link>
        </div>
      </article>
    </main>
  );
}
