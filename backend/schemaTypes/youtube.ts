import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'youtube',

  title: 'YouTube Embed',

  type: 'object',

  fields: [
    defineField({
      name: 'url',

      title: 'YouTube URL',

      type: 'url',
    }),
  ],
})
