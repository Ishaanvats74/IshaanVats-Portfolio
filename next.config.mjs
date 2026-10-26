import { withPayload } from '@payloadcms/next/withPayload'
const origin = new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000')

export default withPayload({
  poweredByHeader: false,
  // Keep static builds within the shared CMS database's connection budget.
  experimental: { cpus: 2, staticGenerationMaxConcurrency: 2, staticGenerationRetryCount: 1 },
  images: { remotePatterns: [{ protocol: origin.protocol.slice(0, -1), hostname: origin.hostname, port: origin.port, pathname: '/api/media/file/**' }, ...(process.env.S3_PUBLIC_URL ? [{ protocol: 'https', hostname: new URL(process.env.S3_PUBLIC_URL).hostname }] : [])] },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ] }]
  },
})
