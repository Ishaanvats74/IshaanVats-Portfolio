import assert from 'node:assert/strict'
import test from 'node:test'
import type { Payload } from 'payload'
import { extractJWT } from '../node_modules/payload/dist/auth/extractJWT.js'
import { adminCSRFOrigins, payloadServerURL } from '../src/lib/server-environment.mjs'

function cookieToken(
  origin: string,
  csrf: string[],
  cookie = 'payload-token=test-session',
) {
  return extractJWT({
    headers: new Headers({
      Origin: origin,
      Cookie: cookie,
      'Sec-Fetch-Site': 'same-origin',
    }),
    payload: {
      config: { cookiePrefix: 'payload', auth: { jwtOrder: ['cookie'] }, csrf },
    } as Payload,
  })
}

test('local admin POSTs retain the session for localhost and loopback IPs', () => {
  // Reproduce why a working GET can be followed by an unauthorized media drawer POST.
  assert.equal(
    cookieToken('http://127.0.0.1:3000', ['http://localhost:3000']),
    null,
  )
  const csrf = adminCSRFOrigins('http://localhost:3000')
  for (const origin of [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://[::1]:3000',
  ]) {
    assert.equal(cookieToken(origin, csrf), 'test-session')
    assert.equal(cookieToken(origin, csrf, ''), null)
  }
  assert.equal(cookieToken('http://127.0.0.1:3001', csrf), null)
  assert.equal(cookieToken('https://attacker.example', csrf), null)
  assert.equal(
    cookieToken('http://localhost.attacker.example:3000', csrf),
    null,
  )
})

test('production admin accepts only the configured origin', () => {
  const csrf = adminCSRFOrigins('https://portfolio.example')
  assert.deepEqual(csrf, ['https://portfolio.example'])
  assert.equal(cookieToken('https://portfolio.example', csrf), 'test-session')
  for (const origin of [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://portfolio.example',
    'https://other.example',
  ]) {
    assert.equal(cookieToken(origin, csrf), null)
  }
})

test('a production public URL in .env does not reject local development admin saves', () => {
  const env = { NODE_ENV: 'development', NEXT_PUBLIC_SERVER_URL: 'https://portfolio.example' }
  const csrf = adminCSRFOrigins(payloadServerURL(env))
  for (const origin of ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://[::1]:3000']) {
    assert.equal(cookieToken(origin, csrf), 'test-session')
  }
  for (const origin of ['https://portfolio.example', 'https://attacker.example', 'http://localhost:3001']) {
    assert.equal(cookieToken(origin, csrf), null)
  }
  assert.equal(payloadServerURL({ ...env, PORT: '3021' }), 'http://127.0.0.1:3021')
  assert.equal(payloadServerURL({ ...env, NODE_ENV: 'production' }), 'https://portfolio.example')
  assert.equal(payloadServerURL({ ...env, NEXT_PUBLIC_SERVER_URL: 'http://localhost:4000' }), 'http://localhost:4000')
})
