import { existsSync } from 'node:fs'
import { loadEnvFile } from 'node:process'
import { spawn } from 'node:child_process'
import { databaseURLs } from '../src/lib/server-environment.mjs'

if (existsSync('.env')) loadEnvFile('.env')
const command = process.argv[2]
if (!['migrate', 'migrate:create', 'migrate:status'].includes(command))
  throw new Error('Unsupported database command.')
const connections = databaseURLs(process.env)
if (!connections.runtime || !connections.direct)
  throw new Error('Set DATABASE_URL in .env first. See docs/neon.md.')
// The runtime uses the pooler; schema operations use the direct URL when supplied.
const connection = connections.direct
let url
try {
  url = new URL(connection)
} catch {
  throw new Error('Invalid database connection URL.')
}
if (url.hostname.endsWith('.neon.tech') && url.hostname.includes('-pooler.')) {
  throw new Error(
    'Set DATABASE_URL (or DATABASE_URL_DIRECT) to the unpooled Neon URL before running migrations.',
  )
}
if (connections.runtime !== connections.direct) {
  let runtime
  try {
    runtime = new URL(connections.runtime)
  } catch {
    throw new Error('Invalid runtime database URL.')
  }
  if (
    runtime.hostname.replace('-pooler.', '.') !== url.hostname ||
    runtime.pathname !== url.pathname
  ) {
    throw new Error(
      'DATABASE_URL and DATABASE_URL_DIRECT must target the same database and endpoint.',
    )
  }
}
const child = spawn(
  process.execPath,
  ['node_modules/payload/bin.js', command, ...process.argv.slice(3)],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: connection,
      DATABASE_URL_POOLED: '',
      DATABASE_PUSH: 'false',
    },
  },
)
child.on('error', () => {
  console.error('Could not launch the Payload database command.')
  process.exitCode = 1
})
child.on('exit', (code) => {
  process.exitCode = code ?? 1
})
