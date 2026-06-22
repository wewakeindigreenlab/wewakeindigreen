/**
 * DOCUMENT — sdgSection (singleton)
 * --------------------------------------------------------------
 * Sustainable Development Goals card grid + section intro.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sdgSection',
  title: 'SDG Section',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'title',
      title: 'Title (use `|` for italic part)',
      type: 'string',
    }),
    defineField({name: 'description', title: 'Description', type: 'text'}),

    defineField({
      name: 'items',
      title: 'SDG cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'number', title: 'SDG number (e.g. "SDG 6")', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
            defineField({name: 'progress', title: 'Progress (e.g. "62%")', type: 'string'}),
            defineField({name: 'image', title: 'Image', type: 'imageOrUrl'}),
          ],
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'SDG Section'})},
})
