import { existsSync } from 'node:fs'
import { loadEnvFile } from 'node:process'
import { databaseURLs, storageConfig } from '../src/lib/server-environment.mjs'
if (existsSync('.env')) loadEnvFile('.env')
const storage = storageConfig(process.env)
const missing = [
  'PAYLOAD_SECRET',
  'NEXT_PUBLIC_SERVER_URL',
  'S3_BUCKET',
].filter((key) => !process.env[key])
if (!databaseURLs(process.env).runtime)
  missing.push('DATABASE_URL or DATABASE_URL_POOLED')
if (!storage.config.credentials.accessKeyId)
  missing.push('AWS_ACCESS_KEY_ID or S3_ACCESS_KEY_ID')
if (!storage.config.credentials.secretAccessKey)
  missing.push('AWS_SECRET_ACCESS_KEY or S3_SECRET_ACCESS_KEY')
if (missing.length)
  throw new Error(`Missing production variables: ${missing.join(', ')}`)
if (process.env.PAYLOAD_SECRET.length < 32)
  throw new Error('PAYLOAD_SECRET must contain at least 32 characters.')
if (process.env.ALLOW_FIRST_USER === 'true')
  throw new Error('Disable ALLOW_FIRST_USER before production deployment.')
if (!process.env.NEXT_PUBLIC_SERVER_URL.startsWith('https://'))
  throw new Error('Use HTTPS for the production origin.')
console.log('Production environment checks passed.')
