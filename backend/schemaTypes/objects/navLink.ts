/**
 * SHARED OBJECT — navLink
 * --------------------------------------------------------------
 * Generic navigation link. Used by the Navbar and Footer.
 * `href` may be an in-page anchor (#about) or a full URL.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navLink',
  title: 'Navigation Link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({name: 'href', title: 'Href', type: 'string'}),
  ],
})
