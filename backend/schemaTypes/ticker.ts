/**
 * DOCUMENT — ticker (singleton)
 * --------------------------------------------------------------
 * The fact strip that scrolls horizontally under the hero.
 * Editors can add as many items as they like.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ticker',
  title: 'Ticker',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Ticker items',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {prepare: () => ({title: 'Ticker'})},
})
