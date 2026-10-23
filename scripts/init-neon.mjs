import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { randomBytes } from 'node:crypto'

if (existsSync('.env')) {
  console.log(
    '.env already exists; existing credentials and local data were left unchanged.',
  )
  console.log(
    'Set DATABASE_URL to the Neon direct URL and DATABASE_URL_POOLED to its pooled URL. See docs/neon.md.',
  )
} else {
  const template = readFileSync('.env.example', 'utf8').replace(
    'PAYLOAD_SECRET=',
    `PAYLOAD_SECRET=${randomBytes(32).toString('hex')}`,
  )
  writeFileSync('.env', template, { flag: 'wx', mode: 0o600 })
  console.log(
    'Created ignored .env. Add your Neon connection strings before running migrations. See docs/neon.md.',
  )
}
