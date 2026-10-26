/** Server/CLI configuration only. Never import this module into client components. */
/** Keep development admin cookies and CSRF checks on loopback, even with a deployed
 * public URL in .env. Production must continue to trust only its configured origin.
 * @param {Record<string, string | undefined>} env
 */
export function payloadServerURL(env) {
  const configured = env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  if (env.NODE_ENV === 'development' && !['localhost', '127.0.0.1', '[::1]'].includes(new URL(configured).hostname)) {
    return `http://127.0.0.1:${env.PORT || '3000'}`
  }
  return configured
}

/** Explicit loopback aliases for local admin POSTs; never trust arbitrary request hosts.
 * @param {string} serverURL
 */
export function adminCSRFOrigins(serverURL) {
  const url = new URL(serverURL)
  const origins = new Set([url.origin])
  if (['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) {
    for (const hostname of ['localhost', '127.0.0.1', '[::1]']) {
      const alias = new URL(url.origin)
      alias.hostname = hostname
      origins.add(alias.origin)
    }
  }
  return [...origins]
}

/** @param {Record<string, string | undefined>} env */
export function databaseURLs(env) {
  return {
    runtime: env.DATABASE_URL_POOLED || env.DATABASE_URL || '',
    direct: env.DATABASE_URL_DIRECT || env.DATABASE_URL || '',
  }
}

/** Accept Neon's exported AWS names and the existing S3 aliases. */
/** @param {Record<string, string | undefined>} env */
export function storageConfig(env) {
  return {
    bucket: env.S3_BUCKET || '',
    config: {
      region: env.AWS_REGION || env.S3_REGION || 'auto',
      endpoint: env.AWS_ENDPOINT_URL_S3 || env.S3_ENDPOINT || undefined,
      forcePathStyle: true,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID || env.S3_ACCESS_KEY_ID || '',
        secretAccessKey:
          env.AWS_SECRET_ACCESS_KEY || env.S3_SECRET_ACCESS_KEY || '',
      },
    },
  }
}
