"use client";

/**
 * TEAM SECTION
 * --------------------------------------------------------------
 * Editorial copy (eyebrow / title / description) lives in the
 * `teamSection` singleton. The grid of members comes from the
 * `teamMember` collection. Falls back to a sensible default
 * roster so the section renders nicely before the CMS is filled.
 *
 * Visual language matches the rest of the homepage:
 *   - eyebrow chip with pulse dot
 *   - pipe-split italic title
 *   - card grid with image hero, body, hover lift, glow
 */

import Image from "next/image";
import { motion } from "framer-motion";

import { TeamMember, TeamSectionData } from "@/app/lib/sanity/types";
import {
  teamSectionFallback,
  teamMembersFallback,
  withFallback,
} from "@/app/lib/sanity/fallbacks";
import { resolveImage } from "@/app/lib/sanity/image";
import { splitTitle } from "@/app/lib/util";

type Props = {
  section?: TeamSectionData | null;
  members?: TeamMember[] | null;
};

/* Small SVG icon set for the social chips on each card. */
function SocialIcon({ platform }: { platform?: string }) {
  // Width/height/style are inherited from the parent <a>.
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  } as const;

  switch ((platform ?? "").toLowerCase()) {
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case "twitter":
      return (
        <svg {...common}>
          <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.93l-5.42-7.07L4.42 22H1.16l8.04-9.18L1 2h7.09l4.9 6.48L18.244 2zm-1.21 18h1.92L7.04 4H5.04l12 16z" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.94 10.94 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.05.78 2.12v3.14c0 .31.21.67.8.55C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
        </svg>
      );
    case "email":
      return (
        <svg {...common}>
          <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      );
    case "website":
    default:
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1-7.41-5h2.86a5 5 0 0 0 9.1 0h2.86A8 8 0 0 1 12 20zm0-14a8 8 0 0 1 7.41 5h-2.86a5 5 0 0 0-9.1 0H4.59A8 8 0 0 1 12 6zm0 8a2 2 0 1 1 2-2 2 2 0 0 1-2 2z" />
        </svg>
      );
  }
}

/* Normalise an email link so it works with the `email:` platform. */
function buildSocialHref(platform?: string, url?: string) {
  if (!url) return "#";
  if ((platform ?? "").toLowerCase() === "email" && !url.startsWith("mailto:")) {
    return `mailto:${url}`;
  }
  return url;
}

export default function Team({ section, members }: Props) {
  // Merge editorial copy with the fallback.
  const sec = withFallback(section, teamSectionFallback);
  // Use CMS members when present, otherwise the placeholder roster.
  const roster =
    members && members.length > 0 ? members : teamMembersFallback;

  const [t1, t2, t3] = splitTitle(sec.title);

  // If there are zero members AND zero fallback, hide the section
  // rather than render an empty grid. (Fallback always has 4, so
  // this is just future-proofing.)
  if (!roster || roster.length === 0) return null;

  return (
    <section
      id="team"
      className="relative overflow-hidden py-20 lg:py-28 bg-white"
    >
      {/* GRID + GLOW decoration (matches the rest of the page) */}
      <div className="team-grid-lines" />
      <div className="team-glow" />
      <div className="team-box box-1" />
      <div className="team-box box-2" />
      <div className="team-box box-3" />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-20">
        {/* TOP — eyebrow + title + description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.05 }}
          className="max-w-[760px]"
        >
          {/* EYEBROW */}
          <div className="inline-flex items-center gap-3 rounded-full border border-[#dfd4f5] bg-[#f3effe] px-5 py-2 text-[11px] uppercase tracking-[0.25em] text-[#4E2F8E]">
            <div className="w-2 h-2 rounded-full bg-[#6040a8] animate-pulse" />
            {sec.eyebrow}
          </div>

          {/* TITLE */}
          <h2 className="mt-8 text-[36px] sm:text-[48px] leading-[0.95] tracking-[-0.05em] text-[#1a0f30] lg:text-[84px] font-black">
            {t1}
            <span className="italic text-[#6040a8]">{t2}</span>
            {t3}
          </h2>

          {/* DESCRIPTION */}
          {sec.description && (
            <p className="mt-6 sm:mt-8 max-w-[640px] text-base sm:text-lg leading-[1.9] text-[#1a0f30]/65">
              {sec.description}
            </p>
          )}
        </motion.div>

        {/* GRID — 2 cols on tablets, 4 on desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 lg:mt-20">
          {roster.map((member, index) => {
            const imgSrc = resolveImage(
              member.photo,
              "/images/blog-fallback.jpg"
            );

            return (
              <motion.article
                key={member._id ?? `${member.name}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: Math.min(index * 0.08, 0.4),
                }}
                viewport={{ once: false, amount: 0.05 }}
                className="team-card group"
              >
                {/* PHOTO */}
                <div className="team-photo">
                  <Image
                    fill
                    src={imgSrc}
                    alt={member.photo?.alt ?? member.name ?? "Team member"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Soft purple tint on the image bottom for readability */}
                  <div className="team-photo-overlay" />
                </div>

                {/* BODY */}
                <div className="team-body">
                  <h3 className="team-name">{member.name}</h3>
                  {member.role && (
                    <div className="team-role">{member.role}</div>
                  )}
                  {member.bio && <p className="team-bio">{member.bio}</p>}

                  {/* SOCIAL CHIPS — only render if at least one is set */}
                  {member.socials && member.socials.length > 0 && (
                    <div className="team-socials">
                      {member.socials
                        .filter((s) => s?.url)
                        .map((s, i) => (
                          <a
                            key={`${s.platform}-${i}`}
                            href={buildSocialHref(s.platform, s.url)}
                            target={
                              (s.platform ?? "").toLowerCase() === "email"
                                ? undefined
                                : "_blank"
                            }
                            rel="noreferrer noopener"
                            className="team-social-chip"
                            aria-label={`${member.name ?? "Team member"} on ${
                              s.platform ?? "the web"
                            }`}
                          >
                            <SocialIcon platform={s.platform} />
                          </a>
                        ))}
                    </div>
                  )}
                </div>

                {/* HOVER glow */}
                <div className="team-hover-glow" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
