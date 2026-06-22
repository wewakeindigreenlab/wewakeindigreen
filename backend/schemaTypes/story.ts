/**
 * DOCUMENT — story (singleton)
 * --------------------------------------------------------------
 * "The Problem We Solve" section with the orbiting canvas widget.
 * Each orbit item gets its own icon (emoji), label, accent color,
 * detail title, body, and stat shown in the popup card.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'story',
  title: 'Story / Problem Section',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'title',
      title: 'Title (use `|` for italic part)',
      type: 'string',
      description: 'Example: "The|Challenges|That Drove Us"',
    }),
    defineField({name: 'lead', title: 'Lead quote', type: 'text'}),

    defineField({
      name: 'orbitItems',
      title: 'Orbit items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'icon', title: 'Icon (emoji)', type: 'string'}),
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'color', title: 'Accent color (hex)', type: 'string'}),
            defineField({name: 'title', title: 'Popup title', type: 'string'}),
            defineField({name: 'body', title: 'Popup body', type: 'text'}),
            defineField({name: 'stat', title: 'Popup stat', type: 'string'}),
          ],
        },
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Story Section'})},
})
