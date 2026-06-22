/**
 * DOCUMENT — blogSection (singleton)
 * --------------------------------------------------------------
 * Editorial wrapper for the homepage "From the field" section.
 * The actual blog posts live in the existing `blog` schema.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogSection',
  title: 'Blog Section (homepage intro)',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'title',
      title: 'Title (use `|` for italic part)',
      type: 'string',
    }),
    defineField({name: 'ctaLabel', title: 'All-articles button label', type: 'string'}),
    defineField({name: 'ctaHref', title: 'All-articles button href', type: 'string'}),
  ],
  preview: {prepare: () => ({title: 'Blog Section'})},
})
