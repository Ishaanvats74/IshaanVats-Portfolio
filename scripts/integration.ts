import assert from 'node:assert/strict'
import { randomBytes } from 'node:crypto'
import sharp from 'sharp'
import { getPayload, type CollectionSlug } from 'payload'
import config from '../src/payload.config'

// Only runs against the explicitly confirmed disposable local Docker database.
assert.match(process.env.DATABASE_URL || '', /^postgresql:\/\/portfolio:portfolio@localhost:5432\/portfolio$/)
const payload = await getPayload({ config })
const suffix = randomBytes(6).toString('hex')
const password = randomBytes(24).toString('hex')
const user = await payload.create({ collection: 'users', data: { email: `integration-${suffix}@example.invalid`, password }, overrideAccess: true })
const created: { collection: CollectionSlug; id: number }[] = []
const remember = <T extends { id: number }>(collection: CollectionSlug, entry: T): T => { created.push({ collection, id: entry.id }); return entry }
try {
  const draft = remember('projects', await payload.create({ collection: 'projects', data: { title: 'Disposable test draft', slug: `test-draft-${suffix}`, category: 'AI', _status: 'draft' }, user, overrideAccess: false }))
  const project = remember('projects', await payload.create({ collection: 'projects', data: { title: 'Disposable integration fixture', slug: `test-project-${suffix}`, category: 'Engineering', _status: 'published' }, user, overrideAccess: false }))
  const publicProjects = await payload.find({ collection: 'projects', overrideAccess: false, where: { id: { in: [draft.id, project.id] } } })
  assert.deepEqual(publicProjects.docs.map(p => p.id), [project.id])
  await assert.rejects(payload.create({ collection: 'projects', data: { title: 'Forbidden', slug: `forbidden-${suffix}`, category: 'AI' }, overrideAccess: false }))
  console.log('PASS: drafts excluded, published records visible, anonymous writes denied.')
  const imageBuffer = await sharp({ create: { width: 1200, height: 900, channels: 3, background: '#254edb' } }).png().toBuffer()
  const media = remember('media', await payload.create({ collection: 'media', data: { alt: 'Disposable test image', _status: 'draft' }, file: { data: imageBuffer, name: `test-${suffix}.png`, mimetype: 'image/png', size: imageBuffer.length }, user, overrideAccess: false }))
  await assert.rejects(payload.findByID({ collection: 'media', id: media.id, overrideAccess: false }))
  const publishedMedia = await payload.update({ collection: 'media', id: media.id, data: { _status: 'published' }, user, overrideAccess: false })
  assert.equal((await payload.findByID({ collection: 'media', id: media.id, overrideAccess: false })).alt, 'Disposable test image')
  await payload.update({ collection: 'projects', id: project.id, data: { coverImage: media.id, gallery: [{ image: media.id }] }, user, overrideAccess: false })
  const populated = await payload.findByID({ collection: 'projects', id: project.id, depth: 2, overrideAccess: false })
  assert.equal(typeof populated.coverImage, 'object')
  assert.ok(publishedMedia.sizes?.card?.url)
  console.log('PASS: image upload, resizing, draft media privacy, publishing, and gallery population.')
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
    '<< /Length 49 >>\nstream\nBT /F1 12 Tf 50 740 Td (Integration fixture) Tj ET\nendstream',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  ]
  let pdfText = '%PDF-1.4\n'
  const offsets = [0]
  objects.forEach((object, i) => { offsets.push(Buffer.byteLength(pdfText)); pdfText += `${i + 1} 0 obj\n${object}\nendobj\n` })
  const xrefOffset = Buffer.byteLength(pdfText)
  pdfText += `xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map(offset => `${String(offset).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`
  const pdfBuffer = Buffer.from(pdfText)
  const pdf = remember('media', await payload.create({ collection: 'media', data: { alt: 'Disposable test PDF', _status: 'published' }, file: { data: pdfBuffer, name: `test-${suffix}.pdf`, mimetype: 'application/pdf', size: pdfBuffer.length }, user, overrideAccess: false }))
  const resume = remember('resume', await payload.create({ collection: 'resume', data: { title: 'Disposable test resume', pdf: pdf.id, lastUpdated: new Date().toISOString(), visible: true, _status: 'published' }, user, overrideAccess: false }))
  assert.equal(typeof (await payload.findByID({ collection: 'resume', id: resume.id, depth: 1, overrideAccess: false })).pdf, 'object')
  await assert.rejects(payload.update({ collection: 'resume', id: resume.id, data: { pdf: media.id }, user, overrideAccess: false }))
  await assert.rejects(payload.update({ collection: 'projects', id: project.id, data: { coverImage: pdf.id }, user, overrideAccess: false }))
  console.log('PASS: PDF resume relationship and server-side image/PDF type validation.')
  const event = remember('events', await payload.create({ collection: 'events', data: { title: 'Disposable event', slug: `test-event-${suffix}`, role: 'Organizer', relatedProjects: [draft.id, project.id], _status: 'published' }, user, overrideAccess: false }))
  const populatedEvent = await payload.findByID({ collection: 'events', id: event.id, depth: 2, overrideAccess: false })
  const related = populatedEvent.relatedProjects as { id: number }[]
  assert.equal(related.some(p => p.id === draft.id), false)
  if (process.env.TEST_ORIGIN) {
    const base = process.env.TEST_ORIGIN
    const login = await fetch(`${base}/api/users/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: user.email, password }) })
    assert.equal(login.status, 200)
    const { token } = await login.json() as { token: string }
    const headers = { 'Content-Type': 'application/json', Authorization: `JWT ${token}` }
    const updated = await fetch(`${base}/api/projects/${project.id}`, { method: 'PATCH', headers, body: JSON.stringify({ title: `Disposable cache fixture ${suffix}`, _status: 'published' }) })
    assert.equal(updated.status, 200)
    const archiveHTML = await (await fetch(`${base}/projects`)).text()
    assert.ok(archiveHTML.includes(`Disposable cache fixture ${suffix}`))
    const detailResponse = await fetch(`${base}/projects/test-project-${suffix}`)
    assert.equal(detailResponse.status, 200)
    assert.ok((await detailResponse.text()).includes(`Disposable cache fixture ${suffix}`))
    const imageResponse = await fetch(`${base}${new URL(publishedMedia.url!).pathname}`)
    assert.equal(imageResponse.status, 200)
    const unpublished = await fetch(`${base}/api/projects/${project.id}`, { method: 'PATCH', headers, body: JSON.stringify({ _status: 'draft' }) })
    assert.equal(unpublished.status, 200)
    assert.equal((await (await fetch(`${base}/projects`)).text()).includes(`Disposable cache fixture ${suffix}`), false)
    assert.equal((await fetch(`${base}/projects/test-project-${suffix}`)).status, 404)
    console.log('PASS: REST login, live publish/unpublish cache invalidation, dynamic case-study routes, and public media delivery.')
  }
  await payload.update({ collection: 'projects', id: project.id, data: { _status: 'draft' }, user, overrideAccess: false })
  const afterUnpublish = await payload.find({ collection: 'projects', where: { id: { equals: project.id } }, overrideAccess: false })
  assert.equal(afterUnpublish.totalDocs, 0)
  console.log('PASS: draft relationships excluded and unpublished content removed from public queries.')
} finally {
  for (const item of created.reverse()) await payload.delete({ collection: item.collection, id: item.id, overrideAccess: true })
  await payload.delete({ collection: 'users', id: user.id, overrideAccess: true })
  await payload.destroy()
  console.log('Removed all disposable fixtures and temporary administrator.')
}
process.exit(0)
