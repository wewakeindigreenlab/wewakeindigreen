/**
 * SHARED OBJECT — imageOrUrl
 * --------------------------------------------------------------
 * A reusable object that lets a CMS editor either:
 *   (a) upload an asset to Sanity (hot-spot enabled), OR
 *   (b) paste an external image URL (e.g. unsplash, CDN).
 *
 * The frontend image helper checks `asset` first, then falls back
 * to `url`. This keeps the editor experience flexible.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageOrUrl',
  title: 'Image (Upload or URL)',
  type: 'object',
  fields: [
    // (a) Uploaded Sanity image — preferred when present.
    defineField({
      name: 'image',
      title: 'Upload image',
      type: 'image',
      options: {hotspot: true},
    }),
    // (b) Plain URL — useful for unsplash / external CDNs.
    defineField({
      name: 'url',
      title: 'Or external URL',
      type: 'url',
    }),
    // Alt text is mandatory for accessibility (a11y).
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
    }),
  ],
})
