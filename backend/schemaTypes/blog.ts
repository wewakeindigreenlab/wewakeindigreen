import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blog',

  title: 'Blogs',

  type: 'document',

  fields: [
    defineField({
      name: 'title',

      title: 'Title',

      type: 'string',

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',

      title: 'Slug',

      type: 'slug',

      options: {
        source: 'title',
      },

      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',

      title: 'Excerpt',

      type: 'text',

      rows: 4,
    }),

    defineField({
      name: 'coverImage',

      title: 'Cover Image',

      type: 'image',

      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'tag',

      title: 'Tag',

      type: 'string',
    }),

    defineField({
      name: 'featured',

      title: 'Featured Blog',

      type: 'boolean',

      initialValue: false,
    }),

    defineField({
      name: 'readTime',

      title: 'Read Time',

      type: 'string',
    }),

    defineField({
      name: 'publishedAt',

      title: 'Published At',

      type: 'datetime',
    }),

    defineField({
      name: 'content',

      title: 'Content',

      type: 'array',

      of: [
        {
          type: 'block',
        },

        {
          type: 'image',
        },

        {
          type: 'externalImage',
        },

        {
          type: 'youtube',
        },
      ],
    }),
  ],
})
