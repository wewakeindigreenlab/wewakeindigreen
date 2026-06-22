/**
 * DOCUMENT — footer (singleton)
 * --------------------------------------------------------------
 * Footer columns, tagline, copyright, bottom bar.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({name: 'brandName', title: 'Brand name (next to logo)', type: 'string'}),
    defineField({name: 'tagline', title: 'Tagline (small paragraph)', type: 'text'}),
    defineField({name: 'copyright', title: 'Copyright line', type: 'string'}),

    defineField({
      name: 'columns',
      title: 'Link columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Column title', type: 'string'}),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [{type: 'navLink'}],
            }),
          ],
        },
      ],
    }),

    defineField({name: 'bottomText', title: 'Bottom bar text', type: 'string'}),
    defineField({name: 'bottomBadge', title: 'Bottom bar badge', type: 'string'}),
  ],
  preview: {prepare: () => ({title: 'Footer'})},
})
