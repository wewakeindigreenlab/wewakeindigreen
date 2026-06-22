/**
 * DOCUMENT — productsSection (singleton)
 * --------------------------------------------------------------
 * Editorial copy that wraps the products grid (eyebrow, title,
 * description). The actual product cards live in the separate
 * `product` schema and are queried as a list.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'productsSection',
  title: 'Products Section (intro copy)',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'title',
      title: 'Title (use `|` for italic part)',
      type: 'string',
      description: 'Example: "BioMANS|Products|"',
    }),
    defineField({name: 'description', title: 'Description', type: 'text'}),
  ],
  preview: {prepare: () => ({title: 'Products Section'})},
})
