/**
 * SCHEMA REGISTRY
 * --------------------------------------------------------------
 * Sanity expects a flat array of every type the studio should
 * know about. Organising the imports here keeps `sanity.config.ts`
 * clean and lets us add new types without touching it again.
 */

/* SHARED OBJECT TYPES */
import imageOrUrl from './objects/imageOrUrl'
import navLink from './objects/navLink'

/* CONTENT BLOCK HELPERS (existing) */
import youtube from './youtube'
import externalImage from './externalImage'

/* DOCUMENT TYPES — singletons + blog */
import siteSettings from './siteSettings'
import navbar from './navbar'
import {heroType} from './hero'
import ticker from './ticker'
import about from './about'
import story from './story'
import biom from './biom'
import product from './product'
import productsSection from './productsSection'
import sdgSection from './sdg'
import blogSection from './blogSection'
import visionMission from './visionMission'
import contact from './contact'
import footer from './footer'
import blog from './blog'
import teamSection from './teamSection'
import teamMember from './teamMember'
import contributorsSection from './contributorsSection'
import contributor from './contributor'

export const schemaTypes = [
  // Shared objects must be registered too.
  imageOrUrl,
  navLink,
  youtube,
  externalImage,

  // Documents.
  siteSettings,
  navbar,
  heroType,
  ticker,
  about,
  story,
  biom,
  product,
  productsSection,
  sdgSection,
  blogSection,
  teamSection,
  teamMember,
  contributorsSection,
  contributor,
  visionMission,
  contact,
  footer,
  blog,
]
