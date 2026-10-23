import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { databaseURLs, storageConfig } from '../src/lib/server-environment.mjs'
import { databaseOptions } from '../src/lib/database'

const direct =
  'postgresql://user:test@ep-example.us-east-2.aws.neon.tech/portfolio?sslmode=require'
const pooled = direct.replace('ep-example.', 'ep-example-pooler.')

test('Neon exported names use pooled requests and direct migrations; old names still work', () => {
  const env = { DATABASE_URL: direct, DATABASE_URL_POOLED: pooled }
  assert.equal(databaseURLs(env).direct, direct)
  assert.equal(databaseOptions(env).pool.connectionString, pooled)
  const legacy = { DATABASE_URL: pooled, DATABASE_URL_DIRECT: direct }
  assert.equal(databaseURLs(legacy).direct, direct)
  assert.equal(databaseOptions(legacy).pool.connectionString, pooled)
})

test('migration subprocess cannot accidentally select the inherited pooled URL', () => {
  const directory = mkdtempSync(join(tmpdir(), 'portfolio-migration-test-'))
  const bin = join(directory, 'node_modules', 'payload', 'bin.js')
  mkdirSync(dirname(bin), { recursive: true })
  writeFileSync(
    bin,
    `process.stdout.write(JSON.stringify({direct:process.env.DATABASE_URL===process.env.EXPECTED_DIRECT,pooled:process.env.DATABASE_URL_POOLED,push:process.env.DATABASE_PUSH}))`,
  )
  try {
    const result = spawnSync(
      process.execPath,
      [resolve('scripts/database-command.mjs'), 'migrate:status'],
      {
        cwd: directory,
        encoding: 'utf8',
        timeout: 5000,
        env: {
          ...process.env,
          DATABASE_URL: direct,
          DATABASE_URL_POOLED: pooled,
          DATABASE_URL_DIRECT: '',
          EXPECTED_DIRECT: direct,
        },
      },
    )
    assert.equal(result.status, 0, result.stderr)
    assert.deepEqual(JSON.parse(result.stdout), {
      direct: true,
      pooled: '',
      push: 'false',
    })
  } finally {
    assert.equal(dirname(resolve(directory)), resolve(tmpdir()))
    rmSync(directory, { recursive: true, force: true })
  }
})

test('Neon AWS names reach the S3 adapter and legacy storage names remain compatible', () => {
  const storage = storageConfig({
    S3_BUCKET: 'projects',
    AWS_ENDPOINT_URL_S3: 'https://example.storage.neon.tech',
    AWS_REGION: 'us-east-2',
    AWS_ACCESS_KEY_ID: 'test-id',
    AWS_SECRET_ACCESS_KEY: 'test-secret',
  })
  assert.equal(storage.bucket, 'projects')
  assert.equal(storage.config.endpoint, 'https://example.storage.neon.tech')
  assert.equal(storage.config.region, 'us-east-2')
  assert.equal(storage.config.forcePathStyle, true)
  assert.deepEqual(storage.config.credentials, {
    accessKeyId: 'test-id',
    secretAccessKey: 'test-secret',
  })
  assert.deepEqual(
    storageConfig({
      S3_BUCKET: 'projects',
      S3_ENDPOINT: storage.config.endpoint,
      S3_REGION: 'us-east-2',
      S3_ACCESS_KEY_ID: 'test-id',
      S3_SECRET_ACCESS_KEY: 'test-secret',
    }),
    storage,
  )
})
