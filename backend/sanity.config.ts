import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

/**
 * SANITY STUDIO CONFIG
 * --------------------------------------------------------------
 * projectId + dataset are read from environment variables when
 * present, so the same studio works across prod / staging / future
 * clients without touching code. Defaults match sanity.cli.ts.
 */
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? 'btmpzv2q'
const dataset =
  process.env.SANITY_STUDIO_DATASET ?? 'production'

export default defineConfig({
  name: 'default',
  title: 'WeWake IndiGreen',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
