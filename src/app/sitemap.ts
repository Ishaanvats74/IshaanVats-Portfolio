import type { MetadataRoute } from 'next'
import { getEntries } from '@/lib/data'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const paths = ['', 'projects', 'community', 'activities', 'hackathons', 'events', 'experience', 'resume', 'writing', 'about']
  const details = (await Promise.all(Object.entries({ projects: 'projects', events: 'events', hackathons: 'hackathons', writing: 'articles' }).map(async ([path, collection]) => (await getEntries(collection)).map(entry => `${path}/${entry.slug}`)))).flat()
  return [...paths, ...details].map(path => ({ url: `${base}/${path}`, changeFrequency: 'weekly', priority: path ? .7 : 1 }))
}
