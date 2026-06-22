/**
 * GROQ QUERIES
 * --------------------------------------------------------------
 * Each query is a small, focused projection over Sanity.
 *
 *   `*[_type == "X"][0]`            — fetch one (singleton)
 *   `*[_type == "X"] | order(...)`  — fetch a list, ordered
 *
 * Image fields use the `imageOrUrl` object shape so the frontend
 * `resolveImage` helper can return a usable URL from either an
 * uploaded asset or a pasted external URL.
 */
import { groq } from "next-sanity";

/* ---------- shared image projection ---------- */
const IMG = `{
  "image": image,
  "url": url,
  "alt": alt
}`;

/* ---------- SITE SETTINGS ---------- */
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    tagline,
    "logo": logo${IMG},
    email,
    phone,
    socials[]{label, href},
    googleFormActionUrl,
    gfFirstNameEntry,
    gfLastNameEntry,
    gfEmailEntry,
    gfTopicEntry,
    gfMessageEntry,
    metaTitle,
    metaDescription,
    metaKeywords,
    "ogImage": ogImage${IMG},
    siteUrl
  }
`;

/* ---------- NAVBAR ---------- */
export const navbarQuery = groq`
  *[_type == "navbar"][0]{
    links[]{label, href},
    ctaLabel,
    ctaHref
  }
`;

/* ---------- HERO ---------- */
export const heroQuery = groq`
  *[_type == "hero"][0]{
    title,
    eyebrow,
    badge1,
    badge2,
    badge3,
    subtitle,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    stats[]{value, label},
    "backgroundImage": backgroundImage${IMG}
  }
`;

/* ---------- TICKER ---------- */
export const tickerQuery = groq`
  *[_type == "ticker"][0]{
    items
  }
`;

/* ---------- ABOUT ---------- */
export const aboutQuery = groq`
  *[_type == "about"][0]{
    eyebrow,
    title,
    paragraph1,
    paragraph2,
    chips,
    stats[]{label, value, width},
    "image1": image1${IMG},
    "image2": image2${IMG},
    sdgCardNumber,
    sdgCardLabel
  }
`;

/* ---------- STORY ---------- */
export const storyQuery = groq`
  *[_type == "story"][0]{
    eyebrow,
    title,
    lead,
    orbitItems[]{icon, label, color, title, body, stat}
  }
`;

/* ---------- BIOM ---------- */
export const biomQuery = groq`
  *[_type == "biom"][0]{
    eyebrow,
    title,
    paragraph1,
    paragraph2,
    features,
    rawMaterialsTitle,
    rawMaterials[]{
      icon,
      title,
      desc,
      "image": image${IMG}
    }
  }
`;

/* ---------- PRODUCTS ---------- */
// Section copy (eyebrow / title / description).
export const productsSectionQuery = groq`
  *[_type == "productsSection"][0]{
    eyebrow,
    title,
    description
  }
`;

// Individual product cards + their modal data.
export const productsQuery = groq`
  *[_type == "product"] | order(order asc){
    _id,
    title,
    subtitle,
    impact,
    "cardKey": cardKey.current,
    "image": image${IMG},
    "modalImage": modalImage${IMG},
    modalTitle,
    modalSubtitle,
    modalImpact[]{value, key},
    modalSteps[]{number, title, description, highlight}
  }
`;

/* ---------- SDG ---------- */
export const sdgQuery = groq`
  *[_type == "sdgSection"][0]{
    eyebrow,
    title,
    description,
    items[]{
      number,
      title,
      description,
      progress,
      "image": image${IMG}
    }
  }
`;

/* ---------- BLOG SECTION ---------- */
export const blogSectionQuery = groq`
  *[_type == "blogSection"][0]{
    eyebrow,
    title,
    ctaLabel,
    ctaHref
  }
`;

/* ---------- CONTRIBUTORS ---------- */
// Editorial copy for the marquee strip.
export const contributorsSectionQuery = groq`
  *[_type == "contributorsSection"][0]{
    eyebrow,
    title,
    message,
    stats[]{value, label}
  }
`;

// Logo/name list (ordered by the editor).
export const contributorsQuery = groq`
  *[_type == "contributor"] | order(order asc){
    _id,
    name,
    url,
    "logo": logo${IMG}
  }
`;

/* ---------- TEAM ---------- */
// Editorial copy (eyebrow / title / description) for the section.
export const teamSectionQuery = groq`
  *[_type == "teamSection"][0]{
    eyebrow,
    title,
    description
  }
`;

// The actual team members, ordered by the editor-defined index.
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc){
    _id,
    name,
    role,
    bio,
    "photo": photo${IMG},
    socials[]{platform, url}
  }
`;

/* ---------- VISION / MISSION ---------- */
export const visionMissionQuery = groq`
  *[_type == "visionMission"][0]{
    panels[]{
      key,
      letter,
      eyebrow,
      quote,
      action,
      gradient,
      "image": image${IMG}
    }
  }
`;

/* ---------- CONTACT ---------- */
export const contactQuery = groq`
  *[_type == "contact"][0]{
    eyebrow,
    title,
    description,
    "sideImage": sideImage${IMG},
    infoCards[]{icon, label, value},
    formTitle,
    submitLabel,
    topics
  }
`;

/* ---------- FOOTER ---------- */
export const footerQuery = groq`
  *[_type == "footer"][0]{
    brandName,
    tagline,
    copyright,
    columns[]{title, links[]{label, href}},
    bottomText,
    bottomBadge
  }
`;

/* ---------- BLOG POSTS (existing) ---------- */
export const blogsQuery = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    featured,
    tag,
    readTime,
    publishedAt
  }
`;

export const singleBlogQuery = groq`
  *[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    featured,
    tag,
    readTime,
    publishedAt,
    content
  }
`;
