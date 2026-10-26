import 'server-only'
import { defaultPresentation, type Presentation } from './presentation'
import type { CollectionSlug } from 'payload'
import { unstable_cache } from 'next/cache'
import { initialSettings, type Entry, type Settings } from './content'
import { databaseURLs } from './server-environment.mjs'

export const cmsConfigured = Boolean(databaseURLs(process.env).runtime && process.env.PAYLOAD_SECRET)
async function client() {
  const [{ getPayload }, { default: config }] = await Promise.all([import('payload'), import('@payload-config')])
  return getPayload({ config })
}
export const getSettings = unstable_cache(async (): Promise<Settings> => {
  if (!cmsConfigured) return initialSettings
  const payload = await client()
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 2, overrideAccess: false })
  return settings as unknown as Settings
}, ['settings-community-certificates-v3'], { tags: ['portfolio'], revalidate: 3600 })

export const getEntries = unstable_cache(async (collection: string): Promise<Entry[]> => {
  if (!cmsConfigured) return []
  const payload = await client()
  const result = await payload.find({ collection: collection as CollectionSlug, where: { _status: { equals: 'published' } }, draft: false, overrideAccess: false, depth: 2, limit: 500, sort: collection === 'projects' || collection === 'skills' || collection === 'certificates' ? 'displayOrder' : '-createdAt' })
  return result.docs as unknown as Entry[]
}, ['entries'], { tags: ['portfolio'], revalidate: 3600 })
export async function getEntry(collection: string, slug: string) { return (await getEntries(collection)).find(entry => entry.slug === slug) }

export const getPresentation = unstable_cache(async (): Promise<Presentation> => {
 if (!cmsConfigured) return defaultPresentation
 const payload = await client()
 const doc = await payload.findGlobal({slug:'presentation', depth:0, overrideAccess:false})
 return {
  copy: doc.copy ?? defaultPresentation.copy,
  sections: doc.sections ?? defaultPresentation.sections,
  originCards: doc.originCards ?? defaultPresentation.originCards,
  communityTags: doc.communityTags ?? defaultPresentation.communityTags,
  processSteps: doc.processSteps ?? defaultPresentation.processSteps,
  categories: doc.categories ?? defaultPresentation.categories,
 } as Presentation
}, ['presentation-certificates-v2'], {tags:['portfolio'], revalidate:3600})
