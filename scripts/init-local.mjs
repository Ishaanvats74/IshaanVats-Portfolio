import { existsSync, writeFileSync } from 'node:fs'
import { randomBytes } from 'node:crypto'
if (existsSync('.env')) { console.log('.env already exists; left unchanged.'); process.exit(0) }
writeFileSync('.env', `PAYLOAD_SECRET=${randomBytes(32).toString('hex')}\nDATABASE_URL=postgresql://portfolio:portfolio@localhost:5432/portfolio\nNEXT_PUBLIC_SERVER_URL=http://localhost:3000\nALLOW_FIRST_USER=true\n`)
console.log('Created ignored local .env with a random secret. Start PostgreSQL before running the CMS.')
