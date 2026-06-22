/**
 * DOCUMENT — teamSection (singleton)
 * --------------------------------------------------------------
 * Editorial wrapper for the homepage Team section. The actual
 * people are stored as `teamMember` documents (collection) so
 * editors can reorder them independently.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamSection',
  title: 'Team Section',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'title',
      title: 'Title (use `|` for italic part)',
      type: 'string',
      description: 'Example: "The people behind| BioMANS |today"',
    }),
    defineField({name: 'description', title: 'Description', type: 'text'}),
  ],
  preview: {prepare: () => ({title: 'Team Section'})},
})
