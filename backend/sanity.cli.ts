import {defineCliConfig} from 'sanity/cli'

/**
 * SANITY CLI CONFIG
 * --------------------------------------------------------------
 * Reads the project ID + dataset from environment variables so the
 * same studio config works for prod, staging, and any future client.
 * Falls back to the WeWake IndiGreen project id `btmpzv2q` so
 * `sanity dev` "just works" locally without extra setup.
 *
 * To switch projects either:
 *   - export SANITY_STUDIO_PROJECT_ID=xxxxxxxx, OR
 *   - put it in backend/.env (loaded automatically by sanity).
 */
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? 'btmpzv2q'
const dataset =
  process.env.SANITY_STUDIO_DATASET ?? 'production'

export default defineCliConfig({
  api: {projectId, dataset},
  deployment: {
    autoUpdates: true,
  },
})
