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
            // Photos of the raw material. Add two or more to show a
            // rotating carousel on the card, same as the Products grid.
            defineField({
              name: 'images',
              title: 'Images (carousel)',
              description:
                'Add two or more to show a rotating carousel on the card. One image works too — the carousel just won\'t show arrows/dots.',
              type: 'array',
              of: [{type: 'imageOrUrl'}],
              validation: (Rule) => Rule.min(1),
            }),
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
