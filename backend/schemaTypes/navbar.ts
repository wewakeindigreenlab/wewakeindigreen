/**
 * DOCUMENT — navbar (singleton)
 * --------------------------------------------------------------
 * Drives the top navigation. Editors can add/remove links,
 * change the CTA button label and its href.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      title: 'Navigation links',
      type: 'array',
      of: [{type: 'navLink'}],
    }),
    defineField({name: 'ctaLabel', title: 'CTA button label', type: 'string'}),
    defineField({name: 'ctaHref', title: 'CTA button href', type: 'string'}),
  ],
  preview: {prepare: () => ({title: 'Navbar'})},
})
