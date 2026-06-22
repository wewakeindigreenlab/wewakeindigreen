/**
 * DOCUMENT — contact (singleton)
 * --------------------------------------------------------------
 * Copy + contact-info cards + form labels for the contact section.
 * The submission endpoint and entry IDs live in `siteSettings`
 * because they may be shared by multiple forms in the future.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Section',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'title',
      title: 'Title (use `|` for italic part)',
      type: 'string',
    }),
    defineField({name: 'description', title: 'Description', type: 'text'}),

    // Right-side image.
    defineField({name: 'sideImage', title: 'Side image', type: 'imageOrUrl'}),

    // Info cards (address, hours, etc).
    defineField({
      name: 'infoCards',
      title: 'Info cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'icon', title: 'Icon (emoji)', type: 'string'}),
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'value', title: 'Value', type: 'string'}),
          ],
        },
      ],
    }),

    // Form labels / placeholders.
    defineField({name: 'formTitle', title: 'Form title', type: 'string'}),
    defineField({name: 'submitLabel', title: 'Submit button label', type: 'string'}),
    defineField({
      name: 'topics',
      title: 'Topic dropdown options',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {prepare: () => ({title: 'Contact Section'})},
})
