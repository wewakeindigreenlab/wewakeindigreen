/**
 * /blog — ALL ARTICLES INDEX PAGE
 * --------------------------------------------------------------
 * Lists every blog post.
 *
 * Server-rendered with ISR (60s) so editors see their changes
 * quickly. Fetches both posts and editorial copy (eyebrow/title)
 * from the same `blogSection` doc as the homepage so the visual
 * language stays consistent.
 *
 * Renders a server-component shell (header, hero, footer) and
 * delegates the interactive grid to a client child component.
 * That split keeps the bulk of HTML static (great for SEO + LCP)
 * while still allowing search / tag filtering on the client.
 */
/* Render fresh on every request — admin saves appear immediately. */
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import LiveRefresh from "../components/shared/LiveRefresh";
import { client } from "../lib/sanity/client";
import {
  blogsQuery,
  blogSectionQuery,
  siteSettingsQuery,
} from "../lib/sanity/queries";
import { blogSectionFallback, withFallback } from "../lib/sanity/fallbacks";
import { splitTitle } from "../lib/util";
import { buildMetadata } from "../lib/seo";

import AllArticlesGrid, { AllArticlesBlog } from "./AllArticlesGrid";

/**
 * Page-level SEO — overrides the homepage defaults so /blog
 * shows a tailored title + description in search results.
 */
export async function generateMetadata(): Promise<Metadata> {
  const site = await client.fetch(siteSettingsQuery);
  return buildMetadata(site, {
    title: "Stories from the field — WeWake IndiGreen",
    description:
      "Articles, research and case studies on BioMANS, biopolymers, agro-waste upcycling and the work behind a plastic-free India.",
    path: "/blog",
  });
}

export default async function AllArticlesPage() {
  // Fetch posts + editorial copy in parallel.
  const [blogs, section] = await Promise.all([
    client.fetch<AllArticlesBlog[]>(blogsQuery),
    client.fetch(blogSectionQuery),
  ]);

  // Editorial copy with safe fallbacks.
  const sec = withFallback(section, blogSectionFallback);
  const [t1, t2, t3] = splitTitle(sec.title);

  // Filter to only posts that can actually be linked to.
  const valid = (blogs ?? []).filter((b) => b?.slug?.current);

  return (
    <main className="min-h-screen bg-[#faf8fd]">
      {/* Background CMS sync — pulls fresh content every 30 s */}
      <LiveRefresh />

      {/* DECORATIVE BACKGROUND (matches single blog page) */}
      <div className="blog-grid-lines" />
      <div className="blog-glow" />

      {/*
       * STICKY HEADER — back + breadcrumb.
       * Identical pattern to the single blog page so navigation
       * feels continuous between list and detail views.
       */}
      <div className="sticky top-0 z-40 bg-[#faf8fd]/85 backdrop-blur-xl border-b border-[#dfd4f5]">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#dfd4f5] bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[#4E2F8E] hover:bg-[#f3effe] hover:border-[#c0a8e8] transition-colors"
            aria-label="Back to homepage"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>

          {/* Breadcrumb — hidden on small phones */}
          <nav className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-[#1a0f30]/55">
            <Link href="/" className="hover:text-[#4E2F8E]">
              Home
            </Link>
            <span>›</span>
            <span className="text-[#4E2F8E] font-semibold">All articles</span>
          </nav>
        </div>
      </div>

      {/* HERO — eyebrow + title + post count */}
      <section className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-20 pt-10 sm:pt-16 lg:pt-20 pb-8 sm:pb-12">
        {/* EYEBROW */}
        <div className="inline-flex items-center gap-3 rounded-full border border-[#dfd4f5] bg-[#f3effe] px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[#4E2F8E]">
          <div className="w-2 h-2 rounded-full bg-[#6040a8]" />
          {sec.eyebrow}
        </div>

        {/* TITLE */}
        <h1 className="mt-6 sm:mt-8 text-[40px] sm:text-[56px] lg:text-[88px] leading-[0.95] tracking-[-0.05em] text-[#1a0f30] font-black">
          {t1}
          <span className="italic text-[#6040a8]">{t2}</span>
          {t3}
        </h1>

        {/* META — total post count */}
        <p className="mt-5 sm:mt-6 max-w-[640px] text-base sm:text-lg leading-[1.8] text-[#1a0f30]/60">
          {valid.length > 0
            ? `${valid.length} ${valid.length === 1 ? "story" : "stories"} from the field.`
            : "We're still working on our first stories — check back soon."}
        </p>
      </section>

      {/* GRID — the interactive list (client component) */}
      <AllArticlesGrid blogs={valid} />
    </main>
  );
}
