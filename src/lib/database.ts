import { databaseURLs } from './server-environment.mjs'

/** Server-only database configuration. Connection strings must never be logged. */
export function databaseOptions(env: Record<string, string | undefined>) {
  let connectionString = databaseURLs(env).runtime
  let local = false
  if (connectionString) {
    let url: URL
    try {
      url = new URL(connectionString)
    } catch {
      throw new Error(
        'DATABASE_URL must be a valid PostgreSQL connection string.',
      )
    }
    if (!['postgres:', 'postgresql:'].includes(url.protocol))
      throw new Error(
        'DATABASE_URL must use the postgres or postgresql protocol.',
      )
    local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
    if (
      url.hostname.endsWith('.neon.tech') &&
      !['require', 'verify-ca', 'verify-full'].includes(
        url.searchParams.get('sslmode') || '',
      )
    ) {
      throw new Error(
        'Use the Neon connection string with sslmode=require (or verify-full).',
      )
    }
    if (url.hostname.endsWith('.neon.tech')) {
      // Keep certificate and hostname verification explicit across pg versions.
      url.searchParams.set('sslmode', 'verify-full')
      connectionString = url.toString()
    }
  }
  return {
    pool: {
      connectionString,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 20_000,
    },
    // A local dev server must never push schema changes to a shared cloud DB.
    push:
      local && env.NODE_ENV !== 'production' && env.DATABASE_PUSH !== 'false',
    disableCreateDatabase: !local,
  }
}
