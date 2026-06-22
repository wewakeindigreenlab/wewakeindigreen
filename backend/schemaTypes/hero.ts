/**
 * DOCUMENT — hero (singleton)
 * --------------------------------------------------------------
 * Drives the top "above-the-fold" hero section.
 *
 * `title` uses the convention `Part1|Part2|Part3` where Part2 is
 * the italic accent line. This avoids needing rich-text just to
 * style one word and keeps the editor experience simple.
 */
import {defineField, defineType} from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    // Pipe-delimited 3-part title. Example: "Materials|Born From|Soil"
    defineField({
      name: 'title',
      title: 'Title (3 parts separated by `|`)',
      type: 'string',
      description:
        'Use `|` to split the title into three parts. The middle part will be italic + purple.',
    }),

    // Small pill above the title.
    defineField({name: 'eyebrow', title: 'Eyebrow text', type: 'string'}),

    // (legacy) Badge fields kept for backwards compatibility with
    // existing studio content; not all are used in the new design.
    defineField({name: 'badge1', title: 'Badge 1 (legacy)', type: 'string'}),
    defineField({name: 'badge2', title: 'Badge 2 (legacy)', type: 'string'}),
    defineField({name: 'badge3', title: 'Badge 3 (legacy)', type: 'string'}),

    // Paragraph below the title.
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text'}),

    // CTA buttons.
    defineField({name: 'primaryCtaLabel', title: 'Primary CTA label', type: 'string'}),
    defineField({name: 'primaryCtaHref', title: 'Primary CTA href', type: 'string'}),
    defineField({name: 'secondaryCtaLabel', title: 'Secondary CTA label', type: 'string'}),
    defineField({name: 'secondaryCtaHref', title: 'Secondary CTA href', type: 'string'}),

    // Stat strip below the hero copy.
    defineField({
      name: 'stats',
      title: 'Stat strip',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'value', title: 'Value', type: 'string'}),
            defineField({name: 'label', title: 'Label', type: 'string'}),
          ],
        },
      ],
    }),

    // Optional background image override.
    defineField({name: 'backgroundImage', title: 'Background image', type: 'imageOrUrl'}),
  ],
  preview: {prepare: () => ({title: 'Hero Section'})},
})

export default heroType
