/**
 * DOCUMENT — visionMission (singleton)
 * --------------------------------------------------------------
 * Two-panel Vision/Mission section. Stored as an array so editors
 * can rename or reorder the two panels easily without renaming
 * fields in code.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'visionMission',
  title: 'Vision / Mission',
  type: 'document',
  fields: [
    defineField({
      name: 'panels',
      title: 'Panels (Vision, Mission)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'key', title: 'Key (e.g. vision/mission)', type: 'string'}),
            defineField({name: 'letter', title: 'Big letter', type: 'string'}),
            defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
            defineField({name: 'quote', title: 'Quote', type: 'text'}),
            defineField({name: 'action', title: 'Action line (uppercase)', type: 'string'}),
            defineField({name: 'image', title: 'Background image', type: 'imageOrUrl'}),
            defineField({
              name: 'gradient',
              title: 'Tailwind gradient classes',
              type: 'string',
              description: 'e.g. from-[#4E2F8E]/85 to-[#1a0f30]/95',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Vision / Mission'})},
})
