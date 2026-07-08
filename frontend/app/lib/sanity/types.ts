/**
 * SHARED TYPESCRIPT TYPES FOR SANITY CONTENT
 * --------------------------------------------------------------
 * One central place that mirrors the GROQ projections.
 * All fields are optional because GROQ returns whatever is set;
 * components must treat every field as possibly missing.
 */

/* The shared "image or url" object used everywhere images appear. */
export type ImageOrUrl = {
  image?: any;
  url?: string;
  alt?: string;
};

export type NavLink = {
  label?: string;
  href?: string;
};

export type SiteSettings = {
  title?: string;
  tagline?: string;
  logo?: ImageOrUrl;
  email?: string;
  phone?: string;
  socials?: NavLink[];

  // Google Form / Sheets integration.
  googleFormActionUrl?: string;
  gfFirstNameEntry?: string;
  gfLastNameEntry?: string;
  gfEmailEntry?: string;
  gfTopicEntry?: string;
  gfMessageEntry?: string;

  // SEO defaults.
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  ogImage?: ImageOrUrl;
  siteUrl?: string;
};

export type NavbarData = {
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type HeroData = {
  title?: string;
  eyebrow?: string;
  badge1?: string;
  badge2?: string;
  badge3?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  stats?: { value?: string; label?: string }[];
  backgroundImage?: ImageOrUrl;
};

export type TickerData = {
  items?: string[];
};

export type AboutData = {
  eyebrow?: string;
  title?: string;
  paragraph1?: string;
  paragraph2?: string;
  chips?: string[];
  stats?: { label?: string; value?: string; width?: string }[];
  image1?: ImageOrUrl;
  image2?: ImageOrUrl;
  sdgCardNumber?: string;
  sdgCardLabel?: string;
};

export type StoryData = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  orbitItems?: {
    icon?: string;
    label?: string;
    color?: string;
    title?: string;
    body?: string;
    stat?: string;
  }[];
};

export type BiomData = {
  eyebrow?: string;
  title?: string;
  paragraph1?: string;
  paragraph2?: string;
  features?: string[];
  rawMaterialsTitle?: string;
  rawMaterials?: {
    icon?: string;
    title?: string;
    desc?: string;
    image?: ImageOrUrl;
  }[];
};

export type Product = {
  _id?: string;
  title?: string;
  subtitle?: string;
  impact?: string;
  cardKey?: string;
  image?: ImageOrUrl;
  modalImage?: ImageOrUrl;
  modalTitle?: string;
  modalSubtitle?: string;
  modalImpact?: { value?: string; key?: string }[];
  modalSteps?: {
    number?: string;
    title?: string;
    description?: string;
    highlight?: string;
  }[];
};

export type ProductsSection = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export type SdgData = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: {
    number?: string;
    title?: string;
    description?: string;
    progress?: string;
    image?: ImageOrUrl;
  }[];
};

export type BlogSectionData = {
  eyebrow?: string;
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type ContributorsSectionData = {
  eyebrow?: string;
  title?: string;
  message?: string;
  stats?: { value?: string; label?: string }[];
};

export type Contributor = {
  _id?: string;
  name?: string;
  url?: string;
  logo?: ImageOrUrl;
};

export type TeamSectionData = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export type TeamMember = {
  _id?: string;
  name?: string;
  role?: string;
  bio?: string;
  photo?: ImageOrUrl;
  socials?: { platform?: string; url?: string }[];
};

export type VisionMissionData = {
  panels?: {
    key?: string;
    letter?: string;
    eyebrow?: string;
    quote?: string;
    action?: string;
    gradient?: string;
    image?: ImageOrUrl;
  }[];
};

export type ContactData = {
  eyebrow?: string;
  title?: string;
  description?: string;
  sideImage?: ImageOrUrl;
  infoCards?: { icon?: string; label?: string; value?: string }[];
  formTitle?: string;
  submitLabel?: string;
  topics?: string[];
};

export type FooterData = {
  brandName?: string;
  tagline?: string;
  copyright?: string;
  columns?: { title?: string; links?: NavLink[] }[];
  bottomText?: string;
  bottomBadge?: string;
  bottomBadgeImage?: ImageOrUrl;
};
