import { getPayload } from 'payload'
import config from '../src/payload.config'
import { defaultPresentation } from '../src/lib/presentation'
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
const presentation = await payload.findGlobal({slug:'presentation'})
const existing = presentation.copy || []
const existingKeys = new Set(existing.map(row=>row.key))
const missing = defaultPresentation.copy.filter(row=>!existingKeys.has(row.key))
if (!existingKeys.has('__initialized') || missing.length) {
 await payload.updateGlobal({slug:'presentation',data:{
  ...(!existingKeys.has('__initialized') ? defaultPresentation : {}),
  copy:[...existing,...missing,...(!existingKeys.has('__initialized')?[{key:'__initialized',label:'Seed marker — keep this row',value:'true'}]:[])],
 }})
 console.log('Seeded missing presentation defaults. Existing copy and ordered lists were preserved.')
}
console.log('No projects, achievements, skills, events, or resume were fabricated. Add verified records in /admin.')
await payload.destroy()
process.exit(0)
