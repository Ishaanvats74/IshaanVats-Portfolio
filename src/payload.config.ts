import { buildConfig, type Field } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { collections } from './cms/collections'
import { Presentation } from './cms/presentation'
import { SiteSettings } from './cms/settings'
import { databaseOptions } from './lib/database'
import {
  adminCSRFOrigins,
  payloadServerURL,
  databaseURLs,
  storageConfig,
} from './lib/server-environment.mjs'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const storage = storageConfig(process.env)
if (process.env.VERCEL && (!storage.bucket || !storage.config.credentials.accessKeyId || !storage.config.credentials.secretAccessKey || !process.env.NEXT_PUBLIC_SERVER_URL)) throw new Error('Vercel requires S3_BUCKET, S3 credentials and NEXT_PUBLIC_SERVER_URL. Uploads must use persistent storage.')
const serverURL = payloadServerURL(process.env)
if (databaseURLs(process.env).runtime && !process.env.PAYLOAD_SECRET)
  throw new Error(
    'PAYLOAD_SECRET is required when connecting the CMS database.',
  )
function describeFields(fields: Field[]): void {
 for (const field of fields) {
  if ('name' in field && field.name) {
   field.label ??= field.name.replace(/([A-Z])/g, ' $1').replace(/^./, c=>c.toUpperCase())
   if ('admin' in field) field.admin = { ...field.admin, description: ('description' in (field.admin || {}) ? (field.admin as {description?:string}).description : undefined) || `Edit ${field.name.replace(/([A-Z])/g,' $1').toLowerCase()}.` }
  }
  if ('fields' in field) describeFields(field.fields)
  if ('tabs' in field) for (const tab of field.tabs) describeFields(tab.fields)
 }
}
for (const item of [...collections, SiteSettings, Presentation]) describeFields(item.fields)
export default buildConfig({
  telemetry: false,
  admin: {
    user: 'users',
    importMap: { baseDir: dirname },
    meta: { titleSuffix: '— Ishaan / Studio' },
  },
  secret:
    process.env.PAYLOAD_SECRET || 'local-preview-only-not-a-production-secret',
  serverURL,
  csrf: adminCSRFOrigins(serverURL),
  collections,
  globals: [SiteSettings, Presentation],
  editor: lexicalEditor(),
  sharp,
  db: postgresAdapter(databaseOptions(process.env)),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  upload: { limits: { fileSize: 15 * 1024 * 1024 } },
  plugins: storage.bucket
    ? [
        s3Storage({
          collections: { media: true },
          ...storage,
        }),
      ]
    : [],
})
