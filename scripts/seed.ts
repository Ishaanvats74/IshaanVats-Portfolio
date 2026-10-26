import { existsSync } from 'node:fs'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { defaultPresentation } from '../src/lib/presentation'
import { initialSettings } from '../src/lib/content'
import { databaseURLs } from '../src/lib/server-environment.mjs'

if (!databaseURLs(process.env).runtime || !process.env.PAYLOAD_SECRET) throw new Error('Set a database URL and PAYLOAD_SECRET in .env first.')
const payload = await getPayload({ config })
const current = await payload.findGlobal({ slug: 'site-settings' })
if (!current.name) {
  await payload.updateGlobal({ slug: 'site-settings', data: {...initialSettings,community:undefined} })
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
// Apply this user-requested structure change once; later dashboard edits remain authoritative.
const refreshed = await payload.findGlobal({slug:'presentation'})
if (!refreshed.copy?.some(row=>row.key==='__about_certificates_v1')) {
 const liveSettings = await payload.findGlobal({slug:'site-settings',depth:1})
 const organizations = await payload.find({collection:'organizations',where:{title:{equals:'Geek Room'}},limit:1,depth:1})
 const communityOrganization = organizations.docs[0]
 const navigation=(liveSettings.navigation || []).filter(row=>!row.href.startsWith('/community')).map(row=>({...row,label:row.href==='/projects'?'Projects':row.label}))
 if (!navigation.some(row=>row.href==='/certificates')) navigation.splice(Math.min(1,navigation.length),0,{label:'Certificates',href:'/certificates'})
 await payload.updateGlobal({slug:'site-settings',data:{
  navigation,
  community:{
   ...liveSettings.community,
   enabled:liveSettings.community?.enabled ?? true,
   name:liveSettings.community?.name || communityOrganization?.title || '',
   role:liveSettings.community?.role || 'Tech & Event Lead',
   organization:liveSettings.community?.organization || communityOrganization?.id,
   description:liveSettings.community?.description || liveSettings.homepage?.communityIntro || '',
   logo:liveSettings.community?.logo || communityOrganization?.logo,
   website:liveSettings.community?.website || communityOrganization?.website,
  },
  homepage:{...liveSettings.homepage,eyebrow:liveSettings.homepage?.eyebrow==='DEVELOPER / AI EXPLORER / COMMUNITY BUILDER'?'DEVELOPER / AI EXPLORER':liveSettings.homepage?.eyebrow},
 }})
 const sections=(refreshed.sections || []).filter(row=>!['community','community-page'].includes(row.key || ''))
 for (const key of ['certificates','certificates-page','about-community','about-experience'] as const) {
  if (!sections.some(row=>row.key===key)) {
   const row={key,enabled:true}
   const index=sections.findIndex(section=>section.key==='events')
   if(key==='certificates'&&index>=0) sections.splice(index,0,row)
   else sections.push(row)
  }
 }
 const replacement=new Map([
  ['Explore the work','Explore projects'],['THE WORK / AN EVOLVING COLLECTION','PROJECTS / AN EVOLVING COLLECTION'],['Related work','Related projects'],['Read my story','About & experience'],
 ])
 const copy=(refreshed.copy || []).map(row=>({...row,value:row.key==='link./community'?'/about#community':replacement.get(row.value || '') || row.value}))
 copy.push({key:'__about_certificates_v1',label:'Structure migration marker — keep this row',value:'true'})
 await payload.updateGlobal({slug:'presentation',data:{
  sections,copy,
  originCards:(refreshed.originCards || []).filter(row=>!row.title?.toLowerCase().includes('community')),
 }})
 console.log('Moved community to About, enabled certificates and renamed project navigation. Existing records were retained.')
}
const logoSettings = await payload.findGlobal({slug:'site-settings',depth:0})
const logoPresentation = await payload.findGlobal({slug:'presentation'})
if (!logoPresentation.copy?.some(row=>row.key==='__community_logo_v1')) {
 const filePath=path.resolve('public/community/geek-room-logo.jpg')
 if (!logoSettings.community?.logo && logoSettings.community?.name==='Geek Room' && existsSync(filePath)) {
  const existingLogo=await payload.find({collection:'media',where:{filename:{equals:'geek-room-logo.jpg'}},limit:1})
  const logo=existingLogo.docs[0] || await payload.create({collection:'media',filePath,data:{alt:'Geek Room community logo',attribution:'Geek Room official Linktree profile',attributionURL:'https://linktr.ee/geekroom',_status:'published'}})
  await payload.updateGlobal({slug:'site-settings',data:{community:{...logoSettings.community,logo:logo.id}}})
  console.log('Added the official Geek Room logo as editable Payload media.')
 }
 await payload.updateGlobal({slug:'presentation',data:{copy:[...(logoPresentation.copy || []),{key:'__community_logo_v1',label:'Logo seed marker — keep this row',value:'true'}]}})
}
console.log('No projects, achievements, skills, events, or resume were fabricated. Add verified records in /admin.')
await payload.destroy()
process.exit(0)
