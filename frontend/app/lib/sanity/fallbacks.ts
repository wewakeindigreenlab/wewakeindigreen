/**
 * STATIC FALLBACK CONTENT
 * --------------------------------------------------------------
 * These mirror the original hard-coded copy/data that lived inside
 * the components. They are only used when Sanity returns nothing —
 * for example, on a fresh project before the editor has filled in
 * the CMS, or for fields the editor hasn't touched yet.
 *
 * Keeping them separate (instead of inline in JSX) means the
 * components stay short and a developer can switch between
 * CMS-driven and static rendering without touching the markup.
 */

import {
  AboutData,
  BiomData,
  BlogSectionData,
  ContactData,
  Contributor,
  ContributorsSectionData,
  FooterData,
  HeroData,
  NavbarData,
  ProductsSection,
  Product,
  SdgData,
  StoryData,
  TeamMember,
  TeamSectionData,
  TickerData,
  VisionMissionData,
  SiteSettings,
} from "./types";

/* ---------- NAVBAR ---------- */
export const navbarFallback: NavbarData = {
  links: [
    { label: "About", href: "#about" },
    { label: "Plastic Crisis", href: "#story" },
    { label: "BioMANS", href: "#products" },
    { label: "SDG Goals", href: "#sdg" },
    { label: "Blog", href: "#blog" },
    { label: "Team", href: "#team" },
    { label: "Vision", href: "#vision" },
  ],
  ctaLabel: "Contact Us",
  ctaHref: "#contact",
};

/* ---------- HERO ---------- */
export const heroFallback: HeroData = {
  title: "Materials| Born From |Soil",
  eyebrow: "Make in India · Clean Tech · Deep Tech",
  subtitle:
    "We convert crop residue into BioMANS — a 100% biodegradable material replacing single-use plastic through sustainable deep-tech innovation.",
  primaryCtaLabel: "Explore BioMANS",
  primaryCtaHref: "#products",
  secondaryCtaLabel: "See The Crisis",
  secondaryCtaHref: "#story",
  stats: [
    { value: "21", label: "Days to biodegrade" },
    { value: "100%", label: "Agro-waste based" },
    { value: "−78%", label: "Carbon vs plastic" },
    { value: "3", label: "UN SDGs addressed" },
  ],
};

/* ---------- TICKER ---------- */
export const tickerFallback: TickerData = {
  items: [
    "8.3 Billion tonnes of plastic produced since 1950",
    "91% of plastic waste is never recycled",
    "Plastic takes over 450 years to decompose",
    "BioMANS biodegrades within 21 days",
    "Agricultural waste can replace plastic",
    "Circular materials are the future",
  ],
};

/* ---------- ABOUT ---------- */
export const aboutFallback: AboutData = {
  eyebrow: "Who We Are",
  title: "We build| tomorrow's |materials from today's waste",
  paragraph1:
    "WeWake IndiGreen (WIGPL) is a clean-tech & deep-tech company from Pune, India. We invented BioMANS — a biobased, biodegradable material made entirely from agricultural waste that would otherwise be burned.",
  paragraph2:
    "Grounded in Make in India & Made in India, every solution we build comes from local resources and serves local communities. We align with NITI Aayog's SDG goals — SDG 6, SDG 9, and SDG 12.",
  chips: [
    "Agro-Waste Upcycling",
    "Biopolymer R&D",
    "Water Tech",
    "Make in India",
    "Clean Tech",
    "Cold Composting",
  ],
  stats: [
    { label: "Biodegradation in soil", value: "21 days", width: "95%" },
    { label: "Carbon footprint vs plastic", value: "−78%", width: "78%" },
    { label: "Bio-based material content", value: "100%", width: "100%" },
    { label: "Soil nitrogen improvement", value: "+45%", width: "45%" },
  ],
  image1: {
    url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&q=80",
    alt: "Indian farmer",
  },
  image2: {
    url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80",
    alt: "Green plant",
  },
  sdgCardNumber: "3",
  sdgCardLabel: "UN SDGs Addressed",
};

/* ---------- STORY ---------- */
export const storyFallback: StoryData = {
  eyebrow: "The Problem We Solve",
  title: "The| Challenges |That Drove Us",
  lead:
    "“Am I going to sit on the daily incremental 10,376 T/D Plastic Waste Mountain?”",
  orbitItems: [
    {
      icon: "🗻",
      label: "Plastic Crisis",
      color: "#9b7dd4",
      title: "Plastic Waste Crisis",
      body:
        "India generates over 10,376 tonnes of plastic waste every single day. Single-use plastics are damaging ecosystems, oceans, and future sustainability.",
      stat: "10,376 T/D Plastic Waste",
    },
    {
      icon: "💧",
      label: "Water Scarcity",
      color: "#52c5d0",
      title: "Water Scarcity",
      body:
        "700 million people could face severe water scarcity by 2030. Sustainable water management is now a global necessity.",
      stat: "700 Million At Risk",
    },
    {
      icon: "🌱",
      label: "Agro Waste",
      color: "#95d5b2",
      title: "Agricultural Waste",
      body:
        "Millions of tonnes of crop residue are burned yearly. BioMANS converts this waste into sustainable biodegradable material.",
      stat: "Agro Waste → BioMANS",
    },
  ],
};

/* ---------- BIOM ---------- */
export const biomFallback: BiomData = {
  eyebrow: "Our Flagship Innovation",
  title: "| BioMANS | — The Future of Materials",
  paragraph1:
    "BioMANS — Biobased Biodegradable Advance Material — is made entirely from agricultural waste after crop harvesting. It replaces single-use plastics like disposable cutlery, carry bags, earbuds, bibs, and lanyards.",
  paragraph2:
    "Available in beads and sheets, BioMANS is production-ready for manufacturers and industrial integration.",
  features: [
    "100% Bio-based Agro-Waste Material",
    "100% Cold Compostable",
    "Biodegrades in just 21–30 Days",
    "100% Recyclable",
    "Reduces Carbon Footprint",
    "Enriches Soil Quality",
    "Novel Material via New Process Development — Converts to simple biomass, water & CO₂",
  ],
  rawMaterialsTitle: "Raw Material Forms",
  rawMaterials: [
    {
      title: "BioMANS Beads",
      desc: "Pellet-form biobased material ready for injection moulding and extrusion.",
      image: {
        // Grain / pellet close-up — visually maps to biopolymer beads.
        url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1600&q=80",
        alt: "BioMANS beads — biopolymer pellets",
      },
    },
    {
      title: "BioMANS Sheets",
      desc: "Flexible compostable sheets suitable for packaging and flat-form products.",
      image: {
        // Natural fibre / sheet texture — visually maps to bio-sheets.
        url: "https://images.unsplash.com/photo-1574283005048-b3a3a93b3a44?w=1600&q=80",
        alt: "BioMANS sheets — compostable bioplastic",
      },
    },
  ],
};

/* ---------- PRODUCTS ---------- */
export const productsSectionFallback: ProductsSection = {
  eyebrow: "Our Technology",
  title: "BioMANS| Products|",
  description:
    "Click any product to see exactly how it's manufactured from agro-waste and its verified real-world environmental impact.",
};

export const productsFallback: Product[] = [
  {
    _id: "p1",
    cardKey: "bag",
    title: "Carry Bag",
    subtitle: "Drop-in replacement for HDPE plastic bags",
    impact: "Saves 2.3kg CO₂/kg vs plastic",
    image: { url: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=900&q=80" },
    modalImage: { url: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=1200&q=80" },
    modalTitle: "BioMANS Carry Bag",
    modalSubtitle: "Complete replacement for HDPE & LDPE single-use plastic bags",
    modalImpact: [
      { value: "2.3 kg", key: "CO₂ saved per kg vs plastic" },
      { value: "21 days", key: "Full biodegradation" },
      { value: "0 ppm", key: "Toxic residue in soil" },
      { value: "−78%", key: "Carbon footprint" },
      { value: "+45%", key: "Soil nitrogen post-compost" },
      { value: "100%", key: "Recyclable if collected" },
    ],
    modalSteps: [
      {
        number: "01",
        title: "Agro-Waste Collection",
        description:
          "Rice straw, wheat husk, and sugarcane bagasse collected from partner farmers post-harvest.",
        highlight: "500M tonnes of crop residue generated in India yearly",
      },
      {
        number: "02",
        title: "Pre-Treatment & Cleaning",
        description: "Raw biomass washed, dried and processed into uniform particle size.",
        highlight: "Water recycled in closed loop — zero discharge",
      },
      {
        number: "03",
        title: "Biopolymerisation",
        description:
          "Proprietary enzymatic + thermal process converts biomass into biopolymer matrix.",
        highlight: "Novel process — patent filed 2024",
      },
    ],
  },
  {
    _id: "p2",
    cardKey: "cutlery",
    title: "Disposable Cutlery",
    subtitle: "Fork, knife, spoon — fully compostable",
    impact: "Zero toxins in landfill",
    image: { url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=80" },
    modalImage: { url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=80" },
    modalTitle: "BioMANS Disposable Cutlery",
    modalSubtitle: "Fork, knife, spoon — food-safe, heat-resistant, 28-day compostable",
    modalImpact: [
      { value: "28 days", key: "Biodegradation" },
      { value: "90°C", key: "Heat resistance" },
      { value: "100%", key: "Food safe certified" },
    ],
    modalSteps: [
      {
        number: "01",
        title: "Feedstock",
        description: "BioMANS polymer + bamboo fibre and corn starch waste.",
        highlight: "Zero virgin raw material used",
      },
      {
        number: "02",
        title: "Injection Moulding",
        description: "Compound injected into precision moulds.",
        highlight: "Replaces PP cutlery directly",
      },
    ],
  },
  {
    _id: "p3",
    cardKey: "bowl",
    title: "BioMANS Bowl",
    subtitle: "Sturdy, heat-resistant, fully bio",
    impact: "Replaces 12g plastic per bowl",
    image: { url: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=900&q=80" },
    modalImage: { url: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&q=80" },
    modalTitle: "BioMANS Bowl",
    modalSubtitle: "Heat-resistant biodegradable serving bowl",
    modalImpact: [
      { value: "12g", key: "Plastic replaced per bowl" },
      { value: "30 days", key: "Biodegradation time" },
      { value: "100%", key: "Compostable material" },
    ],
    modalSteps: [
      {
        number: "01",
        title: "Biomass Processing",
        description: "Agricultural waste converted into biopolymer feedstock.",
        highlight: "No fossil-fuel raw materials",
      },
      {
        number: "02",
        title: "Thermoforming",
        description: "High-pressure moulding creates sturdy bowls.",
        highlight: "Food-safe production process",
      },
    ],
  },
  {
    _id: "p4",
    cardKey: "earbuds",
    title: "Cotton Earbuds",
    subtitle: "BioMANS stem replaces polypropylene",
    impact: "1.5B plastic stems avoided/year",
    image: { url: "https://images.unsplash.com/photo-1606906568585-f3a0e7b96e9e?w=900&q=80" },
    modalImage: { url: "https://images.unsplash.com/photo-1606906568585-f3a0e7b96e9e?w=1200&q=80" },
    modalTitle: "Cotton Earbuds",
    modalSubtitle: "Plastic-free biodegradable earbuds",
    modalImpact: [
      { value: "1.5B", key: "Plastic stems avoided yearly" },
      { value: "21 days", key: "Biodegradation" },
    ],
    modalSteps: [
      {
        number: "01",
        title: "BioMANS Stem Production",
        description: "Biopolymer extruded into lightweight stems.",
        highlight: "Fully compostable structure",
      },
    ],
  },
  {
    _id: "p5",
    cardKey: "bib",
    title: "Bib & Medical Sheet",
    subtitle: "Medical & industrial grade bioplastic",
    impact: "Safe for skin contact",
    image: { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" },
    modalImage: { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80" },
    modalTitle: "Bib & Medical Sheet",
    modalSubtitle: "Medical-grade biodegradable sheet material",
    modalImpact: [
      { value: "Skin Safe", key: "Medical compatibility" },
      { value: "0%", key: "Microplastic residue" },
    ],
    modalSteps: [
      {
        number: "01",
        title: "Bio Sheet Casting",
        description: "BioMANS polymer spread into ultra-thin sheets.",
        highlight: "Industrial + medical applications",
      },
    ],
  },
  {
    _id: "p6",
    cardKey: "lanyard",
    title: "Event Lanyard",
    subtitle: "Leaves zero trace after the event",
    impact: "Biodegrades after event lifecycle",
    image: { url: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=900&q=80" },
    modalImage: { url: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=1200&q=80" },
    modalTitle: "Event Lanyard",
    modalSubtitle: "Zero-trace biodegradable event accessory",
    modalImpact: [
      { value: "100%", key: "Biodegradable after event" },
      { value: "0 waste", key: "Event lifecycle residue" },
    ],
    modalSteps: [
      {
        number: "01",
        title: "Fiber Extrusion",
        description: "BioMANS fibers woven into durable lanyards.",
        highlight: "Designed for short lifecycle sustainability",
      },
    ],
  },
];

/* ---------- SDG ---------- */
export const sdgFallback: SdgData = {
  eyebrow: "NITI Aayog Alignment",
  title: "Building for| global goals|",
  description:
    "Every product we create directly advances India's commitment to the United Nations Sustainable Development Goals.",
  items: [
    {
      number: "SDG 6",
      title: "Clean Water & Sanitation",
      description:
        "BioMANS eliminates plastic contaminating groundwater. Our water tech enables recycling and reuse for 700 million people facing scarcity by 2030.",
      progress: "62%",
      image: { url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80" },
    },
    {
      number: "SDG 9",
      title: "Industry, Innovation & Infrastructure",
      description:
        "Patented process converts agro-waste into industrial-grade biopolymer — proving sustainable production is economically viable at scale.",
      progress: "78%",
      image: { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80" },
    },
    {
      number: "SDG 12",
      title: "Responsible Consumption & Production",
      description:
        "BioMANS directly replaces single-use plastics. Every kilogram prevents 2.3kg CO₂ and 0.9kg of plastic from entering the environment permanently.",
      progress: "89%",
      image: { url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=80" },
    },
  ],
};

/* ---------- BLOG SECTION ---------- */
export const blogSectionFallback: BlogSectionData = {
  eyebrow: "Knowledge & Stories",
  title: "From the| field|",
  ctaLabel: "All articles",
  ctaHref: "/blog",
};

/* ---------- CONTRIBUTORS ---------- */
export const contributorsSectionFallback: ContributorsSectionData = {
  eyebrow: "Contributing to a Greener Planet",
  title: "Brands choosing BioMANS over plastic",
  message:
    "These aren't just customers — they're partners switching to agro-waste materials and shrinking their plastic footprint with every order.",
  // Three quick numbers — give the section weight + a story.
  stats: [
    { value: "20+", label: "Active contributors" },
    { value: "12", label: "Industries served" },
    { value: "1.4M+", label: "Plastic items replaced" },
  ],
};

/**
 * Default contributor list — used only until the editor adds the
 * real ones in Sanity Studio. Plain text avatars with on-brand
 * names so the marquee always looks populated.
 */
export const contributorsFallback: Contributor[] = [
  { _id: "c1", name: "Earthly Co." },
  { _id: "c2", name: "Sahyadri Naturals" },
  { _id: "c3", name: "GreenWave Pack" },
  { _id: "c4", name: "Nimbu Foods" },
  { _id: "c5", name: "Bhumi Collective" },
  { _id: "c6", name: "Aarogya Care" },
  { _id: "c7", name: "Ahimsa Events" },
  { _id: "c8", name: "Pune Plogger Co-op" },
];

/* ---------- TEAM ---------- */
export const teamSectionFallback: TeamSectionData = {
  eyebrow: "Meet the Team",
  title: "The people behind| BioMANS |today",
  description:
    "A small group of scientists, engineers and entrepreneurs turning India's agricultural waste into the materials of tomorrow.",
};

export const teamMembersFallback: TeamMember[] = [
  {
    _id: "tm1",
    name: "Dr. Amita Deshmukh",
    role: "Founder & Chief Scientist",
    bio:
      "Polymer chemist who pioneered the BioMANS biopolymerisation process. Leads R&D across all bio-material lines.",
    photo: {
      url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
      alt: "Dr. Amita Deshmukh",
    },
    socials: [
      { platform: "linkedin", url: "https://linkedin.com" },
    ],
  },
  {
    _id: "tm2",
    name: "Rohan Iyer",
    role: "Co-Founder & COO",
    bio:
      "Operations and supply-chain specialist building partnerships with farmer collectives across Maharashtra.",
    photo: {
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
      alt: "Rohan Iyer",
    },
    socials: [
      { platform: "linkedin", url: "https://linkedin.com" },
    ],
  },
  {
    _id: "tm3",
    name: "Priya Sharma",
    role: "Head of Product",
    bio:
      "Designs the application portfolio — from bags and cutlery to medical sheets — with manufacturers and brands.",
    photo: {
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
      alt: "Priya Sharma",
    },
    socials: [
      { platform: "linkedin", url: "https://linkedin.com" },
    ],
  },
  {
    _id: "tm4",
    name: "Karan Mehta",
    role: "Lead Process Engineer",
    bio:
      "Scales the BioMANS line from lab to factory, focusing on energy-efficient bio-extrusion and moulding.",
    photo: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      alt: "Karan Mehta",
    },
    socials: [
      { platform: "linkedin", url: "https://linkedin.com" },
    ],
  },
];

/* ---------- VISION / MISSION ---------- */
export const visionMissionFallback: VisionMissionData = {
  panels: [
    {
      key: "vision",
      letter: "V",
      eyebrow: "Our Vision",
      quote:
        "It is not possible for earth to replenish at a pace that it may be relieved of all the pollution we impose upon it.",
      action: "IT IS OUR RESPONSIBILITY TO TAKE CARE.",
      image: { url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=80" },
      gradient: "from-[#4E2F8E]/85 to-[#1a0f30]/95",
    },
    {
      key: "mission",
      letter: "M",
      eyebrow: "Our Mission",
      quote:
        "We offer real green technological solutions for a change — built by people, for people, from the soil of India.",
      action: "INNOVATION · SUSTAINABILITY · IMPACT",
      image: { url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80" },
      gradient: "from-[#40916c]/85 to-[#10251c]/95",
    },
  ],
};

/* ---------- CONTACT ---------- */
export const contactFallback: ContactData = {
  eyebrow: "Work With Us",
  title: "Let's build a| cleaner world |together",
  description:
    "Whether you're a manufacturer, investor, NGO, or someone who cares — we want to hear from you.",
  sideImage: {
    url: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1200&q=80",
    alt: "Team working",
  },
  infoCards: [
    {
      icon: "📍",
      label: "Address",
      value:
        "Flat No-7, 16/B, Pachimanagari, Kothrud Pune 411052, Maharashtra, India",
    },
    {
      icon: "🕐",
      label: "Hours",
      value: "Mon–Fri 9 AM–6 PM · Sat 9 AM–2 PM",
    },
    {
      icon: "🌐",
      label: "Website",
      value: "wewakeindigreen.com",
    },
  ],
  formTitle: "Send a message",
  submitLabel: "Send Message 🌱",
  topics: [
    "Manufacturing Partnership",
    "Investment Opportunity",
    "Research Collaboration",
    "Product Sourcing",
    "General Enquiry",
  ],
};

/* ---------- FOOTER ---------- */
export const footerFallback: FooterData = {
  brandName: "WeWake IndiGreen",
  tagline:
    "With innovative technologies, let's change the world together for blissful mother-Earth.",
  copyright: "© 2026 WIGPL · All rights reserved",
  columns: [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Our Team", href: "#team" },
        { label: "Vision & Mission", href: "#vision" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Technology",
      links: [
        { label: "BioMANS", href: "#products" },
        { label: "SDG Goals", href: "#sdg" },
        { label: "Plastic Crisis", href: "#story" },
      ],
    },
    {
      title: "Insights",
      links: [
        { label: "Blog", href: "#blog" },
        { label: "Research", href: "#blog" },
        { label: "Case Studies", href: "#blog" },
        { label: "Press", href: "#blog" },
      ],
    },
  ],
  bottomText:
    "WIGPL · Pune, Maharashtra, India · Clean Tech & Deep Tech · Brand colour #4E2F8E",
  bottomBadge: "🇮🇳 Proudly Make in India",
};

/* ---------- SITE SETTINGS ---------- */
export const siteSettingsFallback: SiteSettings = {
  title: "WeWake IndiGreen",
  tagline: "Materials born from soil.",
  email: "hello@wewakeindigreen.com",
  phone: "",
  socials: [],
  /**
   * GOOGLE FORM → GOOGLE SHEET — Contact form integration
   * --------------------------------------------------------------
   * Dummy but **format-correct** values below. They look just like
   * what Google generates so editors can see the full submission
   * flow in the UI without changing a line of code.
   *
   * To make the form deliver to a REAL Google Sheet:
   *  1. forms.google.com → create form with these 5 fields, in order:
   *       First name · Last name · Email · Topic · Message
   *  2. Link it to a Google Sheet (Responses tab → green sheet icon).
   *  3. Send → Link → copy the preview URL.
   *  4. Change the trailing `/viewform` to `/formResponse`. Paste that
   *     into Sanity → Site Settings → Google Form action URL.
   *  5. Open the preview, right-click → View page source, search for
   *     `entry.` to find each field's ID. Paste the 5 IDs into the
   *     matching fields in Site Settings.
   *  6. Publish. Every submission lands in your linked Sheet.
   *
   * Until the swap happens, the form on the live site still submits
   * (no errors) — the hidden iframe absorbs Google's response.
   */
  googleFormActionUrl:
    "https://docs.google.com/forms/d/1ar5X27mv6wC8uo2qmWwCU-TDxMSfJSAhxlSynwpZ5bM/formResponse",
  gfFirstNameEntry: "entry.1256847203",
  gfLastNameEntry: "entry.793497307",
  gfEmailEntry:    "entry.973024352",
  gfTopicEntry:    "entry.1266379902",
  gfMessageEntry:  "entry.843705606",

  // SEO defaults — overridden by Site Settings in Sanity.
  metaTitle:
    "WeWake IndiGreen — BioMANS, biodegradable material from agro-waste",
  metaDescription:
    "WeWake IndiGreen (WIGPL) converts crop residue into BioMANS — a 100% biodegradable, agro-waste based material replacing single-use plastic. Make in India · Clean Tech · Deep Tech.",
  metaKeywords: [
    "BioMANS",
    "biodegradable material",
    "agro waste",
    "bioplastic",
    "WeWake IndiGreen",
    "clean tech India",
    "compostable plastic alternative",
    "SDG 6 SDG 9 SDG 12",
  ],
  ogImage: { url: "/images/logo.PNG", alt: "WeWake IndiGreen" },
  siteUrl: "https://www.wewakeindigreen.com",
};

/**
 * Helper that merges fetched data with a fallback object, field
 * by field. Empty/undefined fetched values fall back. This lets
 * editors fill the CMS gradually without breaking the site.
 */
export function withFallback<T extends object>(
  data: Partial<T> | null | undefined,
  fallback: T
): T {
  if (!data) return fallback;
  const out: any = { ...fallback };
  for (const k of Object.keys(data) as (keyof T)[]) {
    const v = (data as any)[k];
    // Treat empty arrays / empty strings / null as "missing".
    const empty =
      v == null ||
      v === "" ||
      (Array.isArray(v) && v.length === 0);
    if (!empty) out[k] = v;
  }
  return out as T;
}
