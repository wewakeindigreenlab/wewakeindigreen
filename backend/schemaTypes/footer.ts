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

    // The pill on the right side of the bottom bar.
    // - `bottomBadge` is the text (e.g. "Proudly Make in India")
    // - `bottomBadgeImage` is the optional icon shown to its left
    //   (e.g. the Make-in-India lion logo, or an Indian flag).
    defineField({name: 'bottomBadge', title: 'Bottom bar badge text', type: 'string'}),
    defineField({
      name: 'bottomBadgeImage',
      title: 'Bottom bar badge icon',
      type: 'imageOrUrl',
      description:
        'Small icon shown before the badge text. Upload a transparent PNG (~48×48) or paste a URL.',
    }),
  ],
  preview: {prepare: () => ({title: 'Footer'})},
})
