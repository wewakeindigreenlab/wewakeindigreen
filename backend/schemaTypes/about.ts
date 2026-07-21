/**
 * DOCUMENT — about (singleton)
 * --------------------------------------------------------------
 * "Who We Are" section. Includes copy, chips, statbars, and the
 * image collage on the right side.
 */
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),

    // Same `|`-split convention as the hero title.
    defineField({
      name: 'title',
      title: 'Title (use `|` for italic part)',
      type: 'string',
      description: 'Example: "We build|tomorrow\'s|materials from today\'s waste"',
    }),

    // Two paragraphs of body copy (rich-ish text without going full Portable Text).
    defineField({name: 'paragraph1', title: 'Paragraph 1', type: 'text'}),
    defineField({name: 'paragraph2', title: 'Paragraph 2', type: 'text'}),

    // Capability chips (small pill labels).
    defineField({
      name: 'chips',
      title: 'Capability chips',
      type: 'array',
      of: [{type: 'string'}],
    }),

    // Stat bars. `width` is a CSS width (e.g. "78%") used for the fill bar.
    // defineField({
    //   name: 'stats',
    //   title: 'Stat bars',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'object',
    //       fields: [
    //         defineField({name: 'label', title: 'Label', type: 'string'}),
    //         defineField({name: 'value', title: 'Value', type: 'string'}),
    //         defineField({name: 'width', title: 'Bar width (e.g. "78%")', type: 'string'}),
    //       ],
    //     },
    //   ],
    // }),

    // Three-image collage on the right.
    //  - image1: the big card (top-left, asymmetric)
    //  - image2: smaller card (bottom-right, overlaps)
    //  - image3: third card (bottom-left, added for the SDG trio)
    defineField({name: 'image1', title: 'Image 1 (large)', type: 'imageOrUrl'}),
    defineField({name: 'image2', title: 'Image 2 (small)', type: 'imageOrUrl'}),

    // Floating "3 UN SDGs Addressed" card.
    defineField({name: 'sdgCardNumber', title: 'SDG card big number', type: 'string'}),
    defineField({name: 'sdgCardLabel', title: 'SDG card label', type: 'string'}),

    // Small floating SDG icon squares scattered beside the image collage.
    // Position/rotation for each are handled in the frontend design, not here.
    defineField({
      name: 'sdgIcons',
      title: 'SDG icon boxes (floating)',
      description: 'Small SDG icon squares that float beside the image collage. Add up to 3.',
      type: 'array',
      of: [{type: 'imageOrUrl'}],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {prepare: () => ({title: 'About Section'})},
})
