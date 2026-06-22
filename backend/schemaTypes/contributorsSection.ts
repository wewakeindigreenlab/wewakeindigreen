/**
 * DOCUMENT — contributorsSection (singleton)
 * --------------------------------------------------------------
 * Editorial wrapper for the Contributors marquee that sits between
 * Products and SDG. These aren't customers — they're brands,
 * manufacturers, NGOs and institutions actively contributing to a
 * cleaner planet by choosing BioMANS. The copy below is written
 * with that framing.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contributorsSection',
  title: 'Contributors Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Short label above the heading. e.g. "Contributing to a greener planet"',
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      description:
        'Single-line heading shown above the marquee. e.g. "Brands choosing BioMANS over plastic"',
    }),
    defineField({
      name: 'message',
      title: 'Sub message',
      type: 'text',
      rows: 2,
      description: 'One or two lines clarifying these are contributors, not just customers.',
    }),

    // Quick stats row shown above the marquee. Gives the section
    // visual weight so it doesn't feel like a thin divider.
    defineField({
      name: 'stats',
      title: 'Stats row (up to 3)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'value', title: 'Value', type: 'string'}),
            defineField({name: 'label', title: 'Label', type: 'string'}),
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {prepare: () => ({title: 'Contributors Section'})},
})
