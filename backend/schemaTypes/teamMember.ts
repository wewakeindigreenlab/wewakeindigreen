/**
 * DOCUMENT — teamMember
 * --------------------------------------------------------------
 * One document per person. Includes name, role, headshot, short
 * bio, social links, and a sortable order index so editors can
 * arrange the team grid without changing code.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / title',
      type: 'string',
    }),

    // Headshot uses the shared `imageOrUrl` object so editors
    // can either upload a photo or paste an external URL.
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'imageOrUrl',
    }),

    // Short bio shown on the card. Keep it tight (~2 sentences).
    defineField({
      name: 'bio',
      title: 'Short bio',
      type: 'text',
      rows: 3,
    }),

    // Optional social profile links — rendered as icon buttons.
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Twitter / X', value: 'twitter'},
                  {title: 'GitHub', value: 'github'},
                  {title: 'Website', value: 'website'},
                  {title: 'Email', value: 'email'},
                ],
              },
            }),
            defineField({name: 'url', title: 'URL', type: 'string'}),
          ],
        },
      ],
    }),

    // Sort order — lower numbers appear first.
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo.image'},
  },
})
