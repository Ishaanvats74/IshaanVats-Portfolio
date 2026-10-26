import assert from 'node:assert/strict'
import test from 'node:test'
import { spawnSync } from 'node:child_process'
import { databaseOptions } from '../src/lib/database'

test('migration command refuses a pooled URL or a different target database', () => {
  const DATABASE_URL =
    'postgresql://user:password@ep-example-pooler.ap-southeast-1.aws.neon.tech/portfolio?sslmode=require'
  for (const [direct, message] of [
    ['', 'unpooled Neon URL'],
    [
      'postgresql://user:password@ep-other.ap-southeast-1.aws.neon.tech/portfolio?sslmode=require',
      'same database and endpoint',
    ],
  ]) {
    const result = spawnSync(
      process.execPath,
      ['scripts/database-command.mjs', 'migrate'],
      {
        encoding: 'utf8',
        env: {
          ...process.env,
          DATABASE_URL,
          DATABASE_URL_POOLED: '',
          DATABASE_URL_DIRECT: direct,
        },
        timeout: 5000,
      },
    )
    assert.equal(result.status, 1)
    assert.ok(result.stderr.includes(message))
    assert.ok(!result.stderr.includes('user:password'))
  }
})

test('Neon uses TLS and never pushes schema from a local development server', () => {
  const url =
    'postgresql://user:password@ep-example-pooler.ap-southeast-1.aws.neon.tech/portfolio?sslmode=require&channel_binding=require'
  const options = databaseOptions({
    DATABASE_URL: url,
    NODE_ENV: 'development',
    DATABASE_PUSH: 'true',
  })
  assert.equal(options.push, false)
  assert.equal(options.disableCreateDatabase, true)
  assert.equal(options.pool.connectionString, url.replace('sslmode=require', 'sslmode=verify-full'))
  assert.equal(options.pool.max, 5)
  assert.throws(
    () => databaseOptions({ DATABASE_URL: url.split('?')[0] }),
    /sslmode/,
  )
  assert.throws(
    () =>
      databaseOptions({
        DATABASE_URL: url.replace('sslmode=require', 'sslmode=disable'),
      }),
    /sslmode/,
  )
})

test('optional local development keeps explicit schema-push behavior', () => {
  const DATABASE_URL = 'postgresql://user:password@localhost:5432/portfolio'
  assert.equal(
    databaseOptions({ DATABASE_URL, NODE_ENV: 'development' }).push,
    true,
  )
  assert.equal(
    databaseOptions({ DATABASE_URL, NODE_ENV: 'production' }).push,
    false,
  )
  assert.equal(
    databaseOptions({ DATABASE_URL, DATABASE_PUSH: 'false' }).push,
    false,
  )
  assert.equal(databaseOptions({}).push, false)
})

test('malformed database errors do not echo connection credentials', () => {
  assert.throws(
    () => databaseOptions({ DATABASE_URL: 'not a url secret-value' }),
    (error) =>
      error instanceof Error && !error.message.includes('secret-value'),
  )
  assert.throws(
    () => databaseOptions({ DATABASE_URL: 'https://example.com' }),
    /postgres/,
  )
})
