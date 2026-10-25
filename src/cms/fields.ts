import type { CollectionSlug, Field, PayloadRequest, UploadField } from 'payload'

export const text = (name: string, required = false): Field => ({ name, label: name.replace(/([A-Z])/g, ' $1'), type: 'text', required, maxLength: 120, admin: { description: 'Keep this copy concise. Maximum 120 characters.' } })
export const rich = (name: string): Field => ({ name, type: 'richText' })
export const validateMedia = (mimePrefix: string) => async (value: unknown, { req }: { req: PayloadRequest }) => {
  if (!value) return true
  const id = typeof value === 'object' && value && 'id' in value ? String(value.id) : String(value)
  try {
    const media = await req.payload.findByID({ collection: 'media', id, overrideAccess: false, req })
    return String(media.mimeType || '').startsWith(mimePrefix) || `Choose a ${mimePrefix === 'image/' ? 'supported image' : 'PDF'} file.`
  } catch { return 'Choose an existing media upload.' }
}
export const image = (name: string): UploadField => ({ name, type: 'upload', relationTo: 'media', filterOptions: { mimeType: { contains: 'image/' } }, validate: validateMedia('image/') })
export const relation = (name: string, relationTo: CollectionSlug, hasMany = true): Field => hasMany ? { name, type: 'relationship', relationTo, hasMany: true } : { name, type: 'relationship', relationTo, hasMany: false }
export const url = (name: string): Field => ({ name, type: 'text', validate: (value: unknown) => {
  if (!value) return true
  try { return ['https:', 'http:'].includes(new URL(String(value)).protocol) || 'Use an http or https URL.' } catch { return 'Enter a valid absolute URL.' }
} })
export const rows = (name: string, fields: Field[]): Field => ({ name, label: name.replace(/([A-Z])/g, ' $1'), type: 'array', admin: { initCollapsed: true, description: 'Add, remove or drag rows to change their order.' }, fields })
export const gallery = rows('gallery', [image('image'), text('caption')])
export const dates: Field[] = [{ name: 'startDate', type: 'date' }, { name: 'endDate', type: 'date' }]
export const responsibilities = rows('responsibilities', [text('item', true)])
export const seo: Field = { name: 'seo', type: 'group', fields: [text('title'), { name: 'description', type: 'textarea', maxLength: 180 }, image('image')] }
export const slug: Field = { name: 'slug', type: 'text', required: true, unique: true, index: true, validate: (value: unknown) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(value)) || 'Use lowercase words separated by hyphens.' }
