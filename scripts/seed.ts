import { getPayload } from 'payload'
import config from '../src/payload.config'
import { initialSettings } from '../src/lib/content'
import { databaseURLs } from '../src/lib/server-environment.mjs'

if (!databaseURLs(process.env).runtime || !process.env.PAYLOAD_SECRET) throw new Error('Set a database URL and PAYLOAD_SECRET in .env first.')
const payload = await getPayload({ config })
const current = await payload.findGlobal({ slug: 'site-settings' })
if (!current.name) {
  await payload.updateGlobal({ slug: 'site-settings', data: initialSettings })
  console.log('Seeded verified biography, navigation, and GitHub link.')
} else console.log('Site settings already exist; no content overwritten.')
const organization = await payload.find({ collection: 'organizations', where: { title: { equals: 'Geek Room' } }, limit: 1 })
if (!organization.totalDocs) await payload.create({ collection: 'organizations', data: { title: 'Geek Room', description: 'Developer community where Ishaan contributes to hackathons, event organization, sponsorship outreach, partnerships, and developer engagement.', _status: 'published' } })
console.log('No projects, achievements, skills, events, or resume were fabricated. Add verified records in /admin.')
await payload.destroy()
process.exit(0)
