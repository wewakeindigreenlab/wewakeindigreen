/**
 * DOCUMENT — biom (singleton)
 * --------------------------------------------------------------
 * BioMANS feature/spec section.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'biom',
  title: 'BioMANS Section',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'title',
      title: 'Title (use `|` for italic part)',
      type: 'string',
      description: 'Example: "|BioMANS| — The Future of Materials"',
    }),
    defineField({name: 'paragraph1', title: 'Paragraph 1', type: 'text'}),
    defineField({name: 'paragraph2', title: 'Paragraph 2', type: 'text'}),

    // Feature bullet rows with a check icon.
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
    }),

    // Raw materials sub-grid (e.g. "Beads" / "Sheets").
    defineField({name: 'rawMaterialsTitle', title: 'Raw materials heading', type: 'string'}),
    defineField({
      name: 'rawMaterials',
      title: 'Raw materials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            // Main photo of the raw material. Editors can upload an image
            // OR paste a URL — both are handled by the shared `imageOrUrl`
            // shape and the `resolveImage` helper on the frontend.
            defineField({name: 'image', title: 'Image', type: 'imageOrUrl'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'desc', title: 'Description', type: 'text'}),
            // Legacy emoji icon — kept hidden in studio so old documents
            // don't error. The frontend no longer renders it.
            defineField({
              name: 'icon',
              title: 'Icon (legacy)',
              type: 'string',
              hidden: true,
            }),
          ],
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'BioMANS Section'})},
})
