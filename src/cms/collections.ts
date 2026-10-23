import type { Access, CollectionConfig, Field } from 'payload'
import { revalidateTag } from 'next/cache'
import { dates, gallery, image, relation, responsibilities, rich, rows, seo, slug, text, url, validateMedia } from './fields'

export const authenticated: Access = ({ req }) => Boolean(req.user)
export const published: Access = ({ req }) => req.user ? true : { _status: { equals: 'published' } }
export const refresh = () => {
  try { revalidateTag('portfolio', { expire: 0 }) } catch (error) {
    // CLI seeding has no Next.js request/cache context. The server has no cached
    // pages yet; every other failure should still surface.
    if (!(error instanceof Error) || !/static generation store|incrementalCache/i.test(error.message)) throw error
  }
}
const content = (name: string, fields: Field[], title = 'title'): CollectionConfig => ({
  slug: name, admin: { useAsTitle: title, group: 'Portfolio', defaultColumns: [title, '_status', 'updatedAt'] },
  access: { read: published, create: authenticated, update: authenticated, delete: authenticated },
  versions: { drafts: { autosave: true }, maxPerDoc: 20 },
  hooks: { afterChange: [({ doc }) => { refresh(); return doc }], afterDelete: [({ doc }) => { refresh(); return doc }] },
  fields,
})
const tags = rows('technologies', [text('name', true)])
const featured: Field[] = [{ name: 'featured', type: 'checkbox', defaultValue: false }, { name: 'displayOrder', type: 'number', defaultValue: 0 }]
const links: Field[] = [url('githubURL'), url('liveURL')]
export const Users: CollectionConfig = {
  slug: 'users', auth: { tokenExpiration: 7200, maxLoginAttempts: 5, lockTime: 600000 }, admin: { useAsTitle: 'email' },
  access: { read: authenticated, update: authenticated, delete: authenticated, create: async ({ req }) => {
    if (req.user) return true
    if (process.env.ALLOW_FIRST_USER !== 'true') return false
    const result = await req.payload.count({ collection: 'users', overrideAccess: true })
    return result.totalDocs === 0
  } }, fields: [],
}
export const Projects = content('projects', [text('title', true), slug, text('tagline'), { name: 'description', type: 'textarea' },
  { name: 'category', type: 'select', options: ['Engineering', 'AI', 'Developer tools'], required: true }, tags, image('coverImage'), gallery,
  ...featured, ...links, { name: 'status', type: 'select', options: ['In progress', 'Completed', 'Archived'] }, ...dates,
  { name: 'caseStudy', type: 'group', fields: [rich('overview'), rich('problem'), rich('solution'), text('role'), rich('features'), rich('architecture'), rich('challenges'), rich('outcomes')] },
  relation('relatedEvents', 'events'), relation('relatedHackathons', 'hackathons'), seo,
])
export const Events = content('events', [text('title', true), slug,
  { name: 'category', type: 'select', options: ['Hackathon', 'Workshop', 'Meetup', 'Conference', 'Other'] },
  relation('organization', 'organizations', false), { name: 'role', type: 'select', required: true, options: ['Organizer', 'Co-organizer', 'Attendee', 'Volunteer', 'Partner', 'Speaker', 'Support'] },
  { name: 'description', type: 'textarea' }, ...dates, text('location'), image('coverImage'), image('poster'), gallery, url('eventURL'), responsibilities, relation('relatedProjects', 'projects'), ...featured, seo,
])
export const Hackathons = content('hackathons', [text('title', true), slug, relation('organizer', 'organizations', false), ...dates, text('location'), image('coverImage'), gallery,
  text('role'), rows('team', [text('name', true), text('role')]), text('track'), text('verifiedAchievement'), relation('relatedProjects', 'projects'), tags, url('eventURL'), ...links, { name: 'description', type: 'textarea' }, seo,
])
export const Experience = content('experience', [text('title', true), relation('organization', 'organizations', false), text('role', true), ...dates,
  { name: 'description', type: 'textarea' }, responsibilities, rows('achievements', [text('item', true)]), image('logo'), relation('relatedProjects', 'projects'), relation('relatedEvents', 'events'),
])
export const Contributions = content('contributions', [text('title', true), relation('organization', 'organizations', false), text('role'),
  { name: 'description', type: 'textarea' }, ...dates, responsibilities, gallery, relation('relatedEvents', 'events'), relation('relatedProjects', 'projects'),
  rows('verifiedMetrics', [text('label', true), text('value', true), url('sourceURL')]),
])
export const Organizations = content('organizations', [text('title', true), image('logo'), { name: 'description', type: 'textarea' }, url('website'), relation('relatedEvents', 'events'), relation('relatedContributions', 'contributions')])
export const Articles = content('articles', [text('title', true), slug, { name: 'excerpt', type: 'textarea' }, image('coverImage'), rich('content'), rows('tags', [text('name', true)]), { name: 'publishedAt', type: 'date' }, seo])
export const Skills = content('skills', [text('title', true), { name: 'category', type: 'select', required: true, options: ['Languages', 'Frontend', 'Backend', 'AI', 'Databases', 'Infrastructure / Other'] }, image('icon'), url('website'), { name: 'displayOrder', type: 'number', defaultValue: 0 }])
export const Resume = content('resume', [text('title', true), { name: 'pdf', type: 'upload', relationTo: 'media', required: true, filterOptions: { mimeType: { equals: 'application/pdf' } }, validate: validateMedia('application/pdf') }, { name: 'lastUpdated', type: 'date', required: true }, image('previewImage'), { name: 'visible', type: 'checkbox', defaultValue: true }])
export const Media: CollectionConfig = {
  slug: 'media', admin: { group: 'Assets', useAsTitle: 'alt' },
  access: { read: published, create: authenticated, update: authenticated, delete: authenticated },
  versions: { drafts: true, maxPerDoc: 10 },
  hooks: { afterChange: [({ doc }) => { refresh(); return doc }], afterDelete: [({ doc }) => { refresh(); return doc }] },
  upload: { staticDir: 'media', mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf'],
    imageSizes: [{ name: 'card', width: 900, height: 675, position: 'centre' }, { name: 'thumbnail', width: 400, height: 300 }], adminThumbnail: 'thumbnail' },
  fields: [text('alt', true), text('caption'), text('attribution'), url('attributionURL')],
}
export const collections = [Users, Projects, Events, Hackathons, Experience, Contributions, Organizations, Articles, Skills, Media, Resume]
