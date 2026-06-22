/**
 * DOCUMENT — contributor
 * --------------------------------------------------------------
 * One document per partner/brand/manufacturer/NGO that uses
 * BioMANS to replace plastic. Each marquee pill shows a logo and
 * the name; an optional URL turns the pill into an outbound link.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contributor',
  title: 'Contributor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // Logo uses the shared `imageOrUrl` object so editors can upload
    // a Sanity asset OR paste an external URL.
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'imageOrUrl',
    }),

    defineField({
      name: 'url',
      title: 'Website URL (optional)',
      type: 'url',
    }),

    // Sort order — lower numbers appear first.
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', media: 'logo.image'},
  },
})
