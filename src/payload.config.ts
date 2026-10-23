import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { collections } from './cms/collections'
import { SiteSettings } from './cms/settings'
import { databaseOptions } from './lib/database'
import {
  adminCSRFOrigins,
  databaseURLs,
  storageConfig,
} from './lib/server-environment.mjs'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const storage = storageConfig(process.env)
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
if (databaseURLs(process.env).runtime && !process.env.PAYLOAD_SECRET)
  throw new Error(
    'PAYLOAD_SECRET is required when connecting the CMS database.',
  )
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
  globals: [SiteSettings],
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
