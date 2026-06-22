import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'externalImage',

  title: 'External Image URL',

  type: 'object',

  fields: [
    defineField({
      name: 'url',

      title: 'Image URL',

      type: 'url',
    }),

    defineField({
      name: 'alt',

      title: 'Alt Text',

      type: 'string',
    }),
  ],
})
