import assert from 'node:assert/strict'
const origin = process.env.TEST_ORIGIN || 'http://127.0.0.1:3000'
for (const path of ['/', '/projects', '/community', '/activities', '/hackathons', '/events', '/experience', '/resume', '/writing', '/about', '/sitemap.xml', '/robots.txt', '/icon.svg']) {
  const response = await fetch(`${origin}${path}`)
  assert.equal(response.status, 200, `${path} should return 200`)
  if (!path.includes('.')) assert.ok((await response.text()).includes('Ishaan'))
  console.log(`PASS ${path}`)
}
const missing = await fetch(`${origin}/projects/does-not-exist`)
const missingHTML = await missing.text()
// Next.js retains HTTP 200 if notFound() runs after streaming starts.
// Require both the 404 boundary and noindex; a generic 200 is still a failure.
assert.ok(missing.status === 404 || (missing.status === 200 && missingHTML.includes('NEXT_HTTP_ERROR_FALLBACK;404') && /name="robots" content="noindex"/.test(missingHTML)), 'Unknown project must resolve to a not-found response')
console.log('PASS unknown project resolves to not-found')
