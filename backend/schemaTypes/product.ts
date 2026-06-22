/**
 * DOCUMENT — product
 * --------------------------------------------------------------
 * Each card on the Products grid is one of these documents.
 * Includes the modal-detail data so editors can manage everything
 * from a single screen.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}),
    defineField({name: 'impact', title: 'Card impact line', type: 'string'}),
    defineField({name: 'image', title: 'Card image', type: 'imageOrUrl'}),

    // Custom card slug — used as a stable key (legacy `id` value).
    defineField({
      name: 'cardKey',
      title: 'Card key (slug)',
      type: 'slug',
      options: {source: 'title'},
    }),

    defineField({name: 'order', title: 'Order', type: 'number'}),

    /* ---------- MODAL DETAIL ---------- */

    defineField({name: 'modalImage', title: 'Modal hero image', type: 'imageOrUrl'}),
    defineField({name: 'modalTitle', title: 'Modal title', type: 'string'}),
    defineField({name: 'modalSubtitle', title: 'Modal subtitle', type: 'string'}),

    defineField({
      name: 'modalImpact',
      title: 'Modal impact stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'value', title: 'Value', type: 'string'}),
            defineField({name: 'key', title: 'Key (label)', type: 'string'}),
          ],
        },
      ],
    }),

    defineField({
      name: 'modalSteps',
      title: 'Manufacturing process steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'number', title: 'Number (e.g. "01")', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
            defineField({name: 'highlight', title: 'Highlight line', type: 'string'}),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image.image'},
  },
})
